import { Link } from 'react-router-dom'
import { chapters, totalLessonCount } from '../data/lectures.js'
import { quizzes } from '../data/quizzes.js'
import { useProgress } from '../hooks/useProgress.js'
import ProgressBar from './ProgressBar.jsx'

export default function Curriculum() {
  const { progress, isLessonCompleted } = useProgress()
  const completedTotal = progress.completedLessons.length

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <span className="eyebrow">CURRICULUM</span>
          <h1>커리큘럼</h1>
          <p>{chapters.length}개 챕터, {totalLessonCount}개 강의로 완성하는 프론트엔드·백엔드 기초.</p>
        </header>

        <div className="card" style={{ marginBottom: 32 }}>
          <ProgressBar
            value={completedTotal}
            max={totalLessonCount}
            label="전체 진도"
          />
        </div>

        {chapters.map((chapter) => {
          const completedInChapter = chapter.lessons.filter((lesson) =>
            isLessonCompleted(lesson.id),
          ).length
          const quiz = quizzes[chapter.id]
          const bestScore = progress.quizScores[chapter.id]

          return (
            <section key={chapter.id} className="chapter-block">
              <div className="chapter-head">
                <div className="chapter-title">
                  <div className="chapter-number">{chapter.number}</div>
                  <div>
                    <h2>{chapter.title}</h2>
                    <p>{chapter.description}</p>
                  </div>
                </div>
                <div style={{ width: 220 }}>
                  <ProgressBar
                    value={completedInChapter}
                    max={chapter.lessons.length}
                    label="챕터 진도"
                  />
                </div>
              </div>

              <div className="lesson-list">
                {chapter.lessons.map((lesson, index) => {
                  const done = isLessonCompleted(lesson.id)
                  return (
                    <div key={lesson.id} className="lesson-row">
                      <div className={`lesson-check ${done ? 'done' : ''}`}>✓</div>
                      <div className="lesson-info">
                        <strong>
                          {index + 1}. {lesson.title}
                        </strong>
                        <span>
                          {lesson.duration}분 · {lesson.summary}
                        </span>
                      </div>
                      <div className="lesson-actions">
                        <Link
                          to={`/video/${lesson.id}`}
                          className="btn btn-ghost btn-sm"
                        >
                          ▶ 영상
                        </Link>
                        <Link
                          to={`/quiz/${chapter.id}`}
                          className="btn btn-ghost btn-sm"
                        >
                          퀴즈
                          {typeof bestScore === 'number' && ` (${bestScore}점)`}
                        </Link>
                        <Link
                          to={`/lesson/${lesson.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          {done ? '복습하기' : '강의 보기'}
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>

              {quiz && (
                <div style={{ marginTop: 14 }}>
                  <Link to={`/quiz/${chapter.id}`} className="btn btn-ghost btn-sm">
                    📝 {chapter.shortTitle} 챕터 퀴즈 바로가기 →
                  </Link>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
