export interface LearningState {
  currentChapter: string
  read: string[]
  practiced: string[]
}

const STORAGE_KEY = 'threejs-learning:v1'

/** 读取学习状态；localStorage 损坏或章节 id 失效时回退第 1 章 */
export function loadLearningState(validIds: string[]): LearningState {
  const fallback: LearningState = { currentChapter: validIds[0], read: [], practiced: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return fallback
    const record = parsed as Record<string, unknown>
    const pickIds = (value: unknown): string[] =>
      Array.isArray(value)
        ? value.filter((x): x is string => typeof x === 'string' && validIds.includes(x))
        : []
    const currentChapter =
      typeof record.currentChapter === 'string' && validIds.includes(record.currentChapter)
        ? record.currentChapter
        : validIds[0]
    return {
      currentChapter,
      read: pickIds(record.read),
      practiced: pickIds(record.practiced),
    }
  } catch {
    return fallback
  }
}

export function saveLearningState(state: LearningState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // 隐私模式等写失败场景可忽略，不影响学习页使用
  }
}
