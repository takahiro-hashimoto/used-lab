-- ============================================================
-- 非公開モデルの不足リンク・アクセサリ対応を追加
--   iPad Air 11/13 第8世代 (M4) : ipad_models.id = 23, 24
--   AirPods Pro 3 / AirPods Max 2 : airpods_models.id = 14, 15
-- a8mat は既存の同一プログラムのものを流用（リンク先のみ差し替え）
-- ============================================================

-- ---------- iPad Air 11 第8世代 (id=23) ----------
-- にこスマ（※現時点で M4 Air の在庫なし。cb_models は M2/M3 の命名規則からの推定）
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES
('ipad', 23, 2, 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fipad%3Fcb_models%3Dipad-air-11-inch-m4'),
-- ゲオ（tree=100550 = iPad Air 11インチ M4／在庫確認済み）
('ipad', 23, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ER76+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26tree%3D100550');

-- ---------- iPad Air 13 第8世代 (id=24) ----------
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES
('ipad', 24, 2, 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fipad%3Fcb_models%3Dipad-air-13-inch-m4'),
-- ゲオ（tree=100548 = iPad Air 13インチ M4／在庫確認済み）
('ipad', 24, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ER76+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26tree%3D100548');

-- ---------- AirPods Pro 3 (id=14) ----------
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES
-- イオシス（MFHP4J/A 専用ページ／在庫確認済み）
('airpods', 14, 1, 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Faudio%2Fearphone_headphone%2Fairpods_pro3_mfhp4j_a'),
-- ゲオ（tree=126049 = AirPods Pro 第3世代／在庫確認済み）
('airpods', 14, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26tree%3D126049'),
-- eイヤホン（型番検索／在庫確認済み）
('airpods', 14, 16, 'https://px.a8.net/svt/ejp?a8mat=44YTVF+F8CAGY+55QO+HUD03&a8ejpredirect=https%3A%2F%2Fwww.e-earphone.jp%2Fsearch%3Ftype%3Dproduct%26options%255Bprefix%255D%3Dlast%26q%3DMFHP4J%252FA');

-- ---------- AirPods Max 2 (id=15) ----------
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES
-- イオシス（AirPods Max 2 専用ページ／在庫確認済み）
('airpods', 15, 1, 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Faudio%2Fearphone_headphone%2Fairpods_max_2'),
-- ゲオ（tree=126048 = AirPods Max 第2世代／在庫確認済み）
('airpods', 15, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26tree%3D126048'),
-- eイヤホン（"AirPods Max 2" 検索＋中古フィルタ／在庫確認済み）
('airpods', 15, 16, 'https://px.a8.net/svt/ejp?a8mat=44YTVF+F8CAGY+55QO+HUD03&a8ejpredirect=https%3A%2F%2Fwww.e-earphone.jp%2Fsearch%3Ftype%3Dproduct%26options%255Bprefix%255D%3Dlast%26q%3DAirPods%2BMax%2B2%26filter.p.product_type%3D%25E4%25B8%25AD%25E5%258F%25A4');

-- ============================================================
-- iPad Air 第8世代のアクセサリ対応（Apple 技術仕様で確認）
--   Apple Pencil Pro / Apple Pencil (USB-C) に対応
--   Magic Keyboard は M3 Air 用（MDFV4J/A・MDFW4J/A）と共通
--   ※Apple Store の商品名も「iPad Air（M4）用」に更新済み
-- ============================================================
INSERT INTO ipad_accessory_compatibility (ipad_model_id, accessory_id) VALUES
(23, 3),   -- Apple Pencil（USB-C）
(23, 4),   -- Apple Pencil Pro
(23, 22),  -- Magic Keyboard（ホワイト・11インチ MDFV4J/A）
(24, 3),
(24, 4),
(24, 23);  -- Magic Keyboard（ホワイト・13インチ MDFW4J/A）

-- 併せてアクセサリ名の世代表記を M3/M4 共通に更新
UPDATE ipad_accessories SET name = 'Magic Keyboard（ホワイト・11インチ M3/M4 Air）' WHERE id = 22;
UPDATE ipad_accessories SET name = 'Magic Keyboard（ホワイト・13インチ M3/M4 Air）' WHERE id = 23;
