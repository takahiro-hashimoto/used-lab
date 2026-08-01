-- =============================================================================
-- スペックデータ誤り修正 記録  (2026-08-01)
-- 対象: iphone_models / ipad_models / macbook_models / watch_models /
--       galaxy_models / pixel_models
--
-- 【状態】下記「■ 適用済み」は 2026-08-01 に本番DBへ反映済み（UPDATE 31件）。
--          再実行は不要。実施記録として保管する。
--          未反映は末尾「■ 未適用（要判断）」のみ。
--
-- 前回監査 sql/fix_spec_data_2026-07.sql の PART 1 は適用済みであることを確認済み。
-- 今回は (a) 新規追加された Galaxy / Pixel の初監査
--         (b) 前回 PART 2（未適用）の消化
--         (c) 前回の見落とし  をまとめたもの。
-- =============================================================================


-- #############################################################################
-- ■ 適用済み  (2026-08-01)
-- #############################################################################

-- -----------------------------------------------------------------------------
-- iPhone
-- -----------------------------------------------------------------------------

-- 16e: 寸法・解像度に iPhone 16 の値が入っていた
--   Apple公式 https://support.apple.com/ja-jp/122208
--     高さ146.7 × 幅71.5 × 厚さ7.80mm / 2,532 x 1,170px (460ppi)
UPDATE iphone_models SET size       = '71.5 × 146.7 × 7.8mm' WHERE slug = '16e';
UPDATE iphone_models SET resolution = '2,532 x 1,170'        WHERE slug = '16e';

-- チップ名: A18 以降 Apple は「Bionic」ブランドを使用していない。
-- さらに 'A19 pro Bionic' は pro が小文字のtypoだった。
UPDATE iphone_models SET cpu = 'A19 Pro' WHERE slug IN ('17pro', '17promax', 'air');
UPDATE iphone_models SET cpu = 'A19'     WHERE slug IN ('17normal', '17e');
UPDATE iphone_models SET cpu = 'A18'     WHERE slug IN ('16normal', '16plus', '16e');
-- ※ lib/data/iphone-guide.ts / ipad-guide.ts / ipad-recommend.ts の直書きも同時に修正済み。
--   iPhone の A16 は公式に「A16 Bionic」なのでそのまま（iPad の A16 のみ Bionic なし）。

-- size を「幅 × 高さ × 厚さ」に統一（他27行の多数派に合わせる）
UPDATE iphone_models SET size = '71.7 × 149.6 × 7.9mm'  WHERE slug = '17normal';
UPDATE iphone_models SET size = '71.9 × 150.0 × 8.75mm' WHERE slug = '17pro';
UPDATE iphone_models SET size = '78.0 × 163.4 × 8.75mm' WHERE slug = '17promax';
UPDATE iphone_models SET size = '74.7 × 156.2 × 5.6mm'  WHERE slug = 'air';

-- 16系 battery の全角「ｍAh」→ 半角
UPDATE iphone_models SET battery = '3,561 mAh' WHERE slug = '16normal';
UPDATE iphone_models SET battery = '4,674 mAh' WHERE slug = '16plus';
UPDATE iphone_models SET battery = '3,582 mAh' WHERE slug = '16pro';
UPDATE iphone_models SET battery = '4,685 mAh' WHERE slug = '16promax';

-- resolution の表記統一（桁区切りなし・全角× が混在していた）
UPDATE iphone_models SET resolution = '2,556 x 1,179' WHERE slug IN ('15normal', '16normal');
UPDATE iphone_models SET resolution = '2,532 x 1,170' WHERE slug = '17e';


-- -----------------------------------------------------------------------------
-- iPad
-- -----------------------------------------------------------------------------

-- size を「高さ × 幅 × 厚さ」に統一（16行が高さ×幅、8行が幅×高さで混在していた）
UPDATE ipad_models SET size = '247.6 × 178.5 × 6.1mm' WHERE slug IN ('air-6-11', 'air-7-11');
UPDATE ipad_models SET size = '280.6 × 214.9 × 6.1mm' WHERE slug IN ('air-6-13', 'air-7-13');
UPDATE ipad_models SET size = '249.7 × 177.5 × 5.3mm' WHERE slug IN ('pro11-5', 'pro11-6');
UPDATE ipad_models SET size = '281.6 × 215.5 × 5.1mm' WHERE slug IN ('pro13-1', 'pro13-2');

-- battery: 桁区切りなし / 13インチの値が過大（M3世代と同じ36.59Wh基準なら 9,504）
UPDATE ipad_models SET battery = '7,574' WHERE slug = 'air-8-11';
UPDATE ipad_models SET battery = '9,504' WHERE slug = 'air-8-13';

-- iPad(A16) 第11世代: Apple公式表記に合わせる
UPDATE ipad_models SET cpu = 'A16', display = '11インチ' WHERE slug = 'normal-11';

