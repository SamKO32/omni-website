# OMNI Website — Architecture

## Overview

OMNI is a React + TypeScript single-page application for a clothing brand. It serves as a storefront, music hub, and brand portal. Checkout is handled end-to-end through the Shopify Storefront API. The site is built with Vite and styled with Tailwind CSS.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Bundler | Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 + custom CSS in `index.css` |
| State | React Context (`StoreContext`) |
| Commerce | Shopify Storefront GraphQL API (2024-01) |
| Fonts | Custom: MotorolaScreentype (`@font-face` → `font-custom`) |
| Icons | react-icons |
| Persistence | `localStorage` with 3-day TTL |

---

## Directory Structure

```
omni-website/
├── index.html               # Root HTML shell — includes preload hints for tvframenew.png + gate video
├── tsconfig.json            # TypeScript project config (include: src/, lib/)
├── src/
│   ├── main.tsx             # React 18 entry point
│   ├── App.tsx              # Root component — router + providers + TVFrame (mounted once here)
│   ├── Layout.tsx           # Shared layout with back button (Outlet)
│   ├── index.css            # Tailwind directives + global animations
│   ├── styles/fonts.css     # @font-face declaration for custom font
│   ├── assets/fonts/        # TTF font files
│   │
│   ├── pages/
│   │   ├── GatePage.tsx     # Splash/entry screen
│   │   ├── HomePage.tsx     # Navigation hub (Store / Listen / FAQ / Contact)
│   │   ├── StorePage.tsx    # Product grid listing
│   │   ├── ProductPage.tsx  # Individual product detail + add-to-cart
│   │   ├── ListenPage.tsx   # Spotify embed + streaming links
│   │   ├── FAQPage.tsx      # FAQ (mostly stubbed)
│   │   ├── ContactPage.tsx  # Contact form (UI only — no backend)
│   │   └── PrivacyPage.tsx  # Privacy policy
│   │
│   ├── components/ui/
│   │   ├── CartPopup.tsx    # Cart modal — used by Store + Product pages
│   │   ├── TVFrame.tsx      # Fixed CRT overlay — mounted once in App.tsx, never per-page
│   │   ├── VideoBackground.tsx # Reusable video component (canplay event, preload="auto", poster support)
│   │   ├── LoadingScreen.tsx   # Branded loading overlay with TV static effect
│   │   ├── button.tsx          # Generic button wrapper
│   │   ├── CartPanel.tsx    # Sidebar cart — UNUSED
│   │   ├── Navbar.tsx       # Top nav — UNUSED
│   │   └── MenuPanel.tsx    # Sidebar menu — UNUSED
│   │
│   ├── context/
│   │   └── StoreContext.tsx # Global cart state + localStorage persistence
│   │
│   ├── data/
│   │   └── products.tsx     # Hardcoded product catalog (2 products)
│   │
│   └── utils/
│       └── CartPersistence.tsx # Duplicate cart storage utilities — UNUSED
│
├── lib/
│   └── shopify.ts           # Shopify Storefront GraphQL client
│
├── public/
│   ├── images/
│   │   ├── products/        # Product images — primary renders in .webp, detail shots in .jpg
│   │   └── posters/         # First-frame JPGs extracted from each video (used as poster= attrs)
│   └── videos/              # Background videos in H.264 .mp4 with faststart flag
│
├── .env                     # VITE_SHOPIFY_DOMAIN, VITE_SHOPIFY_STOREFRONT_API_TOKEN
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── optimize-assets.sh       # One-time script: converts .mov → .mp4 and renders PNGs → WebP
└── Makefile                 # install / lint / start / deploy targets
```

---

## Routing

All routes are lazy-loaded via `React.lazy` + `<Suspense fallback={null}>`.

```
/              → GatePage (splash, click to enter)
/home          → HomePage (navigation hub)
/store         → StorePage        ┐
/product/:id   → ProductPage      │  all under <Layout>
/listen        → ListenPage       │  (shared back button)
/faq           → FAQPage          │
/contact       → ContactPage      │
/privacy       → PrivacyPage      ┘
```

`App.tsx` has an `unlocked` boolean (hardcoded `true`) that was originally intended to gate non-home routes. The else branch is currently dead code.

---

