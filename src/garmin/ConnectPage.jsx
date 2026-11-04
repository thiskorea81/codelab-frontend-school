import { useState } from 'react'
import { useGarminAuth } from '../hooks/useGarminAuth.js'

export default function ConnectPage() {
  const { connected, user, mfaRequired, login, submitMfa, logout } = useGarminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleMfa = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await submitMfa(mfaCode)
      setMfaCode('')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">GARMIN CONNECT</span>
          <h1>계정 연결</h1>
          <p>Garmin Connect 계정과 연동해 활동 기록을 가져오고 관리합니다.</p>
        </div>

        <div className="garmin-card connect-card">
          {connected ? (
            <>
              <div className="connect-status connected">
                <span className="status-dot" /> 연결됨
              </div>
              <p className="connect-user">
                {user?.displayName || user?.userName || 'Garmin 계정'} 계정으로 연결되어 있습니다.
              </p>
              <button type="button" className="btn btn-danger" onClick={logout}>
                연결 해제
              </button>
            </>
          ) : mfaRequired ? (
            <>
              <div className="connect-status">
                <span className="status-dot pending" /> 2단계 인증 필요
              </div>
              <p className="connect-user">
                Garmin 계정으로 발송된 인증 코드(이메일 또는 인증 앱)를 입력해 주세요.
              </p>
              <form className="garmin-form" onSubmit={handleMfa}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="인증 코드 6자리"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-primary" disabled={busy || !mfaCode.trim()}>
                  {busy ? '확인 중…' : '인증 완료'}
                </button>
              </form>
              {error && <p className="garmin-error">{error}</p>}
            </>
          ) : (
            <>
              <div className="connect-status">
                <span className="status-dot" /> 미연결
              </div>
              <form className="garmin-form" onSubmit={handleLogin}>
                <label>
                  이메일
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="garmin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  비밀번호
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button type="submit" className="btn btn-primary" disabled={busy}>
                  {busy ? '로그인 중…' : 'Garmin Connect 로그인'}
                </button>
              </form>
              {error && <p className="garmin-error">{error}</p>}
              <p className="connect-note">
                비밀번호는 로그인 요청 시에만 전달되며 서버에 저장되지 않습니다. 세션은 OAuth
                토큰으로 유지됩니다.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
