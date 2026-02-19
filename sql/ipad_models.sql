-- ============================================================
-- iPad Models テーブル作成 & データ投入
-- ============================================================

-- テーブル作成
CREATE TABLE IF NOT EXISTS ipad_models (
  id              INTEGER PRIMARY KEY,
  model           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  show            INTEGER NOT NULL DEFAULT 1,
  image           TEXT,
  date            TEXT,
  strage          TEXT,
  color           TEXT,
  battery         TEXT,
  cpu             TEXT,
  score_single    INTEGER,
  score_multi     INTEGER,
  score_metal     INTEGER,
  antutu_cpu      INTEGER,
  antutu_gpu      INTEGER,
  antutu_mem      INTEGER,
  antutu_ux       INTEGER,
  ram             TEXT,
  apple_intelligence BOOLEAN NOT NULL DEFAULT FALSE,
  size            TEXT,
  weight          TEXT,
  display         TEXT,
  resolution      TEXT,
  port            TEXT,
  certification   TEXT,
  sim             TEXT,
  front_camera    TEXT,
  in_camera       TEXT,
  center_frame    BOOLEAN NOT NULL DEFAULT FALSE,
  promotion       BOOLEAN NOT NULL DEFAULT FALSE,
  lidar           BOOLEAN NOT NULL DEFAULT FALSE,
  speaker         TEXT,
  pencil          TEXT,
  keyboard        TEXT,
  display_type    TEXT,
  point           TEXT,
  advance         JSONB,
  official        TEXT,
  accessory_case  TEXT,
  accessory_film  TEXT
);

-- ============================================================
-- データ投入 (id: 1〜22, 連番)
-- ============================================================

-- iPad 無印シリーズ
INSERT INTO ipad_models (id, model, slug, show, image, date, strage, color, battery, cpu, score_single, score_multi, score_metal, antutu_cpu, antutu_gpu, antutu_mem, antutu_ux, ram, apple_intelligence, size, weight, display, resolution, port, certification, sim, front_camera, in_camera, center_frame, promotion, lidar, speaker, pencil, keyboard, display_type, point, advance, official, accessory_case, accessory_film)
VALUES
(1, 'iPad 第9世代', 'normal-9', 1, 'ipad-9.jpg', '2021/9/24', '64GB / 256GB', 'シルバー / スペースグレー', '8,416', 'A13 Bionic', 1736, 3852, 13602, 344013, 289434, 137649, 265285, '3GB', FALSE, '250.6 × 174.1 × 7.5mm', '498g', '10.2インチ', '2,160 x 1,620', 'Lightning', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '8MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', '第1世代', 'Smart Keyboard', 'Retina Display',
 'A13 Bionic搭載で基本性能も十分、ホームボタンとLightning端子を備えた手軽に使える定番モデル',
 '{"all_models":{"description":"A13 Bionic搭載で基本性能も十分、ホームボタンとLightning端子を備えた手軽に使える定番モデル","features":["A13 Bionic搭載により処理性能が向上","True Tone対応の10.2インチRetinaディスプレイ採用","フロントカメラが12MP超広角に進化しCenter Stageに対応","ストレージ最小容量が64GBに倍増","引き続き第1世代Apple PencilとSmart Keyboardに対応"]}}',
 'https://support.apple.com/ja-jp/111898', NULL, NULL),

(2, 'iPad 第10世代', 'normal-10', 1, 'ipad-10.jpg', '2022/10/26', '64GB / 256GB', 'シルバー / ブルー / ピンク / イエロー', '7,429', 'A14 Bionic', 2049, 4720, 16455, 458119, 321134, 167810, 288225, '4GB', FALSE, '248.6 × 179.5 × 7mm', '477g', '10.2インチ', '2,360 x 1,640', 'USB-C', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', '第1世代 / USB-C', 'Magic Keyboard Folio', 'Liquid Retina Display',
 'A14 Bionic搭載、USB-C充電が可能になった入門者向けモデル',
 '{"all_models":{"description":"A14 Bionic搭載、USB-C充電が可能になった入門者向けモデル","features":["ホームボタン廃止＆10.9インチのフラットデザインに刷新","A14 Bionic搭載で前世代より高速化","12MP背面カメラ・横向きフロントカメラに進化","USB-Cポート採用でアクセサリ互換性が拡大","Magic Keyboard Folioに対応しPCライクな利用が可能"]}}',
 'https://support.apple.com/ja-jp/111840', NULL, NULL),

