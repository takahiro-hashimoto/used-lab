-- ============================================
-- 既存の logged_at を UTC → JST (+9時間) に修正
-- Supabase SQL Editor で実行してください
-- ============================================

-- ■ 0. まずカラム型を確認
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE column_name = 'logged_at'
  AND table_name IN (
    'iphone_price_logs','ipad_price_logs','watch_price_logs',
    'macbook_price_logs','airpods_price_logs'
  )
ORDER BY table_name;

-- ============================================
-- ★ カラム型が text の場合 → こちらを実行
-- ============================================

-- ■ 修正前の確認（任意）
-- SELECT logged_at FROM iphone_price_logs ORDER BY logged_at DESC LIMIT 5;

-- ■ 1. iphone_price_logs
UPDATE iphone_price_logs
SET logged_at = to_char(
  logged_at::timestamptz AT TIME ZONE 'Asia/Tokyo',
  'YYYY-MM-DD"T"HH24:MI:SS"+09:00"'
);

-- ■ 2. ipad_price_logs
UPDATE ipad_price_logs
SET logged_at = to_char(
  logged_at::timestamptz AT TIME ZONE 'Asia/Tokyo',
  'YYYY-MM-DD"T"HH24:MI:SS"+09:00"'
);

-- ■ 3. watch_price_logs
UPDATE watch_price_logs
SET logged_at = to_char(
  logged_at::timestamptz AT TIME ZONE 'Asia/Tokyo',
  'YYYY-MM-DD"T"HH24:MI:SS"+09:00"'
);

-- ■ 4. macbook_price_logs
UPDATE macbook_price_logs
SET logged_at = to_char(
  logged_at::timestamptz AT TIME ZONE 'Asia/Tokyo',
  'YYYY-MM-DD"T"HH24:MI:SS"+09:00"'
);

-- ■ 5. airpods_price_logs
UPDATE airpods_price_logs
SET logged_at = to_char(
  logged_at::timestamptz AT TIME ZONE 'Asia/Tokyo',
  'YYYY-MM-DD"T"HH24:MI:SS"+09:00"'
);

-- ■ 修正後の確認
-- SELECT logged_at FROM iphone_price_logs ORDER BY logged_at DESC LIMIT 5;
-- 期待値: "2026-03-02T06:19:41+09:00" のようなJST文字列


-- ============================================
-- ★ カラム型が timestamptz の場合 → こちらを実行
--   （timestamptzは内部的にUTCで保持されるため、
--     +9時間分ずらしてJST日付がUTC表記でも正しくなるようにする）
-- ============================================

-- UPDATE iphone_price_logs
-- SET logged_at = logged_at::timestamptz + INTERVAL '9 hours';
--
-- UPDATE ipad_price_logs
-- SET logged_at = logged_at::timestamptz + INTERVAL '9 hours';
--
-- UPDATE watch_price_logs
-- SET logged_at = logged_at::timestamptz + INTERVAL '9 hours';
--
-- UPDATE macbook_price_logs
-- SET logged_at = logged_at::timestamptz + INTERVAL '9 hours';
--
-- UPDATE airpods_price_logs
-- SET logged_at = logged_at::timestamptz + INTERVAL '9 hours';
--
-- ⚠️ 注意: timestamptzの場合、この方法だと実際の時刻がずれます。
--   根本対応として logged_at を text 型に変更するか、
--   フロントエンドでJSTパースする方が正しいアプローチです。
