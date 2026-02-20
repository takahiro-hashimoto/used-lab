-- shopsテーブルにwatch_urlカラムを追加
ALTER TABLE shops ADD COLUMN IF NOT EXISTS watch_url TEXT;

-- 各ショップのApple Watch販売ページURLを設定
-- CSVのid→shopsテーブルのidマッピング: CSV1→1(イオシス), CSV2→3(ゲオ), CSV3→4(リコレ), CSV4→6(じゃんぱら), CSV5→7(Amazon), CSV6→8(楽天), CSV7→9(ヤフー), CSV8→10(Apple), CSV9→11(メルカリ), CSV10→12(ラクマ), CSV13→5(プロディグ), CSV6→2(にこスマ)

UPDATE shops SET watch_url = 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fwearable%2Fapple%3Fnot%3Dpencil' WHERE id = 1;
UPDATE shops SET watch_url = 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26tree%3D1214' WHERE id = 3;
UPDATE shops SET watch_url = 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fwtc%3Fcategories1%255B%255D%3Dwtc%26categories2%255B%255D%3Dapple-watch' WHERE id = 4;
UPDATE shops SET watch_url = 'https://www.janpara.co.jp/sale/search/result/?KEYWORDS=apple+watch&ORDER=1' WHERE id = 6;
UPDATE shops SET watch_url = 'amzn.to/4djok9E' WHERE id = 7;
UPDATE shops SET watch_url = 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2Fapple%2Bwatch%2B%25E4%25B8%25AD%25E5%258F%25A4%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9' WHERE id = 8;
UPDATE shops SET watch_url = '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3723571&pid=890770587&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fused%3D1%26area%3D23%26astk%3D%26aq%3D%26oq%3D%26first%3D1%26ss_first%3D1%26ts%3D1723435496%26mcr%3Dc252ed30bc22feb893ff639c0d54f036%26tab_ex%3Dcommerce%26sretry%3D1%26p%3Dapple%2Bwatch%26sc_i%3Dshopping-pc-web-result-item-h_srch-kwd' WHERE id = 9;
UPDATE shops SET watch_url = 'https://www.apple.com/jp/shop/refurbished/watch' WHERE id = 10;
UPDATE shops SET watch_url = 'https://jp.mercari.com/search?afid=2902320790&category_id=3675&keyword=apple+watch+%E6%9C%AC%E4%BD%93' WHERE id = 11;
UPDATE shops SET watch_url = 'https://fril.jp/s?brand_id=5294&query=apple+watch' WHERE id = 12;
