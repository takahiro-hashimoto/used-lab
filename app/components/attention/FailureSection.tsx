import type { FailurePattern } from './types'

interface Props {
  productName: string
  guidePath: string
  failurePatterns: FailurePattern[]
}

export default function FailureSection({ productName, guidePath, failurePatterns }: Props) {
  return (
    <section className="l-section" id="failure" aria-labelledby="heading-failure">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-failure">
          よくある失敗パターン
        </h2>
        <p className="m-section-desc">中古{productName}購入で後悔する人には共通点があります。</p>
        <p className="m-section-desc">以下の{failurePatterns.length}つは特に多い失敗パターンです。当てはまりそうなら要注意。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg post-check-grid">
          {failurePatterns.map((item, i) => (
            <div key={i} className="m-card m-card--shadow m-card--padded post-check-item">
              <h3 className="post-check-item__heading">{item.heading}</h3>
              <div className="caution-check-card__text">{item.text}</div>
            </div>
          ))}
        </div>

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            どの機種を選べばいいか迷ったら「<a href={guidePath}>中古{productName}おすすめ機種</a>」をご覧ください。あなたに合ったコスパのよい機種が見つかります。
          </p>
        </div>
      </div>
    </section>
  )
}
