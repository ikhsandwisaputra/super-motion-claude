---
source: https://swup.js.org/options
title: "Options — swup"
fetched: 2026-10-28
---

# Options

Swup has several options that can be passed in during initialization.

## [Defaults](https://swup.js.org/options/#defaults)

These are the default options. See below for details on each option.

```
const swup = new Swup({
  animateHistoryBrowsing: false,
  animationSelector: '[class*="transition-"]',
  animationScope: 'html',
  cache: true,
  containers: ['#swup'],
  hooks: {},
  ignoreVisit: (url, { el } = {}) => el?.closest('[data-no-swup]'),
  linkSelector: 'a[href]',
  linkToSelf: 'scroll',
  native: false,
  plugins: [],
  resolveUrl: (url) => url,
  requestHeaders: {
    'X-Requested-With': 'swup',
    'Accept': 'text/html, application/xhtml+xml'
  },
  skipPopStateHandling: (event) => event.state?.source !== 'swup',
  timeout: 0
});
```

```
const swup = new Swup({
  animateHistoryBrowsing: false,
  animationSelector: '[class*="transition-"]',
  animationScope: 'html',
  cache: true,
  containers: ['#swup'],
  hooks: {},
  ignoreVisit: (url, { el } = {}) => el?.closest('[data-no-swup]'),
  linkSelector: 'a[href]',
  linkToSelf: 'scroll',
  native: false,
  plugins: [],
  resolveUrl: (url) => url,
  requestHeaders: {
    'X-Requested-With': 'swup',
    'Accept': 'text/html, application/xhtml+xml'
  },
  skipPopStateHandling: (event) => event.state?.source !== 'swup',
  timeout: 0
});
```

## [animationSelector](https://swup.js.org/options/#animationselector)

The selector for detecting animation timing. Swup will wait for all CSS transitions and
keyframe animations to finish on these elements before swapping in the content of the new page.
The default option will select all elements with class names containing `transition-`.

```
{
  animationSelector: '[class*="transition-"]'
}
```

```
{
  animationSelector: '[class*="transition-"]'
}
```

## [animationScope](https://swup.js.org/options/#animationscope)

