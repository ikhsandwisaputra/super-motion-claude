---
source: https://www.curtainsjs.com/vec-3-class.html
title: "curtains.js | Documentation | Vec3 class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Vec3 class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Vec3.js "Vec3 class source code")

## Basic usage

Vec3 is the class used for all 3 dimensions vector manipulations.

### Creation

To create a new Vec3, just use its constructor.
If used without parameters, it will create a null vector Vec3 with X, Y and Z components equal to 0.

// create two new Vec3 vectors

const nullVector = new Vec3();

const vector = new Vec3(1, 1, 1);

### Use chaining

Since most of the Vec3 methods return the vector itself, you can use chaining:

// create a new Vec3 vector and chain methods

const vector = new Vec3().addScalar(2).normalize();

### onChange callback

Vec3 class is using getters and setters, allowing to execute a function each time one of the vector components changes:

// create a new Vec3 vector and listen to its changes

const vector = new Vec3().onChange(() => {

// one of the vector component just changed, do something...

const normalizedVector = vector.normalize();

});

// this will trigger our onChange callback

vector.x = 1;

// be careful, this will trigger onChange again!

vector.y = 2;

## Parameters

* X

  float, optional

  value along X axis. Default to 0.
* Y

  float, optional

  value along Y axis. Default to 0.
* Z

  float, optional

  value along Z axis. Default to 0.

## Properties

* **x** (float): v7.0

  Value along X axis.
* **y** (float): v7.0

  Value along Y axis.
* **z** (float): v7.0

  Value along Z axis.

## Methods

* **add**(vector): v7.0

  Adds a vector to this vector.

  + vector

    Vec3 class object

    vector to add

  **returns:** this vector after addition.
* **addScalar**(scalar): v7.0

  Adds a scalar to this vector.

  + scalar

    float

    number to add

  **returns:** this vector after addition.
* **applyMat4**(matrix): v7.0

  Apply a 4 dimensions Mat4 matrix to this vector.

  + matrix

    [Mat4](https://www.curtainsjs.com/mat-4-class.html) class object

    matrix to apply

  **returns:** this vector after matrix application.
* **applyQuat**(quaternion): v7.1

  Apply a quaternion (rotation in 3D space) to this vector.

  + quaternion

    [Quat](https://www.curtainsjs.com/quat-class.html) class object

    quaternion to apply

  **returns:** this vector after quaternion application.
* **clone**(): v7.0

  Clone this vector.

  **returns:** new cloned vector.
* **copy**(vector): v7.0

  Copy a vector into this vector.

  + vector

    Vec3 class object

    vector to copy

  **returns:** this vector after copy.
* **dot**(vector): v7.0

  Calculates the dot product of 2 vectors.

  + vector

    Vec3 class object

    vector to use for dot product

  **returns:** a float representing the dot product of the 2 vectors.
* **equals**(vector): v7.0

  Checks if 2 vectors are equal.

  + vector

    Vec3 class object

    vector to compare

  **returns:** true if the 2 vectors are equals, false otherwise.
* **max**(vector): v7.0

  Apply max values to this vector.

  + vector

    Vec3 class object

    vector representing max values

  **returns:** vector with max values applied.
* **min**(vector): v7.0

  Apply min values to this vector.

  + vector

    Vec3 class object

    vector representing min values

  **returns:** vector with min values applied.
* **multiply**(vector): v7.1

  Multiplies a vector with this vector.

  + vector

    Vec3 class object

    vector to use for multiplication

  **returns:** this vector after multiplication.
* **multiplyScalar**(scalar): v7.1

  Multiplies a scalar with this vector.

  + scalar

    float

    number to use for multiplication

  **returns:** this vector after multiplication.
* **normalize**(): v7.0

  Normalize this vector.

  **returns:** normalized vector.
* **project**(camera): v7.1

  Project 3D coordinate to 2D point.

  + camera

    Camera class object. Use a plane [camera](https://www.curtainsjs.com/plane-class.html#camera).

    camera to use to project this vector from 3D to 2D space.

  **returns:** this vector after having been projected.
* **sanitizeNaNValuesWith**(vector): v7.0

  Merges this vector with a vector when values are NaN. Mostly used internally to avoid errors.

  + vector

    Vec3 class object

    vector to use for sanitization (i.e. set this vector value if original vector value is NaN).

  **returns:** sanitized vector.
* **set**(x, y, z): v7.0

  Sets the vector from values.

  + x

    float

    X component of our vector.
  + y

    float

    Y component of our vector.
  + z

    float

    Z component of our vector.

  **returns:** this vector after being set.
* **sub**(vector): v7.0

  Subtracts a vector from this vector.

  + vector

    Vec3 class object

    vector to use for subtraction.

  **returns:** this vector after subtraction.
* **subScalar**(scalar): v7.0

  Subtracts a scalar to this vector.

  + scalar

    float

    number to use for subtraction.

  **returns:** this vector after subtraction.
* **unproject**(camera): v7.1

  Unproject 2D point to 3D coordinate.

  + camera

    Camera class object. Use a plane [camera](https://www.curtainsjs.com/plane-class.html#camera).

    camera to use to unproject this vector from 2D to 3D space.

  **returns:** this vector after having been unprojected.

## Events

* **onChange**(callback): v8.0

  Execute a function each time the x, y or z component of the vector changed.

  + callback

    function

    function to execute.

  **returns:** your Vec3 object, allowing it to be chainable.
