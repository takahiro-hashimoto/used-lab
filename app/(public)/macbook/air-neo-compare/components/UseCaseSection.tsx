type Winner = 'air' | 'neo' | 'even'

const useCases: { label: string; winner: Winner; note: string }[] = [
  { label: 'Web閲覧・事務作業',        winner: 'even', note: 'どちらも処理能力に余裕があり、日常使いで差は感じにくい' },
  { label: '写真編集',                 winner: 'air',  note: 'AirはRAW現像でもメモリに余裕がありスムーズ。Neoの8GBは軽い編集なら問題ないが、枚数が多いと重くなる場合も' },
  { label: '動画編集',                 winner: 'air',  note: '4K動画の書き出しなど重い作業ではNeoの8GB固定がボトルネックになりやすい。Airは16GB以上を選べるため安定して作業できる' },
  { label: 'プログラミング',           winner: 'air',  note: '複数サービスを同時に立ち上げる開発環境ではメモリ16GB以上が快適。Thunderbolt 4対応で外部SSDや高速接続機器とも連携しやすい' },
  { label: 'AI機能の活用',             winner: 'even', note: 'どちらもNeural Engineを搭載しApple Intelligenceに対応。文章生成・要約・画像生成などの機能を同様に使える' },
  { label: '持ち運び（13インチ）',     winner: 'even', note: '両機ともに約1.24kgで持ち運びやすさは同等。バッテリーはAirが最大18時間、Neoが最大16時間とAirが約2時間長い' },
  { label: '価格の安さ',               winner: 'neo',  note: 'NeoはMacBook Air（M4）の148,800円〜に対して99,800円〜と約5万円安い。予算を抑えて新品Macを買いたい方向き' },
  { label: 'デザイン・カラー',         winner: 'neo',  note: 'NeoはiPadのようにカラフルなカラー展開。AirはシルバーやスターライトなどシックなAppleらしい色味が中心' },
  { label: '外部ディスプレイ・拡張性', winner: 'air',  note: 'AirはThunderbolt 4対応で4Kモニターや高速SSD、ドッキングステーションと接続しやすい。NeoはUSB-C 2ポートのみで転送速度も低め' },
]

const winnerConfig = {
  air:  { label: 'Air有利', color: '#0071e3' },
  neo:  { label: 'Neo有利', color: '#16a34a' },
  even: { label: '同等',    color: '#9ca3af' },
}

export default function UseCaseSection() {
  return (
    <section className="l-section" id="usecase" aria-labelledby="heading-usecase">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-usecase">
          用途別おすすめ早見表
        </h2>
        <p className="m-section-desc">
          用途ごとにAirとNeoどちらが向いているかを一覧でまとめました
        </p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table">
              <thead>
                <tr>
                  <th>用途</th>
                  <th style={{ textAlign: 'center' }}>おすすめ</th>
                  <th>ポイント</th>
                </tr>
              </thead>
              <tbody>
                {useCases.map((row) => {
                  const cfg = winnerConfig[row.winner]
                  return (
                    <tr key={row.label}>
                      <th>{row.label}</th>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: cfg.color }}>
                        {cfg.label}
                      </td>
                      <td style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        {row.note.split('。').filter(s => s.trim()).map((s, i) => (
                          <p key={i} style={{ margin: 0 }}>{s}。</p>
                        ))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
