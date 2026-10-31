---
source: https://paperjs.org/reference/matrix/
title: "Paper.js — Matrix"
fetched: 2026-10-28
---

# Matrix

An affine transformation matrix performs a linear mapping from 2D coordinates to other 2D coordinates that preserves the “straightness” and “parallelness” of lines.

Such a coordinate transformation can be represented by a 3 row by 3 column matrix with an implied last row of `[ 0 0 1 ]`. This matrix transforms source coordinates `(x, y)` into destination coordinates `(x',y')` by considering them to be a column vector and multiplying the coordinate vector by the matrix according to the following process:

```
[ x ]   [ a  c  tx ] [ x ]   [ a * x + c * y + tx ]
[ y ] = [ b  d  ty ] [ y ] = [ b * x + d * y + ty ]
[ 1 ]   [ 0  0  1  ] [ 1 ]   [         1          ]
```

Note the locations of b and c.

This class is optimized for speed and minimizes calculations based on its knowledge of the underlying matrix (as opposed to say simply performing matrix multiplication).

## Constructors

[**Matrix**()](https://paperjs.org/reference/matrix/#matrix)

Creates a 2D affine transformation matrix that describes the identity transformation.

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix)

[**Matrix**(a, b, c, d, tx, ty)](https://paperjs.org/reference/matrix/#matrix-a-b-c-d-tx-ty)

Creates a 2D affine transformation matrix.

#### Parameters:

* a:
  Number
  — the a property of the transform
* b:
  Number
  — the b property of the transform
* c:
  Number
  — the c property of the transform
* d:
  Number
  — the d property of the transform
* tx:
  Number
  — the tx property of the transform
* ty:
  Number
  — the ty property of the transform

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix)

[**Matrix**(values)](https://paperjs.org/reference/matrix/#matrix-values)

Creates a 2D affine transformation matrix.

#### Parameters:

* values:
  Array of Numbers
  — the matrix values to initialize this matrix with

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix)

[**Matrix**(matrix)](https://paperjs.org/reference/matrix/#matrix-matrix)

Creates a 2D affine transformation matrix.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to copy the values from

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix)

## Properties

