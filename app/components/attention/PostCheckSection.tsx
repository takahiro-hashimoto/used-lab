import type { CheckItem } from './types'

interface Props {
  heading: string
  productName: string
  checkItems: CheckItem[]
}

export default function PostCheckSection({ heading, productName, checkItems }: Props) {
  return (
    <section className="l-section l-section--bg-subtle" id="post-check" aria-labelledby="heading-post-check">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-post-check">
          {heading}
        </h2>
        <p className="m-section-desc">中古{productName}が届いたら、返品・交換期限を逃さないために以下の項目をすぐに確認してください。</p>
        <p className="m-section-desc">初期不良や記載と異なる点があれば、早めにショップへ連絡しましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg post-check-grid">
          {checkItems.map((item, i) => (
            <div key={i} className="m-card m-card--shadow m-card--padded post-check-item">
              <h3 className="post-check-item__heading">{item.heading}</h3>
              <div className="caution-check-card__text">{item.text}</div>
            </div>
          ))}
        </div>

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            これらのチェックは<strong>返品・交換期限内</strong>に必ず行いましょう。ショップによって期限は異なりますが、到着後7日〜30日以内が一般的です。問題があれば写真・動画で記録し、すぐにショップへ連絡してください。
          </p>
        </div>
      </div>
    </section>
  )
}
