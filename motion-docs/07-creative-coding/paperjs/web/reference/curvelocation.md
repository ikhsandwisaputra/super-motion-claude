---
source: https://paperjs.org/reference/curvelocation/
title: "Paper.js — CurveLocation"
fetched: 2026-10-28
---

# CurveLocation

CurveLocation objects describe a location on [Curve](https://paperjs.org/reference/curve) objects, as defined by the curve-time [time](https://paperjs.org/reference/curvelocation#time), a value between `0` (beginning of the curve) and `1` (end of the curve). If the curve is part of a [Path](https://paperjs.org/reference/path) item, its [index](https://paperjs.org/reference/curvelocation#index) inside the [path.curves](https://paperjs.org/reference/path#curves) array is also provided.

The class is in use in many places, such as [path.getLocationAt(offset)](https://paperjs.org/reference/path#getlocationat-offset), [path.getLocationOf(point)](https://paperjs.org/reference/path#getlocationof-point), [pathItem.getNearestLocation(point)](https://paperjs.org/reference/pathitem#getnearestlocation-point), [pathItem.getIntersections(path)](https://paperjs.org/reference/pathitem#getintersections-path), etc.

## Constructors

[**CurveLocation**(curve, time[, point])](https://paperjs.org/reference/curvelocation/#curvelocation-curve-time)

Creates a new CurveLocation object.

#### Parameters:

* curve:
  [Curve](https://paperjs.org/reference/curve)
* time:
  Number
* point:
  [Point](https://paperjs.org/reference/point)
  — optional

#### Returns:

* [CurveLocation](https://paperjs.org/reference/curvelocation)

## Properties

[**segment**](https://paperjs.org/reference/curvelocation/#segment)

The segment of the curve which is closer to the described location.

Read only.

#### Type:

* [Segment](https://paperjs.org/reference/segment)

[**curve**](https://paperjs.org/reference/curvelocation/#curve)

The curve that this location belongs to.

Read only.

#### Type:

* [Curve](https://paperjs.org/reference/curve)

[**path**](https://paperjs.org/reference/curvelocation/#path)

The path that this locations is situated on.

Read only.

#### Type:

* [Path](https://paperjs.org/reference/path)

[**index**](https://paperjs.org/reference/curvelocation/#index)

The index of the [curve](https://paperjs.org/reference/curvelocation#curve) within the [path.curves](https://paperjs.org/reference/path#curves) list, if it is part of a [Path](https://paperjs.org/reference/path) item.

Read only.

#### Type:

* Number

[**time**](https://paperjs.org/reference/curvelocation/#time)

The curve-time parameter, as used by various bezier curve calculations. It is value between `0` (beginning of the curve) and `1` (end of the curve).

Read only.

#### Type:

* Number

[**point**](https://paperjs.org/reference/curvelocation/#point)

The point which is defined by the [curve](https://paperjs.org/reference/curvelocation#curve) and [time](https://paperjs.org/reference/curvelocation#time).

Read only.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**offset**](https://paperjs.org/reference/curvelocation/#offset)

The length of the path from its beginning up to the location described by this object. If the curve is not part of a path, then the length within the curve is returned instead.

Read only.

#### Type:

* Number

[**curveOffset**](https://paperjs.org/reference/curvelocation/#curveoffset)

The length of the curve from its beginning up to the location described by this object.

Read only.

#### Type:

* Number

[**intersection**](https://paperjs.org/reference/curvelocation/#intersection)

The curve location on the intersecting curve, if this location is the result of a call to [pathItem.getIntersections(path)](https://paperjs.org/reference/pathitem#getintersections-path) / [curve.getIntersections(curve)](https://paperjs.org/reference/curve#getintersections-curve).

Read only.

#### Type:

* [CurveLocation](https://paperjs.org/reference/curvelocation)

[**tangent**](https://paperjs.org/reference/curvelocation/#tangent)

The tangential vector to the [curve](https://paperjs.org/reference/curvelocation#curve) at the given location.

Read only.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**normal**](https://paperjs.org/reference/curvelocation/#normal)

The normal vector to the [curve](https://paperjs.org/reference/curvelocation#curve) at the given location.

Read only.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**curvature**](https://paperjs.org/reference/curvelocation/#curvature)

The curvature of the [curve](https://paperjs.org/reference/curvelocation#curve) at the given location.

Read only.

#### Type:

* Number

[**distance**](https://paperjs.org/reference/curvelocation/#distance)

The distance from the queried point to the returned location.

Read only.

#### Type:

* Number

#### See also:

* [curve.getNearestLocation(point)](https://paperjs.org/reference/curve#getnearestlocation-point)
* [pathItem.getNearestLocation(point)](https://paperjs.org/reference/pathitem#getnearestlocation-point)

## Methods

[**equals**(location)](https://paperjs.org/reference/curvelocation/#equals-location)

Checks whether tow CurveLocation objects are describing the same location on a path, by applying the same tolerances as elsewhere when dealing with curve-time parameters.

#### Parameters:

* location:
  [CurveLocation](https://paperjs.org/reference/curvelocation)

#### Returns:

* Boolean — true if the locations are equal, false otherwise

[**toString**()](https://paperjs.org/reference/curvelocation/#tostring)

#### Returns:

* String — a string representation of the curve location

### Tests

[**isTouching**()](https://paperjs.org/reference/curvelocation/#istouching)

Checks if the location is an intersection with another curve and is merely touching the other curve, as opposed to crossing it.

#### Returns:

* Boolean — true if the location is an intersection that is merely touching another curve, false otherwise

#### See also:

* [isCrossing](https://paperjs.org/reference/curvelocation#iscrossing)()

[**isCrossing**()](https://paperjs.org/reference/curvelocation/#iscrossing)

Checks if the location is an intersection with another curve and is crossing the other curve, as opposed to just touching it.

#### Returns:

* Boolean — true if the location is an intersection that is crossing another curve, false otherwise

#### See also:

* [isTouching](https://paperjs.org/reference/curvelocation#istouching)()

[**hasOverlap**()](https://paperjs.org/reference/curvelocation/#hasoverlap)

Checks if the location is an intersection with another curve and is part of an overlap between the two involved paths.

#### Returns:

* Boolean — true if the location is an intersection that is part of an overlap between the two involved paths, false otherwise

#### See also:

* [isCrossing](https://paperjs.org/reference/curvelocation#iscrossing)()
* [isTouching](https://paperjs.org/reference/curvelocation#istouching)()
