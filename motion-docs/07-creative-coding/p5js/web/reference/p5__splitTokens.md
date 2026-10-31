---
source: https://p5js.org/reference/p5/splitTokens/
title: "splitTokens"
fetched: 2026-10-28
---

##### Warning

This will be removed in a future version of p5.js to make way for a new, friendlier version :)

Splits a `String` into pieces and returns an array containing the pieces.

`splitTokens()` is an enhanced version of [split()](https://p5js.org/reference/p5/split/). It can split a string when any characters from a list are detected.

The first parameter, `value`, is the string to split.

The second parameter, `delim`, is optional. It sets the character(s) that should be used to split the string. `delim` can be a single string, as in `splitTokens('rock...paper...scissors...shoot', '...')`, or an array of strings, as in `splitTokens('rock;paper,scissors...shoot, [';', ',', '...'])`. By default, if no `delim` characters are specified, then any whitespace character is used to split. Whitespace characters include tab (`\t`), line feed (`\n`), carriage return (`\r`), form feed (`\f`), and space.

## Examples

## Syntax

`splitTokens(value, [delim])`

## Parameters

value

String: string to split.

delim

String: character(s) to use for splitting the string.

## Returns

String[]: separated strings.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/utility\_functions.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/utility_functions.js#L602) and open a pull request!

---

## Related References

* [nf

  Converts a Number into a String with a given number of digits.](https://p5js.org/reference/p5/nf/)
* [nfc

  Converts a Number into a String with commas to mark units of 1,000.](https://p5js.org/reference/p5/nfc/)
* [nfp

  Converts a Number into a String with a plus or minus sign.](https://p5js.org/reference/p5/nfp/)
* [nfs

  Converts a positive Number into a String with an extra space in front.](https://p5js.org/reference/p5/nfs/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a string variable.
  let string = 'rock paper scissors shoot';

  // Split the string at each space.
  let words = splitTokens(string);

  // Print the array to the console.
  print(words);

  // Style the text.
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(12);

  // Iterate over the words array.
  for (let i = 0; i < words.length; i += 1) {

    // Calculate the y-coordinate.
    let y = (i + 1) * 20;

    // Display the word.
    text(words[i], 50, y);
  }

  describe(
    'The words "rock", "paper", "scissors", and "shoot" written on separate lines. The text is black on a gray background.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a string variable.
  let string = 'rock...paper...scissors...shoot';

  // Split the string at each ...
  let words = splitTokens(string, '...');

  // Print the array to the console.
  print(words);

  // Style the text.
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(12);

  // Iterate over the words array.
  for (let i = 0; i < words.length; i += 1) {

    // Calculate the y-coordinate.
    let y = (i + 1) * 20;

    // Display the word.
    text(words[i], 50, y);
  }

  describe(
    'The words "rock", "paper", "scissors", and "shoot" written on separate lines. The text is black on a gray background.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a string variable.
  let string = 'rock;paper,scissors...shoot';

  // Split the string at each semicolon, comma, or ...
  let words = splitTokens(string, [';', ',', '...']);

  // Print the array to the console.
  print(words);

  // Style the text.
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(12);

  // Iterate over the words array.
  for (let i = 0; i < words.length; i += 1) {

    // Calculate the y-coordinate.
    let y = (i + 1) * 20;

    // Display the word.
    text(words[i], 50, y);
  }

  describe(
    'The words "rock", "paper", "scissors", and "shoot" written on separate lines. The text is black on a gray background.'
  );
}
```
