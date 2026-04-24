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

  // GIF や外部画像は既存の挙動を維持する。
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      style={style}
      {...rest}
    />
  )
}
