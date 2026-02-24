import Image from 'next/image'
import Link from 'next/link'

export default function RecommendBanner() {
  return (
    <section className="l-section" id="popular" aria-labelledby="heading-popular">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
          目的別に人気の中古iPad
        </h2>
        <p className="m-section-desc">
          目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。
        </p>

        <div className="m-card m-card--shadow popular-card">
          <figure className="popular-card-figure">
            <Image
              src="/images/content/ipad-setting.webp"
              alt="中古iPadおすすめ5選のイメージ画像"
              className="popular-card-img"
              width={400}
              height={500}
              loading="lazy"
            />
          </figure>
          <div className="popular-card-body">
            <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
            <p className="popular-card-title">中古iPadおすすめ5選</p>
            <p className="popular-card-desc">
              動画視聴やイラスト制作を重視する人向け、大画面で作業したい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
            </p>
            <div>
              <Link href="/ipad/recommend" className="m-btn m-btn--primary">
                おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
