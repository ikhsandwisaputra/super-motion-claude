---
source: https://barba.js.org/api/classes/core_src.hooks.html
title: "Hooks | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src.hooks.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src.hooks.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src](https://barba.js.org/api/modules/core_src.html)
* [Hooks](https://barba.js.org/api/classes/core_src.hooks.html)

# Class Hooks

### Hierarchy

* [HookMethods](https://barba.js.org/api/classes/core_src_defs.hookmethods.html)
  + Hooks

### Indexable

[key: string]: any

Allow the use of `hooks[name](cb, ctx)`.

## Index

### Constructors

* [constructor](https://barba.js.org/api/classes/core_src.hooks.html#constructor)

### Properties

* [after](https://barba.js.org/api/classes/core_src.hooks.html#after)
* [afterEnter](https://barba.js.org/api/classes/core_src.hooks.html#afterenter)
* [afterLeave](https://barba.js.org/api/classes/core_src.hooks.html#afterleave)
* [all](https://barba.js.org/api/classes/core_src.hooks.html#all)
* [before](https://barba.js.org/api/classes/core_src.hooks.html#before)
* [beforeEnter](https://barba.js.org/api/classes/core_src.hooks.html#beforeenter)
* [beforeLeave](https://barba.js.org/api/classes/core_src.hooks.html#beforeleave)
* [enter](https://barba.js.org/api/classes/core_src.hooks.html#enter)
* [leave](https://barba.js.org/api/classes/core_src.hooks.html#leave)
* [logger](https://barba.js.org/api/classes/core_src.hooks.html#logger)
* [registered](https://barba.js.org/api/classes/core_src.hooks.html#registered)

### Methods

* [clear](https://barba.js.org/api/classes/core_src.hooks.html#clear)
* [do](https://barba.js.org/api/classes/core_src.hooks.html#do)
* [help](https://barba.js.org/api/classes/core_src.hooks.html#help)
* [init](https://barba.js.org/api/classes/core_src.hooks.html#init)

## Constructors

### constructor

* new Hooks(): [Hooks](https://barba.js.org/api/classes/core_src.hooks.html)

* #### Returns [Hooks](https://barba.js.org/api/classes/core_src.hooks.html)

## Properties

### after

after: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### afterEnter

afterEnter: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### afterLeave

afterLeave: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### all

all: [HooksAll](https://barba.js.org/api/modules/core_src_defs.html#hooksall)[] = ['ready','page','reset','currentAdded','currentRemoved','nextAdded','nextRemoved','beforeOnce','once','afterOnce','before','beforeLeave','leave','afterLeave','beforeEnter','enter','afterEnter','after',]

All available hooks.

See [HooksAll](https://barba.js.org/api/modules/core_src_defs.html#hooksall)

### before

before: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### beforeEnter

beforeEnter: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### beforeLeave

beforeLeave: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### enter

enter: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### leave

leave: function

#### Type declaration

* + (fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction), ctx?: any): void
  + #### Parameters

    - ##### fn: [HookFunction](https://barba.js.org/api/modules/core_src_defs.html#hookfunction)
    - ##### Optional ctx: any

    #### Returns void

### logger

logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html) = new Logger('@barba/core')

### registered

registered: Map<[HooksAll](https://barba.js.org/api/modules/core_src_defs.html#hooksall), Set<[IHookInfos](https://barba.js.org/api/interfaces/core_src.ihookinfos.html)>> = new Map()

Registered hooks.

* Unique hook name
* Associated data set(s) (callback + context)

## Methods

### clear

* clear(): void

* #### Returns void

### do

* do(name: [HooksAll](https://barba.js.org/api/modules/core_src_defs.html#hooksall), ...args: any): Promise<any>

* Do hook.

  Trigger registered hooks.

  #### Parameters

  + ##### name: [HooksAll](https://barba.js.org/api/modules/core_src_defs.html#hooksall)
  + ##### Rest ...args: any

  #### Returns Promise<any>

### help

* help(): void

* Help, print available and registered hooks.

  #### Returns void

### init

* init(): void

* #### Returns void

Generated using [TypeDoc](https://typedoc.org/)
