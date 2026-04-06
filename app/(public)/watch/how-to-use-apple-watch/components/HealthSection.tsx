import MediaCard from '@/app/components/MediaCard'
import HowtoSection from '@/app/components/HowtoSection'

export default function HealthSection() {
  return (
    <HowtoSection
      id="health"
      title="Apple Watchでできること【健康管理・ヘルスケア編】"
      description={<>Apple Watchは健康管理という点において、Apple Watchでしか実現できない機能が多数あります。<br />ここではApple Watchがあればできる健康管理周りの使い道を紹介します。</>}
    >

      {/* 13. フィットネスアプリで1日の活動量をチェック */}
      <MediaCard src="/images/content/photo/used-lab-image.jpg" alt="Apple Watchのアクティビティリング" title="フィットネスアプリで1日の活動量をチェック">
        <p className="media-card__desc">
          Apple Watchでの健康管理において最も活躍するのが、アクティビティリングです。
        </p>
        <p className="media-card__desc">
          これは、以下の3つの活動目標を自動的に記録し、達成度をリングで視覚化します。リングの進捗をチェックすることで、運動時間が少なかったら一駅歩いて帰宅、消費カロリーが少なかったら食事量をセーブといった調整がしやすくなります。
        </p>
        <dl className="m-card vs-card u-mt-sm">
          <dt>ムーブ（赤）消費カロリー</dt>
          <dd>アクティブな活動による消費カロリー</dd>
          <dt>エクササイズ（緑）運動時間</dt>
          <dd>早歩き以上の運動をした時間</dd>
          <dt>スタンド（青）立ち時間</dt>
          <dd>1時間ごとに立ち上がった回数</dd>
        </dl>
      </MediaCard>

      {/* 14. ワークアウトで運動の記録を取る */}
      <MediaCard src="/images/content/photo/apple-watch-workout.jpg" alt="Apple Watchでワークアウトを記録する様子" title="ワークアウトで運動の記録を取る">
        <p className="media-card__desc">
          Apple Watchのワークアウト機能は、100種類以上のスポーツに対応し、活動量を正確に計測します。
        </p>
        <p className="media-card__desc">
          ランニングを例にとると、運動時間や距離、消費カロリーといった基本情報に加え、平均心拍数やランニングの効率を示す詳細な指標（垂直振動など）まで自動で記録します。Apple Watchは50m防水（WR50）に対応しているため、水泳のワークアウト記録にも活用できます。
        </p>
        <p className="media-card__desc">
          これらの詳細な運動実績は、モチベーション維持やパフォーマンスの客観的な向上に役立つ、健康管理の核となる機能です。
        </p>
      </MediaCard>

      {/* 15. 睡眠アプリで睡眠の質をチェック */}
      <MediaCard src="" alt="Apple Watchの睡眠トラッキング" title="睡眠アプリで睡眠の質をチェック">
        <p className="media-card__desc">
          Apple Watchを装着して寝るだけで、深い睡眠やレム睡眠といった「睡眠のステージ」を詳細に記録できます。就寝前にバッテリーを80%以上まで充電しておけば、一晩の睡眠記録には十分持ちます。より詳細な分析ができる「<a href="https://apps.apple.com/jp/app/autosleep-watch%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E7%9D%A1%E7%9C%A0%E3%82%92%E8%87%AA%E5%8B%95%E3%81%A7%E8%BF%BD%E8%B7%A1%E3%81%97%E3%81%BE%E3%81%99/id1164801111" target="_blank" rel="noopener">Auto Sleep</a>」というアプリもおすすめです。
        </p>
        <p className="media-card__desc">
          また、最新のモデルでは<strong>「睡眠時無呼吸の兆候」を検知して通知してくれる機能</strong>も搭載されました。
        </p>
        <p className="media-card__desc">
          「自分にとって最適な睡眠時間はどのくらいか」「体に異変はないか」を客観的な数値で把握できるため、日中のパフォーマンスを上げたい方には必須の機能と言えます。
        </p>
      </MediaCard>

      {/* 16. 転倒検出 & 緊急通報機能で万が一に備える */}
      <MediaCard src="" alt="Apple Watchの転倒検出機能" title="転倒検出 &amp; 緊急通報機能で万が一に備える">
        <p className="media-card__desc">
          Apple Watchは、内蔵センサーにより着用者の激しい転倒を検知する機能を持っています。
        </p>
        <p className="media-card__desc">
          転倒後、着用者から約1分間何の動作も確認されない場合、自動的に緊急通報サービスに連絡されます。同時に、登録された緊急連絡先には、着用者の位置情報と転倒した場所を添えたメッセージが送信されます。
        </p>
        <p className="media-card__desc">
          さらに、Apple Watch Series 8以降では自動車の<strong>衝突事故検出</strong>機能も搭載されており、重大な衝突を検知した際にも自動で緊急通報を行います。一人でいる時の万が一の事態に備え、命を守る保険として活用できる重要な安全機能です。
        </p>
      </MediaCard>

      {/* 17. 血中酸素濃度を測定する */}
      <MediaCard src="" alt="Apple Watchの血中酸素濃度測定" title="血中酸素濃度を測定する">
        <p className="media-card__desc">
          血液中に取り込まれている酸素のレベル（血中酸素飽和度：SpO2）を計測する血中酸素ウェルネス機能です。
        </p>
        <p className="media-card__desc">
          これは、赤色光と赤外光を用いて動脈血中の酸素濃度を測定するもので、この数値が高いほど、全身に酸素が効率よく運ばれていることを示します。
        </p>
        <p className="media-card__desc">
          特に、睡眠中や安静時の測定データは、呼吸器や循環器系の健康状態を把握する上での重要な指標となります。日常的に自身のウェルネス状態を把握し、健康維持に役立てるための先進的な機能です。
        </p>
      </MediaCard>

      {/* 18. 電気心拍センサーで心拍数をチェック */}
      <MediaCard src="" alt="Apple Watchの心拍センサー" title="電気心拍センサーで心拍数をチェック">
        <p className="media-card__desc">
          Apple Watchに搭載されている電気心拍センサーは、単なる心拍数の記録に留まらない、重要な健康監視機能を提供します。
        </p>
        <p className="media-card__desc">
          このセンサーは、ユーザーの心拍数を継続的に記録・監視し、安静時や活動中において異常な心拍の乱れや不規則なリズム（心房細動の兆候など）を検知すると、即座に通知で知らせてくれます。
        </p>
        <p className="media-card__desc">
          これにより、自覚症状がない初期段階でも、体の異変に気づくことが可能です。
        </p>
      </MediaCard>

    </HowtoSection>
  )
}
