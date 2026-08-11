import { PUBLISH_ANDROID_CATEGORIES } from './feature-flags'

/**
 * 関連記事リンクのメタデータ定義
 * - 各カテゴリのサブページ一覧（slug系・compare系・ハブページを除外）
 * - RelatedLinksコンポーネントで共通利用
 */

export type RelatedLinkMeta = {
  href: string
  title: string
  desc: string
}

/**
 * ブランド横断の比較ページ。iPhone / Pixel / Galaxy の各関連記事に共通で差し込む。
 * 3ブランド比較が主題なので、Android 非公開の間は出さない（空配列を展開する）。
 */
const CROSS_COMPARE_LINK: RelatedLinkMeta = {
  href: '/smartphone-compare/',
  title: 'iPhone・Pixel・Galaxy横断比較',
  desc: '同じ予算で買える3ブランドの機種を比較',
}
const CROSS_LINKS: RelatedLinkMeta[] = PUBLISH_ANDROID_CATEGORIES ? [CROSS_COMPARE_LINK] : []

/** iPhone サブページ一覧 */
export const IPHONE_LINKS: RelatedLinkMeta[] = [
  { href: '/iphone/iphone-spec-table/', title: '歴代iPhoneスペック比較表【全モデル】', desc: '歴代iPhoneの全スペックを一覧で比較' },
  { href: '/iphone/price-info/', title: '中古iPhone相場・価格推移【2026年】', desc: '主要モデルの相場と値動きをチェック' },
  { href: '/iphone/iphone-shop/', title: '中古iPhoneの購入先おすすめ比較', desc: '信頼できるショップを比較して紹介' },
  { href: '/iphone/benchmark/', title: 'iPhoneベンチマーク比較ランキング', desc: '歴代iPhoneのチップ性能をスコアで比較' },
  { href: '/iphone/mvno/', title: '中古iPhoneにおすすめの格安SIM比較', desc: '中古iPhoneで使える格安SIMを比較' },
  { href: '/iphone/iphone-camera/', title: '歴代iPhoneカメラ性能比較', desc: '歴代モデルのカメラ機能の違いがわかる' },
  { href: '/iphone/battery-compare/', title: 'iPhoneバッテリー容量比較ランキング', desc: '電池持ちのいいiPhoneがひと目でわかる' },
  { href: '/iphone/storage-guide/', title: 'iPhoneストレージ容量の選び方ガイド', desc: '用途別のおすすめ容量と中古価格を比較' },
  { href: '/iphone/used-iphone-support/', title: '中古iPhoneはいつまで使える？【サポート期間】', desc: '機種別のサポート期間目安まとめ' },
  { href: '/iphone/used-iphone-attention/', title: '中古iPhone購入前の注意点まとめ', desc: '購入前に知っておきたいチェックポイント' },
  { href: '/iphone/filter-search/', title: 'iPhone機種診断ツール', desc: '質問に答えるだけで最適な機種がわかる' },
  { href: '/iphone/network-limit/', title: 'ネットワーク制限△のiPhoneは買って大丈夫？', desc: 'メリット・デメリットを解説' },
  { href: '/iphone/apple-care/', title: 'iPhoneにApple Care+は必要？', desc: 'コスパの観点から加入しなくていい理由を解説' },
  { href: '/iphone/mobile-hoken-compare/', title: 'Apple Care+よりモバイル保険がコスパ高い理由', desc: '月額700円・3台補償のモバイル保険とApple Care+を徹底比較' },
  ...CROSS_LINKS,
]

