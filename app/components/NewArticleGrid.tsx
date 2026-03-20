import Image from 'next/image'
import Link from 'next/link'
import type { RecentArticle } from '@/lib/data/recent-articles'

type Props = {
  articles: RecentArticle[]
}

export default function NewArticleGrid({ articles }: Props) {
  return (
    <div className="new-article-grid">
      {articles.map((article) => (
        <Link key={article.href} href={article.href} className="top-new-article m-card m-card--shadow">
          <figure className="top-new-article__thumb">
            <Image src={article.image} alt="" width={300} height={170} loading="lazy" />
          </figure>
          <div className="top-new-article__body">
            <span className="top-new-article__meta">
              <span className="top-new-article__date">{article.date}</span>
              <span className="top-new-article__category">{article.category}</span>
            </span>
            <h3 className="top-new-article__title">{article.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
