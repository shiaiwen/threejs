/**
 * 练习 5：React 集成注意事项
 * 对应章节：ch05 React 使用注意 —— StrictMode 双挂载、完整 dispose、rAF 内不 setState
 */
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { ExerciseCanvas, type ExerciseProps } from './ExerciseCanvas'
import type { ExerciseSetup } from './useExerciseScene'

// 模块级计数器：跨 StrictMode 双挂载、跨切章累计本练习被挂载的次数
let mountCounter = 0

const setup: ExerciseSetup = (ctx) => {
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.9, 0.3, 24, 64),
    new THREE.MeshNormalMaterial(),
  )
  ctx.scene.add(torus)
  return (dt) => {
    torus.rotation.x += dt * 0.6
    torus.rotation.y += dt * 0.9
  }
}

export default function ReactNotesExercise({ onFirstFrame }: ExerciseProps) {
  const [mountCount, setMountCount] = useState(mountCounter)

  useEffect(() => {
    // 只在挂载时 setState 一次（StrictMode 开发环境下会看到 +2），渲染循环里绝不 setState
    mountCounter += 1
    setMountCount(mountCounter)
    return () => {
      // cleanup 由 useExerciseScene 统一完成：停 rAF、断 observer、释放 GPU 资源
    }
  }, [])

  return (
    <div>
      <p className="exercise-note">
        本练习已挂载 {mountCount} 次（开发环境 StrictMode 下每次进入 +2）。
        把练习滚出视口或点击「折叠练习」，渲染循环即停止。
      </p>
      <ExerciseCanvas setup={setup} onFirstFrame={onFirstFrame} />
    </div>
  )
}
