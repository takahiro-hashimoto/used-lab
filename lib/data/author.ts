// ============================================================
// 著者・運営者エンティティ（サイト全体で共有する唯一の定義）
// ============================================================
// E-E-A-T の構造化データは「誰が書いたか」を機械可読にすることが本体。
// 以前は著者情報が layout / 記事JSON-LD / profileページ / AuthorByline の
// 4箇所に分かれて内容も食い違っており（肩書きが2種類、sameAs の数もバラバラ）、
// しかも全部 @id を持たないインライン Person だったため、検索エンジンからは
// 「同姓同名の別人が4人いる」ように見えていた。
//
// 【原則】
//   - 著者情報を書きたくなったら、必ずこのファイルの値を参照する
//   - 構造化データ内の Person は AUTHOR_ID を @id として共有し、
//     2回目以降は { '@id': AUTHOR_ID } の参照だけを書く（実体は profile ページに置く）
//
// これにより「記事 → 著者 → 外部メディアでの連載・監修・掲載実績」が
// ひとつのエンティティグラフに繋がる。

export const SITE_URL = 'https://used-lab.jp'

/** 著者エンティティの正規ID。実体は /profile/ に置き、他のページからは参照だけする */
export const AUTHOR_ID = `${SITE_URL}/profile/#person`
/** 運営組織エンティティの正規ID */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
/** サイトエンティティの正規ID */
export const WEBSITE_ID = `${SITE_URL}/#website`
/** コンテンツ制作・運営ポリシーのURL（記事の publishingPrinciples に使う） */
export const PUBLISHING_PRINCIPLES_URL = `${SITE_URL}/guidelines/`

/**
 * 本人を一意に特定できるプロフィールURL。
 * sameAs は「同じ実体を指す別URL」に使うプロパティなので、
 * 執筆した記事や取材記事のURLはここに入れない（それらは subjectOf / author で表す）。
 */
export const AUTHOR_SAME_AS = [
  'https://twitter.com/takahiro_mono',
  'https://www.instagram.com/takahiro_mono',
  'https://www.youtube.com/@takahiro_mono',
  'https://note.com/takahiro_mono',
  'https://digital-style.jp/',
  'https://nightscape.tokyo/',
  'https://www.amazon.co.jp/shop/takahiro_mono',
  'https://news.google.com/publications/CAAqBwgKMOzgvwsw-fvWAw?hl=ja&gl=JP&ceid=JP:ja',
]

export const AUTHOR_NAME = 'タカヒロ'
export const AUTHOR_URL = `${SITE_URL}/profile/`
export const AUTHOR_IMAGE = `${SITE_URL}/images/content/thumbnail/my-icon.webp`
/**
 * 肩書き。プロフィール本文の経歴（Webデザイナー → フロントエンドエンジニア →
 * Webディレクター → 現在はプロジェクトマネージャー）と揃える。
 * 以前 3箇所に残っていた「Webディレクター / ブロガー」は過去の役職で、実態と合っていなかった。
 */
export const AUTHOR_JOB_TITLE = 'プロジェクトマネージャー / ガジェットブロガー'
export const AUTHOR_DESCRIPTION =
  'IT企業でWebデザイナー、フロントエンドエンジニア、Webディレクターを経て現在はプロジェクトマネージャー。2015年からガジェットブログ「デジスタ」を運営し、300以上の製品レビュー実績を持つ。GoodsPress・ITmedia・ライフハッカー等で連載・監修を担当。'
export const AUTHOR_KNOWS_ABOUT = [
  'iPhone',
  'iPad',
  'MacBook',
  'Apple Watch',
  'AirPods',
  'Google Pixel',
  'Samsung Galaxy',
  '中古・型落ちデジタルデバイス',
  'ガジェット',
  'Web制作',
]

/**
 * 他のページから著者を指すときの参照。
 * 実体（名前・経歴・sameAs）は profile ページの Person が持つので、
 * ここでは @id での参照＋最低限の表示用プロパティだけを書く。
 * name を添えるのは、リッチリザルトで著者名が拾えるようにするため。
 */
export const authorRef = () => ({
  '@type': 'Person' as const,
  '@id': AUTHOR_ID,
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
})

/** 運営組織を指す参照 */
export const publisherRef = () => ({
  '@type': 'Organization' as const,
  '@id': ORGANIZATION_ID,
  name: 'ユーズドラボ',
})
