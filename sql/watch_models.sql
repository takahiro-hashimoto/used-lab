-- ============================================================
-- Apple Watch Models テーブル作成 & データ投入
-- ============================================================

-- テーブル作成
CREATE TABLE IF NOT EXISTS watch_models (
  id                INTEGER PRIMARY KEY,
  model             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  show              INTEGER NOT NULL DEFAULT 1,
  image             TEXT,
  date              TEXT,
  cpu               TEXT,
  size              TEXT,
  strage            TEXT,
  material          TEXT,
  battery           TEXT,
  water_resistance  TEXT,
  always_on_display BOOLEAN NOT NULL DEFAULT FALSE,
  fast_charge       BOOLEAN NOT NULL DEFAULT FALSE,
  blood_oxygen      BOOLEAN NOT NULL DEFAULT FALSE,
  cardiogram        BOOLEAN NOT NULL DEFAULT FALSE,
  accident_detection BOOLEAN NOT NULL DEFAULT FALSE,
  fall_detection    BOOLEAN NOT NULL DEFAULT FALSE,
  skin_temperature  BOOLEAN NOT NULL DEFAULT FALSE,
  japanese_input    BOOLEAN NOT NULL DEFAULT FALSE,
  double_tap        BOOLEAN NOT NULL DEFAULT FALSE,
  sleep_tracking    BOOLEAN NOT NULL DEFAULT FALSE,
  altimeter         BOOLEAN NOT NULL DEFAULT FALSE,
  blood_pressure    BOOLEAN NOT NULL DEFAULT FALSE,
  sleep_score       BOOLEAN NOT NULL DEFAULT FALSE,
  max_brightness    TEXT,
  point             TEXT,
  advance           JSONB,
  official          TEXT,
  accessory_case    TEXT,
  accessory_film    TEXT
);

-- ============================================================
-- データ投入 (id: 1〜14, 連番)
-- ============================================================

-- Apple Watch SEシリーズ
INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(1, 'Apple Watch SE', 'se', 1, 'watch-se.jpg', '2020/09/18', 'S5 SiP', '40mm / 44mm', '32GB', 'アルミニウム', '最大18時間', '50m', FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, '1,000ニト', NULL, '{"all_models": {"description": "初代の低価格エントリーモデル", "features": ["初代の低価格エントリーモデル", "基本的なフィットネス・健康機能（心拍数、GPS、加速度センサーなど）を搭載", "防水性能は50m"]}}', 'https://support.apple.com/ja-jp/111862', 'https://amzn.to/4o4qVJE', 'https://amzn.to/4h1tJET');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(2, 'Apple Watch SE2', 'se2-2', 1, 'watch-se2.jpg', '2022/09/16', 'S8 SiP', '40mm / 44mm', '32GB', 'アルミニウム', '最大18時間', '50m', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, '1,000ニト', '基本機能に忠実ながらS8チップ搭載で高速処理と安全・フィットネス機能を備え、価格を抑えた入門向けモデル', '{"all_models": {"description": "基本機能に忠実ながらS8チップ搭載で高速処理と安全・フィットネス機能を備え、価格を抑えた入門向けモデル", "features": ["S8チップ搭載で処理性能が向上", "Crash Detection（交通事故検出）機能を追加", "Bluetoothなど通信性能を改善", "前モデルよりアプリ起動が速く、動作が滑らかに"]}}', 'https://support.apple.com/ja-jp/111853', 'https://amzn.to/3Ir1iDH', 'https://amzn.to/46Awnhu');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(3, 'Apple Watch SE3', 'se3-2', 1, 'watch-se3.jpg', '2025/09/09', 'S10 SiP', '40mm / 44mm', '64GB', 'アルミニウム', '最大18時間', '50m', TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, '1,000ニト', NULL, '{"all_models": {"description": "S10チップ搭載で高速化・省電力化", "features": ["S10チップ搭載で高速化・省電力化", "Always-On Display（常時表示ディスプレイ）に対応", "Ion-Xガラス採用でひび割れ耐性が4倍に向上", "睡眠スコア、睡眠時無呼吸通知、手首温度センサーなど健康機能を強化", "ジェスチャー操作（ダブルタップなど）に対応", "充電速度や通信性能も改善"]}}', 'https://support.apple.com/ja-jp/125094', 'https://amzn.to/46JGPBW', 'https://amzn.to/46IDWRP');


