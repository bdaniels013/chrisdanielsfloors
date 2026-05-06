# Chris Daniels Floors — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Built to mirror and elevate
chrisdanielsfloors.com, ready to deploy to Vercel from GitHub.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel (via GitHub)

1. From this folder (`chrisdanielsfloors-web`), initialize a git repo:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new GitHub repo (e.g. `chrisdanielsfloors-web`) and push:

   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/chrisdanielsfloors-web.git
   git push -u origin main
   ```

3. In Vercel, import the GitHub repo. Framework preset: **Next.js**. No build
   command override needed.

4. Add a custom domain — `chrisdanielsfloors.com` — in Vercel's Domains panel.

## Where to edit common content

| Want to change…                | Edit                                 |
| ------------------------------ | ------------------------------------ |
| Phone, hours, service area     | `lib/site.ts`                        |
| Top nav links                  | `lib/site.ts` (`nav` array)          |
| Homepage sections              | `app/page.tsx`                       |
| Knox / Nora copy + specs       | `app/(routes)/knox/page.tsx`, `nora` |
| Installation page              | `app/(routes)/installation/page.tsx` |
| Gallery items                  | `components/Gallery.tsx`             |
| Quote form fields & validation | `components/QuoteForm.tsx`, `app/actions.ts` |
| Brand colors / fonts           | `tailwind.config.ts`, `app/layout.tsx` |
| OG / favicon                   | `app/opengraph-image.tsx`, `app/icon.tsx` |

## Real photos

The site uses brand-faithful CSS gradient placeholders for every photo
(`components/PlaceholderImage.tsx`) until real shots are ready. To swap in real
images:

1. Drop optimized JPG/WebP files into `public/photos/`.
2. Replace `<PlaceholderImage … />` with `<Image src="/photos/your-shot.jpg" … />`
   from `next/image`.
3. Honor the brand photography rules: natural light, floor-as-subject, no stock.

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

> Built right. Built to stay.
