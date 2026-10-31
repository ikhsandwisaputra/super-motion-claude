---
source: https://paperjs.org/reference/size/
title: "Paper.js — Size"
fetched: 2026-10-28
---

# Size

The Size object is used to describe the size or dimensions of something, through its [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) properties.

Wherever a size is the only argument of a function, it can also be passed as two numbers, e.g. `size.multiply(2, 3)`.

#### Example:Create a size that is 10pt wide and 5pt high, and use it to define a rectangle:

```
var size = new Size(10, 5);
console.log(size.width); // 10
console.log(size.height); // 5
var rect = new Rectangle(new Point(20, 15), size);
console.log(rect); // { x: 20, y: 15, width: 10, height: 5 }
```

## Constructors

[**Size**(width, height)](https://paperjs.org/reference/size/#size-width-height)

Creates a Size object with the given width and height values.

#### Parameters:

* width:
  Number
  — the width
* height:
  Number
  — the height

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:Create a size that is 10pt wide and 5pt high

```
var size = new Size(10, 5);
console.log(size.width); // 10
console.log(size.height); // 5
```

[**Size**(array)](https://paperjs.org/reference/size/#size-array)

Creates a Size object using the numbers in the given array as dimensions.

#### Parameters:

* array:
  Array

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:Creating a size of width: 320, height: 240 using an array of numbers:

```
var array = [320, 240];
var size = new Size(array);
console.log(size.width); // 320
console.log(size.height); // 240
```

[**Size**(object)](https://paperjs.org/reference/size/#size-object)

Creates a Size object using the properties in the given object.

#### Parameters:

* object:
  Object

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:Creating a size of width: 10, height: 20 using an object literal:

```
var size = new Size({
    width: 10,
    height: 20
});
console.log(size.width); // 10
console.log(size.height); // 20
```

[**Size**(size)](https://paperjs.org/reference/size/#size-size)

Creates a Size object using the coordinates of the given Size object.

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)

#### Returns:

* [Size](https://paperjs.org/reference/size)

[**Size**(point)](https://paperjs.org/reference/size/#size-point)

Creates a Size object using the [point.x](https://paperjs.org/reference/point#x) and [point.y](https://paperjs.org/reference/point#y) values of the given Point object.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:

```
var point = new Point(50, 50);
var size = new Size(point);
console.log(size.width); // 50
console.log(size.height); // 50
```

## Operators

[**+**number, **+**size](https://paperjs.org/reference/size/#add)

Returns the addition of the supplied value to the width and height of the size as a new size. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to add

#### Returns:

* [Size](https://paperjs.org/reference/size) — the addition of the size and the value as a new size

#### Example:

```
var size = new Size(5, 10);
var result = size + 20; // PaperScript
var result = size.add(20); // JavaScript
console.log(result); // {width: 25, height: 30}
```

Returns the addition of the width and height of the supplied size to the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to add

#### Returns:

* [Size](https://paperjs.org/reference/size) — the addition of the two sizes as a new size

#### Example:

```
var size1 = new Size(5, 10);
var size2 = new Size(10, 20);
var result = size1 + size2; // PaperScript
var result = size1.add(size2); // JavaScript
console.log(result); // {width: 15, height: 30}
```

[**-**number, **-**size](https://paperjs.org/reference/size/#subtract)

Returns the subtraction of the supplied value from the width and height of the size as a new size. The object itself is not modified! The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to subtract

#### Returns:

* [Size](https://paperjs.org/reference/size) — the subtraction of the size and the value as a new size

#### Example:

```
var size = new Size(10, 20);
var result = size - 5; // PaperScript
var result = size.subtract(5); // JavaScript
console.log(result); // {width: 5, height: 15}
```

Returns the subtraction of the width and height of the supplied size from the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to subtract

#### Returns:

* [Size](https://paperjs.org/reference/size) — the subtraction of the two sizes as a new size

#### Example:

```
var firstSize = new Size(10, 20);
var secondSize = new Size(5, 5);
var result = firstSize - secondSize; // PaperScript
var result = firstSize.subtract(secondSize); // JavaScript
console.log(result); // {width: 5, height: 15}
```

[**\***number, **\***size](https://paperjs.org/reference/size/#multiply)

Returns the multiplication of the supplied value with the width and height of the size as a new size. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to multiply by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the multiplication of the size and the value as a new size

#### Example:

```
var size = new Size(10, 20);
var result = size * 2; // PaperScript
var result = size.multiply(2); // JavaScript
console.log(result); // {width: 20, height: 40}
```

Returns the multiplication of the width and height of the supplied size with the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to multiply by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the multiplication of the two sizes as a new size

#### Example:

```
var firstSize = new Size(5, 10);
var secondSize = new Size(4, 2);
var result = firstSize * secondSize; // PaperScript
var result = firstSize.multiply(secondSize); // JavaScript
console.log(result); // {width: 20, height: 20}
```

[**/**number, **/**size](https://paperjs.org/reference/size/#divide)

Returns the division of the supplied value by the width and height of the size as a new size. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to divide by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the division of the size and the value as a new size

#### Example:

```
var size = new Size(10, 20);
var result = size / 2; // PaperScript
var result = size.divide(2); // JavaScript
console.log(result); // {width: 5, height: 10}
```

Returns the division of the width and height of the supplied size by the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to divide by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the division of the two sizes as a new size

#### Example:

```
var firstSize = new Size(8, 10);
var secondSize = new Size(2, 5);
var result = firstSize / secondSize; // PaperScript
var result = firstSize.divide(secondSize); // JavaScript
console.log(result); // {width: 4, height: 2}
```

[**%**number, **%**size](https://paperjs.org/reference/size/#modulo)

The modulo operator returns the integer remainders of dividing the size by the supplied value as a new size.

#### Parameters:

* value:
  Number

#### Returns:

* [Size](https://paperjs.org/reference/size) — the integer remainders of dividing the size by the value as a new size

#### Example:

```
var size = new Size(12, 6);
var result = size % 5; // PaperScript
var result = size.modulo(5); // JavaScript
console.log(result); // {width: 2, height: 1}
```

The modulo operator returns the integer remainders of dividing the size by the supplied size as a new size.

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)

#### Returns:

* [Size](https://paperjs.org/reference/size) — the integer remainders of dividing the sizes by each other as a new size

#### Example:

```
var size = new Size(12, 6);
var result = size % new Size(5, 2); // PaperScript
var result = size.modulo(new Size(5, 2)); // JavaScript
console.log(result); // {width: 2, height: 0}
```

## Properties

[**width**](https://paperjs.org/reference/size/#width)

The width of the size

#### Type:

* Number

[**height**](https://paperjs.org/reference/size/#height)

The height of the size

#### Type:

* Number

[**values**](https://paperjs.org/reference/size/#values)

The size’s dimensions as an array, `[width, height]`, as [matrix.values](https://paperjs.org/reference/matrix#values) gives those of a matrix.

Read only.

#### Type:

* Array of Numbers

## Methods

[**set**(...values)](https://paperjs.org/reference/size/#set-values)

Sets the size to the passed values. Note that any sequence of parameters that is supported by the various [Size](https://paperjs.org/reference/size)() constructors also work for calls of `set()`.

#### Parameters:

* values:
  any value

#### Returns:

* [Size](https://paperjs.org/reference/size)

[**equals**(size)](https://paperjs.org/reference/size/#equals-size)

Checks whether the width and height of the size are equal to those of the supplied size.

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)⟋Array of Numbers
  — the size to compare to

#### Returns:

* Boolean

#### Example:

```
var size = new Size(5, 10);
console.log(size == new Size(5, 10)); // true
console.log(size == new Size(1, 1)); // false
console.log(size != new Size(1, 1)); // true
```

[**clone**()](https://paperjs.org/reference/size/#clone)

Returns a copy of the size.

#### Returns:

* [Size](https://paperjs.org/reference/size)

[**toString**()](https://paperjs.org/reference/size/#tostring)

#### Returns:

* String — a string representation of the size

[**negate**()](https://paperjs.org/reference/size/#negate)

Returns a new size with both dimensions negated. PaperScript uses it for the unary minus operator. The object itself is not modified!

#### Returns:

* [Size](https://paperjs.org/reference/size) — the negation of the size as a new size

#### Example:

```
var size = new Size(12, -6);
var result = -size; // PaperScript
var result = size.negate(); // JavaScript
console.log(result); // {width: -12, height: 6}
```

### Tests

[**isZero**()](https://paperjs.org/reference/size/#iszero)

Checks if this size has both the width and height set to 0, within a tolerance of 1e-12, unlike [equals(size)](https://paperjs.org/reference/size#equals-size), which compares exactly.

#### Returns:

* Boolean — true if both width and height are 0, within the tolerance, false otherwise

[**isNaN**()](https://paperjs.org/reference/size/#isnan)

Checks if the width or the height of the size are NaN.

#### Returns:

* Boolean — true if the width or height of the size are NaN, false otherwise

### Math Functions

[**round**()](https://paperjs.org/reference/size/#round)

Returns a new size with rounded [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) values. The object itself is not modified!

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:

```
var size = new Size(10.2, 10.9);
var roundSize = size.round();
console.log(roundSize); // {x: 10, y: 11}
```

[**ceil**()](https://paperjs.org/reference/size/#ceil)

Returns a new size with the nearest greater non-fractional values to the specified [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) values. The object itself is not modified!

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:

```
var size = new Size(10.2, 10.9);
var ceilSize = size.ceil();
console.log(ceilSize); // {x: 11, y: 11}
```

[**floor**()](https://paperjs.org/reference/size/#floor)

Returns a new size with the nearest smaller non-fractional values to the specified [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) values. The object itself is not modified!

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:

```
var size = new Size(10.2, 10.9);
var floorSize = size.floor();
console.log(floorSize); // {x: 10, y: 10}
```

[**abs**()](https://paperjs.org/reference/size/#abs)

Returns a new size with the absolute values of the specified [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) values. The object itself is not modified!

#### Returns:

* [Size](https://paperjs.org/reference/size)

#### Example:

```
var size = new Size(-5, 10);
var absSize = size.abs();
console.log(absSize); // {x: 5, y: 10}
```

### Math Operator Functions

[**add**(number)](https://paperjs.org/reference/size/#add-number)

Returns the addition of the supplied value to the width and height of the size as a new size. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to add

#### Returns:

* [Size](https://paperjs.org/reference/size) — the addition of the size and the value as a new size

#### Example:

```
var size = new Size(5, 10);
var result = size + 20; // PaperScript
var result = size.add(20); // JavaScript
console.log(result); // {width: 25, height: 30}
```

[**add**(size)](https://paperjs.org/reference/size/#add-size)

Returns the addition of the width and height of the supplied size to the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to add

#### Returns:

* [Size](https://paperjs.org/reference/size) — the addition of the two sizes as a new size

#### Example:

```
var size1 = new Size(5, 10);
var size2 = new Size(10, 20);
var result = size1 + size2; // PaperScript
var result = size1.add(size2); // JavaScript
console.log(result); // {width: 15, height: 30}
```

[**subtract**(number)](https://paperjs.org/reference/size/#subtract-number)

Returns the subtraction of the supplied value from the width and height of the size as a new size. The object itself is not modified! The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to subtract

#### Returns:

* [Size](https://paperjs.org/reference/size) — the subtraction of the size and the value as a new size

#### Example:

```
var size = new Size(10, 20);
var result = size - 5; // PaperScript
var result = size.subtract(5); // JavaScript
console.log(result); // {width: 5, height: 15}
```

[**subtract**(size)](https://paperjs.org/reference/size/#subtract-size)

Returns the subtraction of the width and height of the supplied size from the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to subtract

#### Returns:

* [Size](https://paperjs.org/reference/size) — the subtraction of the two sizes as a new size

#### Example:

```
var firstSize = new Size(10, 20);
var secondSize = new Size(5, 5);
var result = firstSize - secondSize; // PaperScript
var result = firstSize.subtract(secondSize); // JavaScript
console.log(result); // {width: 5, height: 15}
```

[**multiply**(number)](https://paperjs.org/reference/size/#multiply-number)

Returns the multiplication of the supplied value with the width and height of the size as a new size. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to multiply by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the multiplication of the size and the value as a new size

#### Example:

```
var size = new Size(10, 20);
var result = size * 2; // PaperScript
var result = size.multiply(2); // JavaScript
console.log(result); // {width: 20, height: 40}
```

[**multiply**(size)](https://paperjs.org/reference/size/#multiply-size)

Returns the multiplication of the width and height of the supplied size with the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to multiply by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the multiplication of the two sizes as a new size

#### Example:

```
var firstSize = new Size(5, 10);
var secondSize = new Size(4, 2);
var result = firstSize * secondSize; // PaperScript
var result = firstSize.multiply(secondSize); // JavaScript
console.log(result); // {width: 20, height: 20}
```

[**divide**(number)](https://paperjs.org/reference/size/#divide-number)

Returns the division of the supplied value by the width and height of the size as a new size. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to divide by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the division of the size and the value as a new size

#### Example:

```
var size = new Size(10, 20);
var result = size / 2; // PaperScript
var result = size.divide(2); // JavaScript
console.log(result); // {width: 5, height: 10}
```

[**divide**(size)](https://paperjs.org/reference/size/#divide-size)

Returns the division of the width and height of the supplied size by the size as a new size. The object itself is not modified!

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)
  — the size to divide by

#### Returns:

* [Size](https://paperjs.org/reference/size) — the division of the two sizes as a new size

#### Example:

```
var firstSize = new Size(8, 10);
var secondSize = new Size(2, 5);
var result = firstSize / secondSize; // PaperScript
var result = firstSize.divide(secondSize); // JavaScript
console.log(result); // {width: 4, height: 2}
```

[**modulo**(value)](https://paperjs.org/reference/size/#modulo-value)

The modulo operator returns the integer remainders of dividing the size by the supplied value as a new size.

#### Parameters:

* value:
  Number

#### Returns:

* [Size](https://paperjs.org/reference/size) — the integer remainders of dividing the size by the value as a new size

#### Example:

```
var size = new Size(12, 6);
var result = size % 5; // PaperScript
var result = size.modulo(5); // JavaScript
console.log(result); // {width: 2, height: 1}
```

[**modulo**(size)](https://paperjs.org/reference/size/#modulo-size)

The modulo operator returns the integer remainders of dividing the size by the supplied size as a new size.

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)

#### Returns:

* [Size](https://paperjs.org/reference/size) — the integer remainders of dividing the sizes by each other as a new size

#### Example:

```
var size = new Size(12, 6);
var result = size % new Size(5, 2); // PaperScript
var result = size.modulo(new Size(5, 2)); // JavaScript
console.log(result); // {width: 2, height: 0}
```

## Static Methods

[**Size.min**(size1, size2)](https://paperjs.org/reference/size/#min-size1-size2)

Returns a new size object with the smallest [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) of the supplied sizes.

#### Parameters:

* size1:
  [Size](https://paperjs.org/reference/size)
* size2:
  [Size](https://paperjs.org/reference/size)

#### Returns:

* [Size](https://paperjs.org/reference/size) — the newly created size object

#### Example:

```
var size1 = new Size(10, 100);
var size2 = new Size(200, 5);
var minSize = Size.min(size1, size2);
console.log(minSize); // {width: 10, height: 5}
```

#### Example:Find the minimum of multiple sizes:

```
var size1 = new Size(60, 100);
var size2 = new Size(200, 5);
var size3 = new Size(250, 35);
[size1, size2, size3].reduce(Size.min) // {width: 60, height: 5}
```

[**Size.max**(size1, size2)](https://paperjs.org/reference/size/#max-size1-size2)

Returns a new size object with the largest [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) of the supplied sizes.

#### Parameters:

* size1:
  [Size](https://paperjs.org/reference/size)
* size2:
  [Size](https://paperjs.org/reference/size)

#### Returns:

* [Size](https://paperjs.org/reference/size) — the newly created size object

#### Example:

```
var size1 = new Size(10, 100);
var size2 = new Size(200, 5);
var maxSize = Size.max(size1, size2);
console.log(maxSize); // {width: 200, height: 100}
```

#### Example:Find the maximum of multiple sizes:

```
var size1 = new Size(60, 100);
var size2 = new Size(200, 5);
var size3 = new Size(250, 35);
[size1, size2, size3].reduce(Size.max) // {width: 250, height: 100}
```

[**Size.random**()](https://paperjs.org/reference/size/#random)

Returns a size object with random [width](https://paperjs.org/reference/size#width) and [height](https://paperjs.org/reference/size#height) values between `0` and `1`.

#### Returns:

* [Size](https://paperjs.org/reference/size) — the newly created size object

#### Example:

```
var maxSize = new Size(100, 100);
var randomSize = Size.random();
var size = maxSize * randomSize;
```
