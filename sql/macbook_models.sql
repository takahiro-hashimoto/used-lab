-- ============================================================
-- MacBook Models テーブル作成 & データ投入
-- ============================================================

-- テーブル作成
CREATE TABLE IF NOT EXISTS macbook_models (
  id                INTEGER PRIMARY KEY,
  model             TEXT NOT NULL,
  shortname         TEXT,
  slug              TEXT NOT NULL UNIQUE,
  show              INTEGER NOT NULL DEFAULT 1,
  image             TEXT,
  date              TEXT,
  strage            TEXT,
  color             TEXT,
  apple_intelligence BOOLEAN NOT NULL DEFAULT FALSE,
  cpu               TEXT,
  score_single      INTEGER,
  score_multi       INTEGER,
  score_metal       INTEGER,
  ram               TEXT,
  size              TEXT,
  weight            TEXT,
  display           TEXT,
  resolution        TEXT,
  luminance         TEXT,
  battery           TEXT,
  port              TEXT,
  hdmi              BOOLEAN NOT NULL DEFAULT FALSE,
  slot              BOOLEAN NOT NULL DEFAULT FALSE,
  magsafe           BOOLEAN NOT NULL DEFAULT FALSE,
  camera            TEXT,
  speaker           TEXT,
  promotion         BOOLEAN NOT NULL DEFAULT FALSE,
  fan               BOOLEAN NOT NULL DEFAULT FALSE,
  center_frame      BOOLEAN NOT NULL DEFAULT FALSE,
  point             TEXT,
  advance           JSONB,
  official          TEXT,
  accessory_case    TEXT,
  accessory_film    TEXT
);

