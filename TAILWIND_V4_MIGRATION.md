# Tailwind CSS v4 Migration

This PR migrates our codebase from Tailwind CSS v3 to v4 and consolidates our styles into a single global CSS file.

## Changes Made

1. **Created a global CSS file**

   - Created `/public/styles/global.css` with all our custom styles
   - Replaced CDN Tailwind imports with our own CSS file
   - Used `@import "tailwindcss"` instead of `@tailwind` directives

2. **Updated build configuration**

   - Added `@tailwindcss/postcss` plugin in PostCSS config
   - Ensured `@tailwindcss/vite` plugin was properly configured
   - Added `@tailwindcss/cli` for CLI usage

3. **Updated utility classes**

   - Replaced `rounded-xl/lg/full` → `rounded-lg/md/xl`
   - Replaced `shadow-xl/lg` → `shadow-lg/md`
   - Updated other deprecated utilities throughout the codebase

4. **Changed import method**
   - Added `<link rel="stylesheet" href="/styles/global.css" />` to HTML templates

## Manual Tweaks

1. Made sure all utilities were properly renamed according to v4 scale changes
2. Consolidated all custom styles into a single global.css file
3. Updated our tailwind.config.ts to include all content patterns
4. Ensured proper path resolution for the global CSS file

## Testing

1. Visually inspected all pages to ensure consistent styling
2. Confirmed all animations and transitions still work
3. Checked responsive behavior across various screen sizes

````
# Tailwind CSS v3 to v4 Upgrade Guide

**Key Changes & Upgrade Steps:**

* **Browser Support:** Requires Safari 16.4+, Chrome 111+, Firefox 128+. Use v3.4 for older browsers.
* **Recommended Tool:** Use the upgrade tool for automated migration.
    ```bash
    npx @tailwindcss/upgrade
    ```
    * Requires Node.js 20+.
    * Run in a new branch, review diff, test thoroughly.
* **Manual Upgrade:**
    * **PostCSS:**
        * Use `@tailwindcss/postcss` plugin.
        * Remove `postcss-import` and `autoprefixer`.
        * `postcss.config.mjs`:
            ```javascript
            export default {
              plugins: {
                "@tailwindcss/postcss": {},
              },
            };
            ```
    * **Vite:**
        * Use `@tailwindcss/vite` plugin.
        * `vite.config.ts`:
            ```javascript
            import { defineConfig } from "vite";
            import tailwindcss from "@tailwindcss/vite";
            export default defineConfig({
              plugins: [
                tailwindcss(),
              ],
            });
            ```
    * **CLI:**
        * Use `@tailwindcss/cli` package.
        * Update build commands:
            ```bash
            npx @tailwindcss/cli -i input.css -o output.css
            ```

**Breaking Changes Summary:**

* **Removed `@tailwind` directives:** Replace with `@import "tailwindcss";`.
* **Removed Deprecated Utilities:**
    * `*-opacity-*` -> opacity modifiers (e.g., `bg-black/50`)
    * `flex-shrink-*` -> `shrink-*`
    * `flex-grow-*` -> `grow-*`
    * `overflow-ellipsis` -> `text-ellipsis`
    * `decoration-slice`/`-clone` -> `box-decoration-slice`/`-clone`
* **Renamed Utilities:**
    * `shadow-sm` -> `shadow-xs`
    * `shadow` -> `shadow-sm`
    * `drop-shadow-sm` -> `drop-shadow-xs`
    * `drop-shadow` -> `drop-shadow-sm`
    * `blur-sm` -> `blur-xs`
    * `blur` -> `blur-sm`
    * `backdrop-blur-sm` -> `backdrop-blur-xs`
    * `backdrop-blur` -> `backdrop-blur-sm`
    * `rounded-sm` -> `rounded-xs`
    * `rounded` -> `rounded-sm`
    * `outline-none` -> `outline-hidden` (old behavior)
    * `ring` -> `ring-3` (default width change)
* **Updated Scales:** Shadow, radius, blur scales renamed (`-sm` is now the old `-xs`). Update classes accordingly.
* **Outline Utility:** Default width 1px. New `outline-none` sets `outline-style: none`. Old `outline-none` is `outline-hidden`.
* **Default Ring Width:** Changed from 3px to 1px. Use `ring-3` for v3 behavior.
* **Space-between Selector:** Changed selector (`:not(:last-child)`). May affect inline elements or custom margins. Consider using `gap` with flex/grid.
* **Variants with Gradients:** Overriding preserves values. Use `via-none` to remove via stop.
* **Container Configuration:** Options removed. Extend with `@utility container {...}`.
* **Default Border/Divide Color:** Changed from `gray-200` to `currentColor`. Specify color or add base style.
* **Default Ring Width and Color:** Changed from 3px `blue-500` to 1px `currentColor`. Use `ring-3` and specify color or add theme variables.
* **Preflight Changes:**
    * Placeholder Color: Default is `currentColor` at 50% opacity (was `gray-400`). Add base style to revert.
    * Buttons Cursor: Default is `default` (was `pointer`). Add base style to revert.
    * Dialog Margins: Removed default `margin: auto`. Add base style to revert.
* **Prefix:** Syntax changed to `prefix:utility`. Configure without prefix.
* **Custom Utilities:** Use `@utility name {...}` instead of `@layer utilities` or `@layer components`.
* **Variant Stacking Order:** Changed from right-to-left to left-to-right. Reverse order-sensitive stacked variants (e.g., `first:*:pt-0` -> `*:first:pt-0`).
* **Variables in Arbitrary Values:** Syntax `[--var-name]` changed to `(--var-name)`.
* **Hover Styles on Mobile:** `hover` variant applies only if input device supports hover. Override variant or treat hover as enhancement.
* **Transitioning Outline-color:** Now included in `transition`/`transition-color`. Set color unconditionally or for both states to prevent transition.
* **Disabling Core Plugins:** `corePlugins` option removed.
* **Using `theme()` function:** Recommend CSS variables (`var(--var-name)`). For media queries, use variable name format (`theme(--breakpoint-xl)`).
* **JavaScript Config:** Not auto-detected. Load with `@config "path/to/tailwind.config.js";`. `corePlugins`, `safelist`, `separator` options removed.
* **Theme values in JavaScript:** `resolveConfig` removed. Use CSS variables directly or `getComputedStyle`.
* **`@apply` with Frameworks/CSS Modules:** Use `@reference "path/to/main.css";` or use CSS variables directly.
````
