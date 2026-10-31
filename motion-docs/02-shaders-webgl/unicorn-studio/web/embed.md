---
source: https://www.unicorn.studio/docs/embed
title: "Embed Guide - Unicorn Studio"
fetched: 2026-10-28
---

# Embed Guide

Embedding a scene takes three steps:

1. **Publish** your scene from the Export panel.
2. **Click your platform's button** — Framer, Webflow, Figma Sites, React, or HTML — to copy a ready-made component or snippet.
3. **Paste** it into your project.

That's it. The rest of this page covers platform notes, the full list of embed options, and a few advanced topics.

Under the hood, scenes run on a small (~50kb gzipped) JavaScript library — [unicornstudio.js on GitHub](https://github.com/hiunicornstudio/unicornstudio.js).

Building with an AI coding assistant? Click **LLM instructions** in the Export panel. It copies a complete prompt that teaches your agent how to embed and control your scene.

## Framer

Click **Framer** in the Export panel and paste into your Framer project. Done!

* Your scene won't render in edit mode — preview or publish to see it in action.
* If your scene isn't updating, it's probably the Framer cache. See [Caching](https://www.unicorn.studio/docs/embed/#caching-behavior) below.
* On the Legend plan, you can paste your exported code into "Project JSON" to make it load faster.

Manual setup

1. Copy this component link: `https://framer.com/m/UnicornStudioEmbed-wWy9.js`
2. Paste it into your Framer project.
3. Paste your scene's Project ID into the first field.

## Webflow

Click **Webflow** in the Export panel and paste onto your Webflow page. Done!

Your scene won't render in edit mode — preview or publish to see it in action.

Manual setup

1. In Site Settings > Custom Code, add to footer:

   ```
   <script type="text/javascript">!function(){var u=window.UnicornStudio;if(u&&u.init){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){u.init()})}else{u.init()}}else{window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js",i.onload=function(){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})}else{UnicornStudio.init()}},(document.head||document.body).appendChild(i)}}();</script>
   ```
2. Choose the element you want to embed your scene in and click on the "settings" tab.
3. Add a new "Custom Attribute". For name put `data-us-project` and for value add your project ID.
4. Add any other `data-us-` attributes from the [parameters table](https://www.unicorn.studio/docs/embed/#sdk-parameters) to customize your scene.

The container div you add `data-us-project` to must have a defined width and height.

Loading from a JSON export (Legend)

Point the `data-us-project-src` attribute at a hosted project JSON file for faster loads:

1. Rename your exported JSON to `[your-file-name].json.txt`
2. Upload it to your Webflow assets library.
3. Use the menu to copy the asset link and paste it as the value for `data-us-project-src`.

## Figma Sites

Click **Figma Sites** in the Export panel, paste into your Figma Sites page, then paste your Project ID into the field in the component detail panel. Done!

Your scene won't render in edit mode — preview or publish to see it in action.

This component only works in **Figma Sites**. It will not work in Figma Design.

## React / Next.js

Click **React** in the Export panel to copy a ready-made component snippet, built on the [unicornstudio-react](https://www.npmjs.com/package/unicornstudio-react) package (unofficial but totally awesome).

```
npm install unicornstudio-react
# or
yarn add unicornstudio-react
# or
pnpm add unicornstudio-react
```

```
import UnicornScene from "unicornstudio-react";

export default function MyComponent() {
  return (
    <UnicornScene
      projectId="YOUR_PROJECT_EMBED_ID"
      width={800}
      height={600}
      preset="Dark Theme"
      variables={{ brandColor: "#7c3aed", intensity: 0.65 }}
      onVariableChange={(name, value, values) => {
        console.log(name, value, values);
      }}
    />
  );
}
```

Use `unicornstudio-react/next` for the Next.js-optimized import. The `variables` prop is applied on load and synced when it changes; `preset` accepts an authored preset ID or name, and explicit `variables` values override it. Use `sceneRef` when you need the typed runtime API directly. The package loads its bundled SDK by default, so only pass `sdkUrl` to override it.

## Plain HTML

Click **HTML** in the Export panel to copy a self-contained snippet — a sized container div plus a small loader for the SDK — that works on any website:

```
<div style="width: 800px; height: 600px" data-us-project="YOUR_PROJECT_EMBED_ID"></div>
<script type="text/javascript">!function(){var u=window.UnicornStudio;if(u&&u.init){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){u.init()})}else{u.init()}}else{window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js",i.onload=function(){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})}else{UnicornStudio.init()}},(document.head||document.body).appendChild(i)}}();</script>
```

## Wix

Wix doesn't have a copy button yet, but setup is still quick:

1. In your Site Settings menu, click **Custom Code** in the Advanced section.
2. Click **+ Add Custom Code** and paste in the loader script:

   ```
   <script type="text/javascript">!function(){var u=window.UnicornStudio;if(u&&u.init){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){u.init()})}else{u.init()}}else{window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js",i.onload=function(){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})}else{UnicornStudio.init()}},(document.head||document.body).appendChild(i)}}();</script>
   ```
3. Name it "Unicorn Studio SDK", select **All pages**, choose **Head**, and click Apply.
4. In the Wix Editor, add an **HTML Embed** element where you want your scene, click **Enter Code**, and paste your scene's div (the **HTML** button in the Export panel gives you one).
5. Click Update and Save.

## SDK Parameters

Fine-tune any embed with `data-us-[param]` attributes on your container div:

| Parameter | Description |
| --- | --- |
| `data-us-project` | Points to your scene project id |
| `data-us-project-src` | Path to hosted project JSON |
| `data-us-scale` | Canvas rendering scale (0.25-1) |
| `data-us-dpi` | Scene resolution (default: 1.5) |
| `data-us-lazyload` | Defers resource creation until viewport entry |
| `data-us-production` | Enables CDN serving |
| `data-us-fps` | Sets render loop FPS |
| `data-us-disablemobile` | Disables mobile mouse/scroll interactions |
| `data-us-fixed` | Makes the scene behave like a fixed element |
| `data-us-alttext` | SEO alt text |
| `data-us-arialabel` | Accessibility label |
| `data-us-vars` | JSON object of initial scene variable values by variable name |
| `data-us-preset` | Authored preset ID or name to apply before initial variable values |

Use either `data-us-project` or `data-us-project-src` — not both.

Example implementation:

```
<div
  data-us-project="YOUR_PROJECT_EMBED_ID"
  data-us-scale="1"
  data-us-dpi="1.5"
  data-us-lazyload="true"
  data-us-production="true"
  data-us-alttext="Welcome to Unicorn Studio"
  data-us-arialabel="This is a canvas scene"
></div>
```

## Variables and Presets

Published scenes can expose named [variables](https://www.unicorn.studio/docs/variables/) — safe developer controls that let your site change colors, text, intensity, and more at runtime, without knowing anything about layers or shaders. Presets are authored groups of variable values you can apply by name.

```
<div
  data-us-project="YOUR_PROJECT_EMBED_ID"
  data-us-preset="Dark Theme"
  data-us-vars='{"accentColor":"#88bbff","intensity":0.5}'
></div>
```

```
UnicornStudio.init().then(scenes => {
  const scene = scenes[0];
  scene.setVariable('intensity', 0.9);
  scene.setPreset('Dark Theme');
});
```

See the [Variables guide](https://www.unicorn.studio/docs/variables/) for the full runtime API, presets, live demos, and debugging tips.

## Native JS Implementation

For modern web apps:

```
// Import
import * as UnicornStudio from './path/to/unicornStudio.umd.js'

// Component mount
UnicornStudio.init().then(scenes => {
  // Scenes are ready
}).catch(err => {
  console.error(err);
});

// Component unmount
UnicornStudio.destroy();
```

[See the documentation on GitHub](https://github.com/hiunicornstudio/unicornstudio.js)

## Advanced Topics

### Virtual scroll

In SDK v2.1.12+, you can supply your own scroll value for scene visibility and scroll-based animations instead of native `window.scrollY`. This helps on sites where smooth scroll libraries like Lenis move the page with transforms, so native scroll position no longer reflects the visual page position.

```
const lenis = new Lenis();

lenis.on('scroll', ({ scroll }) => {
  UnicornStudio.setScroll(scroll);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

If you need to wait for the SDK, set this up inside `UnicornStudio.init().then(...)`. If your app destroys or disables the virtual scroller, call `UnicornStudio.useNativeScroll()` to clear the override and resume using `window.scrollY`.

### Caching behavior

Published scene data is cached by browsers and CDNs. To bypass the cache after an update, bump the `update` query parameter on your project ID:

```
<div data-us-project="JoBbhn1dDuRwdTcqZFPc?update=1.0.1"></div>
```

### Production mode

Production mode serves your scene data from a CDN for faster loads and better caching:

* Use `data-us-production="true"` in HTML
* Add `?production=true` to the project ID in Framer
* Enable "production mode" when publishing

Note: updates take a few minutes to propagate through the CDN.

## [Next: Performance Guide](https://www.unicorn.studio/docs/performance/)
