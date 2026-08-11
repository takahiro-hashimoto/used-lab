import type { Shop } from '@/lib/types'

// ============================================================
// Back Market（整備済み端末マーケットプレイス）の掲載情報
// ============================================================
// /iphone/iphone-shop/ のショップ詳細カードと比較表の2箇所で使う。
// 同じ条件を両方に直書きすると、先方が条件を変えたときに片方だけ直して
// 不整合になるため、事実はこのファイルの1箇所だけに置く。
//
// 【原則】ここに書くのは公式サイト（backmarket.co.jp）に明記されている内容だけ。
//   price / stock は他ショップと同様、当サイトの主観評価。
//
// 【DBに登録していない理由】
//   shops テーブルに入れると、shops を参照している他カテゴリ（iPad / MacBook など）の
//   比較表にも自動で列が増えてしまう。Back Market は「整備済み」という
//   国内中古ショップとは別カテゴリの選択肢で、赤ロム保証など比較軸が噛み合わないため、
//   iPhone のこのページだけに限定している。
//   他カテゴリにも広げるときは、このファイルを捨てて shops テーブルへ移すのが素直。

export const BACK_MARKET = {
  name: 'Back Market',
  shopKey: 'backmarket',
  /** A8.net のアフィリエイトリンク */
  affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4B8ACV+15OEO2+5QCM+5YRHE',
  /** A8.net の成果計測用ピクセル。リンクとセットで設置する必要がある */
  trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4B8ACV+15OEO2+5QCM+5YRHE',

  // ---- 公式サイトに明記されている条件 ----
  /** 「最大70%割引」（公式トップ） */
  priceRange: '新品の最大70%オフ',
  /** 「すべて1年間の動作保証付き」（公式トップ） */
  warranty: '1年間',
  /** 「お届け日の翌日から30日以内であれば、送料は Back Market 負担にて返品可」 */
  returnPeriod: '30日間',
  returnLabel: '30日間返品保証',
  /** A〜C グレードで最大容量80%以上を保証。80〜89% / 90〜99% の選択も可 */
  battery: '最大容量80%以上',
  /** 「送料無料」（公式トップ） */
  shipping: '無料',
} as const


/**
 * 比較表に差し込む行の土台。
 * Shop 型は列が多いので、明示しない項目は null で埋める（比較表側で「–」になる）。
 */
const EMPTY_SHOP: Shop = {
  id: 0, shop_key: '', shop: '', image: null, text: null,
  price: null, stock: null, support: null, extension: null,
  extension_name: null, extension_link: null, photo: null, battery: null,
  block: null, postage: null, license: null,
  url: null, ipad_url: null, watch_url: null, macbook_url: null, mac_url: null,
  airpods_url: null, pixel_url: null, galaxy_url: null, point: null,
}

/**
 * ショップ比較表に差し込む Back Market の行。
 *
 * 詳細カードもこの行を specRows に通して描画するので、カードと比較表で値がずれない。
 */
export function backMarketComparisonRow(): Shop {
  return {
    ...EMPTY_SHOP,
    // DB のショップと ID が衝突しないよう負値を使う（React の key 用）
    id: -1,
    shop_key: BACK_MARKET.shopKey,
    shop: BACK_MARKET.name,
    // price / stock は他ショップと同じ主観評価。
    // 価格は新品の最大70%オフで国内中古ショップと同水準、在庫は多数の出品者が
    // 集まるマーケットプレイスなので、どちらも ◯ とした。
    price: '◯',
    stock: '◯',
    // 出品は機種・グレード単位で、個体ごとの実物写真は載らない
    photo: '×',
    block: '◯',
    support: BACK_MARKET.warranty,
    extension: '◯',
    extension_name: BACK_MARKET.returnLabel,
    battery: '◯',
    postage: BACK_MARKET.shipping,
    url: BACK_MARKET.affiliateUrl,
  }
}
