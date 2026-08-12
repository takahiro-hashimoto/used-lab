import Link from 'next/link'
import type { IPadModel } from '@/lib/types'
import { QUICK_PICKS, GENERATION_GUIDE } from '@/lib/data/ipad-recommend'

// ============================================================
// 「結局どのiPadを買えばいい？」への即答ブロック
//
// Search Console 上、このページの流入は次の3クラスタが軸になっている。
//   「おすすめ」系            約12,000表示 / 7.9〜8.8位
//   「型落ち」系               約2,050表示 / 3.1〜12.5位
//   シリーズ別(Air/Pro/mini)   約1,470表示 / 6.4〜10.4位
//   「世代・何世代」系          約1,050表示 / 5.2〜7.7位
//
// iPad は無印・Air・Pro・mini の4ライン×世代があり、機種を並べるだけでは
// 決め手にならない。用途ごとに1台名指しし、さらに無印ラインの
// 「何世代から狙うべきか」を別ブロックで示す。
// ============================================================

type Props = {
  /** RECOMMEND_SLUGS で取得済みの機種。名前とリンク先の解決に使う */
  models: IPadModel[]
}

export default function QuickPickSection({ models }: Props) {
  const bySlug = new Map(models.map((m) => [m.slug, m]))
  const picks = QUICK_PICKS.map((p) => ({ ...p, model: bySlug.get(p.slug) })).filter(
    (p): p is typeof p & { model: IPadModel } => p.model != null,
  )
  if (picks.length === 0) return null

  return (
    <section className="l-section" id="quick-pick" aria-labelledby="heading-quick-pick">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-quick-pick">
          中古iPadは結局どれを買うべき？用途別の答えと狙い目の型落ちモデル
        </h2>
        <p className="m-section-desc">
          iPadは無印・Air・Pro・miniの4ラインがあり、さらに世代が分かれるため迷いやすい製品です。
        </p>
        <p className="m-section-desc">
          まず結論から。よくある5つの用途について、おすすめの1台を名指しで挙げます。
        </p>

        <div className="u-mt-xl">
          {picks.map((p) => (
            <div key={p.slug} className="m-card m-card--shadow m-card--padded u-mt-lg">
              <h3 className="post-check-item__heading">
                {p.situation}なら{' '}
                <Link prefetch={false} href={`/ipad/${p.slug}/`}>
                  {p.model.model}
                </Link>
              </h3>
              <p className="post-check-item__desc">{p.reason}</p>
            </div>
          ))}
        </div>

        <h3 className="m-section-heading m-section-heading--md u-mt-2xl">
          中古で買うなら何世代から？無印iPadの世代の境目
        </h3>
        <p className="m-section-desc">
          無印のiPadは「第◯世代」で呼ばれるため、どこから狙うべきか分かりにくい製品です。
          中古で選ぶときにいちばん効く境目は<strong>充電端子</strong>です。
        </p>

        <div className="m-card m-card--shadow m-card--padded u-mt-lg">
          <div className="media-card__desc m-rich-text">
            <ul>
              {GENERATION_GUIDE.rows.map((r) => (
                <li key={r.gen}>
                  <strong>{r.gen}</strong>（{r.year}）… {r.chip} / {r.port}
                </li>
              ))}
            </ul>
            <p>
              <strong>第{GENERATION_GUIDE.usbcFrom}世代からUSB-C</strong>になり、第9世代だけがLightningです。
              iPhoneやMacと充電ケーブルを共通化したいなら、第{GENERATION_GUIDE.usbcFrom}世代以降を選んでください。
              ここを外すと、iPad用に別のケーブルを持ち歩くことになります。
            </p>
            <p>
              価格だけを見て第9世代を選ぶ手もありますが、端子が違う不便さは毎日続きます。
              数千円の差なら第10世代以降を勧めます。
            </p>
          </div>
        </div>

        <p className="m-section-desc u-mt-xl">
          各機種を詳しく比べたい方は、このあとの比較表と解説をご覧ください。
        </p>
      </div>
    </section>
  )
}
