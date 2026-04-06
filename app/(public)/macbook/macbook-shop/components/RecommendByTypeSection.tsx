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
            <p>保証付き・検品済みで、キーボードやバッテリーの状態も安心。初めてなら「安さ」より「品質と保証」で選ぶのが正解です。</p>
            <p className="lead-link">&rarr; 中古PC専門店 or Apple認定整備済製品</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-tags" title="価格重視・ある程度知識がある人">
            <p>チップやメモリ構成を自分で判断できるなら、セールやポイント還元で安く買える購入先が狙い目です。</p>
            <p className="lead-link">&rarr; 中古PC専門店（価格重視店） or Amazon整備済み</p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-gem" title="掘り出し物を狙いたい人（上級者向け）">
            <p>スペックやmacOSサポートを自分で見極められる上級者向け。保証なし・自己責任が前提です。</p>
            <p className="lead-link">&rarr; フリマアプリ・個人売買</p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}
