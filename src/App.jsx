import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LandingPage from './components/LandingPage.jsx'
import Curriculum from './components/Curriculum.jsx'
import LessonView from './components/LessonView.jsx'
import Playground from './components/Playground.jsx'
import Quiz from './components/Quiz.jsx'
import VideoLesson from './components/VideoLesson.jsx'
import DashboardPage from './garmin/DashboardPage.jsx'
import ConnectPage from './garmin/ConnectPage.jsx'
import ActivitiesPage from './garmin/ActivitiesPage.jsx'
import ActivityDetailPage from './garmin/ActivityDetailPage.jsx'
import CoursesPage from './garmin/CoursesPage.jsx'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/lesson/:lessonId" element={<LessonView />} />
          <Route path="/video/:lessonId" element={<VideoLesson />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/quiz/:chapterId" element={<Quiz />} />
          <Route path="/garmin" element={<DashboardPage />} />
          <Route path="/garmin/connect" element={<ConnectPage />} />
          <Route path="/garmin/activities" element={<ActivitiesPage />} />
          <Route path="/garmin/activities/:id" element={<ActivityDetailPage />} />
          <Route path="/garmin/courses" element={<CoursesPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
