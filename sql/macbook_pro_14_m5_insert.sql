-- ============================================
-- MacBook Pro 14インチ M5 スペックデータ INSERT
-- Source: Apple MacBook Pro 14インチ 仕様ページ
-- ※ スペックページに記載のない項目は NULL
-- ============================================

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, external_display, point, advance, official)
VALUES
((SELECT COALESCE(MAX(id), 0) + 1 FROM macbook_models), 'MacBook Pro 14インチ（M5）', 'MBP 14インチ M5', 'mbp-14-m5', 1, NULL, NULL, '1TB ~ 8TB', 'スペースブラック / シルバー', TRUE, 'M5 / M5 Pro / M5 Max', NULL, NULL, NULL, '16 / 24 / 32 / 36 / 48 / 64 / 128GB', '1.55 × 31.26 × 22.12cm', '1.55kg', 'Liquid Retina XDR Display', '3,024 x 1,964', '1,000ニト', '最大16時間のweb閲覧', 'Thunderbolt4 × 3（M5）/ Thunderbolt5 × 3（M5 Pro・Max）', TRUE, TRUE, TRUE, '12MPセンターフレームカメラ', '6スピーカー', TRUE, TRUE, TRUE, '最大2台（M5）/ 最大3台（M5 Pro）/ 最大4台（M5 Max）', NULL, NULL, '¥279,800〜');
