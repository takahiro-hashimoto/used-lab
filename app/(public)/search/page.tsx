import '@/app/search-page.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PRODUCT_CATEGORIES, type LabelParams } from '@/lib/routes'
import { getHeroImage } from '@/lib/data/hero-images'
import {
  getAllIPhoneModels,
  getAllIPadModels,
  getAllMacBookModels,
  getAllWatchModels,
  getAllAirPodsModels,
} from '@/lib/queries'
import SearchClient, { type SearchEntry } from './SearchClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '記事を検索',
  description: 'ユーズドラボの記事をキーワードで検索できます。iPhone・iPad・MacBook・Apple Watch・AirPodsの購入ガイド・比較・おすすめ記事を探せます。',
  alternates: { canonical: '/search/' },
  robots: { index: false, follow: true },
}

function resolveLabel(label: string | ((p: LabelParams) => string)): string {
  if (typeof label === 'string') return label
  const dummyParams = {
    iphoneGuideDate: '2026年', ipadGuideDate: '2026年', macbookGuideDate: '2026年', watchGuideDate: '2026年',
    mvnoDate: '2026年', iphoneRecDate: '2026年', ipadRecDate: '2026年', macbookRecDate: '2026年',
    watchRecDate: '2026年', airpodsRecDate: '2026年',
    iphoneRecCount: 10, ipadRecCount: 8, macbookRecCount: 6, watchRecCount: 6, airpodsRecCount: 5,
    iphonePriceMonth: '2026年3月', ipadPriceMonth: '2026年3月', watchPriceMonth: '2026年3月', airpodsPriceMonth: '2026年3月',
    iphoneShopDate: '2026年', ipadShopDate: '2026年', macbookShopDate: '2026年', watchShopDate: '2026年',
    iphoneModelCount: 30, ipadModelCount: 22, watchModelCount: 11, airpodsModelCount: 13,
  }
  return label(dummyParams as LabelParams)
}

const IMAGE_BASE: Record<string, string> = {
  iphone: '/images/iphone/',
  ipad: '/images/ipad/',
  macbook: '/images/macbook/',
  watch: '/images/watch/',
  airpods: '/images/airpods/',
}

const CAT_META: Record<string, { label: string; icon: string }> = {
  iphone: { label: 'iPhone', icon: 'fa-mobile-screen' },
  ipad: { label: 'iPad', icon: 'fa-tablet-screen-button' },
  macbook: { label: 'MacBook', icon: 'fa-laptop' },
  watch: { label: 'Apple Watch', icon: 'fa-clock' },
  airpods: { label: 'AirPods', icon: 'fa-headphones' },
}

