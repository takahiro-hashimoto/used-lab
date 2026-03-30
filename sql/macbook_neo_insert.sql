-- ============================================
-- MacBook Neo スペックデータ INSERT
-- Source: Apple MacBook Neo 仕様ページ
-- ※ スペックページに記載のない項目は NULL
-- ============================================

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, external_display, point, advance, official)
VALUES
((SELECT COALESCE(MAX(id), 0) + 1 FROM macbook_models), 'MacBook Neo 13インチ', 'Neo 13インチ A18 Pro', 'neo-13', 1, NULL, NULL, '256GB / 512GB', 'シルバー / ブラッシュ / シトラス / インディゴ', TRUE, 'A18 Pro', NULL, NULL, NULL, '8GB', '1.27 × 29.75 × 20.64cm', '1.23kg', 'Liquid Retina Display', '2,408 x 1,506', '500ニト', '最大11時間のweb閲覧', 'USB 3（USB-C）× 1 / USB 2（USB-C）× 1 / 3.5mmヘッドフォンジャック', FALSE, FALSE, FALSE, '1080p FaceTime HDカメラ', 'デュアルスピーカー', FALSE, NULL, NULL, '最大4K 60Hz 外部ディスプレイ1台', NULL, NULL, '¥99,800〜');
