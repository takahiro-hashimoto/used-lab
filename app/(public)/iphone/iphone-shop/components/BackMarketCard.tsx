import Image from 'next/image'
import { SpecValue, type SpecRow } from '@/app/components/shop/ShopDetailSection'
import { BACK_MARKET, backMarketComparisonRow } from '@/lib/data/back-market'

/**
 * イオシスの次に差し込む Back Market の紹介カード。
 *
 * 他ショップは shops テーブル＋SHOP_DETAIL_ORDER から生成しているが、
 * Back Market は「整備済み（リファービッシュ）」という国内中古ショップとは
 * 別カテゴリの選択肢で、ショップ比較表に並べると保証や価格の性格が違いすぎて
 * 誤解を招く。そのため DB には登録せず、このページのこの位置だけに置いている。
 * （DB に入れると shops を参照している比較表にも自動で載ってしまう）
 *
 * 記載している条件はすべて公式サイト（backmarket.co.jp）に明記されているもの。
 * 赤ロム保証など公式に記載が無い項目は書かない。
 */

type Props = {
  /** 他ショップのカードと同じ指標を出すため、共通の specRows をそのまま受け取る */
  specRows: SpecRow[]
}

export default function BackMarketCard({ specRows }: Props) {
  // 比較表に出しているのと同じ Shop 行を使う。カードと比較表で値がずれない
  const shop = backMarketComparisonRow()
  return (
    <article className="m-card m-card--shadow recommend-card" id="detail-backmarket">
      <div className="recommend-card__header">
        <h3>
          <i className="fa-solid fa-store" aria-hidden="true"></i> Back Market
        </h3>
      </div>
      <div className="recommend-card__overview">
        <figure className="recommend-card__image">
          {/* 他ショップ（ShopDetailSection）と同じ /images/shop/<shop_key>-thumb.jpg 規約 */}
          <Image
            src="/images/shop/backmarket-thumb.jpg"
            alt="Back Market公式サイトのスクリーンショット"
            width={300}
            height={400}
            sizes="(max-width: 480px) 100vw, 300px"
          />
        </figure>
        <div className="recommend-card__shop">
          <p className="recommend-card__info-title">Back Marketの特徴</p>
          <dl className="recommend-card__specs">
            {specRows.map((row) => (
              <div key={row.label} className="recommend-card__spec-item">
                <dt>{row.label}</dt>
                <dd><SpecValue value={row.getValue(shop)} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="recommend-card__body m-rich-text">
        <p className="recommend-card__subtitle">中古ではなく「整備済み」という選択肢</p>
        <p>
          フランス発のマーケットプレイスで、日本には2021年に上陸しました。中古品をそのまま売るのではなく、審査を通過した専門業者が整備した「リファービッシュ品」を扱っているのが、国内の中古ショップとの違いです。
        </p>
        <p>
          すべての端末に<strong>1年間の動作保証</strong>が付き、自然故障の場合は全額返金または代替機と交換されます。さらに<strong>お届けから30日間は返品可能</strong>で、返送料もBack Market負担です。中古で不安になりがちな「届いてみたら思っていた状態と違った」というリスクを、購入後に取り消せます。
        </p>
        <p>
          バッテリーは<strong>最大容量80%以上</strong>が保証されており、機種によっては80〜89%・90〜99%の容量帯を選んだり、新品バッテリーに交換した状態で購入したりもできます。外装はA〜Cのグレードで分かれているので、価格と状態のどちらを優先するか選べます。
        </p>
      </div>
      <div className="recommend-card__fit">
        <div className="l-grid l-grid--2col l-grid--gap-lg">
          <div className="recommend-card__fit-box recommend-card__fit-box--good">
            <p className="recommend-card__fit-title">
              <i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ
            </p>
            <ul>
              <li><i className="fa-solid fa-check" aria-hidden="true"></i> 中古の「状態のばらつき」を避けたい</li>
              <li><i className="fa-solid fa-check" aria-hidden="true"></i> 1年保証と返品期間で安心を買いたい</li>
              <li><i className="fa-solid fa-check" aria-hidden="true"></i> バッテリーの状態を条件で選びたい</li>
            </ul>
          </div>
          <div className="recommend-card__fit-box recommend-card__fit-box--bad">
            <p className="recommend-card__fit-title">
              <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない
            </p>
            <ul>
              <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> とにかく最安で手に入れたい</li>
              <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 実店舗で現物を見てから買いたい</li>
              <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 個体ごとの実物写真を確認してから決めたい</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="recommend-card__shops">
        <div className="recommend-card__shop-btns recommend-card__shop-btns--single">
          <a
            href={BACK_MARKET.affiliateUrl}
            className="m-btn m-btn--primary"
            rel="nofollow noopener noreferrer"
            target="_blank"
            aria-label="Back Marketで探す（新しいタブで開く）"
          >
            Back Marketで探す <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      {/* A8.net の成果計測用ピクセル。リンクとセットで設置する必要がある */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BACK_MARKET.trackingPixelUrl}
        alt=""
        width={1}
        height={1}
        style={{ border: 0 }}
      />
    </article>
  )
}
