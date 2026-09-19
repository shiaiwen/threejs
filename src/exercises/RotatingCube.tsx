/**
 * 练习 1：旋转立方体
 * 对应章节：ch01 核心概念 —— Scene / Camera / Renderer / 渲染循环
 */
import * as THREE from 'three'
import { ExerciseCanvas, type ExerciseProps } from './ExerciseCanvas'
import type { ExerciseSetup } from './useExerciseScene'

const setup: ExerciseSetup = (ctx) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    // MeshNormalMaterial 按法线着色，无需灯光即可看清立体感
    new THREE.MeshNormalMaterial(),
  )
  ctx.scene.add(cube)
  return (dt) => {
    cube.rotation.x += dt * 0.8
    cube.rotation.y += dt * 1.1
  }
}

export default function RotatingCube({ onFirstFrame }: ExerciseProps) {
  return <ExerciseCanvas setup={setup} onFirstFrame={onFirstFrame} />
}
