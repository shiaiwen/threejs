import type { ChapterEntry } from '../chapters'
import type { LearningState } from '../state/learningState'

interface Props {
  chapters: ChapterEntry[]
  state: LearningState
  onSelect: (id: string) => void
}

export function Sidebar({ chapters, state, onSelect }: Props) {
  return (
    <nav className="sidebar">
      <h1 className="sidebar-title">Three.js 学习</h1>
      <ol className="chapter-list">
        {chapters.map((chapter, i) => {
          const status = state.practiced.includes(chapter.id)
            ? 'practiced'
            : state.read.includes(chapter.id)
              ? 'read'
              : 'unread'
          const active = chapter.id === state.currentChapter
          return (
            <li key={chapter.id}>
              <button
                className={`chapter-link${active ? ' active' : ''}`}
                onClick={() => onSelect(chapter.id)}
              >
                <span className={`status-dot status-${status}`} aria-hidden />
                <span>
                  {i + 1}. {chapter.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <p className="legend">
        <span>
          <i className="status-dot status-unread" /> 未读
        </span>
        <span>
          <i className="status-dot status-read" /> 已读
        </span>
        <span>
          <i className="status-dot status-practiced" /> 已练习
        </span>
      </p>
    </nav>
  )
}
