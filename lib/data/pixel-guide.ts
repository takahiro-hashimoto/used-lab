// ============================================================
// 中古Google Pixelおすすめ機種・選び方ガイドページ — 一元管理データ
// ============================================================

const now = new Date()
export const GUIDE_YEAR = `${now.getFullYear()}`
export const GUIDE_MONTH = `${now.getMonth() + 1}`
export const GUIDE_DATE_LABEL = `${GUIDE_YEAR}年${GUIDE_MONTH}月`

// ---------- 中古相場セクション: 表示するモデルのslug ----------
export const GUIDE_PRICE_SLUGS = [
  'pixel-9',
  'pixel-8',
  'pixel-8a',
  'pixel-7a',
  'pixel-9a',
  'pixel-8-pro',
]

// ---------- スペック比較リンク（存在するページのみ） ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/pixel/pixel-spec-table/', icon: 'fa-table-cells', title: '歴代Pixelスペック比較表', desc: 'Tensorチップ、ディスプレイ、重量、カメラなど、歴代Pixelの全スペックを網羅した一覧表。' },
  { href: '/pixel/price-info/', icon: 'fa-chart-line', title: '中古Pixel相場・価格推移', desc: 'イオシス・ゲオ・じゃんぱらの実売価格から算出した相場と値動きを毎日更新。' },
  { href: '/pixel/used-pixel-support/', icon: 'fa-shield-halved', title: 'Pixelサポート期間一覧表', desc: '各モデルのOS・セキュリティ更新の保証期間を解説。「いつまで使えるか」の目安がわかります。' },
  { href: '/pixel/benchmark/', icon: 'fa-ranking-star', title: '歴代Pixelベンチマーク比較', desc: 'Geekbench 6・AnTuTuスコアで歴代PixelのTensor性能をランキング形式で比較。' },
  { href: '/pixel/battery-compare/', icon: 'fa-battery-full', title: 'Pixelバッテリー性能比較ランキング', desc: '電池持ちの目安やバッテリー容量(mAh)、充電速度を一覧表で比較できます。' },
  { href: '/pixel/storage-guide/', icon: 'fa-hard-drive', title: 'Pixelストレージ容量ガイド', desc: '用途別のおすすめ容量と歴代モデルの容量ラインナップをまとめています。' },
  { href: '/pixel/used-pixel-attention/', icon: 'fa-triangle-exclamation', title: '中古Pixel購入前の注意点', desc: '購入前に確認すべきチェックポイントを解説します。' },
] as const

// ---------- FAQ（Pixel / Android 向け・存在するページのみリンク） ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '自分に合った中古Pixelの選び方は？',
    answer: '用途や予算に応じて最適なモデルは異なります。カメラ重視ならPixel 8 ProなどのProシリーズ、コスパ重視ならPixel 8aなどのaシリーズ、バランス重視ならPixel 8やPixel 9といった無印モデルがおすすめです。\nいずれもPixel 8以降を選ぶと、7年間のOS・セキュリティ更新が保証されるため長く使えます。\n「[中古Google Pixelおすすめ機種](/pixel/)」で目的別の狙い目モデルを紹介しています。',
  },
  {
    question: 'Pixelのスペックを比較したい',
    answer: '「[歴代Pixelのスペック比較表](/pixel/pixel-spec-table/)」で、歴代Pixelのスペックを並べて比較できます。処理性能に特化した比較は「[歴代Pixelのベンチマーク比較](/pixel/benchmark/)」でご覧いただけます。',
  },
  {
    question: '中古Pixelを買うベストなタイミングはいつですか？',
    answer: '新型Pixel発売直後（8〜10月ごろ）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。中古相場が下がったタイミングを狙うのがおすすめです。',
  },
  {
    question: '中古Pixelのランク（A/B/C）の違いは何ですか？',
    answer: '一般的に、Aランクは傷がほぼない美品、Bランクは軽微な傷がある良品、Cランクは目立つ傷がある並品です。実用上はBランクでも問題なく使用でき、コストパフォーマンスが高いです。',
  },
  {
    question: '中古Pixelはどこで買うのがおすすめですか？',
    answer: '信頼性と保証の観点から、イオシス・ゲオ・じゃんぱらなどの大手中古専門店がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。本ページの「中古Pixelはどこで買う？ショップ比較一覧」も参考にしてください。',
  },
  {
    question: '中古Pixelはいつまで使えますか？',
    answer: 'Pixel 8以降はOS・セキュリティ更新が7年、Pixel 6/7世代はセキュリティ更新が5年（OSメジャー更新は3年）保証されています。\n長く使いたい場合は7年サポート世代を選ぶと安心です。詳しくは「[中古Pixelのサポート期間一覧](/pixel/used-pixel-support/)」をご覧ください。',
  },
  {
    question: 'PixelのAI機能は中古でも使えますか？',
    answer: 'はい、消しゴムマジックや夜景モード、ベストテイク、編集マジック（Magic Editor）などのAI機能は中古端末でもそのまま利用できます。対応機能は世代によって異なるため、購入前に対応世代を確認しましょう。',
  },
  {
    question: 'Pixelはおサイフケータイ（FeliCa）に対応していますか？',
    answer: '日本で販売されているPixel 6以降のモデルはおサイフケータイ（FeliCa）に対応しており、モバイルSuicaやiD、QUICPayなどが利用できます。中古で購入する場合も国内版であれば問題なく使えます。',
  },
  {
    question: 'Pixelのバッテリー容量や電池持ちを比較したい',
    answer: 'モデルによってバッテリー容量（mAh）や充電速度が異なります。電池持ちを重視するなら「[Pixelバッテリー性能比較ランキング](/pixel/battery-compare/)」で容量や充電速度を一覧で比較できます。',
  },
]
