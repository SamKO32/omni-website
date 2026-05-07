# OMNI Website — Bugs, Issues & Fix Plans

Issues are grouped by severity. Each entry includes the file + line reference and a 1–2 sentence fix plan.

---

## Critical

### 1. Contact form submits nowhere
**File:** `src/pages/ContactPage.tsx:25–28`  
`handleSubmit` logs to console and sets `submitted = true`, but never sends data anywhere. Wire up a form backend such as [Formspree](https://formspree.io) (one `fetch` POST call) or an email API — swap `console.log` for the API call before setting `submitted`.

---

### 2. `.mov` videos don't play on Firefox or Windows Chrome
**File:** `public/videos/` (all video sources)  
`.mov` is a container format with inconsistent browser support — Firefox and some Chromium builds on non-Mac will show a black screen. Re-encode every video to `.mp4` (H.264) and update the `src` props, or add a `<source>` fallback inside `VideoBackground.tsx`.

---

## High

### 3. `removeFromCart` wipes all duplicates instead of one
**File:** `src/context/StoreContext.tsx:115–126`  
`removeFromCart` uses `.filter()` which removes every item matching `{id, size, variantId}` at once. `CartPopup.handleRemoveAll` loops the call N times expecting single-item removal per call — so calling it once removes everything. Change `removeFromCart` to remove only the **first** matching item using `findIndex` + `splice`, and update `handleRemoveAll` to call it once.

---

### 4. `ProductPage` crashes if `product.sizes` is undefined
**File:** `src/pages/ProductPage.tsx:91`  
`product.sizes.map(...)` is called without a null check. The `Product` type in `StoreContext.tsx` declares `sizes` as optional (`sizes?: string[]`), meaning TypeScript won't catch this. Add a guard (`product.sizes ?? []`) or make `sizes` required in the type definition.

---

### 5. Quantity input in `CartPopup` allows negative values
**File:** `src/components/ui/CartPopup.tsx:39–58`  
If a user manually types a negative number, `parseInt` returns a negative value that is less than `currentCount`, sending the code into the removal branch and over-removing items. Add a `if (newQuantity < 0) return;` guard before the quantity comparison logic.

---

### 6. `Suspense` fallback is `null` — blank screen during lazy-load
**File:** `src/App.tsx:22`  
All pages are lazy-loaded, but the `Suspense` fallback is `null`, giving users a blank black screen while chunks download (noticeable on slow connections). Swap `fallback={null}` for `fallback={<LoadingScreen />}` — the component already exists at `src/components/ui/LoadingScreen.tsx`.

---

## Medium

### 7. `showCart` state is duplicated — context value is ignored
**File:** `src/pages/StorePage.tsx:10`, `src/pages/ProductPage.tsx:12`, `src/context/StoreContext.tsx:104`  
Both pages define their own local `showCart` state and ignore the context's `showCart`/`setShowCart`. This means the cart can't be programmatically opened from outside these pages. Either remove `showCart` from the context (simplify) or make the pages consume the context value (unify).

---

### 8. `useStore()` called twice in `CartPopup`
**File:** `src/components/ui/CartPopup.tsx:7,9`  
`useStore()` is invoked on line 7 and again on line 9. Both calls return the same context object — merge them into one destructured call to avoid redundant hook invocations.

---

### 9. Shopify API version hardcoded in two places
**File:** `lib/shopify.ts:9,51`  
The API version string `"2024-01"` appears in both fetch URLs. Extract it to a `const API_VERSION = "2024-01"` at the top of the file so it only needs updating in one place when the version is deprecated.

---

### 10. `createShopifyCheckout` parameter typed as `any[]`
**File:** `lib/shopify.ts:3`  
The `items` parameter has no type, bypassing all TypeScript safety. Define an interface (e.g. `CheckoutItem { variantId: string; quantity: number }`) and use it as the parameter type.

---

### 11. `unlocked` is dead code and the gating logic is unreachable
**File:** `src/App.tsx:17,26–39`  
`const [unlocked] = useState(true)` is hardcoded and never changes. The `else` branch that redirects to `/` can never execute. Either remove the conditional entirely (clean up) or wire `unlocked` to real logic if a gate is planned.

---

### 12. `type InfoTab` declared inside component function body
**File:** `src/pages/ProductPage.tsx:17`  
The `InfoTab` type alias is defined inside the render function, causing it to be redefined on every render. Move it to file scope (above the component function).

---

### 13. Backward-compat `any` cast in cart storage loader
**File:** `src/context/StoreContext.tsx:56`  
`if (Array.isArray(payload as any))` casts to `any` to handle old array-format storage. This skips validation and could load malformed data. The comment says it's for backwards compatibility — if the old format is no longer in use, remove this branch; otherwise add a basic item-shape check before returning.

---

## Low / Cleanup

### 14. Three unused UI components
**Files:** `src/components/ui/CartPanel.tsx`, `Navbar.tsx`, `MenuPanel.tsx`  
These components are defined but never imported or rendered anywhere. If they're not planned for use, delete them to reduce bundle surface area and confusion.

### 15. `CartPersistence.tsx` duplicates `StoreContext` logic and is unused
**File:** `src/utils/CartPersistence.tsx`  
The file re-implements the same `saveCart`/`loadCart`/`clearCartStorage` functions that already live in `StoreContext.tsx`. It is not imported anywhere. Delete it.

### 16. No React error boundary
**File:** `src/App.tsx`  
An unhandled render error in any page will crash the entire app to a white screen with no recovery. Wrap `<Routes>` (or individual pages) in an error boundary component that displays a fallback UI and a "go home" link.

### 17. No `vite.config.ts`
**File:** project root  
Vite is running with default settings — no React plugin is explicitly configured. Add a `vite.config.ts` with `@vitejs/plugin-react` to ensure JSX transforms, fast refresh, and proper build optimization are active.
