// ============================================================
// llms.txt / llms-full.txt 用のページ説明定義
// routes.ts の path をキーとして、AI向けの説明文を管理する
// ============================================================

/** 簡易説明（llms.txt 用） */
export const PAGE_DESCRIPTIONS: Record<string, string> = {
  // --- iPhone ---
  '/iphone/': '中古iPhoneの選び方・相場・おすすめモデルの総合ガイド',
  '/iphone/recommend/': '目的別に狙い目モデルを解説',
  '/iphone/used-iphone-attention/': '購入前に確認すべきポイントまとめ',
  '/iphone/used-iphone-support/': '機種別のサポート期間目安',
  '/iphone/iphone-shop/': 'ECサイト・ショップの比較',
  '/iphone/iphone-spec-table/': '全モデルの性能差や違いがわかる一覧表',
  '/iphone/price-info/': '歴代モデルの価格推移を独自集計',
  '/iphone/filter-search/': '自分に合うモデルが見つかる診断ツール',
  '/iphone/battery-compare/': '電池持ちランキング',
  '/iphone/iphone-camera/': '歴代モデルのカメラ機能を比較',
  '/iphone/mvno/': '購入と通信契約がセットでできる業者まとめ',

  // --- iPad ---
  '/ipad/': '中古iPadの選び方・相場・おすすめモデルの総合ガイド',
  '/ipad/recommend/': '狙い目の型落ちモデルを解説',
  '/ipad/used-ipad-attention/': '購入前に確認すべきポイントまとめ',
  '/ipad/used-ipad-support/': '機種別のサポート期間目安',
  '/ipad/ipad-shop/': 'ECサイト・ショップの比較',
  '/ipad/ipad-spec-table/': '各世代の性能の違いがわかる一覧表',
  '/ipad/ipad-price-info/': '歴代モデルの価格推移を独自集計',
  '/ipad/ipad-filter-search/': '自分に合うモデルが見つかる診断ツール',
  '/ipad/apple-pencil-compare/': '各モデルの違いと対応機種',
  '/ipad/wifi-cellular/': '両モデルの違いと選び方',
  '/ipad/howto-use-ipad/': '便利な使い道まとめ',
  '/ipad/car-navigation-system/': 'カーナビ化のメリットと方法',
  '/ipad/ipad-buy/': 'おすすめ購入先7つを比較',

  // --- MacBook ---
  '/macbook/': '中古MacBookの選び方・相場・おすすめモデルの総合ガイド',
  '/macbook/recommend/': '狙い目の型落ちモデルを解説',
  '/macbook/used-macbook-attention/': '購入前に確認すべきポイントまとめ',
  '/macbook/used-macbook-support/': '各機種ごとの寿命と買い替えタイミング',
  '/macbook/macbook-shop/': 'ECサイト・ショップの比較',
  '/macbook/macbook-spec-table/': 'Air・Proの性能差や違いがわかる一覧表',
  '/macbook/ipad-macbook-compare/': '両者の違いと使い勝手を比較',
  '/macbook/windows-mac-compare/': '両者の違いとおすすめの人',
  '/macbook/macbook-buy/': 'おすすめ購入先7つを比較',

  // --- Apple Watch ---
  '/watch/': '中古Apple Watchの選び方・相場・おすすめモデルの総合ガイド',
  '/watch/recommend/': '狙い目の型落ちモデルを解説',
  '/watch/used-watch-attention/': '購入前に確認すべきポイントまとめ',
  '/watch/used-watch-support/': '機種別のサポート期間目安',
  '/watch/watch-shop/': 'ECサイト・ショップの比較',
  '/watch/watch-spec-table/': '各世代の性能の違いがわかる一覧表',
  '/watch/watch-price-info/': '歴代モデルの中古価格と推移グラフ',
  '/watch/watch-filter-search/': '自分に合うモデルが見つかる診断ツール',
  '/watch/how-to-use-apple-watch/': '便利な機能や使い方まとめ',
  '/watch/gps-cellular-compare/': '両モデルの違いとできること',
  '/watch/apple-watch-always-lit/': '実際に使ってわかったメリット・デメリット',
  '/watch/apple-watch-buy/': 'おすすめ購入先7つを比較',

  // --- AirPods ---
  '/airpods/recommend/': '狙い目の型落ちモデルを解説',
  '/airpods/price/': '歴代モデルの価格推移を独自集計',
}

