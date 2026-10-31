---
source: https://rive.app/docs/editor/libraries
title: "Libraries"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Libraries

Share components, view models, and enums across Rive files in the same project.

> [!NOTE]
>
> Libraries are available on Voyager and Enterprise plans. [Learn more about our plans and pricing](https://rive.app/pricing?utm_source=docs\&utm_medium=content).

Libraries let you share [components](/docs/editor/fundamentals/components), [view models](/docs/editor/data-binding/view-models), and enums across Rive files in the same project.

Publish the elements you want to share from a source file, then import them into other files. When you publish changes to the library, those files receive an update notification so you can choose which elements to update.

This gives your team a shared source for reusable elements, with version history to help you track changes.

[YouTube video player](https://www.youtube.com/embed/g6AXyqp4Ow0)

## Creating a library

Any Rive file can become a library. To publish one:

**Step 1**

Create a [component](/docs/editor/fundamentals/components), a [view model](/docs/editor/data-binding/view-models), or both. To turn an artboard into a component, select it on the stage and click the component icon in the inspector, or press `Shift` + `N`.

**Step 2**

Open the publish menu in the toolbar and select **To Library**, or select **Publish Library** from the file menu.

**Step 3**

In the publishing panel, choose which components, view models, and enums to publish.

![Create a library](https://mintcdn.com/rive/9PK9AtoFn978TzLU/images/editor/libraries/create-library.png?fit=max\&auto=format\&n=9PK9AtoFn978TzLU\&q=85\&s=232b614dcdfa5b4e968e5ac6e304ece9)

## Importing from a library

Click the **+** icon in the **Assets** or **Data** panel and select **Library Component**. The library panel opens beside the left sidebar and lists the libraries available to your file.

> [!NOTE]
>
> Currently, a Rive file can only access libraries contained within the same project. Cross-project — or workspace — libraries are coming soon. Public libraries are planned soon after that.

Select a library to see its components, view models, and enums. Choose the elements you want to import, then select **Add to File** or **Add to Active Artboard**.

![Add library component to file](https://mintcdn.com/rive/9PK9AtoFn978TzLU/images/editor/libraries/add-to-file.png?fit=max\&auto=format\&n=9PK9AtoFn978TzLU\&q=85\&s=ba472479b42bcf2da8cd2f848400e087)

> [!TIP]
>
> Use the version dropdown to browse and import earlier versions of a library.
>
> ![Select a version of the library component](https://mintcdn.com/rive/9PK9AtoFn978TzLU/images/editor/libraries/library-version.png?fit=max\&auto=format\&n=9PK9AtoFn978TzLU\&q=85\&s=4d55ad463ed41feff2e0653eef8e2754)

After importing, use the components from the **Assets** panel and view models from the **Data** panel. Imported elements have a small library icon in the bottom-right corner of their regular icon, as well a version number.

![Component with a library icon and version number](https://mintcdn.com/rive/9PK9AtoFn978TzLU/images/editor/libraries/library-icon.png?fit=max\&auto=format\&n=9PK9AtoFn978TzLU\&q=85\&s=1e1c75e15d94621fce5c193eafcec3c2)

## Updating a library

### Publish changes

Edit the source file to change, add, or remove components, view models, and enums. Then republish using **To Library** in the toolbar's publish menu or **Publish Library** in the file menu.

Files that have imported elements from the library display a badge when an update is available.

### Update imported elements

**Step 1**

In the file that uses the library, right-click the component in the **Assets** panel.

**Step 2**

Select **Library Options** > **Update Component**.

**Step 3**

Choose the library elements to update, then select **Update Selected**.

> [!NOTE]
>
> When you add a view model from a library to another file, Rive creates a unique instance of that view model in the Data panel. Its property values are independent of the library's defaults, even if the instance isn't used on an artboard.
>
> This prevents changes to library defaults from overwriting values you've customized in the host file.

### Sync view model instances

To sync instances with the library, right-click the view model in the **Data** panel and select **Library Options** > **Sync Instances**.

Syncing matches instances by name and:

* Adds any library instances that are missing from your file.
* Sets the default instance to match the library's default instance.
* Copies the library's values into properties that are still set to their type's default (for example, `0`, `false`, or an empty string).

Syncing never deletes instances. It preserves property values that differ from their type's default, but can replace default-valued properties even if you set them intentionally.

> [!NOTE]
>
> When you update a library, Rive automatically adds any new instances, but it doesn't change your file's default instance. Use **Sync Instances** if you also want the default instance to match the library's.

## Detaching

[YouTube video player](https://www.youtube.com/embed/TtOOPSAm6pI)

Detach an imported component or view model to make a local copy you can edit independently of the library.

Right-click the component or view model in the left sidebar and select **Library Options** > **Detach**. Rive copies its contents into your file and redirects any references to the local copy.

> [!NOTE]
>
> It's not possible to re-attach a component after it has been detached.

## Export options

Library components can depend on other elements, such as images or components from another library. Export options control which components and assets are included in the exported `.riv` file.

Select a component, asset, or library in the **Assets** panel to set its export options in the inspector.

![Image](https://mintcdn.com/rive/9PK9AtoFn978TzLU/images/editor/libraries/export-options.png?fit=max\&auto=format\&n=9PK9AtoFn978TzLU\&q=85\&s=ddf21eafbdf9dee85152f7b277310103)

| Option | Export behavior |
| - | - |
| **Automatic** | Include the asset or component if it's used somewhere on the stage. For assets within a library, this option is inherited from the source file. |
| **Force Export** | Include the asset or component even if it isn't referenced in the file. |
| **Prevent Export** | Exclude the asset or component even if it's referenced in the file. |

Choose export options based on how you'll use the file at runtime. For example:

* If you supply an image from an external source at runtime, exclude it from the `.riv` file.
* If you share a library component across multiple Rive files through data binding, export it separately and exclude it from the files that use it to avoid duplication.

> [!NOTE]
>
> Currently, the export behavior for assets within a library component can only be set at the library level, not per component. To do so, set the panel display mode to Source/Type, and select the library item in the asset panel.

## Unpublishing a library

Select **Unpublish Library** from the file menu to stop additional files from accessing the library.

Files that have already imported library components keep those components and retain access to previously published versions. You can republish the library at any time.
