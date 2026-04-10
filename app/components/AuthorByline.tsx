import Image from 'next/image'
import Link from 'next/link'

export default function AuthorByline() {
  return (
    <div className="author-byline">
      <div
        className="author-byline__card"
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className="author-byline__left">
          <Image
            src="/images/content/thumbnail/my-icon.webp"
            alt="タカヒロのプロフィール写真"
            width={100}
            height={100}
            className="author-byline__avatar"
            itemProp="image"
          />
          <span className="author-byline__name" itemProp="name">タカヒロ</span>
          <span className="author-byline__role" itemProp="jobTitle">Webディレクター / ブロガー</span>
        </div>
        <div className="author-byline__right">
          <p className="author-byline__heading">この記事の著者</p>
          <p className="author-byline__desc" itemProp="description">
            Apple製品は2011年のiPhone 4sから毎年購入し続けているガジェットブロガー。メインガジェットブログ「デジスタ」では300以上の製品をレビューし、複数メディアの記事監修や連載も担当。これらの経験を活かし、中古Apple製品を賢く選ぶための情報を当サイトで発信中。
          </p>
          <div className="author-byline__footer">
            <Link
              href="/profile/"
              className="author-byline__link"
              rel="author"
              itemProp="url"
            >
              <i className="fa-solid fa-circle-chevron-right" aria-hidden="true"></i>
              運営者情報・メディア掲載歴
            </Link>
            <div className="top-about-card__links">
              <a href="https://twitter.com/takahiro_mono" target="_blank" rel="noopener noreferrer me" className="top-about-card__icon-link" aria-label="X (Twitter)" title="X (Twitter)" itemProp="sameAs">
                <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/takahiro_mono" target="_blank" rel="noopener noreferrer me" className="top-about-card__icon-link" aria-label="Instagram" title="Instagram" itemProp="sameAs">
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.youtube.com/@takahiro_mono" target="_blank" rel="noopener noreferrer me" className="top-about-card__icon-link" aria-label="YouTube" title="YouTube" itemProp="sameAs">
                <i className="fa-brands fa-youtube" aria-hidden="true"></i>
              </a>
              <a href="https://note.com/takahiro_mono" target="_blank" rel="noopener noreferrer me" className="top-about-card__icon-link" aria-label="note" title="note" itemProp="sameAs">
                <i className="fa-solid fa-pen-nib" aria-hidden="true"></i>
              </a>
              <a href="/contact/" className="top-about-card__icon-link" aria-label="お問い合わせ" title="お問い合わせ">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
