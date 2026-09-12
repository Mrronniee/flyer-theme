# FLYER

A free Shopify theme by **[KIOSK](https://kioskthemes.com)** — clean, minimal and fast. Built on Online Store 2.0 with fully autonomous sections.

### ▶ [Browse the live demo](https://kioskthemes.com/demo/flyer/)

A full, navigable storefront — home, collection, product, cart, blog and
contact — running this exact theme. No signup, nothing to install.

**[kioskthemes.com](https://kioskthemes.com)** · [All themes](https://kioskthemes.com/themes/) · [Setup guide](https://kioskthemes.com/docs/flyer/) · [Support](https://kioskthemes.com/support/)

- **Version**: 1.5.0
- **Author**: KIOSK
- **License**: see [LICENSE.md](LICENSE.md)

## What's inside

Everything a store needs, nothing it doesn't:

| Area | Sections |
| --- | --- |
| Storefront | image banner, featured collection, image with text, multicolumn, rich text, newsletter, custom Liquid |
| Shopping | product page with block-based layout, collection with filters and sorting, cart drawer, cart page, predictive search |
| Content | blog, article with comments, page, contact form, policies |
| Account | login, register, password reset, activation, order history, addresses, order detail |
| Chrome | header with dropdown navigation, announcement bar, footer, 404, password page |

## Design tokens

Colors, typography, spacing, corner radii and product-card ratios are all editable in **Theme settings** and applied through CSS custom properties. Nothing is hardcoded — see [docs/DESIGN.md](docs/DESIGN.md) for the full token table and the section authoring contract.

## Development

```bash
shopify theme dev --store your-store
```

Every push runs `theme-check` in CI.

## Structure

Each section is self-contained: its own `{% schema %}`, styles and JavaScript. Add, remove or reorder sections in the theme editor without breaking anything. JavaScript is native and dependency-free; the storefront works without it.

## Install

1. Download the latest release, or clone this repository and zip its contents.
2. In your Shopify admin: **Online Store → Themes → Add theme → Upload zip file**.
3. Preview it, then **Publish** when you are happy.

The full walkthrough, with the settings worth changing first, is at
[kioskthemes.com/docs/flyer](https://kioskthemes.com/docs/flyer/).

## About

FLYER is published by [Kiosk](https://kioskthemes.com), an independent shop
releasing Shopify Online Store 2.0 themes as numbered editions — two free, two
paid. Every theme is built by hand, requires no third-party apps, and ships
with a written setup guide.

Found a bug or have a question? [Open an issue](https://github.com/bauertronniecontact-oss/flyer-theme/issues)
or [write to the counter](https://kioskthemes.com/support/).
