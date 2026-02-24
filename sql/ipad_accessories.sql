-- ============================================
-- iPad アクセサリ正規化テーブル
-- ============================================

-- 1. アクセサリマスタテーブル
CREATE TABLE ipad_accessories (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('pencil', 'keyboard')),
  image         TEXT,
  model_number  TEXT,
  release_date  DATE,
  iosys_url     TEXT,
  amazon_url    TEXT,
  mercari_url   TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- 2. iPad × アクセサリ 対応関係テーブル
CREATE TABLE ipad_accessory_compatibility (
  id            SERIAL PRIMARY KEY,
  ipad_model_id INTEGER NOT NULL REFERENCES ipad_models(id) ON DELETE CASCADE,
  accessory_id  INTEGER NOT NULL REFERENCES ipad_accessories(id) ON DELETE CASCADE,
  UNIQUE(ipad_model_id, accessory_id)
);

-- ============================================
-- アクセサリマスタデータ (23レコード)
-- ============================================
INSERT INTO ipad_accessories (id, name, type, image, model_number, release_date, iosys_url, amazon_url, mercari_url, display_order) VALUES
-- Apple Pencil (type: pencil)
(1,  'Apple Pencil（第1世代）',     'pencil', 'mk0c2ja.jpg',   'MK0C2J/A',   '2015-11-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%3Fgroup%3DPencil%2B%25E7%25AC%25AC1%25E4%25B8%2596%25E4%25BB%25A3%2BMK0C2J%2FA%26l%3Dl', 'https://amzn.to/4iUyZd1', 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGsdYXBwbGUgcGVuY2lsIOesrDHkuJbku6M', 1),
(2,  'Apple Pencil（第2世代）',     'pencil', 'mu8f2ja.jpg',   'MU8F2J/A',   '2018-11-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%3Fgroup%3DPencil%2B%25E7%25AC%25AC2%25E4%25B8%2596%25E4%25BB%25A3%2BMU8F2J%2FA%26l%3Dl', 'https://amzn.to/4kohK5L', 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGsdYXBwbGUgcGVuY2lsIOesrDLkuJbku6M', 2),
(3,  'Apple Pencil（USB-C）',       'pencil', 'muwa3zaa.jpg',  'MUWA3ZA/A',  '2023-11-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphonegoods%2Ftouchpen%2Fpencil_muwa3za_a', 'https://amzn.to/4i6zktt', 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGsdYXBwbGUgcGVuY2lsIFVTQi1D', 3),
(4,  'Apple Pencil Pro',            'pencil', 'mx2d3zaa.jpg',  'MX2D3ZA/A',  '2024-05-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Ftouchpen%2Fpencil_pro_mx2d3ch_a', 'https://amzn.to/3FAoHAM', 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGNpZB05Njgcax1hcHBsZSBwZW5jaWwgcHJv', 4),

-- Keyboards (type: keyboard)
(10, 'Smart Keyboard',              'keyboard', 'mx3l2ja.jpg',  'MX3L2J/A',   '2020-05-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%3Fq%3DSmart%2BKeyboard%2BMX3L2J%2FA%2BA1829%26genre%3Dkeyboard%26srsltid%3DAfmBOooRd2QfOr6nesxZUto1V2J15qIPdaUb4PLVFCKsXuDKz4KV3ni7', 'https://amzn.to/4ha8P4Y', 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGNpZB05Njgcax1NWDNMMkovQQ', 10),
(11, 'Magic Keyboard Folio',        'keyboard', 'mqdp3ja.jpg',  'MQDP3J/A',   '2022-10-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_10.9%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%2581_%25E7%2594%25A8_magic_keyboard_folio_-jis_mqdp3j_a', 'https://amzn.to/3Rb3Fej', 'https://jp.mercari.com/search?srsltid=AfmBOoquUMi-rDQAzNONAMrDEuv_-0gu3v68RGG0FRbd2oR7drt-XuT_&search_condition_id=1cx0zHGNpZB05Njgcax1NUURQM0ovQQ', 11),
(12, 'Smart Keyboard Folio（12.9インチ）', 'keyboard', 'mxnl2ja.jpg', 'MXNL2J/A', '2020-03-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fcase%2F12.9%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%2581ipad_pro_%25E7%2594%25A8_smart_keyboard_folio_-jis_mxnl2j_a%3Fsrsltid%3DAfmBOorbqsCaHA5tGCG5ME9qFdcOHiTKKPF3NWIDgKo9KUNy5iG64nJd', 'https://amzn.to/3DK3V0O', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXhuazFqL2E', 12),
(13, 'Smart Keyboard Folio（11インチ）',   'keyboard', 'mxnk2ja.jpg', 'MXNK2J/A', '2020-03-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2F11%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%2581ipad_pro_%25E7%2594%25A8_smart_keyboard_folio_-jis_mxnk2j_a%3Fsrsltid%3DAfmBOopFIljB1Sj-_YoIgEtFG3AaqwYGmCJ-Hmn_67DO9jdaJEUbWBjy', 'https://amzn.to/4hdH8Iv', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXhuazJqL2E', 13),
(14, 'Magic Keyboard（ブラック・11インチ旧）', 'keyboard', 'mxqt2ja.jpg', 'MXQT2J/A', '2020-04-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/4if2tCQ', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXhxdDJqYQ', 14),
(15, 'Magic Keyboard（ホワイト・11インチ旧）', 'keyboard', 'mjqj3ja.jpg', 'MJQJ3J/A', '2022-05-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/3DTPMy3', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbWpxajNqL2E', 15),
(16, 'Magic Keyboard（ブラック・12.9インチ）', 'keyboard', 'mjqk3ja.jpg', 'MJQK3JA',  '2022-01-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/3FxF40Q', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTUpRSzNKQQ', 16),
(17, 'Magic Keyboard（ホワイト・12.9インチ）', 'keyboard', 'mjql3ja.jpg', 'MJQL3J/A', '2022-01-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/43Q0H6t', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbWpxazNsbC9h', 17),
(18, 'Magic Keyboard（ホワイト・11インチ M4）', 'keyboard', 'mwr03ja.jpg', 'MWR03J/A', '2024-05-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/43Q0EaN', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXdyMDNqL2E', 18),
(19, 'Magic Keyboard（ブラック・11インチ M4）', 'keyboard', 'mwr23ja.jpg', 'MWR23J/A', '2024-05-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/4kReboC', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdbXdyMjNqL2E', 19),
(20, 'Magic Keyboard（ホワイト・13インチ M4）', 'keyboard', 'mwr43ja.jpg', 'MWR43J/A', '2024-05-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/3XUwMGt', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTVdSNDNKL0E', 20),
(21, 'Magic Keyboard（ブラック・13インチ M4）', 'keyboard', 'mwr53ja.jpg', 'MWR53J/A', '2024-05-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/4iuXldD', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTVdSNTNKL0E', 21),
(22, 'Magic Keyboard（ホワイト・11インチ M3 Air）', 'keyboard', 'mdfv4ja.jpg', 'MDFV4J/A', '2025-03-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/4iyenr9', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdTURGVjRKL0EgaVBhZA', 22),
(23, 'Magic Keyboard（ホワイト・13インチ M3 Air）', 'keyboard', 'mdfw4ja .jpg', 'MDFW4J/A', '2025-03-01', 'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3QSY+ZFU+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.iosys.co.jp%2Fitems%2Fsmartphonegoods%2Fkeyboard%2Fipad_pro', 'https://amzn.to/428UFww', 'https://jp.mercari.com/search?search_condition_id=1cx0zHGsdaVBhZCBNREZXNEovQSA', 23);

-- シーケンスを最大IDに合わせる
SELECT setval('ipad_accessories_id_seq', (SELECT MAX(id) FROM ipad_accessories));

-- ============================================
-- 対応関係データ
-- WordPress iPad_ID → Supabase ipad_models.id マッピング済み
-- ============================================
INSERT INTO ipad_accessory_compatibility (ipad_model_id, accessory_id) VALUES
-- iPad 第9世代 (Supabase ID: 1)
(1, 1),   -- Apple Pencil（第1世代）
(1, 10),  -- Smart Keyboard

-- iPad 第10世代 (Supabase ID: 2)
(2, 1),   -- Apple Pencil（第1世代）
(2, 3),   -- Apple Pencil（USB-C）
(2, 11),  -- Magic Keyboard Folio

-- iPad 第11世代 (Supabase ID: 3)
(3, 1),   -- Apple Pencil（第1世代）
(3, 3),   -- Apple Pencil（USB-C）
(3, 11),  -- Magic Keyboard Folio

-- iPad mini 第5世代 (Supabase ID: 4)
(4, 1),   -- Apple Pencil（第1世代）

-- iPad mini 第6世代 (Supabase ID: 5)
(5, 2),   -- Apple Pencil（第2世代）
(5, 3),   -- Apple Pencil（USB-C）

-- iPad mini 第7世代 (Supabase ID: 6)
(6, 4),   -- Apple Pencil Pro
(6, 3),   -- Apple Pencil（USB-C）

-- iPad Air 第4世代 (Supabase ID: 7)
(7, 2),   -- Apple Pencil（第2世代）
(7, 3),   -- Apple Pencil（USB-C）
(7, 14),  -- Magic Keyboard（ブラック・11インチ旧）
(7, 15),  -- Magic Keyboard（ホワイト・11インチ旧）

-- iPad Air 第5世代 (Supabase ID: 8)
(8, 2),   -- Apple Pencil（第2世代）
(8, 3),   -- Apple Pencil（USB-C）
(8, 14),  -- Magic Keyboard（ブラック・11インチ旧）
(8, 15),  -- Magic Keyboard（ホワイト・11インチ旧）

-- iPad Air 11 第6世代 (Supabase ID: 9)
(9, 3),   -- Apple Pencil（USB-C）
(9, 4),   -- Apple Pencil Pro
(9, 14),  -- Magic Keyboard（ブラック・11インチ旧）
(9, 15),  -- Magic Keyboard（ホワイト・11インチ旧）

-- iPad Air 13 第6世代 (Supabase ID: 10)
(10, 3),  -- Apple Pencil（USB-C）
(10, 4),  -- Apple Pencil Pro
(10, 16), -- Magic Keyboard（ブラック・12.9インチ）
(10, 17), -- Magic Keyboard（ホワイト・12.9インチ）

-- iPad Air 11 第7世代 (Supabase ID: 11)
(11, 3),  -- Apple Pencil（USB-C）
(11, 4),  -- Apple Pencil Pro
(11, 22), -- Magic Keyboard（ホワイト・11インチ M3 Air）

-- iPad Air 13 第7世代 (Supabase ID: 12)
(12, 3),  -- Apple Pencil（USB-C）
(12, 4),  -- Apple Pencil Pro
(12, 23), -- Magic Keyboard（ホワイト・13インチ M3 Air）

-- iPad Pro 11 第2世代 (Supabase ID: 13)
(13, 2),  -- Apple Pencil（第2世代）
(13, 3),  -- Apple Pencil（USB-C）
(13, 13), -- Smart Keyboard Folio（11インチ）

-- iPad Pro 11 第3世代 (Supabase ID: 14)
(14, 2),  -- Apple Pencil（第2世代）
(14, 3),  -- Apple Pencil（USB-C）
(14, 14), -- Magic Keyboard（ブラック・11インチ旧）
(14, 15), -- Magic Keyboard（ホワイト・11インチ旧）

-- iPad Pro 11 第4世代 (Supabase ID: 15)
(15, 2),  -- Apple Pencil（第2世代）
(15, 3),  -- Apple Pencil（USB-C）
(15, 14), -- Magic Keyboard（ブラック・11インチ旧）
(15, 15), -- Magic Keyboard（ホワイト・11インチ旧）

-- iPad Pro 11 第5世代 (Supabase ID: 16)
(16, 3),  -- Apple Pencil（USB-C）
(16, 4),  -- Apple Pencil Pro
(16, 18), -- Magic Keyboard（ホワイト・11インチ M4）
(16, 19), -- Magic Keyboard（ブラック・11インチ M4）

-- iPad Pro 11 第6世代 (Supabase ID: 17)
(17, 3),  -- Apple Pencil（USB-C）
(17, 4),  -- Apple Pencil Pro
(17, 18), -- Magic Keyboard（ホワイト・11インチ M4）
(17, 19), -- Magic Keyboard（ブラック・11インチ M4）

-- iPad Pro 12.9 第4世代 (Supabase ID: 18)
(18, 2),  -- Apple Pencil（第2世代）
(18, 3),  -- Apple Pencil（USB-C）
(18, 12), -- Smart Keyboard Folio（12.9インチ）

-- iPad Pro 12.9 第5世代 (Supabase ID: 19)
(19, 2),  -- Apple Pencil（第2世代）
(19, 3),  -- Apple Pencil（USB-C）
(19, 12), -- Smart Keyboard Folio（12.9インチ）

-- iPad Pro 12.9 第6世代 (Supabase ID: 20)
(20, 2),  -- Apple Pencil（第2世代）
(20, 3),  -- Apple Pencil（USB-C）
(20, 12), -- Smart Keyboard Folio（12.9インチ）

-- iPad Pro 13 第1世代 (Supabase ID: 21)
(21, 3),  -- Apple Pencil（USB-C）
(21, 4),  -- Apple Pencil Pro
(21, 20), -- Magic Keyboard（ホワイト・13インチ M4）
(21, 21), -- Magic Keyboard（ブラック・13インチ M4）

-- iPad Pro 13 第2世代 (Supabase ID: 22)
(22, 3),  -- Apple Pencil（USB-C）
(22, 4),  -- Apple Pencil Pro
(22, 20), -- Magic Keyboard（ホワイト・13インチ M4）
(22, 21); -- Magic Keyboard（ブラック・13インチ M4）
