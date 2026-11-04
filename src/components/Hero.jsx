import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.js'
import { totalLessonCount } from '../data/lectures.js'

export default function Hero() {
  const { progress } = useProgress()
  const completed = progress.completedLessons.length
  const percent = Math.round((completed / totalLessonCount) * 100)

  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="container hero-inner">
        <span className="chip chip-gradient hero-badge">HTML · CSS · JavaScript · Node.js</span>
        <h1>
          <span className="gradient-text">CodeLab</span> — 프론트엔드 스쿨
        </h1>
        <p className="tagline">웹 개발, 여기서 시작</p>
        <p className="sub">
          태그 하나부터 시작해서 직접 만든 API를 화면에 연결하는 순간까지. 실전 코드
          예제와 플레이그라운드, 챕터별 퀴즈와 함께 차근차근 배우는 한국어 풀스택 입문
          강의입니다.
        </p>
        <div className="hero-actions">
          <Link to="/curriculum" className="btn btn-primary">
            커리큘럼 시작하기
          </Link>
          <Link to="/playground" className="btn btn-ghost">
            코드 플레이그라운드
          </Link>
        </div>

        {completed > 0 && (
          <div className="hero-progress">
            <div className="progress-label">
              <span>나의 학습 진도</span>
              <span>
                {completed}/{totalLessonCount} 강의 완료 · {percent}%
              </span>
            </div>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
