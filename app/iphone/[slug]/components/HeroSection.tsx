import Link from 'next/link'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'

type Props = {
  model: IPhoneModel
  latestPrice: IPhonePriceLog | null
}

export default function HeroSection({ model }: Props) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '中古Apple製品を安く買う',
        item: 'https://used-lab.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '中古iPhone完全ガイド',
        item: 'https://used-lab.com/iphone',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: model.model,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* パンくずリスト */}
      <nav className="breadcrumb" aria-label="パンくずリスト">
        <div className="l-container">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link href="/">
                <i className="fa-solid fa-house" aria-hidden="true"></i>{' '}
                <span>中古Apple製品を安く買う</span>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/iphone">中古iPhone完全ガイド</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">{model.model}</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">
              中古{model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説
            </h1>
            <div className="hero-actions">
              <a href="#shops" className="m-btn m-btn--hero-primary">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
                <span>購入サイトを見る</span>
              </a>
              <a href="#buy-now" className="m-btn m-btn--hero-outline">
                <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                <span>詳細を確認</span>
              </a>
            </div>
            <div className="hero-meta">
              <i className="fa-regular fa-clock" aria-hidden="true"></i>
              <span>
                更新日: <time dateTime={new Date().toISOString().split('T')[0]}>
                  {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time> | 当記事のリンクには広告が含まれています
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-media">
              {model.image && (
                <img
                  src={`/images/iphone/${model.image}`}
                  alt={`${model.model} の外観イメージ`}
                  className="hero-media__img"
                  width="360"
                  height="360"
                  loading="eager"
                />
              )}
            </figure>
          </div>
        </div>
      </header>
    </>
  )
}
