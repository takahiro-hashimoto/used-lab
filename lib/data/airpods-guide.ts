// ============================================================
// 中古AirPods完全購入ガイドページ — 一元管理データ
// ============================================================

const now = new Date()
export const GUIDE_YEAR = `${now.getFullYear()}`
export const GUIDE_MONTH = `${now.getMonth() + 1}`
export const GUIDE_DATE_LABEL = `${GUIDE_YEAR}年${GUIDE_MONTH}月`

// ---------- 中古相場セクション: 表示するモデルのslug ----------
export const GUIDE_PRICE_SLUGS = [
  'mtjv3ja',
  'mxp93ja',
  'mxp63ja',
  'mqd83ja',
  'mlwk3ja',
]

// ---------- 関連記事リンク ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/airpods/price-info/', icon: 'fa-chart-line', title: 'AirPods中古価格推移', desc: '各モデルの中古価格推移をグラフで確認。買い時のタイミングがわかります。' },
  { href: '/airpods/recommend/', icon: 'fa-ranking-star', title: '中古AirPodsおすすめモデル', desc: '用途別おすすめモデルを厳選。ノイキャン重視・オープン型・コスパ重視の3機種を紹介。' },
  { href: '/airpods/airpods-find/', icon: 'fa-magnifying-glass', title: 'AirPodsを紛失した時の対処法', desc: 'ケースやイヤホン片方を無くした時の探し方と、代替品の購入先をまとめて紹介。' },
  { href: '/airpods/used-airpods-attention/', icon: 'fa-triangle-exclamation', title: '中古AirPodsの注意点8つ', desc: 'コピー品・並行輸入品・バッテリー劣化など、購入前に知っておきたいリスクと対策。' },
] as const

// ---------- FAQ ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '中古AirPodsのおすすめはどれ？',
    answer: `${GUIDE_DATE_LABEL}現在、「AirPods Pro 2（USB-C）」「AirPods 4（ANCモデル）」「AirPods 4（スタンダード）」の3機種がおすすめです。音質・ノイキャン重視ならPro 2、オープン型でノイキャンも欲しいならAirPods 4 ANC、コスパ重視ならAirPods 4スタンダードが最適です。`,
  },
  {
    question: '中古AirPodsを選ぶときのポイントは？',
    answer: '以下の3つを基準に選ぶことをおすすめします。\nファームウェアサポートが十分に残っていること（発売から約7年がサポートの目安）、用途に合った機能があること（ノイズキャンセリング・空間オーディオ・装着タイプなど）、中古価格と機能のバランスが良いこと。',
  },
  {
    question: '中古AirPodsはどこで買うのがおすすめ？',
    answer: '中古イヤホン取り扱い店での購入をおすすめします。\n専門の検品担当者がチェック済みで、初期不良対応などの保証が付いており、トラブル時のサポート体制が整っています。イオシス（在庫豊富・3ヶ月保証）、じゃんぱら（品質重視）、eイヤホン（イヤホン専門店）などが信頼性が高くおすすめです。',
  },
  {
    question: '中古AirPodsを買うときの注意点は？',
    answer: '購入前に以下の4点を必ずチェックしましょう。\nバッテリーの劣化具合（使用時間が極端に短くないか）、充電ケースの状態（ケースのバッテリーも劣化します）、ショップ保証の有無（イオシスなら3ヶ月保証など）、充電端子の確認（Lightning / USB-C）。',
  },
  {
    question: '中古AirPodsの寿命はどれくらい？',
    answer: `AirPodsのファームウェアサポートは発売から約7年が目安です。${GUIDE_YEAR}年時点でおすすめしている3機種は、いずれも2029〜2031年頃までサポートされる見込みです。ただし、イヤホンはバッテリー劣化が避けられないため、中古品のバッテリー状態は必ず確認しましょう。`,
  },
  {
    question: '中古AirPodsのバッテリー状態は確認できますか？',
    answer: 'iPhoneの「設定」→「Bluetooth」→ AirPods名の横にある「i」→「バッテリー」から、イヤホンとケースのバッテリー残量を確認できます。\nただし、バッテリーの最大容量（劣化度合い）はiPhoneのように数値で確認できないため、実際の使用時間で判断する必要があります。',
  },
]

// ---------- 歴代AirPods個別記事リンク ----------
export const GUIDE_MODEL_LINKS = {
  pro: [
    { slug: 'mtjv3ja', name: 'AirPods Pro 2（USB-C）', meta: '2023年9月発売 / H2チップ' },
    { slug: 'mqd83ja', name: 'AirPods Pro 2（Lightning）', meta: '2022年9月発売 / H2チップ' },
    { slug: 'mlwk3ja', name: 'AirPods Pro（第1世代）', meta: '2019年10月発売 / H1チップ' },
  ],
  standard: [
    { slug: 'mxp93ja', name: 'AirPods 4（ANCモデル）', meta: '2024年9月発売 / H2チップ' },
    { slug: 'mxp63ja', name: 'AirPods 4（スタンダード）', meta: '2024年9月発売 / H2チップ' },
    { slug: 'mpny3ja', name: 'AirPods（第3世代）', meta: '2021年10月発売 / H1チップ' },
    { slug: 'mv7n2ja', name: 'AirPods（第3世代・Lightning）', meta: '2022年9月発売 / H1チップ' },
    { slug: 'mrxj2ja', name: 'AirPods（第2世代）', meta: '2019年3月発売 / H1チップ' },
    { slug: 'mmef2ja', name: 'AirPods（第1世代）', meta: '2016年12月発売 / W1チップ' },
  ],
  max: [
    { slug: 'max-2024', name: 'AirPods Max（USB-C）', meta: '2024年9月発売 / H1チップ' },
    { slug: 'max-2020', name: 'AirPods Max（Lightning）', meta: '2020年12月発売 / H1チップ' },
  ],
}

// ショップ比較カードセクションは DB (shops テーブル) から動的生成に移行済み
// → buildVendorCardsFromShops(shops, 'airpods_url', ...) を使用
