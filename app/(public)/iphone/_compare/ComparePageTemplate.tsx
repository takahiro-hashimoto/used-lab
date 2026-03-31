/**
 * iPhone 2機種比較ページの共通テンプレート
 * 各ルートの page.tsx から config を受け取って全セクションを描画
 */

import { notFound } from 'next/navigation'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import {
  getIPhoneModelBySlug,
  getPriceLogsByModelId,
  getLatestPriceLog,
  getProductShopLinks,
} from '@/lib/queries'
import { buildBreadcrumbJsonLd, buildArticleJsonLd } from '@/lib/utils/shared-helpers'
import { getShortName } from './helpers'
import type { ComparePageConfig } from './config'
import {
  SPECS_BASIC,
  SPECS_CAMERA,
  SPECS_BATTERY,
  SPECS_OTHER,
} from './spec-definitions'
import CompareHero from './CompareHero'
import CompareSummary from './CompareSummary'
import SpecSection from './SpecSection'
import CompareBenchmark from './CompareBenchmark'
import CompareLifespan from './CompareLifespan'
import ComparePriceChart from './ComparePriceChart'
import CompareFaq from './CompareFaq'
import CompareVerdict from './CompareVerdict'
import CompareRelated from './CompareRelated'
import ShareBox from '@/app/components/ShareBox'

type Props = {
  config: ComparePageConfig
}

