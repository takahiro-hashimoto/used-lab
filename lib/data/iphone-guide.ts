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
  '16e',
]

// ---------- スペック比較リンク ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/iphone/iphone-spec-table/', icon: 'fa-table-cells', title: '歴代iPhoneスペック比較表', desc: 'CPU、ディスプレイ、重量、端子など、歴代iPhoneの全スペックを網羅した一覧表。' },
  { href: '/iphone/used-iphone-support/', icon: 'fa-shield-halved', title: 'iOSサポート期間一覧表', desc: '各モデルのサポート終了予測を解説。「いつまで使えるか」の目安がわかります。' },
  { href: '/iphone/iphone-camera/', icon: 'fa-camera', title: 'iPhoneカメラ性能比較表', desc: '歴代iPhoneのカメラ性能の違いや搭載されている撮影モードをを徹底解説。' },
  { href: '/iphone/battery-compare/', icon: 'fa-battery-full', title: 'iPhoneバッテリー性能比較ランキング', desc: '動画再生時間、音楽再生時間、バッテリー容量(mAh)を一覧表で比較できます。' },
  { href: '/iphone/storage-guide/', icon: 'fa-hard-drive', title: 'iPhoneストレージ容量ガイド', desc: '用途別のおすすめ容量と歴代モデルの容量ラインナップをまとめています。' },
  { href: '/iphone/benchmark/', icon: 'fa-ranking-star', title: '歴代iPhoneベンチマーク比較', desc: 'Geekbench 6・AnTuTuスコアで歴代iPhoneの性能をランキング形式で比較。' },
  { href: '/iphone/mobile-hoken-compare/', icon: 'fa-shield-halved', title: 'Apple Care+よりモバイル保険がコスパ高い理由', desc: '月額700円で3台まで補償できるモバイル保険とApple Care+を徹底比較。' },
] as const

// ---------- 2機種比較リンク ----------
export const GUIDE_COMPARE_LINKS = [
  // 同世代 Standard vs Pro
  { href: '/iphone/iphone15-15pro-compare/', title: 'iPhone 15 vs 15 Pro', desc: '同世代の無印とProを比較' },
  { href: '/iphone/iphone16-16pro-compare/', title: 'iPhone 16 vs 16 Pro', desc: '同世代の無印とProを比較' },
  { href: '/iphone/iphone14-14pro-compare/', title: 'iPhone 14 vs 14 Pro', desc: '同世代の無印とProを比較' },
  { href: '/iphone/iphone13-13pro-compare/', title: 'iPhone 13 vs 13 Pro', desc: '同世代の無印とProを比較' },
  // 世代間 Standard
  { href: '/iphone/iphone15-16-compare/', title: 'iPhone 15 vs 16', desc: '世代間の進化と価格差を検証' },
  { href: '/iphone/iphone14-15-compare/', title: 'iPhone 14 vs 15', desc: '世代間の進化と価格差を検証' },
  { href: '/iphone/iphone13-14-compare/', title: 'iPhone 13 vs 14', desc: '世代間の進化と価格差を検証' },
  // 世代間 Pro
  { href: '/iphone/iphone15pro-16pro-compare/', title: 'iPhone 15 Pro vs 16 Pro', desc: 'Pro同士の世代間比較' },
  { href: '/iphone/iphone14pro-15pro-compare/', title: 'iPhone 14 Pro vs 15 Pro', desc: 'Pro同士の世代間比較' },
  { href: '/iphone/iphone13pro-14pro-compare/', title: 'iPhone 13 Pro vs 14 Pro', desc: 'Pro同士の世代間比較' },
  // 特殊
{ href: '/iphone/iphone16e-se3-compare/', title: 'iPhone 16e vs SE(第3世代)', desc: 'エントリーモデル対決' },
  { href: '/iphone/iphone16plus-air-compare/', title: 'iPhone 16 Plus vs Air', desc: '大画面＆軽量モデル対決' },
] as const

