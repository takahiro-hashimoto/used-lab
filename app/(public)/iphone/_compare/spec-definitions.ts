/**
 * 比較スペック定義
 * PHPテンプレートのスペック配列を TypeScript に移植
 */

export type CompareType = 'numeric' | 'numeric-min' | 'date' | 'text' | 'boolean'

export type SpecDefinition = {
  key: string
  label: string
  icon: string
  type: CompareType
  unit?: string
  desc: string
  /** numeric 比較で「約X倍」を表示 */
  showRate?: boolean
}

// =========================================================
// 基本スペック
// =========================================================
export const SPECS_BASIC: SpecDefinition[] = [
  {
    key: 'display', label: '画面サイズ', icon: 'fa-mobile-screen-button', type: 'numeric', unit: 'インチ',
    desc: '画面サイズは動画視聴やゲームプレイ時の没入感を左右する重要な要素。6.1インチは片手操作に適し、6.7インチ以上は大画面で迫力ある映像を楽しめます。',
  },
  {
    key: 'date', label: '発売日', icon: 'fa-calendar-day', type: 'date',
    desc: '発売日が新しいモデルほどiOSサポート期間が長く、将来の下取り・買取価格も高い傾向があります。',
  },
  {
    key: 'strage', label: 'ストレージ容量', icon: 'fa-hard-drive', type: 'text',
    desc: 'iPhoneはSDカードで容量を増やせないため、購入時の選択が重要。写真・動画を多く撮る方は128GB以上、4K動画撮影やゲームを楽しむなら256GB以上がおすすめです。',
  },
  {
    key: 'size', label: '本体サイズ', icon: 'fa-ruler-combined', type: 'text',
    desc: '本体の縦横サイズと厚みは、ポケットへの収まりやすさや長時間使用時の疲労感に影響。重量が軽いほど手首への負担が少なく、通勤時の片手操作も快適です。',
  },
  {
    key: 'color', label: 'カラー', icon: 'fa-palette', type: 'text',
    desc: 'iPhoneのカラーバリエーションはモデルごとに異なります。Proモデルはチタニウム素材の高級感あるカラー、標準モデルはポップで明るい色展開が特徴です。',
  },
]

