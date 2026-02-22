// ============================================================
// 中古iPad完全購入ガイドページ — 一元管理データ
// ============================================================

const now = new Date()
export const GUIDE_YEAR = `${now.getFullYear()}`
export const GUIDE_MONTH = `${now.getMonth() + 1}`
export const GUIDE_DATE_LABEL = `${GUIDE_YEAR}年${GUIDE_MONTH}月`

// ---------- 中古相場セクション: 表示するモデルのslug ----------
export const GUIDE_PRICE_SLUGS = [
  'normal-10',
  'mini-6',
  'air-5',
  'air-6-11',
  'pro11-3',
  'pro12-6',
]

// ---------- スペック比較リンク ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/ipad/ipad-spec-table/', icon: 'fa-table-cells', title: '歴代iPadスペック比較表', desc: 'CPU、ディスプレイ、重量、端子など、歴代iPadの全スペックを網羅した一覧表。' },
  { href: '/ipad/used-ipad-support/', icon: 'fa-shield-halved', title: 'iPadOSサポート期間一覧表', desc: '各モデルのサポート終了予測を解説。「いつまで使えるか」の目安がわかります。' },
  { href: '/ipad/apple-pencil-compare/', icon: 'fa-pen-fancy', title: 'Apple Pencil対応比較表', desc: 'Apple Pencilの世代ごとの対応状況・機能の違いを一覧で比較できます。' },
  { href: '/ipad/wifi-cellular/', icon: 'fa-wifi', title: 'Wi-Fi vs Cellularモデル比較', desc: 'Wi-FiモデルとCellularモデルの違い、選び方のポイントを解説。' },
] as const

// ---------- FAQ ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '自分に合った中古iPadの選び方は？',
    answer: '用途や予算に応じて最適なモデルは異なります。イラスト・動画編集ならProシリーズ、コスパ重視ならiPad（無印）、持ち運び重視ならiPad mini、バランス重視ならiPad Airがおすすめです。「iPad機種診断シミュレーター」で条件を絞り込むと、あなたに合った機種が見つかります。',
  },
  {
    question: 'iPadのスペックを比較したい',
    answer: '「歴代iPadスペック比較表」で、歴代iPadのスペックを並べて比較できます。Apple Pencilの対応状況は「Apple Pencil対応比較表」でご覧いただけます。',
  },
  {
    question: '中古iPadを買うベストなタイミングはいつですか？',
    answer: '新型iPad発売直後は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。当サイトの価格推移グラフで、値下がり傾向を確認してから購入するのがおすすめです。',
  },
  {
    question: 'Wi-FiモデルとCellularモデルどちらを選ぶべき？',
    answer: '自宅やWi-Fi環境での利用がメインならWi-Fiモデルで十分です。外出先でも単体で通信したい場合はCellularモデルがおすすめですが、スマホのテザリングでも代用可能です。',
  },
  {
    question: '中古iPadはどこで買うのがおすすめですか？',
    answer: '信頼性と保証の観点から、イオシス・ゲオ・じゃんぱらなどの大手中古専門店がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。',
  },
  {
    question: '中古iPadはいつまで使えますか？',
    answer: 'iPadはAppleの発売から約6〜7年間iPadOSアップデートのサポートを受けられます。長く使いたい場合は、発売から3年以内のモデルを選ぶと安心です。',
  },
  {
    question: 'Apple Pencilはどの世代のiPadに対応していますか？',
    answer: 'Apple Pencilには第1世代、第2世代、USB-C、Proの4種類があり、対応するiPadモデルが異なります。購入前に必ず対応状況を確認しましょう。',
  },
  {
    question: '中古iPadのランク（A/B/C）の違いは何ですか？',
    answer: '一般的に、Aランクは傷がほぼない美品、Bランクは軽微な傷がある良品、Cランクは目立つ傷がある並品です。実用上はBランクでも問題なく使用でき、コストパフォーマンスが高いです。',
  },
]

// ---------- 歴代iPad個別記事リンク ----------
export const GUIDE_MODEL_LINKS = {
  pro: [
    { slug: 'pro11-6', name: 'iPad Pro 11インチ 第6世代', meta: '2025年発売 / M5' },
    { slug: 'pro13-2', name: 'iPad Pro 13インチ 第2世代', meta: '2025年発売 / M5' },
    { slug: 'pro11-5', name: 'iPad Pro 11インチ 第5世代', meta: '2024年5月発売 / M4' },
    { slug: 'pro13-1', name: 'iPad Pro 13インチ 第1世代', meta: '2024年5月発売 / M4' },
    { slug: 'pro11-4', name: 'iPad Pro 11インチ 第4世代', meta: '2022年10月発売 / M2' },
    { slug: 'pro12-6', name: 'iPad Pro 12.9インチ 第6世代', meta: '2022年10月発売 / M2' },
    { slug: 'pro11-3', name: 'iPad Pro 11インチ 第3世代', meta: '2021年5月発売 / M1' },
    { slug: 'pro12-5', name: 'iPad Pro 12.9インチ 第5世代', meta: '2021年5月発売 / M1' },
    { slug: 'pro11-2', name: 'iPad Pro 11インチ 第2世代', meta: '2020年3月発売 / A12Z Bionic' },
    { slug: 'pro12-4', name: 'iPad Pro 12.9インチ 第4世代', meta: '2020年3月発売 / A12Z Bionic' },
  ],
  air: [
    { slug: 'air-7-11', name: 'iPad Air 11インチ 第7世代', meta: '2025年発売 / M3' },
    { slug: 'air-7-13', name: 'iPad Air 13インチ 第7世代', meta: '2025年発売 / M3' },
    { slug: 'air-6-11', name: 'iPad Air 11インチ 第6世代', meta: '2024年5月発売 / M2' },
    { slug: 'air-6-13', name: 'iPad Air 13インチ 第6世代', meta: '2024年5月発売 / M2' },
    { slug: 'air-5', name: 'iPad Air 第5世代', meta: '2022年3月発売 / M1' },
    { slug: 'air-4', name: 'iPad Air 第4世代', meta: '2020年10月発売 / A14 Bionic' },
  ],
  standard: [
    { slug: 'normal-11', name: 'iPad 第11世代', meta: '2025年発売 / A16 Bionic' },
    { slug: 'normal-10', name: 'iPad 第10世代', meta: '2022年10月発売 / A14 Bionic' },
    { slug: 'normal-9', name: 'iPad 第9世代', meta: '2021年9月発売 / A13 Bionic' },
  ],
  mini: [
    { slug: 'mini-7', name: 'iPad mini 第7世代', meta: '2024年10月発売 / A17 Pro' },
    { slug: 'mini-6', name: 'iPad mini 第6世代', meta: '2021年9月発売 / A15 Bionic' },
    { slug: 'mini-5', name: 'iPad mini 第5世代', meta: '2019年3月発売 / A12 Bionic' },
  ],
}

// ---------- ショップ比較カードセクション ----------
import { buildVendorCards } from '@/lib/data/guide-shared'

export const GUIDE_VENDOR_CARDS = buildVendorCards(
  {
    'イオシス': 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Ftablet%2Fios%2Fipad',
    'にこスマ': 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Ftablet-top',
    'ゲオ': 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fc%2Fc1060%2F',
    'リコレ': 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fipad%2Fipad_linklist',
    'じゃんぱら': 'https://www.janpara.co.jp/sale/search/result/?SSHPCODE=&OUTCLSCODE=79&KEYWORDS=iPad&x=0&y=0&CHKOUTCOM=1',
    'Amazon整備済み品': 'https://amzn.to/3LMSAO3',
  },
  '中古iPadを探す',
)
