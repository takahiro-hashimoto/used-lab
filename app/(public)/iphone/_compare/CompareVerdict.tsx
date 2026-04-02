/**
 * それぞれどんな人におすすめ？ ── 総合判定セクション
 * スペック・価格・機能を総合的に評価し、動的にレコメンド文を生成する
 */

import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import { calcAvgPriceRange } from './helpers'
import s from './CompareVerdict.module.css'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
  latestL: IPhonePriceLog | null
  latestR: IPhonePriceLog | null
}

/* ------------------------------------------------------------------ */
/*  スコアリング・分析ユーティリティ                                      */
/* ------------------------------------------------------------------ */

/** カメラ系 boolean 機能の搭載数 */
function cameraFeatureCount(m: IPhoneModel): number {
  return [
    m.apple_proraw,
    m.apple_prores,
    m.lidar,
    m.macro_mode,
    m.cinematic_mode,
    m.night_mode,
  ].filter(Boolean).length
}

/** バッテリー数値を抽出 (mAh) */
function parseBattery(m: IPhoneModel): number {
  return parseInt(String(m.battery || '0').replace(/,/g, ''), 10) || 0
}

/** 重さ数値を抽出 (g) */
function parseWeight(m: IPhoneModel): number {
  return parseFloat(String(m.weight || '0')) || 0
}

/** Pro 系機能の搭載数 */
function proFeatureCount(m: IPhoneModel): number {
  return [
    m.promotion,
    m.lidar,
    m.apple_proraw,
    m.apple_prores,
    m.macro_mode,
  ].filter(Boolean).length
}

/* ------------------------------------------------------------------ */
/*  動的レコメンドリスト生成                                              */
/* ------------------------------------------------------------------ */

