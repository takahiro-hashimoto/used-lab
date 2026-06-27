/**
 * ◎◯△× の表現をFontAwesomeアイコンで統一サイズ表示する共通コンポーネント
 * セマンティックなマークアップ: aria-label で意味を伝える
 *
 * ◎ → fa-regular fa-circle-dot（二重丸）
 * ◯ → fa-regular fa-circle（丸）
 * △ → 文字「△」をそのまま表示
 * × → fa-solid fa-xmark（バツ）
 */

type Mark = '◎' | '◯' | '○' | '△' | '×' | '✕'

type Props = {
  mark: Mark | string
  size?: 'sm' | 'md' | 'lg'
}

const MARK_CONFIG: Record<string, { icon?: string; char?: string; label: string; className: string }> = {
  '◎': { icon: 'fa-regular fa-circle-dot', label: '最適', className: 'm-mark--excellent' },
  '◯': { icon: 'fa-regular fa-circle', label: '良好', className: 'm-mark--good' },
  '○': { icon: 'fa-regular fa-circle', label: '良好', className: 'm-mark--good' },
  '△': { char: '△', label: '条件による', className: 'm-mark--fair' },
  '×': { icon: 'fa-solid fa-xmark', label: 'なし', className: 'm-mark--none' },
  '✕': { icon: 'fa-solid fa-xmark', label: 'なし', className: 'm-mark--none' },
}

export default function RatingMark({ mark, size = 'md' }: Props) {
  const config = MARK_CONFIG[mark]
  if (!config) return <span>{mark}</span>

  return (
    <span
      className={`m-mark m-mark--${size} ${config.className}`}
      role="img"
      aria-label={config.label}
      title={config.label}
    >
      {config.char ? config.char : <i className={config.icon} aria-hidden="true"></i>}
    </span>
  )
}
