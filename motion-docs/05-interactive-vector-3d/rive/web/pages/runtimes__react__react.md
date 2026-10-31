---
source: https://rive.app/docs/runtimes/react/react
title: "React"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# React

Render and control Rive files in React.

Use the Rive React runtime to render `.riv` files in React apps.

There are three main ways to use Rive in a React app:

* **Hooks** - use React hooks to render Rive and control state machines, events, and data binding from React.
* **Rive component** - use the default component for simple embeds with limited runtime control.
* **Imperative runtime** - use the Web JavaScript runtime directly when you want to create and manage the Rive instance yourself.

## Quick start

**1. Install the dependency**

```bash theme={null}
npm i --save @rive-app/react-webgl2
```

> [!NOTE]
>
> This guide uses `@rive-app/react-webgl2`. Rive also provides other React packages for different renderers. See [Choosing a Renderer](/docs/runtimes/choose-a-renderer/overview#web-react) to choose the package that fits your project.

**2. Render the Rive component**

**Hooks**

Use the returned `rive` instance with other hooks when you need data binding.

```jsx theme={null}
import React, { useEffect } from "react";
import { useRive, useViewModelInstanceNumber } from "@rive-app/react-webgl2";

export default function App() {
  const { rive, RiveComponent } = useRive({
    // Load a local .riv file or use a hosted URL.
    src: "quick_start_health_bar.riv",
    // Be sure to specify the correct state machine name
    stateMachine: "State Machine 1",
    // Autoplay the state machine
    autoplay: true,
    // This uses the view model instance defined in Rive
    autoBind: true,
  });

  // Get the bound view model instance
  const vmi = rive?.viewModelInstance;

  // Access the bound numeric `health` field and its setter from the view model instance.
  const { value: health, setValue: setHealth } = useViewModelInstanceNumber(
    "health",
    vmi
  );

  useEffect(() => {
    // Set the health value
    setHealth(10);
  }, [rive, setHealth]);

  return (
    <RiveComponent />
  );
}
```

> [!NOTE]
>
> The Rive canvas sizes itself based on its container. If nothing appears, make sure the parent element has a defined width and height.

> [!TIP]
>
> The property hooks run after Rive has loaded, so the first frame renders with whatever data the file shipped with, even with `autoplay: false`. To set values *before* anything renders, do that work with the `rive` instance passed to the `onRiveReady` callback of `useRive`. See [Binding before the first frame](/docs/runtimes/react/data-binding#binding-before-the-first-frame).

**Rive Component**

Rive React provides a basic component as its default import for displaying simple animations with a few props you can set, such as `artboard` and `layout`.

This approach is best for simple embeds. Use hooks if you need to control state machines, access the Rive instance, listen for events, or control data at runtime.

```tsx theme={null}
import Rive from '@rive-app/react-webgl2';

export const Simple = () => (
  <Rive
    src="https://cdn.rive.app/animations/vehicles.riv"
    stateMachine="bumpy"
  />
);
```

**Imperative**

Use the imperative runtime when you want to create and manage the Rive instance yourself. In React, this is usually done with `useEffect` and a canvas ref.

> [!NOTE]
>
> Imperative usage uses the Web JavaScript runtime package, such as `@rive-app/webgl2`, instead of a React package.

```jsx theme={null}
import React, { useEffect, useRef } from "react";
import { Rive, Fit, Layout } from "@rive-app/webgl2";
import "./styles.css";

export default function App() {
  const canvasRef = useRef();

  useEffect(() => {
    const riveInstance = new Rive({
      // Load a local .riv file or use a hosted URL.
      src: "quick_start_health_bar.riv",
      // Be sure to specify the correct state machine name
      stateMachine: "State Machine 1", // Name of the State Machine to play
      canvas: canvasRef.current,
      autoplay: true,
      autoBind: true, // This uses the view model instance defined in Rive
      onLoad: () => {
        // Prevent a blurry canvas by using the device pixel ratio
        riveInstance.resizeDrawingSurfaceToCanvas();
      },
    });

    const handleResize = () => {
      if (riveInstance) {
        riveInstance.resizeDrawingSurfaceToCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      riveInstance.cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "50vh" }} />;
}
```
