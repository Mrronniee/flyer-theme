# Changelog

## 1.7.4 - 2026-09-17

### Fixed
- **Cart drawer with the keyboard.** Opening the cart - by click, by pressing
  Enter on the cart link, or automatically after adding a product - now puts
  focus on the first button inside the drawer. Tab and Shift+Tab stay inside
  the drawer until it is closed, even after a quantity change, after a line is
  removed, or when a cookie banner or app tries to take focus. Escape always
  closes it and returns focus to where the shopper was.
- **Cart drawer with a screen reader.** The drawer is announced simply as
  "Your cart" (it used to read the item count twice), in the store's language.
  "Added to cart" is now read out after every add, including when the same
  product is added twice in a row, and disappears after a few seconds.
- **Cart errors are easier to spot.** An error message in the drawer now has a
  thicker border and heavier text, so it stands apart from a confirmation
  without relying on colour, and stays readable on every colour scheme. It
  stays visible until the next cart action succeeds.
- **Hero split heading.** Screen readers no longer run the heading's lines
  together into one word; each line is read with a space between them.

## 1.7.3 - 2026-09-14

### Changed
- **Even blocks by default.** The home page's featured collection is back to a
  uniform grid, and the lookbook shows every look at the same height (4:5, no
  stagger). Both editorial options stay one setting away: Featured collection >
  Layout > Editorial, and Lookbook > Rhythm > Offset. A new Lookbook section also
  starts even.

## 1.7.2 - 2026-09-13

### Fixed
- **Lookbook, offset rhythm.** Every second look sits 48px lower, but with mixed
  image ratios the bottoms stopped following: a square fourth look started lower
  than the first and ended higher. Offset now gives every look the first look's
  ratio, so tops and bottoms zigzag together. Choose Even to mix ratios.
- **Featured collection heading with section numbering.** The number became a
  third item in the heading row - alone at the far left, pushing the title to
  the middle. It now sits on its own line above the title, like every other
  section.

## 1.7.1 - 2026-09-13

### Fixed
- **Hero split with a longer heading.** The title was sized for short lines and
  capped at 12 characters wide. A heading with longer lines - in French, or any
  merchant's own words - broke each line into two or three rows and pushed the
  buttons below the fold: 6 rows instead of 4 at 1440 px, and an 18-character
  line capped at 178 px inside a 326 px column at 740 x 360. The cap is now 18
  characters, and the title steps down in size when its longest line passes 13
  or 22 characters. Short headings keep the full size.
  Measured with a French heading: buttons above the fold at 320x700, 390x844,
  667x375, 740x360, 844x390, 768x1024, 1024x768, 1440x900 and 1920x1080.
- Hero on a small phone held short (320 x 700): a little less picture, so the
  buttons clear the fold.

### Known limits
- On a 320 x 568 screen (first-generation iPhone SE) the hero buttons stay below
  the fold.

## 1.7.0 - 2026-09-13

### Added
- **French.** Every word a shopper sees now ships in French as well as English:
  product cards and pages, cart and cart drawer, filters and sorting, search,
  wishlist, quick view, blog and comments, contact form, customer accounts,
  addresses and orders, gift card, password page, 404, and the accessibility
  labels read by screen readers - 263 strings, the full set. Shopify picks the
  language from the store, so a French store gets French with nothing to set.
  French typography throughout: non-breaking spaces before : ? ! and inside
  guillemets, typographic apostrophes, day-month-year dates.

### Not translated
- Theme editor labels (section and setting names in the Shopify admin) are
  still English.
- Default section copy (hero heading, FAQ questions, testimonials, trust badge
  text) is merchant content: it is written in English and meant to be replaced.

## 1.6.2 - 2026-09-13

Exotic screens: landscape phones, foldables, browser zoom to 400%, text-only
zoom to 200%, tablets in both orientations, 21:9 and 4K. 173 viewport x page
pairs measured, every finding put to three independent sceptics.

