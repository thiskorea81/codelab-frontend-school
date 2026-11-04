import { useCallback, useEffect, useMemo, useState } from 'react'
import { garminApi } from '../api/garminApi.js'
import { garminDb } from '../lib/db.js'

const PAGE_SIZE = 20
const SYNC_PAGE_SIZE = 50
const SYNC_MAX_PAGES = 10 // 한 번에 최대 500개

function sortByDateDesc(list) {
  return [...list].sort(
    (a, b) => new Date(b.startTimeLocal ?? 0) - new Date(a.startTimeLocal ?? 0),
  )
}

export function useActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState(null)
  const [typeFilter, setTypeFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [favoriteIds, setFavoriteIds] = useState([])
  const [notes, setNotes] = useState({})

  // 캐시(IndexedDB)에서 활동 + 관리용 메타(즐겨찾기/메모) 로드
  useEffect(() => {
    let cancelled = false
    Promise.all([
      garminDb.getAllActivities(),
      garminDb.getMeta('favorites'),
      garminDb.getMeta('notes'),
    ])
      .then(([cached, favoritesMeta, notesMeta]) => {
        if (cancelled) return
        setActivities(sortByDateDesc(cached))
        setFavoriteIds(favoritesMeta?.ids ?? [])
        setNotes(notesMeta?.map ?? {})
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // 서버에서 최신 기록을 페이지 단위로 가져와 캐시에 병합
  const sync = useCallback(async () => {
    setSyncing(true)
    setError(null)
    try {
      for (let i = 0; i < SYNC_MAX_PAGES; i++) {
        const { activities: fetched } = await garminApi.getActivities({
          start: i * SYNC_PAGE_SIZE,
          limit: SYNC_PAGE_SIZE,
        })
        await garminDb.putActivities(fetched)
        if (fetched.length < SYNC_PAGE_SIZE) break
      }
      const cached = await garminDb.getAllActivities()
      setActivities(sortByDateDesc(cached))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setSyncing(false)
    }
  }, [])

  const toggleFavorite = useCallback(async (activityId) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
      garminDb.putMeta({ id: 'favorites', ids: next })
      return next
    })
  }, [])

  const saveNote = useCallback(async (activityId, text) => {
    setNotes((prev) => {
      const next = { ...prev, [activityId]: text }
      garminDb.putMeta({ id: 'notes', map: next })
      return next
    })
  }, [])

  const typeOptions = useMemo(() => {
    const keys = new Map()
    for (const a of activities) {
      const key = a.activityType?.typeKey ?? 'other'
      if (!keys.has(key)) keys.set(key, a)
    }
    return [...keys.entries()]
  }, [activities])

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return activities.filter((a) => {
      if (typeFilter !== 'all' && (a.activityType?.typeKey ?? 'other') !== typeFilter) {
        return false
      }
      if (keyword) {
        const name = (a.activityName ?? '').toLowerCase()
        const note = (notes[a.activityId] ?? '').toLowerCase()
        if (!name.includes(keyword) && !note.includes(keyword)) return false
      }
      return true
    })
  }, [activities, typeFilter, search, notes])

  useEffect(() => {
    setPage(0)
  }, [typeFilter, search])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page],
  )

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds])

  return {
    activities,
    loading,
    syncing,
    error,
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
    filteredCount: filtered.length,
    toggleFavorite,
    favoriteSet,
    notes,
    saveNote,
  }
}
