import { site } from "@/lib/site";

export default function StickyMobileBar() {
  return (
    <div
      role="region"
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-paper/95 backdrop-blur md:hidden"
    >
      <a
        href={site.phone.href}
        className="flex flex-1 items-center justify-center gap-2 border-r border-line py-3 text-xs uppercase tracking-button text-charcoal active:bg-cream"
      >
        <svg
          aria-hidden
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
        </svg>
        Call
      </a>
      <a
        href={site.phone.sms}
        className="flex flex-1 items-center justify-center gap-2 border-r border-line py-3 text-xs uppercase tracking-button text-charcoal active:bg-cream"
      >
        <svg
          aria-hidden
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
        </svg>
        Text
      </a>
      <a
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 bg-charcoal py-3 text-xs uppercase tracking-button text-cream"
      >
        Free Quote
      </a>
    </div>
  );
}
