import Image from 'next/image'
import Link from 'next/link'

export default function CautionSection() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ①セルラーモデルのiPadが必須 */}
      <div id="caution-cellular" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <Image
            src="/images/content/photo/ipad-wifi-01.webp"
            alt="iPadのセルラーモデル"
            className="media-card__img"
            width={240}
            height={160} sizes="(max-width: 480px) 100vw, 240px" />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">①セルラーモデルのiPadが必須</h3>
          <p className="media-card__desc">
            iPadには「セルラーモデル（GPS機能あり）」と「Wi-Fiモデル（GPS機能なし）」の2種類がありますが、<strong>カーナビ化するならGPS機能を搭載しているセルラーモデルが必須</strong>です。
          </p>
          <p className="media-card__desc u-mt-sm">
            Wi-FiモデルのiPadをiPhoneのテザリングでネット接続しても、GPS非搭載のため現在位置が正確に定まらず経路案内を円滑に行うことができません。カーナビとして使うならデバイス本体にGPS機能を持ち合わせたセルラーモデルを利用しましょう。
          </p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            両モデルの違いは「<Link href="/ipad/wifi-cellular/">iPadはWi-Fiモデルとセルラーモデルどっちがおすすめ？</Link>」で詳しく解説しています。
          </p>
        </div>
      </div>

      {/* ②車載ホルダー選びは慎重に */}
      <div id="caution-holder" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <Image
            src="/images/content/photo/ipad-car-navi-03.webp"
            alt="車載ホルダーにiPadを設置した様子"
            className="media-card__img"
            width={240}
            height={160} sizes="(max-width: 480px) 100vw, 240px" />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">②車載ホルダー選びは慎重に</h3>
          <p className="media-card__desc">
            iPadをカーナビとして使うには車載ホルダーが必須ですが、吸盤タイプ・エアコン吹き出し口型・CDスロット型などさまざまな種類があり、車種との相性もあるため自分の車に合うものを見つけるのに苦労するかもしれません。
          </p>
          <p className="media-card__desc u-mt-sm">
            たとえばエアコン吹き出し口型はしっかり固定できる反面、エアコンの風がタブレットに当たり続けるなどのデメリットもあります。おすすめは<strong>吸盤・粘着ゲルタイプ</strong>で、取り付け位置の自由度が高く車種を問わず使いやすいのが特長です。購入前にダッシュボード周りのスペースを確認しておきましょう。
          </p>
          <p className="lead-link u-mt-sm">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <a href="https://amzn.to/4bFbYKv" target="_blank" rel="noopener noreferrer">AmazonでiPad対応の車載ホルダーを探す</a>
          </p>
        </div>
      </div>
    </div>
  )
}
