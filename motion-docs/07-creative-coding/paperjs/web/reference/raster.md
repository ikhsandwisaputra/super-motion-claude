---
source: https://paperjs.org/reference/raster/
title: "Paper.js — Raster"
fetched: 2026-10-28
---

# Raster

Extends **[Item](https://paperjs.org/reference/item)**

The Raster item represents an image in a Paper.js project.

## Constructors

[**Raster**([source[, position]])](https://paperjs.org/reference/raster/#raster)

Creates a new raster item from the passed argument, and places it in the active layer. `source` can either be a DOM Image, a Canvas, or a string describing the URL to load the image from, or the ID of a DOM element to get the image from (either a DOM Image or a Canvas).

#### Parameters:

* source:
  HTMLImageElement⟋HTMLCanvasElement⟋String
  — the source of the raster
  — optional
* position:
  [Point](https://paperjs.org/reference/point)
  — the center position at which the raster item is placed
  — optional

#### Returns:

* [Raster](https://paperjs.org/reference/raster)

#### Example:Creating a raster using a url

Run

#### Example:Creating a raster using the id of a DOM Image:

```
// Create a raster using the id of the image:
var raster = new Raster('art');
```

#### Example:Creating a raster using a DOM Image:

```
// Find the element using its id:
var imageElement = document.getElementById('art');

// Create the raster:
var raster = new Raster(imageElement);
```

[**Raster**(size[, position])](https://paperjs.org/reference/raster/#raster-size)

Creates a new empty raster of the given size, and places it in the active layer.

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size of the raster
* position:
  [Point](https://paperjs.org/reference/point)
  — the center position at which the raster item is placed
  — optional

#### Returns:

* [Raster](https://paperjs.org/reference/raster)

#### Example:Creating an empty raster and fill it with random pixels:

Run

[**Raster**(object)](https://paperjs.org/reference/raster/#raster-object)

Creates a new raster from an object description, and places it in the active layer.

#### Parameters:

* object:
  Object
  — an object containing properties to be set on the raster

#### Returns:

* [Raster](https://paperjs.org/reference/raster)

#### Example:

Run

## Properties

[**size**](https://paperjs.org/reference/raster/#size)

The size of the raster in pixels.

#### Type:

* [Size](https://paperjs.org/reference/size)

[**width**](https://paperjs.org/reference/raster/#width)

The width of the raster in pixels.

#### Type:

* Number

[**height**](https://paperjs.org/reference/raster/#height)

The height of the raster in pixels.

#### Type:

* Number

[**loaded**](https://paperjs.org/reference/raster/#loaded)

The loading state of the raster image.

Read only.

#### Type:

* Boolean

[**resolution**](https://paperjs.org/reference/raster/#resolution)

The resolution of the raster at its current size, in PPI (pixels per inch).

Read only.

#### Type:

* [Size](https://paperjs.org/reference/size)

[**image**](https://paperjs.org/reference/raster/#image)

The HTMLImageElement or Canvas element of the raster, if one is associated. Note that for consistency, a [onLoad](https://paperjs.org/reference/raster#onload) event will be triggered on the raster even if the image has already finished loading before, or if we are setting the raster to a canvas.

#### Type:

* HTMLImageElement⟋HTMLCanvasElement

[**canvas**](https://paperjs.org/reference/raster/#canvas)

The Canvas object of the raster. If the raster was created from an image, accessing its canvas causes the raster to try and create one and draw the image into it. Depending on security policies, this might fail, in which case `null` is returned instead.

#### Type:

* HTMLCanvasElement

[**context**](https://paperjs.org/reference/raster/#context)

The Canvas 2D drawing context of the raster.

#### Type:

* CanvasRenderingContext2D

[**source**](https://paperjs.org/reference/raster/#source)

The source of the raster, which can be set using a string describing the URL to load the image from, or a data url. Reading this property will return the url of the source image or a data-url. To set the raster to a DOM Image or a Canvas, use [image](https://paperjs.org/reference/raster#image) or [canvas](https://paperjs.org/reference/raster#canvas) instead. The ID of a DOM Image or Canvas element is only accepted by the constructor. Note that for consistency, a [onLoad](https://paperjs.org/reference/raster#onload) event will be triggered on the raster even if the image has already finished loading before.

#### Type:

* String

#### Example:

Run

#### Example:

Run

[**crossOrigin**](https://paperjs.org/reference/raster/#crossorigin)

The crossOrigin value to be used when loading the image resource, in order to support CORS. Note that this needs to be set before setting the [source](https://paperjs.org/reference/raster#source) property in order to always work (e.g. when the image is cached in the browser).

#### Type:

* String

#### Example:

Run

[**smoothing**](https://paperjs.org/reference/raster/#smoothing)

Determines if the raster is drawn with pixel smoothing when scaled up or down, and if so, at which quality its pixels are to be smoothed. The settings of this property control both the `imageSmoothingEnabled` and `imageSmoothingQuality` properties of the `CanvasRenderingContext2D` interface.

By default, smoothing is enabled at `'low'` quality. It can be set to of `'off'` to scale the raster’s pixels by repeating the nearest neighboring pixels, or to `'low'`, `'medium'` or `'high'` to control the various degrees of available image smoothing quality.

For backward compatibility, it can can also be set to `false` (= `'off'`) or `true` (= `'low'`).

#### Default:

* 'low'

#### Type:

* String

#### Example:

Run

### Event Handlers

[**onLoad**](https://paperjs.org/reference/raster/#onload)

The event handler function to be called when the underlying image has finished loading and is ready to be used. This is also triggered when the image is already loaded, or when a canvas is used instead of an image.

#### Type:

* Function⟋null

#### Example:

```
var url = 'http://assets.paperjs.org/images/marilyn.jpg';
var raster = new Raster(url);

// If you create a Raster using a url, you can use the onLoad
// handler to do something once it is loaded:
raster.onLoad = function() {
    console.log('The image has finished loading.');
};

// As with all events in paper.js, you can also use this notation instead
// to install multiple handlers:
raster.on('load', function() {
    console.log('Now the image is definitely ready.');
});
```

[**onError**](https://paperjs.org/reference/raster/#onerror)

The event handler function to be called when there is an error loading the underlying image.

#### Type:

* Function⟋null

## Methods

[**getSubCanvas**(rect)](https://paperjs.org/reference/raster/#getsubcanvas-rect)

Extracts a part of the Raster’s content as a sub image, and returns it as a Canvas object.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the boundaries of the sub image in pixel coordinates

#### Returns:

* HTMLCanvasElement — the sub image as a Canvas object

[**getSubRaster**(rect)](https://paperjs.org/reference/raster/#getsubraster-rect)

Extracts a part of the raster item’s content as a new raster item, placed in exactly the same place as the original content.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the boundaries of the sub raster in pixel coordinates

#### Returns:

* [Raster](https://paperjs.org/reference/raster) — the sub raster as a newly created raster item

[**toDataURL**([type[, quality]])](https://paperjs.org/reference/raster/#todataurl)

Returns a Base 64 encoded `data:` URL representation of the raster. If the raster shows an image that was loaded from a `data:` URL, that URL is returned unchanged. Otherwise, the arguments are passed on to `HTMLCanvasElement#toDataURL()` of the raster’s [canvas](https://paperjs.org/reference/raster#canvas). In web-workers, where the canvas is an `OffscreenCanvas`, this is not supported, and neither are [source](https://paperjs.org/reference/raster#source) and exporting the raster to JSON, which rely on it. Use the canvas’ asynchronous `convertToBlob()` there instead.

#### Parameters:

* type:
  String
  — the image format to encode
  — optional, default: ‘image/png’
* quality:
  Number
  — the image quality between `0` and `1`, for formats that use lossy compression, such as `'image/jpeg'`
  — optional

#### Returns:

* String — the `data:` URL of the raster

[**drawImage**(image, point)](https://paperjs.org/reference/raster/#drawimage-image-point)

Draws an image on the raster.

#### Parameters:

* image:
  CanvasImageSource
* point:
  [Point](https://paperjs.org/reference/point)
  — the offset of the image as a point in pixel coordinates

[**getAverageColor**(object)](https://paperjs.org/reference/raster/#getaveragecolor-object)

Calculates the average color of the image within the given path, rectangle or point. This can be used for creating raster image effects.

#### Parameters:

* object:
  [Path](https://paperjs.org/reference/path)⟋[Rectangle](https://paperjs.org/reference/rectangle)⟋[Point](https://paperjs.org/reference/point)

#### Returns:

* [Color](https://paperjs.org/reference/color) — the average color contained in the area covered by the specified path, rectangle or point

### Pixels

[**getPixel**(x, y)](https://paperjs.org/reference/raster/#getpixel-x-y)

Gets the color of a pixel in the raster.

#### Parameters:

* x:
  Number
  — the x offset of the pixel in pixel coordinates
* y:
  Number
  — the y offset of the pixel in pixel coordinates

#### Returns:

* [Color](https://paperjs.org/reference/color) — the color of the pixel

[**getPixel**(point)](https://paperjs.org/reference/raster/#getpixel-point)

Gets the color of a pixel in the raster.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the offset of the pixel as a point in pixel coordinates

#### Returns:

* [Color](https://paperjs.org/reference/color) — the color of the pixel

[**setPixel**(x, y, color)](https://paperjs.org/reference/raster/#setpixel-x-y-color)

Sets the color of the specified pixel to the specified color.

#### Parameters:

* x:
  Number
  — the x offset of the pixel in pixel coordinates
* y:
  Number
  — the y offset of the pixel in pixel coordinates
* color:
  [Color](https://paperjs.org/reference/color)
  — the color that the pixel will be set to

[**setPixel**(point, color)](https://paperjs.org/reference/raster/#setpixel-point-color)

Sets the color of the specified pixel to the specified color.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the offset of the pixel as a point in pixel coordinates
* color:
  [Color](https://paperjs.org/reference/color)
  — the color that the pixel will be set to

[**clear**()](https://paperjs.org/reference/raster/#clear)

Clears the image, if it is backed by a canvas.

### Image Data

[**createImageData**(size)](https://paperjs.org/reference/raster/#createimagedata-size)

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)

#### Returns:

* ImageData

[**getImageData**([rect])](https://paperjs.org/reference/raster/#getimagedata)

Returns the image data of the pixels within the specified rectangle, or of the whole raster if no rectangle or an empty one is passed.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the area of the raster to get the image data of, in pixel coordinates
  — optional

#### Returns:

* ImageData — the image data of the specified area

[**putImageData**(data, point)](https://paperjs.org/reference/raster/#putimagedata-data-point)

#### Parameters:

* data:
  ImageData
* point:
  [Point](https://paperjs.org/reference/point)

[**setImageData**(data)](https://paperjs.org/reference/raster/#setimagedata-data)

#### Parameters:

* data:
  ImageData

## Properties inherited from [Item](https://paperjs.org/reference/item)

[**key**](https://paperjs.org/reference/raster/#key)

The key of the host’s node that the item represents, in a project backed by a host document, see [project.host](https://paperjs.org/reference/project#host). It can only be set once, on an item created by a script, to register the key that the host gave its new node.

#### Type:

* Number

[**id**](https://paperjs.org/reference/raster/#id)

The unique id of the item.

Read only.

#### Type:

* Number

[**className**](https://paperjs.org/reference/raster/#classname)

The class name of the item as a string.

#### Values:

* 'Group', 'Layer', 'Path', 'CompoundPath', 'Shape', 'Raster', 'SymbolItem', 'PointText'

#### Type:

* String

[**name**](https://paperjs.org/reference/raster/#name)

The name of the item. If the item has a name, it can be accessed by name through its parent’s children list.

#### Type:

* String

#### Example:

Run

[**style**](https://paperjs.org/reference/raster/#style)

The path style of the item.

Styles set on a [Group](https://paperjs.org/reference/group) or [Layer](https://paperjs.org/reference/layer) are applied to the children that it contains at that moment. Items added to it later do not receive them.

#### Type:

* [Style](https://paperjs.org/reference/style)

#### Example:Applying several styles to an item in one go, by passing an object to its style property:

Run

#### Example:Copying the style of another item:

Run

#### Example:Applying the same style object to multiple items:

Run

[**locked**](https://paperjs.org/reference/raster/#locked)

Specifies whether the item is locked. When set to `true`, item interactions with the mouse are disabled.

#### Default:

* false

#### Type:

* Boolean

#### Example:

Run

[**visible**](https://paperjs.org/reference/raster/#visible)

Specifies whether the item is visible. When set to `false`, the item won’t be drawn.

#### Default:

* true

#### Type:

* Boolean

#### Example:Hiding an item:

Run

[**blendMode**](https://paperjs.org/reference/raster/#blendmode)

The blend mode with which the item is composited onto the canvas. Both the standard canvas compositing modes, as well as the new CSS blend modes are supported. Where the canvas doesn’t support a CSS blend mode natively, it draws as `'normal'`. Paper.js’s own modes `'add'`, `'subtract'`, `'average'`, `'pin-light'` and `'negation'` are emulated, which can have an impact on performance.

#### Values:

* 'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-
  light', 'color-dodge', 'color-burn', 'darken', 'lighten', 'difference', 'exclusion', 'hue', 'saturation', 'luminosity', 'color', 'add', 'subtract', 'average', 'pin-light', 'negation', 'source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'darker', 'copy', 'xor'

#### Default:

* 'normal'

#### Type:

* String

#### Example:Setting an item's blend mode:

Run

[**opacity**](https://paperjs.org/reference/raster/#opacity)

The opacity of the item as a value between `0` and `1`.

#### Default:

* 1

#### Type:

* Number

#### Example:Making an item 50% transparent:

Run

[**guide**](https://paperjs.org/reference/raster/#guide)

Specifies whether the item functions as a guide. When set to `true`, the item is drawn as usual, but left out of hit-tests and mouse interactions. Hit-tests only find guides when `options.guides` is set, and then only them, see [hitTest(point[, options])](https://paperjs.org/reference/item#hittest-point).

#### Default:

* false

#### Type:

* Boolean

[**textWrap**](https://paperjs.org/reference/raster/#textwrap)

Specifies whether, and how, the item pushes aside the text of the [AreaText](https://paperjs.org/reference/areatext) items below it in its layer: `null`, or an object with `offset`, the space kept between them, and `invert`, to let the text flow inside it instead. `true` sets the defaults.

#### Default:

* null

#### Type:

* Object

#### Example:

```
var circle = new Path.Circle({ center: [100, 100], radius: 40 });
circle.textWrap = { offset: 10 };
```

[**selected**](https://paperjs.org/reference/raster/#selected)

Specifies whether the item is selected. This will also return `true` for [Group](https://paperjs.org/reference/group) items if they are partially selected, e.g. groups containing selected or partially selected paths.

Paper.js draws the visual outlines of selected items on top of your project. This can be useful for debugging, as it allows you to see the construction of paths, position of path curves, individual segment points and bounding boxes of symbol and raster items.

#### Default:

* false

#### Type:

* Boolean

#### See also:

* [project.selectedItems](https://paperjs.org/reference/project#selecteditems)
* [segment.selected](https://paperjs.org/reference/segment#selected)
* [curve.selected](https://paperjs.org/reference/curve#selected)
* [point.selected](https://paperjs.org/reference/point#selected)

#### Example:Selecting an item:

Run

[**fullySelected**](https://paperjs.org/reference/raster/#fullyselected)

Specifies whether the item and all its descendants are selected. Setting it selects or deselects them all.

#### Type:

* Boolean

[**clipMask**](https://paperjs.org/reference/raster/#clipmask)

Specifies whether the item defines a clip mask. This can only be set on paths and compound paths, and only if the item is already contained within a clipping group.

#### Default:

* false

#### Type:

* Boolean

[**data**](https://paperjs.org/reference/raster/#data)

A plain javascript object which can be used to store arbitrary data on the item.

#### Type:

* Object

#### Example:

```
var path = new Path();
path.data.remember = 'milk';
```

#### Example:

```
var path = new Path();
path.data.malcolm = new Point(20, 30);
console.log(path.data.malcolm.x); // 20
```

#### Example:

```
var path = new Path();
path.data = {
    home: 'Omicron Theta',
    found: 2338,
    pets: ['Spot']
};
console.log(path.data.pets.length); // 1
```

#### Example:

```
var path = new Path({
    data: {
        home: 'Omicron Theta',
        found: 2338,
        pets: ['Spot']
    }
});
console.log(path.data.pets.length); // 1
```

### Position and Bounding Boxes

[**position**](https://paperjs.org/reference/raster/#position)

The item’s position within the parent item’s coordinate system. By default, this is the [rectangle.center](https://paperjs.org/reference/rectangle#center) of the item’s [bounds](https://paperjs.org/reference/item#bounds) rectangle.

#### Type:

* [Point](https://paperjs.org/reference/point)

#### Example:Changing the position of a path:

Run

#### Example:Changing the x coordinate of an item's position:

Run

[**pivot**](https://paperjs.org/reference/raster/#pivot)

The item’s pivot point specified in the item coordinate system, defining the point around which all transformations are hinging. This is also the reference point for [position](https://paperjs.org/reference/item#position). By default, it is set to `null`, meaning the [rectangle.center](https://paperjs.org/reference/rectangle#center) of the item’s [bounds](https://paperjs.org/reference/item#bounds) rectangle is used as pivot.

#### Default:

* null

#### Type:

* [Point](https://paperjs.org/reference/point)

[**bounds**](https://paperjs.org/reference/raster/#bounds)

The bounding rectangle of the item excluding stroke width.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**strokeBounds**](https://paperjs.org/reference/raster/#strokebounds)

The bounding rectangle of the item including stroke width.

Setting it fits the item’s [bounds](https://paperjs.org/reference/item#bounds) into the given rectangle minus the extent of the stroke on each side, also where this extent changes with the item’s proportions, as with miters. A rectangle smaller than the stroke itself shrinks the bounds to its center.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**handleBounds**](https://paperjs.org/reference/raster/#handlebounds)

The bounding rectangle of the item including handles.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**internalBounds**](https://paperjs.org/reference/raster/#internalbounds)

The bounding rectangle of the item without any matrix transformations.

Typical use case would be drawing a frame around the object where you want to draw something of the same size, position, rotation, and scaling, like a selection frame.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**rotation**](https://paperjs.org/reference/raster/#rotation)

The current rotation angle of the item, as described by its [matrix](https://paperjs.org/reference/item#matrix). Please note that this only returns meaningful values for items with [applyMatrix](https://paperjs.org/reference/item#applymatrix) set to `false`, meaning they do not directly bake transformations into their content.

#### Type:

* Number

[**scaling**](https://paperjs.org/reference/raster/#scaling)

The current scale factor of the item, as described by its [matrix](https://paperjs.org/reference/item#matrix). Please note that this only returns meaningful values for items with [applyMatrix](https://paperjs.org/reference/item#applymatrix) set to `false`, meaning they do not directly bake transformations into their content.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**matrix**](https://paperjs.org/reference/raster/#matrix)

The item’s transformation matrix, defining position and dimensions in relation to its parent item in which it is contained.

#### Type:

* [Matrix](https://paperjs.org/reference/matrix)

[**globalMatrix**](https://paperjs.org/reference/raster/#globalmatrix)

The item’s global transformation matrix in relation to the global project coordinate space. Note that the view’s transformations resulting from zooming and panning are not factored in.

Read only.

#### Type:

* [Matrix](https://paperjs.org/reference/matrix)

[**viewMatrix**](https://paperjs.org/reference/raster/#viewmatrix)

The item’s global matrix in relation to the view coordinate space. This means that the view’s transformations resulting from zooming and panning are factored in.

Read only.

#### Type:

* [Matrix](https://paperjs.org/reference/matrix)

[**applyMatrix**](https://paperjs.org/reference/raster/#applymatrix)

Controls whether the transformations applied to the item (e.g. through [transform(matrix)](https://paperjs.org/reference/item#transform-matrix), [rotate(angle)](https://paperjs.org/reference/item#rotate-angle), [scale(scale)](https://paperjs.org/reference/item#scale-scale), etc.) are stored in its [matrix](https://paperjs.org/reference/item#matrix) property, or whether they are directly applied to its contents or children (passed on to the segments in [Path](https://paperjs.org/reference/path) items, the children of [Group](https://paperjs.org/reference/group) items, etc.).

#### Default:

* true

#### Type:

* Boolean

### Project Hierarchy

[**project**](https://paperjs.org/reference/raster/#project)

The project that this item belongs to.

Read only.

#### Type:

* [Project](https://paperjs.org/reference/project)

[**view**](https://paperjs.org/reference/raster/#view)

The view that this item belongs to.

Read only.

#### Type:

* [View](https://paperjs.org/reference/view)

[**scope**](https://paperjs.org/reference/raster/#scope)

The scope that this item belongs to, through its project.

Read only.

#### Type:

* [PaperScope](https://paperjs.org/reference/paperscope)

[**layer**](https://paperjs.org/reference/raster/#layer)

The layer that this item is contained within.

Read only.

#### Type:

* [Layer](https://paperjs.org/reference/layer)

[**parent**](https://paperjs.org/reference/raster/#parent)

The item that this item is contained within.

#### Type:

* [Item](https://paperjs.org/reference/item)

#### Example:

```
var path = new Path();

// New items are placed in the active layer:
console.log(path.parent == project.activeLayer); // true

var group = new Group();
group.addChild(path);

// Now the parent of the path has become the group:
console.log(path.parent == group); // true
```

#### Example:Setting the parent of the item to another item

```
var path = new Path();

// New items are placed in the active layer:
console.log(path.parent == project.activeLayer); // true

var group = new Group();
path.parent = group;

// Now the parent of the path has become the group:
console.log(path.parent == group); // true

// The path is now contained in the children list of group:
console.log(group.children[0] == path); // true
```

#### Example:Setting the parent of an item in the constructor

```
var group = new Group();

var path = new Path({
    parent: group
});

// The parent of the path is the group:
console.log(path.parent == group); // true

// The path is contained in the children list of group:
console.log(group.children[0] == path); // true
```

[**children**](https://paperjs.org/reference/raster/#children)

The children items contained within this item. Items that define a [name](https://paperjs.org/reference/item#name) can also be accessed by name.

Only [Group](https://paperjs.org/reference/group), [Layer](https://paperjs.org/reference/layer) and [CompoundPath](https://paperjs.org/reference/compoundpath) items can have children. On all other items, such as [Path](https://paperjs.org/reference/path), [Shape](https://paperjs.org/reference/shape), [Raster](https://paperjs.org/reference/raster), [SymbolItem](https://paperjs.org/reference/symbolitem) and [PointText](https://paperjs.org/reference/pointtext), `children` is `undefined`.

**Please note:** The children array should not be modified directly using array functions. To remove single items from the children list, use [item.remove](https://paperjs.org/reference/item#remove)(), to remove all items from the children list, use [item.removeChildren](https://paperjs.org/reference/item#removechildren)(). To add items to the children list, use [item.addChild(item)](https://paperjs.org/reference/item#addchild-item) or [item.insertChild(index, item)](https://paperjs.org/reference/item#insertchild-index-item).

#### Type:

* Array of [Item](https://paperjs.org/reference/item) objects

#### Example:Accessing items in the children array:

Run

#### Example:Accessing children by name:

Run

#### Example:Passing an array of items to item.children:

Run

[**firstChild**](https://paperjs.org/reference/raster/#firstchild)

The first item contained within this item. This is a shortcut for accessing `item.children[0]`.

Read only.

#### Type:

* [Item](https://paperjs.org/reference/item)

[**lastChild**](https://paperjs.org/reference/raster/#lastchild)

The last item contained within this item.This is a shortcut for accessing `item.children[item.children.length - 1]`.

Read only.

#### Type:

* [Item](https://paperjs.org/reference/item)

[**nextSibling**](https://paperjs.org/reference/raster/#nextsibling)

The next item on the same level as this item.

Read only.

#### Type:

* [Item](https://paperjs.org/reference/item)

[**previousSibling**](https://paperjs.org/reference/raster/#previoussibling)

The previous item on the same level as this item.

Read only.

#### Type:

* [Item](https://paperjs.org/reference/item)

[**index**](https://paperjs.org/reference/raster/#index)

The index of this item within the list of its parent’s children.

#### Type:

* Number

### Stroke Style

[**strokeColor**](https://paperjs.org/reference/raster/#strokecolor)

The color of the stroke.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

#### Example:Setting the stroke color of a path:

Run

[**strokeWidth**](https://paperjs.org/reference/raster/#strokewidth)

The width of the stroke.

#### Type:

* Number

#### Example:Setting an item's stroke width:

Run

[**strokeCap**](https://paperjs.org/reference/raster/#strokecap)

The shape to be used at the beginning and end of open [Path](https://paperjs.org/reference/path) items, when they have a stroke.

#### Values:

* 'round', 'square', 'butt'

#### Default:

* 'butt'

#### Type:

* String

#### Example:A look at the different stroke caps:

Run

[**strokeJoin**](https://paperjs.org/reference/raster/#strokejoin)

The shape to be used at the segments and corners of [Path](https://paperjs.org/reference/path) items when they have a stroke.

#### Values:

* 'miter', 'round', 'bevel'

#### Default:

* 'miter'

#### Type:

* String

#### Example:A look at the different stroke joins:

Run

[**dashOffset**](https://paperjs.org/reference/raster/#dashoffset)

The dash offset of the stroke.

#### Default:

* 0

#### Type:

* Number

[**strokeScaling**](https://paperjs.org/reference/raster/#strokescaling)

Specifies whether the stroke is to be drawn taking the current affine transformation into account (the default behavior), or whether it should appear as a non-scaling stroke. On text, non-scaling strokes are exact for uniform scaling only, as the glyphs are always stroked through the transformation.

#### Default:

* true

#### Type:

* Boolean

[**dashArray**](https://paperjs.org/reference/raster/#dasharray)

Specifies an array containing the dash and gap lengths of the stroke.

#### Default:

* []

#### Type:

* Array of Numbers

#### Example:

Run

[**miterLimit**](https://paperjs.org/reference/raster/#miterlimit)

The miter limit of the stroke. When two line segments meet at a sharp angle and miter joins have been specified for [item.strokeJoin](https://paperjs.org/reference/item#strokejoin), it is possible for the miter to extend far beyond the [item.strokeWidth](https://paperjs.org/reference/item#strokewidth) of the path. The miterLimit imposes a limit on the ratio of the miter length to the [item.strokeWidth](https://paperjs.org/reference/item#strokewidth).

#### Default:

* 10

#### Type:

* Number

[**paintOrder**](https://paperjs.org/reference/raster/#paintorder)

The order in which the fill and the stroke are painted, as in SVG’s `paint-order`, named after what is painted first: `'fill'` paints the fill first, `'stroke'` paints the stroke first, so the fill covers its inner half.

#### Values:

* 'fill', 'stroke'

#### Default:

* 'fill'

#### Type:

* String

### Fill Style

[**fillColor**](https://paperjs.org/reference/raster/#fillcolor)

The fill color of the item.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

#### Example:Setting the fill color of a path to red:

Run

[**fillRule**](https://paperjs.org/reference/raster/#fillrule)

The fill-rule with which the shape gets filled. Please note that only modern browsers support fill-rules other than `'nonzero'`.

#### Values:

* 'nonzero', 'evenodd'

#### Default:

* 'nonzero'

#### Type:

* String

### Shadow Style

[**shadowColor**](https://paperjs.org/reference/raster/#shadowcolor)

The shadow color.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

#### Example:Creating a circle with a black shadow:

Run

[**shadowBlur**](https://paperjs.org/reference/raster/#shadowblur)

The shadow’s blur radius.

#### Default:

* 0

#### Type:

* Number

[**shadowOffset**](https://paperjs.org/reference/raster/#shadowoffset)

The shadow’s offset.

#### Default:

* 0

#### Type:

* [Point](https://paperjs.org/reference/point)

### Selection Style

[**selectedColor**](https://paperjs.org/reference/raster/#selectedcolor)

The color the item is highlighted with when selected. If the item does not specify its own color, the color defined by its layer is used instead.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

### Event Handlers

[**onFrame**](https://paperjs.org/reference/raster/#onframe)

Item level handler function to be called on each frame of an animation. The function receives an event object which contains information about the frame event:

#### Type:

* Function⟋null

#### Options:

* event.count: Number — the number of times the frame event was fired
* event.time: Number — the total amount of time passed since the first frame event in seconds
* event.delta: Number — the time passed in seconds since the last frame event

#### See also:

* [view.onFrame](https://paperjs.org/reference/view#onframe)

#### Example:Creating an animation:

Run

[**onMouseDown**](https://paperjs.org/reference/raster/#onmousedown)

The function to be called when the mouse button is pushed down on the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onMouseDown](https://paperjs.org/reference/view#onmousedown)

#### Example:Press the mouse button down on the circle shaped path, to make it red:

Run

#### Example:Press the mouse on the circle shaped paths to remove them:

Run

[**onMouseDrag**](https://paperjs.org/reference/raster/#onmousedrag)

The function to be called when the mouse position changes while the mouse is being dragged over the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onMouseDrag](https://paperjs.org/reference/view#onmousedrag)

#### Example:Press and drag the mouse on the blue circle to move it:

Run

[**onMouseUp**](https://paperjs.org/reference/raster/#onmouseup)

The function to be called when the mouse button is released over the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onMouseUp](https://paperjs.org/reference/view#onmouseup)

#### Example:Release the mouse button over the circle shaped path, to make it red:

Run

[**onClick**](https://paperjs.org/reference/raster/#onclick)

The function to be called when the mouse clicks on the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onClick](https://paperjs.org/reference/view#onclick)

#### Example:Click on the circle shaped path, to make it red:

Run

#### Example:Click on the circle shaped paths to remove them:

Run

[**onDoubleClick**](https://paperjs.org/reference/raster/#ondoubleclick)

The function to be called when the mouse double clicks on the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onDoubleClick](https://paperjs.org/reference/view#ondoubleclick)

#### Example:Double click on the circle shaped path, to make it red:

Run

#### Example:Double click on the circle shaped paths to remove them:

Run

[**onMouseMove**](https://paperjs.org/reference/raster/#onmousemove)

The function to be called repeatedly while the mouse moves over the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onMouseMove](https://paperjs.org/reference/view#onmousemove)

#### Example:Move over the circle shaped path, to change its opacity:

Run

[**onMouseEnter**](https://paperjs.org/reference/raster/#onmouseenter)

The function to be called when the mouse moves over the item. This function will only be called again, once the mouse moved outside of the item first. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onMouseEnter](https://paperjs.org/reference/view#onmouseenter)

#### Example:When you move the mouse over the item, its fill color is set to red. When you move the mouse outside again, its fill color is set back to black.

Run

#### Example:When you click the mouse, you create new circle shaped items. When you move the mouse over the item, its fill color is set to red. When you move the mouse outside again, its fill color is set back to black.

Run

[**onMouseLeave**](https://paperjs.org/reference/raster/#onmouseleave)

The function to be called when the mouse moves out of the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy and will reach the view, unless they are stopped with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from the handler.

#### Type:

* Function⟋null

#### See also:

* [view.onMouseLeave](https://paperjs.org/reference/view#onmouseleave)

#### Example:Move the mouse over the circle shaped path and then move it out of it again to set its fill color to red:

Run

## Methods inherited from [Item](https://paperjs.org/reference/item)

[**set**(props)](https://paperjs.org/reference/raster/#set-props)

Sets the properties of the passed object literal on this item to the values defined in the object literal, if the item has property of the given name (or a setter defined for it).

#### Parameters:

* props:
  Object

#### Returns:

* [Item](https://paperjs.org/reference/item) — the item itself

#### Example:Setting properties through an object literal

Run

[**clone**([options])](https://paperjs.org/reference/raster/#clone)

Clones the item within the same project and places the copy above the item.

#### Options:

* insert: undefined — specifies whether the copy should be inserted into the scene graph. When set to `true`, it is inserted above the original — default: true
* deep: undefined — specifies whether the item’s children should also be cloned — default: true

#### Parameters:

* options:
  Object
  — optional, default: { insert: true, deep: true }

#### Returns:

* [Item](https://paperjs.org/reference/item) — the newly cloned item

#### Example:Cloning items:

Run

[**copyContent**(source)](https://paperjs.org/reference/raster/#copycontent-source)

Copies the content of the specified item over to this item.

#### Parameters:

* source:
  [Item](https://paperjs.org/reference/item)
  — the item to copy the content from

[**copyAttributes**(source, excludeMatrix)](https://paperjs.org/reference/raster/#copyattributes-source-excludeMatrix)

Copies all attributes of the specified item over to this item. This includes its style, visibility, matrix, pivot, blend-mode, opacity, selection state, data, name, etc.

#### Parameters:

* source:
  [Item](https://paperjs.org/reference/item)
  — the item to copy the attributes from
* excludeMatrix:
  Boolean
  — whether to exclude the transformation matrix when copying all attributes

[**rasterize**([options])](https://paperjs.org/reference/raster/#rasterize)

Rasterizes the item into a newly created Raster object. The item itself is not removed after rasterization.

#### Options:

* options.resolution: Number — the desired resolution to be used when rasterizing, in pixels per inch (DPI). If not specified, the value of `view.resolution` is used by default. — default: view.resolution
* options.raster: [Raster](https://paperjs.org/reference/raster) — specifies a raster to be reused when rasterizing. If the raster has the desired size already, then the underlying canvas is reused and no new memory needs to be allocated. If no raster is provided, a new raster item is created and returned instead. — default: null
* options.insert: Boolean — specifies whether the raster should be inserted into the scene graph. When set to `true`, it is inserted above the rasterized item. — default: true

#### Parameters:

* options:
  Object
  — the rasterization options
  — optional, default: {}

#### Returns:

* [Raster](https://paperjs.org/reference/raster) — the reused raster or the newly created raster item

#### Example:Rasterizing an item:

Run

### Geometric Tests

[**contains**(point)](https://paperjs.org/reference/raster/#contains-point)

Checks whether the item’s geometry contains the given point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to check for

#### Returns:

* Boolean

#### Example:Click within and outside the star below Create a star shaped path:

Run

[**isInside**(rect)](https://paperjs.org/reference/raster/#isinside-rect)

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the rectangle to check against

#### Returns:

* Boolean

[**intersects**(item)](https://paperjs.org/reference/raster/#intersects-item)

Checks whether the item overlaps with the given item: whether their outlines cross, or one contains the other, as [rectangle.intersects(rect)](https://paperjs.org/reference/rectangle#intersects-rect) does for rectangles. Items other than paths and shapes are checked through their bounds. To only check whether outlines cross, use [pathItem.getIntersections(path)](https://paperjs.org/reference/pathitem#getintersections-path).

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true if the items overlap, false otherwise

### Hit-testing, Fetching and Matching Items

[**hitTest**(point[, options])](https://paperjs.org/reference/raster/#hittest-point)

Performs a hit-test on the item and its children (if it is a [Group](https://paperjs.org/reference/group) or [Layer](https://paperjs.org/reference/layer)) at the location of the specified point, returning the first found hit.

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
  — the point where the hit-test should be performed (in global coordinates system).
* options:
  Object
  — optional, default: { fill: true, stroke: true, segments: true, tolerance: settings.hitTolerance }

#### Returns:

* [HitResult](https://paperjs.org/reference/hitresult) — a hit result object describing what exactly was hit or `null` if nothing was hit

[**hitTestAll**(point[, options])](https://paperjs.org/reference/raster/#hittestall-point)

Performs a hit-test on the item and its children (if it is a [Group](https://paperjs.org/reference/group) or [Layer](https://paperjs.org/reference/layer)) at the location of the specified point, returning all found hits.

The options object allows you to control the specifics of the hit- test. See [hitTest(point[, options])](https://paperjs.org/reference/item#hittest-point) for a list of all options.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point where the hit-test should be performed (in global coordinates system).
* options:
  Object
  — optional, default: { fill: true, stroke: true, segments: true, tolerance: settings.hitTolerance }

#### Returns:

* Array of [HitResult](https://paperjs.org/reference/hitresult) objects — hit result objects for all hits, describing what exactly was hit or `null` if nothing was hit

#### See also:

* [hitTest(point[, options])](https://paperjs.org/reference/item#hittest-point);

[**matches**(options)](https://paperjs.org/reference/raster/#matches-options)

Checks whether the item matches the criteria described by the given object, by iterating over all of its properties and matching against their values through [matches(name, compare)](https://paperjs.org/reference/item#matches-name-compare).

See [project.getItems(options)](https://paperjs.org/reference/project#getitems-options) for a selection of illustrated examples.

#### Parameters:

* options:
  Object⟋Function
  — the criteria to match against

#### Returns:

* Boolean — true if the item matches all the criteria, false otherwise

#### See also:

* [getItems(options)](https://paperjs.org/reference/item#getitems-options)

[**matches**(name, compare)](https://paperjs.org/reference/raster/#matches-name-compare)

Checks whether the item matches the given criteria. Extended matching is possible by providing a compare function or a regular expression. Matching points, colors only work as a comparison of the full object, not partial matching (e.g. only providing the x-coordinate to match all points with that x-value). Partial matching does work for [item.data](https://paperjs.org/reference/item#data).

See [project.getItems(options)](https://paperjs.org/reference/project#getitems-options) for a selection of illustrated examples.

#### Parameters:

* name:
  String
  — the name of the state to match against
* compare:
  Object
  — the value, function or regular expression to compare against

#### Returns:

* Boolean — true if the item matches the state, false otherwise

#### See also:

* [getItems(options)](https://paperjs.org/reference/item#getitems-options)

[**getItems**(options)](https://paperjs.org/reference/raster/#getitems-options)

Fetch the descendants (children or children of children) of this item that match the properties in the specified object. Extended matching is possible by providing a compare function or regular expression. Matching points, colors only work as a comparison of the full object, not partial matching (e.g. only providing the x- coordinate to match all points with that x-value). Partial matching does work for [item.data](https://paperjs.org/reference/item#data).

Matching items against a rectangular area is also possible, by setting either `options.inside` or `options.overlapping` to a rectangle describing the area in which the items either have to be fully or partly contained.

See [project.getItems(options)](https://paperjs.org/reference/project#getitems-options) for a selection of illustrated examples.

#### Options:

* options.recursive: Boolean — whether to loop recursively through all children, or stop at the current level — default: true
* options.match: Function — a match function to be called for each item, allowing the definition of more flexible item checks that are not bound to properties. If no other match properties are defined, this function can also be passed instead of the `options` object
* options.class: Function — the constructor function of the item type to match against
* options.inside: [Rectangle](https://paperjs.org/reference/rectangle) — the rectangle in which the items need to be fully contained
* options.overlapping: [Rectangle](https://paperjs.org/reference/rectangle) — the rectangle with which the items need to at least partly overlap

#### Parameters:

* options:
  Object⟋Function
  — the criteria to match against

#### Returns:

* Array of [Item](https://paperjs.org/reference/item) objects — the list of matching descendant items, in their stacking order from bottom to top, with each item listed before its own descendants

#### See also:

* [matches(options)](https://paperjs.org/reference/item#matches-options)

[**getItem**(options)](https://paperjs.org/reference/raster/#getitem-options)

Fetch the first descendant (child or child of child) of this item that matches the properties in the specified object. Extended matching is possible by providing a compare function or regular expression. Matching points, colors only work as a comparison of the full object, not partial matching (e.g. only providing the x- coordinate to match all points with that x-value). Partial matching does work for [item.data](https://paperjs.org/reference/item#data). See [project.getItems(match)](https://paperjs.org/reference/project#getitems-match) for a selection of illustrated examples.

#### Parameters:

* options:
  Object⟋Function
  — the criteria to match against

#### Returns:

* [Item](https://paperjs.org/reference/item) — the first descendant item matching the given criteria

#### See also:

* [getItems(options)](https://paperjs.org/reference/item#getitems-options)

### Importing / Exporting JSON and SVG

[**exportJSON**([options])](https://paperjs.org/reference/raster/#exportjson)

Exports (serializes) the item with its content and child items to a JSON data string.

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

[**importJSON**(json)](https://paperjs.org/reference/raster/#importjson-json)

Imports (deserializes) the stored JSON data into this item. If the data describes an item of the same class or a parent class of the item, the data is imported into the item itself. If not, the imported item is added to this item’s [item.children](https://paperjs.org/reference/item#children) list. Note that not all type of items can have children.

#### Parameters:

* json:
  String
  — the JSON data to import from

#### Returns:

* [Item](https://paperjs.org/reference/item)

[**exportSVG**([options])](https://paperjs.org/reference/raster/#exportsvg)

Exports the item with its content and child items as an SVG DOM.

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

* SVGElement⟋String — the item converted to an SVG node or a `String` depending on `option.asString` value

[**importSVG**(svg[, options])](https://paperjs.org/reference/raster/#importsvg-svg)

Converts the provided SVG content into Paper.js items and adds them to the this item’s children list. Note that the item is not cleared first. You can call [item.removeChildren](https://paperjs.org/reference/item#removechildren)() to do so.

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
* options.insert: Boolean — whether the imported items should be added to the item that `importSVG()` is called on — default: true
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

[**importSVG**(svg, onLoad)](https://paperjs.org/reference/raster/#importsvg-svg-onLoad)

Imports the provided external SVG file, converts it into Paper.js items and adds them to the this item’s children list. Note that the item is not cleared first. You can call [item.removeChildren](https://paperjs.org/reference/item#removechildren)() to do so.

#### Parameters:

* svg:
  SVGElement⟋String
  — the URL of the SVG file to fetch.
* onLoad:
  Function
  — the callback function to call once the SVG content is loaded from the given URL receiving two arguments: the converted `item` and the original `svg` data as a string. Only required when loading from external files.

#### Returns:

* [Item](https://paperjs.org/reference/item) — the newly created Paper.js item containing the converted SVG content

### Hierarchy Operations

[**addChild**(item)](https://paperjs.org/reference/raster/#addchild-item)

Adds the specified item as a child of this item at the end of the its [children](https://paperjs.org/reference/item#children) list. You can use this function for groups, compound paths and layers.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to be added as a child

#### Returns:

* [Item](https://paperjs.org/reference/item) — the added item, or `null` if adding was not possible

[**insertChild**(index, item)](https://paperjs.org/reference/raster/#insertchild-index-item)

Inserts the specified item as a child of this item at the specified index in its [children](https://paperjs.org/reference/item#children) list. You can use this function for groups, compound paths and layers.

#### Parameters:

* index:
  Number
  — the index at which to insert the item
* item:
  [Item](https://paperjs.org/reference/item)
  — the item to be inserted as a child

#### Returns:

* [Item](https://paperjs.org/reference/item) — the inserted item, or `null` if inserting was not possible

[**addChildren**(items)](https://paperjs.org/reference/raster/#addchildren-items)

Adds the specified items as children of this item at the end of the its children list. You can use this function for groups, compound paths and layers.

#### Parameters:

* items:
  Array of [Item](https://paperjs.org/reference/item) objects
  — the items to be added as children

#### Returns:

* Array of [Item](https://paperjs.org/reference/item) objects — the added items, or `null` if adding was not possible

[**insertChildren**(index, items)](https://paperjs.org/reference/raster/#insertchildren-index-items)

Inserts the specified items as children of this item at the specified index in its [children](https://paperjs.org/reference/item#children) list. You can use this function for groups, compound paths and layers.

#### Parameters:

* index:
  Number
* items:
  Array of [Item](https://paperjs.org/reference/item) objects
  — the items to be appended as children

#### Returns:

* Array of [Item](https://paperjs.org/reference/item) objects — the inserted items, or `null` if inserted was not possible

[**insertAbove**(item)](https://paperjs.org/reference/raster/#insertabove-item)

Inserts this item above the specified item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item above which it should be inserted

#### Returns:

* [Item](https://paperjs.org/reference/item) — the inserted item, or `null` if inserting was not possible

[**insertBelow**(item)](https://paperjs.org/reference/raster/#insertbelow-item)

Inserts this item below the specified item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item below which it should be inserted

#### Returns:

* [Item](https://paperjs.org/reference/item) — the inserted item, or `null` if inserting was not possible

[**sendToBack**()](https://paperjs.org/reference/raster/#sendtoback)

Sends this item to the back of all other items within the same parent.

[**bringToFront**()](https://paperjs.org/reference/raster/#bringtofront)

Brings this item to the front of all other items within the same parent.

[**addTo**(owner)](https://paperjs.org/reference/raster/#addto-owner)

Adds it to the specified owner, which can be either a [Item](https://paperjs.org/reference/item) or a [Project](https://paperjs.org/reference/project).

#### Parameters:

* owner:
  [Project](https://paperjs.org/reference/project)⟋[Layer](https://paperjs.org/reference/layer)⟋[Group](https://paperjs.org/reference/group)⟋[CompoundPath](https://paperjs.org/reference/compoundpath)
  — the item or project to add the item to

#### Returns:

* [Item](https://paperjs.org/reference/item) — the item itself, if it was successfully added

[**copyTo**(owner)](https://paperjs.org/reference/raster/#copyto-owner)

Clones the item and adds it to the specified owner, which can be either a [Item](https://paperjs.org/reference/item) or a [Project](https://paperjs.org/reference/project).

#### Parameters:

* owner:
  [Project](https://paperjs.org/reference/project)⟋[Layer](https://paperjs.org/reference/layer)⟋[Group](https://paperjs.org/reference/group)⟋[CompoundPath](https://paperjs.org/reference/compoundpath)
  — the item or project to copy the item to

#### Returns:

* [Item](https://paperjs.org/reference/item) — the new copy of the item, if it was successfully added

[**reduce**([options])](https://paperjs.org/reference/raster/#reduce)

If this is a group, layer or compound-path with only one child-item, the child-item is moved outside and the parent is erased. Otherwise, the item itself is returned unmodified.

#### Parameters:

* options:
  Object
  — the options passed on to [path.reduce(options)](https://paperjs.org/reference/path#reduce-options)
  — optional

#### Returns:

* [Item](https://paperjs.org/reference/item) — the reduced item

[**remove**()](https://paperjs.org/reference/raster/#remove)

Removes the item and all its children from the project. The item is not destroyed and can be inserted again after removal.

#### Returns:

* Boolean — true if the item was removed, false otherwise

[**replaceWith**(...item)](https://paperjs.org/reference/raster/#replacewith-item)

Replaces this item with the provided new items which will take its place in the project hierarchy instead, in the given order. This also ungroups a group, e.g. `group.replaceWith(…group.children)`, but note that the items keep their own matrices, see [group.ungroup](https://paperjs.org/reference/group#ungroup)().

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the items that will replace this item

#### Returns:

* Boolean — true if the item was replaced, false otherwise

[**removeChildren**()](https://paperjs.org/reference/raster/#removechildren)

Removes all of the item’s [children](https://paperjs.org/reference/item#children) (if any).

#### Returns:

* Array of [Item](https://paperjs.org/reference/item) objects — an array containing the removed items

[**removeChildren**(start[, end])](https://paperjs.org/reference/raster/#removechildren-start)

Removes the children from the specified `start` index to and excluding the `end` index from the parent’s [children](https://paperjs.org/reference/item#children) array.

#### Parameters:

* start:
  Number
  — the beginning index, inclusive
* end:
  Number
  — the ending index, exclusive
  — optional, default: children.length

#### Returns:

* Array of [Item](https://paperjs.org/reference/item) objects — an array containing the removed items

[**reverseChildren**()](https://paperjs.org/reference/raster/#reversechildren)

Reverses the order of the item’s children

### Tests

[**isEmpty**([recursively])](https://paperjs.org/reference/raster/#isempty)

Specifies whether the item has any content or not. The meaning of what content is differs from type to type. For example, a [Group](https://paperjs.org/reference/group) with no children, a [TextItem](https://paperjs.org/reference/textitem) with no text content and a [Path](https://paperjs.org/reference/path) with no segments all are considered empty.

#### Parameters:

* recursively:
  Boolean
  — whether an item with children should be considered empty if all its descendants are empty
  — optional, default: false

#### Returns:

* Boolean

### Style Tests

[**hasFill**()](https://paperjs.org/reference/raster/#hasfill)

Checks whether the item has a visible fill, a fill color with an alpha above 0. Hit-tests also hit transparent fills, see [hitTest](https://paperjs.org/reference/item#hittest).

#### Returns:

* Boolean — true if the item has a visible fill, false otherwise

[**hasStroke**()](https://paperjs.org/reference/raster/#hasstroke)

Checks whether the item has a stroke.

#### Returns:

* Boolean — true if the item has a stroke, false otherwise

[**hasShadow**()](https://paperjs.org/reference/raster/#hasshadow)

Checks whether the item has a shadow.

#### Returns:

* Boolean — true if the item has a shadow, false otherwise

### Hierarchy Tests

[**hasChildren**()](https://paperjs.org/reference/raster/#haschildren)

Checks if the item contains any children items.

#### Returns:

* Boolean — true it has one or more children, false otherwise

[**isInserted**()](https://paperjs.org/reference/raster/#isinserted)

Checks whether the item and all its parents are inserted into scene graph or not.

#### Returns:

* Boolean — true if the item is inserted into the scene graph, false otherwise

[**isAbove**(item)](https://paperjs.org/reference/raster/#isabove-item)

Checks if this item is above the specified item in the stacking order of the project. If one item is a descendant of the other, neither is above the other and `false` is returned.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true if it is above the specified item, false otherwise

[**isBelow**(item)](https://paperjs.org/reference/raster/#isbelow-item)

Checks if the item is below the specified item in the stacking order of the project. If one item is a descendant of the other, neither is below the other and `false` is returned.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true if it is below the specified item, false otherwise

[**isParent**(item)](https://paperjs.org/reference/raster/#isparent-item)

Checks whether the specified item is the parent of the item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true if it is the parent of the item, false otherwise

[**isChild**(item)](https://paperjs.org/reference/raster/#ischild-item)

Checks whether the specified item is a child of the item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true it is a child of the item, false otherwise

[**isDescendant**(item)](https://paperjs.org/reference/raster/#isdescendant-item)

Checks if the item is contained within the specified item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true if it is inside the specified item, false otherwise

[**isAncestor**(item)](https://paperjs.org/reference/raster/#isancestor-item)

Checks if the item is an ancestor of the specified item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true if the item is an ancestor of the specified item, false otherwise

[**isSibling**(item)](https://paperjs.org/reference/raster/#issibling-item)

Checks if the item is an a sibling of the specified item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the item to check against

#### Returns:

* Boolean — true if the item is aa sibling of the specified item, false otherwise

[**isGroupedWith**(item)](https://paperjs.org/reference/raster/#isgroupedwith-item)

Checks whether the item is grouped with the specified item.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)

#### Returns:

* Boolean — true if the items are grouped together, false otherwise

### Transform Functions

[**translate**(delta)](https://paperjs.org/reference/raster/#translate-delta)

Translates (moves) the item by the given offset views.

#### Parameters:

* delta:
  [Point](https://paperjs.org/reference/point)
  — the offset to translate the item by

[**rotate**(angle[, center])](https://paperjs.org/reference/raster/#rotate-angle)

Rotates the item by a given angle around the given center point.

Angles are oriented clockwise and measured in degrees.

#### Parameters:

* angle:
  Number
  — the rotation angle
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [item.position](https://paperjs.org/reference/item#position)

#### See also:

* [matrix.rotate(angle[, center])](https://paperjs.org/reference/matrix#rotate-angle)

#### Example:Rotating an item:

Run

#### Example:Rotating an item around a specific point:

Run

[**scale**(scale[, center])](https://paperjs.org/reference/raster/#scale-scale)

Scales the item by the given value from its center point, or optionally from a supplied point.

#### Parameters:

* scale:
  Number
  — the scale factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [item.position](https://paperjs.org/reference/item#position)

#### Example:Scaling an item from its center point:

Run

#### Example:Scaling an item from a specific point:

Run

[**scale**(hor, ver[, center])](https://paperjs.org/reference/raster/#scale-hor-ver)

Scales the item by the given values from its center point, or optionally from a supplied point.

#### Parameters:

* hor:
  Number
  — the horizontal scale factor
* ver:
  Number
  — the vertical scale factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [item.position](https://paperjs.org/reference/item#position)

#### Example:Scaling an item horizontally by 300%:

Run

[**shear**(shear[, center])](https://paperjs.org/reference/raster/#shear-shear)

Shears the item by the given value from its center point, or optionally by a supplied point.

#### Parameters:

* shear:
  [Point](https://paperjs.org/reference/point)
  — the horizontal and vertical shear factors as a point
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [item.position](https://paperjs.org/reference/item#position)

#### See also:

* [matrix.shear(shear[, center])](https://paperjs.org/reference/matrix#shear-shear)

[**shear**(hor, ver[, center])](https://paperjs.org/reference/raster/#shear-hor-ver)

Shears the item by the given values from its center point, or optionally by a supplied point.

#### Parameters:

* hor:
  Number
  — the horizontal shear factor
* ver:
  Number
  — the vertical shear factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [item.position](https://paperjs.org/reference/item#position)

#### See also:

* [matrix.shear(hor, ver[, center])](https://paperjs.org/reference/matrix#shear-hor-ver)

[**skew**(skew[, center])](https://paperjs.org/reference/raster/#skew-skew)

Skews the item by the given angles from its center point, or optionally by a supplied point.

#### Parameters:

* skew:
  [Point](https://paperjs.org/reference/point)
  — the horizontal and vertical skew angles in degrees
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [item.position](https://paperjs.org/reference/item#position)

#### See also:

* [matrix.shear(skew[, center])](https://paperjs.org/reference/matrix#shear-skew)

[**skew**(hor, ver[, center])](https://paperjs.org/reference/raster/#skew-hor-ver)

Skews the item by the given angles from its center point, or optionally by a supplied point.

#### Parameters:

* hor:
  Number
  — the horizontal skew angle in degrees
* ver:
  Number
  — the vertical sskew angle in degrees
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [item.position](https://paperjs.org/reference/item#position)

#### See also:

* [matrix.shear(hor, ver[, center])](https://paperjs.org/reference/matrix#shear-hor-ver)

[**transform**(matrix)](https://paperjs.org/reference/raster/#transform-matrix)

Transform the item.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix by which the item shall be transformed

[**globalToLocal**(point)](https://paperjs.org/reference/raster/#globaltolocal-point)

Converts the specified point from global project coordinate space to the item’s own local coordinate space.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to be transformed

#### Returns:

* [Point](https://paperjs.org/reference/point) — the transformed point as a new instance

[**localToGlobal**(point)](https://paperjs.org/reference/raster/#localtoglobal-point)

Converts the specified point from the item’s own local coordinate space to the global project coordinate space.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to be transformed

#### Returns:

* [Point](https://paperjs.org/reference/point) — the transformed point as a new instance

[**parentToLocal**(point)](https://paperjs.org/reference/raster/#parenttolocal-point)

Converts the specified point from the parent’s coordinate space to item’s own local coordinate space.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to be transformed

#### Returns:

* [Point](https://paperjs.org/reference/point) — the transformed point as a new instance

[**localToParent**(point)](https://paperjs.org/reference/raster/#localtoparent-point)

Converts the specified point from the item’s own local coordinate space to the parent’s coordinate space.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to be transformed

#### Returns:

* [Point](https://paperjs.org/reference/point) — the transformed point as a new instance

[**fitBounds**(rectangle[, fit])](https://paperjs.org/reference/raster/#fitbounds-rectangle)

Transform the item so that its [bounds](https://paperjs.org/reference/item#bounds) are centered in the specified rectangle and fitted to it as described by `fit`.

#### Parameters:

* rectangle:
  [Rectangle](https://paperjs.org/reference/rectangle)
* fit:
  String⟋Boolean
  — how to fit the item, as in CSS’s `object-fit`: `'contain'` fits all of it within the rectangle, `'cover'` makes it cover the whole rectangle, and `'fill'` stretches it to the rectangle, changing its aspect ratio. The deprecated `true` and `false` stand for `'cover'` and `'contain'`.
  — optional, default: ‘contain’

#### Example:Fitting an item to the bounding rectangle of another item's bounding rectangle:

Run

#### Example:Fitting an item to the bounding rectangle of another item's bounding rectangle, covering all of it:

Run

#### Example:Fitting an item to the bounding rectangle of the view

Run

### Event Handling

[**on**(type, function)](https://paperjs.org/reference/raster/#on-type-function)

Attaches an event handler to the item.

#### Parameters:

* type:
  String
  — the type of event: ‘frame’, mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’
* function:
  Function
  — the function to be called when the event occurs, receiving a [MouseEvent](https://paperjs.org/reference/mouseevent) or [Event](https://paperjs.org/reference/event) object as its sole argument

#### Returns:

* [Item](https://paperjs.org/reference/item) — this item itself, so calls can be chained

#### Example:Change the fill color of the path to red when the mouse enters its shape and back to black again, when it leaves its shape.

Run

[**on**(object)](https://paperjs.org/reference/raster/#on-object)

Attaches one or more event handlers to the item.

#### Parameters:

* object:
  Object
  — an object containing one or more of the following properties: frame, mousedown, mouseup, mousedrag, click, doubleclick, mousemove, mouseenter, mouseleave

#### Returns:

* [Item](https://paperjs.org/reference/item) — this item itself, so calls can be chained

#### Example:Change the fill color of the path to red when the mouse enters its shape and back to black again, when it leaves its shape.

Run

#### Example:When you click the mouse, you create new circle shaped items. When you move the mouse over the item, its fill color is set to red. When you move the mouse outside again, its fill color is set black.

Run

[**off**(type, function)](https://paperjs.org/reference/raster/#off-type-function)

Detach an event handler from the item.

#### Parameters:

* type:
  String
  — the type of event: ‘frame’, mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’
* function:
  Function
  — the function to be detached

#### Returns:

* [Item](https://paperjs.org/reference/item) — this item itself, so calls can be chained

[**off**(object)](https://paperjs.org/reference/raster/#off-object)

Detach one or more event handlers to the item.

#### Parameters:

* object:
  Object
  — an object containing one or more of the following properties: frame, mousedown, mouseup, mousedrag, click, doubleclick, mousemove, mouseenter, mouseleave

#### Returns:

* [Item](https://paperjs.org/reference/item) — this item itself, so calls can be chained

[**emit**(type, event)](https://paperjs.org/reference/raster/#emit-type-event)

Emit an event on the item.

#### Parameters:

* type:
  String
  — the type of event: ‘frame’, mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’
* event:
  Object
  — an object literal containing properties describing the event

#### Returns:

* Boolean — true if the event had listeners, false otherwise

[**responds**(type)](https://paperjs.org/reference/raster/#responds-type)

Check if the item has one or more event handlers of the specified type.

#### Parameters:

* type:
  String
  — the type of event: ‘frame’, mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’

#### Returns:

* Boolean — true if the item has one or more event handlers of the specified type, false otherwise

### Remove On Event

[**removeOn**(options)](https://paperjs.org/reference/raster/#removeon-options)

Removes the item when the events specified in the passed options object occur.

#### Options:

* options.move: Boolean — remove the item when the next [tool.onMouseMove](https://paperjs.org/reference/tool#onmousemove) event is fired.
* options.drag: Boolean — remove the item when the next [tool.onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) event is fired.
* options.down: Boolean — remove the item when the next [tool.onMouseDown](https://paperjs.org/reference/tool#onmousedown) event is fired.
* options.up: Boolean — remove the item when the next [tool.onMouseUp](https://paperjs.org/reference/tool#onmouseup) event is fired.

#### Parameters:

* options:
  Object

#### Example:Click and drag below:

Run

[**removeOnMove**()](https://paperjs.org/reference/raster/#removeonmove)

Removes the item when the next [tool.onMouseMove](https://paperjs.org/reference/tool#onmousemove) event is fired.

#### Example:Move your mouse below:

Run

[**removeOnDown**()](https://paperjs.org/reference/raster/#removeondown)

Removes the item when the next [tool.onMouseDown](https://paperjs.org/reference/tool#onmousedown) event is fired.

#### Example:Click a few times below:

Run

[**removeOnDrag**()](https://paperjs.org/reference/raster/#removeondrag)

Removes the item when the next [tool.onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) event is fired.

#### Example:Click and drag below:

Run

[**removeOnUp**()](https://paperjs.org/reference/raster/#removeonup)

Removes the item when the next [tool.onMouseUp](https://paperjs.org/reference/tool#onmouseup) event is fired.

#### Example:Click a few times below:

Run

### Tweening Functions

[**tween**(from, to, options)](https://paperjs.org/reference/raster/#tween-from-to-options)

Tween item between two states.

#### Options:

* options.duration: Number — the duration of the tweening
* options.easing: Function⟋String — an easing function or the type of the easing: ‘linear’ ‘easeInQuad’ ‘easeOutQuad’ ‘easeInOutQuad’ ‘easeInCubic’ ‘easeOutCubic’ ‘easeInOutCubic’ ‘easeInQuart’ ‘easeOutQuart’ ‘easeInOutQuart’ ‘easeInQuint’ ‘easeOutQuint’ ‘easeInOutQuint’ ‘easeInSine’ ‘easeOutSine’ ‘easeInOutSine’ ‘easeInExpo’ ‘easeOutExpo’ ‘easeInOutExpo’ ‘easeInCirc’ ‘easeOutCirc’ ‘easeInOutCirc’ — default: ‘linear’
* options.start: Boolean — whether to start tweening automatically — default: true

#### Parameters:

* from:
  Object
  — the state at the start of the tweening
* to:
  Object
  — the state at the end of the tweening
* options:
  Object⟋Number
  — the options or the duration

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### Example:Tween fillColor:

Run

#### Example:Tween rotation:

Run

[**tween**(to, options)](https://paperjs.org/reference/raster/#tween-to-options)

Tween item to a state.

#### Parameters:

* to:
  Object
  — the state at the end of the tweening
* options:
  Object⟋Number
  — the options or the duration

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### See also:

* [item.tween(from, to, options)](https://paperjs.org/reference/item#tween-from-to-options)

#### Example:Tween a nested property with relative values

Run

[**tween**(options)](https://paperjs.org/reference/raster/#tween-options)

Tween item.

#### Parameters:

* options:
  Object⟋Number
  — the options or the duration

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### See also:

* [item.tween(from, to, options)](https://paperjs.org/reference/item#tween-from-to-options)

#### Example:Start an empty tween and just use the update callback:

Run

[**tweenTo**(to, options)](https://paperjs.org/reference/raster/#tweento-to-options)

Tween item to a state.

#### Parameters:

* to:
  Object
  — the state at the end of the tweening
* options:
  Object⟋Number
  — the options or the duration

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### See also:

* [item.tween(to, options)](https://paperjs.org/reference/item#tween-to-options)

[**tweenFrom**(from, options)](https://paperjs.org/reference/raster/#tweenfrom-from-options)

Tween item from a state to its state before the tweening.

#### Parameters:

* from:
  Object
  — the state at the start of the tweening
* options:
  Object⟋Number
  — the options or the duration

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### See also:

* [item.tween(from, to, options)](https://paperjs.org/reference/item#tween-from-to-options)

#### Example:Tween fillColor from red to the path's initial fillColor:

Run
