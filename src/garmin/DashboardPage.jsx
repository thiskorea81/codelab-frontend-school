import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGarminAuth } from '../hooks/useGarminAuth.js'
import { useActivities } from '../hooks/useActivities.js'
import { garminApi } from '../api/garminApi.js'
import { typeLabel, formatDistance, formatDuration, formatDateTime } from './format.js'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { connected, loading: authLoading } = useGarminAuth()
  const { activities, loading, sync } = useActivities()
  const [courseCount, setCourseCount] = useState(null)

  useEffect(() => {
    if (!connected) return
    garminApi
      .getCourses()
      .then(({ courses }) => setCourseCount(courses.length))
      .catch(() => setCourseCount(0))
  }, [connected])

  const stats = useMemo(() => {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7)) // 월요일 기준
    weekStart.setHours(0, 0, 0, 0)

    let monthCount = 0
    let monthDistance = 0
    let weekCount = 0
    let weekDistance = 0
    for (const a of activities) {
      const date = new Date(a.startTimeLocal)
      if (Number.isNaN(date.getTime())) continue
      if (date >= monthStart) {
        monthCount += 1
        monthDistance += a.distance ?? 0
      }
      if (date >= weekStart) {
        weekCount += 1
        weekDistance += a.distance ?? 0
      }
    }
    return { monthCount, monthDistance, weekCount, weekDistance }
  }, [activities])

  const recent = activities.slice(0, 5)

  if (authLoading || loading) {
    return (
      <div className="page">
        <div className="container">
          <p className="garmin-loading">불러오는 중…</p>
        </div>
      </div>
    )
  }

  if (!connected) {
    return (
      <div className="page">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">GARMIN</span>
            <h1>기록 관리</h1>
          </div>
          <div className="garmin-card">
            <p>Garmin Connect 계정을 연결하면 활동 기록을 가져와 저장하고 관리할 수 있습니다.</p>
            <Link to="/garmin/connect" className="btn btn-primary">
              계정 연결하기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">GARMIN</span>
          <h1>기록 관리</h1>
          <div className="page-actions">
            <Link to="/garmin/activities" className="btn btn-outline">
              전체 활동 보기
            </Link>
            <Link to="/garmin/courses" className="btn btn-outline">
              코스 관리
            </Link>
            <button type="button" className="btn btn-primary" onClick={sync}>
              동기화
            </button>
          </div>
        </div>

        <div className="stat-grid">
          <div className="garmin-card stat-card">
            <span className="stat-label">이번 달 활동</span>
            <strong className="stat-value">{stats.monthCount}회</strong>
            <span className="stat-sub">{formatDistance(stats.monthDistance)}</span>
          </div>
          <div className="garmin-card stat-card">
            <span className="stat-label">이번 주 활동</span>
            <strong className="stat-value">{stats.weekCount}회</strong>
            <span className="stat-sub">{formatDistance(stats.weekDistance)}</span>
          </div>
          <div className="garmin-card stat-card">
            <span className="stat-label">저장된 활동</span>
            <strong className="stat-value">{activities.length}개</strong>
            <span className="stat-sub">이 기기에 캐시됨</span>
          </div>
          <div className="garmin-card stat-card">
            <span className="stat-label">코스</span>
            <strong className="stat-value">{courseCount ?? '…'}개</strong>
            <span className="stat-sub">Garmin Connect 코스</span>
          </div>
        </div>

        <h2 className="garmin-section-title">최근 활동</h2>
        {recent.length === 0 ? (
          <div className="garmin-card">
            <p>아직 저장된 활동이 없습니다. 동기화를 눌러 최신 기록을 가져오세요.</p>
          </div>
        ) : (
          <div className="garmin-card table-wrap">
            <table className="garmin-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>활동명</th>
                  <th>타입</th>
                  <th>거리</th>
                  <th>시간</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr
                    key={a.activityId}
                    onClick={() => navigate(`/garmin/activities/${a.activityId}`)}
                  >
                    <td>{formatDateTime(a.startTimeLocal)}</td>
                    <td>{a.activityName || '이름 없는 활동'}</td>
                    <td>
                      <span className="type-badge">{typeLabel(a)}</span>
                    </td>
                    <td>{formatDistance(a.distance)}</td>
                    <td>{formatDuration(a.duration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
