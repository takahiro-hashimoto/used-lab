export default function FleaMarketSection() {
  return (
    <section className="l-section" id="flea-market" aria-labelledby="heading-flea-market">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-flea-market">
          <i className="fa-solid fa-circle-question" aria-hidden="true"></i> フリマや個人売買は本当に大丈夫？
        </h2>
        <p className="m-section-desc">メルカリやラクマなどの個人間売買は価格の安さが魅力ですが、リスクも存在します。</p>
        <p className="m-section-desc">ここでは「使える人」と「避けるべき人」を明確にします。</p>

        <div className="m-card m-card--shadow m-card--padded post-check-item">
          <h3 className="post-check-item__heading"><i className="fa-solid fa-yen-sign" aria-hidden="true"></i>なぜフリマは安くなりやすいのか</h3>
          <div className="media-card__desc m-rich-text">
            <p>フリマアプリで中古iPadが安く出品される理由は、以下の構造的な要因によるものです。</p>
            <p>「安い＝お得」ではなく、「安くなる理由が価格にそのまま反映されている」という点を理解しておく必要があります。</p>
            <ul className="media-card__list">
              <li>個人間取引のため、店舗の人件費や検品コストが発生しない</li>
              <li>保証や返品対応が価格に含まれていない</li>
              <li>相場より安く売らないと売れにくい構造になっている</li>
            </ul>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded post-check-item">
          <h3 className="post-check-item__heading"><i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>起こりやすいリスク</h3>
          <div className="media-card__desc m-rich-text">
            <p>個人間売買では以下のようなリスクが発生する可能性があります。</p>
            <p>iPadならではのリスクとして、Apple Pencil対応の確認漏れやWi-Fi/Cellularモデルの勘違いなども含まれます。</p>
            <ul className="media-card__list">
              <li>ネットワーク利用制限（赤ロム）の可能性（Cellularモデル）</li>
              <li>バッテリーが大きく劣化している場合がある</li>
              <li>保証・返品対応が基本的にない</li>
              <li>アクティベーションロックなど初期設定トラブル</li>
              <li>Apple Pencil対応の確認漏れ</li>
              <li>Wi-Fi / Cellularモデルの勘違い</li>
            </ul>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded post-check-item">
          <h3 className="post-check-item__heading"><i className="fa-solid fa-user-check" aria-hidden="true"></i>向いている人・向いていない人</h3>
          <div className="l-grid l-grid--2col l-grid--gap-lg">
            <div className="recommend-card__fit-box recommend-card__fit-box--good">
              <h4><i className="fa-solid fa-circle-check" aria-hidden="true"></i> 向いている人</h4>
              <ul>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> 中古iPadの購入経験がある</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> 赤ロム・バッテリー状態を自分で判断できる</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> Apple Pencil対応やWi-Fi/Cellularの違いを理解している</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> トラブルが起きても自己対応できる</li>
              </ul>
            </div>
            <div className="recommend-card__fit-box recommend-card__fit-box--bad">
              <h4><i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> 向いていない人</h4>
              <ul>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 初めて中古iPadを買う人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 保証や返品対応を重視したい人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 機種や状態の判断に自信がない人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> Apple Pencil対応などの確認が不安な人</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
