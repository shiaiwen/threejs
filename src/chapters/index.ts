import type { ComponentType } from 'react'
import type { Chapter } from './types'
import { coreDoc } from './ch01-core'
import { geometryDoc } from './ch02-geometry'
import { lightingDoc } from './ch03-lighting'
import { transformDoc } from './ch04-transform'
import { reactDoc } from './ch05-react'
import RotatingCube from '../exercises/RotatingCube'
import GeometryCompare from '../exercises/GeometryCompare'
import LightingStandard from '../exercises/LightingStandard'
import TransformAnimation from '../exercises/TransformAnimation'
import ReactNotesExercise from '../exercises/ReactNotesExercise'

export interface ChapterEntry extends Chapter {
  Exercise: ComponentType<{ onFirstFrame?: () => void }>
}

// 文档与练习在此绑定，切章联动由这份注册表驱动。
// 新增一章：chapters/ 下加一个文档数据文件 + exercises/ 下加一个练习组件，然后在这里注册一条。
export const chapters: ChapterEntry[] = [
  { ...coreDoc, Exercise: RotatingCube },
  { ...geometryDoc, Exercise: GeometryCompare },
  { ...lightingDoc, Exercise: LightingStandard },
  { ...transformDoc, Exercise: TransformAnimation },
  { ...reactDoc, Exercise: ReactNotesExercise },
]