/** Google Pixel サブページ一覧 */
export const PIXEL_LINKS: RelatedLinkMeta[] = [
  { href: '/pixel/pixel-spec-table/', title: '歴代Pixelスペック比較表【全モデル】', desc: '歴代Google Pixelの全スペックを一覧で比較' },
  { href: '/pixel/price-info/', title: '中古Pixel相場・価格推移【2026年】', desc: '主要モデルの相場と値動きをチェック' },
  { href: '/pixel/pixel-shop/', title: '中古Pixelの購入先おすすめ比較', desc: '信頼できるショップを比較して紹介' },
  { href: '/pixel/benchmark/', title: 'Pixelベンチマーク比較ランキング', desc: '歴代PixelのTensor性能をスコアで比較' },
  { href: '/pixel/battery-compare/', title: 'Pixelバッテリー容量比較ランキング', desc: '電池持ちのいいPixelがひと目でわかる' },
  { href: '/pixel/used-pixel-support/', title: '中古Pixelはいつまで使える？【サポート期間】', desc: '機種別のOS/セキュリティ更新期間まとめ' },
  { href: '/pixel/used-pixel-attention/', title: '中古Pixel購入前の注意点まとめ', desc: '購入前に知っておきたいチェックポイント' },
  { href: '/pixel/storage-guide/', title: 'Pixelストレージ容量の選び方ガイド', desc: '用途別のおすすめ容量と中古価格を比較' },
  ...CROSS_LINKS,
]

/** Samsung Galaxy サブページ一覧 */
export const GALAXY_LINKS: RelatedLinkMeta[] = [
  { href: '/galaxy/galaxy-spec-table/', title: '歴代Galaxyスペック比較表【全モデル】', desc: '歴代Samsung Galaxyの全スペックを一覧で比較' },
  { href: '/galaxy/price-info/', title: '中古Galaxy相場・価格推移【2026年】', desc: '主要モデルの相場と値動きをチェック' },
  { href: '/galaxy/galaxy-shop/', title: '中古Galaxyの購入先おすすめ比較', desc: '信頼できるショップを比較して紹介' },
  { href: '/galaxy/benchmark/', title: 'Galaxyベンチマーク比較ランキング', desc: '歴代GalaxyのSnapdragon性能をスコアで比較' },
  { href: '/galaxy/battery-compare/', title: 'Galaxyバッテリー容量比較ランキング', desc: '電池持ちのいいGalaxyがひと目でわかる' },
  { href: '/galaxy/used-galaxy-support/', title: '中古Galaxyはいつまで使える？【サポート期間】', desc: '機種別のOS/セキュリティ更新期間まとめ' },
  { href: '/galaxy/used-galaxy-attention/', title: '中古Galaxy購入前の注意点まとめ', desc: '購入前に知っておきたいチェックポイント' },
  { href: '/galaxy/storage-guide/', title: 'Galaxyストレージ容量の選び方ガイド', desc: '用途別のおすすめ容量と中古価格を比較' },
  ...CROSS_LINKS,
]

/** iPad サブページ一覧 */
export const IPAD_LINKS: RelatedLinkMeta[] = [
  { href: '/ipad/ipad-spec-table/', title: '歴代iPadスペック比較表【全モデル】', desc: '歴代iPadの全スペックを一覧で比較' },
  { href: '/ipad/ipad-price-info/', title: '中古iPad相場・価格推移【2026年】', desc: '主要モデルの相場と値動きをチェック' },
  { href: '/ipad/ipad-shop/', title: '中古iPadの購入先おすすめ比較', desc: '信頼できるショップを比較して紹介' },
  { href: '/ipad/benchmark/', title: 'iPadベンチマーク比較ランキング', desc: '歴代iPadのチップ性能をスコアで比較' },
  { href: '/ipad/apple-pencil-compare/', title: 'Apple Pencil対応iPad一覧と互換性比較', desc: 'どのiPadにどのPencilが対応するか確認' },
  { href: '/ipad/accessories-summary/', title: 'iPad対応キーボード互換表【Magic Keyboard】', desc: '対応キーボードがすぐわかる' },
  { href: '/ipad/wifi-cellular/', title: 'iPad Wi-Fiモデルとセルラーの違い', desc: 'どちらを選ぶべきか判断基準を解説' },
  { href: '/ipad/storage-guide/', title: 'iPadストレージ容量の選び方ガイド', desc: '用途別のおすすめ容量と中古価格を比較' },
  { href: '/ipad/used-ipad-support/', title: '中古iPadはいつまで使える？【サポート期間】', desc: '機種別のサポート期間目安まとめ' },
  { href: '/ipad/used-ipad-attention/', title: '中古iPad購入前の注意点まとめ', desc: '購入前に知っておきたいチェックポイント' },
  { href: '/ipad/apple-care/', title: 'iPadにApple Care+は必要？', desc: 'コスパの観点から加入しなくていい理由を解説' },
  { href: '/ipad/howto-use-ipad/', title: 'iPadの便利な使い道22選【活用術】', desc: '生活が変わる活用法を紹介' },
  { href: '/ipad/ipad-buy/', title: 'iPadを安く買う方法7選', desc: '7つの購入先を比較して紹介' },
  { href: '/ipad/car-navigation-system/', title: 'iPadカーナビ化の方法と注意点', desc: 'メリットと注意点を解説' },
  { href: '/ipad/ipad-filter-search/', title: 'iPad機種診断ツール', desc: '質問に答えるだけで最適な機種がわかる' },
  { href: '/macbook/ipad-macbook-compare/', title: 'iPadとMacBookどっちがいい？【徹底比較】', desc: '両デバイスの違いと選び方を解説' },
  { href: '/iphone/network-limit/', title: 'ネットワーク制限△の端末は買って大丈夫？', desc: 'メリット・デメリットを解説' },
]

