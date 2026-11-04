import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  restoreSession,
  getState,
  login,
  submitMfaCode,
  logout,
  requireClient,
} from './garmin.js'
import { parseTrackXml } from './trackParser.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const CACHE_DIR = path.join(__dirname, 'cache')
const TMP_DIR = path.join(__dirname, 'tmp')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const PORT = process.env.PORT || 3001

for (const dir of [CACHE_DIR, TMP_DIR]) {
  fs.mkdirSync(dir, { recursive: true })
}
// 서버 재시작 시 임시 파일 정리
for (const file of fs.readdirSync(TMP_DIR)) {
  fs.unlinkSync(path.join(TMP_DIR, file))
}

const app = express()
app.use(express.json())

const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next)
}

function sendGarminError(res, err) {
  const status = err.status || (err.code === 'not_connected' ? 401 : 502)
  res.status(status).json({ error: err.message || 'Garmin 요청 처리 중 오류가 발생했습니다.' })
}

// ---------- 인증 ----------

app.get('/api/auth/status', (req, res) => {
  res.json(getState())
})

app.post(
  '/api/auth/login',
  asyncRoute(async (req, res) => {
    const { email, password } = req.body ?? {}
    if (!email || !password) {
      return res.status(400).json({ error: '이메일과 비밀번호를 입력해 주세요.' })
    }
    const result = await login(String(email), String(password))
    res.json(result)
  }),
)

app.post(
  '/api/auth/mfa',
  asyncRoute(async (req, res) => {
    const { code } = req.body ?? {}
    if (!code) {
      return res.status(400).json({ error: 'MFA 코드를 입력해 주세요.' })
    }
    const result = await submitMfaCode(String(code).trim())
    res.json(result)
  }),
)

app.post('/api/auth/logout', (req, res) => {
  logout()
  res.json({ connected: false })
})

// ---------- 활동 ----------

app.get(
  '/api/activities',
  asyncRoute(async (req, res) => {
    const gc = requireClient()
    const start = Math.max(0, Number.parseInt(req.query.start, 10) || 0)
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20))
    const type = req.query.type ? String(req.query.type) : undefined
    const activities = await gc.getActivities(start, limit, type)
    res.json({ activities, start, limit })
  }),
)

app.get(
  '/api/activities/:id',
  asyncRoute(async (req, res) => {
    const gc = requireClient()
    const activity = await gc.getActivity({ activityId: req.params.id })
    res.json({ activity })
  }),
)

// 트랙(좌표) 조회 — 파싱 결과를 디스크 캐시에 저장해 재요청 시 재다운로드 방지
app.get(
  '/api/activities/:id/track',
  asyncRoute(async (req, res) => {
    requireClient()
    const id = req.params.id
    const cacheFile = path.join(CACHE_DIR, `act-${id}.json`)
    if (fs.existsSync(cacheFile)) {
      return res.json(JSON.parse(fs.readFileSync(cacheFile, 'utf8')))
    }
    const gc = requireClient()
    await gc.downloadOriginalActivityData({ activityId: id }, TMP_DIR, 'gpx')
    const gpxFile = path.join(TMP_DIR, `${id}.gpx`)
    const track = parseTrackXml(fs.readFileSync(gpxFile, 'utf8'))
    fs.unlinkSync(gpxFile)
    fs.writeFileSync(cacheFile, JSON.stringify(track))
    res.json(track)
  }),
)

app.get(
  '/api/activities/:id/download',
  asyncRoute(async (req, res) => {
    const gc = requireClient()
    const id = req.params.id
    const format = req.query.format === 'tcx' ? 'tcx' : 'gpx'
    await gc.downloadOriginalActivityData({ activityId: id }, TMP_DIR, format)
    const file = path.join(TMP_DIR, `${id}.${format}`)
    res.download(file, `garmin-activity-${id}.${format}`, (err) => {
      if (fs.existsSync(file)) fs.unlinkSync(file)
      if (err && !res.headersSent) sendGarminError(res, err)
    })
  }),
)

// ---------- 코스 ----------

app.get(
  '/api/courses',
  asyncRoute(async (req, res) => {
    const gc = requireClient()
    const data = await gc.listCourses()
    res.json({ courses: data?.coursesForUser ?? [] })
  }),
)

app.get(
  '/api/courses/:id',
  asyncRoute(async (req, res) => {
    const gc = requireClient()
    const course = await gc.getCourseDetails(req.params.id)
    res.json({ course })
  }),
)

app.get(
  '/api/courses/:id/track',
  asyncRoute(async (req, res) => {
    requireClient()
    const id = req.params.id
    const cacheFile = path.join(CACHE_DIR, `course-${id}.json`)
    if (fs.existsSync(cacheFile)) {
      return res.json(JSON.parse(fs.readFileSync(cacheFile, 'utf8')))
    }
    const gc = requireClient()
    const gpx = await gc.exportCourseAsGpx(id)
    const track = parseTrackXml(gpx)
    fs.writeFileSync(cacheFile, JSON.stringify(track))
    res.json(track)
  }),
)

app.get(
  '/api/courses/:id/download',
  asyncRoute(async (req, res) => {
    const gc = requireClient()
    const id = req.params.id
    const format = req.query.format === 'tcx' ? 'tcx' : 'gpx'
    if (format === 'gpx') {
      const gpx = await gc.exportCourseAsGpx(id)
      res.type('application/gpx+xml')
      res.attachment(`garmin-course-${id}.gpx`)
      return res.send(gpx)
    }
    const tcx = await gc.get(
      `https://connectapi.garmin.com/course-service/course/${id}/download/tcx`,
      { responseType: 'text' },
    )
    res.type('application/vnd.garmin.tcx+xml')
    res.attachment(`garmin-course-${id}.tcx`)
    res.send(tcx)
  }),
)

// ---------- 프로덕션: 프론트 정적 서빙 ----------

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  // SPA 폰백 (Express 5에서는 '*' 경로 문법 미지원 → use로 처리)
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
}

// ---------- 에러 핸들러 ----------

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  sendGarminError(res, err)
})

await restoreSession()
app.listen(PORT, () => {
  console.log(`Garmin 서버 실행 중: http://localhost:${PORT}`)
})
