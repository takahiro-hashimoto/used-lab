import IconCard from '@/app/components/IconCard'

export default function RecommendByTypeSection() {
  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          <i className="fa-solid fa-bullseye" aria-hidden="true"></i> 目的別｜中古Apple Watchはここで買うのがおすすめ
        </h2>
        <p className="m-section-desc">中古Apple Watchの購入先で迷う人は、ほとんどが次の3タイプのいずれかに当てはまります。</p>
        <p className="m-section-desc">「自分はどこで買うべきか」を明確にするため、3つのタイプ別におすすめの購入先を提示します。</p>

        <div className="u-mt-xl">
          <IconCard icon="fa-solid fa-shield-halved" title="安全重視・初めて中古Apple Watchを買う人">
            <p>中古に不安がある、失敗したくない、知識はあまりない人。検品済みで保証があり、バッテリー劣化やケースの傷の心配が少ないです。毎日肌に触れるデバイスだからこそ、「安さ」より「状態の確実さ」を基準に選ぶべきです。</p>
            <p className="lead-link">&rarr; 中古専門店 or Apple認定整備済製品</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-tags" title="価格重視・ある程度知識がある人">
            <p>中古Apple Watchの相場感があり、ケースサイズやGPS/Cellularの違いを理解している人。セールや在庫次第で価格が下がりやすく、最低限の保証もあります。</p>
            <p className="lead-link">&rarr; 中古専門店（価格重視店） or Amazon整備済み</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-gem" title="掘り出し物を狙いたい人（上級者向け）">
            <p>バッテリー状態・モデル寿命・watchOSサポート・GPS/Cellularの違いを自分で判断できる人。リスクを理解していることが前提です。初心者には向きません。</p>
            <p className="lead-link">&rarr; フリマアプリ・個人売買</p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}
