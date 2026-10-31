---
source: https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x.md
title: ""
fetched: 2026-10-28
---

# Getting started
Install the @lottiefiles/dotlottie-react package and render your first looping Lottie animation in a React application.

In this tutorial, we'll add the dotLottie React player to a React application and render a looping Lottie animation. By the end, you'll have a working `DotLottieReact` component playing an animation on your page.

## Prerequisites

- A React project using React 16.8.0 or higher
- Node.js and npm installed

## Step 1: Install the package

Add `@lottiefiles/dotlottie-react` to your project:

<PackageInstall pkg="@lottiefiles/dotlottie-react" />

When the install finishes, you should see `@lottiefiles/dotlottie-react` listed under `dependencies` in your `package.json`.

## Step 2: Render your first animation

In a component file — for example, `App.jsx` — import `DotLottieReact` and point it at an animation:

```jsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const App = () => {
  return (
    <DotLottieReact src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie" loop autoplay />
  );
};
```

Keep the sample `src` URL for now, or swap in the URL of your own `.lottie` or `.json` animation file.

Now start your development server and open the app in your browser. You should see the animation start playing on its own and repeat continuously — `autoplay` starts playback on load, and `loop` keeps it going.

## What you've accomplished

You've installed the dotLottie React player and rendered a looping Lottie animation in your React app. From here you can:

- [Build playback controls and handle player events](/en/runtimes/distributions/react/v0.x/examples)
- Browse the [props reference](/en/runtimes/distributions/react/v0.x/props-reference) for every configuration option
- Explore the [API reference](/en/runtimes/distributions/react/v0.x/api-reference) to access the full player instance
