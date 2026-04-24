import { describe, it, expect } from 'vitest'
import {
  formatReleaseDate,
  formatPrice,
  getMinPrice,
  getReleaseYear,
  getReleaseMonth,
  calculateAnnualCost,
  buildBreadcrumbJsonLd,
  buildDisplayLinks,
} from '../shared-helpers'

describe('formatReleaseDate', () => {
  it('YYYY/M/DD → "YYYY年M月"', () => {
    expect(formatReleaseDate('2022/9/16')).toBe('2022年9月')
  })
  it('YYYY/MM形式（ゼロパディングあり）', () => {
    expect(formatReleaseDate('2023/03')).toBe('2023年03月')
  })
  it('nullは空文字', () => {
    expect(formatReleaseDate(null)).toBe('')
  })
})

describe('formatPrice', () => {
  it('価格を円表記に変換', () => {
    expect(formatPrice(50000)).toBe('¥50,000')
  })
  it('nullは"-"', () => {
    expect(formatPrice(null)).toBe('-')
  })
  it('0円', () => {
    expect(formatPrice(0)).toBe('¥0')
  })
})

describe('getMinPrice', () => {
  it('3ショップの最安値を返す', () => {
    const log = { iosys_min: 40000, geo_min: 38000, janpara_min: 42000 } as Parameters<typeof getMinPrice>[0]
    expect(getMinPrice(log)).toBe('¥38,000')
  })
  it('全nullは"-"', () => {
    const log = { iosys_min: null, geo_min: null, janpara_min: null } as Parameters<typeof getMinPrice>[0]
    expect(getMinPrice(log)).toBe('-')
  })
  it('nullログは"-"', () => {
    expect(getMinPrice(null)).toBe('-')
  })
  it('0は除外する', () => {
    const log = { iosys_min: 0, geo_min: 35000, janpara_min: null } as Parameters<typeof getMinPrice>[0]
    expect(getMinPrice(log)).toBe('¥35,000')
  })
})

describe('getReleaseYear', () => {
  it('日付から年を取得', () => {
    expect(getReleaseYear('2021/9/24')).toBe(2021)
  })
  it('nullは0', () => {
    expect(getReleaseYear(null)).toBe(0)
  })
})

describe('getReleaseMonth', () => {
  it('日付から月を取得', () => {
    expect(getReleaseMonth('2021/9/24')).toBe(9)
  })
  it('nullは1（デフォルト）', () => {
    expect(getReleaseMonth(null)).toBe(1)
  })
})

describe('calculateAnnualCost', () => {
  it('年間コストを計算', () => {
    expect(calculateAnnualCost(60000, 3)).toBe(20000)
  })
  it('残り年数0はnull', () => {
    expect(calculateAnnualCost(60000, 0)).toBeNull()
  })
  it('価格nullはnull', () => {
    expect(calculateAnnualCost(null, 3)).toBeNull()
  })
})

describe('buildBreadcrumbJsonLd', () => {
  it('正しいBreadcrumbList構造を生成', () => {
    const result = buildBreadcrumbJsonLd([
      { name: 'ホーム', item: 'https://example.com/' },
      { name: 'iPhone' },
    ])
    expect(result['@type']).toBe('BreadcrumbList')
    expect(result.itemListElement).toHaveLength(2)
    expect(result.itemListElement[0].position).toBe(1)
    expect(result.itemListElement[1].position).toBe(2)
    expect(result.itemListElement[1]).not.toHaveProperty('item')
  })
})

describe('buildDisplayLinks', () => {
  const shopNames = { 1: 'イオシス', 2: 'にこスマ' }

  it('shopLinksがあればshopLinksを優先', () => {
    const shopLinks = [{ shop_id: 1, url: 'https://iosys.co.jp', product_id: 10, id: 1, product_type: 'iphone' as const }]
    const result = buildDisplayLinks(shopLinks, [], shopNames)
    expect(result).toHaveLength(1)
    expect(result[0].shopName).toBe('イオシス')
  })

  it('shopLinksが空のときfallbackを使用', () => {
    const fallback = [{ shop_id: 2, url: 'https://nicosuma.com', shopName: 'にこスマ' }]
    const result = buildDisplayLinks([], fallback, shopNames)
    expect(result).toHaveLength(1)
    expect(result[0].shopName).toBe('にこスマ')
  })

  it('shopNamesにないshop_idは除外', () => {
    const fallback = [
      { shop_id: 2, url: 'https://nicosuma.com', shopName: 'にこスマ' },
      { shop_id: 99, url: 'https://unknown.com', shopName: '不明' },
    ]
    const result = buildDisplayLinks([], fallback, shopNames)
    expect(result).toHaveLength(1)
  })
})
