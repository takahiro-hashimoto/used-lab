import type { ReactNode } from 'react'
import IconCard from '@/app/components/IconCard'

type ChecklistItem = {
  iconClass: string
  title: string
  desc: ReactNode
}

type MemoLink = {
  href: string
  label: string
}

type Props = {
  productName: string
  items: ChecklistItem[]
  memoLinks: MemoLink[]
}

export default function ChecklistSection({ productName, items, memoLinks }: Props) {
  return (
    <section className="l-section" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古{productName}購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古{productName}購入後に<strong>トラブルになりやすいポイント</strong>を{items.length}つに絞りました。
        </p>
        <p className="m-section-desc">
          どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {items.map((item) => (
            <IconCard key={item.title} icon={item.iconClass} title={item.title}>
              {item.desc}
            </IconCard>
          ))}
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期や注意点は
            {memoLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 ? '、' : ''}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
            で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
