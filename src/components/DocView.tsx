import type { Chapter } from '../chapters/types'

export function DocView({ chapter }: { chapter: Chapter }) {
  return (
    <article className="doc">
      <h1>{chapter.title}</h1>
      {chapter.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {section.code && (
            <pre>
              <code>{section.code}</code>
            </pre>
          )}
        </section>
      ))}
    </article>
  )
}
