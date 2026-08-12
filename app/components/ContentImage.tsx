/* eslint-disable @next/next/no-img-element */

import Image from 'next/image'

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> & {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
}

function isOptimizable(src: string, width?: number, height?: number): width is number {
  return src.startsWith('/') && !src.endsWith('.gif') && width != null && height != null
}

export default function ContentImage({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, 240px',
  className,
  loading,
  decoding,
  style,
  ...rest
}: Props) {
  if (isOptimizable(src, width, height)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height!}
        sizes={sizes}
        className={className}
        loading={loading}
        decoding={decoding}
        style={style}
        {...rest}
      />
    )
  }

  // GIF や外部画像は next/image を通せないので素の img で出す。
  //
  // loading を既定で lazy にしている理由:
  // 指定が無いと React が SSR 出力の img を見つけて <link rel="preload" as="image">
  // を head に発行する。この分岐に来るのはアフィリエイトのバナー画像がほとんどで、
  // 実際 /iphone/ では画面下部のカード3枚（firebasestorage / a8 / 楽天）が
  // 最優先で先読みされ、LCP 画像と帯域と接続を奪い合っていた。
  // lazy を付けると React は preload を出さなくなる。
  // ファーストビューに置く外部画像がある場合だけ loading="eager" を明示すること。
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading ?? 'lazy'}
      decoding={decoding}
      style={style}
      {...rest}
    />
  )
}
