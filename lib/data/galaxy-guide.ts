// ============================================================
// 中古Samsung Galaxyおすすめ機種・選び方ガイドページ — 一元管理データ
// ============================================================

const now = new Date()
export const GUIDE_YEAR = `${now.getFullYear()}`
export const GUIDE_MONTH = `${now.getMonth() + 1}`
export const GUIDE_DATE_LABEL = `${GUIDE_YEAR}年${GUIDE_MONTH}月`

// ---------- 中古相場セクション: 表示するモデルのslug ----------
export const GUIDE_PRICE_SLUGS = [
  'galaxy-s24',
  'galaxy-s23',
  'galaxy-a54-5g',
  'galaxy-s22',
  'galaxy-z-flip5',
  'galaxy-s24-ultra',
]

// ---------- スペック比較リンク（存在するページのみ） ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/galaxy/galaxy-spec-table/', icon: 'fa-table-cells', title: '歴代Galaxyスペック比較表', desc: 'SoC、ディスプレイ、重量、カメラ、S Pen対応など、歴代Galaxyの全スペックを網羅した一覧表。' },
  { href: '/galaxy/price-info/', icon: 'fa-chart-line', title: '中古Galaxy相場・価格推移', desc: 'イオシス・ゲオ・じゃんぱらの実売価格から算出した相場と値動きを毎日更新。' },
  { href: '/galaxy/used-galaxy-support/', icon: 'fa-shield-halved', title: 'Galaxyサポート期間一覧表', desc: '各モデルのOS・セキュリティ更新の保証期間を解説。「いつまで使えるか」の目安がわかります。' },
  { href: '/galaxy/benchmark/', icon: 'fa-ranking-star', title: '歴代Galaxyベンチマーク比較', desc: 'Geekbench 6・AnTuTuスコアで歴代GalaxyのSnapdragon/Exynos性能をランキング形式で比較。' },
  { href: '/galaxy/battery-compare/', icon: 'fa-battery-full', title: 'Galaxyバッテリー容量比較ランキング', desc: 'バッテリー容量(mAh)や充電速度を一覧表で比較できます。' },
  { href: '/galaxy/storage-guide/', icon: 'fa-hard-drive', title: 'Galaxyストレージ容量ガイド', desc: '用途別のおすすめ容量と歴代モデルの容量ラインナップをまとめています。' },
  { href: '/galaxy/used-galaxy-attention/', icon: 'fa-triangle-exclamation', title: '中古Galaxy購入前の注意点', desc: '購入前に確認すべきチェックポイントを解説します。' },
] as const

// ---------- FAQ（Galaxy / Android 向け・存在するページのみリンク） ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '自分に合った中古Galaxyの選び方は？',
    answer: '用途や予算に応じて最適なモデルは異なります。カメラ・S Penまで全部入りが欲しいならSシリーズのUltra、性能とコスパのバランスなら無印のSシリーズ、価格を抑えたいならAシリーズ、折りたたみを試したいならZ Flipがおすすめです。\n「[中古Samsung Galaxyおすすめ機種](/galaxy/)」で目的別の狙い目モデルを紹介しています。',
  },
  {
    question: 'Galaxyのスペックを比較したい',
    answer: '「[歴代Galaxyのスペック比較表](/galaxy/galaxy-spec-table/)」で、歴代Galaxyのスペックを並べて比較できます。処理性能に特化した比較は「[歴代Galaxyのベンチマーク比較](/galaxy/benchmark/)」でご覧いただけます。',
  },
  {
    question: '中古Galaxyを買うベストなタイミングはいつですか？',
    answer: '新型Galaxy S/Zシリーズ発売直後（1〜2月・7〜8月ごろ）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。中古相場が下がったタイミングを狙うのがおすすめです。',
  },
  {
    question: '中古Galaxyのランク（A/B/C）の違いは何ですか？',
    answer: '一般的に、Aランクは傷がほぼない美品、Bランクは軽微な傷がある良品、Cランクは目立つ傷がある並品です。実用上はBランクでも問題なく使用でき、コストパフォーマンスが高いです。折りたたみ（Z）は画面の折り目やヒンジの状態も併せて確認しましょう。',
  },
  {
    question: '中古Galaxyはどこで買うのがおすすめですか？',
    answer: '信頼性と保証の観点から、イオシス・ゲオ・じゃんぱらなどの大手中古専門店がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。本ページの「中古Galaxyはどこで買う？ショップ比較一覧」も参考にしてください。',
  },
  {
    question: '中古Galaxyはいつまで使えますか？',
    answer: 'GalaxyはS24以降のSシリーズやFlip6/Fold6以降の折りたたみでOS・セキュリティ更新が最大7年、S22/S23世代はOS4回・セキュリティ5年が保証されています。\n長く使いたい場合は7年サポート世代を選ぶと安心です。詳しくは「[中古Galaxyのサポート期間一覧](/galaxy/used-galaxy-support/)」をご覧ください。',
  },
  {
    question: 'GalaxyのGalaxy AIやかこって検索は中古でも使えますか？',
    answer: 'はい、Galaxy AI・かこって検索（Circle to Search）・オブジェクト消去などの機能は中古端末でもそのまま利用できます。対応機能は世代によって異なるため、購入前に対応世代を確認しましょう。',
  },
  {
    question: 'Galaxyはおサイフケータイ（FeliCa）に対応していますか？',
    answer: '日本で販売されているGalaxyの多くはおサイフケータイ（FeliCa）に対応しており、モバイルSuicaやiD、QUICPayなどが利用できます。中古で購入する場合も国内版であれば問題なく使えます。海外版は非対応の場合があるため型番を確認しましょう。',
  },
  {
    question: 'GalaxyのバッテリーやmicroSD対応を比較したい',
    answer: 'モデルによってバッテリー容量（mAh）や充電速度、microSD対応の有無が異なります。電池持ちを重視するなら「[Galaxyバッテリー容量比較ランキング](/galaxy/battery-compare/)」で容量や充電速度を一覧で比較できます。',
  },
]
