import Link from 'next/link'

type Props = {
  categoryKey: string
  modelId: number
}

/**
 * ローカル環境でのみ表示される管理画面編集リンク（固定フロートボタン）
 */
export default function AdminEditLink({ categoryKey, modelId }: Props) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <Link
      href={`/admin/${categoryKey}/${modelId}`}
      className="admin-edit-float"
      title="管理画面で編集"
    >
      <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
    </Link>
  )
}
