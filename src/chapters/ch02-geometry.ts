import type { Chapter } from './types'

export const geometryDoc: Chapter = {
  id: 'ch02-geometry',
  title: '几何与材质',
  sections: [
    {
      heading: 'BufferGeometry',
      paragraphs: [
        '所有几何体底层都是 BufferGeometry：顶点位置、法线、UV 以 TypedArray 存储，直接面向 GPU。',
        'Three 内置常用几何体：Box、Sphere、Cone、Cylinder、Torus、TorusKnot 等；分段数参数越高越圆滑，顶点也越多。',
      ],
    },
    {
      heading: '材质家族',
      paragraphs: [
        'MeshBasicMaterial 不参与光照计算，永远显示纯色，适合调试与 UI 元素。',
        'MeshStandardMaterial 是基于物理的材质（PBR），用 roughness / metalness 控制质感，必须有灯光才能看见。',
        'MeshNormalMaterial 把法线方向映射成颜色，不依赖灯光，常用于观察几何体结构。',
      ],
    },
    {
      heading: '右侧练习',
      paragraphs: [
        '四个常用几何体并排展示，共享同一个 MeshStandardMaterial，便于对照「形态」差异。',
        '试着把其中一个换成 CylinderGeometry，或调低分段数，观察顶点密度对观感的影响。',
      ],
    },
  ],
}
