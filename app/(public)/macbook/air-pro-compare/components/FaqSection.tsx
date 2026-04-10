const faqItems = [
  {
    question: 'AirとProで同じチップなら性能は同じ？',
    answer: 'はい、同じチップ（例：M4）であれば基本的な処理性能は同等です。ただし<strong>Proはファン搭載のため、長時間の高負荷作業でも性能が落ちにくい</strong>という違いがあります。\n短時間の作業であればほぼ差は感じません。',
  },
  {
    question: 'ファンレスだと壊れやすい？',
    answer: 'いいえ、ファンレス設計は可動部品がないため、むしろ故障リスクは低いと言えます。MacBook AirのApple Siliconチップは省電力設計のため、ファンなしでも十分に冷却できるよう設計されています。',
  },
  {
    question: 'MacBook Proの方が長持ちする？',
    answer: 'macOSのサポート期間はAirもProも同世代なら同じです。ハードウェアの耐久性に大きな差はありません。\n長く使えるかどうかは<strong>チップの世代（M1〜M4）で決まる</strong>ため、AirでもProでも発売年が新しいモデルほど長く使えます。',
  },
  {
    question: '13インチAirと14インチProで迷っています',
    answer: '日常作業がメインなら<strong>13インチAirがコスパ最強</strong>です。動画編集やプログラミングで高負荷の作業が多いなら、ファン搭載・ポート豊富な14インチProが安心です。\n「迷ったらAir」が基本方針ですが、明確にProが必要な用途があればProを選びましょう。',
  },
  {
    question: '中古で買うならAirとProどちらがお得？',
    answer: 'コスパを重視するなら<strong>中古MacBook Airがおすすめ</strong>です。同世代で比較するとAirの方が3〜5万円ほど安い傾向があり、日常用途での性能差はほぼありません。\nただし中古Proは新品時からの値下がり幅が大きいため、用途が合えばPro中古も狙い目です。',
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
        <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="m-card m-card--shadow faq-item"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 className="faq-question" itemProp="name">
                {item.question}
              </h3>
              <div
                className="faq-answer m-rich-text m-rich-text--muted"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                aria-label={item.answer.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')}
              >
                {item.answer.split('\n').map((paragraph, i) => (
                  <p key={i} itemProp={i === 0 ? 'text' : undefined} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
