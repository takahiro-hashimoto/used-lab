// ============================================================
// 中古iPadおすすめページ — 一元管理データ
// 毎年の更新時はこのファイルだけ変更すればOK
// ============================================================

// ---------- 更新年月 ----------
const now = new Date()
export const RECOMMEND_YEAR = `${now.getFullYear()}`
export const RECOMMEND_MONTH = `${now.getMonth() + 1}`
export const RECOMMEND_DATE_LABEL = `${RECOMMEND_YEAR}年${RECOMMEND_MONTH}月`

// ---------- おすすめ機種のslug一覧 ----------
export const RECOMMEND_SLUGS = [
  'normal-11',
  'mini-7',
  'air-5',
  'pro11-4',
  'pro12-6',
]

// ---------- 機種数ラベル（見出し等で使用） ----------
export const RECOMMEND_COUNT = RECOMMEND_SLUGS.length
export const RECOMMEND_COUNT_LABEL = `${RECOMMEND_COUNT}機種`

// ---------- 各機種のメタ情報 ----------
export type RecommendMeta = {
  label: string
  desc: string
  subtitle: string
  description: string[]
  good: string[]
  bad: string[]
  pencilLabel: string
  displayLabel: string
  targetUser: string
}

export const RECOMMEND_META: Record<string, RecommendMeta> = {
  'normal-11': {
    label: 'コスパ重視',
    desc: 'はじめてのiPadに最適な1台',
    subtitle: '入門用iPadの新定番',
    description: [
      '「できるだけ安くiPadを使いたい」なら、iPad 第11世代が最適です。A16 Bionicチップ搭載で、前世代のA14から処理性能が大幅に向上。動画視聴・Web閲覧・SNSはもちろん、ちょっとした書類作成やオンライン授業にも余裕を持って対応できます。',
      '10.9インチのLiquid Retinaディスプレイはフルスクリーンデザインを継続。USB-C端子を採用し、充電ケーブルも他のApple製品と統一できます。',
      'Apple Pencil（第1世代・USB-C）に対応しており、手書きメモやノート用途にも使えます。Smart Keyboard Folioも使えるため、簡易的なPC代わりとしても活躍します。',
      '2025年発売の最新モデルのため、iPadOSサポートは2032年頃まで続く見込みです。前世代の第10世代は在庫がかなり少なくなっており、価格差もそこまで大きくないため、今から買うなら第11世代がおすすめです。',
    ],
    good: [
      'とにかく安くiPadを手に入れたい',
      '動画視聴やWeb閲覧がメインの使い方',
      '子どもの学習用やサブ端末として',
    ],
    bad: [
      'Apple Pencil（第2世代）を使いたい',
      '本格的なイラスト制作や動画編集をしたい',
      'ProMotion（120Hz）の滑らかな表示が欲しい',
    ],
    pencilLabel: '第1世代(USB-C)',
    displayLabel: '10.9" Liquid Retina',
    targetUser: 'コスパ重視<br>はじめてのiPad',
  },
  'mini-7': {
    label: '携帯性重視',
    desc: '片手で持てるコンパクトiPad',
    subtitle: '小型タブレットの決定版',
    description: [
      '持ち運びやすさを最優先するなら、iPad mini 第7世代が一押しです。8.3インチの小型ディスプレイながら、A17 Proチップ搭載でiPhone 15 Proと同等の処理性能。電子書籍リーダーとしても、ゲーム機としても非常に優秀です。',
      'USB-C端子を採用し、Apple Pencil（Pro）にも対応。コンパクトなボディでありながら、メモ書きやスケッチといったクリエイティブ用途もこなせます。Apple Intelligenceにも対応しています。',
      '重量はわずか293gで、カバンに入れても負担にならないサイズ感。通勤・通学中の読書や、出先でのちょっとした作業に最適です。',
      '前世代のmini 第6世代は2021年発売でiPadOSのサポート期間が残りわずかです。小型タブレットが欲しいなら、2031年頃までサポートが続く見込みのmini 第7世代を選びましょう。',
    ],
    good: [
      '片手で持てるコンパクトなiPadが欲しい',
      '電子書籍やゲーム用途がメイン',
      '通勤・通学時に持ち歩きたい',
    ],
    bad: [
      '大画面で動画や資料を見たい',
      'キーボードを付けてPC代わりに使いたい',
      'できるだけ安くiPadを手に入れたい',
    ],
    pencilLabel: 'Pro',
    displayLabel: '8.3" Liquid Retina',
    targetUser: '携帯性重視<br>電子書籍・ゲーム',
  },
  'air-5': {
    label: 'バランス型',
    desc: 'M1チップ搭載の万能モデル',
    subtitle: 'クリエイティブもこなせる優等生',
    description: [
      '「性能も価格も妥協したくない」なら、iPad Air 第5世代が最適です。MacBookにも採用されたM1チップを搭載しており、動画編集やイラスト制作などのクリエイティブ作業も快適にこなせます。',
      '10.9インチのLiquid Retinaディスプレイは発色も鮮やかで、Apple Pencil（第2世代）とMagic Keyboardに対応。ノートPCの代わりとしても十分に使えるスペックです。',
      'USB-C端子搭載で、外部ディスプレイへの出力やデータ転送もスムーズ。8GBのRAMを搭載し、マルチタスクにも強いのが特徴です。',
      '中古市場ではAir 第6世代（M2）の登場により、M1搭載のAir 第5世代が大幅に値下がり。Proに迫る性能を、Proの半額以下で手に入れられる今が最もお買い得です。',
    ],
    good: [
      '動画編集やイラスト制作にも使いたい',
      'Magic Keyboardを使ってPC代わりにしたい',
      'Proほどの予算はないが高性能が欲しい',
    ],
    bad: [
      'とにかく安さを重視したい',
      'ProMotion（120Hz）の滑らかさが必要',
      'LiDARスキャナを使いたい',
    ],
    pencilLabel: '第2世代',
    displayLabel: '10.9" Liquid Retina',
    targetUser: 'バランス重視<br>クリエイティブ用途',
  },
  'pro11-4': {
    label: 'プロ向け',
    desc: 'M2チップ＋ProMotionの万能Pro',
    subtitle: '型落ちProのベストバイ',
    description: [
      'プロ向けの高性能iPadを手頃な価格で手に入れたいなら、iPad Pro 11インチ 第4世代が最適です。M2チップ搭載で、前世代のM1からさらに処理性能が向上。動画編集・3Dモデリング・大量のレイヤーを使ったイラスト制作も快適にこなせます。',
      'ProMotionテクノロジー（最大120Hz）による滑らかな表示は、Apple Pencilでの描画体験を大きく向上させます。LiDARスキャナ搭載で、AR関連のアプリや3Dスキャンにも対応。',
      'Thunderbolt / USB 4対応で、外部ストレージやディスプレイとの接続も高速。プロの現場でも通用するスペックを備えています。',
      '中古市場ではM4搭載の後継モデルが登場し、M2 Proの価格が大きく下落。12.9インチ 第6世代と同じM2チップを搭載しつつ、コンパクトで持ち運びやすいのが強みです。',
    ],
    good: [
      'ProMotion（120Hz）の滑らかな描画が欲しい',
      'LiDARスキャナやAR機能を使いたい',
      'Thunderbolt接続で外部機器を活用したい',
    ],
    bad: [
      'できるだけ安くiPadを手に入れたい',
      '持ち運びのしやすさを重視したい',
      'OLED（有機EL）ディスプレイが欲しい',
    ],
    pencilLabel: '第2世代',
    displayLabel: '11" Liquid Retina',
    targetUser: 'プロ性能<br>クリエイター向け',
  },
  'pro12-6': {
    label: '大画面Pro',
    desc: 'M2チップ＋12.9インチの大画面Pro',
    subtitle: '大画面Proの最高コスパ',
    description: [
      '大画面でイラストや動画編集をしたいなら、iPad Pro 12.9インチ 第6世代が最適です。M2チップ搭載で、第3世代（M1）からさらに処理性能が向上。複雑なプロジェクトも余裕を持って処理できます。',
      '12.9インチのLiquid Retina XDRディスプレイは、ミニLEDバックライトによる圧倒的なコントラスト比を実現。HDR映像の視聴や写真編集で、その画質の違いを実感できます。',
      'ProMotion（120Hz）、LiDARスキャナ、Thunderbolt / USB 4にも対応。Apple Pencil（第2世代）とMagic Keyboardを組み合わせれば、プロのクリエイティブワークステーションとして活躍します。',
      '中古市場ではM4搭載のiPad Pro 13インチが登場し、12.9インチ 第6世代の価格が大きく下がっています。大画面Proを最もお得に手に入れられるタイミングです。',
    ],
    good: [
      '大画面でイラストや動画編集をしたい',
      'ミニLED（XDRディスプレイ）の高画質が欲しい',
      'ノートPC代わりに本格的に使いたい',
    ],
    bad: [
      '持ち運びのしやすさを重視したい',
      'できるだけ安く抑えたい',
      'OLED（有機EL）ディスプレイが欲しい',
    ],
    pencilLabel: '第2世代',
    displayLabel: '12.9" Liquid Retina XDR',
    targetUser: '大画面<br>プロ作業向け',
  },
}

