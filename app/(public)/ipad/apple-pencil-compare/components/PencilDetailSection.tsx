import Image from 'next/image'

const DETAILS = [
  {
    id: 'detail-charging',
    title: '充電方式',
    image: '/images/content/thumbnail/apple-pencil-charge.jpg',
    models: [],
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
    models: ['Pro'],
    items: [
      { label: '', text: 'Appleの「探す」アプリを使って、Apple Pencilの現在地を地図上で確認できる機能です。Apple Pencilはコンパクトなので、カバンの中やソファの隙間に紛れがちですが、iPhoneやiPadからすぐに場所を特定できます。' },
    ],
  },
  {
    id: 'detail-tilt',
    title: '傾き検知',
    image: '/images/content/thumbnail/apple-pencil-5.jpg',
    models: ['Pro', '第2世代', 'USB-C', '第1世代'],
    items: [
      { label: '', text: 'ペンの傾きを検出し、立てれば細い線、寝かせれば太く薄い線が描ける機能です。実際の鉛筆と同じ感覚で線の太さや濃淡を表現でき、イラストやスケッチに欠かせません。' },
    ],
  },
  {
    id: 'detail-pressure',
    title: '筆圧感知',
    image: '/images/content/thumbnail/apple-pencil-2.jpg',
    models: ['Pro', '第2世代', '第1世代'],
    items: [
      { label: '', text: 'ペン先にかける力の強弱で、線の太さや濃さがリアルタイムに変化する機能です。軽いタッチで薄く細い線、強く押せば太く濃い線が描けるため、紙に描くような自然な書き心地を実現します。' },
    ],
  },
  {
    id: 'detail-doubletap',
    title: 'ダブルタップ切り替え',
    image: '/images/content/thumbnail/apple-pencil-3.jpg',
    models: ['Pro', '第2世代'],
    items: [
      { label: '', text: 'ペンの平面を指で2回タップするだけで、ペンと消しゴムなどのツールを瞬時に切り替えられる機能です。画面上のツールバーまで手を動かす必要がなく、ペンを持ったまま操作が完結します。' },
    ],
  },
  {
    id: 'detail-hover',
    title: 'ホバー機能',
    image: '/images/content/thumbnail/apple-pencil-5.jpg',
    models: ['Pro', '第2世代'],
    items: [
      { label: '', text: 'ペン先を画面に近づけると、触れる前にカーソルやブラシのプレビューが表示される機能です。描き始める前にブラシの太さや位置を確認できるため、より正確な描画が可能になります。' },
    ],
  },
  {
    id: 'detail-barrel',
    title: 'バレルロール',
    image: '/images/content/thumbnail/ipad-image-07.jpg',
    models: ['Pro'],
    items: [
      { label: '', text: 'ペンを指で回転させると、ブラシの向きが連動して変わる機能です。万年筆やマーカーなど、ペンの角度で表現が変わるブラシで真価を発揮し、アナログに近い直感的な描画体験ができます。' },
    ],
  },
  {
    id: 'detail-squeeze',
    title: 'スクイーズ',
    image: '/images/content/thumbnail/ipad-image-08.jpg',
    models: ['Pro'],
    items: [
      { label: '', text: 'ペンをギュッと握ると、ペン先のすぐ近くにツールパレット（色やブラシの選択画面）がポップアップ表示される機能です。描いている場所から手を離さず、色やブラシを素早く変更できるため、作業の流れが途切れません。' },
    ],
  },
  {
    id: 'detail-haptic',
    title: '触覚フィードバック',
    image: '/images/content/thumbnail/ipad-image-12.jpg',
    models: ['Pro'],
    items: [
      { label: '', text: 'スクイーズやダブルタップの操作時に、Apple Pencilが「コツッ」と軽く振動する機能です。画面を見なくても操作が受け付けられたことを指先で確認でき、操作ミスを防ぎながらスムーズに作業を進められます。' },
    ],
  },
]

const ALL_MODELS = ['Pro', '第2世代', 'USB-C', '第1世代']

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
            <div key={d.id} id={d.id} className="m-card m-card--shadow m-card--padded media-card--aside">
              <div className="media-card__img-wrap">
                <Image
                  src={d.image}
                  alt={d.title}
                  width={240}
                  height={160}
                  loading="lazy"
                  className="media-card__img"
                />
              </div>
              <div className="media-card__body">
                <h3 className="media-card__title">{d.title}</h3>
                {d.items.map((item, i) => (
                  <div key={i} className="pencil-detail-item">
                    {item.label && <p className="pencil-detail-item__label"><strong>{item.label}</strong></p>}
                    <p>{item.text}</p>
                  </div>
                ))}
                {d.models.length > 0 && (
                  <p className="pencil-model-labels">
                    <span className="pencil-model-labels__title">対応モデル</span>
                    {ALL_MODELS.map((m) => (
                      <span
                        key={m}
                        className={d.models.includes(m) ? 'pencil-model-label pencil-model-label--active' : 'pencil-model-label pencil-model-label--inactive'}
                      >
                        {m}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

