-- ============================================
-- RLS（Row Level Security）有効化
-- 対象: UNRESTRICTED状態の9テーブル
-- 方針: SELECT（読み取り）のみ公開許可
--       INSERT/UPDATE/DELETEはService Roleのみ
-- ============================================

-- 1. airpods_price_logs
ALTER TABLE airpods_price_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON airpods_price_logs
  FOR SELECT USING (true);

-- 2. ipad_accessories
ALTER TABLE ipad_accessories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON ipad_accessories
  FOR SELECT USING (true);

-- 3. ipad_accessory_compatibility
ALTER TABLE ipad_accessory_compatibility ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON ipad_accessory_compatibility
  FOR SELECT USING (true);

-- 4. ipad_price_logs
ALTER TABLE ipad_price_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON ipad_price_logs
  FOR SELECT USING (true);

-- 5. ipad_reviews
ALTER TABLE ipad_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON ipad_reviews
  FOR SELECT USING (true);

-- 6. iphone_reviews
ALTER TABLE iphone_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON iphone_reviews
  FOR SELECT USING (true);

-- 7. mvno_plans
ALTER TABLE mvno_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON mvno_plans
  FOR SELECT USING (true);

-- 8. mvno_providers
ALTER TABLE mvno_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON mvno_providers
  FOR SELECT USING (true);

-- 9. watch_price_logs
ALTER TABLE watch_price_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON watch_price_logs
  FOR SELECT USING (true);
