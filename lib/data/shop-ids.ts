// ============================================================
// shops テーブルの ID を名前で参照するための定義
// ============================================================

/** イオシス。各スペック表・ベンチマーク・2機種比較の「中古を探す」導線 */
export const SHOP_IOSYS = 1
/** Amazon 整備済み品。スペック表の購入リンク */
export const SHOP_AMAZON = 7

/**
 * スペック比較表ページのクライアントコンポーネントが実際に引くショップ。
 *
 * product_shop_links をカテゴリ全件（iPhone なら428行）そのまま渡すと、
 * RSC ペイロードに丸ごと載って HTML が 93KB 膨らむ（実測・brotli 後で 6.8KB）。
 * 表示に使うのはこの2つだけなので、クライアントへ渡す前に絞る。
 *
 * 参照側: SpecTable（1と7）/ DualCompare（1）/ BenchmarkSection（1）
 * ショップ一覧を出す [slug] ページの ShopGrid などは全ショップが要るので、
 * この定数を使わないこと。
 */
export const SPEC_TABLE_SHOP_IDS: ReadonlySet<number> = new Set([SHOP_IOSYS, SHOP_AMAZON])

/** スペック表向けに product_shop_links を絞る */
export function forSpecTable<T extends { shop_id: number }>(links: T[]): T[] {
  return links.filter((l) => SPEC_TABLE_SHOP_IDS.has(l.shop_id))
}

/**
 * 機種詳細ページのショップ一覧（ModelShopGrid）で描画しないショップ。
 *
 *   5  プロディグ        … 掲載終了（sql/hide_prodig_links.sql）
 *   7  Amazon整備済み品  … アソシエイト対応で一時的に非表示。復活時はここから外す
 *   12 ラクマ
 *   15 ダイワンテレコム
 *
 * 以前は ModelShopGrid の中だけで弾いていたため、描画されないのに
 * product_shop_links の行が RSC ペイロードに載り続けていた
 * （プロディグのURLが61ページのHTMLに1,614回残っていた）。
 * ページ側で渡す前に落とすこと。ModelShopGrid 側のガードは保険として残す。
 */
export const MODEL_PAGE_EXCLUDED_SHOP_IDS: ReadonlySet<number> = new Set([5, 7, 12, 15])

/** 機種詳細ページ向けに product_shop_links を絞る */
export function forModelPage<T extends { shop_id: number }>(links: T[]): T[] {
  return links.filter((l) => !MODEL_PAGE_EXCLUDED_SHOP_IDS.has(l.shop_id))
}

/**
 * イオシスへの導線しか持たないページ向け。
 *
 * ベンチマーク・絞り込み検索・カメラ比較・Apple Pencil互換表は、
 * いずれも shop_id=1（イオシス）しか引いていないのに
 * product_shop_links を全件クライアントに渡していた。
 * 参照側: getIosysUrl() / getShopLink(id, 1)
 */
export function forIosysOnly<T extends { shop_id: number }>(links: T[]): T[] {
  return links.filter((l) => l.shop_id === SHOP_IOSYS)
}
