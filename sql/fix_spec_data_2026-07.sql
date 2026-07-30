-- =============================================================================
-- スペックデータ誤り修正 SQL  (作成: 2026-07-05)
-- 対象: iphone_models / ipad_models / macbook_models / watch_models / airpods_models
--
-- 【方針】
--   ■ PART 1 = 確度「高」の明確な誤り（そのまま実行推奨）
--   ■ PART 2 = 判断が分かれる項目 / 表記統一（内容を確認のうえ任意で実行）
--
-- 除外: iPhone 17e の antutu_ux(564,952) は実測値のため修正しない。
--
-- 実行前に必ずトランザクションで確認すること:
--   BEGIN;  -- ... UPDATE群 ...  SELECT で確認  COMMIT; / ROLLBACK;
-- =============================================================================


-- #############################################################################
-- PART 1 : 確度「高」の明確な誤り
-- #############################################################################

BEGIN;

-- -----------------------------------------------------------------------------
-- iPhone
-- -----------------------------------------------------------------------------

-- 11 Pro: 解像度の転記ミス (2,463 → 2,436)
UPDATE iphone_models SET resolution = '2,436 x 1,125' WHERE slug = '11pro';

-- 12 / 12 Pro: 発売日 (11/13 は mini・Pro Max のみ。無印/Proは10/23)
UPDATE iphone_models SET date = '2020/10/23' WHERE slug IN ('12normal', '12pro');

-- 14 Plus: 発売日 (Plusのみ約3週間遅れ)
UPDATE iphone_models SET date = '2022/10/7' WHERE slug = '14plus';

-- 14 / 14 Plus: カラー区切り欠落 「レッドブルー」→「レッド / ブルー」
UPDATE iphone_models
   SET color = 'ミッドナイト / パープル / スターライト / レッド / ブルー / イエロー'
 WHERE slug IN ('14normal', '14plus');

-- 17 Pro: ストレージ上限 (2TBは Pro Max のみ)
UPDATE iphone_models SET strage = '256GB ~ 1TB' WHERE slug = '17pro';

-- iPhone Air: カラー名 (クラシックホワイト → クラウドホワイト)
UPDATE iphone_models
   SET color = 'スカイブルー/ ライトゴールド / クラウドホワイト / スペースブラック'
 WHERE slug = 'air';

-- 17e: front_camera(背面)と in_camera(前面)が他30行と逆転しているため入れ替え
UPDATE iphone_models
   SET front_camera = '48MP広角レンズ<br>12MP望遠レンズ',
       in_camera    = '12MPカメラ'
 WHERE slug = '17e';

-- 16e: シネマティックモード非対応（cinematic_mode:false と自己矛盾）
UPDATE iphone_models
   SET advance = jsonb_set(advance, '{all_models,features,6}', '"ナイトモード対応"')
 WHERE slug = '16e';


-- -----------------------------------------------------------------------------
-- iPad
-- -----------------------------------------------------------------------------

-- iPad(A16) 第11世代: RAMは6GB / セルラーはeSIM専用
UPDATE ipad_models SET ram = '6GB'      WHERE slug = 'normal-11';
UPDATE ipad_models SET sim = 'eSIMのみ' WHERE slug = 'normal-11';

-- iPad Pro 11(第3世代/M1): 厚み 6.1 → 5.9mm
UPDATE ipad_models SET size = '247.6 × 178.5 × 5.9mm' WHERE slug = 'pro11-3';

-- iPad Air(M4) 11/13: front(背面)と in(前面)が逆転しているため入れ替え
UPDATE ipad_models
   SET front_camera = '12MP広角カメラ',
       in_camera    = '12MPセンターフレームカメラ'
 WHERE slug IN ('air-8-11', 'air-8-13');


-- -----------------------------------------------------------------------------
-- MacBook
-- -----------------------------------------------------------------------------

-- M4/M5世代（center_frame:true）のカメラ表記が旧世代のまま
UPDATE macbook_models
   SET camera = '12MPセンターフレームカメラ'
 WHERE slug IN (
   'mba-13-2025','mba-15-2025','mbp-14-2024-nov','mbp-16-2024-nov',
   'mba-13-2026','mba-15-2026','mbp-14-2026','mbp-16-2026'
 );

