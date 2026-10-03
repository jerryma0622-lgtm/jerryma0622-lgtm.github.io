'use strict';
const { load } = require('cheerio');

// Build-time presentation only. Markdown sources and Butterfly core stay intact.
// DOM selectors are the upgrade boundary, documented in DESIGN.md.
function readingMinutes(content) {
  const text = load(content || '').text();
  const han = (text.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (text.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.ceil(han / 400 + words / 200));
}

hexo.extend.filter.register('after_render:html', function (html) {
  const $ = load(html);
  if (!$('#nav').length) return html;
  const posts = new Map(hexo.locals.get('posts').toArray().map(post => ['/' + post.path, post]));
  const currentPath = new URL($('link[rel="canonical"]').attr('href') || hexo.config.url).pathname;
  $('.nav-site-title .site-name').text('Jerry');
  $('#nav').attr('aria-label', '主导航');
  $('#nav .menus_item a').each((_, el) => {
    const href = $(el).attr('href');
    if (href && currentPath.startsWith(href)) $(el).attr('aria-current', 'page');
  });
  $('#nav #search-button > span').replaceWith('<button type="button" class="site-page social-icon search" aria-label="搜索文章"><i class="fas fa-search fa-fw" aria-hidden="true"></i><span lang="en">Search</span></button>');
  $('#toggle-menu > span').replaceWith('<button type="button" class="site-page" aria-label="打开导航菜单"><i class="fas fa-bars fa-fw" aria-hidden="true"></i></button>');
  $('#search-button').after('<button id="jerry-theme-toggle" class="site-page jerry-tool" type="button" aria-label="切换深色模式" aria-pressed="false"><i class="fas fa-moon" aria-hidden="true"></i></button><a class="site-page jerry-tool jerry-github" href="https://github.com/jerryma0622-lgtm" target="_blank" rel="noopener" aria-label="Jerry on GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>');
  const main = $('main');
  main.attr('tabindex', '-1');
  if (!$('#aside-content .card-widget').length) {
    $('#aside-content').remove();
    main.addClass('jerry-no-aside');
  }
  $('#page .page-title').each((_, el) => { el.tagName = 'h1'; });
  $('.tag-cloud-list a').removeAttr('style');
  $('body').prepend('<a class="skip-link" href="#' + main.attr('id') + '">跳转到正文</a>');
  $('#footer .copyright').text($('#footer .copyright').text().replace(/\s+By\s+/, ' '));
  $('.search-close-button').attr('aria-label', '关闭搜索');
  $('.search-dialog').attr({ role: 'dialog', 'aria-modal': 'true', 'aria-label': '搜索文章' });
  $('#footer .framework-info').html('Built with <a href="https://hexo.io" target="_blank" rel="noopener">Hexo</a> &amp; <a href="https://github.com/jerryc127/hexo-theme-butterfly" target="_blank" rel="noopener">Butterfly</a>');
  $('#footer .footer-other').append('<div class="jerry-footer-links"><a href="/tags/">Tags</a><a href="/archives/">Archives</a></div>');

  if ($('#recent-posts').length) {
    $('body').addClass('jerry-home');
    $('#page-header .title-seo').remove();
    $('#recent-posts').prepend('<section class="jerry-hero" aria-labelledby="jerry-hero-title"><p class="jerry-eyebrow" lang="en">Notes on work &amp; curiosity</p><h1 id="jerry-hero-title" lang="en">Jerry<span class="jerry-period">.</span></h1><p class="jerry-hero-line" lang="en">Building, learning<br class="jerry-mobile-break"> and writing.</p><p class="jerry-hero-topics" lang="en">AI · Project Management · Manufacturing · B2B Sales</p><nav class="jerry-hero-links" aria-label="了解 Jerry"><a href="/about/">About <span aria-hidden="true">↗</span></a><a href="/projects/">Projects <span aria-hidden="true">↗</span></a><a href="https://github.com/jerryma0622-lgtm" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a></nav></section><div class="jerry-section-heading"><h2 lang="en">Latest Writing</h2><a href="/archives/">All writing <span aria-hidden="true">↗</span></a></div>');
    $('.recent-post-item').each((_, el) => {
      const info = $(el).find('.recent-post-info');
      const post = posts.get(info.find('.article-title').attr('href'));
      const date = info.find('time').first().clone();
      const categories = info.find('.article-meta__categories').clone();
      const meta = $('<div class="jerry-writing-meta"></div>').append(date);
      if (post) meta.append('<span>' + readingMinutes(post.content) + ' min read</span>');
      info.find('.article-meta-wrap').remove();
      info.prepend(meta);
      info.append($('<div class="jerry-writing-categories"></div>').append(categories));
      const title = info.find('.article-title');
      title.wrap('<h3 class="jerry-writing-title"></h3>');
    });
  } else if ($('#post').length) {
    $('body').addClass('jerry-article');
    const header = $('#post-info');
    const date = header.find('time').first().clone();
    const categories = header.find('a.post-meta-categories').clone();
    const tags = $('#post .post-meta__tags').clone();
    const meta = $('<div class="jerry-article-meta"></div>').append(date);
    meta.append('<span>' + readingMinutes($('#article-container').html()) + ' min read</span>');
    header.find('#post-meta').remove();
    header.prepend($('<div class="jerry-writing-categories"></div>').append(categories));
    header.append(meta, $('<div class="jerry-article-tags" aria-label="文章标签"></div>').append(tags));
    $('#post .tag_share').remove();
    $('#card-toc .item-headline i').remove();
    $('#card-toc .item-headline > span').first().text('On this page');
  } else {
    $('body').addClass('jerry-page');
    if ($('#archive').length) {
      $('#archive').prepend('<header class="jerry-page-heading"><p class="jerry-eyebrow">The writing index</p><h1>Writing</h1><p>技术实践、项目过程与日常观察。</p></header>');
    }
    if ($('#page .category-list').length) {
      $('#page > .page-title').text('Categories');
      $('#page > .page-title').after('<p class="jerry-page-intro">按主题，找到感兴趣的文章。</p><a class="jerry-index-link" href="/tags/">Browse tags ↗</a>');
    }
    if ($('#page .tag-cloud-list').length) {
      $('#page > .page-title').text('Tags');
      $('#page > .page-title').after('<p class="jerry-page-intro">从一个关键词开始阅读。</p><a class="jerry-index-link" href="/categories/">Browse categories ↗</a>');
    }
  }
  if (main.find('h1').length) $('#page-header .title-seo').remove();
  return $.html();
}, 30);
