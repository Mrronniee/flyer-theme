/**
 * FLYER — wishlist (no app). Handles live in localStorage under "fl:wishlist"
 * as a JSON array. Syncs every [data-wishlist-toggle], updates
 * [data-wishlist-count] and dispatches document event "fl:wishlist:change"
 * with detail: { count, handles }.
 */
(function () {
  const KEY = 'fl:wishlist';

  function read() {
    try {
      const list = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(list) ? list.filter((h) => typeof h === 'string') : [];
    } catch (e) {
      return [];
    }
  }

  function write(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {
      /* storage unavailable: state stays in memory for this page only */
    }
    sync(list);
    document.dispatchEvent(
      new CustomEvent('fl:wishlist:change', {
        bubbles: true,
        detail: { count: list.length, handles: list },
      })
    );
  }

  function sync(list) {
    const handles = list || read();
    document.querySelectorAll('[data-wishlist-toggle]').forEach((btn) => {
      const active = handles.includes(btn.getAttribute('data-handle'));
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      const label = active ? btn.getAttribute('data-label-remove') : btn.getAttribute('data-label-add');
      if (label) btn.setAttribute('aria-label', label);
    });
    document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
      el.textContent = handles.length;
      el.hidden = handles.length === 0;
    });
  }

  function toggle(handle) {
    if (!handle) return;
    const list = read();
    const index = list.indexOf(handle);
    if (index === -1) list.push(handle);
    else list.splice(index, 1);
    write(list);
  }

  window.flWishlist = { read, write, sync, toggle };

  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-wishlist-toggle]');
    if (!btn) return;
    event.preventDefault();
    toggle(btn.getAttribute('data-handle'));
  });

  document.addEventListener('shopify:section:load', () => sync());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => sync());
  } else {
    sync();
  }
})();
