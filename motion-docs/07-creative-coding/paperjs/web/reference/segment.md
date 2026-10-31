---
source: https://paperjs.org/reference/segment/
title: "Paper.js — Segment"
fetched: 2026-10-28
---

# Segment

The Segment object represents the points of a path through which its [Curve](https://paperjs.org/reference/curve) objects pass. The segments of a path can be accessed through its [path.segments](https://paperjs.org/reference/path#segments) array.

Each segment consists of an anchor point ([segment.point](https://paperjs.org/reference/segment#point)) and optionally an incoming and an outgoing handle ([segment.handleIn](https://paperjs.org/reference/segment#handlein) and [segment.handleOut](https://paperjs.org/reference/segment#handleout)), describing the tangents of the two [Curve](https://paperjs.org/reference/curve) objects that are connected by this segment.

## Constructors

[**Segment**([point[, handleIn[, handleOut]]])](https://paperjs.org/reference/segment/#segment)

Creates a new Segment object.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the anchor point of the segment
  — optional, default: {x: 0, y: 0}
* handleIn:
  [Point](https://paperjs.org/reference/point)
  — the handle point relative to the anchor point of the segment that describes the in tangent of the segment
  — optional, default: {x: 0, y: 0}
* handleOut:
  [Point](https://paperjs.org/reference/point)
  — the handle point relative to the anchor point of the segment that describes the out tangent of the segment
  — optional, default: {x: 0, y: 0}

#### Returns:

* [Segment](https://paperjs.org/reference/segment)

#### Example:

Run

[**Segment**(object)](https://paperjs.org/reference/segment/#segment-object)

Creates a new Segment object.

#### Parameters:

* object:
  Object
  — an object containing properties to be set on the segment

#### Returns:

* [Segment](https://paperjs.org/reference/segment)

#### Example:Creating segments using object notation:

Run

## Properties

[**name**](https://paperjs.org/reference/segment/#name)

The name of the segment. If the segment has a name, it can be accessed by name through its path’s segments list. If several segments share a name, the first one is found.

The name is stored in JSON, but not in SVG.

#### Type:

* String⟋null

#### Example:

```
var path = new Path([10, 10], [50, 10], [50, 50]);
path.segments[1].name = 'corner';
console.log(path.segments['corner'].point); // { x: 50, y: 10 }
```

[**data**](https://paperjs.org/reference/segment/#data)

A plain javascript object which can be used to store arbitrary data on the segment.

The data is stored in JSON, but not in SVG.

#### Type:

* Object

#### Example:

```
var segment = new Segment(100, 100);
segment.data.isCorner = true;
```

#### Example:

```
var segment = new Segment({
    point: [100, 50],
    handleOut: [80, 100],
    data: {
        isCorner: true
    }
});
console.log(segment.data.isCorner); // true
```

[**point**](https://paperjs.org/reference/segment/#point)

The anchor point of the segment.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**handleIn**](https://paperjs.org/reference/segment/#handlein)

The handle point relative to the anchor point of the segment that describes the in tangent of the segment.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**handleOut**](https://paperjs.org/reference/segment/#handleout)

The handle point relative to the anchor point of the segment that describes the out tangent of the segment.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**selected**](https://paperjs.org/reference/segment/#selected)

Specifies whether the segment is selected.

#### Type:

* Boolean

#### Example:

Run

### Hierarchy

[**index**](https://paperjs.org/reference/segment/#index)

The index of the segment in the [path.segments](https://paperjs.org/reference/path#segments) array that the segment belongs to.

Read only.

#### Type:

* Number

[**path**](https://paperjs.org/reference/segment/#path)

The path that the segment belongs to.

Read only.

#### Type:

* [Path](https://paperjs.org/reference/path)

[**curve**](https://paperjs.org/reference/segment/#curve)

The curve that the segment belongs to. For the last segment of an open path, the previous segment is returned.

Read only.

#### Type:

* [Curve](https://paperjs.org/reference/curve)

[**location**](https://paperjs.org/reference/segment/#location)

The curve location that describes this segment’s position on the path.

Read only.

#### Type:

* [CurveLocation](https://paperjs.org/reference/curvelocation)

### Sibling Segments

[**next**](https://paperjs.org/reference/segment/#next)

The next segment in the [path.segments](https://paperjs.org/reference/path#segments) array that the segment belongs to. If the segments belongs to a closed path, the first segment is returned for the last segment of the path.

Read only.

#### Type:

* [Segment](https://paperjs.org/reference/segment)

[**previous**](https://paperjs.org/reference/segment/#previous)

The previous segment in the [path.segments](https://paperjs.org/reference/path#segments) array that the segment belongs to. If the segments belongs to a closed path, the last segment is returned for the first segment of the path.

Read only.

#### Type:

* [Segment](https://paperjs.org/reference/segment)

## Methods

[**hasHandles**()](https://paperjs.org/reference/segment/#hashandles)

Checks if the segment has any curve handles set. Handles of which both coordinates are 0 within a tolerance of 1e-12 count as not set, see [point.isZero](https://paperjs.org/reference/point#iszero)().

#### Returns:

* Boolean — true if the segment has handles set, false otherwise

#### See also:

* [segment.handleIn](https://paperjs.org/reference/segment#handlein)
* [segment.handleOut](https://paperjs.org/reference/segment#handleout)
* [curve.hasHandles](https://paperjs.org/reference/curve#hashandles)()
* [path.hasHandles](https://paperjs.org/reference/path#hashandles)()

[**isSmooth**()](https://paperjs.org/reference/segment/#issmooth)

Checks if the segment connects two curves smoothly, meaning that its two handles are collinear and segment does not form a corner.

#### Returns:

* Boolean — true if the segment is smooth, false otherwise

#### See also:

* [point.isCollinear](https://paperjs.org/reference/point#iscollinear)()

[**clearHandles**()](https://paperjs.org/reference/segment/#clearhandles)

Clears the segment’s handles by setting their coordinates to zero, turning the segment into a corner.

[**smooth**([options])](https://paperjs.org/reference/segment/#smooth)

Smooths the bezier curves that pass through this segment by taking into account the segment’s position and distance to the neighboring segments and changing the direction and length of the segment’s handles accordingly without moving the segment itself.

Two different smoothing methods are available:

* `'catmull-rom'` uses the Catmull-Rom spline to smooth the segment.

  The optionally passed factor controls the knot parametrization of the algorithm:

  + `0.0`: the standard, uniform Catmull-Rom spline
  + `0.5`: the centripetal Catmull-Rom spline, guaranteeing no self-intersections
  + `1.0`: the chordal Catmull-Rom spline
* `'geometric'` use a simple heuristic and empiric geometric method to smooth the segment’s handles. The handles were weighted, meaning that big differences in distances between the segments will lead to probably undesired results.

  The optionally passed factor defines the tension parameter (`0…1`), controlling the amount of smoothing as a factor by which to scale each handle.

#### Options:

* options.type: String — the type of smoothing method: ‘catmull-rom’, ‘geometric’ — default: ‘catmull-rom’
* options.factor: Number — the factor parameterizing the smoothing method — default: `0.5` for `'catmull-rom'`, `0.4` for `'geometric'`

#### Parameters:

* options:
  Object
  — the smoothing options
  — optional

#### See also:

* [pathItem.smooth([options])](https://paperjs.org/reference/pathitem#smooth)

[**isFirst**()](https://paperjs.org/reference/segment/#isfirst)

Checks if the this is the first segment in the [path.segments](https://paperjs.org/reference/path#segments) array.

#### Returns:

* Boolean — true if this is the first segment, false otherwise

[**isLast**()](https://paperjs.org/reference/segment/#islast)

Checks if the this is the last segment in the [path.segments](https://paperjs.org/reference/path#segments) array.

#### Returns:

* Boolean — true if this is the last segment, false otherwise

[**reverse**()](https://paperjs.org/reference/segment/#reverse)

Reverses the [handleIn](https://paperjs.org/reference/segment#handlein) and [handleOut](https://paperjs.org/reference/segment#handleout) vectors of this segment, modifying the actual segment without creating a copy.

#### Returns:

* [Segment](https://paperjs.org/reference/segment) — the reversed segment

[**reversed**()](https://paperjs.org/reference/segment/#reversed)

Returns the reversed the segment, without modifying the segment itself.

#### Returns:

* [Segment](https://paperjs.org/reference/segment) — the reversed segment

[**remove**()](https://paperjs.org/reference/segment/#remove)

Removes the segment from the path that it belongs to.

#### Returns:

* Boolean — true if the segment was removed, false otherwise

[**clone**()](https://paperjs.org/reference/segment/#clone)

#### Returns:

* [Segment](https://paperjs.org/reference/segment)

[**toString**()](https://paperjs.org/reference/segment/#tostring)

#### Returns:

* String — a string representation of the segment

[**transform**(matrix)](https://paperjs.org/reference/segment/#transform-matrix)

Transform the segment by the specified matrix.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix to transform the segment by

[**interpolate**(from, to, factor)](https://paperjs.org/reference/segment/#interpolate-from-to-factor)

Interpolates between the two specified segments and sets the point and handles of this segment accordingly.

#### Parameters:

* from:
  [Segment](https://paperjs.org/reference/segment)
  — the segment defining the geometry when `factor` is `0`
* to:
  [Segment](https://paperjs.org/reference/segment)
  — the segment defining the geometry when `factor` is `1`
* factor:
  Number
  — the interpolation coefficient, typically between `0` and `1`, but extrapolation is possible too
