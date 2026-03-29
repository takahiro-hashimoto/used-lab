-- ============================================
-- MacBook Neo スペックデータ INSERT
-- Source: Apple MacBook Neo 仕様ページ
-- ※ スペックページに記載のない項目は NULL
-- ============================================

-- モデル1: 256GB / Touch ID非対応 (¥99,800)
INSERT INTO macbook_models (
  model, slug, shortname, show, image, date, cpu, battery, point, official, advance,
  strage, color, ram,
  size, weight, display, resolution, luminance,
  port, camera, speaker, external_display,
  score_single, score_multi, score_metal, benchmarks,
  apple_intelligence, hdmi, slot, magsafe, promotion, fan, center_frame,
  accessory_case, accessory_film, last_macos
) VALUES (
  'MacBook Neo 13インチ',
  'neo-13-256',
  'Neo 13" 256GB',
  1,
  NULL,
  NULL,       -- 発売日：スペックページに記載なし
  'Apple A18 Pro',
  'ビデオストリーミング：最大16時間 / ワイヤレスインターネット：最大11時間 / 36.5Whリチウムイオン',
  NULL,       -- point：スペックページに記載なし
  '¥99,800',
  NULL,       -- advance：スペックページに記載なし

  -- ストレージ・色・RAM
  '256GB',
  'シルバー/ブラッシュ/シトラス/インディゴ',
  '8GB',

  -- ディスプレイ・物理
  '13.0インチ',
  '1.23kg',
  'Liquid Retina（IPSテクノロジー搭載LEDバックライト）',
  '2408 x 1506（219ppi）',
  '500ニト',

  -- ポート・カメラ・スピーカー・外部ディスプレイ
  'USB 3（USB-C）×1、USB 2（USB-C）×1、3.5mmヘッドフォンジャック',
  '1080p FaceTime HDカメラ',
  'デュアルスピーカー（ドルビーアトモス空間オーディオ対応）',
  '最大4K 60Hz 外部ディスプレイ1台',

  -- ベンチマーク（未計測）
  NULL, NULL, NULL, NULL,

  -- 機能フラグ
  true,   -- apple_intelligence（Apple Intelligence記載あり）
  false,  -- hdmi（記載なし、USB-Cポートのみ）
  false,  -- slot（SDカードスロット記載なし）
  false,  -- magsafe（MagSafe記載なし、USB-C充電）
  false,  -- promotion（ProMotion記載なし）
  NULL,   -- fan（スペックページに記載なし）
  NULL,   -- center_frame（スペックページに記載なし）

  -- アクセサリ・最終macOS
  NULL,
  NULL,
  NULL    -- last_macos: NULL = 現行サポート中
);

-- モデル2: 512GB / Touch ID対応 (¥114,800)
INSERT INTO macbook_models (
  model, slug, shortname, show, image, date, cpu, battery, point, official, advance,
  strage, color, ram,
  size, weight, display, resolution, luminance,
  port, camera, speaker, external_display,
  score_single, score_multi, score_metal, benchmarks,
  apple_intelligence, hdmi, slot, magsafe, promotion, fan, center_frame,
  accessory_case, accessory_film, last_macos
) VALUES (
  'MacBook Neo 13インチ',
  'neo-13-512',
  'Neo 13" 512GB',
  1,
  NULL,
  NULL,       -- 発売日：スペックページに記載なし
  'Apple A18 Pro',
  'ビデオストリーミング：最大16時間 / ワイヤレスインターネット：最大11時間 / 36.5Whリチウムイオン',
  NULL,       -- point：スペックページに記載なし
  '¥114,800',
  NULL,       -- advance：スペックページに記載なし

  -- ストレージ・色・RAM
  '512GB',
  'シルバー/ブラッシュ/シトラス/インディゴ',
  '8GB',

  -- ディスプレイ・物理
  '13.0インチ',
  '1.23kg',
  'Liquid Retina（IPSテクノロジー搭載LEDバックライト）',
  '2408 x 1506（219ppi）',
  '500ニト',

  -- ポート・カメラ・スピーカー・外部ディスプレイ
  'USB 3（USB-C）×1、USB 2（USB-C）×1、3.5mmヘッドフォンジャック',
  '1080p FaceTime HDカメラ',
  'デュアルスピーカー（ドルビーアトモス空間オーディオ対応）',
  '最大4K 60Hz 外部ディスプレイ1台',

  -- ベンチマーク（未計測）
  NULL, NULL, NULL, NULL,

  -- 機能フラグ
  true,   -- apple_intelligence（Apple Intelligence記載あり）
  false,  -- hdmi（記載なし、USB-Cポートのみ）
  false,  -- slot（SDカードスロット記載なし）
  false,  -- magsafe（MagSafe記載なし、USB-C充電）
  false,  -- promotion（ProMotion記載なし）
  NULL,   -- fan（スペックページに記載なし）
  NULL,   -- center_frame（スペックページに記載なし）

  -- アクセサリ・最終macOS
  NULL,
  NULL,
  NULL    -- last_macos: NULL = 現行サポート中
);
