'use client'

import { useState, useCallback } from 'react'

export type DiagnosisProvider = {
  slug: string
  name: string
  carriers: string | null
  iphones: string | null
  battery: number | null
  warranty: number | null
  store: boolean
  discount: boolean
  url: string
  minPrice: number | null
  priceRange: string
}

type Answers = Record<string, string>

const QUESTIONS = [
  {
    key: 'iphone',
    question: '欲しいiPhoneはどれですか？',
    options: [
      { value: '15', label: 'iPhone 15シリーズ' },
      { value: '14', label: 'iPhone 14シリーズ' },
      { value: '13', label: 'iPhone 13シリーズ' },
      { value: '12', label: 'iPhone 12シリーズ' },
      { value: 'se', label: 'iPhone SE' },
      { value: 'any', label: 'まだ決まってない' },
    ],
  },
  {
    key: 'carrier',
    question: '使いたい回線はありますか？',
    options: [
      { value: 'docomo', label: 'ドコモ' },
      { value: 'au', label: 'au' },
      { value: 'softbank', label: 'ソフトバンク' },
      { value: 'rakuten', label: '楽天' },
      { value: 'any', label: 'こだわらない' },
    ],
  },
  {
    key: 'mnp',
    question: '今の携帯から乗り換え（MNP）ですか？',
    options: [
      { value: 'mnp', label: 'MNPで乗り換え' },
      { value: 'new', label: '新規契約' },
      { value: 'any', label: 'まだ決めてない' },
    ],
  },
  {
    key: 'data',
    question: '月にどれくらいデータ通信を使いますか？',
    options: [
      { value: '3', label: '〜3GB（ライトユーザー）' },
      { value: '10', label: '〜10GB（普通）' },
      { value: '20', label: '〜20GB（やや多め）' },
      { value: 'unlimited', label: '無制限がいい' },
    ],
  },
  {
    key: 'store',
    question: '店舗でサポートを受けたいですか？',
    options: [
      { value: 'must', label: '店舗サポート必須' },
      { value: 'prefer', label: 'あれば嬉しい' },
      { value: 'online', label: 'オンラインでOK' },
    ],
  },
  {
    key: 'battery',
    question: 'バッテリー残量80%以上の保証は必要ですか？',
    options: [
      { value: 'must', label: '必要' },
      { value: 'prefer', label: 'あれば嬉しい' },
      { value: 'no', label: 'なくてもいい' },
    ],
  },
  {
    key: 'warranty',
    question: '保証期間はどれくらい欲しいですか？',
    options: [
      { value: '30', label: '30日あればOK' },
      { value: '60', label: '60日以上欲しい' },
      { value: 'long', label: '長いほど安心' },
    ],
  },
]

const TOTAL_STEPS = QUESTIONS.length

const ANSWER_LABELS: Record<string, Record<string, string>> = {
  iphone: { '15': 'iPhone 15', '14': 'iPhone 14', '13': 'iPhone 13', '12': 'iPhone 12', se: 'iPhone SE', any: '未定' },
  carrier: { docomo: 'ドコモ', au: 'au', softbank: 'ソフトバンク', rakuten: '楽天', any: '指定なし' },
  mnp: { mnp: 'MNP', new: '新規', any: '未定' },
  data: { '3': '3GB', '10': '10GB', '20': '20GB', unlimited: '無制限' },
  store: { must: '必須', prefer: '希望', online: '不要' },
  battery: { must: '必須', prefer: '希望', no: '不要' },
  warranty: { '30': '30日', '60': '60日+', long: '長期' },
}

function formatCarriers(carriers: string | null): string {
  if (!carriers) return ''
  const map: Record<string, string> = { docomo: 'ドコモ', au: 'au', softbank: 'ソフトバンク', rakuten: '楽天' }
  return carriers.split(',').map(c => map[c.trim()] ?? c.trim()).join('/')
}

