import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/watch-recommend'

export default function WatchFaqSection() {
  const faqs = [
    {
      question: '中古Apple Watchのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「<strong>Apple Watch Series 8</strong>」「<strong>Apple Watch SE 第2世代</strong>」「
            <strong>Apple Watch Ultra</strong>」の{RECOMMEND_COUNT_LABEL}がおすすめです。
          </p>
          <p>
            ファッション重視なら「Series 8」（常時表示＋皮膚温センサー搭載）、コスパ重視なら「SE 第2世代」
            （1万円台後半から購入可能）、アウトドア派なら「Ultra」（最大36時間バッテリー）が最適です。
          </p>
          <p>
            いずれも2029年頃までwatchOSサポートが続く見込みで、数年単位で安心して使えます。
          </p>
        </>
      ),
    },
    {
      question: '中古Apple Watchを選ぶときのポイントは？',
      answer: (
        <>
          <p>以下の3つのポイントを基準に選ぶことをおすすめします。</p>
          <ul>
            <li>
              <strong>watchOSサポートが十分に残っている</strong> — 発売から約5年でサポート終了するため、2029年頃までサポートされる機種を選びましょう。
            </li>
            <li>
              <strong>用途に合った機能が揃っている</strong> — 常時表示・健康センサー・バッテリー持ちなど、自分が重視する機能があるか確認しましょう。
            </li>
            <li>
              <strong>中古価格と性能のバランスが良い</strong> — 残りサポート期間と中古相場から年単価を計算し、コスパの良い機種を選びましょう。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古Apple Watchはどこで買うのがおすすめ？',
      answer: (
        <>
          <p>中古スマートウォッチ専門店での購入をおすすめします。理由は以下の3点です。</p>
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
      question: '中古Apple Watchを買うときの注意点は？',
      answer: (
        <>
          <p>購入前に以下の4点を必ずチェックしましょう。</p>
          <ul>
            <li>
              <strong>バッテリーの劣化具合</strong> — 最大容量80%以上が目安。Apple Watchはバッテリー容量が小さいため劣化の影響が大きいです。
            </li>
            <li>
              <strong>watchOSサポート期間</strong> — 発売から約5年がサポートの目安。Series 6以前は数年利用前提なら非推奨です。
            </li>
            <li>
              <strong>ショップ保証の有無</strong> — 保証期間をチェック。イオシスなら3ヶ月保証など、ショップによって異なります。
            </li>
            <li>
              <strong>ケースサイズの確認</strong> — 手首の太さに合ったサイズを選びましょう。小さめ（40〜42mm）か大きめ（44〜49mm）かで装着感が大きく変わります。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古Apple Watchの寿命はどれくらい？',
      answer: (
        <>
          <p>
            Appleは発売から約5年でwatchOSサポートを終了する傾向があります。{RECOMMEND_YEAR}年時点でおすすめしている{RECOMMEND_COUNT_LABEL}は、いずれも<strong>2029年頃までサポートされる見込み</strong>です。
          </p>
          <p>
            例えば、Apple Watch Series 8は2022年発売のため、2027年頃までサポートされる計算です。Apple Watch SE 第2世代も同じく2022年発売で同様です。
          </p>
          <p>
            サポート終了後も動作はしますが、セキュリティリスクが高まり、新しいアプリや文字盤が使えなくなる可能性があるため、<strong>サポート期間内での利用</strong>をおすすめします。
          </p>
        </>
      ),
    },
  ]

  return (
    <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          中古Apple Watchの購入に関するよくある質問
        </h2>
        <p className="m-section-desc">
          中古Apple Watchを購入する前に確認しておきたい疑問にお答えします。
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
