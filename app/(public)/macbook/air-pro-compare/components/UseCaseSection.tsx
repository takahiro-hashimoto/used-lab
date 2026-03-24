import RatingMark from '@/app/components/RatingMark'

const useCases = [
  { label: 'Web閲覧・事務作業', air: '◎', pro: '◎', note: 'どちらでも快適' },
  { label: '写真編集', air: '◎', pro: '◎', note: 'どちらでも快適' },
  { label: 'プログラミング', air: '◯', pro: '◎', note: '大規模ビルドはPro有利' },
  { label: '動画編集', air: '△', pro: '◎', note: '高負荷が続くためPro推奨' },
  { label: '3D・映像制作', air: '△', pro: '◎', note: 'GPU性能が重要' },
  { label: '音楽制作（DTM）', air: '◯', pro: '◎', note: 'トラック数が多いとPro有利' },
  { label: '持ち運び', air: '◎', pro: '◯', note: 'Airの方が軽量' },
  { label: 'コスパ重視', air: '◎', pro: '△', note: 'Airの方が圧倒的に安い' },
]

export default function UseCaseSection() {
  return (
    <section className="l-section" id="usecase" aria-labelledby="heading-usecase">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-usecase">
          用途別おすすめ早見表
        </h2>
        <p className="m-section-desc">
          用途ごとにAirとProどちらが向いているかを一覧で比較します
        </p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <thead>
                <tr>
                  <th>用途</th>
                  <th>Air</th>
                  <th>Pro</th>
                  <th>コメント</th>
                </tr>
              </thead>
              <tbody>
                {useCases.map((row) => (
                  <tr key={row.label}>
                    <th>{row.label}</th>
                    <td><RatingMark mark={row.air as '◎' | '◯' | '△' | '×'} size="md" /></td>
                    <td><RatingMark mark={row.pro as '◎' | '◯' | '△' | '×'} size="md" /></td>
                    <td style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
