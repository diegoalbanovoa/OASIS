# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OASIS is a static corporate website for a fictional IoT company targeting elderly care. It is built on the **Rappo** HTML template (Themefisher) and uses Gulp as its build system. The site is deployed via Netlify with `theme/` as the publish directory.

## Commands

```bash
# Install dependencies
npm install

# Development server with live reload (cleans theme/, then watches and serves)
npm run dev      # or: gulp

# Production build (no clean, no watch)
npm run build    # or: gulp build

# Clean the build output
gulp clean
```

## Architecture

### Source → Build Pipeline

All editable source lives in `source/`. The Gulp pipeline compiles it into `theme/` (the output that Netlify deploys — do not edit files in `theme/` directly).

| Source | Output |
|--------|--------|
| `source/*.html` | `theme/*.html` (assembled via partials) |
| `source/scss/**/*.scss` | `theme/css/style.css` |
| `source/js/*.js` | `theme/js/` |
| `source/images/` | `theme/images/` |
| `source/plugins/` | `theme/plugins/` |

### HTML Partials System

Pages in `source/*.html` use `gulp-file-include` to compose shared fragments from `source/partials/`:
- `header.htm` — full `<head>` block + opening `<body>` with all plugin CSS links
- `footer.htm` — closing scripts and `</body></html>`

To include a partial inside a page: `@@include('header.htm')`.

### SCSS Structure

`source/scss/style.scss` is the entry point that imports the partials:
- `_variables.scss` — color/spacing/font variables
- `_mixins.scss` — reusable mixins
- `_color.scss` — color utilities
- `_typography.scss` — font and text styles
- `_common.scss` — shared component styles
- `_main.scss` — page-specific styles
- `_responsive.scss` / `_media-query.scss` — breakpoints

### Pages

`index.html`, `about.html`, `contact.html`, `service.html`, `project.html`, `single-project.html`, `pricing.html`, `weenect-product.html`

### Plugins (vendor, in `source/plugins/`)

Bootstrap, Font Awesome, Themify Icons, Pe-icon-7-stroke, Animate.css, Slick Carousel. These are copied as-is to `theme/plugins/` — do not modify them.
