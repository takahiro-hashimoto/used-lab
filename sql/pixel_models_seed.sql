-- ============================================================
-- Pixel Models シードデータ（id: 1〜13）
-- 出典: GSMArena / Google Store / ITmedia / Geekbench Browser / AnTuTu 等
-- ※ ベンチマーク値は集計元によりばらつくため代表値。運用側で調整可。
-- ※ image は専用画像未用意のため NULL（プレースホルダ表示）。
-- ※ update_years はセキュリティ更新の保証年数（6/7世代=5年, 8/9世代=7年）。
--    OSメジャー更新は6/7世代が3年と短い点は本文で補足する。
-- ============================================================

INSERT INTO pixel_models
  (id, model, slug, show, image, date, cpu, battery, point, advance, official,
   strage, color, tensor_gen,
   score_single, score_multi, antutu_total, antutu_cpu, antutu_gpu, antutu_mem, antutu_ux,
   ram, size, weight, display, resolution, refresh_rate, port, water_resistance, felica, sim,
   battery_life, battery_life_saver, wired_charging, wireless_charging, reverse_charging,
   main_camera, ultrawide_camera, tele_camera, front_camera, optical_zoom,
   magic_eraser, best_take, magic_editor, night_sight, real_tone, face_unlock, temp_sensor, video_boost,
   accessory_case, accessory_film, price, update_years, support_until, last_android)
VALUES
-- 1. Pixel 6
(1, 'Google Pixel 6', 'pixel-6', 1, NULL, '2021/10/28', 'Google Tensor', '4614mAh',
 '初代Tensor搭載。消しゴムマジック等のAI機能をこの価格帯で使える出発点。', NULL, 'https://store.google.com/jp/product/pixel_6',
 '128GB / 256GB', 'Stormy Black / Sorta Seafoam / Kinda Coral', 'G1',
 1030, 2890, 720000, NULL, NULL, NULL, NULL,
 '8GB', '158.6 × 74.8 × 8.9mm', '207g', '6.4インチ OLED', '2,400 x 1,080', '90Hz', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大48時間', '21W', '21W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '12MP (超広角)', NULL, '8MP', NULL,
 TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE,
 NULL, NULL, NULL, 5, '2026-10', NULL),

-- 2. Pixel 6 Pro
(2, 'Google Pixel 6 Pro', 'pixel-6-pro', 1, NULL, '2021/10/28', 'Google Tensor', '5003mAh',
 '光学4倍望遠とLTPO 120Hzを備えた初代Proの完成形。', NULL, 'https://store.google.com/jp/product/pixel_6_pro',
 '128GB / 256GB / 512GB', 'Stormy Black / Cloudy White / Sorta Sunny', 'G1',
 1040, 2950, 725000, NULL, NULL, NULL, NULL,
 '12GB', '163.9 × 75.9 × 8.9mm', '210g', '6.7インチ LTPO OLED', '3,120 x 1,440', '120Hz (LTPO)', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大48時間', '23W', '23W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '12MP (超広角)', '48MP (望遠)', '11.1MP', '4倍',
 TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE,
 NULL, NULL, NULL, 5, '2026-10', NULL),

-- 3. Pixel 6a
(3, 'Google Pixel 6a', 'pixel-6a', 1, NULL, '2022/7/28', 'Google Tensor', '4410mAh',
 '初代Tensorを継承しつつ約5.4万円から狙えるコスパ機。', NULL, 'https://store.google.com/jp/product/pixel_6a',
 '128GB', 'Charcoal / Chalk / Sage', 'G1',
 1020, 2850, 700000, NULL, NULL, NULL, NULL,
 '6GB', '152.2 × 71.8 × 8.9mm', '178g', '6.1インチ OLED', '2,400 x 1,080', '60Hz', 'USB-C', 'IP67', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大48時間', '18W', '非対応', FALSE,
 '12.2MP (広角)', '12MP (超広角)', NULL, '8MP', NULL,
 TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE,
 NULL, NULL, NULL, 5, '2027-07', NULL),

