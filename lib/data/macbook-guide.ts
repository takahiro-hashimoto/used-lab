// ============================================================
// 中古MacBook完全購入ガイドページ — 一元管理データ
// ============================================================

const now = new Date()
export const GUIDE_YEAR = `${now.getFullYear()}`
export const GUIDE_MONTH = `${now.getMonth() + 1}`
export const GUIDE_DATE_LABEL = `${GUIDE_YEAR}年${GUIDE_MONTH}月`

// ---------- スペック比較リンク ----------
export const GUIDE_SPEC_LINKS = [
  { href: '/macbook/macbook-spec-table/', icon: 'fa-table-cells', title: '歴代MacBookスペック比較表', desc: 'チップ、ディスプレイ、ポート構成、重量など、歴代MacBookの全スペックを一覧で比較。' },
  { href: '/macbook/used-macbook-support/', icon: 'fa-shield-halved', title: 'macOSサポート期間一覧表', desc: '各モデルのサポート終了予測を解説。「いつまで使えるか」の目安がわかります。' },
  { href: '/macbook/used-macbook-attention/', icon: 'fa-triangle-exclamation', title: '中古MacBookの注意点と選び方', desc: '購入前に確認すべきポイントや失敗しないためのチェックリストをまとめています。' },
  { href: '/macbook/macbook-shop/', icon: 'fa-store', title: '中古MacBookを安心して購入できるECサイト', desc: '各ショップの保証内容・価格帯・特徴を比較。安心して購入できるお店を紹介。' },
  { href: '/macbook/ipad-macbook-compare/', icon: 'fa-laptop', title: 'MacBookとiPadどっちを買う？', desc: '作業効率・携帯性・価格・用途別に両者の違いをわかりやすく比較。あなたにぴったりな1台が見つかります。' },
  { href: '/macbook/windows-mac-compare/', icon: 'fa-desktop', title: 'MacとWindowsどっちがいい？', desc: '操作性・対応ソフト・コスト・用途別のおすすめポイントを初心者向けにやさしく解説。' },
  { href: '/macbook/macbook-buy/', icon: 'fa-tags', title: 'MacBookを安く買うには？購入先7つを比較', desc: 'Apple認定整備済製品・中古ショップ・ECモール・家電量販店など7つの購入先を価格・保証で比較。' },
] as const

// ---------- FAQ ----------
export const GUIDE_FAQ_ITEMS = [
  {
    question: '自分に合った中古MacBookの選び方は？',
    answer: '用途や予算に応じて最適なモデルは異なります。Web閲覧・事務作業メインならMacBook Air M2、長期利用ならMacBook Air M3、大画面なら15インチ Air、動画編集やプログラミングならMacBook Proがおすすめです。',
  },
  {
    question: 'MacBook AirとMacBook Proの違いは？',
    answer: 'MacBook Airはファンレスで軽量・静音、日常作業に最適です。MacBook Proはファン搭載で長時間の高負荷作業に強く、ProMotionディスプレイやHDMI・SDカードスロットなど接続端子が豊富です。ほとんどの方にはAirで十分ですが、動画編集やプログラミングがメインならProがおすすめです。',
  },
  {
    question: '中古MacBookを買うベストなタイミングはいつですか？',
    answer: '新型MacBook発表直後（例年6月のWWDCや秋のイベント後）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。',
  },
  {
    question: 'AppleシリコンとIntelどちらを選ぶべき？',
    answer: '2026年現在、IntelモデルはmacOSサポートが終了しているか、残りわずかです。Appleシリコン（M1以降）搭載モデルを選ぶことを強くおすすめします。性能・バッテリー持ち・サポート期間のすべてで優れています。',
  },
  {
    question: '中古MacBookはどこで買うのがおすすめですか？',
    answer: '信頼性と保証の観点から、イオシス・ゲオ・じゃんぱらなどの大手中古専門店がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。',
  },
  {
    question: '中古MacBookはいつまで使えますか？',
    answer: 'MacBookはAppleの発売から約7年間macOSアップデートのサポートを受けられます。長く使いたい場合は、発売から3年以内のモデルを選ぶと安心です。',
  },
  {
    question: '中古MacBookのバッテリー状態は確認できますか？',
    answer: 'はい、MacBookの「システム情報」→「電源」からバッテリーの充放電回数や状態を確認できます。充放電回数1,000回以下が目安です。中古専門店では商品ページにバッテリー状態が記載されていることもあります。',
  },
  {
    question: 'ストレージ容量はどれくらい必要ですか？',
    answer: 'Web閲覧・事務作業メインなら256GBで十分です。写真や動画を扱うなら512GB以上がおすすめです。MacBookはストレージの後から増設ができないため、用途に合った容量を最初に選ぶことが重要です。',
  },
]

