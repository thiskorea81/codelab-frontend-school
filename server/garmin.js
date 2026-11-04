import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@flow-js/garmin-connect'

const { GarminConnect } = pkg

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const TOKEN_DIR = path.join(ROOT_DIR, '.garmin-tokens')

const MFA_TIMEOUT_MS = 5 * 60 * 1000

let client = null
let user = null
let pendingMfa = null
let activeLogin = null

function tokenFilesExist() {
  return (
    fs.existsSync(path.join(TOKEN_DIR, 'oauth1_token.json')) &&
    fs.existsSync(path.join(TOKEN_DIR, 'oauth2_token.json'))
  )
}

// 저장된 토큰이 있으면 세션 복원. 없거나 실패하면 미연결 상태로 둔다.
export async function restoreSession() {
  if (client || !tokenFilesExist()) return
  try {
    client = new GarminConnect()
    client.loadTokenByFile(TOKEN_DIR)
    const profile = await client.getUserProfile()
    user = { userName: profile.userName, displayName: profile.displayName }
  } catch {
    client = null
    user = null
  }
}

export function getState() {
  return { connected: Boolean(client), user }
}

export function requireClient() {
  if (!client) {
    const err = new Error('Garmin Connect에 연결되어 있지 않습니다.')
    err.status = 401
    err.code = 'not_connected'
    throw err
  }
  return client
}

function cancelPendingLogin(message) {
  if (pendingMfa) {
    clearTimeout(pendingMfa.timer)
    pendingMfa.reject(new Error(message))
    pendingMfa = null
  }
  activeLogin = null
}

export async function login(email, password) {
  cancelPendingLogin('새로운 로그인 시도로 취소되었습니다.')

  const gc = new GarminConnect({ username: email, password })
  client = gc

  let onMfaStarted
  const mfaStarted = new Promise((resolve) => {
    onMfaStarted = resolve
  })

  const loginPromise = gc
    .login(email, password, {
      mfaHandler: () =>
        new Promise((resolve, reject) => {
          onMfaStarted()
          pendingMfa = {
            resolve,
            reject,
            timer: setTimeout(() => {
              pendingMfa = null
              reject(new Error('MFA 코드 입력 시간이 초과되었습니다.'))
            }, MFA_TIMEOUT_MS),
          }
        }),
    })
    .then(async () => {
      const profile = await gc.getUserProfile()
      user = { userName: profile.userName, displayName: profile.displayName }
      try {
        gc.exportTokenToFile(TOKEN_DIR)
      } catch {
        // 토큰 저장 실패는 로그인 자체를 막지 않음
      }
      return { connected: true, user }
    })

  activeLogin = loginPromise
  // 아묏도 기다리지 않을 경우의 unhandled rejection 방지
  loginPromise.catch(() => {})

  const outcome = await Promise.race([
    loginPromise.then((result) => ({ type: 'done', result })).catch((err) => ({ type: 'error', err })),
    mfaStarted.then(() => ({ type: 'mfa' })),
  ])

  if (outcome.type === 'mfa') {
    return { mfaRequired: true }
  }
  activeLogin = null
  if (outcome.type === 'error') {
    client = null
    throw outcome.err
  }
  return outcome.result
}

export async function submitMfaCode(code) {
  if (!pendingMfa || !activeLogin) {
    const err = new Error('MFA 대기 중인 로그인이 없습니다.')
    err.status = 400
    throw err
  }
  clearTimeout(pendingMfa.timer)
  pendingMfa.resolve(code)
  pendingMfa = null
  const result = await activeLogin
  activeLogin = null
  return result
}

export async function logout() {
  cancelPendingLogin('로그아웃으로 취소되었습니다.')
  client = null
  user = null
  for (const name of ['oauth1_token.json', 'oauth2_token.json']) {
    const file = path.join(TOKEN_DIR, name)
    if (fs.existsSync(file)) fs.unlinkSync(file)
  }
}