(3, 'iPad 第11世代', 'normal-11', 1, 'ipad-11.jpg', '2025/3/12', '128GB / 256GB / 512GB', 'シルバー / ブルー / ピンク / イエロー', '7,514', 'A16 Bionic', 2561, 5960, 19421, 629462, 438984, 264851, 322445, '4GB', FALSE, '248.6 × 179.5 × 7mm', '477g', '10.2インチ', '2,360 x 1,640', 'USB-C', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', '第1世代 / USB-C', 'Magic Keyboard Folio', 'Liquid Retina Display',
 'A16 Bionic搭載、USB-Cとフルディスプレイ採用でデザインも一新されたエントリーモデル',
 '{"all_models":{"description":"A16 Bionic搭載、USB-Cとフルディスプレイ採用でデザインも一新されたエントリーモデル","features":["A16 Bionic搭載で前世代より高速かつ省電力に","最低ストレージが128GBに倍増し512GBモデルも追加","Smart HDR 4対応で写真の見栄えが向上","前世代同様の10.9インチディスプレイ・デザインを継承","Magic Keyboard FolioやUSB-C対応アクセサリと互換"]}}',
 'https://support.apple.com/ja-jp/122240', NULL, NULL),

-- iPad mini シリーズ
(4, 'iPad mini 第5世代', 'mini-5', 1, 'ipad-mini-5.jpg', '2019/3/18', '64GB / 256GB', 'シルバー / スペースグレー / ゴールド', '4,961', 'A12 Bionic', 1320, 2884, 9353, 213888, 213923, 121398, 220543, '3GB', FALSE, '203.2 × 134.8 × 6.1mm', '300g', '7.9インチ', '2,048 x 1,536', 'Lightning', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '8MP広角カメラ', '7MP FaceTime HDカメラ', FALSE, FALSE, FALSE, '2スピーカー', '第1世代', '×', 'Retina Display',
 'A12 Bionic搭載、Lightning端子と7.9インチRetinaディスプレイを備えたコンパクトモデル',
 '{"all_models":{"description":"A12 Bionic搭載、Lightning端子と7.9インチRetinaディスプレイを備えたコンパクトモデル","features":["A12 Bionic搭載で前世代から処理性能が大幅向上","True Toneおよび広色域対応の7.9インチRetinaディスプレイに進化","フロントカメラが7MPに進化しFaceTime品質が向上","第1世代Apple Pencilに初対応し手書き入力が可能に","Bluetooth 5.0対応で無線接続の安定性が向上"]}}',
 'https://support.apple.com/ja-jp/111904', NULL, NULL),

(5, 'iPad mini 第6世代', 'mini-6', 1, 'ipad-mini-6.jpg', '2021/9/24', '64GB / 256GB', 'スペースグレー / スターライト / ピンク / パープル', '5,013', 'A15 Bionic', 2121, 5364, 19532, 551849, 416678, 181210, 299366, '4GB', FALSE, '195.4 × 134.8 × 6.3mm', '297g', '8.3インチ', '2,266 x 1,488', 'USB-C', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', '第2世代 / USB-C', '×', 'Liquid Retina Display',
 'A15 Bionic搭載、軽量コンパクトで持ち運びやすいコンパクトモデル',
 '{"all_models":{"description":"A15 Bionic搭載、軽量コンパクトで持ち運びやすいコンパクトモデル","features":["フルディスプレイデザイン＆8.3インチに大型化","A15 Bionicで大幅な性能向上","12MPカメラ搭載＆Center Stage対応","USB-Cポート採用＆5G通信に対応","第2世代Apple Pencilに対応"]}}',
 'https://support.apple.com/ja-jp/111886', NULL, NULL),

