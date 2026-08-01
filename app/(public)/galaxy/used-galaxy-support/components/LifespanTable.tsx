import Link from 'next/link'
import type { GalaxyModel } from '@/lib/types'
import { getReleaseYear, getReleaseMonth } from '@/lib/utils/shared-helpers'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'

/* ------------------------------------------------------------------
   "2032-01" → "2032年1月"
   ------------------------------------------------------------------ */
function formatSupportUntil(str: string | null): string {
  if (!str) return '-'
  const m = str.match(/^(\d{4})-(\d{1,2})/)
  if (!m) return str
  return `${m[1]}年${parseInt(m[2], 10)}月`
}

/** "Samsung Galaxy S24 Ultra" → "Galaxy S24 Ultra"（表示用に "Samsung " を除去） */
function shortName(model: string): string {
  return model.replace(/^Samsung\s+/, '')
}

/**
 * モデル名から「シリーズ家族名」を導出する。
 * 折りたたみは "Galaxy Z Flip6" / "Galaxy Z Fold6"、
 * バー型は "Galaxy S24" / "Galaxy A55" のように世代番号までをまとめる。
 */
function getSeriesFamily(model: string): string {
  const name = shortName(model)
  const z = name.match(/Galaxy\s+Z\s+(Flip|Fold)\s*(\d+)/i)
  if (z) return `Galaxy Z ${z[1].replace(/^./, (c) => c.toUpperCase())}${z[2]}`
  const sa = name.match(/Galaxy\s+([SA])\s*(\d+)/i)
  if (sa) return `Galaxy ${sa[1].toUpperCase()}${sa[2]}`
  return name
}

type LifespanRow = {
  key: string
  seriesLabel: string
  releaseDate: string
  models: { label: string; href: string }[]
  policyMain: string
  policySub: string
  supportEnd: string
  ended: boolean
}

/**
 * GalaxyModel[] を発売年月でグルーピングしてサポート期間一覧行を生成。
 * 同時発売のモデル（Galaxy S24 / S24+ / S24 Ultra など）は1行にまとめる。
 */
function buildRows(models: GalaxyModel[]): LifespanRow[] {
  const groups = new Map<string, GalaxyModel[]>()
  for (const m of models) {
    if (!m.date) continue
    const year = getReleaseYear(m.date)
    const month = getReleaseMonth(m.date)
    if (year === 0) continue
    const key = `${year}_${month}`
    const arr = groups.get(key)
    if (arr) arr.push(m)
    else groups.set(key, [m])
  }

  const rows: LifespanRow[] = []
  for (const [key, groupModels] of groups) {
    const [yearStr, monthStr] = key.split('_')
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const family = getSeriesFamily(groupModels[0].model)
    const years = groupModels[0].update_years
    const policyMain = years === 7 ? '7年' : years === 5 ? '5年（OS更新は4回）' : years ? `${years}年` : '-'
    const policySub = years === 7 ? 'OS・セキュリティ' : years === 5 ? 'セキュリティ更新' : years ? 'OS更新は数回' : ''
    const ended = groupModels.every((m) => m.last_android != null)

    rows.push({
      key,
      seriesLabel: `${family}シリーズ`,
      releaseDate: `${year}年${month}月発売`,
      models: groupModels.map((m) => ({ label: shortName(m.model), href: `/galaxy/${m.slug}` })),
      policyMain,
      policySub,
      supportEnd: formatSupportUntil(groupModels[0].support_until),
      ended,
    })
  }

  // 発売年月降順
  rows.sort((a, b) => {
    const [ay, am] = a.key.split('_').map(Number)
    const [by, bm] = b.key.split('_').map(Number)
    if (ay !== by) return by - ay
    return bm - am
  })

  return rows
}

