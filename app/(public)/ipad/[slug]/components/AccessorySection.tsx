import type { IPadModel, IPadAccessory } from '@/lib/types'

type Props = {
  model: IPadModel
  accessories: IPadAccessory[]
}

/** アクセサリタイプごとのアイコン */
function getAccessoryIcon(type: string): string {
  switch (type) {
    case 'pencil':
      return 'fa-pen-nib'
    case 'keyboard':
      return 'fa-keyboard'
    case 'case':
      return 'fa-shield-halved'
    case 'film':
      return 'fa-mobile-screen'
    default:
      return 'fa-puzzle-piece'
  }
}

/** アクセサリの説明文を生成 */
function getAccessoryDescription(name: string, type: string, modelName: string): string {
  if (type === 'case') {
    return `${modelName}に対応するケース・カバーをAmazonで探せます。`
  }
  if (type === 'film') {
    return `${modelName}に対応する保護フィルムをAmazonで探せます。`
  }
  if (type === 'pencil') {
    return `${modelName}で使える${name}。手書き入力やイラスト制作に。`
  }
  if (type === 'keyboard') {
    return `${modelName}に対応する${name}。タイピング作業を快適に。`
  }
  return `${modelName}に対応する${name}。`
}

export default function AccessorySection({ model, accessories }: Props) {
  // アクセサリカード一覧を構築
  type CardItem = {
    key: string
    name: string
    type: string
    description: string
    icon: string
    amazonUrl: string
  }
  const cards: CardItem[] = []

  // ケース（accessory_case フィールドの Amazon URL）
  if (model.accessory_case) {
    cards.push({
      key: 'case',
      name: '対応ケース',
      type: 'case',
      description: getAccessoryDescription('', 'case', model.model),
      icon: getAccessoryIcon('case'),
      amazonUrl: model.accessory_case,
    })
  }

  // フィルム（accessory_film フィールドの Amazon URL）
  if (model.accessory_film) {
    cards.push({
      key: 'film',
      name: '対応フィルム',
      type: 'film',
      description: getAccessoryDescription('', 'film', model.model),
      icon: getAccessoryIcon('film'),
      amazonUrl: model.accessory_film,
    })
  }

  // DB のアクセサリ（pencil / keyboard）
  for (const acc of accessories) {
    if (acc.amazon_url) {
      cards.push({
        key: `acc-${acc.id}`,
        name: acc.name,
        type: acc.type,
        description: getAccessoryDescription(acc.name, acc.type, model.model),
        icon: getAccessoryIcon(acc.type),
        amazonUrl: acc.amazon_url,
      })
    }
  }

  if (cards.length === 0) return null

  return (
    <section className="l-section" id="accessories" aria-labelledby="heading-accessories">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-accessories">
          {model.model}に対応するアクセサリー
        </h2>
        <p className="m-section-desc">
          {model.model}で使えるアクセサリーをまとめました。
        </p>
        <p className="m-section-desc">
          ケース・フィルム・Apple Pencil・キーボードなど、用途に合わせてチェックしましょう。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {cards.map((card) => (
            <article key={card.key} className="m-card m-card--shadow accessory-card">
              <div className="accessory-card__header">
                <span className="accessory-card__icon">
                  <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
                </span>
                <h3 className="accessory-card__name">{card.name}</h3>
              </div>
              <p className="accessory-card__desc">{card.description}</p>
              <a
                href={card.amazonUrl}
                className="m-btn m-btn--primary m-btn--block"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                Amazonで探す{' '}
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </article>
          ))}
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            Apple Pencilやキーボードの対応機種・型番の詳細は、下記の比較ページもあわせてご確認ください。
          </p>
          <div className="m-callout__links">
            <a href="/ipad/apple-pencil-compare/" className="m-callout__link">
              <i className="fa-solid fa-pen-nib" aria-hidden="true"></i> Apple Pencil対応比較表
            </a>
            <a href="/ipad/accessories-summary/" className="m-callout__link">
              <i className="fa-solid fa-keyboard" aria-hidden="true"></i> Magic Keyboard 型番・対応一覧
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
