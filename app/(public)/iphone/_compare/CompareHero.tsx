/**
 * 比較ページ用 VS ヒーローセクション
 */

import Image from 'next/image'
import type { IPhoneModel } from '@/lib/types'
import Breadcrumb from '@/app/components/Breadcrumb'
import { getShortName } from './helpers'
import HeroMeta from '@/app/components/HeroMeta'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
  slug: string
  dateStr: string
  dateDisplay: string
}

export default function CompareHero({ modelL, modelR, dateStr, dateDisplay }: Props) {
  const shortR = getShortName(modelR)

  return (
    <div className="hero-wrapper">
      <Breadcrumb
        items={[
          { label: '中古iPhone完全購入ガイド', href: '/iphone/' },
          { label: `${modelL.model}と${shortR}の比較` },
        ]}
      />

      <header className="hero">
        <div className="hero-bg">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner hero-inner--compare l-container">
          <div className="hero-content">
            <h1 className="hero-title">
              中古{modelL.model}と{shortR}の違いを比較｜中古で買うならどっち？
            </h1>
            <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
          </div>

          {/* VS ビジュアル */}
          <div className="hero-visual compare-hero-vs">
            <div className="compare-hero-vs__model">
              {modelL.image && (
                <Image
                  src={`/images/iphone/${modelL.image}`}
                  alt={modelL.model}
                  width={140}
                  height={140}
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              )}
              <p>{modelL.model}</p>
            </div>
            <div className="compare-hero-vs__badge">VS</div>
            <div className="compare-hero-vs__model">
              {modelR.image && (
                <Image
                  src={`/images/iphone/${modelR.image}`}
                  alt={modelR.model}
                  width={140}
                  height={140}
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              )}
              <p>{modelR.model}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
