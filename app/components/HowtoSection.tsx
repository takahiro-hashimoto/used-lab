import { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  description: ReactNode
  children: ReactNode
}

export default function HowtoSection({ id, title, description, children }: Props) {
  return (
    <section className="l-section" id={id} aria-labelledby={`heading-${id}`}>
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id={`heading-${id}`}>
          {title}
        </h2>
        <p className="m-section-desc">{description}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {children}
        </div>
      </div>
    </section>
  )
}