// =========================================================
// カメラ性能
// =========================================================
export const SPECS_CAMERA: SpecDefinition[] = [
  {
    key: 'in_camera', label: 'レンズ構成', icon: 'fa-camera', type: 'text',
    desc: 'メインカメラのレンズ数と画素数。プロモデルはトリプルレンズ、それ以外はデュアルレンズが基本仕様です。',
  },
  {
    key: 'camera_control', label: 'カメラコントロール', icon: 'fa-sliders', type: 'boolean',
    desc: 'iPhone 16シリーズから搭載された物理ボタン。タッチ操作でズーム調整、押し込みでシャッター操作ができ、デジカメのような直感的な撮影体験を実現します。',
  },
  {
    key: 'lidar', label: 'LiDARスキャナ', icon: 'fa-crosshairs', type: 'boolean',
    desc: 'レーザーで空間を測定するセンサー。暗所でのフォーカス速度が向上し、ARアプリでの3D空間認識やポートレートモードの背景分離精度も大幅に改善されます。',
  },
  {
    key: 'photography_style', label: 'フォトグラフスタイル', icon: 'fa-palette', type: 'boolean',
    desc: '撮影時に好みの色調やコントラストを適用できるApple独自の機能。SNS映えする写真を加工アプリなしで撮影でき、設定は保存されるため毎回調整する手間がありません。',
  },
  {
    key: 'portrait_mode', label: 'ポートレートモード', icon: 'fa-user', type: 'boolean',
    desc: '被写体と背景を認識し、一眼レフカメラのようなボケ味のある写真を撮影。人物だけでなくペットや料理の撮影にも対応し、撮影後にボケ具合やピント位置を調整できます。',
  },
  {
    key: 'night_mode', label: 'ナイトモード', icon: 'fa-moon', type: 'boolean',
    desc: '暗い場所を自動検知し、複数の画像を合成して明るくノイズの少ない写真を生成。夜景や暗いレストランでの撮影で、フラッシュなしでも自然な仕上がりになります。',
  },
  {
    key: 'centerframe', label: 'センターフレーム', icon: 'fa-crop-simple', type: 'boolean',
    desc: 'ビデオ通話やオンライン会議中に、カメラが自動で話者を追従して画面中央に配置。複数人での会話時は全員が映るよう自動でズームアウトする便利な機能です。',
  },
  {
    key: 'action_mode', label: 'アクションモード', icon: 'fa-person-running', type: 'boolean',
    desc: '歩きながらや走りながらの撮影でも、ジンバルを使ったような滑らかな映像を実現する強力な手ブレ補正機能。子どもやペットの動画撮影、Vlog撮影に最適です。',
  },
  {
    key: 'cinematic_mode', label: 'シネマティックモード', icon: 'fa-film', type: 'boolean',
    desc: '動画撮影中に被写体の背景を自動でぼかし、映画のような奥行きのある映像を作成。撮影後に編集アプリでフォーカスポイントやボケの強さを変更することも可能です。',
  },
  {
    key: 'macro_mode', label: 'マクロ撮影', icon: 'fa-leaf', type: 'boolean',
    desc: '被写体から約2cmまで近づいて撮影できる接写機能。花のおしべや昆虫の複眼、料理の質感など、肉眼では見えない微細なディテールを鮮明に記録できます。',
  },
  {
    key: 'apple_proraw', label: 'Apple ProRAW', icon: 'fa-file-image', type: 'boolean',
    desc: 'RAW形式とAppleの画像処理を組み合わせた高品質フォーマット。Lightroom等での後編集時に白飛びや黒つぶれを回復でき、プロカメラマンの本格的な写真編集にも対応します。',
  },
  {
    key: 'apple_prores', label: 'Apple ProRes', icon: 'fa-file-video', type: 'boolean',
    desc: 'ハリウッド映画やCM制作で採用される業務用動画コーデック。色情報の劣化が少なく、Final Cut ProやDaVinci Resolveでのカラーグレーディングに最適な形式です。',
  },
]

// =========================================================
// チップ・処理性能
// =========================================================
export const SPECS_CPU: SpecDefinition[] = [
  {
    key: 'cpu', label: '搭載チップ', icon: 'fa-microchip', type: 'text',
    desc: 'iPhoneの性能を決めるApple製プロセッサ。A15→A16→A17→A18と世代が上がるほどアプリの動作が速く、発熱が抑えられ、バッテリー消費も効率化されます。',
  },
  {
    key: 'score_single', label: 'シングルコア性能', icon: 'fa-mobile-screen', type: 'numeric',
    desc: 'Geekbench 6で測定した単一コアの処理速度。アプリの起動時間、Webページの読み込み、LINEやSNSの操作など、日常的な使い心地に最も影響するスコアです。',
    showRate: true,
  },
  {
    key: 'score_multi', label: 'マルチコア性能', icon: 'fa-layer-group', type: 'numeric',
    desc: 'Geekbench 6で測定した複数コア同時処理の速度。原神やPUBGなどの重いゲーム、4K動画の書き出し、複数アプリの同時起動時のパフォーマンスに影響します。',
    showRate: true,
  },
  {
    key: 'score_metal', label: 'グラフィック性能', icon: 'fa-gamepad', type: 'numeric',
    desc: 'Geekbench 6 Metalで測定したGPU性能。3Dゲームのフレームレートや映像の美しさ、動画編集時のプレビュー再生の滑らかさを左右する重要な指標です。',
    showRate: true,
  },
]

