type Variant = "default" | "cream" | "dark" | "steel";

type Props = {
  variant?: Variant;
  id?: string;
  children: React.ReactNode;
  className?: string;
};

const surfaces: Record<Variant, string> = {
  default: "bg-paper text-charcoal",
  cream: "bg-cream text-charcoal",
  dark: "bg-charcoal text-cream",
  steel: "bg-steel text-cream",
};

export default function Section({ variant = "default", id, children, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`${surfaces[variant]} ${className}`}
    >
      <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-32">
        {children}
      </div>
    </section>
  );
}