function calculateScores(answers: Answers, providers: DiagnosisProvider[]) {
  return providers
    .map(p => {
      let score = 0

      // Q1: iPhone機種
      if (answers.iphone && answers.iphone !== 'any') {
        const iphones = (p.iphones ?? '').toLowerCase()
        const map: Record<string, string> = {
          '15': 'iphone 15', '14': 'iphone 14', '13': 'iphone 13',
          '12': 'iphone 12', se: 'iphone se',
        }
        if (iphones.includes(map[answers.iphone] ?? '')) score += 5
        else score -= 3
      }

      // Q2: 回線
      if (answers.carrier && answers.carrier !== 'any') {
        const carriers = (p.carriers ?? '').toLowerCase()
        if (carriers.includes(answers.carrier)) score += 4
        else score -= 5
      }

      // Q3: MNP
      if (answers.mnp === 'mnp' && p.discount) score += 3

      // Q4: データ通信量
      if (answers.data === 'unlimited') {
        if (p.carriers && p.carriers.includes('rakuten')) score += 4
      }

      // Q5: 店舗サポート
      if (answers.store === 'must') {
        score += p.store ? 4 : -4
      } else if (answers.store === 'prefer' && p.store) {
        score += 2
      }

      // Q6: バッテリー保証
      if (answers.battery === 'must') {
        score += (p.battery && p.battery >= 80) ? 4 : -3
      } else if (answers.battery === 'prefer' && p.battery && p.battery >= 80) {
        score += 2
      }

      // Q7: 保証期間
      if (answers.warranty === 'long') {
        if (p.warranty && p.warranty >= 90) score += 4
        else if (p.warranty && p.warranty >= 30) score += 1
      } else if (answers.warranty === '60') {
        if (p.warranty && p.warranty >= 60) score += 3
        else if (p.warranty && p.warranty >= 30) score += 1
      }

      return { ...p, score }
    })
    .sort((a, b) => b.score - a.score)
}

function getFeedback(answers: Answers, top: DiagnosisProvider & { score: number }): string {
  if (answers.carrier && answers.carrier !== 'any' && answers.store === 'must') {
    return `${ANSWER_LABELS.carrier[answers.carrier]}回線 × 店舗サポートの条件から、${top.name}が最適です。`
  }
  if (answers.carrier && answers.carrier !== 'any') {
    return `${ANSWER_LABELS.carrier[answers.carrier]}回線に対応した事業者の中から、${top.name}をおすすめします。`
  }
  if (answers.store === 'must') {
    return `店舗サポートを重視するなら、全国展開の${top.name}が安心です。`
  }
  if (answers.battery === 'must' && top.battery) {
    return `バッテリー保証を重視するなら、${top.battery}%以上保証の${top.name}がおすすめ。`
  }
  if (answers.data === 'unlimited') {
    return `データ無制限なら楽天モバイルが月額3,278円で最強。${top.name}も好条件です。`
  }
  return `総合的なバランスから${top.name}をおすすめします。`
}

function getSummaryLabel(key: string, value: string): string {
  const label = ANSWER_LABELS[key]?.[value] ?? value
  if (key === 'carrier') return `${label}回線`
  if (key === 'store') return `店舗${label}`
  if (key === 'battery') return `バッテリー保証${label}`
  if (key === 'warranty') return `保証${label}`
  return label
}

const RANK_STYLES = [
  { icon: 'fa-solid fa-crown', color: '#f59e0b' },
  { icon: 'fa-solid fa-medal', color: '#94a3b8' },
  { icon: 'fa-solid fa-medal', color: '#b45309' },
]

type Props = { providers: DiagnosisProvider[] }

