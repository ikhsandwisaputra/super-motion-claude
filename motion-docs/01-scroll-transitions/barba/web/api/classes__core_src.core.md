---
source: https://barba.js.org/api/classes/core_src.core.html
title: "Core | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src.core.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src.core.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src](https://barba.js.org/api/modules/core_src.html)
* [Core](https://barba.js.org/api/classes/core_src.core.html)

# Class Core

### Hierarchy

* Core

## Index

### Properties

* [Logger](https://barba.js.org/api/classes/core_src.core.html#logger)
* [\_data](https://barba.js.org/api/classes/core_src.core.html#_data)
* [\_linkEvent](https://barba.js.org/api/classes/core_src.core.html#_linkevent)
* [\_requestCustomError](https://barba.js.org/api/classes/core_src.core.html#_requestcustomerror)
* [\_wrapper](https://barba.js.org/api/classes/core_src.core.html#_wrapper)
* [cache](https://barba.js.org/api/classes/core_src.core.html#cache)
* [cacheFirstPage](https://barba.js.org/api/classes/core_src.core.html#cachefirstpage)
* [cacheIgnore](https://barba.js.org/api/classes/core_src.core.html#cacheignore)
* [dom](https://barba.js.org/api/classes/core_src.core.html#dom)
* [headers](https://barba.js.org/api/classes/core_src.core.html#headers)
* [helpers](https://barba.js.org/api/classes/core_src.core.html#helpers)
* [history](https://barba.js.org/api/classes/core_src.core.html#history)
* [hooks](https://barba.js.org/api/classes/core_src.core.html#hooks)
* [logger](https://barba.js.org/api/classes/core_src.core.html#logger-1)
* [plugins](https://barba.js.org/api/classes/core_src.core.html#plugins)
* [prefetchIgnore](https://barba.js.org/api/classes/core_src.core.html#prefetchignore)
* [prevent](https://barba.js.org/api/classes/core_src.core.html#prevent)
* [preventRunning](https://barba.js.org/api/classes/core_src.core.html#preventrunning)
* [request](https://barba.js.org/api/classes/core_src.core.html#request)
* [schemaPage](https://barba.js.org/api/classes/core_src.core.html#schemapage)
* [timeout](https://barba.js.org/api/classes/core_src.core.html#timeout)
* [transitions](https://barba.js.org/api/classes/core_src.core.html#transitions)
* [url](https://barba.js.org/api/classes/core_src.core.html#url)
* [version](https://barba.js.org/api/classes/core_src.core.html#version)
* [views](https://barba.js.org/api/classes/core_src.core.html#views)

### Accessors

* [data](https://barba.js.org/api/classes/core_src.core.html#data)
* [wrapper](https://barba.js.org/api/classes/core_src.core.html#wrapper)

### Methods

* [\_bind](https://barba.js.org/api/classes/core_src.core.html#_bind)
* [\_getLinkElement](https://barba.js.org/api/classes/core_src.core.html#_getlinkelement)
* [\_onLinkClick](https://barba.js.org/api/classes/core_src.core.html#_onlinkclick)
* [\_onLinkEnter](https://barba.js.org/api/classes/core_src.core.html#_onlinkenter)
* [\_onStateChange](https://barba.js.org/api/classes/core_src.core.html#_onstatechange)
* [\_resetData](https://barba.js.org/api/classes/core_src.core.html#_resetdata)
* [\_unbind](https://barba.js.org/api/classes/core_src.core.html#_unbind)
* [destroy](https://barba.js.org/api/classes/core_src.core.html#destroy)
* [force](https://barba.js.org/api/classes/core_src.core.html#force)
* [go](https://barba.js.org/api/classes/core_src.core.html#go)
* [init](https://barba.js.org/api/classes/core_src.core.html#init)
* [onRequestError](https://barba.js.org/api/classes/core_src.core.html#onrequesterror)
* [once](https://barba.js.org/api/classes/core_src.core.html#once)
* [page](https://barba.js.org/api/classes/core_src.core.html#page)
* [prefetch](https://barba.js.org/api/classes/core_src.core.html#prefetch)
* [use](https://barba.js.org/api/classes/core_src.core.html#use)

## Properties

### Logger

Logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html) = Logger

Logger class, allows plugins to create Logger.

### Private \_data

\_data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

### Private \_linkEvent

\_linkEvent: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent)

### Private \_requestCustomError

\_requestCustomError: [RequestCustomError](https://barba.js.org/api/modules/core_src_defs.html#requestcustomerror)

### Private \_wrapper

\_wrapper: [Wrapper](https://barba.js.org/api/modules/core_src_defs.html#wrapper)

### cache

cache: [Cache](https://barba.js.org/api/classes/core_src_modules.cache.html)

Modules.

### cacheFirstPage

cacheFirstPage: boolean

### cacheIgnore

cacheIgnore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)

### dom

dom: [Dom](https://barba.js.org/api/classes/core_src_utils.dom.html) = dom

Utils.

### headers

headers: [Headers](https://barba.js.org/api/classes/core_src_modules.headers.html)

### helpers

helpers: [core/src/utils](https://barba.js.org/api/modules/core_src_utils.html) = helpers

### history

history: [History](https://barba.js.org/api/classes/core_src_utils.history.html) = history

### hooks

hooks: [Hooks](https://barba.js.org/api/classes/core_src.hooks.html) = hooks

Hooks

### logger

logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html) = new Logger('@barba/core')

Barba logger.

### plugins

plugins: [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)<any>[] = []

Plugins.

### prefetchIgnore

prefetchIgnore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)

### prevent

prevent: [Prevent](https://barba.js.org/api/classes/core_src_modules.prevent.html)

### preventRunning

preventRunning: boolean

### request

request: [request](https://barba.js.org/api/modules/core_src_utils.html#request) = request

### schemaPage

schemaPage: [ISchemaPage](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html) = schemaPage

Schemas.

### timeout

timeout: number

Options

### transitions

transitions: [Transitions](https://barba.js.org/api/classes/core_src_modules.transitions.html)

### url

url: [core/src/utils](https://barba.js.org/api/modules/core_src_utils.html) = url

### version

version: string = version

Version.

### views

views: [Views](https://barba.js.org/api/classes/core_src_modules.views.html)

## Accessors

### data

* get data(): [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

* #### Returns [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

### wrapper

* get wrapper(): HTMLElement

* #### Returns HTMLElement

## Methods

### Private \_bind

* \_bind(): void

* Bind event listeners.

  #### Returns void

### Private \_getLinkElement

* \_getLinkElement(e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent)): [Link](https://barba.js.org/api/modules/core_src_defs.html#link)

* Get a valid link ancestor.

  Check for a "href" attribute.
  Then check if eligible for Barba.

  #### Parameters

  + ##### e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent)

  #### Returns [Link](https://barba.js.org/api/modules/core_src_defs.html#link)

### Private \_onLinkClick

* \_onLinkClick(e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent)): void

* When an element is clicked.

  Get valid link element.
  Prevent same URL.
  Go for a Barba transition.

  #### Parameters

  + ##### e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent)

  #### Returns void

### Private \_onLinkEnter

* \_onLinkEnter(e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent)): void

* When a element is entered.

  Get valid link element.
  Cache URL if needed.

  #### Parameters

  + ##### e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent)

  #### Returns void

### Private \_onStateChange

* \_onStateChange(e: PopStateEvent): void

* When History state changes.

  Get "href" from URL
  Go for a Barba transition.

  #### Parameters

  + ##### e: PopStateEvent

  #### Returns void

### Private \_resetData

* \_resetData(): void

* Reset pages data.

  Set "current" and unset "next".

  #### Returns void

### Private \_unbind

* \_unbind(): void

* Bind event listeners.

  #### Returns void

### destroy

* destroy(): void

* #### Returns void

### force

* force(href: string): void

* [### Force a page change without Barba transition.](https://barba.js.org/api/classes/core_src.core.html#force-a-page-change-without-barba-transition)

  #### Parameters

  + ##### href: string

  #### Returns void

### go

* go(href: string, trigger?: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger), e?: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent) | PopStateEvent): Promise<void>

* [### Go for a Barba transition.](https://barba.js.org/api/classes/core_src.core.html#go-for-a-barba-transition)

  Manage "self page" href:

  + if same url and no self transition, keep default behavior
    - link: reload the page
    - anchor: scroll to
  + if same url with self transition, use it
  + then start a page transition.

  #### Parameters

  + ##### href: string
  + ##### Default value trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger) = "barba"
  + ##### Optional e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent) | PopStateEvent

  #### Returns Promise<void>

### init

* init(\_\_namedParameters?: Object): void

* [### Init barba with options.](https://barba.js.org/api/classes/core_src.core.html#init-barba-with-options)

  See [IBarbaOptions](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html) for more details.

  Default values are:

  + transitions: `[]`
  + views: `[]`
  + schema: [[SchemaAttribute]]
  + timeout: `2e3`
  + cacheIgnore: `false`
  + cacheFirstPage: `false`
  + prefetchIgnore: `false`
  + preventRunning: `false`
  + prevent: `null`,
  + debug: `false`
  + logLevel: `'off'`

  #### Parameters

  + ##### Default value \_\_namedParameters: Object = {}

  #### Returns void

### onRequestError

* onRequestError(trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger), ...args: any): boolean

* When a request error occurs.

  Allow the user to manage request error. (E.g: 404)

  #### Parameters

  + ##### trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)
  + ##### Rest ...args: any

  #### Returns boolean

### once

* once(readyData: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* [### Start an "once" transition.](https://barba.js.org/api/classes/core_src.core.html#start-an-quotoncequot-transition)

  If some registered "once" transition,
  get the "resolved" transition from the store and start it.

  #### Parameters

  + ##### readyData: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

### page

* page(href: string, trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger), event: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent) | PopStateEvent, self: boolean): Promise<void>

* [### Start a "page" transition.](https://barba.js.org/api/classes/core_src.core.html#start-a-quotpagequot-transition)

  1. If no running transition, updates data with full URL properties and trigger.
  2. Get page from cache or init request.
  3. Wait if some transitions need "next" data (`sync: true`, `to: …`).
  4. Manage the history, depending on trigger.
  5. Get "data" and trigger "go" hook.
  6. Get the "resolved" transition from the store and start it.
  7. Update title and reset data (current, next = undefined).
  > If "self", use the "self" transition

  #### Parameters

  + ##### href: string
  + ##### trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)
  + ##### event: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent) | PopStateEvent
  + ##### self: boolean

  #### Returns Promise<void>

### prefetch

* prefetch(href: string): void

* Programmatically prefetch

  #### Parameters

  + ##### href: string

  #### Returns void

### use

* use<T>(plugin: [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)<T>, options?: T): void

* [### Init plugin with options.](https://barba.js.org/api/classes/core_src.core.html#init-plugin-with-options)

  See [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html) for more details.

  #### Type parameters

  + #### T

  #### Parameters

  + ##### plugin: [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)<T>
  + ##### Optional options: T

  #### Returns void

Generated using [TypeDoc](https://typedoc.org/)
