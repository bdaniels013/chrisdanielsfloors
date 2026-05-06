type Props = {
  /** Color theme — auto picks contrasting palette. */
  variant?: "light" | "dark";
  /** Show the FLOORS sub-line and horizon rule. */
  full?: boolean;
  /** Tailwind size override for the script. */
  scriptClassName?: string;
};

export default function Logo({
  variant = "dark",
  full = false,
  scriptClassName = "text-3xl md:text-4xl",
}: Props) {
  const scriptColor = variant === "dark" ? "text-charcoal" : "text-cream";
  const subColor = variant === "dark" ? "text-charcoal-mid" : "text-cream/85";
  const ruleColor = variant === "dark" ? "bg-oak" : "bg-oak-soft";

  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span className={`font-script ${scriptClassName} ${scriptColor}`}>
        Chris Daniels
      </span>
      {full && (
        <>
          <span
            aria-hidden
            className={`mt-2 mb-2 h-px w-32 md:w-44 ${ruleColor}`}
          />
          <span
            className={`font-sans text-xs md:text-sm font-normal uppercase tracking-floors ${subColor}`}
            style={{ paddingLeft: "0.55em" }}
          >
            Floors
          </span>
        </>
      )}
    </span>
  );
}
