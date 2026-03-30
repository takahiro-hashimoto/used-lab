/**
 * 比較スペックカード
 * PHPの c-feature-card に相当する Server Component
 */

import type { ComparisonResult } from './helpers'

type Props = {
  data: ComparisonResult
  nameL: string
  nameR: string
  /** 長めのテキスト値の場合 medium サイズを適用 */
  mediumValue?: boolean
  /** 説明文を非表示にする */
  hideDesc?: boolean
}

export default function FeatureCard({ data, nameL, nameR, mediumValue, hideDesc }: Props) {
  const valueCls = mediumValue ? 'fc-value fc-value--md' : 'fc-value'

  return (
    <div className="fc">
      <div className="fc__header">
        <h3 className="fc__title">
          <i className={`fa-solid ${data.icon}`} aria-hidden="true"></i>{' '}
          {data.label}
        </h3>
        {!hideDesc && <p className="fc__desc">{data.desc}</p>}
      </div>

      <div className="fc__body">
        {/* 左モデル */}
        <div className={`fc__col${data.left.isWin ? ' fc__col--win' : ''}`}>
          <p className="fc__model-label">{nameL}</p>
          <div className={valueCls}>
            <span>{data.left.display}</span>
            {data.left.badge && (
              <span className="fc__badge fc__badge--win">{data.left.badge}</span>
            )}
          </div>
        </div>

        <div className="fc__divider" aria-hidden="true">VS</div>

        {/* 右モデル */}
        <div className={`fc__col${data.right.isWin ? ' fc__col--win' : ''}`}>
          <p className="fc__model-label">{nameR}</p>
          <div className={valueCls}>
            <span>{data.right.display}</span>
            {data.right.badge && (
              <span className="fc__badge fc__badge--win">{data.right.badge}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
