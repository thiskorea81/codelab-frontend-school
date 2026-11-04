import { NavLink } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.js'
import { totalLessonCount } from '../data/lectures.js'

export default function Navbar() {
  const { progress } = useProgress()
  const percent = Math.round(
    (progress.completedLessons.length / totalLessonCount) * 100,
  )

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="gradient-text">CodeLab</span>
          <span className="logo-sub">프론트엔드 스쿨</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/curriculum">커리큘럼</NavLink>
          <NavLink to="/playground">플레이그라운드</NavLink>
          <NavLink to="/garmin">가민 기록</NavLink>
        </nav>

        <div className="navbar-progress">
          <div className="progress">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <span>전체 진도 {percent}%</span>
        </div>
      </div>
    </header>
  )
}
