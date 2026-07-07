-- ============================================
-- site_config: 特殊追従バナーの表示期間を追加
--   special_start_at: 開始日時（NULL=開始制限なし）
--   special_end_at  : 終了日時（NULL=終了制限なし）
-- どちらも timestamptz。期間外になったら自動的に通常バナーへ戻る。
-- ============================================

ALTER TABLE site_config ADD COLUMN IF NOT EXISTS special_start_at timestamptz;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS special_end_at   timestamptz;
