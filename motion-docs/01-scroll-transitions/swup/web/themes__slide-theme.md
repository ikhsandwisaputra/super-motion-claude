---
source: https://swup.js.org/themes/slide-theme
title: "Slide Theme — swup"
fetched: 2026-10-28
---

[v2.0.2](https://github.com/swup/slide-theme)

# Slide Theme

A [swup](https://swup.js.org) theme for in/out slide animations.

Makes the content slide out to one direction, and slide in from the other.

## [Installation](https://swup.js.org/themes/slide-theme/#installation)

Install the theme from npm and import it into your bundle.

```
npm install @swup/slide-theme
```

```
npm install @swup/slide-theme
```

```
import SwupSlideTheme from '@swup/slide-theme';
```

```
import SwupSlideTheme from '@swup/slide-theme';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/slide-theme@2"></script>
```

```
<script src="https://unpkg.com/@swup/slide-theme@2"></script>
```

## [Usage](https://swup.js.org/themes/slide-theme/#usage)

To run this theme, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupSlideTheme()]
});
```

```
const swup = new Swup({
  plugins: [new SwupSlideTheme()]
});
```

## [Options](https://swup.js.org/themes/slide-theme/#options)

### [mainElement](https://swup.js.org/themes/slide-theme/#mainelement)

Changes the selector of the elements to slide in/out. Defaults to `#swup`.

### [reversed](https://swup.js.org/themes/slide-theme/#reversed)

Reverses the transition direction. Defaults to `false`.

## [Customization](https://swup.js.org/themes/slide-theme/#customization)

You can override the plugin's custom properties to fine-tweak the animation.
These are the defaults:

```
body {
  --swup-slide-theme-translate: 60px;
  --swup-slide-theme-duration-fade: 0.3s;
  --swup-slide-theme-duration-slide: 0.4s;
}
```

```
body {
  --swup-slide-theme-translate: 60px;
  --swup-slide-theme-duration-fade: 0.3s;
  --swup-slide-theme-duration-slide: 0.4s;
}
```
