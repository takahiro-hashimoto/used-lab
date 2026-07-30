import Image from 'next/image'
import Link from 'next/link'
import type { ModelData } from '../page'

function formatRelease(releaseDate: string): string {
  const [y, m] = releaseDate.split('/')
  return y && m ? `${y}年${m}月` : releaseDate
}

type Props = {
  items: ModelData[]
  dateDisplay: string
}

export default function PriceDropSection({ items, dateDisplay }: Props) {
  const topDrop = items[0]

  return (
    <section className="l-section" id="pd-price-drop" aria-labelledby="pd-price-drop-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-price-drop-title">
          過去30日で値下がりした中古Apple Watch TOP10
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
                      src={`/images/watch/${model.image}`}
                      alt={model.name}
                      width={80}
                      height={80}
                    />
                  )}
                </div>
                <div className="ifd-result-card__info">
                  <Link prefetch={false} href={`/watch/${model.slug}/`} className="ifd-result-card__name">
                    {model.name}
                  </Link>
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
                <p className="ifd-result-card__price-drop">
                  <i className="fa-solid fa-arrow-trend-down" aria-hidden="true"></i>
                  30日で {Math.abs(model.priceChange).toLocaleString()}円ダウン
                  <small>（{Math.abs(model.priceChangePercent)}%）</small>
                </p>
                <dl className="ifd-result-card__specs">
                  <div><dt>発売日</dt><dd>{formatRelease(model.releaseDate)}</dd></div>
                  <div><dt>CPU</dt><dd>{model.chip}</dd></div>
                  <div><dt>ケースサイズ</dt><dd>{model.size}</dd></div>
                  <div><dt>バッテリー</dt><dd>{model.battery}</dd></div>
                  <div><dt>容量</dt><dd>{model.storage}</dd></div>
                </dl>
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