-- Apple Watch Seriesシリーズ
INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(4, 'Apple Watch 4', 'series4', 1, 'watch-4.jpg', '2018/09/21', 'S4 SiP', '40mm / 44mm', '32GB', 'アルミニウム / ステンレス', '最大18時間', '50m', FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, '1,000ニト', NULL, '{"all_models": {"description": "ケースサイズが38/42mm → 40/44mmに拡大、画面表示領域が約30%以上アップ", "features": ["ケースサイズが38/42mm → 40/44mmに拡大、画面表示領域が約30%以上アップ", "64ビットデュアルコアチップ「S4」搭載で、前世代の2倍の処理性能", "初の心電図（ECG）対応で心拍を電気的に計測可能に", "転倒検出機能を新搭載、緊急連絡への自動対応も可能", "スピーカー音量が50%向上、通話やSiriの聞き取りやすさを改善", "背面素材がセラミック＋サファイアガラスに統一され通信感度・耐久性が向上"]}}', 'https://support.apple.com/ja-jp/111984', 'https://amzn.to/42ieCRp', 'https://amzn.to/4o1ixum');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(5, 'Apple Watch 5', 'series5', 1, 'watch-5.jpg', '2019/09/20', 'S5 SiP', '40mm / 44mm', '32GB', 'アルミニウム / ステンレス / チタニウム', '最大18時間', '50m', TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, '1,000ニト', NULL, '{"all_models": {"description": "常時表示のRetinaディスプレイを初搭載、手首を下ろしても情報を確認可能", "features": ["常時表示のRetinaディスプレイを初搭載、手首を下ろしても情報を確認可能", "コンパス（磁気センサー）とコンパスアプリを新搭載、マップ利用時に方角を把握可能に", "海外での緊急通報機能を追加（セルラーモデル）", "内部ストレージが16GB → 32GBに倍増", "新素材「チタニウムケース」、セラミックモデルが復活"]}}', 'https://support.apple.com/ja-jp/118453', 'https://amzn.to/4gNGGC4', 'https://amzn.to/4ntNkjj');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(6, 'Apple Watch 6', 'series6', 1, 'watch-6.jpg', '2020/09/18', 'S6 SiP', '40mm / 44mm', '32GB', 'アルミニウム / ステンレス / チタニウム', '最大18時間', '50m', TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, '1,000ニト', NULL, '{"all_models": {"description": "新SoC「S6」搭載で処理速度が約20%向上、より省電力に", "features": ["新SoC「S6」搭載で処理速度が約20%向上、より省電力に", "血中酸素濃度（SpO2）センサーを新搭載、ヘルスチェックが進化", "常時計測の高度計を追加、リアルタイムで高度を把握可能に", "常時表示ディスプレイが手首を下ろした状態での明るさが2.5倍に", "U1チップ搭載で超広帯域通信に対応、将来のAirTag・キー機能にも拡張性", "充電速度が高速化、約1.5時間でフル充電", "新色ブルー、(PRODUCT)REDを追加"]}}', 'https://support.apple.com/ja-jp/111918', 'https://amzn.to/4o3LXIj', 'https://amzn.to/4733o5U');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(7, 'Apple Watch 7', 'series7', 1, 'watch-7.jpg', '2021/10/15', 'S7 SiP', '41mm / 45mm', '32GB', 'アルミニウム / ステンレス / チタニウム', '最大18時間', '50m', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, '1,000ニト', NULL, '{"all_models": {"description": "ディスプレイがさらに大型化、シリーズ6比で約20%拡大", "features": ["ディスプレイがさらに大型化、シリーズ6比で約20%拡大", "ケースサイズが41/45mmに拡大、ベゼル幅も1.7mmに狭額縁化", "耐久性が向上し、IP6X防塵性能を初取得＋前面ガラスが50%厚く", "USB-Cによる急速充電対応、約45分で80%充電", "QWERTYキーボード入力など大型画面に最適化されたUIを採用"]}}', 'https://support.apple.com/ja-jp/111909', 'https://amzn.to/4pRzdGi', 'https://amzn.to/3VIquIP');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(8, 'Apple Watch 8', 'series8', 1, 'watch-8.jpg', '2022/09/16', 'S8 SiP', '41mm / 45mm', '32GB', 'アルミニウム / ステンレス', '最大18時間', '50m', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, '1,000ニト', '常時表示ディスプレイや血中酸素センサー搭載で、健康・安全機能を強化したミドルレンジスマートウォッチ', '{"all_models": {"description": "常時表示ディスプレイや血中酸素センサー搭載で、健康・安全機能を強化したミドルレンジスマートウォッチ", "features": ["新たに皮膚温センサーを搭載、月経周期の把握・排卵推定が可能に", "自動車衝突検出機能を追加、高G対応の加速度センサーとジャイロ搭載", "セルラーモデルが国際ローミング対応に", "低電力モード搭載で最大36時間駆動が可能に（通常は18時間）"]}}', 'https://support.apple.com/ja-jp/111848', 'https://amzn.to/46zwBp3', 'https://amzn.to/3VNIBNp');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(9, 'Apple Watch 9', 'series9', 1, 'watch-9.jpg', '2023/09/22', 'S9 SiP', '41mm / 45mm', '64GB', 'アルミニウム / ステンレス', '最大18時間', '50m', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, '2,000ニト', 'S9チップで高速化され、ダブルタップや健康センサーを備えた、万能モデル', '{"all_models": {"description": "S9チップで高速化され、ダブルタップや健康センサーを備えた、万能モデル", "features": ["新SoC「S9」搭載、Neural EngineによるAI処理性能が2倍に向上", "ダブルタップ（指先ジェスチャー）操作が可能に", "ディスプレイ輝度が最大2000ニトに向上、暗所では最小1ニトに減光", "Siriがオンデバイス処理対応により高速化＆ヘルスデータにも対応", "第2世代UWBチップでiPhoneとの精密な位置特定が可能に", "ストレージが64GBに倍増、アルミ筐体に新色「ピンク」登場"]}}', 'https://support.apple.com/ja-jp/111833', 'https://amzn.to/4pLc885', 'https://amzn.to/4744Ogp');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(10, 'Apple Watch 10', 'series10', 1, 'watch-10.jpg', '2024/09/20', 'S10 SiP', '42mm / 46mm', '64GB', 'アルミニウム / チタニウム', '最大18時間', '50m', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, '2,000ニト', NULL, '{"all_models": {"description": "筐体サイズが42/46mmに拡大、画面表示領域も約10%アップ", "features": ["筐体サイズが42/46mmに拡大、画面表示領域も約10%アップ", "本体が9.7mm厚と薄型化、重量も約10%軽量化", "新型LTPO OLEDディスプレイで視野角性能が向上", "充電速度がさらに高速化、0→80%が約30分に短縮", "チタン合金ケースに刷新、従来のステンレスより軽量＆高耐久"]}}', 'https://support.apple.com/ja-jp/121202', 'https://amzn.to/3KtWcHm', 'https://amzn.to/4nyEhOl');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(11, 'Apple Watch 11', 'series11', 1, 'watch-11.jpg', '2025/09/09', 'S10 SiP', '42mm / 46mm', '64GB', 'アルミニウム / チタニウム', '最大24時間', '50m', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '2,000ニト', NULL, '{"all_models": {"description": "ガラス強度が向上", "features": ["ガラス強度が向上", "5G通信に対応", "血圧センサーで高血圧を通知", "最大24時間続くバッテリー"]}}', 'https://support.apple.com/ja-jp/125093', 'https://amzn.to/3ICcIV9', 'https://amzn.to/46xskSV');


