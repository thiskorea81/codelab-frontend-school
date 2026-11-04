import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  parseTagValue: false,
})

const asArray = (value) => {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

const toNum = (value) => {
  if (value == null || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

// GPX/TCX XML 문자열을 지도에 그릴 좌표 배열로 변환
export function parseTrackXml(content) {
  const doc = parser.parse(content)
  const root = doc.gpx ?? doc.TrainingCenterDatabase ?? doc.tcx ?? null

  if (doc.gpx) {
    return parseGpx(doc.gpx)
  }
  if (doc.TrainingCenterDatabase) {
    return parseTcx(doc.TrainingCenterDatabase)
  }
  throw new Error(`지원하지 않는 트랙 파일 형식입니다. (root: ${root ? 'unknown' : 'none'})`)
}

function parseGpx(gpx) {
  const points = []
  const elevations = []

  for (const trk of asArray(gpx.trk)) {
    for (const seg of asArray(trk.trkseg)) {
      for (const pt of asArray(seg.trkpt)) {
        const lat = toNum(pt['@_lat'])
        const lon = toNum(pt['@_lon'])
        if (lat == null || lon == null) continue
        points.push([lat, lon])
        elevations.push(toNum(pt.ele))
      }
    }
  }

  if (points.length === 0) {
    // 루트 요소는 rte 형태일 수 있음
    for (const rte of asArray(gpx.rte)) {
      for (const pt of asArray(rte.rtept)) {
        const lat = toNum(pt['@_lat'])
        const lon = toNum(pt['@_lon'])
        if (lat == null || lon == null) continue
        points.push([lat, lon])
        elevations.push(toNum(pt.ele))
      }
    }
  }

  if (points.length === 0) throw new Error('GPX에서 트랙 좌표를 찾지 못했습니다.')
  return { points, elevations }
}

function parseTcx(tcd) {
  const points = []
  const elevations = []

  for (const activity of asArray(tcd.Activities?.Activity)) {
    for (const lap of asArray(activity.Lap)) {
      for (const track of asArray(lap.Track)) {
        for (const tp of asArray(track.Trackpoint)) {
          const lat = toNum(tp.Position?.LatitudeDegrees)
          const lon = toNum(tp.Position?.LongitudeDegrees)
          if (lat == null || lon == null) continue
          points.push([lat, lon])
          elevations.push(toNum(tp.AltitudeMeters))
        }
      }
    }
  }

  if (points.length === 0) throw new Error('TCX에서 트랙 좌표를 찾지 못했습니다.')
  return { points, elevations }
}