// =========================================================
// バッテリー持ち・充電周り
// =========================================================
export const SPECS_BATTERY: SpecDefinition[] = [
  {
    key: 'battery', label: 'バッテリー容量', icon: 'fa-car-battery', type: 'numeric', unit: 'mAh',
    desc: 'リチウムイオンバッテリーの容量。数値が大きいほど長時間使用できますが、チップの省電力性能やディスプレイ効率も電池持ちに影響するため、実使用時間との比較が重要です。',
  },
  {
    key: 'video', label: 'ビデオ再生', icon: 'fa-circle-play', type: 'numeric', unit: '時間',
    desc: 'Apple公式の電池持ち指標。機内モードで本体保存の動画を連続再生できる時間を測定。通信を使わない理想的な条件での最大駆動時間の目安になります。',
  },
  {
    key: 'streaming', label: 'ストリーミング再生', icon: 'fa-wifi', type: 'numeric', unit: '時間',
    desc: 'Wi-Fi経由でYouTubeやNetflixなどを連続視聴できる時間。通信による電力消費を含むため、実際の使用感に近いバッテリー持続時間の指標として参考になります。',
  },
  {
    key: 'audio', label: 'オーディオ再生', icon: 'fa-music', type: 'numeric', unit: '時間',
    desc: '画面オフ状態でApple MusicやSpotifyなどを再生できる時間。通勤・通学時にワイヤレスイヤホンで音楽を聴く方にとって重要な、省電力性能の目安です。',
  },
  {
    key: 'port', label: '充電端子', icon: 'fa-plug', type: 'text',
    desc: 'iPhone 15以降はUSB-Cに統一され、iPad・MacBook・Androidと同じケーブルで充電可能。Lightning端子のモデルは専用ケーブルが必要です。',
  },
  {
    key: 'magsafe', label: 'MagSafe', icon: 'fa-circle-notch', type: 'boolean',
    desc: 'iPhone背面に内蔵された磁石でワイヤレス充電器やアクセサリーが正確に吸着する仕組み。最大15Wの高速ワイヤレス充電に対応し、ケーブルなしで手軽に充電できます。',
  },
]

// =========================================================
// その他の機能・安全性能
// =========================================================
export const SPECS_OTHER: SpecDefinition[] = [
  {
    key: 'dynamic_island', label: 'ダイナミックアイランド', icon: 'fa-layer-group', type: 'boolean',
    desc: 'iPhone 14 Pro以降に搭載された新しいUI。画面上部のパンチホールが通知や音楽再生、タイマーなどの情報を表示するインタラクティブな領域に変化します。',
  },
  {
    key: 'action_button', label: 'アクションボタン', icon: 'fa-toggle-on', type: 'boolean',
    desc: 'iPhone 15 Pro以降で従来のミュートスイッチから進化した多機能ボタン。消音モード、カメラ起動、フラッシュライト、ショートカット実行など好みの機能を割り当て可能です。',
  },
  {
    key: 'promotion', label: 'ProMotion', icon: 'fa-arrows-rotate', type: 'boolean',
    desc: 'Proモデル限定の可変リフレッシュレート技術。画面スクロールやゲームプレイ時は120Hzで滑らかに表示し、静止画面では1Hzまで下げてバッテリーを節約します。',
  },
  {
    key: 'certification', label: '生体認証', icon: 'fa-face-smile', type: 'text',
    desc: 'iPhoneのロック解除やApple Pay決済に使用するセキュリティ機能。Face IDは顔認証で暗所やマスク着用時も対応、Touch IDは指紋認証でホームボタンまたは電源ボタンに搭載。',
  },
  {
    key: 'accident_detection', label: '衝突事故検出', icon: 'fa-car-burst', type: 'boolean',
    desc: 'iPhone 14以降に搭載された安全機能。加速度センサーとGPSで重大な自動車事故を検出し、ユーザーが応答しない場合は自動的に緊急通報サービスに連絡します。',
  },
  {
    key: 'sim', label: 'SIMカード', icon: 'fa-sim-card', type: 'text',
    desc: 'デュアルSIM対応なら仕事用とプライベート用の2回線を1台で使い分け可能。eSIM対応モデルは物理SIMなしでオンライン開通できます。',
  },
]
