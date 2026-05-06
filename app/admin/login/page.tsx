import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  const configured = Boolean(process.env.ADMIN_PASS);
  return (
    <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center px-6">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-charcoal to-steel-deep"
      />
      <div aria-hidden className="absolute inset-0 -z-10 noise" />
      <div className="w-full max-w-md rounded-md border border-cream/15 bg-charcoal/70 p-8 shadow-[var(--shadow-elev-3)] backdrop-blur md:p-10">
        <div className="text-center">
          <span className="font-script text-4xl text-cream">Chris Daniels</span>
          <span aria-hidden className="my-3 mx-auto block h-px w-24 bg-oak-soft/70" />
          <span className="block text-[10px] font-medium uppercase tracking-floors text-cream/80">
            Floors · Admin
          </span>
        </div>
        {!configured ? (
          <p className="mt-8 rounded-sm border border-amber-300/60 bg-amber-50/10 p-4 text-sm text-amber-200">
            Admin isn&apos;t configured yet. Set the <code>ADMIN_PASS</code>{" "}
            environment variable in Vercel and redeploy.
          </p>
        ) : (
          <LoginForm next={searchParams.next} error={searchParams.error} />
        )}
      </div>
    </div>
  );
}
