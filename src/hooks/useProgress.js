import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'codelab-progress'

const defaultProgress = {
  completedLessons: [],
  quizScores: {},
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress
    const parsed = JSON.parse(raw)
    return {
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      quizScores:
        parsed.quizScores && typeof parsed.quizScores === 'object'
          ? parsed.quizScores
          : {},
    }
  } catch {
    return defaultProgress
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // 저장 공간이 차단된 환경에서는 조용히 무시
    }
  }, [progress])

  const isLessonCompleted = useCallback(
    (lessonId) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons],
  )

  const toggleLessonComplete = useCallback((lessonId) => {
    setProgress((prev) => {
      const isDone = prev.completedLessons.includes(lessonId)
      return {
        ...prev,
        completedLessons: isDone
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId],
      }
    })
  }, [])

  const saveQuizScore = useCallback((chapterId, score) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [chapterId]: score },
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
  }, [])

  return {
    progress,
    isLessonCompleted,
    toggleLessonComplete,
    saveQuizScore,
    resetProgress,
  }
}