(6, 'iPad mini 第7世代', 'mini-7', 1, 'ipad-mini-7.jpg', '2024/10/23', '128GB / 256GB / 512GB', 'スペースグレイ / ブルー / パープル / スターライト', '5,078', 'A17 Pro', 2852, 7050, 25741, 643471, 489566, 253483, 344955, '8GB', TRUE, '195.4 × 134.8 × 6.3mm', '297g', '8.3インチ', '2,266 x 1,488', 'USB-C', 'Touch ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', 'Pro / USB-C', '×', 'Liquid Retina Display',
 'A17 Proチップ＋USB‑C／8.3インチディスプレイを搭載し、持ち運びやすさと最新性能を兼ね備えた、ヘビーユースにも耐えるコンパクトモデル',
 '{"all_models":{"description":"A17 Proチップ＋USB‑C／8.3インチディスプレイを搭載し、持ち運びやすさと最新性能を兼ね備えた、ヘビーユースにも耐えるコンパクトモデル","features":["A17 Proチップ搭載でグラフィック性能が向上","Apple Intelligence対応で生成AI機能に対応","ストレージが128GB/256GB/512GB構成に拡充","Wi-Fi 6EやBluetooth 5.3対応で高速通信を実現","新色ブルーが追加されカラーバリエーションが刷新"]}}',
 'https://www.apple.com/jp/ipad-mini/specs/', NULL, NULL),

-- iPad Air シリーズ
(7, 'iPad Air 第4世代', 'air-4', 1, 'ipad-air-4.jpg', '2020/9/15', '64GB / 256GB', 'シルバー / スペースグレー / ローズゴールド / グリーン / スカイブルー', '7,429', 'A14 Bionic', 2084, 4993, 16487, 505453, 387837, 146712, 275171, '4GB', FALSE, '247.6 × 178.5 × 6.1mm', '458g', '10.9インチ', '2,360 x 1,640', 'USB-C', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ', '7MP FaceTime HDカメラ', FALSE, FALSE, FALSE, '2スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina Display',
 'A14チップ＋USB‑C＋10.9インチディスプレイを備えた、Apple PencilやMagic Keyboardにも対応する、性能と汎用性に優れた定番モデル',
 '{"all_models":{"description":"A14チップ＋USB‑C＋10.9インチディスプレイを備えた、Apple PencilやMagic Keyboardにも対応する、性能と汎用性に優れた定番モデル","features":["ホームボタンを廃止しフルディスプレイデザインに刷新（10.9インチ）","A14 Bionic搭載で前世代から大幅に処理性能が向上","USB-Cポート採用でアクセサリの汎用性が向上","第2世代Apple Pencilに対応し使い勝手が向上","Magic Keyboardに対応しノートPCのような利用が可能に"]}}',
 'https://support.apple.com/ja-jp/111905', NULL, NULL),

(8, 'iPad Air 第5世代', 'air-5', 1, 'ipad-air-5.jpg', '2022/3/18', '64GB / 256GB', 'スペースグレー / ピンク / パープル / ブルー / スターライト', '7,429', 'M1', 2295, 8279, 32418, 591344, 662214, 227034, 322923, '8GB', TRUE, '247.6 × 178.5 × 6.1mm', '461g', '10.9インチ', '2,360 x 1,640', 'USB-C', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina Display',
 'M1チップ搭載で高速処理を実現した薄型軽量なミドルレンジモデル',
 '{"all_models":{"description":"M1チップ搭載で高速処理を実現した薄型軽量なミドルレンジモデル","features":["M1チップ搭載により大幅に処理性能が向上","12MP超広角フロントカメラ＆Center Stage対応","5G通信に対応し高速データ通信が可能に","USB-Cポートの転送速度が最大10Gbpsに向上","引き続き第2世代Apple PencilとMagic Keyboardに対応"]}}',
 'https://support.apple.com/ja-jp/111957', NULL, NULL),

