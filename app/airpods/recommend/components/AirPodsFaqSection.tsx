import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/airpods-recommend'

export default function AirPodsFaqSection() {
  const faqs = [
    {
      question: '中古AirPodsのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「<strong>AirPods Pro 2（USB-C）</strong>」「<strong>AirPods 4（ANCモデル）</strong>」「
            <strong>AirPods 4（スタンダード）</strong>」の{RECOMMEND_COUNT_LABEL}がおすすめです。
          </p>
          <p>
            音質・ノイキャン重視なら「AirPods Pro 2」（H2チップ＋カナル型で最高水準のANC）、
            オープン型でノイキャンも欲しいなら「AirPods 4 ANC」、
            コスパ重視なら「AirPods 4 スタンダード」が最適です。
          </p>
          <p>
            いずれもUSB-C対応で、2029〜2031年頃までサポートが続く見込みです。
          </p>
        </>
      ),
    },
    {
      question: '中古AirPodsを選ぶときのポイントは？',
      answer: (
        <>
          <p>以下の3つのポイントを基準に選ぶことをおすすめします。</p>
          <ul>
            <li>
              <strong>ファームウェアサポートが十分に残っている</strong> — 発売から約7年がサポートの目安です。2029年以降までサポートされるモデルを選びましょう。
            </li>
            <li>
              <strong>用途に合った機能がある</strong> — ノイズキャンセリング・空間オーディオ・防水性能・装着タイプ（カナル型/オープン型）など、使い方に合ったモデルを選びましょう。
            </li>
            <li>
              <strong>中古価格と機能のバランスが良い</strong> — 残りサポート期間と中古相場を比較し、コスパの良い機種を選びましょう。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古AirPodsはどこで買うのがおすすめ？',
      answer: (
        <>
          <p>中古イヤホン取り扱い店での購入をおすすめします。理由は以下の3点です。</p>
          <ul>
            <li>専門の検品担当者がチェック済み</li>
            <li>初期不良対応などの保証が付いている</li>
            <li>トラブル時のサポート体制が整っている</li>
          </ul>
          <p>
            具体的には、<strong>イオシス</strong>（在庫豊富・3ヶ月保証）、<strong>じゃんぱら</strong>（品質重視）、<strong>eイヤホン</strong>（イヤホン専門店）などが信頼性が高くおすすめです。
          </p>
          <p>メルカリやヤフオクなどの個人売買は保証がないため、初心者には推奨しません。</p>
        </>
      ),
    },
    {
      question: '中古AirPodsを買うときの注意点は？',
      answer: (
        <>
          <p>購入前に以下の4点を必ずチェックしましょう。</p>
          <ul>
            <li>
              <strong>バッテリーの劣化状態</strong> — AirPodsはバッテリー交換が難しい製品です。使用時間が極端に短くないか確認しましょう。
            </li>
            <li>
              <strong>充電ケースの状態</strong> — ケースのバッテリーも劣化します。膨張や充電端子の損傷がないか確認しましょう。
            </li>
            <li>
              <strong>ショップ保証の有無</strong> — 保証期間をチェック。イオシスなら3ヶ月保証など、ショップによって異なります。
            </li>
            <li>
              <strong>充電端子の確認</strong> — Lightning / USB-Cで異なります。iPhone 15以降と統一するならUSB-Cモデルを選びましょう。
            </li>
          </ul>
        </>
      ),
    },
    {
      question: '中古AirPodsの寿命はどれくらい？',
      answer: (
        <>
          <p>
            AirPodsのファームウェアサポートは発売から約7年が目安です。{RECOMMEND_YEAR}年時点でおすすめしている{RECOMMEND_COUNT_LABEL}は、いずれも<strong>2029〜2031年頃までサポートされる見込み</strong>です。
          </p>
          <p>
            ただし、AirPodsはバッテリー劣化が避けられない製品です。ソフトウェアサポートとは別に、バッテリーの寿命（通常2〜3年の使用で劣化が顕著に）も考慮して購入を検討しましょう。
          </p>
          <p>
            サポート終了後も動作はしますが、新機能の追加やセキュリティ修正が受けられなくなるため、<strong>サポート期間内での利用</strong>をおすすめします。
          </p>
        </>
      ),
    },
  ]

  return (
    <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          中古AirPodsの購入に関するよくある質問
        </h2>
        <p className="m-section-desc">
          中古AirPodsを購入する前に確認しておきたい疑問にお答えします。
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
