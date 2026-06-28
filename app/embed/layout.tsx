import type { Metadata } from 'next'

// 埋め込み専用。検索結果には出さない（本体ページをインデックスさせる）。
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// root layout の <html><body> を継承しつつ、Header/Footer の付かない最小ラッパー。
// iframe 内で余白なく収まるよう背景透過＆余白リセット。
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="embed-root">
      <style>{`
        body { margin: 0; background: transparent; }
        .embed-root { padding: 0; }
      `}</style>
      {children}
    </div>
  )
}
