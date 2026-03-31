-- 関連記事リンクのクリック数を記録するテーブル
-- source_path: クリック元ページのパス (例: /iphone/benchmark/)
-- dest_path: クリック先ページのパス (例: /iphone/recommend/)
-- click_count: 累積クリック数

CREATE TABLE IF NOT EXISTS related_link_clicks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_path TEXT NOT NULL,
  dest_path TEXT NOT NULL,
  click_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_path, dest_path)
);

-- インデックス: source_path でフィルタしてクリック数順にソートするクエリ用
CREATE INDEX idx_related_link_clicks_source ON related_link_clicks (source_path, click_count DESC);

-- RLS を有効化
ALTER TABLE related_link_clicks ENABLE ROW LEVEL SECURITY;

-- 誰でも読み取り可能（SSR で使用）
CREATE POLICY "Allow public read" ON related_link_clicks
  FOR SELECT USING (true);

-- 誰でもINSERT可能（anon key でクリック記録）
CREATE POLICY "Allow public insert" ON related_link_clicks
  FOR INSERT WITH CHECK (true);

-- 誰でもUPDATE可能（クリック数のインクリメント）
CREATE POLICY "Allow public update" ON related_link_clicks
  FOR UPDATE USING (true);

-- UPSERT 用の関数（クリック記録を原子的にインクリメント）
CREATE OR REPLACE FUNCTION increment_related_link_click(
  p_source_path TEXT,
  p_dest_path TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO related_link_clicks (source_path, dest_path, click_count, updated_at)
  VALUES (p_source_path, p_dest_path, 1, now())
  ON CONFLICT (source_path, dest_path)
  DO UPDATE SET
    click_count = related_link_clicks.click_count + 1,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
