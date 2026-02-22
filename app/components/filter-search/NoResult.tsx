'use client'

import type { ReactNode } from 'react'

type Props = {
  onReset: () => void
  /** 製品固有のアドバイス（Watch版など条件に応じた追加ヒント） */
  extraAdvice?: ReactNode
}

export default function NoResult({ onReset, extraAdvice }: Props) {
  return (
    <div className="m-card m-card--shadow m-card--padded ifd-no-result">
      <div className="ifd-no-result__icon">
        <i className="fa-solid fa-face-sad-tear" aria-hidden="true"></i>
      </div>
      <h3 className="ifd-no-result__title">該当する機種が見つかりませんでした</h3>
      <p className="ifd-no-result__text">
        条件を変更して再度お試しください。以下のアドバイスも参考にしてみてください。
      </p>
      <ul className="ifd-no-result__advice">
        {extraAdvice}
        <li>用途の選択数を減らしてみる</li>
        <li>予算の上限を引き上げてみる</li>
        <li>こだわり条件を外してみる</li>
      </ul>
      <button type="button" className="m-btn m-btn--primary" onClick={onReset}>
        <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> すべての条件をリセット
      </button>
    </div>
  )
}
