---
source: https://www.curtainsjs.com/mat-4-class.html
title: "curtains.js | Documentation | Mat4 class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Mat4 class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Mat4.js "Mat4 class source code")

## Basic usage

Mat4 is the class used for all 4 dimensions matrices manipulations.

### Creation

To create a new Mat4, just use its constructor.
If used without parameters, it will create a 4 dimensions identity matrix.

// create a new Mat4 identity matrix

const matrix = new Mat4();

### Use chaining

Since most of the Mat4 methods return the matrix itself, you can use chaining:

// create a new Mat4 matrix and chain methods

const matrix = new Mat4().multiply(new Mat4()).scale(new Vec3(2, 2, 2));

## Parameters

* elements

  array of length 16, optional

  values to use for that matrix. Default to 4 dimensions identity matrix.

## Properties

* **elements** (Float32Array): v7.0

  A Float32Array of length 16 representing that matrix.

## Methods

* **clone**(): v7.2

  Clone this matrix.

  **returns:** new cloned matrix.
* **composeFromOrigin**(translation, quaternion, scale, origin): v7.0

  Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin.
  Equivalent for applying translation, rotation and scale matrices but much faster.

  + translation

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    translation vector
  + quaternion

    [Quat](https://www.curtainsjs.com/quat-class.html) class object

    rotation quaternion
  + scale

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    scale vector
  + origin

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    origin vector around which to scale and rotate

  **returns:** this matrix after transformations.
* **copy**(matrix): v7.0

  Copy a matrix into this matrix.

  + matrix

    Mat4 class object

    matrix to copy

  **returns:** this matrix after copy.
* **getInverse**(): v7.1

  Creates a new matrix inverse from this matrix.

  **returns:** a new matrix inverse of this matrix.
* **multiply**(matrix): v7.0

  Multiply this matrix by the matrix passed as parameter.

  + matrix

    Mat4 class object

    matrix to multiply with.

  **returns:** this matrix after multiplication.
* **scale**(vector): v7.0

  Scale this matrix by the vector passed as parameter.

  + vector

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    vector to use for scaling

  **returns:** this matrix after scaling.
* **setFromArray**(array): v7.0

  Sets the matrix values from an array.

  + array

    array

    an array of at least 16 elements

  **returns:** this matrix after being set.
