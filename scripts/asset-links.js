'use strict';
const path = require('node:path');
const fs = require('node:fs');
const { load } = require('cheerio');

// Keep standard relative Markdown links readable in Obsidian. Only public
// source/assets references are transformed, never external folders or vaults.
hexo.extend.filter.register('after_post_render', function (data) {
  const sourceFile = String(data.source || '').replace(/\\/g, '/');
  for (const field of ['content', 'excerpt', 'more']) {
    if (!data[field]) continue;
    const $ = load(data[field], {}, false);
    let changed = false;
    $('img[src], a[href]').each((_, element) => {
      const attribute = element.name === 'img' ? 'src' : 'href';
      const value = $(element).attr(attribute);
      if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(value)) return;
      const match = /^([^?#]+)(.*)$/.exec(value);
      if (!match) return;
      const decoded = decodeURIComponent(match[1]);
      const relative = path.posix.normalize(path.posix.join(path.posix.dirname(sourceFile), decoded));
      if (!relative.startsWith('assets/')) return;
      const filename = path.join(hexo.source_dir, ...relative.split('/'));
      if (!fs.existsSync(filename)) throw new Error('Missing public attachment: ' + relative);
      const root = String(hexo.config.root || '/').replace(/\/$/, '');
      $(element).attr(attribute, root + '/' + relative.split('/').map(encodeURIComponent).join('/') + match[2]);
      changed = true;
    });
    if (changed) data[field] = $.html();
  }
  return data;
}, 20);
