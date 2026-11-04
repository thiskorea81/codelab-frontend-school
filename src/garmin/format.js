// 활동 타입 표시 이름 매핑 (Garmin typeKey 기준)
const TYPE_LABELS = {
  running: '러닝',
  trail_running: '트레일 러닝',
  treadmill_running: '트레드밀 러닝',
  cycling: '사이클',
  road_biking: '로드 바이크',
  mountain_biking: 'MTB',
  indoor_cycling: '실내 사이클',
  walking: '워킹',
  hiking: '하이킹',
  swimming: '수영',
  open_water_swimming: '오픈워터 수영',
  lap_swimming: '수영(레인)',
  strength_training: '근력 운동',
  cardio_training: '유산소 운동',
  elliptical: '일립티컬',
  yoga: '요가',
  pilates: '필라테스',
  skiing: '스키',
  snowboarding: '스노보드',
  golf: '골프',
  rowing: '로잉',
  multisport: '멀티스포츠',
}

export function typeLabel(activity) {
  const key = activity?.activityType?.typeKey
  if (!key) return '기타'
  return TYPE_LABELS[key] ?? key
}

export function typeKey(activity) {
  return activity?.activityType?.typeKey ?? 'other'
}

export function formatDistance(meters) {
  if (meters == null) return '-'
  return `${(meters / 1000).toFixed(2)} km`
}

export function formatDuration(seconds) {
  if (seconds == null) return '-'
  const s = Math.round(seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${m}:${String(sec).padStart(2, '0')}`
}

// 평균 속도(m/s)를 페이스(mm:ss/km)로
export function formatPace(speedMps) {
  if (!speedMps || speedMps <= 0) return '-'
  const secPerKm = 1000 / speedMps
  const m = Math.floor(secPerKm / 60)
  const s = Math.round(secPerKm % 60)
  return `${m}'${String(s).padStart(2, '0')}"`
}

export function formatElevation(meters) {
  if (meters == null) return '-'
  return `${Math.round(meters)} m`
}

export function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

export function formatDateTime(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