/** 詳細説明（llms-full.txt 用） — 未定義の場合は簡易説明にフォールバック */
export const PAGE_DESCRIPTIONS_FULL: Record<string, string> = {
  // --- iPhone ---
  '/iphone/': '中古iPhoneの選び方・相場・おすすめモデルの総合ガイド。初心者が知るべき基礎知識から上級者向けの選定ポイントまでカバー',
  '/iphone/recommend/': '目的別（コスパ重視・カメラ重視・ゲーム用など）に狙い目モデルを解説',
  '/iphone/iphone-spec-table/': 'iPhone SE〜iPhone 16シリーズまで全モデルのスペックを横並びで比較できる一覧表',
  '/iphone/price-info/': '歴代全機種の中古価格をストレージ容量別に掲載。月次更新の価格推移グラフ付き',
  '/iphone/used-iphone-attention/': 'アクティベーションロック・バッテリー劣化・ネットワーク利用制限など、購入前に確認すべき項目を解説',
  '/iphone/used-iphone-support/': 'iOS対応状況と各機種のサポート終了時期の目安をまとめた一覧',
  '/iphone/iphone-shop/': 'イオシス・じゃんぱら・ムスビーなど主要ショップの特徴と価格を比較',
  '/iphone/filter-search/': '予算・用途・こだわりポイントを選ぶだけで最適な中古iPhoneが見つかる診断ツール',
  '/iphone/battery-compare/': '歴代モデルのバッテリー容量と駆動時間をランキング形式で比較',
  '/iphone/iphone-camera/': '画素数・センサーサイズ・レンズ構成・撮影機能の世代間比較',
  '/iphone/mvno/': '中古端末と通信契約をセットで提供している格安SIM業者のまとめ',

  // --- iPad ---
  '/ipad/': '中古iPadの選び方・相場・おすすめモデルの総合ガイド',
  '/ipad/recommend/': '用途別（動画視聴・イラスト・勉強・仕事）に狙い目モデルを解説',
  '/ipad/ipad-spec-table/': 'iPad・Air・mini・Pro全モデルのスペック一覧表',
  '/ipad/ipad-price-info/': '歴代全機種の中古価格を掲載。月次更新の価格推移グラフ付き',
  '/ipad/apple-pencil-compare/': '第1世代・第2世代・USB-C・Proの違いと対応iPad一覧',
  '/ipad/wifi-cellular/': '両モデルの4つの違いとどちらを選ぶべきかの判断基準',
  '/ipad/howto-use-ipad/': '動画視聴・ノート・読書・イラスト・カーナビなど具体的な活用法',
  '/ipad/ipad-buy/': 'Apple認定整備済品・中古ショップ・フリマなど7つの購入先を比較',

  // --- Apple Watch ---
  '/watch/how-to-use-apple-watch/': '通知・健康管理・決済・運動記録など具体的な活用法',
  '/watch/used-watch-attention/': 'アクティベーションロック・バッテリー・ペアリングなどの確認ポイント',
  '/watch/gps-cellular-compare/': '通信機能の違いとどちらを選ぶべきか',

  // --- MacBook ---
  '/macbook/windows-mac-compare/': 'OS・操作性・ソフトウェアなどの違いとそれぞれのおすすめユーザー像',
  '/macbook/used-macbook-attention/': 'バッテリー・キーボード・ディスプレイなど購入前の確認ポイント',
  '/macbook/used-macbook-support/': 'macOS対応状況と各機種の寿命・買い替えタイミング',
  '/macbook/ipad-macbook-compare/': '用途別にどちらが適しているかを解説',
}
