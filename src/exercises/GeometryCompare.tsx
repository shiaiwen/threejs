/**
 * 练习 2：几何体对照
 * 对应章节：ch02 几何与材质 —— 内置 BufferGeometry 形态差异、共享材质
 */
import * as THREE from 'three'
import { ExerciseCanvas, type ExerciseProps } from './ExerciseCanvas'
import type { ExerciseSetup } from './useExerciseScene'

const setup: ExerciseSetup = (ctx) => {
  ctx.camera.position.set(0, 1.4, 6)
  ctx.camera.lookAt(0, 0, 0)

  const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.7, 32, 16),
    new THREE.ConeGeometry(0.7, 1.4, 32),
    new THREE.TorusKnotGeometry(0.45, 0.15, 96, 16),
  ]
  // 四个几何体共享同一个材质，便于对照「形态」而非「质感」差异
  const material = new THREE.MeshStandardMaterial({
    color: 0x6ea8fe,
    roughness: 0.4,
    metalness: 0.1,
  })
  const meshes = geometries.map((geometry, i) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (i - 1.5) * 1.8
    ctx.scene.add(mesh)
    return mesh
  })

  ctx.scene.add(new THREE.AmbientLight(0xffffff, 0.4))
  const directional = new THREE.DirectionalLight(0xffffff, 1.2)
  directional.position.set(3, 5, 4)
  ctx.scene.add(directional)

  return (dt) => {
    for (const mesh of meshes) mesh.rotation.y += dt * 0.6
  }
}

export default function GeometryCompare({ onFirstFrame }: ExerciseProps) {
  return <ExerciseCanvas setup={setup} onFirstFrame={onFirstFrame} />
}
