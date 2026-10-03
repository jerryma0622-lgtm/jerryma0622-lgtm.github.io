# Jerry Blog visual system V1

## Theme
Editorial × Tech × Personal. Cool paper canvas, a left-aligned Jerry wordmark,
and typography-led writing indexes. Reading gets the most space; decoration stays quiet.

## Palette
| Role | Light | Dark |
| --- | --- | --- |
| Canvas | #f7f8fa | #191c23 |
| Surface | #ffffff | #21252e |
| Text | #252b36 | #e3e6ed |
| Secondary | #626b79 | #a7afbf |
| Border | #dde1e8 | #363c49 |
| Accent | #365bc0 | #a2b6fa |
| Hover | #29469a | #c4d0ff |

Use --jerry-* tokens in source/css/custom.css. Shadows are reserved for search and
mobile TOC. The reading canvas has no card shadow.

## Typography
Inter variable, self-hosted WOFF2 with font-display: swap, followed by system Latin
and Chinese sans-serif fonts. One font request, no external font service. Latin subset
font and SIL OFL license are in source/assets/fonts/, from @fontsource-variable/inter 5.3.0, 48,256 bytes. Upstream: github.com/rsms/inter.
Body: 17px/1.9 desktop, 16px/1.85 mobile. Prose max-width: 790px.
Article H1: 38px/1.5, H2: 27px/1.5, H3: 21px/1.6. Latin Hero: 112px desktop,
80px phone, weight 740. No negative tracking on Chinese. Code: Cascadia Code,
SFMono-Regular, Consolas, monospace, 13px/1.85.

## Components
Navigation is text-first. Search and mobile menu reuse Butterfly handlers. Header
mode button delegates to Butterfly's persisted switch. Writing entries use hairline
dividers, date, estimated reading time, title, description and category links.
Tags are compact pills; category indexes are rows. Radius: 4 / 8 / 12px plus tag pills.
Focus: 2px accent outline, 4px offset. Press: scale(.97), 120ms. Hover: 2px upward,
180ms. Keyboard and reduced-motion states have no animation.

## Layout
1120px canvas, 24px gutters. Spacing: 8 / 16 / 24 / 32 / 48 / 72px.
Home: compact Hero, Latest Writing, footer. Article: up to 790px prose plus 230px
outline, with 72px gap. Projects use a factual empty state, no invented projects.

## Depth
Surface steps and hairlines. Header alone uses slight transparency and 10px blur.
Hero uses a barely visible neutral glow, tinted blue-violet in dark mode. No gradient
text or background image.

## Guardrails
No invented projects, credentials or biography. Published post Markdown stays intact.
Never read the private vault. No trackers, music, particles, animation libraries,
theme core edits or additional runtime libraries. Retain framework attribution.
Source assets are public build inputs.

## Responsive
Native mobile navigation at 768px. TOC uses Butterfly's overlay at 900px and below,
without reducing prose width. Hero sentence breaks at 430px. Verify 1440 / 1280 /
768 / 430 / 375 / 320px, light and dark, and scrolling inside code blocks.
Header controls have 44px touch targets.

## Future edit guide
Change CSS color tokens and theme_color together. Add actual projects in
source/projects/index.md and factual biography in source/about/index.md.
New prose: 17px/1.9, 790px max-width. Metadata: 12px, 4px radius, 1px #dde1e8
boundary. Writing titles: 28px, weight 620; excerpts: 15px/1.9. Keep indexes cardless.

scripts/presentation.js is an after_render:html build-time filter. After Butterfly
upgrades verify #nav, .recent-post-item, #post-info, .post-meta__tags, #card-toc,
archive/category/tag selectors and native search/menu/theme behavior. Source Markdown
is authoritative. Reading estimates: 400 Han characters/minute plus 200 Latin words/minute.
