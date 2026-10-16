# Changelog

## 1.8.15 - 2026-10-16

### Fixed
- **A subscription is confirmed only where you subscribed.** A page can hold
  two sign-up forms — the Newsletter section and the one in the footer — and
  Shopify renders the reply in both. Subscribing from the footer also thanked
  the visitor at the top of the page, for a subscription they never made. The
  message now stays with the form that was sent, as the error already did.
- **The country and language title in the mobile menu no longer repeats the
  code.** The title of the group read "Country/region and language: FR", the
  name given to the button in the bar, where the code is displayed. In the menu
  no code is shown next to it, so the title is plain again.
- **A message left in the other form's box is cleared too.** The contact and
  comment message boxes kept a body copied from a submission that was not
  theirs, because only single-line fields were being cleared.

### Changed
- **Clearer remedy when the Disclosures section is hidden in the editor.** The
  note said a second market or language had to be published, which was wrong
  when only one of the two selectors was turned on. It now tells you to turn on
  the other selector, or to publish a second market or language for the ones
  turned on.

## 1.8.14 - 2026-10-16

### Fixed
- **An error on one form no longer appears on another.** Several forms of a
  page can post to the same address — the contact form and the footer
  newsletter both post to `/contact` — and Shopify then renders the same error,
  and the same submitted values, inside each of them. Sending the newsletter
  with a bad address showed an error on the contact form too, copied the
  address into its e-mail field and marked it invalid. Only the form you sent
  now shows its error, keeps its values and takes the focus.
- **The country and language button announces the code it shows.** The button
  in the header displays the current country code, but read out only
  "Country/region and language". Speech users could not say what they read. Its
  name now ends with the code, as "Country/region and language: FR".

## 1.8.13 - 2026-10-15

### Fixed
- **Focus goes to the form you actually sent.** A page can hold several forms
  that post to the same address — the contact form and the footer newsletter
  both post to `/contact`. When one came back with an error, the focus could
  land on the other one's message. The theme now follows the anchor Shopify
  adds to the address, which names the form it received.

### Changed
- **Clearer reason when the Disclosures section is hidden in the editor.** The
  note added in 1.8.12 only mentioned stores with a single country/region and
  language. It now tells the two cases apart: both selectors turned off in the
  section, or the selectors turned on having a single option on this store.

## 1.8.12 - 2026-10-15

### Fixed
- **Focus lands on the error summary after a form is sent.** Contact, comment
  and newsletter forms come back to an address ending in an anchor, and the
  browser moved the focus back to the top of the page just after it had been
  placed on the summary of errors. A screen reader or keyboard user had to
  hunt for what went wrong. The focus is now placed once the page has finished
  loading, so it stays on the summary.
- **Video and 3D thumbnails are no longer announced as images.** On a product
  with a video, the gallery thumbnails were all read "Image 2 of 2", including
  the one that opens the video. Videos and 3D models are now announced as
  such, on the product page and in the Featured product section.

### Changed
- **Disclosures section visible in the editor on a single-market store.** The
  section shows a country and a language selector, so it rendered nothing at
  all when a store has only one of each — the merchant added it and saw an
  empty page. The editor now shows a line explaining why it is hidden. Nothing
  changes on the live storefront.
- **Clearer help text for the image banner overlay.** The overlay setting now
  says that, with no image chosen, the overlay stays at 55% or above to keep
  the text legible over the placeholder.

## 1.8.11 - 2026-10-15

### Added
- **A page template that shows every section.** Eight sections could be added
  in the theme editor but appeared in no template: Apps, Countdown, Custom
  Liquid, Disclosures, Featured blog, Page content, Quick order list and
  Video. A new page template gathers them, so you can see them all at once
  before deciding where to use them. Pick it as the template of any page, or
  append `?view=toutes-sections` to a page's address to preview it. The
  blog, page, collection and video each section points to are yours to
  choose in the editor.

### Fixed
- **Price per item in the cart drawer.** When a line holds more than one
  item, the drawer showed only the line total, while the cart page also
  shows what one item costs. The drawer now says it too, under the line
  total.

## 1.8.10 - 2026-10-14

