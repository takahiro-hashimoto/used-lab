import MediaCard from '@/app/components/MediaCard'

export default function RouteSection() {
  return (
    <section className="l-section" id="route" aria-labelledby="heading-route">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-route">
          中古Samsung Galaxy 購入ルート別の注意点
        </h2>
        <p className="m-section-desc">同じ中古Galaxyでも、どこで買うかによって「地雷の種類」が違います。</p>
        <p className="m-section-desc">購入先ごとのリスクを理解しておきましょう。</p>

        {/* フリマ・オークション */}
        <MediaCard
          src="/images/galaxy-article/samsung-galaxy-6.jpg"
          alt="フリマアプリのイメージ画像"
          title="フリマ・オークション購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、その分リスクも大きくなります。</p>
            <p>
              個人取引では赤ロム（ネットワーク制限）、バッテリー状態の詐称、端末保護機能（Reactivation Lock / FRP）の未解除などのトラブルが多発します。問題が起きても保証がなく、基本的には自己責任での対応となります。海外版・技適なし端末が混じっている点にも注意が必要です。
            </p>
            <p>
              「<strong>安い＝自己責任の範囲が広い</strong>」ということを理解した上で利用しましょう。中古スマホの購入経験がない方には正直おすすめしません。
            </p>
          </div>
        </MediaCard>

        {/* 中古ショップ */}
        <MediaCard
          src="/images/galaxy-article/samsung-galaxy-4.jpg"
          alt="中古ショップのイメージ画像"
          title="中古ショップ購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>イオシス・にこスマ・ゲオなどの中古ショップは、検品体制や保証が整っているため、初心者でも安心して購入できます。ただし、注意すべき点もあります。</p>
            <p>
              表記ランク（A/B/Cなど）の基準はショップごとに異なります。同じ「Bランク」でも、店舗によって状態に差があることを理解しておきましょう。また、赤ロム保証や初期不良保証の内容もショップごとに違うため、購入前に確認が必要です。
            </p>
            <p>
              さらに、「未使用」「美品」でも内部状態（バッテリーや折りたたみのヒンジなど）は別問題です。外装がきれいでも消耗しているケースがあるため、バッテリー状態の表記があるショップを選ぶと安心です。
            </p>
          </div>
        </MediaCard>

        {/* キャリア認定中古・整備済 */}
        <MediaCard
          src="/images/content/thumbnail/cheap-buy.jpg"
          alt="キャリア認定中古のイメージ"
          title="キャリア認定中古・メーカー整備済品"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              ドコモ・auなどが販売する「認定中古品（Certified）」や、Samsungの整備済品（Galaxy Certified Re-Newed 等）は、<strong>検品・清掃・保証が付いた安心度の高い選択肢</strong>です。赤ロムの心配がなく、動作保証も付くため、まずこうした在庫をチェックするのがおすすめです。
            </p>
            <p>
              ただし、認定中古・整備済品は在庫が不安定で欲しいモデルが常にあるとは限りません。また、価格は一般的な中古ショップの同スペック品より高めになる傾向があります。
            </p>
            <p>
              予算を重視するなら中古ショップ、赤ロムの心配なく保証を重視するなら認定中古・整備済品と使い分けましょう。
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