/** Apple Watch サブページ一覧 */
export const WATCH_LINKS: RelatedLinkMeta[] = [
  { href: '/watch/watch-spec-table/', title: '歴代Apple Watchスペック比較表【全モデル】', desc: '歴代モデルの全スペックを一覧で比較' },
  { href: '/watch/watch-price-info/', title: '中古Apple Watch相場・価格推移', desc: '主要モデルの相場と値動きをチェック' },
  { href: '/watch/watch-shop/', title: '中古Apple Watchの購入先おすすめ比較', desc: '信頼できるショップを比較して紹介' },
  { href: '/watch/used-watch-support/', title: '中古Apple Watchはいつまで使える？【サポート期間】', desc: '機種別のサポート期間目安まとめ' },
  { href: '/watch/used-watch-attention/', title: '中古Apple Watch購入前の注意点まとめ', desc: '購入前に知っておきたいチェックポイント' },
  { href: '/watch/gps-cellular-compare/', title: 'Apple Watch GPSモデル vs セルラーモデルの違い', desc: 'どちらを選ぶべきか判断基準を解説' },
  { href: '/watch/how-to-use-apple-watch/', title: 'Apple Watchの便利な使い道25選【活用術】', desc: '生活が変わる25の活用法を紹介' },
  { href: '/watch/apple-watch-always-lit/', title: 'Apple Watch常時表示ディスプレイは必要？', desc: 'メリット・デメリットを解説' },
  { href: '/watch/apple-watch-buy/', title: 'Apple Watchを安く買う方法5選', desc: 'おすすめの購入先を紹介' },
  { href: '/watch/watch-filter-search/', title: 'Apple Watch機種診断ツール', desc: '質問に答えるだけで最適な機種がわかる' },
  { href: '/watch/apple-care/', title: 'Apple WatchにApple Care+は必要？', desc: 'コスパの観点から加入しなくていい理由を解説' },
]

/** AirPods サブページ一覧 */
export const AIRPODS_LINKS: RelatedLinkMeta[] = [
  { href: '/airpods/price-info/', title: '中古AirPods相場・価格推移', desc: '主要モデルの相場と値動きをチェック' },
  { href: '/airpods/airpods-find/', title: 'AirPodsの探し方ガイド', desc: '紛失時の対処法と購入方法を解説' },
  { href: '/airpods/airpods-filter-search/', title: 'AirPods機種診断ツール', desc: '質問に答えるだけで最適なモデルがわかる' },
  { href: '/airpods/used-airpods-attention/', title: '中古AirPodsの注意点8つ', desc: '購入前に知っておきたいリスクと対策' },
  { href: '/airpods/airpods-buy/', title: 'AirPodsを安く買う方法8選', desc: 'おすすめの購入先を比較して紹介' },
]

