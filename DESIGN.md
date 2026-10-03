# Jerry's Blog visual direction

## Theme
Quiet technical reading space using Butterfly's existing article cards and navigation. The reference supplies the content organization; no reference artwork, copy or code is reused.

## Palette
Light canvas #f2f5f7, paper #ffffff, ink #243341, muted #63717d, accent #355f7a, boundary #dbe2e7. Dark canvas #111820, paper #1b2530, text #dbe4ec, muted #a0b0be, accent #98bdd4, boundary #344350.

## Typography
System UI and system CJK fonts for fast, consistent local rendering; body 16px with line-height 1.8, code 14px with Consolas/Cascadia Code. No external font requests or CJK negative tracking.

## Components
Retain article cards as requested, with 8px corners and a light 1px boundary instead of decorative shadows or cover images. Tools use 4px corners and 40px hit areas. Native theme search is retained; no invented marketing section.

## Layout
Maximum content width 1120px; article prose capped at 76ch. Desktop spacing 36px/20px/56px, mobile 24px/12px/40px. Empty aside disappears; posts retain the TOC.

## Depth
Solid background steps and hairline boundaries. No blur, gradients, background photos or decorative side rails.

## Guardrails
One real welcome post only. No invented credentials or project achievements. No autoplay, trackers, particle effects, trails, background music, sharing widgets or comment services. Keep upstream theme attribution.

## Responsive behavior
Use Butterfly's mobile navigation at 768px and below. Verify 320px, 375px and desktop. Respect reduced motion; no entrance animations. Focus outlines and a skip-to-content link aid keyboard navigation.

## Future edit guide
Use plain CSS in source/css/custom.css. Adjust palette only through the named variables and theme_color config. Preserve reading rhythm and 8px article corners. Add real project content through Markdown pages, not fictional dashboard cards.
