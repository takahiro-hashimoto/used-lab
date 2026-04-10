/**
 * 比較ページ FAQ セクション
 */

import Link from 'next/link'
import type { IPhoneModel } from '@/lib/types'
import { calculateOSLifespan } from '@/lib/utils/iphone-helpers'
import { getShortName, calcAvgPriceRange } from './helpers'
import type { IPhonePriceLog } from '@/lib/types'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
  latestL: IPhonePriceLog | null
  latestR: IPhonePriceLog | null
}

type FaqItem = {
  question: string
  answer: string
  answerNode?: React.ReactNode
}

export default function CompareFaq({ modelL, modelR, latestL, latestR }: Props) {
  const nameL = modelL.model
  const nameR = modelR.model
  const shortL = getShortName(modelL)
  const shortR = getShortName(modelR)

  const rangeL = calcAvgPriceRange(latestL)
  const rangeR = calcAvgPriceRange(latestR)
  const osLifeL = calculateOSLifespan(modelL.date)
  const osLifeR = calculateOSLifespan(modelR.date)

  // 価格差テキスト
  const priceDiffText = (() => {
    if (rangeL.avg == null || rangeR.avg == null) return null
    const diff = Math.abs(rangeL.avg - rangeR.avg)
    if (diff < 1000) return `ほぼ同じ（約¥${rangeL.avg.toLocaleString()}前後）`
    const cheaper = rangeL.avg < rangeR.avg ? nameL : nameR
    return `${cheaper}の方が約¥${diff.toLocaleString()}安い`
  })()

  // 性能比較テキスト
  const perfText = (() => {
    const sL = modelL.score_single || 0
    const sR = modelR.score_single || 0
    if (sL === 0 && sR === 0) return null
    if (sL > sR) return `シングルコアスコアで${nameL}が${nameR}を上回ります`
    if (sR > sL) return `シングルコアスコアで${nameR}が${nameL}を上回ります`
    return `処理性能はほぼ同等です`
  })()

  const faqs: FaqItem[] = [
    {
      question: `中古の${nameL}と${nameR}はどっちがおすすめ？`,
      answer: `コスパ重視なら${rangeL.avg != null && rangeR.avg != null && rangeL.avg <= rangeR.avg ? nameL : nameR}がおすすめです。${priceDiffText ? `現在の中古相場は${priceDiffText}です。` : ''} カメラや処理性能にこだわるなら上位モデルを検討しましょう。`,
      answerNode: <>コスパ重視なら{rangeL.avg != null && rangeR.avg != null && rangeL.avg <= rangeR.avg ? nameL : nameR}がおすすめです。{priceDiffText ? `現在の中古相場は${priceDiffText}です。` : ''} カメラや処理性能にこだわるなら上位モデルを検討しましょう。詳しくは<Link href="/iphone/recommend/">おすすめ中古iPhone5選</Link>もご覧ください。</>,
    },
    {
      question: `${nameL}と${nameR}の価格差はどのくらい？`,
      answer: priceDiffText
        ? `現在の中古相場では${priceDiffText}です。最新の価格は日々変動するため、購入前に複数のショップを比較することをおすすめします。`
        : `価格データが不足しているため比較できません。各ショップの最新価格をご確認ください。`,
    },
    {
      question: `${nameL}と${nameR}の処理性能の違いは？`,
      answer: perfText
        ? `${perfText}。日常使いではどちらも快適ですが、ゲームや動画編集などの負荷が高い用途ではスコアの差が体感できる場合があります。`
        : `ベンチマークデータが不足しているため、詳細な比較はできません。`,
    },
    {
      question: `${nameL}と${nameR}のiOSサポート期間は？`,
      answer: `${nameL}は${osLifeL.osEndYear > 0 ? `${osLifeL.osEndYear}年頃` : '不明'}まで、${nameR}は${osLifeR.osEndYear > 0 ? `${osLifeR.osEndYear}年頃` : '不明'}までサポートされる見込みです。発売から約7年が目安で、サポートが長い方が長期間安心して使えます。`,
    },
    {
      question: `中古${shortL}・${shortR}はどこで買うのがおすすめ？`,
      answer: `イオシス・ゲオ・じゃんぱらなど大手中古ショップがおすすめです。保証付きで購入できるため、フリマアプリより安心です。当サイトでは3店舗の価格を毎日自動取得し、相場を比較しています。`,
      answerNode: <>イオシス・ゲオ・じゃんぱらなど大手中古ショップがおすすめです。保証付きで購入できるため、フリマアプリより安心です。当サイトでは3店舗の価格を毎日自動取得し、相場を比較しています。詳しくは<Link href="/iphone/iphone-shop/">中古iPhoneの購入先比較</Link>もご参考に。</>,
    },
  ]

  // JSON-LD for FAQ
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          {shortL}と{shortR}のよくある質問
        </h2>
        <p className="m-section-desc">
          {nameL}と{nameR}の比較に関するよくある質問をまとめました。
        </p>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="m-card faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">
                <p>{faq.answerNode ?? faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
