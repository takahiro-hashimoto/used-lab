-- shops テーブルに galaxy_url カラムを追加
-- 各ショップの「中古Galaxy一覧」ページURL（トップ/デフォルトCTA・ショップ比較で使用）
ALTER TABLE shops ADD COLUMN IF NOT EXISTS galaxy_url TEXT;

-- 各ショップの中古Galaxy検索/一覧URLを設定（アフィリエイトリンクは運用側で差し替え）
-- イオシス（id=1）
UPDATE shops SET galaxy_url = 'https://iosys.co.jp/items/smartphone/galaxy' WHERE id = 1;
-- ゲオ（id=3）
UPDATE shops SET galaxy_url = 'https://ec.geo-online.co.jp/shop/goods/search.aspx?keyword=Galaxy' WHERE id = 3;
-- じゃんぱら（id=6）
UPDATE shops SET galaxy_url = 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=Galaxy&CHKOUTCOM=1' WHERE id = 6;
