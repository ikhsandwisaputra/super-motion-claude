---
source: https://swup.js.org/plugins/gia-plugin
title: "Gia Plugin — swup"
fetched: 2026-10-28
---

[v2.0.4](https://github.com/swup/gia-plugin)

# Gia Plugin

A [swup](https://swup.js.org) plugin for integrating
[Gia](https://www.npmjs.com/package/gia) frontend components.

Automatically reloads components when required only for the replaced containers.

## [Installation](https://swup.js.org/plugins/gia-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/gia-plugin
```

```
npm install @swup/gia-plugin
```

```
import SwupGiaPlugin from '@swup/gia-plugin';
```

```
import SwupGiaPlugin from '@swup/gia-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/gia-plugin@2"></script>
```

```
<script src="https://unpkg.com/@swup/gia-plugin@2"></script>
```

## [Usage](https://swup.js.org/plugins/gia-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupGiaPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupGiaPlugin()]
});
```

## [Options](https://swup.js.org/plugins/gia-plugin/#options)

### [components](https://swup.js.org/plugins/gia-plugin/#components)

Components to be used for mount/unmount. Defaults to an empty object.

```
import Component from 'gia/Component'

class ExampleComponent extends Component {
    // ...
}

const components = {
  ExampleComponent
}

const swup = new Swup({
  plugins: [new SwupGiaPlugin({ components })]
})
```

```
import Component from 'gia/Component'

class ExampleComponent extends Component {
    // ...
}

const components = {
  ExampleComponent
}

const swup = new Swup({
  plugins: [new SwupGiaPlugin({ components })]
})
```

### [firstLoad](https://swup.js.org/plugins/gia-plugin/#firstload)

Whether the components should be loaded on start. Defaults to `true`.

```
new SwupGiaPlugin({ firstLoad: true });
```

```
new SwupGiaPlugin({ firstLoad: true });
```

### [log](https://swup.js.org/plugins/gia-plugin/#log)

Let Gia report info on mounting/unmounting of components. Corresponds to setting the `log` variable
of [Gia's config](https://github.com/giantcz/gia#config)). Defaults to `false`.

```
new SwupGiaPlugin({ log: false });
```

```
new SwupGiaPlugin({ log: false });
```
