---
source: https://polygonjs.com/changelog
title: "Changelog · Polygonjs"
fetched: 2026-10-28
---

# Changelog

Get new releases updates with
[Atom](https://polygonjs.com/changelog.atom)
or
[JSON Feed](https://polygonjs.com/changelog.json).

## [2.0.65](https://polygonjs.com/changelog/2.0.65)

Texture filters & solvers

October 23, 2026

* Breaking
  Params that name an attribute lose their suffix. `geo/AttributeCopy` and `geo/AttributeId` use `id`, `geo/Blend` and `geo/Measure` use `attribute`, `geo/Decimate` uses `importance`, `geo/Scatter` uses `weight` and `densityAttribute`, `geo/PointRelax` uses `volume`, and `geo/AttributeRename` and `geo/VolumeGradient` use `source` and `destination`. A saved scene sets these again under the new names.
* Breaking
  `code/SDFInput` is renamed `code/SDFSample`. A scene that used it creates `code/SDFSample` in its place.
* Breaking
  `geo/VoronoiCells.roundness` and `geo/VoronoiField.smoothness` are both renamed `roundingRadius`, and the `CELLS` mode of `geo/VoronoiField` is now `PIECES`. `geo/VoronoiField` also starts with thicker walls and struts: set `wallThickness` and `strutRadius` to 0.05 for the old look.
* New
  `tex/Blur`
* New
  `tex/Brightness`
* New
  `tex/ColorCorrect`
* New
  `tex/ToneMap`
* New
  `tex/ChannelShuffle`
* New
  `tex/Crop`
* New
  `tex/Resize`
* New
  `tex/Transform`
* New
  `tex/Layer`
* New
  `tex/Ramp`
* New
  `tex/Shape`
* New
  `tex/Text`
* New
  `tex/ImageExporter`
* New
  `tex/Subnet`
* New
  `tex/Solver`, which is the base for effects like reaction-diffusion.
* New
  `tex/GenerativeImage`
* New
  `geo/Solver`
* New
  `geo/SDFTPMS`
* New
  `geo/TextureTrace`
* New
  `geo/VolumeFromTexture`
* New
  `geo/SplitByAttribute`
* New
  `geo/VoronoiNeighbours`
* New
  `mat/VolumeSurface`
* New
  `code/SDFTPMS`
* New
  `code/Subnet`
* New
  `code/ReactionDiffusion`
* New
  `code/Zebra`
* New
  `code/TextureLaplacian`
* New
  `code/VolumeSample`
* New
  `code/VolumeVoxel`
* New
  `code/TextureInput`
* New
  `code/TextureTexel`
* New
  `geo/SDFBuilder`, `geo/PointBuilder`, `geo/VolumeBuilder` and `tex/Builder` take several inputs.
* New
  A texture panel shows the textures of a TEX network, and can sit next to the viewer.
* Improved
  `mat/Volume` can read a 3D texture.
* Improved
  `geo/VoronoiField` gained an SDF output.
* Improved
  `geo/GroupCreate` and `geo/Delete` can select what is above or below a plane.
* Improved
  `geo/SDFOnion` can grow its wall outside, inside or on both sides.
* Improved
  `geo/Text` and `tex/Text` gained `letterSpacing`.
* Improved
  `geo/PrintProperties` can set the filament index, which the 3MF exporter writes.
* Improved
  Hovering a row of the geometry spreadsheet highlights that point or primitive in the viewer.
* Improved
  The attribute name menus have a fuzzy search.
* Improved
  A viewport handle is greyed out when its param holds an expression.
* Fixed
  `geo/FileOBJ` no longer crashes on a large file.
* Texture filters:
* Other TEX nodes to create images:

## [2.0.64](https://polygonjs.com/changelog/2.0.64)

Voronoi cells, print orientation, Claude Code

October 02, 2026

* Breaking
  `geo/VoxelCreate` now turns its input objects into voxels, like the other `geo/*Create` nodes. A scene that used it to make a voxel box or sphere uses `geo/VoxelBox` or `geo/VoxelSphere` instead.
* Breaking
  The `geo/PrinterPrepare` node is renamed `geo/PrintPrepare`. A scene that used it creates `geo/PrintPrepare` in its place. Its `sceneUnit` now defaults to centimetres, so a model one unit wide exports as 10 mm; set it to `MILLIMETER` for the old result.
* Breaking
  `geo/GenerativeModel` replaces its `mode` menu with a `useImages` checkbox. A scene that generated from images turns `useImages` on.
* New
  `geo/VoronoiCells` and `geo/VoronoiField` break a mesh into Voronoi cells.
* New
  `geo/PrintOrient` turns a model the way it prints best. `geo/PrintDownDirection` allows selecting the possible directions it can turn.
* New
  `geo/PrintOverhangMeasure` shows which faces of a model would print over thin air, and how much overhang area there is. `geo/PrintProperties` sets the print settings a slicer should use for each object.
* New
  SDF fractals: `geo/SDFMenger`, `geo/SDFMandelbulb`, `geo/SDFQuaternionJulia`, `geo/SDFKaleidoscopicIFS`, and the 2D `geo/SDFMandelbrot2D` and `geo/SDFJulia2D`.
* New
  `geo/SDFClip`, `geo/SDFClip2D` and `geo/M2DClip` cut SDF objects and 2D manifolds with a plane or a line, and keep one side or both.
* New
  `geo/PointRelax` spreads points evenly over a surface or through a volume.
* New
  `geo/QRCode` and `tex/QRCode` create a QR code, as a flat shape or as a texture.
* New
  `geo/M3DCompose` joins several solids into one solid made of several pieces. `geo/M3DHull` gained `combineObjects`, to wrap one hull around every solid at once.
* New
  The expressions `entitiesCount()`, which counts the points, primitives or objects of a geometry, and `sanitizeFileName()`, which makes text safe as a file name.
* Improved
  `geo/GenerativeModel` asks for your provider API key once and remembers it. In the desktop app, it can take its photos from a control panel.
* Improved
  `geo/SDFCreate` and `geo/VolumeCreate` gained `region`: work on just what is inside a box, to allow fine-tuning the resolution faster.
* Improved
  `geo/OrbitControls` can turn orbit, pan, zoom and move on or off one by one.
* Improved
  `geo/Extrude` and `geo/AttributeCreate` gained `group`.
* Improved
  `geo/SDFBox2D` can round or chamfer its corners, one size per corner if needed. `geo/SDFElongate` gained `center`.
* Improved
  `geo/Measure` computes curvature more accurately.
* Improved
  The 3MF exporter handles colors better.
* Improved
  The help panel lists nodes in a flat list, and the network panel shows a polynode’s own type.
* Fixed
  `geo/Extrude` no longer fuses the points of two extruded primitives that share a point.
* Fixed
  `geo/GroupCreate` by normal works on quads.
* Fixed
  `geo/LineExpand` computes its offsets correctly.
* Fixed
  `geo/Instance` and `geo/AttributePromote` copy an attribute that already exists on the target.
* Fixed
  The editor no longer crashes when a node is deleted while it is selected or an action on it is waiting.

## [2.0.63](https://polygonjs.com/changelog/2.0.63)

For-each loops, SDF glass, one attrib()

September 25, 2026

* Breaking
  The expressions `ptnum()`, `primnum()` and `objnum()` are replaced by `entityIndex()`. Write `entityIndex(.POINT)`, `entityIndex(.PRIMITIVE)` or `entityIndex(.OBJECT)` instead.
* Breaking
  The expressions `objectAttrib()` and `stage()` are merged into `attrib()`. Write `attrib(.NAME, entityType=.OBJECT)` or `attrib(.NAME, entityType=.STAGE)` instead.
* Breaking
  `geo/Curve`, `geo/M2DExtrude`, `geo/M2DRevolve` and `geo/SDFCreate` now keep the transform of their input object. A scene that moved the result back into place by hand can drop that step.
* New
  `geo/ForEachBegin` and `geo/ForEachEnd` repeat a group of nodes once per point, primitive or object, and merge what each pass produced. Creating either node from the tab menu creates the pair.
* New
  `geo/CopyToQuads` bends a copy of a template onto every quad, following each quad’s shape however it is twisted.
* New
  `mat/MeshSDF` can render SDF objects as glass, with refraction, absorption and dispersion. An opaque part inside a clear one shows through it.
* New
  `geo/SDFArc2D` and `code/SDFArc2D` create a circular arc as a 2D SDF.
* New
  The help panel has a node browser and a reference for every expression.
* New
  Expressions accept named arguments, such as `bbox(location=1)` which returns the bounding box of a node’s input 1.
* New
  `attrib()` can read an object’s position, rotation and scale. For instance, use `attrib(0, .P, entityType=.OBJECT)` to read an input object’s position.
* Improved
  Spare param hints are shown under the param instead of in a tooltip, and a page can hide or disable spare params from JavaScript.
* Improved
  `geo/LineExpand` keeps 2D input in 2D, and works in the object’s local space.
* Improved
  `geo/CurveProperties` can compute the tangent.
* Fixed
  A connection to the second input of a geo node is saved correctly.

## [2.0.62](https://polygonjs.com/changelog/2.0.62)

GPU SDF bake, exact CAD curves, web assets

September 21, 2026

* New
  Exporting a scene for the web collects the models and textures it uses, except if they are drag and dropped, since we do not store those yet.
* Improved
  `geo/SDFCreate` and in `geo/VolumeCreate` can now run on the GPU.
* Improved
  Copying a param as a relative expression writes `pv("/node/path/paramName")` with no type argument, since the type is read from the param itself. The older two argument form still works.

## [2.0.61](https://polygonjs.com/changelog/2.0.61)

Generate models, repair meshes, agent panel

September 18, 2026

* New
  `geo/GenerativeModel`, the first node to generate model with AI. It gives you granular access to all textures and materials, making it easy to edit. And you can of course modify it with any of the available nodes.
* New
  `geo/Repair` wraps many of the existing nodes that clean/fix geometries into one. It’s particularly useful to generate 3D printing ready models.
* New
  `geo/M3DResolveOverlaps` merges the interpenetrating bodies of a solid into one correct boundary.
* New
  `geo/M3DDecompose` splits a manifold solid into one object per connected piece. It is the exact equivalent of `geo/Connectivity` for solids.
* New
  `geo/AttributeExpand` expands an attribute along the edges of a geometry.
* New
  `geo/Clean` gained `repairTopology` and `harmonizeWinding`.
* New
  A slow node displays a progress bar showing how far along it is while it works.
* Improved
  The editor’s LLM panel has been renamed to Agent panel.
* Improved
  `geo/M3DCreate` accepts a mesh whose vertices are duplicated per face.
* Improved
  `geo/SDFTriangulate` outputs a manifold mesh when the field carries different colors.
* Improved
  `geo/DimensionDisplay` gained `keepInput`.
* Fixed
  Clicking an exporter node completes its cook when a node upstream of it is asynchronous. Before, the export stopped at the first async node and produced nothing.
* Fixed
  There was a critical bug where a local install of polygon failed to generate a web export. This is now fixed.

## [2.0.60](https://polygonjs.com/changelog/2.0.60)

Control panels, reference links, transform nodes

September 11, 2026

* Breaking
  `geo/TransformOrigin` and `geo/TransformFit` are removed, to be replaced by 3 new nodes. `geo/TransformPivot` to move a pivot. `geo/TransformAlign` to translate/rotate/scale relative to dimensions of another object. `geo/BoundsCheck` to ensure an object fits given bounds.
* Breaking
  The `direction` is removed from 2D primitive nodes: `geo/Circle`, `geo/M2DCircle` and `geo/M2DPlane`. `center` and `twist` are now baked into the points and the object matrix stays identity. This ensures `geo/Mirror` or `geo/Clip` reads the geometry where it is. To aim the plane somewhere other than XY, put a `geo/Transform` in OBJECT mode after the primitive. `geo/Line` with no input went the same way: its `origin` and `direction` are two numbers each now, and the straight line it draws lives in XY.
* New
  `geo/ControlPanel` draws a panel of controls over the viewer, in the editor and in a runtime build, with no UI code. See example [control-panel](https://polygonjs.com/examples/control-panel).
* New
  The network panel draws reference links: a faded arrow between two nodes when a parameter on one refers to the other.
* New
  `geo/TransformAlign` translates/rotates/scales input objects relative to given dimensions of another object.
* New
  `geo/TransformLayout` arranges the input’s objects side by side.
* New
  `geo/TransformPivot` moves an object’s pivot without moving the object.
* New
  `geo/BoundsCheck` measures the input against a target box.
* New
  `mat/MeshSDF` allows fine-tuning how SDF objects are rendered.
* Improved
  `geo/Mirror` reflects an SDF field, across the same plane. `geo/SDFMirror` is still the other operation on a field: it folds the field across the origin planes and costs no duplicated subtree.
* Improved
  `geo/SDFTriangulate` runs in the browser on the GPU, and samples the field in slices so a large grid does not have to fit in one dispatch.
* Improved
  A web build carries less code: a scene with no light drops the lighting models, a scene whose lights cast no shadow drops the shadow functions, and the area light tables load only when an area light is registered.
* Improved
  Ctrl+Enter submits a multi-line text field, so an expression typed over several lines is applied without reaching for the mouse.
* Improved
  A spare parameter can be renamed, and the expressions that read it are rewritten to the new name instead of breaking.
* Improved
  `geo/Delete`, `geo/Clean` and `geo/Clip` gained `keepUnreferencedPoints`, which keeps the points the surviving primitives no longer use instead of dropping them with the primitives that owned them. `geo/Clip` also cuts 2D geometry now.
* Improved
  `geo/Connectivity` splits segments, triangles, quads, hexagons and tetrahedra, refuses a point cloud instead of answering with one object per point, and says what to convert first when it is handed a NURBS or a CAD shape. `geo/ManifoldDisplay` reports the same facts from the other side.
* Improved
  The geometry spreadsheet shows each object’s translate, rotate and scale.
* Improved
  `geo/DimensionDisplay` scales its ticks with its text, so a dimension stays readable at any size.
* Improved
  `geo/DXFExporter` defaults to the XY plane, which is the plane a DXF is read in.
* Improved
  The quad nodes preserve primitive attributes through `geo/QuadSubdivide` and `geo/Quadrangulate`.
* Fixed
  Scene time ran slow in a browser, at 96% of wall time at 60 Hz and 86% at 144 Hz, because every frame’s delta was floored to a whole millisecond. The clock now carries the remainder and an animation runs at 100% of wall time. The time that expressions and shaders read now wraps every 2048 seconds, so it keeps its precision however long a session runs.
* Fixed
  A bypassed `geo/Output` no longer commits its inputs to the scene graph, so bypassing it really does hide what it was showing.
* Fixed
  A `geo/Subnet` whose output node is added after the subnet was created now cooks.
* Fixed
  The network panel’s “Display Help” toggle was not saved with the scene.

## [2.0.59](https://polygonjs.com/changelog/2.0.59)

SDF deformers, screw threads, GPU meshing

September 04, 2026

* Breaking
  `geo/SDFRound` is now `geo/SDFOffset`, and `code/SDFRound` is `code/SDFOffset`. I had chosen the previous name poorly, this one fits what the node does.
* New
  `geo/SDFTwist` turns a Field about an axis, `geo/SDFBend` wraps it around one, and `geo/SDFPolarRepeat` copies it around one. It’s very useful to bend text on a cylinder for instance: [sdf-bend-text-on-cylinder](https://polygonjs.com/examples/sdf-bend-text-on-cylinder), to build a [twisted pillar](https://polygonjs.com/examples/sdf-twist-pillar), or a [gear](https://polygonjs.com/examples/sdf-polar-repeat).
* New
  `geo/SDFThread` is a polynode (a node made of node), showing a receipe to make a thread. [sdf-thread-bolt-and-nut](https://polygonjs.com/examples/sdf-thread-bolt-and-nut).
* New
  The `code/SDF*` set now mirrors `geo/SDF*` one for one, with `code/SDFTube`, `SDFHexPrism`, `SDFTriPrism`, `SDFSolidAngle`, `SDFElongate`, `SDFImprint`, `SDFSeam`, `SDFExtrude` and `SDFRevolve` added. Anything you can build with the `geo/SDF*` nodes you can now build inside a `geo/SDFBuilder`.
* New
  `geo/SDFBuilder` can now modify an input field, not just generate one. [sdf-builder-rock](https://polygonjs.com/examples/sdf-builder-rock).
* New
  `geo/SDFCreate` can save the generated grid to disk and reload it. This is useful when building it from a high resolution geometry takes time: [sdf-grid-cache](https://polygonjs.com/examples/sdf-grid-cache).
* New
  `geo/SDFCreate` accepts curves. [sdf-curve-tube](https://polygonjs.com/examples/sdf-curve-tube).
* New
  `geo/CurveProperties` allows you to open or close an input curve.
* New
  `geo/M2DStroke` gives an open curve a width, so a polyline becomes a 2D region the rest of the M2D family can extrude, offset or triangulate.
* Improved
  `geo/SDFTriangulate` can sample the field on the graphics card.
* Improved
  `geo/SDFRevolve` gains `helical` and `pitch`, so the revolve climbs as it turns instead of closing on itself. That is what `geo/SDFThread` is built on.
* Improved
  `geo/Line` takes an input and joins its points into a polyline, one per object, in the order they arrive and with nothing else done to them. A 2D input gives a 2D polyline. `geo/Add` into `geo/Line` is the shortest route from a few hand-placed positions to something drawable.
* Improved
  `geo/Curve` builds a curve from positions typed into the node, with no input at all.
* Improved
  Seven `code/SDF*` nodes gained the viewport handle their `geo/SDF*` twin already had: the 2D family (`SDFBox2D`, `SDFCircle2D`, `SDFEllipse2D`, `SDFEquilateralTriangle2D`, `SDFHexagon2D`), `SDFSegment2D` and `SDFTransform`. A field built inside a `geo/SDFBuilder` is now dragged the same way as one built from the geo nodes.
* Improved
  The editor’s Memory panel reports what each node holds, broken down by category and sortable by column, so the node behind a large scene is findable.
* Fixed
  Importing a binary STL built every triangle from the first three points, so a file came in as a single sliver and nothing else. Only the first face was ever right.
* Fixed
  a crash when extracting a subnet from the network panel’s context menu. Typing into an integer parameter read the text as a float.

## [2.0.58](https://polygonjs.com/changelog/2.0.58)

SDF modeling, exporters, environment lighting

August 28, 2026

* Breaking
  The primitives take their sweep angles in DEGREES. `geo/Sphere` (`phiStart`, `phiLength`, `thetaStart`, `thetaLength`), `geo/Tube` and `geo/Capsule` (`thetaStart`, `thetaLength`) and `geo/Torus` (`arc`) all used radians. A saved scene keeps the number it stored, so a half sweep that read 3.14 now reads as 3.14 degrees. Retype the angle you want: a full turn is 360.
* Breaking
  A partial sweep needs the new `open` toggle. `geo/Sphere`, `geo/Tube`, `geo/Capsule` and `geo/Torus` only cut their sweep when `open` is on, so a scene that cut it with the angle alone comes back whole. Turn `open` on.
* Breaking
  `geo/Tube`’s `openEnded` is now `caps`, which means the opposite and is on by default. A scene that had `openEnded` on loses that setting and gets its caps back, so turn `caps` off.
* Breaking
  The manifold primitives are always built about their own middle. `geo/M3DBox` and `geo/M3DTube` lose `centered`, and `geo/M2DPlane`’s `center` changes from a toggle to an in-plane offset. Offset them with `center`, which a translate manipulator now drags in the viewer. `geo/Circle`’s `center` is a 2D offset in the circle’s own plane rather than a 3D position.
* Breaking
  A light’s `lightSize` is merged into `softness`. One number now sizes the PCF blur, the PCSS penumbra and the shadow an SDF object marches for itself, and it is a fraction of the light’s frustum rather than a count of shadow-map texels. Raising the shadow resolution no longer narrows the soft edge. Retune `softness` on lights that had it set.
* Breaking
  `geo/ManifoldDebug` is now `geo/ManifoldDisplay`, and it reports an error rather than only drawing. A scene saved with the old node drops it on load, so rebuild it.
* New
  Model with signed distance fields. The `geo/SDF*` nodes are out: primitives (`SDFSphere`, `SDFBox`, `SDFBoxFrame`, `SDFCapsule`, `SDFTorus`, `SDFTube`, `SDFRoundCone`, `SDFEllipsoid`, `SDFOctahedron`, `SDFPyramid`, `SDFTriPrism`, `SDFHexPrism`, `SDFPlane`, `SDFSolidAngle`), their 2D counterparts (`SDFCircle`, `SDFBox2D`, `SDFEllipse2D`, `SDFHexagon2D`, `SDFEquilateralTriangle2D`, `SDFSegment2D`), `geo/SDFBoolean` for union, subtraction and intersection with a hard, rounded or chamfered seam, and the shaping nodes `SDFRound`, `SDFOnion`, `SDFElongate`, `SDFMirror`, `SDFRepeat`, `SDFExtrude`, `SDFRevolve` and `SDFSlice`. An SDF object is raymarched in the viewer, so you shape the field itself and only turn it into a mesh when you want one. Start from [SDF Boolean Basic](https://polygonjs.com/examples/sdf-boolean-basic).
* New
  `geo/SDFImprint` marks one SDF object with another: a raised pad, a recess, a groove or an engraving. `geo/SDFSeam` builds the joint between two of them as a solid rod, for a weld bead, a piping or a trim line. Each SDF primitive carries its own colour, roughness and metalness, so a boolean keeps every part looking like itself: [SDF Boolean with different colors](https://polygonjs.com/examples/sdf-boolean-with-different-colors).
* New
  `geo/SDFTriangulate` converts an SDF back to a mesh, to a closed solid, or, from a 2D field, to its outline. It marches on a cell count or a cell size, takes an `isoValue` to grow or shrink the surface, and its solid output goes straight into the exporters: [SDF for 3D printing](https://polygonjs.com/examples/sdf-3d-printing-vase-basic).
* New
  `geo/SDFCreate` turns real geometry into a field, so a mesh can be blended, hollowed or imprinted like a primitive. `geo/SDFBuilder` defines a field from the `code/SDF*` nodes inside it, for a shape none of the primitives cover.
* New
  Four exporters. `geo/GLTFExporter` writes binary glTF (.glb) with per-object transforms and material colours, [export-gltf](https://polygonjs.com/examples/export-gltf). `geo/ThreeMFExporter` writes 3MF with units, several objects and colour, [export-3mf](https://polygonjs.com/examples/export-3mf). `geo/OBJExporter` writes Wavefront OBJ with one named block per object, [export-obj](https://polygonjs.com/examples/export-obj). `geo/DXFExporter` writes DXF R12 for laser cutters and CNC, with cut and engrave lines on separate layers, [export-dxf](https://polygonjs.com/examples/export-dxf). PLY and STL merge their input objects so nothing is silently left out: [export-ply](https://polygonjs.com/examples/export-ply), [export-stl](https://polygonjs.com/examples/export-stl).
* New
  The `geo/PrinterPrepare` polynode puts a model in the state a printer expects, in one node: it checks the model is a closed solid, turns the scene’s Y-up into the Z-up every slicer reads, scales the scene unit into millimetres, and measures the result against the build volume. It errors before an exporter writes a file that cannot be printed.
* New
  `geo/Environment` lights the whole scene from one environment map, with a background mode to show it or hide it. The `geo/EnvironmentHelper` polynode puts a mirror ball and a matte grey ball in the scene so you can read what the map is doing. `tex/FileHDR` loads Radiance .hdr files, and the editor gets an HDRI and EXR picker with real image previews.
* New
  `geo/MaterialAttributes` sets colour, roughness, metallic and emission on geometry in one node, and those attributes survive a manifold boolean.
* New
  The `geo/DimensionDisplay` polynode writes a part’s size beside it, per axis, in millimetres and inches, which is the readout someone wants before downloading a file: [showing a part’s size](https://polygonjs.com/examples/dimension-display). `geo/DimensionPromote` converts geometry between 2D and 3D.
* New
  `geo/FileOBJ` imports Wavefront .obj geometry, with presets. `tex/Color` fills a texture with a flat colour, for any input that wants a texture but only needs a constant. `geo/VolumeSmooth` smooths a volume’s voxel values.
* New
  `render/Taa` is available, to allow temporal antialiasing. It’s currently useful to have smooth edges when modeling with SDF nodes.
* Improved
  A glTF compressed with Draco or meshopt now imports. 2.0.57 refused those files with an error naming the extension, which is still what happens for an extension Polygon does not support.
* Improved
  A node can WARN as well as error. A warning marks the node and reaches the logger without stopping the graph, and `geo/AttributeDisplay` is the first to use it. A polynode also surfaces the error of the node inside it rather than failing silently.
* Improved
  Expressions do more. `bbox()` and `centroid()` take a node path, so `bbox("/geo1/box1").size.x` reads another node’s bounds. `format(value, decimals)` turns a number into a string, which is what lets a `StringParam` read `"X " + format(bbox("/box1").size.x, 1) + " mm"`. A cycle between expressions is detected and reported instead of looping.
* Improved
  `geo/GroupCreate` gains `byPattern`: build a group from the members of groups that already exist, or by entity index, using the same syntax as any other group field.
* Improved
  Manipulators translate on the XY plane, and the manifold primitives carry one for `center`.
* Improved
  `geo/Text` gains vertical alignment, handles line breaks properly, and describes itself in the help panel.
* Improved
  `geo/Merge` preserves the object groups of its inputs. `geo/Delete` no longer clones its input, so it is faster on large scenes. `geo/Wireframe` emits one segment per edge rather than one per half edge. `geo/Clip` interpolates attributes across the cut.
* Improved
  `geo/SceneGLTF` references nodes by relative path, names and lays out the generated sub-graph better, and gets a flight helmet preset.
* Improved
  The 3MF export carries colour, writes the tags Bambu Studio reads, and drops its pretty printing to keep files small.
* Improved
  `code/TextureSample2D` gains `mipMapBias`, and the `code` context gets divide and invert through MathBinary and MathUnary.

Also in this release

* The wireframe hotkey is G, and Shift+G walks the cycle backwards. It was Ctrl+W, which browsers take to close the tab, so it never worked on the web.
* Fixed: a crash when creating a node with Enter from the tab menu, a crash when dropping a polynode with no inputs onto a connection, a crash when clicking a read-only panel in the LLM tab, and a crash on resize in the web build, which the blog embeds were hitting.
* Fixed: the colour picker did not match the colour it was editing when used for the renderer background. A node context menu could be opened from outside the network panel. Renderer leaks and a double free on the GPU side.

## [2.0.57](https://polygonjs.com/changelog/2.0.57)

Extrude inset, polyWire follows edges, glTF fixes

August 13, 2026

* Breaking
  `geo/PolyWire` follows the edges of its input instead of sweeping through the points in order. Separate curves inside one object are no longer stitched end to start, and separate input objects come out as separate meshes. A point cloud with no edges still sweeps through its points in order, so that case is unchanged.
* Breaking
  `geo/MergeCompact` is gone. It is now a `compact` toggle on `geo/Merge`, off by default, with `computeNormals` beside it. Existing Merge nodes behave exactly as before. A scene saved with a MergeCompact drops that node on load, so rebuild it as a Merge with `compact` on. The compact path gains what Merge already had: the per-input toggles apply, stage attributes carry through, and lights, cameras and controls pass through instead of being swallowed.
* New
  `geo/Extrude` gets an `inset` param. It tapers the extrusion inwards by a distance measured perpendicular to each edge, so the inset edges stay parallel to the ones they came from. Negative values widen it instead. Feed the mesh through `geo/Facet` with `splitAllFaces` first and every face becomes its own panel with a tapered rim.
* New
  Ctrl+Down sends the playhead back to the start of the play range. If the scene is playing, it pauses instead.
* Improved
  `geo/PolyWire` tubes a mesh or a grid wireframe correctly: mitered rings through bends, a ball at every junction where three or more edges meet, flat caps at loose ends, and a frame that no longer rolls along a long curve.
* Improved
  `geo/Extrude` handles quad meshes, and a quad mesh stays a quad mesh. A new `computeNormals` toggle, on by default, recomputes the normals from the extruded result rather than keeping the input’s, which described the input and not the extrusion.
* Improved
  `geo/Extrude` keeps primitive attributes. The bottom, the top and every side wall inherit the attributes of the face they came from.
* Improved
  `geo/Facet` works on quad and hexa meshes. Both `splitAllFaces` and the angle threshold apply, and the node never triangulates: a quad mesh stays quads and a hexa mesh stays hexa.
* Improved
  A glTF that requires an extension Polygon does not support is refused with an error naming it, instead of reading compressed bytes as geometry. Draco and meshopt exports are the common case. Re-export without compression.
* Improved
  `geo/SceneGLTF` maps glTF’s `doubleSided` onto the generated `mat/MeshPBR`’s `sides` param, so imported foliage, cloth and thin panels are no longer invisible from the back.
* Improved
  `geo/SceneGLTF` builds a remote asset on a single press of Build. The node reports that it is fetching while the download runs, then generates the sub-graph on its own as one undoable step, and clears its error once the build succeeds.
* Improved
  Framing the camera skips lights and helpers, so it frames your geometry instead of pulling back to include a distant light. The `frameObjects` default on the camera control nodes is now `* ^grid* ^*Camera* ^*Light* ^*Helper*`.
* Improved
  The material nodes carry help. `mat/MeshPBR`, `MeshPhong`, `MeshLambert`, `MeshNormal`, `MeshGrid`, `MeshBasicTexture`, `MeshBasicDepthTexture`, `Sky`, `Volume`, `Voxel` and `RaymarchingBuilder` all describe themselves and their params in the panel.
* Fixed
  Soft shadows no longer show acne as `softness` goes up on a spotlight or a directional light. Two related artifacts go with it: a dark band at the edge of a light’s shadow map, and shadow bleeding in from a light packed beside it in the atlas.
* Fixed
  The `geo/SpotLight` helper draws the cone at the angle the light actually covers. It used to draw it about half as wide.
* Fixed
  Deleting a node no longer crashes the editor when work was already queued for it that frame, such as a dirty node inside an open `MAT` network, or a node that had just errored.
* Fixed
  `geo/HexaPlane` outputs a normal attribute. It carried none.
* Fixed
  Triangulating a hexa or a quad mesh gives the added centre points their own attributes, the average of the corners they sit between. They used to carry an unrelated source point’s uv and colour, and a hexa mesh could read past the end of its attribute buffers.
* Fixed
  Normals computed on a quad or a hexa mesh point outwards. They came out inverted relative to the triangles on screen.

Also in this release

* Transform gizmos from nodes selected inside a subnet no longer stay on screen after you leave it, when the selection was larger than the number of gizmos the editor displays at once.
* `mat/MeshBasicTexture` and `mat/MeshBasicDepthTexture` use the alpha of their `color` param as an overall opacity, on top of the texture’s own alpha.
* `geo/Copy`, `geo/ObjectProperties` and `geo/PhysicsRBDAttributes` show their key values under the node in the network panel.
* `geo/PolyWire`’s `radius` goes past 1, up to 10 and beyond.

## [2.0.56](https://polygonjs.com/changelog/2.0.56)

Transparency modes, colour palettes, cursor-driven compute

August 12, 2026

* Breaking
  The `advanced` toggle and the depth params behind it are gone from the `mat/*` nodes. Use the new `transparencyMode` instead: `OPAQUE` keeps a material out of the transparent pass, `BLEND` puts it in. `AUTO` will infer what is needed on most cases.
* Breaking
  The `USE_OIT` object attribute is now `TRANSPARENCY_MODE`, and it holds a mode rather than a flag. Rename it in your scenes and set it to `BLEND` where it used to be true. Similar to the material, `AUTO` will infer what is needed on most cases.
* Breaking
  Type-specific params on the `code/*` nodes now carry an underscore. `code/Clamp.inputFloat` is `input_Float`, and `geo/AttributeCreate.valueFloat` is `value_Float`. Saved scenes need those names updated by hand, there is no migration yet.
* New
  Every material has a `transparencyMode`: `AUTO`, `OPAQUE`, `MASK` or `BLEND`. An alpha below 1 now does something on every material, not only on the few that happened to implement it. The names match glTF `alphaMode`, and `geo/SceneGLTF` maps an imported one straight onto it.
* New
  `MASK` mode and the new `alphaCutoff` param give hard-edged cutouts that still write depth, so cutouts occlude each other correctly. `mat/MeshBuilder` carries it today.
* New
  `geo/ObjectProperties` sets `transparencyMode` per object, so one material can serve both opaque and transparent objects.
* New
  Materials have a `sides` param: front, back or both.
* New
  `tex/Palette` generates a colour palette and bakes it into a 1D texture. Hue travels an eased cycle while saturation and lightness sweep eased ranges, in OKLCH for perceptually even steps or in plain HSL. The result comes out as hard blocks or as a gradient blended in OKLab.
* New
  The cursor and its ray are available inside compute and GPU shaders, alongside a new `code/RayClosestPoint`.
* New
  One wasm build can drive several scenes on the same page, each with its own canvas, camera and pointer input. The editor stays single-scene and switches itself off when a page holds more than one.
* New
  `geo/M2DBoolean` and `geo/M3DBoolean` get a mode. Either pair each shape from input 0 with its counterpart in input 1, or batch every shape from both inputs into a single result.
* New
  `geo/AttributeCreate` and the `code/*` nodes handle `S8`, `S32` and `U8` attributes.
* New
  The alpha of a `mat/MeshBuilder` can drive its shadow, so a faded or cut-out surface casts a matching one.
* New
  `tex/Image` comes with presets.
* Improved
  Hovering a param in the params panel shows its help as a tooltip. Polynodes carry help of their own now, so the panel is no longer blank on them.
* Improved
  Hovering a connector in the network panel raises its label, so it is readable over the nodes behind it.
* Improved
  The `group` param sits nearer the top of `geo/Transform`, `geo/Material`, `geo/CADExtrude` and `geo/CADRevolve`.
* Improved
  Errors coming out of a wasm build report a usable stack trace.
* Improved
  Crash logs can be uploaded from canvas and SDK builds, not only from the editor.
* Improved
  `code/Compare` and `code/TwoWaySwitch` start on more useful default values.
* Fixed
  Textures fed to `mat/MeshBuilder` have their colour space managed, so an sRGB image no longer renders with the wrong colours.
* Fixed
  Deleting a node inside a `code` network no longer crashes the editor.
* Fixed
  Custom attribute names, defined in the SDK, appear in the attribute name menus again, and they serialize correctly from the nodes that create them.
* Fixed
  File > Save As was missing from SDK builds.
* Fixed
  Images loaded in wasm keep their alpha channel.

## [2.0.55](https://polygonjs.com/changelog/2.0.55)

minor fixes

August 08, 2026

* Fixed
  When opening the examples panel on windows, there are no more spawned extra windows (which happened due to child processes downloading the thumbnails).
* Fixed
  When using the cursor to drive an object, the cursor would be clamped to the viewer bounds. This is not the case anymore.

## [2.0.54](https://polygonjs.com/changelog/2.0.54)

autoplay for embedded scenes

August 08, 2026

* New
  An embedded scene can start playing as soon as it loads: pass `autoplay: true` to `polygonAppInit` next to the scene data. Without it the scene sits on frame 0, which makes a solver or an `OnTick` actor look like a still image on a page with no transport controls.
* Fixed
  The example pages on polygonjs.com no longer show the default scene’s box sitting in the middle of the example. The box is bypassed, not deleted, so un-bypassing it brings it back.

## [2.0.53](https://polygonjs.com/changelog/2.0.53)

Cursor-driven physics, render/Combine, shadow fixes

August 08, 2026

* Breaking
  `render/Add`, `render/Multiply` and `render/Composite` are replaced by one `render/Combine`, whose `operation` param is ADD, MULTIPLY or OVER. Scenes using the old nodes need the node swapped by hand.
* Breaking
  `mat/MeshInstance` is gone. Instances are drawn by `mat/MeshBuilder` with a `code/Instance` node inside, which is the graph `geo/Instance` now builds for you.
* New
  A rigid body can be kinematic, driven from an actor with `code/SetObjectPosition` or `code/SetObjectAttribute`. It pushes the dynamic bodies around, so you can shove a simulation with the cursor.
* New
  Cursor nodes: `code/Cursor`, `code/CursorRay`, `code/Ray`, `code/Plane` and `code/RayPlaneIntersect`, to turn a pointer into a position in the scene.
* New
  `compute/Subnet` and `compute/PolyNode`: group compute nodes together, and save the group as a node you can reuse.
* New
  `render/Combine` works on WebGL2. Where there are no compute shaders it runs the same operation as a fullscreen pass, and the image is the same.
* New
  An embedded scene can be unmounted and remounted from JavaScript, so a page can put a scene away and bring it back.
* New
  New example: many rigid bodies you can push around with the cursor.
* New
  The command line downloads the SDK without a login.

## [2.0.49](https://polygonjs.com/changelog/2.0.49)

Decimate, embedded text fonts, error propagation

August 01, 2026

* Breaking
  `code/Negate`, `code/Complement`, `code/Pow` and `code/Normalize` are merged into the node `code/MathUnary`. Typing the old name in the tab menu still creates it, but scenes saved with the old node types will not load. We don’t have a migration system yet, so this may require manual update in the scene file for now.
* New
  `geo/Decimate`: reduce a mesh’s triangle count, either as a fraction of the input or to an absolute triangle count, with boundary locking, small-component pruning and a maximum-error budget.
* New
  Chrome-less fullscreen viewer. Toggle it in the viewer and save the scene, and it reopens with no editor UI around it.
* Improved
  `geo/Text` embeds its font, so text renders with no external font file to ship or find.
* Improved
  Errors travel through the graph: a node whose input is errored reports it, referencing an errored node is itself an error, and the network panel tells you when you are inside one.
* Improved
  The web editor reports its loading progress and fetches a gzipped payload, so the first frame arrives sooner.
* Improved
  Network panel: improve snapping.
* Improved
  Normals are computed whenever a material needs them, including through `geo/CageDeform`. No more black shading on deformed geometry.
* Improved
  `geo/HexaPlane` now faces +Y by default.
* Fixed
  Nodes inside a bypassed subnet no longer cook.
* Fixed
  `geo/PLYExporter` and `geo/VolumeExporter` preserve the object’s transform.
* Fixed
  Object transforms are no longer read before they are up to date, which could place geometry a frame behind.

Also in this release

* `geo/Text`’s secondary parameters are simplified.
* Dropdown styling and window corners are consistent across the editor.

## [2.0.46](https://polygonjs.com/changelog/2.0.46)

Drag-to-connect network panel, voxel surface offsets

July 29, 2026

* New
  Drag a node over another and hold for a moment, they connect, with no aiming at a connector.
* New
  Shake a node (or a whole selection) mid-drag to pull it out of the graph: the boundary edges drop and the chain heals behind it, so `a → x → c` becomes `a → c`.
* New
  `surfaceOffset` on `geo/MeshToVoxel` and `geo/VoxelCreate`: shift the iso-surface the voxels are built from: negative erodes so the voxels sit inside the real surface, positive dilates for a thicker shell or to close thin features.
* Improved
  Connecting nodes no longer needs a precise cursor: connectors snap from a distance, the wire you are dragging previews the connector the drop will actually use, and the snap still works when zoomed out.
* Improved
  A whole node drag is a single undo step, however many connect, disconnect and splice actions it fired along the way.
* Improved
  `geo/MeshToVoxel` voxelizes box-shaped meshes far more faithfully.
* Fixed
  Undoing while dragging a node no longer crashes the editor.
* Fixed
  Setting a node path, asset path or string parameter to an empty string resets it to its default, instead of leaving an empty reference that could not resolve and broke code export.
* Fixed
  Node paths and asset paths are trimmed, so a path pasted with a stray leading or trailing space still resolves.

Also in this release

* PolyNode spare parameters and the parameters declared by a PolyNode definition now stay in step with each other, including through save, reload and regeneration.

## [2.0.45](https://polygonjs.com/changelog/2.0.45)

First public version of Polygon V2

July 28, 2026

* New
  Polygon V2 is a complete rewrite of v1, that can run and build for native & web.
