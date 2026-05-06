# Chris Daniels Floors — Website

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. Deployed on
Vercel with photo storage in Vercel Blob.

> Built right. Built to stay.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To use the photo admin locally, create a `.env.local` file:

```
ADMIN_PASS=some-strong-password

# Optional — connect to a Vercel Blob store (see "Vercel Blob" below)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then visit http://localhost:3000/admin — you'll be redirected to a sign-in
page. Enter the password and you're in for 30 days (signed httpOnly cookie).

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

The repo is already connected — pushes to `main` deploy automatically.

### One-time setup

1. **Enable Blob storage**
   - Vercel project → Storage → Create → **Blob**.
   - This auto-adds a `BLOB_READ_WRITE_TOKEN` env var to all environments.

2. **Set admin password**
   - Vercel project → Settings → Environment Variables → add:
     - `ADMIN_PASS` — pick a strong password
   - Apply to **Production**, **Preview**, and **Development**.
   - (`ADMIN_USER` from earlier versions is no longer used — safe to remove.)

3. **Redeploy** so the new env vars take effect.

4. **Custom domain** — Vercel → Domains → add `chrisdanielsfloors.com`.

## Photo Admin (`/admin`)

Visit `https://your-domain.com/admin`. You'll be redirected to a sign-in page —
enter the `ADMIN_PASS` you set in Vercel. Sessions last 30 days (signed
httpOnly cookie). A "Sign out" link in the admin header clears it.

From there you can:

- Drag &amp; drop one or many photos at once
- Categorize them (Hero, Knox, Nora, Gallery — LVP / Hardwood / Tile / Carpet,
  Installation)
- Edit titles and captions
- Delete photos
- Move a photo between categories

Where each category appears on the public site:

| Category                | Where it shows                               |
| ----------------------- | -------------------------------------------- |
| `Hero`                  | Homepage hero background (first photo wins)  |
| `Knox Collection`       | `/knox` product gallery + Services card      |
| `Nora Collection`       | `/nora` product gallery + Services card      |
| `Installation`          | Services card + main gallery                 |
| `Gallery — LVP`         | `/gallery` (filter: LVP)                     |
| `Gallery — Hardwood`    | `/gallery` (filter: Hardwood)                |
| `Gallery — Tile`        | `/gallery` (filter: Tile)                    |
| `Gallery — Carpet`      | `/gallery` (filter: Carpet)                  |

Photos appear on the public site within seconds — pages re-render on every
request and read straight from the Blob manifest.

If no photos are uploaded yet, the public site falls back to brand-faithful
gradient placeholders so it never looks broken.

## Where to edit common content

| Want to change…                | Edit                                    |
| ------------------------------ | --------------------------------------- |
| Phone, hours, service area     | `lib/site.ts`                           |
| Top nav links                  | `lib/site.ts` (`nav` array)             |
| Homepage section order         | `app/page.tsx`                          |
| Knox / Nora copy + specs       | `app/(routes)/knox/page.tsx`, `nora`    |
| Installation page              | `app/(routes)/installation/page.tsx`    |
| Testimonials                   | `components/Testimonials.tsx`           |
| Stats numbers                  | `components/Stats.tsx`                  |
| Quote form fields              | `components/QuoteForm.tsx`, `app/actions.ts` |
| Brand colors / fonts           | `tailwind.config.ts`, `app/globals.css` |
| OG / favicon                   | `app/opengraph-image.tsx`, `app/icon.tsx` |

## Architecture

```
lib/photos.ts          Vercel Blob manifest read/write + typed accessors
middleware.ts          Basic-auth gate for /admin/* and /api/admin/*
app/admin              Photo manager UI (client) + page wrapper (server)
app/api/admin          Manifest GET, photo POST/PATCH/DELETE
app/api/blob-upload    handleUpload endpoint for client-direct uploads
components/motion      Reveal, Stagger, ScrollProgress (framer-motion)
components/SmartImage  Next/Image wrapper with placeholder fallback
```

### Photo upload flow

Photos go straight from the browser to Vercel Blob — they don't pass through a
serverless function — so the 4.5 MB serverless body limit doesn't apply. Up to
25 MB per file.

1. Browser POSTs to `/api/blob-upload` with file metadata. The route's
   `onBeforeGenerateToken` re-checks the Basic-Auth header (forwarded
   automatically by the browser since the admin page is in the same realm) and
   returns a short-lived signed token.
2. Browser uploads the file directly to Blob storage with the token.
3. Once the upload resolves, the browser POSTs to `/api/admin/photo` (gated by
   middleware) with the resulting URL + chosen category/title/caption to
   append a record to `manifest.json` in Blob.
4. Public pages call `getPhotos(...)` / `getGalleryPhotos()` from
   `lib/photos.ts`, which fetches the manifest at request time. New uploads
   are visible on the next page load.

Local dev note: browsers cache Basic Auth credentials per origin, so once
you've logged into `/admin`, the upload flow Just Works on `localhost`.


## Quote form delivery

`app/actions.ts` currently logs submissions server-side. To wire real email
delivery, add a service of your choice (Resend, SendGrid, Postmark, or a
Formspree-style webhook) inside `submitQuote`. The form fields are already
validated and the values are passed in.

## Brand source of truth

The full brand guidelines live one folder up at
`../chris daniels/chris-daniels-floors-brand-guidelines.html`. When in doubt:
plain-and-confident voice, narrow color palette (cream / charcoal / steel /
mist / oak), three fonts (Great Vibes script, Playfair Display serif, Inter
sans), one horizon-line motif.

## Tech notes

- `framer-motion` powers the scroll-triggered reveals and the hero cinematic
  intro. All animations honor `prefers-reduced-motion`.
- `yet-another-react-lightbox` powers the gallery lightbox.
- Image optimization is on (`next/image` with AVIF/WebP). Vercel Blob hostnames
  are whitelisted in `next.config.mjs` `images.remotePatterns`.
- Server actions accept up to 25 MB per file (config in `next.config.mjs`).

## Roadmap / known follow-ups

- Bump to Next.js 16 to clear residual `npm audit` advisories (currently on the
  fully-patched 14.2.x line — DoS-only advisories with no clean 14.x backport).
- Wire `submitQuote` to a real email/SMS service.
- Replace the static before/after slider images on `/gallery` with real photos
  once a "before/after" pair lands in the admin.
