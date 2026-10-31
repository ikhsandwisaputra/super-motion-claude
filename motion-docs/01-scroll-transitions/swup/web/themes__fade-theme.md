---
source: https://swup.js.org/themes/fade-theme
title: "Fade Theme — swup"
fetched: 2026-10-28
---

[v2.0.2](https://github.com/swup/fade-theme)

# Fade Theme

A [swup](https://swup.js.org) theme for fade animations.

Makes the content fade out when leaving, and fade in when entering.

## [Installation](https://swup.js.org/themes/fade-theme/#installation)

Install the theme from npm and import it into your bundle.

```
npm install @swup/fade-theme
```

```
npm install @swup/fade-theme
```

```
import SwupFadeTheme from '@swup/fade-theme';
```

```
import SwupFadeTheme from '@swup/fade-theme';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/fade-theme@2"></script>
```

```
<script src="https://unpkg.com/@swup/fade-theme@2"></script>
```

## [Usage](https://swup.js.org/themes/fade-theme/#usage)

To run this theme, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupFadeTheme()]
});
```

```
const swup = new Swup({
  plugins: [new SwupFadeTheme()]
});
```

## [Options](https://swup.js.org/themes/fade-theme/#options)

### [mainElement](https://swup.js.org/themes/fade-theme/#mainelement)

Changes the selector of the elements to fade in/out. Defaults to `#swup`.

## [Customization](https://swup.js.org/themes/fade-theme/#customization)

You can override the plugin's custom properties to fine-tweak the animation.
These are the defaults:

```
body {
  --swup-fade-theme-duration: 0.4s;
}
```

```
body {
  --swup-fade-theme-duration: 0.4s;
}
```
