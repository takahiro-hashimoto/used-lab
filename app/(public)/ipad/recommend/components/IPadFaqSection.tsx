import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/ipad-recommend'

export default function IPadFaqSection() {
  const faqs = [
    {
      question: '中古iPadのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「<strong>iPad 第10世代</strong>」「<strong>iPad mini 第6世代</strong>」「
            <strong>iPad Air 第5世代</strong>」「<strong>iPad Pro 11インチ 第3世代</strong>」「
            <strong>iPad Pro 12.9インチ 第6世代</strong>」の{RECOMMEND_COUNT_LABEL}がおすすめです。
          </p>
          <p>
            コスパ重視なら「iPad 第10世代」（3万円台から購入可能）、携帯性重視なら「iPad mini 第6世代」
            （片手で持てる8.3インチ）、バランス重視なら「iPad Air 第5世代」（M1チップ搭載）、
            プロ性能なら「iPad Pro 11インチ 第3世代」（ProMotion対応）、大画面なら「iPad Pro 12.9インチ 第6世代」
            （Liquid Retina XDR）が最適です。
          </p>
          <p>
            いずれも2028年以降までiPadOSサポートが続く見込みで、数年単位で安心して使えます。
          </p>
        </>
      ),
    },
    {
      question: '中古iPadを選ぶときのポイントは？',
      answer: (
        <>
          <p>以下の3つのポイントを基準に選ぶことをおすすめします。</p>
          <ul>
            <li>
              <strong>iPadOSサポートが十分に残っている</strong> — 発売から約7年でサポート終了するため、2029年以降までサポートされる機種を選びましょう。
            </li>
            <li>
              <strong>用途に合った十分な性能</strong> — 動画視聴やWeb閲覧ならA14 Bionic以上、イラスト制作や動画編集ならM1以上が目安です。
            </li>
            <li>
              <strong>中古価格と性能のバランスが良い</strong> — 残りサポート期間と中古相場から年単価を計算し、コスパの良い機種を選びましょう。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古iPadはどこで買うのがおすすめ？',
      answer: (
        <>
          <p>中古タブレット専門店での購入をおすすめします。理由は以下の3点です。</p>
          <ul>
            <li>専門の検品担当者がチェック済み</li>
            <li>初期不良対応などの保証が付いている</li>
            <li>トラブル時のサポート体制が整っている</li>
          </ul>
          <p>
            具体的には、<strong>イオシス</strong>（在庫豊富・3〜6ヶ月保証）、<strong>ゲオ</strong>（在庫数豊富）、<strong>じゃんぱら</strong>（品質重視）などが信頼性が高くおすすめです。
          </p>
          <p>メルカリやヤフオクなどの個人売買は保証がないため、初心者には推奨しません。</p>
        </>
      ),
    },
    {
      question: '中古iPadを買うときの注意点は？',
      answer: (
        <>
          <p>購入前に以下の4点を必ずチェックしましょう。</p>
          <ul>
            <li>
              <strong>バッテリーの劣化具合</strong> — 最大容量80%以上が目安。ショップの商品説明でバッテリー状態を確認しましょう。
            </li>
            <li>
              <strong>iPadOSサポート期間</strong> — 発売から約7年がサポートの目安。iPad 第8世代以前は数年利用前提なら非推奨です。
            </li>
            <li>
              <strong>ショップ保証の有無</strong> — 保証期間をチェック。イオシスなら3〜6ヶ月保証など、ショップによって異なります。
            </li>
            <li>
              <strong>Wi-FiモデルかCellularモデルか</strong> — 外出先でも使うならCellularモデル推奨。Wi-Fiモデルの方が安価です。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古iPadの寿命はどれくらい？',
      answer: (
        <>
          <p>
            Appleは発売から約7年でiPadOSサポートを終了する傾向があります。{RECOMMEND_YEAR}年時点でおすすめしている{RECOMMEND_COUNT_LABEL}は、いずれも<strong>2028年以降までサポートされる見込み</strong>です。
          </p>
          <p>
            例えば、iPad 第10世代は2022年発売のため、2029年頃までサポートされる計算です。iPad Air 第5世代も2022年発売で同様に2029年頃まで使えます。
          </p>
          <p>
            サポート終了後も動作はしますが、セキュリティリスクが高まり、新しいアプリが使えなくなる可能性があるため、<strong>サポート期間内での利用</strong>をおすすめします。
          </p>
        </>
      ),
    },
  ]

  return (
    <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          中古iPadの購入に関するよくある質問
        </h2>
        <p className="m-section-desc">
          中古iPadを購入する前に確認しておきたい疑問にお答えします。
        </p>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
