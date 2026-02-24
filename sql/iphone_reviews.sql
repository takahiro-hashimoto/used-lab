-- ============================================================
-- iPhone Reviews テーブル作成 & データ投入
-- 外部レビュー記事のリンク集（model_slug で iphone_models と紐づけ）
-- ============================================================

-- テーブル作成
CREATE TABLE IF NOT EXISTS iphone_reviews (
  id          SERIAL PRIMARY KEY,
  model_slug  TEXT NOT NULL,
  url         TEXT NOT NULL,
  site_name   TEXT NOT NULL,
  title       TEXT NOT NULL
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_iphone_reviews_model_slug ON iphone_reviews (model_slug);

-- データ投入
INSERT INTO iphone_reviews (model_slug, url, site_name, title) VALUES
('15pro', 'https://ryuforest.com/iphone15pro-1year-review/', 'YOHAKU', '「iPhone15 Pro」を長期レビュー｜最高傑作のチタンモデルの評価は？'),
('16plus', 'https://tomo-web.jp/iphone-16-plus/', 'トモウェブ', 'iPhone 16 Plus買っちゃった｜購入の背景とその使い道'),
('16pro', 'https://lagomobi.jp/iphone-16-pro-review/', 'ラゴモビ', 'iPhone 16 Pro実機レビュー｜使って分かったメリット・デメリットを解説'),
('16e-se', 'https://chibimegane.jp/iphone-16e/', 'ちびめがねアンテナ', '【iPhone 16eレビュー】iPhone 16と徹底比較！どっちを買うべき？使ってわかったメリット・デメリット・評価');
