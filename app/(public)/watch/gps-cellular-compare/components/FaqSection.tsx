export const FAQ_ITEMS = [
  {
    question: 'GPSモデルとセルラーモデルの違いは？',
    answer: 'GPSモデルはiPhoneと連携して使うタイプで、通信機能はWi-FiやBluetoothのみです。セルラーモデルはeSIMを内蔵しており、iPhoneが手元になくても通話やメッセージ、音楽ストリーミングなどが可能です。さらにステンレスやチタニウムなどの素材を選べるのはセルラーモデルのみで、通信費（月額385〜550円）が発生します。',
  },
  {
    question: 'GPSモデルとセルラーモデルの見分け方はある？',
    answer: '外観で見分けるならデジタルクラウンに注目してください。赤いリングやドットがあるのがセルラーモデル、ないものがGPSモデルです。また、ケース素材や背面の刻印でも判別できます。',
  },
  {
    question: 'セルラーモデルは契約しなくても使える？',
    answer: 'はい、セルラーモデルでも通信契約なしで使うことが可能です。通信機能をオフにすればGPSモデルと同様にiPhone経由で通知や決済、ヘルスケア機能が利用できます。ステンレスやチタニウム素材を選びたい方におすすめの使い方です。',
  },
  {
    question: 'セルラーモデルの契約方法は？',
    answer: 'ドコモ・au・ソフトバンク・楽天モバイル・ahamoなどの通信キャリアで契約可能です。iPhoneとペアリング後、各社のワンナンバーサービスやナンバーシェアなどのオプション（月額385〜550円）を申し込むことで、Apple Watch単体での通信が可能になります。',
  },
  {
    question: '格安SIMでもセルラーモデルのApple Watchは使える？',
    answer: '現時点では多くの格安SIM（MVNO）ではApple Watchのセルラー通信は非対応です。eSIM通信にはナンバーシェアやワンナンバーサービスなど専用オプションが必要で、ドコモ・au・ソフトバンク・楽天モバイル・ahamoなどの大手キャリア回線のみ対応となっています。',
  },
]

export default function FaqSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          GPSとセルラーモデルを選ぶときによくある質問
        </h2>
        <p className="m-section-desc">
          Apple WatchのGPSモデルとセルラーモデルについて、よくある疑問をまとめました。
        </p>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="m-card faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
