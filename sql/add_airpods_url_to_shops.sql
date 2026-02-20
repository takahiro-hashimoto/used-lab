-- shopsテーブルにairpods_urlカラムを追加
ALTER TABLE shops ADD COLUMN IF NOT EXISTS airpods_url TEXT;

-- eイヤホンをshopsテーブルに追加（id=16）
INSERT INTO shops (id, shop_key, shop, image, text, price, stock, support, extension, extension_name, extension_link, photo, battery, block, postage, license, url, airpods_url)
VALUES (
  16,
  'eearphone',
  'eイヤホン',
  'e-earphone-thumb.jpg',
  '<p>全国に5店舗を展開するイヤホン・ヘッドホン専門店。</p><p>中古AirPodsの在庫が豊富で価格も比較的安く設定されています。</p><p>片耳やケースのみの販売もあり、紛失時のパーツ購入にも便利です。</p>',
  '◎',
  '◎',
  '最大3ヶ月',
  '×',
  NULL,
  NULL,
  '◯',
  NULL,
  NULL,
  '660円',
  '大阪府公安委員会第621111901157号',
  NULL,
  'https://px.a8.net/svt/ejp?a8mat=3T8VI7+EX11Z6+55QO+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.e-earphone.jp%2Fcollections%2Fused-airpods'
)
ON CONFLICT (id) DO UPDATE SET
  shop_key = EXCLUDED.shop_key,
  shop = EXCLUDED.shop,
  image = EXCLUDED.image,
  text = EXCLUDED.text,
  price = EXCLUDED.price,
  stock = EXCLUDED.stock,
  support = EXCLUDED.support,
  extension = EXCLUDED.extension,
  photo = EXCLUDED.photo,
  postage = EXCLUDED.postage,
  license = EXCLUDED.license,
  airpods_url = EXCLUDED.airpods_url;

-- 各ショップのAirPods販売ページURLを設定
UPDATE shops SET airpods_url = 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Faudio%2Fairpods' WHERE id = 1;
UPDATE shops SET airpods_url = 'https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ER76+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fgoods%2Fsearch.aspx%3Fsearch%3Dx%26keyword%3DAirPods' WHERE id = 3;
UPDATE shops SET airpods_url = 'https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fipad%2Fipad_linklist' WHERE id = 4;
UPDATE shops SET airpods_url = 'https://www.janpara.co.jp/sale/search/result/?SSHPCODE=&OUTCLSCODE=&KEYWORDS=AirPods&x=0&y=0&CHKOUTCOM=1' WHERE id = 6;
UPDATE shops SET airpods_url = 'https://amzn.to/4gvWhEv' WHERE id = 7;
UPDATE shops SET airpods_url = 'https://hb.afl.rakuten.co.jp/hgc/146d79d6.e1ce9058.146d79d7.d4b077e7/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FAirPods%2B%25E4%25B8%25AD%25E5%258F%25A4%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9' WHERE id = 8;
UPDATE shops SET airpods_url = '//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=890945362&vc_url=https%3A%2F%2Fshopping.yahoo.co.jp%2Fsearch%3Ffirst%3D1%26tab_ex%3Dcommerce%26fr%3Dshp-prop%26mcr%3Dee80843d5b3f5b273e987d45c8f5c0c7%26ts%3D1738966396%26sretry%3D1%26p%3DAirPods%26sc_i%3Dshopping-pc-web-top--h_srch-kwd%26used%3D1%26area%3D13' WHERE id = 9;
UPDATE shops SET airpods_url = 'https://www.apple.com/jp/shop/refurbished/ipad' WHERE id = 10;
UPDATE shops SET airpods_url = 'https://jp.mercari.com/search?afid=2902320790&search_condition_id=1cx0zHGsdQWlyUG9kc-OAgOacrOS9kw' WHERE id = 11;
UPDATE shops SET airpods_url = 'https://fril.jp/s?query=AirPods' WHERE id = 12;
