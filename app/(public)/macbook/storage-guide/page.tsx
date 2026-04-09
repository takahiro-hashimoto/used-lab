import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import {
  getAllMacBookModels,
  getAllMacBookPriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { MacBookPriceLog } from '@/lib/types'
import StorageTable, { type StorageModel } from './components/StorageTable'
import MacBookArticleFooter from '@/app/components/macbook/MacBookArticleFooter'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '中古MacBookのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
  description:
    '中古MacBookを買うとき何GBを選ぶべきか、用途別の目安を解説。歴代モデルの容量ラインナップ一覧と中古最安価格も比較できます。',
  alternates: { canonical: '/macbook/storage-guide/' },
  openGraph: {
    title: '中古MacBookのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古MacBookのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    url: '/macbook/storage-guide/',
    images: [{ url: getHeroImage('/macbook/storage-guide/'), width: 1200, height: 630, alt: '中古MacBookストレージ容量ガイドのイメージ' }],
  },
  twitter: {
    title: '中古MacBookのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古MacBookのストレージ容量の選び方を解説。',
    images: [getHeroImage('/macbook/storage-guide/')],
  },
}

const FAQ_ITEMS = [
  {
    question: '中古MacBookのストレージ容量は後から増やせますか？',
    answer: 'Appleシリコン搭載のMacBook（M1以降）はSSDがロジックボードに直接搭載されており、後からの増設・交換はできません。\n一部のIntelモデルでは交換できたケースもありますが、現行モデルはすべて不可です。外付けSSDで対処はできますが、持ち歩きの手間が増えます。',
  },
  {
    question: '256GBと512GBで迷ったらどちらがいい？',
    answer: '2026年現在、macOSやアプリの大型化が進んでおり、メイン機として長く使うなら512GBがおすすめです。\n256GBでもWeb閲覧・事務作業中心なら使えますが、Xcodeやfinal Cut Proなどの開発・クリエイティブツールを使うと容量が逼迫しやすいです。',
  },
  {
    question: 'MacBookで動画編集をする場合、何GBがおすすめ？',
    answer: '最低512GB、できれば1TB以上をおすすめします。4K動画素材は1時間で約40〜60GB消費し、編集時にはレンダリングファイルも生成されるため、想像以上に容量を使います。外付けSSDとの併用も検討しましょう。',
  },
  {
    question: 'iCloudやクラウドストレージで容量を補えますか？',
    answer: 'iCloud DriveやDropboxで書類・写真の保存先をクラウドに逃がすことは可能です。ただし、アプリ本体やキャッシュ、開発環境（Xcode、Docker等）の容量は端末側に必要です。クラウドはあくまで補助的な手段と考えましょう。',
  },
  {
    question: 'MacBookのストレージ容量が大きいほうが動作が速くなりますか？',
    answer: 'ストレージ容量自体は速度に影響しませんが、空き容量が10%を切るとmacOSの仮想メモリやキャッシュが十分に機能せず、動作が遅くなることがあります。常に20GB以上の空きを確保することをおすすめします。',
  },
  {
    question: 'プログラミング用途では何GBが必要ですか？',
    answer: 'Xcode（約40GB）、Docker、Homebrew、各種SDKなどを入れると開発環境だけで100GB以上消費することがあります。プログラミングがメインなら最低512GB、複数言語・フレームワークを扱うなら1TBがおすすめです。',
  },
]

/** PriceLogから最安値を取得 */
function calcMinPrice(log: MacBookPriceLog): number | null {
  if (log.min1_price && log.min1_price > 0) return log.min1_price
  return null
}

