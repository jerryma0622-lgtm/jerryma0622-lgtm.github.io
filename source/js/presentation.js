// Reuse Butterfly's mode switch and its persisted preference.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#jerry-theme-toggle');
  if (!toggle) return;
  const sync = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
    toggle.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
  };
  toggle.addEventListener('click', () => document.querySelector('#darkmode')?.click());
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  sync();
  document.addEventListener('pointerdown', () => document.body.classList.remove('jerry-keyboard'));
  document.addEventListener('keydown', () => document.body.classList.add('jerry-keyboard'));
  document.addEventListener('keydown', event => {
    const search = document.querySelector('#local-search');
    const dialog = search?.querySelector('.search-dialog');
    if (!dialog || getComputedStyle(dialog).display === 'none') return;
    if (event.key === 'Escape') {
      search.querySelector('.search-close-button')?.click();
      document.querySelector('#search-button button')?.focus();
    } else if (event.key === 'Tab') {
      const controls = [...search.querySelectorAll('button, input, a[href]')].filter(el => el.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
  const menu = document.querySelector('#toggle-menu button');
  if (menu) {
    const syncMenu = () => menu.setAttribute('aria-expanded', String(document.querySelector('#sidebar-menus')?.classList.contains('open')));
    new MutationObserver(syncMenu).observe(document.querySelector('#sidebar-menus'), { attributes: true, attributeFilter: ['class'] });
    syncMenu();
  }
});
