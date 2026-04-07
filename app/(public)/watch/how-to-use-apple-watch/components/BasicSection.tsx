import MediaCard from '@/app/components/MediaCard'
import InfoCard from '@/app/components/InfoCard'
import HowtoSection from '@/app/components/HowtoSection'

export default function BasicSection() {
  return (
    <HowtoSection
      id="basic"
      title="Apple Watchでできること【基本機能編】"
      description="日々の生活で役立つApple Watchの基本機能を紹介します。"
    >

      {/* 1. 文字盤のカスタマイズを楽しむ */}
      <MediaCard src="/images/content/photo/apple-watch-face.jpg" alt="Apple Watchの文字盤カスタマイズ" title="文字盤のカスタマイズを楽しむ">
        <p className="media-card__desc">
          Apple Watchには50種類以上もの文字盤が用意されており、気分やシーンに合わせて自分好みのデザインを楽しむことができます。
        </p>
        <p className="media-card__desc">
          文字盤の種類はwatchOSがアップデートされるたびに追加されるため、新作の登場が毎年の楽しみの一つになっています。さらに、文字盤上にはコンプリケーション（天気・予定・心拍数などのウィジェット）を配置でき、よく使う情報にワンタップでアクセスできます。
        </p>
        <p className="media-card__desc">
          通常の時計とは違い、いつまでも飽きが来ないのが大きな魅力と言えます。
        </p>
        <p className="media-card__desc">
          なお、文字盤のデザインを最大限に楽しみたい場合は、<a href="/watch/apple-watch-always-lit/">常時点灯</a>に対応したApple Watchを購入するのがおすすめです。
        </p>
        <p className="media-card__desc">
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
          <a href="https://support.apple.com/ja-jp/guide/watch/apde9218b440/watchos" target="_blank" rel="noopener">Apple Watchの文字盤と機能 – Apple サポート</a>
        </p>
      </MediaCard>

      {/* 2. ベルト・ケースを交換する */}
      <MediaCard src="/images/content/photo/apple-watch-band.jpg" alt="Apple Watchのベルト交換" title="ベルト・ケースを交換する">
        <p className="media-card__desc">
          Apple Watchは、ベルトやケースを自由に交換できるのも大きな魅力の一つです。
        </p>
        <p className="media-card__desc">
          仕事やスポーツ、休日のTPOに応じて使い分ければ、文字盤のデザインとベルトを組み合わせることで全く別の時計のようにカスタマイズが可能です。
        </p>
        <p className="media-card__desc">
          これにより、いつまでも飽きが来ずに楽しめるのがApple Watchの大きなメリットです。
        </p>
      </MediaCard>

      {/* 3. 経路案内で目的地へ向かう */}
      <MediaCard src="" alt="Apple Watchで経路案内を使用する様子" title="経路案内で目的地へ向かう">
        <p className="media-card__desc">
          Apple Watchは、iPhoneで目的地をセットしたり、Apple Watch越しにSiriに目的地を伝えたりすることで、経路案内を利用できます。
        </p>
        <p className="media-card__desc">
          最大の特長は、曲がる場所などを絶妙なタイミングで手首への振動（触覚フィードバック）で知らせてくれる点です。これにより、iPhoneの画面を見続けなくても目的地を目指せるため、非常に安全かつ便利です。
        </p>
        <p className="media-card__desc">
          旅行先や新規の取引先へ向かうときなどに非常に役立つ機能です。
        </p>
      </MediaCard>

      {/* 4. 再生している音楽・動画をコントロールする */}
      <MediaCard src="/images/content/photo/used-lab-image-2.jpg" alt="Apple Watchで音楽をコントロールする様子" title="再生している音楽・動画をコントロールする">
        <p className="media-card__desc">
          Apple Watchは、iPhoneで再生しているApple MusicやSpotifyなどの音楽、動画の再生・停止・スキップを手元でコントロールできます。AirPodsと組み合わせれば、iPhoneをカバンに入れたまま音楽操作が完結します。
        </p>
        <p className="media-card__desc">
          混雑した電車の中やランニング中など、スマートフォンを取り出しにくい状況下でも、手元で瞬時にメディア操作ができるため非常に便利です。作業や運動を中断することなく、快適にコンテンツを楽しめます。
        </p>
      </MediaCard>

      {/* 5. iPhoneの通知を確認する */}
      <MediaCard src="/images/content/photo/used-lab-image-3.jpg" alt="Apple Watchで通知を確認する様子" title="iPhoneの通知を確認する">
        <p className="media-card__desc">
          Apple Watchは、iPhoneアプリからの各種通知を手元で確認することができます。LINEやメール、カレンダーのリマインダーなど、重要な通知を手首の振動（Taptic Engine）で即座に知らせてくれます。
        </p>
        <p className="media-card__desc">
          これにより、わざわざiPhoneを取り出さなくても通知の概要がチェックできるため、何気なくスマートフォンを開いて無駄な操作をしてしまうことがなくなります。通知の確認が効率化され、集中力を維持することに役立ちます。
        </p>
      </MediaCard>

      {/* 6. LINEやショートメッセージの中身を確認する */}
      <MediaCard src="" alt="Apple WatchでLINEを確認する様子" title="LINEやショートメッセージの中身を確認する">
        <p className="media-card__desc">
          Apple Watchは、スマートフォンを開かなくてもLINEやメッセージの内容を確認することができます。
        </p>
        <p className="media-card__desc">
          特筆すべきは、返信のバリエーションが豊富な点です。あらかじめ用意された定型文でワンタッチ返信ができるのはもちろん、<strong>精度の高い「音声入力」や、画面上での「フリック入力（日本語キーボード）」</strong>にも対応しています。
        </p>
        <p className="media-card__desc">
          わざわざiPhoneを取り出すまでもない「了解！」「あとで連絡するね」といった簡単な返信なら、手首だけで完結できるため非常にスマートです。
        </p>
      </MediaCard>

      {/* 7. 振動アラームが使える */}
      <MediaCard src="/images/content/photo/apple-watch-alarm.jpg" alt="Apple Watchの振動アラーム" title="振動アラームが使える">
        <p className="media-card__desc">
          Apple Watchは、振動で時間を知らせてくれるアラーム機能を搭載しています。
        </p>
        <p className="media-card__desc">
          オフィスや電車内での仮眠時など、スマートフォンでアラームを鳴らすのがためらわれる状況でも、Apple Watchの振動アラームなら音を出さずに起きることができます。
        </p>
        <p className="media-card__desc">
          手首に直接振動が伝わるため非常に目覚めが良く、ヘビーユーズしている方が多い機能の一つです。
        </p>
      </MediaCard>

      {/* 8. Siriでタイマーを起動する */}
      <MediaCard src="" alt="Apple WatchでSiriを使う様子" title="Siriでタイマーを起動する">
        <p className="media-card__desc">
          Apple Watchは、Siriを通じてさまざまなアプリを音声で操作することができます。
        </p>
        <p className="media-card__desc">
          その中でも、特に便利なのがタイマーの起動です。Digital Crown（竜頭）を長押しするか、Apple Watchのマイクを口元に近づけ「タイマーを〇〇分にセット」と言うだけで、すぐに時間を測れます。
        </p>
        <p className="media-card__desc">
          料理中など手が塞がっている状況で、非常に重宝する機能です。
        </p>
      </MediaCard>

      {/* 9. 電話に出る・かける */}
      <MediaCard src="" alt="Apple Watchで電話する様子" title="電話に出る・かける">
        <p className="media-card__desc">
          Apple Watchがあれば、iPhoneにかかってきた電話に出たり、Apple Watchから直接電話をかけたりすることができます。
        </p>
        <p className="media-card__desc">
          特に、リビングなど離れた場所にスマートフォンを置いている際、わざわざ取りに行かなくても手元で着信に対応できるのは非常に便利です。家の中でスマートフォンを探す手間を省き、すぐに通話を開始できます。
        </p>
      </MediaCard>

      {/* 10. iPhoneのカメラでリモート撮影する */}
      <MediaCard src="" alt="Apple WatchでiPhoneカメラをリモート操作する様子" title="iPhoneのカメラでリモート撮影する">
        <p className="media-card__desc">
          Apple Watchがあれば、iPhoneカメラのシャッター操作を遠隔で行うことが可能です。
        </p>
        <p className="media-card__desc">
          アプリを立ち上げるとiPhoneのカメラが映している映像をリアルタイムで確認しながらシャッターを切れるので、アングル調整も完璧ですし、集合写真や全身の記念写真を誰にも頼まず簡単に撮影できます。
        </p>
        <p className="media-card__desc">
          旅行やソロキャンプなどのシーンで、撮影の自由度を格段に高めてくれる便利な機能です。
        </p>
      </MediaCard>

      {/* 11. トランシーバーアプリで会話する */}
      <MediaCard src="" alt="Apple Watchのトランシーバー機能" title="トランシーバーアプリで会話する">
        <p className="media-card__desc">
          Apple Watchには、トランシーバー機能が搭載されており、距離が離れていても相互通話することが可能です。
        </p>
        <p className="media-card__desc">
          距離が離れた場所にいる人と電話よりもラフにコミュニケーションを取ることができるのが魅力です。
        </p>
        <p className="media-card__desc">
          1階から2階にいる家族に用事を伝える時に大声を出したり、わざわざ電話する必要がなくなります。また、広大なキャンプ場やイベント会場などで友人とはぐれてしまったときなどにも活用できます。
        </p>
        <InfoCard heading="トランシーバーの利用条件">
          <li>お互いがApple Watchを所有している</li>
          <li>Apple WatchをWi-Fi接続中またはiPhoneとペアリング中</li>
        </InfoCard>
      </MediaCard>

      {/* 12. 懐中電灯・フラッシュライトとして使う */}
      <MediaCard src="" alt="Apple Watchの懐中電灯機能" title="懐中電灯・フラッシュライトとして使う">
        <p className="media-card__desc">
          Apple Watchには、手元を照らすのに便利な3種類の懐中電灯（フラッシュライト）モードが搭載されています。
        </p>
        <p className="media-card__desc u-mt-sm">
          これらのモードは、コントロールセンターから簡単に切り替えが可能です。暗闇での安全確保から、夜間の作業まで、様々なシーンで役立ちます。
        </p>
        <dl className="glossary-box m-card u-mt-sm">
          <div className="glossary-item">
            <dt className="glossary-item-title">白く点灯</dt>
            <dd className="glossary-item-desc">暗闘の道や手元作業、停電時の補助照明に。一般的な懐中電灯として使えます。</dd>
          </div>
          <div className="glossary-item">
            <dt className="glossary-item-title">白く点滅</dt>
            <dd className="glossary-item-desc">夜間のランニングやウォーキング時に、周囲に存在を知らせるセーフティーライトとして活用。</dd>
          </div>
          <div className="glossary-item">
            <dt className="glossary-item-title">赤く点灯</dt>
            <dd className="glossary-item-desc">視界を妨げずに手元を確認したい時に。天体観測や家族を起こしたくない場面で便利。</dd>
          </div>
        </dl>
      </MediaCard>

    </HowtoSection>
  )
}
