import type { Chapter } from './types'

export const transformDoc: Chapter = {
  id: 'ch04-transform',
  title: '变换与动画',
  sections: [
    {
      heading: '三种基本变换',
      paragraphs: [
        'position / rotation / scale 是每个 Object3D 的基本属性，分别控制平移、旋转、缩放。',
        '变换沿父子层级传递：父物体移动，子物体跟着动。Group 常用来组织这种层级。',
      ],
    },
    {
      heading: '基于时间的动画',
      paragraphs: [
        '不要假设帧率恒定：用每帧的 delta time（秒）乘速度，动画在不同刷新率下才一致。',
        '周期性运动用累计的 elapsed 时间驱动 sin / cos，比累加增量更稳定 —— 暂停恢复后不会跳变。',
      ],
      code: `// dt：距上一帧的秒数；elapsed：累计秒数
mesh.rotation.y += dt * speed          // 速度单位：弧度/秒
mesh.position.x = Math.cos(elapsed) * r // 周期运动用 elapsed`,
    },
    {
      heading: '右侧练习',
      paragraphs: [
        '立方体同时做三件事：绕场景中心公转（position）、自转（rotation）、呼吸缩放（scale）。',
        '试着把公转速度改快，或把缩放改成 dt 累加写法，体会两种驱动方式的差别。',
      ],
    },
  ],
}
