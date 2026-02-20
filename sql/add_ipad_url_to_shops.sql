-- shopsテーブルにipad_urlカラムを追加
ALTER TABLE shops ADD COLUMN IF NOT EXISTS ipad_url TEXT;

-- 各ショップのiPad販売ページURLを設定
UPDATE shops SET ipad_url = 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Ftablet%2Fios%2Fipad' WHERE id = 1;
UPDATE shops SET ipad_url = 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fc%2Fc1060%2F' WHERE id = 3;
UPDATE shops SET ipad_url = 'https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Ftablet-top' WHERE id = 2;
UPDATE shops SET ipad_url = 'https://www.janpara.co.jp/sale/search/result/?SSHPCODE=&OUTCLSCODE=79&KEYWORDS=iPad&x=0&y=0&CHKOUTCOM=1' WHERE id = 6;
UPDATE shops SET ipad_url = 'amzn.to/3LMSAO3' WHERE id = 7;
UPDATE shops SET ipad_url = 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fipad%2Fipad_linklist' WHERE id = 4;
UPDATE shops SET ipad_url = 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E4%25B8%25AD%25E5%258F%25A4%2Bipad%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9' WHERE id = 8;
UPDATE shops SET ipad_url = '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3726980&pid=890747973&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Ffirst%3D1%26tab_ex%3Dcommerce%26fr%3Dshp-prop%26mcr%3D7b09e5694f558ffbb7156f1902969000%26ts%3D1722559671%26sretry%3D1%26p%3D%25E4%25B8%25AD%25E5%258F%25A4iPad%26sc_i%3Dshopping-pc-web-top--h_srch-kwd%26area%3D23' WHERE id = 9;
UPDATE shops SET ipad_url = 'https://www.apple.com/jp/shop/refurbished/ipad' WHERE id = 10;
UPDATE shops SET ipad_url = 'https://jp.mercari.com/search?afid=2902320790&keyword=iPad+%E6%9C%AC%E4%BD%93' WHERE id = 11;
UPDATE shops SET ipad_url = 'https://fril.jp/s?query=ipad' WHERE id = 12;
UPDATE shops SET ipad_url = 'https://www.dai-one.jp/tablet/?features_hash=28-136' WHERE id = 15;
UPDATE shops SET ipad_url = 'https://prodig-shop.com/collections/ipad?sort_by=best-selling&filter.v.availability=1&utm_source=used-lab' WHERE id = 5;
