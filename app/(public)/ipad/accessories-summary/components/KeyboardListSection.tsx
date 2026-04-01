'use client'

type SerializedAccessory = {
  id: number
  name: string
  image: string | null
  model_number: string | null
  release_date: string | null
  iosys_url: string | null
  amazon_url: string | null
}

type KeyboardModel = {
  id: number
  model: string
  slug: string
  date: string | null
  cpu: string | null
  keyboards: SerializedAccessory[]
}

type Props = {
  models: KeyboardModel[]
  keyboardAccessories: SerializedAccessory[]
}

function formatAccessoryDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return `${d.getFullYear()}/${d.getMonth() + 1}`
}

export default function KeyboardListSection({ models, keyboardAccessories }: Props) {
  // キーボードごとに対応iPadを逆引き
  const keyboardToModels = new Map<number, KeyboardModel[]>()
  for (const kb of keyboardAccessories) {
    const compatibleModels = models.filter((m) => m.keyboards.some((k) => k.id === kb.id))
    keyboardToModels.set(kb.id, compatibleModels)
  }

  return (
    <section className="l-section" id="keyboard-list" aria-labelledby="heading-keyboard-list">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-keyboard-list">
          キーボード別 対応iPad一覧
        </h2>
        <p className="m-section-desc">
          各キーボードの型番情報と対応iPadモデル、購入先リンクをまとめています。
        </p>

        <div className="keyboard-list">
          {keyboardAccessories.map((kb) => {
            const compatModels = keyboardToModels.get(kb.id) || []
            return (
              <div key={kb.id} id={`kb-${kb.id}`} className="m-card m-card--shadow keyboard-list__item">
                {/* タイトル（上部中央） */}
                <h3 className="keyboard-list__name">
                  {kb.name.split('（')[0].trim()}
                  {kb.model_number && <span className="keyboard-list__name-sub">（{kb.model_number}）</span>}
                </h3>

                {/* 画像 + メタ情報 */}
                <div className="keyboard-list__header">
                  {kb.image && (
                    <figure className="keyboard-list__figure">
                      <img
                        src={`/images/ipad/${kb.image}`}
                        alt={kb.name}
                        width={100}
                        height={100}
                        loading="lazy"
                        className="keyboard-list__img"
                      />
                    </figure>
                  )}
                  <div className="keyboard-list__info">
                    <p className="keyboard-list__meta-text">
                      {formatAccessoryDate(kb.release_date)}発売
                      {kb.name.includes('（') && (() => {
                        const detail = kb.name.split('（').slice(1).join('（').replace(/）$/, '')
                        return detail ? ` / ${detail.replace(/・/g, ' / ')}` : ''
                      })()}
                    </p>
                    <div className="keyboard-list__links">
                      {kb.iosys_url && (
                        <a href={kb.iosys_url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank">
                          イオシスで探す
                        </a>
                      )}
                      {kb.amazon_url && (
                        <a href={kb.amazon_url} className="m-btn m-btn--amazon m-btn--sm" rel="nofollow noopener noreferrer" target="_blank">
                          amazonで探す
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* 対応iPad */}
                {compatModels.length > 0 && (
                  <div className="keyboard-list__compat">
                    <p className="keyboard-list__compat-title">対応iPad</p>
                    <ul className="keyboard-list__compat-list">
                      {compatModels.map((m) => (
                        <li key={m.id}>
                          <a href={`/ipad/${m.slug}`}>{m.model}</a>
                          <span className="keyboard-list__compat-meta">
                            {m.cpu && `（${m.cpu}）`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