(9, 'iPad Air 11 第6世代', 'air-6-11', 1, 'ipad-air-6-11.jpg', '2024/5/15', '128GB / 256GB / 512GB / 1TB', 'ブルー / パープル / スターライト / スペースグレイ', '7,514', 'M2', 2594, 9823, 42140, 772996, 788006, 270508, 342206, '8GB', TRUE, '178.5 × 247.6 × 6.1 mm', '462g', '11インチ', '2,360 x 1,640', 'USB-C', 'Touch ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Liquid Retina Display',
 'M2チップ＋USB‑C＋11インチディスプレイにより、軽量ながら高性能・拡張性も兼ね備えた、一線級の定番モデル',
 '{"all_models":{"description":"M2チップ＋USB‑C＋11インチディスプレイにより、軽量ながら高性能・拡張性も兼ね備えた、一線級の定番モデル","features":["M2チップ搭載でマルチタスクや創作作業がより快適に","128GBから最大1TBまでのストレージ構成に拡充","Apple Pencil ProおよびUSB-Cモデルにも対応","Wi-Fi 6E/Bluetooth 5.3対応で通信性能が強化","従来デザインを踏襲し、アクセサリ互換性も継続"]}}',
 'https://support.apple.com/ja-jp/119894', NULL, NULL),

(10, 'iPad Air 13 第6世代', 'air-6-13', 1, 'ipad-air-6-13.jpg', '2024/5/15', '128GB / 256GB / 512GB / 1TB', 'ブルー / パープル / スターライト / スペースグレイ', '9,504', 'M2', 2595, 9842, 42093, 813355, 804423, 280838, 338105, '8GB', TRUE, '214.9 × 280.6 × 6.1mm', '617g', '13インチ', '2,732 x 2,048', 'USB-C', 'Touch ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Liquid Retina Display',
 'M2チップ搭載、USB‑Cと13インチLiquid Retinaディスプレイを備えたクリエイティブ作業に強いモデル',
 '{"all_models":{"description":"M2チップ搭載、USB‑Cと13インチLiquid Retinaディスプレイを備えたクリエイティブ作業に強いモデル","features":["シリーズ初の13インチモデルで作業領域が大幅に拡大","最大600ニトの高輝度ディスプレイで視認性が向上","M2チップ搭載で高負荷アプリも快適に動作","大型バッテリーで長時間駆動を維持","13インチ用Magic KeyboardやApple Pencil Proに対応"]}}',
 'https://support.apple.com/ja-jp/119893', NULL, NULL),

(11, 'iPad Air 11 第7世代', 'air-7-11', 1, 'ipad-air-7-11.jpg', '2025/3/12', '128GB / 256GB / 512GB / 1TB', 'ブルー / パープル / スターライト / スペースグレイ', '7,514', 'M3', 3037, 11634, 44375, 805580, 830605, 314008, 387100, '8GB', TRUE, '178.5 × 247.6 × 6.1 mm', '460g', '11インチ', '2,360 x 1,640', 'USB-C', 'Touch ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Liquid Retina Display',
 'M3チップ搭載、USB‑Cと11インチLiquid Retinaディスプレイを備えた定番モデル',
 '{"all_models":{"description":"M3チップ搭載、USB‑Cと11インチLiquid Retinaディスプレイを備えた定番モデル","features":["M3チップ搭載でマルチスレッド性能とグラフィックス性能が向上","Apple IntelligenceのAI機能を快適に利用可能に","新設計のMagic Keyboard（第2世代）に対応し操作性が改善","引き続きApple Pencil Pro・USB-C版・第2世代に対応","外観やディスプレイ仕様は前世代を継承"]}}',
 'https://support.apple.com/ja-jp/122241', NULL, NULL),

(12, 'iPad Air 13 第7世代', 'air-7-13', 1, 'ipad-air-7-13.jpg', '2025/3/12', '128GB / 256GB / 512GB / 1TB', 'ブルー / パープル / スターライト / スペースグレイ', '9,504', 'M3', 3039, 11623, 44831, 858998, 862562, 320045, 387448, '8GB', TRUE, '214.9 × 280.6 × 6.1mm', '616g', '13インチ', '2,732 x 2,048', 'USB-C', 'Touch ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, FALSE, FALSE, '2スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Liquid Retina Display',
 NULL,
 '{"all_models":{"description":"M3チップにより13インチ大画面でも高負荷作業を快適に処理","features":["M3チップにより13インチ大画面でも高負荷作業を快適に処理","新型Magic Keyboard対応でトラックパッドやファンクションキーを搭載","Apple Pencil Proなど全対応スタイラスが利用可能","ディスプレイ・カメラなどは前世代から据え置き","内部性能と入力環境の強化による完成度向上"]}}',
 'https://support.apple.com/ja-jp/122242', NULL, NULL),

