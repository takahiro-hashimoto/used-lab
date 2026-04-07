import IconCard from '@/app/components/IconCard'

export default function RecommendByTypeSection() {
  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          <i className="fa-solid fa-bullseye" aria-hidden="true"></i> 目的別｜中古MacBookはここで買うのがおすすめ
        </h2>
        <p className="m-section-desc">中古MacBookの購入先で迷う人は、ほとんどが次の3タイプのいずれかに当てはまります。</p>
        <p className="m-section-desc">「自分はどこで買うべきか」を明確にするため、3つのタイプ別におすすめの購入先を提示します。</p>

        <div className="u-mt-xl">
          <IconCard icon="fa-solid fa-shield-halved" title="安全重視・初めて中古MacBookを買う人">
            <p>中古に不安がある方や、失敗したくないという方は<strong>中古PC専門店</strong>か<strong>Apple認定整備済製品</strong>がおすすめです。</p>
            <p>検品済みで保証がついており、キーボードやバッテリーの状態も安心です。初めてなら「安さ」より「品質と保証」を基準に選びましょう。</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-tags" title="価格重視・ある程度知識がある人">
            <p>チップやメモリ構成を自分で判断できる方は、<strong>中古PC専門店（価格重視店）</strong>や<strong>Amazon整備済み品</strong>を検討してみましょう。</p>
            <p>セールやポイント還元で安く買えるチャンスがあり、最低限の保証もついています。「安い＝フリマ」と決めつけず、価格と保証のバランスで選ぶのがポイントです。</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-gem" title="掘り出し物を狙いたい人（上級者向け）">
            <p>自分でスペックやmacOSサポート状況を見極められる上級者の方は、<strong>フリマアプリ</strong>や<strong>個人売買</strong>を検討してみるのもありです。</p>
            <p>専門店で買うよりもお手頃な価格で手に入る可能性があります。ただし、保証がなく自己責任が前提なので、リスクを理解したうえで判断しましょう。</p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}
