---
source: https://swup.js.org/plugins
title: "Plugins — swup"
fetched: 2026-10-28
---

# Plugins

Swup is small by design. Extended features can be added via plugins.

See below for details on [installing and enabling plugins](https://swup.js.org/plugins/#installing-plugins).

## [Official plugins](https://swup.js.org/plugins/#official-plugins)

Plugins extending swup's functionality, developed and maintained by the core team.

| Plugin | Features |
| --- | --- |
| [Accessibility Plugin](https://swup.js.org/plugins/a11y-plugin/) | Enhance accessibility |
| [Body Class Plugin](https://swup.js.org/plugins/body-class-plugin/) | Update the body classname |
| [Debug Plugin](https://swup.js.org/plugins/debug-plugin/) | Debug and get help in development |
| [Forms Plugin](https://swup.js.org/plugins/forms-plugin/) | Submit forms with animations |
| [Fragment Plugin](https://swup.js.org/plugins/fragment-plugin/) | Dynamically replace containers based on rules |
| [Head Plugin](https://swup.js.org/plugins/head-plugin/) | Update the contents of the head tag |
| [JS Plugin](https://swup.js.org/plugins/js-plugin/) | Manage animations in JS |
| [Parallel Plugin](https://swup.js.org/plugins/parallel-plugin/) | Animate the previous and next page in parallel |
| [Preload Plugin](https://swup.js.org/plugins/preload-plugin/) | Preload pages to speed up navigation |
| [Progress Bar Plugin](https://swup.js.org/plugins/progress-plugin/) | Display a progress bar |
| [Route Name Plugin](https://swup.js.org/plugins/route-name-plugin/) | Named routes and route-based animations |
| [Scripts Plugin](https://swup.js.org/plugins/scripts-plugin/) | Re-evaluate scripts |
| [Scroll Plugin](https://swup.js.org/plugins/scroll-plugin/) | Smooth scrolling |

## [Official integrations](https://swup.js.org/plugins/#official-integrations)

Plugins or libraries connecting swup with other frameworks or services.

| Plugin | Integrates with |
| --- | --- |
| [Astro Integration](https://swup.js.org/integrations/astro) | Astro.js |
| [GA Plugin](https://swup.js.org/plugins/ga-plugin) | Google Analytics |
| [Gia Plugin](https://swup.js.org/plugins/gia-plugin) | Gia frontend components |
| [GTM Plugin](https://swup.js.org/plugins/gtm-plugin) | Google Tag Manager |
| [Livewire Plugin](https://swup.js.org/plugins/livewire-plugin) | Laravel Livewire |
| [Matomo Plugin](https://swup.js.org/plugins/matomo-plugin) | Matomo analytics |

## [Installing plugins](https://swup.js.org/plugins/#installing-plugins)

Install and import the plugin via npm and your bundler:

```
npm install @swup/scroll-plugin
```

```
npm install @swup/scroll-plugin
```

```
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
```

```
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
```

Enable the plugin at initialisation of swup by including it in the options:

```
const swup = new Swup({
  plugins: [new SwupScrollPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupScrollPlugin()]
});
```

Alternatively, you can use swup's `use` & `unuse` methods to add or remove plugins after initialization.

```
const swup = new Swup();
swup.use(new SwupScrollPlugin());
```

```
const swup = new Swup();
swup.use(new SwupScrollPlugin());
```

## [Accessing plugin instances](https://swup.js.org/plugins/#accessing-plugin-instances)

Use swup's `findPlugin` method to find and manipulate plugin instances directly.

```
const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```

```
const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```

## In this Section

* [Accessibility Plugin](https://swup.js.org/plugins/a11y-plugin/)
* [Body Class Plugin](https://swup.js.org/plugins/body-class-plugin/)
* [Debug Plugin](https://swup.js.org/plugins/debug-plugin/)
* [Forms Plugin](https://swup.js.org/plugins/forms-plugin/)
* [Fragment Plugin](https://swup.js.org/plugins/fragment-plugin/)
* [Head Plugin](https://swup.js.org/plugins/head-plugin/)
* [JS Plugin](https://swup.js.org/plugins/js-plugin/)
* [Parallel Plugin](https://swup.js.org/plugins/parallel-plugin/)
* [Preload Plugin](https://swup.js.org/plugins/preload-plugin/)
* [Progress Bar Plugin](https://swup.js.org/plugins/progress-plugin/)
* [Route Name Plugin](https://swup.js.org/plugins/route-name-plugin/)
* [Scripts Plugin](https://swup.js.org/plugins/scripts-plugin/)
* [Scroll Plugin](https://swup.js.org/plugins/scroll-plugin/)
* [Create a plugin 🎉](https://swup.js.org/plugins/create-plugin/)
