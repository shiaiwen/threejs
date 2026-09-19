export interface DocSection {
  heading: string
  paragraphs: string[]
  /** 可选代码片段，原样展示 */
  code?: string
}

export interface Chapter {
  id: string
  title: string
  sections: DocSection[]
}
