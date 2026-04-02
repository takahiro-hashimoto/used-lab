export default function RecommendSection() {
  return (
    <div className="card-grid-2 u-mt-2xl">
      {/* GPSモデルがおすすめな人 */}
      <div id="recommend-gps" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/used-lab-image.jpg"
            alt="GPSモデルがおすすめな人"
            className="media-card__img"
            width={800}
            height={450}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">GPSモデルがおすすめな人</h3>
          <p className="media-card__desc">
            コスパ重視で後悔しない選択をしたいならこちら。通信契約が不要で<strong>ランニングコストがかからず、購入価格も安い</strong>ため、迷ったらまずGPSモデルを選んでおけば間違いありません。
          </p>
          <ul className="media-card__list">
            <li><strong>なるべく安くApple Watchを購入したい</strong></li>
            <li>月額の通信費用をかけたくない</li>
            <li>iPhoneが常に手元にある生活スタイル</li>
            <li>通信キャリアが格安SIM（MVNO）で契約できない</li>
            <li>初めてのApple Watchでまず試してみたい</li>
          </ul>
        </div>
      </div>

      {/* セルラーモデルがおすすめな人 */}
      <div id="recommend-cellular" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/apple-watch-workout.jpg"
            alt="セルラーモデルがおすすめな人"
            className="media-card__img"
            width={800}
            height={450}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">セルラーモデルがおすすめな人</h3>
          <p className="media-card__desc">
            iPhoneなしで使いたい明確な理由があるならこちら一択。<strong>Apple Watch単体でLTE通信による通話やデータ通信が可能</strong>になります。ただし月額385〜550円の通信費用が発生する点は要注意です。
          </p>
          <ul className="media-card__list">
            <li><strong>iPhoneなしでランニングや外出をしたい</strong></li>
            <li>緊急SOSや転倒検出で安全面を重視したい</li>
            <li>ステンレス・チタニウムなどの高級素材が欲しい</li>
            <li>ファミリー共有で子どもにキッズケータイ代わりとして持たせたい</li>
            <li>Apple Watch Ultraが欲しい</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
