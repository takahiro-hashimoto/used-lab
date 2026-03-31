import MediaCard from '@/app/components/MediaCard'
import InfoCard from '@/app/components/InfoCard'
import HowtoSection from '@/app/components/HowtoSection'

export default function PaymentSection() {
  return (
    <HowtoSection
      id="payment"
      title="Apple Watchでできること【決済編】"
      description={<>Apple Watchがあれば日々の買い物や外出時の移動を簡単に済ますことができるようになります。<br />ここでは決済周りでアップルウォッチができることを3つ紹介します。</>}
    >

      {/* 19. Suicaの改札を通る */}
      <MediaCard src="/images/content/apple-watch-suica.jpg" alt="Apple WatchでSuicaを使う様子" title="Suicaの改札を通る">
        <p className="media-card__desc">
          Apple WatchはFeliCaチップを搭載しているため、Suicaや各種電子決済（Apple Pay）を利用できます。
        </p>
        <p className="media-card__desc">
          レジでの支払いや改札を通るたびにスマートフォンを取り出す手間が一切不要になるのは、非常に大きな利便性です。一度この手軽さを体験すると、もう元には戻れません。
        </p>
        <p className="media-card__desc">
          ちなみに、改札を通る際はわざわざ画面側をパネルにかざす必要はありません。自然な角度で手首をかざすだけでしっかりと認証されるため、無理に手首をひねる動作も不要です。
        </p>
      </MediaCard>

      {/* 20. 電子決済をする */}
      <MediaCard src="/images/content/photo/apple-watch-payment.jpg" alt="Apple Watchで電子決済する様子" title="電子決済をする">
        <p className="media-card__desc">
          Apple Watchは、Suicaに加えてiD・QUICPay・WAON・nanacoなど複数の主要な電子決済サービスに対応しています。コンビニなどのちょっとした買い物をスマートフォンを出さずにスピーディーに行えるのが魅力です。
        </p>
        <p className="media-card__desc">
          また、レジの決済端末は左側にあることが多いため、Apple Watchを左腕に身に付けていればスムーズにかざして決済を完了できます。
        </p>
        <InfoCard heading="対応している電子決済サービス">
          <li>iD</li>
          <li>QUICPay</li>
          <li>WAON</li>
          <li>nanaco</li>
          <li>Visaのタッチ決済</li>
        </InfoCard>
      </MediaCard>

      {/* 21. PayPayや楽天ペイのQRコード決済を行う */}
      <MediaCard src="/images/content/apple-watch-qr-payment.jpg" alt="Apple WatchでQRコード決済をする様子" title="PayPayや楽天ペイのQRコード決済を行う">
        <p className="media-card__desc">
          Apple Watchは、SuicaやiDといった非接触型決済だけでなく、PayPayや楽天ペイなどのQRコード決済にも対応しています。
        </p>
        <p className="media-card__desc">
          Apple Watchで専用アプリを立ち上げ、表示されたバーコード（またはQRコード）をレジで読み取ってもらうだけで、スピーディーに会計を済ませることができます。
        </p>
        <p className="media-card__desc">
          カバンからiPhoneを探したり、ロックを解除してアプリを開くといった手間がなくなるこの決済体験は、一度慣れると手放せないほど快適です。
        </p>
      </MediaCard>

    </HowtoSection>
  )
}
