/**
 * 练习 4：变换与动画
 * 对应章节：ch04 变换与动画 —— position / rotation / scale 与基于时间的动画
 */
import * as THREE from 'three'
import { ExerciseCanvas, type ExerciseProps } from './ExerciseCanvas'
import type { ExerciseSetup } from './useExerciseScene'

const setup: ExerciseSetup = (ctx) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshNormalMaterial(),
  )
  ctx.scene.add(cube)
  ctx.scene.add(new THREE.GridHelper(6, 12, 0x2a3340, 0x1c232d))

  return (dt, elapsed) => {
    // 公转：用累计时间驱动，暂停恢复后不会跳变
    cube.position.set(Math.cos(elapsed * 0.9) * 1.8, 0.4, Math.sin(elapsed * 0.9) * 1.8)
    // 自转：用 dt 累加，速度单位是「弧度/秒」，与帧率无关
    cube.rotation.y += dt * 1.5
    // 呼吸缩放
    const s = 1 + Math.sin(elapsed * 2) * 0.25
    cube.scale.setScalar(s)
  }
}

export default function TransformAnimation({ onFirstFrame }: ExerciseProps) {
  return <ExerciseCanvas setup={setup} onFirstFrame={onFirstFrame} />
}
