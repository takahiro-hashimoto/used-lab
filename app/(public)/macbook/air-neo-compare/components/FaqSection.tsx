const faqItems = [
  {
    question: 'MacBook NeoはMacBook Airより安いのはなぜ？',
    answer: 'MacBook NeoはA18 Proチップを採用し、8GBメモリ固定・MagSafeなし・シンプルなポート構成など、全体の仕様を絞ることで低価格を実現していると考えられます。MacBook Airはメモリやストレージの選択肢、Thunderbolt 4、外部ディスプレイ対応などが広く、そのぶん価格も上がります。',
  },
  {
    question: 'MacBook NeoとAirはどちらが長く使えますか？',
    answer: 'macOSのサポート期間は発売年によって決まるため、<strong>同じ2026年以降に購入するなら差はほぼありません</strong>。ただし中古でM1 Airを購入する場合、NeoやM4 Airより早くサポートが終了する可能性があります。長期使用を重視するなら現行モデル（NeoまたはM4 Air）が安心です。',
  },
  {
    question: 'MacBook NeoでApple Intelligenceは使えますか？',
    answer: 'はい、MacBook NeoはApple Intelligenceに対応しています。文章生成・要約・画像生成などのAI機能を使いたい方に向いています。なお、MacBook AirもM1以降のApple SiliconモデルならApple Intelligence対応なので、AI機能だけでなくメモリ容量や価格差も合わせて選ぶのがおすすめです。',
  },
  {
    question: '中古MacBook AirとMacBook Neo、どちらを選ぶべきですか？',
    answer: '予算を最重視するなら<strong>中古MacBook Air（M1/M2）が55,980円〜</strong>でコスパのよい選択肢です。Apple Intelligence・最新デザインにこだわるなら新品のNeo（99,800円〜）も検討に値します。動画編集やプログラミングをするならメモリ16GB以上を確保しやすい中古Airが向いています。',
  },
  {
    question: 'MacBook NeoにMagSafeがないのは不便ですか？',
    answer: 'MagSafeは充電ケーブルが磁石で接続されるため、引っかかってもすぐ外れ本体を守れる安全機構です。NeoはUSB-Cのみの充電で<strong>充電中は実質1ポートしか使えない</strong>点は不便に感じる場面もあります。ただし外出先でポート数が気にならない方には問題ありません。',
  },
]

export default function FaqSection() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace(/<[^>]*>/g, '').replace(/\n/g, ' '),
      },
    })),
  }

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          よくある質問
        </h2>
        <div className="faq-list">
          {faqItems.map((item) => (
            <div key={item.question} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">
                {item.answer.split('\n').map((paragraph, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
