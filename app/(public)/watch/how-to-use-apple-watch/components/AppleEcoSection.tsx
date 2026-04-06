import MediaCard from '@/app/components/MediaCard'
import HowtoSection from '@/app/components/HowtoSection'

export default function AppleEcoSection() {
  return (
    <HowtoSection
      id="apple-eco"
      title="Apple Watchでできること【Apple製品連携編】"
      description={<>Apple Watchはその他Apple製品との連携も長けているのが特徴です。<br />ここではApple Watchがあればできる代表的なApple製品連携を4つ紹介します。</>}
    >

      {/* 22. 遠隔でiPhoneを鳴らして捜索（iPhoneを探す） */}
      <MediaCard src="/images/content/photo/apple-watch-find-iphone.jpg" alt="Apple WatchでiPhoneを探す" title="遠隔でiPhoneを鳴らして捜索（iPhoneを探す）">
        <p className="media-card__desc">
          日常生活で、ふと手元にiPhoneが見当たらなくなり、「あれ、どこに置いたっけ？」となるシーンは少なくありません。
        </p>
        <p className="media-card__desc">
          そんな時に便利なのが、Apple Watchの<strong>「iPhoneを探す」機能です。Apple Watchのコントロールセンターからスマホマークをタップすれば、iPhoneを遠隔で大音量で鳴らす</strong>ことができます。
        </p>
        <p className="media-card__desc">
          これにより、自宅内やカバンの中など、効率よくiPhoneを捜索し、すぐに見つけ出すことが可能です。
        </p>
      </MediaCard>

      {/* 23. 置き忘れ防止通知 */}
      <MediaCard src="/images/content/photo/apple-watch-airtag.jpg" alt="Apple WatchとAirTagの連携" title="置き忘れ防止通知">
        <p className="media-card__desc">
          Apple Watchは、「探す」機能で管理されているデバイス（iPhoneなど）や、AirTagのついた貴重品が手元から離れた時に、すぐに通知を受け取ることができます。
        </p>
        <p className="media-card__desc">
          この機能により、貴重品の置き忘れにいち早く気がつくことができるため、紛失防止に非常に効果的です。
        </p>
        <p className="media-card__desc">
          大切なものをどこかに忘れてしまうという心配を減らすことができます。
        </p>
      </MediaCard>

      {/* 24. iPhoneのロック画面を解除する */}
      <MediaCard src="" alt="Apple WatchでiPhoneのロックを解除する様子" title="iPhoneのロック画面を解除する">
        <p className="media-card__desc">
          iPhoneのFace ID（顔認証）は非常に優秀ですが、フルフェイスのヘルメットを被っていたり、サングラスをしていて認証が通りにくい場面も稀にあります。
        </p>
        <p className="media-card__desc">
          そんな時、Apple Watchを身につけていれば、顔認証をスキップして自動でiPhoneのロックを解除することが可能です。
        </p>
        <p className="media-card__desc">
          認証に失敗してパスコードを入力する手間が省けるため、あらゆるシーンでストレスなくiPhoneを使い始めることができます。
        </p>
      </MediaCard>

      {/* 25. MacBookのロックを解除する */}
      <MediaCard src="/images/content/photo/apple-watch-unlock-macbook.jpg" alt="Apple WatchでMacBookのロックを解除する様子" title="MacBookのロックを解除する">
        <p className="media-card__desc">
          MacBookのロック解除は、パスワードやTouch IDが一般的ですが、Apple Watchがあれば作業再開が格段にスピーディーになります。
        </p>
        <p className="media-card__desc">
          Apple Watchを身につけてMacBookに近づくだけで、自動でロックが解除されるため、認証の手間が一切不要です。
        </p>
        <p className="media-card__desc">
          特に、MacBookを外部モニター接続（クラムシェルモード）で使う方にとって、この機能は非常に役立ちます。MacBookに近づいた際にApple Watchが軽く振動し、解錠を知らせてくれる心地よい感覚も魅力の一つです。
        </p>
      </MediaCard>

    </HowtoSection>
  )
}
