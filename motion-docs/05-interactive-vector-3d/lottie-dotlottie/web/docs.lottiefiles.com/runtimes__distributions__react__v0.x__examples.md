---
source: https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x/examples.md
title: ""
fetched: 2026-10-28
---

# Examples
Recipes for the dotLottie React player — build custom playback controls with state or a ref, and listen to player events with useEffect.

Each recipe below is self-contained: copy it into your project and adapt it as needed. For every available prop, see the [props reference](/en/runtimes/distributions/react/v0.x/props-reference); for the full instance API, see the [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference).

## Control playback with buttons

To control an animation programmatically, capture the player instance through the `dotLottieRefCallback` prop, then call instance methods such as `play()`, `pause()`, `stop()`, and `setFrame()`.

### Store the instance in state

Storing the instance in React state re-renders the component once the player is ready, so your controls can react to its availability:

<iframe height="600" style={{ width: "100%" }} scrolling="no" title="Custom Playback Controls (dotLottie React)" src="https://codepen.io/lottiefiles/embed/WNmEdxd?default-tab=result" frameBorder="no" loading="lazy" allowTransparency={true} allowFullScreen={true}>
  See the Pen <a href="https://codepen.io/lottiefiles/pen/WNmEdxd">Custom Playback Controls (dotLottie React)</a> by
  LottieFiles (<a href="https://codepen.io/lottiefiles">@lottiefiles</a>) on <a href="https://codepen.io">CodePen</a>.
</iframe>

```jsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const App = () => {
  const [dotLottie, setDotLottie] = React.useState(null);

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  function play() {
    if (dotLottie) {
      dotLottie.play();
    }
  }

  function pause() {
    if (dotLottie) {
      dotLottie.pause();
    }
  }

  function stop() {
    if (dotLottie) {
      dotLottie.stop();
    }
  }

  function seek() {
    if (dotLottie) {
      dotLottie.setFrame(30);
    }
  }

  return (
    <>
      <DotLottieReact src="path/to/animation.lottie" loop autoplay dotLottieRefCallback={dotLottieRefCallback} />
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
        <button onClick={seek}>Seek to frame no. 30</button>
      </div>
    </>
  );
};
```

### Store the instance in a ref

If you don't need a re-render when the player becomes available, store the instance in a ref instead:

```jsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const App = () => {
  const dotLottieRef = React.useRef(null);

  return (
    <div>
      <DotLottieReact
        src="path/to/animation.lottie"
        loop
        autoplay
        dotLottieRefCallback={(dotLottie) => {
          dotLottieRef.current = dotLottie;
        }}
      />
      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <button onClick={() => dotLottieRef.current?.play()}>Play</button>
        <button onClick={() => dotLottieRef.current?.pause()}>Pause</button>
        <button onClick={() => dotLottieRef.current?.stop()}>Stop</button>
        <button onClick={() => dotLottieRef.current?.setFrame(30)}>Seek to frame 30</button>
      </div>
    </div>
  );
};
```

## Listen to player events

To react to playback changes, register listeners on the player instance inside a `useEffect` and remove them in the cleanup function:

```jsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const App = () => {
  const [dotLottie, setDotLottie] = React.useState(null);

  React.useEffect(() => {
    function onPlay() {
      console.log("Animation start playing");
    }

    function onPause() {
      console.log("Animation paused");
    }

    function onComplete() {
      console.log("Animation completed");
    }

    function onFrameChange({ currentFrame }) {
      console.log("Current frame: ", currentFrame);
    }

    if (dotLottie) {
      dotLottie.addEventListener("play", onPlay);
      dotLottie.addEventListener("pause", onPause);
      dotLottie.addEventListener("complete", onComplete);
      dotLottie.addEventListener("frame", onFrameChange);
    }

    return () => {
      if (dotLottie) {
        dotLottie.removeEventListener("play", onPlay);
        dotLottie.removeEventListener("pause", onPause);
        dotLottie.removeEventListener("complete", onComplete);
        dotLottie.removeEventListener("frame", onFrameChange);
      }
    };
  }, [dotLottie]);

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  return <DotLottieReact src="path/to/animation.lottie" loop autoplay dotLottieRefCallback={dotLottieRefCallback} />;
};
```

If you don't need to remove listeners later, you can register them directly in `dotLottieRefCallback`:

```jsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const App = () => {
  const onPlay = () => {
    console.log("Animation start playing");
  };

  const onPause = () => {
    console.log("Animation paused");
  };

  const onComplete = () => {
    console.log("Animation completed");
  };

  const onFrameChange = ({ currentFrame }) => {
    console.log("Current frame: ", currentFrame);
  };

  return (
    <DotLottieReact
      src="path/to/animation.lottie"
      loop
      autoplay
      dotLottieRefCallback={(dotLottie) => {
        dotLottie.addEventListener("play", onPlay);
        dotLottie.addEventListener("pause", onPause);
        dotLottie.addEventListener("complete", onComplete);
        dotLottie.addEventListener("frame", onFrameChange);
      }}
    />
  );
};
```

The [dotLottie web player](/en/runtimes/distributions/js/v0.x) instance emits many more events. For the complete list, see [Events](/en/runtimes/distributions/js/v0.x/api/reference#events) in the JS API reference.

## Related topics

- [Getting started](/en/runtimes/distributions/react/v0.x)
- [Props reference](/en/runtimes/distributions/react/v0.x/props-reference)
- [API reference](/en/runtimes/distributions/react/v0.x/api-reference)
