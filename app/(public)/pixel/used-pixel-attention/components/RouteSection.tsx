import Link from 'next/link'
import MediaCard from '@/app/components/MediaCard'

export default function RouteSection() {
  return (
    <section className="l-section" id="route" aria-labelledby="heading-route">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-route">
          中古Google Pixel 購入ルート別の注意点
        </h2>
        <p className="m-section-desc">同じ中古Pixelでも、どこで買うかによって「地雷の種類」が違います。</p>
        <p className="m-section-desc">購入先ごとのリスクを理解しておきましょう。</p>

        {/* フリマ・オークション */}
        <MediaCard
          src="/images/pixel-article/google-pixel2.jpg"
          alt="フリマアプリのイメージ画像"
          title="フリマ・オークション購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、その分リスクも大きくなります。</p>
            <p>
              個人取引では赤ロム（ネットワーク制限）、バッテリー状態の詐称、Googleアカウント・端末保護機能（FRP）の未解除、技適なしの海外版などのトラブルが多発します。問題が起きても保証がなく、基本的には自己責任での対応となります。
            </p>
            <p>
              「<strong>安い＝自己責任の範囲が広い</strong>」ということを理解した上で利用しましょう。中古Pixelの購入経験がない方には正直おすすめしません。
            </p>
          </div>
        </MediaCard>

        {/* 中古ショップ */}
        <MediaCard
          src="/images/pixel-article/google-pixel3.jpg"
          alt="中古ショップのイメージ画像"
          title="中古ショップ購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>イオシス・にこスマ・ゲオなどの中古ショップは、検品体制や保証が整っているため、初心者でも安心して購入できます。ただし、注意すべき点もあります。</p>
            <p>
              表記ランク（A/B/Cなど）の基準はショップごとに異なります。同じ「Bランク」でも、店舗によって状態に差があることを理解しておきましょう。また、保証内容もショップごとに違うため、購入前に確認が必要です。
            </p>
            <p>
              さらに、「未使用」「美品」でも内部状態（バッテリーなど）は別問題です。外装がきれいでもバッテリーが劣化しているケースがあります。おすすめの購入先は<Link prefetch={false} href="/pixel/pixel-shop/">中古Pixelの購入先おすすめ比較</Link>で紹介しています。
            </p>
          </div>
        </MediaCard>

        {/* Google Store認定整備済 / メーカー再生品 */}
        <MediaCard
          src="/images/pixel-article/google-pixel1.jpg"
          alt="認定整備済製品のイメージ"
          title="認定整備済（リファービッシュ）品"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              整備済（リファービッシュ）品は、専門業者が動作確認・クリーニング・必要に応じた部品交換を行った再生品で、<strong>一定の品質基準と保証</strong>が付くのが特徴です。中古Pixelを検討する際は、こうした整備済品もチェックするのがおすすめです。
            </p>
            <p>
              ただし、在庫が不安定で欲しいモデルが常にあるとは限りません。また、通常の中古品より価格が高めに設定されている場合もあります。
            </p>
            <p>
              予算を重視するなら通常の中古品、品質と保証を重視するなら整備済品と使い分けましょう。現在の相場は<Link prefetch={false} href="/pixel/price-info/">中古Pixel相場・価格推移</Link>で確認できます。
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
