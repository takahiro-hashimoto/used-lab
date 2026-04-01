import Image from 'next/image'

const DETAILS = [
  {
    id: 'detail-charging',
    title: '充電方式',
    image: '/images/content/apple-pencil-magnetic-charging-method.jpg',
    items: [
      { label: 'Pro・第2世代', text: 'iPadのMagnet充電端子にくっつけるだけで充電可能' },
      { label: '第1世代', text: '充電にはLightningケーブルが必須' },
      { label: 'USB-C', text: '充電にはUSB-Cケーブルが必須' },
    ],
  },
  {
    id: 'detail-findmy',
    title: '探す（Find My）対応',
    image: '/images/content/thumbnail/findmy.jpg',
    items: [
      { label: '', text: 'Appleの「探す」アプリを使って、Apple Pencilの現在地を地図上で確認できる機能です。Apple Pencilはコンパクトなので、カバンの中やソファの隙間に紛れがちですが、iPhoneやiPadからすぐに場所を特定できます。' },
      { label: '', text: 'Apple Pencil Proのみに搭載。第2世代・USB-C・第1世代には非搭載のため、紛失が心配な方はProがおすすめです。' },
    ],
  },
  {
    id: 'detail-tilt',
    title: '傾き検知',
    image: '/images/content/apple-pencil-tilt-detection-sensor.jpg',
    items: [
      { label: '', text: 'ペンの傾きを検出し、立てれば細い線、寝かせれば太く薄い線が描ける機能です。実際の鉛筆と同じ感覚で線の太さや濃淡を表現でき、イラストやスケッチに欠かせません。' },
      { label: '', text: 'USB-Cを含む全モデルに搭載。どのApple Pencilでも利用できます。' },
    ],
  },
  {
    id: 'detail-pressure',
    title: '筆圧感知',
    image: '/images/content/apple-pencil-pressure-sensitivity.jpg',
    items: [
      { label: '', text: 'ペン先にかける力の強弱で、線の太さや濃さがリアルタイムに変化する機能です。軽いタッチで薄く細い線、強く押せば太く濃い線が描けるため、紙に描くような自然な書き心地を実現します。' },
      { label: '', text: 'Pro・第2世代・第1世代に搭載。USB-Cは非対応のため、イラストや手書きを重視する方はUSB-C以外を選びましょう。' },
    ],
  },
  {
    id: 'detail-doubletap',
    title: 'ダブルタップ切り替え',
    image: '/images/content/apple-pencil-double-tap-switch.jpg',
    items: [
      { label: '', text: 'ペンの平面を指で2回タップするだけで、ペンと消しゴムなどのツールを瞬時に切り替えられる機能です。画面上のツールバーまで手を動かす必要がなく、ペンを持ったまま操作が完結します。' },
      { label: '', text: 'Apple Pencil ProとApple Pencil 第2世代に搭載。' },
    ],
  },
  {
    id: 'detail-hover',
    title: 'ホバー機能',
    image: '/images/content/apple-pencil-hover-preview.jpg',
    items: [
      { label: '', text: 'ペン先を画面に近づけると、触れる前にカーソルやブラシのプレビューが表示される機能です。描き始める前にブラシの太さや位置を確認できるため、より正確な描画が可能になります。' },
      { label: '', text: 'Apple Pencil ProとApple Pencil 第2世代で利用可能。' },
    ],
  },
  {
    id: 'detail-barrel',
    title: 'バレルロール',
    image: '/images/content/apple-pencil-barrel-roll-rotation.jpg',
    items: [
      { label: '', text: 'ペンを指で回転させると、ブラシの向きが連動して変わる機能です。万年筆やマーカーなど、ペンの角度で表現が変わるブラシで真価を発揮し、アナログに近い直感的な描画体験ができます。' },
      { label: '', text: 'Apple Pencil Proのみに搭載。' },
    ],
  },
  {
    id: 'detail-squeeze',
    title: 'スクイーズ',
    image: '/images/content/thumbnail/ipad-image-08.jpg',
    items: [
      { label: '', text: 'ペンをギュッと握ると、ペン先のすぐ近くにツールパレット（色やブラシの選択画面）がポップアップ表示される機能です。描いている場所から手を離さず、色やブラシを素早く変更できるため、作業の流れが途切れません。' },
      { label: '', text: 'Apple Pencil Proのみに搭載。' },
    ],
  },
  {
    id: 'detail-haptic',
    title: '触覚フィードバック',
    image: '/images/content/apple-pencil-haptic-feedback.jpg',
    items: [
      { label: '', text: 'スクイーズやダブルタップの操作時に、Apple Pencilが「コツッ」と軽く振動する機能です。画面を見なくても操作が受け付けられたことを指先で確認でき、操作ミスを防ぎながらスムーズに作業を進められます。' },
      { label: '', text: 'Apple Pencil Proのみに搭載。' },
    ],
  },
]

export default function PencilDetailSection() {
  return (
    <section className="l-section" id="pencil-detail" aria-labelledby="heading-pencil-detail">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pencil-detail">
          Apple Pencilの違い・機能解説
        </h2>
        <p className="m-section-desc">
          Apple Pencil世代別比較表の中で触れた各項目について詳細を解説します。
        </p>

        <div className="pencil-detail-list">
          {DETAILS.map((d) => (
            <div key={d.id} id={d.id} className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  src={d.image}
                  alt={d.title}
                  width={240}
                  height={160}
                  loading="lazy"
                  className="popular-card-img"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-title">{d.title}</p>
                {d.items.map((item, i) => (
                  <div key={i} className="pencil-detail-item">
                    {item.label && <p className="pencil-detail-item__label"><strong>{item.label}</strong></p>}
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
