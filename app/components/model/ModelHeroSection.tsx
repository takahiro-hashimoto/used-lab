import Link from 'next/link'
import Image from 'next/image'
import HeroMeta from '@/app/components/HeroMeta'

export type ModelHeroConfig = {
  categoryPath: string
  categoryLabel: string
  categoryJsonLd: string
  imageFolder: string
  imageWidth?: number
  imageHeight?: number
  h1Template?: string
  descriptionTemplate?: string
}

type Props = {
  model: { model: string; slug: string; image: string | null }
  config: ModelHeroConfig
  dateStr: string
  dateDisplay: string
}

const DEFAULT_H1 = (name: string) =>
  `中古${name}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`

const DEFAULT_DESCRIPTION = (name: string) =>
  `${name}の中古価格相場、ベンチマークスコア、スペック比較、おすすめショップ情報。`

export default function ModelHeroSection({ model, config, dateStr, dateDisplay }: Props) {
  const {
    categoryPath,
    categoryLabel,
    categoryJsonLd,
    imageFolder,
    imageWidth = 360,
    imageHeight = 360,
    h1Template,
    descriptionTemplate,
  } = config

  const h1Text = h1Template
    ? h1Template.replace('${model}', model.model)
    : DEFAULT_H1(model.model)

  const description = descriptionTemplate
    ? descriptionTemplate.replace('${model}', model.model)
    : DEFAULT_DESCRIPTION(model.model)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `中古 ${model.model}`,
    description,
    brand: { '@type': 'Brand', name: 'Apple' },
    category: categoryJsonLd,
    ...(model.image && { image: `https://used-lab.com/images/${imageFolder}/${model.image}` }),
    url: `https://used-lab.com${categoryPath}/${model.slug}/`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '中古Apple製品を安く買う',
        item: 'https://used-lab.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabel,
        item: `https://used-lab.com${categoryPath}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: model.model,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="hero-wrapper">
        {/* パンくずリスト */}
        <nav className="breadcrumb" aria-label="パンくずリスト">
          <div className="l-container">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link href="/">
                  <i className="fa-solid fa-house" aria-hidden="true"></i>{' '}
                  <span>中古Apple製品を安く買う</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={categoryPath}>{categoryLabel}</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">{model.model}</li>
            </ol>
          </div>
        </nav>

        {/* HERO */}
        <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {h1Text}
            </h1>
            <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
          </div>
          <div className="hero-visual">
            <figure className="hero-media">
              {model.image && (
                <Image
                  src={`/images/${imageFolder}/${model.image}`}
                  alt={`${model.model} の外観イメージ`}
                  className="hero-media__img hero-media__img--padded"
                  width={imageWidth}
                  height={imageHeight}
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              )}
            </figure>
          </div>
        </div>
        </header>
      </div>
    </>
  )
}
