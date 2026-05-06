import SmartImage from "./SmartImage";
import type { Photo } from "@/lib/photos";

type ProductGalleryProps = {
  photos: Photo[];
  fallbackShots: Array<"plank-detail" | "room-wide" | "grain-texture" | "threshold" | "tile-flatlay">;
  alt: string;
};

export default function ProductGallery({
  photos,
  fallbackShots,
  alt,
}: ProductGalleryProps) {
  // Always render exactly 4 slots
  const slots = Array.from({ length: 4 }).map((_, i) => ({
    src: photos[i]?.url ?? null,
    shot: fallbackShots[i % fallbackShots.length],
    title: photos[i]?.title,
  }));

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      {slots.map((s, i) => (
        <div
          key={i}
          className={`kenburn lift overflow-hidden rounded-md ${
            i % 2 === 1 ? "mt-12" : ""
          }`}
        >
          <SmartImage
            src={s.src}
            alt={s.title || alt}
            shot={s.shot}
            ratio={i % 4 < 2 ? "3/4" : "4/3"}
          />
        </div>
      ))}
    </div>
  );
}
