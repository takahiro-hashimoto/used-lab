import type { IPadModel } from '@/lib/types'
import { calculateOSLifespan, calculateRepairLifespan } from '@/lib/utils/ipad-helpers'

type Props = {
  model: IPadModel
}

export default function LifespanSection({ model }: Props) {
  const osLife = calculateOSLifespan(model.date)
  const repairLife = calculateRepairLifespan(model.date)

  if (osLife.releaseYear === 0) return null

  return (
    <section className="l-section l-section--bg-subtle" id="lifespan" aria-labelledby="heading-lifespan">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-lifespan">
          {model.model}はいつまで使える？製品寿命は？
        </h2>
        <p className="m-section-desc">
          OSサポートと修理受付の2つの期間から{model.model}の寿命目安を計算しました。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg l-grid--mb-xl">
          <div className="m-card m-stat-card m-stat-card--lg lifespan-card">
            <span className="m-badge m-badge--primary lifespan-card-label">
              <i className="fa-solid fa-code-branch" aria-hidden="true"></i> OSアップデート
            </span>
            <p className="m-stat-card__value">
              {osLife.isSupported ? (
                <><time dateTime={`${osLife.osEndYear}-09`}>{osLife.osEndYear}年9月頃</time>まで</>
              ) : (
                <>終了済み</>
              )}
            </p>
            <p className="m-stat-card__note">
              最新のiPadOS機能が使える目安。発売から7年ほどが経過するとサポート終了になる傾向がある。
            </p>
          </div>
          <div className="m-card m-stat-card m-stat-card--lg lifespan-card">
            <span className="m-badge m-badge--primary lifespan-card-label">
              <i className="fa-solid fa-wrench" aria-hidden="true"></i> 修理受付期間
            </span>
            <p className="m-stat-card__value">
              {repairLife.isSupported ? (
                <><time dateTime={`${repairLife.repairEndYear}-09`}>{repairLife.repairEndYear}年9月頃</time>まで</>
              ) : (
                <>終了済み</>
              )}
            </p>
            <p className="m-stat-card__note">
              Apple正規店でのバッテリー交換や画面ひび割れ修理が可能な期間の目安。
            </p>
          </div>
        </div>

        <aside className="glossary-box m-card" aria-label="用語解説">
          <dl className="glossary-list">
            <div className="glossary-item">
              <dt className="glossary-item-title">iPadOSのサポート期間</dt>
              <dd className="glossary-item-desc">
                発売から6~7年以上が経過すると最新iPadOSのサポートが終了するのが過去の傾向。古いOSのiPadを使い続けると、一部のアプリが機能しなくなる、進化したウィルスや不正行為に対応出来ない、といったリスクがある。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">ビンテージ製品</dt>
              <dd className="glossary-item-desc">
                販売終了から5年以上7年未満が経過したiPadが対象。修理に必要なパーツがない場合に修理サポートが受けられなくなる。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">オブソリート製品</dt>
              <dd className="glossary-item-desc">
                販売終了から7年以上が経ったiPadが対象。Appleの正規修理サポートを受けることが一切できなくなる。
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
