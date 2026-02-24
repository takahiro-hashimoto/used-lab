import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/iphone-recommend'

export default function IPhoneFaqSection() {
  const faqs = [
    {
      question: '中古iPhoneのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「<strong>iPhone SE 第3世代</strong>」「<strong>iPhone14 Pro</strong>」「
            <strong>iPhone13 mini</strong>」「<strong>iPhone15</strong>」「<strong>iPhone14 Plus</strong>
            」の{RECOMMEND_COUNT_LABEL}がおすすめです。
          </p>
          <p>
            予算重視なら「iPhone SE 第3世代」（2万円台から購入可能）、性能重視なら「iPhone14 Pro」
            （トリプルカメラ・ProMotion搭載）、小型モデルなら「iPhone13 mini」（片手操作可能な5.4インチ）、
            USB-C対応なら「iPhone15」、大画面なら「iPhone14 Plus」（6.7インチ）が最適です。
          </p>
          <p>
            いずれも2030年頃までiOSサポートが続く見込みで、数年単位で安心して使えます。
          </p>
        </>
      ),
    },
    {
      question: '中古iPhoneを選ぶときのポイントは？',
      answer: (
        <>
          <p>以下の3つのポイントを基準に選ぶことをおすすめします。</p>
          <ul>
            <li>
              <strong>iOSサポートが十分に残っている</strong> — 発売から約7年でサポート終了するため、2030年以降までサポートされる機種を選びましょう。
            </li>
            <li>
              <strong>日常利用でストレスを感じにくい性能</strong> — SNS・Web・動画視聴で快適に動作する性能（A15 Bionic以上）が目安です。
            </li>
            <li>
              <strong>中古価格と性能のバランスが良い</strong> — 残りサポート期間と中古相場から年単価を計算し、コスパの良い機種を選びましょう。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古iPhoneはどこで買うのがおすすめ？',
      answer: (
        <>
          <p>中古スマホ専門店での購入をおすすめします。理由は以下の3点です。</p>
          <ul>
            <li>専門の検品担当者がチェック済み</li>
            <li>赤ロム保証や初期不良対応などの保証が付いている</li>
            <li>トラブル時のサポート体制が整っている</li>
          </ul>
          <p>
            具体的には、<strong>イオシス</strong>（在庫豊富・3〜6ヶ月保証）、<strong>にこスマ</strong>（1年保証・初心者向け）、<strong>ゲオ</strong>（在庫数豊富）などが信頼性が高くおすすめです。
          </p>
          <p>メルカリやヤフオクなどの個人売買は保証がないため、初心者には推奨しません。</p>
        </>
      ),
    },
    {
      question: '中古iPhoneを買うときの注意点は？',
      answer: (
        <>
          <p>購入前に以下の4点を必ずチェックしましょう。</p>
          <ul>
            <li>
              <strong>バッテリー最大容量</strong> — 80%以上が目安。ただし70%台の端末を安く買ってApple正規店で交換（約15,000円）する選択肢もあります。
            </li>
            <li>
              <strong>ネットワーク利用制限</strong> — 「◯」判定（分割払い完済済み）を選びましょう。「△」は将来的に赤ロム化するリスクがあります。
            </li>
            <li>
              <strong>ショップ保証の有無</strong> — 保証期間をチェック。イオシスなら3〜6ヶ月、にこスマなら1年保証など、ショップによって異なります。
            </li>
            <li>
              <strong>iOSサポート期間</strong> — iPhone 12以前は数年利用前提なら非推奨。iPhone 13以降が安心です。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古iPhoneの寿命はどれくらい？',
      answer: (
        <>
          <p>
            Appleは発売から約7年でiOSサポートを終了する傾向があります。{RECOMMEND_YEAR}年時点でおすすめしている{RECOMMEND_COUNT_LABEL}は、いずれも<strong>2030年以降までサポートされる見込み</strong>です。
          </p>
          <p>
            例えば、iPhone SE 第3世代は2021年発売のため、2028年頃まで約7年間使えます。iPhone15は2023年発売のため、2030年頃までサポートされる計算です。
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
          中古iPhoneの購入に関するよくある質問
        </h2>
        <p className="m-section-desc">
          中古iPhoneを購入する前に確認しておきたい疑問にお答えします。
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
