-- ============================================================
-- 価格ログに「取得した全商品の価格」を配列で追加
--
-- 目的:
--   これまで各ショップの最安・最高しか保存しておらず、取得した商品の
--   95%（1日あたり約15,000件中14,000件以上）を集計後に破棄していた。
--   そのため中央値・価格分布が出せず、集計ロジックを変えても過去分を
--   再計算できなかった（2026-07-30の劣化品除外でグラフに段差が出たのはこのため）。
--
--   価格を全件残すことで以下が可能になる:
--     - 中央値・最頻価格（「最安は¥44,800だが実際に多いのは¥49,000前後」）
--     - 外れ値を除いた現実的な最安値
--     - 価格帯の厚み（選択肢の多さ）
--     - ロジック変更時に全期間を再計算（段差を作らずに済む）
--
-- 方式:
--   明細テーブルではなく integer[] を採用。価格1件は4バイトだが、明細行にすると
--   タプルヘッダ+主キー+FKインデックスで約96バイトかかり、中身の24倍が
--   付帯コストになる。配列なら年25MB（明細テーブルは年460MB）で、
--   かつ行数が1行も増えないため既存クエリの性能に影響しない。
--
-- 注意:
--   ADD COLUMN（デフォルト値なし）はメタデータの更新のみで、
--   既存行（18,793行）の書き換えは発生しない。min/max も一切変更しない。
--   過去分はNULLのままなので、参照側はNULLで動くように実装すること。
-- ============================================================

-- iosys / geo / janpara 構成のカテゴリ
ALTER TABLE iphone_price_logs
  ADD COLUMN IF NOT EXISTS iosys_prices   integer[],
  ADD COLUMN IF NOT EXISTS geo_prices     integer[],
  ADD COLUMN IF NOT EXISTS janpara_prices integer[];

ALTER TABLE ipad_price_logs
  ADD COLUMN IF NOT EXISTS iosys_prices   integer[],
  ADD COLUMN IF NOT EXISTS geo_prices     integer[],
  ADD COLUMN IF NOT EXISTS janpara_prices integer[];

ALTER TABLE watch_price_logs
  ADD COLUMN IF NOT EXISTS iosys_prices   integer[],
  ADD COLUMN IF NOT EXISTS geo_prices     integer[],
  ADD COLUMN IF NOT EXISTS janpara_prices integer[];

ALTER TABLE pixel_price_logs
  ADD COLUMN IF NOT EXISTS iosys_prices   integer[],
  ADD COLUMN IF NOT EXISTS geo_prices     integer[],
  ADD COLUMN IF NOT EXISTS janpara_prices integer[];

ALTER TABLE galaxy_price_logs
  ADD COLUMN IF NOT EXISTS iosys_prices   integer[],
  ADD COLUMN IF NOT EXISTS geo_prices     integer[],
  ADD COLUMN IF NOT EXISTS janpara_prices integer[];

-- AirPods は eearphone（eイヤホン）構成
ALTER TABLE airpods_price_logs
  ADD COLUMN IF NOT EXISTS iosys_prices     integer[],
  ADD COLUMN IF NOT EXISTS janpara_prices   integer[],
  ADD COLUMN IF NOT EXISTS eearphone_prices integer[];

-- MacBook はショップ横断で検索するため、ショップ別に分けられない
ALTER TABLE macbook_price_logs
  ADD COLUMN IF NOT EXISTS matched_prices integer[];

COMMENT ON COLUMN iphone_price_logs.iosys_prices IS
  '相場算出に使用した全商品の価格（昇順・円）。中央値/分布の算出用。適用日以前はNULL';
COMMENT ON COLUMN macbook_price_logs.matched_prices IS
  '相場算出に使用した全商品の価格（昇順・円、全ショップ横断）。適用日以前はNULL';
