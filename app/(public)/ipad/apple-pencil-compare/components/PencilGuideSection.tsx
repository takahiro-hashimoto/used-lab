const GUIDES = [
  {
    id: 'guide-illustration',
    icon: 'fa-solid fa-paintbrush',
    title: 'イラスト・デザイン制作をしたい方',
    recommendation: 'Apple Pencil Pro',
    amazonUrl: 'https://www.amazon.co.jp/dp/B0D3J71RM7?tag=and-and-22',
    reason: 'バレルロールでブラシの角度を直感的にコントロールでき、スクイーズでツールパレットを即座に呼び出せます。筆圧感知も搭載しており、繊細な線画から大胆な塗りまで対応可能です。',
  },
  {
    id: 'guide-note',
    icon: 'fa-solid fa-pen-to-square',
    title: 'ノート・メモ・勉強用途で使いたい方',
    recommendation: 'Apple Pencil 第2世代',
    amazonUrl: 'https://www.amazon.co.jp/dp/B07K1NDB7Q?tag=and-and-22',
    reason: 'ダブルタップでペンと消しゴムを素早く切り替えられるため、ノートテイキングがスムーズ。マグネット充電でケーブル不要なのも便利です。ペーパーライクフィルムと組み合わせると、さらに紙に近い書き心地が得られます。',
  },
  {
    id: 'guide-cost',
    icon: 'fa-solid fa-coins',
    title: 'コストを抑えたい方',
    recommendation: 'Apple Pencil（USB-C）',
    amazonUrl: 'https://www.amazon.co.jp/dp/B0CSWDP9F7?tag=and-and-22',
    reason: '最も手頃な価格で購入できるApple Pencilです。筆圧感知やダブルタップは非搭載ですが、傾き検知には対応しており、基本的な手書きやマークアップには十分な性能です。',
  },
  {
    id: 'guide-old',
    icon: 'fa-solid fa-tablet-screen-button',
    title: 'Lightning端子のiPadを使っている方',
    recommendation: 'Apple Pencil 第1世代',
    amazonUrl: 'https://www.amazon.co.jp/dp/B018MX3PNU?tag=and-and-22',
    reason: 'Lightning端子を搭載した旧モデルのiPadに対応する唯一のApple Pencilです。筆圧感知・傾き検知に対応しており、イラストや手書きメモに活用できます。',
  },
]

export default function PencilGuideSection() {
  return (
    <section className="l-section" id="pencil-guide" aria-labelledby="heading-pencil-guide">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-pencil-guide">
          用途別Apple Pencilの選び方
        </h2>
        <p className="m-section-desc">
          どのApple Pencilを選ぶか迷っている方に向けて、用途別におすすめのモデルをまとめました。
        </p>

        <div className="l-grid l-grid--2col" style={{ gap: 'var(--space-lg)', marginTop: 'var(--space-xl)' }}>
          {GUIDES.map((g) => (
            <div key={g.id} id={g.id} className="m-card m-card--shadow m-card--padded">
              <p className="popular-card-subtitle">
                <i className={g.icon} aria-hidden="true" style={{ marginRight: '0.5em' }}></i>
                {g.title}
              </p>
              <p className="popular-card-title">
                <a href={g.amazonUrl} rel="nofollow noopener noreferrer" target="_blank">
                  {g.recommendation}
                </a>
              </p>
              <div className="pencil-detail-item">
                <p>{g.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