/** パスからキーワードを推測 */
const PAGE_KEYWORDS: Record<string, string> = {
  '/iphone/': '購入ガイド 選び方 相場 おすすめ 中古',
  '/iphone/recommend/': 'おすすめ 型落ち 狙い目 コスパ',
  '/iphone/used-iphone-attention/': '注意点 やめた方がいい 購入前 確認 中古',
  '/iphone/used-iphone-support/': 'サポート期間 いつまで使える iOS アップデート',
  '/iphone/iphone-shop/': '買う場所 ショップ ECサイト 中古販売店',
  '/iphone/iphone-spec-table/': 'スペック 比較表 性能 歴代',
  '/iphone/price-info/': '価格 相場 値段 中古価格 推移',
  '/iphone/filter-search/': '診断 シミュレーター 自分に合う',
  '/iphone/battery-compare/': 'バッテリー 電池 容量 持ち',
  '/iphone/iphone-camera/': 'カメラ 写真 画素数 撮影',
  '/iphone/storage-guide/': 'ストレージ 容量 GB 選び方',
  '/iphone/benchmark/': 'ベンチマーク スコア 性能 Geekbench',
  '/iphone/mvno/': '格安SIM MVNO 通信 回線 セット',
  '/iphone/network-limit/': 'ネットワーク制限 赤ロム 白ロム',
  '/iphone/16e-17e-compare/': '比較 違い SE',
  '/ipad/': '購入ガイド 選び方 相場 おすすめ 中古',
  '/ipad/recommend/': 'おすすめ 型落ち 狙い目 コスパ',
  '/ipad/used-ipad-attention/': '注意点 やめた方がいい 購入前 確認 中古',
  '/ipad/used-ipad-support/': 'サポート期間 いつまで使える iPadOS アップデート',
  '/ipad/ipad-shop/': '買う場所 ショップ ECサイト 中古販売店',
  '/ipad/ipad-spec-table/': 'スペック 比較表 性能 歴代',
  '/ipad/ipad-price-info/': '価格 相場 値段 中古価格 推移',
  '/ipad/ipad-filter-search/': '診断 シミュレーター 自分に合う',
  '/ipad/storage-guide/': 'ストレージ 容量 GB 選び方',
  '/ipad/benchmark/': 'ベンチマーク スコア 性能 Geekbench',
  '/ipad/ipad-buy/': '新品 安く買う 購入 セール',
  '/ipad/wifi-cellular/': 'WiFi セルラー 通信 SIM 違い',
  '/ipad/howto-use-ipad/': '使い方 活用 できること',
  '/ipad/car-navigation-system/': 'カーナビ 車 ナビ 地図',
  '/ipad/apple-pencil-compare/': 'Apple Pencil ペンシル 手書き 対応',
  '/ipad/accessories-summary/': 'アクセサリー ケース キーボード 周辺機器',
  '/macbook/': '購入ガイド 選び方 相場 おすすめ 中古',
  '/macbook/recommend/': 'おすすめ 型落ち 狙い目 コスパ',
  '/macbook/used-macbook-attention/': '注意点 やめた方がいい 購入前 確認 中古',
  '/macbook/used-macbook-support/': 'サポート期間 いつまで使える macOS アップデート',
  '/macbook/macbook-shop/': '買う場所 ショップ ECサイト 中古販売店',
  '/macbook/macbook-spec-table/': 'スペック 比較表 性能 歴代',
  '/macbook/price-info/': '価格 相場 値段 中古価格 推移',
  '/macbook/storage-guide/': 'ストレージ 容量 GB SSD 選び方',
  '/macbook/benchmark/': 'ベンチマーク スコア 性能 Geekbench',
  '/macbook/macbook-buy/': '新品 安く買う 購入 セール',
  '/macbook/air-pro-compare/': 'Air Pro 比較 違い 選び方',
  '/macbook/ipad-macbook-compare/': 'iPad 比較 違い どっち',
  '/macbook/windows-mac-compare/': 'Windows 比較 違い 乗り換え',
  '/watch/': '購入ガイド 選び方 相場 おすすめ 中古',
  '/watch/recommend/': 'おすすめ 型落ち 狙い目 コスパ',
  '/watch/used-watch-attention/': '注意点 やめた方がいい 購入前 確認 中古',
  '/watch/used-watch-support/': 'サポート期間 いつまで使える watchOS アップデート',
  '/watch/watch-shop/': '買う場所 ショップ ECサイト 中古販売店',
  '/watch/watch-spec-table/': 'スペック 比較表 性能 歴代',
  '/watch/watch-price-info/': '価格 相場 値段 中古価格 推移',
  '/watch/watch-filter-search/': '診断 シミュレーター 自分に合う',
  '/watch/apple-watch-buy/': '新品 安く買う 購入 セール',
  '/watch/apple-watch-always-lit/': '常時表示 画面 ディスプレイ',
  '/watch/gps-cellular-compare/': 'GPS セルラー 通信 違い',
  '/watch/how-to-use-apple-watch/': '使い方 活用 できること 便利',
  '/airpods/': '購入ガイド 選び方 おすすめ 中古',
  '/airpods/recommend/': 'おすすめ 型落ち 狙い目 コスパ',
  '/airpods/price-info/': '価格 相場 値段 中古価格 推移',
  '/airpods/airpods-find/': '探す 紛失 見つける',
}

/** モデルのスペック情報からキーワードを生成 */
function buildModelKeywords(m: { point?: string | null; cpu?: string | null; display?: string | null; strage?: string | null; camera?: string | null }): string {
  return [m.point, m.cpu, m.display, m.strage, m.camera].filter(Boolean).join(' ')
}

