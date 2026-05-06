import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";

type Shot =
  | "room-wide"
  | "plank-detail"
  | "tile-flatlay"
  | "hands-at-work"
  | "grain-texture"
  | "threshold";

type Props = {
  src?: string | null;
  alt: string;
  shot?: Shot;
  ratio?: "4/3" | "3/4" | "16/9" | "1/1";
  className?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
};

const ratioToClass: Record<NonNullable<Props["ratio"]>, string> = {
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
};

export default function SmartImage({
  src,
  alt,
  shot = "room-wide",
  ratio = "4/3",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  rounded = true,
}: Props) {
  if (!src) {
    return (
      <PlaceholderImage
        shot={shot}
        ratio={ratio}
        className={className}
        label={undefined}
      />
    );
  }
  return (
    <div
      className={`relative overflow-hidden ${rounded ? "rounded-md" : ""} ${ratioToClass[ratio]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover img-target"
      />
    </div>
  );
}