export default async function ComparePageTemplate({ config }: Props) {
  // データ並列取得
  const [modelL, modelR] = await Promise.all([
    getIPhoneModelBySlug(config.leftSlug),
    getIPhoneModelBySlug(config.rightSlug),
  ])

  if (!modelL || !modelR) notFound()

  const [priceLogsL, priceLogsR, latestL, latestR, shopLinksL, shopLinksR] = await Promise.all([
    getPriceLogsByModelId(modelL.id),
    getPriceLogsByModelId(modelR.id),
    getLatestPriceLog(modelL.id),
    getLatestPriceLog(modelR.id),
    getProductShopLinks('iphone', modelL.id),
    getProductShopLinks('iphone', modelR.id),
  ])

  // イオシスリンク (shop_id=1)
  const iosysUrlL = shopLinksL.find((l) => l.shop_id === 1)?.url || null
  const iosysUrlR = shopLinksR.find((l) => l.shop_id === 1)?.url || null

  const nameL = modelL.model
  const nameR = modelR.model
  const shortL = getShortName(modelL)
  const shortR = getShortName(modelR)

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'ホーム', item: 'https://used-lab.com/' },
    { name: '中古iPhone', item: 'https://used-lab.com/iphone/' },
    { name: `${nameL}と${shortR}の比較` },
  ])
  const articleJsonLd = buildArticleJsonLd({
    headline: config.title,
    description: config.description,
    dateStr: new Date().toISOString().substring(0, 10),
    url: `https://used-lab.com/iphone/${config.slug}/`,
  })

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article>
        <CompareHero modelL={modelL} modelR={modelR} slug={config.slug} />

        {/* イントロ */}
        <section className="l-section l-section--sm section-lead">
          <div className="l-container">
            <div className="lead-box">
              <p>
                「中古の<strong>{nameL}</strong>と<strong>{nameR}</strong>、どっちを買うべき？」
              </p>
              <p>
                価格差は約{(() => { const diff = Math.abs((latestL ? Math.round(((latestL.iosys_min || 0) + (latestL.geo_min || 0) + (latestL.janpara_min || 0)) / 3 / 100) * 100 : 0) - (latestR ? Math.round(((latestR.iosys_min || 0) + (latestR.geo_min || 0) + (latestR.janpara_min || 0)) / 3 / 100) * 100 : 0)); return diff > 0 ? `${(diff / 10000).toFixed(1)}万円` : '同程度'; })()}。この差に見合う違いがあるのか、処理性能・カメラ・バッテリーなど主要スペックを一覧で比較しました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<a href="/iphone/">中古iPhone購入完全ガイド</a>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--sm l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li><a href="#spec" className="toc-item">基本スペック <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#camera" className="toc-item">カメラ性能 <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#cpu" className="toc-item">処理性能 <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#battery" className="toc-item">バッテリー <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#other" className="toc-item">機能・安全性能 <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#life" className="toc-item">iOSサポート <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#price-chart" className="toc-item">中古相場の推移 <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#verdict" className="toc-item">どんな人におすすめ？ <i className="fa-solid fa-chevron-down"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down"></i></a></li>
            </ol>
          </div>
        </nav>

        <div className="l-sections">
          {/* 2機種サマリー */}
          <CompareSummary
            modelL={modelL}
            modelR={modelR}
            priceL={latestL}
            priceR={latestR}
          />

          {/* 1. 基本スペック */}
          <SpecSection
            id="spec"
            title={`iPhone ${shortL}と${shortR}の基本スペックを比較`}
            desc="画面サイズ・ストレージ・本体サイズなど基本的なスペックの違いを一覧で比較します。"
            specs={SPECS_BASIC}
            modelL={modelL}
            modelR={modelR}
            nameL={nameL}
            nameR={nameR}
          />

          {/* 2. カメラ性能 */}
          <SpecSection
            id="camera"
            title={`iPhone ${shortL}と${shortR}のカメラ性能を比較`}
            desc="画素数・ズーム倍率・動画性能などカメラまわりのスペックを比較します。"
            specs={SPECS_CAMERA}
            modelL={modelL}
            modelR={modelR}
            nameL={nameL}
            nameR={nameR}
          />

          {/* 3. 処理性能（bench-table） */}
          <CompareBenchmark
            id="cpu"
            title={`${shortL}と${shortR}の処理性能を比較`}
            desc="Geekbench 6ベンチマークスコアで処理性能を比較します。"
            modelL={modelL}
            modelR={modelR}
            nameL={nameL}
            nameR={nameR}
          />

          {/* 4. バッテリー */}
          <SpecSection
            id="battery"
            title={`${shortL}と${shortR}のバッテリー・充電`}
            desc="バッテリー容量・動画再生時間・充電速度を比較します。"
            specs={SPECS_BATTERY}
            modelL={modelL}
            modelR={modelR}
            nameL={nameL}
            nameR={nameR}
          />

          {/* 5. その他の機能・安全性能 */}
          <SpecSection
            id="other"
            title={`${shortL}と${shortR}の機能・安全性能`}
            desc="防水性能・生体認証・通信規格など、その他の機能を比較します。"
            specs={SPECS_OTHER}
            modelL={modelL}
            modelR={modelR}
            nameL={nameL}
            nameR={nameR}
          />

          {/* 6. iOSサポート期間（機能・安全性能の下） */}
          <CompareLifespan modelL={modelL} modelR={modelR} />

          {/* 7. 中古相場 */}
          <ComparePriceChart
            modelL={modelL}
            modelR={modelR}
            priceLogsL={priceLogsL}
            priceLogsR={priceLogsR}
            latestL={latestL}
            latestR={latestR}
          />

          {/* 8. それぞれどんな人におすすめ？ */}
          <CompareVerdict
            modelL={modelL}
            modelR={modelR}
            latestL={latestL}
            latestR={latestR}
          />

          {/* 11. FAQ */}
          <CompareFaq
            modelL={modelL}
            modelR={modelR}
            latestL={latestL}
            latestR={latestR}
          />

          {/* まとめサマリー */}
          <CompareSummary
            modelL={modelL}
            modelR={modelR}
            priceL={latestL}
            priceR={latestR}
            heading="今回比較した2機種のiPhone"
            iosysUrlL={iosysUrlL}
            iosysUrlR={iosysUrlR}
          />

          {/* 関連記事 */}
          <CompareRelated />

          <ShareBox
            url={`https://used-lab.com/iphone/${config.slug}/`}
            text={config.title}
          />
        </div>
      </article>
    </main>
  )
}
