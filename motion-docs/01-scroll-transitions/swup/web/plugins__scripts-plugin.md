---
source: https://swup.js.org/plugins/scripts-plugin
title: "Scripts Plugin — swup"
fetched: 2026-10-28
---

[v2.1.0](https://github.com/swup/scripts-plugin)

# Scripts Plugin

A [swup](https://swup.js.org) plugin for re-evaluating scripts.

Re-run any `<script>` tags inside the `<head>` and/or `<body>` on every page view. This can be
helpful if you don't have full control over the scripts included on your website.

Ignores any script tags with the attribute `[data-swup-ignore-script]`. This attribute **must be**
on the script tag that initializes swup itself to prevent creating multiple swup instances.

## [Installation](https://swup.js.org/plugins/scripts-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/scripts-plugin
```

```
npm install @swup/scripts-plugin
```

```
import SwupScriptsPlugin from '@swup/scripts-plugin';
```

```
import SwupScriptsPlugin from '@swup/scripts-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/scripts-plugin@2"></script>
```

```
<script src="https://unpkg.com/@swup/scripts-plugin@2"></script>
```

## [Usage](https://swup.js.org/plugins/scripts-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupScriptsPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupScriptsPlugin()]
});
```

## [Options](https://swup.js.org/plugins/scripts-plugin/#options)

### [head / body](https://swup.js.org/plugins/scripts-plugin/#head-body)

The plugin provides two boolean options — `head` and `body`. Both are set to `true` by default.
Set these to `false` to disable re-evaluating scripts globally in the head or body of your website.

```
new SwupScriptsPlugin({
  head: true,
  body: true
});
```

```
new SwupScriptsPlugin({
  head: true,
  body: true
});
```

### [optin](https://swup.js.org/plugins/scripts-plugin/#optin)

Some third-party libraries like Google Tag Manager might not give you any control over how
scripts are inserted into the page. In that case, enabling the `optin` option will only reload the
scripts explicitly marked with a `[data-swup-reload-script]` attribute.

```
new SwupScriptsPlugin({
  optin: false
});
```

```
new SwupScriptsPlugin({
  optin: false
});
```
