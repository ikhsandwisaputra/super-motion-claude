---
source: https://rive.app/docs/editor/fundamentals/edit-vertices
title: "Edit Vertices"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Edit Vertices

No matter the type of vector you create, you can edit the vertices by changing their position or handles in both design and animate mode.

## Edit vertices mode

To enter Edit Vertices mode, either select the shape and hit enter twice or select a path and hit enter once.

![Entering Edit Vertices mode to show the vertices and bezier handles of a rectangle on the stage](https://mintcdn.com/rive/023_vUv4_zHxZVTt/images/EVM.gif?s=35151ad31ed2eb699338b707fe412ced)

After activating Edit Vertices mode, you can select any vertex, reposition it, and edit the bezier handles.

> [!TIP]
>
> Use [Deep Select](/docs/editor/interface-overview/selection-and-navigation#deep-select) to select a specific path inside nested groups on the stage.

### Path options

Each path in Edit Vertices mode has a set of path options at the top of the Inspector.

#### Done Editing Button

The Done Editing button can be used to exit Edit Vertices Mode.

![Done Editing button at the top of the path options in the Inspector](https://mintcdn.com/rive/023_vUv4_zHxZVTt/images/DoneEdit.png?fit=max\&auto=format\&n=023_vUv4_zHxZVTt\&q=85\&s=3a712007ff01da10c8369a0b22fcc2c5)

#### Open Path

The Open Path button will disconnect the last vertex from the first vertex.

![Open Path button in the path options at the top of the Inspector, right below the Done Editing button](https://mintcdn.com/rive/023_vUv4_zHxZVTt/images/OpenPath.png?fit=max\&auto=format\&n=023_vUv4_zHxZVTt\&q=85\&s=9164e42d75477fec29da0e22e24d9fb1)

#### Reverse Direction

[YouTube video player](https://www.youtube.com/embed/zp2NNsSTfO8)

The Reverse Direction button can be used to reverse the direction of the path. Depending on the Fill-Rule, this can eliminate holes in our shape by changing the mathematical value of the selected path.

#### Convert Radial Corners

Straight vertices with a corner radius will deform when the scale transform is applied to the shape or path layer. You can convert radial corners from a procedural property to a defined set of vertices. This process will eliminate deformation of the corner.

![Convert Radial Corners button in the path options converts a single rounded corner into two vertices on the stage](https://mintcdn.com/rive/3TdvqAcmyPpedEbB/images/convert.gif?s=6097625a00f0d19b51c049fee365fb2f)

#### Simplify

Use **Simplify** to reduce the number of vertices in a path while preserving its overall shape.

<video />

* **Tolerance** controls how far the simplified path can deviate from the original path. Higher values allow greater changes and can remove more vertices.
* **Corner Angle** controls which angles are preserved as corners.
* **Straight Lines** removes curves from the simplified path, connecting the remaining vertices with straight lines.

The preview shows the number of vertices before and after simplification. Select **Simplify Path** to apply the changes.

## Bezier handles

### Straight

‌The default handles are set to straight, which creates straight edges between vertices.

![Straight handle type selected in the bezier handle options](https://mintcdn.com/rive/m-97tWnDKhYq4cwm/images/Straight.png?fit=max\&auto=format\&n=m-97tWnDKhYq4cwm\&q=85\&s=99aeeeea0cdd7757a1b001373d23a0ef)

### Corner Radius

The Corner Radius property allows you to round straight corners. This property only appears on vertices that are set to straight.

### Mirrored

‌Mirrored is the default handle when you create a vertex by clicking and dragging. These handles always keep the same rotation and length.

![Mirrored bezier handles on a vertex mirroring each other as they are dragged](https://mintcdn.com/rive/OxZXMWcayraTF8IT/images/mirriored.gif?s=383d95ab2814747673a8482c23623062)

### Detached‌

Detached handles allow each handle to have its own rotation and length.

![Detached bezier handles on a vertex, each being dragged independently](https://mintcdn.com/rive/3TdvqAcmyPpedEbB/images/detached.gif?s=29d28854aa3445a53d9a4572d6a78b2e)

### Asymmetric

‌Asymmetric handles share the same rotation but can have lengths independently of each other.

![Asymmetric bezier handles on a vertex sharing the same rotation but dragged to independent lengths](https://mintcdn.com/rive/3TdvqAcmyPpedEbB/images/asem.gif?s=db289b47f6e340fe4f99f7de50cd67f1)
