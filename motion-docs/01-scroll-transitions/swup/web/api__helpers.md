---
source: https://swup.js.org/api/helpers
title: "Helpers — swup"
fetched: 2026-10-28
---

# Helpers

Helpers that can be used for developing plugins, themes or anything else around swup.

```
import { getCurrentUrl, updateHistoryRecord } from 'swup';
```

```
import { getCurrentUrl, updateHistoryRecord } from 'swup';
```

## [Location](https://swup.js.org/api/helpers/#location)

A class used internally for parsing and passing around URLs. Very thin wrapper around the native `URL` object with an additional `url` getter for the path including query params.

Parse a URL from a string:

```
const href = 'http://example.net/about#anchor';
const { url, hash } = Location.fromUrl(href);
// url = /about
// hash = #anchor
```

```
const href = 'http://example.net/about#anchor';
const { url, hash } = Location.fromUrl(href);
// url = /about
// hash = #anchor
```

Parse a URL from a link element:

```
// const linkEl = <a href="http://example.net/about#anchor">
const { url, hash } = Location.fromElement(linkEl);
```

```
// const linkEl = <a href="http://example.net/about#anchor">
const { url, hash } = Location.fromElement(linkEl);
```

## [classify](https://swup.js.org/api/helpers/#classify)

Sanitize a string for use in CSS classnames or URL slugs.

`Lorem ipsum` → `lorem-ipsum`

```
const className = classify('Lorem ipsum');
```

```
const className = classify('Lorem ipsum');
```

## [createHistoryRecord](https://swup.js.org/api/helpers/#createhistoryrecord)

Create a new history record via `history.pushState`, appending custom data as well as internal metadata that swup will recognize as its own.

```
createHistoryRecord('/new-page', { custom: 'data' });
```

```
createHistoryRecord('/new-page', { custom: 'data' });
```

## [updateHistoryRecord](https://swup.js.org/api/helpers/#updatehistoryrecord)

Update the current history record via `history.replaceState`, adding custom data as well as internal metadata that swup will recognize as its own.

```
updateHistoryRecord(null, { custom: 'data' });
```

```
updateHistoryRecord(null, { custom: 'data' });
```

## [delegateEvent](https://swup.js.org/api/helpers/#delegateevent)

Install a delegated event listener on the document using [delegate-it](https://github.com/fregante/delegate-it).

```
const delegation = delegateEvent('form', 'submit', (event) => {
  console.log('Form submitted');
});
```

```
const delegation = delegateEvent('form', 'submit', (event) => {
  console.log('Form submitted');
});
```

To stop listening for events, e.g. when unmounting a plugin:

```
delegation.destroy();
```

```
delegation.destroy();
```

## [getCurrentUrl](https://swup.js.org/api/helpers/#getcurrenturl)

Return the current page's url: pathname + query params.
