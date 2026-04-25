// ============================================================
// ルート定義の一元管理
// sitemap.ts と sitemap-page の両方がここを参照する
// ============================================================

// ---------- 型定義 ----------

/** HTMLサイトマップで動的に埋め込むラベルパラメータ */
export type LabelParams = {
  iphoneGuideDate: string
  ipadGuideDate: string
  macbookGuideDate: string
  watchGuideDate: string
  mvnoDate: string
  iphoneRecDate: string
  iphoneRecCount: number
  ipadRecDate: string
  ipadRecCount: number
  macbookRecDate: string
  macbookRecCount: number
  watchRecDate: string
  watchRecCount: number
  airpodsRecDate: string
  airpodsRecCount: number
  iphonePriceMonth: string
  ipadPriceMonth: string
  watchPriceMonth: string
  airpodsPriceMonth: string
  iphoneShopDate: string
  ipadShopDate: string
  macbookShopDate: string
  watchShopDate: string
  iphoneModelCount: number
  ipadModelCount: number
  watchModelCount: number
  airpodsModelCount: number
}

type ChangeFreq = 'weekly' | 'monthly' | 'yearly'

export type PageDef = {
  path: string
  label: string | ((p: LabelParams) => string)
  priority?: number        // default: 0.8
  changeFrequency?: ChangeFreq  // default: 'weekly'
  includeInSitemap?: boolean
}

export type CategoryDef = {
  id: string
  label: string
  icon: string
  desc: string
  basePath: string
  pages: PageDef[]
}

/** ラベル解決済みのカテゴリ */
export type ResolvedCategory = {
  id: string
  label: string
  icon: string
  desc: string
  basePath: string
  staticPages: { href: string; label: string }[]
}

// ---------- カテゴリ定義 ----------

