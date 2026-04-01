type SummaryChecklistItem = {
  label: string
  text: string
}

type Props = {
  title: string
  items: SummaryChecklistItem[]
}

export type { SummaryChecklistItem }

export default function SummaryChecklist({ title, items }: Props) {
  return (
    <div className="m-card m-card--shadow m-card--padded" style={{ maxWidth: 720, margin: 'var(--space-xl) auto 0' }}>
      <h3 className="summary-card__title">{title}</h3>
      <ol className="summary-card__list">
        {items.map((item, i) => (
          <li key={i}>
            <strong>{item.label}</strong>{item.text}
          </li>
        ))}
      </ol>
    </div>
  )
}
