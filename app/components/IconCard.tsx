import type { ReactNode } from 'react'

interface IconCardProps {
  icon: string
  title: string
  children: ReactNode
}

export default function IconCard({ icon, title, children }: IconCardProps) {
  return (
    <div className="m-card m-card--shadow m-card--padded post-check-item">
      <h3 className="post-check-item__heading">
        <i className={icon} aria-hidden="true"></i>
        {title}
      </h3>
      <div className="caution-check-card__text m-rich-text">
        {children}
      </div>
    </div>
  )
}
