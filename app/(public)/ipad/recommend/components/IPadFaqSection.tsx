import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/ipad-recommend'

export default function IPadFaqSection() {
  const faqs = [
    {
      question: '中古iPadのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「iPad 第11世代」「iPad mini 第7世代」「iPad Air 第5世代」「iPad Pro 11インチ 第4世代」「iPad Pro 12.9インチ 第6世代」の{RECOMMEND_COUNT_LABEL}がおすすめです。
          </p>
          <p>
            コスパ重視なら「iPad 第11世代」（A16 Bionic搭載の入門機）、携帯性重視なら「iPad mini 第7世代」
            （片手で持てる8.3インチ・A17 Pro搭載）、バランス重視なら「iPad Air 第5世代」（M1チップ搭載）、
            プロ性能なら「iPad Pro 11インチ 第4世代」（M2チップ＋ProMotion対応）、大画面なら「iPad Pro 12.9インチ 第6世代」
            （M2チップ＋Liquid Retina XDR）が最適です。
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
            <li>iPadOSサポートが十分に残っている機種を選ぶ。発売から約7年でサポート終了するため、2029年以降までサポートされる機種が安心です。</li>
            <li>用途に合った十分な性能があるか確認する。動画視聴やWeb閲覧ならA14 Bionic以上、イラスト制作や動画編集ならM1以上が目安です。</li>
            <li>中古価格と性能のバランスが良い機種を選ぶ。残りサポート期間と中古相場から年単価を計算し、コスパの良い機種を見極めましょう。</li>
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
            <li>バッテリーの劣化具合を確認する。最大容量80%以上が目安です。ショップの商品説明でバッテリー状態を確認しましょう。</li>
            <li>iPadOSサポート期間を確認する。発売から約7年がサポートの目安です。iPad 第9世代以前は数年利用前提なら非推奨です。</li>
            <li>ショップ保証の有無を確認する。イオシスなら3〜6ヶ月保証など、ショップによって保証内容は異なります。</li>
            <li>Wi-FiモデルかCellularモデルかを確認する。外出先でも使うならCellularモデル推奨です。Wi-Fiモデルの方が安価です。</li>
          </ul>
        </>
      ),
    },
    {
      question: '型落ちiPadは何年使える？',
      answer: (
        <>
          <p>
            Appleは発売から約7年でiPadOSサポートを終了する傾向があります。{RECOMMEND_YEAR}年時点でおすすめしている{RECOMMEND_COUNT_LABEL}は、いずれも<strong>2028年以降までサポートされる見込み</strong>です。
          </p>
          <p>
            例えば、iPad 第11世代は2025年発売のため、2032年頃までサポートされる計算です。iPad Air 第5世代は2022年発売で2029年頃まで使えます。
          </p>
          <p>
            サポート終了後も動作はしますが、セキュリティリスクが高まり、新しいアプリが使えなくなる可能性があるため、<strong>サポート期間内での利用</strong>をおすすめします。
          </p>
        </>
      ),
    },
    {
      question: 'Apple認定整備済製品と中古iPadの違いは？',
      answer: (
        <>
          <p>
            Apple認定整備済製品はAppleが検品・部品交換・クリーニングを行い、<strong>バッテリーと外装が新品に交換済み</strong>で1年間のApple保証が付きます。価格は新品の最大15%引きです。
          </p>
          <p>
            一方、中古iPadはショップや個人から購入する使用済み端末で、バッテリーや外装の状態は個体差がありますが、価格は整備済製品よりさらに安く、旧モデルを含め機種の選択肢が豊富です。
          </p>
          <p>
            「状態の良さ・保証を重視するなら整備済製品」「価格と機種の選択肢を重視するなら中古ショップ」と使い分けるのがおすすめです。
          </p>
        </>
      ),
    },
    {
      question: 'おすすめしない中古iPadはどれ？',
      answer: (
        <>
          <p>{RECOMMEND_YEAR}年現在、以下に該当するモデルはおすすめしません。</p>
          <ul>
            <li>iPadOSサポートが終了済み、または終了間近のモデル。セキュリティリスクが高く、新しいアプリが使えなくなる可能性があります。</li>
            <li>ストレージ32GBのモデル。アプリを数個入れるだけで容量不足になります。iPadはSDカードで増設できないため致命的です。</li>
            <li>サポート残が1〜2年以内のモデル。買ってすぐサポート切れになるリスクがあります。</li>
          </ul>
          <p>
            安さに惹かれてサポート切れや低容量の端末を買うと、結果的にコスパが悪くなります。最低でも64GB以上のモデルを選びましょう。
          </p>
        </>
      ),
    },
  ]

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
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
