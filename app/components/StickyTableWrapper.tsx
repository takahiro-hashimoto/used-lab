'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /**
   * true の場合、横スクロール表でも thead をページスクロール時に
   * ビューポート上端へ固定する（フローティングヘッダー = JS複製方式）。
   * 横スクロール位置も同期する。
   */
  floatingHeader?: boolean
}

/**
 * テーブルをラップして、thead が sticky 状態になったら
 * .is-stuck クラスを付与し shadow を表示するコンポーネント。
 * floatingHeader=true のときは横スクロール表向けに thead を複製した
 * フローティングヘッダーを生成し、ページスクロールに追従させる。
 */
export default function StickyTableWrapper({ children, className = '', floatingHeader = false }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // is-stuck（シャドウ）用の sentinel 監視
  useEffect(() => {
    const sentinel = sentinelRef.current
    const wrapper = wrapperRef.current
    if (!sentinel || !wrapper) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        wrapper.classList.toggle('is-stuck', !entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // フローティングヘッダー（横スクロール表向け）
  useEffect(() => {
    if (!floatingHeader) return
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const scroller = wrapper.querySelector<HTMLElement>('.m-table-scroll')
    const table = scroller?.querySelector<HTMLTableElement>('table')
    const thead = table?.querySelector<HTMLTableSectionElement>('thead')
    if (!scroller || !table || !thead) return

    const overlay = document.createElement('div')
    overlay.className = 'm-floating-thead'
    overlay.setAttribute('aria-hidden', 'true')
    const inner = document.createElement('div')
    inner.className = 'm-floating-thead__inner'
    overlay.appendChild(inner)
    document.body.appendChild(overlay)

    let cloneTable: HTMLTableElement | null = null

    const syncWidths = () => {
      if (!cloneTable) return
      const w = table.offsetWidth
      cloneTable.style.width = `${w}px`
      cloneTable.style.minWidth = `${w}px`
      const origThs = table.querySelectorAll<HTMLElement>('thead th')
      const cloneThs = cloneTable.querySelectorAll<HTMLElement>('thead th')
      origThs.forEach((th, i) => {
        const cw = th.getBoundingClientRect().width
        const ct = cloneThs[i]
        if (ct) {
          ct.style.width = `${cw}px`
          ct.style.minWidth = `${cw}px`
          ct.style.maxWidth = `${cw}px`
        }
      })
    }

    const buildClone = () => {
      const full = table.cloneNode(true) as HTMLTableElement
      full.querySelectorAll('tbody, caption').forEach((n) => n.remove())
      full.style.margin = '0'
      inner.innerHTML = ''
      inner.appendChild(full)
      cloneTable = full
      syncWidths()
    }

    const positionOverlay = () => {
      const r = scroller.getBoundingClientRect()
      overlay.style.left = `${r.left}px`
      overlay.style.width = `${scroller.clientWidth}px`
      inner.style.width = `${scroller.clientWidth}px`
    }

    const syncScroll = () => {
      inner.scrollLeft = scroller.scrollLeft
    }

    const update = () => {
      const r = scroller.getBoundingClientRect()
      const theadH = thead.getBoundingClientRect().height
      // 表の上端が画面外に出て、かつ表本体がまだ見えている間だけ表示
      if (r.top < 0 && r.bottom > theadH) {
        positionOverlay()
        syncScroll()
        overlay.style.display = 'block'
      } else {
        overlay.style.display = 'none'
      }
    }

    buildClone()
    update()

    const onWinScroll = () => update()
    const onResize = () => {
      syncWidths()
      positionOverlay()
      update()
    }
    const onScrollerScroll = () => syncScroll()

    window.addEventListener('scroll', onWinScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    scroller.addEventListener('scroll', onScrollerScroll, { passive: true })

    // フィルター/並び替えで thead の中身が変わったら作り直す
    const mo = new MutationObserver(() => {
      buildClone()
      update()
    })
    mo.observe(thead, { childList: true, subtree: true, characterData: true })
    // 列幅変化に追従
    const ro = new ResizeObserver(() => {
      syncWidths()
      positionOverlay()
    })
    ro.observe(table)

    return () => {
      window.removeEventListener('scroll', onWinScroll)
      window.removeEventListener('resize', onResize)
      scroller.removeEventListener('scroll', onScrollerScroll)
      mo.disconnect()
      ro.disconnect()
      overlay.remove()
    }
  }, [floatingHeader])

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={sentinelRef} style={{ height: 1, marginBottom: -1 }} />
      {children}
    </div>
  )
}
