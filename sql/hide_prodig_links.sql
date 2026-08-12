-- プロディグ（shops.id = 5）へのリンクを全非表示にする
--
-- 経緯: 掲載をやめる判断。Amazon アフィリエイトと同じく「復活可能な形」で止める。
--
-- 仕組み: 比較表・ベンダーカードは shops.url / <category>_url が NULL の行を
-- 描画対象から外す（`s.url != null` で絞っている）。URL を落とすだけで
-- iPhone・iPad の掲載と、Galaxy/Pixel のショップページに出ていた
-- フォールバック（*_url が無いとき url に落ちる）も同時に消える。
--
-- product_shop_links の52行（iphone 30 / ipad 22）はどのページにも描画されて
-- いないため触っていない。ShopGrid に prodig を足すと復活してしまう点に注意。

-- ---- 非表示にする ----
UPDATE shops SET url = NULL, ipad_url = NULL WHERE shop_key = 'prodig';

-- ---- 元に戻す場合はこちら ----
-- UPDATE shops SET
--   url      = 'https://prodig-shop.com/collections/iphone?sort_by=best-selling&filter.v.availability=1&utm_source=used-lab',
--   ipad_url = 'https://prodig-shop.com/collections/ipad?sort_by=best-selling&filter.v.availability=1&utm_source=used-lab'
-- WHERE shop_key = 'prodig';
