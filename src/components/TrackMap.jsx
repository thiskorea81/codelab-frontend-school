import { useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// points: [[lat, lon], ...] 형태의 트랙 좌표를 지도에 표시
export default function TrackMap({ points, height = 420 }) {
  const bounds = useMemo(() => {
    if (!points || points.length === 0) return null
    return L.latLngBounds(points.map(([lat, lon]) => [lat, lon]))
  }, [points])

  if (!bounds) {
    return <div className="track-map track-map-empty">표시할 트랙이 없습니다.</div>
  }

  const start = points[0]
  const end = points[points.length - 1]

  return (
    <div className="track-map" style={{ height }}>
      <MapContainer bounds={bounds} boundsOptions={{ padding: [20, 20] }} className="track-map-inner">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={points} pathOptions={{ color: '#7c3aed', weight: 4, opacity: 0.9 }} />
        <CircleMarker
          center={start}
          radius={6}
          pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 1 }}
        >
          <Tooltip>시작</Tooltip>
        </CircleMarker>
        <CircleMarker
          center={end}
          radius={6}
          pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 1 }}
        >
          <Tooltip>종료</Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  )
}
