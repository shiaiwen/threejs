/**
 * 练习 3：灯光与 MeshStandardMaterial
 * 对应章节：ch03 灯光 —— 开关灯光，对比受光材质与不受光材质
 */
import { useCallback, useRef, useState } from 'react'
import * as THREE from 'three'
import { ExerciseCanvas, type ExerciseProps } from './ExerciseCanvas'
import type { ExerciseSetup } from './useExerciseScene'

interface LightConfig {
  ambient: boolean
  directional: boolean
}

export default function LightingStandard({ onFirstFrame }: ExerciseProps) {
  // 关键取舍：React 只保存配置（按钮 UI 状态），Three 每帧从 ref 读取；
  // 切换灯光不重建场景、不在 rAF 里 setState。
  const [config, setConfig] = useState<LightConfig>({ ambient: true, directional: true })
  const configRef = useRef(config)

  const setup = useCallback<ExerciseSetup>((ctx) => {
    const basic = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 48, 24),
      new THREE.MeshBasicMaterial({ color: 0x8ec07c }), // 不受光：任何灯光下都是纯色
    )
    basic.position.x = -1.4
    const standard = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 48, 24),
      new THREE.MeshStandardMaterial({ color: 0x8ec07c, roughness: 0.35 }), // 受光
    )
    standard.position.x = 1.4
    ctx.scene.add(basic, standard)

    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    const directional = new THREE.DirectionalLight(0xffffff, 1.5)
    directional.position.set(2, 4, 3)
    ctx.scene.add(ambient, directional)

    return (dt) => {
      ambient.visible = configRef.current.ambient
      directional.visible = configRef.current.directional
      basic.rotation.y += dt * 0.5
      standard.rotation.y += dt * 0.5
    }
  }, [])

  const toggle = (key: keyof LightConfig) => {
    const next = { ...configRef.current, [key]: !configRef.current[key] }
    configRef.current = next
    setConfig(next)
  }

  return (
    <div>
      <div className="exercise-controls">
        <button onClick={() => toggle('ambient')}>
          环境光：{config.ambient ? '开' : '关'}
        </button>
        <button onClick={() => toggle('directional')}>
          平行光：{config.directional ? '开' : '关'}
        </button>
      </div>
      <ExerciseCanvas setup={setup} onFirstFrame={onFirstFrame} />
      <p className="exercise-note">左：MeshBasicMaterial（不受光） / 右：MeshStandardMaterial（受光）</p>
    </div>
  )
}
