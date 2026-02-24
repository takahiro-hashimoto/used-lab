// ============================================================
// 新着記事リスト（トップページ用）
// 新しいページを追加したらここを更新する（上限6件）
// ============================================================

export type RecentArticle = {
  href: string
  title: string
  desc: string
  date: string        // 例: '2026.02'
  category: string    // 表示用バッジ: 'iPhone' | 'iPad' | 'MacBook' | 'Watch' | 'AirPods'
  icon: string        // FontAwesome icon class
  image: string       // サムネイル画像パス
}

export const RECENT_ARTICLES: RecentArticle[] = [
  {
    href: '/macbook/macbook-buy/',
    title: 'MacBookを安く買うには？おすすめの購入先7つを比較',
    desc: 'Apple認定整備済製品・中古ショップ・ECモールなど7つの購入方法を価格・保証・手軽さで比較。',
    date: '2026.02',
    category: 'MacBook',
    icon: 'fa-laptop',
    image: 'https://used-lab.jp/wp-content/uploads/2025/07/how-to-buy-mac-heading-picturess-1024x576.jpg',
  },
  {
    href: '/watch/apple-watch-buy/',
    title: 'Apple Watchを安く買うには？おすすめの購入先7つを比較',
    desc: 'Apple認定整備済製品・中古ショップ・家電量販店など7つの購入先を価格・保証で比較。',
    date: '2026.02',
    category: 'Watch',
    icon: 'fa-clock',
    image: 'https://used-lab.jp/wp-content/uploads/2025/07/how-to-buy-cheap-apple-watch-image-1024x576.jpg',
  },
  {
    href: '/ipad/ipad-buy/',
    title: 'iPadを安く買うには？おすすめの購入先7つを比較',
    desc: 'Amazon・楽天・中古ショップなど7つの購入先を、お手軽度・お得度・ポイント還元で比較。',
    date: '2026.02',
    category: 'iPad',
    icon: 'fa-tablet-screen-button',
    image: '/images/content/ipad-image.jpg',
  },
  {
    href: '/ipad/car-navigation-system/',
    title: 'iPadをカーナビ化するメリットが凄い！地図が古くなる問題を解消',
    desc: '大画面iPadでカーナビを実現。必要なアクセサリーやおすすめアプリも紹介。',
    date: '2026.02',
    category: 'iPad',
    icon: 'fa-tablet-screen-button',
    image: '/images/content/ipad-car-navi-02.jpg',
  },
  {
    href: '/macbook/windows-mac-compare/',
    title: 'MacとWindowsどっちがいい？両者の違いとおすすめを解説',
    desc: '用途別にMacとWindowsの違いを比較。どちらを選ぶべきか迷っている方向けのガイド。',
    date: '2026.02',
    category: 'MacBook',
    icon: 'fa-laptop',
    image: '/images/macbook/mba-13-2024.jpg',
  },
  {
    href: '/watch/apple-watch-always-lit/',
    title: 'Apple Watchの常時点灯はいらない？メリット・デメリットまとめ',
    desc: '常時点灯ディスプレイの実用性をレビュー。バッテリーへの影響も検証。',
    date: '2026.02',
    category: 'Watch',
    icon: 'fa-clock',
    image: '/images/content/apple-watch-image.jpg',
  },
]
