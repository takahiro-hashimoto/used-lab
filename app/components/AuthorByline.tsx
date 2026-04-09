import Image from 'next/image'
import Link from 'next/link'

export default function AuthorByline() {
  return (
    <aside className="author-byline" aria-label="著者情報">
      <address className="author-byline__card">
        <div className="author-byline__left">
          <Image
            src="/images/content/thumbnail/my-icon.webp"
            alt=""
            width={80}
            height={80}
            className="author-byline__avatar"
            aria-hidden="true"
          />
          <span className="author-byline__name" rel="author">タカヒロ</span>
          <span className="author-byline__role">Webディレクター / ブロガー</span>
        </div>
        <div className="author-byline__right">
          <p className="author-byline__heading">この記事の著者</p>
          <p className="author-byline__desc">
            Apple製品は2011年のiPhone 4sから毎年購入し続けているガジェットブロガー。メインガジェットブログ「デジスタ」では300以上の製品をレビューし、複数メディアの記事監修や連載も担当。これらの経験を活かし、中古Apple製品を賢く選ぶための情報を当サイトで発信中。
          </p>
          <Link href="/profile/" className="author-byline__link">
            <i className="fa-solid fa-circle-chevron-right" aria-hidden="true"></i>
            運営者情報・メディア掲載歴
          </Link>
        </div>
      </address>
    </aside>
  )
}
