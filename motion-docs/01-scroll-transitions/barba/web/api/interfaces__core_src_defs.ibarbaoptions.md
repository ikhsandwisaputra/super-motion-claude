---
source: https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html
title: "IBarbaOptions | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/defs](https://barba.js.org/api/modules/core_src_defs.html)
* [IBarbaOptions](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html)

# Interface IBarbaOptions

### Hierarchy

* IBarbaOptions

## Index

### Properties

* [cacheFirstPage](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#cachefirstpage)
* [cacheIgnore](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#cacheignore)
* [debug](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#debug)
* [logLevel](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#loglevel)
* [prefetchIgnore](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#prefetchignore)
* [prevent](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#prevent)
* [preventRunning](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#preventrunning)
* [requestError](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#requesterror)
* [schema](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#schema)
* [timeout](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#timeout)
* [transitions](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#transitions)
* [views](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html#views)

## Properties

### Optional cacheFirstPage

cacheFirstPage: boolean

Disable cache on the first rendered page.

### Optional cacheIgnore

cacheIgnore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)

Disable cache or ignore some routes.

### Optional debug

debug: boolean

Enable debug mode.

### Optional logLevel

logLevel: keyof LogLevels

Log level.

### Optional prefetchIgnore

prefetchIgnore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)

Disable prefetch or ignore routes.

### Optional prevent

prevent: [PreventCheck](https://barba.js.org/api/modules/core_src_defs.html#preventcheck) | null

Custom prevent check.

### Optional preventRunning

preventRunning: boolean

Prevent click when transition is running.

### Optional requestError

requestError: [RequestCustomError](https://barba.js.org/api/modules/core_src_defs.html#requestcustomerror) | undefined

Custom request error.

### Optional schema

schema: [ISchemaAttribute](https://barba.js.org/api/interfaces/core_src_defs.ischemaattribute.html)

Custom [data-attribute].

### Optional timeout

timeout: number

Request timeout.

### Optional transitions

transitions: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)[]

Array of transitions.

### Optional views

views: [IView](https://barba.js.org/api/interfaces/core_src_defs.iview.html)[]

Array of views.

Generated using [TypeDoc](https://typedoc.org/)
