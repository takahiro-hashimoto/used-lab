// ============================================================
// ゲオの中古iPadは大丈夫か（評判・注意点）
//
// Search Console 上、iPad だけ「ゲオの評判」を確かめたい流入が突出している。
//   ゲオ 中古タブレット 評判   270表示 6.9位
//   ゲオ ipad 中古 評判       115表示 8.9位
//   ipad 中古 ゲオ 注意点      78表示 15.3位
//   ipad 中古 ゲオ            64表示 2.8位
// 合計約530表示あるのに、本文に「評判」の語が1度も無かった。
//
// 内容は口コミの寄せ集めではなく、shops テーブルに持っている
// 「公表されている掲載条件」を根拠にしている（保証・赤ロム・送料・古物商許可）。
// 主観的な評判ではなく、確認できる事実で判断材料を出す方針。
// ============================================================

export default function GeoReputationSection() {
  return (
    <section className="l-section" id="geo-reputation" aria-labelledby="heading-geo-reputation">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-geo-reputation">
          <i className="fa-solid fa-circle-question" aria-hidden="true"></i> ゲオの中古iPadは評判どう？条件から見た判断材料
        </h2>
        <p className="m-section-desc">
          中古iPadの購入先としてゲオを検討している方から、「評判は大丈夫か」「注意点はあるか」という声をよくいただきます。
        </p>
        <p className="m-section-desc">
          口コミは人によって評価が割れるため、ここでは<strong>ゲオが公表している条件</strong>だけを並べて判断材料にします。
        </p>

        <div className="m-card m-card--shadow m-card--padded u-mt-xl">
          <h3 className="post-check-item__heading text-info">
            <i className="fa-solid fa-list-check" aria-hidden="true"></i> 公表されている条件
          </h3>
          <div className="media-card__desc m-rich-text">
            <ul>
              <li><strong>保証期間は30日間</strong>。今回比較したショップの中では短めの部類です。</li>
              <li><strong>赤ロム永久保証</strong>あり。Cellularモデルを買うときの最大のリスクは、これで回避できます。</li>
              <li><strong>個別の実物写真とバッテリー最大容量の記載</strong>あり。届くまで状態がわからない、という不安は小さくなります。</li>
              <li><strong>送料550円</strong>（2,000円以上の購入で無料）。</li>
              <li>古物商許可は愛知県公安委員会発行 第541162000900号。法人として登録された事業者です。</li>
            </ul>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded u-mt-lg">
          <h3 className="post-check-item__heading text-caution">
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> 注意しておきたい点
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>
              いちばん気をつけたいのは<strong>保証が30日と短い</strong>ことです。初期不良はこの期間で出きることが多いものの、
              数か月使ってから不調が出た場合は対象外になります。長めの保証を重視するなら、
              3か月保証のショップと比較したうえで決めてください。
            </p>
            <p>
              また、在庫が非常に多いぶん<strong>状態のばらつきも大きくなります</strong>。ランク表記だけで決めず、
              個別の写真とバッテリー最大容量を必ず確認しましょう。この2つが載っているのはゲオの利点なので、活用しない手はありません。
            </p>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-xl">
          <span className="m-callout__label">まとめ</span>
          <p className="m-callout__text">
            在庫量と赤ロム永久保証、状態写真の掲載を重視するならゲオは有力な選択肢です。
            一方で保証期間の長さを最優先するなら、保証3か月のショップのほうが条件は上になります。
            下の比較表で「保証期間」の列を見比べると、自分の優先順位に合う店が絞り込めます。
          </p>
        </div>
      </div>
    </section>
  )
}
