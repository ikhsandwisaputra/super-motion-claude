---
source: https://barba.js.org/api/classes/core_src_utils.history.html
title: "History | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_utils.history.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_utils.history.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/utils](https://barba.js.org/api/modules/core_src_utils.html)
* [History](https://barba.js.org/api/classes/core_src_utils.history.html)

# Class History

### Hierarchy

* History

## Index

### Properties

* [\_pointer](https://barba.js.org/api/classes/core_src_utils.history.html#_pointer)
* [\_session](https://barba.js.org/api/classes/core_src_utils.history.html#_session)
* [\_states](https://barba.js.org/api/classes/core_src_utils.history.html#_states)

### Accessors

* [current](https://barba.js.org/api/classes/core_src_utils.history.html#current)
* [previous](https://barba.js.org/api/classes/core_src_utils.history.html#previous)
* [size](https://barba.js.org/api/classes/core_src_utils.history.html#size)

### Methods

* [\_getAction](https://barba.js.org/api/classes/core_src_utils.history.html#_getaction)
* [\_getDirection](https://barba.js.org/api/classes/core_src_utils.history.html#_getdirection)
* [add](https://barba.js.org/api/classes/core_src_utils.history.html#add)
* [change](https://barba.js.org/api/classes/core_src_utils.history.html#change)
* [clear](https://barba.js.org/api/classes/core_src_utils.history.html#clear)
* [get](https://barba.js.org/api/classes/core_src_utils.history.html#get)
* [init](https://barba.js.org/api/classes/core_src_utils.history.html#init)
* [remove](https://barba.js.org/api/classes/core_src_utils.history.html#remove)
* [replace](https://barba.js.org/api/classes/core_src_utils.history.html#replace)
* [set](https://barba.js.org/api/classes/core_src_utils.history.html#set)
* [store](https://barba.js.org/api/classes/core_src_utils.history.html#store)
* [update](https://barba.js.org/api/classes/core_src_utils.history.html#update)

## Properties

### Private \_pointer

\_pointer: number = -1

### Private \_session

\_session: string

### Private \_states

\_states: [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)[] = []

## Accessors

### current

* get current(): [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

* Get the current state.

  #### Returns [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

### previous

* get previous(): [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html) | null

* Get the previous state.

  #### Returns [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html) | null

### size

* get size(): number

* Get the state size.

  #### Returns number

## Methods

### Private \_getAction

* \_getAction(trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)): [HistoryAction](https://barba.js.org/api/modules/core_src_defs.html#historyaction)

* Get the history action: push vs replace

  #### Parameters

  + ##### trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)

  #### Returns [HistoryAction](https://barba.js.org/api/modules/core_src_defs.html#historyaction)

### Private \_getDirection

* \_getDirection(diff: number): [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)

* Get the direction of popstate change

  #### Parameters

  + ##### diff: number

  #### Returns [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)

### add

* add(url: string, trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger), action?: [HistoryAction](https://barba.js.org/api/modules/core_src_defs.html#historyaction), data?: object): void

* Add a new state.

  #### Parameters

  + ##### url: string
  + ##### trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)
  + ##### Optional action: [HistoryAction](https://barba.js.org/api/modules/core_src_defs.html#historyaction)
  + ##### Optional data: object

  #### Returns void

### change

* change(url: string, trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger), e?: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent) | PopStateEvent): [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)

* #### Parameters

  + ##### url: string
  + ##### trigger: [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)
  + ##### Optional e: [LinkEvent](https://barba.js.org/api/modules/core_src_defs.html#linkevent) | PopStateEvent

  #### Returns [Trigger](https://barba.js.org/api/modules/core_src_defs.html#trigger)

### clear

* clear(): void

* Delete all states.

  #### Returns void

### get

* get(index: number): [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

* Get state by index.

  #### Parameters

  + ##### index: number

  #### Returns [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

### init

* init(url: string, ns: string): void

* Init with first state.

  #### Parameters

  + ##### url: string
  + ##### ns: string

  #### Returns void

### remove

* remove(i?: number): void

* Remove last state.

  #### Parameters

  + ##### Optional i: number

  #### Returns void

### replace

* replace(newStates: [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)[]): void

* Replace all states.

  #### Parameters

  + ##### newStates: [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)[]

  #### Returns void

### set

* set(i: number, state: [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)): [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

* Set state by index.

  #### Parameters

  + ##### i: number
  + ##### state: [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

  #### Returns [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

### store

* store(data: object, i?: number): void

* Store custom user data per state.

  #### Parameters

  + ##### data: object
  + ##### Optional i: number

  #### Returns void

### update

* update(data: any, i?: number): void

* Update state.

  #### Parameters

  + ##### data: any
  + ##### Optional i: number

  #### Returns void

Generated using [TypeDoc](https://typedoc.org/)
