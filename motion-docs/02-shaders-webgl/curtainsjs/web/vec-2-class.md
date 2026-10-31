---
source: https://www.curtainsjs.com/vec-2-class.html
title: "curtains.js | Documentation | Vec2 class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Vec2 class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Vec2.js "Vec2 class source code")

## Basic usage

Vec2 is the class used for all 2 dimensions vector manipulations.

### Creation

To create a new Vec2, just use its constructor.
If used without parameters, it will create a null vector Vec2 with X and Y components equal to 0.

// create two new Vec2 vectors

const nullVector = new Vec2();

const vector = new Vec2(1, 1);

### Use chaining

Since most of the Vec2 methods return the vector itself, you can use chaining:

// create a new Vec2 vector and chain methods

const vector = new Vec2().addScalar(2).normalize();

### onChange callback

Vec2 class is using getters and setters, allowing to execute a function each time one of the vector components changes:

// create a new Vec2 vector and listen to its changes

const vector = new Vec2().onChange(() => {

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

## Properties

* **x** (float): v7.0

  Value along X axis.
* **y** (float): v7.0

  Value along Y axis.

## Methods

* **add**(vector): v7.0

  Adds a vector to this vector.

  + vector

    Vec2 class object

    vector to add

  **returns:** this vector after addition.
* **addScalar**(scalar): v7.0

  Adds a scalar to this vector.

  + scalar

    float

    number to add

  **returns:** this vector after addition.
* **clone**(): v7.0

  Clone this vector.

  **returns:** new cloned vector.
* **copy**(vector): v7.0

  Copy a vector into this vector.

  + vector

    Vec2 class object

    vector to copy

  **returns:** this vector after copy.
* **dot**(vector): v7.0

  Calculates the dot product of 2 vectors.

  + vector

    Vec2 class object

    vector to use for dot product

  **returns:** a float representing the dot product of the 2 vectors.
* **equals**(vector): v7.0

  Checks if 2 vectors are equal.

  + vector

    Vec2 class object

    vector to compare

  **returns:** true if the 2 vectors are equals, false otherwise.
* **max**(vector): v7.0

  Apply max values to this vector.

  + vector

    Vec2 class object

    vector representing max values

  **returns:** vector with max values applied.
* **min**(vector): v7.0

  Apply min values to this vector.

  + vector

    Vec2 class object

    vector representing min values

  **returns:** vector with min values applied.
* **multiply**(vector): v7.1

  Multiplies a vector with this vector.

  + vector

    Vec2 class object

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
* **sanitizeNaNValuesWith**(vector): v7.0

  Merges this vector with a vector when values are NaN. Mostly used internally to avoid errors.

  + vector

    Vec2 class object

    vector to use for sanitization (i.e. set this vector value if original vector value is NaN).

  **returns:** sanitized vector.
* **set**(x, y): v7.0

  Sets the vector from values.

  + x

    float

    X component of our vector.
  + y

    float

    Y component of our vector.

  **returns:** this vector after being set.
* **sub**(vector): v7.0

  Subtracts a vector from this vector.

  + vector

    Vec2 class object

    vector to use for subtraction.

  **returns:** this vector after subtraction.
* **subScalar**(scalar): v7.0

  Subtracts a scalar to this vector.

  + scalar

    float

    number to use for subtraction.

  **returns:** this vector after subtraction.

## Events

* **onChange**(callback): v8.0

  Execute a function each time the x or y component of the vector changed.

  + callback

    function

    function to execute.

  **returns:** your Vec2 object, allowing it to be chainable.
