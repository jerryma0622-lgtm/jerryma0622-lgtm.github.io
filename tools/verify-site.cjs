'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { load } = require('cheerio');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public');
const site = new URL('https://jerryma0622-lgtm.github.io');
let checked = 0;
const errors = [];
const htmlFiles = [];
function walk(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap(item => {
    const filename = path.join(folder, item.name);
    return item.isDirectory() ? walk(filename) : [filename];
  });
}
assert(fs.existsSync(output), 'Build the site before verification');
const files = walk(output);
function targetFor(url) {
  const decoded = decodeURIComponent(url.pathname);
  let filename = path.resolve(output, '.' + decoded);
  if (filename !== output && !filename.startsWith(output + path.sep)) throw new Error('Path escapes public/');
  if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');
  return filename;
}
function checkLink(value, from, isAnchor) {
  if (!value || /^(?:mailto:|tel:|data:|javascript:)/i.test(value)) return;
  if (/^(?:file:|[A-Za-z]:[\\/])/i.test(value)) { errors.push(from + ': nonportable link ' + value); return; }
  const base = new URL('/' + path.relative(output, from).replace(/\\/g, '/'), site);
  let url;
  try { url = new URL(value, base); } catch { errors.push(from + ': invalid URL ' + value); return; }
  if (url.origin !== site.origin) return;
  checked++;
  const filename = targetFor(url);
  if (!fs.existsSync(filename)) { errors.push(path.relative(output, from) + ': missing ' + value); return; }
  if (isAnchor && url.hash && filename.endsWith('.html')) {
    const id = decodeURIComponent(url.hash.slice(1));
    const $ = load(fs.readFileSync(filename, 'utf8'));
    if (!$('[id], a[name]').toArray().some(el => $(el).attr('id') === id || $(el).attr('name') === id)) {
      errors.push(path.relative(output, from) + ': missing fragment ' + value);
    }
  }
}
for (const filename of files) {
  if (filename.endsWith('.html')) {
    htmlFiles.push(filename);
    const text = fs.readFileSync(filename, 'utf8');
    assert(!/Jerry Knowledge Base|C:\\Users\\|file:\/\/\//i.test(text), 'Private or Windows path leaked into output');
    const $ = load(text);
    $('a[href], link[href]').each((_, el) => checkLink($(el).attr('href'), filename, el.name === 'a'));
    $('[src], [data-src], [poster]').each((_, el) => {
      for (const attribute of ['src', 'data-src', 'poster']) checkLink($(el).attr(attribute), filename, false);
    });
  } else if (filename.endsWith('.css')) {
    const text = fs.readFileSync(filename, 'utf8');
    for (const match of text.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) checkLink(match[1], filename, false);
  }
}
for (const route of ['', 'posts/welcome', 'categories', 'tags', 'archives', 'about', 'projects']) {
  assert(fs.existsSync(path.join(output, route, 'index.html')), 'Missing expected route: /' + route);
}
const welcome = fs.readFileSync(path.join(output, 'posts/welcome/index.html'), 'utf8');
assert(welcome.includes('/assets/posts/welcome/workflow.svg'), 'Relative attachment was not rewritten');
assert(!welcome.includes('../assets/posts/welcome/workflow.svg'), 'Source-relative attachment leaked into website');
assert(fs.readFileSync(path.join(output, 'search.xml'), 'utf8').includes('Welcome to Jerry'), 'Welcome missing from local search');
assert(!files.some(file => /(?:^|[\\/])drafts(?:[\\/]|$)/.test(path.relative(output, file))), 'Draft directory leaked');
assert(!files.some(file => /(?:^|[\\/])(?:README\.md|AGENTS\.md|package\.json|\.obsidian)(?:[\\/]|$)/.test(path.relative(output, file))), 'Repository internals leaked');
for (const configFile of ['_config.yml', '_config.butterfly.yml', '.obsidian/app.json']) {
  assert(!/(?:^|[\s"'(=])[A-Za-z]:[\\/]|file:\/\/\//m.test(fs.readFileSync(path.join(root, configFile), 'utf8')), 'Windows absolute path in ' + configFile);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(JSON.stringify({ result: 'PASS', htmlPages: htmlFiles.length, localLinksAndResourcesChecked: checked, files: files.length, routes: 7, relativeAttachment: 'PASS', localSearch: 'PASS', privateAndDraftOutput: 'PASS', portableConfiguration: 'PASS' }, null, 2));