[**a**](https://paperjs.org/reference/matrix/#a)

The value that affects the transformation along the x axis when scaling or rotating, positioned at (0, 0) in the transformation matrix.

#### Type:

* Number

[**b**](https://paperjs.org/reference/matrix/#b)

The value that affects the transformation along the y axis when rotating or skewing, positioned at (1, 0) in the transformation matrix.

#### Type:

* Number

[**c**](https://paperjs.org/reference/matrix/#c)

The value that affects the transformation along the x axis when rotating or skewing, positioned at (0, 1) in the transformation matrix.

#### Type:

* Number

[**d**](https://paperjs.org/reference/matrix/#d)

The value that affects the transformation along the y axis when scaling or rotating, positioned at (1, 1) in the transformation matrix.

#### Type:

* Number

[**tx**](https://paperjs.org/reference/matrix/#tx)

The distance by which to translate along the x axis, positioned at (2, 0) in the transformation matrix.

#### Type:

* Number

[**ty**](https://paperjs.org/reference/matrix/#ty)

The distance by which to translate along the y axis, positioned at (2, 1) in the transformation matrix.

#### Type:

* Number

[**values**](https://paperjs.org/reference/matrix/#values)

The matrix values as an array, in the same sequence as they are passed to [initialize(a, b, c, d, tx, ty)](https://paperjs.org/reference/matrix#initialize-a-b-c-d-tx-ty).

Read only.

#### Type:

* Array of Numbers

[**translation**](https://paperjs.org/reference/matrix/#translation)

The translation of the matrix as a vector.

Read only.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**scaling**](https://paperjs.org/reference/matrix/#scaling)

The scaling values of the matrix, if it can be decomposed.

Read only.

#### Type:

* [Point](https://paperjs.org/reference/point)

#### See also:

* [decompose](https://paperjs.org/reference/matrix#decompose)()

[**rotation**](https://paperjs.org/reference/matrix/#rotation)

The rotation angle of the matrix, if it can be decomposed.

Read only.

#### Type:

* Number

#### See also:

* [decompose](https://paperjs.org/reference/matrix#decompose)()

## Methods

[**set**(...values)](https://paperjs.org/reference/matrix/#set-values)

Sets the matrix to the passed values. Note that any sequence of parameters that is supported by the various [Matrix](https://paperjs.org/reference/matrix)() constructors also work for calls of `set()`.

#### Parameters:

* values:
  any value

#### Returns:

* [Point](https://paperjs.org/reference/point)

[**clone**()](https://paperjs.org/reference/matrix/#clone)

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — a copy of this transform

[**equals**(matrix)](https://paperjs.org/reference/matrix/#equals-matrix)

Checks whether the two matrices describe the same transformation.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to compare this matrix to

#### Returns:

* Boolean — true if the matrices are equal, false otherwise

[**toString**()](https://paperjs.org/reference/matrix/#tostring)

#### Returns:

* String — a string representation of this transform

[**reset**()](https://paperjs.org/reference/matrix/#reset)

Resets the matrix by setting its values to the ones of the identity matrix that results in no transformation.

[**apply**([recursively])](https://paperjs.org/reference/matrix/#apply)

Attempts to apply the matrix to the content of item that it belongs to, meaning its transformation is baked into the item’s content or children.

#### Parameters:

* recursively:
  Boolean
  — controls whether to apply transformations recursively on children
  — optional, default: true

#### Returns:

* Boolean — true if the matrix was applied, false otherwise

[**translate**(point)](https://paperjs.org/reference/matrix/#translate-point)

Concatenates this matrix with a translate transformation.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the vector to translate by

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**translate**(dx, dy)](https://paperjs.org/reference/matrix/#translate-dx-dy)

Concatenates this matrix with a translate transformation.

#### Parameters:

* dx:
  Number
  — the distance to translate in the x direction
* dy:
  Number
  — the distance to translate in the y direction

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**scale**(scale[, center])](https://paperjs.org/reference/matrix/#scale-scale)

Concatenates this matrix with a scaling transformation.

#### Parameters:

* scale:
  Number
  — the scaling factor
* center:
  [Point](https://paperjs.org/reference/point)
  — the center for the scaling transformation
  — optional

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**scale**(hor, ver[, center])](https://paperjs.org/reference/matrix/#scale-hor-ver)

Concatenates this matrix with a scaling transformation.

#### Parameters:

* hor:
  Number
  — the horizontal scaling factor
* ver:
  Number
  — the vertical scaling factor
* center:
  [Point](https://paperjs.org/reference/point)
  — the center for the scaling transformation
  — optional

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**rotate**(angle, center)](https://paperjs.org/reference/matrix/#rotate-angle-center)

Concatenates this matrix with a rotation transformation around an anchor point.

#### Parameters:

* angle:
  Number
  — the angle of rotation measured in degrees
* center:
  [Point](https://paperjs.org/reference/point)
  — the anchor point to rotate around

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**rotate**(angle, x, y)](https://paperjs.org/reference/matrix/#rotate-angle-x-y)

Concatenates this matrix with a rotation transformation around an anchor point.

#### Parameters:

* angle:
  Number
  — the angle of rotation measured in degrees
* x:
  Number
  — the x coordinate of the anchor point
* y:
  Number
  — the y coordinate of the anchor point

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**shear**(shear[, center])](https://paperjs.org/reference/matrix/#shear-shear)

Concatenates this matrix with a shear transformation.

#### Parameters:

* shear:
  [Point](https://paperjs.org/reference/point)
  — the shear factor in x and y direction
* center:
  [Point](https://paperjs.org/reference/point)
  — the center for the shear transformation
  — optional

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**shear**(hor, ver[, center])](https://paperjs.org/reference/matrix/#shear-hor-ver)

Concatenates this matrix with a shear transformation.

#### Parameters:

* hor:
  Number
  — the horizontal shear factor
* ver:
  Number
  — the vertical shear factor
* center:
  [Point](https://paperjs.org/reference/point)
  — the center for the shear transformation
  — optional

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**skew**(skew[, center])](https://paperjs.org/reference/matrix/#skew-skew)

Concatenates this matrix with a skew transformation.

#### Parameters:

* skew:
  [Point](https://paperjs.org/reference/point)
  — the skew angles in x and y direction in degrees
* center:
  [Point](https://paperjs.org/reference/point)
  — the center for the skew transformation
  — optional

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**skew**(hor, ver[, center])](https://paperjs.org/reference/matrix/#skew-hor-ver)

Concatenates this matrix with a skew transformation.

#### Parameters:

* hor:
  Number
  — the horizontal skew angle in degrees
* ver:
  Number
  — the vertical skew angle in degrees
* center:
  [Point](https://paperjs.org/reference/point)
  — the center for the skew transformation
  — optional

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this affine transform

[**append**(matrix)](https://paperjs.org/reference/matrix/#append-matrix)

Appends the specified matrix to this matrix. This is the equivalent of multiplying `(this matrix) * (specified matrix)`.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to append

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this matrix, modified

[**prepend**(matrix)](https://paperjs.org/reference/matrix/#prepend-matrix)

Prepends the specified matrix to this matrix. This is the equivalent of multiplying `(specified matrix) * (this matrix)`.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to prepend

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this matrix, modified

[**appended**(matrix)](https://paperjs.org/reference/matrix/#appended-matrix)

Returns a new matrix as the result of appending the specified matrix to this matrix. This is the equivalent of multiplying `(this matrix) * (specified matrix)`.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to append

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — the newly created matrix

[**prepended**(matrix)](https://paperjs.org/reference/matrix/#prepended-matrix)

Returns a new matrix as the result of prepending the specified matrix to this matrix. This is the equivalent of multiplying `(specified matrix) * (this matrix)`.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to prepend

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — the newly created matrix

[**invert**()](https://paperjs.org/reference/matrix/#invert)

Inverts the matrix, causing it to perform the opposite transformation. If the matrix is not invertible (in which case [isSingular](https://paperjs.org/reference/matrix#issingular)() returns true), `null` is returned.

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this matrix, or `null`, if the matrix is singular.

[**inverted**()](https://paperjs.org/reference/matrix/#inverted)

Creates a new matrix that is the inversion of this matrix, causing it to perform the opposite transformation. If the matrix is not invertible (in which case [isSingular](https://paperjs.org/reference/matrix#issingular)() returns true), `null` is returned.

#### Returns:

* [Matrix](https://paperjs.org/reference/matrix) — this matrix, or `null`, if the matrix is singular.

[**isIdentity**()](https://paperjs.org/reference/matrix/#isidentity)

#### Returns:

* Boolean — whether this matrix is the identity matrix

[**isInvertible**()](https://paperjs.org/reference/matrix/#isinvertible)

Checks whether the matrix is invertible. A matrix is not invertible if the determinant is 0 or any value is infinite or NaN.

#### Returns:

* Boolean — whether the matrix is invertible

[**isSingular**()](https://paperjs.org/reference/matrix/#issingular)

Checks whether the matrix is singular or not. Singular matrices cannot be inverted.

#### Returns:

* Boolean — whether the matrix is singular

[**transform**(point)](https://paperjs.org/reference/matrix/#transform-point)

Transforms a point and returns the result.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to be transformed

#### Returns:

* [Point](https://paperjs.org/reference/point) — the transformed point

[**transform**(src, dst, count)](https://paperjs.org/reference/matrix/#transform-src-dst-count)

Transforms an array of coordinates by this matrix and stores the results into the destination array, which is also returned.

#### Parameters:

* src:
  Array of Numbers
  — the array containing the source points as x, y value pairs
* dst:
  Array of Numbers
  — the array into which to store the transformed point pairs
* count:
  Number
  — the number of points to transform

#### Returns:

* Array of Numbers — the dst array, containing the transformed coordinates

[**inverseTransform**(point)](https://paperjs.org/reference/matrix/#inversetransform-point)

Inverse transforms a point and returns the result.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to be transformed

#### Returns:

* [Point](https://paperjs.org/reference/point)

[**decompose**()](https://paperjs.org/reference/matrix/#decompose)

Decomposes the affine transformation described by this matrix into `scaling`, `rotation` and `skewing`, and returns an object with these properties.

#### Returns:

* Object — the decomposed matrix

[**applyToContext**(ctx)](https://paperjs.org/reference/matrix/#applytocontext-ctx)

Applies this matrix to the specified Canvas Context.

#### Parameters:

* ctx:
  CanvasRenderingContext2D
