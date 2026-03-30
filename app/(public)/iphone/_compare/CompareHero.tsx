/**
 * 比較ページ用 VS ヒーローセクション
 */

import Image from 'next/image'
import type { IPhoneModel } from '@/lib/types'
import Breadcrumb from '@/app/components/Breadcrumb'
import { getShortName } from './helpers'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
  slug: string
}

export default function CompareHero({ modelL, modelR, slug }: Props) {
  const shortR = getShortName(modelR)

  return (
    <div className="hero-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 769px) {
          .hero-inner--compare { grid-template-columns: 1fr 1fr !important; }
        }
      `}} />
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
              {modelL.model}と{shortR}<br className="sp-only" />
              中古で買うならどっち？<br className="sp-only" />
              2機種の違いを比較
            </h1>
            <div className="hero-meta">
              <span>当記事のリンクには広告が含まれています</span>
            </div>
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
                  style={{ borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.9)', padding: 'var(--space-md)', objectFit: 'contain' }}
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
                  style={{ borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.9)', padding: 'var(--space-md)', objectFit: 'contain' }}
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