export const PRODUCT_CATEGORIES: CategoryDef[] = [
  {
    id: 'iphone',
    label: 'iPhone',
    icon: 'fa-mobile-screen-button',
    desc: '中古iPhoneの選び方・おすすめ機種・スペック比較・中古相場など、購入に役立つ記事をまとめています。',
    basePath: '/iphone',
    pages: [
      { path: '/iphone/', label: (p) => `中古iPhone完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${p.iphoneGuideDate}版】`, priority: 0.9 },
      { path: '/iphone/recommend/', label: (p) => `中古iPhoneおすすめ機種${p.iphoneRecCount}選｜目的別に狙い目モデルを解説【${p.iphoneRecDate}版】` },
      { path: '/iphone/used-iphone-attention/', label: '中古iPhoneはやめた方がいい？購入前に確認すべき注意点まとめ【2026年版】' },
      { path: '/iphone/apple-care/', label: 'iPhoneを買ったらアップルケアに入るべき？必要ではない理由5つを解説' },
      { path: '/iphone/mobile-hoken-compare/', label: '知らないと損！Apple Care+よりもモバイル保険に加入した方がコスパが高い理由' },
      { path: '/iphone/used-iphone-support/', label: 'iPhoneはいつまで使える？機種別のサポート期間目安まとめ' },
      { path: '/iphone/iphone-shop/', label: (p) => `中古iPhoneを買うならどこ？ECサイト・ショップのおすすめを紹介【${p.iphoneShopDate}】` },
      { path: '/iphone/iphone-spec-table/', label: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる' },
      { path: '/iphone/price-info/', label: (p) => `iPhoneの中古相場一覧 | 歴代${p.iphoneModelCount}機種の価格推移を独自集計【${p.iphonePriceMonth}】` },
      { path: '/iphone/filter-search/', label: 'iPhone機種診断シミュレーター｜自分に合うおすすめ中古スマホがすぐわかる【2026年版】' },
      { path: '/iphone/battery-compare/', label: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？' },
      { path: '/iphone/iphone-camera/', label: 'iPhoneのカメラ性能の違いは何？歴代モデルの機能を比較' },
      { path: '/iphone/storage-guide/', label: '中古iPhoneのストレージ容量はどれがいい？用途別おすすめ容量まとめ' },
      { path: '/iphone/benchmark/', label: '歴代iPhoneのベンチマーク比較ランキング｜Geekbench 6スコアで性能が一目でわかる' },
      { path: '/iphone/mvno/', label: (p) => `中古iPhoneの購入と通信契約が一緒にできる格安SIM業者まとめ【${p.mvnoDate}】` },
      { path: '/iphone/network-limit/', label: 'ネットワーク制限△の中古iPhone・iPadを買うメリット・デメリットを解説' },
      { path: '/iphone/iphone13-13pro-compare/', label: '中古iPhone 13と13 Proの違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone13-14-compare/', label: '中古iPhone 13と14の違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone13pro-14pro-compare/', label: '中古iPhone 13 Proと14 Proの違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone14-14pro-compare/', label: '中古iPhone 14と14 Proの違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone14-15-compare/', label: '中古iPhone 14と15の違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone14pro-15pro-compare/', label: '中古iPhone 14 Proと15 Proの違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone15-15pro-compare/', label: '中古iPhone 15と15 Proの違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone15-16-compare/', label: '中古iPhone 15と16の違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone15pro-16pro-compare/', label: '中古iPhone 15 Proと16 Proの違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone16-16pro-compare/', label: '中古iPhone 16と16 Proの違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone16e-se3-compare/', label: '中古iPhone 16eとSE(第3世代)の違いを比較｜中古で買うならどっち？' },
      { path: '/iphone/iphone16plus-air-compare/', label: '中古iPhone 16 PlusとiPhone Airの違いを比較｜買うならどっち？' },
    ],
  },
  {
    id: 'ipad',
    label: 'iPad',
    icon: 'fa-tablet-screen-button',
    desc: '中古iPadの選び方・おすすめ機種・スペック比較・Apple Pencil対応情報など、購入に役立つ記事をまとめています。',
    basePath: '/ipad',
    pages: [
      { path: '/ipad/', label: (p) => `中古iPad完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${p.ipadGuideDate}版】`, priority: 0.9 },
      { path: '/ipad/recommend/', label: (p) => `中古iPadのおすすめ${p.ipadRecCount}機種を解説。狙い目の型落ちモデルどれ？【${p.ipadRecDate}版】` },
      { path: '/ipad/used-ipad-attention/', label: '中古iPadはやめた方がいい？購入前に確認すべき注意点まとめ' },
      { path: '/ipad/used-ipad-support/', label: 'iPadはいつまで使える？機種別のサポート期間目安まとめ' },
      { path: '/ipad/ipad-shop/', label: (p) => `中古iPadはどこで買う？ECサイト・ショップのおすすめを紹介【${p.ipadShopDate}】` },
      { path: '/ipad/ipad-spec-table/', label: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる' },
      { path: '/ipad/ipad-price-info/', label: (p) => `iPadの中古相場一覧 | 歴代${p.ipadModelCount}機種の価格推移を独自集計【${p.ipadPriceMonth}】` },
      { path: '/ipad/ipad-filter-search/', label: 'iPad機種診断シミュレーター｜自分に合うおすすめ中古iPadがすぐわかる【2026年版】' },
      { path: '/ipad/apple-pencil-compare/', label: 'Apple Pencilの違いを比較！あなたにぴったりのアップルペンシルがわかる' },
      { path: '/ipad/accessories-summary/', label: '歴代iPadのMagic Keyboard 型番一覧｜対応キーボードがすぐわかる' },
      { path: '/ipad/wifi-cellular/', label: 'iPadはWi-Fiモデルとセルラーモデルどっちがおすすめ？両者の違い4つを比較' },
      { path: '/ipad/apple-care/', label: 'iPadを買ったらアップルケアに入るべき？必要ではない理由5つを解説' },
      { path: '/ipad/howto-use-ipad/', label: 'iPadがあればできること・便利な使い道 22選【生活が変わる】' },
      { path: '/ipad/car-navigation-system/', label: 'iPadをカーナビ化するメリットが凄い！地図が古くなる問題をすっきり解消' },
      { path: '/ipad/ipad-buy/', label: 'iPadを安く買うには？おすすめの購入先7つを比較' },
      { path: '/ipad/storage-guide/', label: '中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ' },
      { path: '/ipad/benchmark/', label: '歴代iPadのベンチマーク比較ランキング｜Geekbench 6 & AnTuTuスコアで性能が一目でわかる' },
      { path: '/ipad/ipad-mini-6-review/', label: 'iPad mini 第6世代 長期使用レビュー！3年間使用してきて分かったメリット・デメリットまとめ' },
      { path: '/ipad/review-ipad-pro-11-m4/', label: 'iPad Pro 11インチ M4モデルを買って感じたメリット・デメリットまとめ' },
    ],
  },
  {
    id: 'macbook',
    label: 'MacBook',
    icon: 'fa-laptop',
    desc: '中古MacBookの選び方・おすすめ機種・スペック比較・購入先情報など、購入に役立つ記事をまとめています。',
    basePath: '/macbook',
    pages: [
      { path: '/macbook/', label: (p) => `中古MacBook完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${p.macbookGuideDate}版】`, priority: 0.9 },
      { path: '/macbook/recommend/', label: (p) => `中古MacBookおすすめ${p.macbookRecCount}機種を解説。狙い目の型落ちモデルはどれ？【${p.macbookRecDate}版】` },
      { path: '/macbook/used-macbook-attention/', label: '中古MacBookはやめた方がいい？購入前に確認すべき注意点まとめ' },
      { path: '/macbook/apple-care/', label: 'MacBookを買ったらアップルケアに入るべき？必要ではない理由5つを解説' },
      { path: '/macbook/used-macbook-support/', label: 'MacBookはいつまで使える？各機種ごとの寿命や買い替えのタイミングを解説' },
      { path: '/macbook/macbook-shop/', label: (p) => `中古MacBookはどこで買う？ECサイト・ショップのおすすめを紹介【${p.macbookShopDate}】` },
      { path: '/macbook/macbook-spec-table/', label: '歴代MacBookスペック比較表！Air・Proの性能差や違いがすぐわかる' },
      { path: '/macbook/ipad-macbook-compare/', label: 'MacBookとiPadどっちを買うのがおすすめ？両者の違いと使い勝手を比較' },
      { path: '/macbook/windows-mac-compare/', label: 'MacとWindowsどっちがいい？両者の違いとどんな人におすすめかをやさしく解説' },
      { path: '/macbook/macbook-buy/', label: 'MacBookを安く買うには？おすすめの購入先7つを比較' },
      { path: '/macbook/price-info/', label: 'MacBookの中古相場一覧｜歴代モデルの価格推移を独自集計' },
      { path: '/macbook/storage-guide/', label: '中古MacBookのストレージ容量はどれがいい？用途別おすすめ容量まとめ' },
      { path: '/macbook/air-pro-compare/', label: 'MacBook AirとProどっちがいい？違いと選び方をやさしく解説' },
      { path: '/macbook/benchmark/', label: '歴代MacBookのベンチマーク比較ランキング｜Geekbench 6スコアで性能が一目でわかる' },
    ],
  },
  {
    id: 'watch',
    label: 'Apple Watch',
    icon: 'fa-clock',
    desc: '中古Apple Watchの選び方・おすすめ機種・スペック比較・中古相場など、購入に役立つ記事をまとめています。',
    basePath: '/watch',
    pages: [
      { path: '/watch/', label: (p) => `中古Apple Watch完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${p.watchGuideDate}版】`, priority: 0.9 },
      { path: '/watch/recommend/', label: (p) => `中古Apple Watchのおすすめ${p.watchRecCount}機種を解説。狙い目の型落ちモデルはどれ？【${p.watchRecDate}版】` },
      { path: '/watch/used-watch-attention/', label: '中古Apple Watchはやめた方がいい？購入前に確認すべき注意点まとめ' },
      { path: '/watch/apple-care/', label: 'Apple Watchを買ったらアップルケアに入るべき？必要ではない理由5つを解説' },
      { path: '/watch/used-watch-support/', label: 'Apple Watchはいつまで使える？機種別のサポート期間目安まとめ' },
      { path: '/watch/watch-shop/', label: (p) => `中古Apple Watchはどこで買う？ECサイト・ショップのおすすめを紹介【${p.watchShopDate}】` },
      { path: '/watch/watch-spec-table/', label: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる' },
      { path: '/watch/watch-price-info/', label: (p) => `Apple Watchの中古相場一覧 | 歴代${p.watchModelCount}機種の価格推移を独自集計【${p.watchPriceMonth}】` },
      { path: '/watch/watch-filter-search/', label: 'Apple Watch機種診断シミュレーター｜自分に合うおすすめ中古アップルウォッチがすぐわかる【2026年版】' },
      { path: '/watch/how-to-use-apple-watch/', label: 'アップルウォッチのできること25選！便利な機能や使い方がわかる【初心者向け】' },
      { path: '/watch/gps-cellular-compare/', label: 'Apple Watch セルラーモデルのできることを解説！GPSモデルとの違いがわかる' },
      { path: '/watch/apple-watch-always-lit/', label: 'Apple Watchの常時点灯はいらない？使ってみてわかったメリット・デメリットまとめ' },
      { path: '/watch/apple-watch-buy/', label: 'Apple Watchを安く買うには？おすすめの購入先7つを比較' },
    ],
  },
  {
    id: 'airpods',
    label: 'AirPods',
    icon: 'fa-headphones',
    desc: '中古AirPodsのおすすめ機種・中古相場など、購入に役立つ記事をまとめています。',
    basePath: '/airpods',
    pages: [
      { path: '/airpods/', label: '中古AirPods完全購入ガイド | 選び方・相場・おすすめモデルまとめ', priority: 0.9 },
      { path: '/airpods/recommend/', label: (p) => `中古AirPodsおすすめ${p.airpodsRecCount}機種を解説。狙い目の型落ちモデルはどれ？【${p.airpodsRecDate}版】` },
      { path: '/airpods/price-info/', label: (p) => `AirPodsの中古相場一覧 | 歴代${p.airpodsModelCount}機種の価格推移を独自集計【${p.airpodsPriceMonth}】` },
      { path: '/airpods/airpods-find/', label: 'AirPodsのケースやイヤホン片方を無くした時の探し方、代替品の購入先まとめ' },
      { path: '/airpods/airpods-filter-search/', label: 'AirPods機種診断シミュレーター｜自分に合うおすすめイヤホンがすぐわかる【2026年版】' },
      { path: '/airpods/used-airpods-attention/', label: '中古AirPodsはやめた方がいい？注意点とリスクを8つ解説' },
      { path: '/airpods/airpods-buy/', label: 'AirPodsを安く買う方法7選【2026年】おすすめ購入先を比較' },
    ],
  },
]

export const UTILITY_PAGES: PageDef[] = [
  { path: '/news/', label: '新着情報', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/search/', label: '記事を検索', priority: 0.3, changeFrequency: 'monthly', includeInSitemap: false },
  { path: '/sitemap-page/', label: 'サイトマップ', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/contact/', label: 'お問い合わせ', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/profile/', label: '運営者情報', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/guidelines/', label: 'ガイドライン', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy-policy/', label: 'プライバシーポリシー', priority: 0.3, changeFrequency: 'yearly' },
]

// ---------- ヘッダーナビゲーション ----------

export type HeaderNavChild = { href: string; label: string }
export type HeaderNavItem = {
  href: string
  label: string
  children?: HeaderNavChild[]
}

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  {
    href: '/iphone/', label: '中古iPhone',
    children: [
      { href: '/iphone/', label: '中古iPhoneの選び方ガイド' },
      { href: '/iphone/recommend/', label: '中古iPhoneおすすめ機種' },
      { href: '/iphone/filter-search/', label: 'iPhone機種診断ツール' },
      { href: '/iphone/price-info/', label: '中古iPhoneの相場価格' },
      { href: '/iphone/iphone-spec-table/', label: 'iPhoneスペック比較表' },
      { href: '/iphone/used-iphone-support/', label: 'iPhoneのサポート期間・寿命' },
      { href: '/iphone/iphone-shop/', label: '中古iPhoneの購入先比較' },
      { href: '/iphone/iphone-camera/', label: 'iPhoneカメラ性能比較' },
      { href: '/iphone/battery-compare/', label: 'iPhoneバッテリー容量比較' },
      { href: '/iphone/benchmark/', label: 'iPhoneベンチマーク比較' },
    ],
  },
  {
    href: '/ipad/', label: '中古iPad',
    children: [
      { href: '/ipad/', label: '中古iPadの選び方ガイド' },
      { href: '/ipad/recommend/', label: '中古iPadおすすめ機種' },
      { href: '/ipad/ipad-filter-search/', label: 'iPad機種診断ツール' },
      { href: '/ipad/ipad-price-info/', label: '中古iPadの相場価格' },
      { href: '/ipad/apple-pencil-compare/', label: 'Apple Pencil互換性比較' },
      { href: '/ipad/wifi-cellular/', label: 'Wi-Fiとセルラーの違い' },
      { href: '/ipad/ipad-spec-table/', label: 'iPadスペック比較表' },
      { href: '/ipad/used-ipad-support/', label: 'iPadのサポート期間・寿命' },
      { href: '/ipad/ipad-shop/', label: '中古iPadの購入先比較' },
      { href: '/ipad/benchmark/', label: 'iPadベンチマーク比較' },
    ],
  },
  {
    href: '/watch/', label: '中古Apple Watch',
    children: [
      { href: '/watch/', label: '中古Apple Watch選び方ガイド' },
      { href: '/watch/recommend/', label: '中古Apple Watchおすすめ機種' },
      { href: '/watch/watch-filter-search/', label: 'Apple Watch機種診断ツール' },
      { href: '/watch/watch-price-info/', label: '中古Apple Watchの相場価格' },
      { href: '/watch/gps-cellular-compare/', label: 'GPSとセルラーの違い' },
      { href: '/watch/watch-spec-table/', label: 'Apple Watchスペック比較表' },
      { href: '/watch/used-watch-support/', label: 'Apple Watchのサポート期間' },
      { href: '/watch/watch-shop/', label: '中古Apple Watchの購入先比較' },
    ],
  },
  {
    href: '/macbook/', label: '中古MacBook',
    children: [
      { href: '/macbook/', label: '中古MacBookの選び方ガイド' },
      { href: '/macbook/recommend/', label: '中古MacBookおすすめ機種' },
      { href: '/macbook/price-info/', label: '中古MacBookの相場価格' },
      { href: '/macbook/air-pro-compare/', label: 'MacBook Air vs Pro比較' },
      { href: '/macbook/macbook-spec-table/', label: 'MacBookスペック比較表' },
      { href: '/macbook/benchmark/', label: 'MacBookベンチマーク比較' },
      { href: '/macbook/used-macbook-support/', label: 'MacBookのサポート期間' },
      { href: '/macbook/macbook-shop/', label: '中古MacBookの購入先比較' },
    ],
  },
  {
    href: '/airpods/', label: '中古AirPods',
    children: [
      { href: '/airpods/', label: '中古AirPodsの選び方ガイド' },
      { href: '/airpods/recommend/', label: '中古AirPodsおすすめ機種' },
      { href: '/airpods/price-info/', label: '中古AirPodsの相場価格' },
      { href: '/airpods/used-airpods-attention/', label: '中古AirPodsの注意点' },
    ],
  },
  { href: '/contact/', label: 'お問い合わせ' },
  { href: '/profile/', label: '運営者情報' },
]

// ---------- フッターナビゲーション ----------

export const FOOTER_LINKS: Record<string, { href: string; label: string }[]> = {
  iphone: [
    { href: '/iphone/', label: '中古iPhoneの選び方ガイド' },
    { href: '/iphone/recommend/', label: '中古iPhoneおすすめ機種' },
    { href: '/iphone/filter-search/', label: 'iPhone機種診断ツール' },
    { href: '/iphone/price-info/', label: '中古iPhoneの相場価格' },
    { href: '/iphone/iphone-spec-table/', label: 'iPhoneスペック比較表' },
    { href: '/iphone/iphone-shop/', label: '中古iPhone購入先比較' },
  ],
  ipad: [
    { href: '/ipad/', label: '中古iPadの選び方ガイド' },
    { href: '/ipad/recommend/', label: '中古iPadおすすめ機種' },
    { href: '/ipad/ipad-filter-search/', label: 'iPad機種診断ツール' },
    { href: '/ipad/ipad-price-info/', label: '中古iPadの相場価格' },
    { href: '/ipad/ipad-spec-table/', label: 'iPadスペック比較表' },
    { href: '/ipad/ipad-shop/', label: '中古iPad購入先比較' },
  ],
  macbook: [
    { href: '/macbook/', label: '中古MacBookの選び方ガイド' },
    { href: '/macbook/recommend/', label: '中古MacBookおすすめ機種' },
    { href: '/macbook/price-info/', label: '中古MacBookの相場価格' },
    { href: '/macbook/macbook-spec-table/', label: 'MacBookスペック比較表' },
    { href: '/macbook/air-pro-compare/', label: 'MacBook Air vs Pro比較' },
    { href: '/macbook/macbook-shop/', label: '中古MacBook購入先比較' },
  ],
  watch: [
    { href: '/watch/', label: '中古Apple Watch選び方ガイド' },
    { href: '/watch/recommend/', label: '中古Apple Watchおすすめ機種' },
    { href: '/watch/watch-filter-search/', label: 'Apple Watch機種診断ツール' },
    { href: '/watch/watch-price-info/', label: '中古Apple Watchの相場価格' },
    { href: '/watch/watch-spec-table/', label: 'Apple Watchスペック比較表' },
    { href: '/watch/watch-shop/', label: '中古Apple Watch購入先比較' },
  ],
  airpods: [
    { href: '/airpods/', label: '中古AirPodsの選び方ガイド' },
    { href: '/airpods/recommend/', label: '中古AirPodsおすすめ機種' },
    { href: '/airpods/airpods-filter-search/', label: 'AirPods機種診断ツール' },
    { href: '/airpods/price-info/', label: '中古AirPodsの相場価格' },
    { href: '/airpods/airpods-buy/', label: 'AirPodsを安く買う方法' },
  ],
}

export const UTILITY_FOOTER_LINKS: { href: string; label: string }[] = [
  { href: '/profile/', label: 'ユーズドラボについて' },
  { href: '/contact/', label: 'お問い合わせ' },
  { href: '/guidelines/', label: 'コンテンツ制作ポリシー' },
  { href: '/privacy-policy/', label: 'プライバシーポリシー' },
  { href: '/sitemap-page/', label: 'サイトマップ' },
]

// ---------- ヘルパー ----------

/** sitemap.ts 用: 全静的ページのパス・priority・changeFrequency をフラット配列で返す */
export function getAllStaticRoutes(): { path: string; priority: number; changeFrequency: ChangeFreq }[] {
  const topPage = { path: '/', priority: 1.0, changeFrequency: 'weekly' as ChangeFreq }

  const productPages = PRODUCT_CATEGORIES.flatMap((cat) =>
    cat.pages.map((page) => ({
      path: page.path,
      priority: page.priority ?? 0.8,
      changeFrequency: (page.changeFrequency ?? 'weekly') as ChangeFreq,
    })),
  )

  const utilityPages = UTILITY_PAGES
    .filter((page) => page.includeInSitemap !== false)
    .map((page) => ({
      path: page.path,
      priority: page.priority ?? 0.8,
      changeFrequency: (page.changeFrequency ?? 'weekly') as ChangeFreq,
    }))

  return [topPage, ...productPages, ...utilityPages]
}

/** sitemap-page 用: ラベルを解決してカテゴリ配列を返す */
export function resolveCategories(params: LabelParams): ResolvedCategory[] {
  return PRODUCT_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    icon: cat.icon,
    desc: cat.desc,
    basePath: cat.basePath,
    staticPages: cat.pages.map((page) => ({
      href: page.path,
      label: typeof page.label === 'function' ? page.label(params) : page.label,
    })),
  }))
}
