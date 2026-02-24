-- ipad_models テーブルから pencil/keyboard カラムを削除
-- ※ ipad_accessories + ipad_accessory_compatibility テーブルに移行済み
ALTER TABLE ipad_models DROP COLUMN IF EXISTS pencil;
ALTER TABLE ipad_models DROP COLUMN IF EXISTS keyboard;