-- iPad Pro 11インチ シリーズ
(13, 'iPad Pro 11 第2世代', 'pro11-2', 1, 'ipad-pro-11-2.jpg', '2020/3/25', '128GB / 256GB / 512GB / 1TB', 'シルバー / スペースグレー', '7,600', 'A12Z Bionic', 1326, 4633, 18478, 313785, 438457, 150622, 233474, '6GB', FALSE, '247.6 ×178.5 × 5.9mm', '471g', '11インチ', '2,388 x 1,668', 'USB-C', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ / 10MP超広角カメラ', '7MPフロントカメラ', FALSE, TRUE, TRUE, '4スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina Display',
 NULL,
 '{"all_models":{"description":"A12Z Bionic搭載、LiDARスキャナーとMagic Keyboard対応のプロ向けモデル","features":["A12Z Bionic（GPU8コア）を搭載し、前世代のA12X（GPU7コア）からグラフィックス性能が向上","メモリは全モデル6GBに統一され、ストレージも基本128GBに倍増","背面カメラは12MP広角＋10MP超広角のデュアル構成となり、新たにLiDARスキャナを搭載してAR性能が強化","5つのスタジオ品質マイクを内蔵し、従来より高品位な音声録音が可能","トラックパッド付きのMagic Keyboardが新登場し、iPadOSでカーソル操作が可能に"]}}',
 'https://support.apple.com/ja-jp/118452', NULL, NULL),

(14, 'iPad Pro 11 第3世代', 'pro11-3', 1, 'ipad-pro-11-3.jpg', '2021/5/21', '128GB / 256GB / 512GB / 1TB / 2TB', 'シルバー / スペースグレー', '7,538', 'M1', 2308, 8335, 32834, 602192, 718982, 214646, 318773, '6GB', TRUE, '247.6 ×178.5 × 6.1mm', '466g', '11インチ', '2,388 x 1,668', 'USB-C（Thunderbolt対応）', 'Touch ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ / 10MP超広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina Display',
 NULL,
 '{"all_models":{"description":"M1チップ搭載、Thunderbolt対応のプロ向け11インチモデル","features":["M1チップを搭載し、CPU性能が最大50%、GPU性能が最大40%向上","メモリ容量が最大16GBに拡大、ストレージも最大2TBに倍増","セルラー通信が5Gに対応し、モバイルデータ通信速度が大幅に向上","USB-CポートがThunderbolt / USB4に対応し、有線帯域幅は前世代比4倍の最大40Gb/sに強化","フロントカメラが1200万画素の超広角カメラに進化し、センターフレームに対応"]}}',
 'https://support.apple.com/ja-jp/111897', NULL, NULL),

(15, 'iPad Pro 11 第4世代', 'pro11-4', 1, 'ipad-pro-11-4.jpg', '2022/10/26', '128GB / 256GB / 512GB / 1TB / 2TB', 'シルバー / スペースグレー', '7,538', 'M2', 2578, 9797, 46013, 798891, 793642, 269703, 338304, '8GB or 16GB', TRUE, '247.6 × 178.5 × 5.9mm', '466g', '11インチ', '2,388 x 1,668', 'USB-C（Thunderbolt対応）', 'Face ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ / 10MP超広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina Display',
 NULL,
 '{"all_models":{"description":"M2チップ搭載、Apple Pencilホバー対応のプロ向けモデル","features":["M2チップを搭載。CPU性能が約15%向上、GPUは10コア化で最大35%高速化","Apple Pencilホバー機能に対応し、ペン先を画面上最大12mmまで検知可能に","ProResビデオの録画に対応し、エンコードも最大3倍高速化","Wi‑Fi 6Eに新対応し、6GHz帯の高速通信に対応","iPadOS 16の導入によりステージマネージャなどマルチタスク機能が強化"]}}',
 'https://support.apple.com/ja-jp/111842', NULL, NULL),

