---
source: https://barba.js.org/api/classes/router_src.router.html
title: "Router | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/router_src.router.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/router_src.router.html)

* [Globals](https://barba.js.org/api/globals.html)
* [router/src](https://barba.js.org/api/modules/router_src.html)
* [Router](https://barba.js.org/api/classes/router_src.router.html)

# Class Router

### Hierarchy

* Router

### Implements

* [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)<IRouterOptions>

## Index

### Properties

* [barba](https://barba.js.org/api/classes/router_src.router.html#barba)
* [logger](https://barba.js.org/api/classes/router_src.router.html#logger)
* [name](https://barba.js.org/api/classes/router_src.router.html#name)
* [routeNames](https://barba.js.org/api/classes/router_src.router.html#routenames)
* [routesByName](https://barba.js.org/api/classes/router_src.router.html#routesbyname)
* [version](https://barba.js.org/api/classes/router_src.router.html#version)

### Methods

* [init](https://barba.js.org/api/classes/router_src.router.html#init)
* [install](https://barba.js.org/api/classes/router_src.router.html#install)
* [resolveRoutes](https://barba.js.org/api/classes/router_src.router.html#resolveroutes)
* [resolveUrl](https://barba.js.org/api/classes/router_src.router.html#resolveurl)

## Properties

### barba

barba: [Core](https://barba.js.org/api/classes/core_src.core.html)

### logger

logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html)

### name

name: string = "@barba/router"

### routeNames

routeNames: string[] = []

### routesByName

routesByName: IRouteByName

### version

version: string = version

## Methods

### init

* init(): void

* Plugin initialisation.

  #### Returns void

### install

* install(barba: [Core](https://barba.js.org/api/classes/core_src.core.html), \_\_namedParameters?: object): void

* Plugin installation.

  #### Parameters

  + ##### barba: [Core](https://barba.js.org/api/classes/core_src.core.html)
  + ##### Default value \_\_namedParameters: object = {}

    - ##### routes: IRoute[]

  #### Returns void

### resolveRoutes

* resolveRoutes(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* Hooks: do, reset.

  + Update `current` and `next` data

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### resolveUrl

* resolveUrl(url: string): IRouteResolved | null

* Resolve URL to route name.

  #### Parameters

  + ##### url: string

  #### Returns IRouteResolved | null

Generated using [TypeDoc](https://typedoc.org/)
