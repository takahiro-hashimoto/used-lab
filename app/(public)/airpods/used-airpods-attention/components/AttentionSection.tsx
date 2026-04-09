import MediaCard from '@/app/components/MediaCard'
import { warrantyTableData } from './data'

export default function AttentionSection() {
  return (
    <section className="l-section" id="attention" aria-labelledby="heading-attention">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-attention">
          中古AirPodsを購入する際の注意点8つ
        </h2>
        <p className="m-section-desc">バッテリーの劣化や衛生面、充電端子の違いなど、中古AirPods購入前に確認しておきたいポイントを解説します。</p>

        {/* 1. コピー品 */}
        <MediaCard
          src="/images/content/thumbnail/airpods-giteki.jpg"
          alt="AirPodsのイメージ"
          title="①コピー品（偽物）に気をつける"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古市場にはiPhoneとのペアリングもできるものの、音質や音漏れがひどく低品質なコピー品が多く出回っています。
            </p>
            <p>このような粗悪なコピー品を誤って購入しないために下記の点を守りましょう。</p>
            <ul>
              <li>メルカリやラクマなどで個人から買う場合はシリアル番号を必ず確認する</li>
              <li>信頼のおける中古ECサイトで購入する</li>
            </ul>
            <p>
              AirPodsのシリアル番号を事前に入手できれば<a href="https://support.apple.com/ja-jp/HT204308" target="_blank" rel="noopener noreferrer">Apple公式サイト</a>で番号検索することで、正規品なのか確認することが可能です。
            </p>
          </div>
        </MediaCard>

        {/* 2. 並行輸入品 */}
        <MediaCard
          src="/images/content/thumbnail/airpods-image-03.jpg"
          alt="AirPodsパッケージのイメージ"
          title="②並行輸入品（技適マークなし）の製品を避ける"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古のAirPodsを買う際にはコピー品以外にも並行輸入品（海外版）にも気をつけなければなりません。
            </p>
            <p>
              海外で販売されているAirPodsは技適マークが適用されておらず、法令で使用することが禁止されています。
            </p>
            <p>
              コピー品と同様の対策方法をとって、日本国内の正規販売店で販売されていたAirPodsを中古品として買うようにしましょう。
            </p>
          </div>
        </MediaCard>

        {/* 3. バッテリー劣化 */}
        <MediaCard
          src="/images/content/thumbnail/airpods-charge.jpg"
          alt="AirPodsの充電イメージ"
          title="③バッテリー劣化が進んでいるAirPodsを避ける"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              AirPodsに内蔵されているリチウムイオンバッテリーは、充電を繰り返すごとに劣化していきます。
            </p>
            <p>
              使用期間が長い、使用頻度が多い中古品はせっかく買った後にすぐに寿命がきてバッテリー交換が必要になるかもしれません。
            </p>
            <p>下記のような点に注意して中古AirPodsを選ぶようにしましょう。</p>
            <ul className="media-card__list">
              <li>メルカリなどで個人から買う場合は購入時期・使用頻度を確認する</li>
              <li>ECサイトで買う場合はランクが低いアイテムは避ける</li>
            </ul>
          </div>
        </MediaCard>

        {/* 4. 衛生面・イヤーチップ */}
        <MediaCard
          src="/images/content/thumbnail/airpods-image-01.jpg"
          alt="AirPodsのイヤーチップイメージ"
          title="④衛生面の確認とイヤーチップの交換"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古AirPodsは他人が耳に装着して使用していたものです。衛生面が気になる方も多いのではないでしょうか。
            </p>
            <p>
              AirPods Proシリーズはシリコン製のイヤーチップが取り外し可能で、<strong>Appleの純正イヤーチップに交換すれば衛生的に使用できます</strong>。イヤーチップは2セット（税込980円〜）で購入可能です。
            </p>
            <ul className="media-card__list u-mb-md">
              <li>AirPods Pro系はイヤーチップを新品に交換する</li>
              <li>本体やケースは柔らかい布やアルコールシートで清掃する</li>
              <li>スピーカーメッシュ部分は乾いた綿棒で耳垢を除去する</li>
            </ul>
            <p>
              AirPods（スタンダードモデル）はイヤーチップがないため、本体を丁寧に清掃して使用しましょう。
            </p>
          </div>
        </MediaCard>

        {/* 5. アクティベーションロック */}
        <MediaCard
          src="/images/content/thumbnail/activate-lock.png"
          alt="アクティベーションロックのイメージ"
          title="⑤アクティベーションロックの有無を確認する"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              フリマアプリなどで個人から中古AirPodsを購入する際はアクティベーションロックがかかっていないかをしっかり確認しましょう。
            </p>
            <p>
              アクティベーションロックがかかった端末が届くと、再度出品者にロックの解除を依頼する手間が発生します。
            </p>
            <p>
              アクティベーションロックとは盗難防止用のロック機能で、解除するにはApple IDとパスワードが必要になります。初期化しても解除されないのが注意点です。
            </p>
            <p>
              中古ECサイトで中古AirPodsを購入するとアクティベーションロックがかかった端末が届くことはまずないので、心配な方はECサイトで買い物をしましょう。
            </p>
          </div>
        </MediaCard>

        {/* 6. Apple Care+以外の保険 */}
        <MediaCard
          src="/images/content/thumbnail/airpods-music.jpg"
          alt="保険のイメージ"
          title="⑥Apple Care+以外の保険を検討する"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古AirPodsはApple Care+に加入できません（新品購入から30日以内が条件のため）。
            </p>
            <p>
              ただし、中古端末でも加入できる「モバイル保険」などの代替サービスがあります。月額700円で最大3台まで補償でき、中古端末も対象です。
            </p>
            <p>
              詳しくは<a href="#insurance">中古AirPodsでも入れる保険</a>のセクションで紹介しています。
            </p>
          </div>
        </MediaCard>

        {/* 7. 充電端子の違い */}
        <MediaCard
          src="/images/content/thumbnail/airpods-image-03.jpg"
          alt="AirPodsの充電端子イメージ"
          title="⑦充電端子（Lightning / USB-C）の違いを確認する"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              AirPodsは同じモデルでもLightning版とUSB-C版が混在して販売されている商品があります。そのため、購入前に必ず充電端子を確認しましょう。
            </p>
            <p>
              Lightning版は価格が安い傾向にありますが、iPhoneもUSB-Cに移行しているため、充電環境の統一を重視するならUSB-Cモデルがおすすめです。
            </p>
          </div>
        </MediaCard>

        {/* 8. 保証期間の長いECサイト */}
        <MediaCard
          src="/images/content/thumbnail/cheap-buy.jpg"
          alt="ECサイトでの購入イメージ"
          title="⑧保証期間の長い中古ECサイトで購入する"
          width={800}
          height={450}
          aside
          footer={
            <div className="price-table-wrap">
              <h3 className="caution-how-to__heading">主要ECサイトの保証期間</h3>
              <table className="m-table">
                <thead>
                  <tr>
                    <th scope="col">ECサイト</th>
                    <th scope="col">保証期間</th>
                  </tr>
                </thead>
                <tbody>
                  {warrantyTableData.map((row) => (
                    <tr key={row.shop}>
                      <th scope="row">{row.shop}</th>
                      <td>{row.warranty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        >
          <div className="media-card__desc m-rich-text">
            <p>
              中古AirPodsを購入する場合、少なからず不良品に当たってしまう可能性があります。
            </p>
            <p>
              なので、中古モデルを購入する際は保証期間の長いECサイトを選ぶのが大事です。
            </p>
            <p>
              イオシスは保証期間が群を抜いて長いので、まずはこのECサイトで狙っているモデルがあるかをチェックするのがおすすめ。
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
