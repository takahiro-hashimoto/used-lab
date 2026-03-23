export const FAQ_ITEMS = [
  {
    question: 'Apple Watchで常時点灯に対応しているモデルは？',
    answer: 'Apple Watchシリーズ5以降のモデルは常時点灯に対応しています。ただし、Apple Watch SE（第1世代・第2世代）は対象外となっています。',
  },
  {
    question: 'アップルウォッチの常時点灯ありなしでバッテリー持ち（消費スピード）にはどれくらいの差が出ますか？',
    answer: '常時点灯ありのモデルを1日装着して過ごしたところ、バッテリーの減りは非対応モデルに比べて約1.5倍早いという結果になりました。使用状況にもよりますが、バッテリー持ちを重視する方は非対応モデルの方が安心です。',
  },
  {
    question: 'Apple Watchの常時点灯をONにして使い続けると画面の焼き付きが発生しますか？',
    answer: 'Apple Watchは有機ELディスプレイを採用しているため、長期間同じ画面を表示し続けると焼き付きのリスクがあります。ただし、文字盤を定期的に変更する、画面の明るさを抑えるなどの工夫でリスクを軽減できます。',
  },
  {
    question: '常時点灯をオフにするとどんな場面で困る？',
    answer: '常時点灯をオフにすると、手首を上げたり画面をタップしないと表示が見えないため、仕事中や運動中など片手がふさがっている場面ではやや不便に感じることがあります。一方で、周囲に画面を見られたくない場面ではメリットになることもあります。',
  },
]

export default function AlwaysLitFaqSection() {
  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          アップルウォッチの常時点灯に関するよくある質問
        </h2>
        <p className="m-section-desc">
          Apple Watchの常時点灯ディスプレイについて、よく寄せられる疑問をまとめました。
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
