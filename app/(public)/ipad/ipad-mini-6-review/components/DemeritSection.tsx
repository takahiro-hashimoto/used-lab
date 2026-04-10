import Link from 'next/link'

export default function DemeritSection() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ①バッテリー持ちはイマイチ */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-07.webp"
            alt="iPad mini 6で読書する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">①バッテリー持ちはイマイチ</h3>
          <p className="media-card__desc">
            正直なところ、iPad mini 6のバッテリー持ちはお世辞にも良いとは言えません。特に負荷の大きいゲームや3Dモデリングソフトを動かしていると、目に見える速さで残量が減っていき、毎日の充電はもはや欠かせないルーティンでした。
          </p>
          <p className="media-card__desc u-mt-sm">
            併用している<strong>M4チップ搭載のiPad Pro 11インチ（バッテリー容量 約8,340mAh）</strong>は、がっつり使い倒しても丸二日は耐えてくれるスタミナがあります。
          </p>
          <p className="media-card__desc u-mt-sm">
            一方で、約5,124mAhのmini 6は、同じ感覚で使うとあっという間に限界が来てしまう。このスタミナの差は、正直かなり「辛い」と感じるポイントでした。
          </p>
        </div>
      </div>

      {/* ②モデリングソフトや動画編集はかなり辛い */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-08.webp"
            alt="iPad mini 6でモデリングソフトを扱う様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">②モデリングソフトや動画編集はかなり辛い…。</h3>
          <p className="media-card__desc">
            iPad mini 6の機動力に惚れ込み、クリエイティブな作業もこれ1台でこなそうと試行錯誤した時期もありました。しかし、結論から言えば、本格的な制作作業においてこの画面サイズは「大きな制約」になります。
          </p>
          <p className="media-card__desc u-mt-sm">
            11インチや13インチのiPad Proなら一目で俯瞰できるタイムラインも、miniの画面では常に「一部」しか見えません。この「視点を動かし続けるコスト」が、集中力をじわじわと削いでいきます。
          </p>
          <p className="media-card__desc u-mt-sm">
            現在は重たい作業はProに任せ、miniは情報のインプットやちょっとしたアイデア出しの相棒として完全に役割を分けています。この「割り切り」こそが、iPad miniというロマン溢れるデバイスのポテンシャルを最も引き出せる運用方法だと感じています。
          </p>
        </div>
      </div>

      {/* ③64GBの最小スペックはアウトプット作業には不向き */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-09.webp"
            alt="iPad mini 6のストレージ容量"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">③64GBの最小スペックはアウトプット作業には不向き</h3>
          <p className="media-card__desc">
            アウトプット作業を断念した理由は、<span className="marker-orange">64GBという最小のストレージ容量を選んでしまった</span>ことも大きく起因しています。
          </p>
          <p className="media-card__desc u-mt-sm">
            動画や3D素材で容量が埋まると、A15 Bionicの性能を発揮する前にキャッシュ領域が不足し、アプリの強制終了が頻発してしまうからです。
          </p>
          <p className="media-card__desc u-mt-sm">
            常に空き容量を気にする運用は想像以上にストレスが大きく、制作などのクリエイティブな用途を兼ねるなら、最初から256GB以上のモデルを選択すべきだったと痛感しています。iPad miniでがっつり動画編集などアウトプット作業をしたい方はご注意ください。
          </p>
          <p className="lead-link u-mt-sm">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <Link href="/ipad/storage-guide/">中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ</Link>
          </p>
        </div>
      </div>

      {/* ④ゼリースクロール現象に注意 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src="https://www.youtube.com/embed/2pZDMr21H2o?si=8o9F6vg_oPYskoLl"
            title="iPad mini（第6世代）で発生するゼリースクロール現象"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">④ゼリースクロール現象に注意</h3>
          <p className="media-card__desc">
            iPad mini 6は発売直後に「ゼリースクロール」が発生すると話題になりました。これはiPad mini 6を縦向きに持って上下にスクロールした際に、画面に表示された文章などが斜めにゆがんだように見える現象のことです。
          </p>
          <p className="media-card__desc u-mt-sm">
            個人的にはまったく気になりませんでしたが、これが原因で返品された方もいるようです。念の為、購入する前に一度確認しておくのをおすすめします。
          </p>
        </div>
      </div>
    </div>
  )
}
