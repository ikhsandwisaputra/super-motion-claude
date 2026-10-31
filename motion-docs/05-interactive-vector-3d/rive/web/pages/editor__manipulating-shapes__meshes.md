---
source: https://rive.app/docs/editor/manipulating-shapes/meshes
title: "Meshes"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Meshes

Add natural, organic deformations to raster graphics.

Meshes let you deform raster images and [components](/docs/editor/fundamentals/components#deform) by moving vertices instead of transforming the image as a flat rectangle. They are useful for natural motion, such as skin flexing, fabric rippling, hair flowing, or creating faux 3D effects.

A mesh is built from a [contour](#contours), which defines the mesh’s shape and vertices. Rive uses that contour to create a triangulated surface over the image.

<video />

> **[Learn by remixing](https://rive.app/community/files/28327-mesh-and-bones/?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

## Adding a Mesh to an element

Meshes can be applied to images, as well as instances of components with their **Mode** set to **Node**

### Images

**Step 1**

Select an image on the Stage or Hierarchy and press **Enter** or go to the **Deform** section in the Inspector.

**Step 2**

Click the **+** button and select **Mesh**.

![In the Inspector, in the Deform panel click the plus icon and select Mesh](https://mintcdn.com/rive/7vlnw4h5oD5kW3iO/images/editor/meshes/adding-mesh.png?fit=max\&auto=format\&n=7vlnw4h5oD5kW3iO\&q=85\&s=2c93fd0fe13cb984b9b895895cdde882)

### Components

You can also add a mesh to a [component](/docs/editor/fundamentals/components#deform) instance with **Mode** set to **Node**. The component draws its artboard as a flat image and the mesh deforms that image, so you can bind it to bones and animate its vertices like any other mesh.

**Step 1**

Select the component instance and set **Mode** to **Node**.

**Step 2**

In the **Deform** section of the Inspector, click **+** and select **Mesh**.

## Deforming a Mesh

Enter Mesh Editing Mode by pressing `V` or by deselecting **Edit Contour**.

In mesh editing mode, moving a vertex changes the shape of any triangles connected to that vertex and deforms the pixels inside those triangles. Pixels in triangles that are not connected to the moved vertex are not affected.

Here’s a simple mesh with four vertices divided into two triangles:

<video />

Here’s a slightly more complex mesh with a center vertex, dividing the image into four triangles:

<video />

The position of these vertices can be keyed on a timeline or [controlled by bones](/docs/editor/manipulating-shapes/bones).

## Contours

The contour defines the visible shape and vertex structure of the mesh. Editing the contour changes the mesh structure without deforming the image.

### Creating contours

When you add a mesh to an image, Rive automatically creates a simple contour with four vertices that make two triangles. You can use this contour as a starting point or make your own.

#### Manually create a new contour

Click the **New Contour** button to draw a new contour from scratch.

This is useful when the default contour does not match the shape of the image, or when you want full control over the mesh structure.

<video />

#### Auto-trace a new contour

Use **Auto-Trace** to quickly create a contour that follows the visible shape of an image.

Adjust the settings to control the generated contour:

* **Detail** - how closely the contour follows small details in the image.
* **Concavity** - how deeply the contour follows inward curves.
* **Uniform** - how evenly vertices are spaced along the contour.
* **Alpha** - the transparency threshold used to detect the image edge.
* **Padding** - extra space added around the traced outline.

<video />

#### Contour bounds

Only the area inside the contour is rendered. Anything outside the contour is hidden.

This can be useful when you want to create multiple meshes from different parts of the same image.

<video />

### Editing contours

Use **Edit Contour** or press **P** to adjust the existing contour. The Mesh Pen lets you add new vertices or move existing vertices without warping the image.

<video />

Click continuously to create forced edges between vertices. Press **Esc** between clicks to create separate vertices and let Rive automatically generate the edges between them.

<video />

#### Forced edges

Forced edges are edges you manually add between mesh vertices. Use forced edges when you need more control over the mesh structure, such as defining an important seam, crease, corner, or area where the mesh triangles should follow a specific path.

When using the Mesh Pen, click continuously to create connected vertices with forced edges.

Tip

**Example - Rigging a Snake**

In this example, the default edges made the snake stretch in an unexpected way, creating a bump in its skin. By adding a forced edge, the edges run perpendicular to the body, helping the snake deform more naturally.

<video />

Forced edges are shown as thicker lines in the mesh.

![Forced edge in a mesh](https://mintcdn.com/rive/7vlnw4h5oD5kW3iO/images/editor/meshes/forced-edge.png?fit=max\&auto=format\&n=7vlnw4h5oD5kW3iO\&q=85\&s=badbff9d3f80df5b994956ce0c684677)

To remove a forced edge, select **Edit Contour**, then **Cmd-click** the edge on macOS or **Ctrl-click** the edge on Windows.

### Generate

Use **Generate** to add more vertices to the current mesh. Click **Generate** multiple times to increase the mesh complexity.

A more complex mesh can create smoother deformations, but it can also be harder to edit.

<video />

### Resetting a contour

Use **Reset** to return the mesh to its default contour.

<video />

## Managing meshes

### Copying a Mesh

You can copy a mesh and apply it to another image.

**Step 1**

Select the image with the mesh you want to copy and press **Cmd + C** on macOS or **Ctrl + C** on Windows.

**Step 2**

Select the image you want to apply the mesh to and press **Cmd + P** on macOS or **Ctrl + P** on Windows to paste the mesh.

<video />

### Swapping images

A mesh can continue to work when the image is changed.

This is useful when multiple images share the same basic structure. The same mesh can deform each face without creating a separate mesh for every image.

<video />

### Removing a Mesh

After an image has a mesh, the **Deform** section shows options for editing or removing it.

**Step 1**

Select an image on the Stage or Hierarchy and press **Enter** or go to the **Deform** section in the Inspector.

**Step 2**

Click the **Edit Mesh** or **Remove Mesh** button.

> [!WARNING]
>
> Removing a mesh deletes the mesh and its vertex edits from the image.

## Mesh view options

Mesh view options control how the mesh and image appear while editing. These options can make it easier to focus on vertices, edges, weights, or the deformed result.

![Mesh view options](https://mintcdn.com/rive/7vlnw4h5oD5kW3iO/images/editor/meshes/view-options.png?fit=max\&auto=format\&n=7vlnw4h5oD5kW3iO\&q=85\&s=289725f2b64889034def5528bd63c69c)

* **Bounding Box Edit** - show a bounding box around selected vertices so you can transform them together.
* **Isolate** - show only the graphic or graphics being edited.
* **Show Weights** - show mesh weights while editing.
* **Deform** - toggle between the deformed and undeformed version of the image.
* **Show Triangles** - show or hide the triangle edges. When disabled, only vertices are shown.
* **Dim** - dim the image so the mesh is easier to see.
