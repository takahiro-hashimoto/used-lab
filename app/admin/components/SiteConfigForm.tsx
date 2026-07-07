'use client'

import { useActionState, useEffect, useState } from 'react'
import { updateSiteConfig } from '../actions'
import type { SiteConfig } from '@/lib/types'

/** 保存済みISO(UTC) → datetime-local 入力用のローカル文字列（YYYY-MM-DDThh:mm）へ */
function isoToLocalInput(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** datetime-local のローカル文字列 → 送信用ISO(UTC)。空なら空文字。 */
function localInputToIso(local: string): string {
  if (!local) return ''
  const d = new Date(local)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString()
}

export default function SiteConfigForm({ initial }: { initial: SiteConfig | null }) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      return await updateSiteConfig(formData)
    },
    null
  )

  const [mode, setMode] = useState<'normal' | 'special'>(
    initial?.sticky_cta_mode === 'special' ? 'special' : 'normal'
  )

  // datetime-local はブラウザのタイムゾーンで扱うため、初期値は mount 後に設定
  // （SSRとのハイドレーション不一致を避ける）
  const [startLocal, setStartLocal] = useState('')
  const [endLocal, setEndLocal] = useState('')
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setStartLocal(isoToLocalInput(initial?.special_start_at))
    setEndLocal(isoToLocalInput(initial?.special_end_at))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [initial?.special_start_at, initial?.special_end_at])

  return (
    <form action={formAction} className="admin-form">
      {state?.error && (
        <div className="admin-form__message admin-form__message--error">{state.error}</div>
      )}
      {state?.success && (
        <div className="admin-form__message admin-form__message--success">保存しました</div>
      )}

      <div className="admin-form__group">
        <h2 className="admin-form__group-title">追従ボタンの表示モード</h2>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted, #666)' }}>
          「通常」はイオシスの購入CTA（スマホのみ）、「特殊」は下のバナー（PC・スマホ両方）を表示します。
        </p>
        <div className="admin-form__checkboxes">
          <label className="admin-field admin-field--checkbox">
            <input
              type="radio"
              name="sticky_cta_mode"
              value="normal"
              checked={mode === 'normal'}
              onChange={() => setMode('normal')}
            />
            <span className="admin-field__label">通常追従ボタン（イオシスCTA）</span>
          </label>
          <label className="admin-field admin-field--checkbox">
            <input
              type="radio"
              name="sticky_cta_mode"
              value="special"
              checked={mode === 'special'}
              onChange={() => setMode('special')}
            />
            <span className="admin-field__label">特殊追従ボタン（キャンペーン用バナー）</span>
          </label>
        </div>
      </div>

      <div className="admin-form__group" hidden={mode !== 'special'}>
        <h2 className="admin-form__group-title">特殊バナーの内容</h2>
        <div className="admin-form__grid">
          <label className="admin-field">
            <span className="admin-field__label">見出し（上段の小さい文字）</span>
            <input
              type="text"
              name="special_cta_headline"
              defaultValue={initial?.special_cta_headline ?? ''}
              placeholder="Amazonプライムデー開催中！"
              className="admin-field__input"
            />
          </label>
          <label className="admin-field">
            <span className="admin-field__label">ボタン文言</span>
            <input
              type="text"
              name="special_cta_label"
              defaultValue={initial?.special_cta_label ?? ''}
              placeholder="セール対象のApple製品を見る"
              className="admin-field__input"
            />
          </label>
          <label className="admin-field">
            <span className="admin-field__label">リンクURL</span>
            <input
              type="text"
              name="special_cta_url"
              defaultValue={initial?.special_cta_url ?? ''}
              placeholder="https://amzn.to/xxxxx"
              className="admin-field__input"
            />
          </label>
        </div>

        <h2 className="admin-form__group-title" style={{ marginTop: '1rem' }}>表示期間（任意）</h2>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted, #666)' }}>
          期間を過ぎると自動的に通常追従ボタンへ戻ります。空欄なら制限なし（開始/終了とも無指定なら常時表示）。
        </p>
        <div className="admin-form__grid">
          <label className="admin-field">
            <span className="admin-field__label">開始日時</span>
            <input
              type="datetime-local"
              value={startLocal}
              onChange={(e) => setStartLocal(e.target.value)}
              className="admin-field__input"
            />
          </label>
          <label className="admin-field">
            <span className="admin-field__label">終了日時</span>
            <input
              type="datetime-local"
              value={endLocal}
              onChange={(e) => setEndLocal(e.target.value)}
              className="admin-field__input"
            />
          </label>
        </div>
        {/* サーバへはUTCのISOで送信（ブラウザのTZで変換） */}
        <input type="hidden" name="special_start_at" value={localInputToIso(startLocal)} />
        <input type="hidden" name="special_end_at" value={localInputToIso(endLocal)} />
      </div>

      <div className="admin-form__actions">
        <button type="submit" disabled={isPending} className="admin-btn admin-btn--primary">
          {isPending ? '保存中...' : '保存する'}
        </button>
      </div>
    </form>
  )
}
