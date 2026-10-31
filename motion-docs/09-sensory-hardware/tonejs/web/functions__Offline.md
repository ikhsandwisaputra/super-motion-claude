---
source: https://tonejs.github.io/docs/15.1.22/functions/Offline.html
title: "Offline | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Offline](https://tonejs.github.io/docs/15.1.22/functions/Offline.html)

# Function Offline

* Offline(callback, duration, channels?, sampleRate?): Promise<[ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)>
* Generate a buffer by rendering all of the Tone.js code within the callback using the OfflineAudioContext.
  The OfflineAudioContext is capable of rendering much faster than real time in many cases.
  The callback function also passes in an offline instance of [Context](https://tonejs.github.io/docs/15.1.22/classes/Context.html) which can be used
  to schedule events along the Transport.

  #### Parameters

  + callback: ((context) => void | Promise<void>)

    All Tone.js nodes which are created and scheduled within this callback are recorded into the output Buffer.

    - * (context): void | Promise<void>
      * #### Parameters

        + context: [OfflineContext](https://tonejs.github.io/docs/15.1.22/classes/OfflineContext.html)

        #### Returns void | Promise<void>
  + duration: number

    the amount of time to record for.
  + channels: number = 2
  + sampleRate: number = ...

  #### Returns Promise<[ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)>

  The promise which is invoked with the ToneAudioBuffer of the recorded output.

  #### Example

  ```ts
  // render 2 seconds of the oscillator
  Tone.Offline(() => {
      // only nodes created in this callback will be recorded
      const oscillator = new Tone.Oscillator().toDestination().start(0);
  }, 2).then((buffer) => {
      // do something with the output buffer
      console.log(buffer);
  });
  ```

  #### Example

  ```ts
  // can also schedule events along the Transport
  // using the passed in Offline Transport
  Tone.Offline(({ transport }) => {
      const osc = new Tone.Oscillator().toDestination();
      transport.schedule(time => {
          osc.start(time).stop(time + 0.1);
      }, 1);
      // make sure to start the transport
      transport.start(0.2);
  }, 4).then((buffer) => {
      // do something with the output buffer
      console.log(buffer);
  });
  ```

### Settings

#### Member Visibility

#### Theme

OSLightDark
