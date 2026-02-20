import type { ReactNode } from 'react'

/* ------------------------------------------------------------------
   型定義
   ------------------------------------------------------------------ */

/** 対象機種列に表示するリンク（iPhone / iPad で使用） */
type ModelLink = {
  label: string
  href: string
}

/** シリーズ名にリンクを付ける（Watch / MacBook で使用） */
type LifespanEntryWithHref = {
  series: string
  href: string
  releaseDate: string
  osEnd: string
  repairEnd: string
}

/** 対象機種列を持つ（iPhone / iPad で使用） */
type LifespanEntryWithModels = {
  series: string
  releaseDate: string
  models: ModelLink[]
  osEnd: string
  repairEnd: string
}

type LifespanEntry = LifespanEntryWithHref | LifespanEntryWithModels

function hasModels(entry: LifespanEntry): entry is LifespanEntryWithModels {
  return 'models' in entry
}

function hasHref(entry: LifespanEntry): entry is LifespanEntryWithHref {
  return 'href' in entry
}

/* ------------------------------------------------------------------
   用語解説アイテム
   ------------------------------------------------------------------ */
type GlossaryItem = {
  term: string
  description: string
}

type GlossaryGroup = {
  title: string
  label: string
  intro: ReactNode
  items: GlossaryItem[]
}

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */
type Props = {
  /** セクション見出し（例: "iPhoneのサポート期間一覧（寿命予想）"） */
  sectionTitle: string
  /** セクション説明文 */
  sectionDescription: ReactNode
  /** テーブルcaption（アクセシビリティ用） */
  tableCaption: string
  /** テーブルデータ */
  data: LifespanEntry[]
  /** 「対象機種」列を表示するか（iPhone/iPadはtrue、Watch/MacBookはfalse） */
  showModelsColumn?: boolean
  /** 用語解説グループ */
  glossaryGroups: GlossaryGroup[]
}

export type { LifespanEntry, LifespanEntryWithHref, LifespanEntryWithModels, ModelLink, GlossaryItem, GlossaryGroup }

/* ------------------------------------------------------------------
   コンポーネント
   ------------------------------------------------------------------ */
export default function LifespanTable({
  sectionTitle,
  sectionDescription,
  tableCaption,
  data,
  showModelsColumn = false,
  glossaryGroups,
}: Props) {
  return (
    <section className="l-section l-section--bg-subtle" id="lifespan-table" aria-labelledby="heading-lifespan-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-lifespan-table">
          {sectionTitle}
        </h2>
        <p className="m-section-desc">{sectionDescription}</p>

        {/* テーブル */}
        <div className="m-card m-table-card">
          <div className="m-table-scroll">
            <table className="m-table">
              <caption className="visually-hidden">{tableCaption}</caption>
              <thead>
                <tr>
                  <th>シリーズ</th>
                  {showModelsColumn && <th>対象機種</th>}
                  <th>OSサポート</th>
                  <th>修理受付</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry.series}>
                    <th>
                      <div>
                        {hasHref(entry) ? (
                          <strong><a href={entry.href}>{entry.series}</a></strong>
                        ) : (
                          <strong>{entry.series}</strong>
                        )}
                        <br />
                        <small>{entry.releaseDate}</small>
                      </div>
                    </th>
                    {showModelsColumn && hasModels(entry) && (
                      <td>
                        {entry.models.map((m, i) => (
                          <span key={m.href}>
                            {i > 0 && ' / '}
                            <a href={m.href}>{m.label}</a>
                          </span>
                        ))}
                      </td>
                    )}
                    <td>
                      <strong>{entry.osEnd}</strong>
                      <br />
                      <small>頃まで</small>
                    </td>
                    <td>
                      <strong>{entry.repairEnd}</strong>
                      <br />
                      <small>頃まで</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 用語解説グループ */}
        {glossaryGroups.map((group) => (
          <div key={group.title}>
            <h3 className="m-sub-heading">{group.title}</h3>
            <p className="m-body-text">{group.intro}</p>

            <aside className="glossary-box m-card m-card--shadow" aria-label={group.label}>
              <dl className="glossary-list">
                {group.items.map((item) => (
                  <div key={item.term} className="glossary-item">
                    <dt className="glossary-item-title">{item.term}</dt>
                    <dd className="glossary-item-desc">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        ))}
      </div>
    </section>
  )
}
