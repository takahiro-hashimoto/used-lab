import Link from 'next/link'
import { BRAND_META, buildUseCasePicks, type NormalizedPhone } from '../lib'
import { PhoneActions, PhoneImage, PhoneName, PhoneSpecs, PriceRow, SupportTag } from './phone-card-parts'

/**
 * 用途カードの中に置く機種情報。
 * スペック表のモーダル（model-modal）と同じ項目立てだが、3カラム内に収める必要があるため
 * 画像を小さくし、行数を絞ったコンパクト版。クラスは ifd-result-card__* を流用する。
 */
function PickSummary({ phone }: { phone: NormalizedPhone }) {
  return (
    <div className="use-case-pick">
      <div className="use-case-pick__head">
        <span className="use-case-pick__img">
          <PhoneImage phone={phone} size={48} />
        </span>
        <div>
          <PhoneName phone={phone} toIosys />
          <SupportTag phone={phone} />
        </div>
      </div>

      <PriceRow phone={phone} />
      <PhoneSpecs phone={phone} />
      {/* このカードは購入先への送客に振り切るため、機種名もボタンもイオシスへ向ける */}
      <PhoneActions phone={phone} iosysOnly />
    </div>
  )
}

type Card = {
  icon: string
  title: string
  desc: string
  pick: NormalizedPhone | null
  /** pick が無いときのフォールバック導線（カテゴリTOP） */
  fallbackHref?: string
  fallbackLabel?: string
}

export default function UseCaseGuide({ phones }: { phones: NormalizedPhone[] }) {
  if (phones.length === 0) return null

  // 判定ロジックは lib に一本化（表示側で条件を持たない）
  const picks = buildUseCasePicks(phones)

  const cards: Card[] = [
    { icon: 'fa-solid fa-camera-retro', title: 'カメラで選ぶ', desc: '暗所とAI補正の安定感ならPixelが頭ひとつ抜けています。望遠まで欲しいならGalaxyの上位も候補。中古なら型落ちの上位機が同じ予算で狙えます。', pick: picks.camera, fallbackHref: '/pixel/', fallbackLabel: 'Pixelの選び方' },
    { icon: 'fa-solid fa-gamepad', title: 'ゲーム性能で選ぶ', desc: 'AnTuTu総合が最も高い1台です。原神やFPSのような高負荷3Dゲームでも描画が落ちにくく、長時間プレイでも動作が安定します。発熱の少なさも利点。', pick: picks.game, fallbackHref: '/iphone/benchmark/', fallbackLabel: 'ベンチマーク比較' },
    { icon: 'fa-solid fa-battery-full', title: '電池持ちで選ぶ', desc: 'バッテリー容量(mAh)が最大のモデルです。動画視聴やナビなど1日ヘビーに使っても夕方まで持たせたい人向け。中古は劣化具合も要確認です。', pick: picks.battery, fallbackHref: '/iphone/battery-compare/', fallbackLabel: 'バッテリー比較' },
    { icon: 'fa-solid fa-shield-halved', title: '長く使う（サポート）', desc: 'OSアップデートの保証がいちばん先まで残る1台です。中古は数年経過している場合が多いため、残り期間が長いほど安心して長く使い続けられます。', pick: picks.longUse, fallbackHref: '/pixel/used-pixel-support/', fallbackLabel: 'サポート期間を見る' },
    { icon: 'fa-solid fa-mobile-screen', title: '折りたたみ（Galaxy Z）', desc: '畳んでコンパクトに持ち運べるフォルダブルです。新品は高額ですが中古なら大幅に安く狙えます。ヒンジや折り目の状態は個体差が出やすい点に注意。', pick: picks.fold, fallbackHref: '/galaxy/', fallbackLabel: 'Galaxyの選び方' },
    { icon: 'fa-solid fa-hand', title: 'コンパクトで選ぶ', desc: '片手で無理なく扱える小型サイズです。iPhoneのmini/SE系やGalaxyのZ Flip系が該当します。ポケットに入れて身軽に持ち歩きたい人に向きます。', pick: picks.compact, fallbackHref: '/iphone/filter-search/', fallbackLabel: '条件で絞り込む' },
  ]

  const visible = cards.filter((c) => c.pick || c.fallbackHref)

  return (
    <section className="l-section" id="by-use" aria-labelledby="heading-by-use">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-by-use">
          用途別おすすめスマホ
        </h2>
        <p className="m-section-desc">
          「何を優先するか」から、中古相場データで選んだおすすめの1台へ。気になる機種は詳細ページで相場もチェックできます。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg">
          {visible.map((c) => {
            const meta = c.pick ? BRAND_META[c.pick.brand] : null
            return (
              <div key={c.title} className="m-card m-card--shadow m-card--padded">
                <p className="post-check-item__heading">
                  <i className={c.icon} aria-hidden="true" />
                  {c.title}
                </p>
                <p className="post-check-item__desc">{c.desc}</p>
                {c.pick && meta ? (
                  <PickSummary phone={c.pick} />
                ) : (
                  c.fallbackHref && (
                    <Link prefetch={false} href={c.fallbackHref} className="m-btn m-btn--primary m-btn--sm" style={{ marginTop: 'var(--space-md)' }}>
                      {c.fallbackLabel}
                    </Link>
                  )
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
