// ============================================================
// 中古iPhone完全購入ガイドページ — 一元管理データ
// ============================================================

const now = new Date()
export const GUIDE_YEAR = `${now.getFullYear()}`
export const GUIDE_MONTH = `${now.getMonth() + 1}`
export const GUIDE_DATE_LABEL = `${GUIDE_YEAR}年${GUIDE_MONTH}月`

// ---------- 中古相場セクション: 表示するモデルのslug ----------
export const GUIDE_PRICE_SLUGS = [
  'se3',
  '14normal',
  '14plus',
  '15normal',
  '14pro',
  '16e-se',
]

// ---------- スペック比較リンク ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/iphone/iphone-spec-table/', icon: 'fa-table-cells', title: '歴代iPhoneスペック比較表', desc: 'CPU、ディスプレイ、重量、端子など、歴代iPhoneの全スペックを網羅した一覧表。' },
  { href: '/iphone/used-iphone-support/', icon: 'fa-shield-halved', title: 'iOSサポート期間一覧表', desc: '各モデルのサポート終了予測を解説。「いつまで使えるか」の目安がわかります。' },
  { href: '/iphone/iphone-camera/', icon: 'fa-camera', title: 'iPhoneカメラ性能比較表', desc: 'レンズ構成、撮影機能を徹底比較。シネマティックモード、ナイトモード対応状況も掲載。' },
  { href: '/iphone/battery-compare/', icon: 'fa-battery-full', title: 'バッテリー性能比較ランキング', desc: '動画再生時間、音楽再生時間、バッテリー容量(mAh)を一覧表で比較できます。' },
] as const

// ---------- FAQ ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '自分に合った中古iPhoneの選び方は？',
    answer: '用途や予算に応じて最適なモデルは異なります。カメラ重視ならProシリーズ、コスパ重視ならiPhone SE、バランス重視なら無印モデルがおすすめです。「スマホ機種診断シミュレーター」で条件を絞り込むと、あなたに合った機種が見つかります。',
  },
  {
    question: 'iPhoneのスペックを比較したい',
    answer: '「歴代iPhoneのスペック比較表」で、歴代iPhoneのスペックを並べて比較できます。カメラ性能に特化した比較は「歴代iPhoneのカメラ性能比較」でご覧いただけます。',
  },
  {
    question: '中古iPhoneを買うベストなタイミングはいつですか？',
    answer: '新型iPhone発売直後（9〜10月）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。当サイトの価格推移グラフで、値下がり傾向を確認してから購入するのがおすすめです。',
  },
  {
    question: '中古iPhoneのランク（A/B/C）の違いは何ですか？',
    answer: '一般的に、Aランクは傷がほぼない美品、Bランクは軽微な傷がある良品、Cランクは目立つ傷がある並品です。実用上はBランクでも問題なく使用でき、コストパフォーマンスが高いです。',
  },
  {
    question: '中古iPhoneはどこで買うのがおすすめですか？',
    answer: '信頼性と保証の観点から、イオシス・ゲオ・じゃんぱらなどの大手中古専門店がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。',
  },
  {
    question: '中古iPhoneはいつまで使えますか？',
    answer: 'iPhoneはAppleの発売から約6〜7年間iOSアップデートのサポートを受けられます。長く使いたい場合は、発売から3年以内のモデルを選ぶと安心です。',
  },
  {
    question: '中古iPhoneのバッテリー状態は確認できますか？',
    answer: 'はい、iPhoneの「設定」→「バッテリー」→「バッテリーの状態」から最大容量を確認できます。80%以上あれば実用上問題ありません。中古専門店では商品ページにバッテリー状態が記載されていることが多いです。',
  },
  {
    question: 'ネットワーク利用制限△の中古iPhoneは買っても大丈夫？',
    answer: 'ネットワーク利用制限△は、前の所有者の分割払いが完了していない状態を示します。△でも通常利用は可能ですが、価格が安い分リスクもあるため、心配な方は○（制限なし）の端末を選ぶのが安心です。',
  },
]

