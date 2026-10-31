---
source: https://swup.js.org/getting-started/installation
title: "Installation — swup"
fetched: 2026-10-28
---

# Installation

## [Bundler](https://swup.js.org/getting-started/installation/#bundler)

If you use a bundler in your project, install swup from npm:

```
npm install swup
```

```
npm install swup
```

In your application, import swup and create a new instance:

```
import Swup from 'swup';
const swup = new Swup();
```

```
import Swup from 'swup';
const swup = new Swup();
```

## [CDN](https://swup.js.org/getting-started/installation/#cdn)

If you're not using a bundler and want to get started quickly, you can include the minified
production file from a CDN and create a new instance in your main script:

```
<script src="https://unpkg.com/swup@4"></script>
<script>
  const swup = new Swup();
</script>
```

```
<script src="https://unpkg.com/swup@4"></script>
<script>
  const swup = new Swup();
</script>
```

## [ESM](https://swup.js.org/getting-started/installation/#esm)

Swup and its plugins can be imported as native ES modules for modern browsers. The specifics differ
depending on the CDN, but here is a [pattern](https://web.dev/serve-modern-code-to-modern-browsers/)
for including the ES module where supported, and falling back to a UMD version for older browsers.
Note the `?module` query string in the first import URL.

```
<!-- Import Swup as ESM -->

<script type="module">
  import Swup from 'https://unpkg.com/swup@4?module';
  const swup = new Swup();
</script>

<!-- Import Swup as UMD for older browsers -->

<script nomodule src="https://unpkg.com/swup@4"></script>
<script nomodule>
  const swup = new Swup();
</script>
```

```
<!-- Import Swup as ESM -->

<script type="module">
  import Swup from 'https://unpkg.com/swup@4?module';
  const swup = new Swup();
</script>

<!-- Import Swup as UMD for older browsers -->

<script nomodule src="https://unpkg.com/swup@4"></script>
<script nomodule>
  const swup = new Swup();
</script>
```

## [Next steps](https://swup.js.org/getting-started/installation/#next-steps)

You're now ready to start building with swup by exploring these topics:

* Create a first [example site](https://swup.js.org/getting-started/example/) to get to know swup
* Look at [interactive demos](https://swup.js.org/getting-started/demos/) to see swup in action
* Learn about [options](https://swup.js.org/options/) and [hooks](https://swup.js.org/hooks/) to customize how swup works
* Install [plugins](https://swup.js.org/plugins/) and [themes](https://swup.js.org/themes/) for extended functionality
