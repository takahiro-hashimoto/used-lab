const FAQ_ITEMS = [
  {
    question: 'MacBookとiPadはどっちが安い？価格差はどれくらい？',
    answer:
      '新品で比較すると、iPadは約5万円台から購入でき、MacBook Airは約16万円台からとなるため、初期費用はiPadが大幅に安いです。ただしiPadでパソコンライクに使おうとすると、Magic KeyboardやApple Pencilなどのアクセサリを合わせて10万円以上になることも。中古なら、M1 MacBook Airが7〜8万円台で手に入るため、トータルコストではMacBookのほうがコスパが良いケースもあります。',
  },
  {
    question: 'iPadにキーボードを付ければMacBookの代わりになる？',
    answer:
      'メールの返信やWeb閲覧、簡単な文書作成程度であればiPad＋キーボードでも十分代用できます。しかしiPadOSはファイル管理やウィンドウの自由配置に制約があるため、複数アプリを同時に操作するマルチタスクや、プログラミング・表計算などの本格的な作業にはMacBookのほうが圧倒的に快適です。用途が限定的ならiPad、幅広い作業をこなすならMacBookが安心です。',
  },
  {
    question: '大学生・社会人にはMacBookとiPadどっちがおすすめ？',
    answer:
      'レポート作成やプレゼン資料づくり、プログラミングなど「生産性」を重視するなら、ファイル管理やマルチタスクに優れたMacBookがおすすめです。一方、授業ノートの手書きやPDFへの書き込み、イラスト制作などApple Pencilを活用したい場合はiPadが最適。両方持ちが理想ですが、1台に絞るなら「キーボード主体の作業が多いか、手書き主体か」で判断しましょう。',
  },
  {
    question: 'MacBookとiPadを2台持ちするメリットはある？',
    answer:
      'あります。MacBookをメインの作業マシンとして使い、iPadをサブディスプレイ（Sidecar機能）やノートテイキング用として併用するのが代表的なスタイルです。AirDropやユニバーサルクリップボードなどAppleエコシステムの連携機能により、2台間のデータ移動もスムーズ。予算に余裕があれば、それぞれの得意分野を活かした2台持ちが最も生産性の高い選択肢です。',
  },
  {
    question: '動画編集や写真編集をするならMacBookとiPadどっち？',
    answer:
      '本格的な動画編集にはMacBookが向いています。Final Cut ProやDaVinci Resolveなどプロ向けソフトがフル機能で動作し、大容量ファイルの書き出しも高速です。一方、SNS用のショート動画やカジュアルな写真編集であればiPadでも十分対応可能。特にiPad版のLightroomやProcreteはタッチ操作との相性が良く、直感的に編集できるのが魅力です。',
  },
]

export default function FaqSection() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          よくある質問
        </h2>
        <p className="m-section-desc">MacBookとiPadの比較に関してよくある質問をまとめました。</p>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="m-callout m-callout--muted" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">関連</span>
          <p className="m-callout__text">
            <a href="https://japan-design.jp/" target="_blank" rel="noreferrer noopener">日本デザイン｜WEBデザインの知りたい！知りたかった！が見つかる情報サイト</a>
          </p>
        </div>
      </div>
    </section>
  )
}
