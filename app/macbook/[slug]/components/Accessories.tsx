import type { MacBookModel } from '@/lib/types'

type Props = {
  model: MacBookModel
}

export default function Accessories({ model }: Props) {
  const hasCase = model.accessory_case && model.accessory_case.trim() !== ''
  const hasFilm = model.accessory_film && model.accessory_film.trim() !== ''

  if (!hasCase && !hasFilm) return null

  return (
    <section className="l-section l-section--bg-subtle" id="accessories" aria-labelledby="heading-accessories">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-accessories">
          {model.model}のおすすめアクセサリー
        </h2>
        <p className="m-section-desc">
          {model.model}と一緒に購入しておきたいアクセサリーをピックアップしました。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {hasCase && (
            <div className="m-card m-card--shadow accessory-card">
              <div className="accessory-card__header">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                <h3>保護ケース</h3>
              </div>
              <p className="accessory-card__desc">
                MacBookの本体をキズや衝撃から守るケース。持ち運びが多い方には必須のアイテムです。
              </p>
              <a
                href={model.accessory_case!}
                className="m-btn m-btn--primary m-btn--block"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                ケースを見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          )}

          {hasFilm && (
            <div className="m-card m-card--shadow accessory-card">
              <div className="accessory-card__header">
                <i className="fa-solid fa-film" aria-hidden="true"></i>
                <h3>保護フィルム</h3>
              </div>
              <p className="accessory-card__desc">
                ディスプレイのキズや指紋を防ぐ保護フィルム。画面の見やすさを損なわない高透明タイプが人気です。
              </p>
              <a
                href={model.accessory_film!}
                className="m-btn m-btn--primary m-btn--block"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                フィルムを見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