// ---------- 歴代iPhone個別記事リンク ----------
export const GUIDE_MODEL_LINKS = {
  pro: [
    { slug: '17pro', name: 'iPhone17 Pro', meta: '2025年9月発売 / A19 pro Bionic' },
    { slug: '17promax', name: 'iPhone17 Pro Max', meta: '2025年9月発売 / A19 pro Bionic' },
    { slug: '16pro', name: 'iPhone16 Pro', meta: '2024年9月発売 / A18 Pro' },
    { slug: '16promax', name: 'iPhone16 Pro Max', meta: '2024年9月発売 / A18 Pro' },
    { slug: '15pro', name: 'iPhone15 Pro', meta: '2023年9月発売 / A17 Pro' },
    { slug: '15promax', name: 'iPhone 15 Pro Max', meta: '2023年9月発売 / A17 Pro' },
    { slug: '14pro', name: 'iPhone14 Pro', meta: '2022年9月発売 / A16 Bionic' },
    { slug: '14promax', name: 'iPhone 14 Pro Max', meta: '2022年9月発売 / A16 Bionic' },
    { slug: '13pro', name: 'iPhone13 Pro', meta: '2021年9月発売 / A15 Bionic' },
    { slug: '13promax', name: 'iPhone 13 Pro Max', meta: '2021年9月発売 / A15 Bionic' },
    { slug: '12pro', name: 'iPhone12 Pro', meta: '2020年11月発売 / A14 Bionic' },
    { slug: '12promax', name: 'iPhone 12 Pro Max', meta: '2020年11月発売 / A14 Bionic' },
    { slug: '11pro', name: 'iPhone11 Pro', meta: '2019年9月発売 / A13 Bionic' },
    { slug: '11promax', name: 'iPhone11 Pro Max', meta: '2019年9月発売 / A13 Bionic' },
  ],
  standard: [
    { slug: '17normal', name: 'iPhone 17', meta: '2025年9月発売 / A19 Bionic' },
    { slug: 'air', name: 'iPhone Air', meta: '2025年9月発売 / A19 pro Bionic' },
    { slug: '16e-se', name: 'iPhone16e', meta: '2025年2月発売 / A18 Bionic' },
    { slug: '16normal', name: 'iPhone 16', meta: '2024年9月発売 / A18 Bionic' },
    { slug: '16plus', name: 'iPhone 16 Plus', meta: '2024年9月発売 / A18 Bionic' },
    { slug: '15normal', name: 'iPhone15', meta: '2023年9月発売 / A16 Bionic' },
    { slug: '15plus', name: 'iPhone15 Plus', meta: '2023年9月発売 / A16 Bionic' },
    { slug: '14normal', name: 'iPhone14', meta: '2022年9月発売 / A15 Bionic' },
    { slug: '14plus', name: 'iPhone14 Plus', meta: '2022年9月発売 / A15 Bionic' },
    { slug: '13normal', name: 'iPhone13', meta: '2021年9月発売 / A15 Bionic' },
    { slug: '13mini', name: 'iPhone13 mini', meta: '2021年9月発売 / A15 Bionic' },
    { slug: '12normal', name: 'iPhone12', meta: '2020年11月発売 / A14 Bionic' },
    { slug: '12mini', name: 'iPhone12 mini', meta: '2020年11月発売 / A14 Bionic' },
    { slug: '11normal', name: 'iPhone11', meta: '2019年9月発売 / A13 Bionic' },
  ],
  other: [
    { slug: 'se3', name: 'iPhone SE 第3世代', meta: '2022年3月発売 / A15 Bionic' },
    { slug: 'se2', name: 'iPhone SE 第2世代', meta: '2020年4月発売 / A13 Bionic' },
  ],
}

// ---------- ショップ比較カードセクション ----------
import { buildVendorCards } from '@/lib/data/guide-shared'

export const GUIDE_VENDOR_CARDS = buildVendorCards(
  {
    'イオシス': 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fiphone',
    'にこスマ': 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fiphone',
    'ゲオ': 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fc%2Fc1001%2F',
    'リコレ': 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fiphone%2Fiphone_linklist',
    'じゃんぱら': 'https://www.janpara.co.jp/',
    'Amazon整備済み品': 'https://amzn.to/4ePUzhA',
  },
  '中古iPhoneを探す',
)
