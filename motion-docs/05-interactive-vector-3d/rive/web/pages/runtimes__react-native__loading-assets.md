---
source: https://rive.app/docs/runtimes/react-native/loading-assets
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

**New Runtime (Recommended)**

### Using the Asset Handler API

To load out-of-band assets, provide a key-value object that maps expected assets to their sources when loading the Rive file.

The **key** is the name + unique identifier combination, as exported from the Rive editor. Each value has a `source` (a `require()` or `{ uri }`) and a `type` (`'image'`, `'font'`, or `'audio'`).

```javascript theme={null}
const { riveFile, isLoading, error } = useRiveFile(
    require('path/to/file.riv'),
    {
        referencedAssets: {
            'Inter-594377': {
                source: require('../../assets/fonts/Inter-594377.ttf'),
                type: 'font',
            },
            'referenced-image-2929282': {
                source: { uri: 'https://picsum.photos/id/372/500/500' },
                type: 'image',
            },
            'referenced_audio-2929340': {
                source: require('../../assets/audio/referenced_audio-2929340.wav'),
                type: 'audio',
            },
        },
    }
);
```

> [!NOTE]
>
> Set `type` on every asset. In `0.5.0` and later, the runtime can't detect the asset type when loading, so if `type` is missing it logs a warning and infers the type from the file extension or contents.

> [!WARNING]
>
> In `0.5.0` and later:
>
> * Assets set to load from the Rive CDN aren't fetched automatically. Supply them through `referencedAssets`.
> * Assets are resolved once, when the file loads. Changing `referencedAssets` afterwards has no effect; to use different assets, load the file again. To swap an image while the graphic is running, use an [image property](/docs/runtimes/react-native/data-binding#images) in data binding instead.

> [!NOTE]
>
> You can optionally exclude the unique identifier. For example, instead of `Inter-594377`, you can use `Inter`. However, it is recommended to use the full identifier to avoid potential conflicts. Using just the asset name allows you to avoid knowing the unique identifier and gives you more control over naming.

### Using Suspense

You can manage the asset decoding yourself, and share this resource across multiple Rive views.

> [!NOTE]
>
> We currently only support images, but work is underway for the other asset types.

```ts theme={null}
function getImagePromise(url: string): Promise<RiveImage> {
    return RiveImages.loadFromURLAsync(url);
}
```

```ts theme={null}
<ErrorBoundary key={errorBoundaryKey} fallback={renderErrorFallback}>
    <React.Suspense
        fallback={
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Loading image...</Text>
        </View>
        }
    >
        <RiveContent imageUrl={uri} />
    </React.Suspense>
</ErrorBoundary>

```

```ts theme={null}
function RiveContent({ imageUrl }: { imageUrl: string }) {
    const imagePromise = React.useMemo(
        () => getImagePromise(imageUrl),
        [imageUrl]
    );
    const riveImage = React.use(imagePromise);

    const { riveFile, isLoading, error } = useRiveFile(
        require('../../assets/rive/out_of_band.riv'),
        {
            referencedAssets: {
                'Inter-594377': {
                source: require('../../assets/fonts/Inter-594377.ttf'),
                type: 'font',
                },
                'referenced-image-2929282': riveImage,
                'referenced_audio-2929340': {
                source: require('../../assets/audio/referenced_audio-2929340.wav'),
                type: 'audio',
                },
            },
        }
    );

    if (isLoading) {
        return <ActivityIndicator />;
    } else if (error != null) {
        return (
            <View style={styles.safeAreaViewContainer}>
                <Text>Error loading Rive file: {error?.message}</Text>
            </View>
        );
    }

    return (
        <RiveView
            file={riveFile}
            fit={Fit.Contain}
            style={styles.rive}
            stateMachineName="State Machine 1"
            artboardName="Artboard"
        />
    );
}
```

See [this example](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/exercisers/OutOfBandAssetsWithSuspense.tsx) for more information.

**Legacy Runtime**

### Examples

* [Out of bands example](https://github.com/rive-app/rive-react-native/blob/main/example/app/\(examples\)/OutOfBandAssets.tsx)

### Using the Referenced Assets API

> [!NOTE]
>
> React Native has a different API for handling out-of-band assets compared to our other runtimes.

The `referencedAssets` prop accepts a key-value object. The `key` is the unique identifier of the asset (as exported in the Editor), which combines the asset name and its unique identifier. The `value` specifies how to load the asset:

* A source loaded directly from JavaScript.
* A URI pointing to an asset downloaded from the web.
* A bundled asset on the native platform (iOS and Android), included through Xcode and Android Studio, respectively.

> [!NOTE]
>
> You can optionally exclude the unique identifier. For example, instead of `Inter-594377`, you can use `Inter`. However, it is recommended to use the full identifier to avoid potential conflicts. Using just the asset name allows you to avoid knowing the unique identifier and gives you more control over naming.

The following code sample illustrates the three different ways an asset can be loaded:

```javascript theme={null}
<Rive
    autoplay={true}
    stateMachineName="State Machine 1"
    referencedAssets={{
        'Inter-594377': {
            source: require('./assets/Inter-594377.ttf'), // loaded directly from JavaScript
        },
        'referenced-image-2929282': {
            source: {
                uri: 'https://picsum.photos/id/270/500/500' // Loaded from a URI
            },
        },
        'referenced_audio-2929340': {
            source: {
                fileName: 'referenced_audio-2929340.wav', // Loaded from a bundled asset
                path: 'audio', // only needed for Android assets
            },
        },
    }}
    artboardName="Artboard"
    resourceName={'out_of_band'}
    onError={(riveError: RNRiveError) => {
        console.log(riveError);
    }}
/>
```

## Additional resources

[YouTube video player](https://www.youtube.com/embed/BrWBmZwouQQ)
