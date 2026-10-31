---
source: https://barba.js.org/api/modules/prefetch_polyfills.html
title: "prefetch/polyfills | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/modules/prefetch_polyfills.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/modules/prefetch_polyfills.html)

* [Globals](https://barba.js.org/api/globals.html)
* [prefetch/polyfills](https://barba.js.org/api/modules/prefetch_polyfills.html)

# External module prefetch/polyfills

## Index

### Variables

* [requestIdleCallback](https://barba.js.org/api/modules/prefetch_polyfills.html#requestidlecallback)

## Variables

### Const requestIdleCallback

requestIdleCallback: any = // @ts-ignorewindow.requestIdleCallback ||function ric(cb: any) {const start = Date.now();return setTimeout(() => {cb({didTimeout: false,timeRemaining: function timeRemaining() {return Math.max(0, 50 - (Date.now() - start));},});}, 1);}

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Generated using [TypeDoc](https://typedoc.org/)
