import Link from 'next/link'

type Props = {
  dateStr: string
  dateDisplay: string
  withItemProp?: boolean
  hideAdNotice?: boolean
  showAuthor?: boolean
}

export default function HeroMeta({ dateStr, dateDisplay, withItemProp = false, hideAdNotice = false, showAuthor = false }: Props) {
  return (
    <div className="hero-meta">
      <span>
        <i className="fa-regular fa-clock" aria-hidden="true"></i> 更新日:{' '}
        <time
          dateTime={dateStr}
          {...(withItemProp ? { itemProp: 'dateModified' } : {})}
        >
          {dateDisplay}
        </time>
      </span>
      {showAuthor && (
        <span>
          <i className="fa-regular fa-user" aria-hidden="true"></i>{' '}
          <Link
            href="/profile/"
            rel="author"
            {...(withItemProp ? { itemProp: 'author' } : {})}
          >
            タカヒロ / ガジェットブロガー
          </Link>
        </span>
      )}
      {!hideAdNotice && <span>当記事のリンクには広告が含まれています</span>}
      {withItemProp && <meta itemProp="datePublished" content={dateStr} />}
    </div>
  )
}