(16, 'iPad Pro 11 第5世代', 'pro11-5', 1, 'ipad-pro-11-5.jpg', '2024/5/15', '256GB / 512GB / 1TB / 2TB', 'シルバー / スペースブラック', '8,340', 'M4', 3650, 13379, 53932, 1116393, 1110758, 335279, 409734, '8GB or 16GB', TRUE, '177.5 × 249.7 × 5.3 mm', '444g', '11インチ', '2,420 x 1,668', 'USB-C（Thunderbolt対応）', 'Face ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Ultra Retina XDR Display',
 NULL,
 '{"all_models":{"description":"M4チップとUltra Retina XDRディスプレイ搭載の最薄プロモデル","features":["M4チップを搭載し、CPU最大50%、GPU最大4倍高速化","新しいUltra Retina XDRディスプレイ（タンデムOLED）を搭載","史上最薄の5.3mmボディを採用し、軽量化を実現","Apple Pencil Proに対応。握る・回すなどの新しい操作や探す機能に対応","新Magic Keyboardに対応し、アルミボディやファンクションキー列の追加など操作性が向上"]}}',
 'https://support.apple.com/ja-jp/119892', NULL, NULL),

(17, 'iPad Pro 11 第6世代', 'pro11-6', 1, 'ipad-pro-11-6.jpg', '2025/10/22', '256GB / 512GB / 1TB / 2TB', 'シルバー / スペースブラック', NULL, 'M5', 4163, 15779, NULL, 995699, 1238503, 426245, 446126, '12GB or 16GB', TRUE, '177.5 × 249.7 × 5.3 mm', '444g', '11インチ', '2,420 x 1,668', 'USB-C（Thunderbolt対応）', 'Face ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Ultra Retina XDR Display',
 NULL,
 '{"all_models":{"description":"M5チップ搭載の最新iPad Pro 11インチ","features":["M5チップ搭載","C1X／N1チップを加え3つのチップを複合搭載","AI処理性能が最大約3.5倍向上","総合パフォーマンスが大幅に向上","ストレージ読み書き速度が2倍に高速化","Wi-Fi 7など最新ワイヤレス通信に対応","最大60Wの急速充電に対応","外部ディスプレイへの4K 120Hz出力に対応","インカメラ（センターステージ）が横向きに配置変更"]}}',
 NULL, NULL, NULL),

-- iPad Pro 12.9 / 13インチ シリーズ
(18, 'iPad Pro 12.9 第4世代', 'pro12-4', 1, 'ipad-pro-12-4.jpg', '2020/3/25', '128GB / 256GB / 512GB / 1TB', 'シルバー / スペースグレー', '9,720', 'A12Z Bionic', 1333, 4650, 18481, 320960, 458176, 153279, 243527, '8GB or 16GB', FALSE, '280.6 × 214.9 × 5.9mm', '641g', '12.9インチ', '2,732 x 2,048', 'USB-C', 'Face ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ / 10MP超広角カメラ', '7MPカメラ', FALSE, TRUE, TRUE, '4スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina Display',
 NULL,
 '{"all_models":{"description":"A12Z Bionic搭載、LiDARスキャナーとMagic Keyboard対応の大画面プロモデル","features":["A12Z Bionicを搭載し、GPU性能が向上","メモリ構成が全モデル6GBとなり、ストレージも基本128GBに強化","12MP広角＋10MP超広角＋LiDARスキャナの3構成にアップグレード","5基のスタジオ品質マイクを搭載し、クリアな録音が可能に","Magic Keyboardに対応し、トラックパッド操作などの入力機能が拡充"]}}',
 'https://support.apple.com/ja-jp/111977', NULL, NULL),

(19, 'iPad Pro 12.9 第5世代', 'pro12-5', 1, 'ipad-pro-12-5.jpg', '2021/5/21', '128GB / 256GB / 512GB / 1TB / 2TB', 'シルバー / スペースグレー', '10,533', 'M1', 2311, 8381, 32802, 605549, 747442, 267606, 314250, '8GB or 16GB', TRUE, '280.6 × 214.9 × 6.4mm', '682g', '12.9インチ', '2,732 x 2,048', 'USB-C（Thunderbolt対応）', 'Face ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ / 10MP超広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina XDR Display',
 NULL,
 '{"all_models":{"description":"M1チップとミニLED XDRディスプレイ搭載の大画面プロモデル","features":["M1チップを搭載し、CPU・GPUともに大幅に性能向上","最大16GBメモリ・2TBストレージ構成に対応","初めてミニLEDを用いたLiquid Retina XDRディスプレイを採用","5G通信に対応し、モバイル通信速度が向上","Thunderbolt / USB4ポート対応で外部機器との接続が強化"]}}',
 'https://support.apple.com/ja-jp/111896', NULL, NULL),

