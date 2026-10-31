---
source: https://paperjs.org/tutorials/geometry/vector-geometry
title: "Paper.js — Vector Geometry"
fetched: 2026-10-28
---

# Vector Geometry

Vector geometry is a first class citizen in Paper.js. It is a great advantage to understand its basic principles when learning to write scripts for it. After all, there is a reason for the word *Vector* in *Vector Graphics*.

While building [Scriptographer](http://scriptographer.org) we found vector geometry to be a powerful way of working with positions, movement and paths. Once understood, it proves to be a lot more intuitive and flexible than working with the x- and y- values of the coordinate system directly, as most other visually oriented programming environments do.

As an example of the elegance of vector geometry, here is an interactive example of a brush tool. With only 24 lines of code, it produces a mouse tool that acts like a brush, with a variable thickness depending on speed and a sense of a natural expression.

Click and drag in the view below:

Source

This script is developed step by step in the [Working with Mouse Vectors](https://paperjs.org/tutorials/interaction/working-with-mouse-vectors/) tutorial, along with explanations about each line of code. But before looking at such an applied example, it is crucial to understand the basic principles of vector geometry outlined here.

## Points and Vectors

In many ways, vectors are very similar to points. Both are represented by x and y coordinates. But while points describe absolute positions, vectors represent a relative information; a way to get from one point to another. Here a step-by-step example that explains the relation between vectors and points.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Points-And-Vectors-01.gif)

We start by creating two [Point](https://paperjs.org/tutorials/geometry/point-size-and-rectangle/#point) objects to describe two absolute locations in the document, defined by their coordinate values:

```
var point1 = new Point(50, 50);
var point2 = new Point(110, 200);
```

![](https://paperjs.org/tutorials/geometry/vector-geometry/Points-And-Vectors-02.gif)

In order to get from point1 to point2, we can say we need to move 60 to the right (in x-direction), and 150 down (in y-direction). These values are the result of subtracting the x- and y-coordinates of point1 from the ones of point2:

```
var x = point2.x - point1.x;
// = 110 - 50 = 60
var y = point2.y - point1.y;
// = 200 - 50 = 150;
```

In other words, by adding these two values to the coordinates of point1, we end up at point2.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Points-And-Vectors-03.gif)

Instead of using these two separate values, it is much easier to use a vector as a container for them. To calculate this vector, we can simply subtract point1 from point2 instead of the two separate subtractions in the previous step:

```
var vector = point2 - point1;
// = { x: 110, y: 200 } - { x: 50, y: 50 }
// = { x: 60, y: 150 }
```

#### Please note:

Read more about mathematical operations in the [Mathematical Operations](https://paperjs.org/tutorials/geometry/mathematical-operations/#mathematical-operations) tutorial.

The result of this subtraction (vector) is still a [Point](https://paperjs.org/tutorials/geometry/point-size-and-rectangle/#point) object. Technically, there is no distinction between points and vectors. It is just their meaning that changes: A point is absolute, a vector is relative.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Points-And-Vectors-04.gif)

Vectors can also be described as arrows. Similar to arrows, they point in a certain direction, and also indicate an amount of distance to move in that direction. An alternative and often more useful way of describing a vector is therefore by angle and length.

The Point object exposes this alternative notation through the [point.angle](https://paperjs.org/reference/point#angle) and [point.length](https://paperjs.org/reference/point#length) properties, which both can be modified too.

```
console.log(vector.length);
// 161.55494
console.log(vector.angle);
// 68.19859
```

#### Please note:

By default, all angles in Paper.js are measured in degrees. Read more about angles and rotation in the chapter about [Rotating Vectors](https://paperjs.org/tutorials/geometry/vector-geometry/#rotating-vectors-and-working-with-angles).

It is so important that we repeat it again: Vectors contain relative information. All a vector tells us is in which direction and how far to move.

The easiest use of such a vector is to add it to an absolute position of a point. The result will again be an absolute point, which will be at a position shifted from the originating point by the amount specified by the vector. In this way we can add the same vector to many points, as illustrated in the image bellow. The vectors you see are all the same, but the points resulting from adding it to a group of existing points in different locations all differ.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vectors.gif)

## Calculating with Vectors

As shown by the simple examples above, the power of vectors really comes into play when we use them in mathematical calculations, treating them as if they were simple values. Here is an overview of the different possible operations.

## Vector Addition and Subtraction

A vector can be added to another, and the result is the same as if we superposed two descriptions of how to get from one place to another, resulting in a third vector.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vector-Addition-01.gif)

We start with four points:

```
var point1 = new Point(50, 0);
var point2 = new Point(40, 100);

var point3 = new Point(5, 135);
var point4 = new Point(75, 170);
```

As seen in [Points and Vectors](https://paperjs.org/tutorials/geometry/vector-geometry/#points-and-vectors), we can now calculate the two vectors by subtracting the points from each other:

```
var vector1 = point2 - point1;
// = { x: 40, y: 100 } - { x: 50, y: 0 }
// = { x: -10, y: 100 }

var vector2 = point4 - point3;
// = { x: 75, y: 170 } - { x: 5, y: 135 }
// = { x: 70, y: 35 }
```

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vector-Addition-02.gif)

To start at startPoint, follow vector1 and then vector2, we could first add vector1 to the startPoint, retrieve the resulting tempPoint and then add vector2 to that to get to the desired endPoint.

```
var tempPoint = startPoint + vector1;
var endPoint = tempPoint + vector2;
```

But if we would like to apply the same combined vector to many points, this calculation would be unnecessarily complicated, as we would have to go through the tempPoint each time.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vector-Addition-03.gif)

Instead, we can just add vector1 to vector2 and use the resulting object as a new vector that describes the combined movement.

```
var vector = vector1 + vector2;
```

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vector-Addition-04.gif)

But we can also do the opposite and subtract a vector from another instead of adding it. The result is the same as if we would go in the opposite direction of the vector that we are subtracting.

```
var vector = vector1 - vector2;
```

#### Please note:

The results of these operations is the same as the addition or subtraction of each vector's x and y coordinates. It would not work however to add or subtract the length or angle values.

## Vector Multiplication and Division

It is quite easy to imagine what a multiplication or division with a numerical value would do to a vector: Instead of saying "go 10 meters into that direction", it would for example correspond to "3 times 10 meters into that direction". A multiplied vector does not change its angle. But its length is changed, by the amount of the multiplied value.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vector-Multiplication.gif)

```
var bigVector = smallVector * 3;
```

Or, to go the other way:

```
var smallVector = bigVector / 3;
```

#### Please note:

Due to a limitation of Javascript, we need to make sure that the vector to be multiplied or divided is on the left-hand side of the operation. This is because the left-hand side defines the nature of the type returned from the operation. To write the following would therefore produce invalid results:

```
var bigVector = 3 * smallVector;
```

## Changing a Vector's Length

So we learned that multiplying or dividing a vector changes its length without modifying its angle. But we can also change the length property on vector objects directly:

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vector-Length-01.gif)