-- MacBook Pro 16(M3 Pro/Max): 存在しないRAM構成 → M3 Pro(18/36) + M3 Max(48/64/96/128)
UPDATE macbook_models
   SET ram = '18 / 36 / 48 / 64 / 96 / 128GB'
 WHERE slug = 'mbp-16-2023-nov';

-- MacBook Pro 14(M3無印): ポートは Thunderbolt/USB4 × 2（TB4×3ではない）
UPDATE macbook_models
   SET port = 'Thunderbolt / USB 4 × 2'
 WHERE slug = 'mbp-14-2023-nov';

-- MacBook Pro 14(M1 Pro/Max): web閲覧は最大11時間（17hはムービー再生値）
UPDATE macbook_models
   SET battery = '最大11時間のweb閲覧'
 WHERE slug = 'mbp-14-2021';

-- MacBook Pro 16(M4 Pro/Max): web閲覧は最大17時間
UPDATE macbook_models
   SET battery = '最大17時間のweb閲覧'
 WHERE slug = 'mbp-16-2024-nov';

-- MacBook Pro 16(M5 Pro): RAM標準構成24GBが欠落
UPDATE macbook_models
   SET ram = '24 / 36 / 48 / 64 / 128GB'
 WHERE slug = 'mbp-16-2026';

-- MacBook Air 13(M5): スピーカーは4基（6基は15インチのみ）
UPDATE macbook_models SET speaker = '4スピーカー' WHERE slug = 'mba-13-2026';

-- MacBook Neo: バッテリーは最大16時間
UPDATE macbook_models
   SET battery = '最大16時間のワイヤレスインターネット'
 WHERE slug = 'mbn-13-2026';

-- MacBook Air 13/15(M3): 発売日は3/8（3/4は注文開始日）
UPDATE macbook_models SET date = '2024/03/08' WHERE slug IN ('mba-13-2024','mba-15-2024');

-- M4 Pro の外部ディスプレイは最大2台（3台はM5 Proから）
UPDATE macbook_models
   SET external_display = '最大2台（M4）/ 最大2台（Pro）/ 最大4台（Max）'
 WHERE slug = 'mbp-14-2024-nov';
UPDATE macbook_models
   SET external_display = '最大2台（Pro）/ 最大4台（Max）'
 WHERE slug = 'mbp-16-2024-nov';


-- -----------------------------------------------------------------------------
-- Apple Watch
-- -----------------------------------------------------------------------------

-- SE3 / Series11 / Ultra3: 発売日 (9/9は発表日、発売は9/19)
UPDATE watch_models SET date = '2025/09/19' WHERE slug IN ('se3','series11','ultra3');

-- Ultra3: バッテリーは通常使用最大42時間（72hは低電力モード）
UPDATE watch_models SET battery = '最大42時間' WHERE slug = 'ultra3';

-- 高血圧の可能性通知（2025/12/4 日本対応, Series9+/Ultra2+ が対象）
UPDATE watch_models SET blood_pressure = true WHERE slug IN ('series9','series10','ultra2');


-- -----------------------------------------------------------------------------
-- AirPods  (行の識別は id を使用)
-- -----------------------------------------------------------------------------

-- id10 AirPods Pro 2 (Lightning版 MQD83J/A): 防水は IPX4（IP54はUSB-C版から）
UPDATE airpods_models SET waterproof = 'IPX4' WHERE id = 10;

-- id5 AirPods 3 (Lightning充電ケース版 MPNY3J/A): ワイヤレス充電非対応
UPDATE airpods_models SET qi_charge = false WHERE id = 5;

-- id7 AirPods 4 ANC版 (MXP93J/A): MagSafe非対応（Qi充電のみ対応）
UPDATE airpods_models SET magsafe = false WHERE id = 7;

-- id13 AirPods Max 2024 (USB-C/H1): 適応型オーディオ非対応（H2必須）
UPDATE airpods_models SET adaptive_audio = false WHERE id = 13;

