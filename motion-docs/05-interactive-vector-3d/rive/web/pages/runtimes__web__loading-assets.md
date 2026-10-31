---
source: https://rive.app/docs/runtimes/web/loading-assets
title: "Loading Assets"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Loading Assets

Loading and replacing assets dynamically at runtime

> [!NOTE]
>
> If you want to dynamically replace images, use [image data binding](data-binding#images).

Some Rive files may contain assets that can be embedded within the actual file binary, such as font, image, or audio files. The Rive runtimes may then load these assets when the Rive file is loaded. While this makes for easy usage of the Rive files/runtimes, there may be opportunities to load these assets in or even replace them at runtime instead of embedding them in the file binary.

There are several benefits to this approach:

* Keep the `.riv` files tiny without potential bloat of larger assets
* Dynamically load an asset for any reason, such as loading an image with a smaller resolution if the `.riv` is running on a mobile device vs. an image of a larger resolution for desktop devices
* Preload assets to have available immediately when displaying your `.riv`
* Use assets already bundled with your application, such as font files
* Sharing the same asset between multiple `.riv`s

## Methods for loading assets

There are currently three different ways to load assets for your Rive files.

In the Rive editor select the desired asset from the **Assets** tab, and in the inspector choose the desired export option:

![Image](https://mintcdn.com/rive/QEBBdwwFJOiq_hKR/images/runtimes/df455228-a712-4cff-a24d-0771b8575e9d.webp?fit=max\&auto=format\&n=QEBBdwwFJOiq_hKR\&q=85\&s=17d75cc3b69fa1383db5549aef21101d)

### Embedded assets

In the Rive editor, static assets can be included in the `.riv` file, by choosing the *"Embedded"* export type. As stated in the beginning of this page, when the Rive file gets loaded, the runtime will implicitly attempt to load in the assets embedded in the `.riv` as well, and you don't need to concern yourself with loading any assets manually.

**Caveat:** Embedded assets may bulk up the file size, especially when it comes to fonts when using Rive Text ([Text Overview](/docs/editor/text/text-overview)).

> [!NOTE]
>
> **Embedded is the default option.**

### Loading via Rive's CDN

In the Rive editor, you can mark an imported asset as a *"Hosted"* export type, which means that when you export the `.riv` file, the asset will not be embedded in the file binary, but will be hosted on Rive's CDN. This means that at runtime when loading in the file, the runtime will see the asset is marked as "Hosted" and load the asset in from the Rive CDN, so that you don't need to concern yourself with loading anything yourself, and the file can still remain tiny.

**Caveat:** The app will make an extra call to a Rive CDN to retrieve your asset

> [!NOTE]
>
> Hosted assets are available on Voyager and Enterprise plans. [Learn more about
> our plans and pricing](https://rive.app/pricing?utm_source=docs\&utm_medium=content).

### Image CDNs

Some image CDNs allow for on-the-fly image transformations, including resizing, cropping, and automatic format conversion based on the browser's and device's capabilities. These CDNs can host your Rive image assets. Note that for these CDNs, you may need to specify the accepted formats, for example, as part of the HTTP header request:

```html theme={null}
... headers: { Accept: 'image/png,image/webp,image/jpeg,*/*', } ...
```

Please see your CDN provider's documentation for additional information.

> [!WARNING]
>
> Rive supports the following image formats: **jpeg**, **png**, and **webp**

### Referenced assets

In the Rive editor, you can mark an imported asset as a *"Referenced"* export type, which means that when you export the `.riv` file, the asset will not be embedded in the file binary, and the responsibility of loading the asset will be handled by your application at runtime.

This option enables you to dynamically load in assets via a handler API when the runtime begins loading in the `.riv` file. This option is preferable if you have a need to dynamically load in a specific asset based on any kind of app/game logic, and especially if you want to keep the .riv file size small.

All referenced assets, including the `.riv`, will be bundled as a zip file when you export your animation.

**Caveat:** You will need to provide an asset handler API when loading in Rive which should do the work of loading in an asset yourself. See [Handling Assets](#handling-assets).

> [!NOTE]
>
> SVG assets can't currently be loaded at runtime as referenced assets.
>
> This is because SVGs are converted to Rive vector objects, which are always embedded into the .riv.

## Handling assets

### Examples

* [Specify a font asset to load](https://codesandbox.io/p/devbox/rive-out-of-band-fonts-js-forked-kml2wd?file=%2Fsrc%2Findex.ts)
* [Specify an image asset to load](https://codesandbox.io/p/sandbox/rive-out-of-band-images-js-forked-23jx8m?file=%2Fsrc%2Findex.ts)

### Using the Asset Handler API

When instantiating a new Rive instance, add an `assetLoader` callback property to the list of parameters. This callback will be called for every asset the runtime detects from the `.riv` file on load, and will be responsible for either handling the load of an asset at runtime or passing on the responsibility and giving the runtime a chance to load it otherwise.

An instance where you may want to handle loading an asset is if an asset in the file is marked as **Referenced**, and you need to provide an actual asset to render for the graphic, as Rive does not embed it in the `.riv` and thus cannot load it.

An instance where you may want to give the runtime a chance to load the asset is if the asset in the file is marked as **Hosted**, and want to pass the responsibility of loading it to the runtime (which will call into a Rive CDN to do so).

```javascript theme={null}
assetLoader: (asset: rc.FileAsset, bytes: Uint8Array) => boolean;
```

Your provided callback will be passed an `asset` and `bytes`.

* `asset` - Reference to a `FileAsset` object from WASM. You can grab a number of properties from this object, such as the name, asset type, and more. You'll also use this to set a new Rive-specific asset for the dynamically loaded in asset you want to set (i.e. `RenderImage` for an image, `Font` for a font, or `Audio` for audio).
* `bytes` - Array of bytes for the asset (if possible, such as if it's an embedded asset)

**Important**: Note that the return value is a `boolean`, which is where you need to return `true` if you intend on handling and loading in an asset yourself, or `false` if you do not want to handle asset loading for that given asset yourself, and attempt to have the runtime try to load the asset.

When decoding an asset be sure to call `unref` once it is no longer needed - to avoid memory leaks. This allows the engine to clean it up when it is not used by any more animations.\
Example Usage

```javascript theme={null}
import {
    Rive,
    Fit,
    Alignment,
    Layout,
    decodeFont,
    ImageAsset, // Optionally include for type checking
    FontAsset, // Optionally include for type checking
    FileAsset, // Optionally include for type checking
} from "@rive-app/canvas";

// Load a random asset by using a decodeFont API to feed to a
// setFont API on the asset provided in assetLoader
const randomFontAsset = (asset) => {
const urls = [
    "https://cdn.rive.app/runtime/flutter/IndieFlower-Regular.ttf",
    "https://cdn.rive.app/runtime/flutter/comic-neue.ttf",
    "https://cdn.rive.app/runtime/flutter/inter.ttf",
    "https://cdn.rive.app/runtime/flutter/inter-tight.ttf",
    "https://cdn.rive.app/runtime/flutter/josefin-sans.ttf",
    "https://cdn.rive.app/runtime/flutter/send-flowers.ttf",
];
let randomIndex = Math.floor(Math.random() * urls.length);
fetch(urls[randomIndex]).then(
    async (res) => {
    // decodeFont creates a Rive-specific Font object that `setFont()` takes
    // on the asset from assetLoader
    const font = await decodeFont(new Uint8Array(await res.arrayBuffer()));
    asset.setFont(font);

    // Be sure to call unref on the font once it is no longer needed. This
    // allows the engine to clean it up when it is not used by any more animations.
    font.unref();
    }
);
};


const riveInstance = new Rive({
src: "acqua_text.riv",
stateMachine: "State Machine 1", // Name of the State Machine to play
canvas: document.getElementById("rive-canvas"),
layout: new Layout({
    fit: Fit.Cover,
    alignment: Alignment.Center,
}),
autoplay: true,
// Callback handler to pass in that dictates what to do with an asset found in
// the Rive file that's being loaded in
assetLoader: (asset, bytes) => {
    console.log("Asset properties to query", {
        name: asset.name,
        fileExtension: asset.fileExtension,
        cdnUuid: asset.cdnUuid,
        isFont: asset.isFont,
        isImage: asset.isImage,
        isAudio: asset.isAudio,
        bytes,
    });

    // If the asset has a `cdnUuid`, return false to let the runtime handle
    // loading it in from a CDN. Or if there are bytes found for the asset
    // (aka, it was embedded), return false as there's no work needed here
    if (asset.cdnUuid.length > 0 || bytes.length > 0) {
        return false;
    }

    // Here, we load a font asset with a random font on load of the Rive file
    // and return true, because this callback handler is responsible for loading
    // the asset, as opposed to the runtime
    if (asset.isFont) {
        randomFontAsset(asset);
        return true;
    }
},
onLoad: () => {
    // Prevent a blurry canvas by using the device pixel ratio
    riveInstance.resizeDrawingSurfaceToCanvas();
}
});
```

## Additional resources

[YouTube video player](https://www.youtube.com/embed/BrWBmZwouQQ)