(20, 'iPad Pro 12.9 第6世代', 'pro12-6', 1, 'ipad-pro-12-6.jpg', '2022/10/26', '128GB / 256GB / 512GB / 1TB / 2TB', 'シルバー / スペースグレー', '10,758', 'M2', 2600, 9874, 46110, 801400, 885074, 300819, 327955, '8GB or 16GB', TRUE, '280.6 × 214.9 × 6.4mm', '682g', '12.9インチ', '2,732 x 2,048', 'USB-C（Thunderbolt対応）', 'Face ID', 'デュアルSIM（nano-SIMとeSIM）', '12MP広角カメラ / 10MP超広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', '第2世代 / USB-C', 'Magic Keyboard/Smart Keyboard Folio', 'Liquid Retina XDR Display',
 'M2チップとXDRディスプレイ搭載のクリエイター向けハイエンドモデル',
 '{"all_models":{"description":"M2チップとXDRディスプレイ搭載のクリエイター向けハイエンドモデル","features":["M2チップ搭載でパフォーマンスがさらに向上","ProResビデオ撮影に対応し、映像編集ワークフローが進化","Apple Pencilホバー機能に対応","Wi‑Fi 6Eに対応","外観やディスプレイは第5世代から据え置きで、内部性能が中心の進化"]}}',
 'https://support.apple.com/ja-jp/111841', NULL, NULL),

(21, 'iPad Pro 13 第1世代', 'pro13-1', 1, 'ipad-pro-13-1.jpg', '2024/5/15', '256GB / 512GB / 1TB / 2TB', 'シルバー / スペースブラック', '10,340', 'M4', 3669, 13680, 54292, 1123025, 1097383, 336198, 417590, '8GB or 16GB', TRUE, '215.5 × 281.6 × 5.1mm', '579g', '13インチ', '2,752 x 2,064', 'USB-C（Thunderbolt対応）', 'Face ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Ultra Retina XDR Display',
 NULL,
 '{"all_models":{"description":"M4チップとUltra Retina XDRディスプレイ搭載の13インチ最薄プロモデル","features":["M4チップを搭載し、CPU・GPU・Neural Engineともに大幅進化","Ultra Retina XDRディスプレイ（タンデムOLED）を搭載し、画質が飛躍的に向上","厚さ5.1mm、重量579gと軽量薄型化","Apple Pencil Proに対応し、多機能な操作が可能に","新Magic Keyboardに対応。剛性と操作性が向上"]}}',
 'https://support.apple.com/ja-jp/119891', NULL, NULL),

(22, 'iPad Pro 13 第2世代', 'pro13-2', 1, 'ipad-pro-13-2.jpg', '2025/10/22', '256GB / 512GB / 1TB / 2TB', 'シルバー / スペースブラック', NULL, 'M5', 4136, 15306, NULL, 1035122, 1260216, 423683, 453134, '12GB or 16GB', TRUE, '215.5 × 281.6 × 5.1mm', '579g', '13インチ', '2,752 x 2,064', 'USB-C（Thunderbolt対応）', 'Face ID', 'eSIMのみ', '12MP広角カメラ', '12MP超広角カメラ', TRUE, TRUE, TRUE, '4スピーカー', 'Pro / USB-C', 'Magic Keyboard', 'Ultra Retina XDR Display',
 NULL,
 '{"all_models":{"description":"M5チップ搭載の最新iPad Pro 13インチ","features":["M5チップ搭載","C1X／N1チップを加え3つのチップを複合搭載","AI処理性能が最大約3.5倍向上","総合パフォーマンスが大幅に向上","ストレージ読み書き速度が2倍に高速化","Wi-Fi 7など最新ワイヤレス通信に対応","最大60Wの急速充電に対応","外部ディスプレイへの4K 120Hz出力に対応","インカメラ（センターステージ）が横向きに配置変更"]}}',
 NULL, NULL, NULL);
