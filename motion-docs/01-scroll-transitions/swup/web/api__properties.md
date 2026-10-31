---
source: https://swup.js.org/api/properties
title: "Properties — swup"
fetched: 2026-10-28
---

# Properties

A few properties available on the swup instance that could be helpful.

## [options](https://swup.js.org/api/properties/#options)

Current [options](https://swup.js.org/options/), after merging swup defaults and user options.

## [plugins](https://swup.js.org/api/properties/#plugins)

Array of all [plugin](https://swup.js.org/plugins/) instances currently enabled on swup.

## [location](https://swup.js.org/api/properties/#location)

The location of the page last navigated to, after any redirects. This object inherits all properties
from a native [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object, with an additional
`url` property that combines path and query param.

```
swup.location.href     // https://example.net/path?query#hash
swup.location.url      // /path?query
swup.location.pathname // /path
swup.location.search   // ?query
swup.location.hash     // #hash
```

```
swup.location.href     // https://example.net/path?query#hash
swup.location.url      // /path?query
swup.location.pathname // /path
swup.location.search   // ?query
swup.location.hash     // #hash
```

## [currentPageUrl](https://swup.js.org/api/properties/#currentpageurl)

The URL of the page last navigated to, after any redirects.
