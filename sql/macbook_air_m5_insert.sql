-- ============================================
-- MacBook Air 13インチ M5 / 15インチ M5 スペックデータ INSERT
-- Source: Apple MacBook Air 仕様ページ
-- ※ スペックページに記載のない項目は NULL
-- ============================================

-- 13インチ M5
INSERT INTO macbook_models (model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, external_display, point, advance, official)
VALUES
('MacBook Air 13インチ（M5）', 'MBA 13インチ M5', 'mba-13-m5', 1, NULL, NULL, '512GB ~ 4TB', 'スカイブルー / シルバー / スターライト / ミッドナイト', TRUE, 'M5', NULL, NULL, NULL, '16 / 24 / 32GB', '1.13 × 30.41 × 21.5cm', '1.23kg', 'Liquid Retina Display', '2,560 x 1,664', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 2', FALSE, FALSE, TRUE, '12MPセンターフレームカメラ', '4スピーカー', FALSE, FALSE, TRUE, '最大2台（最大6K 60Hz × 2 / 最大8K 60Hz × 1）', NULL, NULL, '¥184,800〜');

-- 15インチ M5
INSERT INTO macbook_models (model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, external_display, point, advance, official)
VALUES
('MacBook Air 15インチ（M5）', 'MBA 15インチ M5', 'mba-15-m5', 1, NULL, NULL, '512GB ~ 4TB', 'スカイブルー / シルバー / スターライト / ミッドナイト', TRUE, 'M5', NULL, NULL, NULL, '16 / 24 / 32GB', '1.15 × 34.04 × 23.76cm', '1.51kg', 'Liquid Retina Display', '2,880 x 1,864', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 2', FALSE, FALSE, TRUE, '12MPセンターフレームカメラ', '6スピーカー', FALSE, FALSE, TRUE, '最大2台（最大6K 60Hz × 2 / 最大8K 60Hz × 1）', NULL, NULL, '¥219,800〜');
