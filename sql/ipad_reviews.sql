-- ============================================================
-- iPad Reviews テーブル作成 & データ投入
-- 外部レビュー記事のリンク集（model_slug で ipad_models と紐づけ）
-- ============================================================

-- テーブル作成
CREATE TABLE IF NOT EXISTS ipad_reviews (
  id          SERIAL PRIMARY KEY,
  model_slug  TEXT NOT NULL,
  url         TEXT NOT NULL,
  site_name   TEXT NOT NULL,
  title       TEXT NOT NULL
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_ipad_reviews_model_slug ON ipad_reviews (model_slug);

-- データ投入
INSERT INTO ipad_reviews (model_slug, url, site_name, title) VALUES
('normal-10', 'https://applenurture.com/ipad-10-review/', 'AppleNurture', '【2025年】iPad 第10世代の評価と使い勝手を徹底レビュー！'),
('mini-6', 'https://used-lab.jp/iphone/ipad-mini-6-review/', 'ユーズドラボ', 'iPad mini 6 レビュー！3年間使用してきて分かったメリット・デメリットまとめ'),
('mini-7', 'https://lifecreate5.com/2024/11/24/%E6%96%B0%E5%9E%8Bipad-minia17-pro1%E3%83%B6%E6%9C%88%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%81%91%E3%81%A3%E3%81%8D%E3%82%87%E3%81%8F%E3%81%93%E3%82%8C%E3%81%AF%E8%B2%B7/', 'クラフトデイズ', '新型iPad mini（A17 Pro）1ヶ月レビュー｜けっきょくこれは買うべきiPad？毎日使ってわかったこと'),
('air-6-13', 'https://yotaniki.com/ipad-air-13inch-review/', 'よたログ', '【13インチで動画編集に最適】iPad Air 13インチを実機レビュー｜クリエイティブ作業におすすめ'),
('pro11-5', 'https://used-lab.jp/iphone/review-ipad-pro-11-m4/', 'ユーズドラボ', 'iPad Pro 11インチ M4モデルを買って感じたメリット・デメリットまとめ');
