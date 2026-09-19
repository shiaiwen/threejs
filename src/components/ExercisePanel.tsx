import { useState } from 'react'
import type { ChapterEntry } from '../chapters'
import { ErrorBoundary } from './ErrorBoundary'

interface Props {
  chapter: ChapterEntry
  onPracticed: (id: string) => void
}

export function ExercisePanel({ chapter, onPracticed }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const { Exercise } = chapter
  return (
    <section className="exercise-panel">
      <header className="exercise-header">
        <h2>练习 · {chapter.title}</h2>
        <button className="ghost-button" onClick={() => setCollapsed((v) => !v)}>
          {collapsed ? '展开练习' : '折叠练习'}
        </button>
      </header>
      {collapsed ? (
        <p className="exercise-note">练习已折叠，渲染循环已停止。</p>
      ) : (
        // key=章节 id：切章时整体卸载旧练习（含 ErrorBoundary），
        // 保证同一时刻只挂载一个 WebGLRenderer，快速连点切章也不泄漏 canvas。
        <ErrorBoundary key={chapter.id}>
          <Exercise onFirstFrame={() => onPracticed(chapter.id)} />
        </ErrorBoundary>
      )}
    </section>
  )
}
