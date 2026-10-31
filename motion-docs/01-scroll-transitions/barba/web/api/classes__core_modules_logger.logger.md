---
source: https://barba.js.org/api/classes/core_modules_logger.logger.html
title: "Logger | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_modules_logger.logger.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_modules_logger.logger.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/modules/Logger](https://barba.js.org/api/modules/core_modules_logger.html)
* [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html)

# Class Logger

### Hierarchy

* Logger

## Index

### Constructors

* [constructor](https://barba.js.org/api/classes/core_modules_logger.logger.html#constructor)

### Properties

* [\_source](https://barba.js.org/api/classes/core_modules_logger.logger.html#_source)

### Methods

* [\_log](https://barba.js.org/api/classes/core_modules_logger.logger.html#_log)
* [debug](https://barba.js.org/api/classes/core_modules_logger.logger.html#debug)
* [error](https://barba.js.org/api/classes/core_modules_logger.logger.html#error)
* [info](https://barba.js.org/api/classes/core_modules_logger.logger.html#info)
* [warn](https://barba.js.org/api/classes/core_modules_logger.logger.html#warn)
* [getLevel](https://barba.js.org/api/classes/core_modules_logger.logger.html#getlevel)
* [setLevel](https://barba.js.org/api/classes/core_modules_logger.logger.html#setlevel)

## Constructors

### constructor

* new Logger(source: string): [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html)

* Creates an instance of Logger.

  #### Parameters

  + ##### source: string

  #### Returns [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html)

## Properties

### Private \_source

\_source: string

Log "prefix".

## Methods

### Private \_log

* \_log(fn: function, level: number, objects: any[]): void

* Internal logger.

  #### Parameters

  + ##### fn: function

    - * (): void
      * #### Returns void
  + ##### level: number
  + ##### objects: any[]

  #### Returns void

### debug

* debug(...objects: any[]): void

* Debug log.

  #### Parameters

  + ##### Rest ...objects: any[]

  #### Returns void

### error

* error(...objects: any[]): void

* Error log.

  #### Parameters

  + ##### Rest ...objects: any[]

  #### Returns void

### info

* info(...objects: any[]): void

* Info log.

  #### Parameters

  + ##### Rest ...objects: any[]

  #### Returns void

### warn

* warn(...objects: any[]): void

* Warn log.

  #### Parameters

  + ##### Rest ...objects: any[]

  #### Returns void

### Static getLevel

* getLevel(): number

* Get global log level.

  #### Returns number

### Static setLevel

* setLevel(name: keyof LogLevels): number

* Set global log level.

  #### Parameters

  + ##### name: keyof LogLevels

  #### Returns number

Generated using [TypeDoc](https://typedoc.org/)