## State Management

Single context: `StoreContext` (`src/context/StoreContext.tsx`).

**Provided values:**
- `cart: CartItem[]` — array of items (one entry per add-to-cart action, duplicates allowed for qty)
- `addToCart(item)` — appends item; duplicates represent quantity
- `removeFromCart(match)` — removes ALL items matching `{id, size, variantId}`
- `clearCart()` — empties cart and clears storage
- `showCart / setShowCart` — modal visibility flag (partially unused; pages use local state instead)

**Persistence:**
Cart is saved to `localStorage` under key `omni_cart_v1` as a versioned JSON payload with a 3-day TTL. Loaded once on mount.

---

## Commerce / Checkout Flow

Handled in `lib/shopify.ts` via two sequential GraphQL mutations to the Shopify Storefront API:

```
1. cartCreate mutation  →  returns cartId
2. cartLinesAdd mutation (cartId + line items)  →  returns checkoutUrl
```

`CartPopup` calls `createShopifyCheckout(groupedItems)`, then redirects to the Shopify-hosted checkout URL. On success, local cart is cleared.

**Env vars required:**
- `VITE_SHOPIFY_DOMAIN` — e.g. `omni-9335.myshopify.com`
- `VITE_SHOPIFY_STOREFRONT_API_TOKEN` — public Storefront token

---

## Visual / UI System

The site has a deliberate retro-CRT aesthetic:

- **TVFrame** — mounted once in `App.tsx` (above `<Suspense>` and `<Routes>`), persists across all navigation with no flash. Fixed PNG overlay, z-index 10, pointer-events none.
- **VideoBackground** — full-screen looping muted `.mp4`; shows a poster frame (static JPG) immediately while the video buffers, then crossfades to video on `canplay`.
- **Custom animations** — `tv-static`, `scanlines`, `vignette`, `animate-flicker` defined in `index.css`
- **Custom font** — `font-custom` (MotorolaScreentype) used site-wide
- **Viewport units** — heavy use of `dvh`/`dvw` for mobile-safe sizing

Each page supplies its own `VideoBackground` source and poster path. Pages do **not** render TVFrame individually.

---

## Asset Pipeline

### Videos
All background videos are H.264 `.mp4` encoded with `-movflags faststart` (metadata at file start — playback begins before full download).

| File | Size |
|---|---|
| GATEPAGEBG.mp4 | ~4.5 MB |
| HOMEPAGEBG.mp4 | ~3.7 MB |
| LISTENPAGEBG.mp4 | ~8.0 MB |
| bgspace.mp4 | ~3.5 MB |

Original `.mov` sources (~298 MB total) can be deleted once `.mp4` files are confirmed working. `optimize-assets.sh` at the repo root performs the conversion via `ffmpeg`.

### Images
Primary product render images are `.webp` (converted from PNG via `cwebp`). Detail/lifestyle shots remain `.jpg`.

| File | Size |
|---|---|
| psp_render.webp | ~187 KB |
| tf_render_f.webp | ~530 KB |
| tf_render_b.webp | ~417 KB |

Poster frames (first frame of each video) live in `public/images/posters/` and are referenced via the `poster` prop on `VideoBackground`.

---

## Product Data

Products are hardcoded in `src/data/products.tsx`. Each product has:
- `id`, `name`, `price` (string, e.g. `"$30"`)
- `image` (.webp), `hoverImage?` (.webp), `extraImages[]` (.jpg)
- `sizes: string[]`
- `variants: { size, variantId }[]` — Shopify GID variant IDs

Currently 2 products: **PSP TEE** and **TIME F\*CKS TEE**.

---

## Tooling

### Lint
```bash
npm run lint   # eslint src/ lib/ --cache
```
Config (`eslint.config.js`) uses `@typescript-eslint/parser` with only two plugins: `react-hooks` and `react-refresh`. First run is slow due to macOS Gatekeeper scanning the parser binary; subsequent runs hit the cache and complete in ~1 second.

### Build & Deploy
```bash
make install    # npm install
make start      # npx vite --host (LAN-accessible dev server)
make lint       # npm run lint
make deploy msg='commit message'   # git add -A && commit && push
```

Build output goes to `dist/`. No CI pipeline is configured.
