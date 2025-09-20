// components/Image.tsx
import Image from "next/image"
import { cn } from "@/lib/utils" // optional: if you're using a className merge helper

type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function AppImage({
  src,
  alt,
  width = 40,
  height = 40,
  className,
  priority = false,
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("w-auto h-auto", className)}
    />
  )
}