First we create a vector by directly using the Point constructor, since vectors and points are actually the same type of objects:

```
var vector = new Point(24, 60);
console.log(vector.length);
// 64.62198
```

Now we change the vector's length property. This is similar to the multiplication in the previous example, but modifies the object directly:

```
vector.length = vector.length * 3;
console.log(vector.length);
// 193.86593
```

![](https://paperjs.org/tutorials/geometry/vector-geometry/Vector-Length-02.gif)

We can also set the length to a fixed value, stretching or shrinking the vector to this length:

```
vector.length = 100;
```

Another way to change the vector's length is the [point.normalize()](https://paperjs.org/reference/point#normalize) method. In Mathematics to normalize a vector means to resize it so its length is 1. normalize() handles that for us, and also accepts an optional parameter that defines the length to normalize to, if we would like it to be other than 1.

We start with the same vector as in the example above on line 1. Let's look at the normalized version of this vector:

```
var vector = new Point(24, 60);
var normalizedVector = vector.normalize();
console.log(vector.length);
// 64.62198
console.log(normalizedVector.length);
// 1
```

Note that the length of normalizedVector is now 1, while the original vector remains unmodified. normalize() does not modify the vector it is called on, instead it returns a new normalized vector object.

Now what happens if we normalize to 10 instead?

```
var normalizedVector = vector.normalize(10);
console.log(normalizedVector.length);
// 10
```

As expected, the returned vector has a length of 10. Note that we could also multiply the first normalized vector with 10:

```
var normalizedVector = vector.normalize() * 10;
console.log(normalizedVector.length);
// 10
```

## Rotating Vectors and Working with Angles

Rotating vectors is a powerful tool for constructing paths and shapes, as it allows us to define a relative direction at a certain angle rotated away from another direction, for example sideways. The [Working with Mouse Vectors](https://paperjs.org/tutorials/interaction/working-with-mouse-vectors/) tutorial shows a good example of this, where rotated vectors are used to construct paths in parallel to the direction and position of the moved mouse.

![](https://paperjs.org/tutorials/geometry/vector-geometry/Angles.gif)

All angles in Paper.js are measured in degrees, and are oriented clockwise. The angle values start from the horizontal axis and expand downwards. At 180° they flip to -180°, which is the same, since going halfway around a circle in the left or right direction results in the same position. This does not prevent you from setting angles to something higher than 180° though.

There are two ways to change the angle of a vector. The obvious one is by setting the vector's angle property to a new value. Let's first set up a vector that points 100 coordinates down and 100 to the right, and log its angle and length:

![](https://paperjs.org/tutorials/geometry/vector-geometry/Rotating-Vectors-01.gif)

```
var vector = new Point(100, 100);
console.log(vector.angle);
// 45
```

Since we are going in equal amounts down and to the right, it has an angle of 45°. Let's log it's length so we can check it after we have rotated the vector:

```
console.log(vector.length);
// 141.42136
```

![](https://paperjs.org/tutorials/geometry/vector-geometry/Rotating-Vectors-02.gif)

Now we rotate it by 90° clockwise by setting its angle to 45° + 90° = 135° and log the length again:

```
vector.angle = 135;
console.log(vector.length);
// 141.42136
```

Note how the length has not changed. All we changed is the vector's direction. If we log the whole vector again, we will see that its coordinates are not the same anymore:

```
console.log(vector);
// { x: -100, y: 100 }
```

![](https://paperjs.org/tutorials/geometry/vector-geometry/Rotating-Vectors-03.gif)

Instead of setting the angle directly to 135, we could have also explicitly increase it by 90°:

```
vector.angle = vector.angle + 90;
```

A simpler way of writing such an increase of a value is to use the += operator, as it prevents us from writing vector.angle twice:

```
vector.angle += 90;
```

## Operations, Methods and Properties

Note that mathematical operations (addition, subtraction, multiplication and division) and methods such as rotate() and normalize() do not modify the involved vector and point objects. Instead, they return the result as a new object. This means they can be chained and combined in expressions:

```
var point = event.middlePoint
		+ event.delta.rotate(90);
```

Changing a vector's angle or length on the other hand directly modifies the vector object, and can only be used outside of such expressions. Since we are directly modifying objects, we need to be careful about what we modify and use the clone() function when the original object shall not be modified.

```
var delta = event.delta.clone();
delta.angle += 90;
var point = event.middlePoint + delta;
```

## Vektor.js

The example script below is provided as a help to familiarise yourself with the concept of vectors.

Play around with it to get a feeling for how vectors work, and try to use it to repeat the principles learned in this tutorial.

Source
