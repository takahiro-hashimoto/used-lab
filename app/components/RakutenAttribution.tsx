/**
 * 楽天ウェブサービス利用規約に基づく出典表示。
 * 楽天市場商品検索APIから取得したデータを掲載する箇所に表示する。
 */
export default function RakutenAttribution() {
  return (
    <p className="price-info-note price-info-note--rakuten">
      <i className="fa-solid fa-database" aria-hidden="true"></i>
      <span>
        価格データは
        <a href="https://webservice.rakuten.co.jp/" target="_blank" rel="nofollow noopener noreferrer">
          楽天ウェブサービス
        </a>
        （楽天市場商品検索API）を通じて取得しています。Supported by Rakuten Developers.
      </span>
    </p>
  )
}
