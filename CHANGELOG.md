# Changelog

## 1.5.0 — 2026-09-12

Merchant features, structured data and finishing — no apps required.

### Added
- **Wishlist**: heart on product cards and the product title, header icon with
  a live count, `page.wishlist` template that loads saved products through the
  Section Rendering API. Stored in the browser (`localStorage`), no account
  needed. Theme settings › Wishlist & quick view.
- **Quick view**: "Quick view" on product cards opens a dialog with the first
  image, price, variant select, quantity and add-to-cart (goes through the cart
  drawer). Falls back to the product page if the request fails.
- **Six sections**: FAQ (native `details`, one open at a time, FAQPage
  JSON-LD), Testimonials (grid or snap carousel, ratings), Trust badges (ten
  line icons), Countdown (local time, hides or shows a message when expired),
  Size guide (cm / in toggle), Comparison table (highlighted column, sticky
  first column on mobile).
- **Country / language selector in the header** (Shopify Markets), sharing one
  `localization-form` snippet with the footer.
- **Structured data**: Organization and WebSite + SearchAction on the home
  page, BreadcrumbList on collection, product, blog, article and page,
  CollectionPage + ItemList (first 12 products) on collections.

### Changed
- Product card hover: the "Image zoom" option is replaced by **"Show second
  image"** (default) — the next product photo appears flat on hover, no fade.
  Cards with one image do not move.
- Solid buttons sink one pixel on press.
- Default home template: trust badges, testimonials and FAQ replace the
  three-column placeholder block.
- The heading font is preloaded (the h1 is usually the largest paint); stores
  without a favicon no longer trigger a `/favicon.ico` 404 on every page.

## 1.4.2 — 2026-08-25

27 fixes from a full audit of 1.4.1 (52 reviewing agents, every finding
adversarially verified, every fix re-tested on a live store).

### Fixed
- **Add to cart failed without JavaScript on single-variant products.** The
  1.2.0 no-JS fallback disabled the hidden variant-id field on the assumption
  that a `noscript` select would replace it — but that select only renders for
  multi-variant products. Single-variant products posted without an id and
  Shopify answered 400. The field is now disabled only when the fallback
  actually renders. Same fix on the Featured product section.
- Collection filters went silently dead when a price field held an
  out-of-range value; inputs are now clamped and the native validation
  message is surfaced instead of a mute block.
- Without JavaScript, mobile visitors had no navigation (hidden nav, inert
  burger) and the search button did nothing. The nav now unhides via noscript
  and the search control is a real link to the search page.
- Sticky-header offset was hardcoded at 88px: a logo taller than ~67px made
  the header overlap sticky columns. The offset now follows the logo height.
- Search overlay: ESC stopped working and Tab escaped the dialog once focus
  fell back to the page body.
- Quick-add buttons lost their hidden product name after one add; failed adds
  left the product button stuck on "Adding…"; submitter-less submits dropped
  the variant id.
- Currency code (when enabled) was dropped by the Featured product variant
  switch, the predictive-search prices, and the customer order pages.
- Submenu panels and quick-order labels could overflow the page horizontally;
  a very long word could overflow the image banner.
- Gradient colour schemes now paint the page background and boxed surfaces;
  the button border-opacity setting works again.
- Empty states: collections list without collections, order detail without
  addresses.
- Accessibility: column headings no longer skip a level when the section
  heading is cleared; the announcement bar gets a pause control whenever it
  auto-rotates; discounted prices carry a "Sale price" label for screen
  readers.

Entries for 1.3.0 and 1.4.0 were rewritten on 2026-08-25 after each claim was
checked against the code. Three features listed there as new had in fact
shipped in 1.2.0, and one explanation was wrong. They are corrected below and
credited to the release they actually came from.

## 1.4.1 — 2026-08-20

### Removed
- The `policy` template and its section — dead code. Shopify accepts the file
  on upload, but it never renders it: store policies at `/policies/…` are drawn
  by Shopify itself, inside your theme's header and footer. Verified by putting
  the template back with a marker in it — the marker never reached the page,
  which used Shopify's own `shopify-policy__container`. Nothing changes for
  stores. For a legal page you want in your menu, a regular Page gives the same
  centred reading column.

## 1.4.0 — 2026-08-20

### Added
- Complementary product recommendations. The **Related products** section now
  has a **Recommendation type** setting: *Related* picks products
  automatically, *Complementary* shows the ones you pair by hand in the free
  Shopify Search & Discovery app.
- The Related products section can now be added from the editor, and only on
  the product template. It shipped without a preset, so the second instance —
  the one you need to show complementary products alongside related ones —
  could not be added at all.

## 1.3.0 — 2026-08-20

### Added
- Shop Pay Installments banner on the product page and the featured product
  section, shown automatically when your store is eligible.

## 1.2.0 — 2026-08-11

First public release.

### Added
- Colour schemes: five editable schemes, selectable per section.
- 130 theme settings across 21 groups — typography, layout, animations,
  buttons, inputs, variant pills, product/collection/blog cards, content
  containers, media, popups, drawers, badges, brand information, search,
  currency format, cart.
- 22 addable sections, including slideshow, video, collage, multirow,
  collapsible content, collection list, featured blog, featured product,
  email signup banner, page content, quick order list, and app blocks.
- Express payment buttons (Apple Pay, Google Pay, Shop Pay) on the product and
  featured product sections, with a **Show dynamic checkout buttons** switch on
  the Buy buttons block.
- Unit price on the product page and on product cards — required in the EU
  (Directive 98/6/EC) for anything sold by weight, volume or length. It appears
  once you set a unit of measure on the variant, and follows the selected one.
- Payment method logos in the footer, taken from the methods your store
  accepts. Setting: **Show payment icons**.
- Scroll reveal, configurable hover effect, LCP-aware image loading on the
  first row of product grids.

### Fixed
- Variant selection now posts correctly with JavaScript disabled: a `noscript`
  select carries the variant id, so the chosen variant is what reaches the cart.
- Product pages show the price of the selected variant, not the product minimum.
- Slideshow set to "adapt to first image" no longer exceeds the viewport width
  on phones.
- Secondary text and control borders stay above WCAG AA contrast on every
  shipped colour scheme.
- Shadow colour follows the active colour scheme instead of the first one.
- Price filter no longer multiplies values by 100 in comma-decimal currencies.
- Cart drawer refreshes after a bulk add, and the "Added to cart" confirmation
  stays visible.
- Product card buttons align across a row regardless of title length.

### Notes
- No external dependencies, no tracking, no CDN calls.
- Every purchase path works without JavaScript.