-- ============================================================
-- データ投入 (id: 1〜17, 連番)
-- ============================================================

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(1, 'MacBook Air 13インチ（2020）', 'MBA 13インチ M1', 'mba-13-2020', 1, 'mba-13-2020.jpg', '2020/11/17', '256GB ~ 2TB', 'ゴールド / スペースグレイ / シルバー', TRUE, 'M1', 2346, 8346, 33115, '8 / 16GB', '1.6 × 30.4 × 21.2cm', '1.2kg', 'Retina Display', '2,560 x 1,600', '400ニト', '最大15時間のweb閲覧', 'Thunderbolt3 × 2', FALSE, FALSE, FALSE, '720p FaceTime HDカメラ', 'ステレオスピーカー', FALSE, FALSE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111883');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(2, 'MacBook Air 13インチ（2022）', 'MBA 13インチ M2', 'mba-13-2022', 1, 'mba-13-2022.jpg', '2022/07/15', '256GB ~ 2TB', 'シルバー / スターライト / スペースグレイ / ミッドナイト', TRUE, 'M2', 2586, 9670, 42171, '8 / 16 / 24GB', '1.1 × 30.4 × 21.5cm', '1.2kg', 'Liquid Retina Display', '2,560 x 1,664', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt3 × 2', FALSE, FALSE, TRUE, '1080p FaceTime HDカメラ', '4スピーカー', FALSE, FALSE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111867');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(3, 'MacBook Air 15インチ（2023）', 'MBA 15インチ M2', 'mba-15-2023', 1, 'mba-15-2023.jpg', '2023/06/13', '256GB ~ 2TB', 'シルバー / スターライト / スペースグレイ / ミッドナイト', TRUE, 'M2', 2596, 9715, 46252, '8 / 16 / 24GB', '1.1 × 34.0 × 23.7cm', '1.5kg', 'Liquid Retina Display', '2,880 x 1,864', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt3 × 2', FALSE, FALSE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', FALSE, FALSE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111346');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(4, 'MacBook Air 13インチ（2024）', 'MBA 13インチ M3', 'mba-13-2024', 1, 'mba-13-2024.jpg', '2024/03/04', '256GB ~ 2TB', 'シルバー / スターライト / スペースグレイ / ミッドナイト', TRUE, 'M3', 3065, 11959, 47712, '8 / 16 / 24GB', '1.1 × 30.4 × 21.5cm', '1.2kg', 'Liquid Retina Display', '2,560 x 1,664', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 2', FALSE, FALSE, TRUE, '1080p FaceTime HDカメラ', '4スピーカー', FALSE, FALSE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/118551');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(5, 'MacBook Air 15インチ（2024）', 'MBA 15インチ M3', 'mba-15-2024', 1, 'mba-15-2024.jpg', '2024/03/04', '256GB ~ 2TB', 'シルバー / スターライト / スペースグレイ / ミッドナイト', TRUE, 'M3', 3067, 11988, 47085, '8 / 16 / 24GB', '1.1 × 34.0 × 23.7cm', '1.5kg', 'Liquid Retina Display', '2,880 x 1,864', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 2', FALSE, FALSE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', FALSE, FALSE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/118552');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(6, 'MacBook Air 13インチ（2025）', 'MBA 13インチ M4', 'mba-13-2025', 1, 'mba-13-2025.jpg', '2025/03/12', '256GB ~ 2TB', 'スカイブルー / シルバー / スターライト / ミッドナイト', TRUE, 'M4', 3687, 14677, 54642, '16 / 24 / 32GB', '1.1 × 30.4 × 21.5cm', '1.2kg', 'Liquid Retina Display', '2,560 x 1,664', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 2', FALSE, FALSE, TRUE, '1080p FaceTime HDカメラ', '4スピーカー', FALSE, FALSE, TRUE, NULL, NULL, 'https://support.apple.com/ja-jp/122209');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(7, 'MacBook Air 15インチ（2025）', 'MBA 15インチ M4', 'mba-15-2025', 1, 'mba-15-2025.jpg', '2024/03/12', '256GB ~ 2TB', 'スカイブルー / シルバー / スターライト / ミッドナイト', TRUE, 'M4', 3704, 14664, 54669, '16 / 24 / 32GB', '1.1 × 34.0 × 23.7cm', '1.5kg', 'Liquid Retina Display', '2,880 x 1,864', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 2', FALSE, FALSE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', FALSE, FALSE, TRUE, NULL, NULL, 'https://support.apple.com/ja-jp/122210');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(8, 'MacBook Pro 13インチ（2020）', 'MBP 13インチ M1', 'mbp-13-2020', 1, 'mbp-13-2020.jpg', '2020/11/17', '256GB ~ 2TB', 'シルバー / スペースグレイ', TRUE, 'M1', 2321, 8177, 33045, '8 / 16GB', '1.5 × 30.4 × 21.2cm', '1.4 kg', 'Retina Display', '2,560 x 1,600', '500ニト', '最大17時間のweb閲覧', 'Thunderbolt4 × 2', TRUE, FALSE, FALSE, '720p FaceTime HDカメラ', 'ステレオスピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111893');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(9, 'MacBook Pro 14インチ（2021）', 'MBP 14インチ M1Pro', 'mbp-14-2021', 1, 'mbp-14-2021.jpg', '2021/10/26', '512GB ~ 8TB', 'シルバー / スペースグレイ', TRUE, 'M1 Pro / M1 Max', 2360, 10312, 63731, '16 / 32 / 64GB', '1.5 × 31.2 × 22.1cm', '1.6kg', 'Liquid Retina XDR Display', '3,024 x 1,964', '500ニト', '最大17時間のweb閲覧', 'Thunderbolt4 × 3', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111902');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(10, 'MacBook Pro 16インチ（2021）', 'MBP 16インチ M1Pro', 'mbp-16-2021', 1, 'mbp-16-2021.jpg', '2021/10/26', '512GB ~ 8TB', 'シルバー / スペースグレイ', TRUE, 'M1 Pro / M1 Max', 2373, 12238, 67992, '16 / 32 / 64GB', '1.6 × 35.5 × 24.8cm', '2.1kg', 'Liquid Retina XDR Display', '3,456 x 2,234', '500ニト', '最大14時間のweb閲覧', 'Thunderbolt4 × 3', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111901');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(11, 'MacBook Pro 13インチ（2022）', 'MBP 13インチ M2', 'mbp-13-2022', 1, 'mbp-13-2022.jpg', '2022/06/24', '256GB ~ 2TB', 'シルバー / スペースグレイ', TRUE, 'M2', 2600, 9651, 46309, '8 / 16 / 24GB', '1.5 × 30.4 × 21.2cm', '1.4kg', 'Retina Display', '2,560 x 1,600', '500ニト', '最大17時間のweb閲覧', 'Thunderbolt4 × 3', TRUE, FALSE, TRUE, '720p FaceTime HDカメラ', 'ステレオスピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111869');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(12, 'MacBook Pro 14インチ（2023）', 'MBP 14インチ M2Pro', 'mbp-14-2023', 1, 'mbp-14-2023.jpg', '2023/02/03', '512GB ~ 8TB', 'シルバー / スペースグレイ', TRUE, 'M2 Pro / M2 Max', 2641, 14336, 83153, '16 / 32 / 64 / 96GB', '1.5 × 31.2 × 22.1cm', '1.6kg', 'Liquid Retina XDR Display', '3,024 x 1,964', '500ニト', '最大12時間のweb閲覧', 'Thunderbolt4 × 3', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111340');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(13, 'MacBook Pro 16インチ（2023）', 'MBP 16インチ M2Pro', 'mbp-16-2023', 1, 'mbp-16-2023.jpg', '2023/02/03', '512GB ~ 8TB', 'シルバー / スペースグレイ', TRUE, 'M2 Pro / M2 Max', 2656, 14439, 83139, '16 / 32 / 64 / 96GB', '1.6 × 35.5 × 24.8cm', '1.6kg', 'Liquid Retina XDR Display', '3,456 x 2,234', '500ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 3', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/111838');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(14, 'MacBook Pro 14インチ（2023）', 'MBP 14インチ M3', 'mbp-14-2023-nov', 1, 'mbp-14-2023-nov.jpg', '2023/11/07', '512GB ~ 8TB', 'シルバー / スペースグレイ(M3) / スペースブラック(M3 Pro・Max)', TRUE, 'M3', 3089, 14031, 69542, '8 / 16 / 24GB', '1.5 × 31.2 × 22.1cm', '1.5kg', 'Liquid Retina XDR Display', '3,024 x 1,964', '1,000ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 3', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/117735');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(15, 'MacBook Pro 16インチ（2023）', 'MBP 16インチ M3Pro', 'mbp-16-2023-nov', 1, 'mbp-16-2023-nov.jpg', '2023/11/07', '512GB ~ 8TB', 'シルバー / スペースブラック(M3 Pro・Ma)', TRUE, 'M3 Pro / M3 Max', 3104, 15246, 79387, '16 / 32 / 64 / 96GB', '1.68 × 35.5 × 24.8cm', '2.1kg', 'Liquid Retina XDR Display', '3,456 x 2,234', '1,000ニト', '最大15時間のweb閲覧', 'Thunderbolt4 × 3', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, FALSE, NULL, NULL, 'https://support.apple.com/ja-jp/117737');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(16, 'MacBook Pro 14インチ（2024）', 'MBP 14インチ M4', 'mbp-14-2024-nov', 1, 'mbp-14-2024-nov.jpg', '2024/11/08', '512GB ~ 8TB', 'シルバー / スペースブラック', TRUE, 'M4 / M4 Pro / M4 Max', 3846, 22374, 112129, '16 / 24 / 32 / 36 / 48 / 64 / 128GB', '1.5 × 31.2 × 22.1cm', '1.5kg', 'Liquid Retina XDR Display', '3,024 x 1,964', '1,000ニト', '最大16時間のweb閲覧', 'Thunderbolt4 x 3（M4）/Thunderbolt5 x 3（M4 Pro・Max）', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, TRUE, NULL, NULL, 'https://support.apple.com/ja-jp/121552');

INSERT INTO macbook_models (id, model, shortname, slug, show, image, date, strage, color, apple_intelligence, cpu, score_single, score_multi, score_metal, ram, size, weight, display, resolution, luminance, battery, port, hdmi, slot, magsafe, camera, speaker, promotion, fan, center_frame, point, advance, official)
VALUES
(17, 'MacBook Pro 16インチ（2024）', 'MBP 16インチ M4Pro', 'mbp-16-2024-nov', 1, 'mbp-16-2024-nov.jpg', '2024/11/08', '512GB ~ 8TB', 'シルバー / スペースブラック', TRUE, 'M4 Pro / M4 Max', 3874, 22448, 112311, '24 36 / 48 / 64 / 128GB', '1.68 × 35.5 × 24.8cm', '2.1kg', 'Liquid Retina XDR Display', '3,456 x 2,234', '1,000ニト', '最大13時間のweb閲覧', 'Thunderbolt5 x 3', TRUE, TRUE, TRUE, '1080p FaceTime HDカメラ', '6スピーカー', TRUE, TRUE, TRUE, NULL, NULL, 'https://support.apple.com/ja-jp/121553');