const GLOSSARY_GROUPS = [
  {
    title: 'Androidアップデート終了のデメリット',
    label: 'セキュリティ更新終了のデメリット',
    intro:
      'Galaxyはセキュリティ更新の保証期間（S24／S25・Z Flip6／Z Fold6以降は7年、S22／S23は5年、それ以前やAシリーズは機種により2〜5年）を過ぎるとサポート終了となり、最新のAndroid（One UI）やセキュリティパッチが配信されなくなります。\nサポート終了後も使い続けると、下記のデメリットが出てくるのが注意点です。',
    items: [
      {
        term: '新たな脆弱性に対応できない',
        description:
          'OSやセキュリティパッチが更新できないと、新しい脆弱性が発見されてもSamsungから修正が提供されなくなり、不正アクセスやマルウェアのリスクが高まります。',
      },
      {
        term: '新しいGalaxy AI・新機能が使えない',
        description:
          'GalaxyはGalaxy AIやかこって検索などの機能をOne UIのアップデートで追加していきますが、サポートが終了すると新機能を受け取れなくなります。',
      },
      {
        term: '一部アプリが非対応になる',
        description:
          'Google PlayのアプリはAndroidの新バージョンに合わせて更新されるため、古いAndroidのままでは動作しなくなったり不具合が起きるアプリが出てきます。',
      },
    ],
  },
  {
    title: 'Galaxyのバッテリー交換・修理サポートについて',
    label: '用語解説',
    intro:
      'Galaxyのバッテリー交換や画面割れの修理は、Samsung正規のサービスプロバイダや街の修理店で対応できます。\n特にZ Flip／Z Foldなどの折りたたみは、ヒンジや折り目部分の内側ディスプレイ・保護フィルムの状態が寿命を左右するため、中古購入時にはこれらの状態をよく確認しましょう。',
    items: [
      {
        term: 'バッテリー交換',
        description:
          'Galaxyのバッテリーは充放電を繰り返すと劣化します。正規サービスプロバイダなら比較的安価に交換可能ですが、発売から年数が経った機種は買い替えとのコスト比較がおすすめです。',
      },
      {
        term: '折りたたみのヒンジ・画面折り目・保護フィルム',
        description:
          'Z Flip／Z Foldは内側ディスプレイに折り目があり、開閉を繰り返すヒンジや貼付済みの保護フィルムが消耗部品です。中古では折り目のスジやフィルムの浮き・剥がれ、ヒンジのガタつきがないかを必ずチェックしましょう。',
      },
    ],
  },
]

type Props = { models: GalaxyModel[] }

export default function LifespanTable({ models }: Props) {
  const rows = buildRows(models)

  return (
    <section className="l-section" id="lifespan-table" aria-labelledby="heading-lifespan-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-lifespan-table">
          Galaxyのサポート期間一覧（寿命目安）
        </h2>
        <p className="m-section-desc">
          歴代Samsung Galaxyをシリーズ・発売世代別に、更新保証年数とサポート終了予定をまとめました。
        </p>
        <p className="m-section-desc">
          Galaxy S24／S25やZ Flip6／Z Fold6以降は7年サポートに延長されており、フラッグシップと折りたたみは長く使える点が大きな魅力です。一方でAシリーズや旧世代はサポート年数が短めなので、中古で選ぶ際は世代差に注意しましょう。
        </p>

        <StickyTableWrapper floatingHeader>
          <div className="m-card m-table-card">
            <div className="m-table-scroll">
              <table className="m-table m-table--sticky-col">
                <caption className="visually-hidden">Samsung Galaxy機種別サポート期間・寿命目安一覧</caption>
                <thead>
                  <tr>
                    <th>シリーズ</th>
                    <th>対象機種</th>
                    <th>更新保証</th>
                    <th>サポート終了予定</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key}>
                      <th className="u-shrink">
                        <div>
                          <strong>{row.seriesLabel}</strong>
                          <br />
                          <small>{row.releaseDate}</small>
                        </div>
                      </th>
                      <td>
                        {row.models.map((m, i) => (
                          <span key={m.href}>
                            {i > 0 && ' / '}
                            <Link prefetch={false} href={m.href}>{m.label}</Link>
                          </span>
                        ))}
                      </td>
                      <td>
                        <strong>{row.policyMain}</strong>
                        {row.policySub && (
                          <>
                            <br />
                            <small>{row.policySub}</small>
                          </>
                        )}
                      </td>
                      <td>
                        {row.ended ? (
                          <strong>終了済み</strong>
                        ) : (
                          <>
                            <strong>{row.supportEnd}</strong>
                            <br />
                            <small>頃まで</small>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </StickyTableWrapper>

        {GLOSSARY_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="m-sub-heading">{group.title}</h3>
            {/* 長文は '\n' 区切りで段落を分ける（FaqSection と同じ規約） */}
            {typeof group.intro === 'string'
              ? group.intro.split('\n').map((p, i) => (
                  <p key={i} className="m-body-text">{p}</p>
                ))
              : <p className="m-body-text">{group.intro}</p>}

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
