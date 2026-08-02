import MediaCard from '@/app/components/MediaCard'
import InfoCard from '@/app/components/InfoCard'
import HowtoSection from '@/app/components/HowtoSection'

export default function EntertainmentSection() {
  return (
    <HowtoSection
      id="entertainment"
      title="iPadがあればできること【エンタメ編】"
      description={<>iPadの使用方法として、最も一般的でイメージされやすいのが「エンタメを楽しむ」という使い方ではないでしょうか？<br />ここでは、iPadならではのエンタメの楽しみ方を4つ紹介します。</>}
    >

      {/* 1. 大画面で動画鑑賞を楽しむ */}
      <MediaCard src="/images/content/photo/magextand-m-use-low-table.jpg" alt="iPadで動画鑑賞する様子" title="大画面で動画鑑賞を楽しむ">
        <p className="media-card__desc">
          iPadは臨場感に溢れた映像コンテンツを楽しむのに最適なデバイスです。
        </p>
        <p className="media-card__desc">
          スマホだと見落としがちな演者の細かい表情や演出効果も大画面のiPadならじっくり楽しむことができます。
        </p>
        <p className="media-card__desc">
          さらにiPadでの動画鑑賞には楽な姿勢で動画を視聴しやすくなったり、目が疲れづらくなるメリットも。コンテンツを十二分に楽しめて体にも優しいなんて一石二鳥です。
        </p>
        <InfoCard heading="おすすめのVODアプリ">
          <li><a href="https://amzn.to/3ChAoYt" rel="nofollow sponsored noopener" target="_blank">Amazonプライムビデオ</a></li>
          <li><a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3283749&pid=888488282" rel="nofollow sponsored noopener" target="_blank">hulu</a></li>
          <li><a href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3283749&pid=888488283" rel="nofollow sponsored noopener" target="_blank">U-NEXT</a></li>
          <li><a href="https://www.netflix.com/jp/" rel="nofollow noopener" target="_blank">Netflix</a></li>
        </InfoCard>
      </MediaCard>

      {/* 2. 電子書籍や漫画を読む */}
      <MediaCard src="/images/content/photo/ipad-mini-6-reading.jpg" alt="iPadで電子書籍や漫画を読む様子" title="電子書籍や漫画を読む">
        <p className="media-card__desc">
          スマホでの読書は、画面の小ささゆえに拡大・縮小を繰り返す必要があり、どうしても視覚的なストレスが溜まりがちです。
        </p>
        <p className="media-card__desc">
          また、電子書籍の醍醐味である「マーカー機能」も、スマホの画面サイズでは誤操作が起きやすく、集中力を削がれる原因にもなります。
        </p>
        <p className="media-card__desc">
          その点、iPadなら本物の雑誌を広げるような感覚でコンテンツに没入できます。画面が広い分、ペンや指でのハイライト操作も驚くほどスムーズ。<strong>電子書籍を日常的に楽しむ習慣がある方にとって、iPadの導入は読書体験を劇的にアップデートする最良の投資</strong>になります。
        </p>
        <p className="media-card__desc">
          漫画についても、iPadのLiquid Retinaディスプレイなら見開きページの細かい描き込みまで鮮明に表示されます。ジャンプ+やピッコマなどの無料漫画アプリも充実しており、通勤・通学時間の暇つぶしから長編作品のイッキ読みまで快適に楽しめます。
        </p>
        <InfoCard heading="おすすめの電子書籍・漫画アプリ">
          <li><a href="https://amzn.to/3YmpriY" rel="nofollow sponsored noopener" target="_blank">Kindle</a></li>
          <li><a href="https://px.a8.net/svt/ejp?a8mat=3BI37W+HV0XE+3ZNE+614CY" rel="nofollow sponsored noopener" target="_blank">楽天マガジン</a></li>
          <li><a href="https://apps.apple.com/jp/app/i%E6%96%87%E5%BA%ABhd/id369111608" target="_blank" rel="noopener">i文庫HD</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E5%B0%91%E5%B9%B4%E3%82%B8%E3%83%A3%E3%83%B3%E3%83%97-%E4%BA%BA%E6%B0%97%E6%BC%AB%E7%94%BB%E3%81%8C%E8%AA%AD%E3%82%81%E3%82%8B%E9%9B%91%E8%AA%8C%E3%82%A2%E3%83%97%E3%83%AA/id594237344" target="_blank" rel="noopener">少年ジャンプ+</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E3%83%94%E3%83%83%E3%82%B3%E3%83%9E-%E4%BA%BA%E6%B0%97%E3%83%9E%E3%83%B3%E3%82%AC%E3%81%8C%E5%BE%85%E3%81%A6%E3%81%B0%E7%84%A1%E6%96%99%E3%81%AE%E6%BC%AB%E7%94%BB%E3%82%A2%E3%83%97%E3%83%AA/id1418859433" target="_blank" rel="noopener">ピッコマ</a></li>
        </InfoCard>
      </MediaCard>

      {/* 3. ゲームを楽しむ */}
      <MediaCard src="/images/content/photo/ipad-game.jpg" alt="iPadでゲームを楽しむ様子" title="ゲームを楽しむ">
        <p className="media-card__desc">
          繊細なグラフィックや美しい色彩を堪能したいなら、iPadの大画面は外せません。
        </p>
        <p className="media-card__desc">
          例えば『三国志真戦』のような戦略シミュレーションでは、クオリティの高い戦闘シーンを大画面でよりダイナミックに楽しめます。また、オープンワールドのRPGでも、スマホの小さな画面では見落としがちな細かなテクスチャや美しいライティングを存分に味わうことが可能です。
        </p>
        <p className="media-card__desc">
          複雑なUI（ボタン配置）に画面を占領されるストレスからも解放され、純粋にゲームの世界観に没入できる。<strong>iPhoneでのプレイに少しでも窮屈さを感じているなら、ぜひiPadでのゲーム体験を試してみてください。</strong>
        </p>
        <InfoCard heading="おすすめのゲームアプリ">
          <li><a href="https://genshin.hoyoverse.com/ja" rel="nofollow noopener" target="_blank">原神</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E4%B8%89%E5%9C%8B%E5%BF%97-%E7%9C%9F%E6%88%A6/id1524742294" rel="nofollow noopener" target="_blank">三国志真戦</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E3%83%9E%E3%83%AA%E3%82%AA%E3%82%AB%E3%83%BC%E3%83%88-%E3%83%84%E3%82%A2%E3%83%BC/id1293634699" rel="nofollow noopener" target="_blank">マリオカートツアー</a></li>
        </InfoCard>
      </MediaCard>

      {/* 4. 地上波テレビを視聴する */}
      <MediaCard src="/images/content/photo/nasne-use-ipad-1.jpg" alt="iPad + nasneで地上波テレビを見る様子" title="地上波テレビを視聴する">
        <p className="media-card__desc">
          iPadはネットワークレコーダーを導入することで、テレビ視聴が可能になります。
        </p>
        <p className="media-card__desc">
          家の中どこでもテレビを視聴できる環境はとても魅力的ですし、たまにしかテレビは見ないから所有したくないなんていう方にもうってつけ。
        </p>
        <p className="media-card__desc">
          おすすめのネットワークレコーダーは<a href="https://amzn.to/3YmsyaI" rel="nofollow sponsored noopener" target="_blank"><strong>nasne</strong></a>というアイテム。
        </p>
        <InfoCard heading="nasneのできること" icon="fa-solid fa-satellite-dish">
          <li>iPhone、iPad、Macからテレビが見れる</li>
          <li>番組録画ができる</li>
          <li>録画した番組を家の外から視聴できる</li>
          <li>アプリの動作も軽くて使いやすい</li>
        </InfoCard>
        <p className="media-card__desc u-mt-md">
          我が家でも大活躍しているアイテムなので、気になった方はぜひチェックしてみてください！
        </p>
      </MediaCard>

    </HowtoSection>
  )
}
