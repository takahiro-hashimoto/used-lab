'use client'

import { useState } from 'react'

const TABS = [
  { id: 'price', label: '料金\n比較' },
  { id: 'promax', label: 'ProMax\n修理費' },
  { id: 'pro', label: 'Pro\n修理費' },
  { id: 'standard', label: '無印\n修理費' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function InsuranceCostTabs() {
  const [active, setActive] = useState<TabId>('price')

  return (
    <div className="ins-tabs">
      {/* タブボタン */}
      <div className="ins-tabs__nav" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`ins-panel-${tab.id}`}
            className={`ins-tabs__btn${active === tab.id ? ' is-active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </button>
        ))}
      </div>

      {/* パネル: 料金比較 */}
      <div id="ins-panel-price" role="tabpanel" hidden={active !== 'price'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />（Pro / ProMax）</th>
                <th>AppleCare+<br />（無印 / Plus）</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>月払い</th>
                <td>1,740円</td>
                <td>1,540円</td>
                <td className="ins-tabs__highlight">700円</td>
              </tr>
              <tr>
                <th>2年間合計</th>
                <td>34,800〜41,760円</td>
                <td>26,800〜36,960円</td>
                <td className="ins-tabs__highlight">16,800円</td>
              </tr>
              <tr>
                <th>修理の自己負担</th>
                <td>3,700円〜 / 回</td>
                <td>3,700円〜 / 回</td>
                <td className="ins-tabs__highlight">なし（全額補償）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: ProMax 修理費比較 */}
      <div id="ins-panel-promax" role="tabpanel" hidden={active !== 'promax'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />未加入</th>
                <th>AppleCare+<br />加入済み</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面のひび割れ</th>
                <td>56,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>29,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>バッテリー交換</th>
                <td>15,800円</td>
                <td>0円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面カメラ修理</th>
                <td>38,800円</td>
                <td>12,900円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: Pro 修理費比較 */}
      <div id="ins-panel-pro" role="tabpanel" hidden={active !== 'pro'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />未加入</th>
                <th>AppleCare+<br />加入済み</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面のひび割れ</th>
                <td>50,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>25,900円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>バッテリー交換</th>
                <td>15,800円</td>
                <td>0円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面カメラ修理</th>
                <td>32,800円</td>
                <td>12,900円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* パネル: 無印 修理費比較 */}
      <div id="ins-panel-standard" role="tabpanel" hidden={active !== 'standard'} className="ins-tabs__panel">
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th></th>
                <th>AppleCare+<br />未加入</th>
                <th>AppleCare+<br />加入済み</th>
                <th>モバイル保険</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>画面のひび割れ</th>
                <td>42,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面ガラスの損傷</th>
                <td>29,800円</td>
                <td>3,700円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>バッテリー交換</th>
                <td>15,800円</td>
                <td>0円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
              <tr>
                <th>背面カメラ修理</th>
                <td>23,800円</td>
                <td>12,900円</td>
                <td className="ins-tabs__highlight">0円</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
