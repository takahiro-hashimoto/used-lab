import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <div className="l-container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/">
              <i className="fa-solid fa-house" aria-hidden="true"></i>{' '}
              <span>中古Apple製品を安く買う</span>
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="breadcrumb-item" aria-current={!item.href ? 'page' : undefined}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
