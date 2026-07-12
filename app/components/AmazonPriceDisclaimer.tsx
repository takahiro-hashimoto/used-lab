/**
 * Amazonアソシエイト・プログラム運営規約に基づく免責表示。
 * 価格推移グラフ・価格表を掲載する箇所に必ず表示する。
 * - Amazon価格は価格追跡（グラフ・表）に含めていないこと
 * - Amazon商品について価格アラートを発行していないこと
 */
export default function AmazonPriceDisclaimer() {
  return (
    <p className="price-info-note price-info-note--amazon">
      <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      <span>
        価格推移グラフ・価格表にAmazonの価格は含まれていません。また、Amazonの商品について価格アラートの発行は行っていません。
      </span>
    </p>
  )
}
