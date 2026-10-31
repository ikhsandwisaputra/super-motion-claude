---
source: https://swup.js.org/api/cache
title: "Cache — swup"
fetched: 2026-10-28
---

# Cache

Swup provides a caching mechanism that stores previously loaded pages in memory. This allows
skipping additional server requests, resulting in faster navigation and smoother transitions for
the users.

The cache is enabled automatically and needs no further customization. If your site is highly
dynamic or doesn't need a cache for other reasons, you can disable it by modifying swup's
[cache option](https://swup.js.org/options/#cache).

Swup's cache is available at `swup.cache`. See below for all available methods.

## [Options](https://swup.js.org/api/cache/#options)

Disable the cache by setting swup's `cache` option:

```
const swup = new Swup({
  cache: false
});
```

```
const swup = new Swup({
  cache: false
});
```

## [Properties](https://swup.js.org/api/cache/#properties)

### [size](https://swup.js.org/api/cache/#size)

The number of cache entries in memory.

```
swup.cache.size; // 13
```

```
swup.cache.size; // 13
```

## [Methods](https://swup.js.org/api/cache/#methods)

### [set](https://swup.js.org/api/cache/#set)

Create a cache record for the specified URL. Pass in a page object with a `url` and `html` property.

```
swup.cache.set('/about', { url: '/about', html: '<html>...</html>' });
```

```
swup.cache.set('/about', { url: '/about', html: '<html>...</html>' });
```

### [get](https://swup.js.org/api/cache/#get)

Return the page object if the given URL is cached, `undefined` otherwise.

```
const page = swup.cache.get('/about');
```

```
const page = swup.cache.get('/about');
```

### [has](https://swup.js.org/api/cache/#has)

Check if the given URL has been cached.

```
if (swup.cache.has('/about')) {
  /* */
}
```

```
if (swup.cache.has('/about')) {
  /* */
}
```

### [update](https://swup.js.org/api/cache/#update)

Update a cache record, overwriting or adding custom data. Gets merged with existing data.

```
swup.cache.update('/about', { ttl: 1000, created: Date.now() });
```

```
swup.cache.update('/about', { ttl: 1000, created: Date.now() });
```

### [delete](https://swup.js.org/api/cache/#delete)

Delete a cache record .

```
swup.cache.delete('/about');
```

```
swup.cache.delete('/about');
```

### [clear](https://swup.js.org/api/cache/#clear)

Empty the cache.

```
swup.cache.clear();
```

```
swup.cache.clear();
```

### [prune](https://swup.js.org/api/cache/#prune)

Remove all cache entries that match a given condition. Pass in a predicate function
that receives the URL and the page object and returns either `true` to prune or `false` to
keep the page.

```
swup.cache.prune((url, page) => /* true / false */ );
```

```
swup.cache.prune((url, page) => /* true / false */ );
```

## [Cache pruning](https://swup.js.org/api/cache/#cache-pruning)

Swup will not prune the cache on its own. As it only stores simple objects with strings, it should
work fine even across hundreds of page visits. If you still want to prune the cache, you can do so
manually.

The basic strategy is to append custom data with `cache.update()` whenever a page is cached. Later,
manually prune the cache in regular intervals with `cache.prune()`, comparing the previously added
custom data to determine which pages to prune.

### [Page limit](https://swup.js.org/api/cache/#page-limit)

Limit the amount of pages in the cache.

```
const maxCacheEntries = 20;

swup.hooks.on('cache:set', () => {
  const prune = [...swup.cache.all.keys()].reverse().slice(maxCacheEntries);
  swup.cache.prune((url) => prune.includes(url));
});
```

```
const maxCacheEntries = 20;

swup.hooks.on('cache:set', () => {
  const prune = [...swup.cache.all.keys()].reverse().slice(maxCacheEntries);
  swup.cache.prune((url) => prune.includes(url));
});
```

### [TTL](https://swup.js.org/api/cache/#ttl)

Limit how long pages are cached by adding a timestamp and pruning before requests.

```
const ttl = 5 * 60_000; // 5 minutes

// When a page is cached, append the current timestamp and time-to-live
swup.hooks.on('cache:set', (visit, { page }) => {
  swup.cache.update(page.url, { created: Date.now(), ttl });
});

// Before each request, remove all invalid entries by timestamp
swup.hooks.before('page:load', () => {
  swup.cache.prune((url, { created, ttl }) => Date.now() > created + ttl);
});
```

```
const ttl = 5 * 60_000; // 5 minutes

// When a page is cached, append the current timestamp and time-to-live
swup.hooks.on('cache:set', (visit, { page }) => {
  swup.cache.update(page.url, { created: Date.now(), ttl });
});

// Before each request, remove all invalid entries by timestamp
swup.hooks.before('page:load', () => {
  swup.cache.prune((url, { created, ttl }) => Date.now() > created + ttl);
});
```
