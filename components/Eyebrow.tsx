type Props = {
  number?: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
};

export default function Eyebrow({ number, children, variant = "light" }: Props) {
  const color = variant === "dark" ? "text-oak-soft" : "text-steel";
  return (
    <span
      className={`mb-4 block text-[11px] font-semibold uppercase tracking-eyebrow ${color}`}
    >
      {number ? `${number} — ` : ""}
      {children}
    </span>
  );
}
