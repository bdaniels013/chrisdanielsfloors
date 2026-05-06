type Props = {
  children: React.ReactNode;
  attribution?: string;
  variant?: "light" | "dark";
};

export default function PullQuote({ children, attribution, variant = "light" }: Props) {
  const text = variant === "dark" ? "text-cream" : "text-steel-deep";
  const border = variant === "dark" ? "border-oak-soft" : "border-oak";
  return (
    <figure className={`my-10 max-w-quote border-l-2 pl-7 ${border}`}>
      <blockquote className={`font-serif text-2xl italic leading-snug md:text-3xl ${text}`}>
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-[11px] uppercase tracking-eyebrow text-charcoal-soft">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
