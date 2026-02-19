-- ============================================================
-- AirPods Models テーブル作成 & データ投入
-- ============================================================

-- テーブル作成
CREATE TABLE IF NOT EXISTS airpods_models (
  id                INTEGER PRIMARY KEY,
  name              TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  model             TEXT,
  show              INTEGER NOT NULL DEFAULT 1,
  image             TEXT,
  date              TEXT,
  type              TEXT,
  chip              TEXT,
  battery_earphone  TEXT,
  battery_case      TEXT,
  port              TEXT,
  fit               TEXT,
  control           TEXT,
  spatial_audio     BOOLEAN NOT NULL DEFAULT FALSE,
  magsafe           BOOLEAN NOT NULL DEFAULT FALSE,
  qi_charge         BOOLEAN NOT NULL DEFAULT FALSE,
  waterproof        TEXT,
  anc               BOOLEAN NOT NULL DEFAULT FALSE,
  adaptive_audio    BOOLEAN NOT NULL DEFAULT FALSE,
  point             TEXT,
  official          TEXT
);

-- ============================================================
-- データ投入 (id: 1〜13, 連番)
-- ============================================================

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(1, 'AirPods', 'mmef2ja', 'MMEF2J/A', 1, 'mmef2j:a.jpg', '2016/12/16', 'インナーイヤー型', 'W1チップ', '5時間', '24時間', 'Lightning', 'デュアル光学センサー', 'ダブルタップ', FALSE, FALSE, FALSE, NULL, FALSE, FALSE, NULL, 'https://support.apple.com/ja-jp/111855');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(2, 'AirPods 2', 'mv7n2ja', 'MV7N2J/A', 1, 'mv7n2j:a.jpg', '2019/03/29', 'インナーイヤー型', 'H1チップ', '5時間', '24時間', 'Lightning', 'デュアル光学センサー', '感圧センサー', FALSE, FALSE, FALSE, NULL, FALSE, FALSE, NULL, 'https://support.apple.com/ja-jp/111856');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(3, 'AirPods 2', 'mrxj2ja', 'MRXJ2J/A', 1, 'mrxj2j:a.jpg', '2019/03/29', 'インナーイヤー型', 'H1チップ', '5時間', '24時間', 'Lightning', 'デュアル光学センサー', '感圧センサー', FALSE, FALSE, TRUE, NULL, FALSE, FALSE, NULL, 'https://support.apple.com/ja-jp/111856');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(4, 'AirPods 3', 'mme73ja', 'MME73J/A', 1, 'mme73j:a.jpg', '2021/10/26', 'インナーイヤー型', 'H1チップ', '6時間', '30時間', 'Lightning', '肌検出センサー', '感圧センサー', FALSE, TRUE, TRUE, NULL, FALSE, FALSE, NULL, 'https://support.apple.com/ja-jp/111863');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(5, 'AirPods 3', 'mpny3ja', 'MPNY3J/A', 1, 'mpny3j:a.jpg', '2022/09/08', 'インナーイヤー型', 'H1チップ', '6時間', '30時間', 'Lightning', '肌検出センサー', '感圧センサー', FALSE, FALSE, TRUE, NULL, FALSE, FALSE, 'H1チップ搭載、空間オーディオ対応で音に包まれるような体験ができるリーズナブルなモデル', 'https://support.apple.com/ja-jp/111863');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(6, 'AirPods 4', 'mxp63ja', 'MXP63J/A', 1, 'mxp63j:a.jpg', '2024/09/20', 'インナーイヤー型', 'H2チップ', '5時間', '30時間', 'USB-C', '光学式インイヤーセンサー', '感圧センサー', TRUE, FALSE, TRUE, 'IP54', FALSE, TRUE, NULL, 'https://support.apple.com/ja-jp/121203');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(7, 'AirPods 4', 'mxp93ja', 'MXP93J/A', 1, 'mxp93j:a.jpg', '2024/09/20', 'インナーイヤー型', 'H2チップ', '5時間', '30時間', 'USB-C', '光学式インイヤーセンサー', '感圧センサー', TRUE, TRUE, TRUE, 'IP54', TRUE, TRUE, NULL, 'https://support.apple.com/ja-jp/121204');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(8, 'AirPods Pro', 'mwp22ja', 'MWP22J/A', 1, 'mwp22j:a.jpg', '2019/10/30', 'カナル型', 'H1チップ', '4時間', '24時間', 'Lightning', 'デュアル光学センサー', '感圧センサー', FALSE, FALSE, TRUE, 'IPX4', TRUE, FALSE, NULL, 'https://support.apple.com/ja-jp/111861');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(9, 'AirPods Pro', 'mlwk3ja', 'MLWK3J/A', 1, 'mlwk3j:a.jpg', '2021/10/19', 'カナル型', 'H1チップ', '4時間', '24時間', 'Lightning', 'デュアル光学センサー', '感圧センサー', FALSE, TRUE, TRUE, 'IPX4', TRUE, FALSE, 'H1チップ搭載でアクティブノイズキャンセリング機能を搭載した完全ワイヤレスイヤホン', 'https://support.apple.com/ja-jp/111859');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(10, 'AirPods Pro 2', 'mqd83ja', 'MQD83J/A', 1, 'mqd83j:a.jpg', '2022/09/23', 'カナル型', 'H2チップ', '6時間', '30時間', 'Lightning', '肌検出センサー', 'タッチコントロール', TRUE, TRUE, TRUE, 'IP54', TRUE, TRUE, NULL, 'https://support.apple.com/ja-jp/111851');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(11, 'AirPods Pro 2', 'mtjv3ja', 'MTJV3J/A', 1, 'mtjv3j:a.jpg', '2023/09/22', 'カナル型', 'H2チップ', '6時間', '30時間', 'USB-C', '肌検出センサー', '感圧センサー', TRUE, TRUE, TRUE, 'IP54', TRUE, TRUE, 'H2チップ搭載でANC強化＆USB‑C/MagSafe充電できる高音質・高機能なイヤホン', 'https://support.apple.com/ja-jp/111834');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(12, 'AirPods Max', 'max-2020', 'MGY〇3J/A', 1, 'max-2020.jpg', '2020/12/18', 'ヘッドホン', 'H1チップ', '20時間', 'なし', 'Lightning', NULL, 'Digital Crown / ノイズコントロールボタン', TRUE, FALSE, FALSE, NULL, TRUE, TRUE, 'H1チップ搭載、プロレベルのアクティブノイキャンや外音取り込みを実現しているハイエンドヘッドホン', 'https://support.apple.com/ja-jp/111858');

INSERT INTO airpods_models (id, name, slug, model, show, image, date, type, chip, battery_earphone, battery_case, port, fit, control, spatial_audio, magsafe, qi_charge, waterproof, anc, adaptive_audio, point, official)
VALUES
(13, 'AirPods Max', 'max-2024', 'MWW〇3ZA/A', 1, 'max-2024.jpg', '2024/09/20', 'ヘッドホン', 'H1チップ', '20時間', 'なし', 'USB-C', NULL, 'Digital Crown / ノイズコントロールボタン', TRUE, FALSE, FALSE, NULL, TRUE, TRUE, NULL, 'https://support.apple.com/ja-jp/121205');
