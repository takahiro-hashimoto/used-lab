import type { IPhoneModel } from '@/lib/types'

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
        </div>
      </div>
    </section>
  )
}
