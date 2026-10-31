---
source: https://p5js.org/reference/p5/loadStrokeShader/
title: "loadStrokeShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Loads a new shader from a file that can change how strokes are drawn. Pass the resulting shader into the [`strokeShader()`](https://p5js.org/reference/p5/strokeShader/) function to apply it to any strokes you draw.

Since this function loads data from another file, it returns a `Promise`. Use it in an `async function setup`, and `await` its result.

```js
let myShader;
async function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = await loadStrokeShader('myMaterial.js');
}

function draw() {
  background(255);
  strokeShader(myShader);
  strokeWeight(30);
  line(
    -width/3,
    sin(millis()*0.001) * height/4,
    width/3,
    sin(millis()*0.001 + 1) * height/4
  );
}
```

Inside your shader file, you can call p5.strands hooks to change parts of the shader. For example, you might use the `worldInputs` hook to change each vertex, or you might use the `pixelInputs` hook to change each pixel on the surface of a stroke.

```js
// myMaterial.js
pixelInputs.begin();
let opacity = 1 - smoothstep(
  0,
  15,
  length(pixelInputs.position - pixelInputs.center)
);
pixelInputs.color.a *= opacity;
pixelInputs.end();
```

Read the reference for [`buildStrokeShader`](https://p5js.org/reference/p5/buildStrokeShader/), the version of `loadStrokeShader` that takes in a function instead of a separate file, for a full list of hooks you can use and examples for each.

The second parameter, `successCallback`, is optional. If a function is passed, as in `loadStrokeShader('myShader.js', onLoaded)`, then the `onLoaded()` function will be called once the shader loads. The shader will be passed to `onLoaded()` as its only argument. The return value of `handleData()`, if present, will be used as the final return value of `loadStrokeShader('myShader.js', onLoaded)`.

## Examples

## Syntax

`loadStrokeShader(url, [onSuccess], [onFailure])`

## Parameters

url

String: The URL of your p5.strands JavaScript file.

onSuccess

Function: A callback function to run when loading completes.

onFailure

Function: A callback function to run when loading fails.

## Returns

Promise<p5.Shader>: The stroke shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L2271) and open a pull request!

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
