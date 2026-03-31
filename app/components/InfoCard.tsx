import { ReactNode } from 'react'

type Props = {
  heading?: string
  icon?: string
  children: ReactNode
}

export default function InfoCard({ heading, icon = 'fa-solid fa-chevron-circle-right', children }: Props) {
  return (
    <div className="m-card info-card">
      {heading && (
        <p className="info-card__heading">
          <i className={icon} aria-hidden="true"></i>
          {heading}
        </p>
      )}
      <ul className="info-card__list">
        {children}
      </ul>
    </div>
  )
}
