-- ============================================
-- サイト共通設定テーブル（単一行 / id = 1 固定）
-- 追従CTA（StickyCta）の出し分けに使用
--   sticky_cta_mode: 'normal'  = 通常追従ボタン（イオシスCTA・スマホのみ）
--                    'special' = 特殊追従ボタン（Amazonセール等・PC/スマホ両方）
-- 方針: SELECT は公開許可 / 書き込みは Service Role Key のみ
-- ============================================

CREATE TABLE IF NOT EXISTS site_config (
  id                   smallint     PRIMARY KEY DEFAULT 1,
  sticky_cta_mode      text         NOT NULL DEFAULT 'normal',
  special_cta_headline text,
  special_cta_label    text,
  special_cta_url      text,
  updated_at           timestamptz  NOT NULL DEFAULT now(),
  CONSTRAINT site_config_singleton CHECK (id = 1),
  CONSTRAINT site_config_mode_valid CHECK (sticky_cta_mode IN ('normal', 'special'))
);

-- 初期行（Amazonプライムデーの特殊バナーで投入・すぐ有効化）
INSERT INTO site_config (id, sticky_cta_mode, special_cta_headline, special_cta_label, special_cta_url)
VALUES (
  1,
  'special',
  'Amazonプライムデー開催中！',
  'セール対象のApple製品を見る',
  'https://amzn.to/4bnWzxt'
)
ON CONFLICT (id) DO NOTHING;

-- RLS: 公開読み取りのみ許可
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON site_config;
CREATE POLICY "Allow public read" ON site_config FOR SELECT USING (true);
