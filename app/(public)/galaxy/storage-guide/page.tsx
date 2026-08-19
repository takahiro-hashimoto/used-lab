import type { Metadata } from 'next'
import { roundedMarketPrice } from '@/lib/utils/price-stats'
import Link from 'next/link'
import Image from 'next/image'
import ContentImage from '../../../components/ContentImage'
import {
  getAllGalaxyModels,
  getAllGalaxyPriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { GalaxyPriceLog } from '@/lib/types'
import StorageTable, { type StorageModel } from './components/StorageTable'
import GalaxyArticleFooter from '@/app/components/galaxy/GalaxyArticleFooter'
import { buildArticleJsonLd, getGitDateForFile, get90DaysAgo } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getHeroImage } from '@/lib/data/hero-images'
import { currentJstYear } from '@/lib/utils/current-year'

export const revalidate = false

const PAGE_TITLE = '中古Samsung Galaxyのストレージ容量はどれがいい？用途別おすすめ容量まとめ'
const PAGE_DESCRIPTION =
  '中古Samsung Galaxyを買うとき何GBを選ぶべきか、用途別の目安を解説。microSD対応の有無や歴代モデルの容量ラインナップ一覧もまとめています。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/galaxy/storage-guide/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/galaxy/storage-guide/',
    images: [{ url: getHeroImage('/galaxy/storage-guide/'), width: 1200, height: 630, alt: '中古Samsung Galaxyストレージ容量ガイドのイメージ' }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/galaxy/storage-guide/')],
  },
}

const FAQ_ITEMS = [
  {
    question: '中古Galaxyのストレージ容量は後から増やせますか？',
    answer: 'microSDに対応したモデル（主にAシリーズの一部）なら、microSDカードを挿すことで写真・動画・音楽・ファイルの保存領域を後から増やせます。\n一方、SシリーズやZシリーズ（折りたたみ）はmicroSD非対応のため増設できません。またmicroSD対応機でもアプリ本体や一部のアプリデータは内部ストレージに固定されるため、購入時に余裕のある容量を選ぶことが重要です。',
  },
  {
    question: '128GBと256GBで迷ったらどちらがいい？',
    answer: `${currentJstYear()}年現在、写真や動画の高画質化・アプリの大型化が進んでおり、メイン端末なら256GBがおすすめです。\n特にmicroSD非対応のSシリーズ・Zシリーズは後から増やせないため、256GB以上を選ぶと安心です。128GBでも日常使いは可能ですが、2〜3年使うと容量が逼迫しやすくなります。`,
  },
  {
    question: 'microSDには何を保存できますか？',
    answer: 'microSDには写真・動画・音楽・ダウンロードしたファイルなどを保存できます。\nただしアプリ本体や一部のアプリデータ、システム領域は内部ストレージに固定され、microSDには移せません。「写真や動画が多いけどアプリはそれほど入れない」という方はmicroSD対応のAシリーズが向いています。',
  },
  {
    question: 'Galaxyの空きストレージはどこで確認できますか？',
    answer: '「設定」→「バッテリーとデバイスケア」→「ストレージ」から、使用量と空き容量、カテゴリ別の内訳を確認できます。\n何にどれくらい容量を使っているかが分かるので、次に買う端末の容量選びの参考になります。',
  },
  {
    question: '折りたたみ（Fold / Flip）は大きい容量が必要ですか？',
    answer: 'Z Foldはマルチタスクや大画面での写真・動画編集など、大容量データを扱う使い方が多いため256GB以上（できれば512GB）がおすすめです。\nZ Flipはコンパクトさ重視のため128〜256GBでも足りますが、いずれもmicroSD非対応なので購入時の容量選びが重要になります。',
  },
  {
    question: 'ストレージ容量が大きいほうが動作が速くなりますか？',
    answer: '容量の大きさ自体は動作速度に直接影響しません。ただし空き容量が極端に少ない（残り数GB）状態だと、キャッシュや一時ファイルが作れずパフォーマンスが低下することがあります。\nまた、モデルによってストレージ規格（UFS）の世代が異なり、上位モデルほど読み書きが速い傾向があります。',
  },
]


/** 一覧表に出す相場。旧ログのみ3ショップ最安の平均にフォールバックする */
const storagePrice = (log: GalaxyPriceLog) => roundedMarketPrice(log, [log.iosys_min, log.geo_min, log.janpara_min])

