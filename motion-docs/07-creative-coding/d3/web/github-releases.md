---
source: https://github.com/d3/d3/releases
title: "d3/d3 GitHub releases"
fetched: 2026-10-28
---

# d3/d3 — GitHub releases (100 entries, newest first)

## v7.9.0 — 2024-03-12

* Add d3.schemeObservable10. https://github.com/d3/d3-scale-chromatic/pull/51
* Change d3.geoCircle precision to 2 degrees. https://github.com/d3/d3-geo/pull/281
* Set projection.clipAngle precision to 2 degrees. https://github.com/d3/d3-geo/pull/282

## v7.8.5 — 2023-06-03

* Fix the return value of d3.medianIndex and d3.quantileIndex when the data contains missing values. [#275](https://github.com/d3/d3-array/issues/275)

## v7.8.4 — 2023-04-01

* Fix circumcenters when the hull is collinear. https://github.com/d3/d3-delaunay/pull/142

## v7.8.3 — 2023-03-25

* Fix precision error calculating _voronoi_.neighbors. https://github.com/d3/d3-delaunay/pull/138 https://github.com/d3/d3-delaunay/pull/139
* Fix broken polygon. https://github.com/d3/d3-delaunay/pull/140
* Fix threshold generation when input is empty or has no deviation. https://github.com/d3/d3-array/pull/271

## v7.8.2 — 2023-01-18

* d3.ticks now tries harder to generate at least one tick. https://github.com/d3/d3-array/pull/264

## v7.8.1 — 2023-01-11

* Tolerate invalid input values when generating contours. [#61](https://github.com/d3/d3-contour/pull/61)
* Tolerate invalid input weights when generating density contours. [#65](https://github.com/d3/d3-contour/pull/65)
* Fix missing contours at extrema when using default thresholds. [#68](https://github.com/d3/d3-contour/pull/68)

## v7.8.0 — 2022-12-21

* Add [d3.pathRound](https://github.com/d3/d3-path/blob/main/README.md#pathRound).
* Add configurable precision when generating path data via [_path_.digits](https://github.com/d3/d3-geo/blob/main/README.md#path_digits).
* Add likewise _shape_.digits method to d3.arc, d3.area, d3.line, d3.link, and d3.symbol.
* Improve the performance of d3.geoPath’s string concatenation.
* Fix arc rendering for small arcs with rounded corners.
* Fix BumpRadial implementation to support multiple points.
* Fix projection when lambda is outside the range ±3π.
* Rename d3.symbolX to d3.symbolTimes; d3.symbolX is now deprecated.

## v7.7.0 — 2022-12-03

* Add [d3.unixDay](https://github.com/d3/d3-time/blob/main/README.md#timeDay) and [d3.unixDays](https://github.com/d3/d3-time/blob/main/README.md#timeDays). https://github.com/d3/d3-time/pull/58
* Adopt d3.unixDay in place of d3.utcDay for [d3.utcTicks](https://github.com/d3/d3-time/blob/main/README.md#utcTicks) to ensure uniform tick spacing.
* Fix mutation of user-owned thresholds in d3.bin. https://github.com/d3/d3-array/issues/263
* Fix infinite loop when d3.quantile or d3.quickselect is called with invalid arguments. https://github.com/d3/d3-array/pull/262

## v7.6.1 — 2022-07-03

* [_density_.bandwidth](https://github.com/d3/d3-contour/blob/main/README.md#density_bandwidth) now supports fractional (non-integer) values.

## v7.6.0 — 2022-07-03

* Add [d3.blur](https://github.com/d3/d3-array/blob/main/README.md#blur).
* Add [d3.blur2](https://github.com/d3/d3-array/blob/main/README.md#blur2).
* Add [d3.blurImage](https://github.com/d3/d3-array/blob/main/README.md#blurImage).
* Add [d3.medianIndex](https://github.com/d3/d3-array/blob/main/README.md#medianIndex).
* Add [d3.quantileIndex](https://github.com/d3/d3-array/blob/main/README.md#quantileIndex).

## v7.5.0 — 2022-06-26

* Add [*density*.contours](https://github.com/d3/d3-contour/blob/main/README.md#density_contours).

## v7.4.5 — 2022-06-24

* Fix the interpretation of an array of numbers passed to [_density_.thresholds](https://github.com/d3/d3-contour/blob/main/README.md#density_thresholds).

## v7.4.4 — 2022-04-11

* Fix incorrect behavior of d3.bisector when given an asymmetric comparator.

## v7.4.3 — 2022-04-07

* Fix crash in d3.bin. Thanks, @weiglemc!

## v7.4.2 — 2022-04-03

* Fix off-by-one bin assignment due to rounding error in d3.bin.

## v7.4.1 — 2022-04-02

* Significantly improve the performance of d3.bin. 
* Fix the implementation of d3.thresholdScott.
* d3.pack and d3.packEnclose are now fully deterministic.
* d3.pack and d3.packEnclose now handle certain floating point errors better.

## v7.4.0 — 2022-03-28

* Add [*rgb*.clamp](https://github.com/d3/d3-color/blob/main/README.md#rgb_clamp) and [*hsl*.clamp](https://github.com/d3/d3-color/blob/main/README.md#hsl_clamp).
* Add [*color*.formatHex8](https://github.com/d3/d3-color/blob/main/README.md#color_formatHex8).
* Fix [*color*.formatHsl](https://github.com/d3/d3-color/blob/main/README.md#color_formatHsl) to clamp values to the expected range.
* Fix catastrophic backtracking when parsing colors. [SNYK-JS-D3COLOR-1076592](https://security.snyk.io/vuln/SNYK-JS-D3COLOR-1076592)

## v7.3.0 — 2022-01-07

* Add [d3.symbolsStroke](https://github.com/d3/d3-shape/blob/main/README.md#symbolsStroke). Thanks, @hemanrobinson!
* Add [d3.symbolsFill](https://github.com/d3/d3-shape/blob/main/README.md#symbolsFill), replacing (deprecating) d3.symbols.
* Add [d3.symbolAsterisk](https://github.com/d3/d3-shape/blob/main/README.md#symbolAsterisk).
* Add [d3.symbolDiamond2](https://github.com/d3/d3-shape/blob/main/README.md#symbolDiamond2).
* Add [d3.symbolPlus](https://github.com/d3/d3-shape/blob/main/README.md#symbolPlus).
* Add [d3.symbolSquare2](https://github.com/d3/d3-shape/blob/main/README.md#symbolSquare2).
* Add [d3.symbolTriangle2](https://github.com/d3/d3-shape/blob/main/README.md#symbolTriangle2).
* Add [d3.symbolX](https://github.com/d3/d3-shape/blob/main/README.md#symbolX).
* Add [d3.link](https://github.com/d3/d3-shape/blob/main/README.md#link).

## v7.2.1 — 2021-12-10

* Fix _stratify_.path when the top-level directory is only a single character.
* Fix _stratify_.path when paths contain multiple trailing slashes.

## v7.2.0 — 2021-12-04

* Add [_stratify_.path](https://github.com/d3/d3-hierarchy/blob/main/README.md#stratify_path).

## v7.1.1 — 2021-10-03

* d3.rank can now take a comparator in addition to an accessor.
* d3.rank, d3.sort, d3.bisector, and d3.groupSort now require comparators to have exactly two arguments.

## v7.1.0 — 2021-10-01

* Add [d3.rank](https://github.com/d3/d3-array/blob/main/README.md#rank).

## v7.0.4 — 2021-09-24

* Default the base-10 log tick format to `~s` (SI) instead of `.0e` (exponential).

## v7.0.3 — 2021-09-20

* Don’t mangle InternMap or InternSet in the generated UMD bundle.

## v7.0.2 — 2021-09-19

* Adopt [interning](https://github.com/mbostock/internmap) for [set operations](https://github.com/d3/d3-array/blob/main/README.md#sets). [#231](https://github.com/d3/d3-array/pull/231)
* Fix [InternSet](https://github.com/mbostock/internmap) and [InternMap](https://github.com/mbostock/internmap)’s delete operation. [mbostock/internmap@2.0.2](https://github.com/mbostock/internmap/releases/tag/v2.0.2)
* Fix [_log_.ticks](https://github.com/d3/d3-scale/blob/main/README.md#log_ticks) to return exact values for integer bases. [#253](https://github.com/d3/d3-scale/pull/253)
* Fix [_log_.tickFormat](https://github.com/d3/d3-scale/blob/main/README.md#log_tickFormat) to trim trailing zeroes by default if no precision is specified. [#254](https://github.com/d3/d3-scale/pull/254)

## v7.0.1 — 2021-08-16

* Fix d3.sort, d3.bisector, and related methods to handle undefined order. [#217](https://github.com/d3/d3-array/issues/217)

## v7.0.0 — 2021-06-11

Breaking changes:

* Adopt type: module. #3501  
* Adopt [InternMap](https://github.com/mbostock/internmap) for [ordinal scale domains](https://github.com/d3/d3-scale/blob/main/README.md#ordinal-scales).
* [d3.ascending](https://github.com/d3/d3-array/blob/main/README.md#ascending) and [d3.descending](https://github.com/d3/d3-array/blob/main/README.md#descending) no longer consider null comparable.
* [d3.bin](https://github.com/d3/d3-array/blob/main/README.md#bin) now ignores nulls.
* Convert array-likes (e.g., live NodeList) to arrays in [d3.selectAll](https://github.com/d3/d3-selection/blob/main/README.md#selectAll) and [*selection*.selectAll](https://github.com/d3/d3-selection/blob/main/README.md#selection_selectAll).

Non-breaking changes:

* Add [d3.mode](https://github.com/d3/d3-array/blob/main/README.md#mode).
* Add [d3.flatGroup](https://github.com/d3/d3-array/blob/main/README.md#flatGroup) and [d3.flatRollup](https://github.com/d3/d3-array/blob/main/README.md#flatRollup).
* Add [*transition*.selectChild](https://github.com/d3/d3-transition/blob/main/README.md#selectChild).
* Add [*transition*.selectChildren](https://github.com/d3/d3-transition/blob/main/README.md#selectChildren).
* Adopt [robust predicates](https://github.com/mourner/robust-predicates) for [Delaunay triangulation](https://github.com/d3/d3-delaunay).
* Fix [*delaunay*.voronoi](https://github.com/d3/d3-delaunay/blob/main/README.md#delaunay_voronoi)’s computed circumcenters for [collinear points on the hull](https://observablehq.com/@fil/d3-delaunay-6-robustly-released).
* Allow [*brush*.move](https://github.com/d3/d3-brush/blob/main/README.md#brush_move) and [*brush*.clear](https://github.com/d3/d3-brush/blob/main/README.md#brush_clear) to take an optional event.
* Allow [*selection*.merge](https://github.com/d3/d3-selection/blob/main/README.md#selection_merge) to take a transition.
* Allow [*selection*.join](https://github.com/d3/d3-selection/blob/main/README.md#selection_join) to take transitions.
* Apply [linear binning](https://observablehq.com/@d3/contourdensity-linear-binning) for [d3.contourDensity](https://github.com/d3/d3-contour/blob/main/README.md#contourDensity).
* Generate [*contours*.thresholds](https://github.com/d3/d3-contour/blob/main/README.md#contours_thresholds) at nicer round tick values.
* Fix [*axis*.tickArguments](https://github.com/d3/d3-axis/blob/main/README.md#axis_tickArguments) to accept an iterable.
* Fix [*axis*.tickValues](https://github.com/d3/d3-axis/blob/main/README.md#axis_tickValues) to accept an iterable.
* Fix undefined *event* during [*brush*.move](https://github.com/d3/d3-brush/blob/main/README.md#brush_move).
* Fix [drag event listeners](https://github.com/d3/d3-drag) to be explicitly non-passive where necessary ([#78](https://github.com/d3/d3-drag/issues/78)).
* Fix [zoom event listeners](https://github.com/d3/d3-zoom) to be explicitly non-passive where necessary.
* Fix variable initialization error in d3-zoom.
* Expose [d3.ZoomTransform](https://github.com/d3/d3-zoom/blob/main/README.md#zoom-transforms) constructor.
* Update dependencies.
* Make build reproducible.

D3 now requires Node.js 12 or higher. For more, please read [Sindre Sorhus’s FAQ](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## v6.7.0 — 2021-04-16

* Add [d3.timeTicks](https://github.com/d3/d3-time/blob/master/README.md#timeTicks) and [d3.utcTicks](https://github.com/d3/d3-time/blob/master/README.md#utcTicks).
* Add [d3.timeTickInterval](https://github.com/d3/d3-time/blob/master/README.md#timeTickInterval) and [d3.utcTickInterval](https://github.com/d3/d3-time/blob/master/README.md#utcTickInterval).

## v6.6.2 — 2021-03-29

* Fix handling of null with quantitative scales; null is now considered an “unknown” value, not zero.

## v6.6.1 — 2021-03-24

* Fix rounding error in [d3.ticks](https://github.com/d3/d3-array/blob/master/README.md#ticks).

## v6.6.0 — 2021-03-10

* Add [d3.fcumsum](https://github.com/d3/d3-array/blob/master/README.md#fcumsum). Thanks, @Fil!
* Add [d3.curveBumpX](https://github.com/d3/d3-shape/blob/master/README.md#curveBumpX) and [d3.curveBumpY](https://github.com/d3/d3-shape/blob/master/README.md#curveBumpY). Thanks, @Fil!
* Add [*axis*.offset](https://github.com/d3/d3-axis/blob/master/README.md#axis_offset).
* Only offset the axis by 0.5px on low-resolution devices (devicePixelRatio ≤ 1).
* Update dependencies.

## v6.5.0 — 2021-01-25

* Add [d3.groupSort](https://github.com/d3/d3-array/blob/master/README.md#groupSort).
* Allow [d3.sort](https://github.com/d3/d3-array/blob/master/README.md#sort) to take multiple accessors.

## v6.4.0 — 2021-01-22

* Add [d3.InternMap](https://github.com/d3/d3-array/blob/master/README.md#InternMap).
* Add [d3.InternSet](https://github.com/d3/d3-array/blob/master/README.md#InternSet).
* Change [d3.group](https://github.com/d3/d3-array/blob/master/README.md#group), [d3.rollup](https://github.com/d3/d3-array/blob/master/README.md#rollup) *et al.* to use InternMap.

## v6.3.1 — 2020-12-08

* Fix last bin with [d3.bin](https://github.com/d3/d3-array/blob/master/README.md#bin) when the values are not numbers.
* Fix last bin with [d3.bin](https://github.com/d3/d3-array/blob/master/README.md#bin) when the tick increment is fractional.

## v6.3.0 — 2020-12-03

* [d3.sort](https://github.com/d3/d3-array/blob/master/README.md#sort) now may accept an accessor. 
* Fix zero-width last bin with [d3.bin](https://github.com/d3/d3-array/blob/master/README.md#bin).

## v6.2.0 — 2020-09-23

* Add [d3.nice](https://github.com/d3/d3-array/blob/master/README.md#nice).
* Add [d3.every](https://github.com/d3/d3-array/blob/master/README.md#every).
* Add [d3.some](https://github.com/d3/d3-array/blob/master/README.md#some).
* Add [d3.filter](https://github.com/d3/d3-array/blob/master/README.md#filter).
* Add [d3.map](https://github.com/d3/d3-array/blob/master/README.md#map).
* Add [d3.reduce](https://github.com/d3/d3-array/blob/master/README.md#reduce).
* Add [d3.reverse](https://github.com/d3/d3-array/blob/master/README.md#reverse).
* Add [d3.sort](https://github.com/d3/d3-array/blob/master/README.md#sort).
* Add [d3.difference](https://github.com/d3/d3-array/blob/master/README.md#difference).
* Add [d3.disjoint](https://github.com/d3/d3-array/blob/master/README.md#disjoint).
* Add [d3.intersection](https://github.com/d3/d3-array/blob/master/README.md#intersection).
* Add [d3.superset](https://github.com/d3/d3-array/blob/master/README.md#superset).
* Add [d3.subset](https://github.com/d3/d3-array/blob/master/README.md#subset).
* Add [d3.union](https://github.com/d3/d3-array/blob/master/README.md#union).
* Fix [d3.bin](https://github.com/d3/d3-array/blob/master/README.md#bins) to nice the domain by default, ensuring uniform bin widths.
* Fix [d3.scaleQuantile](https://github.com/d3/d3-scale/blob/master/README.md#scaleQuantile) performance regression. Thanks @ilijapuaca!

## v6.1.1 — 2020-08-31

* Fix imprecision with [*bin*.thresholds](https://github.com/d3/d3-array/blob/master/README.md#bin_thresholds)(*count*).

## v6.1.0 — 2020-08-29

* Add [d3.shuffler](https://github.com/d3/d3-array/blob/master/README.md#shuffler).
* Add [d3.bisectCenter](https://github.com/d3/d3-array/blob/master/README.md#bisectCenter).
* Fix off-by-one with [*bisector*.center](https://github.com/d3/d3-array/blob/master/README.md#bisector_center).
* Accept any integer seed with [d3.randomLcg](https://github.com/d3/d3-random/blob/master/README.md#randomLcg).

## v6.0.0 — 2020-08-26

* Adopt ES2015, including support for iterables and collections (Map and Set).
* Remove d3.event; [*selection*.on](https://github.com/d3/d3-selection/blob/master/README.md#selection_on) now passes events directly to listeners.
* Remove d3.mouse, d3.touch, d3.touches, d3.clientPoint; add [d3.pointer](https://github.com/d3/d3-selection/blob/master/README.md#pointer) and [d3.pointers](https://github.com/d3/d3-selection/blob/master/README.md#pointers).
* Remove d3.nest; add [d3.group](https://github.com/d3/d3-array/blob/master/README.md#group) and [d3.rollup](https://github.com/d3/d3-array/blob/master/README.md#rollup).
* Remove [d3-collection](https://github.com/d3/d3-collection); see [d3-array](https://github.com/d3/d3-array).
* Remove [d3-voronoi](https://github.com/d3/d3-voronoi); add [d3-delaunay](https://github.com/d3/d3-delaunay).
* Remove support for Bower.

For more on what’s new, see [CHANGES](https://github.com/d3/d3/blob/master/CHANGES.md).

To upgrade from D3 5.x, see the [migration guide](https://observablehq.com/@d3/d3v6-migration-guide).

## v5.16.0 — 2020-04-20

* Add [*projection*.reflectX](https://github.com/d3/d3-geo/blob/master/README.md#projection_reflectX).
* Add [*projection*.reflectY](https://github.com/d3/d3-geo/blob/master/README.md#projection_reflectY).
* Fix achromatic hexadecimal colors.

## v5.15.1 — 2020-04-01

* Fix sign of near-zero negative values when using the `+` sign directive.

## v5.15.0 — 2019-12-29

* Add [d3.interpolateNumberArray](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateNumberArray).
* Add support for typed arrays to [d3.interpolate](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolate).
* Add support for typed arrays to [d3.interpolateArray](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateArray).
* Fix numeric interpolation to return exact values for *t* = 0 and *t* = 1.
* Fix trimming of trailing zeroes in exponents.

## v5.14.2 — 2019-11-20

* Expose [*brush*.touchable](https://github.com/d3/d3-brush/blob/master/README.md#brush_touchable).

## v5.14.1 — 2019-11-17

* Propagate the *this* context to interpolators in *transition*.styleTween, *transition*.attrTween and *transition*.textTween.

## v5.14.0 — 2019-11-17

* Add [*transition*.textTween](https://github.com/d3/d3-transition/blob/master/README.md#transition_textTween).
* Fix handling of zero values in [d3.stackOffsetDiverging](https://github.com/d3/d3-shape/blob/master/README.md#stackOffsetDiverging).

## v5.13.1 — 2019-11-16

* Fix crash initializing d3.brush.

## v5.13.0 — 2019-11-16

* Add [d3.csvFormatRow](https://github.com/d3/d3-dsv/blob/master/README.md#csvFormatRow).
* Add [d3.csvFormatValue](https://github.com/d3/d3-dsv/blob/master/README.md#csvFormatValue).
* Add [d3.tsvFormatRow](https://github.com/d3/d3-dsv/blob/master/README.md#tsvFormatRow).
* Add [d3.tsvFormatValue](https://github.com/d3/d3-dsv/blob/master/README.md#tsvFormatValue).
* Add [*dsv*.formatRow](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_formatRow).
* Add [*dsv*.formatValue](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_formatValue).
* Add support for parsing 4- and 8-digit hexadecimal colors in d3.color. Thanks, @zerovox!
* Allow shorthand for current time intervals (e.g., `d3.timeDay()` returns today’s midnight).
* Disallow whitespace and periods in type names passed to [d3.dispatch](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch).
* Add fa-IR d3-time-format locale. Thanks, @mohsentaleb!
* Add `%q` directive for quarter of the year as a decimal number. Thanks, @jheer!
* Fix off-by-one error formatting `%U` when the year starts with Sunday.
* Fix off-by-one error formatting `%W` when the year starts with Monday.
* Fix off-by-one error parsing week and weekday numbers with d3.utcParse.
* Fix string coercion of specifier passed to d3.utcParse.
* Fix parsing of `%L` or `%f` in conjunction with `%s`.

## v5.12.0 — 2019-09-07

* Add [d3.FormatSpecifier](https://github.com/d3/d3-format/blob/master/README.md#FormatSpecifier).
* Allow minus sign to be localized in [d3.format](https://github.com/d3/d3-format). Thanks, @benib!
* Allow NaN to be localized in [d3.format](https://github.com/d3/d3-format).

## v5.11.0 — 2019-08-21

* Add [d3.interpolateTurbo](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#interpolateTurbo).
* Add [d3.interpolateCividis](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#interpolateCividis).

## v5.10.1 — 2019-08-21

* Fix broken brush corner resizers.
* Fix brush multitouch filtering.

## v5.10.0 — 2019-08-19

## [d3-brush](https://github.com/d3/d3-brush)

* Add [*brush*.touchable](https://github.com/d3/d3-brush/blob/master/README.md#brush_touchable).
* Add [*brush*.clear](https://github.com/d3/d3-brush/blob/master/README.md#brush_clear).
* Add [*brush*.keyModifiers](https://github.com/d3/d3-brush/blob/master/README.md#brush_keyModifiers).
* Fix default [*brush*.extent](https://github.com/d3/d3-brush/blob/master/README.md#brush_extent) to consider the SVG viewBox, if any.
* Fix scroll prevention on touch devices.
* Fix coercion of selection and extent inputs.
* Fix order of handles in the DOM.
* Fix [*brush*.move](https://github.com/d3/d3-brush/blob/master/README.md#brush_move) when selection is empty.
* Fix Space key immediately after clicking on a handle.
* Fix missing *brush* event on parallel start.
* Fix handling of orphaned input gestures.
* Fix default [*brush*.touchable](https://github.com/d3/d3-brush/blob/master/README.md#brush_touchable) if navigator.maxTouchPoints.
* Fix multitouch gestures.
* Fix click consumption when brush is not empty. 
* Fix default [*brush*.filter](https://github.com/d3/d3-brush/blob/master/README.md#brush_filter) on control-click.

## [d3-color](https://github.com/d3/d3-color)

* Add [*color*.copy](https://github.com/d3/d3-color/blob/master/README.md#color_copy).
* Add [*color*.formatHex](https://github.com/d3/d3-color/blob/master/README.md#color_formatHex).
* Add [*color*.formatHsl](https://github.com/d3/d3-color/blob/master/README.md#color_formatHsl).
* Add [*color*.formatRgb](https://github.com/d3/d3-color/blob/master/README.md#color_formatRgb).
* Deprecate *color*.hex; use *color*.formatHex instead.

## [d3-drag](https://github.com/d3/d3-drag)

* Fix default [*drag*.filter](https://github.com/d3/d3-drag/blob/master/README.md#drag_filter) on control-click.
* Fix default [*drag*.touchable](https://github.com/d3/d3-drag/blob/master/README.md#drag_touchable) if navigator.maxTouchPoints.

## [d3-path](https://github.com/d3/d3-path)

* Fix coercion of *anticlockwise* argument to [*path*.arc](https://github.com/d3/d3-path/blob/master/README.md#path_arc). Thanks, @Fil!

## [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic)

* Add [d3.schemeTableau10](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#schemeTableau10). Thanks @akngs!

## [d3-zoom](https://github.com/d3/d3-zoom)

* Fix default [*zoom*.extent](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_extent) to consider the SVG viewBox.
* Fix default [*zoom*.filter](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_filter) to ignore control-click.
* Fix default [*zoom*.touchable](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_touchable) if navigator.maxTouchPoints.
* Fix default [*zoom*.wheelDelta](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_wheelDelta) if deltaMode !== 0. Thanks, @Dakkaron!
* Fix handling of filtered multitouch gestures. Thanks, @robinhouston and @testower!
* Fix handling of orphaned gestures.
* Fix emitting of zoom events during dbltap gestures. Thanks, @cambecc!
* Add optional *point* to [*zoom*.transform](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_transform) and related methods.
* Fix [d3.zoomTransform](https://github.com/d3/d3-zoom/blob/master/README.md#zoomTransform) to inherit the transform from the closest ancestor, if any.

## v5.9.7 — 2019-06-28

* Revert chroma clamping in *hcl*.toString.

## v5.9.6 — 2019-06-28

* Account for rounding when determining whether a color is displayable.

## v5.9.5 — 2019-06-27

* Implement chroma clamping in [*hcl*.toString](https://github.com/d3/d3-color/blob/master/README.md#hcl).
* Fix achromatic representation of white in [d3.hcl](https://github.com/d3/d3-color/blob/master/README.md#hcl) (again).

## v5.9.4 — 2019-06-26

* Fix achromatic representation of black and white in [d3.hcl](https://github.com/d3/d3-color/blob/master/README.md#hcl).

## v5.9.3 — 2019-06-26

* Fix [d3.stackDivergingOffset](https://github.com/d3/d3-shape/blob/master/README.md#stackDivergingOffset) when there is only one series.
* Fix achromatic representation of black and white in [d3.hcl](https://github.com/d3/d3-color/blob/master/README.md#hcl).
* Fix [d3.geoContains](https://github.com/d3/d3-geo/blob/master/README.md#geoContains) for LineStrings. Thanks, @ondras!
* Fix [d3.geoContains](https://github.com/d3/d3-geo/blob/master/README.md#geoContains) for longitudes outside of ±180°.
* Fix [d3.geoBounds](https://github.com/d3/d3-geo/blob/master/README.md#geoBounds) for sphers.

## v5.9.2 — 2019-03-14

* Fix bug when initializing nodes with fixed positions in force simulations.

## v5.9.1 — 2019-02-10

* Fix corruption when [*quadtree*.cover](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_cover) is coincident with the current extent.
* Favor a more concise ISO 8601 format for dates in [*dsv*.format](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_format) and [*dsv*.formatRows](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_formatRows).

## v5.9.0 — 2019-02-07

## [d3-dsv](https://github.com/d3/d3-dsv)

* Add [d3.autoType](https://github.com/d3/d3-dsv/blob/master/README.md#autoType) for automatic type inference when parsing!
* Add [*dsv*.formatBody](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_formatBody), [d3.csvFormatBody](https://github.com/d3/d3-dsv/blob/master/README.md#csvFormatBody), and [d3.tsvFormatBody](https://github.com/d3/d3-dsv/blob/master/README.md#tsvFormatBody).
* In [*dsv*.format](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_format) and [*dsv*.formatRows](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_formatRows), use *date*.toISOString to format dates.

## v5.8.2 — 2019-02-05

* Fix [d3.timeMinute](https://github.com/d3/d3-time/blob/master/README.md#timeMinute) and [d3.timeHour](https://github.com/d3/d3-time/blob/master/README.md#timeHour) for historical times.

## v5.8.1 — 2019-02-04

* Fix rendering glitch with [*arc*.cornerRadius](https://github.com/d3/d3-shape/blob/master/README.md#arc_cornerRadius).

## v5.8.0 — 2019-01-28

## [d3-force](https://github.com/d3/d3-force)

* Add *iterations* argument to [*simulation*.tick](https://github.com/d3/d3-force/blob/master/README.md#simulation_tick). Thanks, @vasturiano!
* Fix bug when initializing nodes with fixed positions. Thanks, @vasturiano!

## [d3-geo](https://github.com/d3/d3-geo)

* Fix projection where |longitude| > 180°.

## [d3-scale](https://github.com/d3/d3-scale)

* Add *domain* and *range* (or *interpolator*) convenience constructors for all scale types.
* Add default constructors for [sequential](https://github.com/d3/d3-scale/blob/master/README.md#sequential-scales) and [diverging](https://github.com/d3/d3-scale/blob/master/README.md#diverging-scales) scales.
* Add [d3.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#tickFormat).
* Add [d3.scaleSymlog](https://github.com/d3/d3-scale/blob/master/README.md#symlog-scales).
* Add transformed sequential scales (*e.g.*, [d3.scaleSequentialLog](https://github.com/d3/d3-scale/blob/master/README.md#scaleSequentialLog)).
* Add transformed diverging scales (*e.g.*, [d3.scaleDivergingLog](https://github.com/d3/d3-scale/blob/master/README.md#scaleDivergingLog)).
* Add [d3.scaleSequentialQuantile](https://github.com/d3/d3-scale/blob/master/README.md#scaleSequentialQuantile) for *p*-quantiles.
* Add [*scale*.unknown](https://github.com/d3/d3-scale/blob/master/README.md#continuous_unknown) for all scale types.
* Allow unlimited [*band*.paddingOuter](https://github.com/d3/d3-scale/blob/master/README.md#band_paddingOuter) and [*point*.padding](https://github.com/d3/d3-scale/blob/master/README.md#point_padding).
* For collapsed domains, use midpoint of domain or range rather than start.

## [d3-selection](https://github.com/d3/d3-selection)

* Add [*selection*.join](https://github.com/d3/d3-selection/blob/master/README.md#selection_join)!
* Fix [*selection*.order](https://github.com/d3/d3-selection/blob/master/README.md#selection_order) to enforce relative position, rather than exact siblings.
* Remove vendor fallback for *element*.matches in [*selection*.filter](https://github.com/d3/d3-selection/blob/master/README.md#selection_filter) and [d3.matcher](https://github.com/d3/d3-selection/blob/master/README.md#matcher).

## [d3-shape](https://github.com/d3/d3-shape)

* Add [d3.stackOrderAppearance](https://github.com/d3/d3-shape/blob/master/README.md#stackOrderAppearance). Thanks, @isaomatsunami!
* Fix d3.stackOrderInsideOut to use appearance (onset) rather than sum.
* Fix rendering glitch with rounded arcs.

## [d3-transition](https://github.com/d3/d3-transition)

* Add [*transition*.end](https://github.com/d3/d3-transition/blob/master/README.md#transition_end).
* Add *cancel* events to [*transition*.on](https://github.com/d3/d3-transition/blob/master/README.md#transition_on).
* Improve the performance of [*transition*.style](https://github.com/d3/d3-transition/blob/master/README.md#transition_style) and [*transition*.attr](https://github.com/d3/d3-transition/blob/master/README.md#transition_attr).
* Tween functions can now use *this* to refer to the current node.
* Fix removal of styles when the value passed to [*transition*.style](https://github.com/d3/d3-transition/blob/master/README.md#transition_style) is null.
* Fix interpolation in [*transition*.style](https://github.com/d3/d3-transition/blob/master/README.md#transition_style) and [*transition*.attr](https://github.com/d3/d3-transition/blob/master/README.md#transition_attr) in certain non-string cases.

## v5.7.0 — 2018-08-24

* Add [d3.geoEqualEarth](https://github.com/d3/d3-geo/blob/master/README.md#geoEqualEarth).
* Add [d3.interpolateHue](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateHue).
* Add [d3.interpolateDiscrete](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateDiscrete).
* Fix upper [histogram](https://github.com/d3/d3-array/blob/master/README.md#histogram) bin threshold in some cases.
* Fix [axis](https://github.com/d3/d3-axis/blob/master/README.md) domain rendering when the outer tick size is zero.

## v5.6.0 — 2018-08-20

* Add [*density*.weight](https://github.com/d3/d3-contour/blob/master/README.md#density_weight).
* Use currentColor instead of black for [axes](https://github.com/d3/d3-axis/blob/master/README.md).

## v5.5.0 — 2018-06-16

* Add [d3.scaleDiverging](https://github.com/d3/d3-scale/blob/master/README.md#scaleDiverging).
* Fix treatment of degenerate domains in [d3.scaleSequential](https://github.com/d3/d3-scale/blob/master/README.md#scaleSequential).

## v5.4.0 — 2018-05-11

* Add [d3.interpolateSinebow](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#interpolateSinebow).

## v5.3.0 — 2018-05-09

* Add `~` option to [d3.format](https://github.com/d3/d3-format) to trim insignificant zeros. Thanks, @vasturiano!
* Fix [d3.formatSpecifier](https://github.com/d3/d3-format/blob/master/README.md#formatSpecifier) to not bake shorthand aliases.

## v5.2.0 — 2018-05-07

* Add [*color*.hex](https://github.com/d3/d3-color/blob/master/README.md#color_hex).
* Add [d3.piecewise](https://github.com/d3/d3-interpolate/blob/master/README.md#piecewise).

## v5.1.0 — 2018-04-17

* Add [d3.lch](https://github.com/d3/d3-color/blob/master/README.md#lch).
* Add [d3.gray](https://github.com/d3/d3-color/blob/master/README.md#gray).
* Switch from D65 to D50 for [Lab and HCL color spaces](https://beta.observablehq.com/@mbostock/lab-and-rgb). Thanks, @danburzo!
* Fix Lab and HCL representation of [achromatic colors](https://beta.observablehq.com/@mbostock/achromatic-interpolation-test).

## v5.0.2 — 2018-04-17

Replaced by [5.1.0](https://github.com/d3/d3/releases/tag/v5.1.0).

## v5.0.1 — 2018-04-16

* Fix occasional overlap and hang in [d3.packSiblings](https://github.com/d3/d3-hierarchy/blob/master/README.md#packSiblings). Thanks, @robinhouston!

## v5.0.0 — 2018-01-28

* Remove [d3-request](https://github.com/d3/d3-request); add [d3-fetch](https://github.com/d3/d3-fetch).
* Remove [d3-queue](https://github.com/d3/d3-queue); see [Promise.all](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
* Add [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).
* Add [d3-contour](https://github.com/d3/d3-contour).
* Add [*selection*.clone](https://github.com/d3/d3-selection/blob/master/README.md#selection_clone).
* Add [d3.create](https://github.com/d3/d3-selection/blob/master/README.md#create).
* Add [*projection*.angle](https://github.com/d3/d3-geo/blob/master/README.md#projection_angle).
* Remove d3.schemeCategory20* categorical color schemes. (See note below.)
* Fix duplicate installation of D3 modules at different versions. (#3256)
* Fix [d3.format](https://github.com/d3/d3-format/blob/master/README.md#format)’s SI format for locales with currency suffixes.

D3 now includes new [categorical color schemes](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#categorical) from ColorBrewer, along with ColorBrewer’s excellent [diverging](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#diverging), [sequential single-hue](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#sequential-single-hue) and [sequential multi-hue](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#sequential-multi-hue) color schemes. The twenty-color schemes were removed because their grouped design often falsely implied non-existent relationships in the data: a shared hue can imply that the encoded data are part of a group (a super-category), while the relative lightness can falsely imply order.

For more on what’s new, read [CHANGES](https://github.com/d3/d3/blob/master/CHANGES.md).

## v4.13.0 — 2018-01-29

* Add [*selection*.clone](https://github.com/d3/d3-selection/blob/master/README.md#selection_clone).
* Add [d3.create](https://github.com/d3/d3-selection/blob/master/README.md#create).
* Fix [d3.format](https://github.com/d3/d3-format/blob/master/README.md#format)’s SI format for locales with currency suffixes.

## v5.0.0-rc.1 — 2018-01-29 (prerelease)

Moved to https://github.com/d3/d3/releases/tag/v5.0.0

## v4.12.2 — 2017-12-26

* Pin to earlier version of UglifyJS to fix minified bundle.

## v4.12.1 — 2017-12-26

* Point unpkg and jsDelivr to the minified bundle.

## v4.12.0 — 2017-11-21

* Add [d3.clientPoint](https://github.com/d3/d3-selection/blob/master/README.md#clientPoint).
* Add [*zoom*.constrain](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_constrain).
* Add `f`, `Q`, `s`, `u` and `V` [time format](https://github.com/d3/d3-time-format) specifiers. Thanks, @BrianMitchL @krukon!
* Add [*projection*.fitWidth](https://github.com/d3/d3-geo/blob/master/README.md#projection_fitWidth), [*projection*.fitHeight](https://github.com/d3/d3-geo/blob/master/README.md#projection_fitHeight). Thanks, @mfogel!
* Add tr-TR [time format](https://github.com/d3/d3-time-format) locale. Thanks, @filiz137!
* Improve messages for [transition lifecycle](https://github.com/d3/d3-transition/blob/master/README.md#the-life-of-a-transition) errors.
* Fix infinite loop in [*interval*.range](https://github.com/d3/d3-time/blob/master/README.md#interval_range).
* Fix sub-millisecond ticks for [time scales](https://github.com/d3/d3-scale/blob/master/README.md#time-scales). Thanks, @FracturedShader!
* Fix thousands separator in fr-FR [number format](https://github.com/d3/d3-format) locale. Thanks, @victornoel!
* Fix missing *data*.columns when the input to [*dsv*.parse](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_parse) is empty. Thanks, @tomwanzek!
* Minor optimization to [d3.interpolateArray](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateArray). Thanks, @jetzhliu.

## v4.11.0 — 2017-10-03

* Add [d3.forceRadial](https://github.com/d3/d3-force/blob/master/README.md#forceRadial). Thanks, @nbremer!
* Add [*drag*.touchable](https://github.com/d3/d3-drag/blob/master/README.md#drag_touchable). Thanks, @nicolas-van!
* Add [*zoom*.touchable](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_touchable).
* Add [d3.geoNaturalEarth1](https://github.com/d3/d3-geo/blob/master/README.md#geoNaturalEarth1). Thanks, @Fil!
* Add [*projection*.preclip](https://github.com/d3/d3-geo/blob/master/README.md#projection_preclip). Thanks, @Fil!
* Add [*projection*.postclip](https://github.com/d3/d3-geo/blob/master/README.md#projection_postclip).
* Add [d3.geoClipAntimeridian](https://github.com/d3/d3-geo/blob/master/README.md#geoClipAntimeridian).
* Add [d3.geoClipCircle](https://github.com/d3/d3-geo/blob/master/README.md#geoClipCircle).
* Add [d3.geoClipRectangle](https://github.com/d3/d3-geo/blob/master/README.md#geoClipRectangle).
* Fix [d3.ticks](https://github.com/d3/d3-array/blob/master/README.md#ticks) when *start* is equal to *stop* and *count* is positive.

## v4.10.2 — 2017-09-03

* Fix [d3.timer](https://github.com/d3/d3-timer) sleeping for too long when timer invocation is expensive.

## v4.10.1 — 2017-09-02

* Fix DSV parsing when the last field is empty (e.g., `foo,bar,`).
* Replace the `browser` field in package.json with `unpkg` and `jsdeliver`. (#3138)
* Replace the `prepublish` script with `prepublishOnly`.
* Update dependencies.

## v4.10.0 — 2017-07-14

* Add [d3.areaRadial](https://github.com/d3/d3-shape/blob/master/README.md#areaRadial); deprecate d3.radialArea.
* Add [d3.lineRadial](https://github.com/d3/d3-shape/blob/master/README.md#lineRadial); deprecate d3.radialLine.
* Add [d3.pointRadial](https://github.com/d3/d3-shape/blob/master/README.md#pointRadial).
* Add [*zoom*.translateTo](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_translateTo).
* Re-implement [d3.packEnclose](https://github.com/d3/d3-hierarchy/blob/master/README.md#packEnclose) using [Matoušek-Sharir-Welzl](https://d3.express/@mbostock/miniball). Thanks, @robinhouston!
* Fix [d3.packSiblings](https://github.com/d3/d3-hierarchy/blob/master/README.md#packSiblings) to center the circles more consistently around a fixed origin.
* Fix [axis rendering](https://github.com/d3/d3-axis) when a scale has a non-numeric range.
* Fix [*interval*.offset](https://github.com/d3/d3-time/blob/master/README.md#interval_offset) on [filtered time intervals](https://github.com/d3/d3-time/blob/master/README.md#interval_filter) when *step* is negative.
* Fix invocation of requestAnimationFrame in Edge. Thanks, @KonradKlimczak!
* Invoke [*nest*.sortValues](https://github.com/d3/d3-collection/blob/master/README.md#nest_sortValues) comparator prior to [*nest*.rollup](https://github.com/d3/d3-collection/blob/master/README.md#nest_rollup) aggregator.
* [Drag](https://github.com/d3/d3-drag) & [zoom](https://github.com/d3/d3-zoom) behaviors now only register touch event listeners when touch is supported.
* [Drag](https://github.com/d3/d3-drag) & [zoom](https://github.com/d3/d3-zoom) behaviors now set the touch-action style to “none” when touch is supported.

## v4.9.1 — 2017-05-16

* Fix [d3.linkRadial](https://github.com/d3/d3-shape/blob/master/README.md#linkRadial) to use radians rather than degrees.
* Optimize [*path*.pointRadius](https://github.com/d3/d3-geo/blob/master/README.md#path_pointRadius) slightly.

## v4.9.0 — 2017-05-15

* Change [*selection*.style](https://github.com/d3/d3-selection/blob/master/README.md#selection_style) to return the inline style, if present.
* Change [*transition*.style](https://github.com/d3/d3-transition/blob/master/README.md#transition_style) to start from the inline style, if present.
* Add [link shapes](https://github.com/d3/d3-shape/blob/master/README.md#links)!
* Add [d3.stackOffsetDiverging](https://github.com/d3/d3-shape/blob/master/README.md#stackOffsetDiverging).
* Add [*random*.source](https://github.com/d3/d3-random/blob/master/README.md#random_source) to allow custom sources of randomness. Thanks, @rolyatmax!
* Add [*drag*.clickDistance](https://github.com/d3/d3-drag/blob/master/README.md#drag_clickDistance) for setting the click distance threshold. Thanks, @Epiphero!
* Add [*zoom*.clickDistance](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_clickDistance) for setting the click distance threshold.
* Add [d3.style](https://github.com/d3/d3-selection/blob/master/README.md#style).
* Fix rounding errors in [*continuous*.nice](https://github.com/d3/d3-scale/blob/master/README.md#continuous_nice).
* Fix inconsistency between [*continuous*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#continuous_ticks) and [*continous*.nice](https://github.com/d3/d3-scale/blob/master/README.md#continuous_nice). Thanks, @danielyule!
* Fix [axis](https://github.com/d3/d3-axis) tick offset for band and point scales.
* Fix drag click suppression to ignore mousemove events that don’t actually move.
* Fix zoom click suppression to ignore mousemove events that don’t actually move.
* Fix error trying to [interpolate objects](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolate) without prototypes. Thanks, @devgru!
* Optimize generated [axis](https://github.com/d3/d3-axis) DOM slightly.
* Improve error message descriptions in [d3.queue](https://github.com/d3/d3-queue). Thanks, @ethervoid!

## v4.8.0 — 2017-04-15

* Add [d3.tickIncrement](https://github.com/d3/d3-array/blob/master/README.md#tickIncrement).
* Fix [d3.ticks](https://github.com/d3/d3-array/blob/master/README.md#ticks) to always return the most-precise representable values in IEEE 754!
* Fix [*histogram*.thresholds](https://github.com/d3/d3-array/blob/master/README.md#histogram_thresholds) to retain thresholds equal to the domain’s upper bound.
* [Number format locales](https://github.com/d3/d3-format) can now override the percent sign suffix. Thanks, @davinov!

## v4.7.4 — 2017-03-24

* Fix primary touch location on secondary touchend when [zooming](https://github.com/d3/d3-zoom).

## v4.7.3 — 2017-03-13

* Fix the [Mercator projection](https://github.com/d3/d3-geo/blob/master/README.md#geoMercator)’s built-in clipping when [*projection*.rotate](https://github.com/d3/d3-geo/blob/master/README.md#projection_center) is used.
* Fix the [transverse Mercator projection](https://github.com/d3/d3-geo/blob/master/README.md#geoMercator)’s built-in clipping when [*projection*.rotate](https://github.com/d3/d3-geo/blob/master/README.md#projection_center) is used.
* Fix the [transverse Mercator projection](https://github.com/d3/d3-geo/blob/master/README.md#geoTransverseMercator)’s built-in clipping when [*projection*.clipExtent](https://github.com/d3/d3-geo/blob/master/README.md#projection_clipExtent) is used.

## v4.7.2 — 2017-03-10

* Optimize [d3.pack](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack).
* Fix string coercion in [*transition*.style](https://github.com/d3/d3-transition/blob/master/README.md#transition_style) and [*transition*.attr](https://github.com/d3/d3-transition/blob/master/README.md#transition_attr). Thanks, @sghall!
* Update dependencies.

## v4.7.1 — 2017-03-02

- Fix the [Mercator projection](https://github.com/d3/d3-geo/blob/master/README.md#geoMercator)’s built-in clipping when [_projection_.center](https://github.com/d3/d3-geo/blob/master/README.md#projection_center) is used.
- Fix the [Mercator projection](https://github.com/d3/d3-geo/blob/master/README.md#geoMercator)’s built-in clipping when [_projection_.clipExtent](https://github.com/d3/d3-geo/blob/master/README.md#projection_clipExtent) is used.
- Ignore small-angle arcs in [_path_.arc](https://github.com/d3/d3-path/blob/master/README.md#path_arc) to workaround rendering bug in Chrome on Ubuntu.
- Fix escaping of strings containing carriage returns in [d3-dsv](https://github.com/d3/d3-dsv). Thanks, @jsedlacek!

## v4.7.0 — 2017-02-28

- Add [d3.cross](https://github.com/d3/d3-array/blob/master/README.md#cross).
- Allow [d3.pairs](https://github.com/d3/d3-array/blob/master/README.md#pairs) to take an optional reducer.
- Add [d3.geoContains](https://github.com/d3/d3-geo/blob/master/README.md#geoContains). Thanks, @Fil!
- Fix invalid transforms when an ordinal [axis transition](https://github.com/d3/d3-axis) is interrupted. 
- [Localized number formats](https://github.com/d3/d3-format/blob/master/README.md#formatLocale) can now define [numeral systems](https://en.wikipedia.org/wiki/Numeral_system), such as Hindu–Arabic.
- Fix [number formatting](https://github.com/d3/d3-format/blob/master/README.md#locale_format) of negative infinity.
- Maybe make [rounded arcs](https://github.com/d3/d3-shape/blob/master/README.md#arc_cornerRadius) a little more robust.
- Optimize [d3.geoCentroid](https://github.com/d3/d3-geo/blob/master/README.md#geoCentroid). Thanks, @Fil!

## v4.6.0 — 2017-02-19

- Add [_path_.measure](https://github.com/d3/d3-geo/blob/master/README.md#path_measure).
- [Improve](https://twitter.com/mbostock/status/829117676773478403) [d3.pack](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack) layout.
- Fix [d3.geoBounds](https://github.com/d3/d3-geo/blob/master/README.md#geoBounds) for certain line geometries.
- Fix [d3.geoCentroid](https://github.com/d3/d3-geo/blob/master/README.md#geoCentroid) for detailed features. Thanks, @Fil!

## v4.5.0 — 2017-01-29

- Add [_node_.count](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_count).
- Fix overlapping circles in [d3.pack](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack) and [d3.packSiblings](https://github.com/d3/d3-hierarchy/blob/master/README.md#packSiblings).

## v4.4.4 — 2017-01-23

- Fix calculation of clock skew when page is backgrounded before [timers](https://github.com/d3/d3-timer) are scheduled.

## v4.4.3 — 2017-01-20

- Fix [d3.event](https://github.com/d3/d3-selection/blob/master/README.md#event) export on Node. (#3055)

## v4.4.2 — 2017-01-18

- Fix [d3.interpolateRgb](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateRgb).[gamma](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolate_gamma)’s opacity interpolation.

## v4.4.1 — 2017-01-06

- Fix handling of [zoom](https://github.com/d3/d3-zoom) gestures that start with multiple touches.
- Fix crash with coincident points in voronoi [_diagram_.find](https://github.com/d3/d3-voronoi/blob/master/README.md#diagram_find).
- Fix crash with coincident points in voronoi [_diagram_.triangles](https://github.com/d3/d3-voronoi/blob/master/README.md#diagram_triangles).

## v4.4.0 — 2016-11-23

- Add [_identity_.reflectX](https://github.com/d3/d3-geo/blob/master/README.md#identity_reflectX) and [_identity_.reflectY](https://github.com/d3/d3-geo/blob/master/README.md#identity_reflectY) to [d3.geoIdentity](https://github.com/d3/d3-geo/blob/master/README.md#geoIdentity).
- Add [_zoom_.interpolate](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_interpolate) to control zoom transition behavior.
- Allow double-click and double-tap [zoom transitions](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_duration) to be disabled.
- Fix handling of a [zoom.translateExtent](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_translateExtent) smaller than the [zoom.extent](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_extent).
- Fix handling of zero-valued nodes in [squarified treemaps](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemapSquarify).
- Fix parsing of unusual number formats in [color specifications](https://github.com/d3/d3-color).
- Fix implementations of [_force_.initialize](https://github.com/d3/d3-force/blob/master/README.md#force_initialize) to allow [isolation](https://bl.ocks.org/mbostock/b1f0ee970299756bc12d60aedf53c13b).
- Fix [d3.geoPath](https://github.com/d3/d3-geo/blob/master/README.md#geoPath)’s default projection and contex to be null, not undefined.
- Improve performance of [d3.path](https://github.com/d3/d3-path).

## v4.3.0 — 2016-10-27

- Add [_diagram_.find](https://github.com/d3/d3-voronoi/blob/master/README.md#diagram_find) for fast searching of Voronoi diagrams. Thanks, @Fil!
- Add [d3.geoIdentity](https://github.com/d3/d3-geo/blob/master/README.md#geoIdentity) for scaling, translating and clipping planar geometry.
- Add [d3.geoGraticule10](https://github.com/d3/d3-geo/blob/master/README.md#geoGraticule10) for conveniently generating a default 10° global graticule.
- Add optional arguments to [d3.geoPath](https://github.com/d3/d3-geo/blob/master/README.md#geoPath) for _projection_ and _context_.
- Deprecate d3.geoClipExtent; use [d3.geoIdentity](https://github.com/d3/d3-geo/blob/master/README.md#geoIdentity)’s [clipExtent](https://github.com/d3/d3-geo/blob/master/README.md#projection_clipExtent) instead.

## v4.2.8 — 2016-10-20

- Fix reporting of _interrupt_ transition events.

## v4.2.7 — 2016-10-11

- Fix bug where calling [_collide_.radius](https://github.com/d3/d3-force/blob/master/README.md#collide_radius) had no effect.
- Improve error message when [_link_.links](https://github.com/d3/d3-force/blob/master/README.md#link_links) references unknown nodes.
- Fix [d3.geoConicConformal](https://github.com/d3/d3-geo/blob/master/README.md#geoConicConformal)’s [invert](https://github.com/d3/d3-geo/blob/master/README.md#projection_invert) for south-pointing cones.
- Fix [d3.geoConicEqualArea](https://github.com/d3/d3-geo/blob/master/README.md#geoConicEqualArea) when the cone is a cylinder.

## v4.2.6 — 2016-09-22

- Fix hang in [_interval_.every(…).range](https://github.com/d3/d3-time/blob/master/README.md#interval_range) given invalid dates.

