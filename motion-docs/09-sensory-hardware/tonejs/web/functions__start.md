---
source: https://tonejs.github.io/docs/15.1.22/functions/start.html
title: "start | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [start](https://tonejs.github.io/docs/15.1.22/functions/start.html)

# Function start

* start(): Promise<void>
* Most browsers will not play *any* audio until a user
  clicks something (like a play button). Invoke this method
  on a click or keypress event handler to start the audio context.
  More about the Autoplay policy
  [here](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio)

  #### Returns Promise<void>

  #### Example

  ```ts
  document.querySelector("button").addEventListener("click", async () => {
      await Tone.start();
      console.log("context started");
  });
  ```

### Settings

#### Member Visibility

#### Theme

OSLightDark
