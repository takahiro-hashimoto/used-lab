import Link from 'next/link'
import type { AirPodsModel } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/airpods-helpers'

type Props = {
  model: AirPodsModel
}

export default function LeadText({ model }: Props) {
  const releaseDateFormatted = formatReleaseDate(model.date)

  return (
    <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
      <div className="l-container">
        <div className="lead-box">
          <p>{releaseDateFormatted}に発売された{model.name}（{model.model}）。</p>
          <p>今から買うべきか判断できるよう、サポート期間、基本スペック、他モデルとの比較などの情報をまとめました。</p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            もっと全体像から知りたい方は「<Link href="/airpods">中古AirPods購入ガイド</Link>」をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}
