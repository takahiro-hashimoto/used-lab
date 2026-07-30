-- ============================================================
-- 価格ログにマッチ件数（＝流通量の目安）を追加
--
-- 目的:
--   1) 相場の信頼度を担保する。1件しかマッチしなかった日と50件の日を
--      同じ重みで平均していたため、少数サンプル由来のブレを判別できなかった。
--   2) 在庫状況をコンテンツ化する。
--      「発売間もないため中古の流通が少ない」「流通が減っている（生産終了・入手困難）」
--      といった、価格だけでは伝えられない情報を提示できるようにする。
--
-- 注意:
--   過去ログには件数が残っていないため、この列は適用日以降のみ埋まる（NULL 許容）。
--   取得スクリプト側（scripts/lib/rakuten-api.ts の pickMinMax）で件数を返し、
--   各カテゴリの INSERT に含める。
-- ============================================================

-- iosys / geo / janpara 構成のカテゴリ
ALTER TABLE iphone_price_logs
  ADD COLUMN IF NOT EXISTS iosys_count   integer,
  ADD COLUMN IF NOT EXISTS geo_count     integer,
  ADD COLUMN IF NOT EXISTS janpara_count integer;

ALTER TABLE ipad_price_logs
  ADD COLUMN IF NOT EXISTS iosys_count   integer,
  ADD COLUMN IF NOT EXISTS geo_count     integer,
  ADD COLUMN IF NOT EXISTS janpara_count integer;

ALTER TABLE watch_price_logs
  ADD COLUMN IF NOT EXISTS iosys_count   integer,
  ADD COLUMN IF NOT EXISTS geo_count     integer,
  ADD COLUMN IF NOT EXISTS janpara_count integer;

ALTER TABLE pixel_price_logs
  ADD COLUMN IF NOT EXISTS iosys_count   integer,
  ADD COLUMN IF NOT EXISTS geo_count     integer,
  ADD COLUMN IF NOT EXISTS janpara_count integer;

ALTER TABLE galaxy_price_logs
  ADD COLUMN IF NOT EXISTS iosys_count   integer,
  ADD COLUMN IF NOT EXISTS geo_count     integer,
  ADD COLUMN IF NOT EXISTS janpara_count integer;

-- AirPods は eearphone（eイヤホン）構成
ALTER TABLE airpods_price_logs
  ADD COLUMN IF NOT EXISTS iosys_count     integer,
  ADD COLUMN IF NOT EXISTS janpara_count   integer,
  ADD COLUMN IF NOT EXISTS eearphone_count integer;

-- MacBook はショップ横断で min1..max5 を持つ別スキーマのため、総件数のみ
ALTER TABLE macbook_price_logs
  ADD COLUMN IF NOT EXISTS matched_count integer;

COMMENT ON COLUMN iphone_price_logs.iosys_count IS '相場算出に使用した該当商品数（流通量の目安）。適用日以前はNULL';
COMMENT ON COLUMN macbook_price_logs.matched_count IS '相場算出に使用した該当商品数（全ショップ横断）。適用日以前はNULL';
