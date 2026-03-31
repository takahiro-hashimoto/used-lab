'use client'

import { useState } from 'react'
import Image from 'next/image'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { ProductShopLink } from '@/lib/types'

type CompareCategory = {
  title: string
  rows: { label: string; get: (m: any) => React.ReactNode }[]
}

type Props = {
  models: { id: number; model: string; slug: string; image: string | null; shortname?: string | null }[]
  shopLinks: ProductShopLink[]
  productName: string
  imagePath: string
  detailPath: string
  categories: CompareCategory[]
  defaultIndexA?: number
  defaultIndexB?: number
  getOptionLabel?: (m: any) => string
}

export default function DualCompare({
  models,
  shopLinks,
  productName,
  imagePath,
  detailPath,
  categories,
  defaultIndexA = 4,
  defaultIndexB = 5,
  getOptionLabel,
}: Props) {
  const defaultA = models.length > defaultIndexA ? models[defaultIndexA].id : models[0]?.id || 0
  const defaultB = models.length > defaultIndexB ? models[defaultIndexB].id : models[1]?.id || 0

  const [idA, setIdA] = useState(defaultA)
  const [idB, setIdB] = useState(defaultB)

  const modelA = models.find((m) => m.id === idA) || models[0]
  const modelB = models.find((m) => m.id === idB) || models[1] || models[0]

  const getIosysLink = (productId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === 1)

  const linkA = getIosysLink(modelA.id)
  const linkB = getIosysLink(modelB.id)

  const optionLabel = getOptionLabel || ((m: any) => m.shortname || m.model)

  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          気になる2機種の{productName}の違いを比較
        </h2>
        <p className="m-section-desc">
          気になる2機種の{productName}を簡単に比較できるツールです。<br />
          今持っている機種と購入を検討中の機種を比較したい方はぜひチェックしてみてください。
        </p>

        <StickyTableWrapper className="m-card m-card--shadow compare-card">
          <table className="compare-table">
            <caption className="visually-hidden">2機種の{productName}スペック比較</caption>
            <colgroup>
              <col className="compare-table__col-label" />
              <col />
              <col />
            </colgroup>

            <thead>
              <tr>
                <th></th>
                <td className="compare-table__header-cell">
                  <label htmlFor="compare-select-a" className="visually-hidden">1台目のモデルを選択</label>
                  <select
                    className="compare-select"
                    id="compare-select-a"
                    value={idA}
                    onChange={(e) => setIdA(Number(e.target.value))}
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{optionLabel(m)}</option>
                    ))}
                  </select>
                  <a href={`/${detailPath}/${modelA.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                </td>
                <td className="compare-table__header-cell">
                  <label htmlFor="compare-select-b" className="visually-hidden">2台目のモデルを選択</label>
                  <select
                    className="compare-select"
                    id="compare-select-b"
                    value={idB}
                    onChange={(e) => setIdB(Number(e.target.value))}
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{optionLabel(m)}</option>
                    ))}
                  </select>
                  <a href={`/${detailPath}/${modelB.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                </td>
              </tr>
            </thead>

            <tbody className="compare-table__image-row">
              <tr>
                <th></th>
                <td className="compare-table__image-cell">
                  {modelA.image && (
                    <Image
                      src={`/images/${imagePath}/${modelA.image}`}
                      alt={modelA.model}
                      width={120}
                      height={120}
                      className="compare-model-img"
                    />
                  )}
                </td>
                <td className="compare-table__image-cell">
                  {modelB.image && (
                    <Image
                      src={`/images/${imagePath}/${modelB.image}`}
                      alt={modelB.model}
                      width={120}
                      height={120}
                      className="compare-model-img"
                    />
                  )}
                </td>
              </tr>
            </tbody>

            {categories.map((cat) => (
              <tbody key={cat.title}>
                <tr>
                  <th colSpan={3} className="compare-category-cell">
                    <span className="compare-category">
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {cat.title}
                    </span>
                  </th>
                </tr>
                {cat.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.get(modelA)}</td>
                    <td>{row.get(modelB)}</td>
                  </tr>
                ))}
              </tbody>
            ))}

            <tfoot>
              <tr className="compare-table__action-row">
                <th></th>
                <td>
                  {linkA ? (
                    <a href={linkA.url} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">
                      中古価格を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  ) : '-'}
                </td>
                <td>
                  {linkB ? (
                    <a href={linkB.url} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">
                      中古価格を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  ) : '-'}
                </td>
              </tr>
            </tfoot>
          </table>
        </StickyTableWrapper>
      </div>
    </section>
  )
}
