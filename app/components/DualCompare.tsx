'use client'

import { useState } from 'react'
import Image from 'next/image'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { CompareCategory } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type DualCompareModel = {
  id: number; model: string; slug: string; image: string | null; shortname?: string | null
  /** per-model 画像パス（絶対）。未指定(undefined)なら image + imagePath にフォールバック。null は画像なし */
  imageSrc?: string | null
  /** per-model 詳細リンク。未指定なら `/${detailPath}/${slug}` にフォールバック */
  detailHref?: string
  /** per-model イオシスURL。未指定/null なら shopLinks(getIosysLink) にフォールバック */
  iosysUrl?: string | null
}

type Props<T extends DualCompareModel> = {
  models: T[]
  shopLinks: ProductShopLink[]
  productName: string
  imagePath: string
  detailPath: string
  categories: CompareCategory<T>[]
  defaultIndexA?: number
  defaultIndexB?: number
  getOptionLabel?: (m: T) => string
}

export default function DualCompare<T extends DualCompareModel>({
  models,
  shopLinks,
  productName,
  imagePath,
  detailPath,
  categories,
  defaultIndexA = 4,
  defaultIndexB = 5,
  getOptionLabel,
}: Props<T>) {
  const defaultA = models.length > defaultIndexA ? models[defaultIndexA].id : models[0]?.id || 0
  const defaultB = models.length > defaultIndexB ? models[defaultIndexB].id : models[1]?.id || 0

  const [idA, setIdA] = useState(defaultA)
  const [idB, setIdB] = useState(defaultB)

  const modelA = models.find((m) => m.id === idA) || models[0]
  const modelB = models.find((m) => m.id === idB) || models[1] || models[0]

  const getIosysLink = (productId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === 1)

  // per-model 優先で画像 / 詳細リンク / イオシスURL を解決（未指定はグローバル props にフォールバック）
  const imgSrcOf = (m: T): string | null =>
    m.imageSrc !== undefined ? m.imageSrc : (m.image ? `/images/${imagePath}/${m.image}` : null)
  const detailHrefOf = (m: T): string => m.detailHref ?? `/${detailPath}/${m.slug}`
  const iosysUrlOf = (m: T): string | null | undefined => m.iosysUrl ?? getIosysLink(m.id)?.url

  const imgSrcA = imgSrcOf(modelA)
  const imgSrcB = imgSrcOf(modelB)
  const urlA = iosysUrlOf(modelA)
  const urlB = iosysUrlOf(modelB)

  const optionLabel = getOptionLabel || ((m: T) => m.shortname || m.model)

  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          {productName}の2機種スペック比較ツール｜性能差・違いを一目で確認
        </h2>
        <p className="m-section-desc">
          気になる2機種の{productName}のスペック・性能差を一目で比較できるツールです。<br />
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
                  <a href={detailHrefOf(modelA)} className="compare-model-link">
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
                  <a href={detailHrefOf(modelB)} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                </td>
              </tr>
            </thead>

            <tbody className="compare-table__image-row">
              <tr>
                <th></th>
                <td className="compare-table__image-cell">
                  {imgSrcA && (
                    <Image
                      src={imgSrcA}
                      alt={modelA.model}
                      width={120}
                      height={120}
                      className="compare-model-img"
                    />
                  )}
                </td>
                <td className="compare-table__image-cell">
                  {imgSrcB && (
                    <Image
                      src={imgSrcB}
                      alt={modelB.model}
                      width={120}
                      height={120}
                      className="compare-model-img"
                    />
                  )}
                </td>
              </tr>
            </tbody>

            {categories.map((cat) => {
              // hideIfAllEmpty の行は、選択中の2機種がどちらも '-' なら出さない。
              // 指定していない行（既存カテゴリはすべてこちら）は従来どおり常に出る
              const rows = cat.rows.filter(
                (row) => !row.hideIfAllEmpty || row.get(modelA) !== '-' || row.get(modelB) !== '-'
              )
              if (rows.length === 0) return null
              return (
                <tbody key={cat.title}>
                  <tr>
                    <th colSpan={3} className="compare-category-cell">
                      <span className="compare-category">
                        <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {cat.title}
                      </span>
                    </th>
                  </tr>
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.get(modelA)}</td>
                      <td>{row.get(modelB)}</td>
                    </tr>
                  ))}
                </tbody>
              )
            })}

            <tfoot>
              <tr className="compare-table__action-row">
                <th></th>
                <td>
                  {urlA ? (
                    <a href={urlA} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">
                      中古価格を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  ) : '-'}
                </td>
                <td>
                  {urlB ? (
                    <a href={urlB} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">
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
