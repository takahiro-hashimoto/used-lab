import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPhoneModels, getAllProductShopLinksByType } from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'
import HeroMeta from '@/app/components/HeroMeta'
import PopularSection from '@/app/components/support/PopularSection'

const GLOSSARY_ITEMS = [
  { title: 'CPU', icon: 'fa-solid fa-microchip', desc: 'iPhoneの頭脳にあたるチップで、全体的な処理速度や電力効率に大きく影響。A16やA17 Proなどの世代ごとに性能が進化。' },
  { title: 'RAM', icon: 'fa-solid fa-memory', desc: 'アプリの同時使用やゲーム、動画編集などの処理性能に関わるメモリ容量。数値が大きいほど動作がスムーズ。' },
  { title: 'バッテリー容量', icon: 'fa-solid fa-battery-full', desc: 'mAh（ミリアンペアアワー）で表される電池の容量。容量が大きいほど長時間の使用が可能だが、省電力設計とのバランスも重要。' },
  { title: 'USB-C対応', icon: 'fa-solid fa-plug', desc: 'iPhone 15以降で採用。MacやiPadとケーブル共有ができ、外部ストレージやディスプレイとの接続、他デバイスへの給電も可能。' },
  { title: 'MagSafe対応', icon: 'fa-solid fa-magnet', desc: '背面の磁力でアクセサリを固定。ワイヤレス充電やカードケースの装着が簡単でズレにくい。' },
  { title: 'Dynamic Island対応', icon: 'fa-solid fa-circle-notch', desc: '画面上部に通話や音楽再生、タイマーなどを表示。アプリを切り替えず操作や確認が可能。' },
  { title: '衝突事故検出', icon: 'fa-solid fa-car-burst', desc: '車の衝突など大きな衝撃を検知し、反応がない場合は自動で緊急通報。' },
  { title: 'ProMotion', icon: 'fa-solid fa-gauge-high', desc: '最大120Hzの高リフレッシュレートに対応。スクロールや操作が滑らかになるのが特徴。' },
  { title: 'Apple Intelligence', icon: 'fa-solid fa-wand-magic-sparkles', desc: '要約、画像生成、自然言語操作などを実現するAI機能。デバイス上で処理し、プライバシーにも配慮。' },
  { title: 'アクションボタン', icon: 'fa-solid fa-sliders', desc: '本体側面の物理ボタンに好みの機能を割り当て可能。カメラ起動やショートカット実行に対応。' },
  { title: 'カメラコントロール', icon: 'fa-solid fa-camera', desc: 'ボタン操作で即カメラを起動し、シャッター操作が可能。素早く撮影できる。' },
  { title: 'アクションモード', icon: 'fa-solid fa-person-running', desc: '動きの多いシーンでも手ブレを抑え、滑らかな映像を記録。アウトドア撮影に最適。' },
  { title: 'シネマティックモード', icon: 'fa-solid fa-film', desc: '背景をぼかし被写体にフォーカス。映画のような映像が撮影可能。フォーカスの変更も後から対応。' },
  { title: 'マクロモード', icon: 'fa-solid fa-magnifying-glass', desc: '被写体に数センチまで近づいて撮影。小さな物の質感やディテールを高精細に記録。' },
  { title: 'ポートレートモード', icon: 'fa-solid fa-user', desc: '背景をぼかし、人物を強調した写真を撮影。ライティング効果などの演出も可能。' },
  { title: 'ナイトモード', icon: 'fa-solid fa-moon', desc: '暗所でも明るく鮮明な写真を自動調整で撮影。長時間露光と手ブレ補正に対応。' },
  { title: 'LiDARスキャナ', icon: 'fa-solid fa-cube', desc: 'レーザーで距離を測定し、空間の3Dマッピングを実現。AR体験や暗所でのピント合わせにも有効。' },
  { title: 'Apple ProRAW', icon: 'fa-solid fa-image', desc: '多くの情報を保持したRAW形式で撮影可能。高精度な編集に対応し、プロ仕様の仕上がりに。' },
  { title: 'Apple ProRes', icon: 'fa-solid fa-video', desc: '高画質な映像を記録できるフォーマット。豊かな階調と高い編集耐性が特徴。' },
]
import IPhoneRelatedLinks from '@/app/components/iphone/IPhoneRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる',
  description:
    '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。iPhoneの機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
  alternates: { canonical: '/iphone/iphone-spec-table/' },
  openGraph: {
    title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。iPhoneの機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
    url: '/iphone/iphone-spec-table/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 1200, height: 630, alt: '歴代iPhoneスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。',
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

export default async function IPhoneSpecTablePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
  ])

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.com/iphone' },
      { '@type': 'ListItem', position: 3, name: '歴代iPhoneスペック比較表' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/iphone-spec-table/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '【2025年】歴代iPhoneのスペック＆性能比較表',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧。機能のアップデート履歴を一目で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.com/iphone/iphone-spec-table/',
  })

  // シリアライズ可能な形に変換
  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    cpu: m.cpu,
    ram: m.ram,
    weight: m.weight,
    strage: m.strage,
    color: m.color,
    size: m.size,
    port: m.port,
    battery: m.battery,
    video: m.video,
    streaming: m.streaming,
    audio: m.audio,
    display: m.display,
    resolution: m.resolution,
    sim: m.sim,
    certification: m.certification,
    front_camera: m.front_camera,
    image_sensor: m.image_sensor,
    in_camera: m.in_camera,
    photography_style: m.photography_style,
    apple_intelligence: m.apple_intelligence,
    magsafe: m.magsafe,
    dynamic_island: m.dynamic_island,
    promotion: m.promotion,
    accident_detection: m.accident_detection,
    action_button: m.action_button,
    camera_control: m.camera_control,
    lidar: m.lidar,
    night_mode: m.night_mode,
    portrait_mode: m.portrait_mode,
    cinematic_mode: m.cinematic_mode,
    action_mode: m.action_mode,
    macro_mode: m.macro_mode,
    apple_proraw: m.apple_proraw,
    apple_prores: m.apple_prores,
    score_single: m.score_single,
    score_multi: m.score_multi,
    score_metal: m.score_metal,
    antutu_cpu: m.antutu_cpu,
    antutu_gpu: m.antutu_gpu,
    antutu_mem: m.antutu_mem,
    antutu_ux: m.antutu_ux,
  }))

  const serializedLinks = allShopLinks.map((l) => ({
    product_type: l.product_type,
    product_id: l.product_id,
    shop_id: l.shop_id,
    url: l.url,
  }))


  return (
    <main>
      <article itemScope itemType="https://schema.org/Article">
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
            { label: '中古iPhone完全購入ガイド', href: '/iphone' },
            { label: '歴代iPhoneスペック比較表' },
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
              <h1 className="hero-title" itemProp="headline">
                歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/thumbnail/iphone-compare.jpg"
                  alt="歴代iPhoneスペック比較表のイメージ"
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
              <p>毎年新モデルが登場するiPhoneシリーズ。機種変更を検討中の方にはこんな悩みも多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>最新機種はオーバースペックな気がする…</li>
                <li>自分の用途に合った型落ちiPhoneを探したい!</li>
              </ul>
              <p>本記事では<strong>歴代iPhoneの主要スペックを一覧表で比較</strong>し、進化ポイントをわかりやすくまとめました。新たなiPhoneを購入する際の参考にしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link href="/iphone">中古iPhone購入ガイド</Link>」をご覧ください。
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
                <a href="#spec-table" className="toc-item">
                  歴代iPhoneのスペック比較表一覧{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#compare" className="toc-item">
                  気になる2機種スペックを比較{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#benchmark" className="toc-item">
                  チップ性能・処理速度を比較{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#evolution" className="toc-item">
                  歴代iPhoneの主な進化点{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#glossary" className="toc-item">
                  iPhone各機能の用語解説{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
            <AuthorByline />
          </div>
        </nav>
        <div className="l-sections" itemProp="articleBody">
        {/* セクション */}
        <SpecTable models={serializedModels} shopLinks={serializedLinks} />
        <DualCompare models={serializedModels} shopLinks={serializedLinks} />
        <BenchmarkSection models={serializedModels} />
        <EvolutionTimeline />
        <GlossarySection productName="iPhone" items={GLOSSARY_ITEMS} />

        <PopularSection
          sectionTitle="目的別に人気の中古iPhone"
          sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
          imageSrc="/images/content/thumbnail/iphone-setting.webp"
          imageAlt="中古iPhoneおすすめ5選のイメージ画像"
          subtitle="目的別におすすめ機種を厳選！"
          cardTitle="中古iPhoneおすすめ5選"
          cardDescription="カメラ性能を重視する人向け、大画面で動画やSNSを楽しみたい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
          buttonText="おすすめ5機種を見る"
          buttonHref="/iphone/recommend/"
          secondaryButtonText="イオシスで中古iPhoneを探す"
          secondaryButtonHref="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fiphone"
        />
        {/* 関連記事 */}
        <IPhoneRelatedLinks excludeHref={["/iphone/iphone-spec-table/", "/iphone/recommend/"]} />
        <ShareBox url="https://used-lab.com/iphone/iphone-spec-table/" text="歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる" />
        </div>
      </article>
    </main>
  )
}