export default function MvnoDiagnosis({ providers }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const showResult = step === TOTAL_STEPS
  const currentQuestion = QUESTIONS[step]

  const handleAnswer = useCallback(
    (key: string, value: string) => {
      setAnswers(prev => ({ ...prev, [key]: value }))
      setTimeout(() => {
        setStep(prev => prev + 1)
      }, 250)
    },
    [],
  )

  const handleReset = useCallback(() => {
    setAnswers({})
    setStep(0)
    document.getElementById('check')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const sorted = showResult ? calculateScores(answers, providers) : []
  const top3 = sorted.slice(0, 3)

  return (
    <div id="mvno-diagnosis">
      {/* ===== 質問ステップ ===== */}
      {!showResult && currentQuestion && (
        <div className="diagnosis-step">
          <div className="diagnosis-progress">
            <div
              className="diagnosis-progress__bar"
              style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <p className="diagnosis-step__number">Q{step + 1} / {TOTAL_STEPS}</p>
          <h3 className="diagnosis-step__question">{currentQuestion.question}</h3>
          <div className="diagnosis-options">
            {currentQuestion.options.map(opt => (
              <button
                key={opt.value}
                type="button"
                className="diagnosis-option m-selectable-card m-selectable-card--block"
                onClick={() => handleAnswer(currentQuestion.key, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== 結果 ===== */}
      {showResult && top3.length > 0 && (
        <div className="diagnosis-result">
          <div className="diagnosis-result__header">
            <i className="fa-solid fa-trophy" style={{ color: '#f59e0b', fontSize: '2rem' }} aria-hidden="true" />
            <h3 className="diagnosis-result__title">診断結果</h3>
            <p className="diagnosis-result__subtitle">あなたにおすすめの格安SIMはこちら！</p>
          </div>

          {/* 選択サマリー */}
          <div className="diagnosis-summary">
            <div className="diagnosis-summary__items">
              {QUESTIONS.map(q => {
                const v = answers[q.key]
                return v ? (
                  <span key={q.key} className="diagnosis-summary__item">
                    {getSummaryLabel(q.key, v)}
                  </span>
                ) : null
              })}
            </div>
          </div>

          {/* フィードバック */}
          <div className="diagnosis-feedback">
            <p className="diagnosis-feedback__text">
              <i className="fa-solid fa-lightbulb" aria-hidden="true" />
              {getFeedback(answers, top3[0])}
            </p>
          </div>

          {/* ランキング */}
          <div className="diagnosis-result__list">
            {top3.map((p, i) => {
              const features: string[] = []
              if (p.minPrice) features.push(`月額${p.minPrice.toLocaleString()}円〜`)
              if (p.battery && p.battery >= 80) features.push(`バッテリー${p.battery}%以上保証`)
              if (p.store) features.push('店舗サポートあり')
              if (p.warranty && p.warranty >= 60) features.push(`保証${p.warranty}日`)
              if (p.discount) features.push('MNP割引あり')

              return (
                <div key={p.slug} className={`diagnosis-result__item${i === 0 ? ' is-first' : ''}`}>
                  <div className="diagnosis-result__rank">
                    <i className={RANK_STYLES[i].icon} style={{ color: RANK_STYLES[i].color }} aria-hidden="true" />
                    {i + 1}位
                  </div>
                  <div className="diagnosis-result__content">
                    <h4 className="diagnosis-result__name">{p.name}</h4>
                    <p className="diagnosis-result__carrier">
                      {formatCarriers(p.carriers)}回線
                      {p.priceRange && p.priceRange !== '—' && (
                        <> ｜ <strong className="text-negative">{p.priceRange}</strong></>
                      )}
                    </p>
                    <p className="diagnosis-result__features">
                      {features.length > 0 ? features.join(' / ') : '詳細は下記をご確認ください'}
                    </p>
                    <div className="diagnosis-result__links">
                      <a
                        href={p.url}
                        className="m-btn m-btn--primary m-btn--sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        公式サイト <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                      </a>
                      <a href={`#${p.slug}`} className="diagnosis-result__link-detail m-outline-btn m-outline-btn--link">
                        詳細を見る <i className="fa-solid fa-arrow-down" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* リセット */}
          <div className="diagnosis-result__actions">
            <button type="button" className="diagnosis-reset-btn m-outline-btn" onClick={handleReset}>
              <i className="fa-solid fa-rotate-right" aria-hidden="true" /> もう一度診断する
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