// ---------- FAQ ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '自分に合った中古iPhoneの選び方は？',
    answer: '用途や予算に応じて最適なモデルは異なります。カメラ重視ならProシリーズ、コスパ重視ならiPhone SE、バランス重視なら無印モデルがおすすめです。「[スマホ機種診断シミュレーター](/iphone/filter-search/)」で条件を絞り込むと、あなたに合った機種が見つかります。',
  },
  {
    question: 'iPhoneのスペックを比較したい',
    answer: '「[歴代iPhoneのスペック比較表](/iphone/iphone-spec-table/)」で、歴代iPhoneのスペックを並べて比較できます。カメラ性能に特化した比較は「[歴代iPhoneのカメラ性能比較](/iphone/iphone-camera/)」でご覧いただけます。',
  },
  {
    question: '中古iPhoneを買うベストなタイミングはいつですか？',
    answer: '新型iPhone発売直後（9〜10月）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。当サイトの[価格推移グラフ](/iphone/price-info/)で、値下がり傾向を確認してから購入するのがおすすめです。',
  },
  {
    question: '中古iPhoneのランク（A/B/C）の違いは何ですか？',
    answer: '一般的に、Aランクは傷がほぼない美品、Bランクは軽微な傷がある良品、Cランクは目立つ傷がある並品です。実用上はBランクでも問題なく使用でき、コストパフォーマンスが高いです。',
  },
  {
    question: '中古iPhoneはどこで買うのがおすすめですか？',
    answer: '信頼性と保証の観点から、イオシス・ゲオ・じゃんぱらなどの大手中古専門店がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。詳しくは「[中古iPhoneを安心して購入できるECサイト](/iphone/iphone-shop/)」をご覧ください。',
  },
  {
    question: '中古iPhoneはいつまで使えますか？',
    answer: 'iPhoneはAppleの発売から約6〜7年間iOSアップデートのサポートを受けられます。長く使いたい場合は、発売から3年以内のモデルを選ぶと安心です。詳しくは「[中古iPhoneの寿命とサポート期間の目安](/iphone/used-iphone-support/)」をご覧ください。',
  },
  {
    question: '中古iPhoneのバッテリー状態は確認できますか？',
    answer: 'はい、iPhoneの「設定」→「バッテリー」→「バッテリーの状態」から最大容量を確認できます。80%以上あれば実用上問題ありません。中古専門店では商品ページにバッテリー状態が記載されていることが多いです。',
  },
  {
    question: 'iPhoneのストレージ容量はどれを選ぶべき？',
    answer: '写真や動画をよく撮る方は128GB以上、アプリやゲームを多く入れる方は256GB以上がおすすめです。iPhoneはストレージの後から増設ができないため、迷ったら1段階上の容量を選んでおくと後悔しにくくなります。「[iPhoneのストレージ容量の選び方](/iphone/storage-guide/)」も参考にしてください。',
  },
  {
    question: 'ネットワーク利用制限△の中古iPhoneは買っても大丈夫？',
    answer: 'ネットワーク利用制限△は、前の所有者の分割払いが完了していない状態を示します。△でも通常利用は可能ですが、価格が安い分リスクもあるため、心配な方は○（制限なし）の端末を選ぶのが安心です。詳しくは「[ネットワーク制限△のメリット・デメリット](/iphone/network-limit/)」で解説しています。',
  },
  {
    question: '中古iPhoneでもApple Care+に加入できますか？',
    answer: 'できません。Apple Care+はiPhoneの購入から30日以内にのみ加入できるため、中古品への加入は対象外です。詳しくは「[iPhoneにApple Care+は必要？](/iphone/apple-care/)」で解説しています。',
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
    { slug: '17e', name: 'iPhone 17e', meta: 'A19' },
    { slug: '16e', name: 'iPhone16e', meta: '2025年2月発売 / A18 Bionic' },
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
    { slug: '17e', name: 'iPhone 17e', meta: '2026年3月発売 / A19' },
    { slug: '16e', name: 'iPhone 16e', meta: '2025年2月発売 / A18' },
    { slug: 'se3', name: 'iPhone SE 第3世代', meta: '2022年3月発売 / A15 Bionic' },
    { slug: 'se2', name: 'iPhone SE 第2世代', meta: '2020年4月発売 / A13 Bionic' },
  ],
}

// ショップ比較カードセクションは DB (shops テーブル) から動的生成に移行済み
// → buildVendorCardsFromShops(shops, 'url', ...) を使用
