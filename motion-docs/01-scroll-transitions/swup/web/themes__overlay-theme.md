---
source: https://swup.js.org/themes/overlay-theme
title: "Overlay Theme — swup"
fetched: 2026-10-28
---

[v2.0.2](https://github.com/swup/overlay-theme)

# Overlay Theme

A [swup](https://swup.js.org) theme for showing an overlay during animations.

Makes an overlay slide on top of the page until the new page is shown.

## [Installation](https://swup.js.org/themes/overlay-theme/#installation)

Install the theme from npm and import it into your bundle.

```
npm install @swup/overlay-theme
```

```
npm install @swup/overlay-theme
```

```
import SwupOverlayTheme from '@swup/overlay-theme';
```

```
import SwupOverlayTheme from '@swup/overlay-theme';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/overlay-theme@2"></script>
```

```
<script src="https://unpkg.com/@swup/overlay-theme@2"></script>
```

## [Usage](https://swup.js.org/themes/overlay-theme/#usage)

To run this theme, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupOverlayTheme()]
});
```

```
const swup = new Swup({
  plugins: [new SwupOverlayTheme()]
});
```

## [Options](https://swup.js.org/themes/overlay-theme/#options)

### [direction](https://swup.js.org/themes/overlay-theme/#direction)

Changes the direction of the overlay animation.
Defaults to `to-right`. Available values: `to-right`, `to-left`, `to-bottom` and `to-top`.

### [Default options](https://swup.js.org/themes/overlay-theme/#default-options)

```
new SwupOverlayTheme({
  direction: 'to-right'
});
```

```
new SwupOverlayTheme({
  direction: 'to-right'
});
```

## [Customization](https://swup.js.org/themes/overlay-theme/#customization)

You can override the plugin's custom properties to fine-tweak the animation.
These are the defaults:

```
body {
  --swup-overlay-theme-color: #2d2e82;
  --swup-overlay-theme-duration: 0.6s;
  --swup-overlay-theme-delay: 0.2s;
  --swup-overlay-theme-scale: 1.2;
  --swup-overlay-theme-skew: 5deg;
}
```

```
body {
  --swup-overlay-theme-color: #2d2e82;
  --swup-overlay-theme-duration: 0.6s;
  --swup-overlay-theme-delay: 0.2s;
  --swup-overlay-theme-scale: 1.2;
  --swup-overlay-theme-skew: 5deg;
}
```

To style the overlay directly, use the class name `.swup-transition-overlay`:

```
.swup-transition-overlay {
  background: linear-gradient(45deg, rgb(131, 58, 180), rgb(253, 29, 29), rgb(252, 176, 69));
}
```

```
.swup-transition-overlay {
  background: linear-gradient(45deg, rgb(131, 58, 180), rgb(253, 29, 29), rgb(252, 176, 69));
}
```
