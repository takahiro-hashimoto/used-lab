// ============================================================
// ヒーロー画像の一元管理
// ページごとのヒーロー画像を一箇所で定義。
// カード型リンクの画像もここから参照するため、
// ヒーロー画像を変更すれば関連カードも自動で追従する。
// ============================================================

export const HERO_IMAGES: Record<string, string> = {
  // ── トップ・共通 ──
  '/': '/images/content/thumbnail/iphone-image.jpeg',
  '/smartphone-compare/': '/images/content/thumbnail/iphone-compare.jpg',
  '/profile/': '/images/content/thumbnail/iphone-image.jpeg',
  '/sitemap-page/': '/images/content/thumbnail/iphone-image.jpeg',

  // ── AirPods ──
  '/airpods/': '/images/content/thumbnail/airpods-image-01.jpg',
  '/airpods/airpods-find/': '/images/content/thumbnail/airpods-image-01.jpg',
  '/airpods/price-info/': '/images/content/thumbnail/airpods-image-03.jpg',
  '/airpods/airpods-filter-search/': '/images/content/thumbnail/simulator.jpg',
  '/airpods/used-airpods-attention/': '/images/content/thumbnail/check-list.jpg',
  '/airpods/airpods-buy/': '/images/content/thumbnail/cheap-buy.jpg',

  // ── iPhone ──
  '/iphone/': '/images/content/thumbnail/iphone-image.jpeg',
  '/iphone/battery-compare/': '/images/content/thumbnail/iphone-battery.jpg',
  '/iphone/benchmark/': '/images/content/thumbnail/iphone-setting.webp',
  '/iphone/filter-search/': '/images/content/thumbnail/simulator.jpg',
  '/iphone/iphone-camera/': '/images/content/thumbnail/iphone-camera.jpg',
  '/iphone/iphone-shop/': '/images/content/thumbnail/cheap-buy.jpg',
  '/iphone/iphone-spec-table/': '/images/content/thumbnail/iphone-compare.jpg',
  '/iphone/mvno/': '/images/content/thumbnail/sim.webp',
  '/iphone/network-limit/': '/images/content/thumbnail/iphone-image-02.jpg',
  '/iphone/price-info/': '/images/content/thumbnail/graph-image.jpg',
  '/iphone/storage-guide/': '/images/content/thumbnail/used-iphone-ios-support.jpg',
  '/iphone/used-iphone-attention/': '/images/content/thumbnail/check-list.jpg',
  '/iphone/used-iphone-support/': '/images/content/thumbnail/iphone-image-03.jpg',
  '/iphone/apple-care/': '/images/content/thumbnail/apple-care.jpg',
  '/iphone/mobile-hoken-compare/': '/images/content/thumbnail/iphone-image-02.jpg',

  // ── Google Pixel ──（price-info / pixel-shop / used-pixel-attention は端末が写らない汎用イラスト）
  '/pixel/': '/images/pixel-article/google-pixel1.jpg',
  '/pixel/pixel-spec-table/': '/images/pixel-article/google-pixel3.jpg',
  '/pixel/benchmark/': '/images/pixel-article/google-pixel0.jpg',
  '/pixel/battery-compare/': '/images/pixel-article/google-pixel5.jpg',
  '/pixel/used-pixel-support/': '/images/pixel-article/google-pixel2.jpg',
  '/pixel/price-info/': '/images/content/thumbnail/graph-image.jpg',
  '/pixel/pixel-shop/': '/images/content/thumbnail/cheap-buy.jpg',
  '/pixel/used-pixel-attention/': '/images/content/thumbnail/check-list.jpg',
  '/pixel/storage-guide/': '/images/pixel-article/google-pixel2.jpg',

  // ── Samsung Galaxy ──（price-info / galaxy-shop / used-galaxy-attention は端末が写らない汎用イラスト）
  '/galaxy/': '/images/galaxy-article/samsung-galaxy-0.jpg',
  '/galaxy/galaxy-spec-table/': '/images/galaxy-article/samsung-galaxy-1.jpg',
  '/galaxy/benchmark/': '/images/galaxy-article/samsung-galaxy-7.jpg',
  '/galaxy/battery-compare/': '/images/galaxy-article/samsung-galaxy-5.jpg',
  '/galaxy/used-galaxy-support/': '/images/galaxy-article/samsung-galaxy-6.jpg',
  '/galaxy/price-info/': '/images/content/thumbnail/graph-image.jpg',
  '/galaxy/galaxy-shop/': '/images/content/thumbnail/cheap-buy.jpg',
  '/galaxy/used-galaxy-attention/': '/images/content/thumbnail/check-list.jpg',
  '/galaxy/storage-guide/': '/images/galaxy-article/samsung-galaxy-2.jpg',

  // ── iPad ──
  '/ipad/': '/images/content/thumbnail/ipad-all.jpg',
  '/ipad/accessories-summary/': '/images/content/thumbnail/ipad-keyboard.jpg',
  '/ipad/apple-care/': '/images/content/thumbnail/apple-care.jpg',
  '/ipad/apple-pencil-compare/': '/images/content/thumbnail/ipad-image-07.jpg',
  '/ipad/benchmark/': '/images/content/thumbnail/ipad-image-12.jpg',
  '/ipad/car-navigation-system/': '/images/content/thumbnail/ipad-image-10.jpg',
  '/ipad/howto-use-ipad/': '/images/content/thumbnail/ipad-lightroom.jpg',
  '/ipad/ipad-buy/': '/images/content/thumbnail/cheap-buy.jpg',
  '/ipad/ipad-mini-6-review/': '/images/content/thumbnail/ipad-image-03.jpg',
  '/ipad/ipad-filter-search/': '/images/content/thumbnail/simulator.jpg',
  '/ipad/ipad-price-info/': '/images/content/thumbnail/graph-image.jpg',
  '/ipad/ipad-shop/': '/images/content/thumbnail/cheap-buy.jpg',
  '/ipad/ipad-spec-table/': '/images/content/thumbnail/ipad-image-11.jpg',
  '/ipad/review-ipad-pro-11-m4/': '/images/content/thumbnail/ipad-image-12.jpg',
  '/ipad/storage-guide/': '/images/content/thumbnail/ipad-image-09.jpg',
  '/ipad/used-ipad-attention/': '/images/content/thumbnail/check-list.jpg',
  '/ipad/used-ipad-support/': '/images/content/thumbnail/ipad-image-06.jpg',
  '/ipad/wifi-cellular/': '/images/content/thumbnail/ipad-image-02.jpg',

  // ── MacBook ──
  '/macbook/': '/images/content/thumbnail/macbook-image-01.jpg',
  '/macbook/air-pro-compare/': '/images/content/thumbnail/macbook-image-04.jpg',
  '/macbook/air-neo-compare/': '/images/content/thumbnail/macbook-image-04.jpg',
  '/macbook/benchmark/': '/images/content/thumbnail/macbook-ipad.jpg',
  '/macbook/ipad-macbook-compare/': '/images/content/thumbnail/macbook-ipad.jpg',
  '/macbook/macbook-buy/': '/images/content/thumbnail/cheap-buy.jpg',
  '/macbook/price-info/': '/images/content/thumbnail/graph-image.jpg',
  '/macbook/macbook-shop/': '/images/content/thumbnail/cheap-buy.jpg',
  '/macbook/macbook-spec-table/': '/images/content/thumbnail/macbook-user.jpg',
  '/macbook/storage-guide/': '/images/content/thumbnail/macbook-image-05.jpg',
  '/macbook/used-macbook-attention/': '/images/content/thumbnail/check-list.jpg',
  '/macbook/used-macbook-support/': '/images/content/thumbnail/macbook-image-03.jpg',
  '/macbook/windows-mac-compare/': '/images/content/thumbnail/macbook-image-06.jpg',
  '/macbook/apple-care/': '/images/content/thumbnail/apple-care.jpg',
  // デスクトップMac。記事用の汎用画像は /images/mac-article/。
  // /images/mac/ は機種サムネ専用（slug名）なので、記事側からは参照しない。
  // galaxy-article / pixel-article と同じ分け方。
  // 相場ページだけは他カテゴリと同じグラフ画像で揃える（価格ページ共通の絵）
  '/mac/': '/images/mac-article/imac-01.jpg',
  '/mac/mac-spec-table/': '/images/mac-article/imac-03.jpg',
  '/mac/price-info/': '/images/content/thumbnail/graph-image.jpg',
  '/mac/benchmark/': '/images/mac-article/imac-04.jpg',
  '/mac/used-mac-support/': '/images/mac-article/mac-mini-02.jpg',

  // ── Apple Watch ──
  '/watch/': '/images/content/thumbnail/apple-watch-image.jpg',
  '/watch/apple-watch-always-lit/': '/images/content/thumbnail/watch-image-03.jpg',
  '/watch/apple-watch-buy/': '/images/content/thumbnail/cheap-buy.jpg',
  '/watch/gps-cellular-compare/': '/images/content/thumbnail/watch-image-09.jpg',
  '/watch/how-to-use-apple-watch/': '/images/content/thumbnail/watch-image-11.jpg',
  '/watch/used-watch-attention/': '/images/content/thumbnail/check-list.jpg',
  '/watch/used-watch-support/': '/images/content/thumbnail/watch-image.jpg',
  '/watch/watch-filter-search/': '/images/content/thumbnail/simulator.jpg',
  '/watch/watch-price-info/': '/images/content/thumbnail/graph-image.jpg',
  '/watch/watch-shop/': '/images/content/thumbnail/cheap-buy.jpg',
  '/watch/watch-spec-table/': '/images/content/thumbnail/watch-image-02.jpg',
  '/watch/apple-care/': '/images/content/thumbnail/apple-care.jpg',
}

/** ルートからヒーロー画像パスを取得。未登録ならフォールバック画像を返す */
export function getHeroImage(path: string): string {
  return HERO_IMAGES[path] ?? '/images/content/thumbnail/check-list.jpg'
}

