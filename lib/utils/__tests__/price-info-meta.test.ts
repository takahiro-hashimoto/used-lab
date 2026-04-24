import { describe, it, expect } from 'vitest'
import { PRICE_INFO_UPDATE_MONTH, buildPriceInfoTitle } from '../price-info-meta'

describe('PRICE_INFO_UPDATE_MONTH', () => {
  it('現在の年月を"YYYY年M月"形式で返す', () => {
    const now = new Date()
    const expected = `${now.getFullYear()}年${now.getMonth() + 1}月`
    expect(PRICE_INFO_UPDATE_MONTH).toBe(expected)
  })
})

describe('buildPriceInfoTitle', () => {
  it('正しいタイトル文字列を生成', () => {
    const result = buildPriceInfoTitle('中古iPhone', 30, '2025年4月')
    expect(result).toBe('中古iPhoneの中古相場一覧 | 歴代30機種の価格推移を独自集計【2025年4月】')
  })
})