### Fixed
- **Vendor on the cart page.** The "Show vendor" setting under Cart only
  applied to the cart drawer. It now shows the product's vendor on the cart
  page too, above each item's title, in the same style.
- **Language and country selectors no longer switch the page on their own.**
  Choosing an option in the header or footer selector used to reload the page
  at once, even while a keyboard user was only browsing the list with the
  arrow keys. You now pick an option, then confirm with the Update button,
  which is always visible.
- **Form errors point to the right field.** When a form comes back with an
  error, the list of errors takes focus and links to each field, and each
  field in error is marked as such and announces its own message. This
  applies to the contact form, the account forms (sign in, password recovery,
  create account, activate account, reset password, addresses), the blog
  comment form and the store password page. Required fields carry an
  asterisk, explained above the form.
- **Declining an account invitation no longer asks for a password.** The
  Decline button on the account activation page was blocked by the browser
  until both password fields were filled in.
- **Switching between sign in and password recovery moves keyboard focus**
  to the first field of the panel that opens.
- **Saved addresses with quotes display correctly** when you edit them.
- **Quick view price after a variant change.** Choosing another option in
  the quick view now shows the price exactly as on the card: with the
  currency code when that setting is on, and with the sale and regular
  prices for a variant on sale. Before, only the bare amount remained.
- **Quick view follows the "Show vendor" setting of product cards**, so it
  shows the vendor only when the cards do.
- **Sale price announced after a variant change** on the product page and in
  the featured product section, as it is on first load.
- **Store name no longer cut on phones.** With the language or country
  selector on, the globe icon left too little room for the store name in the
  header bar on phones ("My St…"). On phones, the selectors now sit in the
  menu, above the account link; the bar keeps its other icons.
- **Currency code everywhere.** With "Show currency codes" on, the price
  filter note and active price filter, the order totals in the customer
  account, the gift card balance and the predictive search prices now show
  the currency code too.
- **Cart drawer and cart page show the same line details.** The drawer now
  shows the unit price, line and order discounts, line item properties set
  by apps (engraving, gift message, uploaded file) and the subscription plan;
  the cart page shows the properties and the plan too.
- **Filter panel height on phones.** The filter list now follows the visible
  height of the screen when the browser's address bar shows or hides.

## 1.8.9 - 2026-10-13

### Fixed
- **Product and search result titles are easier to tap.** The title link of
  a product card and of a page or article in search results was only as tall
  as its text. Each is now at least 24 pixels tall, as accessibility
  guidelines ask, and nothing moves on the page.

## 1.8.8 - 2026-10-13

### Fixed
- **Store name in the phone menu on dark color schemes.** When your first
  color scheme is dark, the store name at the top of the phone menu was black
  on black. It now uses the scheme's text color, like the rest of the menu.
- **Language and country panel closes like the other menus.** The panel that
  opens from the globe icon now closes with the Escape key, when you click
  elsewhere, or when keyboard focus leaves it, and focus goes back to the
  globe.
- **The globe button says what it opens.** Screen readers announced it as
  "Country/region" even when it only offers languages. It now reads
  "Language", "Country/region", or "Country/region and language", depending
  on what the panel contains.

## 1.8.7 - 2026-10-13

### Fixed
- **Language and country selector on phones.** On a phone, the panel that
  opens from the globe icon in the header ran off the left edge of the screen,
  cutting off the start of the list. It now opens below the header, inside the
  screen, on every phone width.

## 1.8.6 - 2026-10-13

### Fixed
- **Image banner text readable without an image.** Until you add an image, the
  banner shows a light placeholder under a dark layer. That layer was too light
  for the white text on top of it. It is now dark enough to read.
- **Collage titles on card tiles.** With the "Card" style and a dark color
  scheme for cards, the title under a collage tile was dark on dark and could
  not be read. It now takes the text color of the card's scheme.
- **No sideways scroll on phones.** The comparison table and the size guide
  scroll sideways inside their own frame, but text read only by screen readers
  in their cells pushed the whole page wider than the screen. The page now
  stays the width of the screen. The same guard is on the other sideways
  scrollers (collection list, lookbook, testimonials).
