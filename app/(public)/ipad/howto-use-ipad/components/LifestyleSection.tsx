import MediaCard from '@/app/components/MediaCard'
import InfoCard from '@/app/components/InfoCard'
import HowtoSection from '@/app/components/HowtoSection'

export default function LifestyleSection() {
  return (
    <HowtoSection
      id="lifestyle"
      title="iPadがあればできること【暮らし編】"
      description="iPadは、普段の生活をより便利にするためにも役に立ちます。ステージマネージャーやSplit Viewなどのマルチタスク機能を活用すれば、複数のアプリを同時に使い分けることも可能。ここからは、iPadを生活に役立てる方法について8つ紹介します。"
    >

      {/* 5. ウェブブラウザで調べ物をする */}
      <MediaCard src="/images/content/photo/ipad-split-view.jpg" alt="Split Viewで調べ物をする様子" title="ウェブブラウザで調べ物をする" height={158}>
        <p className="media-card__desc">
          iPadのブラウザはPC用サイトをそのまま表示できるため、スマホサイトのように何度もスクロールを繰り返す必要がありません。一度に目に入る情報量が圧倒的に多く、必要なデータに素早くアクセスできるのが最大の強みです。
        </p>
        <p className="media-card__desc">
          さらに強力なのが、画面を2分割する「Split View（スプリットビュー）」機能。左半分でブラウザを開き、右半分にメモ帳を配置すれば、調べた内容をシームレスに書き写したり、リンクをコピーしたりといった作業が淀みなく行えます。
        </p>
        <p className="media-card__desc">
          スマホでの煩わしいアプリ切り替えから解放され、アウトプットの質も自然と高まるはずです。
        </p>
        <InfoCard heading="おすすめのウェブブラウザ">
          <li><a href="https://apps.apple.com/jp/app/google-chrome-%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6/id535886823" rel="nofollow noopener" target="_blank">Chrome</a></li>
          <li><a href="https://apps.apple.com/jp/app/safari/id1146562112" rel="nofollow noopener" target="_blank">Safari</a></li>
          <li><a href="https://apps.apple.com/jp/app/brave-adblock%E3%81%A7%E5%BA%83%E5%91%8A%E3%82%92%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%99%E3%82%8B%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6/id1052879175" rel="nofollow noopener" target="_blank">Brave</a></li>
        </InfoCard>
      </MediaCard>

      {/* 6. カーナビ・地図として活用する */}
      <MediaCard src="/images/content/photo/ipad-car-navi-02.jpg" alt="iPad miniをカーナビ化する様子" title="カーナビ・地図として活用する">
        <p className="media-card__desc">
          iPadをカーナビ化すれば、従来の車載ナビにありがちな「地図更新のコスト」や「操作性の悪さ」といった不満を一気に解消できます。
        </p>
        <p className="media-card__desc">
          GoogleマップやYahoo!カーナビなら常に最新の地図が無料で使え、音楽もサブスクで完結するため利便性は圧倒的。
        </p>
        <p className="media-card__desc">
          ただし、カーナビとして使うなら<strong>「セルラーモデル」が必須</strong>。Wi-FiモデルはGPSを内蔵しておらず、正確な位置情報を取得できないため注意してください。
        </p>
        <InfoCard heading="おすすめのカーナビアプリ">
          <li><a href="https://apps.apple.com/jp/app/google-%E3%83%9E%E3%83%83%E3%83%97-%E4%B9%97%E6%8F%9B%E6%A1%88%E5%86%85-%E3%82%B0%E3%83%AB%E3%83%A1/id585027354" target="_blank" rel="noopener">Googleマップ</a></li>
          <li><a href="https://apps.apple.com/jp/app/yahoo-%E3%82%AB%E3%83%BC%E3%83%8A%E3%83%93/id890808217" target="_blank" rel="noopener">Yahoo!カーナビ</a></li>
        </InfoCard>
      </MediaCard>

      {/* 7. 料理レシピを見る */}
      <MediaCard src="/images/content/photo/ipad-11-pro-m4-15.jpg" alt="クックパッドでレシピを調べる様子" title="料理レシピを見る">
        <p className="media-card__desc">
          普段料理をする際にお世話になっている人も多いであろう「クラシル」や「クックパッド」といったレシピアプリ。スマホで閲覧すると、文字が小さくて詳細部分が見えづらく、画面の拡大縮小をすることってよくあると思います。
        </p>
        <p className="media-card__desc">
          この場合一旦調理器具を置かなければならず、作業効率が下がってしまうのがデメリット。iPadであれば大きな画面にレシピ情報を表示できるので、手元の調理作業を止めることなく、調理をすすめることができます。
        </p>
        <InfoCard heading="おすすめの料理レシピアプリ">
          <li><a href="https://apps.apple.com/jp/app/%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB-%E3%83%AC%E3%82%B7%E3%83%94%E5%8B%95%E7%94%BB%E3%81%A7%E6%96%99%E7%90%86%E3%81%8C%E3%81%8A%E3%81%84%E3%81%97%E3%81%8F%E4%BD%9C%E3%82%8C%E3%82%8B/id1059134258" target="_blank" rel="noopener">クラシル</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E3%82%AF%E3%83%83%E3%82%AF%E3%83%91%E3%83%83%E3%83%89-no-1%E6%96%99%E7%90%86%E3%83%AC%E3%82%B7%E3%83%94%E6%A4%9C%E7%B4%A2%E3%82%A2%E3%83%97%E3%83%AA/id340368403" target="_blank" rel="noopener">クックパッド</a></li>
        </InfoCard>
      </MediaCard>

      {/* 8. 新聞を読む */}
      <MediaCard src="/images/content/photo/ipad-11-pro-m4-16.jpg" alt="iPadで朝日新聞を読む様子" title="新聞を読む">
        <p className="media-card__desc">
          iPadなら新聞もスマートに持ち運べます。左右のスワイプ操作だけでサクサク読み進められるため、混雑した通勤電車や旅行先でも場所を取りません。読み終わった新聞を保管したり、捨てに行ったりする手間が省けるのも、電子版ならではの大きな魅力です。
        </p>
        <p className="media-card__desc">
          さらに、アプリ版には紙の新聞にはない便利な機能が備わっており、情報収集の効率が劇的に向上します。
        </p>
        <dl className="m-card vs-card u-mt-sm">
          <dt>速報プッシュ通知</dt>
          <dd>重要ニュースをリアルタイムで受信。翌朝の朝刊を待つことなく、常に最新情報をいち早くキャッチできます。</dd>
          <dt>キーワード登録機能</dt>
          <dd>興味のある業界や企業を登録すれば、関連記事を自動で抽出。膨大な紙面から探す手間を省きます。</dd>
          <dt>紙面ビューアー機能</dt>
          <dd>実際の紙面と同じレイアウトで閲覧が可能。iPadの画面を活かして全体を俯瞰できます。</dd>
        </dl>
        <p className="media-card__desc u-mt-md">
          もし、現在紙の新聞を購読されているなら、この機会にiPadでの「スマートな購読スタイル」に切り替えてみてはいかがでしょうか。
        </p>
        <InfoCard heading="おすすめの新聞アプリ">
          <li><a href="https://apps.apple.com/jp/app/%E6%97%A5%E6%9C%AC%E7%B5%8C%E6%B8%88%E6%96%B0%E8%81%9E-%E7%B4%99%E9%9D%A2%E3%83%93%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%BC/id503424369" target="_blank" rel="noopener">日本経済新聞 電子版</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E8%AA%AD%E5%A3%B2%E6%96%B0%E8%81%9E%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3-yol/id1514737192" target="_blank" rel="noopener">読売新聞オンライン</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E7%B4%99%E9%9D%A2%E3%83%93%E3%83%A5%E3%83%BC%E3%82%A2%E3%83%BC/id1536374601" target="_blank" rel="noopener">朝日新聞デジタル</a></li>
        </InfoCard>
      </MediaCard>

      {/* 9. スケジュールを管理する */}
      <MediaCard src="/images/content/ipad-schedule.jpg" alt="iPadでスケジュール管理する様子" title="スケジュールを管理する">
        <p className="media-card__desc">
          スマホでは見づらい1ヶ月の予定も、iPadなら一画面でスッキリと俯瞰できます。情報量の多さを活かしたスケジュール管理は、iPadならではの強みです。
        </p>
        <dl className="m-card vs-card u-mt-sm">
          <dt>FirstSeedCalendar</dt>
          <dd>日本企業が開発した、シンプルかつ高機能な定番アプリ。カスタマイズ性が高く、自分好みの見やすいカレンダーを作れます。</dd>
          <dt>Planner for iPad</dt>
          <dd>Apple Pencilでの手書きに特化したアプリ。付箋やスタンプでデコレーションもできるため、本物のシステム手帳のような感覚で楽しめます。</dd>
        </dl>
        <p className="media-card__desc u-mt-md">
          「予定を確認する」だけでなく、iPadなら「予定を書き込む楽しさ」まで味わえるようになります。
        </p>
        <InfoCard heading="おすすめのスケジュール管理アプリ">
          <li><a href="https://apps.apple.com/jp/app/id1321260278" target="_blank" rel="noopener">FirstSeedCalendar</a></li>
          <li><a href="https://apps.apple.com/jp/app/id1246635949" target="_blank" rel="noopener">Planner for iPad</a></li>
        </InfoCard>
      </MediaCard>

      {/* 10. テレビ電話をする */}
      <MediaCard src="/images/content/photo/centerflame.webp" alt="iPadでテレビ電話をする様子" title="テレビ電話をする">
        <p className="media-card__desc">
          iPadなら画面が大きいため、スマホでは見えにくい相手の表情もハッキリ分かります。複数人での通話や、細かな反応を確認したいシーンでもコミュニケーションが非常にスムーズです。
        </p>
        <p className="media-card__desc">
          多くのiPadに搭載されているセンターフレーム機能も見逃せません。
        </p>
        <dl className="m-card vs-card u-mt-sm">
          <dt>
            <i className="fa-solid fa-video" aria-hidden="true"></i>
            センターフレーム機能
          </dt>
          <dd>超広角フロントカメラが、動く自分を常に追いかけて自動でフレーム内に収めてくれる機能。通話中に少し動いても最適な画角を保ち続けてくれるため、手放しでのビデオ通話も快適に行えます。</dd>
        </dl>
        <p className="media-card__desc u-mt-md">
          手ぶらでのビデオ通話や、家族との近況報告など、iPadがあるだけでテレビ電話のストレスはぐっと軽減されるはずです。
        </p>
        <InfoCard heading="おすすめのビデオチャットアプリ">
          <li><a href="https://apps.apple.com/jp/app/facetime/id1110145091" target="_blank" rel="noopener">FaceTime</a></li>
          <li><a href="https://apps.apple.com/jp/app/zoom-one-platform-to-connect/id546505307" target="_blank" rel="noopener">ZOOM</a></li>
        </InfoCard>
      </MediaCard>

      {/* 11. 置き時計として使う */}
      <MediaCard src="/images/content/photo/ipad-md-clock.jpg" alt="iPadを置き時計として使用する様子" title="置き時計として使う" height={158}>
        <p className="media-card__desc">
          専用アプリを入れれば、iPadは便利な置き時計になります。壁掛け時計がない部屋でも、スマホを取り出さずに時刻を確認できるのがメリットです。
        </p>
        <p className="media-card__desc">
          中でもおすすめは「MD Clock」。デザインがおしゃれなだけでなく、無料版でも広告が表示されないため、インテリアを損なわず快適に使えます。
        </p>
        <p className="media-card__desc">
          なお、時計としての常時表示は電池を消耗するため、充電しながらの使用がおすすめです。
        </p>
        <InfoCard heading="おすすめの置き時計アプリ">
          <li><a href="https://apps.apple.com/jp/app/md-clock-live-in-the-present/id1536358464" target="_blank" rel="noopener">MD Clock</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E7%84%A1%E9%99%90%E6%99%82%E8%A8%88-%E8%A6%8B%E3%82%84%E3%81%99%E3%81%84%E6%99%82%E8%A8%88/id1064833509" target="_blank" rel="noopener">無限時計</a></li>
          <li><a href="https://apps.apple.com/jp/app/flip-clock-%E3%83%9B%E3%83%BC%E3%83%A0%E7%94%BB%E9%9D%A2%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E6%99%82%E8%A8%88%E3%82%A6%E3%82%A3%E3%82%B8%E3%82%A7%E3%83%83%E3%83%88/id1181028777" target="_blank" rel="noopener">FlipClock</a></li>
        </InfoCard>
      </MediaCard>

      {/* 12. フォトフレームとして使用する */}
      <MediaCard src="/images/content/ipad-photo-frame.jpg" alt="iPadをフォトフレームとして使用する様子" title="フォトフレームとして使用する">
        <p className="media-card__desc">
          iPadに標準搭載されている「スライドショー機能」やサードパーティ製の専用アプリを活用すれば、iPadをデジタルフォトフレームとして使うことができます。
        </p>
        <p className="media-card__desc">
          Wi-Fi接続が可能なデジタルフォトフレームを新しく購入すると1万円〜2万円ほどが相場ですが、iPadがあれば同じ機能を無料で実現できるのは嬉しいポイント。
        </p>
        <p className="media-card__desc">
          iPadの高品質なディスプレイを活かして、思い出の写真をインテリアの一部として鮮やかに映し出すことが可能なのは大きなメリットです。
        </p>
        <InfoCard heading="おすすめのデジタルフォトフレームアプリ">
          <li><a href="https://apps.apple.com/jp/app/%E3%81%B5%E3%81%89%E3%81%A8%E3%82%86%E3%82%89-%E5%86%99%E7%9C%9F%E9%91%91%E8%B3%9E-%E3%83%87%E3%82%A3%E3%82%B9%E3%83%97%E3%83%AC%E3%82%A4%E3%81%AB%E6%9C%80%E9%81%A9/id936205747" target="_blank" rel="noopener">ふぉとゆら</a></li>
          <li><a href="https://apps.apple.com/jp/app/photoframe-simple/id824851969" target="_blank" rel="noopener">Photo Frame Simple</a></li>
          <li><a href="https://apps.apple.com/jp/app/%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%83%95%E3%82%A9%E3%83%88%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%EF%BD%90%EF%BD%92%EF%BD%8F-%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%89%E3%82%B7%E3%83%A7%E3%83%BC%E3%82%AF%E3%83%AA%E3%82%A8%E3%83%BC%E3%82%BF%E3%83%BC/id1219786089" target="_blank" rel="noopener">デジタルフォトフレームPRO</a></li>
        </InfoCard>
      </MediaCard>

    </HowtoSection>
  )
}
