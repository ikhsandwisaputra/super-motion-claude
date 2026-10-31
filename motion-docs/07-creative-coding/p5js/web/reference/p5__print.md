---
source: https://p5js.org/reference/p5/print/
title: "print"
fetched: 2026-10-28
---

Displays text in the web browser's console.

`print()` is helpful for printing values while debugging. Each call to `print()` creates a new line of text.

Note: Call `print('\n')` to print a blank line. Calling `print()` without an argument opens the browser's dialog for printing documents.

## Examples

## Syntax

`print(contents)``print(data)`

## Parameters

contents

Any: content to print to the console.

data

String|Number|Array: data to be written as a string, number, or array of strings and numbers.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/io/files.js](https://github.com/processing/p5.js/blob/v2.3.3/src/io/files.js#L1430) and open a pull request!

---

## Related References

* [cursor

  Changes the cursor's appearance.](https://p5js.org/reference/p5/cursor/)
* [deltaTime

  A Number variable that tracks the number of milliseconds it took to draw the last frame.](https://p5js.org/reference/p5/deltaTime/)
* [describe

  Creates a screen reader-accessible description of the canvas.](https://p5js.org/reference/p5/describe/)
* [describeElement

  Creates a screen reader-accessible description of elements in the canvas.](https://p5js.org/reference/p5/describeElement/)

## Example code (extracted)

```js
function setup() {
  // Prints "hello, world" to the console.
  print('hello, world');
}
```

```js
function setup() {
  let name = 'ada';
  // Prints "hello, ada" to the console.
  print(`hello, ${name}`);
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the text.
  textAlign(LEFT, CENTER);
  textFont('Courier New');
  textSize(12);

  // Display instructions.
  text('Double-click to save', 5, 50, 90);

  describe('The text "Double-click to save" written in black on a gray background.');
}

// Save the file when the user double-clicks.
function doubleClicked() {
  // Create a p5.PrintWriter object.
  let myWriter = createWriter('numbers.txt');

  // Add some data to the print stream.
  myWriter.print('1,2,3,');
  myWriter.print(['4', '5', '6']);

  // Save the file and close the print stream.
  myWriter.close();
}
```
