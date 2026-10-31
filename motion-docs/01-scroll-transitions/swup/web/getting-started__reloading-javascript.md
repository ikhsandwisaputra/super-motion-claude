---
source: https://swup.js.org/getting-started/reloading-javascript
title: "Reloading Scripts — swup"
fetched: 2026-10-28
---

# Reloading Scripts

Swup takes control of the page load lifecycle. Instead of having the browser
recompile scripts between page changes, it keeps the current page instance alive
and only updates the content containers to match the content of the new page.

This means two things:

* You can not rely on standard browser events to trigger your custom code
* You have to pay attention to not leaking memory by undoing any changes

## [Triggering custom code](https://swup.js.org/getting-started/reloading-javascript/#triggering-custom-code)

Swup updates pages without a full reload, so you can't rely on `DOMContentLoaded`
or other events to trigger your code as they will only ever run once on initial
load.

```
document.addEventListener('DOMContentLoaded', () => {
  // This only runs once, so we need some other event for triggering code
});
```

```
document.addEventListener('DOMContentLoaded', () => {
  // This only runs once, so we need some other event for triggering code
});
```

Instead, we can trigger code after each page change by registering handlers for swup's
[hooks](https://swup.js.org/hooks/). Combining the browser event and swup hooks, we end up with
a template for reliably running code to initialize elements on the page:

```
document.addEventListener('DOMContentLoaded', () => {
  // This runs on initial load
});

swup.hooks.on('page:view', () => {
  // This runs after every page change by swup
});
```

```
document.addEventListener('DOMContentLoaded', () => {
  // This runs on initial load
});

swup.hooks.on('page:view', () => {
  // This runs after every page change by swup
});
```

## [Initializing components](https://swup.js.org/getting-started/reloading-javascript/#initializing-components)

We'll collect our scripts in one `init` function that we can call repeatedly to
initialize everything. Each script has a condition to make sure it's only run
when a related element is found on the page.

```
function init() {
  if (document.querySelector('#carousel')) {
    // new Carousel('#carousel')
  }

  if (document.querySelector('#lightbox')) {
    // $('#lightbox').lightbox()
  }

  if (document.querySelector('#something-else')) {
    // and so on
  }
}
```

```
function init() {
  if (document.querySelector('#carousel')) {
    // new Carousel('#carousel')
  }

  if (document.querySelector('#lightbox')) {
    // $('#lightbox').lightbox()
  }

  if (document.querySelector('#something-else')) {
    // and so on
  }
}
```

Then we register the correct event handlers and we're good to go.

```
const swup = new Swup();

// Run once when page loads
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

// Run after every additional navigation by swup
swup.hooks.on('page:view', () => init());
```

```
const swup = new Swup();

// Run once when page loads
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

// Run after every additional navigation by swup
swup.hooks.on('page:view', () => init());
```

## [Using component frameworks](https://swup.js.org/getting-started/reloading-javascript/#using-component-frameworks)

While the above example is a perfectly fine solution to achieve code execution
on page change, we suggest looking into JS frameworks that can help you automate
some of this by mounting and unmounting components automatically and providing
lifecycle hooks.

* [Alpine.js](https://alpinejs.dev)
* [Stimulus](https://stimulus.hotwired.dev)
* [Gia](https://github.com/giantcz/gia) + official [Gia plugin](https://swup.js.org/plugins/gia-plugin/)

## [Avoiding memory leaks](https://swup.js.org/getting-started/reloading-javascript/#avoiding-memory-leaks)

Swup keeps a persistent session in memory, so objects leaking memory will not be
cleaned up automatically as they would be on a full page refresh. While this
should not be a problem on most sites, be aware that in special cases you will
need to clean up after yourself right before swup's `content:replace` hook.

```
function unload() {
  if (document.querySelector('#carousel')) {
    // carousel.destroy()
  }
}

swup.hooks.before('content:replace', () => unload());
```

```
function unload() {
  if (document.querySelector('#carousel')) {
    // carousel.destroy()
  }
}

swup.hooks.before('content:replace', () => unload());
```

## [Third-party script tags](https://swup.js.org/getting-started/reloading-javascript/#third-party-script-tags)

If you're not in control over the scripts included on the page, there is an
official [scripts plugin](https://swup.js.org/plugins/scripts-plugin/) to help with reloading
script tags.
**This should be a last resort if none of the other options are available to you.**
