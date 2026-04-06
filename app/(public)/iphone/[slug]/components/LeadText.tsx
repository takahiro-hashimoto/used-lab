import type { IPhoneModel } from '@/lib/types'
import Link from 'next/link'

type Props = {
  model: IPhoneModel
}

export default function LeadText({ model }: Props) {
  return (
    <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
      <div className="l-container">
        <div className="lead-box">
          <p>
            中古の{model.model}って、今から買っても大丈夫？この記事では、そんな疑問を解消するために中古価格の推移や他モデルとのスペックの違いなど<strong>購入判断に必要な情報</strong>をまとめました。
          </p>
          <p>
            さらに{model.model}をお得に、そして安心して購入できるECショップも掲載しているので、ぜひチェックしてみてください！
          </p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
              情報を網羅的に得たい方は「<Link href="/iphone/">中古iPhone購入完全ガイド</Link>」も参考にしてみてください！
          </p>
        </div>
      </div>
    </section>
  )
}
