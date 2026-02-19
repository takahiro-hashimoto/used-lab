import type { IPhoneModel } from '@/lib/types'

type Props = {
  model: IPhoneModel
}

export default function IntroCallout({ model }: Props) {
  if (!model.point) return null

  return (
    <div className="m-callout m-callout--info">
      <div className="m-callout__icon">i</div>
      <div className="m-callout__body">
        <p className="m-callout__title">{model.model}のポイント</p>
        <p className="m-callout__text">{model.point}</p>
      </div>
    </div>
  )
}
