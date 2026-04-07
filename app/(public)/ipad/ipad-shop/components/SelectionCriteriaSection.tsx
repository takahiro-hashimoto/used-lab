import IconCard from '@/app/components/IconCard'

export default function SelectionCriteriaSection() {
  return (
    <section className="l-section" id="criteria" aria-labelledby="heading-criteria">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-criteria">
          中古iPadの購入先を選ぶ6つのポイント
        </h2>
        <p className="m-section-desc">中古iPadは比較的高価な買い物です。端末の価格だけでなく、これから紹介する6つの項目もチェックしておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-xl">
          <IconCard icon="fa-solid fa-yen-sign" title="価格の安さ">
            <p>中古ショップは端末の状態を「未使用・A・B・C」などのランクに分けて販売しています。同じランクの端末でもショップによって価格が大きく異なり、<strong>1万円以上の差が出る</strong>こともあります。</p>
            <p>購入前に複数ショップの価格を見比べて、中古相場を把握しておくのがおすすめです。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-shield-halved" title="保証期間の長さ">
            <p>購入した端末にトラブルがあった際の保証期間はショップごとに異なります。同じ価格帯なら、<strong>保証期間が長いショップを選んだ方が安心</strong>です。</p>
            <p>独自の保証延長サービスを提供しているショップもあるので、各社の保証体制は必ず確認しておきましょう。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-battery-half" title="バッテリー最大容量の記載">
            <p>中古iPadを買うなら、バッテリーの最大容量が確認できるショップを選ぶのが理想です。<strong>80%を下回ると体感で持ちが悪くなる</strong>ため、数値を見てから購入できると安心です。</p>
            <p>にこスマなど一部のショップではバッテリー残量を商品ページに掲載しています。記載がないショップで買う場合はランクの高い端末を選ぶのが無難です。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-camera" title="実物写真の有無">
            <p>ショップによっては、実際に販売している端末の写真を公開している場合があります。未使用品やAランクなど状態が良い端末ならあまり気にしなくてもOKです。</p>
            <p>ただし安さ重視でBランク以下の端末を買う場合は、<strong>傷の程度が写真で確認できるショップ</strong>を選ぶと安心です。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-truck" title="配送料込みの総額">
            <p>中古iPadを購入する際は端末価格に加えて配送料がかかります。ショップごとに配送料は異なりますし、一定額以上の購入で送料無料になる場合もあります。</p>
            <p><strong>配送料も加味した合計金額</strong>で比較して、一番お手頃な購入先を選びましょう。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-credit-card" title="支払い方法の豊富さ">
            <p>AmazonPayに対応しているサイトなら、個人情報や支払い方法をわざわざ入力する必要がありません。またPayPayなどに対応していればポイントを貯めることもできます。</p>
            <p>なるべく<strong>自分が普段使っている決済手段に対応したショップ</strong>を選んでおくと、スムーズに購入できます。</p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}