/** MacBook サブページ一覧 */
export const MACBOOK_LINKS: RelatedLinkMeta[] = [
  { href: '/macbook/macbook-spec-table/', title: '歴代MacBookスペック比較表【全モデル】', desc: '歴代モデルの全スペックを一覧で比較' },
  { href: '/macbook/price-info/', title: '中古MacBook相場・価格推移【2026年】', desc: '主要モデルの相場と値動きをチェック' },
  { href: '/macbook/macbook-shop/', title: '中古MacBookの購入先おすすめ比較', desc: '信頼できるショップを比較して紹介' },
  { href: '/macbook/benchmark/', title: 'MacBookベンチマーク比較ランキング', desc: '歴代MacBookのチップ性能をスコアで比較' },
  { href: '/macbook/used-macbook-support/', title: '中古MacBookはいつまで使える？【サポート期間】', desc: '機種別のサポート期間目安まとめ' },
  { href: '/macbook/used-macbook-attention/', title: '中古MacBook購入前の注意点まとめ', desc: '購入前に知っておきたいチェックポイント' },
  { href: '/macbook/air-pro-compare/', title: 'MacBook Air vs Proの違い【徹底比較】', desc: '両モデルの違いを徹底比較' },
  { href: '/macbook/storage-guide/', title: 'MacBookストレージ容量の選び方ガイド', desc: '用途別のおすすめ容量と中古価格を比較' },
  { href: '/macbook/macbook-buy/', title: 'MacBookを安く買う方法7選', desc: 'おすすめの購入先を紹介' },
  { href: '/macbook/ipad-macbook-compare/', title: 'iPad vs MacBookの違い【用途別比較】', desc: 'どちらを選ぶべきか用途別に解説' },
  { href: '/macbook/windows-mac-compare/', title: 'Windows vs Macの違い【徹底比較】', desc: 'どちらが自分に合うか比較' },
  { href: '/macbook/apple-care/', title: 'MacBookにApple Care+は必要？', desc: 'コスパの観点から加入しなくていい理由を解説' },
  // デスクトップMacへの相互リンク。据え置きで使うなら同じ予算でも性能が上がるため、
  // MacBookを検討している人に見せる価値がある（非公開のあいだは RelatedLinks 側で除外される）
  { href: '/mac/', title: '中古iMac・Mac miniおすすめ機種', desc: '据え置きならiMac・Mac miniも選択肢' },
]

/** デスクトップMac（iMac / Mac mini / Mac Studio）。ノートの MACBOOK_LINKS とは別カテゴリ */
export const MAC_LINKS: RelatedLinkMeta[] = [
  { href: '/mac/', title: '中古iMac・Mac miniおすすめ機種', desc: 'iMac・Mac miniの選び方と狙い目モデル' },
  { href: '/mac/mac-spec-table/', title: '歴代iMac・Mac miniスペック比較表', desc: 'iMac・Mac mini・Mac Studioを一覧で比較' },
  { href: '/mac/price-info/', title: 'iMac・Mac mini相場・価格推移', desc: '歴代モデルの相場と値動きをチェック' },
  { href: '/mac/benchmark/', title: 'iMac・Mac miniベンチマーク比較', desc: 'iMac・Mac mini・Mac Studioの性能差をスコアで比較' },
  { href: '/mac/used-mac-support/', title: 'iMac・Mac miniはいつまで使える？【サポート期間】', desc: '機種別のサポート期間目安まとめ' },
  { href: '/macbook/windows-mac-compare/', title: 'Windows vs Macの違い【徹底比較】', desc: 'どちらが自分に合うか比較' },
  // MacBook のサポート期間ページ（/macbook/used-macbook-support/）は入れない。
  // 上の /mac/used-mac-support/ と見出しも説明文もほぼ同じで、並ぶと重複に見えるため。
  // /macbook/ トップへの動線は CrossCategoryLinks が別枠で持っている
]
