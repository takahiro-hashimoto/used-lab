-- ============================================================
-- mvno_providers: 中古スマホセット契約対応の格安SIM事業者
-- ============================================================

CREATE TABLE IF NOT EXISTS mvno_providers (
  id              serial PRIMARY KEY,
  provider_name   varchar(100) NOT NULL,
  provider_slug   varchar(100) NOT NULL UNIQUE,
  official_url    varchar(500) NOT NULL,
  certified_program_name varchar(100),
  available_iphones varchar(500),
  used_device_note text,
  network_carriers varchar(100),
  sim_types       varchar(100),
  min_monthly_fee integer,
  min_monthly_fee_note varchar(255),
  warranty_days   integer DEFAULT 0,
  battery_guarantee_percent smallint,
  set_discount_available boolean DEFAULT false,
  set_discount_note text,
  store_support   boolean DEFAULT false,
  online_only     boolean DEFAULT false,
  is_published    boolean DEFAULT true,
  display_order   integer DEFAULT 0,
  last_verified_at date,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mvno_providers_published ON mvno_providers (is_published);
CREATE INDEX IF NOT EXISTS idx_mvno_providers_display_order ON mvno_providers (display_order);

-- ============================================================
-- データ投入
-- ============================================================

INSERT INTO mvno_providers (id, provider_name, provider_slug, official_url, certified_program_name, available_iphones, used_device_note, network_carriers, sim_types, min_monthly_fee, min_monthly_fee_note, warranty_days, battery_guarantee_percent, set_discount_available, set_discount_note, store_support, online_only, is_published, display_order, last_verified_at, created_at, updated_at) VALUES
(1, '楽天モバイル', 'rakuten-mobile', 'https://hb.afl.rakuten.co.jp/hgc/258cf4cc.6d6fceff.258cf4cd.200f7802/?pc=https%3A%2F%2Fwww.rakuten.ne.jp%2Fgold%2Frakutenmobile-store%2Fproduct%2Frakuten-certified%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9', 'Rakuten認定中古', 'iPhone 14,iPhone 13 Pro Max,iPhone 13 Pro,iPhone 13 mini,iPhone 12 Pro Max,iPhone 12 Pro,iPhone 12 mini,iPhone 12,iPhone SE(第3世代),iPhone SE(第2世代)', '楽天モバイル公式 楽天市場店限定販売。グレードはA+（美品）とA（良品）の2段階。楽天モバイル公式サイト・店舗では取扱なし。', 'rakuten', '音声SIM,eSIM', 1078, '～3GB時。従量制で～20GB 2,178円、20GB超 3,278円（税込）', 90, 80, true, 'Rakuten最強プランとのセット購入で最大22,000円OFFクーポンあり（時期により変動）。MNP乗り換え+初契約でポイント還元あり。', true, false, true, 1, '2025-01-29', '2026-01-29 20:30:22+09', '2026-02-02 09:09:36+09'),
(2, 'IIJmio', 'iijmio', 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3731104&pid=892528273', NULL, 'iPhone 13,iPhone 12 Pro Max,iPhone 12 Pro,iPhone 12,iPhone SE(第3世代),iPhone SE(第2世代)', 'グレードは未使用品・美品・良品・Apple認定整備済製品の4段階。リユースモバイルガイドライン評価基準A以上のみ販売。SIMフリーまたはSIMロック解除済。', 'docomo,au', '音声SIM,音声eSIM,SMS SIM,データSIM,データeSIM', 850, '2GB時（税込）。5GB 950円、10GB 1,400円など', 30, NULL, true, 'MNP転入+ギガプラン音声SIM/eSIM+端末同時購入で「のりかえ価格」適用。スマホ大特価セールで大幅割引あり。', false, true, true, 2, '2025-01-29', '2026-01-29 20:31:36+09', '2026-01-31 17:42:24+09'),
(3, 'UQモバイル', 'uq-mobile', 'https://shop.uqmobile.jp/shop/aucertified/?srsltid=AfmBOooqyfDGNAyOQzJ-RqC3fgGafoH-qaxizWUyWwFjuXjsZ1OgiSiE', 'au Certified', 'iPhone 14 Pro,iPhone 14,iPhone 13 Pro,iPhone 13,iPhone 13 mini,iPhone SE(第3世代),iPhone SE(第2世代)', 'au認定リユース品。専門業者による外観検査・機能検査をクリア。付属品なし（端末とSIMピンのみ）。ネットワーク利用制限の心配なし。', 'au', '音声SIM,eSIM', 2178, 'トクトクプラン2 30GB時（税込・各種割引なし）。自宅セット割+au PAYカード割で1,628円', 30, 80, true, 'MNP+コミコミプランバリューまたはトクトクプラン2+増量オプションⅡで最大44,000円割引。', true, false, true, 3, '2025-01-29', '2026-01-29 20:41:25+09', '2026-02-02 09:08:01+09'),
(4, 'ワイモバイル', 'ymobile', 'https://www.ymobile.jp/store/sp/iphone_sbc/', 'ソフトバンク認定中古品', 'iPhone 14,iPhone 13,iPhone 12,iPhone SE(第3世代),iPhone SE(第2世代)', 'ソフトバンクが厳選した認定整備済みiPhone。付属品なし（端末のみ）。軽微な傷・使用感あり。ネットワーク利用制限なし。オンラインストア限定販売。', 'softbank', '音声SIM,eSIM', 2365, 'シンプル3 S 5GB時（税込・割引なし）。おうち割光セット(A)+PayPayカード ゴールド割で858円', 8, 80, true, '新規・MNP+シンプル3 M/Lで端末割引あり。年末年始セール等で大幅値引きあり。', true, false, true, 4, '2025-01-29', '2026-01-29 20:46:48+09', '2026-02-02 09:56:42+09'),
(5, 'ahamo', 'ahamo', 'https://ahamo.com/products/used/', 'docomo Certified', 'iPhone 15,iPhone 14,iPhone 13,iPhone 12,iPhone 11,iPhone SE(第3世代),iPhone SE(第2世代)', 'ドコモ認定リユース品。ランクA+/A/Bの3段階評価。付属品はSIM取り出しピンのみ。ネットワーク利用制限なし。新規契約時はahamoサイトで購入可、既存契約者はドコモオンラインショップで購入。', 'docomo', '音声SIM,eSIM', 2970, '30GB+5分通話無料（税込・割引なし）。シンプルワンプラン。大盛りオプション+1,980円で110GB。', 30, 80, true, '新規・MNPで端末割引あり（最大33,000円引き等）。SIMのみ乗り換えで20,000dポイント還元。', false, true, true, 5, '2025-01-29', '2026-01-29 20:48:19+09', '2026-02-02 09:05:37+09'),
(6, 'イオンモバイル', 'aeon-mobile', 'https://aeonmobile.jp/iphone/', NULL, 'iPhone 16e,iPhone 15,iPhone 14', '中古（未使用品）を販売。キャリア認定プログラムではなく独自仕入れ。出荷前にキッティング（APN設定等）済み。Yahoo!ショッピング店でも購入可能。', 'docomo,au', '音声SIM,データSIM,シェアSIM,eSIM', 803, '音声プラン 0.5GB時（税込）。1GB 858円、3GB 1,078円、5GB 1,298円。60歳以上向け「やさしいプラン」あり。', NULL, NULL, true, 'MNP乗り換えでWAONポイント進呈、エントリーパッケージ利用で2,000WAONポイント等。', true, false, true, 6, '2025-01-29', '2026-01-29 20:48:59+09', '2026-01-29 20:48:59+09'),
(7, 'ゲオモバイル', 'geo-mobile', 'https://mvno.geo-mobile.jp/uqmobile/?utm_source=felmat&utm_medium=affiliate&utm_campaign=reg_uq_ec&utm_content=seo&tgcs=6ddba9d5b0e84ab470b8721292fa4330', NULL, 'iPhone 12 mini,iPhone 12,iPhone 11,iPhone SE(第3世代),iPhone SE(第2世代),iPhone XR', 'ゲオ独自の中古品。状態S（未使用）/A（良好）/B（使用感あり）の3段階評価。UQモバイルSIMとのセット販売専用。赤ロム永久保証。データ消去は国際認証Blancco社ソリューション使用。バッテリー保証なし。', 'au', '音声SIM', 2178, 'UQモバイル トクトクプラン2 30GB時（税込・割引なし）。自宅セット割+au PAYカード割で1,628円。コミコミプランバリュー35GB 3,828円。', 30, NULL, true, 'MNP+コミコミプランバリュー/トクトクプラン2+増量オプションⅡで端末大幅割引（1円端末も）。選べるe-GIFT付きキャンペーンあり。', true, false, true, 7, '2025-01-29', '2026-01-29 20:49:29+09', '2026-01-31 17:24:50+09'),
(8, 'mineo', 'mineo', 'https://mineo.jp/device/iphone/', NULL, 'iPhone 17,iPhone Air,iPhone 16,iPhone 16e,iPhone 15,iPhone 13', '中古未使用品が中心（端末本体・付属品ともに通常使用されておらず新品同様の状態）。一部新品あり（iPhone 13）。国内版SIMフリー。メーカー1年保証・AppleCare+は原則対象外。初期設定済みで届いてすぐ使える。', 'docomo,au,softbank', '音声SIM,データSIM,eSIM', 1298, 'マイピタ デュアルタイプ 3GB（税込）。7GB 1,518円、15GB 1,958円、30GB 2,178円、50GB 2,948円。パケット放題Plus（最大3Mbps使い放題）15GB以上無料付帯。', 30, NULL, true, '端末購入で電子マネーギフト進呈。マイピタ最大6カ月間割引キャンペーン等。長期利用特典「ファン∞とく」で端末購入クーポンあり。', true, false, true, 8, '2025-01-29', '2026-01-29 20:51:46+09', '2026-02-02 09:07:09+09')
ON CONFLICT (id) DO NOTHING;

-- シーケンスを最大IDに合わせる
SELECT setval('mvno_providers_id_seq', (SELECT MAX(id) FROM mvno_providers));
