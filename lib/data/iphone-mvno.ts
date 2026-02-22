// ============================================================
// 格安SIM×中古iPhone ページ — 一元管理データ
// ============================================================

export const MVNO_PAGE_YEAR = '2026'
export const MVNO_PAGE_DATE_LABEL = `${MVNO_PAGE_YEAR}年版`

// ---------- 事業者メタデータ ----------

export type MvnoProviderMeta = {
  slug: string
  name: string
  description: string
  network: string
  deviceSales: boolean          // 中古iPhoneの端末販売があるか
  deviceSalesNote: string       // 端末販売の補足
  officialUrl: string
  color: string                 // ブランドカラー（CSSで使用）
  icon: string                  // Font Awesome アイコンクラス
  subtitle: string              // カード本文の見出し
  goodFor: string[]             // こんな人におすすめ
  badFor: string[]              // こんな人には向かない
}

export const MVNO_PROVIDERS: MvnoProviderMeta[] = [
  {
    slug: 'rakuten-mobile',
    name: '楽天モバイル',
    description: 'MNO参入で注目の第4キャリア。Rakuten Linkアプリで国内通話が無料になるのが最大の特徴。iPhoneの販売も行っており、端末と回線をセットで契約できる。',
    network: '楽天回線',
    deviceSales: true,
    deviceSalesNote: '新品・楽天リファービッシュ品を販売',
    officialUrl: 'https://network.mobile.rakuten.co.jp/',
    color: '#bf0000',
    icon: 'fa-solid fa-signal',
    subtitle: '楽天経済圏ユーザーなら、ポイント還元でさらにお得に',
    goodFor: ['楽天回線の品質を求める人', '対面サポートを受けたい人', 'MNP乗り換えで端末を安く手に入れたい人'],
    badFor: ['au・ドコモ・ソフトバンク回線を使いたい人', '楽天回線のエリアに不安がある人'],
  },
  {
    slug: 'iijmio',
    name: 'IIJmio',
    description: 'MVNEの大手IIJが運営する老舗格安SIM。業界最安水準の料金と豊富なプラン構成が魅力。中古iPhoneの端末販売も積極的に行っており、回線とセットでお得に購入できる。',
    network: 'ドコモ回線 / au回線',
    deviceSales: true,
    deviceSalesNote: '未使用品・中古美品を販売',
    officialUrl: 'https://www.iijmio.jp/',
    color: '#c41a2e',
    icon: 'fa-solid fa-microchip',
    subtitle: '業界最安水準の料金と豊富なプラン構成',
    goodFor: ['とにかく安さを求める人', 'データ容量を細かく選びたい人', 'MNP乗り換えで端末を安く手に入れたい人'],
    badFor: ['店舗サポートが必要な人', '通信速度を最重視する人'],
  },
  {
    slug: 'uq-mobile',
    name: 'UQモバイル',
    description: 'au回線を使ったKDDIのサブブランド。通信品質はauと同等で安定感が抜群。自宅セット割やauPAYカード割の適用で大幅に安くなる。認定中古品のiPhoneも販売中。',
    network: 'au回線',
    deviceSales: true,
    deviceSalesNote: 'au Certified（認定中古品）を販売',
    officialUrl: 'https://www.uqwimax.jp/mobile/',
    color: '#e91e63',
    icon: 'fa-solid fa-tower-cell',
    subtitle: 'au品質の回線で安定通信、認定中古品で安心',
    goodFor: ['au回線の安定性を求める人', '認定中古品の品質を重視する人', '店舗サポートを受けたい人'],
    badFor: ['最安料金を求める人', 'ドコモ・ソフトバンク回線を使いたい人'],
  },
  {
    slug: 'ymobile',
    name: 'ワイモバイル',
    description: 'ソフトバンクのサブブランド。全国のソフトバンクショップやワイモバイルショップで対面サポートを受けられるのが強み。家族割やおうち割で月額料金が大幅に安くなる。ソフトバンク認定中古品のiPhoneも取り扱い中。',
    network: 'ソフトバンク回線',
    deviceSales: true,
    deviceSalesNote: 'ソフトバンク認定中古品を販売',
    officialUrl: 'https://www.ymobile.jp/',
    color: '#e4002b',
    icon: 'fa-solid fa-store',
    subtitle: 'ソフトバンク回線の安定性と全国の店舗サポート',
    goodFor: ['対面サポートを重視する人', '家族割やおうち割を活用できる人', 'ソフトバンク回線を使いたい人'],
    badFor: ['最安料金を求める人', 'ドコモ・au回線を使いたい人'],
  },
  {
    slug: 'ahamo',
    name: 'ahamo',
    description: 'ドコモのオンライン専用プラン。30GBで月額2,970円というシンプルな料金体系が特徴。5分かけ放題が標準付帯。ドコモ品質の回線を格安で利用できる。',
    network: 'ドコモ回線',
    deviceSales: true,
    deviceSalesNote: '新品iPhoneを販売',
    officialUrl: 'https://ahamo.com/',
    color: '#0071e3',
    icon: 'fa-solid fa-bolt',
    subtitle: 'ドコモ品質の回線を格安で、5分通話無料付き',
    goodFor: ['ドコモ回線の品質を求める人', 'シンプルな料金体系が好きな人', '5分以内の通話が多い人'],
    badFor: ['店舗サポートが必要な人', '少量データで安く済ませたい人'],
  },
  {
    slug: 'aeon-mobile',
    name: 'イオンモバイル',
    description: '全国のイオン店舗で契約・サポートが受けられる格安SIM。対面サポートを重視する方に最適。料金プランは1GB刻みで選べる細かさが魅力。中古iPhoneの販売も一部店舗で対応。',
    network: 'ドコモ回線 / au回線',
    deviceSales: true,
    deviceSalesNote: '一部店舗で中古端末を販売',
    officialUrl: 'https://aeonmobile.jp/',
    color: '#8b138b',
    icon: 'fa-solid fa-shop',
    subtitle: '全国のイオン店舗で契約・サポートが受けられる',
    goodFor: ['対面サポートを重視する人', 'データ容量を細かく選びたい人', 'シニア向けプランを探している人'],
    badFor: ['最新iPhoneを求める人', '端末の品質保証を重視する人'],
  },
  {
    slug: 'geo-mobile',
    name: 'ゲオモバイル',
    description: 'ゲオの中古品質管理とUQモバイルSIMのセット販売に特化。赤ロム永久保証付きで安心。端末割引で1円端末が出ることもある。',
    network: 'au回線',
    deviceSales: true,
    deviceSalesNote: 'ゲオ独自の中古iPhone+UQモバイルSIMセット',
    officialUrl: 'https://mvno.geo-mobile.jp/uqmobile/',
    color: '#00579c',
    icon: 'fa-solid fa-recycle',
    subtitle: 'ゲオの中古品質とUQモバイルSIMのセットでお得に',
    goodFor: ['端末を1円でも安く手に入れたい人', '赤ロム永久保証が欲しい人', 'UQモバイルを使いたい人'],
    badFor: ['UQモバイル以外を使いたい人', 'バッテリー保証を重視する人'],
  },
  {
    slug: 'mineo',
    name: 'mineo',
    description: 'オプテージが運営するマルチキャリア対応の格安SIM。ドコモ・au・ソフトバンクの3回線から選べる。独自の「マイそく」プランは速度制限ありだが使い放題で人気。中古iPhoneの販売も行っている。',
    network: 'ドコモ / au / ソフトバンク回線',
    deviceSales: true,
    deviceSalesNote: '中古iPhone（国内版SIMフリー）を販売',
    officialUrl: 'https://mineo.jp/',
    color: '#7cbb42',
    icon: 'fa-solid fa-people-group',
    subtitle: '3キャリア対応で最新iPhoneも選べる',
    goodFor: ['回線を自由に選びたい人', '最新iPhoneをセットで買いたい人', '長期利用で特典を得たい人'],
    badFor: ['最安料金を求める人', '通信速度を最重視する人'],
  },
]

// ---------- slug → 事業者メタ検索ヘルパー ----------
export const getProviderMeta = (slug: string) =>
  MVNO_PROVIDERS.find((p) => p.slug === slug) ?? null
