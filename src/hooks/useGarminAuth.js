import { useCallback, useEffect, useState } from 'react'
import { garminApi } from '../api/garminApi.js'

export function useGarminAuth() {
  const [state, setState] = useState({
    connected: false,
    user: null,
    loading: true,
    mfaRequired: false,
  })

  useEffect(() => {
    let cancelled = false
    garminApi
      .getStatus()
      .then((status) => {
        if (!cancelled) setState((prev) => ({ ...prev, ...status, loading: false }))
      })
      .catch(() => {
        if (!cancelled) setState((prev) => ({ ...prev, loading: false }))
      })
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await garminApi.login(email, password)
    setState((prev) => ({
      ...prev,
      connected: result.connected ?? false,
      user: result.user ?? null,
      mfaRequired: Boolean(result.mfaRequired),
    }))
    return result
  }, [])

  const submitMfa = useCallback(async (code) => {
    const result = await garminApi.submitMfa(code)
    setState((prev) => ({
      ...prev,
      connected: result.connected ?? false,
      user: result.user ?? null,
      mfaRequired: false,
    }))
    return result
  }, [])

  const logout = useCallback(async () => {
    await garminApi.logout()
    setState((prev) => ({ ...prev, connected: false, user: null, mfaRequired: false }))
  }, [])

  return { ...state, login, submitMfa, logout }
}
