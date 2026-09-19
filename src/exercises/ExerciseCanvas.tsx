import { useExerciseScene, type ExerciseSetup } from './useExerciseScene'

export interface ExerciseProps {
  /** 练习首次真正渲染出画面时回调（用于记录「已练习」） */
  onFirstFrame?: () => void
}

/** 练习画布容器：处理 WebGL 降级提示与固定高度容器 */
export function ExerciseCanvas({ setup, onFirstFrame }: ExerciseProps & { setup: ExerciseSetup }) {
  const { containerRef, webglError } = useExerciseScene(setup, onFirstFrame)
  if (webglError) {
    return (
      <div className="exercise-canvas exercise-fallback">
        当前环境不支持 WebGL，练习无法渲染；文档不受影响，可继续阅读。
      </div>
    )
  }
  return <div ref={containerRef} className="exercise-canvas" />
}
