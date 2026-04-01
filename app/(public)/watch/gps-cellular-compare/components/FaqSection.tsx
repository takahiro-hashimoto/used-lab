export const FAQ_ITEMS = [
  {
    question: 'GPSモデルとセルラーモデルの違いは？',
    answer: 'GPSモデルはiPhoneとペアリングして使うタイプで、通信はBluetoothやWi-Fi経由でiPhoneに依存します。セルラーモデルはeSIMを内蔵しておりLTE通信に対応しているため、iPhoneが手元になくても通話やLINE、Apple Musicのストリーミングなどが単体で利用可能です。さらにステンレスやチタニウムなどの素材を選べるのはセルラーモデルのみで、通信費（月額385〜550円）が発生します。',
  },
  {
    question: 'GPSモデルとセルラーモデルの見分け方はある？',
    answer: '外観で見分けるならデジタルクラウンに注目してください。赤いリングやドットがあるのがセルラーモデル、ないものがGPSモデルです。また、ケース素材（ステンレス・チタニウムはセルラーのみ）や背面の刻印でも判別できます。中古で購入する際は必ずチェックしましょう。',
  },
  {
    question: 'セルラーモデルは通信契約なしでも使える？',
    answer: 'はい、セルラーモデルでも通信契約なしで使うことが可能です。通信機能をオフにすればGPSモデルと同様にiPhone経由で通知や決済、ヘルスケア機能が利用できます。ステンレスやチタニウム素材が欲しいけれど通信契約は不要という方におすすめの使い方です。',
  },
  {
    question: 'セルラーモデルの契約方法は？',
    answer: 'ドコモ・au・ソフトバンク・楽天モバイル・ahamoなどの通信キャリアで契約可能です。iPhoneとペアリング後、各社のワンナンバーサービスやナンバーシェアなどのオプション（月額385〜550円）を申し込むことで、Apple Watch単体でのLTE通信が可能になります。',
  },
  {
    question: '格安SIM（MVNO）でもセルラーモデルは使える？',
    answer: '現時点では多くの格安SIM（MVNO）ではApple Watchのセルラー通信は非対応です。povo・LINEMO・Y!mobile・UQモバイルなどのサブブランドも対応していません。Apple Watchのセルラー通信にはナンバーシェアやワンナンバーサービスなど専用オプションが必要で、ドコモ・au・ソフトバンク・楽天モバイル・ahamoなどの大手キャリア回線のみ対応となっています。',
  },
  {
    question: 'GPSモデルを後からセルラーモデルに変更できる？',
    answer: 'いいえ、GPSモデルとセルラーモデルはハードウェアが異なるため、購入後に変更することはできません。GPSモデルにはeSIMが搭載されていないため、watchOSのアップデートなどでセルラー通信に対応させることも不可能です。セルラー機能が必要になった場合は、セルラーモデルを新たに購入する必要があります。',
  },
  {
    question: 'セルラーモデルのApple Watchは海外でも使える？',
    answer: '2024年のwatchOS 11以降、一部のキャリアで国際ローミングに対応しています。ただし対応キャリアや渡航先は限定的で、追加料金が発生するケースもあります。海外旅行時にApple Watch単体で通信したい場合は、事前にご利用のキャリアのローミング対応状況を確認しておきましょう。',
  },
  {
    question: 'GPSとセルラーどっちを選べば後悔しない？',
    answer: '迷っているならまずはGPSモデルがおすすめです。多くの方はiPhoneを常に持ち歩いているため、セルラー通信が必要になるシーンは限られます。逆に「iPhoneなしでランニングしたい」「子どもに持たせたい」など明確な理由があるならセルラーモデルを選びましょう。購入後に変更はできないため、自分の使い方を具体的にイメージしてから判断すると後悔しにくいです。',
  },
  {
    question: 'Apple Watch Ultraはセルラーモデルだけ？',
    answer: 'はい、Apple Watch UltraはGPS+セルラーモデルのみの展開です。GPSモデルは存在しません。ただしセルラー契約は必須ではなく、通信契約なしでGPSモデルと同じように使うことも可能です。49mmの大型チタニウムケースや長時間バッテリーが特徴で、アウトドアやスポーツ用途に適しています。',
  },
]

export default function FaqSection() {
  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
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
              <div className="faq-answer m-rich-text m-rich-text--muted">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
