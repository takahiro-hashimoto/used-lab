import Image from 'next/image'
import Link from 'next/link'
import type { ModelData } from '../page'
import { formatRelease, cameraConfig, portLabel } from './cardFormat'

type Props = {
  items: ModelData[]
  modelCount: number
  dateDisplay: string
}

export default function RankingSection({ items, modelCount, dateDisplay }: Props) {
  const cheapest = items[0]
  const second = items[1]
  const third = items[2]

  return (
    <section className="l-section" id="pd-ranking" aria-labelledby="pd-ranking-title" itemScope itemType="https://schema.org/ItemList">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-ranking-title" itemProp="name">
          中古相場が安いPixelランキングTOP10
        </h2>
        <meta itemProp="numberOfItems" content={String(items.length)} />
        <p className="m-section-desc">
          {dateDisplay}現在、相場がもっとも安いのは<strong>{cheapest?.name}（&yen;{cheapest?.currentPrice.toLocaleString()}）</strong>。
          <br />
          {second && (
            <>次いで{second.name}（&yen;{second.currentPrice.toLocaleString()}）</>
          )}
          {third && (
            <>、{third.name}（&yen;{third.currentPrice.toLocaleString()}）</>
          )}
          と続きます。全{modelCount}機種を掲載中。
        </p>

        <ol className="u-list-reset u-mb-2xl ifd-results-grid">
          {items.map((model, rank) => (
            <li
              key={model.id}
              className="m-card m-card--shadow ifd-result-card"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(rank + 1)} />
              <div className="ifd-result-card__header">
                <div className="ifd-result-card__img-wrap">
                  <span className="ifd-result-card__rank" aria-hidden="true">{rank + 1}</span>
                  {model.image && (
                    <Image
                      src={`/images/pixel/${model.image}`}
                      alt={model.name}
                      width={80}
                      height={80}
                    />
                  )}
                </div>
                <div className="ifd-result-card__info" itemProp="item" itemScope itemType="https://schema.org/Product">
                  <Link prefetch={false} href={`/pixel/${model.slug}/`} className="ifd-result-card__name" itemProp="name">
                    {model.name}
                  </Link>
                  <meta itemProp="brand" content="Google" />
                  <div className="ifd-result-card__tags">
                    {model.supportEnded ? (
                      <span className="ifd-tag ifd-tag--ended">
                        <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> サポート終了
                      </span>
                    ) : (
                      <span className="ifd-tag ifd-tag--supported">
                        <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> OSサポート {model.supportUntil}まで
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="ifd-result-card__body">
                <div className="ifd-result-card__price">
                  <span className="ifd-result-card__price-label">中古相場（{model.storage}）</span>
                  <span className="ifd-result-card__price-value">
                    ¥{model.currentPrice.toLocaleString()}
                  </span>
                </div>
                <dl className="ifd-result-card__specs">
                  <div><dt>発売日</dt><dd>{formatRelease(model.releaseDate)}</dd></div>
                  <div><dt>SoC</dt><dd>{model.chip}</dd></div>
                  <div><dt>画面</dt><dd>{model.display}</dd></div>
                  <div><dt>カメラ構成</dt><dd>{cameraConfig(model.camera)}</dd></div>
                  <div><dt>充電ポート</dt><dd>{portLabel(model.port)}</dd></div>
                </dl>
                {model.featureTags.length > 0 && (
                  <div className="ifd-result-card__feature-tags">
                    {model.featureTags.map((tag) => (
                      <span key={tag} className="ifd-feature-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="ifd-result-card__actions">
                {model.iosysUrl && (
                  <a
                    href={model.iosysUrl}
                    className="m-btn m-btn--primary m-btn--sm"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    aria-label={`${model.name}をイオシスで見る`}
                  >
                    イオシスで見る
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
