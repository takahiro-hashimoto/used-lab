/**
 * iOSサポート期間比較セクション
 * lifespan-card (m-stat-card) パターンで2モデル並列表示
 */

import type { IPhoneModel } from '@/lib/types'
import { calculateOSLifespan } from '@/lib/utils/iphone-helpers'
import { getShortName } from './helpers'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
}

function LifespanCard({ model }: { model: IPhoneModel }) {
  const osLife = calculateOSLifespan(model.date)

  return (
    <div className="m-card m-stat-card m-stat-card--lg lifespan-card" style={{ textAlign: 'center', alignItems: 'center' }}>
      <span className="m-badge m-badge--primary lifespan-card-label">
        <i className="fa-solid fa-code-branch" aria-hidden="true"></i> {model.model}のiOSサポート期間
      </span>
      <p className="m-stat-card__value">
        {osLife.isSupported ? (
          <><time dateTime={`${osLife.osEndYear}-09`}>{osLife.osEndYear}年9月頃</time>まで</>
        ) : (
          '終了'
        )}
      </p>
      <p className="m-stat-card__note">
        {model.model}の発売日は{model.date ? (() => { const p = model.date!.split('/'); return `${p[0]}年${p[1]}月${p[2] || ''}日`; })() : '不明'}。<br />
        発売から7年ほどが経過するとサポート終了になる傾向がある。
      </p>
    </div>
  )
}

export default function CompareLifespan({ modelL, modelR }: Props) {
  const shortL = getShortName(modelL)
  const shortR = getShortName(modelR)

  return (
    <section className="l-section" id="life" aria-labelledby="heading-life">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-life">
          {shortL}と{shortR}のiOSサポート期間
        </h2>
        <p className="m-section-desc">
          OSアップデートがあと何年続くかを予測・比較します。
        </p>

        <div className="compare-lifespan-grid">
          <LifespanCard model={modelL} />
          <LifespanCard model={modelR} />
        </div>

        <div className="m-callout m-callout--tip">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            中古iPhoneのiOSサポート期間について詳しく知りたい方は「<a href="/iphone/used-iphone-support/">中古iPhoneのiOSサポートはいつまで？</a>」をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}
