// ============================================================
// 中古Apple Watch完全購入ガイドページ — 一元管理データ
// ============================================================

const now = new Date()
export const GUIDE_YEAR = `${now.getFullYear()}`
export const GUIDE_MONTH = `${now.getMonth() + 1}`
export const GUIDE_DATE_LABEL = `${GUIDE_YEAR}年${GUIDE_MONTH}月`

// ---------- 中古相場セクション: 表示するモデルのslug ----------
export const GUIDE_PRICE_SLUGS = [
  'se2-2',
  'se3-2',
  'series8',
  'series9',
  'ultra',
  'ultra2',
]

// ---------- スペック比較リンク ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/watch/watch-spec-table/', icon: 'fa-table-cells', title: '歴代Apple Watchスペック比較表', desc: 'チップ、ケースサイズ、センサー、バッテリーなど、歴代Apple Watchの全スペックを一覧で比較。' },
  { href: '/watch/used-watch-support/', icon: 'fa-shield-halved', title: 'watchOSサポート期間一覧表', desc: '各モデルのサポート終了予測を解説。「いつまで使えるか」の目安がわかります。' },
  { href: '/watch/watch-price-info/', icon: 'fa-chart-line', title: 'Apple Watch中古相場・価格推移グラフ', desc: 'イオシス・ゲオ・じゃんぱらの価格推移を毎日更新。値下がり傾向がひと目でわかります。' },
  { href: '/watch/used-watch-attention/', icon: 'fa-triangle-exclamation', title: '中古Apple Watchの注意点と選び方', desc: '購入前に確認すべきポイントや失敗しないためのチェックリストをまとめています。' },
  { href: '/watch/how-to-use-apple-watch/', icon: 'fa-list-check', title: 'Apple Watchのできること25選', desc: '基本機能・健康管理・決済・Apple製品連携など、便利な機能や使い方を初心者向けに解説。' },
  { href: '/watch/gps-cellular-compare/', icon: 'fa-satellite-dish', title: 'GPSモデルとセルラーモデルの違い', desc: '単体でできること・ランニングコスト・素材の違いなど5つの観点で比較し、どちらを選ぶべきか解説。' },
  { href: '/watch/apple-watch-always-lit/', icon: 'fa-sun', title: '常時点灯ディスプレイは必要？', desc: '常時表示のメリット・デメリット、バッテリーへの影響、対応モデル一覧をまとめています。' },
  { href: '/watch/apple-watch-buy/', icon: 'fa-tags', title: 'Apple Watchを安く買うには？購入先7つを比較', desc: 'Apple認定整備済製品・中古ショップ・ECモール・家電量販店など7つの購入先を価格・保証で比較。' },
] as const

// ---------- FAQ ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '自分に合った中古Apple Watchの選び方は？',
    answer: '用途や予算に応じて最適なモデルは異なります。万能モデルならSeries 9、コスパ重視ならSE 第3世代、アウトドア・バッテリー重視ならUltra 2がおすすめです。「Apple Watch機種絞り込みツール」で条件を絞り込むと、あなたに合った機種が見つかります。',
  },
  {
    question: 'Apple Watchのスペックを比較したい',
    answer: '「歴代Apple Watchスペック比較表」で、歴代Apple Watchのスペックを並べて比較できます。チップ性能、ケースサイズ、健康センサーの対応状況などを一覧で確認できます。',
  },
  {
    question: '中古Apple Watchを買うベストなタイミングはいつですか？',
    answer: '新型Apple Watch発売直後（9〜10月）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。当サイトの価格推移グラフで、値下がり傾向を確認してから購入するのがおすすめです。',
  },
  {
    question: 'Apple WatchのGPSモデルとCellularモデルの違いは？',
    answer: 'GPSモデルはiPhoneと接続して使う基本モデルです。CellularモデルはiPhoneがなくても単体で通話やデータ通信が可能です。ただしCellularモデルは別途通信契約が必要で、中古価格も高めです。大半の方はGPSモデルで十分です。',
  },
  {
    question: '中古Apple Watchはどこで買うのがおすすめですか？',
    answer: '信頼性と保証の観点から、イオシス・ゲオ・じゃんぱらなどの大手中古専門店がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。',
  },
  {
    question: '中古Apple Watchはいつまで使えますか？',
    answer: 'Apple Watchは発売から約5年間watchOSアップデートのサポートを受けられます。長く使いたい場合は、発売から2〜3年以内のモデルを選ぶと安心です。',
  },
  {
    question: '中古Apple Watchのバッテリー状態は確認できますか？',
    answer: 'はい、Apple Watchの「設定」→「バッテリー」→「バッテリーの状態」から最大容量を確認できます。80%以上あれば実用上問題ありません。中古専門店では商品ページにバッテリー状態が記載されていることが多いです。',
  },
  {
    question: 'Apple WatchはどのiPhoneと組み合わせて使えますか？',
    answer: '最新のwatchOSを利用するには、iPhone 8s以降（iOS 18以降対応）のiPhoneが必要です。古いiPhoneを使っている場合は、Apple Watchとの互換性を事前に確認しましょう。',
  },
]

// ---------- 歴代Apple Watch個別記事リンク ----------
export const GUIDE_MODEL_LINKS = {
  series: [
    { slug: 'series11', name: 'Apple Watch Series 11', meta: '2025年9月発売 / S11' },
    { slug: 'series10', name: 'Apple Watch Series 10', meta: '2024年9月発売 / S10' },
    { slug: 'series9', name: 'Apple Watch Series 9', meta: '2023年9月発売 / S9' },
    { slug: 'series8', name: 'Apple Watch Series 8', meta: '2022年9月発売 / S8' },
    { slug: 'series7', name: 'Apple Watch Series 7', meta: '2021年10月発売 / S7' },
    { slug: 'series6', name: 'Apple Watch Series 6', meta: '2020年9月発売 / S6' },
    { slug: 'series5', name: 'Apple Watch Series 5', meta: '2019年9月発売 / S5' },
    { slug: 'series4', name: 'Apple Watch Series 4', meta: '2018年9月発売 / S4' },
  ],
  ultra: [
    { slug: 'ultra3', name: 'Apple Watch Ultra 3', meta: '2025年9月発売 / S11' },
    { slug: 'ultra2', name: 'Apple Watch Ultra 2', meta: '2023年9月発売 / S9' },
    { slug: 'ultra', name: 'Apple Watch Ultra', meta: '2022年9月発売 / S8' },
  ],
  se: [
    { slug: 'se3-2', name: 'Apple Watch SE 第3世代', meta: '2025年3月発売 / S10' },
    { slug: 'se2-2', name: 'Apple Watch SE 第2世代', meta: '2022年9月発売 / S8' },
    { slug: 'se', name: 'Apple Watch SE', meta: '2020年9月発売 / S5' },
  ],
}

// ---------- ショップ比較カードセクション ----------
import { buildVendorCards } from '@/lib/data/guide-shared'

export const GUIDE_VENDOR_CARDS = buildVendorCards(
  {
    'イオシス': 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fwearable%2Fapple%3Fnot%3Dpencil',
    'にこスマ': 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fiphone',
    'ゲオ': 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26tree%3D1214',
    'リコレ': 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fwtc%3Fcategories1%255B%255D%3Dwtc%26categories2%255B%255D%3Dapple-watch',
    'じゃんぱら': 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=apple+watch&ORDER=1',
    'Amazon整備済み品': 'https://amzn.to/4djok9E',
  },
  '中古Apple Watchを探す',
)
