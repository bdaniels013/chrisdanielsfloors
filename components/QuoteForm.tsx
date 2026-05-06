"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitQuote, type QuoteState } from "@/app/actions";
import { site } from "@/lib/site";

const initialState: QuoteState | undefined = undefined;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-sm bg-charcoal px-7 py-3.5 text-[11px] font-medium uppercase tracking-button text-cream transition-colors hover:bg-steel-deep disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Sending…" : "Send quote request"}
    </button>
  );
}

const projectTypes = [
  "Luxury Vinyl Plank (LVP)",
  "Hardwood",
  "Tile",
  "Carpet",
  "Not sure yet",
];

const timelines = ["This month", "Next 1–3 months", "3–6 months", "Just exploring"];

export default function QuoteForm() {
  const [state, formAction] = useFormState(submitQuote, initialState);

  if (state?.ok) {
    return (
      <div className="rounded-sm border border-steel/40 bg-cream/60 p-8">
        <p className="font-serif text-2xl text-charcoal">Thank you.</p>
        <p className="mt-2 max-w-prose text-charcoal-mid">{state.message}</p>
        <p className="mt-4 text-sm text-charcoal-soft">
          Need to talk now? Call{" "}
          <a href={site.phone.href} className="text-steel hover:text-steel-deep">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const errors = !state?.ok ? state?.errors ?? {} : {};
  const v = !state?.ok ? state?.values ?? {} : {};

  return (
    <form action={formAction} className="grid gap-5">
      {/* Honeypot */}
      <label
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
        aria-hidden
      >
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <Field label="Name" name="name" defaultValue={v.name} error={errors.name} required />
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          defaultValue={v.email}
          error={errors.email}
          required
          autoComplete="email"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          defaultValue={v.phone}
          error={errors.phone}
          required
          autoComplete="tel"
        />
      </div>
      <Field
        label="Address (street, city, ZIP)"
        name="address"
        defaultValue={v.address}
        autoComplete="street-address"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Select label="Project type" name="projectType" defaultValue={v.projectType} options={projectTypes} />
        <Field label="Approx. square feet" name="sqft" defaultValue={v.sqft} placeholder="e.g. 800" />
      </div>
      <Select label="Timeline" name="timeline" defaultValue={v.timeline} options={timelines} />
      <Textarea
        label="Anything we should know?"
        name="message"
        defaultValue={v.message}
        placeholder="Rooms, materials in mind, photos to share later…"
      />

      <div className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center md:justify-between">
        <SubmitButton />
        <p className="text-xs text-charcoal-soft">
          Or call {" "}
          <a href={site.phone.href} className="text-steel hover:text-steel-deep">
            {site.phone.display}
          </a>{" "}
          — Chris answers.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  error,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-mid">
        {label}
        {required && <span className="ml-1 text-oak">*</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error) || undefined}
        className={`block w-full rounded-sm border bg-paper px-4 py-2.5 text-charcoal placeholder:text-charcoal-soft focus:border-steel focus:outline-none ${
          error ? "border-oak-deep" : "border-line"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-oak-deep">{error}</span>}
    </label>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-mid">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue || ""}
        className="block w-full rounded-sm border border-line bg-paper px-4 py-2.5 text-charcoal focus:border-steel focus:outline-none"
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-mid">
        {label}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={5}
        className="block w-full rounded-sm border border-line bg-paper px-4 py-2.5 text-charcoal placeholder:text-charcoal-soft focus:border-steel focus:outline-none"
      />
    </label>
  );
}