- **Scrollable tables named and reachable by keyboard.** The comparison table
  and the size guide can be focused with the Tab key and scrolled with the
  arrow keys, and screen readers announce them by their title.

## 1.8.5 - 2026-10-12

### Added
- **A "showcase" page template.** Twelve sections had no place in any
  template, so you could only discover them by adding them yourself: image
  banner, slideshow, rich text, multicolumn, multirow, collage, collection
  list, featured product, comparison table, size guide, collapsible content
  and email signup banner. The new "showcase" page template shows each of them
  with its starter blocks and default colors, below the page's own content. To
  use it, pick it as the template of a page in your admin. Your other pages
  are unchanged.

## 1.8.4 - 2026-10-07

### Fixed
- **Password page in its own layout.** Since the templates were rewritten in
  July, the password page (shown while your store is closed) opened inside the
  regular layout, with the header, the footer and the cart drawer. It is back
  on its own minimal layout.
- **French punctuation.** In French a colon takes a non-breaking space before
  it. Ten labels printed "Taille:" (variant options on the product page and in
  the cart, active filters, vendor, discounts, SKU), and screen readers heard
  the same in the label of the video play button. A French storefront now
  reads "Taille :". English is unchanged.
- **Countdown without a built-in end date.** The Countdown section shipped with
  31 December 2026 as its end date: from 1 January 2027, a newly added
  Countdown would have read "This offer has ended." at once. It now has no
  default date. The timer stays hidden until you set one, and the setting says
  so.
- **Cart page updates without reloading.** Pressing + or −, typing a quantity
  or removing a line used to reload the whole page and drop keyboard focus.
  The cart page now updates in place, like the cart drawer: every line and the
  totals refresh, focus stays on the control you used, the header reads out
  the new item count, and errors are announced. Enter in a quantity field
  applies it in place too; only Checkout leaves the page. Below 360px the quantity
  selector and "Remove" sit under the product image, so the page no longer
  scrolls sideways on the smallest phones.
- **Visible keyboard focus on quantity selectors.** On the product page and
  the featured product section, the focus ring of the − and + buttons was cut
  off. It is now drawn in full, and the selector's border is easier to see.
- **Focused controls never hide under the sticky header.** Tabbing to a
  wishlist heart near the top of the window could leave it entirely under the
  header. The page now scrolls to keep focus in view.
- **Search field outline.** The field on the search page had no visible border
  until it was focused. It now has one, like the theme's other fields, and
  its hint text ("Search products") is dark enough to read on the field's
  tinted background.
- **Current page in pagination.** The current page number did not show as
  current in collection, search, blog and quick order pagination, and was
  hidden from screen readers. It is now framed, marked and announced as the
  current page in all four.
- **Focus on wishlist hearts over photos.** On a dark product photo, the dark
  focus ring of a card's heart could not be seen. It now has a light halo on
  both sides and shows on any picture.
- **Clear list on an empty wishlist.** The "Clear list" button stayed on
  screen, and in the keyboard order, once the wishlist was empty. Anything the
  theme hides is now always hidden, whatever its style.
- **Removing a favourite on the wishlist page.** Unticking a heart on the
  wishlist page dropped keyboard focus to the top of the page. Focus now moves
  to the next heart (or to the empty list message), and screen readers hear
  which product was removed.
- **Lookbook on phones.** Tabbing to a look's link could leave the look half
  out of view in the sideways scroller. The whole look now scrolls into view.
- **Sort menu and rating stars easier to see.** The line under the collection
  sort menu and the empty stars of testimonial ratings were too faint to make
  out. Both now use the theme's control border color.
- **Wishlist hearts tell products apart.** Every heart was announced as "Add to
  wishlist", and its name changed when pressed. Each heart now names its
  product ("Add Overshirt to wishlist") and keeps that name; screen readers
  say whether it is pressed.
- **A refused add no longer says "Added to cart".** When Shopify refused an
  add (not enough stock), the product page button and its screen reader
  message still read "Added to cart" for two seconds while the cart drawer
  explained the refusal. The button now goes straight back to its label and
  only the reason is announced. Same in the featured product section.
