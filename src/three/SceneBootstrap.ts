import * as THREE from 'three'

export interface SceneContext {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
}

/** 每帧回调：dt 为距上一帧的秒数，elapsed 为累计秒数 */
export type FrameLoop = (dt: number, elapsed: number) => void

export interface SceneHandle {
  ctx: SceneContext
  setLoop(loop: FrameLoop | null): void
  start(): void
  stop(): void
  dispose(): void
}

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}

/**
 * 创建一套 Scene/Camera/Renderer 并接管 resize 与 rAF。
 * 返回 null 表示当前环境无 WebGL —— 调用方应降级为提示，不影响文档阅读。
 */
export function bootstrapScene(container: HTMLElement): SceneHandle | null {
  if (!isWebGLAvailable()) return null

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true })
  } catch {
    return null
  }

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x10141a)
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, 1.2, 4)
  camera.lookAt(0, 0, 0)

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  let loop: FrameLoop | null = null
  let rafId = 0
  let running = false
  let disposed = false
  let last = performance.now()
  let elapsed = 0
  // 容器是否有可用尺寸；为 0 时跳过渲染，避免 aspect 变成 NaN
  let hasSize = false

  const resize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    // 异常链路：容器被折叠/未布局时宽高为 0，此时绝不动 camera.aspect
    if (width === 0 || height === 0) {
      hasSize = false
      return
    }
    hasSize = true
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const observer = new ResizeObserver(resize)
  observer.observe(container)
  resize()

  const tick = (now: number) => {
    if (!running) return
    rafId = requestAnimationFrame(tick)
    const dt = Math.min((now - last) / 1000, 0.1) // 截断长帧，切后台回来不跳变
    last = now
    elapsed += dt
    if (!hasSize) return
    loop?.(dt, elapsed)
    renderer.render(scene, camera)
  }

  const start = () => {
    if (running || disposed) return
    running = true
    last = performance.now()
    rafId = requestAnimationFrame(tick)
  }

  const stop = () => {
    running = false
    cancelAnimationFrame(rafId)
  }

  const dispose = () => {
    if (disposed) return
    disposed = true
    stop()
    observer.disconnect()
    loop = null
    // 遍历释放 GPU 资源；材质可能被多个 Mesh 共享，重复 dispose 无副作用
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
        for (const material of materials) material.dispose()
      }
    })
    renderer.dispose()
    // 快速切章时旧 context 不会等 GC，立即归还 WebGL context 配额
    renderer.forceContextLoss()
    renderer.domElement.remove()
  }

  return {
    ctx: { scene, camera, renderer },
    setLoop: (next) => {
      loop = next
    },
    start,
    stop,
    dispose,
  }
}
