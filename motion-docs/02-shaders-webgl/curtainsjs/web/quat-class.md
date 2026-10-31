---
source: https://www.curtainsjs.com/quat-class.html
title: "curtains.js | Documentation | Quat class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Quat class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/math/Quat.js "Quat class source code")

## Basic usage

Quat is the class used for rotation quaternions manipulations. Quaternions are used to represent rotations in the 3D space.

### Creation

To create a new Quat, just use its constructor.
If used without parameters, it will create a quaternion representing a rotation of angle 0 along X, Y and Z axes with "XYZ" as axis order: [0, 0, 0, 1].

// create a new Quat quaternion

const quaternion = new Quat();

### Use chaining

Since most of the Quat methods return the quaternion itself, you can use chaining:

// create a new Quat quaternion and chain methods

const quaternion = new Quat().setAxisOrder("YXZ").setFromVec3(new Vec3(1, 1, 1));

## Parameters

* elements

  array of floats of length 4, optional

  values to use for that quaternion. Default to [0, 0, 0, 1].
* axisOrder

  string, optional

  axis order to use for the rotation calculations. Default to "XYZ".

## Properties

* **elements** (Float32Array): v7.0

  A Float32Array of floats of length 4 representing that quaternion.
* **axisOrder** (string): v7.0

  Axis order to use for the 3D rotation calculations.

## Methods

* **clone**(): v7.2

  Clone this quaternion.

  **returns:** new cloned quaternion.
* **copy**(quaternion): v7.0

  Copy a quaternion into this quaternion.

  + quaternion

    Quat class object

    quaternion to copy

  **returns:** this quaternion after copy.
* **equals**(quaternion): v7.0

  Checks if 2 quaternions are equal (i.e. have the same values and axis orders).

  + quaternion

    Quat class object

    quaternion to compare

  **returns:** true if the 2 quaternions are equals, false otherwise.
* **setAxisOrder**(axisOrder): v7.0

  Sets the quaternion values from an array.

  + axisOrder

    string

    a string representing the axis order to use. Could be "XYZ", "YXZ", "ZXY", "ZYX", "YZX" or "XZY".

  **returns:** this quaternion after axis order has been set.
* **setFromArray**(array): v7.0

  Sets the quaternion values from an array.

  + array

    array

    an array of at least 4 floats

  **returns:** this quaternion after being set.
* **setFromVec3**(vector): v7.0

  Sets a rotation quaternion using Euler angles as a Vec3 and its axis order.

  + vector

    [Vec3](https://www.curtainsjs.com/vec-3-class.html) class object

    rotation vector to set our quaternion from

  **returns:** this quaternion after having applied the rotation.
