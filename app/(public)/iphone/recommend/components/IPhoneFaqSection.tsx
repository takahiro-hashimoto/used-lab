import { RECOMMEND_DATE_LABEL, RECOMMEND_YEAR, RECOMMEND_COUNT_LABEL } from '@/lib/data/iphone-recommend'

export default function IPhoneFaqSection() {
  const faqs = [
    {
      question: '中古iPhoneのおすすめはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_DATE_LABEL}現在、「iPhone SE 第3世代」「iPhone14 Pro」「iPhone 16e」「iPhone15」「iPhone14 Plus」の{RECOMMEND_COUNT_LABEL}がおすすめです。
          </p>
          <p>
            予算重視なら「iPhone SE 第3世代」（2万円台から購入可能）、性能重視なら「iPhone14 Pro」
            （トリプルカメラ・ProMotion搭載）、コンパクト重視なら「iPhone 16e」（A18チップ搭載・約170g）、
            USB-C対応なら「iPhone15」、大画面なら「iPhone14 Plus」（6.7インチ）が最適です。
          </p>
          <p>
            いずれも2030年頃までiOSサポートが続く見込みで、数年単位で安心して使えます。
          </p>
        </>
      ),
    },
    {
      question: '中古iPhoneを選ぶときのポイントは？',
      answer: (
        <>
          <p>以下の3つのポイントを基準に選ぶことをおすすめします。</p>
          <ul>
            <li>発売から約7年でiOSサポートが終了するため、2030年以降までサポートが残っている機種を選びましょう。</li>
            <li>SNS・Web・動画視聴で快適に動作するA15 Bionic以上のチップを搭載した機種が目安です。</li>
            <li>残りサポート期間と中古相場から年単価を計算し、コスパの良い機種を選びましょう。</li>
          </ul>
        </>
      ),
    },
    {
      question: '中古iPhoneはどこで買うのがおすすめ？',
      answer: (
        <>
          <p>中古スマホ専門店での購入をおすすめします。理由は以下の3点です。</p>
          <ul>
            <li>専門の検品担当者がチェック済み</li>
            <li>赤ロム保証や初期不良対応などの保証が付いている</li>
            <li>トラブル時のサポート体制が整っている</li>
          </ul>
          <p>
            具体的には、イオシス（在庫豊富・3〜6ヶ月保証）、にこスマ（1年保証・初心者向け）、ゲオ（在庫数豊富）などが信頼性が高くおすすめです。
          </p>
          <p>メルカリやヤフオクなどの個人売買は保証がないため、初心者には推奨しません。</p>
        </>
      ),
    },
    {
      question: '中古iPhoneを買うときの注意点は？',
      answer: (
        <>
          <p>購入前に以下の4点を必ずチェックしましょう。</p>
          <ul>
            <li>バッテリー最大容量は80%以上が目安です。70%台の端末を安く買ってApple正規店で交換（約15,000円）する方法もあります。</li>
            <li>ネットワーク利用制限が「◯」判定（分割払い完済済み）の端末を選びましょう。「△」は赤ロム化のリスクがあります。</li>
            <li>ショップの保証期間を確認しましょう。イオシスなら3〜6ヶ月、にこスマなら1年保証など、ショップによって異なります。</li>
            <li>iPhone 12以前は数年利用前提なら非推奨です。iPhone 13以降を選ぶと安心です。</li>
          </ul>
        </>
      ),
    },
    {
      question: '型落ちiPhoneは何年使える？',
      answer: (
        <>
          <p>
            Appleは発売から約7年でiOSサポートを終了する傾向があります。{RECOMMEND_YEAR}年時点でおすすめしている{RECOMMEND_COUNT_LABEL}は、いずれも<strong>2030年以降までサポートされる見込み</strong>です。
          </p>
          <p>
            例えば、iPhone SE 第3世代は2021年発売のため、2028年頃まで約7年間使えます。iPhone15は2023年発売のため、2030年頃までサポートされる計算です。
          </p>
          <p>
            サポート終了後も動作はしますが、セキュリティリスクが高まり、新しいアプリが使えなくなる可能性があるため、サポート期間内での利用をおすすめします。
          </p>
        </>
      ),
    },
    {
      question: 'Apple認定整備済製品と中古iPhoneの違いは？',
      answer: (
        <>
          <p>
            Apple認定整備済製品はAppleが検品・部品交換・クリーニングを行い、新品同様の状態で販売する製品です。バッテリーと外装が新品に交換済みで、1年間のApple保証が付きます。
          </p>
          <p>
            一方、中古iPhoneはショップや個人から購入する使用済み端末で、バッテリーや外装の状態は個体差があります。価格は整備済製品より安いことが多く、機種の選択肢も豊富です。
          </p>
          <p>
            「状態の良さ・保証を重視するなら整備済製品」「価格と機種の選択肢を重視するなら中古ショップ」と使い分けるのがおすすめです。
          </p>
        </>
      ),
    },
    {
      question: 'おすすめしない中古iPhoneはどれ？',
      answer: (
        <>
          <p>
            {RECOMMEND_YEAR}年現在、以下に該当するモデルはおすすめしません。
          </p>
          <ul>
            <li>iOSサポートが終了済み、または終了間近のモデルはセキュリティリスクが高く、新しいアプリが使えなくなる可能性があります。</li>
            <li>バッテリー容量が極端に少ないモデルは、日常利用で充電が1日持たないケースが多いです。</li>
            <li>バッテリー最大容量80%未満の端末は、交換費用を含めると割高になる可能性があります。</li>
          </ul>
          <p>
            安さに惹かれてサポート切れの端末を買うと、アプリが使えなくなったり買い替えが必要になるため、結果的にコスパが悪くなります。当サイトのiOSサポート期間一覧表で対応状況を確認してから購入しましょう。
          </p>
        </>
      ),
    },
  ]

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          中古iPhoneの購入に関するよくある質問
        </h2>
        <p className="m-section-desc">
          中古iPhoneを購入する前に確認しておきたい疑問にお答えします。
        </p>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
