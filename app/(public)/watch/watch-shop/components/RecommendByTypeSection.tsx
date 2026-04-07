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
            <p>中古に不安がある方や、失敗したくないという方は<strong>中古専門店</strong>か<strong>Apple認定整備済製品</strong>がおすすめです。</p>
            <p>検品済みで保証がついており、バッテリー劣化やケースの傷の心配が少ないです。毎日肌に触れるデバイスだからこそ、「安さ」より「状態の確実さ」を基準に選びましょう。</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-tags" title="価格重視・ある程度知識がある人">
            <p>中古Apple Watchの相場感があり、ケースサイズやGPS/Cellularの違いを理解している方は、<strong>中古専門店（価格重視店）</strong>や<strong>Amazon整備済み品</strong>を検討してみましょう。</p>
            <p>セールや在庫次第でお手頃な価格になることがあり、最低限の保証もついています。価格と安心感のバランスで選ぶのがポイントです。</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-gem" title="掘り出し物を狙いたい人（上級者向け）">
            <p>バッテリー状態やwatchOSサポート、GPS/Cellularの違いを自分で判断できる上級者の方は、<strong>フリマアプリ</strong>や<strong>個人売買</strong>を検討してみるのもありです。</p>
            <p>専門店で買うよりもお手頃な価格で手に入る可能性があります。ただし、保証がなくリスクが高い点には注意しましょう。</p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}
