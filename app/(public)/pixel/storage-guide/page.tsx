import type { Metadata } from 'next'
import { roundedMarketPrice } from '@/lib/utils/price-stats'
import Link from 'next/link'
import Image from 'next/image'
import ContentImage from '../../../components/ContentImage'
import {
  getAllPixelModels,
  getAllPixelPriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { PixelPriceLog } from '@/lib/types'
import StorageTable, { type StorageModel } from './components/StorageTable'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
import { buildArticleJsonLd, getGitDateForFile , get90DaysAgo } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

export const metadata: Metadata = {
  title: '中古Google Pixelのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
  description:
    '中古Google Pixelを買うとき何GBを選ぶべきか、用途別の目安を解説。microSD非対応の注意点や歴代モデルの容量ラインナップ一覧もまとめています。',
  alternates: { canonical: '/pixel/storage-guide/' },
  openGraph: {
    title: '中古Google Pixelのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古Pixelのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    url: '/pixel/storage-guide/',
    images: [{ url: getHeroImage('/pixel/storage-guide/'), width: 1200, height: 630, alt: '中古Google Pixelストレージ容量ガイドのイメージ' }],
  },
  twitter: {
    title: '中古Google Pixelのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古Pixelのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    images: [getHeroImage('/pixel/storage-guide/')],
  },
}

const FAQ_ITEMS = [
  {
    question: '中古Google Pixelのストレージ容量は後から増やせますか？',
    answer: 'Pixelは全機種microSDカードに対応しておらず、ストレージの増設はできません。\nGoogle One（月額250円〜）などのクラウドや外付けUSBメモリで対処できますが、アプリの容量は減らせないため、購入時に余裕のある容量を選ぶことが重要です。',
  },
  {
    question: '128GBと256GBで迷ったらどちらがいい？',
    answer: `${new Date().getFullYear()}年現在、写真や動画の高画質化・アプリの大型化が進んでおり、メイン端末なら256GBがおすすめです。\n128GBでも日常使いは可能ですが、2〜3年使うと容量が逼迫しやすくなります。中古価格の差が1万円以内であれば256GBを選んだほうが後悔しにくいです。`,
  },
  {
    question: `128GBのPixelは${new Date().getFullYear()}年でも使えますか？`,
    answer: 'Pixelの最小容量は128GBで、日常使いなら十分実用的です。ただしAndroid自体と標準アプリで15〜20GB程度消費するため、写真・動画・大型ゲームを多く扱う方は256GB以上をおすすめします。\nPixelはmicroSD非対応で後から増やせないため、迷ったら大きめを選ぶのが安全です。',
  },
  {
    question: '写真や動画はどのくらいの容量を消費しますか？',
    answer: '写真1枚あたり約2〜5MB、1分間の動画撮影は1080pで約100MB、4Kで約350〜400MBが目安です。\n1,000枚の写真で約5GB、30分の4K動画で約12GB消費する計算です。Pixelは「消しゴムマジック」などの編集で元画像を残すと、さらに容量を使う点にも注意しましょう。',
  },
  {
    question: 'Google Oneを使えばストレージは少なくても大丈夫？',
    answer: 'GoogleフォトのバックアップとGoogle Oneを使えば写真・動画をクラウドに逃がせるため、容量の節約になります。ただしアプリ本体やゲームのデータ容量は減らせないため、ゲームやSNSアプリを多く使う場合は端末のストレージも重要です。',
  },
  {
    question: 'ストレージ容量が大きいほうが動作が速くなりますか？',
    answer: '容量の大きさは動作速度に直接影響しません。ただし、空き容量が極端に少ない（残り数GB）状態だと、キャッシュや一時ファイルが作れずパフォーマンスが低下することがあります。快適に使うには常に10%以上の空きを保つのがおすすめです。',
  },
]


/** 一覧表に出す相場。旧ログのみ3ショップ最安の平均にフォールバックする */
const storagePrice = (log: PixelPriceLog) => roundedMarketPrice(log, [log.iosys_min, log.geo_min, log.janpara_min])

export default async function StorageGuidePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllPixelModels(),
    getAllProductShopLinksByType('pixel'),
  ])

  // StorageTable用データ: モデル情報 + PriceLogの最安価格を統合
  const priceLogsMap = await getAllPixelPriceLogsByModelIds(allModels.map((m) => m.id), get90DaysAgo())

  const storageModels: StorageModel[] = allModels.map((m) => {
    const logs = priceLogsMap[m.id] || []

    // 最新のログを取得
    let latestLog: PixelPriceLog | null = null
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
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: 'ストレージ容量ガイド' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/storage-guide/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '中古Google Pixelのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古Pixelのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/pixel/storage-guide/',
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
            { label: '中古Google Pixelおすすめ機種・選び方まとめ', href: '/pixel/' },
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
                中古Google Pixelのストレージ容量はどれがいい？用途別おすすめ容量まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/pixel/storage-guide/')}
                  alt="中古Google Pixelストレージ容量ガイドのイメージ"
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
              <p>中古Google Pixelを選ぶとき、容量（ストレージ）選びで迷う方は多いのではないでしょうか。<strong>Pixelは全機種microSDカードに非対応</strong>のため、購入時の選択がそのまま使い勝手に直結します。</p>
              <p>本記事では、<strong>用途別のおすすめ容量の目安と歴代Pixelの容量ラインナップ</strong>をまとめました。「何GBにすればいいかわからない」という方はぜひ参考にしてみてください。</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方まとめ</Link>」も参考にしてみてください！
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
            <p className="m-section-desc">Pixelのストレージ容量はデータの保存だけでなく端末の快適さ全体に影響します。</p>
            <p className="m-section-desc">購入前に知っておきたいポイントを確認しましょう。</p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-ban" aria-hidden="true" style={{ color: '#ef4444' }}></i>
                  microSD非対応で後から増やせない
                </h3>
                <p className="post-check-item__desc">
                  Pixelは全機種microSDカードに非対応で、購入後にストレージを増設する手段がありません。購入時の容量がそのまま上限になるため、最初の選択が非常に重要です。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-mobile-screen" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                  インストールできるアプリ数に直結
                </h3>
                <p className="post-check-item__desc">
                  SNSアプリで約500MB、大型ゲームは1本で5〜10GB消費します。容量が少ないと入れられるアプリが限られ、使いたいアプリのために他を削除する必要が出てきます。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-gauge-high" aria-hidden="true" style={{ color: '#f59e0b' }}></i>
                  空き容量不足で動作が遅くなる
                </h3>
                <p className="post-check-item__desc">
                  Pixelもストレージの空き容量が極端に少なくなると、キャッシュや一時ファイルが作れずゲームやアプリの動作が重くなります。快適に使うには常に10%以上の空きが必要です。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" style={{ color: '#10b981' }}></i>
                  Androidアップデートにも空き容量が必要
                </h3>
                <p className="post-check-item__desc">
                  AndroidのメジャーOSアップデートには数GBの空き容量が必要です。容量が足りないとアップデートできず、セキュリティリスクにつながる可能性もあります。
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
              どの容量を選べばいいか迷ったら、まずはこちらの早見表で自分の使い方に合った容量を確認してみてください。Pixelの容量ラインナップは128GB／256GB／512GB／1TBが中心です。
            </p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">128GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--good">コスパ重視</span>
                </div>
                <p className="storage-quick-card__desc">Pixelの最小容量。LINE・電話・Web閲覧・SNSがメインなら十分ですが、動画撮影が多いと不足気味です。aシリーズや無印の中古で狙いやすい容量。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約10,000枚 + アプリ30個程度</li>
                  <li>4K動画は約30分撮影可能</li>
                  <li>Android+標準アプリで約15〜20GB占有</li>
                  <li>中古価格が最も手頃でコスパ◎</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">256GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--recommend">おすすめ</span>
                </div>
                <p className="storage-quick-card__desc">2026年の標準的な容量。写真・動画・ゲームをバランスよく楽しめて、長期間でも容量不足になりにくい。消しゴムマジックなどAI編集を多用する人にも安心。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約30,000枚 + アプリ50個以上</li>
                  <li>4K動画は約1.5時間撮影可能</li>
                  <li>大型ゲームも複数インストールOK</li>
                  <li>7年サポート世代なら長く使っても余裕あり</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">512GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">ヘビーユーザー</span>
                </div>
                <p className="storage-quick-card__desc">動画撮影や大型ゲームを存分に楽しみたい方向け。主に無印上位・Proシリーズで選べる容量です。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約60,000枚以上</li>
                  <li>4K動画は約6時間撮影可能</li>
                  <li>大型ゲームを10本以上インストールOK</li>
                  <li>中古価格はやや割高</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">1TB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">プロ向け</span>
                </div>
                <p className="storage-quick-card__desc">高画質動画や大量のRAW写真を扱うクリエイター向け。Pixel 9 Pro／9 Pro XLなどProシリーズ最上位限定の容量です。</p>
                <ul className="storage-quick-card__list">
                  <li>4K・8K動画を長時間保存可能</li>
                  <li>RAW写真も容量を気にせず撮影</li>
                  <li>PC不要で大量の素材を持ち歩ける</li>
                  <li>中古価格はかなり割高で流通量も少なめ</li>
                </ul>
              </div>
            </div>

            <div className="m-callout m-callout--tip u-mt-2xl">
              <span className="m-callout__label">memo</span>
              <p className="m-callout__text">
                <strong>迷ったら256GBがおすすめ。</strong>写真・動画の高画質化やアプリの大型化が進み、128GBでは2〜3年で窮屈になるケースが増えています。予算重視なら128GB、余裕を持ちたいなら256GBを選びましょう。
              </p>
              <p className="m-callout__text">
                Pixelは<strong>microSD非対応で後から増設できない</strong>ため、128GBと256GBの中古価格差が小さいときは、大きい容量を選んでおくと後悔しにくいです。
              </p>
            </div>
          </div>
        </section>

        {/* 歴代Pixel ストレージ容量一覧表 */}
        <StorageTable models={storageModels} />


        {/* ストレージ使用量の確認方法 */}
        <section className="l-section" id="storage-check" aria-labelledby="heading-storage-check">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-check">
              現在のストレージ使用量を確認する方法
            </h2>
            <p className="m-section-desc">
              今使っているスマホのストレージ使用量を確認すれば、次に買うPixelの容量選びの参考になります。
            </p>

            <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
              <div className="media-card__img-wrap">
                <ContentImage
                  src="/images/pixel-article/google-pixel3.jpg"
                  alt="Pixelのストレージ使用量確認画面"
                  className="media-card__img"
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
              <div className="media-card__body">
                <div className="media-card__desc m-rich-text">
                  <p>Pixelの「設定」アプリからストレージの使用状況を確認できます。アプリ・写真・動画などカテゴリごとの内訳も表示されるため、<strong>何にどのくらい容量を使っているか</strong>を一目で把握可能です。</p>
                  <p>たとえば「写真だけで30GB使っている」「ゲームアプリが合計20GBを占めている」といった具体的な数値がわかるので、次のPixelに必要な容量の目安を判断しやすくなります。</p>
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
                    <span>「ストレージ」をタップ</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">3</span>
                    <span>カテゴリ別の使用量を確認</span>
                  </li>
                </ol>
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li>
                      <Link prefetch={false} href="/pixel/used-pixel-attention/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古Google Pixel購入前の注意点まとめ</Link>
                    </li>
                    <li>
                      <Link prefetch={false} href="/pixel/pixel-spec-table/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 歴代Google Pixelスペック比較表</Link>
                    </li>
                    <li>
                      <Link prefetch={false} href="/pixel/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古Google Pixelのおすすめ機種5選</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <FaqSection
          title="Google Pixelのストレージ容量に関するよくある質問"
          description="ストレージ容量に関して多く寄せられる質問をまとめました。"
          items={FAQ_ITEMS}
        />

        </div>
      </article>
    </main>
    <PixelArticleFooter
          pageUrl="https://used-lab.jp/pixel/storage-guide/"
          pageTitle="中古Google Pixelのストレージ容量はどれがいい？用途別おすすめ容量まとめ"
          excludeHref={["/pixel/storage-guide/"]}
        />
    </>
  )
}
