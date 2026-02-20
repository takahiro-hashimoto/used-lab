-- shopsテーブルにmacbook_urlカラムを追加
ALTER TABLE shops ADD COLUMN IF NOT EXISTS macbook_url TEXT;

-- 各ショップのMacBook販売ページURLを設定
UPDATE shops SET macbook_url = 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fpc%2Fnotepc%2Fmacbook' WHERE id = 1;
UPDATE shops SET macbook_url = 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch.x%3D0%26keyword%3D%26goods_code%3D%26store%3D%26tree%3D18010101%26genre_tree%3D%26capacity%3D%26price%3D%26flg%3D' WHERE id = 3;
UPDATE shops SET macbook_url = 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fmac%2Fselect_mac%3Ftop_topic_mac' WHERE id = 4;
UPDATE shops SET macbook_url = 'https://www.janpara.co.jp/sale/search/result/?OUTCLSCODE=4' WHERE id = 6;
UPDATE shops SET macbook_url = 'amzn.to/3YBqrRz' WHERE id = 7;
UPDATE shops SET macbook_url = 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FMacBook%2B%25E4%25B8%25AD%25E5%258F%25A4%2F100026%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9' WHERE id = 8;
UPDATE shops SET macbook_url = '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3726980&pid=890766235&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Fcid%3D39593%26used%3D1%26area%3D23%26astk%3D%26aq%3D%26oq%3D%26first%3D1%26ss_first%3D1%26ts%3D1723097794%26mcr%3D5682696ed04f745335acb4fa35e03462%26tab_ex%3Dcommerce%26sretry%3D1%26p%3DMacBook%26sc_i%3Dshopping-pc-web-result-item-h_srch-kwd' WHERE id = 9;
UPDATE shops SET macbook_url = 'https://www.apple.com/jp/shop/refurbished/mac/macbook-air-macbook-pro' WHERE id = 10;
UPDATE shops SET macbook_url = 'https://jp.mercari.com/search?afid=2902320790&keyword=MacBook+%E4%B8%AD%E5%8F%A4+' WHERE id = 11;
UPDATE shops SET macbook_url = 'https://fril.jp/s?query=macbook' WHERE id = 12;
