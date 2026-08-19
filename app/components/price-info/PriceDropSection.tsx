import Image from 'next/image'
import Link from 'next/link'
import type { PriceCardModel, PriceCardConfig } from './card-config'

// ============================================================
// 過去30日で値下がりした機種 TOP10（price-info 各ページ共通）
//
// 以前はカテゴリごとに同じファイルを置いていた（6ファイルの9割が同一）。
// カードの構造は RankingSection と同じで、カテゴリ差も同じ config を
// 共用する。設定の中身は card-config.ts を参照。
// ============================================================

type Props<M extends PriceCardModel> = {
  items: M[]
  dateDisplay: string
  config: PriceCardConfig<M>
}

export default function PriceDropSection<M extends PriceCardModel>({
  items,
  dateDisplay,
  config,
}: Props<M>) {
  const topDrop = items[0]

  return (
    <section className="l-section" id="pd-price-drop" aria-labelledby="pd-price-drop-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-price-drop-title">
          過去30日で値下がりした中古{config.categoryLabel} TOP10
        </h2>
        {topDrop && (
          <p className="m-section-desc">
            直近30日間で最も値下がりしたのは<strong>{topDrop.name}</strong>で、
            <strong>
              {Math.abs(topDrop.priceChange).toLocaleString()}円（{Math.abs(topDrop.priceChangePercent)}%）
            </strong>
            ダウン。
            <br />
            新型発売や在庫状況により価格は日々変動するため、こまめなチェックがおすすめです。（{dateDisplay}時点）
          </p>
        )}

        <ol className="u-list-reset u-mb-2xl ifd-results-grid">
          {items.map((model, i) => (
            <li key={model.id} className="m-card m-card--shadow ifd-result-card">
              <div className="ifd-result-card__header">
                <div className="ifd-result-card__img-wrap">
                  <span className="ifd-result-card__rank" aria-hidden="true">{i + 1}</span>
                  {model.image && (
                    <Image
                      src={`/images/${config.categoryPath}/${model.image}`}
                      alt={model.name}
                      width={80}
                      height={80}
                    />
                  )}
                </div>
                <div className="ifd-result-card__info">
                  <Link prefetch={false} href={`/${config.categoryPath}/${model.slug}/`} className="ifd-result-card__name">
                    {model.name}
                  </Link>
                  <div className="ifd-result-card__tags">
                    {model.supportEnded ? (
                      <span className="ifd-tag ifd-tag--ended">
                        <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> サポート終了
                      </span>
                    ) : (
                      <span className="ifd-tag ifd-tag--supported">
                        <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> {config.supportTag(model)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="ifd-result-card__body">
                <div className="ifd-result-card__price">
                  {config.showStorage ? (
                    <span className="ifd-result-card__price-label">中古相場（{model.storage}）</span>
                  ) : (
                    <span className="ifd-result-card__price-label">中古相場</span>
                  )}
                  <span className="ifd-result-card__price-value">
                    ¥{model.currentPrice.toLocaleString()}
                  </span>
                </div>
                <p className="ifd-result-card__price-drop">
                  <i className="fa-solid fa-arrow-trend-down" aria-hidden="true"></i>
                  30日で {Math.abs(model.priceChange).toLocaleString()}円ダウン
                  <small>（{Math.abs(model.priceChangePercent)}%）</small>
                </p>
                <dl className="ifd-result-card__specs">
                  {config.specs(model).map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
                {config.showFeatureTags && model.featureTags && model.featureTags.length > 0 && (
                  <div className="ifd-result-card__feature-tags">
                    {model.featureTags.map((tag) => (
                      <span key={tag} className="ifd-feature-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="ifd-result-card__actions">
                {(() => {
                  const cta = config.cta(model)
                  return cta && (
                    <a
                      href={cta.href}
                      className="m-btn m-btn--primary m-btn--sm"
                      rel={cta.rel}
                      target="_blank"
                      aria-label={cta.ariaLabel}
                    >
                      {cta.children}
                    </a>
                  )
                })()}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
