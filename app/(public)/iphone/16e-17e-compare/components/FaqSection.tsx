const faqItems = [
  {
    question: 'iPhone 16eと17eで体感の処理速度に差はある？',
    answer: 'A18からA19への世代アップにより性能向上はありますが、SNS・Web閲覧・動画視聴などの日常的な用途では<strong>体感差はほぼありません</strong>。どちらも快適に動作します。',
  },
  {
    question: 'Apple C1Xモデムは何が変わる？',
    answer: 'iPhone 17eに搭載されたApple C1Xは、Apple初の自社設計モバイル通信モデムです。従来のQualcomm製モデムに比べて<strong>電力効率の改善</strong>が期待されます。5G / LTE対応バンドは両モデルとも十分な範囲をカバーしています。',
  },
  {
    question: 'カメラコントロールがないiPhone 17eでも不便はない？',
    answer: 'カメラコントロールは便利な機能ですが、なくてもロック画面のカメラアイコンやアクションボタンからカメラを起動できます。<strong>ズームや露出の物理操作にこだわらなければ問題ありません</strong>。',
  },
  {
    question: 'MagSafe充電速度の差（25W vs 15W）は実用上どれくらい影響がある？',
    answer: 'MagSafe 25Wは16e、15Wは17eです。充電速度に差は出ますが、<strong>有線の高速充電はどちらも同等（30分で約50%）</strong>なので、急ぐ場合はUSB-C充電を使えば差はなくなります。',
  },
  {
    question: '128GBが選べるiPhone 16eの方がお得？',
    answer: 'ストレージを最小限にしたい方にはiPhone 16eの128GBモデルが最も安価な選択肢です。ただしApple Intelligenceのモデルだけで約7GB使用するため、<strong>写真や動画をたくさん撮る方には256GB以上を推奨</strong>します。',
  },
  {
    question: 'どちらが長く使える？',
    answer: 'AppleはiPhoneを約7年サポートする傾向にあります。<strong>iPhone 17eの方がチップが新しいため、サポート終了時期はより遅くなると予想</strong>されます。長期利用を重視するなら17eが有利です。',
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
        text: item.answer.replace(/<[^>]*>/g, ''),
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
              >
                <p itemProp="text" dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
