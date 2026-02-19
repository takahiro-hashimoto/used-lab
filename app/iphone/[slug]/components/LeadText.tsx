import Link from 'next/link'
import type { IPhoneModel } from '@/lib/types'

type Props = {
  model: IPhoneModel
}

function formatDate(date: string | null): string {
  if (!date) return ''
  const parts = date.split('/')
  if (parts.length >= 2) {
    return `${parts[0]}年${parts[1]}月`
  }
  return date
}

export default function LeadText({ model }: Props) {
  const releaseDateFormatted = formatDate(model.date)

  return (
    <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
      <div className="l-container">
        <div className="lead-box">
          <p>{releaseDateFormatted}に発売された{model.model}。</p>
          <p>今から買うべきか判断できるよう、iOSのサポート期間、基本スペック、ベンチマークスコアなどの情報をまとめました。</p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            もっと全体像から知りたい方は「<Link href="/iphone">中古iPhone購入ガイド</Link>」をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}
