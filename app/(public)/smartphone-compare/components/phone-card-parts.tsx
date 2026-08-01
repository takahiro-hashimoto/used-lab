import Image from 'next/image'
import Link from 'next/link'
import { formatRelease } from '@/app/(public)/iphone/price-info/components/cardFormat'
import { BRAND_META, yen, type NormalizedPhone } from '../lib'

/**
 * 機種カードの共通パーツ。
 *
 * 価格帯別ランキング（PriceBucketSection）と用途別おすすめスマホ（UseCaseGuide）は
 * カードの外枠こそ違うが、中身（画像・機種名・サポート・価格・スペック・ボタン）は同じ。
 * 表示のゆらぎを防ぐため、ここに一本化して両方から使う。
 */

/** 画像。未登録（主にAndroidの新機種）はブランドアイコンで代替する */
export function PhoneImage({ phone, size }: { phone: NormalizedPhone; size: number }) {
  const meta = BRAND_META[phone.brand]
  if (phone.imageSrc) {
    return <Image src={phone.imageSrc} alt={phone.name} width={size} height={size} />
  }
  return (
    <i
      className={meta.icon}
      aria-hidden="true"
      style={{ fontSize: size * 0.375, color: 'var(--color-text-muted)', opacity: 0.5 }}
    />
  )
}

/**
 * 機種名リンク。既定はサイト内の詳細ページ。
 * toIosys を渡すと購入先（イオシス）へ直接送る。購入先が未登録の機種は詳細ページに戻す。
 */
export function PhoneName({ phone, toIosys = false }: { phone: NormalizedPhone; toIosys?: boolean }) {
  if (toIosys && phone.iosysUrl) {
    return (
      <a
        href={phone.iosysUrl}
        className="ifd-result-card__name"
        rel="nofollow noopener noreferrer"
        target="_blank"
        aria-label={`${phone.name}をイオシスで見る（新しいタブで開く）`}
      >
        {phone.name}
      </a>
    )
  }
  return (
    <Link prefetch={false} href={phone.detailHref} className="ifd-result-card__name">
      {phone.name}
    </Link>
  )
}

/** OSサポート期限のタグ。終了済みは色を変える */
export function SupportTag({ phone }: { phone: NormalizedPhone }) {
  if (!phone.supportUntil) return null
  const ended = phone.supportUntil === 'サポート終了'
  return (
    <span className={`ifd-tag ${ended ? 'ifd-tag--ended' : 'ifd-tag--supported'}`}>
      <i className={`fa-solid ${ended ? 'fa-circle-xmark' : 'fa-shield-halved'}`} aria-hidden="true" />{' '}
      {ended ? 'サポート終了' : `OSサポート ${phone.supportUntil}`}
    </span>
  )
}

/** 中古相場の行 */
export function PriceRow({ phone }: { phone: NormalizedPhone }) {
  return (
    <div className="ifd-result-card__price">
      <span className="ifd-result-card__price-label">中古相場</span>
      <span className="ifd-result-card__price-value">{yen(phone.price)}〜</span>
    </div>
  )
}

/**
 * スペック表。値が無い行は出さない。
 * AnTuTu はランキングの根拠になる価格帯別のみ表示し、用途別では省いて高さを抑える。
 */
export function PhoneSpecs({ phone, withAntutu = false }: { phone: NormalizedPhone; withAntutu?: boolean }) {
  return (
    <dl className="ifd-result-card__specs">
      {phone.releaseDate && <div><dt>発売日</dt><dd>{formatRelease(phone.releaseDate)}</dd></div>}
      {phone.chip && <div><dt>CPU</dt><dd>{phone.chip}</dd></div>}
      {withAntutu && phone.antutuTotal != null && (
        <div><dt>AnTuTu</dt><dd>{phone.antutuTotal.toLocaleString()}</dd></div>
      )}
      {phone.display && <div><dt>画面</dt><dd>{phone.display}</dd></div>}
      {phone.cameraLabel && <div><dt>カメラ構成</dt><dd>{phone.cameraLabel}</dd></div>}
      {phone.portLabel && <div><dt>充電ポート</dt><dd>{phone.portLabel}</dd></div>}
    </dl>
  )
}

/**
 * 購入先（アフィリンクがある場合のみ）と詳細ページへのボタン。
 * iosysOnly: 機種名が詳細ページへのリンクになっている場所では「詳細を見る」を出さない
 */
export function PhoneActions({ phone, iosysOnly = false }: { phone: NormalizedPhone; iosysOnly?: boolean }) {
  return (
    <div className="ifd-result-card__actions" style={{ flexWrap: 'nowrap' }}>
      {phone.iosysUrl && (
        <a
          href={phone.iosysUrl}
          className="m-btn m-btn--primary m-btn--sm"
          rel="nofollow noopener noreferrer"
          target="_blank"
          aria-label={`${phone.name}をイオシスで見る`}
        >
          イオシスで見る
        </a>
      )}
      {/* iosysOnly でも購入先が無ければボタンが1つも出なくなるため、その場合は詳細へ誘導する */}
      {(!iosysOnly || !phone.iosysUrl) && (
        <Link prefetch={false} href={phone.detailHref} className="m-btn m-btn--secondary m-btn--sm">
          詳細を見る
        </Link>
      )}
    </div>
  )
}
