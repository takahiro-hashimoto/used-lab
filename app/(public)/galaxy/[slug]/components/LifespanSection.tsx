import Link from 'next/link'
import type { GalaxyModel } from '@/lib/types'
import { getReleaseYear } from '@/lib/utils/shared-helpers'
import { calculateGalaxySupport, formatSupportUntil, supportPolicyLabel } from '../lib/helpers'
import { currentJstYear } from '@/lib/utils/current-year'

type Props = {
  model: GalaxyModel
}

export default function LifespanSection({ model }: Props) {
  const releaseYear = getReleaseYear(model.date)
  if (releaseYear === 0) return null

  const support = calculateGalaxySupport(model)
  const policy = supportPolicyLabel(support.updateYears)
  const supportEndDisplay = formatSupportUntil(support.supportUntil)

  // 修理・バッテリー交換の目安（発売から約5年をパーツ供給の目安として表示）
  const repairEndYear = releaseYear + 5
  const currentYear = currentJstYear()
  const repairSupported = repairEndYear >= currentYear

  return (
    <section className="l-section" id="lifespan" aria-labelledby="heading-lifespan">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-lifespan">
          {model.model}はいつまで使える？製品寿命は？
        </h2>
        <p className="m-section-desc">
          Android・セキュリティ更新と、バッテリー交換・修理の2つの観点から{model.model}の寿命目安を整理しました。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg l-grid--mb-xl">
          <div className="m-card m-stat-card m-stat-card--lg lifespan-card" style={{ alignItems: 'center', textAlign: 'center' }}>
            <span className="m-badge m-badge--primary lifespan-card-label">
              <i className="fa-solid fa-code-branch" aria-hidden="true"></i> Android・セキュリティ更新
            </span>
            <p className="m-stat-card__value">
              {support.ended ? (
                <>終了済み</>
              ) : support.supportUntil ? (
                <><time dateTime={support.supportUntil}>{supportEndDisplay}</time>頃まで</>
              ) : (
                <>更新保証あり</>
              )}
            </p>
            <p className="m-stat-card__note">
              {policy.main !== '-' ? (
                <>更新保証は{policy.main}（{policy.sub}）。<br />最新のOne UI機能やセキュリティパッチが使える目安。</>
              ) : (
                <>最新のOne UI機能やセキュリティパッチが使える目安。</>
              )}
            </p>
          </div>
          <div className="m-card m-stat-card m-stat-card--lg lifespan-card" style={{ alignItems: 'center', textAlign: 'center' }}>
            <span className="m-badge m-badge--primary lifespan-card-label">
              <i className="fa-solid fa-wrench" aria-hidden="true"></i> バッテリー交換・修理
            </span>
            <p className="m-stat-card__value">
              {repairSupported ? (
                <><time dateTime={`${repairEndYear}`}>{repairEndYear}年頃</time>まで</>
              ) : (
                <>要確認</>
              )}
            </p>
            <p className="m-stat-card__note">
              Samsung正規サービスプロバイダや修理店でバッテリー交換・画面修理ができる目安。
            </p>
          </div>
        </div>

        <aside className="glossary-box m-card" aria-label="用語解説">
          <dl className="glossary-list">
            <div className="glossary-item">
              <dt className="glossary-item-title">Android・セキュリティ更新の保証期間</dt>
              <dd className="glossary-item-desc">
                Galaxy S24以降のSシリーズやZ Flip6／Z Fold6以降の折りたたみは最大7年、S22／S23世代はOS4回・セキュリティ5年が保証されています。AシリーズはOS2〜4回・セキュリティ5年が目安。保証期間を過ぎると最新のOne UIやセキュリティパッチが配信されなくなり、新しい脆弱性への対応や一部アプリの動作に支障が出ることがあります。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">バッテリー交換</dt>
              <dd className="glossary-item-desc">
                Galaxyのバッテリーは充放電を繰り返すと劣化します。正規サービスプロバイダなら比較的安価に交換できますが、発売から年数が経った機種は買い替えとのコスト比較がおすすめです。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">折りたたみ（Z）のヒンジ・画面折り目・保護フィルム</dt>
              <dd className="glossary-item-desc">
                Z Flip／Z Foldは内側ディスプレイに折り目があり、開閉を繰り返すヒンジや貼付済みの保護フィルムが消耗部品です。中古では折り目のスジやフィルムの浮き・剥がれ、ヒンジのガタつきがないかを必ずチェックしましょう。防塵性能はバー型ほど高くない（IPX8等）世代もある点にも注意が必要です。
              </dd>
            </div>
          </dl>
        </aside>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            サポート期間を確認したい方は「<Link prefetch={false} href="/galaxy/used-galaxy-support/">中古Galaxyのサポート期間の目安（機種別の寿命一覧）</Link>」もあわせてご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}
