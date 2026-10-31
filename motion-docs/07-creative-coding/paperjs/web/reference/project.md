---
source: https://paperjs.org/reference/project/
title: "Paper.js — Project"
fetched: 2026-10-28
---

# Project

A Project object in Paper.js is what usually is referred to as the document: The top level object that holds all the items contained in the scene graph. As the term document is already taken in the browser context, it is called Project.

Projects allow the manipulation of the styles that are applied to all newly created items, give access to the selected items, and will in future versions offer ways to query for items in the scene graph defining specific requirements, and means to persist and load from different formats, such as SVG and PDF.

The currently active project can be accessed through the [paperScope.project](https://paperjs.org/reference/paperscope#project) variable.

An array of all open projects is accessible through the [paperScope.projects](https://paperjs.org/reference/paperscope#projects) variable.

## Constructors

[**Project**(element)](https://paperjs.org/reference/project/#project-element)

Creates a Paper.js project containing one empty [Layer](https://paperjs.org/reference/layer), referenced by [project.activeLayer](https://paperjs.org/reference/project#activelayer).

Note that when working with PaperScript, a project is automatically created for us and the [paperScope.project](https://paperjs.org/reference/paperscope#project) variable points to it.

#### Parameters:

* element:
  HTMLCanvasElement⟋String⟋[Size](https://paperjs.org/reference/size)
  — the HTML canvas element that should be used as the element for the view, or an ID string by which to find the element, or the size of the canvas to be created for usage in a web worker.

#### Returns:

* [Project](https://paperjs.org/reference/project)

## Properties

[**currentTextStyle**](https://paperjs.org/reference/project/#currenttextstyle)

The style new text items take in a hosted project, in place of [currentStyle](https://paperjs.org/reference/project#currentstyle), when the host sets one: for hosts whose new text has defaults of its own, such as a black fill without a stroke whatever new paths take. Paths keep taking the current style.

#### Type:

* [Style](https://paperjs.org/reference/style)

[**host**](https://paperjs.org/reference/project/#host)

The host document that the project’s items come from. Setting it creates the project’s layers from the host’s records. All items are created as shells that load their content and children from the host on first access.

The host provides: - `getChildren(key)`, which returns the records of the children of the node with the given key, or of the top level for `null`, as columns: `keys`, `types` (indices into `typeNames`), `typeNames`, `flags` (selected: 1, visible: 2, locked: 4, strokeScaling: 8, clipMask: 64, guide: 128, empty: 256), `boxes` (bounds, strokeBounds and roughBounds in the item’s coordinates, 12 numbers per item), and the sparse objects `names` and `matrices`. - `getItem(key)`, which returns the node’s own content in the form of [item.importJSON(json)](https://paperjs.org/reference/item#importjson-json), without children. Linked text gives `linked`, the keys of its story’s text items in order, and leaves out its story. - `getStory(key)`, for linked text, which returns its story with the key of any of its text items: `content` or `runs`, `paragraphs`, and the character and paragraph styles, as [item.exportJSON(options)](https://paperjs.org/reference/item#exportjson-options) writes them in the JSON of a text item. - `getAncestorKeys(key)`, which returns the keys from the top level down to the node’s parent. - Optionally `layOut(json, start, key)`, which lays out a text item from `start` in its story, given as the JSON string that [item.exportJSON(options)](https://paperjs.org/reference/item#exportjson-options) writes of it as the script holds it, or as `null` where the script didn’t change it since it loaded or the host took its changes with [project.takeChanges](https://paperjs.org/reference/project#takechanges)(), for the host to lay out its own node, and returns `{ end, lines }`: where its visible text ends, and its lines, each `{ start, end, x, y, width, lineHeight, ascent,
descent, pieces }`, with pieces `{ start, end, x, y, dx, width,
rotation, size, ascent, descent, lineHeight }` and an optional `content`, as for a hyphen, all in the item’s coordinates. `key` is null for text that the host doesn’t know yet. Without it, Paper.js lays out text itself.

#### Type:

* Object

[**trackChanges**](https://paperjs.org/reference/project/#trackchanges)

Specifies whether the project logs the changes of its items, to be retrieved through [takeChanges](https://paperjs.org/reference/project#takechanges)(). This allows hosts that keep their own document to update only what has changed.

#### Default:

* false

#### Type:

* Boolean

[**scope**](https://paperjs.org/reference/project/#scope)

The scope that this project belongs to.

Read only.

#### Type:

* [PaperScope](https://paperjs.org/reference/paperscope)

[**view**](https://paperjs.org/reference/project/#view)

The reference to the project’s view.

Read only.

#### Type:

* [View](https://paperjs.org/reference/view)

[**currentStyle**](https://paperjs.org/reference/project/#currentstyle)

The currently active path style. All selected items and newly created items will be styled with this style.

#### Type:

* [Style](https://paperjs.org/reference/style)

#### Example:

Run

#### Example:

Run

[**index**](https://paperjs.org/reference/project/#index)

The index of the project in the [paperScope.projects](https://paperjs.org/reference/paperscope#projects) list.

Read only.

#### Type:

* Number

### Project Content

[**layers**](https://paperjs.org/reference/project/#layers)

The layers contained within the project.

Read only.

#### Type:

* Array of [Layer](https://paperjs.org/reference/layer) objects

[**activeLayer**](https://paperjs.org/reference/project/#activelayer)

The layer which is currently active. New items will be created on this layer by default.

Read only.

#### Type:

* [Layer](https://paperjs.org/reference/layer)

[**symbolDefinitions**](https://paperjs.org/reference/project/#symboldefinitions)

The symbol definitions shared by all symbol items contained place ind project.

Read only.

#### Type:

* Array of [SymbolDefinition](https://paperjs.org/reference/symboldefinition) objects

[**selectedItems**](https://paperjs.org/reference/project/#selecteditems)

The selected items contained within the project.

Read only.

#### Type:

* Array of [Item](https://paperjs.org/reference/item) objects

## Methods

[**getItemByKey**(key)](https://paperjs.org/reference/project/#getitembykey-key)

Returns the item of the host’s node with the given key, loading only the children of its ancestors.

#### Parameters:

* key:
  Number
  — the key of the host’s node

#### Returns:

* [Item](https://paperjs.org/reference/item) — the item, or `null` if the host has no such node

[**invalidate**(columns)](https://paperjs.org/reference/project/#invalidate-columns)

Updates the items of changed host nodes, given in the column format of the host’s `getChildren()`, with two more flags: 16 when the node’s own content changed, so the item loads it again on next access, and 32 when its list of children changed, so it loads them again right away if it had loaded them, keeping the items of nodes that remain. Nodes without items are skipped.

#### Parameters:

* columns:
  Object
  — the records of the changed nodes

[**takeChanges**()](https://paperjs.org/reference/project/#takechanges)

Returns the changes logged since tracking was activated or since the last call, and clears the log. Each item is listed once, with the [ChangeFlag](https://paperjs.org/reference/changeflag) values of all its changes combined. Removed items are listed with the `ChangeFlag.INSERTION` flag.

#### Returns:

* Array of Object objects — the changes as `{ item, flags }` objects, or `null` if [trackChanges](https://paperjs.org/reference/project#trackchanges) is off

[**hasChanges**()](https://paperjs.org/reference/project/#haschanges)

Checks whether changes were logged since tracking was activated or since the last call of [takeChanges](https://paperjs.org/reference/project#takechanges)(), without taking them.

#### Returns:

* Boolean — true if changes were logged, false otherwise

[**activate**()](https://paperjs.org/reference/project/#activate)

Activates this project, so all newly created items will be placed in it.

[**clear**()](https://paperjs.org/reference/project/#clear)

Clears the project by removing all [project.layers](https://paperjs.org/reference/project#layers).

[**isEmpty**()](https://paperjs.org/reference/project/#isempty)

Checks whether the project has any content or not.

#### Returns:

* Boolean

[**remove**()](https://paperjs.org/reference/project/#remove)

Removes this project from the [paperScope.projects](https://paperjs.org/reference/paperscope#projects) list, and also removes its view, if one was defined.

[**selectAll**()](https://paperjs.org/reference/project/#selectall)

Selects all items in the project.

[**deselectAll**()](https://paperjs.org/reference/project/#deselectall)

Deselects all selected items in the project.

### Hierarchy Operations

[**addLayer**(layer)](https://paperjs.org/reference/project/#addlayer-layer)

Adds the specified layer at the end of the this project’s [layers](https://paperjs.org/reference/project#layers) list.

#### Parameters:

* layer:
  [Layer](https://paperjs.org/reference/layer)
  — the layer to be added to the project

#### Returns:

* [Layer](https://paperjs.org/reference/layer) — the added layer, or `null` if adding was not possible

[**insertLayer**(index, layer)](https://paperjs.org/reference/project/#insertlayer-index-layer)

Inserts the specified layer at the specified index in this project’s [layers](https://paperjs.org/reference/project#layers) list.

#### Parameters:

* index:
  Number
  — the index at which to insert the layer
* layer:
  [Layer](https://paperjs.org/reference/layer)
  — the layer to be inserted in the project

#### Returns:

* [Layer](https://paperjs.org/reference/layer) — the added layer, or `null` if adding was not possible

### Hit-testing, Fetching and Matching Items

[**hitTest**(point[, options])](https://paperjs.org/reference/project/#hittest-point)

Performs a hit-test on the items contained within the project at the location of the specified point.

The options object allows you to control the specifics of the hit-test. Without options, `fill`, `stroke` and `segments` are hit-tested. As soon as an options object is passed, only the hit-tests that it sets to `true` are performed. It may contain a combination of the following values:

#### Options:

* options.tolerance: Number — the tolerance of the hit-test, in project coordinates — default: [paperScope.settings](https://paperjs.org/reference/paperscope#settings).hitTolerance
* options.class: Function — only hit-test against a specific item class, or any of its sub-classes, by providing the constructor function against which an `instanceof` check is performed: Group, Layer, Path, CompoundPath, Shape, Raster, SymbolItem, PointText, …
* options.match: Function — a match function to be called for each found hit result: Return `true` to return the result, `false` to keep searching
* options.fill: Boolean — hit-test the fill of items
* options.stroke: Boolean — hit-test the stroke of path items, taking into account the setting of stroke color and width
* options.segments: Boolean — hit-test for [segment.point](https://paperjs.org/reference/segment#point) of [Path](https://paperjs.org/reference/path) items
* options.curves: Boolean — hit-test the curves of path items, without taking the stroke color or width into account
* options.handles: Boolean — hit-test for the handles ([segment.handleIn](https://paperjs.org/reference/segment#handlein) / [segment.handleOut](https://paperjs.org/reference/segment#handleout)) of path segments.
* options.ends: Boolean — only hit-test for the first or last segment points of open path items
* options.position: Boolean — hit-test the [item.position](https://paperjs.org/reference/item#position) of of items, which depends on the setting of [item.pivot](https://paperjs.org/reference/item#pivot)
* options.center: Boolean — hit-test the [rectangle.center](https://paperjs.org/reference/rectangle#center) of the bounding rectangle of items ([item.bounds](https://paperjs.org/reference/item#bounds))
* options.bounds: Boolean — hit-test the corners and side-centers of the bounding rectangle of items ([item.bounds](https://paperjs.org/reference/item#bounds))
* options.guides: Boolean — only hit-test items that have [item.guide](https://paperjs.org/reference/item#guide) set to `true`
* options.selected: Boolean — only hit selected items

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point where the hit-test should be performed
* options:
  Object
  — optional, default: { fill: true, stroke: true, segments: true, tolerance: settings.hitTolerance }

#### Returns:

* [HitResult](https://paperjs.org/reference/hitresult) — a hit result object that contains more information about what exactly was hit or `null` if nothing was hit

[**hitTestAll**(point[, options])](https://paperjs.org/reference/project/#hittestall-point)

Performs a hit-test on the item and its children (if it is a [Group](https://paperjs.org/reference/group) or [Layer](https://paperjs.org/reference/layer)) at the location of the specified point, returning all found hits.

The options object allows you to control the specifics of the hit- test. See [hitTest(point[, options])](https://paperjs.org/reference/project#hittest-point) for a list of all options.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point where the hit-test should be performed
* options:
  Object
  — optional, default: { fill: true, stroke: true, segments: true, tolerance: settings.hitTolerance }

#### Returns:

* Array of [HitResult](https://paperjs.org/reference/hitresult) objects — hit result objects for all hits, describing what exactly was hit or `null` if nothing was hit

#### See also:

* [hitTest(point[, options])](https://paperjs.org/reference/project#hittest-point);

[**getItems**(options)](https://paperjs.org/reference/project/#getitems-options)

Fetch items contained within the project whose properties match the criteria in the specified object.

Extended matching of properties is possible by providing a comparator function or regular expression. Matching points, colors only work as a comparison of the full object, not partial matching (e.g. only providing the x- coordinate to match all points with that x-value). Partial matching does work for [item.data](https://paperjs.org/reference/item#data).

Matching items against a rectangular area is also possible, by setting either `options.inside` or `options.overlapping` to a rectangle describing the area in which the items either have to be fully or partly contained.

#### Options:

* options.recursive: Boolean — whether to loop recursively through all children, or stop at the current level — default: true
* options.match: Function — a match function to be called for each item, allowing the definition of more flexible item checks that are not bound to properties. If no other match properties are defined, this function can also be passed instead of the `match` object
* options.class: Function — the constructor function of the item type to match against
* options.inside: [Rectangle](https://paperjs.org/reference/rectangle) — the rectangle in which the items need to be fully contained
* options.overlapping: [Rectangle](https://paperjs.org/reference/rectangle) — the rectangle with which the items need to at least partly overlap

#### Parameters:

* options:
  Object⟋Function
  — the criteria to match against

#### Returns:

* Array of [Item](https://paperjs.org/reference/item) objects — the list of matching items contained in the project, in their stacking order from bottom to top, with each item listed before its own descendants

#### See also:

* [item.matches(options)](https://paperjs.org/reference/item#matches-options)
* [item.getItems(options)](https://paperjs.org/reference/item#getitems-options)

#### Example:Fetch all selected path items:

Run

#### Example:Fetch all items with a specific fill color:

Run

#### Example:Fetch items at a specific position:

Run

#### Example:Fetch items using a comparator function:

Run

#### Example:Fetch items using a comparator function (2):

Run

#### Example:Match (nested) properties of the data property:

Run

#### Example:Match strings using regular expressions:

Run

[**getItem**(options)](https://paperjs.org/reference/project/#getitem-options)

Fetch the first item contained within the project whose properties match the criteria in the specified object. Extended matching is possible by providing a compare function or regular expression. Matching points, colors only work as a comparison of the full object, not partial matching (e.g. only providing the x- coordinate to match all points with that x-value). Partial matching does work for [item.data](https://paperjs.org/reference/item#data).

See [getItems(options)](https://paperjs.org/reference/project#getitems-options) for a selection of illustrated examples.

#### Parameters:

* options:
  Object⟋Function
  — the criteria to match against

#### Returns:

* [Item](https://paperjs.org/reference/item) — the first item in the project matching the given criteria

### Importing / Exporting JSON and SVG

[**exportJSON**([options])](https://paperjs.org/reference/project/#exportjson)

Exports (serializes) the project with all its layers and child items to a JSON data object or string.

#### Options:

* options.asString: Boolean — whether the JSON is returned as a `Object` or a `String` — default: true
* options.precision: Number — the amount of fractional digits in numbers used in JSON data — default: 5

#### Parameters:

* options:
  Object
  — the serialization options
  — optional

#### Returns:

* String — the exported JSON data

[**importJSON**(json)](https://paperjs.org/reference/project/#importjson-json)

Imports (deserializes) the stored JSON data into the project. Note that the project is not cleared first. You can call [project.clear](https://paperjs.org/reference/project#clear)() to do so.

#### Parameters:

* json:
  String
  — the JSON data to import from

#### Returns:

* [Item](https://paperjs.org/reference/item) — the imported item

[**exportSVG**([options])](https://paperjs.org/reference/project/#exportsvg)

Exports the project with all its layers and child items as an SVG DOM, all contained in one top level SVG group node.

#### Options:

* options.bounds: String⟋[Rectangle](https://paperjs.org/reference/rectangle) — the bounds of the area to export, either as a string (‘view’, content’), or a [Rectangle](https://paperjs.org/reference/rectangle) object: `'view'` uses the view bounds, `'content'` uses the stroke bounds of all content — default: ‘view’
* options.matrix: [Matrix](https://paperjs.org/reference/matrix) — the matrix with which to transform the exported content: If `options.bounds` is set to `'view'`, `paper.view.matrix` is used, for all other settings of `options.bounds` the identity matrix is used. — default: paper.view.matrix
* options.asString: Boolean — whether a SVG node or a `String` is to be returned — default: false
* options.precision: Number — the amount of fractional digits in numbers used in SVG data — default: 5
* options.matchShapes: Boolean — whether path items should tried to be converted to SVG shape items (rect, circle, ellipse, line, polyline, polygon), if their geometries match — default: false
* options.embedImages: Boolean — whether raster images should be embedded as base64 data inlined in the xlink:href attribute, or kept as a link to their external URL. — default: true
* options.reuseImages: Boolean — whether raster images with the same content should only be exported once into the `<defs>` element, and placed through `<use>` elements referencing it — default: false
* options.idPrefix: String — a prefix for the ids generated for definitions such as gradients, clip paths and symbols, to keep them unique when several exported SVGs are placed in one document — default: ’’
* options.reduceAttributes: Boolean — wether to only include style attributes in the SVG output that differ from their parents, or to always include them (much faster but leading to redundancies). — default: true
* [options.processNode] {Function} the function to process the
  SVG node made for each exported item, receiving an object with the
  `item` and its `node`: It can change the node, e.g. to add attributes
  that Paper.js doesn't export, or return a node to replace it with. It
  is called before the item's name, style, visibility and data are set
  on the node, which replace attributes of the same names.

#### Parameters:

* options:
  Object
  — the export options
  — optional

#### Returns:

* SVGElement⟋String — the project converted to an SVG node or a `String` depending on `option.asString` value

#### Example:Export layers as Inkscape layers. Setting the attributes with their namespace has the exported SVG declare it:

```
var ns = 'http://www.inkscape.org/namespaces/inkscape';
var svg = project.exportSVG({
    asString: true,
    processNode: function(arg) {
        var item = arg.item;
        if (item instanceof Layer) {
            arg.node.setAttributeNS(ns, 'inkscape:groupmode', 'layer');
            if (item.name)
                arg.node.setAttributeNS(ns, 'inkscape:label', item.name);
        }
    }
});
```

[**importSVG**(svg[, options])](https://paperjs.org/reference/project/#importsvg-svg)

Converts the provided SVG content into Paper.js items and adds them to the active layer of this project. Note that the project is not cleared first. You can call [project.clear](https://paperjs.org/reference/project#clear)() to do so.

`<symbol>` elements are imported as [SymbolDefinition](https://paperjs.org/reference/symboldefinition) items, and the `<use>` elements that place them as [SymbolItem](https://paperjs.org/reference/symbolitem) items. The styles that `<use>` elements inherit don’t reach the symbols’ content.

The layers in SVG content that Paper.js exported come back as [Layer](https://paperjs.org/reference/layer) items inside the imported group. To make the layers of a project’s SVG the layers of a project again, add them to it with `item.children.slice().forEach(project.addLayer, project)`.

URLs are fetched as they are, so validate URLs that come from untrusted sources first, especially on servers, where they could reach internal addresses.

#### Options:

* options.expandShapes: Boolean — whether imported shape items should be expanded to path items — default: false
* [options.crossOrigin] {String} the {@link Raster#crossOrigin}
  value of the rasters created for `` elements, to load their
  images with CORS
* options.onLoad: Function — the callback function to call once the SVG content is loaded from the given URL receiving two arguments: the converted `item` and the original `svg` data as a string. Only required when loading from external resources.
* options.onError: Function — the callback function to call if an error occurs during loading. Only required when loading from external resources.
* options.insert: Boolean — whether the imported items should be added to the project that `importSVG()` is called on — default: true
* options.applyMatrix: Boolean — whether the imported items should have their transformation matrices applied to their contents or not — default: [paperScope.settings](https://paperjs.org/reference/paperscope#settings).applyMatrix
* [options.processItem] {Function} the function to process the
  item made for each imported SVG element, receiving an object with
  the `item` and its `node`: It can read attributes that Paper.js
  doesn't import, or return an item to replace it with. It is called
  after the element's attributes and data are applied to the item, so
  it can extend `item.data`. A replacement item doesn't receive them:
  copy them over from `item` as needed.

#### Parameters:

* svg:
  SVGElement⟋String
  — the SVG content to import, either as a SVG DOM node, a string containing SVG content, or a string describing the URL of the SVG file to fetch.
* options:
  Object
  — the import options
  — optional

#### Returns:

* [Item](https://paperjs.org/reference/item) — the newly created Paper.js item containing the converted SVG content

#### Example:Keep the SVG `class` attribute of items in their data, and export it again:

```
var item = project.importSVG(svg, {
    processItem: function(arg) {
        var className = arg.node.getAttribute('class');
        if (className)
            arg.item.data.className = className;
    }
});
var exported = project.exportSVG({
    processNode: function(arg) {
        var className = arg.item.data.className;
        if (className)
            arg.node.setAttribute('class', className);
    }
});
```

[**importSVG**(svg, onLoad)](https://paperjs.org/reference/project/#importsvg-svg-onLoad)

Imports the provided external SVG file, converts it into Paper.js items and adds them to the active layer of this project. Note that the project is not cleared first. You can call [project.clear](https://paperjs.org/reference/project#clear)() to do so.

#### Parameters:

* svg:
  SVGElement⟋String
  — the URL of the SVG file to fetch.
* onLoad:
  Function
  — the callback function to call once the SVG content is loaded from the given URL receiving two arguments: the converted `item` and the original `svg` data as a string. Only required when loading from external files.

#### Returns:

* [Item](https://paperjs.org/reference/item) — the newly created Paper.js item containing the converted SVG content
