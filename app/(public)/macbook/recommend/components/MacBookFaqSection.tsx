import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/macbook-recommend'

export default function MacBookFaqSection() {
  const faqs = [
    {
      question: '中古MacBookのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「MacBook Air 13インチ M2（2022）」「MacBook Air 13インチ M3（2024）」「MacBook Air 15インチ M3（2024）」「MacBook Pro 14インチ M3（2023）」の{RECOMMEND_COUNT_LABEL}がおすすめです。
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
            <li>発売から約7年でmacOSサポートが終了するため、2029年以降までサポートが残っている機種を選びましょう。</li>
            <li>事務作業やWeb閲覧ならM2チップ以上、動画編集やプログラミングならM3チップ以上が性能の目安です。</li>
            <li>残りサポート期間と中古相場から年単価を計算し、コスパの良い機種を選びましょう。</li>
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
            具体的には、イオシス（在庫豊富・3ヶ月保証）、ゲオ（在庫数豊富）、じゃんぱら（品質重視）などが信頼性が高くおすすめです。
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
            <li>バッテリーの充放電回数が1,000回以下かどうか確認しましょう。回数が多いほど劣化が進み、駆動時間が短くなります。</li>
            <li>MacBookはストレージの後から増設ができません。最低256GB、動画編集なら512GB以上を選びましょう。</li>
            <li>ショップの保証期間を確認しましょう。イオシスなら3ヶ月、じゃんぱらなら1ヶ月など、ショップによって異なります。</li>
            <li>M1以前のIntelモデルはmacOSサポート終了が近いため避けましょう。M2チップ以上なら安心です。</li>
          </ul>
        </>
      ),
    },
    {
      question: '中古MacBookの寿命はどれくらい？',
      answer: (
        <>
          <p>
            Appleは発売から約7年でmacOSサポートを終了する傾向があります。当サイトでおすすめしている機種は、いずれもサポートに十分な余裕があるモデルだけを厳選しています。
          </p>
          <p>
            各モデルの具体的なサポート終了予測は、当サイトのmacOSサポート期間一覧表で確認できます。
          </p>
          <p>
            サポート終了後も動作はしますが、セキュリティリスクが高まり、新しいアプリが使えなくなる可能性があるため、サポート期間内での利用をおすすめします。
          </p>
        </>
      ),
    },
  ]

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
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
              <div className="faq-answer m-rich-text m-rich-text--muted">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
