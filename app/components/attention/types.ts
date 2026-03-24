import type { ReactNode } from 'react'

/** FAQ 1件分 */
export interface FaqItem {
  question: string
  answer: ReactNode
}

/** 購入後チェック 1件分 */
export interface CheckItem {
  icon?: string
  heading: string
  text: ReactNode
}

/** 失敗パターン 1件分 */
export interface FailurePattern {
  icon?: string
  heading: string
  text: ReactNode
}

/** InsuranceSection の製品別差分 */
export interface InsuranceProps {
  productName: string
  productBenefit: ReactNode
  appleCarePrice: string
  appleCareYears: string
}