- **Stock messages next to the line on the cart page.** On a phone, the reason
  Shopify gives for refusing a quantity appeared below Checkout, out of view.
  It now shows under the line you changed.
- **One page header for screen readers.** The cart drawer's title bar was read
  as a second page banner while the drawer was open. It is now a plain block.
- **Lookbook product links in the storefront language.** The prefix before a
  look's product ("Shop — Overshirt") read "Shop" on a French storefront too.
  Left empty, it now follows the storefront language ("Acheter — Surchemise");
  a prefix you typed yourself is kept.
- **Sale and sold out badges in the storefront language.** The badges read
  "Sale" and "Sold out" even on a French storefront. Left empty, the two badge
  settings now show the theme's translated label ("Promo" and "Épuisé" in
  French); a label you typed yourself still wins.
- **Cart count after the Back button.** Adding to cart, then going back,
  could show the old count and an outdated cart drawer. When a page comes
  back with the Back button, the count, the cart drawer and the cart page are
  read again from the store, never from the browser's cache.
- **Focus after adding from the quick view.** Closing the cart drawer that
  opened after an add from the quick view left keyboard focus nowhere. It now
  returns to the card's "Quick view" button.
- **Menus and links to the same page.** On the home page, a menu link to one
  of its sections (/#lookbook) scrolled the page behind the open mobile menu,
  or behind the open "Shop" panel on a computer, which stayed in front. Both
  now close so the section shows.
- **Asking for more than the stock.** When a product page asked for more than
  the stock, Shopify added what it had and said so, but the cart drawer showed
  the cart as it was before (empty, count 0). It now shows the real cart with
  Shopify's message. The cart page, which accepted any quantity until
  checkout, now checks each change with the store like the drawer: the line
  keeps what is available and the reason is announced. In the drawer too,
  that reason replaces the generic "Something went wrong" message.
- **Edited texts keep their apostrophes.** If you change the theme's default
  texts (Online Store > Themes > Edit default theme content) and type an
  apostrophe or an ampersand, some places showed "&#39;" or "&amp;" instead:
  the related products heading, the contact form title, the screen reader
  captions of the comparison and size guide tables, the testimonial star
  ratings and the video titles of the Video and Collage sections. Each text is
  now escaped once.
- **Lookbook and FAQ menu links.** The Lookbook and FAQ sections now have an
  anchor named after their place in the template (#lookbook and #faq on the
  home page), so a menu link to /#lookbook or /#faq scrolls to them.
- **No sideways jolt with numbered headings.** With "Number section headings"
  on, the number of a heading grew past the edge of the page during its
  stamp animation, and the page could scroll sideways for a moment. The
  number now takes only its own width.
- **One free shipping threshold.** The default announcement offered free
  shipping over $50 and the default trust badge over $80 (also in a Trust
  badges section newly added in the editor). All now say $50.
- **Contact form values are escaped.** When the contact form came back with
  an error, the name, email, phone and message typed in it were written back
  into the page as they were. They are now escaped, once.
- **Order note on the cart page** is saved as soon as you leave the field, as
  in the cart drawer.

### Changed
- **Lighter product grids on phones.** Product cards on phones asked for
  images sized for half the screen, while a card is narrower (two columns
  inside the page margins). They now ask for their real width, so phones
  download smaller images, and so do the Lookbook's looks. On product pages,
  the first image is fetched before the others, so it shows sooner.
- **Steadier product pages.** "You may also like" is fetched about a screen
  before it comes into view, so a quick scroll no longer sees it push the
  footer down.
- **One connection less on every page.** The theme no longer opens a
  connection to fonts.shopifycdn.com: Shopify serves the theme's fonts from
  your store's own domain.
- **Theme editor labels in American English**, like the rest of the Shopify
  admin: "Color scheme", "Center", "Heading capitalization". The "Wishlist &
  quick view" settings are now "Wishlist and quick view". Only the labels
  changed: your settings are kept.

## 1.8.3 - 2026-09-23

### Fixed
- **Policies menu in the footer has a default.** The menu shown next to the
  copyright now defaults to the store's footer menu (handle `footer`), as the
  Shopify Theme Store requires for every menu setting of the footer. To avoid
  the same links twice, that row stays hidden while a Menu block above already
  shows the same menu; pick a dedicated policies menu and it appears. Footers
  you have already set up are unchanged.

### Changed
- **Lighter collection pages on phones.** With the "second image on hover"
  effect, every product card also downloaded its second photo on touch
  screens, where nothing can hover. Phones and tablets now skip it; laptops and
  desktops keep the effect exactly as before.

## 1.8.2 - 2026-09-23

### Fixed
- **"Buy it now" button readable in every colour scheme.** Shopify's dynamic
  checkout button, when it shows as a plain button rather than a wallet (Shop
  Pay, PayPal...), was white on Shopify blue: 3.6:1, under the WCAG AA contrast
  threshold. It now looks like the theme's secondary button and follows your
  colour scheme. The "More payment options" link gets the text colour and a
  44px tap target. Branded wallets keep their own colours.
- **No dead link on a fresh install.** The home page template sent the hero's
  second button ("Our story") to a page that only exists on the demo store,
  which is a 404 on most stores. The template no longer sets that link, and the
  hero shows its second button only once you give it a link, instead of sending
  it to the product list.
- **Footer menu block has a default menu.** A "Menu" block added to the footer
  now shows the store's footer menu (handle `footer`) until you pick another
  one, as the Shopify Theme Store requires. Existing footers are unchanged.

### Changed
- The installation guide lists all 32 sections the theme ships (it said 22).

## 1.8.1 - 2026-09-22

### Fixed
- **Placeholder drawings are hidden from screen readers.** Until you pick an
  image, sections show Shopify's placeholder drawing. Screen readers could
  announce each one as an unnamed "image" - ten times on the home page of a
  fresh install. The drawings are now hidden from assistive technology in the
  20 sections that can show one and in product cards without a photo. Your
  own images and their alt text are not affected.

## 1.8.0 - 2026-09-22

### Added
- **Shopify account button in the header, on desktop and mobile.** The account
  icon is now Shopify's own account component. Shoppers sign in without a
  password, with Shop or with a social account, and reach their orders and
  profile in a panel that opens under the header, without leaving the page.
  Stores still on legacy customer accounts send them to the sign-in page, as
  before. The panel follows the theme's colours, fonts and corner radius; its
  links come from Header > Customer account > Account menu (default: Shopify's
  customer account menu, `customer-account-main-menu`). The Shopify Theme Store
  has required this component in theme headers since July 30, 2026. Without
  JavaScript, a plain account link takes its place.

### Changed
- **Header on small phones.** Below 420px the header icons are 40px wide, and
  36px wide below 360px - always 44px tall - so the account icon fits beside
  search, wishlist and cart, and a short shop name still shows in full at
  320px. A longer name ends with an ellipsis instead of running under the
  icons.

### Fixed
- **Taxes line in the cart.** The cart page and the cart drawer always said
  "Taxes and shipping calculated at checkout", even when your prices include
  tax. They now say "Taxes included. Shipping calculated at checkout." in that
  case, like the product page.
- **Every form field has its own label.** The quantity fields of the cart page
  and the cart drawer, the drawer's order note, the search field, the
  collection filter checkboxes and the size guide's unit switch are now tied to
  a label, so screen readers and voice control name them reliably.
- **Small tap targets.** Page and article results on the search page are
  clickable on the whole row, and the footer's theme credit, the "Back to blog"
  link, comment and order pagination and the account page links are at least
  24px tall (44px for pagination).
- **Wishlist link on a translated storefront.** When no wishlist page is picked
  in the theme settings, the header heart now keeps the shopper's language
  (/en/pages/wishlist on the English storefront).
- The "Add to Apple Wallet" link on the gift card page is marked
  rel="nofollow", as Shopify asks for links to its own domains.

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
- **Apostrophes in translated text.** A few labels showed their apostrophe
  literally, as `&#39;` - on the slideshow and announcement bar controls, in
  the cart drawer, the search overlay and the product form. Those texts now
  read correctly in both English and French.

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