The elements on which swup will add the [animation classes](https://swup.js.org/getting-started/how-it-works/#animation-classes)
for styling the different phases of the in/out animation. By default, it will add those classes
to the `html` tag. This is great for most use cases and the recommended way to use swup.

```
{
  animationScope: 'html'
}
```

```
{
  animationScope: 'html'
}
```

```
<html class="is-animating is-leaving"></html>
```

```
<html class="is-animating is-leaving"></html>
```

Setting this option to `containers` will add the classes on the content containers themselves instead.

```
{
  animationScope: 'containers'
}
```

```
{
  animationScope: 'containers'
}
```

```
<main id="swup" class="is-animating is-leaving">Content</main>
```

```
<main id="swup" class="is-animating is-leaving">Content</main>
```

## [containers](https://swup.js.org/options/#containers)

The content containers to be replaced on page visits. Usually the `<main>` element with the
content of the page, but can include any other elements that are present across all pages.
Defaults to a single container of id `#swup`.

Adding containers here allows animating one set of elements while replacing other parts of the page
without animation, e.g. a global site navigation that will not fade out but still needs to update
to reflect language changes.

```
{
  containers: ['#swup']
}
```

```
{
  containers: ['#swup']
}
```

## [cache](https://swup.js.org/options/#cache)

The built-in [cache](https://swup.js.org/api/cache/) keeps previously loaded pages in memory. This improves speed but
can be disabled for highly dynamic sites that need up-to-date responses on each request. Defaults
to `true`.

```
{
  cache: true
}
```

```
{
  cache: true
}
```

## [hooks](https://swup.js.org/options/#hooks)

An object of [hook handlers](https://swup.js.org/hooks/) to register. For details and a few more examples,
see the section on [registering all hook handlers at once](https://swup.js.org/hooks/#set-all-hook-handlers-at-once).

```
{
  hooks: {
    'visit:start': () => console.log('start'),
    'visit:end': () => console.log('end')
  }
}
```

```
{
  hooks: {
    'visit:start': () => console.log('start'),
    'visit:end': () => console.log('end')
  }
}
```

## [ignoreVisit](https://swup.js.org/options/#ignorevisit)

Allows ignoring specific visits via callback. By default, swup will ignore links with a
`data-no-swup` attribute on itself or any parent element.

The callback takes a relative URL of the new page, as well as the element and event that triggered
the visit. Note that element and event will be undefined if navigating via `swup.navigate(url)`.

```
{
  ignoreVisit: (url, { el, event } = {}) => el?.closest('[data-no-swup]')
}
```

```
{
  ignoreVisit: (url, { el, event } = {}) => el?.closest('[data-no-swup]')
}
```

## [linkSelector](https://swup.js.org/options/#linkselector)

The link elements that trigger visits. By default, all `a` elements with an `href`
attribute will receive clicks.

```
{
  linkSelector: 'a[href]'
}
```

```
{
  linkSelector: 'a[href]'
}
```

To let swup take over clicks on [map areas](https://www.w3schools.com/tags/tag_area.asp) or
[SVG links](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a), append the selector:

```
{
  linkSelector: 'a[href], area[href], svg a[*|href]'
}
```

```
{
  linkSelector: 'a[href], area[href], svg a[*|href]'
}
```

## [linkToSelf](https://swup.js.org/options/#linktoself)

How swup handles links that lead to the currently active URL. By default, it will `scroll` to the
top without actually performing a navigation. Pass in `navigate` to treat these links like any
other link and perform a regular navigation.

```
{
  linkToSelf: 'navigate'
}
```

```
{
  linkToSelf: 'navigate'
}
```

## [native](https://swup.js.org/options/#native)

Enable native animations using the [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
API. This will toggle the class `swup-native` on the HTML element if View Transitions are supported
by the user's browsers. Learn more about [native view transitions](https://swup.js.org/getting-started/animations/#native-animations).

## [requestHeaders](https://swup.js.org/options/#requestheaders)

The custom headers that get sent along with each swup request.

```
{
  requestHeaders: {
    'X-Requested-With': 'swup', // identify swup requests
    'Accept': 'text/html, application/xhtml+xml' // define expected response
  }
}
```

```
{
  requestHeaders: {
    'X-Requested-With': 'swup', // identify swup requests
    'Accept': 'text/html, application/xhtml+xml' // define expected response
  }
}
```

## [resolveUrl](https://swup.js.org/options/#resolveurl)

Rewrite URLs before loading them. An advanced way of ignoring certain visits by mapping different
paths to a single path and treating them as one resource for fetching pages and restoring scroll
positions. The callback receives and returns a relative URL.

An example use case would be a project listing: the server always sends the complete list of
projects and filtering is done client-side based on query params. You'll want to handle any visits
between `/projects/?sort=date` and `/projects/?sort=title` yourself, telling swup nothing has
changed and no page load is necessary.

```
{
  resolveUrl: (url) => {
    if (url.startsWith('/projects/?')) {
      return '/projects/';
    }
    return url;
  }
}
```

```
{
  resolveUrl: (url) => {
    if (url.startsWith('/projects/?')) {
      return '/projects/';
    }
    return url;
  }
}
```

The option defaults to `(url) => url`.

## [skipPopStateHandling](https://swup.js.org/options/#skippopstatehandling)

Swup will only handle backward/forward visits to history entries it has created itself. Any visits
to entries without a custom `source` property will be ignored and handled by the browser instead.
To modify this behavior, provide a custom callback function that receives the `popstate` event
and returns a `boolean`.

```
{
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
}
```

```
{
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
}
```

## [timeout](https://swup.js.org/options/#timeout)

Swup allows setting a fetch timeout in milliseconds. If a page takes longer to load than specified,
swup triggers a `fetch:timeout` hook and defers to a standard browser page load. Disabled by default.

```
{
  timeout: 10_000
}
```

```
{
  timeout: 10_000
}
```

## [animateHistoryBrowsing](https://swup.js.org/options/#animatehistorybrowsing)

Swup will skip animations for visits triggered by the back/forward button. If you do require
animations on history visits, set this to `true`. Swup will add the class `is-popstate` to the html
tag during those animations. Defaults to `false`.

```
{
  animateHistoryBrowsing: false
}
```

```
{
  animateHistoryBrowsing: false
}
```
