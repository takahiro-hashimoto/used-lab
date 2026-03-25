-- ============================================
-- RLS（Row Level Security）有効化 — 全テーブル
-- 方針: SELECT（読み取り）のみ公開許可
--       INSERT/UPDATE/DELETEはService Role Keyのみ
-- ============================================

-- モデルテーブル
ALTER TABLE iphone_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON iphone_models;
CREATE POLICY "Allow public read" ON iphone_models FOR SELECT USING (true);

ALTER TABLE ipad_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON ipad_models;
CREATE POLICY "Allow public read" ON ipad_models FOR SELECT USING (true);

ALTER TABLE macbook_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON macbook_models;
CREATE POLICY "Allow public read" ON macbook_models FOR SELECT USING (true);

ALTER TABLE watch_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON watch_models;
CREATE POLICY "Allow public read" ON watch_models FOR SELECT USING (true);

ALTER TABLE airpods_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON airpods_models;
CREATE POLICY "Allow public read" ON airpods_models FOR SELECT USING (true);

-- 価格ログテーブル
ALTER TABLE iphone_price_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON iphone_price_logs;
CREATE POLICY "Allow public read" ON iphone_price_logs FOR SELECT USING (true);

ALTER TABLE ipad_price_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON ipad_price_logs;
CREATE POLICY "Allow public read" ON ipad_price_logs FOR SELECT USING (true);

ALTER TABLE macbook_price_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON macbook_price_logs;
CREATE POLICY "Allow public read" ON macbook_price_logs FOR SELECT USING (true);

ALTER TABLE watch_price_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON watch_price_logs;
CREATE POLICY "Allow public read" ON watch_price_logs FOR SELECT USING (true);

ALTER TABLE airpods_price_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON airpods_price_logs;
CREATE POLICY "Allow public read" ON airpods_price_logs FOR SELECT USING (true);

-- iPad アクセサリ
ALTER TABLE ipad_accessories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON ipad_accessories;
CREATE POLICY "Allow public read" ON ipad_accessories FOR SELECT USING (true);

ALTER TABLE ipad_accessory_compatibility ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON ipad_accessory_compatibility;
CREATE POLICY "Allow public read" ON ipad_accessory_compatibility FOR SELECT USING (true);

-- MVNO
ALTER TABLE mvno_providers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON mvno_providers;
CREATE POLICY "Allow public read" ON mvno_providers FOR SELECT USING (true);

ALTER TABLE mvno_plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON mvno_plans;
CREATE POLICY "Allow public read" ON mvno_plans FOR SELECT USING (true);

-- ショップ
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON shops;
CREATE POLICY "Allow public read" ON shops FOR SELECT USING (true);

ALTER TABLE product_shop_links ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON product_shop_links;
CREATE POLICY "Allow public read" ON product_shop_links FOR SELECT USING (true);

-- レビュー
ALTER TABLE iphone_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON iphone_reviews;
CREATE POLICY "Allow public read" ON iphone_reviews FOR SELECT USING (true);

ALTER TABLE ipad_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON ipad_reviews;
CREATE POLICY "Allow public read" ON ipad_reviews FOR SELECT USING (true);
