# OMNI Website — Architecture

## Overview

OMNI is a React + TypeScript single-page application for a clothing brand. It serves as a storefront, music hub, and brand portal. Checkout is handled end-to-end through the Shopify Storefront API. The site is built with Vite and styled with Tailwind CSS.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Bundler | Vite (no explicit config file — uses defaults) |
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
├── index.html               # Root HTML shell
├── src/
│   ├── main.tsx             # React 18 entry point
│   ├── App.tsx              # Root component — router + providers
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
│   │   ├── CartPopup.tsx    # Cart modal — active, used by Store + Product pages
│   │   ├── TVFrame.tsx      # Fixed overlay image (CRT aesthetic)
│   │   ├── VideoBackground.tsx # Reusable video component with load state
│   │   ├── LoadingScreen.tsx   # Loading overlay (exists but unused in routing)
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
│   ├── images/              # Product images, UI images (PNG/JPG)
│   └── videos/              # Background videos (.mov)
│
├── .env                     # VITE_SHOPIFY_DOMAIN, VITE_SHOPIFY_STOREFRONT_API_TOKEN
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
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

`App.tsx` has an `unlocked` boolean (hardcoded `true`) that was originally intended to gate non-home routes. The else branch (redirect everything to `/`) is currently dead code.

---

## State Management

Single context: `StoreContext` (src/context/StoreContext.tsx).

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

- **TVFrame** — fixed PNG overlay that sits above all content (z-index 10, pointer-events none)
- **VideoBackground** — full-screen looping muted video (`.mov` files); shows black until `canplaythrough` fires
- **Custom animations** — `tv-static`, `scanlines`, `vignette`, `animate-flicker` defined in `index.css`
- **Custom font** — `font-custom` (MotorolaScreentype) used site-wide
- **Viewport units** — heavy use of `dvh`/`dvw` for mobile-safe sizing

Each page independently manages its own video background source.

---

## Product Data

Products are hardcoded in `src/data/products.tsx`. Each product has:
- `id`, `name`, `price` (string, e.g. `"$30"`)
- `image`, `hoverImage?`, `extraImages[]`
- `sizes: string[]`
- `variants: { size, variantId }[]` — Shopify GID variant IDs

Currently 2 products: **PSP TEE** and **TIME F\*CKS TEE**.

---

## Build & Deploy

```bash
make install    # npm install
make start      # npx vite --host (LAN-accessible)
make lint       # npm run lint
make deploy msg='commit message'   # git add -A && commit && push
```

Build output goes to `dist/`. No CI pipeline is configured.