-- Apple Watch Ultraシリーズ
INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(12, 'Apple Watch Ultra', 'ultra', 1, 'watch-ultra.jpg', '2022/09/23', 'S8 SiP', '49mm', '32GB', 'チタニウム', '最大36時間', '100m', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, '2,000ニト', '49mmケースに高輝度ディスプレイやアクションボタンを備えた、過酷な環境にも強いアウトドア向けモデル', '{"all_models": {"description": "49mmケースに高輝度ディスプレイやアクションボタンを備えた、過酷な環境にも強いアウトドア向けモデル", "features": ["49mmチタンケースでタフな設計", "高輝度ディスプレイで屋外でも視認性良好", "防塵防水・耐久性に優れる", "アクションボタン搭載、アウトドア/スポーツ用途に最適", "長時間バッテリー（通常使用で36時間）"]}}', 'https://support.apple.com/ja-jp/111852', 'https://amzn.to/3IElVfE', 'https://amzn.to/3KtZdr6');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(13, 'Apple Watch Ultra2', 'ultra2', 1, 'watch-ultra2.jpg', '2023/09/22', 'S9 SiP', '49mm', '64GB', 'チタニウム', '最大54時間', '100m', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, '3,000ニト', NULL, '{"all_models": {"description": "最大輝度がさらに向上し、屋外での見やすさ改善", "features": ["最大輝度がさらに向上し、屋外での見やすさ改善", "S9チップ搭載で処理性能と電力効率がアップ", "チタンブラックなど新色が追加", "睡眠無呼吸通知、Vitalsアプリなど健康機能を拡充"]}}', 'https://support.apple.com/ja-jp/111832', 'https://amzn.to/4pPEgab', 'https://amzn.to/4pRUXBW');

INSERT INTO watch_models (id, model, slug, show, image, date, cpu, size, strage, material, battery, water_resistance, always_on_display, fast_charge, blood_oxygen, cardiogram, accident_detection, fall_detection, skin_temperature, japanese_input, double_tap, sleep_tracking, altimeter, blood_pressure, sleep_score, max_brightness, point, advance, official, accessory_case, accessory_film)
VALUES
(14, 'Apple Watch Ultra3', 'ultra3', 1, 'watch-ultra3.jpg', '2025/09/09', 'S10 SiP', '49mm', '64GB', 'チタニウム', '最大72時間', '100m', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '3,000ニト', NULL, '{"all_models": {"description": "ベゼルが薄くなり、より大きな表示領域", "features": ["ベゼルが薄くなり、より大きな表示領域", "バッテリー駆動時間が改善（約42時間）", "衛星通信によるSOSに対応、圏外でも緊急時に安心", "血圧（高血圧）検出アラート機能を追加", "睡眠スコアや健康・ウェルネス機能が強化", "チタンケースは継続、ナチュラル／ブラックの仕上げ色展開"]}}', 'https://support.apple.com/ja-jp/125095', 'https://amzn.to/4gUX6Zx', 'https://amzn.to/3KtIFQ2');
