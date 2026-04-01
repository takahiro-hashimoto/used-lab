import { ReactNode } from 'react'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  title: string
  children: ReactNode
  width?: number
  height?: number
  aside?: boolean
  footer?: ReactNode
  imgStyle?: React.CSSProperties
}

export default function MediaCard({ src, alt, title, children, width = 240, height = 160, aside, footer, imgStyle }: Props) {
  const variant = aside
    ? footer ? ' media-card--aside-footer' : ' media-card--aside'
    : ''

  return (
    <div className={`m-card m-card--shadow m-card--padded${variant}`}>
      <div className="media-card__img-wrap">
        <Image
          src={src}
          alt={alt}
          className="media-card__img"
          style={imgStyle}
          width={width}
          height={height}
          loading="lazy"
        />
      </div>
      <div className="media-card__body">
        <h3 className="media-card__title">{title}</h3>
        {children}
      </div>
      {footer && <div className="media-card__footer">{footer}</div>}
    </div>
  )
}
