export default function KeyboardCompareSection() {
  const compareData = [
    { label: 'トラックパッド', magic: '搭載', smart: '非搭載' },
    { label: 'バックライト', magic: '搭載', smart: '非搭載' },
    { label: 'デザイン', magic: 'フローティング（角度調整可）', smart: '折りたたみカバー型' },
    { label: '充電端子（パススルー）', magic: 'USB-C / Lightning', smart: 'なし' },
    { label: '重量（11インチ用）', magic: '約600g', smart: '約300g' },
    { label: '新品価格（税込）', magic: '約50,000円〜', smart: '約30,000円〜' },
    { label: '対応モデル', magic: 'iPad Air / iPad Pro', smart: 'iPad Air / iPad Pro' },
    { label: '接続方式', magic: 'Smart Connector', smart: 'Smart Connector' },
  ]

  return (
    <section className="l-section" id="keyboard-compare" aria-labelledby="heading-keyboard-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-keyboard-compare">
          Magic KeyboardとSmart Keyboard Folioの違い
        </h2>
        <p className="m-section-desc">
          iPad用の純正キーボードは大きく分けて「Magic Keyboard」と「Smart Keyboard Folio」の2種類があります。<br />
          それぞれの特徴を比較して、自分の使い方に合ったキーボードを選びましょう。
        </p>

        {/* 比較表 */}
        <div className="m-card m-card--shadow m-table-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <table className="m-table">
            <thead>
              <tr>
                <th>項目</th>
                <th>Magic Keyboard</th>
                <th>Smart Keyboard Folio</th>
              </tr>
            </thead>
            <tbody>
              {compareData.map((row) => (
                <tr key={row.label}>
                  <td><strong>{row.label}</strong></td>
                  <td>{row.magic}</td>
                  <td>{row.smart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* おすすめタイプ別 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-xl)' }}>

          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__body">
              <h3 className="media-card__title">Magic Keyboardがおすすめな人</h3>
              <p className="media-card__desc">
                トラックパッドを使って<strong>PC感覚でiPadを操作したい人</strong>に最適です。画面の角度を自由に調整できるフローティングデザインも快適。
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                  こんな人におすすめ
                </p>
                <ul className="info-card__list">
                  <li>iPadをノートPC代わりに使いたい</li>
                  <li>トラックパッドでカーソル操作がしたい</li>
                  <li>長時間のタイピングが多い</li>
                  <li>画面の角度を自由に調整したい</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded">
            <div className="media-card__body">
              <h3 className="media-card__title">Smart Keyboard Folioがおすすめな人</h3>
              <p className="media-card__desc">
                軽さとコスパを重視する人向け。<strong>持ち運びが多い人や、たまにキーボードを使う程度</strong>の人に最適です。
              </p>
              <div className="m-card info-card">
                <p className="info-card__heading">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                  こんな人におすすめ
                </p>
                <ul className="info-card__list">
                  <li>軽さ・携帯性を重視したい</li>
                  <li>費用をできるだけ抑えたい</li>
                  <li>キーボードは補助的に使う程度</li>
                  <li>シンプルなカバー兼キーボードが欲しい</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* 補足 */}
        <div className="m-card info-card" style={{ marginTop: 'var(--space-xl)' }}>
          <p className="info-card__heading">
            <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
            中古で買うならどっち？
          </p>
          <p className="info-card__text">
            中古市場ではMagic Keyboardの方が流通量が多く、状態の良い個体も見つけやすい傾向にあります。Smart Keyboard Folioは生産終了モデルもあるため、希望の型番が見つかったら早めの購入がおすすめです。どちらも型番とサイズ（11インチ / 13インチ）の確認を忘れずに。
          </p>
        </div>
      </div>
    </section>
  )
}
