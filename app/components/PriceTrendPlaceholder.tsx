type Props = {
  modelName: string
  bgSubtle?: boolean
}

export default function PriceTrendPlaceholder({ modelName, bgSubtle = false }: Props) {
  return (
    <section className={`l-section${bgSubtle ? ' l-section--bg-subtle' : ''}`} id="price-trend" aria-labelledby="heading-price-trend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-price-trend">
          中古{modelName}の価格推移
        </h2>
        <p className="m-section-desc">
          主要ECサイトの販売価格を定期的に集計し、中古相場の推移をグラフと表で可視化しています。
        </p>

        <div className="m-card m-card--shadow">
          <div className="price-placeholder">
            <p className="price-placeholder__text">
              <i className="fa-solid fa-chart-line" aria-hidden="true"></i>
              価格データは現在準備中です。近日中に公開予定です。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
