import { useEffect, useRef, useState } from 'react'
import { bootstrapScene, type FrameLoop, type SceneContext } from '../three/SceneBootstrap'

/** 练习的初始化函数：往场景里放东西，返回每帧更新回调（可选） */
export type ExerciseSetup = (ctx: SceneContext) => FrameLoop | void

/**
 * 练习通用骨架。关键取舍：
 * - React 只负责挂载/卸载与可见性，动画状态全部留在 Three 侧，rAF 内零 setState；
 * - IntersectionObserver：练习滚出视口（或折叠 display:none）时停 rAF，不空转吃 CPU；
 * - cleanup 完整 dispose，StrictMode 双调用下也不会泄漏 canvas / WebGL context。
 */
export function useExerciseScene(setup: ExerciseSetup, onFirstFrame?: () => void) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [webglError, setWebglError] = useState(false)
  // 用 ref 持有最新回调，effect 只跑一次，避免重建场景
  const setupRef = useRef(setup)
  setupRef.current = setup
  const firstFrameRef = useRef(onFirstFrame)
  firstFrameRef.current = onFirstFrame

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handle = bootstrapScene(container)
    if (!handle) {
      // 无 WebGL：只降级练习区，文档照常可读
      setWebglError(true)
      return
    }

    const loop = setupRef.current(handle.ctx)
    let reported = false
    handle.setLoop((dt, elapsed) => {
      loop?.(dt, elapsed)
      if (!reported) {
        reported = true
        firstFrameRef.current?.() // 首次真实渲染 → 记为「已练习」
      }
    })

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) handle.start()
        else handle.stop()
      }
    })
    io.observe(container)

    return () => {
      io.disconnect()
      handle.dispose()
    }
  }, [])

  return { containerRef, webglError }
}
