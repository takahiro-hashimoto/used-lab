import Link from 'next/link'
import type { IPhoneModel } from '@/lib/types'
import { QUICK_PICKS } from '@/lib/data/iphone-recommend'

// ============================================================
// 「結局どれを買えばいい？」への即答ブロック
//
// Search Console 上、「iphone 中古 買うならどれ」系は約3,540表示・平均6.4位あるが
// CTR は 2.2%（同順位の「コスパ」系は7.0%）。疑問形クエリで上部を
// AI Overview / 他の人はこちらも質問 に取られている可能性が高く、
// CTR より順位で取りにいく必要がある。
//
// おすすめ5機種を並べるだけでは「どれ」の答えになっていないので、
// 状況ごとに1機種だけ名指しする。データは iphone-recommend.ts の QUICK_PICKS。
// ============================================================

type Props = {
  /** RECOMMEND_SLUGS で取得済みの機種。名前とリンク先の解決に使う */
  models: IPhoneModel[]
}

export default function QuickPickSection({ models }: Props) {
  const bySlug = new Map(models.map((m) => [m.slug, m]))
  const picks = QUICK_PICKS.map((p) => ({ ...p, model: bySlug.get(p.slug) })).filter(
    (p): p is typeof p & { model: IPhoneModel } => p.model != null,
  )
  if (picks.length === 0) return null

  return (
    <section className="l-section" id="quick-pick" aria-labelledby="heading-quick-pick">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-quick-pick">
          中古iPhoneは結局どれを買うべき？状況別の答え
        </h2>
        <p className="m-section-desc">
          機種を並べて比べる前に、まず結論から。よくある5つの状況について、おすすめの1台を名指しで挙げます。
        </p>
        <p className="m-section-desc">
          当てはまるものが複数あるときは、上にあるものを優先してください。
        </p>

        <div className="u-mt-xl">
          {picks.map((p) => (
            <div key={p.slug} className="m-card m-card--shadow m-card--padded u-mt-lg">
              <h3 className="post-check-item__heading">
                {p.situation}なら{' '}
                <Link prefetch={false} href={`/iphone/${p.slug}/`}>
                  {p.model.model}
                </Link>
              </h3>
              <p className="post-check-item__desc">{p.reason}</p>
            </div>
          ))}
        </div>

        <p className="m-section-desc u-mt-xl">
          それぞれの機種を詳しく比べたい方は、このあとの比較表と解説をご覧ください。
        </p>
      </div>
    </section>
  )
}
