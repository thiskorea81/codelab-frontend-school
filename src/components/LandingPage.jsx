import { Link } from 'react-router-dom'
import Hero from './Hero.jsx'
import { allLessons, chapters, totalLessonCount } from '../data/lectures.js'
import { useProgress } from '../hooks/useProgress.js'

const FEATURES = [
  {
    icon: '💻',
    title: '실전 코드 예제',
    text: '모든 강의에 실행 가능한 코드 예제와 짧은 한국어 주석이 달려 있어, 복붙 없이도 원리를 이해할 수 있어요.',
  },
  {
    icon: '📈',
    title: '진도 관리',
    text: '완료한 강의는 자동으로 기록돼요. 이어서 학습하기 버튼으로 바로 다음 강의부터 이어가세요.',
  },
  {
    icon: '📝',
    title: '챕터별 퀴즈',
    text: '챕터가 끝날 때마다 4문제 퀴즈로 배운 내용을 점검하고, 최고 점수는 브라우저에 저장돼요.',
  },
  {
    icon: '🚀',
    title: '코드 플레이그라운드',
    text: 'HTML·CSS·JS를 입력하면 0.5초 뒤 자동으로 실행되는 실시간 미리보기. 설치 없이 바로 실습해요.',
  },
]

export default function LandingPage() {
  const { progress, isLessonCompleted } = useProgress()
  const completedCount = progress.completedLessons.length

  // 이어서 학습할 강의: 첫 번째 미완료 강의, 모두 완료면 마지막 강의
  const nextLesson =
    allLessons.find((lesson) => !isLessonCompleted(lesson.id)) ||
    allLessons[allLessons.length - 1]

  return (
    <div>
      <Hero />

      {completedCount > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Link
              to={`/lesson/${nextLesson.id}`}
              className="btn btn-primary btn-block"
              style={{ padding: '18px 24px', fontSize: 16 }}
            >
              ▶ 이어서 학습하기: {nextLesson.title}
            </Link>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 className="section-title">이런 것을 배워요</h2>
          <p className="section-sub">
            책으로만 보는 강의가 아니라, 직접 써 보고 확인하는 실습 중심 커리큘럼입니다.
          </p>
          <div className="grid-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card card-hover">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <h2 className="section-title">커리큘럼 미리보기</h2>
          <p className="section-sub">
            {chapters.length}개 챕터 {totalLessonCount}개 강의로 끝내는 프론트엔드·백엔드 입문 로드맵입니다.
          </p>
          <div className="grid-4">
            {chapters.map((chapter) => {
              const done = chapter.lessons.filter((lesson) =>
                isLessonCompleted(lesson.id),
              ).length
              return (
                <div key={chapter.id} className="card card-hover">
                  <span className="chip chip-gradient">챕터 {chapter.number}</span>
                  <h3 style={{ marginTop: 14 }}>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                  <p style={{ marginTop: 12 }}>
                    {chapter.lessons.length}개 강의 · 완료 {done}개
                  </p>
                  <div className="progress" style={{ margin: '10px 0 16px' }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(done / chapter.lessons.length) * 100}%`,
                      }}
                    />
                  </div>
                  <Link to="/curriculum" className="btn btn-ghost btn-sm">
                    강의 목록 보기 →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '44px 28px' }}>
            <h2 className="section-title">지금 바로 시작해 보세요</h2>
            <p className="section-sub" style={{ marginBottom: 24 }}>
              가입 없이, 설치 없이. 브라우저에서 바로 배우는 프론트엔드.
            </p>
            <div className="hero-actions">
              <Link to={`/lesson/${allLessons[0].id}`} className="btn btn-primary">
                첫 강의 시작하기
              </Link>
              <Link to="/playground" className="btn btn-ghost">
                플레이그라운드 먼저 체험하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
