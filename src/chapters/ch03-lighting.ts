import type { Chapter } from './types'

export const lightingDoc: Chapter = {
  id: 'ch03-lighting',
  title: '灯光',
  sections: [
    {
      heading: '常用灯光类型',
      paragraphs: [
        'AmbientLight 均匀照亮所有物体，没有方向，用来抬高暗部基础亮度。',
        'DirectionalLight 模拟太阳光，光线平行、有方向，是最常用的主光源。',
        'PointLight 从一点向四周发光并随距离衰减，适合灯泡、火把等局部光源。',
      ],
    },
    {
      heading: '材质如何受光',
      paragraphs: [
        '只有参与光照计算的材质（Standard / Lambert / Phong）才会被灯光影响；Basic 材质在任何灯光下都不变。',
        'MeshStandardMaterial 的 roughness 越低高光越集中；metalness 越高漫反射越弱、反射越强。',
      ],
    },
    {
      heading: '右侧练习',
      paragraphs: [
        '左右两个球：左边 Basic 材质不受光，右边 Standard 材质受光。用按钮分别开关环境光与平行光，对比两侧差异。',
        '注意按钮的实现：React 只保存开关状态，Three 在渲染循环里从 ref 读取 —— 这是「React 持配置、Three 持动画」的标准写法。',
      ],
    },
  ],
}
