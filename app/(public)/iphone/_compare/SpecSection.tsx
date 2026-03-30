/**
 * スペック比較セクション
 * 全項目をテーブル形式でコンパクトに表示
 */

import type { IPhoneModel } from '@/lib/types'
import type { SpecDefinition } from './spec-definitions'
import SpecTable from './SpecTable'

type Props = {
  id: string
  title: string
  desc?: string
  specs: SpecDefinition[]
  modelL: IPhoneModel
  modelR: IPhoneModel
  nameL: string
  nameR: string
}

export default function SpecSection({ id, title, desc, specs, modelL, modelR, nameL, nameR }: Props) {
  return (
    <section className="l-section" id={id} aria-labelledby={`heading-${id}`}>
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id={`heading-${id}`}>
          {title}
        </h2>
        {desc && <p className="m-section-desc">{desc}</p>}
        <SpecTable
          specs={specs}
          modelL={modelL}
          modelR={modelR}
          nameL={nameL}
          nameR={nameR}
        />
      </div>
    </section>
  )
}
