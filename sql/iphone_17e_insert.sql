-- ============================================
-- iPhone 17e スペックデータ INSERT
-- Source: https://www.apple.com/jp/iphone-17e/specs/
-- ============================================

INSERT INTO iphone_models (
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
  -- ベンチマーク（未計測のため NULL）
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
  -- 基本情報
  'iPhone 17e',
  '17e',
  1,
  NULL,
  '2026/3',
  'A19',
  'ビデオ再生：最大26時間',
  '48MP Fusionカメラ・A19チップ・Apple Intelligence対応・MagSafe・アクションボタン搭載のスタンダードモデル',
  NULL,

  -- ストレージ・色・RAM
  '256GB/512GB',
  'ブラック/ホワイト/ソフトピンク',
  NULL,

  -- ディスプレイ・物理
  '6.1インチ',
  '169g',
  'Super Retina XDR OLED',
  '2532 x 1170',

  -- カメラ
  '48MP Fusion（26mm、ƒ/1.6、光学式手ぶれ補正）、12MP 2倍望遠（52mm）',
  '12MP TrueDepth（ƒ/1.9、Focus Pixels AF）',
  NULL,
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

  -- 機能フラグ
  true,   -- apple_intelligence
  true,   -- photography_style（フォトグラフスタイル）
  true,   -- portrait_mode（ポートレート）
  false,  -- action_mode（アクションモード ※記載なし）
  false,  -- cinematic_mode（シネマティック ※記載なし）
  false,  -- macro_mode（マクロ ※記載なし）
  true,   -- night_mode（ナイトモード）
  false,  -- apple_proraw（ProRAW ※記載なし）
  false,  -- apple_prores（ProRes ※記載なし）
  true,   -- magsafe（最大15W）
  false,  -- dynamic_island（※記載なし）
  true,   -- accident_detection（衝突事故検出）
  false,  -- promotion（ProMotion ※記載なし）
  false,  -- lidar（LiDAR ※記載なし）
  true,   -- action_button（アクションボタン）
  false,  -- camera_control（カメラコントロール ※記載なし）
  false,  -- centerframe（センターフレーム ※記載なし）

  -- アクセサリ・価格・iOS
  NULL,
  NULL,
  NULL,
  NULL  -- last_ios: NULL = 現行サポート中
);
