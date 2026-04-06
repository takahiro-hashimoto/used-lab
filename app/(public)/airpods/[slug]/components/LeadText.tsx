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
          <p>
            「中古の{model.name}って、今から買っても大丈夫？」この記事では、そんな疑問を解消するために中古価格の推移や他モデルとの違いなど<strong>購入判断に必要な情報</strong>をまとめました。
          </p>
          {releaseDateFormatted && (
            <p>{releaseDateFormatted}発売の{model.name}（{model.model}）が今どれくらいの価格で手に入るのか、チェックしてみてください。</p>
          )}
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            機種選びから始めたい方は「<Link href="/airpods">中古AirPods購入ガイド</Link>」もどうぞ。
          </p>
        </div>
      </div>
    </section>
  )
}
