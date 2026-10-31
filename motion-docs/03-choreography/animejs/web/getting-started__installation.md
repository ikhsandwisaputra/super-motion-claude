---
source: https://animejs.com/documentation/getting-started/installation
title: "Installation | Getting started | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Getting started](https://animejs.com/documentation/getting-started "Getting started")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Installation](https://animejs.com/documentation/getting-started/installation "Installation")

## [From NPM](https://animejs.com/documentation/getting-started/installation#from-npm)

Anime.js can be installed via the [`animejs`](https://www.npmjs.com/package/animejs "`animejs`") package.

```bash
npm install animejs
```

Then you can import the Anime.js methods directly into your JavaScript with a bundler like [Vite](https://vitejs.dev/ "Vite") or [esbuild](https://esbuild.github.io/ "esbuild").

### ES Modules

```js
import { animate } from 'animejs';
```

### CommonJS

```js
const { animate } = require('animejs');
```

## [From a CDN](https://animejs.com/documentation/getting-started/installation#from-a-cdn)

### ES Modules

| CDN Name | URL |
| --- | --- |
| esm.sh | [esm.sh/animejs](https://esm.sh/animejs "esm.sh") |
| JsDelivr | [cdn.jsdelivr.net/npm/animejs/+esm](https://cdn.jsdelivr.net/npm/animejs/+esm "JsDelivr") |

```js
import { animate } from 'https://esm.sh/animejs';
```

### UMD Global object

| CDN Name | URL |
| --- | --- |
| JsDelivr | [cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js](https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js "JsDelivr") |

```html
<script src="https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js"></script>
<script>
  const { animate } = anime;
</script>
```

## [Direct download](https://animejs.com/documentation/getting-started/installation#direct-download)

Download from the library directly from the [GitHub repository](https://github.com/juliangarnier/anime/tree/master/dist "GitHub repository").

### Available Files

| File Name | Type |
| --- | --- |
| `dist/modules/index.js` | ES modules entry point |
| `dist/modules/index.cjs` | CommonJS modules entry point |
| `dist/bundles/anime.esm.js` | Bundled ES modules |
| `dist/bundles/anime.esm.min.js` | Bundled and minified ES modules |
| `dist/bundles/anime.umd.js` | Bundled UMD (universal modules definition) |
| `dist/bundles/anime.umd.min.js` | Bundled and minified UMD |

### ES Modules

```js
import { animate } from './animejs/dist/bundles/anime.esm.min.js';
```

### UMD Global object

```html
<script src="animejs/dist/bundles/anime.umd.min.js"></script>
<script>
  const { animate } = anime;
</script>
```

###### Previous

###### Next

* [Getting started](https://animejs.com/documentation/getting-started "Getting started")
* [Module imports](https://animejs.com/documentation/getting-started/module-imports "Module imports")