-- 4. Pixel 7
(4, 'Google Pixel 7', 'pixel-7', 1, NULL, '2022/10/13', 'Google Tensor G2', '4355mAh',
 'Tensor G2で顔認証が復活。無印のバランス型モデル。', NULL, 'https://store.google.com/jp/product/pixel_7',
 '128GB / 256GB', 'Obsidian / Snow / Lemongrass', 'G2',
 1380, 3350, 830000, NULL, NULL, NULL, NULL,
 '8GB', '155.6 × 73.2 × 8.7mm', '197g', '6.3インチ OLED', '2,400 x 1,080', '90Hz', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大72時間', '20W', '20W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '12MP (超広角)', NULL, '10.8MP', NULL,
 TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE,
 NULL, NULL, NULL, 5, '2027-10', NULL),

-- 5. Pixel 7 Pro
(5, 'Google Pixel 7 Pro', 'pixel-7-pro', 1, NULL, '2022/10/13', 'Google Tensor G2', '5000mAh',
 '光学5倍ペリスコープ望遠を搭載したカメラ重視のフラッグシップ。', NULL, 'https://store.google.com/jp/product/pixel_7_pro',
 '128GB / 256GB / 512GB', 'Obsidian / Snow / Hazel', 'G2',
 1430, 3450, 900000, NULL, NULL, NULL, NULL,
 '12GB', '162.9 × 76.6 × 8.9mm', '212g', '6.7インチ LTPO OLED', '3,120 x 1,440', '120Hz (LTPO)', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大72時間', '23W', '23W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '12MP (超広角)', '48MP (望遠)', '10.8MP', '5倍',
 TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE,
 NULL, NULL, NULL, 5, '2027-10', NULL),

-- 6. Pixel 7a
(6, 'Google Pixel 7a', 'pixel-7a', 1, NULL, '2023/5/11', 'Google Tensor G2', '4385mAh',
 'ワイヤレス充電と90Hzを備え、無印に迫るaシリーズの完成度。', NULL, 'https://store.google.com/jp/product/pixel_7a',
 '128GB', 'Charcoal / Snow / Sea / Coral', 'G2',
 1380, 3300, 800000, NULL, NULL, NULL, NULL,
 '8GB', '152.0 × 72.9 × 9.0mm', '194g', '6.1インチ OLED', '2,400 x 1,080', '90Hz', 'USB-C', 'IP67', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大72時間', '18W', '7.5W (Qi)', FALSE,
 '64MP (広角)', '13MP (超広角)', NULL, '13MP', NULL,
 TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE,
 NULL, NULL, NULL, 5, '2028-05', NULL),

-- 7. Pixel 8
(7, 'Google Pixel 8', 'pixel-8', 1, NULL, '2023/10/12', 'Google Tensor G3', '4575mAh',
 '7年サポートとベストテイク・編集マジックに対応した節目のモデル。', NULL, 'https://store.google.com/jp/product/pixel_8',
 '128GB / 256GB', 'Obsidian / Hazel / Rose', 'G3',
 1600, 4050, 1017000, NULL, NULL, NULL, NULL,
 '8GB', '150.5 × 70.8 × 8.9mm', '187g', '6.2インチ OLED', '2,400 x 1,080', '120Hz', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大72時間', '27W', '18W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '12MP (超広角)', NULL, '10.5MP', NULL,
 TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE,
 NULL, NULL, NULL, 7, '2030-10', NULL),

-- 8. Pixel 8 Pro
(8, 'Google Pixel 8 Pro', 'pixel-8-pro', 1, NULL, '2023/10/12', 'Google Tensor G3', '5050mAh',
 '温度センサーと動画ブーストを搭載した全部入りのフラッグシップ。', NULL, 'https://store.google.com/jp/product/pixel_8_pro',
 '128GB / 256GB / 512GB / 1TB', 'Obsidian / Porcelain / Bay', 'G3',
 1720, 4400, 1136000, NULL, NULL, NULL, NULL,
 '12GB', '162.6 × 76.5 × 8.8mm', '213g', '6.7インチ LTPO OLED', '2,992 x 1,344', '120Hz (LTPO)', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大72時間', '30W', '23W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '48MP (超広角)', '48MP (望遠)', '10.5MP', '5倍',
 TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
 NULL, NULL, NULL, 7, '2030-10', NULL),

