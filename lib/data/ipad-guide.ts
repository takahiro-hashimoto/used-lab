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
  { href: '/ipad/accessories-summary/', icon: 'fa-keyboard', title: 'Magic Keyboard 型番・対応一覧', desc: '歴代iPadに対応するMagic Keyboard・Smart Keyboardの型番と対応機種を一覧で紹介。' },
  { href: '/ipad/wifi-cellular/', icon: 'fa-wifi', title: 'Wi-Fi vs Cellularモデル比較', desc: 'Wi-FiモデルとCellularモデルの違い、選び方のポイントを解説。' },
  { href: '/macbook/ipad-macbook-compare/', icon: 'fa-laptop', title: 'iPad vs MacBook 徹底比較', desc: 'iPadとMacBookの違いを用途別に比較。どちらを選ぶべきか迷っている方必見。' },
  { href: '/ipad/storage-guide/', icon: 'fa-hard-drive', title: 'ストレージ容量ガイド', desc: '用途別のおすすめ容量と歴代モデルの容量ラインナップをまとめています。' },
  { href: '/ipad/benchmark/', icon: 'fa-ranking-star', title: '歴代iPadベンチマーク比較', desc: 'Geekbench 6・AnTuTuスコアで歴代iPadの性能をランキング形式で比較。' },
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
  {
    question: 'iPad ProとiPad Airはどっちがいい？',
    answer: 'iPad Proは最大120HzのProMotionディスプレイ、LiDARスキャナ、Thunderbolt対応など、プロ向けの機能が充実しています。一方iPad Airは、M1/M2チップ搭載で十分高性能ながら価格が抑えめなのが魅力です。動画編集や3D制作などの高負荷作業にはPro、ノートやイラスト・写真編集などの日常用途ならAirがコスパに優れています。',
  },
  {
    question: 'iPadのストレージ容量はどれを選ぶべき？',
    answer: 'Web閲覧・動画視聴・ノートアプリがメインなら64GBでも運用可能です。写真やイラスト、アプリを多く入れるなら128GB以上、動画編集やゲームを本格的に楽しむなら256GB以上がおすすめです。iPadはストレージの後から増設ができないため、迷ったら1段階上の容量を選んでおくと後悔しにくくなります。詳しくは「ストレージ容量ガイド」をご覧ください。',
  },
  {
    question: 'メルカリやヤフオクで中古iPadを買っても大丈夫？',
    answer: 'フリマアプリやオークションサイトは相場より安く手に入る可能性がある反面、アクティベーションロック解除漏れ・バッテリー劣化・赤ロム（ネットワーク利用制限）といったリスクがあり、個人間取引のため返品保証もありません。初めて中古iPadを購入する方は、動作確認済み・保証付きの中古専門店を利用するのが安心です。',
  },
  {
    question: 'Apple認定整備済製品と中古iPadの違いは？',
    answer: 'Apple認定整備済製品はAppleが検品・部品交換・クリーニングを行い、バッテリーと外装が新品に交換済みで1年間のApple保証が付きます。価格は新品の最大15%オフ程度です。一方、中古ショップのiPadは型落ちモデルも含め選択肢が豊富で、整備済製品よりさらに安く手に入ります。保証期間や外装状態に差があるため、予算と安心感のバランスで選ぶのがおすすめです。',
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