-- 重量がセルラー版基準だった行を Wi-Fi 版に統一
UPDATE ipad_models SET weight = '487g' WHERE slug = 'normal-9';
UPDATE ipad_models SET weight = '293g' WHERE slug IN ('mini-6', 'mini-7');


-- -----------------------------------------------------------------------------
-- MacBook
-- -----------------------------------------------------------------------------

-- M1〜M3 世代のポート表記ゆれ（Thunderbolt3 / Thunderbolt4 混在）
--   Apple公式は一貫して「Thunderbolt / USB 4」。M4 以降は正式に Thunderbolt 4 なので対象外。
UPDATE macbook_models SET port = 'Thunderbolt / USB 4 × 2'
 WHERE slug IN ('mba-13-2020','mba-13-2022','mba-15-2023','mbp-13-2020','mbp-13-2022','mba-13-2024','mba-15-2024');

-- 16インチの厚み表記 1.6 → 1.68cm（新しい行は1.68で不統一だった）
UPDATE macbook_models SET size = '1.68 × 35.5 × 24.8cm' WHERE slug IN ('mbp-16-2021', 'mbp-16-2023');

-- 重量の余分な空白 '1.4 kg' → '1.4kg'
UPDATE macbook_models SET weight = '1.4kg' WHERE slug = 'mbp-13-2020';


-- -----------------------------------------------------------------------------
-- Apple Watch
-- -----------------------------------------------------------------------------

-- Series5: セラミック(Edition)が欠落していた
UPDATE watch_models SET material = 'アルミニウム / ステンレス / チタニウム / セラミック'
 WHERE slug = 'series5';


-- -----------------------------------------------------------------------------
-- Galaxy
-- -----------------------------------------------------------------------------

-- S22 / S22 Ultra: One UI 6.1 で Galaxy AI 提供済み（通訳・生成AI編集など）。
--   同時期に同じ更新を受けた Z Fold4 / Z Flip4 は galaxy_ai = true で矛盾していた。
--   出典: https://www.itmedia.co.jp/mobile/articles/2404/18/news115.html
UPDATE galaxy_models SET galaxy_ai = true WHERE slug IN ('galaxy-s22', 'galaxy-s22-ultra');

-- S21 / S21 Ultra: One UI 6.1（2024/5配信）で「かこって検索」に対応。
--   同世代の Z Fold3 / Z Flip3 は circle_to_search = true で矛盾していた。
UPDATE galaxy_models SET circle_to_search = true WHERE slug IN ('galaxy-s21', 'galaxy-s21-ultra');

-- A54 5G: 重量 201g → 202g
UPDATE galaxy_models SET weight = '202g' WHERE slug = 'galaxy-a54-5g';


-- -----------------------------------------------------------------------------
-- Pixel
-- -----------------------------------------------------------------------------

-- Pixel 9 Pro のみ 2031-09（Google は Pixel 9 シリーズ一括で「2031年8月まで」と案内）
UPDATE pixel_models SET support_until = '2031-08' WHERE slug = 'pixel-9-pro';


-- -----------------------------------------------------------------------------
-- 2回目のパス（未確認だった列を追加監査）
-- -----------------------------------------------------------------------------

-- MacBook Pro M3世代: SDR輝度は 600ニト（1,000ニト は M4世代から）
--   Apple公式 https://support.apple.com/kb/SP898?locale=ja_JP&viewlocale=ja_JP
--     「XDR輝度：1,000ニトの持続輝度 / 1,600ニトのピーク輝度、SDR輝度：600ニト」
--   ※ M1/M2 Pro/Max = 500ニト、M4 = 1,000ニト(屋外) はいずれも現状のままで正しい。
--      https://support.apple.com/en-us/121552 「SDR brightness: up to 1000 nits (outdoor)」
UPDATE macbook_models SET luminance = '600ニト' WHERE slug IN ('mbp-14-2023-nov', 'mbp-16-2023-nov');

-- iPad の color 表記ゆれ: Apple日本の公式表記は「スペースグレイ」
--   https://www.apple.com/jp/ipad-air/specs/ 「ブルー / パープル / スターライト / スペースグレイ」
--   iphone_models(2行) / macbook_models(12行) は既に「グレイ」で、ipad_models だけ11行が
--   「スペースグレー」になっていた。
UPDATE ipad_models SET color = replace(color, 'スペースグレー', 'スペースグレイ')
 WHERE color LIKE '%スペースグレー%';
--   対象: mini-5, mini-6, normal-9, air-4, air-5, pro11-2, pro11-3, pro11-4,
--         pro12-4, pro12-5, pro12-6


-- #############################################################################
-- ■ 未適用（要判断）
-- #############################################################################