// ---------- ショップセクション用ショップID ----------
export const SHOP_SECTION_IDS = [1, 2, 3, 6, 7]

// ---------- JSON-LD FAQ用データ ----------
export const FAQ_JSONLD_ITEMS = [
  {
    question: '中古iPadのおすすめはどれ？',
    answer: `${RECOMMEND_DATE_LABEL}現在、「iPad 第11世代」「iPad mini 第7世代」「iPad Air 第5世代」「iPad Pro 11インチ 第4世代」「iPad Pro 12.9インチ 第6世代」の${RECOMMEND_COUNT}機種がおすすめです。コスパ重視ならiPad 第11世代、携帯性ならiPad mini 第7世代、バランス重視ならiPad Air 第5世代、プロ性能ならiPad Pro 11インチ 第4世代、大画面ならiPad Pro 12.9インチ 第6世代が最適です。`,
  },
  {
    question: '中古iPadを選ぶときのポイントは？',
    answer: '以下の3つを基準に選ぶことをおすすめします。iPadOSサポートが十分に残っていること（2029年以降まで）、用途に合った性能があること（動画視聴ならA14以上、クリエイティブ用途ならM1以上が目安）、中古価格と性能のバランスが良いこと（年単価で比較）。',
  },
  {
    question: '中古iPadはどこで買うのがおすすめ？',
    answer: '中古タブレット専門店での購入をおすすめします。専門の検品担当者がチェック済みで、初期不良対応などの保証が付いており、トラブル時のサポート体制が整っています。イオシス（在庫豊富・3〜6ヶ月保証）、ゲオ（在庫数豊富）、じゃんぱら（品質重視）などが信頼性が高くおすすめです。',
  },
  {
    question: '中古iPadを買うときの注意点は？',
    answer: '購入前に以下の4点を必ずチェックしましょう。バッテリーの劣化具合（最大容量80%以上が目安）、iPadOSサポート期間（発売から約7年がサポートの目安）、ショップ保証の有無（イオシスなら3〜6ヶ月保証など）、Wi-FiモデルかCellularモデルかの確認（外出先でも使うならCellular推奨）。',
  },
  {
    question: '型落ちiPadは何年使える？',
    answer: `Appleは発売から約7年でiPadOSサポートを終了する傾向があります。${RECOMMEND_YEAR}年時点でおすすめしている${RECOMMEND_COUNT}機種は、いずれも2028年以降までサポートされる見込みです。サポート終了後も動作はしますが、セキュリティリスクが高まり、新しいアプリが使えなくなる可能性があるため、サポート期間内での利用をおすすめします。`,
  },
  {
    question: 'Apple認定整備済製品と中古iPadの違いは？',
    answer: 'Apple認定整備済製品はAppleが検品・部品交換・クリーニングを行い、バッテリーと外装が新品に交換済みで1年間のApple保証が付きます。価格は新品の最大15%引きです。一方、中古iPadは価格が整備済製品よりさらに安く、旧モデルを含め機種の選択肢が豊富です。状態の良さ・保証を重視するなら整備済製品、価格と機種の選択肢を重視するなら中古ショップがおすすめです。',
  },
  {
    question: `おすすめしない中古iPadはどれ？`,
    answer: `${RECOMMEND_YEAR}年現在、iPadOSサポートが終了済みまたは終了間近のモデルはセキュリティリスクが高いためおすすめしません。また、ストレージ32GBのモデルはアプリを数個入れるだけで容量不足になり、iPadはSDカードで増設できないため致命的です。サポート残が1〜2年以内のモデルも買ってすぐサポート切れになるリスクがあります。最低でも64GB以上のモデルを選びましょう。`,
  },
]