export default async function StorageGuidePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllMacBookModels(),
    getAllProductShopLinksByType('macbook'),
  ])

  const priceLogsMap = await getAllMacBookPriceLogsByModelIds(allModels.map((m) => m.id))

  const storageModels: StorageModel[] = allModels.map((m) => {
    const logs = priceLogsMap[m.id] || []

    let latestLog: MacBookPriceLog | null = null
    for (const log of logs) {
      if (!latestLog || log.logged_at > latestLog.logged_at) {
        latestLog = log
      }
    }

    let storageLabel: string | null = null
    let avgMin: number | null = null

    if (latestLog?.storage) {
      avgMin = calcMinPrice(latestLog)
      const num = parseInt(latestLog.storage, 10)
      storageLabel = isNaN(num) ? latestLog.storage : num >= 1000 ? `${num / 1000}TB` : `${num}GB`
    }

    const iosysLink = allShopLinks.find((l) => l.product_id === m.id && l.shop_id === 1)

    return {
      id: m.id,
      model: m.model,
      slug: m.slug,
      image: m.image,
      date: m.date,
      cpu: m.cpu,
      strage: m.strage,
      storageLabel,
      avgMin,
      iosysUrl: iosysLink?.url ?? null,
    }
  })


  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.jp/macbook' },
      { '@type': 'ListItem', position: 3, name: 'ストレージ容量ガイド' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/storage-guide/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '中古MacBookのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古MacBookのストレージ容量の選び方を解説。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/macbook/storage-guide/',
  })

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }


  return (
    <main>
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        <div className="hero-wrapper">
        <Breadcrumb
          items={[
            { label: '中古MacBook完全購入ガイド', href: '/macbook' },
            { label: 'ストレージ容量ガイド' },
          ]}
        />

        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">中古MacBookのストレージ容量はどれがいい？用途別おすすめ容量まとめ</h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image src={getHeroImage('/macbook/storage-guide/')} alt="中古MacBookストレージ容量ガイドのイメージ" className="hero-media__img" width={360} height={360} priority sizes="(max-width: 768px) 100vw, 360px" />
              </figure>
            </div>
          </div>
        </header>
        </div>

        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>中古MacBookを選ぶとき、ストレージ容量の選択は非常に重要です。MacBookは購入後にSSDの増設・交換ができないため、最初の容量選びがそのまま使い勝手を左右します。</p>
              <p>本記事では、<strong>用途別のおすすめ容量の目安、歴代MacBookの容量ラインナップ、そして中古最安価格</strong>をまとめました。</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link href="/macbook">中古MacBook購入完全ガイド</Link>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li><a href="#storage-points" className="toc-item">容量選びのポイント <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#storage-quick" className="toc-item">容量別おすすめ早見表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#storage-list" className="toc-item">容量・価格一覧表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#storage-check" className="toc-item">ストレージ確認方法 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#related" className="toc-item">関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>            </ol>
</div>
            <AuthorByline />
          </div>
        </nav>

        <div className="l-sections">
        {/* ストレージ容量を選ぶ時のポイント */}
        <section className="l-section" id="storage-points" aria-labelledby="heading-storage-points">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-points">ストレージ容量を選ぶ時のポイント</h2>
            <p className="m-section-desc">MacBookのストレージ選びはiPhone・iPad以上に重要です。購入前に知っておきたいポイントをまとめました。</p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-ban" aria-hidden="true" style={{ color: '#ef4444' }}></i>
                  購入後のSSD交換・増設は不可
                </h3>
                <p className="post-check-item__desc">Appleシリコン搭載MacBook（M1以降）はSSDがロジックボードに直接実装されており、後からの交換・増設は一切できません。購入時の容量が上限です。</p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-code" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                  開発環境は想像以上に容量を消費
                </h3>
                <p className="post-check-item__desc">Xcode（約40GB）、Docker、Homebrew、各種SDK・ライブラリなどを入れると、開発環境だけで100GB以上消費することも珍しくありません。</p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-gauge-high" aria-hidden="true" style={{ color: '#f59e0b' }}></i>
                  空き容量不足でパフォーマンスが低下
                </h3>
                <p className="post-check-item__desc">macOSは仮想メモリやキャッシュにSSDの空き領域を使います。空き容量が10%を切るとスワップが頻発し、動作が目に見えて遅くなります。</p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-hard-drive" aria-hidden="true" style={{ color: '#10b981' }}></i>
                  外付けSSDで補えるが利便性は下がる
                </h3>
                <p className="post-check-item__desc">USB-C外付けSSDで容量を補うことは可能ですが、常に持ち歩く手間や、アプリのインストール先にはできない制約があります。本体容量に余裕を持つのが理想です。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 容量別おすすめ早見表 */}
        <section className="l-section" id="storage-quick" aria-labelledby="heading-storage-quick">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-quick">容量別おすすめ早見表</h2>
            <p className="m-section-desc">どの容量を選べばいいか迷ったら、まずはこちらの早見表で自分の使い方に合った容量を確認してみてください。</p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">256GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--caution">最低限</span>
                </div>

                <p className="storage-quick-card__desc">Web閲覧・Office・メール中心のライトユーザー向け。開発やクリエイティブ用途には厳しい。</p>
                <ul className="storage-quick-card__list">
                  <li>macOS+標準アプリで約30〜40GB占有</li>
                  <li>オフィス系アプリ+ブラウザなら十分</li>
                  <li>写真管理はiCloudとの併用が前提</li>
                  <li>中古価格が最も安い</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">512GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--recommend">おすすめ</span>
                </div>

                <p className="storage-quick-card__desc">2026年の標準的な容量。多くのユーザーにとってバランスが良く、長期間快適に使える。</p>
                <ul className="storage-quick-card__list">
                  <li>一般的なアプリ+写真管理に十分</li>
                  <li>軽い開発（Web開発等）もこなせる</li>
                  <li>音楽制作（GarageBand/Logic Pro）もOK</li>
                  <li>3〜4年使っても余裕あり</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">1TB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--good">安心</span>
                </div>

                <p className="storage-quick-card__desc">開発者・クリエイターに最適。複数の開発環境や大量のメディアファイルを扱える。</p>
                <ul className="storage-quick-card__list">
                  <li>Xcode+Docker+複数SDKも余裕</li>
                  <li>Final Cut Pro+4K素材の編集が快適</li>
                  <li>写真RAW現像も容量を気にせず</li>
                  <li>外付けSSDなしで完結できる</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">2TB〜</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">プロ向け</span>
                </div>

                <p className="storage-quick-card__desc">映像制作・大規模開発など、大量のデータを扱うプロフェッショナル向け。</p>
                <ul className="storage-quick-card__list">
                  <li>8K動画・ProRes素材を大量保存</li>
                  <li>仮想環境を複数同時に運用可</li>
                  <li>MacBook Pro限定の容量</li>
                  <li>中古価格はかなり割高</li>
                </ul>
              </div>
            </div>

            <div className="m-callout m-callout--tip u-mt-2xl">
              <span className="m-callout__label">memo</span>
              <p className="m-callout__text">
                <strong>迷ったら512GBがおすすめ。</strong>MacBookはiPhone・iPadと比べてOSやアプリが大きく、256GBでは1〜2年で窮屈になるケースが多いです。
                開発やクリエイティブ用途なら1TB以上を検討しましょう。
              </p>
            </div>
          </div>
        </section>

        {/* 容量一覧テーブル */}
        <StorageTable models={storageModels} />

        {/* ストレージ使用量の確認方法 */}
        <section className="l-section" id="storage-check" aria-labelledby="heading-storage-check">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-check">現在のストレージ使用量を確認する方法</h2>
            <p className="m-section-desc">今使っているMacBookのストレージ使用量を確認すれば、次に買う端末の容量選びの参考になります。</p>

            <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
              <div className="media-card__img-wrap">
                <img
                  src="/images/content/thumbnail/macbook-storage.jpg"
                  alt="MacBookのストレージ使用量確認画面"
                  className="media-card__img"
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
              <div className="media-card__body">
                <div className="media-card__desc">
                  <p>Macの「システム設定」からストレージの使用状況を確認できます。</p>
                  <p>カテゴリ別（アプリ・書類・写真・システムなど）の使用量が表示されるため、<strong>何にどのくらい容量を使っているか</strong>を把握できます。</p>
                  <p>新しいMacBookを購入する際にストレージ容量を決める際の判断材料にしましょう。</p>
                </div>
              </div>
              <div className="media-card__footer">
                <h3 className="caution-how-to__heading">ストレージ使用量の確認方法</h3>
                <ol className="caution-steps">
                  <li className="caution-steps__item"><span className="caution-steps__num">1</span><span>画面左上の  メニュー →「システム設定」</span></li>
                  <li className="caution-steps__item"><span className="caution-steps__num">2</span><span>「一般」をクリック</span></li>
                  <li className="caution-steps__item"><span className="caution-steps__num">3</span><span>「ストレージ」をクリック</span></li>
                </ol>
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li><Link href="/macbook/used-macbook-attention/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古MacBookの注意点と選び方まとめ</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <FaqSection
          title="MacBookのストレージ容量に関するよくある質問"
          description="ストレージ容量に関して多く寄せられる質問をまとめました。"
          items={FAQ_ITEMS}
        />

        <MacBookArticleFooter pageUrl="https://used-lab.jp/macbook/storage-guide/" pageTitle="中古MacBookのストレージ容量はどれがいい？用途別おすすめ容量まとめ" excludeHref={["/macbook/storage-guide/", "/macbook/recommend/"]} />
        </div>
      </article>
    </main>
  )
}
