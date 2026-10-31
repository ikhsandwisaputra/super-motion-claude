---
source: https://swup.js.org/plugins/body-class-plugin
title: "Body Class Plugin — swup"
fetched: 2026-10-28
---

[v3.3.0](https://github.com/swup/body-class-plugin)

# Body Class Plugin

A [swup](https://swup.js.org) plugin for updating the body classname after each page load.

## [Installation](https://swup.js.org/plugins/body-class-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/body-class-plugin
```

```
npm install @swup/body-class-plugin
```

```
import SwupBodyClassPlugin from '@swup/body-class-plugin';
```

```
import SwupBodyClassPlugin from '@swup/body-class-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/body-class-plugin@3"></script>
```

```
<script src="https://unpkg.com/@swup/body-class-plugin@3"></script>
```

## [Usage](https://swup.js.org/plugins/body-class-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupBodyClassPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupBodyClassPlugin()]
});
```

## [Options](https://swup.js.org/plugins/body-class-plugin/#options)

### [prefix](https://swup.js.org/plugins/body-class-plugin/#prefix)

By default, all classes are updated. If your site uses classes on the body element for functionality
like opening menus, you can tell the plugin to only update classnames starting with a prefix,
e.g. `page-`. It will then only update those classes and leave all other classes untouched.

```
{
  prefix: 'page-'
}
```

```
{
  prefix: 'page-'
}
```

### [attributes](https://swup.js.org/plugins/body-class-plugin/#attributes)

Update additional attributes of the body element. Useful if you have defined the `lang` or `dir`
attributes or work with `data-*` attributes on the body element. Accepts an array of strings or
regular expression instances.

```
{
  attributes: ['lang', 'dir', /^data-/]
}
```

```
{
  attributes: ['lang', 'dir', /^data-/]
}
```
