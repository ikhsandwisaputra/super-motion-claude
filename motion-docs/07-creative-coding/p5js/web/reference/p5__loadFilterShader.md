---
source: https://p5js.org/reference/p5/loadFilterShader/
title: "loadFilterShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Loads a new shader from a file that can be applied to the contents of the canvas with [`filter()`](https://p5js.org/reference/p5/filter/). Pass the resulting shader into `filter()` to apply it.

Since this function loads data from another file, it returns a `Promise`. Use it in an `async function setup`, and `await` its result.

```js
async function setup() {
  createCanvas(50, 50, WEBGL);
  let img = await loadImage('/assets/bricks.jpg');
  let myFilter = await loadFilterShader('myFilter.js');

  image(img, -50, -50);
  filter(myFilter);
  describe('Bricks tinted red');
}
```

Inside your shader file, you can use p5.strands hooks to change parts of the shader. For a filter shader, use `filterColor` to change each pixel on the canvas.

```js
// myFilter.js
filterColor.begin();
let result = getTexture(
  filterColor.canvasContent,
  filterColor.texCoord
);
// Zero out the green and blue channels, leaving red
result.g = 0;
result.b = 0;
filterColor.set(result);
filterColor.end();
```

Read the reference for [`buildFilterShader`](https://p5js.org/reference/p5/buildFilterShader/), the version of `loadFilterShader` that takes in a function instead of a separate file, for more examples.

The second parameter, `successCallback`, is optional. If a function is passed, as in `loadFilterShader('myShader.js', onLoaded)`, then the `onLoaded()` function will be called once the shader loads. The shader will be passed to `onLoaded()` as its only argument. The return value of `handleData()`, if present, will be used as the final return value of `loadFilterShader('myShader.js', onLoaded)`.

## Examples

## Syntax

`loadFilterShader(filename, [successCallback], [failureCallback])`

## Parameters

filename

String: path to a p5.strands JavaScript file or a GLSL fragment shader file

successCallback

Function: callback to be called once the shader is loaded. Will be passed the [p5.Shader](https://p5js.org/reference/p5/p5.Shader/) object.

failureCallback

Function: callback to be called if there is an error loading the shader. Will be passed the error event.

## Returns

Promise<p5.Shader>: a promise that resolves with a shader object

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L513) and open a pull request!

---

## Related References

* [read

  Reads data from a storage buffer back into JavaScript.](https://p5js.org/reference/p5.StorageBuffer/read/)
* [set

  Updates a single element in the buffer at a given index.](https://p5js.org/reference/p5.StorageBuffer/set/)
* [update

  Updates the data in the buffer with new values.](https://p5js.org/reference/p5.StorageBuffer/update/)
* [baseColorShader

  Returns the default shader used for fills when no lights or textures are activate.](https://p5js.org/reference/p5/baseColorShader/)
