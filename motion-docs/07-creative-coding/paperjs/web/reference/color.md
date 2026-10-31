---
source: https://paperjs.org/reference/color/
title: "Paper.js — Color"
fetched: 2026-10-28
---

# Color

All properties and functions that expect color values in the form of instances of Color objects, also accept named colors and hex values as strings which are then converted to instances of [Color](https://paperjs.org/reference/color) internally.

#### Example:Named color values:

Run

#### Example:Hex color values:

Run

## Constructors

[**Color**(red, green, blue[, alpha])](https://paperjs.org/reference/color/#color-red-green-blue)

Creates a RGB Color object.

#### Parameters:

* red:
  Number
  — the amount of red in the color as a value between `0` and `1`
* green:
  Number
  — the amount of green in the color as a value between `0` and `1`
* blue:
  Number
  — the amount of blue in the color as a value between `0` and `1`
* alpha:
  Number
  — the alpha of the color as a value between `0` and `1`
  — optional

#### Returns:

* [Color](https://paperjs.org/reference/color)

#### Example:Creating a RGB Color:

Run

[**Color**(gray[, alpha])](https://paperjs.org/reference/color/#color-gray)

Creates a gray Color object.

#### Parameters:

* gray:
  Number
  — the amount of gray in the color as a value between `0` and `1`
* alpha:
  Number
  — the alpha of the color as a value between `0` and `1`
  — optional

#### Returns:

* [Color](https://paperjs.org/reference/color)

#### Example:Creating a gray Color:

Run

[**Color**(object)](https://paperjs.org/reference/color/#color-object)

Creates a HSB, HSL or gradient Color object from the properties of the provided object:

#### Options:

* hsb.hue: Number — the hue of the color as a value in degrees between `0` and `360`
* hsb.saturation: Number — the saturation of the color as a value between `0` and `1`
* hsb.brightness: Number — the brightness of the color as a value between `0` and `1`
* hsb.alpha: Number — the alpha of the color as a value between `0` and `1`
* hsl.hue: Number — the hue of the color as a value in degrees between `0` and `360`
* hsl.saturation: Number — the saturation of the color as a value between `0` and `1`
* hsl.lightness: Number — the lightness of the color as a value between `0` and `1`
* hsl.alpha: Number — the alpha of the color as a value between `0` and `1`
* gradient.gradient: [Gradient](https://paperjs.org/reference/gradient) — the gradient object that describes the color stops and type of gradient to be used
* gradient.origin: [Point](https://paperjs.org/reference/point) — the origin point of the gradient
* gradient.destination: [Point](https://paperjs.org/reference/point) — the destination point of the gradient
* gradient.stops: Array of [GradientStop](https://paperjs.org/reference/gradientstop) objects — the gradient stops describing the gradient, as an alternative to providing a gradient object
* gradient.radial: Boolean — controls whether the gradient is radial, as an alternative to providing a gradient object

#### Parameters:

* object:
  Object
  — an object describing the components and properties of the color

#### Returns:

* [Color](https://paperjs.org/reference/color)

#### Example:Creating a HSB Color:

Run

#### Example:Creating a HSL Color:

Run

#### Example:Creating a gradient color from an object literal:

Run

[**Color**(color)](https://paperjs.org/reference/color/#color-color)

Creates a Color object from a CSS string. All common CSS color string formats are supported: - Named colors (e.g. `'red'`, `'fuchsia'`, …) - Hex strings (`'#ffff00'`, `'#ff0'`, …) - RGB strings (`'rgb(255, 128, 0)'`, `'rgba(255, 128, 0, 0.5)'`, …) - HSL strings (`'hsl(180deg, 20%, 50%)'`, `'hsla(3.14rad, 20%, 50%, 0.5)'`, …)

#### Parameters:

* color:
  String
  — the color’s CSS string representation

#### Returns:

* [Color](https://paperjs.org/reference/color)

#### Example:

Run

[**Color**(gradient, origin, destination[, highlight])](https://paperjs.org/reference/color/#color-gradient-origin-destination)

Creates a gradient Color object.

#### Parameters:

* gradient:
  [Gradient](https://paperjs.org/reference/gradient)
* origin:
  [Point](https://paperjs.org/reference/point)
* destination:
  [Point](https://paperjs.org/reference/point)
* highlight:
  [Point](https://paperjs.org/reference/point)
  — optional

#### Returns:

* [Color](https://paperjs.org/reference/color)

#### Example:Applying a linear gradient color containing evenly distributed color stops:

Run

#### Example:Applying a radial gradient color containing unevenly distributed color stops:

Run

## Operators

[**+**number, **+**color](https://paperjs.org/reference/color/#add)

Returns the addition of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to add

#### Returns:

* [Color](https://paperjs.org/reference/color) — the addition of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 0.25, 0);
var result = color + 0.25; // PaperScript
var result = color.add(0.25); // JavaScript
console.log(result); // { red: 0.75, green: 0.5, blue: 0.25 }
```

Returns the addition of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to add

#### Returns:

* [Color](https://paperjs.org/reference/color) — the addition of the two colors as a new color

#### Example:

```
var color1 = new Color(0, 1, 1);
var color2 = new Color(1, 0, 0);
var result = color1 + color2; // PaperScript
var result = color1.add(color2); // JavaScript
console.log(result); // { red: 1, green: 1, blue: 1 }
```

[**-**number, **-**color](https://paperjs.org/reference/color/#subtract)

Returns the subtraction of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to subtract

#### Returns:

* [Color](https://paperjs.org/reference/color) — the subtraction of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 1, 1);
var result = color - 0.5; // PaperScript
var result = color.subtract(0.5); // JavaScript
console.log(result); // { red: 0, green: 0.5, blue: 0.5 }
```

Returns the subtraction of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to subtract

#### Returns:

* [Color](https://paperjs.org/reference/color) — the subtraction of the two colors as a new color

#### Example:

```
var color1 = new Color(1, 1, 1);
var color2 = new Color(1, 0, 0);
var result = color1 - color2; // PaperScript
var result = color1.subtract(color2); // JavaScript
console.log(result); // { red: 0, green: 1, blue: 1 }
```

[**\***number, **\***color](https://paperjs.org/reference/color/#multiply)

Returns the multiplication of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to multiply

#### Returns:

* [Color](https://paperjs.org/reference/color) — the multiplication of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 1, 1);
var result = color * 0.5; // PaperScript
var result = color.multiply(0.5); // JavaScript
console.log(result); // { red: 0.25, green: 0.5, blue: 0.5 }
```

Returns the multiplication of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to multiply

#### Returns:

* [Color](https://paperjs.org/reference/color) — the multiplication of the two colors as a new color

#### Example:

```
var color1 = new Color(0, 1, 1);
var color2 = new Color(0.5, 0, 0.5);
var result = color1 * color2; // PaperScript
var result = color1.multiply(color2); // JavaScript
console.log(result); // { red: 0, green: 0, blue: 0.5 }
```

[**/**number, **/**color](https://paperjs.org/reference/color/#divide)

Returns the division of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to divide

#### Returns:

* [Color](https://paperjs.org/reference/color) — the division of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 1, 1);
var result = color / 2; // PaperScript
var result = color.divide(2); // JavaScript
console.log(result); // { red: 0.25, green: 0.5, blue: 0.5 }
```

Returns the division of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to divide

#### Returns:

* [Color](https://paperjs.org/reference/color) — the division of the two colors as a new color

#### Example:

```
var color1 = new Color(0, 1, 1);
var color2 = new Color(0.5, 1, 2);
var result = color1 / color2; // PaperScript
var result = color1.divide(color2); // JavaScript
console.log(result); // { red: 0, green: 1, blue: 0.5 }
```

## Properties

[**type**](https://paperjs.org/reference/color/#type)

The type of the color as a string.

#### Type:

* String

#### Example:

```
var color = new Color(1, 0, 0);
console.log(color.type); // 'rgb'
```

[**components**](https://paperjs.org/reference/color/#components)

The color components that define the color, including the alpha value if defined.

Read only.

#### Type:

* Array of Numbers

[**alpha**](https://paperjs.org/reference/color/#alpha)

The color’s alpha value as a number between `0` and `1`. All colors of the different subclasses support alpha values.

#### Default:

* 1

#### Type:

* Number

#### Example:A filled path with a half transparent stroke:

Run

### RGB Components

[**red**](https://paperjs.org/reference/color/#red)

The amount of red in the color as a value between `0` and `1`.

#### Type:

* Number

#### Example:Changing the amount of red in a color:

Run

[**green**](https://paperjs.org/reference/color/#green)

The amount of green in the color as a value between `0` and `1`.

#### Type:

* Number

#### Example:Changing the amount of green in a color:

Run

[**blue**](https://paperjs.org/reference/color/#blue)

The amount of blue in the color as a value between `0` and `1`.

#### Type:

* Number

#### Example:Changing the amount of blue in a color:

Run

### Gray Components

[**gray**](https://paperjs.org/reference/color/#gray)

The amount of gray in the color as a value between `0` and `1`.

#### Type:

* Number

### HSB Components

[**hue**](https://paperjs.org/reference/color/#hue)

The hue of the color as a value in degrees between `0` and `360`.

#### Type:

* Number

#### Example:Changing the hue of a color:

Run

#### Example:Hue cycling:

Run

[**saturation**](https://paperjs.org/reference/color/#saturation)

The saturation of the color as a value between `0` and `1`.

#### Type:

* Number

[**brightness**](https://paperjs.org/reference/color/#brightness)

The brightness of the color as a value between `0` and `1`.

#### Type:

* Number

### HSL Components

[**lightness**](https://paperjs.org/reference/color/#lightness)

The lightness of the color as a value between `0` and `1`.

Note that all other components are shared with HSB.

#### Type:

* Number

### Gradient Components

[**gradient**](https://paperjs.org/reference/color/#gradient)

The gradient object describing the type of gradient and the stops.

#### Type:

* [Gradient](https://paperjs.org/reference/gradient)

[**highlight**](https://paperjs.org/reference/color/#highlight)

The highlight point of the gradient.

#### Type:

* [Point](https://paperjs.org/reference/point)

#### Example:Create a circle shaped path at the center of the view, using 40% of the height of the view as its radius and fill it with a radial gradient color:

Run

## Methods

[**set**(...values)](https://paperjs.org/reference/color/#set-values)

Sets the color to the passed values. Note that any sequence of parameters that is supported by the various [Color](https://paperjs.org/reference/color)() constructors also work for calls of `set()`.

#### Parameters:

* values:
  any value

#### Returns:

* [Color](https://paperjs.org/reference/color)

[**convert**(type)](https://paperjs.org/reference/color/#convert-type)

Converts the color to another type.

#### Parameters:

* type:
  String
  — the color type to convert to. Possible values: ‘rgb’, ‘gray’, ‘hsb’, ‘hsl’

#### Returns:

* [Color](https://paperjs.org/reference/color) — the converted color as a new instance

[**hasAlpha**()](https://paperjs.org/reference/color/#hasalpha)

Checks if the color has an alpha value.

#### Returns:

* Boolean — true if the color has an alpha value, false otherwise

[**equals**(color)](https://paperjs.org/reference/color/#equals-color)

Checks if the component color values of the color are the same as those of the supplied one.

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to compare with

#### Returns:

* Boolean — true if the colors are the same, false otherwise

[**clone**()](https://paperjs.org/reference/color/#clone)

#### Returns:

* [Color](https://paperjs.org/reference/color) — a copy of the color object

### String Representations

[**toString**()](https://paperjs.org/reference/color/#tostring)

#### Returns:

* String — a string representation of the color

[**toCSS**(hex)](https://paperjs.org/reference/color/#tocss-hex)

Returns the color as a CSS string.

#### Parameters:

* hex:
  Boolean
  — whether to return the color in hexadecimal representation or as a CSS RGB / RGBA string.

#### Returns:

* String — a CSS string representation of the color

[**transform**(matrix)](https://paperjs.org/reference/color/#transform-matrix)

Transform the gradient color by the specified matrix.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to transform the gradient color by

### Math Operator Functions

[**add**(number)](https://paperjs.org/reference/color/#add-number)

Returns the addition of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to add

#### Returns:

* [Color](https://paperjs.org/reference/color) — the addition of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 0.25, 0);
var result = color + 0.25; // PaperScript
var result = color.add(0.25); // JavaScript
console.log(result); // { red: 0.75, green: 0.5, blue: 0.25 }
```

[**add**(color)](https://paperjs.org/reference/color/#add-color)

Returns the addition of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to add

#### Returns:

* [Color](https://paperjs.org/reference/color) — the addition of the two colors as a new color

#### Example:

```
var color1 = new Color(0, 1, 1);
var color2 = new Color(1, 0, 0);
var result = color1 + color2; // PaperScript
var result = color1.add(color2); // JavaScript
console.log(result); // { red: 1, green: 1, blue: 1 }
```

[**subtract**(number)](https://paperjs.org/reference/color/#subtract-number)

Returns the subtraction of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to subtract

#### Returns:

* [Color](https://paperjs.org/reference/color) — the subtraction of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 1, 1);
var result = color - 0.5; // PaperScript
var result = color.subtract(0.5); // JavaScript
console.log(result); // { red: 0, green: 0.5, blue: 0.5 }
```

[**subtract**(color)](https://paperjs.org/reference/color/#subtract-color)

Returns the subtraction of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to subtract

#### Returns:

* [Color](https://paperjs.org/reference/color) — the subtraction of the two colors as a new color

#### Example:

```
var color1 = new Color(1, 1, 1);
var color2 = new Color(1, 0, 0);
var result = color1 - color2; // PaperScript
var result = color1.subtract(color2); // JavaScript
console.log(result); // { red: 0, green: 1, blue: 1 }
```

[**multiply**(number)](https://paperjs.org/reference/color/#multiply-number)

Returns the multiplication of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to multiply

#### Returns:

* [Color](https://paperjs.org/reference/color) — the multiplication of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 1, 1);
var result = color * 0.5; // PaperScript
var result = color.multiply(0.5); // JavaScript
console.log(result); // { red: 0.25, green: 0.5, blue: 0.5 }
```

[**multiply**(color)](https://paperjs.org/reference/color/#multiply-color)

Returns the multiplication of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to multiply

#### Returns:

* [Color](https://paperjs.org/reference/color) — the multiplication of the two colors as a new color

#### Example:

```
var color1 = new Color(0, 1, 1);
var color2 = new Color(0.5, 0, 0.5);
var result = color1 * color2; // PaperScript
var result = color1.multiply(color2); // JavaScript
console.log(result); // { red: 0, green: 0, blue: 0.5 }
```

[**divide**(number)](https://paperjs.org/reference/color/#divide-number)

Returns the division of the supplied value to all components of the color as a new color. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to divide

#### Returns:

* [Color](https://paperjs.org/reference/color) — the division of the color and the value as a new color

#### Example:

```
var color = new Color(0.5, 1, 1);
var result = color / 2; // PaperScript
var result = color.divide(2); // JavaScript
console.log(result); // { red: 0.25, green: 0.5, blue: 0.5 }
```

[**divide**(color)](https://paperjs.org/reference/color/#divide-color)

Returns the division of the supplied color to the color as a new color. The object itself is not modified!

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color to divide

#### Returns:

* [Color](https://paperjs.org/reference/color) — the division of the two colors as a new color

#### Example:

```
var color1 = new Color(0, 1, 1);
var color2 = new Color(0.5, 1, 2);
var result = color1 / color2; // PaperScript
var result = color1.divide(color2); // JavaScript
console.log(result); // { red: 0, green: 1, blue: 0.5 }
```

## Static Methods

[**Color.random**()](https://paperjs.org/reference/color/#random)

Returns a color object with random [red](https://paperjs.org/reference/color#red), [green](https://paperjs.org/reference/color#green) and [blue](https://paperjs.org/reference/color#blue) values between `0` and `1`.

#### Returns:

* [Color](https://paperjs.org/reference/color) — the newly created color object

#### Example:

Run
