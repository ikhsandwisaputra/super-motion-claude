---
source: https://p5js.org/reference/p5/loadFont/
title: "loadFont"
fetched: 2026-10-28
---

Loads a font and creates a [p5.Font](https://p5js.org/reference/p5/p5.Font) object. `loadFont()` can load fonts in either .otf or .ttf format. Loaded fonts can be used to style text on the canvas and in HTML elements.

The first parameter, `path`, is the path to a font file. Paths to local files should be relative. For example, `'/assets/inconsolata.otf'`. The Inconsolata font used in the following examples can be downloaded for free [here](https://www.fontsquirrel.com/fonts/inconsolata/). Paths to remote files should be URLs. For example, `'https://example.com/inconsolata.otf'`. URLs may be blocked due to browser security.

In 2D mode, `path` can take on a few other forms. It could be a path to a CSS file, such as one from [Google Fonts.](https://fonts.google.com/) It could also be a string with a [CSS `@font-face` declaration.](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/)

The second parameter, `successCallback`, is optional. If a function is passed, it will be called once the font has loaded. The callback function may use the new [p5.Font](https://p5js.org/reference/p5/p5.Font) object if needed.

The third parameter, `failureCallback`, is also optional. If a function is passed, it will be called if the font fails to load. The callback function may use the error [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/) object if needed.

Fonts can take time to load. `await` the result of `loadFont()` in [setup()](https://p5js.org/reference/p5/setup/) before using the result.

## Examples

## Syntax

`loadFont(path, [name], [options], [successCallback], [failureCallback])``loadFont(path, [successCallback], [failureCallback])`

## Parameters

path

String: path of the font or CSS file to be loaded, or a CSS `@font-face` string.

name

String: An alias that can be used for this font in `textFont()`. Defaults to the name in the font's metadata.

options

Object: An optional object with extra CSS font face descriptors, or p5.js font settings.

successCallback

Function: function called with the [p5.Font](https://p5js.org/reference/p5/p5.Font/) object after it loads.

failureCallback

Function: function called with the error [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object if the font fails to load.

## Returns

Promise<p5.Font>: [p5.Font](https://p5js.org/reference/p5/p5.Font/) object.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/type/p5.Font.js](https://github.com/processing/p5.js/blob/v2.3.3/src/type/p5.Font.js#L1428) and open a pull request!

---

## Related References

* [textToContours

  Returns an array of arrays of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToContours/)
* [textToModel

  Converts text into a 3D model that can be rendered in WebGL mode.](https://p5js.org/reference/p5.Font/textToModel/)
* [textToPaths

  Returns a flat array of path commands that describe the outlines of a string of text.](https://p5js.org/reference/p5.Font/textToPaths/)
* [textToPoints

  Returns an array of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToPoints/)

## Example code (extracted)

```js
let font;

async function setup() {
  createCanvas(100, 100);
  font = await loadFont('/assets/inconsolata.otf');
  fill('deeppink');
  textFont(font);
  textSize(36);
  text('p5*js', 10, 50);

  describe('The text "p5*js" written in pink on a white background.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  loadFont('/assets/inconsolata.otf', font => {
    fill('deeppink');
    textFont(font);
    textSize(36);
    text('p5*js', 10, 50);

    describe('The text "p5*js" written in pink on a white background.');
  });
}
```

```js
function setup() {
  createCanvas(100, 100);
  loadFont('/assets/inconsolata.otf', success, failure);
}

function success(font) {
  fill('deeppink');
  textFont(font);
  textSize(36);
  text('p5*js', 10, 50);

  describe('The text "p5*js" written in pink on a white background.');
}

function failure(event) {
  console.error('Oops!', event);
}
```

```js
async function setup() {
  createCanvas(100, 100);
  await loadFont('/assets/inconsolata.otf');
  let p = createP('p5*js');
  p.style('color', 'deeppink');
  p.style('font-family', 'Inconsolata');
  p.style('font-size', '36px');
  p.position(10, 50);

  describe('The text "p5*js" written in pink on a white background.');
}
```

```js
// Some other forms of loading fonts:
loadFont("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap");

loadFont('@font-face { font-family: "Bricolage Grotesque", serif; font-optical-sizing: auto; font-weight: 400; font-style: normal; font-variation-settings: "wdth" 100; }');
```
