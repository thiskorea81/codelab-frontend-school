const DB_NAME = 'garmin-manager'
const DB_VERSION = 1

let dbPromise = null

function openDb() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains('activities')) {
        db.createObjectStore('activities', { keyPath: 'activityId' })
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
    req.onblocked = () => reject(new Error('IndexedDB이 블록되었습니다.'))
  })
  return dbPromise
}

const reqToPromise = (req) =>
  new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

const txDone = (tx) =>
  new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  })

export const garminDb = {
  // 서버에서 받은 활동 요약을 캐시에 병합 저장
  async putActivities(activities) {
    const db = await openDb()
    const tx = db.transaction('activities', 'readwrite')
    const store = tx.objectStore('activities')
    for (const activity of activities) {
      store.put(activity)
    }
    await txDone(tx)
  },

  async getAllActivities() {
    const db = await openDb()
    const tx = db.transaction('activities', 'readonly')
    return reqToPromise(tx.objectStore('activities').getAll())
  },

  // meta 저장소: 즐겨찾기 목록 / 활동별 메모 등 관리용 데이터
  async getMeta(id) {
    const db = await openDb()
    const tx = db.transaction('meta', 'readonly')
    return reqToPromise(tx.objectStore('meta').get(id))
  },

  async putMeta(record) {
    const db = await openDb()
    const tx = db.transaction('meta', 'readwrite')
    tx.objectStore('meta').put(record)
    await txDone(tx)
  },
}
