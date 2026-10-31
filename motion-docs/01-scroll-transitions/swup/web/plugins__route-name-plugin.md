---
source: https://swup.js.org/plugins/route-name-plugin
title: "Route Name Plugin — swup"
fetched: 2026-10-28
---

[v4.1.0](https://github.com/swup/route-name-plugin)

# Route Name Plugin

A [swup](https://swup.js.org) plugin for named routes and route-based animation classes.

* Use path and route names to allow choosing between swup animations
* Given a list of URL patterns, it identifies\* named routes and adds them to the context object
* Adds classnames to the html tag reflecting the previous and next page's:
  + raw url in slug form, e.g. `from-about` and `to-team`
  + matched route name, e.g. `from-route-home` and `to-route-project`

\* Uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) under the hood.

## [Installation](https://swup.js.org/plugins/route-name-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/route-name-plugin
```

```
npm install @swup/route-name-plugin
```

```
import SwupRouteNamePlugin from '@swup/route-name-plugin';
```

```
import SwupRouteNamePlugin from '@swup/route-name-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/route-name-plugin@4"></script>
```

```
<script src="https://unpkg.com/@swup/route-name-plugin@4"></script>
```

## [Usage](https://swup.js.org/plugins/route-name-plugin/#usage)

To run this plugin, include an instance in the swup options.

Pass in a list of route patterns to match URLs against.

```
const swup = new Swup({
  plugins: [
    new SwupRouteNamePlugin({
      routes: [
        { name: 'home', path: '/:lang?' },
        { name: 'projects', path: '/:lang/projects' },
        { name: 'project', path: '/:lang/project/:slug' },
        { name: 'any', path: '(.*)' }
      ]
    })
  ]
});
```

```
const swup = new Swup({
  plugins: [
    new SwupRouteNamePlugin({
      routes: [
        { name: 'home', path: '/:lang?' },
        { name: 'projects', path: '/:lang/projects' },
        { name: 'project', path: '/:lang/project/:slug' },
        { name: 'any', path: '(.*)' }
      ]
    })
  ]
});
```

## [Context](https://swup.js.org/plugins/route-name-plugin/#context)

The plugin will add a `route` property to the `from` and `to` elements of the
[visit object](https://swup.js.org/visit/) available in all hooks.

```
{
  from: { url: '/en', route: 'home' },
  to: { url: '/en/project/lorem', route: 'project' }
}
```

```
{
  from: { url: '/en', route: 'home' },
  to: { url: '/en/project/lorem', route: 'project' }
}
```

Inside a hook handler, you can access them to modify your transitions as required.

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Coming from route', visit.from.route);
  console.log('Going to route', visit.to.route);
});
```

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Coming from route', visit.from.route);
  console.log('Going to route', visit.to.route);
});
```

## [Classes](https://swup.js.org/plugins/route-name-plugin/#classes)

### [Named routes](https://swup.js.org/plugins/route-name-plugin/#named-routes)

The plugin will add `from-route-*` and `to-route-*` classes to the `html` tag,
reflecting the identified route names of the current and next page.

```
<!-- Navigating from /en/ to /en/project/some-project/ -->
<html class="is-animating from-route-home to-route-project">
```

```
<!-- Navigating from /en/ to /en/project/some-project/ -->
<html class="is-animating from-route-home to-route-project">
```

You can then choose between animations based on the identified routes.

```
.transition-default {
  transition: 300ms opacity ease-in-out, 300ms transform ease-in-out;
  opacity: 1;
  transform: none;
}

/* Standard transition: fade */
html.is-animating .transition-default {
  opacity: 0;
}

/* Transition from homepage: transform instead of fade */
html.is-animating.from-route-home .transition-default {
  opacity: 1;
  transform: translateX(100%);
}
```

```
.transition-default {
  transition: 300ms opacity ease-in-out, 300ms transform ease-in-out;
  opacity: 1;
  transform: none;
}

/* Standard transition: fade */
html.is-animating .transition-default {
  opacity: 0;
}

/* Transition from homepage: transform instead of fade */
html.is-animating.from-route-home .transition-default {
  opacity: 1;
  transform: translateX(100%);
}
```

If from and to routes are identical, it will add the class `to-same-route`. This
is mostly useful to disable transitions between pages with identical layout.

```
<html class="is-animating from-route-project to-route-project to-same-route">
```

```
<html class="is-animating from-route-project to-route-project to-same-route">
```

### [Paths](https://swup.js.org/plugins/route-name-plugin/#paths)

When the `paths` option is enabled, the plugin will add `from-*` and
`to-*` classes to the `html` tag, reflecting the raw URLs of the current and
next page.

```
<!-- Navigating from /about/ to /team/ -->
<html class="is-animating from-about to-team">
```

```
<!-- Navigating from /about/ to /team/ -->
<html class="is-animating from-about to-team">
```

## [Options](https://swup.js.org/plugins/route-name-plugin/#options)

All options with their default values:

```
{
  routes: [],
  unknownRoute: 'unknown',
  matchOptions: {},
  paths: false
}
```

```
{
  routes: [],
  unknownRoute: 'unknown',
  matchOptions: {},
  paths: false
}
```

### [routes](https://swup.js.org/plugins/route-name-plugin/#routes)

Array of patterns for identifying named routes. Both `name` and `path` are
required. The `path` needs to be a valid route pattern that
[path-to-regexp](https://www.npmjs.com/package/path-to-regexp) will understand.

Here, order matters: the first found route name is used.

### [unknownRoute](https://swup.js.org/plugins/route-name-plugin/#unknownroute)

Default route name if no match was found among available patterns.

### [matchOptions](https://swup.js.org/plugins/route-name-plugin/#matchoptions)

Options passed to [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
for matching. Useful if you want to change case sensitivity, delimiters, etc.

### [paths](https://swup.js.org/plugins/route-name-plugin/#paths-1)

By default, the plugin will only add classnames for identified named routes.
To also add simple `from-*` and `to-*` for the raw URLs of the previous and
next page, set this option to `true`.
