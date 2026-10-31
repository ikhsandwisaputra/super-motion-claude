---
source: https://rive.app/docs/feature-support
title: "Feature Support"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Feature Support

As the Rive Editor evolves, some new features require updates to the Rive runtimes. In certain cases, this may introduce new or modified APIs. We recommend staying on the latest runtime version to ensure compatibility, bug fixes, and performance improvements.Use the table below to verify whether a feature used in your `.riv` file is supported by your target runtime.> [!WARNING]
>
> Certain features require the use of the Rive Renderer at runtime. See our
> documentation on [choosing a renderer](/docs/runtimes/choose-a-renderer/).
>
> Currently, the only feature that requires the Rive Renderer is **[Vector
> Feathering](https://rive.app/blog/introducing-vector-feathering?utm_source=docs\&utm_medium=content)**.When a feature requires API changes, migration notes will be included below.## Feature support by runtime

\> **Web**
\>
\> * **WebGL2** (`@rive-app/webgl2`): The recommended package for most web projects. Uses the Rive Renderer, so it supports every Rive Editor feature, including vector feathering.
\> * **Canvas** (`@rive-app/canvas`): Uses the browser's Canvas2D renderer. Does not support vector feathering at this time.
\> * **Canvas Lite** (`@rive-app/canvas-lite`): Uses the same API as `@rive-app/canvas`, but excludes certain features to reduce bundle size.
\>
\> See [Canvas vs WebGL2](/runtimes/web/canvas-vs-webgl) for the tradeoffs.
\>
\>
\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> **React**
\>
\> * **WebGL2** (`@rive-app/react-webgl2`): The recommended package for most React projects. Uses the Rive Renderer, so it supports every Rive Editor feature, including vector feathering.
\> * **Canvas** (`@rive-app/react-canvas`): Uses the browser's Canvas2D renderer. Does not support vector feathering at this time.
\> * **Canvas Lite** (`@rive-app/react-canvas-lite`): Uses the same API as `@rive-app/react-canvas`, but excludes certain features to reduce bundle size.
\>
\> See [Canvas vs WebGL2](/runtimes/web/canvas-vs-webgl) for the tradeoffs.
\>
\>
\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> Versions refer to the `@rive-app/react-native` package, built with Nitro.
\>
\> GPU Canvas is supported on iOS and Android in `0.5.3` and later. It is disabled by default. Enable it before loading any Rive files:
\>
\> ```ts theme={null}
\> import { RiveRuntime } from '@rive-app/react-native';
\>
\> RiveRuntime.setGPUCanvasEnabled(true);
\> ```
\>
\> This setting applies to every Rive file in the app. Changes made after file loading begins are ignored. If you [override the native SDK versions](/runtimes/react-native/native-version-customization), GPU Canvas requires Rive iOS `6.25.0` or later and Rive Android `11.12.0` or later.
\>
\> Semantics are supported on iOS in `0.5.0` and later. Import `Semantics` from `@rive-app/react-native` and set `semantics={Semantics.Automatic}` on `RiveView` to enable accessibility when VoiceOver is running.
\>
\> > \\[!NOTE]
\> >
\> > In `0.5.0` and later, the deprecated event and text-run methods are unavailable. Use [data binding](/runtimes/react-native/data-binding) to listen for triggers and update text instead.
\>
\>
\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>

## Runtime support by featureA green checkmark (✅) indicates that a feature is supported in all relevant runtimes.
A yellow circle (🟡) indicates that support varies by runtime or renderer.Differences may reflect:* Platform or SDK limitations where a feature cannot be supported
* Staggered releases as features roll out across runtimes, or
* Lightweight (“lite”) builds that intentionally omit some features to reduce package size.> [!NOTE]
>
> A feature may still be considered fully supported even if it is unavailable in legacy runtimes.

\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> GPU Canvas enables 3D and shader content. See each runtime section for more details.
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> On Apple, this feature requires the Swift Concurrency API. See [Global View Models](/runtimes/apple/data-binding#global-view-models).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> On Apple, this feature requires the Swift Concurrency API. See [Data Binding](/runtimes/apple/data-binding).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> Accessibility voice over support with [Semantics](/editor/accessibility/semantics).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> Support for Rive files with [Scripting](/scripting).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> Data binding lists, images, and artboards were added after initial data binding support.
\>
\> See [Data Binding Overview](/editor/data-binding/overview) and [Data Binding for Runtimes](/runtimes/data-binding).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> See [Data Binding Overview](/editor/data-binding/overview) and [Data Binding for Runtimes](/runtimes/data-binding).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> See [N-Slicing](/editor/layouts/n-slicing).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> Allows Rive to automatically update the artboard size as the underlying view/canvas/widget/texture size changes. See [Layouts](/editor/layouts/layouts-overview).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> Allows Rive to use a fallback font if a glyph is not available. A default font is automatically chosen, or you can optionally configure the desired fallback font based on various options. See [Fallback Fonts](/runtimes/text#fallback-fonts).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> See [Rive Events](/runtimes/rive-events) and [Audio Events](/editor/events/audio-events).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> See [Loading Assets](/runtimes/loading-assets).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> See [Text](/runtimes/text).
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>

## Legacy**Legacy runtimes**

\> > \\[!WARNING]
\> >
\> > The `@rive-app/webgl` runtime is deprecated as of `v2.37.0`. Use `@rive-app/webgl2` (recommended for most content), or `@rive-app/canvas` if your Rive graphics do not require vector feathering.
\>
\>
\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> > \\[!WARNING]
\> >
\> > The `@rive-app/react-webgl` runtime is deprecated as of `v4.30.0`. Use `@rive-app/react-webgl2` (recommended for most content), or `@rive-app/react-canvas` if your Rive graphics do not require vector feathering.
\>
\>
\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>



\> > \\[!WARNING]
\> >
\> > The `rive-react-native` runtime is deprecated. For better performance and the latest features, use `rive-nitro-react-native`.
\> >
\> > [Migration guide](/runtimes/react-native/migration-guide#migrating-from-rive-react-native-to-@rive-app/react-native)
\>
\>
\> <table><thead><tr><th>**Feature**</th></tr></thead>
\>                             <tbody /></table>

**Deprecated features**

\> > \\[!WARNING]
\> >
\> > Listening to [Rive Events](/runtimes/rive-events) at runtime is deprecated and will be removed in future versions.
\> >
\> > Use [Data Binding](/runtimes/data-binding) to listen for triggers or changes to properties instead.
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>



\> > \\[!WARNING]
\> >
\> > Setting text, including [nested text](/runtimes/text#read-update-nested-text-runs-at-runtime), at runtime is deprecated and will be removed in a future version.
\> >
\> > Instead, use [Data Binding](/runtimes/data-binding) to update a string, which is bound to a text run.
\>
\>
\> <table><thead><tr><th>**Runtime**</th>
\>                                 <th>**Version**</th></tr></thead>
\>                         <tbody /></table>
