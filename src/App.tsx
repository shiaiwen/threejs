import { useEffect, useMemo, useState } from 'react'
import { chapters } from './chapters'
import { DocView } from './components/DocView'
import { ExercisePanel } from './components/ExercisePanel'
import { Sidebar } from './components/Sidebar'
import { loadLearningState, saveLearningState, type LearningState } from './state/learningState'

export default function App() {
  const validIds = useMemo(() => chapters.map((c) => c.id), [])
  // 懒初始化：刷新后从 localStorage 恢复上次章节；数据损坏时回退第 1 章
  const [state, setState] = useState<LearningState>(() => loadLearningState(validIds))

  useEffect(() => {
    saveLearningState(state)
  }, [state])

  // 当前章节被打开即记为「已读」（含首次进入与刷新恢复）
  useEffect(() => {
    setState((prev) =>
      prev.read.includes(prev.currentChapter)
        ? prev
        : { ...prev, read: [...prev.read, prev.currentChapter] },
    )
  }, [state.currentChapter])

  const selectChapter = (id: string) => {
    setState((prev) => ({ ...prev, currentChapter: id }))
  }

  const markPracticed = (id: string) => {
    setState((prev) =>
      prev.practiced.includes(id) ? prev : { ...prev, practiced: [...prev.practiced, id] },
    )
  }

  const chapter = chapters.find((c) => c.id === state.currentChapter) ?? chapters[0]

  return (
    <div className="app">
      <Sidebar chapters={chapters} state={state} onSelect={selectChapter} />
      <main className="main">
        {/* 文档与练习由同一份章节注册表驱动，切章天然联动 */}
        <DocView chapter={chapter} />
        <ExercisePanel chapter={chapter} onPracticed={markPracticed} />
      </main>
    </div>
  )
}
