async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || `요청 실패 (${res.status})`)
    err.status = res.status
    err.code = data.code
    throw err
  }
  return data
}

export const garminApi = {
  getStatus: () => request('/api/auth/status'),

  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  submitMfa: (code) =>
    request('/api/auth/mfa', {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),

  logout: () => request('/api/auth/logout', { method: 'POST' }),

  getActivities: ({ start = 0, limit = 20, type } = {}) => {
    const params = new URLSearchParams({ start: String(start), limit: String(limit) })
    if (type) params.set('type', type)
    return request(`/api/activities?${params.toString()}`)
  },

  getActivity: (id) => request(`/api/activities/${id}`),

  getTrack: (id) => request(`/api/activities/${id}/track`),

  getCourses: () => request('/api/courses'),

  getCourse: (id) => request(`/api/courses/${id}`),

  getCourseTrack: (id) => request(`/api/courses/${id}/track`),
}

// 서버에서 파일을 받아 브라우저 다운로드로 저장 (실패 시 에러 메시지 표시 가능)
export async function downloadFile(url, fallbackName) {
  const res = await fetch(url)
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `다운로드 실패 (${res.status})`)
  }
  const blob = await res.blob()
  const disposition = res.headers.get('Content-Disposition') || ''
  const match = disposition.match(/filename="?([^";]+)"?/)
  const name = match?.[1] || fallbackName

  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000)
}
