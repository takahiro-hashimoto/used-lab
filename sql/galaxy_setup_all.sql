-- ============================================================
-- Galaxy カテゴリ 一括セットアップSQL（Supabase SQL Editorに貼り付けて実行）
-- 順序: models → seed(25機種) → price_logs → shops列 → shop_links
-- ※ date/resolution/size はiPhone DB表記に統一済み。A53/A54/A55の防水はIP68に修正済み。
-- ============================================================

-- ① テーブル作成 (galaxy_models)
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

-- ② シードデータ投入 (25機種)
-- ============================================================
-- Galaxy Models シードデータ（id: 1〜25, 日本版基準）
-- 出典: docomo/au公式 / GSMArena / Samsung公式 / Geekbench / AnTuTu 等
-- ※ 日本版の実SoC（Snapdragon/Exynos/Dimensity）で記載。ベンチは代表値。
-- ※ S20 Ultra(au SCG03)はFeliCa非対応。A52 5Gは日本キャリア未発売のため対象外。
-- ※ image は専用画像未用意のため NULL。update_years はセキュリティ更新の目安年数。
-- ============================================================

INSERT INTO galaxy_models
  (id, model, slug, show, image, date, cpu, battery, point, advance, official, strage, color, series, model_number, score_single, score_multi, antutu_total, antutu_cpu, antutu_gpu, antutu_mem, antutu_ux, ram, size, weight, display, resolution, refresh_rate, cover_display, port, water_resistance, felica, microsd, sim, battery_life, battery_life_saver, wired_charging, wireless_charging, reverse_charging, main_camera, ultrawide_camera, tele_camera, front_camera, optical_zoom, galaxy_ai, circle_to_search, object_eraser, night_mode, s_pen, dex, accessory_case, accessory_film, price, update_years, support_until, last_android)