function buildRecommendList(
  model: IPhoneModel,
  other: IPhoneModel,
  myPrice: number | null,
  otherPrice: number | null,
): string[] {
  const recs: string[] = []

  // 価格が安い → コスパ推し
  if (myPrice != null && otherPrice != null && myPrice < otherPrice) {
    const diff = otherPrice - myPrice
    recs.push(`予算を抑えたい方（約¥${diff.toLocaleString()}お得）`)
  }

  // カメラ機能が豊富
  if (cameraFeatureCount(model) > cameraFeatureCount(other)) {
    const diff = cameraFeatureCount(model) - cameraFeatureCount(other)
    recs.push(`カメラ機能にこだわりたい方（+${diff}機能）`)
  }

  // ベンチマーク（シングルスコア）
  const singleMe = model.score_single || 0
  const singleOther = other.score_single || 0
  if (singleMe > singleOther && singleMe - singleOther > 100) {
    recs.push('ゲーム・動画編集など高負荷作業をする方')
  }

  // バッテリー
  const batMe = parseBattery(model)
  const batOther = parseBattery(other)
  if (batMe > batOther && batMe - batOther >= 100) {
    recs.push('バッテリー持ちを重視する方')
  }

  // 軽量
  const wMe = parseWeight(model)
  const wOther = parseWeight(other)
  if (wMe > 0 && wOther > 0 && wMe < wOther && wOther - wMe >= 5) {
    recs.push('軽さ・携帯性を重視する方')
  }

  // Apple Intelligence
  if (model.apple_intelligence && !other.apple_intelligence) {
    recs.push('Apple Intelligence（AI機能）を活用したい方')
  }

  // ProMotion
  if (model.promotion && !other.promotion) {
    recs.push('なめらかな120Hzディスプレイを求める方')
  }

  // LiDAR
  if (model.lidar && !other.lidar) {
    recs.push('AR体験やナイトモードAFを活用したい方')
  }

  // 新しさ（リリース日）
  if (model.date && other.date) {
    const dMe = new Date(model.date.replace(/\//g, '-'))
    const dOther = new Date(other.date.replace(/\//g, '-'))
    const diffMs = dMe.getTime() - dOther.getTime()
    if (diffMs > 180 * 24 * 60 * 60 * 1000) {
      recs.push('最新モデルで長くiOSアップデートを受けたい方')
    }
  }

  // フォールバック
  if (recs.length === 0) {
    recs.push('普段使いやSNS・動画視聴がメインの方')
  }

  return recs
}

/* ------------------------------------------------------------------ */
/*  バッジラベル・ワンライン結論の動的生成                                  */
/* ------------------------------------------------------------------ */

type VerdictMeta = {
  badge: string
  badgeBg: string
  badgeColor: string
  oneLiner: string
}

function buildVerdictMeta(
  model: IPhoneModel,
  other: IPhoneModel,
  myPrice: number | null,
  otherPrice: number | null,
): VerdictMeta {
  const cheaper = myPrice != null && otherPrice != null && myPrice < otherPrice
  const morePro = proFeatureCount(model) > proFeatureCount(other)
  const faster = (model.score_single || 0) > (other.score_single || 0) + 100
  const lighter = parseWeight(model) > 0 && parseWeight(other) > 0 && parseWeight(model) < parseWeight(other) - 5
  const moreCamera = cameraFeatureCount(model) > cameraFeatureCount(other)
  const newer =
    model.date && other.date
      ? new Date(model.date.replace(/\//g, '-')).getTime() >
        new Date(other.date.replace(/\//g, '-')).getTime() + 180 * 24 * 60 * 60 * 1000
      : false

  if (cheaper && !morePro) {
    return {
      badge: 'コスパ重視なら',
      badgeBg: '#e8f5e9',
      badgeColor: '#2e7d32',
      oneLiner: '価格を抑えつつ十分な性能を確保できるモデル',
    }
  }
  if (morePro && faster) {
    return {
      badge: '性能重視なら',
      badgeBg: '#e3f2fd',
      badgeColor: '#1565c0',
      oneLiner: '妥協なしのプロ仕様で最高の体験を',
    }
  }
  if (morePro && moreCamera) {
    return {
      badge: 'カメラ重視なら',
      badgeBg: '#fce4ec',
      badgeColor: '#c62828',
      oneLiner: '写真・動画撮影にとことんこだわれる一台',
    }
  }
  if (faster && !morePro) {
    return {
      badge: '処理性能重視なら',
      badgeBg: '#ede7f6',
      badgeColor: '#4527a0',
      oneLiner: 'ゲームや重いアプリもサクサク動く高性能チップ搭載',
    }
  }
  if (lighter) {
    return {
      badge: '携帯性重視なら',
      badgeBg: '#fff3e0',
      badgeColor: '#e65100',
      oneLiner: '軽くて持ちやすいから毎日の外出も快適',
    }
  }
  if (newer) {
    return {
      badge: '長く使うなら',
      badgeBg: '#e0f7fa',
      badgeColor: '#00695c',
      oneLiner: '最新モデルだからOSサポートも長く安心',
    }
  }
  if (cheaper) {
    return {
      badge: 'コスパ重視なら',
      badgeBg: '#e8f5e9',
      badgeColor: '#2e7d32',
      oneLiner: 'コストパフォーマンスに優れた堅実な選択肢',
    }
  }

  return {
    badge: 'バランス型',
    badgeBg: '#f5f5f5',
    badgeColor: '#616161',
    oneLiner: '日常使いに過不足のない万能モデル',
  }
}

/* ------------------------------------------------------------------ */
/*  総評テキストの生成（自然な文章）                                       */
/* ------------------------------------------------------------------ */

function buildSummaryProse(
  modelL: IPhoneModel,
  modelR: IPhoneModel,
  priceL: number | null,
  priceR: number | null,
): string[] {
  const sentences: string[] = []

  // 価格差
  if (priceL != null && priceR != null) {
    const diff = Math.abs(priceL - priceR)
    const cheaperName = priceL < priceR ? modelL.model : modelR.model
    if (diff >= 1000) {
      sentences.push(
        `中古価格は${cheaperName}が約¥${diff.toLocaleString()}安く、コスト面で有利です。`,
      )
    } else {
      sentences.push(
        `中古価格はほぼ同水準で、価格差はほとんどありません。どちらを選んでも費用面での差は気にならないでしょう。`,
      )
    }
  }

  // 性能差
  const sL = modelL.score_single || 0
  const sR = modelR.score_single || 0
  if (sL > 0 && sR > 0 && Math.abs(sL - sR) > 100) {
    const fasterName = sL > sR ? modelL.model : modelR.model
    const pct = Math.round((Math.abs(sL - sR) / Math.min(sL, sR)) * 100)
    sentences.push(
      `処理性能は${fasterName}がベンチマークで約${pct}%上回っています。ゲームや動画編集など負荷の高い作業をする方は、この差が体感できるはずです。`,
    )
  }

  // カメラ
  const camL = cameraFeatureCount(modelL)
  const camR = cameraFeatureCount(modelR)
  if (camL !== camR) {
    const betterCam = camL > camR ? modelL.model : modelR.model
    const betterModel = camL > camR ? modelL : modelR
    const extras: string[] = []
    const otherModel = camL > camR ? modelR : modelL
    if (betterModel.apple_proraw && !otherModel.apple_proraw) extras.push('ProRAW')
    if (betterModel.apple_prores && !otherModel.apple_prores) extras.push('ProRes')
    if (betterModel.macro_mode && !otherModel.macro_mode) extras.push('マクロ撮影')
    if (betterModel.lidar && !otherModel.lidar) extras.push('LiDAR')
    const detail = extras.length > 0 ? `${extras.join('・')}といった機能を備えており、` : ''
    sentences.push(
      `カメラ性能は${betterCam}が充実しています。${detail}写真や動画の撮影にこだわりたい方に適した一台です。`,
    )
  }

  // バッテリー
  const batL = parseBattery(modelL)
  const batR = parseBattery(modelR)
  if (batL > 0 && batR > 0 && Math.abs(batL - batR) >= 200) {
    const longerBat = batL > batR ? modelL.model : modelR.model
    sentences.push(
      `バッテリー容量は${longerBat}のほうが大きく、外出先でも充電を気にせず使いたい方に安心感があります。`,
    )
  }

  // フォールバック
  if (sentences.length === 0) {
    sentences.push(
      `${modelL.model}と${modelR.model}はスペックが近く、どちらを選んでも大きな不満は出にくいモデルです。好みや予算に合わせて選ぶのがおすすめです。`,
    )
  }

  return sentences
}

/* ------------------------------------------------------------------ */
/*  コンポーネント                                                      */
/* ------------------------------------------------------------------ */

export default function CompareVerdict({ modelL, modelR, latestL, latestR }: Props) {
  const rangeL = calcAvgPriceRange(latestL)
  const rangeR = calcAvgPriceRange(latestR)

  const recsL = buildRecommendList(modelL, modelR, rangeL.avg, rangeR.avg)
  const recsR = buildRecommendList(modelR, modelL, rangeR.avg, rangeL.avg)

  const metaL = buildVerdictMeta(modelL, modelR, rangeL.avg, rangeR.avg)
  const metaR = buildVerdictMeta(modelR, modelL, rangeR.avg, rangeL.avg)

  const summaryParts = buildSummaryProse(modelL, modelR, rangeL.avg, rangeR.avg)

  return (
    <section className="l-section" id="verdict" aria-labelledby="heading-verdict">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-verdict">
          それぞれどんな人におすすめ？
        </h2>

        <div className="lead-box">
          {summaryParts.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        {/* 2カード */}
        <div className={s.grid}>
          <VerdictCard
            model={modelL}
            meta={metaL}
            recommends={recsL}
          />
          <VerdictCard
            model={modelR}
            meta={metaR}
            recommends={recsR}
          />
        </div>
      </div>
    </section>
  )
}

function VerdictCard({
  model,
  meta,
  recommends,
}: {
  model: IPhoneModel
  meta: VerdictMeta
  recommends: string[]
}) {
  return (
    <div className={s.card}>
      <span
        className={s.badge}
        style={{
          backgroundColor: meta.badgeBg,
          color: meta.badgeColor,
        }}
      >
        {meta.badge}
      </span>
      <p className={s.cardName}>{model.model}</p>
      <p className={s.verdict}>{meta.oneLiner}</p>

      {recommends.length > 0 && (
        <>
          <p className="u-mb-xs" style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>
            こんな人に最適
          </p>
          <ul className={s.list}>
            {recommends.map((rec, i) => (
              <li key={i} className={s.listItem}>
                {rec}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
