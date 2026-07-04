// ModelDataの生値をfilter-searchカードと同じ表記に整形する共有ヘルパー
export function formatRelease(releaseDate: string): string {
  const [y, m] = releaseDate.split('/')
  return y && m ? `${y}年${m}月` : releaseDate
}

export function cameraConfig(camera: string): string {
  if (camera.includes('望遠')) return 'トリプル'
  if (camera.includes('超広角')) return 'デュアル'
  return 'シングル'
}

export function portLabel(port: string): string {
  if (/usb/i.test(port)) return 'USB-C'
  if (/lightning/i.test(port)) return 'Lightning'
  return port
}
