---
source: https://modelviewer.dev/docs/ (rendered from repo packages/modelviewer.dev/data/docs.json + faq.json)
title: "<model-viewer> docs (all sections) + FAQ"
fetched: 2026-10-28
---

# <model-viewer> documentation (from docs.json)

## Loading  (`loading`)

### Attributes

- **src** — default: `empty string`; options: any legal URL: The URL to the 3D model. Only glTF (https://github.com/KhronosGroup/glTF/tree/master/specification/2.0)/GLB (https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#glb-file-format-specification) models are supported.
- **alt** — default: `empty string`; options: any description: Configures the model with custom text that will be used to describe the model to viewers who use a screen reader or otherwise depend on additional semantic context to understand what they are viewing.
- **poster** — default: `empty string`; options: any legal URL: Displays an image instead of the model, useful for showing the user something before a model is loaded and ready to render.
- **loading** — default: `auto`; options: auto, lazy, eager: An enumerable attribute describing under what conditions the model should be preloaded. The supported values are "auto", "lazy" and "eager". Auto is equivalent to lazy, which loads the model when it is near the viewport for reveal="auto", and when dismissPoster() is called for reveal="manual". Eager loads the model immediately.
- **reveal** — default: `auto`; options: auto, manual: This attribute controls when the model should be revealed. If reveal is set to "auto", the model will be revealed as soon as it is done loading and rendering. If reveal is set to "manual", the model will remain hidden until dismissPoster() is called.
- **with-credentials** — default: `false`; options: true, false: This attribute makes the browser include credentials (cookies, authorization headers or TLS client certificates) in the request to fetch the 3D model. It's useful if the 3D model file is stored on another server that require authentication. By default the file will be fetch without credentials. Note that this has no effect if you are loading files locally or from the same domain.
- **a11y** — default: `null`; options: {"front": "Front of 3D model","back": "Back of 3D model","left": "Left of 3D model","right": "Right of 3D model","upper-front": "Upper front of 3D model","upper-back": "Upper back of 3D model","upper-left": "Upper left of 3D model","upper-right": "Upper right of 3D model","lower-front": "Lower front of 3D model","lower-back": "Lower back of 3D model","lower-left": "Lower left of 3D model","lower-right": "Lower right of 3D model","interaction-prompt": "'Use mouse, touch or arrow keys to move"}: Add unique translations for the model wcag compliance. Use this attribute, you must provide a JSON object with the following keys: front, back, left, right, upper-front, upper-back, upper-left, upper-right, lower-front, lower-back, lower-left, lower-right, interaction-prompt. The values of these keys should be the translations for the model's orientation. This attribute is useful for screen readers and other assistive technologies.

### Properties

- **loaded** — default: `N/A`; options: true, false: This property is read-only. It returns true if the load event below has fired since the last src change.
- **modelIsVisible** — default: `N/A`; options: true, false: This property, pronounced model-is-visible, is read-only. It returns true if the element is visible on the page (assuming there is an IntersectionObserver) and the poster has been dismissed. This property is related to the model-visibility event.

### Static Properties

- **dracoDecoderLocation**: This static, writable property sets <model-viewer>'s DRACO decoder location URL. By default, the DRACO decoder will be loaded from a Google CDN.
- **ktx2TranscoderLocation**: This static, writable property sets <model-viewer>'s KTX2 transcoder location URL. By default, the KTX2 transcoder will be loaded from a Google CDN.
- **meshoptDecoderLocation**: This static, writable property sets <model-viewer>'s Meshopt decoder location URL. By default, the Meshopt decoder is not enabled.
- **lottieLoaderLocation**: This static, writable property sets <model-viewer>'s LottieLoader location URL. The default URL is `https://cdn.jsdelivr.net/npm/three@{{THREEJS_VERSION}}/examples/jsm/loaders/LottieLoader.js`. It will also require the server to provide the lottie canvas module at `../libs/lottie_canvas.module.js`.
- **minimumRenderScale** — default: `0.5`; options: number between 0.25 and 1: This static, writable property sets <model-viewer>'s minimum rendering scale factor as it dynamically changes resolution to maintain framerate. Monitor its behavior with the render-scale (./#entrydocs-loading-events-renderScale) event. Turn off this effect by setting to 1.
- **modelCacheSize** — default: `5`; options: any integer >= 0: This static, writable property sets <model-viewer>'s internal glTF model cache size, controlling number of individual models that should be cached. Note that any number of models may be cached at a given time. This number sets the maximum number of models that can be cached even if they are not being used by a <model-viewer> element in the document. Note also that the cache size is measured in number of glTF models, not bytes! This is important to keep in mind, since any two models may have wildly different byte sizes.
- **powerPreference** — default: `high-performance`; options: high-performance, low-power, default: This static, writable property sets <model-viewer>'s power preference value. Model-viewer sets this property to high-performance if no value is provided.

### Methods

- **dismissPoster()**: Dismisses the poster, causing the model to load and render if necessary. This is currently effectively the same as interacting with the poster via user input.
- **showPoster()**: Shows the poster, hiding the model. If this is called after the 3D model has been revealed, then it must be dismissed by a call to dismissPoster().
- **getDimensions()**: Returns the model's bounding box dimensions in meters, independent of turntable rotation. The returned object has x, y, and z properties along with a toString() method.
- **getBoundingBoxCenter()**: Returns the center point of the model's bounding box in meters, independent of turntable rotation. The returned object has x, y, and z properties along with a toString() method.
- **toBlob(options: {mimeType, qualityArgument, idealAspect})**: Returns a promise that resolves into a Blob object in the format specified by the mimeType (defaults to image/png). A Blob object represents a file-like object of immutable, raw data. You can also specify a value between 0 and 1 for qualityArgument (Currently only available on Chrome desktop and Firefox) which defaults to 0.92 and 0.8 for image/png and image/webp respectively. By setting idealAspect to true, the blob will be captured at the ideal poster aspect ratio instead of the canvas aspect ratio. This allows for easy poster creation, where a single poster will match the render seamlessly at any canvas aspect ratio.
- **toDataURL(type, encoderOptions)**: Returns a screenshot of the current model render in the format specified by type (defaults to image/png). The screenshot is encoded as a data URL string. In formats that support a sliding scale of quality (such as image/jpeg and image/webp) you can also specify a value for encoderOptions between 0 and 1 (encoderOptions defaults to 0.92 otherwise).
- **registerEffectComposer(effectComposer)**: This method allows you to replace the default rendering with an EffectComposer (https://github.com/pmndrs/postprocessing) renderer stack for this element. Unlike `externalRenderer`, all glTF and rendering-related portions of our API continue to function normally.The EffectComposer you provide must implement our `EffectComposerInterface`, which consists of the following functions: - `render(deltaTime?: number): void`- `setRenderer(renderer: WebGLRenderer): void`- `setMainScene(scene: Scene): void`- `setMainCamera(camera: Camera): void`- `setSize(width: number, height: number): void`Registering your EffectComposer using this method calls `setRenderer`, `setMainScene`, and `setMainCamera`. We will call your `render` method as we would the regular render method, with deltaTime in milliseconds. We will call your `setSize` method when the element is resized so your effects are always properly sized.
- **unregisterEffectComposer()**: Switches back to default rendering and stops calling the EffectComposer.
- **registerRenderer(externalRenderer)**: This method allows you to replace our entire rendering stack with your own for this element. The glTF-related portions of our API cease to function: ar, lighting, staging, animation, scene-graph. However, loading, camera, and annotations continue to function normally. Note that you are now in charge of your own data, so you can load any type of file you choose, or even generate a scene from script.The externalRenderer you provide must implement our `RendererInterface`, which consists of three functions: - `load(progressCallback: (progress: number) => void): Promise<FramingInfo>`- `render(camera: Camera): void`- `resize(width: number, height: number): void` The element will call your `load` method when it would normally load a glTF, lazily by default. Make sure to set the `src` to something (any string will do) to indicate this is not an empty element. Make sure to call our `progressCallback` occasionally, which will update our progress bar, and ensure you set a progress value of 1.0 when your pixels are ready to be shown. You must return us a `FramingInfo` object containing two numbers: `framedRadius` and `fieldOfViewAspect` to allow our camera to set its defaults. The `framedRadius` is the size of the bounding sphere and `fieldOfViewAspect` is the ideal element aspect ratio to frame the model (1.0 is a good default). We will call your `render` method when the camera changes and pass you the `Camera` object containing `viewMatrix: Array<number>` and `projectionMatrix: Array<number>` as 4x4 matrices. Use this to update the rendered pixels in your canvas slot element (./#entrydocs-loading-slots-canvas). We will call your `resize` method when the element is resized so you can take coordinated action on your slotted canvas element.
- **unregisterRenderer()**: Switches back to default rendering of a glTF/GLB src and stops calling any external renderer. Note you must manually remove your own slotted canvas element concurrently.

### Static Methods

- **mapURLs(callback)**: If provided, the callback will be passed each resource URL before a request is sent. The callback may return the original URL, or a new URL to override loading behavior. This behavior can be used to load assets from .ZIP files, drag-and-drop APIs, and Data URIs.

### Events

- **error**: This event can be triggered for two reasons: a model has failed to load or parse, or the WebGL context was lost. If the model failed to load, event.detail.type will be 'loadfailure'. If the WebGL context was lost, event.detail.type will be 'webglcontextlost'. In both cases, recovery countermeasures are left as an exercise for the user. The element will not make automatic attempts to re-load a model that has failed to load. Nor will the element attempt to restore the GL context after it has been lost. Error events also hold a reference to the originating error event (when there is one) as event.detail.sourceEvent.
- **before-render**: Fired when a model is loaded, before the first render frame. Can fire multiple times per <model-viewer> if the src attribute is changed.
- **load**: Fired when a model is loaded, after the first render frame. Can fire multiple times per <model-viewer> if the src attribute is changed.
- **poster-dismissed**: Fires when the poster has fully transitioned away. Additional delay from the "load" event can be caused by the renderer compiling its shaders.
- **model-visibility**: This event is fired when the visibility of the model changes. When the model is loaded, the element is in the viewport (assuming there is an IntersectionObserver), this event will fire and event.detail.visible will be "true".
- **progress**: This event fires while a model, environment, skybox, variant, and/or a usdz conversion is loading, during both download and processing. The progress of all of these concurrent tasks will be given by a value between 0 and 1: event.detail.totalProgress. It also provides the reason why the event is fired ('model-load', 'environment-update', 'variant-update', 'usdz-conversion'): event.detail.reason.
- **render-scale**: This event fires when the element is attached to the DOM and whenever the rendered DPR (device pixel ratio) changes, which is generally due to our renderer scaling its resolution to maintain frame rate. The event.detail contains the reportedDpr (window.devicePixelRatio), our renderedDpr (<= reportedDpr), minimumDpr (based on minimumRenderScale (./#entrydocs-loading-staticProperties-minimumRenderScale)), reason ('GPU throttling' or 'No meta viewport tag'), and pixelWidth/pixelHeight (rendered resolution of the element). Everything except the size is identical for all elements on the page since the renderer is shared.

### Parts

- **default-progress-bar**: Scope your CSS to `model-viewer::part(default-progress-bar)` to change the styling of our default progress bar without replacing it wholesale with a slot. Most common would be probably changing the background-color, height, width, and margins (avoid the transform property as that is how the progress is updated).

### Slots

- **poster**: By placing a child element under <model-viewer> with slot="poster", this element will replace the default poster, which is white. This poster is shown until the model is loaded and revealed.
- **progress-bar**: By placing a child element under <model-viewer> with slot="progress-bar", this element will replace the default progress bar, which is a thin bar at the top of the element. Use the progress event to update its style.
- **canvas**: By placing a child element under <model-viewer> with slot="canvas", this element will replace the default rendering canvas. This slot is intended only for use with an external renderer, provided with registerRenderer (./#entrydocs-loading-methods-registerRenderer). This can be any kind of element your renderer draws to, like a WebGL canvas, 2D canvas, or even a streaming video.

## Augmented Reality  (`augmentedreality`)

### Attributes

- **ar**: Enable the ability to launch AR experiences on supported devices.
- **ar-modes** — default: `webxr scene-viewer quick-look`; options: prioritized list possible AR modes: webxr, scene-viewer, and quick-look: A prioritized list of the types of AR experiences to enable. Allowed values are "webxr", to launch the AR experience in the browser, "scene-viewer", to launch the Scene Viewer (https://developers.google.com/ar/develop/java/scene-viewer) app, "quick-look", to launch the iOS Quick Look app. You can specify any number of modes separated by whitespace. Including quick-look here without an ios-src (our default) will generate a USDZ on the fly rather than downloading a separate ios-src file.
- **ar-scale** — default: `auto`; options: auto, fixed: Controls the scaling behavior in AR mode. Set to "fixed" to disable scaling of the model, which sets it to always be at 100% scale. Defaults to "auto" which allows the model to be resized by pinch.
- **ar-placement** — default: `floor`; options: floor, wall: Selects whether to place the object on the floor (horizontal surface) or a wall (vertical surface) in AR. The back (negative Z) of the object's bounding box will be placed against the wall and the shadow will be put on this surface as well. Note that the different AR modes handle the placement UX differently.
- **ios-src**: The url to a USDZ (https://graphics.pixar.com/usd/docs/Usdz-File-Format-Specification.html) model which will be used on supported iOS 12+ devices (https://www.apple.com/ios/augmented-reality/) via AR Quick Look (https://developer.apple.com/videos/play/wwdc2018/603/) on Safari. The presence of this attribute will automatically enable the quick-look ar-mode, however it is no longer necessary. If instead the quick-look ar-mode is specified and ios-src is not specified (the default), then we will generate a USDZ on the fly when the AR button is pressed. This means modifications via the scene-graph API will now be reflected in Quick Look. However, USDZ generation is not perfect, for instance animations are not yet supported, so in some cases supplying ios-src may give better results.
- **ar-usdz-max-texture-size** — default: `auto (no limits for maximum texture resolution)`; options: Number greater than or equal to 16: Set texture max resolution for Quick Look auto generated USDZ model.
- **xr-environment**: Enables AR lighting estimation in WebXR mode; this has a performance cost and replaces the lighting selected with `environment-image` during an AR session. Known issues: sometimes too dark, sudden updates, shiny materials look matte.

### CSS

- **ar-status** — default: `N/A`; options: not-presenting, session-started, object-placed, failed: This read-only attribute enables DOM content to be styled based on the status of the WebXR AR presentation. For instance, a prompt for the user to move their phone until the object is successfully placed in their space can be shown by scoping a CSS rule to model-viewer[ar-status="session-started"]. Setting this attribute has no effect.
- **ar-tracking** — default: `N/A`; options: tracking, not-tracking: This read-only attribute enables DOM content to be styled based on the state of the WebXR AR tracking. For instance, a failure message can be shown by scoping a CSS rule to model-viewer[ar-tracking="not-tracking"]. Setting this attribute has no effect. Most AR tracking failures are due to the camera being covered or seeing little discernable texture

### Properties

- **canActivateAR**: This property returns true if the current platform supports AR, otherwise false is returned.

### Methods

- **activateAR()**: Activates AR. Note that this method most likely has to be called synchronous from a user interaction handler or it will most likely be ignored.

### Events

- **ar-status**: Fired when the ar-status attribute above changes. The event.detail.status property will be set to the same value as the ar-status attribute, either 'not-presenting', 'session-started', 'object-placed', or 'failed'. This event is only enabled for WebXR AR sessions, with the exception of 'failed', which will be fired any time AR was initiated but failed to start all of the given modes.
- **ar-tracking**: Fired when the ar-tracking attribute above changes. The event.detail.status property will be set to the same value as the ar-tracking attribute, either 'tracking', or 'not-tracking'. This event is only enabled for WebXR AR sessions.
- **quick-look-button-tapped**: If the user has entered a quick-look AR session on iOS, this event is fired when the action button is tapped. An action button can be defined using URL parameters on the ios-src, see Apple's documentation.

### Parts

- **default-ar-button**: Scope your CSS to `model-viewer::part(default-ar-button)` to change the styling of our default Enter AR button without replacing it wholesale with a slot. Most common would be probably changing the position or size using transform and margins.
- **default-exit-webxr-ar-button**: Scope your CSS to `model-viewer::part(default-exit-webxr-ar-button)` to change the styling of our default Exit AR button for WebXR mode without replacing it wholesale with a slot. Most common would be probably changing the position or size using transform and margins.

### Slots

- **ar-button**: By placing a child element under <model-viewer> with slot="ar-button", this element will replace the default "Enter AR" button, which is a <model-viewer> icon in the lower right. This button will be visible if AR is potentially available (we will have some false positives until the user tries).
- **exit-webxr-ar-button**: By placing a child element under <model-viewer> with slot="exit-webxr-ar-button", this element will replace the default exit button in WebXR mode only, which is an "X" icon in the upper left.

## Staging & Cameras  (`stagingandcameras`)

### Attributes

- **camera-controls**: Enables controls via mouse/touch. This attribute should nearly always be specified, unless all model motion is being controlled by JavaScript functions.
- **disable-pan**: Disables panning interactions, which are enabled by default using two-finger touch, or dragging with right-click or modifier keys.
- **disable-tap**: Disables tap-to-recenter behavior (both center-the-tapped-point and reset-view-when-tapping-outside). This attribute has no effect in combination with 'disable-pan', as the tap-to-recenter behavior is part of the panning interactions. It is recommended to create custom re-centering behavior when using 'disable-tap' as after panning and rotating, it is effectively impossible for the user to exactly return to their starting view.
- **touch-action** — default: `pan-y`; options: pan-y, pan-x, none: Akin to the CSS touch-action property (which does not work due to some iOS bugs), the default 'pan-y' allows touch users to vertically scroll the <model-viewer> element, but can interact if their gesture starts horizontal. Legacy behavior can be achieved with 'none', where all scrolling is prevented, while 'pan-x' is the opposite of 'pan-y'. The normal CSS default 'auto' is not allowed here, as this can be achieved by not including the camera-controls attribute.
- **disable-zoom**: Disables user zoom when camera-controls is enabled (has no effect otherwise). Has the secondary effect of not swallowing mouse wheel events and pinch gestures, so these will then scroll and zoom the page, respectively.
- **orbit-sensitivity** — default: `1`; options: any number: Adjusts the speed of theta and phi orbit interactions. Can also be set negative to reverse, which is helpful when using zero radius to look around the inside of a cave-like model.
- **zoom-sensitivity** — default: `1`; options: any number: Adjusts the speed of zoom interactions.
- **pan-sensitivity** — default: `1`; options: any number: Adjusts the speed of pan interactions.
- **auto-rotate**: Enables the auto-rotation of the model.
- **auto-rotate-delay** — default: `3000`; options: number >= 0: Sets the delay before auto-rotation begins. The format of the value is a number in milliseconds.
- **rotation-per-second** — default: `pi/32 radians`; options: angle with units: Sets the speed of auto-rotate, when enabled. Accepts values with units in degrees or radians (e.g., "30deg" or "0.5rad"), as well as percent (e.g. "-100%") of the default value of pi/32 radians.
- **interaction-prompt** — default: `auto`; options: auto, none: Allows you to disable the visual and audible interaction prompt. If set to "auto", the interaction prompt will be displayed as soon as the interaction-prompt-threshold (see below) time has elapsed (after the model is revealed). The interaction prompt will only display if camera-controls are enabled.
- **interaction-prompt-style** — default: `wiggle`; options: wiggle, basic: Configures the presentation style of the interaction-prompt when it is raised. When set to "wiggle", the prompt will animate horizontally and the model will rotate as though the prompt is interacting with it. When set to "basic", the prompt is not animated, and instead simply appears until it is dismissed by user interaction.
- **interaction-prompt-threshold** — default: `3000`; options: number >= 0: When camera-controls are enabled, <model-viewer> will prompt the user visually (and audibly, for screen readers) to interact if they focus it but don't interact with it for some time. This attribute allows you to set how long <model-viewer> should wait (in milliseconds) before prompting to interact. Defaults to 3000.
- **camera-orbit** — default: `0deg 75deg 105%`; options: $theta $phi $radius: Set the starting and/or subsequent orbital position of the camera. You can control the azimuthal, theta, and polar, phi, angles (phi is measured down from the top), and the radius from the center of the model. Accepts values of the form "$theta $phi $radius", like "10deg 75deg 1.5m". Also supports units in radians ("rad") for angles and centimeters ("cm") or millimeters ("mm") for camera distance. Camera distance can also be set as a percentage ('%'), where 100% gives the model tight framing within any window based on all possible theta and phi values. Any time this value changes from its initially configured value, the camera will interpolate from its current position to the new value. Any value set to 'auto' will revert to the default. For camera-orbit, camera-target and field-of-view, parts of the property value can be configured with CSS-like functions. The CSS calc() function is supported for these values, as well as a specialized form of the env() function. You can use env(window-scroll-y) anywhere in the expression to get a number from 0-1 that corresponds to the current top-level scroll position of the current frame. For example, a value like "calc(30deg - env(window-scroll-y) * 60deg) 75deg 1.5m" cause the camera to orbit horizontally around the model as the user scrolls down the page.
- **camera-target** — default: `auto auto auto`; options: $X $Y $Z: Set the starting and/or subsequent point the camera orbits around. Accepts values of the form "$X $Y $Z", like "0m 1.5m -0.5m". Also supports units in centimeters ("cm") or millimeters ("mm"). A special value "auto" can be used, which sets the target to the center of the model's bounding box in that dimension. Any time this value changes from its initially configured value, the camera will interpolate from its current position to the new value.
- **field-of-view** — default: `auto`; options: angle between 0 and 180 degrees: Used to configure the vertical field of view of the camera. Accepts values in both degrees and radians (e.g., "30deg" or "0.5rad"). Accepts any value between the configured min and max field of view. Any time this value changes from its initially configured value, the camera will interpolate from its current value to the new value. Defaults to "auto", which sets either the vertical or horizontal field of view to 45 degrees depending on the dimensions of the model and the aspect ratio of the canvas.
- **max-camera-orbit** — default: `Infinity 180deg auto`; options: $theta $phi $radius: Set the maximum orbital values of the camera. Takes values in the same form as camera-orbit, but does not support env(). Note "Infinity" is not an accepted keyword, but the default can still be obtained by passing "auto". The radius value for "auto" is the same as the camera-orbit radius "auto" value.
- **min-camera-orbit** — default: `-Infinity 0deg auto`; options: $theta $phi $radius: Set the minimum orbital values of the camera. Note "Infinity" is not an accepted keyword, but the default can still be obtained by passing "auto". The radius value for "auto" is a conservative value to ensure the camera never enters the model, so be careful when setting this to another value.
- **max-field-of-view** — default: `auto`; options: angle between 0 and 180 degrees: Set the maximum field of view of the camera, corresponding to maximum zoom-out. Takes values in the same form as field-of-view, but does not support env(). The default "auto" is the same as the default field-of-view.
- **min-field-of-view** — default: `25deg`; options: angle between 0 and 180 degrees: Set the minimum field of view of the camera, corresponding to maximum zoom-in. Takes values in the same form as field-of-view, but does not support env(). Set this to a small value to get close zoom-in without the camera entering the model.
- **interpolation-decay** — default: `50`; options: values greater than 0: Controls the rate of interpolation when the camera or model moves, due to either user interaction or attribute changes. The decay is asymptotic and the value is in milliseconds, where the majority of the movement will occur within this value's time. Doubling this value will cut the speed in half.

### Properties

- **turntableRotation**: Returns the orientation of the model's turntable (turned by the auto-rotate setting) in radians counter-clockwise when looking down from above.
- **inputSensitivity**: Multiplier for all user inputs: mouse, touch, and keyboard. Allows for selectively fine control or to make custom interaction prompts move the model less compared to the fingers.

### Methods

- **resetTurntableRotation(theta)**: Resets the turntable that rotates the model when auto-rotate is enabled. The new value of the turntable rotation will be theta radians after this method is invoked, but the model may not update until the next render frame. If no argument is supplied, theta defaults to zero.
- **resetInteractionPrompt()**: Typically, the interaction prompt will only display once and then stops displaying after the user interacts with the 3D model for the first time. You can invoke this method in order to reset the interaction prompt after it has already been displayed. Doing so will cause it to display once again when the interaction-prompt display conditions have been met.
- **getCameraOrbit()**: Returns the realtime orbital position of the camera. The returned object has theta, phi, and radius properties along with a toString() method suitable for putting in the camera-orbit attribute. Azimuthal (theta) and polar (phi) angles are represented as radians, and the distance (radius) is represented in meters. This value may differ from the value configured with the camera-orbit attribute on account of user interaction or camera interpolation.
- **getCameraTarget()**: Returns the realtime target position of the camera in meters. The returned object has x, y, and z properties along with a toString() method suitable for putting in the camera-target attribute. This value may differ from the value configured with the camera-target attribute on account of user interaction or camera interpolation.
- **getFieldOfView()**: Returns the realtime camera vertical field of view in degrees. This value may differ from the value configured with the field-of-view attribute on account of user interaction or camera interpolation.
- **jumpCameraToGoal()**: Changes the camera to its last configured goal state immediately on the next update instead of interpolating the motion over time.
- **updateFraming()**: Recalculates the camera defaults in case the model has been changed, for instance by the orientation or scale attributes.
- **getMinimumFieldOfView()**: Returns the minimum camera vertical field of view in degrees.
- **getMaximumFieldOfView()**: Returns the maximum camera vertical field of view in degrees.
- **getIdealAspect()**: Returns the ideal aspect ratio for the poster image for this model as currently framed.
- **zoom(keyPresses)**: Applies the default zoom behavior (a combination of radius and field of view change), mimicking keyboard or mouse wheel inputs. If keyPresses = 1.0, it will zoom in as much as a single keystroke; negative values zoom out.
- **interact(duration, finger0, finger1)**: Creates a synthetic touch interaction, ideal for creating custom interaction prompts. The duration (ms) and finger0 are required, while finger1 is optional and will create zoom/pan interactions instead of rotation if specified. Any other camera change will automatically cancel this motion and interact() cannot be called while a current synthetic interaction is playing. Each finger input is an object with x and y members, each of which has initialValue and keyframes members. The keyframes are an array of objects with frames and value members. The values are between 0 and 1, spanning the width/height of the element. The frames are a relative unit of time, where their sum is normalized to the duration. Each frame eases in and out between values. Visualize the touch points using the finger0/finger1 (./#entrydocs-stagingandcameras-slots-finger) slots.

### Events

- **camera-change**: Fired when the camera position and/or field of view have changed. If the change occurred due to user interaction, the event.detail.source property will be set to "user-interaction". For the interaction-prompt or the interact() method, it will be set to "automatic". For other API camera changes, it is set to "none".
- **interact-stopped**: Fired when the interact() (./#entrydocs-stagingandcameras-methods-interact) motion stops. You can tell it completed by checking that event.detail.source is set to "automatic", while it was canceled early if the source is "user-interaction" or "none" (for JS camera changes).

### Slots

- **interaction-prompt**: By placing a child element under <model-viewer> with slot="interaction-prompt", this element will replace the default hand icon which wiggles back and forth with the model until the user interacts.
- **finger0/finger1**: Use in combination with interact() (./#entrydocs-stagingandcameras-methods-interact) to specify an HTML element to represent each moving touch point. By placing a child element under <model-viewer> with slot="finger0", this element will appear and move along the path specified in the finger0 input of the interact() method, and similarly for finger1. Empty by default.
- **pan-target**: By placing a child element under <model-viewer> with slot="pan-target", this element will replace the small default circle that appears when the user is panning to indicate the camera's target.

## Annotations  (`annotations`)

### CSS

- **--min-hotspot-opacity** — default: `0.25`; options: any value between 0 and 1: Sets the opacity of hidden hotspots.
- **--max-hotspot-opacity** — default: `1`; options: any value between 0 and 1: Sets the opacity of visible hotspots.

### Methods

- **updateHotspot({name, position?, normal?, surface?})**: Updates the position, norma, and/or surface of the hotspot associated with slot="name". The position, normal, and surface are given in the same string format as the hotspot attributes data-position, data-normal, and data-surface from the slot definition (#annotations-slots).
- **queryHotspot(name)**: Returns information about the current state of the hotspot corresponding to the hotspot name as a snapshot: the position, normal, canvasPosition, and facingCamera. The canvas position is represented as a Vector3D with z as the OpenGL depth information. The function returns null if no hotspot is found.
- **positionAndNormalFromPoint(clientX, clientY)**: Returns the world position, normal and texture coordinate of the point on the mesh corresponding to the input pixel coordinates given relative to the screen. The position and normal are returned as Vector3D, which has a method toString() that outputs a format suitable for putting in a hotspot's data-position and data-normal attributes. The texture coordinate is returned as Vector2D, which has also a own toString() method. The function returns null if no object is hit.
- **surfaceFromPoint(clientX, clientY)**: This method returns a dynamic hotspot ID string of the point on the mesh corresponding to the input pixel coordinates given relative to the model-viewer element. The ID string can be used in the data-surface attribute of the hotspot to make it follow this point on the surface even as the model animates. If the mesh is not hit, the result is null.

### Slots

- **hotspot-***: Any child element under <model-viewer> with a slot name starting with "hotspot" will be aligned with the 3D model using its data-position and data-normal attributes in model coordinates, in the same format as camera-target. Alternately, the data-surface attribute can be used to specify a surface point that will animate along with the mesh. It is recommended to use the surfaceFromPoint (./#entrydocs-annotations-methods-surfaceFromPoint) method to generate this string interactively.

## Lighting & Skybox  (`lightingandenv`)

### Attributes

- **skybox-image**: Sets the background image of the scene. Takes a URL to an equirectangular projection image (https://en.wikipedia.org/wiki/Equirectangular_projection) that's used for the skybox, as well as applied as an environment map on the model. Supports png, hdr, and jpg (including UltraHDR) images. HDR images are strongly recommended to adequately represent lighting, and the UltraHDR JPEG format is particularly recommended for its high compression of HDR data - try it yourself using this free online converter (https://gainmap-creator.monogrid.com).
- **skybox-height** — default: `0m`; options: any positive value: Causes the skybox to be projected onto the ground plane. The height indicates the camera's distance above the ground and acts to scale the image at ground level to the correct size. Accepts units in meters ("m"), centimeters ("cm"), or millimeters ("mm"). The default value of 0m disables ground projection.
- **environment-image** — default: `empty string`; options: 'neutral', 'legacy', or a URL to a .hdr or .jpg file: Controls the environmental reflection of the model. Normally if skybox-image is set, that image will also be used for the environment-image. Use environment-image to only set the reflection without affecting the background. If neither is specified, default neutral lighting will be applied. If 'legacy' is specified without a skybox, then our old default environment is applied instead.
- **exposure** — default: `1`; options: any positive value: Controls the exposure of both the model and skybox, for use primarily with HDR environments.
- **tone-mapping** — default: `neutral`; options: neutral, aces, agx, reinhard, cineon, linear, none: Selects the function that compresses the HDR rendering to an SDR image on your screen. ACES is a film industry standard that is commonly used, though it has serious color-accuracy problems. AgX is a new and improved tone mapper seeing broad adoption in film and games. Khronos PBR Neutral ('neutral') is a standard function designed specifically for accurate color reproduction in e-commerce. Our current default is neutral, but prior to v4.0 this default was ACES. The deprecated name commerce is an alias for neutral. Other options include NoToneMapping, which disables tone mapping entirely, LinearToneMapping, a simple linear scaling of brightness values, ReinhardToneMapping, a balanced approach for natural-looking HDR images, and CineonToneMapping, which emulates the look of traditional film. Each tone mapper has its use cases, depending on the desired visual outcome and application requirements.
- **shadow-intensity** — default: `0`; options: any value between 0 and 1: Controls the opacity of the shadow. Set to 0 to turn off the shadow entirely.
- **shadow-softness** — default: `1`; options: any value between 0 and 1: Controls the blurriness of the shadow. Set to 0 for hard shadows. Softness should not be changed every frame as it incurs a performance cost. Softer shadows render faster.

### Methods

- **hasBakedShadow()**: Returns true if a baked-in shadow plane appears to be part of this model. These planes are removed from framing calculations and are only rendered if shadow-intensity is zero, to avoid multiple shadows interacting.

### Events

- **environment-change**: Fired when the environment has changed. If the environment is derived from skybox-image or environment-image, the image will have loaded by the time this event fires.

## Animation  (`animation`)

### Attributes

- **animation-name**: Selects an animation to play by name. This animation will play when the .play() method is invoked, or when the <model-viewer> is configured to autoplay. If no animation-name is specified, <model-viewer> always picks the first animation it finds in the model.
- **animation-crossfade-duration** — default: `300`; options: any number >= 0: When the current animation is changed, <model-viewer> automatically crossfades between the previous and next animations. This attribute controls how long the crossfade is in milliseconds.
- **autoplay** — default: `false`; options: true, false: If this is true and a model has animations, an animation will automatically begin to play when this attribute is set (or when the property is set to true). If no animation-name is specified, plays the first animation.

### Properties

- **availableAnimations**: This property reports an array of strings, corresponding to animations in the loaded model that can be selected with animation-name.
- **currentTime**: This property reports the current track time of the currently selected animation in seconds. If no animations are available, the value is always 0. This property can be set in order to seek along the timeline of the currently playing animation. For example, if you set it to 0, it will reset an animation to the beginning.
- **timeScale**: This property reports the scaling factor for the animation time. This can be used to slow down, speed up or play backwards animations. For example, if you set it to 0.5, the animation will play at half speed. The default value is 1.
- **duration**: This property is read-only. It returns the duration of the currently selected animation in seconds. If no animations are available, the value is always 0.
- **paused**: This property is read-only. It returns true if animations are paused. It returns false if animations are playing. Animations always start paused, and remain so unless the autoplay attribute is set or the .play() method is invoked.
- **appendedAnimations**: This property is read-only. It returns an array of the names of appended animations to the current state and is cleared when the main animation is changed using animation-name.

### Methods

- **play(options: {repetitions, pingpong})**: Causes animations to be played. You can specify the number of repetitions of the animation by setting the number of repetitions to any value greater than 0 (defaults to Infinity). Also if you set pingpong to true, alternately playing forward and backward (defaults to false). Use the autoplay attribute if you want animations to be played automatically.
- **pause()**: Causes animations to be paused. If you want to reset the current animation to the beginning, you should also set the currentTime property to 0.
- **appendAnimation(animationName, options: {repetitions, pingpong, weight, timeScale, time, fade, warp, relativeWarp})**: Causes an animation to run simultaneously with and blend into the current animation. If you want to get the appended animations, you can use appendedAnimations property. You can specify the number of repetitions of the animation by setting the number of repetitions to any value greater than 0 (defaults to Infinity). Also if you set pingpong to true, alternately playing forward and backward (defaults to false). weight The degree of influence of this animation (in the interval [0, 1]), Values between 0 (no impact) and 1 (full impact) can be used to blend between several actions (defaults to 1). timeScale option can be used to slow down, speed up or play backwards animations. For example, if you set it to 0.5, the animation will play at half speed (defaults to 1). The time option causes the animation to start from the specified value. The value of this option can be a float greater than 0 (in seconds) and is clamped between 0 and the animation duration. If not set, the animation starts from the last stopped time (in other words, the previous state continues). The fade option causes the weight of this animation to gradually increase from 0 to 1, The value of this option can be a boolean or float greater than 0 (in seconds), If the value is true, default duration (1.25 second) is applied (defaults to false). The warp option causes change playback speed, within the passed time interval, by modifying timeScale gradually from 0 to current timeScale value, the value of this option can be a boolean or float greater than 0 (in seconds), If the value is true, default duration (1.25 second) is applied (defaults to false), The option changes the warp from the current timeScale to the new value. The value of this option is boolean. If set to false, the timeScale starts from 0 until the entered value (defaults to true).
- **detachAnimation(animationName, options: {fade})**: Causes the appended animation to be detached. The fade option gradually changes the animation weight to 0, the value of this option can be a boolean or float greater than 0 (in seconds), if the value is true, default duration (1.25 second) is applied (defaults to true)

### Events

- **play**: Dispatched when animations begin to play.
- **pause**: Dispatched when animations are paused. A model always begins in the paused state, so it is worth mentioning that this event will not be dispatched until the the .pause() method is invoked after animations have begun playing.
- **loop**: Dispatched when the current animation has looped. You can get the loop count with e.detail.count.
- **finished**: Dispatched when the current animation has finished playing.
- **append-animation**: Dispatched when an animation append to current animation.
- **detach-animation**: Dispatched when appended animation detached.

## Materials & Scene  (`scenegraph`)

### Attributes

- **variant-name**: Selects a model variant by name.
- **orientation** — default: `0deg 0deg 0deg`; options: $roll $pitch $yaw: Rotates the model to the orientation specified by roll, pitch, yaw Euler angles, where yaw is first applied about the Y-axis, then pitch about the new local X-axis (positive is front-down), then roll about the new local Z-axis. If specified before the model loads, automatic camera framing will take this change into account; otherwise the updateFraming() method must be called manually.
- **scale** — default: `1 1 1`; options: $x $y $z: Scales the model as specified in the X, Y, and Z directions. Scale is applied before orientation. If specified before the model loads, automatic camera framing will take this change into account; otherwise the updateFraming() method must be called manually.

### Properties

- **availableVariants**: This property reports an array of strings, corresponding to variants in the loaded model that can be selected with variant-name.
- **model**: This object contains all the methods for the materials API. See examples for usage.
- **originalGltfJson**: Returns a readonly copy of the GLTF JSON object as loaded. Changing this object has no affect on the scene and changes made through the materials API are not reflected here. This object is useful for reverting individual changes made through the materials API.

### Methods

- **exportScene(options)**: Exports the model in glTF or GLB formats. Returns a promise that resolves in a Blob of type "application/octet-stream" or "application/json" depending on the export format. For a list of parameters see GLTF exporter documentation, with the exception that all animations are automatically exported and truncateDrawRange defaults to true.
- **materialFromPoint(clientX, clientY)**: Returns a material whose mesh primitive intersects with a ray created from the input pixel coordinates relative to the screen. Returns the material whose mesh is nearest the camera.
- **createTexture(uri, type?)**: Async method that returns a Texture object for use with the `setTexture` method on `TextureInfo` objects in the Materials API. The uri is required, but the type defaults to 'image/png', which only designates the export format for saving a GLB. The mimetypes 'image/jpeg' and 'image/webp' are also supported.
- **createVideoTexture(uri)**: Returns a Texture object for use with the `setTexture` method on `TextureInfo` objects in the Materials API. The video element created is available through `texture.source.element` for controlling playback.
- **createCanvasTexture()**: Returns a Texture object for use with the `setTexture` method on `TextureInfo` objects in the Materials API. The 2D canvas element created is available through `texture.source.element`; simply get the 2d context and draw as desired, then call `texture.source.update()`.
- **createLottieTexture(uri, quality?)**: Async method that returns a Texture object for use with the `setTexture` method on `TextureInfo` objects in the Materials API. The uri to the lottie json is required, while the quality defaults to 1 (resolution specified in the file). The Lottie animation created is available through `texture.source.animation` for controlling playback. The Lottie canvas module is lazy-loaded like the DRACO decoder and if you don't like our default CDN, you can specify your own location using lottieLoaderLocation (./#entrydocs-loading-staticProperties-lottieLoaderLocation). Note that an import map is required mapping 'three' to your model-viewer library file in order to load a Lottie, follow the link below for an example.

# FAQ

**Who uses <model-viewer>?** — Being open-source and often embedded as a dependency inside other libraries, this is hard to know exactly, but we have partners using it across e-commerce as well as many museums, blogs, virtual art galleries, online technical papers, and more. <model-viewer> is also powering more and more experiences in Google Search itself: try searching 'eukaryote' on desktop and look down for the 'View in 3D' button. Please share your own sites by starting a 'Show and Tell' discussion on our Github:

**What 3D formats are supported?** — <model-viewer> supports and plans to support only glTF/GLB 3D models. It is the Khronos standard known as the JPEG of 3D and the first format to standardize Physically-Based Rendering (PBR), making your models look realistic under any lighting, on any renderer. It is also compact, compressible, and loads rapidly into the GPU.

**What AR modes are available?** — <model-viewer> supports three AR modes: WebXR and SceneViewer on Android and QuickLook on iOS. WebXR is our default mode on Android as it is faster (no redownload of model), has consistent rendering, and stays in the browser, retaining all of our advanced features like annotations and material editing.SceneViewer has most of the same limitations as QuickLook, being independent apps and only customizable through URL parameters. QuickLook only supports Apple's proprietary USDZ format, but <model-viewer> can now auto-generate a USDZ on the fly, much simplifying your deployment and processing. It also allows material edits in 3D mode to propagate into QuickLook, which is not possible in SceneViewer due to redownloading from the original URL.

**Can I have just the AR button?** — This is certainly possible, but not recommended. We have found through UX studies that very few users will accept the necessary camera permissions for AR if they have not yet interacted with the 3D model to see its value. Also, AR does not work reliably in all environments, so it is helpful to think of AR as a progressive enhancement over 3D on the page.

**Why doesn't a documented API exist?** — We don't have the resources to support versioned documentation, so for better or worse our documentation is served from our latest development snapshot, rather than the last release. This means unreleased features are occasionally visible in our public docs. If you run into this problem, you can test with our latest development snapshot here: `https://modelviewer.dev/node_modules/@google/model-viewer/dist/model-viewer.min.js`. Do not use this URL for production! Generally the next release is only a month or so away, which will include the feature.

**Can I have X feature from three.js?** — Probably not. We intentionally keep our API at a higher level than three.js, which is a full game engine. You're welcome to file a feature request if you have an idea that can be explained easily to lay users. You are also welcome to hack/fork us. You can use `mvElement[Object.getOwnPropertySymbols(mvElement).find(e => e.description === 'scene')];` to get access to our internal three.js scene and do whatever you want. You can use our unbundled build and hook up Three.js with an import map as demonstrated in the link below to e.g. hook up other file loaders. However, this is all outside the scope of our public API, so we make no effort to avoid breaking changes or to provide support.

**Can I embed a 3D model in Twitter?** — Yes, <model-viewer> works in a Twitter player card, which will iframe the given URL into the web version of Twitter and will link to it from the mobile app version. We supply a 3D Twitter card generator to make this process easier:

**How high is our rendering quality?** — <model-viewer> uses three.js for rendering, which is high-quality and rapidly supports the most recent PBR glTF extensions. The advantage of glTF is that it is widely-supported with consistent rendering (assuming the render parameters are set up the same way). We track convergence of the most popular glTF renderers to demonstrate the state of the industry and to file bugs to drive further improvement; see for yourself at the following Khronos link.

**How do I ensure accurate colors?** — The short answer is to use neutral (grayscale) lighting and our new 'commerce' tone-mapping function, which is designed specifically to ensure faithful rendering of the glTF's colors. This is a complicated topic, so follow the links for much more in-depth explanations. The single biggest problem with color in 3D e-commerce is the industry-standard ACES tone mapper, so please consider using our commerce alternative.

**Why am I getting CORS errors?** — CORS is a browser security policy, Cross-Origin Resource Sharing, which by default limits scripts (like <model-viewer>) from fetching resources (like 3D models) from a different origin than they are served from. In order to allow this, your server that hosts your 3D models must be set up to respond with CORS headers that permit your site origin where <model-viewer> is used.For instance, if you use an Amazon S3 bucket, you may want to go to the 'CORS' section under 'Permissions' and set: `[{'AllowedHeaders': ['*'], 'AllowedMethods': ['GET'], 'AllowedOrigins': ['*'], 'ExposeHeaders': []}]`

**How should I access <model-viewer>?** — If you control your own hosting, the safest option is always to host model-viewer.min.js yourself on the same server as your site. For smaller sites and blogs, it is often more convenient to use one of various free CDNs - Google provides <model-viewer> as one of its hosted libraries, which we recommend as it is a fast and reliable CDN. Simply specify your desired version in the URL: `https://ajax.googleapis.com/ajax/libs/model-viewer/{{MODELVIEWER_VERSION}}/model-viewer.min.js`. We used to recommend unpkg, but it has had several serious outages recently. It can automatically pick the most recent version, but this is not a good practice as it slows loading (two requests) and ideally you should test when updating to ensure no bugs have been introduced. Another good option is jsDelivr.

**How do I optimize page load performance?** — <model-viewer> is already well-optimized by default, lazy-loading and caching 3D models automatically. Always use a seamless poster so that the loading process becomes one of progressive enhancement. For more details about fine-tuning page-load metrics, see the following link.

**Does <model-viewer> work in React?** — Yes, as web components do generally, but we are not React experts. For those trying to get a TypeScript React project set up to successfully import our TS declaration, please see the following link, posted by one of our users.

**How do I avoid duplicating three.js in my bundle?** — Three.js used to be marked as our dependency, which meant it was duplicated if you used it in another part of your code base too. As of v3.0.2, it is marked as our peer dependency, allowing you to share it. Note that we pin its version due to frequent breaking changes, so you will not have much version flexibility. This can be worked around using npm's --legacy-peer-deps mode, but please do not file issues if you do this, as we can only ensure our tested quality on one version of three.js at a time. If you are working directly with our bundle, then you may prefer to use the `model-viewer-module.min.js` bundle, and bring Three.js manually using an import-map.

**How do I ensure <model-viewer> is self-contained?** — When packaging an app or extension using <model-viewer>, it is important that everything you need is included in your package, but not more. We have several lazy-loaded modules for decoders that only some users need: DRACO, KTX2, Meshopt, and Lottie. These are loaded by URL and the defaults point to stable, external CDNs to make sure they "just work". If you don't use these features, those links will never be accessed, but a static checker can't know that and may flag these external resources. For any feature you need, you should change the Location to a relative URL within your project and copy the files there. If you don't need the feature, do the same thing, but make the file empty - since you'll never access its contents anyway, this will minimize your bundle size.

**How do I make custom inputs or overlays work reliably in AR DOM Overlay mode?** — Inside a WebXR full-screen immersive AR session, mobile browsers do not shrink the layout viewport when a soft keyboard is shown, which can cover your custom input overlays. Additionally, tap events on your overlays can propagate as WebXR screen taps and trigger unexpected 3D gestures (like model movements). To prevent these issues, follow two best practices:1. Event Suppression: The core <model-viewer> now automatically intercepts the `beforexrselect` event on your interactive DOM elements and calls `event.preventDefault()` to stop WebXR from turning DOM taps into 3D session interactions.2. Viewport Resizing: Use the `visualViewport` API to listen for keyboard height overlays (when `ar-status='session-started'`) and translate your elements upward (e.g., via `transform: translateY(-offset px);`) to keep them visible above the keyboard, as demonstrated in our scenegraph example.

**How do I find the API I need?** — Both our API reference and these FAQs are designed as scrollable single pages, specifically so that the browser's find method will search everything at once. Try `Ctrl+F` and search for different keywords.

**How do I get help?** — We're here to help! Please search our documentation, examples, and discussion forum. If you still can't find what you need, open a new discussion and you'll see an answer soon, often from maintainers. Please refrain from posting the same question in more than one place, and please only file an issue if you can complete the template.

**Why aren't my camera settings having an effect?** — Nearly always this is because of setting `camera-orbit`, but not `min-camera-orbit` or `max-camera-orbit`, and likewise for `field-of-view`. The max and min take precedence, so you need to ensure they include your desired state.

**How do I set an attribute from JS?** — We follow standard web conventions, where all attributes are `kabob-case` and their corresponding JS getters and setters are the equivalent `camelCase` name.

**Why is my attribute change not working?** — We use Lit Element to build our web component, which batches attribute changes and processes them asynchronously for better performance. If you need an attribute change to be reflected before taking your next action, use `await mvElement.updateComplete;`. A common example is between changing `animationName` and calling `play()`.

**What are slots?** — A slot is a web standard for web components that allows libraries like <model-viewer> to provide an API where you can insert your own HTML element into a designated part of our internal Shadow DOM. Nearly all of our default UX elements are inside of slots, allowing you to replace them. Keep in mind that if you use a slot, then any API affecting that default element will do nothing. Don't expect the `poster` attribute to do anything if you are using an element with `slot='poster'`.

**What is KTX2?** — KTX2 is a new image format for GPU-friendly compression (BASIS underlies it). It won't give much file size difference compared to JPEG, but it vastly reduces the amount of GPU RAM used and accelerates upload to the GPU. Large high-res models can easily run out of GPU RAM on mobile devices, and this is the fix.

**How do I export a great GLB?** — Extensions are added to glTF pretty frequently and the best import/export support is nearly always in Blender, which is a free, open-source 3D animation application. Though its UX may be unfamiliar, it is becoming very popular with 3D artists in many industries.

**How do I debug/modify a GLB?** — If you need to get into the weeds to debug a glTF or manually modify something, a VSCode extension exists to help. You can even live-preview the render with your changes. This is maintained by the chair of the glTF PBR Next TSG, so it is very up-to-date.

