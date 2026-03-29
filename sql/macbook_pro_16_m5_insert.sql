-- ============================================
-- MacBook Pro 16インチ M5 スペックデータ INSERT
-- Source: Apple MacBook Pro 16インチ 仕様ページ
-- ※ スペックページに記載のない項目は NULL
-- ============================================

INSERT INTO macbook_models (model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, external_display, point, advance, official)
VALUES
('MacBook Pro 16インチ（M5）', 'MBP 16インチ M5Pro', 'mbp-16-m5', 1, NULL, NULL, '1TB ~ 8TB', 'スペースブラック / シルバー', TRUE, 'M5 Pro / M5 Max', NULL, NULL, NULL, '24 / 36 / 48 / 64 / 128GB', '1.68 × 35.57 × 24.81cm', '2.14kg', 'Liquid Retina XDR Display', '3,456 x 2,234', '1,000ニト', '最大17時間のweb閲覧', 'Thunderbolt5 × 3', TRUE, TRUE, TRUE, '12MPセンターフレームカメラ', '6スピーカー', TRUE, TRUE, TRUE, '最大3台（M5 Pro）/ 最大4台（M5 Max）', NULL, NULL, '¥449,800〜');
