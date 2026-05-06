// Brand-safe gradient placeholder for the six photography "shot types" defined
// in the brand guidelines. Swap with real <Image> tags as photos arrive.

type Shot =
  | "room-wide"
  | "plank-detail"
  | "tile-flatlay"
  | "hands-at-work"
  | "grain-texture"
  | "threshold";

type Props = {
  shot?: Shot;
  label?: string;
  className?: string;
  ratio?: "4/3" | "3/4" | "16/9" | "1/1";
};

const shots: Record<Shot, string> = {
  "room-wide":
    "linear-gradient(180deg, #36506B 0%, #4F6A86 45%, #B8895E 100%)",
  "plank-detail":
    "repeating-linear-gradient(95deg, #B8895E 0px, #A87850 2px, #B8895E 4px, #C49B70 7px, #B8895E 11px)",
  "tile-flatlay":
    "linear-gradient(135deg, #C9D4E0 0%, #869EB6 100%)",
  "hands-at-work":
    "radial-gradient(ellipse at 30% 30%, #E5D2BD 0%, #8C6440 45%, #1F2428 100%)",
  "grain-texture":
    "repeating-linear-gradient(0deg, #B8895E 0px, #8C6440 1px, #B8895E 3px, #C49B70 5px)",
  threshold:
    "linear-gradient(90deg, #B8895E 0%, #B8895E 50%, #C9D4E0 50%, #C9D4E0 100%)",
};

const ratios: Record<NonNullable<Props["ratio"]>, string> = {
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
};

export default function PlaceholderImage({
  shot = "room-wide",
  label,
  className = "",
  ratio = "4/3",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-line/60 ${ratios[ratio]} ${className}`}
      style={{ backgroundImage: shots[shot] }}
      role="img"
      aria-label={label ?? "Project photograph placeholder"}
    >
      {label && (
        <span className="absolute bottom-3 left-3 rounded-sm bg-cream/90 px-3 py-1 font-serif text-[13px] italic text-charcoal">
          {label}
        </span>
      )}
    </div>
  );
}
