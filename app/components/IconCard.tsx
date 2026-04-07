import type { ReactNode, ElementType } from 'react'

interface IconCardProps {
  icon: string
  title: string
  children: ReactNode
  as?: ElementType
}

export default function IconCard({ icon, title, children, as: Tag = 'h3' }: IconCardProps) {
  return (
    <div className="m-card m-card--shadow m-card--padded post-check-item">
      <Tag className="post-check-item__heading">
        <i className={icon} aria-hidden="true"></i>
        {title}
      </Tag>
      <div className="media-card__desc m-rich-text">
        {children}
      </div>
    </div>
  )
}
