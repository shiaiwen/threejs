import type { Chapter } from './types'

export const reactDoc: Chapter = {
  id: 'ch05-react',
  title: 'React 使用注意',
  sections: [
    {
      heading: 'StrictMode 双挂载',
      paragraphs: [
        '开发环境下 StrictMode 会「挂载 → 卸载 → 再挂载」组件，effect 的 cleanup 必须完整释放 Three 资源。',
        '本脚手架的 cleanup 做四件事：停 rAF、断开 ResizeObserver、遍历释放 geometry / material、renderer.dispose() + forceContextLoss()。',
      ],
    },
    {
      heading: 'React 持配置，Three 持动画',
      paragraphs: [
        '渲染循环里绝不调用 setState；需要 UI 与场景联动时用 ref 做桥梁：React 写 ref，循环读 ref。',
        '本练习上方的「挂载次数」就是证据：它只在挂载时更新一次，而不是每帧更新。',
      ],
    },
    {
      heading: '不可见就停表',
      paragraphs: [
        'IntersectionObserver 监听画布可见性，滚出视口或被折叠时停止 rAF，回到视口再继续，长文阅读时不空转吃 CPU。',
        '同时只挂载当前章节的练习组件，页面里始终只有一个 WebGLRenderer；快速切换章节也不会泄漏 canvas。',
      ],
    },
  ],
}
