-- ============================================================
-- Galaxy 非公開4機種（Z Fold8 / Z Flip8 / Z Fold8 Ultra / Z TriFold）の公開準備
--
-- 実行順:
--   [手作業] public/images/galaxy/ に下記5ファイルを追加してデプロイ
--            galaxy-z-fold8.webp / galaxy-z-flip8.webp /
--            galaxy-z-fold8-ultra.webp / galaxy-z-trifold.webp /
--            galaxy-z-flip7.webp ← 公開中なのに画像が無い既存不具合。今回一緒に直す
--   STEP 1  ショップリンクを追加（Amazon shop_id=7 は登録済みのため対象外）
--   STEP 2  image 列を設定
--   STEP 3  show=1 で公開
--
-- URL は Z Fold7 / Z Flip7 の実リンクをテンプレートに生成。
-- イオシスの機種ページ4件は 2026-08-17 時点で実在を確認済み（HTTP 200）。
-- 公開後は価格取得cron（show=1のみ対象）が自動で再開する。
-- ============================================================

-- STEP 1: ショップリンク
INSERT INTO product_shop_links (product_type, product_id, shop_id, url) VALUES
  ('galaxy', 34, 1, 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fgalaxy%2Fgalaxy_z_fold8'),
  ('galaxy', 34, 2, 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fandroid%3Fcb_models%3Dgalaxy-z-fold8'),
  ('galaxy', 34, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26keyword%3DGalaxy%2520Z%2520Fold8%26flg%3Dgkb02'),
  ('galaxy', 34, 4, 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fitem%3Fcategories1%255B%255D%3Dsmp%26series_name_class%255B%255D%3DSAMSUNG%2520Galaxy%2520Z%2520Fold%26q%3DGalaxy%2520Z%2520Fold8'),
  ('galaxy', 34, 6, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2520Z%2520Fold8%2F%3Fsid%3D394812&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 34, 8, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2BZ%2BFold8%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 34, 9, '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=891466638&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fp%3DGalaxy%2BZ%2BFold8%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC'),
  ('galaxy', 36, 1, 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fgalaxy%2Fgalaxy_z_flip8'),
  ('galaxy', 36, 2, 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fandroid%3Fcb_models%3Dgalaxy-z-flip8'),
  ('galaxy', 36, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26keyword%3DGalaxy%2520Z%2520Flip8%26flg%3Dgkb02'),
  ('galaxy', 36, 4, 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fitem%3Fcategories1%255B%255D%3Dsmp%26series_name_class%255B%255D%3DSAMSUNG%2520Galaxy%2520Z%2520Flip%26q%3DGalaxy%2520Z%2520Flip8'),
  ('galaxy', 36, 6, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2520Z%2520Flip8%2F%3Fsid%3D394812&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 36, 8, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2BZ%2BFlip8%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 36, 9, '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=891466638&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fp%3DGalaxy%2BZ%2BFlip8%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC'),
  ('galaxy', 35, 1, 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fgalaxy%2Fgalaxy_z_fold8_ultra'),
  ('galaxy', 35, 2, 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fandroid%3Fcb_models%3Dgalaxy-z-fold8-ultra'),
  ('galaxy', 35, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26keyword%3DGalaxy%2520Z%2520Fold8%2520Ultra%26flg%3Dgkb02'),
  ('galaxy', 35, 4, 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fitem%3Fcategories1%255B%255D%3Dsmp%26series_name_class%255B%255D%3DSAMSUNG%2520Galaxy%2520Z%2520Fold%26q%3DGalaxy%2520Z%2520Fold8%2520Ultra'),
  ('galaxy', 35, 6, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2520Z%2520Fold8%2520Ultra%2F%3Fsid%3D394812&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 35, 8, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2BZ%2BFold8%2BUltra%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 35, 9, '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=891466638&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fp%3DGalaxy%2BZ%2BFold8%2BUltra%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC'),
  ('galaxy', 33, 1, 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fgalaxy%2Fgalaxy_z_trifold'),
  ('galaxy', 33, 2, 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fandroid%3Fcb_models%3Dgalaxy-z-trifold'),
  ('galaxy', 33, 3, 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26keyword%3DGalaxy%2520Z%2520TriFold%26flg%3Dgkb02'),
  ('galaxy', 33, 4, 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fitem%3Fcategories1%255B%255D%3Dsmp%26series_name_class%255B%255D%3DSAMSUNG%2520Galaxy%2520Z%2520Fold%26q%3DGalaxy%2520Z%2520TriFold'),
  ('galaxy', 33, 6, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2520Z%2520TriFold%2F%3Fsid%3D394812&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 33, 8, 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FGalaxy%2BZ%2BTriFold%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9'),
  ('galaxy', 33, 9, '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=891466638&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fp%3DGalaxy%2BZ%2BTriFold%2BSIM%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC');

-- STEP 2: 画像（ファイルをデプロイしてから実行）
UPDATE galaxy_models SET image = 'galaxy-z-fold8.webp'       WHERE slug = 'galaxy-z-fold8';
UPDATE galaxy_models SET image = 'galaxy-z-flip8.webp'       WHERE slug = 'galaxy-z-flip8';
UPDATE galaxy_models SET image = 'galaxy-z-fold8-ultra.webp' WHERE slug = 'galaxy-z-fold8-ultra';
UPDATE galaxy_models SET image = 'galaxy-z-trifold.webp'     WHERE slug = 'galaxy-z-trifold';
-- 既存不具合の修正（公開中の Z Flip7 に画像が無い）
UPDATE galaxy_models SET image = 'galaxy-z-flip7.webp'       WHERE slug = 'galaxy-z-flip7';

-- STEP 3: 公開（画像とリンクが揃ってから）
-- UPDATE galaxy_models SET show = 1
--   WHERE slug IN ('galaxy-z-fold8', 'galaxy-z-flip8', 'galaxy-z-fold8-ultra', 'galaxy-z-trifold');
-- 公開後は管理画面の purgeTag で galaxy 系タグを無効化するか、再デプロイすること
