import MediaCard from '@/app/components/MediaCard'
import InfoCard from '@/app/components/InfoCard'
import HowtoSection from '@/app/components/HowtoSection'

export default function CreativeSection() {
  return (
    <HowtoSection
      id="creative"
      title="iPadがあればできること【クリエイティブ編】"
      description={<>iPadはクリエイティブな活動とも、相性が良いデバイスです。特にM4チップ搭載のiPad ProはTandem OLEDディスプレイによる圧倒的な色精度を誇り、Apple Pencil Proの触覚フィードバックと合わせてプロレベルの制作環境を実現します。<br />最後にこの章では、iPadのクリエイティブな利用方法を5つ紹介します。</>}
    >

      {/* 19. 動画編集をする */}
      <MediaCard src="/images/content/ipad-video-editing.jpg" alt="iPadで動画編集する様子" title="動画編集をする">
        <p className="media-card__desc">
          iPadは映像編集デバイスとしても非常に優秀です。スマホでは厄介な「テロップの位置調整」や「細かなトリミング」も、iPadの大画面なら誤操作のストレスなく進められます。
        </p>
        <p className="media-card__desc">
          PCほど学習コストがかからず、直感的に指で操れるため、初心者でもすぐに作業に慣れることができます。
        </p>
        <p className="media-card__desc">
          最初からApple純正の「iMovie」がプリインストールされているのもポイント。スライドショーや基本的なテロップ入れ程度なら、有料アプリを買わずにすぐ始められるのもiPadならではのメリットです。
        </p>
        <InfoCard heading="おすすめの映像編集アプリ">
          <li><a href="https://apps.apple.com/jp/app/imovie/id377298193" target="_blank" rel="noopener">iMovie</a></li>
          <li><a href="https://apps.apple.com/jp/app/lumafusion/id1062022008" target="_blank" rel="noopener">LumaFusion</a></li>
        </InfoCard>
      </MediaCard>

      {/* 20. 写真編集する */}
      <MediaCard src="/images/content/photo/ipad-use-image-white-4.jpg" alt="iPadでLightroomを操作する様子" title="写真編集する">
        <p className="media-card__desc">
          iPadではAdobe LightroomやPhotoshopなどの定番ソフトを使用できます。各種パラメータをタッチ操作で直感的に調整できるため、PCよりも手軽に自分好みの写真へ仕上げられるのが魅力です。
        </p>
        <p className="media-card__desc">
          また、撮影した写真をその場ですぐに編集してシェアできる機動力もiPadならでは。このフットワークの軽さは、場所を選ばずクリエイティブを楽しみたい方にとって、重いPCにはない強力な武器になります。
        </p>
        <InfoCard heading="おすすめの写真編集アプリ">
          <li><a href="https://apps.apple.com/us/app/lightroom-photo-video-editor/id878783582" target="_blank" rel="noopener">Lightroom</a></li>
          <li><a href="https://apps.apple.com/jp/app/affinity-photo-2-ipad%E7%89%88/id1616823773" target="_blank" rel="noopener">Affinity Photo 2 for iPad</a></li>
        </InfoCard>
      </MediaCard>

      {/* 21. イラストを書く */}
      <MediaCard src="/images/content/photo/how-to-use-ipad-min-sketch.jpg" alt="Apple Pencilでイラストを書く様子" title="イラストを書く">
        <p className="media-card__desc">
          iPadとApple Pencilを組み合わせれば、場所を選ばず本格的なイラスト制作が楽しめます。
        </p>
        <p className="media-card__desc">
          アプリも非常に充実していますが、まずは無料で多機能な「MediBang Paint（メディバンペイント）」がおすすめ。初心者でも使いやすく、App Storeでも高い人気を誇る定番アプリです。
        </p>
        <p className="media-card__desc">
          注意したいのが、書き心地を左右する「リフレッシュレート」の違いです。<strong>120Hz駆動に対応したiPad Proは、60HzのiPad Airなどと比べてペン先の遅延が圧倒的に少なく</strong>、より紙に近い滑らかな描き心地を実現しています。
        </p>
        <p className="media-card__desc">
          なおiPadによって対応しているApple Pencilは異なります。<a href="/ipad/apple-pencil-compare/">Apple Pencilの違い</a>などの情報もチェックして自分に合う機種を選びましょう。
        </p>
        <InfoCard heading="おすすめのイラストアプリ">
          <li><a href="https://medibangpaint.com/" target="_blank" rel="noopener">MediBang Paint</a></li>
          <li><a href="https://www.clipstudio.net/ja/" target="_blank" rel="noopener">クリップスタジオ</a></li>
          <li><a href="https://procreate.com/jp" target="_blank" rel="noopener">プロクリエイト</a></li>
        </InfoCard>
      </MediaCard>

      {/* 22. モデリングをする */}
      <MediaCard src="/images/content/photo/G8qw3UXbQAACat7.jpg" alt="iPadでモデリングする様子" title="モデリングをする">
        <p className="media-card__desc">
          iPadとApple Pencilの組み合わせは、3Dプリンター用のデータ作成とも非常に相性が良いです。PCのCADソフトは習得に時間がかかりますが、iPadなら直感的な操作でアイデアを素早く形にできます。
        </p>
        <dl className="m-card vs-card u-mt-sm">
          <dt>Shapr3D</dt>
          <dd>Apple Pencilに最適化された3DCADアプリ。図面を描くような感覚で精密なモデリングが可能で、3Dプリンター用の出力もスムーズに行えます。</dd>
          <dt>Nomad Sculpt</dt>
          <dd>粘土をこねるように造形できるスカルプトアプリ。フィギュアなどの有機的な形状作りに最適で、ペン先でなぞるだけで直感的なディテールの作り込みが可能です。</dd>
        </dl>
        <p className="media-card__desc u-mt-md">
          作成したモデルをAR（拡張現実）で実寸表示し、プリント前にサイズ感を確認できるのもiPadならではの強み。趣味の造形から実用パーツ作成まで、3Dプリンターをフル活用したい方にとってiPadは最強のパートナーになります。
        </p>
        <InfoCard heading="おすすめのモデリングアプリ">
          <li><a href="https://apps.apple.com/jp/app/shapr3d-cad-modeling/id1091675242" target="_blank" rel="noopener">Shapr3D</a></li>
          <li><a href="https://apps.apple.com/jp/app/nomad-sculpt/id1519508656" target="_blank" rel="noopener">Nomad Sculpt</a></li>
        </InfoCard>
      </MediaCard>

      {/* 23(番外). カメラでテザー撮影する */}
      <MediaCard src="/images/content/photo/shooting-camera.jpg" alt="カメラでテザー撮影する様子" title="カメラでテザー撮影する">
        <p className="media-card__desc">
          iPadはカメラのテザー撮影にも使用することができます。テザー撮影とはカメラとタブレットやPCをつないでリアルタイムに写真をチェックしながら撮影する手法で、下記のようなメリットがあります。
        </p>
        <InfoCard>
          <li>ピンボケに気付きやすい</li>
          <li>明るさを調整しやすい</li>
          <li>iPadに直接写真が保存されるから編集効率が上がる</li>
        </InfoCard>
        <p className="media-card__desc u-mt-md">
          ノートPCでもテザー撮影はできるのですが、どうしても機動性がいまいち。iPadなら、どこでも身軽にテザー撮影を行うことができるので、外で写真を撮る方なんかに特におすすめです。
        </p>
        <InfoCard heading="おすすめのテザー撮影用アプリ">
          <li><a href="https://apps.apple.com/jp/app/imaging-edge-mobile/id489191124" target="_blank" rel="noopener">SONY Imaging Edge</a></li>
          <li><a href="https://apps.apple.com/jp/app/fujifilm-camera-remote/id793063045" target="_blank" rel="noopener">FUJIFILM Camera Remote</a></li>
          <li><a href="https://www.captureone.com/ja/products/capture-one-for-ipad" target="_blank" rel="noopener">Capture One for iPad</a></li>
        </InfoCard>
      </MediaCard>

    </HowtoSection>
  )
}
