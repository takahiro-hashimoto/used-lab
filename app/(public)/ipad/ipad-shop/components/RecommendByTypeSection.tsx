export default function RecommendByTypeSection() {
  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          <i className="fa-solid fa-bullseye" aria-hidden="true"></i> 目的別｜中古iPadはここで買うのがおすすめ
        </h2>
        <p className="m-section-desc">中古iPadの購入先で迷う人は、ほとんどが次の3タイプのいずれかに当てはまります。</p>
        <p className="m-section-desc">「自分はどこで買うべきか」を明確にするため、3つのタイプ別におすすめの購入先を提示します。</p>

        {/* 安全重視 */}
        <div className="m-card m-card--shadow m-card--padded u-mt-xl">
          <h3 className="post-check-item__heading text-info">
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> 安全重視・初めて中古iPadを買う人
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>中古に不安がある方や、失敗したくないという方は<strong>中古タブレット専門店</strong>か<strong>Apple認定整備済製品</strong>がおすすめです。</p>
            <p>検品済みで保証がついており、Cellularモデルでも赤ロムの心配がほぼありません。初めてなら「安さ」より「返品できるかどうか」を基準に選びましょう。</p>
          </div>
        </div>

        {/* 価格重視 */}
        <div className="m-card m-card--shadow m-card--padded u-mt-lg">
          <h3 className="post-check-item__heading text-caution">
            <i className="fa-solid fa-tags" aria-hidden="true"></i> 価格重視・ある程度知識がある人
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>中古iPadの相場感があり、自分で状態を確認できる方は<strong>中古タブレット専門店（価格重視店）</strong>や<strong>Amazon整備済み品</strong>を検討してみましょう。</p>
            <p>フリマより安全でありながら、セールや在庫次第でお手頃な価格になることがあります。最低限の保証もついているので、「安い＝フリマ」と決めつけず、価格と保証のバランスで選ぶのがポイントです。</p>
          </div>
        </div>

        {/* 掘り出し物 */}
        <div className="m-card m-card--shadow m-card--padded u-mt-lg">
          <h3 className="post-check-item__heading text-negative">
            <i className="fa-solid fa-gem" aria-hidden="true"></i> 掘り出し物を狙いたい人（上級者向け）
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>自分で商品の状態を見極められる上級者の方は、<strong>フリマアプリ</strong>や<strong>個人売買</strong>を検討してみるのもありです。</p>
            <p>ECショップで買うよりもお手頃な価格で手に入る可能性があります。ただし、保証がなくリスクが高い点には注意しましょう。バッテリー状態・赤ロム・モデル寿命などを自分で判断できることが前提です。</p>
          </div>
        </div>
      </div>
    </section>
  )
}
