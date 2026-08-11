-- ============================================================
-- mac_models: インターフェース列の分解（v2）
--
-- port の長文を1セルに詰めると機種間の違いが読めないため、
-- 「どのポートが何基あるか」だけを列として持たせる。
-- 前面/背面の区別は比較の役に立たないので持たない。
--
--   thunderbolt      … Thunderbolt の本数
--   thunderbolt_gen  … その規格（TB4 / TB5 など）
--   usb_c            … Thunderbolt 以外の USB-C の本数。NULL = なし
--   usb_a            … USB-A の本数。NULL = なし
--   headphone        … 3.5mm ヘッドフォンジャックの有無
--
-- HDMI（hdmi） / SDXC（slot） / Ethernet（ethernet）は既存列をそのまま使う。
-- port（全文）は残すが、表示には使わない。
--
-- このファイルは何度流しても同じ結果になる（冪等）。
-- Supabase の SQL Editor に「ファイル全体」を貼って実行すること。
-- ============================================================

ALTER TABLE mac_models ADD COLUMN IF NOT EXISTS thunderbolt     TEXT;
ALTER TABLE mac_models ADD COLUMN IF NOT EXISTS thunderbolt_gen TEXT;
ALTER TABLE mac_models ADD COLUMN IF NOT EXISTS usb_c           TEXT;
ALTER TABLE mac_models ADD COLUMN IF NOT EXISTS usb_a           TEXT;
ALTER TABLE mac_models ADD COLUMN IF NOT EXISTS headphone       BOOLEAN NOT NULL DEFAULT FALSE;

-- v1 で作った前面ポート列は廃止（前面/背面の区別は比較に使わない）
ALTER TABLE mac_models DROP COLUMN IF EXISTS front_port;

COMMENT ON COLUMN mac_models.thunderbolt     IS 'Thunderbolt の本数。例 ''3基''';
COMMENT ON COLUMN mac_models.thunderbolt_gen IS 'Thunderbolt の規格。例 ''Thunderbolt 5''';
COMMENT ON COLUMN mac_models.usb_c           IS 'Thunderbolt 以外の USB-C の本数。NULL = なし';
COMMENT ON COLUMN mac_models.usb_a           IS 'USB-A の本数。NULL = なし';
COMMENT ON COLUMN mac_models.headphone       IS '3.5mm ヘッドフォンジャックの有無';

-- ---- iMac ----------------------------------------------------
-- 24インチは全世代 USB-A なし。
-- 2021 / 2023 の「4ポートモデル」で増えるのは USB 3（Type-C）なので usb_c 側に入れる。
-- 2024 は 4ポートモデルだと Thunderbolt 自体が4基になり、規格も上がる。

UPDATE mac_models SET
  thunderbolt = '2基', thunderbolt_gen = 'Thunderbolt / USB 4',
  usb_c = '4ポートモデルのみ2基', usb_a = NULL, headphone = TRUE
WHERE slug = 'imac-24-2021';

UPDATE mac_models SET
  thunderbolt = '2基', thunderbolt_gen = 'Thunderbolt / USB 4',
  usb_c = '4ポートモデルのみ2基', usb_a = NULL, headphone = TRUE
WHERE slug = 'imac-24-2023';

UPDATE mac_models SET
  thunderbolt = '2基（4ポートモデルは4基）',
  thunderbolt_gen = 'Thunderbolt 4（2ポートモデルはThunderbolt / USB 4）',
  usb_c = NULL, usb_a = NULL, headphone = TRUE
WHERE slug = 'imac-24-2024';

-- ---- Mac mini ------------------------------------------------
-- 2020 / 2023 は USB-A × 2 あり。2024 で USB-A が消えて USB-C × 2 に置き換わった。

UPDATE mac_models SET
  thunderbolt = '2基', thunderbolt_gen = 'Thunderbolt / USB 4',
  usb_c = NULL, usb_a = '2基', headphone = TRUE
WHERE slug = 'mac-mini-2020';

UPDATE mac_models SET
  thunderbolt = '2基（M2 Proは4基）', thunderbolt_gen = 'Thunderbolt 4',
  usb_c = NULL, usb_a = '2基', headphone = TRUE
WHERE slug = 'mac-mini-2023';

UPDATE mac_models SET
  thunderbolt = '3基', thunderbolt_gen = 'Thunderbolt 4（M4 ProはThunderbolt 5）',
  usb_c = '2基', usb_a = NULL, headphone = TRUE
WHERE slug = 'mac-mini-2024';

-- ---- Mac Studio ----------------------------------------------
-- Ultra 構成では USB-C × 2 が Thunderbolt × 2 に置き換わるため、
-- Thunderbolt が2基増えて USB-C が無くなる。

UPDATE mac_models SET
  thunderbolt = '4基（M1 Ultraは6基）', thunderbolt_gen = 'Thunderbolt 4',
  usb_c = '2基（M1 Ultraはなし）', usb_a = '2基', headphone = TRUE
WHERE slug = 'mac-studio-2022';

UPDATE mac_models SET
  thunderbolt = '4基（M2 Ultraは6基）', thunderbolt_gen = 'Thunderbolt 4',
  usb_c = '2基（M2 Ultraはなし）', usb_a = '2基', headphone = TRUE
WHERE slug = 'mac-studio-2023';

UPDATE mac_models SET
  thunderbolt = '4基（M3 Ultraは6基）', thunderbolt_gen = 'Thunderbolt 5',
  usb_c = '2基（M3 Ultraはなし）', usb_a = '2基', headphone = TRUE
WHERE slug = 'mac-studio-2025';

-- 確認用
SELECT slug, thunderbolt, thunderbolt_gen, usb_c, usb_a, headphone, hdmi, slot
FROM mac_models ORDER BY date;
