// CodeLab 영상 강의 카드 데이터 빌더
// lessons.js의 강의 본문을 카드 뉴스 형태의 슬라이드 배열로 변환합니다.
// 카드 타입: cover / content / code / tip / end

import { getLessonById } from './lectures.js'
import { scripts } from './scripts.js'

function fallbackScript(card, lesson) {
  switch (card.type) {
    case 'cover':
      return `${lesson.title}. ${lesson.summary}`
    case 'content': {
      const first = card.paragraphs[0] || ''
      const lead = first.split('. ')[0]
      return card.heading
        ? `${card.heading}. ${lead}`
        : lead
    }
    case 'code':
      return `${card.heading} 예제를 살펴 볼게요. 코드를 천천히 따라 가며 어떤 동작을 하는지 확인하세요.`
    case 'tip':
      return `알아두면 좋아요. ${card.tip.text.split('. ')[0]}.`
    case 'end':
      return '이번 강의는 여기까지예요. 강의를 완료로 표시하고, 퀴즈로 배운 내용을 점검해 보세요.'
    default:
      return ''
  }
}

export function buildCards(lesson) {
  const cards = [
    {
      type: 'cover',
      title: lesson.title,
      subtitle: lesson.summary,
      duration: lesson.duration,
    },
  ]

  let current = null
  const flush = () => {
    if (current) {
      cards.push(current)
      current = null
    }
  }

  for (const block of lesson.content) {
    if (block.type === 'heading') {
      flush()
      current = { type: 'content', heading: block.text, paragraphs: [] }
    } else if (block.type === 'paragraph') {
      if (!current) current = { type: 'content', heading: null, paragraphs: [] }
      current.paragraphs.push(block.text)
    } else if (block.type === 'code') {
      flush()
      cards.push({ type: 'code', heading: block.filename, code: block })
    } else if (block.type === 'tip') {
      flush()
      cards.push({ type: 'tip', tip: block })
    }
  }
  flush()

  cards.push({ type: 'end', lessonId: lesson.id })

  return cards.map((card, index) => ({
    ...card,
    index,
    script: scripts[lesson.id]?.[index] ?? fallbackScript(card, lesson),
  }))
}

export function getCardsForLesson(lessonId) {
  const lesson = getLessonById(lessonId)
  if (!lesson) return null
  return { lesson, cards: buildCards(lesson) }
}

// 카드별 음성 클립 경로 (public/media 아래에 lessonId/card-index.mp3 로 저장)
export function mediaPath(lessonId, index) {
  return `/media/${lessonId}/card-${index}.mp3`
}
