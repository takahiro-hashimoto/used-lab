import Link from 'next/link'
import type { PixelModel } from '@/lib/types'
import { getReleaseYear, getReleaseMonth } from '@/lib/utils/shared-helpers'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'

/* ------------------------------------------------------------------
   "2030-10" → "2030年10月"
   ------------------------------------------------------------------ */
function formatSupportUntil(str: string | null): string {
  if (!str) return '-'
  const m = str.match(/^(\d{4})-(\d{1,2})/)
  if (!m) return str
  return `${m[1]}年${parseInt(m[2], 10)}月`
}

/** "Google Pixel 8 Pro" → "Pixel 8 Pro"（表示用に "Google " を除去） */
function shortName(model: string): string {
  return model.replace(/^Google\s+/, '')
}

/** モデル名から世代番号を抽出（"Google Pixel 8 Pro" → 8） */
function getGeneration(model: string): number {
  const m = model.match(/Pixel\s*(\d+)/i)
  return m ? parseInt(m[1], 10) : 0
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
 * PixelModel[] を発売年月でグルーピングしてサポート期間一覧行を生成。
 * 同時発売のモデル（Pixel 8 / 8 Pro など）は1行にまとめる。
 */
function buildRows(models: PixelModel[]): LifespanRow[] {
  const groups = new Map<string, PixelModel[]>()
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
    const gen = getGeneration(groupModels[0].model)
    const years = groupModels[0].update_years
    const policyMain = years === 7 ? '7年' : years === 5 ? '5年（OS更新は3年）' : years ? `${years}年` : '-'
    const policySub = years === 7 ? 'OS・セキュリティ' : years === 5 ? 'セキュリティ更新' : ''
    const ended = groupModels.every((m) => m.last_android != null)

    rows.push({
      key,
      seriesLabel: `Pixel ${gen}シリーズ`,
      releaseDate: `${year}年${month}月発売`,
      models: groupModels.map((m) => ({ label: shortName(m.model), href: `/pixel/${m.slug}` })),
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
      'Pixelはセキュリティ更新の保証期間（6/7世代は5年、8以降は7年）を過ぎるとサポート終了となり、最新のAndroidやセキュリティパッチが配信されなくなります。\nサポート終了後も使い続けると、下記のデメリットが出てくるのが注意点です。',
    items: [
      {
        term: '新たな脆弱性に対応できない',
        description:
          'OSやセキュリティパッチが更新できないと、新しい脆弱性が発見されてもGoogleから修正が提供されなくなり、不正アクセスやマルウェアのリスクが高まります。',
      },
      {
        term: '新しいAI機能・新機能が使えない',
        description:
          'Pixelは消しゴムマジックやベストテイクなどの機能をFeature Dropで追加していきますが、サポートが終了すると新機能を受け取れなくなります。',
      },
      {
        term: '一部アプリが非対応になる',
        description:
          'Google PlayのアプリはAndroidの新バージョンに合わせて更新されるため、古いAndroidのままでは動作しなくなったり不具合が起きるアプリが出てきます。',
      },
    ],
  },
  {
    title: 'Pixelのバッテリー交換・修理サポートについて',
    label: '用語解説',
    intro:
      'Pixelのバッテリー交換や画面割れの修理は、Google正規のサービスプロバイダ（iCracked等）や街の修理店で対応できます。\nただしモデルが古くなると純正パーツの在庫が減り、修理費用が中古相場に近づくこともあるため、修理か買い替えかの見極めが大切です。',
    items: [
      {
        term: 'バッテリー交換',
        description:
          'Pixelのバッテリーは充放電を繰り返すと劣化します。正規サービスプロバイダなら数千円〜1万円台で交換可能ですが、発売から年数が経った機種は買い替えとのコスト比較がおすすめです。',
      },
      {
        term: '純正パーツの供給',
        description:
          'ディスプレイやカメラなどの純正パーツは供給期間が限られます。サポート終了後の古い機種はパーツ在庫が減り、修理を受けられない場合があります。',
      },
    ],
  },
]

type Props = { models: PixelModel[] }

export default function LifespanTable({ models }: Props) {
  const rows = buildRows(models)

  return (
    <section className="l-section" id="lifespan-table" aria-labelledby="heading-lifespan-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-lifespan-table">
          Pixelのサポート期間一覧（寿命目安）
        </h2>
        <p className="m-section-desc">
          歴代Google Pixelの世代別に、更新保証年数とサポート終了予定をまとめました。Pixel 8以降は7年サポートに延長されており、長く使える点が大きな魅力です。
        </p>

        <StickyTableWrapper floatingHeader>
          <div className="m-card m-table-card">
            <div className="m-table-scroll">
              <table className="m-table m-table--sticky-col">
                <caption className="visually-hidden">Google Pixel機種別サポート期間・寿命目安一覧</caption>
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
