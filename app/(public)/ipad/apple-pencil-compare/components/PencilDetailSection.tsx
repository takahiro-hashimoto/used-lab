import Image from 'next/image'

const DETAILS = [
  {
    id: 'detail-charging',
    title: '充電方式',
    image: '/images/content/apple-pencil-magnetic-charging-method.jpg',
    items: [
      { label: 'Pro・第2世代', text: 'iPadのMagnet充電端子にくっつけるだけで充電可能。Bluetoothで自動ペアリングされ、ケーブル不要で手軽に充電もできます。' },
      { label: '第1世代', text: 'iPad本体から直接充電はできず、Lightningケーブルを用いた充電が必要。' },
      { label: 'USB-C', text: 'iPad本体から直接充電はできず、USB-Cケーブルを用いた充電が必要。' },
    ],
  },
  {
    id: 'detail-findmy',
    title: '探す（Find My）対応',
    image: '/images/content/apple-pencil-find-my-tracking.jpg',
    items: [
      { label: '', text: 'Appleが提供する「探す」アプリを使って、Apple Pencilの現在地を地図上で確認できる機能です。Apple Pencilはコンパクトなアクセサリーなので、カバンの中やソファの隙間に紛れてしまうことがよくあります。「探す」機能があれば、iPhoneやiPadから場所を特定して効率よく見つけることができます。' },
      { label: '', text: 'この機能はApple Pencil Proのみに搭載されています。第2世代・USB-C・第1世代には非搭載のため、紛失が心配な方はProモデルを選ぶと安心です。' },
    ],
  },
  {
    id: 'detail-tilt',
    title: '傾き検知',
    image: '/images/content/apple-pencil-tilt-detection-sensor.jpg',
    items: [
      { label: '', text: 'Apple Pencilに内蔵されたセンサーが、ペンを傾けた角度を正確に検出する機能です。たとえば、ペンを立てて持つと細い線が描け、鉛筆のように寝かせて持つと太く薄い線になります。実際の鉛筆やペンと同じ感覚で線の太さや濃淡を表現できるため、イラスト制作やスケッチをする方にとって欠かせない機能です。' },
      { label: '', text: 'USB-Cモデルを含む全てのApple Pencilに搭載されているため、どのモデルを選んでもこの機能を利用できます。' },
    ],
  },
  {
    id: 'detail-pressure',
    title: '筆圧感知',
    image: '/images/content/apple-pencil-pressure-sensitivity.jpg',
    items: [
      { label: '', text: 'ペン先にかける力の強さを検知して、線の太さや濃さをリアルタイムに変化させる機能です。軽くタッチすれば薄く細い線、強く押し込めば太く濃い線が描けます。低遅延で入力が反映されるため、紙にペンで描くときと同じ書き心地で使えます。手書きメモからプロのイラスト制作まで幅広い用途で活躍します。' },
      { label: '', text: 'Apple Pencil Pro・第2世代・第1世代に搭載されています。USB-Cモデルには非搭載のため、イラストや手書きを重視する方はUSB-C以外のモデルを選びましょう。' },
    ],
  },
  {
    id: 'detail-doubletap',
    title: 'ダブルタップ切り替え',
    image: '/images/content/apple-pencil-double-tap-switch.jpg',
    items: [
      { label: '', text: 'Apple Pencilの平らな面を指で2回軽くタップするだけで、ペンと消しゴムなどのツールを瞬時に切り替えられる機能です。通常であれば画面上のツールバーまで手を動かして切り替える必要がありますが、ダブルタップ機能があればペンを持ったまま操作が完結します。' },
      { label: '', text: 'ノートアプリでの書き直しや、お絵かきアプリでの色・ツール切り替えなど、頻繁にツールを変更する場面で作業効率が大幅にアップします。Apple Pencil ProとApple Pencil 第2世代に搭載されています。' },
    ],
  },
  {
    id: 'detail-hover',
    title: 'ホバー機能',
    image: '/images/content/apple-pencil-hover-preview.jpg',
    items: [
      { label: '', text: 'Apple Pencilのペン先を画面に近づけると、触れる前にカーソルやブラシのプレビューが表示される機能です。描き始める前にブラシの太さや位置を確認できるため、より正確な位置から描画を開始でき、作業効率が向上します。' },
      { label: '', text: 'Apple Pencil ProおよびApple Pencil 第2世代で利用可能です。' },
    ],
  },
  {
    id: 'detail-barrel',
    title: 'バレルロール',
    image: '/images/content/apple-pencil-barrel-roll-rotation.jpg',
    items: [
      { label: '', text: 'Apple Pencilを指で回転させると、その動きに連動してペンツールやブラシの向きが変わる機能です。たとえば万年筆ブラシを使っているとき、ペンを傾けたり回したりすることで線の太さや角度が自然に変化します。' },
      { label: '', text: 'カリグラフィー（装飾文字）やマーカーなど、ペンの向きによって表現が変わるブラシを使うときに真価を発揮します。実際のペンを回す感覚でデジタル描画ができるため、アナログに近い直感的な表現が可能になります。' },
    ],
  },
  {
    id: 'detail-squeeze',
    title: 'スクイーズ',
    image: '/images/content/apple-pencil-squeeze-gesture.jpg',
    items: [
      { label: '', text: 'Apple Pencilをギュッと握り込むと、ペン先のすぐ近くにツールパレット（色やブラシの選択画面）がポップアップ表示される機能です。通常であれば画面の端にあるツールバーまで手を伸ばす必要がありますが、スクイーズを使えば今描いている場所のすぐそばでツールを変更できます。' },
      { label: '', text: '作業の流れを中断せずにペン先の種類や色を素早く変更できるため、イラスト制作やデザイン作業の効率が格段に向上します。' },
    ],
  },
  {
    id: 'detail-haptic',
    title: '触覚フィードバック',
    image: '/images/content/apple-pencil-haptic-feedback.jpg',
    items: [
      { label: '', text: 'スクイーズやダブルタップなどの操作をしたときに、Apple Pencilが「コツッ」と軽く振動して手に伝える機能です。画面を見なくても「操作が受け付けられた」ことが指先の感覚でわかるため、操作ミスを防ぎながらスムーズに作業を進められます。' },
      { label: '', text: 'スマートフォンのバイブレーションと似た仕組みですが、非常に繊細で自然な振動なので、作業の邪魔になることはありません。' },
    ],
  },
]

export default function PencilDetailSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="pencil-detail" aria-labelledby="heading-pencil-detail">
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
