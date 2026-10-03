document.addEventListener('DOMContentLoaded', () => {
  for (const [selector, label] of [['#search-button > span', '搜索文章'], ['#toggle-menu > span', '打开导航菜单']]) {
    const old = document.querySelector(selector);
    if (!old) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = old.className;
    button.innerHTML = old.innerHTML;
    button.setAttribute('aria-label', label);
    old.replaceWith(button);
  }
  const main = document.querySelector('main');
  if (!main) return;
  main.id = main.id || 'main-content';
  main.setAttribute('tabindex', '-1');
  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#' + main.id;
  skip.textContent = '跳转到正文';
  document.body.prepend(skip);
});
