-- ============================================================
-- Galaxy Models テーブル作成
-- Samsung Galaxy（Android）用。Pixel と同じ設計方針で
-- product_type='galaxy' の product_shop_links / galaxy_price_logs と連携する。
-- cpu には日本版の実SoC（Snapdragon/Exynos/Dimensity）を格納。
-- ============================================================

CREATE TABLE IF NOT EXISTS galaxy_models (
  id                 INTEGER PRIMARY KEY,
  model              TEXT NOT NULL,
  slug               TEXT NOT NULL UNIQUE,
  show               INTEGER NOT NULL DEFAULT 1,
  image              TEXT,
  date               TEXT,
  cpu                TEXT,           -- 日本版SoC名（例: Snapdragon 8 Gen 2 for Galaxy）
  battery            TEXT,           -- バッテリー容量 mAh
  point              TEXT,
  advance            JSONB,
  official           TEXT,
  strage             TEXT,
  color              TEXT,
  series             TEXT,           -- 'S' | 'A' | 'Z Flip' | 'Z Fold'
  model_number       TEXT,           -- 日本版型番（例: SC-51D / SCG19）
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
  refresh_rate       TEXT,           -- "120Hz (LTPO)" 等
  cover_display      TEXT,           -- 折りたたみのカバー(外側)画面。バー型は NULL
  port               TEXT,           -- "USB-C"
  water_resistance   TEXT,           -- "IP68" / "IPX8" 等
  felica             BOOLEAN NOT NULL DEFAULT FALSE,
  microsd            BOOLEAN NOT NULL DEFAULT FALSE,
  sim                TEXT,
  -- バッテリー / 充電
  battery_life       TEXT,
  battery_life_saver TEXT,
  wired_charging     TEXT,           -- 有線 "45W"
  wireless_charging  TEXT,           -- "15W (Qi)"
  reverse_charging   BOOLEAN NOT NULL DEFAULT FALSE,  -- Wireless PowerShare
  -- カメラ
  main_camera        TEXT,
  ultrawide_camera   TEXT,
  tele_camera        TEXT,
  front_camera       TEXT,
  optical_zoom       TEXT,
  -- Galaxy 機能
  galaxy_ai          BOOLEAN NOT NULL DEFAULT FALSE,  -- Galaxy AI
  circle_to_search   BOOLEAN NOT NULL DEFAULT FALSE,  -- かこって検索
  object_eraser      BOOLEAN NOT NULL DEFAULT FALSE,  -- オブジェクト消去
  night_mode         BOOLEAN NOT NULL DEFAULT FALSE,  -- ナイトモード
  s_pen              BOOLEAN NOT NULL DEFAULT FALSE,  -- S Pen 対応
  dex                BOOLEAN NOT NULL DEFAULT FALSE,  -- Samsung DeX
  accessory_case     TEXT,
  accessory_film     TEXT,
  price              JSONB,
  -- サポート
  update_years       INTEGER,        -- OS/セキュリティ更新保証年数
  support_until      TEXT,           -- "YYYY-MM"
  last_android       TEXT            -- 終了済みなら最終対応バージョン、現役は NULL
);

-- RLS（公開読み取りのみ）
ALTER TABLE galaxy_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON galaxy_models;
CREATE POLICY "Allow public read" ON galaxy_models FOR SELECT USING (true);

-- ============================================================
-- データ投入は sql/galaxy_models_seed.sql を参照
-- ============================================================
