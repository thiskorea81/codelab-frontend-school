import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getCardsForLesson, mediaPath } from '../data/videoData.js'
import { getAdjacentLessons } from '../data/lectures.js'
import { useProgress } from '../hooks/useProgress.js'
import CodeBlock from './CodeBlock.jsx'

const RATES = [0.75, 1, 1.25, 1.5]

function readLabDone(lessonId, index) {
  try {
    return localStorage.getItem(`codelab-lab|${lessonId}|${index}`) === '1'
  } catch {
    return false
  }
}

// 코드 카드 → 플레이그라운드 따라하기 링크
function buildLabUrl(lesson, card) {
  const params = new URLSearchParams()
  const lang = card.code.language
  if (lang === 'html' || lang === 'css' || lang === 'javascript') {
    params.set(lang, card.code.code)
  } else {
    return null
  }
  params.set('mission', `${lesson.title} — ${card.heading}`)
  params.set('video', lesson.id)
  params.set('card', String(card.index))
  return `/playground?${params.toString()}`
}

export default function VideoLesson() {
  const { lessonId } = useParams()
  const [searchParams] = useSearchParams()
  const data = useMemo(() => getCardsForLesson(lessonId), [lessonId])
  const { isLessonCompleted, toggleLessonComplete } = useProgress()

  const startCard = Math.max(0, Number(searchParams.get('card')) || 0)
  const [index, setIndex] = useState(startCard)
  const [playing, setPlaying] = useState(false)
  const [rate, setRate] = useState(1)
  const [showCaption, setShowCaption] = useState(true)
  const [voiceMode, setVoiceMode] = useState('audio') // audio | tts | timer
  const [labDone, setLabDone] = useState({})

  const audioRef = useRef(null)
  const timerRef = useRef(null)

  const lesson = data?.lesson
  const cards = data?.cards
  const card = cards?.[Math.min(index, cards.length - 1)]
  const completed = lesson ? isLessonCompleted(lesson.id) : false

  // 강의 전환 시 첫 카드부터 시작
  useEffect(() => {
    setIndex(startCard)
    setPlaying(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId])

  // 실습 완료 표시 동기화
  useEffect(() => {
    if (!lesson || !cards) return
    const map = {}
    cards.forEach((c) => {
      if (c.type === 'code') map[c.index] = readLabDone(lesson.id, c.index)
    })
    setLabDone(map)
  }, [lesson, cards])

  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.removeAttribute('src')
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const advance = useCallback(() => {
    setIndex((prev) => {
      if (prev >= cards.length - 1) {
        setPlaying(false)
        return prev
      }
      return prev + 1
    })
  }, [cards])

  const speakWithTts = useCallback(
    (target) => {
      if (!window.speechSynthesis) {
        setVoiceMode('timer')
        timerRef.current = setTimeout(() => {
          if (playing) advance()
        }, 6000)
        return
      }
      setVoiceMode('tts')
      const utter = new SpeechSynthesisUtterance(target.script)
      utter.lang = 'ko-KR'
      utter.rate = rate
      utter.onend = () => {
        if (playing) advance()
      }
      window.speechSynthesis.speak(utter)
    },
    [advance, playing, rate],
  )

  const speakCard = useCallback(
    (target) => {
      stopAll()
      const audio = audioRef.current
      if (voiceMode !== 'timer' && audio) {
        audio.src = mediaPath(lesson.id, target.index)
        audio.playbackRate = rate
        const tryPlay = audio.play()
        if (tryPlay) {
          tryPlay.catch(() => speakWithTts(target))
        }
      } else {
        speakWithTts(target)
      }
    },
    [lesson, rate, speakWithTts, stopAll, voiceMode],
  )

  // 재생 상태 / 카드 전환 / 속도 변경 시 음성 제어
  useEffect(() => {
    if (!card) return
    if (playing) {
      speakCard(card)
    } else {
      stopAll()
    }
    return stopAll
  }, [card, playing, rate, speakCard, stopAll])

  // 언마운트 시 정리
  useEffect(() => stopAll, [stopAll])

  const goTo = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(cards.length - 1, next))
      setIndex(clamped)
    },
    [cards],
  )

  // 키보드 단축키
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return
      if (e.key === 'ArrowRight') goTo(index + 1)
      else if (e.key === 'ArrowLeft') goTo(index - 1)
      else if (e.key === ' ') {
        e.preventDefault()
        setPlaying((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, index])

  const onAudioEnded = useCallback(() => {
    if (playing) advance()
  }, [advance, playing])

  const onAudioError = useCallback(() => {
    // mp3 클립이 아직 없으면 브라우저 음성으로 폴드백
    if (card) speakWithTts(card)
  }, [card, speakWithTts])

  if (!data) {
    return (
      <div className="page">
        <div className="container">
          <div className="notice-box">
            <h2>강의를 찾을 수 없습니다</h2>
            <p>요청하신 영상 강의({lessonId})가 존재하지 않아요.</p>
            <Link to="/curriculum" className="btn btn-primary">
              커리큘럼으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { next } = getAdjacentLessons(lesson.id)
  const progress = ((index + 1) / cards.length) * 100

  return (
    <div className="video-shell">
      <audio
        ref={audioRef}
        onEnded={onAudioEnded}
        onError={onAudioError}
        preload="auto"
      />

      <div className="video-topbar">
        <Link to={`/lesson/${lesson.id}`} className="chip">
          ← 텍스트 강의
        </Link>
        <div className="video-topbar-title">
          <span className="eyebrow">VIDEO LESSON</span>
          <strong>{lesson.title}</strong>
        </div>
        <span className="chip">
          {index + 1} / {cards.length}
        </span>
      </div>

      <div className="video-stage">
        {card.type === 'cover' && (
          <div className="vcard vcard-cover">
            <span className="chip chip-gradient">영상 강의</span>
            <h1>{card.title}</h1>
            <p className="vcard-sub">{card.subtitle}</p>
            <span className="chip">⏱ 약 {card.duration}분</span>
          </div>
        )}

        {card.type === 'content' && (
          <div className="vcard">
            {card.heading && <h2 className="vcard-heading">{card.heading}</h2>}
            {card.paragraphs.map((text, i) => (
              <p key={i} className="vcard-paragraph">
                {text}
              </p>
            ))}
          </div>
        )}

        {card.type === 'code' && (
          <div className="vcard vcard-code">
            <div className="vcard-code-head">
              <h2 className="vcard-heading">{card.heading}</h2>
              <div className="vcard-code-actions">
                {labDone[card.index] && <span className="chip">✓ 실습 완료</span>}
                {buildLabUrl(lesson, card) && (
                  <Link to={buildLabUrl(lesson, card)} className="btn btn-primary btn-sm">
                    ✏️ 이 코드 따라하기
                  </Link>
                )}
              </div>
            </div>
            <CodeBlock
              language={card.code.language}
              filename={card.code.filename}
              code={card.code.code}
            />
          </div>
        )}

        {card.type === 'tip' && (
          <div className="vcard vcard-tip">
            <div className="tip-box">
              <span className="tip-icon">💡</span>
              <div>
                <strong>{card.tip.title}</strong>
                <p>{card.tip.text}</p>
              </div>
            </div>
          </div>
        )}

        {card.type === 'end' && (
          <div className="vcard vcard-cover">
            <span className="chip chip-gradient">강의 완료</span>
            <h1>수고하셨어요!</h1>
            <p className="vcard-sub">
              "{lesson.title}" 영상 강의를 모두 시청했어요. 완료로 표시하고 퀴즈로
              배운 내용을 점검해 보세요.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className={`btn ${completed ? 'btn-ghost' : 'btn-primary'}`}
                onClick={() => toggleLessonComplete(lesson.id)}
              >
                {completed ? '완료 취소' : '✓ 완료로 표시'}
              </button>
              <Link to={`/quiz/${lesson.chapterId}`} className="btn btn-ghost">
                퀴즈 풀기
              </Link>
              {next && (
                <Link to={`/video/${next.id}`} className="btn btn-ghost">
                  다음 영상 강의 →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {showCaption && card.script && (
        <div className="video-caption">
          <span className="video-caption-label">자막</span>
          <p>{card.script}</p>
        </div>
      )}

      <div className="video-controls">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
        >
          ← 이전
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? '⏸ 일시정지' : '▶ 재생'}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => goTo(index + 1)}
          disabled={index === cards.length - 1}
        >
          다음 →
        </button>

        <div
          className="video-progress"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = (e.clientX - rect.left) / rect.width
            goTo(Math.round(ratio * (cards.length - 1)))
          }}
        >
          <div className="video-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <select
          className="video-rate"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          aria-label="재생 속도"
        >
          {RATES.map((r) => (
            <option key={r} value={r}>
              {r}x
            </option>
          ))}
        </select>

        <button
          type="button"
          className={`btn btn-sm ${showCaption ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setShowCaption((s) => !s)}
        >
          자막
        </button>

        {voiceMode === 'tts' && <span className="chip">브라우저 음성</span>}
        {voiceMode === 'timer' && <span className="chip">자막 모드</span>}
      </div>
    </div>
  )
}
