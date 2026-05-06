export default function RecommendSection() {
  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          結論：こんな人はAir、こんな人はNeo
        </h2>
        <p className="m-section-desc">
          これまでの比較を踏まえて、AirとNeoそれぞれがどんな方に向いているかをまとめます
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {/* Airがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">
              <i className="fa-solid fa-feather" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-primary)' }}></i>
              Airがおすすめな人
            </h3>
            <ul className="info-card__list">
              <li>メモリ16GB以上が必要な人</li>
              <li>動画編集・プログラミングをメインにする人</li>
              <li>MagSafe充電の便利さを求める人</li>
              <li>Thunderbolt 4対応のSSDや周辺機器を使う人</li>
              <li>15インチの大画面が欲しい人</li>
              <li>中古でコスパよく入手したい人</li>
              <li>Touch IDを全モデルで使いたい人</li>
            </ul>
            <p className="media-card__desc u-mt-lg">
              <strong>メモリや拡張性を重視するならMacBook Air</strong>が向いています。中古市場でも豊富に流通しており、コスパよく購入できます。
            </p>
          </div>

          {/* Neoがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">
              <i className="fa-solid fa-bolt" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-primary)' }}></i>
              Neoがおすすめな人
            </h3>
            <ul className="info-card__list">
              <li>初めてMacを購入する人</li>
              <li>Apple Intelligenceを低価格で使い始めたい人</li>
              <li>新品で予算を抑えて買いたい人（99,800円〜）</li>
              <li>カラフルなデザインで個性を出したい人</li>
              <li>5年以上長期で使いたい人</li>
              <li>Web・SNS・文書作業が中心の人</li>
            </ul>
            <p className="media-card__desc u-mt-lg">
              <strong>新品で手頃な価格・最新AI機能重視ならMacBook Neo</strong>が魅力的な選択肢です。
            </p>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-xl">
          <span className="m-callout__label">結論</span>
          <p className="m-callout__text">
            コスパ最優先なら<strong>中古MacBook Air（M1/M2）が55,980円〜</strong>で狙い目。新品で買うならAirより安いNeo（99,800円〜）も選択肢。メモリ・拡張性を重視するなら新品または中古のAirが安心です。
          </p>
        </div>

      </div>
    </section>
  )
}