// ---------- 歴代MacBook個別記事リンク ----------
export const GUIDE_MODEL_LINKS = {
  air13: [
    { slug: 'mba-13-2025', name: 'MacBook Air 13インチ M4', meta: '2025年3月発売 / M4' },
    { slug: 'mba-13-2024', name: 'MacBook Air 13インチ M3', meta: '2024年3月発売 / M3' },
    { slug: 'mba-13-2022', name: 'MacBook Air 13インチ M2', meta: '2022年6月発売 / M2' },
    { slug: 'mba-13-2020', name: 'MacBook Air 13インチ M1', meta: '2020年11月発売 / M1' },
  ],
  air15: [
    { slug: 'mba-15-2025', name: 'MacBook Air 15インチ M4', meta: '2025年3月発売 / M4' },
    { slug: 'mba-15-2024', name: 'MacBook Air 15インチ M3', meta: '2024年3月発売 / M3' },
    { slug: 'mba-15-2023', name: 'MacBook Air 15インチ M2', meta: '2023年6月発売 / M2' },
  ],
  pro14: [
    { slug: 'mbp-14-2024-nov', name: 'MacBook Pro 14インチ M4', meta: '2024年11月発売 / M4' },
    { slug: 'mbp-14-2023-nov', name: 'MacBook Pro 14インチ M3', meta: '2023年11月発売 / M3' },
    { slug: 'mbp-14-2023', name: 'MacBook Pro 14インチ M2 Pro', meta: '2023年1月発売 / M2 Pro' },
    { slug: 'mbp-14-2021', name: 'MacBook Pro 14インチ M1 Pro', meta: '2021年10月発売 / M1 Pro' },
  ],
  pro16: [
    { slug: 'mbp-16-2024-nov', name: 'MacBook Pro 16インチ M4 Pro', meta: '2024年11月発売 / M4 Pro' },
    { slug: 'mbp-16-2023-nov', name: 'MacBook Pro 16インチ M3 Pro', meta: '2023年11月発売 / M3 Pro' },
    { slug: 'mbp-16-2023', name: 'MacBook Pro 16インチ M2 Pro', meta: '2023年1月発売 / M2 Pro' },
    { slug: 'mbp-16-2021', name: 'MacBook Pro 16インチ M1 Pro', meta: '2021年10月発売 / M1 Pro' },
  ],
  pro13: [
    { slug: 'mbp-13-2022', name: 'MacBook Pro 13インチ M2', meta: '2022年6月発売 / M2' },
    { slug: 'mbp-13-2020', name: 'MacBook Pro 13インチ M1', meta: '2020年11月発売 / M1' },
  ],
}

// ---------- ショップ比較カードセクション ----------
import { buildVendorCards } from '@/lib/data/guide-shared'

export const GUIDE_VENDOR_CARDS = buildVendorCards(
  {
    'イオシス': 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fpc%2Fnotepc%2Fmacbook',
    'にこスマ': 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fiphone',
    'ゲオ': 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26keyword%3D%26goods_code%3D%26store%3D%26tree%3D18010101%26genre_tree%3D%26capacity%3D%26price%3D%26flg%3D',
    'リコレ': 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fmac%2Fselect_mac%3Ftop_topic_mac',
    'じゃんぱら': 'https://www.janpara.co.jp/sale/search/result/?OUTCLSCODE=4',
    'Amazon整備済み品': 'https://amzn.to/3YBqrRz',
  },
  '中古MacBookを探す',
)
