---
source: https://rive.app/docs/game-runtimes/unity/loading-assets
title: "Loading Assets"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Loading Assets

Out-of-band assets in Rive Unity.

> [!NOTE]
>
> Only **embedded** and **referenced** assets are supported in Rive Unity; **hosted** assets are not currently supported.

> [!NOTE]
>
> Only **png** and **jpeg** image assets are supported. Support for **webp** is in progress.

## Asset export options

Within the Rive Editor, you can select an asset (for example, an image or font) in the **Asset Panel** and configure the export option for that asset. A Rive file can have a mixture of **embedded**, **referenced**, and **hosted** assets.

![Image](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/game-runtimes/unity/a108fa8e-df31-43fb-aabc-5e74afbda52d.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=611ee6a1cfb045e41322d77626bf7094)

**Embedded** assets are included with the exported `.riv` binary file, while **referenced** assets are packaged separately and must be linked at runtime. Using **referenced** assets enables you to reuse the same asset across multiple animation files or in other parts of your game. This reduces the size of your `.riv` file and the resources needed to run your animations that use a shared asset.

### Embedded assets

Any asset marked as embedded will automatically be loaded, and you do not need to do anything to configure the asset.

![Image](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/game-runtimes/unity/56437853-0d8b-4e62-87ec-3205da02ea52.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=30f067cfb0c182a4074f02c94ca47a98)

By selecting the riv file you'll get information on the file's assets in the **Unity Inspector**. The example image above shows an embedded font called "Roboto Flex" with a size of 1MB.

### Referenced assets

Referenced assets need to be linked at runtime. The rive-unity package automatically handles the linking by attempting to find assets within the same directory that match the correct **Name** + **ID** combination. If an asset that matches the criteria is discovered, that asset is automatically converted to a Rive asset and linked.

> [!NOTE]
>
> For an asset to be discoverable and linked, the riv file and asset must be in the same Unity directory.

#### Let's take a look at an example

When exporting your runtime file from the Rive Editor, the `.riv` file and referenced assets are exported in a zip.

![Image](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/game-runtimes/unity/212a16d7-6686-4722-9d9a-f32a49e4cbd2.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=37583cc4ff8347a170c12ac999096993)

The extracted zip has an `acqua_text.riv` file with a referenced asset named `Roboto Flex-887377.ttf`. The referenced asset file name breaks down as such:

* **Name:** Roboto Flex
* **ID:** 887377

Selecting both files (or the entire folder) and dragging them into the **Unity Assets** folder will automatically link the embedded font file - if the **Name** + **ID** matches what the `.riv` file expects.

![Image](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/game-runtimes/unity/0bb5c521-b8dc-4ac7-9cd1-6fdffb121750.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=60af02652771f083b2b51d63f296ad2c)

In the **Unity Inspector** for the Rive file, you can note that the **Asset** for the "Roboto Flex" font has been linked, and the **Roboto Flex** font file has also been converted to a Rive asset.

This example automatically converted and linked the font file because the animation and font files were added simultaneously. Alternatively, you can add the asset file first and then the riv file.; this will result in the same outcome.

If an asset was added after the riv file, you'll need to manually reimport the riv file by **right-clicking** it and selecting **Reimport**.

![Image](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/game-runtimes/unity/04ba8d2c-80cc-41ef-9cdd-f940d6897fbc.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=02c934842747cf11e30b4b55e5c3d210)

#### Selecting an importer

Alternatively, you can set the desired Importer for an asset by selecting the correct option in the Inspector. This means you can make an asset a Rive Asset or change back an incorrectly converted asset.

![Image](https://mintcdn.com/rive/jt_8wq1dQvWjG78a/images/game-runtimes/unity/d65592e9-22a4-433f-b4f3-4ca8e72577aa.webp?fit=max\&auto=format\&n=jt_8wq1dQvWjG78a\&q=85\&s=f6cd29a978affc2d35a15a02a9083d4d)

#### Sharing assets

Reusing the same asset in your Rive files should result in a consistent **Name** + **ID** generation when exporting from the Rive Editor.

If a matching asset is not found when importing in Unity, there is a fallback to converting and linking a file that matches only the **Name**. You can optionally use this approach to have more control over asset importing, as an asset filename can be renamed in the Rive Editor.

![Image](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/game-runtimes/unity/a7618b96-a123-4bb9-b604-57ec2c3adc1d.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=0bdc756f52d5736d96012b9c213d563b)
