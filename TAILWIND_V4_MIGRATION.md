# TAILWIND_V4_REFERENCE

## META

- VERSION: v4.1
- DATE: 2025-01-22
- MIN_BROWSER: Safari16.4+|Chrome111+|Firefox128+

## CORE_FEATURES

- PERF: 5x-faster-builds|182x-faster-incremental
- CSS: cascade-layers|registered-properties|color-mix|logical-properties
- INSTALL: single-import|zero-config|lightweight
- CONFIG: css-first|no-js-file|theme-variables
- UTILITIES: dynamic-values|arbitrary-support|p3-colors
- NEW: container-queries|3d-transforms|gradients|starting-style|not-variant

## MIGRATION

### TOOLS

- AUTO: `npx @tailwindcss/upgrade` (Node20+)
- PACKAGES:
  - POST_CSS: `@tailwindcss/postcss` (removes need for postcss-import, autoprefixer)
  - VITE: `@tailwindcss/vite`
  - CLI: `@tailwindcss/cli` -i input.css -o output.css

### CORE_CHANGES

- IMPORT: `@import "tailwindcss"` replaces `@tailwind` directives
- CONFIG: CSS-based in `@theme {}` block, not JS config
- CONTENT: Auto-detected, manual with `@source "path"`
- STYLES: Global CSS file recommended
- LOAD_JS_CONFIG: `@config "path/to/tailwind.config.js"` if needed

### MIGRATION_STEPS

- CREATE_GLOBAL_CSS: Consolidate styles into single file (e.g., `/public/styles/global.css`)
- UPDATE_BUILD_CONFIG: Add proper plugins to build system
- UPDATE_UTILITY_CLASSES: Rename according to breaking changes
- UPDATE_IMPORT_METHOD: Change to direct CSS imports
- REPLACE_CDN: Replace CDN Tailwind imports with local CSS file
- ADD_CSS_LINK: `<link rel="stylesheet" href="../style.css" />`
- TEST_THOROUGHLY: Visual inspection across all pages

### FRAMEWORKS_INTEGRATION

- APPLY_WITH_FRAMEWORKS: Use `@reference "path/to/main.css"` for CSS modules
- CSS_VARS_DIRECT: Access theme values with CSS variables
- COMPUTED_STYLE: Use `getComputedStyle` instead of `resolveConfig`

### BREAKING_CHANGES

#### REMOVED_UTILITIES

- `*-opacity-*` → opacity modifiers (`bg-black/50`)
- `flex-shrink-*` → `shrink-*`
- `flex-grow-*` → `grow-*`
- `overflow-ellipsis` → `text-ellipsis`
- `decoration-slice`/`-clone` → `box-decoration-slice`/`-clone`

#### RENAMED_UTILITIES

```
shadow-sm → shadow-xs
shadow → shadow-sm
drop-shadow-sm → drop-shadow-xs
drop-shadow → drop-shadow-sm
blur-sm → blur-xs
blur → blur-sm
backdrop-blur-sm → backdrop-blur-xs
backdrop-blur → backdrop-blur-sm
rounded-sm → rounded-xs
rounded → rounded-sm
outline-none → outline-hidden (old behavior)
ring → ring-3 (default width change)
```

#### DEFAULT_VALUE_CHANGES

- RING: 1px (was 3px), use `ring-3` for v3 behavior
- RING_COLOR: `currentColor` (was `blue-500`)
- BORDER_COLOR: `currentColor` (was `gray-200`)
- DIVIDE_COLOR: `currentColor` (was `gray-200`)
- OUTLINE: Default width now 1px
- OUTLINE_NONE: Sets `outline-style: none` (use `outline-hidden` for old behavior)
- VARIANT_GRADIENTS: Overriding preserves values, use `via-none` to remove via stop

#### SELECTOR_CHANGES

- SPACE_BETWEEN: Changed `:not(:last-child)` selector
- PLACEHOLDER: `currentColor` at 50% opacity (was `gray-400`)
- BUTTONS: Default cursor `default` (was `pointer`)
- DIALOG: No default `margin: auto`

