import Image, { type ImageProps } from "next/image";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/**
 * next/image wrapper that auto-applies a generated blur placeholder
 * (from src/content/blur.json) so images bloom in instead of popping.
 */
export default function Img({ src, ...rest }: ImageProps & { src: string }) {
  const dataURL = blurMap[src];
  return (
    <Image
      src={src}
      {...(dataURL ? { placeholder: "blur" as const, blurDataURL: dataURL } : {})}
      {...rest}
    />
  );
}
