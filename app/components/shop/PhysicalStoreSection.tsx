// ============================================================
// 実店舗で買う選択肢（カテゴリ共通）
//
// 各カテゴリの購入先ページは元々ECだけを扱っていたが、Search Console を見ると
// 「中古 ◯◯ 店舗 / 販売店 / どこで買う」「近くの中古携帯ショップ」といった
// 店頭で買いたい層の流入が9〜13位で取りこぼされていた。その受け皿。
//
// 個別チェーンの店舗数一覧は、変動が早く保守しきれないため置いていない。
// ここでは店頭で買う場合の判断材料（メリットと注意点）だけを扱う。
// ============================================================

type Props = {
  /** 「中古iPhone」「中古iPad」など、本文に出す製品名 */
  productName: string
}

export default function PhysicalStoreSection({ productName }: Props) {
  return (
    <section className="l-section" id="store" aria-labelledby="heading-store">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-store">
          <i className="fa-solid fa-shop" aria-hidden="true"></i> {productName}は実店舗でも買える｜店頭で買うメリットと注意点
        </h2>
        <p className="m-section-desc">
          ここまではネット通販を中心に紹介してきましたが、{productName}は実店舗でも購入できます。
        </p>
        <p className="m-section-desc">
          「実物を見てから決めたい」「その日のうちに持ち帰りたい」という方は、店頭での購入も選択肢に入ります。
        </p>

        <div className="m-card m-card--shadow m-card--padded u-mt-xl">
          <h3 className="post-check-item__heading text-info">
            <i className="fa-solid fa-circle-check" aria-hidden="true"></i> 店頭で買うメリット
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>
              いちばん大きいのは<strong>現物を自分の目で確認できる</strong>ことです。画面の傷や本体の色あせ、
              角の打痕といった「写真では伝わりにくい状態」を、買う前に手に取って判断できます。
            </p>
            <p>
              その場で持ち帰れるので配送を待つ必要がなく、配送中の破損リスクもありません。
              初期設定でつまずいたとき、店員に直接聞けるのも店頭ならではです。
            </p>
            <p>
              購入後に不具合が出た場合も、<strong>店舗に持ち込んで相談できる</strong>のは通販にない安心感があります。
            </p>
          </div>
        </div>

        <div className="m-card m-card--shadow m-card--padded u-mt-lg">
          <h3 className="post-check-item__heading text-caution">
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> 店頭で買うときの注意点
          </h3>
          <div className="media-card__desc m-rich-text">
            <p>
              在庫は<strong>店舗ごとに大きく違います</strong>。同じチェーンでも、狙っている機種・容量・色が
              その店にあるとは限りません。行ってから探すより、オンラインの在庫検索で取り扱いを確認してから
              向かうほうが確実です。
            </p>
            <p>
              価格も、通販のほうが安いことが少なくありません。店舗は家賃と人件費がかかるぶん、
              同じチェーンでもネット限定価格のほうが安い場合があります。
              <strong>店頭で見て、価格はネットと見比べる</strong>のが現実的な使い方です。
            </p>
            <p>
              保証内容は通販と同じことが多いものの、店舗独自の条件が付く場合もあります。
              レシートや保証書の扱いを、その場で確認しておきましょう。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
