This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Copy the example environment file and fill in the required values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key for public/server reads.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key for admin actions and import scripts.
- `ADMIN_PASSWORD`: Password for the admin screen.
- `ADMIN_SESSION_TOKEN`: Random string used for the admin session cookie.
- `REVALIDATE_SECRET`: Secret for `POST /api/revalidate-all`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cache Revalidation

Vercel creates a new deployment on every Git push, so static assets are replaced automatically.
To refresh Next.js data caches after a deployment, call the protected endpoint:

```bash
curl -X POST "https://used-lab.jp/api/revalidate-all" \
  -H "Authorization: Bearer $REVALIDATE_SECRET"
```

Configure this call in GitHub Actions or another post-deploy workflow after the Vercel deployment is ready.
This repository includes `.github/workflows/revalidate-after-vercel.yml`, which runs on a successful Vercel production deployment status.
Add the same `REVALIDATE_SECRET` value to both Vercel environment variables and GitHub Actions secrets.
