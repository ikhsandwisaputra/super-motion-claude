---
source: https://p5js.org/reference/p5/buildMaterialShader/
title: "buildMaterialShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Create a new shader that can change how fills are drawn. Pass the resulting shader into the [`shader()`](https://p5js.org/reference/p5/shader/) function to apply it to any fills you draw.

The main way to use `buildMaterialShader` is to pass a function in as a parameter. This will let you create a shader using p5.strands.

In your function, you can call hooks to change part of the shader. In a material shader, these are the hooks available:

* [`objectInputs`](https://p5js.org/reference/p5/objectInputs/): Update vertices before any positioning has been applied. Your function gets run on every vertex.
* [`worldInputs`](https://p5js.org/reference/p5/worldInputs/): Update vertices after transformations have been applied. Your function gets run on every vertex.
* [`cameraInputs`](https://p5js.org/reference/p5/cameraInputs/): Update vertices after transformations have been applied, relative to the camera. Your function gets run on every vertex.
* [`pixelInputs`](https://p5js.org/reference/p5/pixelInputs/): Update property values on pixels on the surface of a shape. Your function gets run on every pixel.
* [`combineColors`](https://p5js.org/reference/p5/combineColors/): Control how the ambient, diffuse, and specular components of lighting are combined into a single color on the surface of a shape. Your function gets run on every pixel.
* [`finalColor`](https://p5js.org/reference/p5/finalColor/): Update or replace the pixel color on the surface of a shape. Your function gets run on every pixel.

Read the linked reference page for each hook for more information about how to use them.

One thing you can do with a material shader is animate the positions of vertices over time:

There are also many uses in updating values per pixel. This can be a good way to give your sketch texture and detail. For example, instead of having a single shininess or metalness value for a whole shape, you could vary it in different spots on its surface:

A technique seen often in games called bump mapping is to vary the normal, which is the orientation of the surface, per pixel to create texture rather than using many tightly packed vertices. Sometimes this can come from bump images, but it can also be done generatively with math.

You can also update the final color directly instead of modifying lighting settings. Sometimes in photographs, a light source is placed behind the subject to create rim lighting, where the edges of the subject are lit up. This can be simulated by adding white to the final color on parts of the shape that are facing away from the camera.

Like the `modify()` method on shaders, advanced users can also fill in hooks using [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/) instead of JavaScript. Read the [reference entry for `modify()`](https://p5js.org/reference/p5.Shader/modify/) for more info.

## Examples

## Syntax

`buildMaterialShader(callback, [scope])``buildMaterialShader(hooks, [scope])`

## Parameters

callback

Function: A function building a p5.strands shader.

scope

Object: An optional scope object passed to .modify().

hooks

Object: An object specifying p5.strands hooks in GLSL.

## Returns

p5.Shader: The material shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L1570) and open a pull request!

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

## Example code (extracted)

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(material);
}

function material() {
  let time = millis();
  worldInputs.begin();
  worldInputs.position.y +=
    20 * sin(time * 0.001 + worldInputs.position.x * 0.05);
  worldInputs.end();
}

function draw() {
  background(255);
  shader(myShader);
  lights();
  noStroke();
  fill('red');
  sphere(50);
}
```

```js
let myShader;
let environment;

async function setup() {
  environment = await loadImage('/assets/outdoor_spheremap.jpg');

  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(material);
}

function material() {
  pixelInputs.begin();
  let factor = sin(
    TWO_PI * (pixelInputs.texCoord.x + pixelInputs.texCoord.y)
  );
  pixelInputs.shininess = mix(1, 100, factor);
  pixelInputs.metalness = factor;
  pixelInputs.end();
}

function draw() {
  panorama(environment);
  ambientLight(100);
  imageLight(environment);
  rotateY(millis() * 0.001);
  shader(myShader);
  noStroke();
  fill(255);
  specularMaterial(150);
  sphere(50);
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(material);
}

function material() {
  pixelInputs.begin();
  pixelInputs.normal.x += 0.2 * sin(
    sin(TWO_PI * dot(pixelInputs.texCoord.yx, vec2(10, 25)))
  );
  pixelInputs.normal.y += 0.2 * sin(
    sin(TWO_PI * dot(pixelInputs.texCoord, vec2(10, 25)))
  );
  pixelInputs.normal = normalize(pixelInputs.normal);
  pixelInputs.end();
}

function draw() {
  background(255);
  shader(myShader);
  ambientLight(150);
  pointLight(
    255, 255, 255,
    100*cos(frameCount*0.04), -50, 100*sin(frameCount*0.04)
  );
  noStroke();
  fill('red');
  shininess(200);
  specularMaterial(255);
  sphere(50);
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(material);
}

function material() {
  let myNormal = sharedVec3();

  pixelInputs.begin();
  myNormal = pixelInputs.normal;
  pixelInputs.end();

  finalColor.begin();
  finalColor.set(mix(
    [1, 1, 1, 1],
    finalColor.color,
    abs(dot(myNormal, [0, 0, 1]))
  ));
  finalColor.end();
}

function draw() {
  background(255);
  rotateY(millis() * 0.001);
  shader(myShader);
  lights();
  noStroke();
  fill('red');
  torus(30);
}
```
