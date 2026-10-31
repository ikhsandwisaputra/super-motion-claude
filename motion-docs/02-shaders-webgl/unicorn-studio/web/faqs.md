---
source: https://www.unicorn.studio/docs/faqs
title: "FAQs - Unicorn Studio"
fetched: 2026-10-28
---

# FAQs

## Where can I request a feature?

Join [the Discord](https://discord.gg/yCvM5qeTbv)!

## How can I embed my scene in Webflow/Framer?

Publish your scene, then click the button for your platform in the Export panel and paste. Full details in the [embed guide](https://www.unicorn.studio/docs/embed/).

## What happens to my published project if my subscription expires?

Nothing happens to your published project on your site; it remains as is. The watermark will not be added back unless you republish under the free plan.

## Can I export as code?

Legend subscribers can download the shader code in a JSON config compatible with the [unicornstudio.js SDK](https://github.com/hiunicornstudio/unicornstudio.js). The primary purpose of JSON export today is **self hosting**. The SDK is **required** to run your projects due to the depth of functionality:

* Shader pipeline boilerplate
* Texture handling (text/images/video)
* Render target chaining (stacked effects, masks, child effects)
* Interaction handling (mouse/scroll/hover)
* Render loop
* Scene resizing/pausing/cleanup

### Runtime variables

If you want the code so that you can control your scenes programmatically, use [Variables](https://www.unicorn.studio/docs/variables/)! You can bind and expose most properties to an easy-to-use runtime API for custom animations, events, inputs, and more.

## How does it work? Can I use Three.js or my own WebGL code?

Every scene is saved in Unicorn Studio's own scene format, a JSON description of its layers, effects, and animations. On your site, the [unicornstudio.js](https://github.com/hiunicornstudio/unicornstudio.js) runtime renders it with WebGL, one shader pass per layer (or a single shader with [Flatten](https://www.unicorn.studio/docs/performance/#flatten-beta)). A scene isn't a Three.js project or arbitrary WebGL code, so you can't add your own rendering code to it. To control a scene from your site, use [Variables](https://www.unicorn.studio/docs/variables/).

You can write your own shaders, though. The **Custom** effect opens a GLSL ES 3.00 editor for its fragment and vertex shaders, with:

* the layers beneath it as `uTexture`, plus `uTime`, `uMousePos`, and `uResolution`
* uniforms you declare, which become controls in the properties panel
* `sampler2D` uniforms for your own images
* multiple passes, including ping-pong passes that keep the previous frame

Custom shaders are available on every plan, and Unicorn Agent writes its effects the same way.

## How can I make my scene responsive?

Use the three device icons in the center top bar to make changes to your scene on three breakpoints:

* Desktop (992px and larger) is the default.
* Tablet (991px and smaller)
* Mobile (575px and smaller)

If you make a change at a canvas size that is not a breakpoint, it will not be recorded as a breakpoint change.

You can also give shapes, text, and images relative units (% of viewport), which is a simpler way to make things fit on all screen sizes.

## How much does it cost?

The pro subscription, "Legend", unlocks some key features and is available for $168/year, or $20 billed monthly.

* Unlimited publishes without logo
* Commercial license
* JSON export
* High quality video exports and hosting
* Unlimited variables
* Custom 3D models and fonts
* CDN / Asset optimization
* Folders, versioning, and automatic backups
* Unicorn Agent with 200 monthly AI credits
* Unlimited MCP agent changes (Free includes 200 a month)
* Access to all new features and updates

## Can I redistribute / sell Unicorn components?

No, redistributing or reselling Unicorn Studio components is not permitted under any plan, including the Legend commercial license.

While the Legend plan allows you to use Unicorn Studio for commercial purposes and include content created with Unicorn Studio in your own commercial products, you **cannot**:

* Resell or redistribute the Unicorn Studio code itself
* Bundle or package the Unicorn Studio code for redistribution
* Create competing services or products based on our technology

The commercial license grants you the right to use the tool and display the output in your work, but the underlying code remains our proprietary intellectual property.

If you're not sure about your use case, please email george@unicorn.studio.

## Can I make [xyz example] in Unicorn Studio?

Maybe! Drop it in the Discord or send me an email and we'll see if it's possible.

## Can I upload my own 3d models?

Yes! Unicorn Studio supports uploading your own GLB/GLTF models. Custom uploads are included on the Legend plan, with each model file up to 30 MB. (Free workspaces use bundled preset models rather than uploading your own files.)

## I've hit publish, why isn't my scene updating?

Published project data files are hosted in the cloud, and they get cached by browsers and CDNs. To clear the cache, bump the version by adding `?update=1.0.1` to the end of your embed URL or project ID, depending on the type of embed. If you're using React/Next, the local cache can be even more persistent.

## I republished a project, but now it doesn't work on my site. What's going on?

Almost always, your site or app is still using an older version of the Unicorn Studio runtime/SDK.

When you publish, your scene is served using the latest runtime, so your integration needs to match. The fix is usually just updating one of the following:

* Update your jsDelivr CDN link to the latest version (`v2.4.3`)
* Update your React package to the latest version or use `sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js"` on the component

### Framer

If you have one or more components using different versions, that can lead to issues. Make sure the value in "SDK Version" is consistent. You can also find an update option in your components list.

## Why is my custom SVG 3d shape cutoff at the edges?

The SVG needs to be a single path. The best fix, using Figma for example, is to perform "outline stroke" on your SVG and then "union" all the shapes together. Re-export just the shape and try again.

## Where can I report a bug?

Join [the Discord](https://discord.gg/yCvM5qeTbv)!

## Why is the editor crashing?

Unicorn Studio requires a modern browser with WebGL 2.0 support. If you are using an older browser, it will not work. Different OS and browser combinations also have different graphics drivers, and these are being updated all the time. Some things to try:

* Make sure hardware acceleration is enabled in your browser settings.
* Try a different browser.
* Update and restart your machine / browser.

If your device is older than 2018, you may not have enough hardware memory to run the editor efficiently.

## Why is my scene slow / laggy?

Hardware aside, each layer is a shader pass, meaning it processes the layer under it and runs it through an additional compiled shader with computational load. Some shader passes can be quite memory intensive. [Unicorn Studio](https://www.unicorn.studio/) does a lot of optimization and compression under the hood, but if you have eight 3d shape layers with three mouse trail effects on top, it's going to be slow!

The following effects are more memory intensive than others:

* 3d shape
* Mouse trail
* Mouse ripple
* Bloom
* Godrays
* Bokeh blur
* 2d Light

There are ways to boost performance — like downsampling layers, lowering the DPI or scale, or flattening the scene to reduce pass count. Learn more in the [performance guide](https://www.unicorn.studio/docs/performance/).
