---
source: https://barba.js.org/api/classes/core_src_utils.dom.html
title: "Dom | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_utils.dom.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_utils.dom.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/utils](https://barba.js.org/api/modules/core_src_utils.html)
* [Dom](https://barba.js.org/api/classes/core_src_utils.dom.html)

# Class Dom

### Hierarchy

* Dom

## Index

### Properties

* [\_attr](https://barba.js.org/api/classes/core_src_utils.dom.html#_attr)
* [\_parser](https://barba.js.org/api/classes/core_src_utils.dom.html#_parser)

### Methods

* [\_insertAfter](https://barba.js.org/api/classes/core_src_utils.dom.html#_insertafter)
* [\_updateSibling](https://barba.js.org/api/classes/core_src_utils.dom.html#_updatesibling)
* [addContainer](https://barba.js.org/api/classes/core_src_utils.dom.html#addcontainer)
* [getContainer](https://barba.js.org/api/classes/core_src_utils.dom.html#getcontainer)
* [getHref](https://barba.js.org/api/classes/core_src_utils.dom.html#gethref)
* [getHtml](https://barba.js.org/api/classes/core_src_utils.dom.html#gethtml)
* [getNamespace](https://barba.js.org/api/classes/core_src_utils.dom.html#getnamespace)
* [getSibling](https://barba.js.org/api/classes/core_src_utils.dom.html#getsibling)
* [getWrapper](https://barba.js.org/api/classes/core_src_utils.dom.html#getwrapper)
* [removeContainer](https://barba.js.org/api/classes/core_src_utils.dom.html#removecontainer)
* [resolveUrl](https://barba.js.org/api/classes/core_src_utils.dom.html#resolveurl)
* [toDocument](https://barba.js.org/api/classes/core_src_utils.dom.html#todocument)
* [toElement](https://barba.js.org/api/classes/core_src_utils.dom.html#toelement)
* [toString](https://barba.js.org/api/classes/core_src_utils.dom.html#tostring)

### Object literals

* [\_sibling](https://barba.js.org/api/classes/core_src_utils.dom.html#_sibling)

## Properties

### Private \_attr

\_attr: [ISchemaAttribute](https://barba.js.org/api/interfaces/core_src_defs.ischemaattribute.html) = schemaAttribute

### Private \_parser

\_parser: DOMParser

## Methods

### Private \_insertAfter

* \_insertAfter(newNode: Node, referenceNode: Node): void

* Insert node after another node.

  #### Parameters

  + ##### newNode: Node
  + ##### referenceNode: Node

  #### Returns void

### Private \_updateSibling

* \_updateSibling(container: HTMLElement): [IDomSibling](https://barba.js.org/api/interfaces/core_src_defs.idomsibling.html)

* Update current dom sibling regarding container

  #### Parameters

  + ##### container: HTMLElement

  #### Returns [IDomSibling](https://barba.js.org/api/interfaces/core_src_defs.idomsibling.html)

### addContainer

* addContainer(container: HTMLElement, wrapper: HTMLElement): void

* Add container near previous container

  #### Parameters

  + ##### container: HTMLElement
  + ##### wrapper: HTMLElement

  #### Returns void

### getContainer

* getContainer(scope?: [Scope](https://barba.js.org/api/modules/core_src_defs.html#scope)): HTMLElement | null

* Get `[data-barba="container"]`.

  #### Parameters

  + ##### Default value scope: [Scope](https://barba.js.org/api/modules/core_src_defs.html#scope) = document

  #### Returns HTMLElement | null

### getHref

* getHref(el: [Link](https://barba.js.org/api/modules/core_src_defs.html#link)): string | null

* Get URL from `href` value.

  #### Parameters

  + ##### el: [Link](https://barba.js.org/api/modules/core_src_defs.html#link)

  #### Returns string | null

### getHtml

* getHtml(doc?: HTMLDocument): string

* Get HTML content.

  #### Parameters

  + ##### Default value doc: HTMLDocument = document

  #### Returns string

### getNamespace

* getNamespace(scope?: [Scope](https://barba.js.org/api/modules/core_src_defs.html#scope)): string | null

* Get `[data-barba-namespace]`.

  #### Parameters

  + ##### Default value scope: [Scope](https://barba.js.org/api/modules/core_src_defs.html#scope) = document

  #### Returns string | null

### getSibling

* getSibling(): [IDomSibling](https://barba.js.org/api/interfaces/core_src_defs.idomsibling.html)

* Get current dom sibling

  #### Returns [IDomSibling](https://barba.js.org/api/interfaces/core_src_defs.idomsibling.html)

### getWrapper

* getWrapper(scope?: [Scope](https://barba.js.org/api/modules/core_src_defs.html#scope)): [Wrapper](https://barba.js.org/api/modules/core_src_defs.html#wrapper)

* Get `[data-barba="wrapper"]`.

  #### Parameters

  + ##### Default value scope: [Scope](https://barba.js.org/api/modules/core_src_defs.html#scope) = document

  #### Returns [Wrapper](https://barba.js.org/api/modules/core_src_defs.html#wrapper)

### removeContainer

* removeContainer(container: HTMLElement): void

* Remove container and store next sibling (if applicable).

  #### Parameters

  + ##### container: HTMLElement

  #### Returns void

### resolveUrl

* resolveUrl(...urls: string[]): string

* #### Parameters

  + ##### Rest ...urls: string[]

  #### Returns string

### toDocument

* toDocument(htmlString: string): HTMLDocument

* Parse HTML string to HTMLDocument.

  #### Parameters

  + ##### htmlString: string

  #### Returns HTMLDocument

### toElement

* toElement(htmlString: string): HTMLDivElement

* Parse HTML string to DIVElement.

  DOMParser.parseFromString fails with img[srcset] on iOS.
  see <https://github.com/barbajs/barba/issues/362>

  #### Parameters

  + ##### htmlString: string

  #### Returns HTMLDivElement

### toString

* toString(el: HTMLElement): string

* Convert HTMLDocument to string.

  #### Parameters

  + ##### el: HTMLElement

  #### Returns string

## Object literals

### Private \_sibling

\_sibling: object

### after

after: null = null

### before

before: null = null

### parent

parent: null = null

Generated using [TypeDoc](https://typedoc.org/)
