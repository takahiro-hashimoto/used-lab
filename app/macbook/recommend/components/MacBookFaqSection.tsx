import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/macbook-recommend'

export default function MacBookFaqSection() {
  const faqs = [
    {
      question: '中古MacBookのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「<strong>MacBook Air 13インチ M2（2022）</strong>」「<strong>MacBook Air 13インチ M3（2024）</strong>」「
            <strong>MacBook Air 15インチ M3（2024）</strong>」「<strong>MacBook Pro 14インチ M3（2023）</strong>
            」の{RECOMMEND_COUNT_LABEL}がおすすめです。
          </p>
          <p>
            コスパ重視なら「MacBook Air 13インチ M2」（中古価格が最も手頃）、長期利用なら「MacBook Air 13インチ M3」
            （サポート期間が最長）、大画面なら「MacBook Air 15インチ M3」、クリエイティブ作業なら「MacBook Pro 14インチ M3」が最適です。
          </p>
          <p>
            いずれも2029〜2031年頃までmacOSサポートが続く見込みで、数年単位で安心して使えます。
          </p>
        </>
      ),
    },
    {
      question: '中古MacBookを選ぶときのポイントは？',
      answer: (
        <>
          <p>以下の3つのポイントを基準に選ぶことをおすすめします。</p>
          <ul>
            <li>
              <strong>macOSサポートが十分に残っている</strong> — 発売から約7年でサポート終了するため、2029年以降までサポートされる機種を選びましょう。
            </li>
            <li>
              <strong>用途に合った性能がある</strong> — 事務作業やWeb閲覧ならM2チップ以上、動画編集やプログラミングならM3チップ以上が目安です。
            </li>
            <li>
              <strong>中古価格と性能のバランスが良い</strong> — 残りサポート期間と中古相場から年単価を計算し、コスパの良い機種を選びましょう。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古MacBookはどこで買うのがおすすめ？',
      answer: (
        <>
          <p>中古パソコン専門店での購入をおすすめします。理由は以下の3点です。</p>
          <ul>
            <li>専門の検品担当者がチェック済み</li>
            <li>初期不良対応などの保証が付いている</li>
            <li>トラブル時のサポート体制が整っている</li>
          </ul>
          <p>
            具体的には、<strong>イオシス</strong>（在庫豊富・3ヶ月保証）、<strong>ゲオ</strong>（在庫数豊富）、<strong>じゃんぱら</strong>（品質重視）などが信頼性が高くおすすめです。
          </p>
          <p>メルカリやヤフオクなどの個人売買は保証がないため、初心者には推奨しません。</p>
        </>
      ),
    },
    {
      question: '中古MacBookを買うときの注意点は？',
      answer: (
        <>
          <p>購入前に以下の4点を必ずチェックしましょう。</p>
          <ul>
            <li>
              <strong>バッテリーの充放電回数</strong> — 1,000回以下が目安。充放電回数が多いほど劣化が進んでおり、駆動時間が短くなります。
            </li>
            <li>
              <strong>ストレージ容量</strong> — MacBookは後からストレージ増設ができません。用途に合った容量（最低256GB、動画編集なら512GB以上）を選びましょう。
            </li>
            <li>
              <strong>ショップ保証の有無</strong> — 保証期間をチェック。イオシスなら3ヶ月保証、じゃんぱらなら1ヶ月保証など、ショップによって異なります。
            </li>
            <li>
              <strong>macOSサポート期間</strong> — M1以前のIntelモデルはサポート終了が近いため避けましょう。M2チップ以上なら安心です。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古MacBookの寿命はどれくらい？',
      answer: (
        <>
          <p>
            Appleは発売から約7年でmacOSサポートを終了する傾向があります。{RECOMMEND_YEAR}年時点でおすすめしている{RECOMMEND_COUNT_LABEL}は、いずれも<strong>2029〜2031年頃までサポートされる見込み</strong>です。
          </p>
          <p>
            例えば、MacBook Air M2（2022）は2029年頃まで、MacBook Air M3（2024）は2031年頃までサポートされる計算です。
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
          中古MacBookの購入に関するよくある質問
        </h2>
        <p className="m-section-desc">
          中古MacBookを購入する前に確認しておきたい疑問にお答えします。
        </p>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
