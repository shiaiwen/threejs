# Three.js 学习脚手架

React 18 + TypeScript + Vite + Three.js 的一体化学习页：左侧读文档、右侧做练习，切章联动。

## 运行

```bash
npm install
npm run dev    # 开发
npm run build  # 类型检查 + 产物构建
```

## 关键设计取舍

- 文档存为 TS 数据（`src/chapters/*.ts`）而非 md/json：无需额外 loader、有类型检查，新增章节改动点少。
- React 只持配置与 UI 状态，动画状态全部在 Three 侧；渲染循环里零 setState，UI 联动走 ref。
- 练习不可见（滚出视口/折叠）时 IntersectionObserver 停 rAF，不空转吃 CPU。
- 同一时刻只挂载当前章的练习组件（`key={章节id}`），页面始终只有一个 WebGLRenderer。
- cleanup 完整 dispose（停 rAF、断 observer、释放 geometry/material、`forceContextLoss`），StrictMode 双调用安全。
- 容器宽高为 0 时跳过 resize 与渲染，aspect 不会变 NaN；无 WebGL 时练习区降级为提示，文档照常可读。
- 学习状态（当前章节/已读/已练习）存 localStorage，数据损坏自动回退第 1 章；练习错误由 ErrorBoundary 隔离。

## 目录结构

- `src/chapters/`：章节文档数据 + 注册表（`index.ts`）
- `src/exercises/`：每章一个练习组件，共用 `useExerciseScene` 骨架
- `src/three/SceneBootstrap.ts`：Scene/Camera/Renderer 创建、resize、rAF、dispose
- `src/state/learningState.ts`：localStorage 学习状态读写与容错

## 如何新增一章（文档 + 练习）

1. **写文档**：在 `src/chapters/` 新建 `chNN-xxx.ts`，导出一个 `Chapter` 对象（`id` / `title` / `sections`，section 含 `heading`、`paragraphs`、可选 `code`）。
2. **写练习**：在 `src/exercises/` 新建组件，文件头注释注明对应概念与章节；用 `ExerciseCanvas` + 一个 `setup(ctx)` 函数往场景放东西，`setup` 返回每帧回调 `(dt, elapsed) => void`。
3. **注册**：在 `src/chapters/index.ts` 的 `chapters` 数组里加一条 `{ ...xxxDoc, Exercise: XxxExercise }`。

就这三步：侧栏导航、学习状态、切章联动、资源回收全部自动生效。
