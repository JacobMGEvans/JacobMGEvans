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