#### SYNTAX_CHANGES

- PREFIX: `prefix:utility` format
- CUSTOM_UTILITIES: `@utility name {...}` not `@layer`
- VARIANT_ORDER: Left-to-right (was right-to-left), reverse order (e.g., `first:*:pt-0` → `*:first:pt-0`)
- CSS_VARS: `(--var-name)` not `[--var-name]`
- HOVER: Only applies if device supports hover
- TRANSITION_OUTLINE: Now included in `transition`/`transition-color`

#### REMOVED_OPTIONS

- CORE_PLUGINS: `corePlugins` option removed
- THEME_FUNCTION: Use CSS variables instead of `theme()`
- RESOLVE_CONFIG: Removed, use CSS variables directly
- CONTAINER_CONFIG: Options removed, extend with `@utility container {...}`
- SAFELIST: Option removed
- SEPARATOR: Option removed

## INSTALL_SNIPPETS

### POSTCSS

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### VITE

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [tailwindcss()],
});
```

### CSS_IMPORT

```css
@import 'tailwindcss';
```

### HTML_LINK

```html
<link rel="stylesheet" href="/styles/global.css" />
```

## CONFIG_EXAMPLES

### THEME_VARIABLES

```css
@import 'tailwindcss';
@theme {
  --font-display: 'Satoshi', 'sans-serif';
  --breakpoint-3xl: 1920px;
  --color-primary: oklch(0.84 0.18 117.33);
  --spacing: 0.25rem;
}
```

### DYNAMIC_UTILITIES

```css
@layer utilities {
  .mt-8 {
    margin-top: calc(var(--spacing) * 8);
  }
}
```

## NEW_FEATURES_SYNTAX

### CONTAINER_QUERIES

```html
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">
    <!-- Content -->
  </div>
  <div class="grid grid-cols-3 @max-md:grid-cols-1">
    <!-- Content -->
  </div>
</div>
```

### 3D_TRANSFORMS

```html
<div class="perspective-distant">
  <article class="rotate-x-51 rotate-z-43 transform-3d">
    <!-- Content -->
  </article>
</div>
```

### GRADIENTS

```html
<div class="bg-linear-45 from-indigo-500 via-purple-500 to-pink-500"></div>
<div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400"></div>
<div class="bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600"></div>
<div class="bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>
```

### STARTING_STYLE

```html
<div popover class="transition-discrete starting:open:opacity-0">
  <!-- Content -->
</div>
```

### NOT_VARIANT

```html
<div class="not-hover:opacity-75 not-supports-hanging-punctuation:px-4"></div>
```

## PERFORMANCE_METRICS

```
| Metric                          | v3.4   | v4.0   | Factor |
|---------------------------------|--------|--------|--------|
| Full build                      | 378ms  | 100ms  | 3.78x  |
| Incremental (new CSS)           | 44ms   | 5ms    | 8.8x   |
| Incremental (existing classes)  | 35ms   | 192µs  | 182x   |
```

## MIGRATION_CHECKLIST

- UPDATE_PACKAGES: Install v4 packages
- UPDATE_CONFIG: Convert JS config to CSS @theme
- UPDATE_IMPORT: Replace @tailwind with @import
- UPDATE_UTILITIES: Rename utilities per breaking changes
- CHECK_DEFAULTS: Review default value changes
- REVERSE_VARIANTS: Fix stacked variant order
- APPLY_COMPAT: Update @apply usage with @reference
- CONSOLIDATE_CSS: Create global CSS file
- FIX_RING_WIDTH: Add ring-3 where needed
- UPDATE_PREFLIGHT: Fix cursor, placeholder, dialog styles
- TEST_VISUALS: Verify styling across pages/components
- TEST_RESPONSIVE: Check behavior across screen sizes
- TEST_TRANSITIONS: Confirm animations still work
