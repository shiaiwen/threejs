import type { Chapter } from './types'

// 文档用 TS 数据而非 md/json：无需额外 loader、有类型检查；
// 新增一章 = 加一个这样的文件 + 在 chapters/index.ts 注册一行。
export const coreDoc: Chapter = {
  id: 'ch01-core',
  title: '核心概念',
  sections: [
    {
      heading: '三大件：场景、相机、渲染器',
      paragraphs: [
        'Scene 是所有物体的容器，Mesh、Light 都要 add 进场景才会被渲染。',
        'PerspectiveCamera 模拟人眼透视，参数为 fov / aspect / near / far；aspect 必须跟随画布宽高比，否则画面会拉伸。',
        'WebGLRenderer 负责把场景画到 canvas 上。一个页面应尽量只持有一个 renderer，频繁创建而不销毁会耗尽 WebGL context 配额。',
      ],
      code: `const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
const renderer = new THREE.WebGLRenderer({ antialias: true })`,
    },
    {
      heading: '渲染循环',
      paragraphs: [
        'requestAnimationFrame 驱动逐帧渲染：先更新物体状态，再 renderer.render(scene, camera)。',
        '动画状态（角度、位置）应保存在 Three 对象或普通变量里，不要放进 React state —— 每帧 setState 会拖垮 React。',
      ],
    },
    {
      heading: '右侧练习',
      paragraphs: [
        '右侧是最小完整示例：一个绕 X/Y 轴旋转的立方体，使用 MeshNormalMaterial 按法线方向着色，无需灯光。',
        '试着打开 src/exercises/RotatingCube.tsx 修改旋转速度或立方体尺寸，保存后热更新立即生效。',
      ],
    },
  ],
}
