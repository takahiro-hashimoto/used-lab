export default function FleaMarketSection() {
  return (
    <section className="l-section" id="flea-market" aria-labelledby="heading-flea-market">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-flea-market">
          <i className="fa-solid fa-circle-question" aria-hidden="true"></i> フリマや個人売買は本当に大丈夫？
        </h2>
        <p className="m-section-desc">メルカリやラクマなどの個人間売買は価格の安さが魅力ですが、リスクも存在します。</p>
        <p className="m-section-desc">ここでは「使える人」と「避けるべき人」を明確にします。</p>

        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="post-check-item__heading">なぜフリマは安くなりやすいのか</h3>
          <div className="caution-check-card__text">
            <p>フリマアプリで中古Apple Watchが安く出品される理由は、以下の構造的な要因によるものです。「安い＝お得」ではなく、「安くなる理由が価格にそのまま反映されている」という点を理解しておく必要があります。</p>
            <ul>
              <li>個人間取引のため、店舗の人件費や検品コストが発生しない</li>
              <li>保証や返品対応が価格に含まれていない</li>
              <li>バッテリー劣化やケースの傷をリスクとして織り込んだ価格設定になっている</li>
            </ul>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="post-check-item__heading">起こりやすいリスク</h3>
          <div className="caution-check-card__text">
            <p>個人間売買では以下のようなリスクが発生する可能性があります。Apple Watchならではのリスクとして、ケースの傷やバッテリー劣化は使用感に直結します。</p>
            <ul>
              <li><strong className="text-negative">バッテリーが大きく劣化</strong>していて1日持たない</li>
              <li><strong className="text-negative">ケースの傷</strong>が写真では分かりにくい</li>
              <li><strong className="text-negative">保証・返品対応</strong>が基本的にない</li>
              <li><strong className="text-negative">アクティベーションロック</strong>の解除忘れ</li>
              <li><strong className="text-negative">GPS/Cellular</strong>モデルの勘違い</li>
              <li><strong className="text-negative">watchOSサポート</strong>が終了間近のモデルを購入してしまう</li>
            </ul>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="post-check-item__heading">向いている人・向いていない人</h3>
          <div className="l-grid l-grid--2col l-grid--gap-lg">
            <div className="recommend-card__fit-box recommend-card__fit-box--good">
              <h4><i className="fa-solid fa-circle-check" aria-hidden="true"></i> 向いている人</h4>
              <ul>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> 中古Apple Watchの購入経験がある</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> バッテリー状態やモデル寿命を自分で判断できる</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> GPS/Cellularの違いやケースサイズを理解している</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> トラブルが起きても自己対応できる</li>
              </ul>
            </div>
            <div className="recommend-card__fit-box recommend-card__fit-box--bad">
              <h4><i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> 向いていない人</h4>
              <ul>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 初めて中古Apple Watchを買う人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 保証や返品対応を重視したい人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 機種や状態の判断に自信がない人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 健康機能（心電図・血中酸素）の有無が重要な人</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
