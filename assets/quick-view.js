/**
 * FLYER — quick view. <fl-quick-view> wraps the <dialog data-quick-view>
 * printed by snippets/quick-view-dialog.liquid. Any [data-quick-view-open]
 * with a data-handle fetches /products/<handle>?section_id=quick-view and
 * shows its .fl-qv block. The cart drawer intercepts the [data-quick-add]
 * form inside; on fl:cart:change the dialog closes.
 */
class FlQuickView extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector('[data-quick-view]');
    this.content = this.querySelector('[data-quick-view-content]');
    this.loading = this.querySelector('[data-quick-view-loading]');
    this.root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    this.opener = null;
    if (!this.dialog || typeof this.dialog.showModal !== 'function') return;

    this._onDocClick = (event) => {
      const trigger = event.target.closest('[data-quick-view-open]');
      if (trigger) {
        event.preventDefault();
        this.open(trigger);
        return;
      }
      if (event.target.closest('[data-quick-view-close]')) {
        this.close();
        return;
      }
      // Click on the backdrop: the dialog itself is the target, not a child.
      if (event.target === this.dialog) this.close();
    };
    document.addEventListener('click', this._onDocClick);

    this._onCartChange = () => {
      if (this.dialog.open) this.close();
    };
    document.addEventListener('fl:cart:change', this._onCartChange);

    this._onVariantChange = (event) => {
      const select = event.target.closest('[data-qv-variant]');
      if (!select) return;
      const option = select.options[select.selectedIndex];
      const price = this.querySelector('[data-qv-price]');
      if (!option || !price) return;
      const wrap = document.createElement('span');
      wrap.className = 'fl-price';
      const current = document.createElement('span');
      current.className = 'fl-price__current';
      current.textContent = option.getAttribute('data-price') || '';
      wrap.appendChild(current);
      price.replaceChildren(wrap);
    };
    this.addEventListener('change', this._onVariantChange);

    // ESC closes natively; restore focus and clear the body on close.
    this._onClose = () => {
      this.content.querySelectorAll('.fl-qv').forEach((el) => el.remove());
      if (this.opener && document.contains(this.opener)) this.opener.focus();
      this.opener = null;
    };
    this.dialog.addEventListener('close', this._onClose);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('fl:cart:change', this._onCartChange);
    this.removeEventListener('change', this._onVariantChange);
    if (this.dialog) this.dialog.removeEventListener('close', this._onClose);
  }

  async open(trigger) {
    const handle = trigger.getAttribute('data-handle');
    if (!handle) return;
    this.opener = trigger;
    this.content.querySelectorAll('.fl-qv').forEach((el) => el.remove());
    this.dialog.setAttribute('aria-busy', 'true');
    if (this.loading) this.loading.hidden = false;
    if (!this.dialog.open) this.dialog.showModal();

    try {
      const url = this.root + 'products/' + encodeURIComponent(handle) + '?section_id=quick-view';
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      const block = doc.querySelector('.fl-qv');
      if (!block) throw new Error('no-content');
      this.content.appendChild(block);
      const title = block.querySelector('[data-qv-title]');
      // preventScroll: without it the browser scrolls the dialog down to the
      // heading, dragging the close button out of view before the shopper
      // touches anything.
      if (title) title.focus({ preventScroll: true });
    } catch (e) {
      // Fall back to the product page rather than an empty box.
      this.close();
      window.location.href = this.root + 'products/' + encodeURIComponent(handle);
      return;
    } finally {
      this.dialog.removeAttribute('aria-busy');
      if (this.loading) this.loading.hidden = true;
    }
  }

  close() {
    if (this.dialog.open) this.dialog.close();
  }
}

if (!customElements.get('fl-quick-view')) customElements.define('fl-quick-view', FlQuickView);
