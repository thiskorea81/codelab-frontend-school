import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getQuizByChapterId } from '../data/quizzes.js'
import { useProgress } from '../hooks/useProgress.js'

const OPTION_KEYS = ['A', 'B', 'C', 'D']

function getScoreMessage(ratio, passMessage) {
  if (ratio === 1) return '완벽해요! 만점입니다.'
  if (ratio >= 0.75) return '훌륭합니다! 거의 다 왔어요.'
  if (ratio >= 0.5) return '절반 이상 맞혔습니다. 복습하면 더 좋아질 거예요.'
  return '아쉬워요. 강의를 다시 보고 도전해 보세요.'
}

export default function Quiz() {
  const { chapterId } = useParams()
  const quiz = getQuizByChapterId(chapterId)
  const { progress, saveQuizScore } = useProgress()
  const [answers, setAnswers] = useState({})
  const [bestScore, setBestScore] = useState(
    () => progress.quizScores[chapterId],
  )
  const [saved, setSaved] = useState(false)

  if (!quiz) {
    return (
      <div className="page">
        <div className="container">
          <div className="notice-box">
            <h2>퀴즈를 찾을 수 없습니다</h2>
            <p>챕터({chapterId})의 퀴즈가 존재하지 않아요.</p>
            <Link to="/curriculum" className="btn btn-primary">
              커리큘럼으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const total = quiz.questions.length
  const answeredCount = Object.keys(answers).length
  const isFinished = answeredCount === total
  const correctCount = quiz.questions.reduce(
    (acc, q, i) => (answers[i] === q.answerIndex ? acc + 1 : acc),
    0,
  )

  const handleSelect = (questionIndex, optionIndex) => {
    if (answers[questionIndex] !== undefined) return
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }))
    setSaved(false)

    // 모든 문제를 방금 풀었으면 점수 저장
    const willBeAnswered = Object.keys(answers).length + 1
    if (willBeAnswered === total) {
      const score = quiz.questions.reduce(
        (acc, q, i) =>
          (i === questionIndex ? optionIndex : answers[i]) === q.answerIndex
            ? acc + 1
            : acc,
        0,
      )
      const prevBest = progress.quizScores[chapterId]
      const newBest = typeof prevBest === 'number' ? Math.max(prevBest, score) : score
      saveQuizScore(chapterId, score)
      setBestScore(newBest)
      setSaved(true)
    }
  }

  const handleRetry = () => {
    setAnswers({})
    setSaved(false)
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <span className="eyebrow">QUIZ</span>
          <h1>{quiz.title}</h1>
          <p>
            객관식 {total}문제 · 문제를 고르면 바로 정답과 해설을 확인할 수 있어요.
          </p>
        </header>

        {typeof bestScore === 'number' && (
          <div className="card" style={{ marginBottom: 24 }}>
            <p style={{ margin: 0 }}>
              🏆 이 챕터 최고 점수: <strong>{bestScore}</strong> / {total}
              {saved && <span className="muted"> · 방금 푼 점수도 저장했습니다</span>}
            </p>
          </div>
        )}

        {!isFinished && (
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="progress-label">
              <span>푼 문제</span>
              <span>
                {answeredCount}/{total}
              </span>
            </div>
            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${(answeredCount / total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {isFinished ? (
          <div className="card quiz-result">
            <span className="chip chip-gradient">채점 완료</span>
            <div className="quiz-score">
              <span className="gradient-text">{correctCount}</span> / {total}
            </div>
            <p>
              {getScoreMessage(correctCount / total, quiz.passMessage)}{' '}
              {quiz.passMessage}
            </p>
            {typeof bestScore === 'number' && (
              <p className="muted">이 챕터 최고 점수: {bestScore}점</p>
            )}
            <div
              className="hero-actions"
              style={{ marginTop: 20 }}
            >
              <button type="button" className="btn btn-primary" onClick={handleRetry}>
                다시 풀기
              </button>
              <Link to="/curriculum" className="btn btn-ghost">
                커리큘럼으로 돌아가기
              </Link>
            </div>
          </div>
        ) : (
          quiz.questions.map((q, qIndex) => {
            const selected = answers[qIndex]
            const isAnswered = selected !== undefined

            return (
              <div key={qIndex} className="card quiz-card">
                <p className="quiz-question">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="quiz-options">
                  {q.options.map((option, oIndex) => {
                    let stateClass = ''
                    if (isAnswered) {
                      if (oIndex === q.answerIndex) {
                        stateClass = 'correct'
                      } else if (oIndex === selected) {
                        stateClass = 'wrong'
                      } else {
                        stateClass = 'dimmed'
                      }
                    }
                    return (
                      <button
                        key={oIndex}
                        type="button"
                        className={`quiz-option ${stateClass}`}
                        disabled={isAnswered}
                        onClick={() => handleSelect(qIndex, oIndex)}
                      >
                        <span className="option-key">{OPTION_KEYS[oIndex]}</span>
                        <span>{option}</span>
                      </button>
                    )
                  })}
                </div>
                {isAnswered && (
                  <div className="quiz-explain">
                    <strong>
                      {selected === q.answerIndex ? '✅ 정답입니다!' : '❌ 아쉽네요.'}
                    </strong>{' '}
                    {q.explanation}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
