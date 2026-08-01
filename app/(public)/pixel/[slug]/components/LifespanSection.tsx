import Link from 'next/link'
import type { PixelModel } from '@/lib/types'
import { calculatePixelSupport } from '../pixel-helpers'

type Props = {
  model: PixelModel
}

export default function LifespanSection({ model }: Props) {
  const support = calculatePixelSupport(model)

  if (support.releaseYear === 0) return null

  return (
    <section className="l-section" id="lifespan" aria-labelledby="heading-lifespan">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-lifespan">
          {model.model}はいつまで使える？製品寿命は？
        </h2>
        <p className="m-section-desc">
          Googleが定めるAndroid・セキュリティ更新の保証期間から{model.model}の寿命目安を確認しましょう。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg l-grid--mb-xl">
          <div className="m-card m-stat-card m-stat-card--lg lifespan-card" style={{ alignItems: 'center', textAlign: 'center' }}>
            <span className="m-badge m-badge--primary lifespan-card-label">
              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> アップデート保証
            </span>
            <p className="m-stat-card__value">
              {support.supportEnded ? (
                <>終了済み</>
              ) : (
                <>{support.supportUntilDisplay}頃まで</>
              )}
            </p>
            <p className="m-stat-card__note">
              OS・セキュリティ更新を受けられる目安。<br />Pixel 8以降は発売から7年間サポートされる。
            </p>
          </div>
          <div className="m-card m-stat-card m-stat-card--lg lifespan-card" style={{ alignItems: 'center', textAlign: 'center' }}>
            <span className="m-badge m-badge--primary lifespan-card-label">
              <i className="fa-solid fa-code-branch" aria-hidden="true"></i> 更新保証年数
            </span>
            <p className="m-stat-card__value">
              {support.policy.main}
            </p>
            <p className="m-stat-card__note">
              {support.policy.sub || 'Googleが保証するアップデート年数。'}
            </p>
          </div>
        </div>

        <aside className="glossary-box m-card" aria-label="用語解説">
          <dl className="glossary-list">
            <div className="glossary-item">
              <dt className="glossary-item-title">Androidアップデートの保証期間</dt>
              <dd className="glossary-item-desc">
                Pixel 8以降はOS・セキュリティ更新が発売から7年、Pixel 6/7世代はセキュリティ更新が5年（OSメジャー更新は3年）保証されている。保証が切れると最新機能や新しい脅威への対応が受けられなくなり、一部アプリが使えなくなるリスクがある。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">セキュリティ更新</dt>
              <dd className="glossary-item-desc">
                不正アクセスやウイルスなどの新しい脅威に対応するための更新。OSメジャー更新が終わった後もセキュリティ更新が続くモデルは、安全に使い続けやすい。
              </dd>
            </div>
            <div className="glossary-item">
              <dt className="glossary-item-title">バッテリーの寿命</dt>
              <dd className="glossary-item-desc">
                中古Pixelはバッテリーの劣化具合が使い心地に直結する。状態表記のあるショップを選び、必要に応じてバッテリー交換の費用も見込んでおくと安心。
              </dd>
            </div>
          </dl>
        </aside>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            サポート期間を確認したい方は「<Link prefetch={false} href="/pixel/used-pixel-support/">中古Pixelはいつまで使える？機種別のサポート期間一覧</Link>」もあわせてご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}
