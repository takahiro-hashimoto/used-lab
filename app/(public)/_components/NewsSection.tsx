import Link from 'next/link'
import { getPublishedNews } from '@/app/admin/actions'
import { sanitizeHtml } from '@/lib/sanitize'

export default async function NewsSection() {
  const newsItems = await getPublishedNews(7)

  return (
    <div className="top-news-card m-card m-card--shadow m-card--padded">
      <h2 className="top-card-heading">新着情報</h2>
      {newsItems.length > 0 ? (
        <>
          <dl className="news-list">
            {newsItems.map((item) => (
              <div key={item.id} className="news-list__item">
                <dt className="news-list__date">
                  <time dateTime={item.date}>{item.date.replace(/-/g, '.')}</time>
                </dt>
                <dd className="news-list__content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }} />
              </div>
            ))}
          </dl>
          <div className="news-list__more">
            <Link href="/news/">新着一覧を見る</Link>
          </div>
        </>
      ) : (
        <p className="news-list__empty">新着情報はありません</p>
      )}
    </div>
  )
}
