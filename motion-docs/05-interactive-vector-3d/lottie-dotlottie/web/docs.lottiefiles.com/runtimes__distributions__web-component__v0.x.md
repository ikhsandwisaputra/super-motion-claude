---
source: https://docs.lottiefiles.com/en/runtimes/distributions/web-component/v0.x.md
title: ""
fetched: 2026-10-28
---

# Getting started
Load the dotLottie web component from a CDN, add the dotlottie-wc element to a plain HTML page, and render your first Lottie animation.

In this tutorial, we create a plain HTML page, load the dotLottie web component from a CDN, and render a first animation with the `<dotlottie-wc>` element.

## Prerequisites

- A text editor and a modern web browser.
- Basic familiarity with HTML.

## Step 1: Create an HTML page

Create a file named `index.html` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My first dotLottie animation</title>
  </head>
  <body>
    <h1>My first dotLottie animation</h1>
  </body>
</html>
```

Open `index.html` in your browser. You should see the heading "My first dotLottie animation" on an otherwise empty page.

## Step 2: Load the web component

Add a script tag before the closing `</body>` tag:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-wc.js"></script>
```

This script registers the `<dotlottie-wc>` custom element. Reload the page and run the following in your browser's developer console:

```javascript
customElements.get("dotlottie-wc");
```

The console prints the element's class definition, confirming the component is registered and ready to use.

## Step 3: Add the animation element

Add a `<dotlottie-wc>` element inside `<body>`, above the script tag:

```html
<dotlottie-wc
  src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
  autoplay
  loop
></dotlottie-wc>
```

The `src` attribute points to the animation file, `autoplay` starts playback on load, and `loop` repeats it continuously.

Reload the page. You should now see the animation playing under the heading, looping without end.

## Step 4: Size the animation

The element is styled with standard CSS, like any other HTML element. Add a style block inside `<head>`:

```html
<style>
  dotlottie-wc {
    display: block; /* Recommended for sizing */
    width: 300px;
    height: 300px;
    margin: 20px auto;
  }
</style>
```

Reload the page. Notice that the animation now renders at 300 × 300 pixels, centered on the page.

Your finished `index.html` looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My first dotLottie animation</title>
    <style>
      dotlottie-wc {
        display: block;
        width: 300px;
        height: 300px;
        margin: 20px auto;
      }
    </style>
  </head>
  <body>
    <h1>My first dotLottie animation</h1>

    <dotlottie-wc
      src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
      autoplay
      loop
    ></dotlottie-wc>

    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-wc.js"
    ></script>
  </body>
</html>
```

## What you accomplished

You built a working HTML page that loads the dotLottie web component, renders a looping Lottie animation, and sizes it with plain CSS — no framework or build step involved. The component also cleans up its internal animation instance automatically when the element is removed from the DOM, so there is nothing more to manage.

From here you can:

- Point `src` at your own `.lottie` or `.json` file and adjust playback with attributes such as `speed` and `mode` — see the [attributes and properties reference](/en/runtimes/distributions/web-component/v0.x/attributes-reference).
- Control playback and listen to events with JavaScript — see the [examples](/en/runtimes/distributions/web-component/v0.x/examples).
- Explore the worker element and instance API in the [API reference](/en/runtimes/distributions/web-component/v0.x/api-reference).
