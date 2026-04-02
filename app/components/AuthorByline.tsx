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
          <span className="author-byline__role">ガジェットブロガー</span>
        </div>
        <div className="author-byline__right">
          <p className="author-byline__heading">この記事の著者</p>
          <p className="author-byline__desc">
            毎年iPhone、Apple WatchなどのApple製品を購入しているガジェットブロガー。製品の完成度が高まり、最新機種でなくても十分やりたいことが実現できると実感したため当サイトを開設。型落ちの中古品を賢く選ぶ方法を発信中。
          </p>
          <Link href="/profile/" className="author-byline__link">
            <i className="fa-solid fa-circle-chevron-right" aria-hidden="true"></i>
            運営者情報・メディア掲載
          </Link>
        </div>
      </address>
    </aside>
  )
}
