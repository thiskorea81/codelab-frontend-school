import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { garminApi, downloadFile } from '../api/garminApi.js'
import { garminDb } from '../lib/db.js'
import TrackMap from '../components/TrackMap.jsx'
import {
  typeLabel,
  formatDistance,
  formatDuration,
  formatPace,
  formatDateTime,
  formatElevation,
} from './format.js'

export default function ActivityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)
  const [track, setTrack] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [neighbors, setNeighbors] = useState({ prev: null, next: null })

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setActivity(null)
    setTrack(null)

    garminApi
      .getActivity(id)
      .then(({ activity }) => {
        if (!cancelled) setActivity(activity)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    garminApi
      .getTrack(id)
      .then((data) => {
        if (!cancelled) setTrack(data)
      })
      .catch(() => {
        // 트랙이 없는 활동(수동 입력 등)은 지도 없이 통계만 표시
      })

    garminDb.getAllActivities().then((all) => {
      if (cancelled) return
      const sorted = [...all].sort(
        (a, b) => new Date(b.startTimeLocal ?? 0) - new Date(a.startTimeLocal ?? 0),
      )
      const idx = sorted.findIndex((a) => String(a.activityId) === String(id))
      if (idx >= 0) {
        setNeighbors({ prev: sorted[idx - 1] ?? null, next: sorted[idx + 1] ?? null })
      }
    })

    setLoading(false)
    return () => {
      cancelled = true
    }
  }, [id])

  const stats = useMemo(() => {
    if (!activity) return []
    return [
      { label: '거리', value: formatDistance(activity.distance) },
      { label: '시간', value: formatDuration(activity.duration) },
      { label: '평균 페이스', value: formatPace(activity.averageSpeed) },
      { label: '상승 고도', value: formatElevation(activity.elevationGain) },
      { label: '하강 고도', value: formatElevation(activity.elevationLoss) },
      { label: '평균 심박', value: activity.averageHR ? `${Math.round(activity.averageHR)} bpm` : '-' },
      { label: '최대 심박', value: activity.maxHR ? `${Math.round(activity.maxHR)} bpm` : '-' },
      { label: '칼로리', value: activity.calories ? `${Math.round(activity.calories)} kcal` : '-' },
    ]
  }, [activity])

  const handleDownload = async (format) => {
    try {
      await downloadFile(
        `/api/activities/${id}/download?format=${format}`,
        `garmin-activity-${id}.${format}`,
      )
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <div className="garmin-card">
            <p className="garmin-error">{error}</p>
            <Link to="/garmin/activities" className="btn btn-outline">
              목록으로 돌아가기
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
          <span className="eyebrow">
            <Link to="/garmin/activities">활동 목록</Link> / 활동 상세
          </span>
          <h1>{activity?.activityName || '활동 상세'}</h1>
          {activity && (
            <p>
              {formatDateTime(activity.startTimeLocal)} · {typeLabel(activity)}
            </p>
          )}
        </div>

        <div className="detail-toolbar">
          <button
            type="button"
            className="btn btn-sm"
            disabled={!neighbors.next}
            onClick={() => navigate(`/garmin/activities/${neighbors.next.activityId}`)}
          >
            ← 이전 활동
          </button>
          <div className="page-actions">
            <button type="button" className="btn btn-primary" onClick={() => handleDownload('gpx')}>
              GPX 다운로드
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleDownload('tcx')}>
              TCX 다운로드
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm"
            disabled={!neighbors.prev}
            onClick={() => navigate(`/garmin/activities/${neighbors.prev.activityId}`)}
          >
            다음 활동 →
          </button>
        </div>

        {loading && <p className="garmin-loading">불러오는 중…</p>}

        {track ? (
          <TrackMap points={track.points} />
        ) : (
          activity && <p className="garmin-loading">지도를 표시할 수 없는 활동입니다.</p>
        )}

        <div className="stat-grid">
          {stats.map((s) => (
            <div key={s.label} className="garmin-card stat-card">
              <span className="stat-label">{s.label}</span>
              <strong className="stat-value">{s.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