VALUES
(1, 'Samsung Galaxy S20 5G', 'galaxy-s20', 1, NULL, '2020/3/25', 'Snapdragon 865', '4000mAh', '初代120HzのコンパクトS。microSD対応の最後期世代。', NULL, NULL, '128GB', NULL, 'S', 'SC-51A / SCG01', 1128, 3277, 750000, NULL, NULL, NULL, NULL, '12GB', '152 × 69 × 7.9mm', '163g', '6.2インチ Dynamic AMOLED 2X', '3,200 x 1,440', '120Hz (FHD+時)', NULL, 'USB-C', 'IP68', TRUE, TRUE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '12MP (広角)', '12MP (超広角)', '64MP (望遠)', '10MP', '3倍(ハイブリッド)', FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 4, '2024-08', NULL),
(2, 'Samsung Galaxy S20 Ultra 5G', 'galaxy-s20-ultra', 1, NULL, '2020/7/3', 'Snapdragon 865', '5000mAh', '1億800万画素と100倍ズームの初代Ultra。au専売でFeliCa非対応に注意。', NULL, NULL, '128GB', NULL, 'S', 'SCG03 (au)', 1168, 3431, 760000, NULL, NULL, NULL, NULL, '12GB', '167 × 76 × 8.8mm', '222g', '6.9インチ Dynamic AMOLED 2X', '3,200 x 1,440', '120Hz (FHD+時)', NULL, 'USB-C', 'IP68', FALSE, TRUE, 'nanoSIM / eSIM', NULL, NULL, '45W', '15W (Qi)', TRUE, '108MP (広角)', '12MP (超広角)', '48MP (ペリスコープ望遠)', '40MP', '4倍(光学)/最大100倍', FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 4, '2024-07', NULL),
(3, 'Samsung Galaxy S21 5G', 'galaxy-s21', 1, NULL, '2021/4/22', 'Snapdragon 888', '4000mAh', '171gの軽量コンパクト。中古が手頃な狙い目のフラッグシップ。', NULL, NULL, '256GB', NULL, 'S', 'SC-51B / SCG09', 1130, 3650, 735000, NULL, NULL, NULL, NULL, '8GB', '151.7 × 71.2 × 7.9mm', '171g', '6.2インチ Dynamic AMOLED 2X', '2,400 x 1,080', '120Hz', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '12MP (広角)', '12MP (超広角)', '64MP (望遠)', '10MP', '3倍(ハイブリッド)', FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 5, '2025-11', NULL),
(4, 'Samsung Galaxy S21 Ultra 5G', 'galaxy-s21-ultra', 1, NULL, '2021/4/22', 'Snapdragon 888', '5000mAh', 'Sシリーズ初のS Pen対応・光学10倍。docomo専売。', NULL, NULL, '256GB', NULL, 'S', 'SC-52B (docomo)', 1100, 3300, 749000, NULL, NULL, NULL, NULL, '12GB', '165 × 76 × 8.9mm', '228g', '6.8インチ Dynamic AMOLED 2X', '3,200 x 1,440', '120Hz (LTPO)', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '108MP (広角)', '12MP (超広角)', '10MP(3倍)+10MP(10倍)', '40MP', '10倍(光学)', FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 5, '2025-11', NULL),
(5, 'Samsung Galaxy S22', 'galaxy-s22', 1, NULL, '2022/4/21', 'Snapdragon 8 Gen 1', '3700mAh', '6.1インチの扱いやすいサイズに光学3倍望遠。5年更新対象。', NULL, NULL, '256GB', NULL, 'S', 'SC-51C / SCG13', 1700, 3900, 1000000, NULL, NULL, NULL, NULL, '8GB', '146 × 71 × 7.6mm', '168g', '6.1インチ Dynamic AMOLED 2X', '2,340 x 1,080', '120Hz', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', '10MP (望遠)', '10MP', '3倍(光学)', FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 5, '2027-02', NULL),
(6, 'Samsung Galaxy S22 Ultra', 'galaxy-s22-ultra', 1, NULL, '2022/4/21', 'Snapdragon 8 Gen 1', '5000mAh', 'S Pen内蔵のNote後継。1億800万画素＋光学10倍の全部入り。', NULL, NULL, '256GB', NULL, 'S', 'SC-52C / SCG14', 1700, 3900, 1080000, NULL, NULL, NULL, NULL, '12GB', '163 × 78 × 8.9mm', '229g', '6.8インチ Dynamic AMOLED 2X', '3,088 x 1,440', '120Hz (LTPO)', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '45W', '15W (Qi)', TRUE, '108MP (広角)', '12MP (超広角)', '10MP(3倍)+10MP(10倍)', '40MP', '10倍(光学)', FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 5, '2027-02', NULL),
(7, 'Samsung Galaxy S23', 'galaxy-s23', 1, NULL, '2023/4/20', 'Snapdragon 8 Gen 2 for Galaxy', '3900mAh', '専用Snapdragon 8 Gen 2で発熱・電池持ちが改善。Galaxy AIにも対応。', NULL, NULL, '256GB', NULL, 'S', 'SC-51D / SCG19', 2000, 5300, 1550000, NULL, NULL, NULL, NULL, '8GB', '146 × 71 × 7.6mm', '168g', '6.1インチ Dynamic AMOLED 2X', '2,340 x 1,080', '120Hz', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', '10MP (望遠)', '12MP', '3倍(光学)', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 5, '2028-04', NULL),
(8, 'Samsung Galaxy S23 Ultra', 'galaxy-s23-ultra', 1, NULL, '2023/4/20', 'Snapdragon 8 Gen 2 for Galaxy', '5000mAh', '2億画素カメラとS Pen内蔵。Galaxy AI対応の型落ちフラッグシップ。', NULL, NULL, '256GB / 512GB', NULL, 'S', 'SC-52D / SCG20', 2020, 5150, 1570000, NULL, NULL, NULL, NULL, '12GB', '163 × 78 × 8.9mm', '234g', '6.8インチ Dynamic AMOLED 2X', '3,088 x 1,440', '120Hz (LTPO)', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '45W', '15W (Qi)', TRUE, '200MP (広角)', '12MP (超広角)', '10MP(3倍)+10MP(10倍)', '12MP', '10倍(光学)', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 5, '2028-04', NULL),
(9, 'Samsung Galaxy S24', 'galaxy-s24', 1, NULL, '2024/4/11', 'Snapdragon 8 Gen 3 for Galaxy', '4000mAh', 'Galaxy AI標準搭載・7年サポート。日本版はSnapdragon確定。', NULL, NULL, '256GB', NULL, 'S', 'SC-51E / SCG25', 2250, 6900, 2100000, NULL, NULL, NULL, NULL, '8GB', '147 × 71 × 7.6mm', '167g', '6.2インチ Dynamic AMOLED 2X', '2,340 x 1,080', '120Hz (LTPO)', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', '10MP (望遠)', '12MP', '3倍(光学)', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 7, '2031-04', NULL),
(10, 'Samsung Galaxy S24 Ultra', 'galaxy-s24-ultra', 1, NULL, '2024/4/11', 'Snapdragon 8 Gen 3 for Galaxy', '5000mAh', 'チタンフレーム・2億画素・S Pen内蔵。7年サポートの完全体。', NULL, NULL, '256GB / 512GB / 1TB', NULL, 'S', 'SC-52E / SCG26', 2290, 7380, 2150000, NULL, NULL, NULL, NULL, '12GB', '162 × 79 × 8.6mm', '233g', '6.8インチ Dynamic AMOLED 2X', '3,120 x 1,440', '120Hz (LTPO)', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '45W', '15W (Qi)', TRUE, '200MP (広角)', '12MP (超広角)', '50MP(5倍)+10MP(3倍)', '12MP', '5倍(光学)', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 7, '2031-04', NULL),
(11, 'Samsung Galaxy S25', 'galaxy-s25', 1, NULL, '2025/2/14', 'Snapdragon 8 Elite for Galaxy', '4000mAh', 'Snapdragon 8 EliteとGemini連携AI。162gの軽量最新モデル。', NULL, NULL, '256GB / 512GB', NULL, 'S', 'SC-51F / SCG31', 3000, 9500, 2900000, NULL, NULL, NULL, NULL, '12GB', '147 × 71 × 7.2mm', '162g', '6.2インチ Dynamic AMOLED 2X', '2,340 x 1,080', '120Hz (LTPO)', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', '10MP (望遠)', '12MP', '3倍(光学)', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 7, '2032-02', NULL),
(12, 'Samsung Galaxy S25 Ultra', 'galaxy-s25-ultra', 1, NULL, '2025/2/14', 'Snapdragon 8 Elite for Galaxy', '5000mAh', '超広角も50MPに刷新。S Pen内蔵・7年サポートの最上位。', NULL, NULL, '256GB / 512GB / 1TB', NULL, 'S', 'SC-52F / SCG32', 3000, 9530, 3000000, NULL, NULL, NULL, NULL, '12GB', '163 × 78 × 8.2mm', '218g', '6.9インチ Dynamic AMOLED 2X', '3,120 x 1,440', '120Hz (LTPO)', NULL, 'USB-C', 'IP68', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '45W', '15W (Qi)', TRUE, '200MP (広角)', '50MP (超広角)', '50MP(5倍)+10MP(3倍)', '12MP', '5倍(光学)', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 7, '2032-02', NULL),
(13, 'Samsung Galaxy A51 5G', 'galaxy-a51-5g', 1, NULL, '2020/11/6', 'Snapdragon 765G', '4500mAh', '5G対応のミドル入門機。防水・FeliCa・microSD対応。', NULL, NULL, '128GB', NULL, 'A', 'SC-54A / SCG07', 800, 1860, 400000, NULL, NULL, NULL, NULL, '6GB', '158.9 × 73.6 × 8.7mm', '187g', '6.5インチ Super AMOLED', '2,400 x 1,080', '60Hz', NULL, 'USB-C', 'IP68', TRUE, TRUE, 'nanoSIM / eSIM', NULL, NULL, '15W', '非対応', FALSE, '48MP (広角)', '12MP (超広角)', NULL, '32MP', NULL, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, NULL, NULL, NULL, 3, '2024-11', NULL),
(14, 'Samsung Galaxy A53 5G', 'galaxy-a53-5g', 1, NULL, '2022/5/27', 'Exynos 1280', '5000mAh', '120Hz有機EL・5000mAh・4回OS更新。コスパ中古の定番。', NULL, NULL, '128GB', NULL, 'A', 'SC-53C / SCG15', 900, 1950, 410000, NULL, NULL, NULL, NULL, '6GB', '159.6 × 74.8 × 8.1mm', '189g', '6.5インチ Super AMOLED', '2,400 x 1,080', '120Hz', NULL, 'USB-C', 'IP68', TRUE, TRUE, 'nanoSIM / eSIM', NULL, NULL, '25W', '非対応', FALSE, '64MP (広角)', '12MP (超広角)', NULL, '32MP', NULL, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, NULL, NULL, NULL, 5, '2027-05', NULL),
(15, 'Samsung Galaxy A54 5G', 'galaxy-a54-5g', 1, NULL, '2023/5/25', 'Exynos 1380', '5000mAh', 'Aシリーズ人気の中核。5000万画素OIS・120Hz・防水FeliCa。', NULL, NULL, '128GB', NULL, 'A', 'SC-53D / SCG21', 1000, 2850, 580000, NULL, NULL, NULL, NULL, '6GB', '158.2 × 76.7 × 8.2mm', '202g', '6.4インチ Super AMOLED', '2,340 x 1,080', '120Hz', NULL, 'USB-C', 'IP68', TRUE, TRUE, 'nanoSIM / eSIM', NULL, NULL, '25W', '非対応', FALSE, '50MP (広角)', '12MP (超広角)', NULL, '32MP', NULL, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, NULL, NULL, NULL, 5, '2028-05', NULL),
(16, 'Samsung Galaxy A55 5G', 'galaxy-a55-5g', 1, NULL, '2024/5/30', 'Exynos 1480', '5000mAh', '金属フレーム採用でミドル最上位級。RAM8GB・4回OS更新。', NULL, NULL, '128GB', NULL, 'A', 'SC-53E / SCG27', 1180, 3450, 740000, NULL, NULL, NULL, NULL, '8GB', '161.1 × 77.4 × 8.2mm', '213g', '6.6インチ Super AMOLED', '2,340 x 1,080', '120Hz', NULL, 'USB-C', 'IP68', TRUE, TRUE, 'nanoSIM / eSIM', NULL, NULL, '25W', '非対応', FALSE, '50MP (広角)', '12MP (超広角)', NULL, '32MP', NULL, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, NULL, NULL, NULL, 5, '2029-05', NULL),
(17, 'Samsung Galaxy A23 5G', 'galaxy-a23-5g', 1, NULL, '2022/10/27', 'Dimensity 700', '4000mAh', '2万円台から狙えるエントリー。防水・FeliCa・大画面の割り切り機。', NULL, NULL, '64GB', NULL, 'A', 'SC-56C / SCG18', 650, 1900, 360000, NULL, NULL, NULL, NULL, '4GB', '150 × 71 × 9mm', '168g', '5.8インチ TFT液晶', '1,560 x 720', '60Hz', NULL, 'USB-C', 'IP68', TRUE, TRUE, 'nanoSIM / eSIM', NULL, NULL, '15W', '非対応', FALSE, '50MP (シングル)', NULL, NULL, '5MP', NULL, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, NULL, NULL, NULL, 4, '2026-10', NULL),
(18, 'Samsung Galaxy Z Flip3 5G', 'galaxy-z-flip3', 1, NULL, '2021/10/6', 'Snapdragon 888', '3300mAh', '縦折りを普及させた初のヒット機。コンパクトに畳めるフラッグシップ。', NULL, NULL, '128GB', NULL, 'Z Flip', 'SC-54B / SCG12', 1100, 3200, 900000, NULL, NULL, NULL, NULL, '8GB', '166 × 72 × 6.9mm(展開)', '183g', '6.7インチ Dynamic AMOLED 2X', '2,640 x 1,080', '120Hz', '1.9インチ Super AMOLED', 'USB-C', 'IPX8', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '15W', '10W (Qi)', TRUE, '12MP (広角)', '12MP (超広角)', NULL, '10MP (内側)', NULL, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 5, '2026-10', NULL),
(19, 'Samsung Galaxy Z Flip4', 'galaxy-z-flip4', 1, NULL, '2022/9/29', 'Snapdragon 8+ Gen 1', '3700mAh', '電池と充電が向上した縦折り。Galaxy AIにも後日対応。', NULL, NULL, '128GB', NULL, 'Z Flip', 'SC-54C / SCG17', 1280, 3800, 1050000, NULL, NULL, NULL, NULL, '8GB', '165 × 72 × 6.9mm(展開)', '187g', '6.7インチ Dynamic AMOLED 2X', '2,640 x 1,080', '120Hz', '1.9インチ Super AMOLED', 'USB-C', 'IPX8', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '12MP (広角)', '12MP (超広角)', NULL, '10MP (内側)', NULL, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 5, '2027-09', NULL),
(20, 'Samsung Galaxy Z Flip5', 'galaxy-z-flip5', 1, NULL, '2023/9/1', 'Snapdragon 8 Gen 2 for Galaxy', '3700mAh', '3.4インチの大型カバー画面で閉じたまま操作可能に。', NULL, NULL, '256GB', NULL, 'Z Flip', 'SC-54D / SCG23', 2000, 5200, 1530000, NULL, NULL, NULL, NULL, '8GB', '165.1 × 71.9 × 6.9mm(展開)', '187g', '6.7インチ Dynamic AMOLED 2X', '2,640 x 1,080', '120Hz (LTPO)', '3.4インチ Super AMOLED', 'USB-C', 'IPX8', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '12MP (広角)', '12MP (超広角)', NULL, '10MP (内側)', NULL, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 5, '2028-09', NULL),
(21, 'Samsung Galaxy Z Flip6', 'galaxy-z-flip6', 1, NULL, '2024/7/31', 'Snapdragon 8 Gen 3 for Galaxy', '4000mAh', '5000万画素カメラ・4000mAh・防塵IP48。Galaxy AI標準・7年サポート。', NULL, NULL, '256GB', NULL, 'Z Flip', 'SC-54E / SCG29', 2247, 6857, 1687000, NULL, NULL, NULL, NULL, '12GB', '165.1 × 71.9 × 6.9mm(展開)', '187g', '6.7インチ Dynamic AMOLED 2X', '2,640 x 1,080', '120Hz (LTPO)', '3.4インチ Super AMOLED', 'USB-C', 'IP48', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', NULL, '10MP (内側)', '2倍(センサー)', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, NULL, NULL, NULL, 7, '2031-07', NULL),
(22, 'Samsung Galaxy Z Fold3 5G', 'galaxy-z-fold3', 1, NULL, '2021/10/6', 'Snapdragon 888', '4400mAh', '初の防水・S Pen対応フォルダブル。7.6インチの大画面2画面機。', NULL, NULL, '256GB', NULL, 'Z Fold', 'SC-55B / SCG11', 1480, 3600, 900000, NULL, NULL, NULL, NULL, '12GB', '158.2 × 128.1 × 6.4mm(展開)', '271g', '7.6インチ Dynamic AMOLED 2X', '2,208 x 1,768', '120Hz', '6.2インチ Dynamic AMOLED 120Hz', 'USB-C', 'IPX8', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '11W (Qi)', TRUE, '12MP (広角)', '12MP (超広角)', '12MP (望遠)', '4MP (内側UDC) / 10MP (カバー)', '2倍(光学)', FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 5, '2026-10', NULL),
(23, 'Samsung Galaxy Z Fold4', 'galaxy-z-fold4', 1, NULL, '2022/9/29', 'Snapdragon 8+ Gen 1', '4400mAh', 'カメラが5000万画素に強化。軽量化した本格フォルダブル。', NULL, NULL, '256GB', NULL, 'Z Fold', 'SC-55C / SCG16', 1900, 5000, 1232800, NULL, NULL, NULL, NULL, '12GB', '155.1 × 130.1 × 6.3mm(展開)', '263g', '7.6インチ Dynamic AMOLED 2X', '2,176 x 1,812', '120Hz', '6.2インチ Dynamic AMOLED 120Hz', 'USB-C', 'IPX8', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', '10MP (望遠)', '4MP (内側UDC) / 10MP (カバー)', '3倍(光学)', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 5, '2027-09', NULL),
(24, 'Samsung Galaxy Z Fold5', 'galaxy-z-fold5', 1, NULL, '2023/9/1', 'Snapdragon 8 Gen 2 for Galaxy', '4400mAh', '隙間なく畳めるフラットヒンジを採用し253gに軽量化。', NULL, NULL, '256GB / 512GB', NULL, 'Z Fold', 'SC-55D / SCG22', 1968, 5137, 1540000, NULL, NULL, NULL, NULL, '12GB', '154.9 × 129.9 × 6.1mm(展開)', '253g', '7.6インチ Dynamic AMOLED 2X', '2,176 x 1,812', '120Hz', '6.2インチ Dynamic AMOLED 120Hz', 'USB-C', 'IPX8', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', '10MP (望遠)', '4MP (内側UDC) / 10MP (カバー)', '3倍(光学)', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 5, '2028-09', NULL),
(25, 'Samsung Galaxy Z Fold6', 'galaxy-z-fold6', 1, NULL, '2024/7/31', 'Snapdragon 8 Gen 3 for Galaxy', '4400mAh', '239gに軽量化・防塵IP48・Galaxy AI標準。7年サポートの最新Fold。', NULL, NULL, '256GB / 512GB', NULL, 'Z Fold', 'SC-55E / SCG28', 2287, 7096, 2100000, NULL, NULL, NULL, NULL, '12GB', '153.5 × 132.6 × 5.6mm(展開)', '239g', '7.6インチ Dynamic AMOLED 2X', '2,160 x 1,856', '120Hz', '6.3インチ Dynamic AMOLED 120Hz', 'USB-C', 'IP48', TRUE, FALSE, 'nanoSIM / eSIM', NULL, NULL, '25W', '15W (Qi)', TRUE, '50MP (広角)', '12MP (超広角)', '10MP (望遠)', '4MP (内側UDC) / 10MP (カバー)', '3倍(光学)', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, NULL, NULL, NULL, 7, '2031-07', NULL);

-- ③ 価格ログテーブル (galaxy_price_logs)
-- ============================================================
-- Galaxy Price Logs テーブル作成
-- iphone_price_logs / pixel_price_logs と同じ3店舗（イオシス・ゲオ・じゃんぱら）構成。
-- 価格収集 cron（Vultr）側で galaxy 対応後に日次 INSERT される想定。
-- ============================================================

CREATE TABLE IF NOT EXISTS galaxy_price_logs (
  id            BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  logged_at     DATE NOT NULL,
  model_id      INTEGER NOT NULL REFERENCES galaxy_models(id),
  model_name    TEXT,
  storage       TEXT,
  iosys_min     INTEGER,
  iosys_max     INTEGER,
  geo_min       INTEGER,
  geo_max       INTEGER,
  janpara_min   INTEGER,
  janpara_max   INTEGER,
  iosys_min_text  TEXT,
  iosys_max_text  TEXT,
  geo_min_text    TEXT,
  geo_max_text    TEXT,
  janpara_min_text TEXT,
  janpara_max_text TEXT
);

CREATE INDEX IF NOT EXISTS idx_galaxy_price_logs_model_id ON galaxy_price_logs(model_id);
CREATE INDEX IF NOT EXISTS idx_galaxy_price_logs_logged_at ON galaxy_price_logs(logged_at);

-- RLS（公開読み取りのみ）
ALTER TABLE galaxy_price_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON galaxy_price_logs;
CREATE POLICY "Allow public read" ON galaxy_price_logs FOR SELECT USING (true);

-- ④ shops テーブルに galaxy_url 追加
-- shops テーブルに galaxy_url カラムを追加
-- 各ショップの「中古Galaxy一覧」ページURL（トップ/デフォルトCTA・ショップ比較で使用）
ALTER TABLE shops ADD COLUMN IF NOT EXISTS galaxy_url TEXT;

-- 各ショップの中古Galaxy検索/一覧URLを設定（アフィリエイトリンクは運用側で差し替え）
-- イオシス（id=1）
UPDATE shops SET galaxy_url = 'https://iosys.co.jp/items/smartphone/galaxy' WHERE id = 1;
-- ゲオ（id=3）
UPDATE shops SET galaxy_url = 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy' WHERE id = 3;
-- じゃんぱら（id=6）
UPDATE shops SET galaxy_url = 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy&CHKOUTCOM=1' WHERE id = 6;

-- ⑤ product_shop_links に Galaxy行を投入
-- ============================================================
-- Galaxy Product Shop Links（product_type = 'galaxy'）
-- 各モデルのショップ検索URL。アフィリエイトは運用側で差し替え。
-- shop_id: 1=イオシス, 3=ゲオ, 6=じゃんぱら
-- ============================================================

INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 1, 1, 'https://iosys.co.jp/s?q=Galaxy%20S20%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 1, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S20%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 1, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S20%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 2, 1, 'https://iosys.co.jp/s?q=Galaxy%20S20%20Ultra%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 2, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S20%20Ultra%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 2, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S20%20Ultra%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 3, 1, 'https://iosys.co.jp/s?q=Galaxy%20S21%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 3, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S21%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 3, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S21%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 4, 1, 'https://iosys.co.jp/s?q=Galaxy%20S21%20Ultra%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 4, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S21%20Ultra%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 4, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S21%20Ultra%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 5, 1, 'https://iosys.co.jp/s?q=Galaxy%20S22');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 5, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S22');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 5, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S22&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 6, 1, 'https://iosys.co.jp/s?q=Galaxy%20S22%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 6, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S22%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 6, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S22%20Ultra&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 7, 1, 'https://iosys.co.jp/s?q=Galaxy%20S23');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 7, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S23');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 7, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S23&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 8, 1, 'https://iosys.co.jp/s?q=Galaxy%20S23%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 8, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S23%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 8, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S23%20Ultra&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 9, 1, 'https://iosys.co.jp/s?q=Galaxy%20S24');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 9, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S24');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 9, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S24&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 10, 1, 'https://iosys.co.jp/s?q=Galaxy%20S24%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 10, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S24%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 10, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S24%20Ultra&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 11, 1, 'https://iosys.co.jp/s?q=Galaxy%20S25');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 11, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S25');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 11, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S25&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 12, 1, 'https://iosys.co.jp/s?q=Galaxy%20S25%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 12, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20S25%20Ultra');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 12, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20S25%20Ultra&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 13, 1, 'https://iosys.co.jp/s?q=Galaxy%20A51%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 13, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20A51%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 13, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20A51%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 14, 1, 'https://iosys.co.jp/s?q=Galaxy%20A53%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 14, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20A53%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 14, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20A53%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 15, 1, 'https://iosys.co.jp/s?q=Galaxy%20A54%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 15, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20A54%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 15, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20A54%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 16, 1, 'https://iosys.co.jp/s?q=Galaxy%20A55%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 16, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20A55%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 16, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20A55%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 17, 1, 'https://iosys.co.jp/s?q=Galaxy%20A23%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 17, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20A23%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 17, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20A23%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 18, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Flip3%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 18, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Flip3%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 18, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Flip3%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 19, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Flip4');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 19, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Flip4');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 19, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Flip4&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 20, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Flip5');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 20, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Flip5');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 20, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Flip5&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 21, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Flip6');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 21, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Flip6');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 21, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Flip6&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 22, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Fold3%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 22, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Fold3%205G');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 22, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Fold3%205G&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 23, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Fold4');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 23, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Fold4');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 23, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Fold4&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 24, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Fold5');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 24, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Fold5');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 24, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Fold5&CHKOUTCOM=1');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 25, 1, 'https://iosys.co.jp/s?q=Galaxy%20Z%20Fold6');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 25, 3, 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy%20Z%20Fold6');
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES ('galaxy', 25, 6, 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy%20Z%20Fold6&CHKOUTCOM=1');