### Fixed
- **Checkout was unreachable in the cart drawer at 300-400% browser zoom.** The
  footer does not shrink and nothing scrolled, so the button sat below the fold
  with no way to get to it. The whole panel scrolls on very short viewports.
- **The menu button collapsed to 0px wide at 280px** (a folded Galaxy Fold) and
  to 20px at 200% text zoom: the header row was shrinking a tap target. Icon
  buttons no longer shrink - 44 x 44 at every width measured.
- **Quick view: the close button scrolled out of sight**, off screen from the
  first paint on a landscape phone, because the dialog was both the scroll
  container and the button's positioning context, and the script scrolled the
  dialog to the heading. The body scrolls, the button stays put, focus no
  longer scrolls the box.
- **Quick view was pinned to the top-left corner** instead of the middle of the
  screen - the global margin reset beat the dialog's own centring. Obvious on a
  21:9 display.
- **The hero ran to 1.5 screens on a landscape phone**, title and buttons both
  below the fold. Side by side, centred and tightened on short viewports: the
  call to action is on screen at 667x375, 740x360, 844x390 and 932x430.
- **Trust badges and the wishlist header overflowed** the page at 175-200% text
  zoom. Both wrap now.
- The sticky header stops sticking below 480px of viewport height, where a 64px
  bar was eating a third of the page.
- The editorial layout's large card was asking for a 540px file to fill a 606px
  slot; it now gets 900px.

### Known limits
- No right-to-left support: drawers are anchored with physical properties.
- No print stylesheet.

## 1.6.1 - 2026-09-12

### Fixed
- **Product cards in a row no longer disagree.** Quick add renders a `<form>`
  for single-variant products and an `<a>` for multi-variant ones; left inline,
  one stacked its buttons and the other put them side by side, so two cards in
  the same row ended at different heights (53 px to 137 px measured). The
  action block is now a single full-width column - 102 px on every card.
- **Sort control.** Its longest option ("Date, from oldest to newest") stretched
  the select to 387 px, half the toolbar. It is now a ruled control capped at
  22 characters (219 px measured).
- The product count no longer appears twice on a collection page.

### Changed
- **Menu.** Square dropdown panel with a lighter shadow, hover underline
  instead of a grey fill block, two columns past six entries. Mobile drawer in
  the heading typeface, 56 px per entry, hairlines between them.
- **Small screens.** The hero image is capped at 48svh, so the buttons sit above
  the fold on a 390 x 844 phone (measured: button bottom at 832 px).
- **Large screens.** Page width can now be set up to 1800 px (default 1280
  unchanged).

Checked at 320, 360, 390, 414, 768, 834, 1024, 1180, 1280, 1440, 1680, 1920 and
2560 px on home, collection and product: no horizontal overflow anywhere.

## 1.6.0 — 2026-09-12

The editorial layer: FLYER stops looking like a default and starts looking
designed — still white, still airy, now composed.

### Added
- **Hero split** section: image 3/5, text 2/5, full-height option, a title
  written line by line that rises behind a mask on load (the theme's
  signature move). Works without JavaScript.
- **Lookbook** section: up to six images at varied ratios with an offset
  rhythm, captions, and product links with live prices; horizontal
  scroll-snap on mobile.
- **Section numbering** (Layout > Number section headings, on by default):
  01, 02, 03… in page order, in front of every section heading.
- **Editorial layout** for Featured collection: the first product spans two
  columns and two rows.
- Footer credit "Theme by KIOSK", a small link next to the copyright line —
  one checkbox to remove it.

### Changed
- Headings: scale 135 %, tighter tracking and line-height.
- Reveal-on-scroll now ships off (everything visible at rest); the setting
  stays for merchants who want it.
- Focus ring on inputs and selects: 1 px inside the border instead of a thick
  frame.
- New default home page: hero split, editorial collection, trust badges,
  lookbook, image with text, testimonials, FAQ (first open), newsletter.

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