-- 9. Pixel 8a
(9, 'Google Pixel 8a', 'pixel-8a', 1, NULL, '2024/5/14', 'Google Tensor G3', '4492mAh',
 '7年サポートと主要AI機能をコスパ良く使える人気のミドル機。', NULL, 'https://store.google.com/jp/product/pixel_8a',
 '128GB / 256GB', 'Obsidian / Porcelain / Bay / Aloe', 'G3',
 1500, 3600, 876000, NULL, NULL, NULL, NULL,
 '8GB', '152.1 × 72.7 × 8.9mm', '188g', '6.1インチ OLED', '2,400 x 1,080', '120Hz', 'USB-C', 'IP67', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大72時間', '18W', '7.5W (Qi)', FALSE,
 '64MP (広角)', '13MP (超広角)', NULL, '13MP', NULL,
 TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE,
 NULL, NULL, NULL, 7, '2031-05', NULL),

-- 10. Pixel 9
(10, 'Google Pixel 9', 'pixel-9', 1, NULL, '2024/8/22', 'Google Tensor G4', '4700mAh',
 'Tensor G4と16GB級の余裕。Gemini世代AIを無印で楽しめる。', NULL, 'https://store.google.com/jp/product/pixel_9',
 '128GB / 256GB', 'Obsidian / Porcelain / Wintergreen / Peony', 'G4',
 1700, 4400, 1010000, NULL, NULL, NULL, NULL,
 '12GB', '152.8 × 72.0 × 8.5mm', '198g', '6.3インチ OLED', '2,424 x 1,080', '120Hz', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大100時間', '27W', '15W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '48MP (超広角)', NULL, '10.5MP', NULL,
 TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE,
 NULL, NULL, NULL, 7, '2031-08', NULL),

-- 11. Pixel 9 Pro
(11, 'Google Pixel 9 Pro', 'pixel-9-pro', 1, NULL, '2024/9/4', 'Google Tensor G4', '4700mAh',
 '6.3インチのコンパクトProに望遠・温度センサー・42MP自撮りを凝縮。', NULL, 'https://store.google.com/jp/product/pixel_9_pro',
 '128GB / 256GB / 512GB / 1TB', 'Obsidian / Porcelain / Hazel / Rose Quartz', 'G4',
 1900, 4350, 1030000, NULL, NULL, NULL, NULL,
 '16GB', '152.8 × 72.0 × 8.5mm', '199g', '6.3インチ LTPO OLED', '2,856 x 1,280', '120Hz (LTPO)', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大100時間', '27W', '21W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '48MP (超広角)', '48MP (望遠)', '42MP', '5倍',
 TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
 NULL, NULL, NULL, 7, '2031-09', NULL),

-- 12. Pixel 9 Pro XL
(12, 'Google Pixel 9 Pro XL', 'pixel-9-pro-xl', 1, NULL, '2024/8/22', 'Google Tensor G4', '5060mAh',
 '6.8インチ大画面と37W急速充電を備えた最上位モデル。', NULL, 'https://store.google.com/jp/product/pixel_9_pro_xl',
 '128GB / 256GB / 512GB / 1TB', 'Obsidian / Porcelain / Hazel / Rose Quartz', 'G4',
 1900, 4300, 1020000, NULL, NULL, NULL, NULL,
 '16GB', '162.8 × 76.6 × 8.5mm', '221g', '6.8インチ LTPO OLED', '2,992 x 1,344', '120Hz (LTPO)', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大100時間', '37W', '23W (Pixel Stand) / Qi 12W', TRUE,
 '50MP (広角)', '48MP (超広角)', '48MP (望遠)', '42MP', '5倍',
 TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
 NULL, NULL, NULL, 7, '2031-08', NULL),

-- 13. Pixel 9a
(13, 'Google Pixel 9a', 'pixel-9a', 1, NULL, '2025/4/16', 'Google Tensor G4', '5100mAh',
 'シリーズ最大級5100mAhと7年サポートを約8万円で。最新aシリーズ。', NULL, 'https://store.google.com/jp/product/pixel_9a',
 '128GB / 256GB', 'Obsidian / Porcelain / Iris / Peony', 'G4',
 1530, 3800, 1050000, NULL, NULL, NULL, NULL,
 '8GB', '154.7 × 73.3 × 8.9mm', '186g', '6.3インチ OLED', '2,424 x 1,080', '120Hz', 'USB-C', 'IP68', TRUE, 'nanoSIM / eSIM',
 '24時間以上', '最大100時間', '23W', '7.5W (Qi)', FALSE,
 '48MP (広角)', '13MP (超広角)', NULL, '13MP', NULL,
 TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE,
 NULL, NULL, NULL, 7, '2032-04', NULL);