function buildStaticEntries(): SearchEntry[] {
  return PRODUCT_CATEGORIES.flatMap((cat) =>
    cat.pages.map((page) => ({
      title: resolveLabel(page.label),
      href: page.path,
      category: cat.id,
      categoryLabel: cat.label,
      icon: cat.icon,
      image: getHeroImage(page.path),
      keywords: PAGE_KEYWORDS[page.path] || '',
    }))
  )
}

export default async function SearchPage() {
  const [iPhoneModels, iPadModels, macBookModels, watchModels, airPodsModels] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPadModels(),
    getAllMacBookModels(),
    getAllWatchModels(),
    getAllAirPodsModels(),
  ])

  const modelEntries: SearchEntry[] = [
    ...iPhoneModels.map((m) => ({
      title: `中古${m.model} レビュー｜スペック・価格相場・いつまで使える？`,
      href: `/iphone/${m.slug}/`,
      category: 'iphone',
      categoryLabel: CAT_META.iphone.label,
      icon: CAT_META.iphone.icon,
      image: m.image ? `${IMAGE_BASE.iphone}${m.image}` : getHeroImage('/iphone'),
      keywords: `${m.model} ${buildModelKeywords(m)}`,
      isModel: true,
    })),
    ...iPadModels.map((m) => ({
      title: `中古${m.model} レビュー｜スペック・価格相場・いつまで使える？`,
      href: `/ipad/${m.slug}/`,
      category: 'ipad',
      categoryLabel: CAT_META.ipad.label,
      icon: CAT_META.ipad.icon,
      image: m.image ? `${IMAGE_BASE.ipad}${m.image}` : getHeroImage('/ipad'),
      keywords: `${m.model} ${buildModelKeywords(m)}`,
      isModel: true,
    })),
    ...macBookModels.map((m) => ({
      title: `中古${m.model} レビュー｜スペック・価格相場・いつまで使える？`,
      href: `/macbook/${m.slug}/`,
      category: 'macbook',
      categoryLabel: CAT_META.macbook.label,
      icon: CAT_META.macbook.icon,
      image: m.image ? `${IMAGE_BASE.macbook}${m.image}` : getHeroImage('/macbook'),
      keywords: `${m.model} ${buildModelKeywords(m)}`,
      isModel: true,
    })),
    ...watchModels.map((m) => ({
      title: `中古${m.model} レビュー｜スペック・価格相場・いつまで使える？`,
      href: `/watch/${m.slug}/`,
      category: 'watch',
      categoryLabel: CAT_META.watch.label,
      icon: CAT_META.watch.icon,
      image: m.image ? `${IMAGE_BASE.watch}${m.image}` : getHeroImage('/watch'),
      keywords: `${m.model} ${buildModelKeywords(m)}`,
      isModel: true,
    })),
    ...airPodsModels.map((m) => ({
      title: `中古${m.name}は今買うべき？サポート期間・スペック・中古相場から解説`,
      href: `/airpods/${m.slug}/`,
      category: 'airpods',
      categoryLabel: CAT_META.airpods.label,
      icon: CAT_META.airpods.icon,
      image: m.image ? `${IMAGE_BASE.airpods}${m.image}` : getHeroImage('/airpods'),
      keywords: `${m.name} ${[m.point, m.chip].filter(Boolean).join(' ')}`,
      isModel: true,
    })),
  ]

  const entries = [...buildStaticEntries(), ...modelEntries]

  return (
    <main>
      <Suspense fallback={
        <div className="hero-wrapper">
          <header className="hero hero--simple">
            <div className="hero-bg" aria-hidden="true">
              <div className="hero-shape hero-shape-1"></div>
              <div className="hero-shape hero-shape-2"></div>
            </div>
            <div className="hero-inner l-container">
              <div className="hero-content">
                <h1 className="hero-title">記事を検索</h1>
                <div className="hero-description"><p>読み込み中...</p></div>
              </div>
            </div>
          </header>
        </div>
      }>
        <SearchClient entries={entries} />
      </Suspense>
    </main>
  )
}
