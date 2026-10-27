/**
 * Filters and sorting toolbar (snippets/facets-toolbar.liquid), shared by the
 * collection page and the search results page.
 *
 * This behaviour used to live in the collection section's {% javascript %}
 * block, and Shopify only loads a section's JavaScript on the pages that
 * render that section: on /search, which renders the search section, the
 * element was never defined and a facet or a sort did nothing (1.8.17).
 * It is an asset now, loaded by the snippet itself, so it ships wherever the
 * toolbar is rendered and nowhere else.
 */
class FlCollectionFilters extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('[data-filter-form]');
    this.drawer = this.querySelector('[data-facets-drawer]');
    this.facets = Array.from(this.querySelectorAll('[data-facet]'));
    this.mq = window.matchMedia('(min-width: 750px)');

    this.onMqChange = this.syncLayout.bind(this);
    this.onDocClick = this.handleDocClick.bind(this);
    this.onKeydown = this.handleKeydown.bind(this);
    this.onFormChange = this.handleFormChange.bind(this);

    if (this.form) this.form.addEventListener('change', this.onFormChange);

    // The price filter also applies when focus leaves its two fields, not
    // only with Enter or Apply; moving from "From" to "To" does not count.
    this.onFocusOut = (event) => {
      const row = event.target && event.target.closest ? event.target.closest('.fl-facet__price-row') : null;
      if (!row) return;
      if (event.relatedTarget && row.contains(event.relatedTarget)) return;
      const changed = Array.from(row.querySelectorAll('input')).some((input) => input.value !== input.defaultValue);
      if (changed) this.submitForm();
    };
    this.addEventListener('focusout', this.onFocusOut);

    this.facets.forEach((facet) => {
      facet.addEventListener('toggle', () => {
        if (!facet.open) return;
        this.facets.forEach((other) => {
          if (other !== facet) other.open = false;
        });
      });
    });

    document.addEventListener('click', this.onDocClick);
    this.addEventListener('keydown', this.onKeydown);
    if (this.mq.addEventListener) this.mq.addEventListener('change', this.onMqChange);

    this.syncLayout();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.onDocClick);
    if (this.onFocusOut) this.removeEventListener('focusout', this.onFocusOut);
    if (this.mq && this.mq.removeEventListener) this.mq.removeEventListener('change', this.onMqChange);
  }

  syncLayout() {
    if (!this.drawer) return;
    if (this.mq.matches) {
      this.drawer.setAttribute('open', '');
      this.drawer.classList.add('fl-toolbar__drawer--inline');
    } else {
      this.drawer.classList.remove('fl-toolbar__drawer--inline');
      this.drawer.removeAttribute('open');
    }
  }

  handleFormChange(event) {
    const target = event.target;
    if (!target) return;
    if (target.classList.contains('fl-facet__checkbox') || target.hasAttribute('data-sort')) {
      this.submitForm();
    }
  }

  submitForm() {
    if (!this.form) return;
    this.clampPriceInputs();
    if (!this.form.checkValidity()) {
      // A field that constraint validation rejects would silently block
      // requestSubmit(), and the browser cannot show its bubble inside a
      // closed <details>. Open the offending facet (and the mobile
      // drawer) first so the native message is actually visible.
      const invalid = this.form.querySelector(':invalid');
      if (invalid) {
        if (this.drawer && this.drawer.contains(invalid)) this.drawer.setAttribute('open', '');
        const facet = invalid.closest('[data-facet]');
        if (facet) facet.open = true;
      }
      this.form.reportValidity();
      return;
    }
    if (this.form.requestSubmit) this.form.requestSubmit();
    else this.form.submit();
  }

  clampPriceInputs() {
    // Out-of-range or off-step price values (e.g. 99 when max is 32, or
    // 14.999) must not veto an unrelated filter/sort submit: clamp them
    // to the input bounds and round to the step instead. Shopify clamps
    // price filters server-side anyway, so this never changes results.
    const inputs = this.form.querySelectorAll('.fl-facet__price-input');
    inputs.forEach((input) => {
      if (input.value === '') return;
      let value = Number(input.value);
      if (Number.isNaN(value)) return;
      const min = Number(input.min);
      const max = Number(input.max);
      if (input.min !== '' && !Number.isNaN(min)) value = Math.max(value, min);
      if (input.max !== '' && !Number.isNaN(max)) value = Math.min(value, max);
      input.value = value.toFixed(2);
    });
  }

  handleDocClick(event) {
    if (this.contains(event.target)) return;
    this.closeFacets();
    if (this.drawer && !this.drawer.classList.contains('fl-toolbar__drawer--inline')) {
      this.drawer.removeAttribute('open');
    }
  }

  handleKeydown(event) {
    if (event.key !== 'Escape') return;
    const openFacet = this.facets.find((facet) => facet.open);
    if (openFacet) {
      openFacet.open = false;
      const summary = openFacet.querySelector('summary');
      if (summary) summary.focus();
      return;
    }
    if (this.drawer && this.drawer.open && !this.drawer.classList.contains('fl-toolbar__drawer--inline')) {
      this.drawer.removeAttribute('open');
      const toggle = this.drawer.querySelector('summary');
      if (toggle) toggle.focus();
    }
  }

  closeFacets() {
    this.facets.forEach((facet) => {
      facet.open = false;
    });
  }
}

if (!customElements.get('fl-collection-filters')) {
  customElements.define('fl-collection-filters', FlCollectionFilters);
}