-- --- 1. Apple Watch: sleep_tracking の意味が UI ラベルと合っていない ------------
--   現状 true なのは series9 / series10 / series11 / se3 / ultra2 / ultra3 のみ。
--   これは「睡眠時無呼吸の通知」の対応表であり、UIラベルの「睡眠トラッキング」
--   （watchOS 7 以降・Series 3 以降が全機種対応）とは一致しない。
--
--   [A] データをラベルに合わせる（全機種 true → 列の情報量が失われる）
-- UPDATE watch_models SET sleep_tracking = true
--  WHERE slug IN ('se','se2','series4','series5','series6','series7','series8','ultra');
--
--   [B] ラベルをデータに合わせる（推奨）
--       「睡眠トラッキング」→「睡眠時無呼吸の通知」に変更（列名は sleep_tracking のまま）
--       app/admin/field-definitions.ts:203
--       app/(public)/watch/watch-spec-table/components/SpecTable.tsx:174
--       app/(public)/watch/watch-spec-table/components/DualCompare.tsx:76
--       app/(public)/watch/recommend/components/RecommendDetailSection.tsx:233
--       app/(public)/watch/[slug]/components/CompareSelector.tsx:49
--       app/(public)/watch/[slug]/components/BasicSpecs.tsx:155

-- --- 2. Galaxy: support_until の算出基準が不統一 --------------------------------
--   S21=2026-01 / S22=2027-02 はグローバル発売月起算、
--   S23=2028-04 / S24=2031-04 は日本発売月起算になっている。
--   Samsung の公式コミットは「グローバル初回発売から N 年」だが、A系 / Z系は
--   日本発売日起算で入っているため、片方だけ直すと逆に不整合が増える。
--   全カテゴリの基準を決めてから一括で直すこと。
-- UPDATE galaxy_models SET support_until = '2028-02' WHERE slug IN ('galaxy-s23','galaxy-s23-ultra');
-- UPDATE galaxy_models SET support_until = '2031-01' WHERE slug IN ('galaxy-s24','galaxy-s24-ultra');

-- --- 3. iPhone 17世代の audio（オーディオ再生時間）が NULL の5行 ----------------
--   17 / 17 Pro / 17 Pro Max / Air / 17e。これは欠落ではなく、**Apple が17世代から
--   「オーディオ再生」の公表をやめた**ため（16世代までは記載あり）。
--     iPhone 16 https://www.apple.com/jp/iphone-16/specs/
--       「ビデオ再生 最大22時間 / ストリーミング 最大18時間 / オーディオ再生 最大80時間」
--     iPhone 17 https://www.apple.com/jp/iphone-17/specs/
--       「ビデオ再生 最大30時間 / ストリーミング 最大27時間」← オーディオ再生の項目なし
--   → データは現状（NULL）が正しい。表示側だけ要判断:
--     app/(public)/iphone/battery-compare/components/BatteryTable.tsx:136 が
--     `{m.audio || '-'}` で「-」を出しており、「非対応」に読める。
--     「非公表」等に変えるかはお好みで。

-- --- 4. AirPods: 発売日の細かな差異（発表日 / 店頭日の混在） ---------------------
--   ±数日の差で表示上の影響が小さく、どちらが正とも決めきれないため保留。
-- UPDATE airpods_models SET date = '2016/12/13' WHERE id = 1;
-- UPDATE airpods_models SET date = '2019/03/20' WHERE id IN (2,3);
-- UPDATE airpods_models SET date = '2020/12/15' WHERE id = 12;
--   id12 / id13 / id15（AirPods Max 各世代）は model（型番）が NULL のまま。


-- #############################################################################
-- ■ SQL では直せない「未入力」項目（要データ投入）
-- #############################################################################
--
-- galaxy_models (33行)
--   color              : 33/33 未入力 ← カラー展開が全機種で表示できない
--   battery_life       : 33/33 未入力
--   battery_life_saver : 33/33 未入力
--   advance / official : 33/33 未入力（Pixel は official 入力済み）
--   image              : 13/33 未入力
--   A25 5G (galaxy-a25-5g) のみ wired_charging / update_years / support_until が未入力
--   Z TriFold (galaxy-z-trifold) の model_number が未入力
--
-- pixel_models (17行)
--   advance : 17/17 未入力
--
-- ipad_models
--   pro11-6 / pro13-2 (M5) の battery と score_metal が未入力
--
-- 共通
--   price / last_ios / last_ipados / last_macos / last_android /
--   accessory_case / accessory_film が広範囲に未入力
--
-- 暫定値の疑い（発売前・ベンチ未実測）
--   galaxy: S26 と S26+ のベンチが完全一致 (3852 / 11738 / 3905605)
--           Z Fold8 と Z Fold8 Ultra の antutu_total が一致 (3382020)
--           Z Fold8 / Fold8 Ultra / Flip8 は 2026/8/7 発売で本日時点未発売
--   pixel : Pixel 10 と Pixel 10 Pro XL の antutu_cpu が完全一致 (760240)
