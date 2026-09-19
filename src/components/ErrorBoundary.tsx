import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

// 练习异常隔离：单个练习抛错只替换练习区，不影响文档与切章。
// 使用处带 key={章节 id}，切章时整体重建，错误状态自动重置。
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="exercise-canvas exercise-fallback">
          练习渲染出错：{this.state.error.message}。切换章节即可恢复，文档不受影响。
        </div>
      )
    }
    return this.props.children
  }
}
