const GLOSSARY_ITEMS = [
  {
    title: 'CPU',
    desc: 'iPhoneの頭脳にあたるチップで、全体的な処理速度や電力効率に大きく影響。A16やA17 Proなどの世代ごとに性能が進化。',
  },
  {
    title: 'RAM',
    desc: 'アプリの同時使用やゲーム、動画編集などの処理性能に関わるメモリ容量。数値が大きいほど動作がスムーズ。',
  },
  {
    title: 'バッテリー容量',
    desc: 'mAh（ミリアンペアアワー）で表される電池の容量。容量が大きいほど長時間の使用が可能だが、省電力設計とのバランスも重要。',
  },
  {
    title: 'USB-C対応',
    desc: 'iPhone 15以降で採用。MacやiPadとケーブル共有ができ、外部ストレージやディスプレイとの接続、他デバイスへの給電も可能。',
  },
  {
    title: 'MagSafe対応',
    desc: '背面の磁力でアクセサリを固定。ワイヤレス充電やカードケースの装着が簡単でズレにくい。',
  },
  {
    title: 'Dynamic Island対応',
    desc: '画面上部に通話や音楽再生、タイマーなどを表示。アプリを切り替えず操作や確認が可能。',
  },
  {
    title: '衝突事故検出',
    desc: '車の衝突など大きな衝撃を検知し、反応がない場合は自動で緊急通報。',
  },
  {
    title: 'ProMotion',
    desc: '最大120Hzの高リフレッシュレートに対応。スクロールや操作が滑らかになるのが特徴。',
  },
  {
    title: 'Apple Intelligence',
    desc: '要約、画像生成、自然言語操作などを実現するAI機能。デバイス上で処理し、プライバシーにも配慮。',
  },
  {
    title: 'アクションボタン',
    desc: '本体側面の物理ボタンに好みの機能を割り当て可能。カメラ起動やショートカット実行に対応。',
  },
  {
    title: 'カメラコントロール',
    desc: 'ボタン操作で即カメラを起動し、シャッター操作が可能。素早く撮影できる。',
  },
  {
    title: 'アクションモード',
    desc: '動きの多いシーンでも手ブレを抑え、滑らかな映像を記録。アウトドア撮影に最適。',
  },
  {
    title: 'シネマティックモード',
    desc: '背景をぼかし被写体にフォーカス。映画のような映像が撮影可能。フォーカスの変更も後から対応。',
  },
  {
    title: 'マクロモード',
    desc: '被写体に数センチまで近づいて撮影。小さな物の質感やディテールを高精細に記録。',
  },
  {
    title: 'ポートレートモード',
    desc: '背景をぼかし、人物を強調した写真を撮影。ライティング効果などの演出も可能。',
  },
  {
    title: 'ナイトモード',
    desc: '暗所でも明るく鮮明な写真を自動調整で撮影。長時間露光と手ブレ補正に対応。',
  },
  {
    title: 'LiDARスキャナ',
    desc: 'レーザーで距離を測定し、空間の3Dマッピングを実現。AR体験や暗所でのピント合わせにも有効。',
  },
  {
    title: 'Apple ProRAW',
    desc: '多くの情報を保持したRAW形式で撮影可能。高精度な編集に対応し、プロ仕様の仕上がりに。',
  },
  {
    title: 'Apple ProRes',
    desc: '高画質な映像を記録できるフォーマット。豊かな階調と高い編集耐性が特徴。',
  },
]

export default function GlossarySection() {
  return (
    <section className="l-section l-section--bg-subtle" id="glossary" aria-labelledby="heading-glossary">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-glossary">
          iPhone 各機能の用語解説
        </h2>
        <p className="m-section-desc">
          iPhoneのスペック表に登場する主要な機能や用語をわかりやすく解説します。<br />
          各機能の意味を理解することで、自分に合ったiPhone選びに役立ちます。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg glossary-grid">
          {GLOSSARY_ITEMS.map((item) => (
            <div key={item.title} className="m-card m-card--shadow glossary-grid__item">
              <h3 className="glossary-grid__title">{item.title}</h3>
              <p className="glossary-grid__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