-- id8 / id9 AirPods Pro 初代: 空間オーディオ対応（iOS 14以降）
UPDATE airpods_models SET spatial_audio = true WHERE id IN (8, 9);


-- 確認してから COMMIT / ROLLBACK すること
-- COMMIT;
ROLLBACK;


-- #############################################################################
-- PART 2 : 判断が分かれる項目 / 表記統一（内容確認のうえ任意で実行）
-- #############################################################################

BEGIN;

-- --- iPhone: チップ名の公式表記（Bionicブランドは廃止済み） ------------------
-- UPDATE iphone_models SET cpu = 'A19 Pro' WHERE slug IN ('17pro','17promax','air');
-- UPDATE iphone_models SET cpu = 'A18'     WHERE slug IN ('16normal','16plus','16e');
-- UPDATE iphone_models SET cpu = 'A19'     WHERE slug IN ('17normal','17e');

-- --- iPhone: size が17系4行のみ「高さ×幅×厚さ」で他27行(幅×高さ×厚さ)と逆順 ---
--   17normal / 17pro / 17promax / air を目視で確認のうえ幅×高さ順に統一。

-- --- iPhone: 16系 battery の全角「ｍAh」→半角「mAh」 -------------------------
-- UPDATE iphone_models SET battery = replace(battery, 'ｍAh', 'mAh')
--  WHERE slug IN ('16normal','16plus','16pro','16promax') AND battery LIKE '%ｍAh%';

-- --- iPad: 重量がセルラー版基準の行をWi-Fi版に統一するか要検討 ----------------
-- UPDATE ipad_models SET weight = '487g' WHERE slug = 'normal-9';   -- 498g(セルラー)→487g(Wi-Fi)
-- UPDATE ipad_models SET weight = '293g' WHERE slug IN ('mini-6','mini-7'); -- 297g→293g

-- --- iPad: iPad(A16) チップ表記・ディスプレイ表記の統一 ----------------------
-- UPDATE ipad_models SET cpu = 'A16' WHERE slug = 'normal-11';        -- Bionic表記を除去
-- UPDATE ipad_models SET display = '11インチ' WHERE slug = 'normal-11'; -- Air M2/M3は11インチ表記

-- --- iPad Air 13(M4): バッテリー過大値の見直し（M3世代と同一の36.59Wh基準） ---
-- UPDATE ipad_models SET battery = '9,504' WHERE slug = 'air-8-13';   -- 9,900は過大

-- --- MacBook: M1/M2世代のポート表記（TB4非対応。Apple公式は Thunderbolt/USB4） -
-- UPDATE macbook_models SET port = 'Thunderbolt / USB 4 × 2'
--  WHERE slug IN ('mbp-13-2020','mbp-13-2022','mba-13-2024','mba-15-2024');

-- --- MacBook: 16インチの厚み表記 1.6→1.68cm（新しい行は1.68で不統一） --------
-- UPDATE macbook_models SET size = '1.68 × 35.5 × 24.8cm'
--  WHERE slug IN ('mbp-16-2021','mbp-16-2023');

-- --- AirPods: 発売日の細かな差異（発表日/店頭日の混在） ----------------------
-- UPDATE airpods_models SET date = '2020/12/15' WHERE id = 12; -- Max 2020
-- UPDATE airpods_models SET date = '2019/03/20' WHERE id IN (2,3); -- AirPods 2
-- UPDATE airpods_models SET date = '2016/12/13' WHERE id = 1;  -- AirPods 初代

-- --- AirPods Max 2024: 日本向けモデル番号の接尾辞 ZA/A → J/A -----------------
--   id13 の model 'MWW〇3ZA/A' を確認のうえ 'MWW〇3J/A' に修正。

-- --- Apple Watch Series5: セラミック(Edition)の欠落 --------------------------
-- UPDATE watch_models SET material = 'アルミニウム / ステンレス / チタニウム / セラミック'
--  WHERE slug = 'series5';

ROLLBACK;
