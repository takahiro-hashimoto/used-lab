/**
 * 静的ページの最終更新日を手動管理するファイル
 *
 * ページを更新したときにここの日付を変更してください（YYYY-MM-DD形式）。
 * 中古相場価格ページは毎日 new Date() で自動更新されるため、ここには含まれていません。
 */
export const PAGE_DATES: Record<string, string> = {
  // ── カテゴリTOP ──────────────────────────────────────────────
  'app/(public)/iphone/page.tsx':  '2026-04-11',
  'app/(public)/ipad/page.tsx':    '2026-04-11',
  'app/(public)/macbook/page.tsx': '2026-04-11',
  'app/(public)/watch/page.tsx':   '2026-04-11',
  'app/(public)/airpods/page.tsx': '2026-04-11',

  // ── サイト共通 ────────────────────────────────────────────────
  'app/(public)/sitemap-page/page.tsx': '2026-04-11',
  'app/(public)/profile/page.tsx':      '2026-04-11',
  'app/(public)/news/page.tsx':         '2026-04-11',
  'app/(public)/contact/page.tsx':      '2026-04-11',
  'app/(public)/privacy-policy/page.tsx': '2026-04-11',
  'app/(public)/guidelines/page.tsx':   '2026-04-11',
  'app/sitemap.ts':                     '2026-04-06',

  // ── iPhone ────────────────────────────────────────────────────
  'app/(public)/iphone/apple-care/page.tsx':          '2026-04-14',
  'app/(public)/iphone/used-iphone-attention/page.tsx': '2026-04-14',
  'app/(public)/iphone/network-limit/page.tsx':       '2026-04-14',
  'app/(public)/iphone/mobile-hoken-compare/page.tsx': '2026-04-14',
  'app/(public)/iphone/filter-search/page.tsx':       '2026-04-11',
  'app/(public)/iphone/storage-guide/page.tsx':       '2026-04-11',
  'app/(public)/iphone/used-iphone-support/page.tsx': '2026-04-11',
  'app/(public)/iphone/iphone-camera/page.tsx':       '2026-04-11',
  'app/(public)/iphone/benchmark/page.tsx':           '2026-04-11',
  'app/(public)/iphone/battery-compare/page.tsx':     '2026-04-11',
  'app/(public)/iphone/iphone-shop/page.tsx':         '2026-04-11',
  'app/(public)/iphone/mvno/page.tsx':                '2026-04-10',
  'app/(public)/iphone/iphone-spec-table/page.tsx':   '2026-04-10',
  'app/(public)/iphone/recommend/page.tsx':           '2026-04-10',
  'app/(public)/iphone/_compare/ComparePageTemplate.tsx': '2026-04-12',

  // ── iPad ──────────────────────────────────────────────────────
  'app/(public)/ipad/apple-care/page.tsx':            '2026-04-14',
  'app/(public)/ipad/used-ipad-attention/page.tsx':   '2026-04-14',
  'app/(public)/ipad/wifi-cellular/page.tsx':         '2026-04-14',
  'app/(public)/ipad/review-ipad-pro-11-m4/page.tsx': '2026-04-14',
  'app/(public)/ipad/ipad-mini-6-review/page.tsx':    '2026-04-14',
  'app/(public)/ipad/ipad-buy/page.tsx':              '2026-04-14',
  'app/(public)/ipad/howto-use-ipad/page.tsx':        '2026-04-14',
  'app/(public)/ipad/car-navigation-system/page.tsx': '2026-04-14',
  'app/(public)/ipad/recommend/page.tsx':             '2026-04-13',
  'app/(public)/ipad/ipad-shop/page.tsx':             '2026-04-13',
  'app/(public)/ipad/storage-guide/page.tsx':         '2026-04-11',
  'app/(public)/ipad/used-ipad-support/page.tsx':     '2026-04-11',
  'app/(public)/ipad/benchmark/page.tsx':             '2026-04-11',
  'app/(public)/ipad/ipad-spec-table/page.tsx':       '2026-04-11',
  'app/(public)/ipad/ipad-filter-search/page.tsx':    '2026-04-11',
  'app/(public)/ipad/apple-pencil-compare/page.tsx':  '2026-04-11',
  'app/(public)/ipad/accessories-summary/page.tsx':   '2026-04-11',

  // ── MacBook ───────────────────────────────────────────────────
  'app/(public)/macbook/apple-care/page.tsx':         '2026-04-14',
  'app/(public)/macbook/used-macbook-attention/page.tsx': '2026-04-14',
  'app/(public)/macbook/windows-mac-compare/page.tsx': '2026-04-14',
  'app/(public)/macbook/macbook-buy/page.tsx':        '2026-04-14',
  'app/(public)/macbook/ipad-macbook-compare/page.tsx': '2026-04-14',
  'app/(public)/macbook/recommend/page.tsx':          '2026-04-13',
  'app/(public)/macbook/benchmark/page.tsx':          '2026-04-12',
  'app/(public)/macbook/storage-guide/page.tsx':      '2026-04-12',
  'app/(public)/macbook/air-pro-compare/page.tsx':    '2026-04-10',
  'app/(public)/macbook/macbook-spec-table/page.tsx': '2026-04-10',
  'app/(public)/macbook/used-macbook-support/page.tsx': '2026-04-11',
  'app/(public)/macbook/macbook-shop/page.tsx':       '2026-04-10',

  // ── Apple Watch ───────────────────────────────────────────────
  'app/(public)/watch/apple-care/page.tsx':           '2026-04-14',
  'app/(public)/watch/used-watch-attention/page.tsx': '2026-04-14',
  'app/(public)/watch/how-to-use-apple-watch/page.tsx': '2026-04-14',
  'app/(public)/watch/gps-cellular-compare/page.tsx': '2026-04-14',
  'app/(public)/watch/apple-watch-buy/page.tsx':      '2026-04-14',
  'app/(public)/watch/apple-watch-always-lit/page.tsx': '2026-04-14',
  'app/(public)/watch/recommend/page.tsx':            '2026-04-11',
  'app/(public)/watch/watch-filter-search/page.tsx':  '2026-04-11',
  'app/(public)/watch/used-watch-support/page.tsx':   '2026-04-11',
  'app/(public)/watch/watch-spec-table/page.tsx':     '2026-04-11',
  'app/(public)/watch/watch-shop/page.tsx':           '2026-04-13',

  // ── AirPods ───────────────────────────────────────────────────
  'app/(public)/airpods/used-airpods-attention/page.tsx': '2026-04-14',
  'app/(public)/airpods/airpods-find/page.tsx':       '2026-04-14',
  'app/(public)/airpods/airpods-buy/page.tsx':        '2026-04-14',
  'app/(public)/airpods/recommend/page.tsx':          '2026-04-13',
  'app/(public)/airpods/airpods-filter-search/page.tsx': '2026-04-08',
}
