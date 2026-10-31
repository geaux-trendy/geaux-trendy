# Geaux Trendy — first website prototype

A responsive, static marketplace storefront prototype using HTML, CSS and JavaScript. Includes product filtering/search, demo shopping bag, seller signup preview and dashboard preview.

## IMPORTANT
This is **not** a production marketplace. Product data is illustrative. There are no real accounts, database, checkout, payments, subscriptions, inventory tracking, admin permissions, or seller payouts. Do not accept real orders or represent demo signup as active.

## Preview locally
Open `index.html` in a browser.

## Deploy on Vercel
1. Create a GitHub repository and upload `index.html`, `styles.css`, and `script.js` from this folder to the repository root.
2. At https://vercel.com/new import the repository. Select Framework Preset **Other**, root directory `./`, and no build command. Deploy.
3. Vercel will provide a preview URL. Test it.
4. In Vercel Project → Settings → Domains add `geauxtrendy.com` and `www.geauxtrendy.com`.
5. Copy the **exact DNS records shown by Vercel**. In GoDaddy Domain Portfolio → geauxtrendy.com → DNS, add/update the required records. Do not delete MX, TXT or other records used by email. Avoid changing nameservers unnecessarily.
6. Return to Vercel Domains to confirm verification and HTTPS, and select a canonical redirect.

## Production roadmap
- Replace static site with Next.js, TypeScript, database (e.g. hosted PostgreSQL) and server-side authorization.
- Seller/customer authentication, verified email, password reset, roles and row-level access.
- Seller onboarding and payout verification using Stripe Connect.
- Stripe Billing subscription with 30-day trial and $9.99 recurring charge, including payment failure/cancellation logic and trial-abuse prevention.
- Checkout using server-side prices, inventory reservation, order ledger, 10% platform fee and seller payouts. Plan payment processor fees, refunds, taxes, chargebacks and commission calculation policy.
- Upload/storage for product photos; moderation, handmade-only policy, prohibited-items policy and admin review.
- Security/privacy/terms/refunds, tax reporting, logging, monitoring, backups, accessibility and full end-to-end testing.

Do not put Stripe secret keys or private database credentials in frontend JavaScript.
