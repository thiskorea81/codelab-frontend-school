import { Link, useParams } from 'react-router-dom'
import { getAdjacentLessons, getLessonById } from '../data/lectures.js'
import { useProgress } from '../hooks/useProgress.js'
import CodeBlock from './CodeBlock.jsx'

function ContentBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2>{block.text}</h2>
    case 'code':
      return (
        <CodeBlock
          language={block.language}
          filename={block.filename}
          code={block.code}
        />
      )
    case 'tip':
      return (
        <div className="tip-box">
          <span className="tip-icon">💡</span>
          <div>
            <strong>{block.title}</strong>
            <p>{block.text}</p>
          </div>
        </div>
      )
    case 'paragraph':
    default:
      return <p>{block.text}</p>
  }
}

export default function LessonView() {
  const { lessonId } = useParams()
  const lesson = getLessonById(lessonId)
  const { isLessonCompleted, toggleLessonComplete } = useProgress()

  if (!lesson) {
    return (
      <div className="page">
        <div className="container">
          <div className="notice-box">
            <h2>강의를 찾을 수 없습니다</h2>
            <p>요청하신 강의({lessonId})가 존재하지 않아요.</p>
            <Link to="/curriculum" className="btn btn-primary">
              커리큘럼으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { prev, next } = getAdjacentLessons(lesson.id)
  const completed = isLessonCompleted(lesson.id)

  return (
    <div className="page">
      <div className="container">
        <div className="lesson-meta">
          <Link to="/curriculum" className="chip">
            ← 커리큘럼
          </Link>
          <Link to={`/video/${lesson.id}`} className="chip chip-gradient">
            ▶ 영상으로 보기
          </Link>
          <span className="chip chip-gradient">
            챕터 {lesson.chapterNumber} · {lesson.chapterTitle}
          </span>
          <span className="chip">⏱ 약 {lesson.duration}분</span>
        </div>

        <h1 className="lesson-title">{lesson.title}</h1>
        <p className="lesson-summary">{lesson.summary}</p>

        <div className="lesson-body">
          {lesson.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>

        <div className="lesson-complete-box">
          <p>
            {completed
              ? '이 강의를 완료로 표시했습니다. 수고하셨어요!'
              : '강의를 끝까지 보셨다면 완료로 표시해 진도를 기록하세요.'}
          </p>
          <button
            type="button"
            className={`btn ${completed ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => toggleLessonComplete(lesson.id)}
          >
            {completed ? '완료 취소' : '✓ 완료로 표시'}
          </button>
        </div>

        <nav className="lesson-nav">
          {prev ? (
            <Link to={`/lesson/${prev.id}`} className="btn btn-ghost">
              ← 이전 강의: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/lesson/${next.id}`} className="btn btn-primary next">
              다음 강의: {next.title} →
            </Link>
          ) : (
            <Link to="/curriculum" className="btn btn-ghost next">
              커리큘럼으로 돌아가기 →
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}