export default async function StorageGuidePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllGalaxyModels(),
    getAllProductShopLinksByType('galaxy'),
  ])

  // StorageTable用データ: モデル情報 + PriceLogの最安価格を統合
  const priceLogsMap = await getAllGalaxyPriceLogsByModelIds(allModels.map((m) => m.id), get90DaysAgo())

  const storageModels: StorageModel[] = allModels.map((m) => {
    const logs = priceLogsMap[m.id] || []

    // 最新のログを取得
    let latestLog: GalaxyPriceLog | null = null
    for (const log of logs) {
      if (!latestLog || log.logged_at > latestLog.logged_at) {
        latestLog = log
      }
    }

    let storageLabel: string | null = null
    let avgMin: number | null = null

    if (latestLog?.storage) {
      avgMin = storagePrice(latestLog)
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
      strage: m.strage,
      series: m.series,
      microsd: m.microsd,
      storageLabel,
      avgMin,
      iosysUrl: iosysLink?.url ?? null,
    }
  })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Samsung Galaxyおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/galaxy/' },
      { '@type': 'ListItem', position: 3, name: 'ストレージ容量ガイド' },
    ],
  }

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/galaxy/storage-guide/page.tsx')

  const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr: dateStr,
    url: 'https://used-lab.jp/galaxy/storage-guide/',
  })

  return (
    <>
    <main>
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Samsung Galaxyおすすめ機種・選び方まとめ', href: '/galaxy/' },
            { label: 'ストレージ容量ガイド' },
          ]}
        />

        {/* Hero */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">
                中古Samsung Galaxyのストレージ容量はどれがいい？用途別おすすめ容量まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/galaxy/storage-guide/')}
                  alt="中古Samsung Galaxyストレージ容量ガイドのイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </figure>
            </div>
          </div>
        </header>
        </div>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>中古Samsung Galaxyを選ぶとき、容量（ストレージ）選びで迷う方は多いのではないでしょうか。GalaxyはシリーズによってmicroSDの対応・非対応が分かれるため、購入時の選択がそのまま使い勝手に直結します。</p>
              <p>本記事では、<strong>用途別のおすすめ容量の目安・microSD対応の有無・歴代Galaxyの容量ラインナップ</strong>をまとめました。「何GBにすればいいかわからない」という方はぜひ参考にしてみてください。</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link prefetch={false} href="/galaxy/">中古Samsung Galaxyおすすめ機種・選び方まとめ</Link>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li>
                <a href="#storage-points" className="toc-item">
                  容量選びのポイント{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#storage-quick" className="toc-item">
                  容量別おすすめ早見表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#storage-list" className="toc-item">
                  容量・価格一覧表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#storage-check" className="toc-item">
                  ストレージ確認方法{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#related" className="toc-item">
                  関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          </div>
        </nav>

        <div className="l-sections">
        {/* ストレージ容量を選ぶ時のポイント */}
        <section className="l-section" id="storage-points" aria-labelledby="heading-storage-points">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-points">
              ストレージ容量を選ぶ時のポイント
            </h2>
            <p className="m-section-desc">Galaxyのストレージ容量はデータの保存だけでなく端末の快適さ全体に影響します。</p>
            <p className="m-section-desc">シリーズによるmicroSD対応の違いも含め、購入前に知っておきたいポイントを確認しましょう。</p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-sd-card" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                  シリーズでmicroSD対応が分かれる
                </h3>
                <p className="post-check-item__desc">
                  Aシリーズの一部はmicroSDに対応し、後から写真・動画の保存領域を増やせます。一方、SシリーズやZシリーズ（折りたたみ）はmicroSD非対応で、購入時の容量が上限になります。狙うシリーズによって容量選びの重要度が変わります。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-ban" aria-hidden="true" style={{ color: '#ef4444' }}></i>
                  microSDでもアプリは移せない
                </h3>
                <p className="post-check-item__desc">
                  microSDに保存できるのは写真・動画・音楽などのファイルが中心で、アプリ本体や一部のアプリデータは内部ストレージに固定されます。ゲームやSNSアプリを多く使う方は、microSD対応機でも本体容量に余裕を持たせましょう。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-mobile-screen" aria-hidden="true" style={{ color: '#f59e0b' }}></i>
                  インストールできるアプリ数に直結
                </h3>
                <p className="post-check-item__desc">
                  SNSアプリで約500MB、大型ゲームは1本で5〜10GB消費します。本体容量が少ないと入れられるアプリが限られ、使いたいアプリのために他を削除する必要が出てきます。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-gauge-high" aria-hidden="true" style={{ color: '#10b981' }}></i>
                  空き容量不足で動作が遅くなる
                </h3>
                <p className="post-check-item__desc">
                  Galaxyもストレージの空き容量が極端に少なくなると、キャッシュや一時ファイルが作れずアプリの動作が重くなります。快適に使うには常に10%以上の空きを保つのが理想です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 容量別おすすめ早見表 */}
        <section className="l-section" id="storage-quick" aria-labelledby="heading-storage-quick">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-quick">
              容量別おすすめ早見表
            </h2>
            <p className="m-section-desc">
              どの容量を選べばいいか迷ったら、まずはこちらの早見表で自分の使い方に合った容量を確認してみてください。
            </p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">128GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--caution">注意が必要</span>
                </div>
                <p className="storage-quick-card__desc">LINE・電話・Web閲覧がメインのライトユーザー向け。microSD対応のAシリーズなら実用的ですが、S・Zで選ぶなら余裕は少なめです。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約10,000枚 + アプリ20個程度</li>
                  <li>microSD対応機なら写真・動画は拡張可能</li>
                  <li>システム・One UIで15GB前後占有</li>
                  <li>中古価格が最も安い</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">256GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--recommend">おすすめ</span>
                </div>
                <p className="storage-quick-card__desc">Galaxyの標準的な容量。写真・動画・ゲームをバランスよく楽しめて、microSD非対応のS・Zでも長期間で容量不足になりにくい。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約30,000枚 + アプリ50個以上</li>
                  <li>4K動画も余裕を持って撮影可能</li>
                  <li>大型ゲームも複数インストールOK</li>
                  <li>3〜4年使っても余裕あり</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">512GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">ヘビーユーザー</span>
                </div>
                <p className="storage-quick-card__desc">高画質の動画撮影や大型ゲーム、Z Foldでのマルチタスクを存分に楽しみたい方向け。一般的な使い方では持て余す容量です。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約60,000枚以上</li>
                  <li>8K・4K動画を長時間撮影可能</li>
                  <li>大型ゲームを10本以上インストールOK</li>
                  <li>中古価格はやや割高</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">1TB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">プロ向け</span>
                </div>
                <p className="storage-quick-card__desc">高解像度の写真・動画を大量に扱うプロ・クリエイター向け。Ultraや一部の折りたたみ（Fold）限定で選べる容量です。</p>
                <ul className="storage-quick-card__list">
                  <li>8K動画やRAW写真を容量を気にせず保存</li>
                  <li>S Penでの制作データも大量に保存可能</li>
                  <li>PC不要で大量の素材を持ち歩ける</li>
                  <li>中古価格はかなり割高</li>
                </ul>
              </div>
            </div>

            <div className="m-callout m-callout--tip u-mt-2xl">
              <span className="m-callout__label">memo</span>
              <p className="m-callout__text">
                <strong>迷ったら256GBがおすすめ。</strong>写真・動画の高画質化やアプリの大型化が進み、128GBでは2〜3年で窮屈になるケースが増えています。
              </p>
              <p className="m-callout__text">
                特にmicroSD非対応のSシリーズ・Zシリーズは後から増やせないため、256GB以上を選ぶと安心です。写真・動画中心でアプリは少なめという方なら、microSD対応のAシリーズで本体128GB＋microSDという組み合わせも賢い選択です。
              </p>
            </div>
          </div>
        </section>

        {/* 歴代Galaxy ストレージ容量一覧表 */}
        <StorageTable models={storageModels} />


        {/* ストレージ使用量の確認方法 */}
        <section className="l-section" id="storage-check" aria-labelledby="heading-storage-check">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-check">
              現在のストレージ使用量を確認する方法
            </h2>
            <p className="m-section-desc">
              今使っているGalaxy（やAndroid端末）のストレージ使用量を確認すれば、次に買う端末の容量選びの参考になります。
            </p>

            <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
              <div className="media-card__img-wrap">
                <ContentImage
                  src="/images/content/thumbnail/check-list.jpg"
                  alt="Galaxyのストレージ使用量確認画面"
                  className="media-card__img"
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
              <div className="media-card__body">
                <div className="media-card__desc m-rich-text">
                  <p>Galaxyの「設定」アプリからストレージの使用状況を確認できます。カテゴリごとの容量内訳も表示されるため、<strong>何にどのくらい容量を使っているか</strong>を一目で把握可能です。</p>
                  <p>たとえば「写真だけで30GB使っている」「ゲームアプリが合計20GBを占めている」といった具体的な数値がわかるので、次のGalaxyに必要な容量の目安を判断しやすくなります。</p>
                  <p>現在の使用量に加えて、今後のアプリ追加や写真の増加も考慮し、少し余裕を持った容量を選ぶのがおすすめです。</p>
                </div>
              </div>
              <div className="media-card__footer">
                <h3 className="caution-how-to__heading">ストレージ使用量の確認方法</h3>
                <ol className="caution-steps u-mb-lg">
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">1</span>
                    <span>設定アプリを開く</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">2</span>
                    <span>「バッテリーとデバイスケア」をタップ</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">3</span>
                    <span>「ストレージ」をタップ</span>
                  </li>
                </ol>
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li>
                      <Link prefetch={false} href="/galaxy/used-galaxy-attention/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古Galaxyの注意点と選び方まとめ</Link>
                    </li>
                    <li>
                      <Link prefetch={false} href="/galaxy/galaxy-spec-table/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 歴代GalaxyのスペックをmicroSD対応含めて比較</Link>
                    </li>
                    <li>
                      <Link prefetch={false} href="/galaxy/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古Samsung Galaxyのおすすめ機種5選</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <FaqSection
          title="Galaxyのストレージ容量に関するよくある質問"
          description="ストレージ容量に関して多く寄せられる質問をまとめました。"
          items={FAQ_ITEMS}
        />

        </div>
      </article>
    </main>
    <GalaxyArticleFooter
          pageUrl="https://used-lab.jp/galaxy/storage-guide/"
          pageTitle={PAGE_TITLE}
          excludeHref={["/galaxy/storage-guide/"]}
        />
    </>
  )
}
