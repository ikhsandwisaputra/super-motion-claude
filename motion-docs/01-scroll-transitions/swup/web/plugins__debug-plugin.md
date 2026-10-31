---
source: https://swup.js.org/plugins/debug-plugin
title: "Debug Plugin — swup"
fetched: 2026-10-28
---

[v4.1.0](https://github.com/swup/debug-plugin)

# Debug Plugin

A [swup](https://swup.js.org) plugin for debugging and helping in development.

* Detect common mistakes and suggest solutions in the console
* Output all triggered hooks to the console as they happen
* Configure swup's `log` method to make its output visible

## [Installation](https://swup.js.org/plugins/debug-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/debug-plugin
```

```
npm install @swup/debug-plugin
```

```
import SwupDebugPlugin from '@swup/debug-plugin';
```

```
import SwupDebugPlugin from '@swup/debug-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/debug-plugin@4"></script>
```

```
<script src="https://unpkg.com/@swup/debug-plugin@4"></script>
```

## [Usage](https://swup.js.org/plugins/debug-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupDebugPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupDebugPlugin()]
});
```

## [Options](https://swup.js.org/plugins/debug-plugin/#options)

### [globalInstance](https://swup.js.org/plugins/debug-plugin/#globalinstance)

If `true`, the plugin will store the swup instance on the global window object, making swup
available at `window.swup`. Defaults to `false`.

```
{
  globalInstance: true
}
```

```
{
  globalInstance: true
}
```
