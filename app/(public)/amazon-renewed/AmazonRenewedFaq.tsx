import { buildFaqJsonLd } from '@/lib/utils/shared-helpers'

// 表示用（JSX）とJSON-LD用（プレーンテキスト）を1か所で管理
const faqs: { question: string; answerText: string; answer: React.ReactNode }[] = [
  {
    question: 'Amazon整備済み品とは何ですか？',
    answerText:
      'Amazon整備済み品は、正常に機能するよう検査・修理・クリーニング・テストが行われた再生品・中古品・展示品・開封品を購入できるサービスです。出品するのはAmazonが認定したメーカーや専門の整備業者で、継続的に販売するための厳格な基準を満たしています。',
    answer: (
      <p>
        Amazon整備済み品は、正常に機能するよう<strong>検査・修理・クリーニング・テスト</strong>が行われた再生品・中古品・展示品・開封品を購入できるサービスです。出品するのはAmazonが認定したメーカーや専門の整備業者で、継続的に販売するための厳格な基準を満たしています。
      </p>
    ),
  },
  {
    question: 'Amazon整備済み品には何が付属し、どのような状態ですか？',
    answerText:
      'Apple製品には互換性があり完全に機能する付属品が同梱されます（充電器はPSE認証済み、ケーブルはMFi認定済み。ヘッドフォンは付属しません）。元の箱または清潔な一般的な箱で届き、工場出荷時の設定に復元されています。コンディションは「非常に良い／良い／可」の3段階で、いずれもバッテリー容量80%以上・完全動作。違いは外観の傷の度合いです。',
    answer: (
      <>
        <p>
          Apple製品には、純正品とは限らないものの<strong>互換性があり完全に機能する付属品</strong>が同梱されます（充電器はPSE認証済み、ケーブルはMFi認定済み。ヘッドフォンは付属しません）。元の箱または清潔な一般的な箱で届き、工場出荷時の設定に復元されています。
        </p>
        <p>コンディションは外観の傷の度合いで3段階に分かれます（いずれもバッテリー容量80%以上・完全動作）。</p>
        <ul>
          <li>
            <strong>非常に良い</strong>：画面に傷なし。本体も30cm離して持つと外観上の損傷が見られない状態。
          </li>
          <li>
            <strong>良い</strong>：画面に傷なし。本体に軽い傷があるが、30cm離すとほとんど見えない状態。
          </li>
          <li>
            <strong>可</strong>：画面をオンにすると見えなくなる程度の浅い傷あり。本体は30cmで見える傷があり、触ると分かる状態。
          </li>
        </ul>
      </>
    ),
  },
  {
    question: '受け取った商品に満足できない場合はどうなりますか？',
    answerText:
      'Amazon整備済み品には最低180日の出品者保証が付いています。購入から180日以内に正常に機能しない場合、Amazon認定出品者が交換または返金を行います。これはAmazonの返品ポリシーやマーケットプレイス保証に加えて適用され、カスタマーサービスのサポートも受けられます。',
    answer: (
      <p>
        Amazon整備済み品には<strong>最低180日の出品者保証</strong>が付いています。購入から180日以内に正常に機能しない場合、Amazon認定出品者が交換または返金を行います。これはAmazonの返品ポリシーやマーケットプレイス保証に加えて適用され、カスタマーサービスのサポートも受けられます。
      </p>
    ),
  },
  {
    question: 'AppleCare+には加入できますか？',
    answerText:
      'Amazon整備済み品はApple公式の整備品ではないため、AppleCare+に加入することはできません。保証は出品者による最低180日保証が中心となります。長期保証や手厚いサポートを求める場合は、1年保証が付きAppleCare+にも加入できるApple公式整備済製品の方が安心です。',
    answer: (
      <p>
        Amazon整備済み品はApple公式の整備品ではないため、<strong>AppleCare+には加入できません</strong>。保証は出品者による最低180日保証が中心となります。長期保証や手厚いサポートを求める場合は、1年保証が付きAppleCare+にも加入できるApple公式整備済製品の方が安心です。
      </p>
    ),
  },
  {
    question: 'Apple公式の整備済製品とどちらが安いですか？',
    answerText:
      '一般的にはAmazon整備済み品の方が安い傾向があります。新品定価より割安なことが多く、Apple公式整備済製品よりさらに低価格で手に入るケースもあります。ただし整備は第三者業者が行うため品質に個体差があり、AppleCare+にも加入できません。価格を重視するならAmazon、品質や保証の手厚さを重視するならApple公式、という選び方がおすすめです。',
    answer: (
      <p>
        一般的には<strong>Amazon整備済み品の方が安い傾向</strong>があります。新品定価より割安なことが多く、Apple公式整備済製品よりさらに低価格で手に入るケースもあります。ただし整備は第三者業者が行うため品質に個体差があり、AppleCare+にも加入できません。価格を重視するならAmazon、品質や保証の手厚さを重視するならApple公式、という選び方がおすすめです。
      </p>
    ),
  },
]

export default function AmazonRenewedFaq() {
  const faqJsonLd = buildFaqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answerText })))

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          Amazon整備済み品についてよくある質問
        </h2>
        <p className="m-section-desc">
          Amazon整備済み品の仕組み・付属品・状態・保証について、購入前によくある疑問をまとめました。
        </p>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="m-card faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
