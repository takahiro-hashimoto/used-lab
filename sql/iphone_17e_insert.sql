-- ============================================
-- iPhone 17e スペックデータ INSERT
-- Source: https://www.apple.com/jp/iphone-17e/specs/
-- ※ スペックページに記載のない項目は NULL
-- ============================================

INSERT INTO iphone_models (
  id,
  -- 基本情報
  model, slug, show, image, date, cpu, battery, point, official,
  -- ストレージ・色・RAM
  strage, color, ram,
  -- ディスプレイ・物理
  size, weight, display, resolution,
  -- カメラ
  in_camera, front_camera, image_sensor, video,
  -- 接続・その他
  port, certification, sim, audio, streaming,
  -- ベンチマーク
  score_single, score_multi, score_metal,
  antutu_cpu, antutu_gpu, antutu_mem, antutu_ux,
  -- 機能フラグ（boolean）
  apple_intelligence, photography_style, portrait_mode, action_mode,
  cinematic_mode, macro_mode, night_mode, apple_proraw, apple_prores,
  magsafe, dynamic_island, accident_detection, promotion, lidar,
  action_button, camera_control, centerframe,
  -- アクセサリ・価格・iOS
  accessory_case, accessory_film, price, last_ios
) VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM iphone_models),
  -- 基本情報
  'iPhone 17e',
  '17e',
  1,
  NULL,
  '2026/3/1', -- 発売日
  'A19',
  'ビデオ再生：最大26時間',
  NULL,       -- point：スペックページに記載なし
  NULL,       -- official：スペックページに記載なし

  -- ストレージ・色・RAM
  '256GB/512GB',
  'ブラック/ホワイト/ソフトピンク',
  NULL,       -- RAM：スペックページに記載なし

  -- ディスプレイ・物理
  '6.1インチ',
  '169g',
  'Super Retina XDR OLED',
  '2532 x 1170',

  -- カメラ
  '48MP Fusion（26mm、ƒ/1.6、光学式手ぶれ補正）、12MP 2倍望遠（52mm）',
  '12MP TrueDepth（ƒ/1.9、Focus Pixels AF）',
  NULL,       -- image_sensor：スペックページに記載なし
  '4Kドルビービジョン（24/25/30/60fps）、1080pスロー（120/240fps）、シネマティックビデオ手ぶれ補正',

  -- 接続・その他
  'USB-C（USB 2）',
  'IP68（水深6m/30分）',
  'デュアルeSIM（物理SIM非対応）',
  'AAC、MP3、Apple Lossless、FLAC、ドルビーアトモス、空間オーディオ',
  'AirPlay（最大4K HDR）',

  -- ベンチマーク（未計測）
  NULL, NULL, NULL,
  NULL, NULL, NULL, NULL,

  -- 機能フラグ（スペックページに記載あり → true、記載なし → NULL）
  true,   -- apple_intelligence（Apple Intelligence記載あり）
  true,   -- photography_style（フォトグラフスタイル記載あり）
  true,   -- portrait_mode（ポートレート記載あり）
  NULL,   -- action_mode（スペックページに記載なし）
  NULL,   -- cinematic_mode（スペックページに記載なし）
  NULL,   -- macro_mode（スペックページに記載なし）
  true,   -- night_mode（ナイトモード記載あり）
  NULL,   -- apple_proraw（スペックページに記載なし）
  NULL,   -- apple_prores（スペックページに記載なし）
  true,   -- magsafe（MagSafe最大15W記載あり）
  NULL,   -- dynamic_island（スペックページに記載なし）
  true,   -- accident_detection（衝突事故検出記載あり）
  NULL,   -- promotion（スペックページに記載なし）
  NULL,   -- lidar（スペックページに記載なし）
  true,   -- action_button（アクションボタン記載あり）
  NULL,   -- camera_control（スペックページに記載なし）
  NULL,   -- centerframe（スペックページに記載なし）

  -- アクセサリ・価格・iOS
  NULL,
  NULL,
  NULL,
  NULL  -- last_ios: NULL = 現行サポート中
);
