-- ============================================================
-- Pixel Models テーブル作成 & データ投入
-- Google Pixel（Android）用。iPhone/iPad と同じ設計方針で
-- product_type='pixel' の product_shop_links / pixel_price_logs と連携する。
-- ============================================================

CREATE TABLE IF NOT EXISTS pixel_models (
  id                 INTEGER PRIMARY KEY,
  model              TEXT NOT NULL,
  slug               TEXT NOT NULL UNIQUE,
  show               INTEGER NOT NULL DEFAULT 1,
  image              TEXT,
  date               TEXT,
  cpu                TEXT,           -- Tensor チップ名（例: Google Tensor G3）
  battery            TEXT,           -- バッテリー容量 mAh
  point              TEXT,
  advance            JSONB,
  official           TEXT,
  strage             TEXT,
  color              TEXT,
  tensor_gen         TEXT,           -- G1〜G4
  -- ベンチマーク
  score_single       INTEGER,        -- Geekbench 6 single
  score_multi        INTEGER,        -- Geekbench 6 multi
  antutu_total       INTEGER,        -- AnTuTu v10 総合
  antutu_cpu         INTEGER,
  antutu_gpu         INTEGER,
  antutu_mem         INTEGER,
  antutu_ux          INTEGER,
  -- スペック
  ram                TEXT,
  size               TEXT,
  weight             TEXT,
  display            TEXT,
  resolution         TEXT,
  refresh_rate       TEXT,           -- "60Hz" / "120Hz (LTPO)"
  port               TEXT,           -- "USB-C"
  water_resistance   TEXT,           -- "IP68"
  felica             BOOLEAN NOT NULL DEFAULT FALSE,
  sim                TEXT,
  -- バッテリー / 充電
  battery_life       TEXT,           -- Google公称の通常使用時間
  battery_life_saver TEXT,           -- スーパーバッテリーセーバー時の最大時間
  wired_charging     TEXT,           -- 有線 "27W"
  wireless_charging  TEXT,           -- "21W (Pixel Stand) / Qi 12W"
  reverse_charging   BOOLEAN NOT NULL DEFAULT FALSE,
  -- カメラ
  main_camera        TEXT,
  ultrawide_camera   TEXT,
  tele_camera        TEXT,
  front_camera       TEXT,
  optical_zoom       TEXT,
  -- Pixel / AI 機能
  magic_eraser       BOOLEAN NOT NULL DEFAULT FALSE,  -- 消しゴムマジック
  best_take          BOOLEAN NOT NULL DEFAULT FALSE,  -- ベストテイク
  magic_editor       BOOLEAN NOT NULL DEFAULT FALSE,  -- 編集マジック
  night_sight        BOOLEAN NOT NULL DEFAULT FALSE,  -- 夜景モード
  real_tone          BOOLEAN NOT NULL DEFAULT FALSE,  -- リアルトーン
  face_unlock        BOOLEAN NOT NULL DEFAULT FALSE,  -- 顔認証
  temp_sensor        BOOLEAN NOT NULL DEFAULT FALSE,  -- 温度センサー（8 Pro〜）
  video_boost        BOOLEAN NOT NULL DEFAULT FALSE,  -- 動画ブースト（8 Pro〜）
  accessory_case     TEXT,
  accessory_film     TEXT,
  price              JSONB,
  -- サポート
  update_years       INTEGER,        -- OS/セキュリティ更新保証年数（3 or 7）
  support_until      TEXT,           -- "YYYY-MM"（サポート終了予定）
  last_android       TEXT            -- 終了済みなら最終対応バージョン、現役は NULL
);

-- RLS（公開読み取りのみ）
ALTER TABLE pixel_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON pixel_models;
CREATE POLICY "Allow public read" ON pixel_models FOR SELECT USING (true);

-- ============================================================
-- データ投入（id: 1〜13, 連番）
-- ※ seed 値は sql/pixel_models_seed.sql を参照
-- ============================================================
