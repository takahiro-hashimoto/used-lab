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
            <p>フリマアプリで中古MacBookが安く出品される理由は、以下の構造的な要因によるものです。「安い＝お得」ではなく、「安くなる理由が価格にそのまま反映されている」という点を理解しておく必要があります。</p>
            <ul>
              <li>個人間取引のため、店舗の人件費や検品コストが発生しない</li>
              <li>保証や返品対応が価格に含まれていない</li>
              <li>キーボードのテカリやバッテリー劣化をリスクとして織り込んだ価格設定になっている</li>
            </ul>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="post-check-item__heading">起こりやすいリスク</h3>
          <div className="caution-check-card__text">
            <p>個人間売買では以下のようなリスクが発生する可能性があります。MacBookならではのリスクとして、キーボードやディスプレイの劣化は仕事の生産性に直結します。</p>
            <ul>
              <li><strong className="text-negative">キーボードのテカリ・ヘタリ</strong>で打鍵感が悪い</li>
              <li><strong className="text-negative">ディスプレイのコーティング剥がれ</strong>（ステインゲート問題）</li>
              <li><strong className="text-negative">バッテリーの充放電回数</strong>が多く持ちが悪い</li>
              <li><strong className="text-negative">保証・返品対応</strong>が基本的にない</li>
              <li><strong className="text-negative">アクティベーションロック</strong>の解除忘れ</li>
              <li><strong className="text-negative">macOSサポート</strong>が終了間近のモデルを購入してしまう</li>
            </ul>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded">
          <h3 className="post-check-item__heading">向いている人・向いていない人</h3>
          <div className="l-grid l-grid--2col l-grid--gap-lg">
            <div className="recommend-card__fit-box recommend-card__fit-box--good">
              <h4><i className="fa-solid fa-circle-check" aria-hidden="true"></i> 向いている人</h4>
              <ul>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> 中古MacBookの購入経験がある</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> チップ性能やバッテリー状態を自分で判断できる</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> キーボードやディスプレイの劣化を許容できる</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> トラブルが起きても自己対応できる</li>
              </ul>
            </div>
            <div className="recommend-card__fit-box recommend-card__fit-box--bad">
              <h4><i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> 向いていない人</h4>
              <ul>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 初めて中古MacBookを買う人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 保証や返品対応を重視したい人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 仕事でメインマシンとして使う人</li>
                <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> スペックの判断に自信がない人</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
