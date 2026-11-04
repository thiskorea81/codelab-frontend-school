import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useActivities } from '../hooks/useActivities.js'
import { downloadFile } from '../api/garminApi.js'
import { typeLabel, typeKey, formatDistance, formatDuration, formatPace, formatDateTime } from './format.js'

function DownloadButtons({ getUrl, baseName }) {
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const handle = async (format) => {
    setBusy(true)
    setError(null)
    try {
      await downloadFile(getUrl(format), `${baseName}.${format}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <span className="download-buttons" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="btn btn-sm" disabled={busy} onClick={() => handle('gpx')}>
        GPX
      </button>
      <button type="button" className="btn btn-sm" disabled={busy} onClick={() => handle('tcx')}>
        TCX
      </button>
      {error && <span className="garmin-error">{error}</span>}
    </span>
  )
}

function NoteEditor({ activityId, note, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(note)

  if (!editing) {
    return (
      <span className="note-view" onClick={(e) => { e.stopPropagation(); setEditing(true) }}>
        {note ? `${note} ✎` : <span className="note-empty">메모 추가</span>}
      </span>
    )
  }

  const commit = () => {
    onSave(activityId, value.trim())
    setEditing(false)
  }

  return (
    <span className="note-editor" onClick={(e) => e.stopPropagation()}>
      <input
        autoFocus
        value={value}
        placeholder="메모 입력"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') setEditing(false)
        }}
      />
      <button type="button" className="btn btn-sm" onClick={commit}>
        저장
      </button>
    </span>
  )
}

export default function ActivitiesPage() {
  const navigate = useNavigate()
  const {
    loading,
    syncing,
    sync,
    typeFilter,
    setTypeFilter,
    typeOptions,
    search,
    setSearch,
    page,
    pageCount,
    setPage,
    pageItems,
    filteredCount,
    toggleFavorite,
    favoriteSet,
    notes,
    saveNote,
  } = useActivities()
  const [syncError, setSyncError] = useState(null)

  const handleSync = async () => {
    setSyncError(null)
    try {
      await sync()
    } catch (err) {
      setSyncError(err.message)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">GARMIN</span>
          <h1>활동 목록</h1>
          <div className="page-actions">
            <button type="button" className="btn btn-primary" onClick={handleSync} disabled={syncing}>
              {syncing ? '동기화 중…' : '동기화'}
            </button>
          </div>
        </div>

        <div className="garmin-toolbar">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">전체 타입</option>
            {typeOptions.map(([key, sample]) => (
              <option key={key} value={key}>
                {typeLabel(sample)}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder="활동명 또는 메모 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="toolbar-count">{filteredCount}개</span>
        </div>

        {syncError && <p className="garmin-error">{syncError}</p>}

        {loading ? (
          <p className="garmin-loading">불러오는 중…</p>
        ) : pageItems.length === 0 ? (
          <div className="garmin-card">
            <p>표시할 활동이 없습니다. Garmin 계정을 연결하고 동기화해 주세요.</p>
            <Link to="/garmin/connect" className="btn btn-outline">
              계정 연결
            </Link>
          </div>
        ) : (
          <div className="garmin-card table-wrap">
            <table className="garmin-table">
              <thead>
                <tr>
                  <th aria-label="즐겨찾기" />
                  <th>날짜</th>
                  <th>활동명</th>
                  <th>타입</th>
                  <th>거리</th>
                  <th>시간</th>
                  <th>평균 페이스</th>
                  <th>메모</th>
                  <th>다운로드</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((a) => (
                  <tr key={a.activityId} onClick={() => navigate(`/garmin/activities/${a.activityId}`)}>
                    <td>
                      <button
                        type="button"
                        className={`favorite-btn ${favoriteSet.has(a.activityId) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(a.activityId)
                        }}
                        aria-label="즐겨찾기"
                      >
                        {favoriteSet.has(a.activityId) ? '★' : '☆'}
                      </button>
                    </td>
                    <td>{formatDateTime(a.startTimeLocal)}</td>
                    <td>{a.activityName || '이름 없는 활동'}</td>
                    <td>
                      <span className="type-badge">{typeLabel(a)}</span>
                    </td>
                    <td>{formatDistance(a.distance)}</td>
                    <td>{formatDuration(a.duration)}</td>
                    <td>{formatPace(a.averageSpeed)}</td>
                    <td>
                      <NoteEditor
                        activityId={a.activityId}
                        note={notes[a.activityId]}
                        onSave={saveNote}
                      />
                    </td>
                    <td>
                      <DownloadButtons
                        getUrl={(format) => `/api/activities/${a.activityId}/download?format=${format}`}
                        baseName={`${typeKey(a)}-${a.activityId}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pageCount > 1 && (
          <div className="pagination">
            <button type="button" className="btn btn-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
              이전
            </button>
            <span>
              {page + 1} / {pageCount}
            </span>
            <button
              type="button"
              className="btn btn-sm"
              disabled={page >= pageCount - 1}
              onClick={() => setPage(page + 1)}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
