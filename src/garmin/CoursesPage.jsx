import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { garminApi, downloadFile } from '../api/garminApi.js'
import TrackMap from '../components/TrackMap.jsx'
import { formatDistance, formatElevation } from './format.js'

export default function CoursesPage() {
  const [courses, setCourses] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [track, setTrack] = useState(null)
  const [error, setError] = useState(null)
  const [downloadError, setDownloadError] = useState(null)

  useEffect(() => {
    garminApi
      .getCourses()
      .then(({ courses }) => setCourses(courses))
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    if (!selectedId) return
    setTrack(null)
    garminApi
      .getCourseTrack(selectedId)
      .then(setTrack)
      .catch(() => setTrack(null))
  }, [selectedId])

  const handleDownload = async (format) => {
    setDownloadError(null)
    try {
      await downloadFile(
        `/api/courses/${selectedId}/download?format=${format}`,
        `garmin-course-${selectedId}.${format}`,
      )
    } catch (err) {
      setDownloadError(err.message)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">GARMIN</span>
          <h1>코스 관리</h1>
          <p>Garmin Connect에 저장된 코스를 미리 보고 GPX/TCX로 다운로드합니다.</p>
        </div>

        {error && (
          <div className="garmin-card">
            <p className="garmin-error">{error}</p>
            <Link to="/garmin/connect" className="btn btn-outline">
              계정 연결 확인
            </Link>
          </div>
        )}

        {!error && courses === null && <p className="garmin-loading">불러오는 중…</p>}

        {!error && courses !== null && courses.length === 0 && (
          <div className="garmin-card">
            <p>저장된 코스가 없습니다. Garmin Connect 앱에서 코스를 만든 후 다시 확인해 주세요.</p>
          </div>
        )}

        {!error && courses !== null && courses.length > 0 && (
          <div className="courses-layout">
            <div className="garmin-card table-wrap course-list">
              <table className="garmin-table">
                <thead>
                  <tr>
                    <th>코스명</th>
                    <th>거리</th>
                    <th>상승 고도</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr
                      key={c.courseId}
                      className={selectedId === c.courseId ? 'selected' : ''}
                      onClick={() => setSelectedId(c.courseId)}
                    >
                      <td>{c.courseName || '이름 없는 코스'}</td>
                      <td>{formatDistance(c.distance)}</td>
                      <td>{formatElevation(c.elevationGain)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="course-preview">
              {selectedId ? (
                <>
                  <div className="page-actions">
                    <button type="button" className="btn btn-primary" onClick={() => handleDownload('gpx')}>
                      GPX 다운로드
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => handleDownload('tcx')}>
                      TCX 다운로드
                    </button>
                  </div>
                  {downloadError && <p className="garmin-error">{downloadError}</p>}
                  {track ? (
                    <TrackMap points={track.points} height={460} />
                  ) : (
                    <p className="garmin-loading">코스 지도를 불러오는 중…</p>
                  )}
                </>
              ) : (
                <div className="garmin-card">
                  <p>왼쪽 목록에서 코스를 선택하면 지도 미리보기와 다운로드가 표시됩니다.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
