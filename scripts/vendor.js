'use strict';
const fs = require('node:fs');
const path = require('node:path');
// Serve the enabled icon library locally, without modifying node_modules.
hexo.extend.generator.register('local-icons', function () {
  const packageRoot = path.dirname(require.resolve('@fortawesome/fontawesome-free/package.json'));
  const files = ['css/all.min.css', 'LICENSE.txt'];
  for (const name of fs.readdirSync(path.join(packageRoot, 'webfonts'))) {
    if (name.endsWith('.woff2')) files.push('webfonts/' + name);
  }
  return files.map(file => ({ path: 'vendor/fontawesome/' + file, data: () => fs.createReadStream(path.join(packageRoot, file)) }));
});
