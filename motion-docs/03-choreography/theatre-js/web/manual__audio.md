---
source: https://www.theatrejs.com/docs/latest/manual/audio
title: "Using Audio – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)

# Using Audio

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)
* Using Audio

## #Introduction

In this manual, we'll learn how to add music tracks that are synchronized to our animation.
We'll add a music track to a [Sequence](https://www.theatrejs.com/docs/latest/manual/sequences).
If you're new to sequences, check out [Working with Sequences](https://www.theatrejs.com/docs/latest/manual/sequences) or the [`Sequence` API Reference](https://www.theatrejs.com/docs/latest/api/core#sequence).

## #Adding audio tracks to Sequences

We can attach audio tracks to Sequences using [sequence.attachAudio](https://www.theatrejs.com/docs/latest/api/core#sequence.attachaudio).
Theatre.js will then play the audio track every time the Sequence is played with the timings in sync.

`console.log('Loading audio...')

sheet.sequence.attachAudio({ source: 'http://localhost:3000/audio.mp3' }).then(() => {

console.log('Audio loaded!')

})`

In the above example, Theatre.js will:

1. `fetch()` the audio file
2. Create a [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) context.

   If the browser is [blocking](https://developer.chrome.com/blog/autoplay/#webaudio) the audio context, Theatre.js
   will wait for a user gesture (e.g., a click/touch/key down) to initiate it. It's best to prompt the user to
   initiate audio playback. For example, we can show a button. Once the user clicks on that button (or
   anywhere else), Theatre.js will initiate the audio context.
3. [Decode](https://docs.theatrejs.com/in-depth/#sound-and-music:~:text=Decode,the%20audio.) the audio.
4. Resolve the returned Promise. After this, when you call [Sequence.play](https://www.theatrejs.com/docs/latest/api/core#sequence.play), the audio track will play simultaneously and in sync.

## #Create a custom audio graph

If you would like to have more control over audio loading or audio setup, you can provide your own audio graph, like so:

`// create an AudioContext using the Audio API

const audioContext = new AudioContext()

// create an AudioBuffer from your audio file or generate one on the fly

const audioBuffer: AudioBuffer = someAudioBuffer

// the audio output.

const destinationNode = audioContext.destination

sheet.sequence

.attachAudio({

source: audioBuffer,

audioContext,

destinationNode,

})

// this promise resolves immediately as everything is already provided

.then(() => {

sequence.play()

})`

Or you re-use the Sequence's built-in audio graph, which is exposed through the result of the `attachAudio(/*...*/)` promise:

`sheet.sequence

.attachAudio({

source: '/music.mp3',

})

.then((audioGraph) => {

// this is the audioContext that the sequence created.

const audioContext = audioGraph.audioContext

// this is the main gainNode that the sequence will feed its audio into

const sequenceGain = audioGraph.gainNode

// disconnect it from audioGraph.destinationNode so we can feed it into our

// own audioGraph.

// at this point, audio would be inaudible

sequenceGain.disconnect()

// create our own GainNode

const loweredGain = audioContext.createGain()

// lower gain (volume) to 10%

loweredGain.gain.setValueAtTime(0.1, audioContext.currentTime)

// connect the sequence's gain to our lowered gain

sequenceGain.connect(loweredGain)

// and connect the lower gain to the audioContext's destination

loweredGain.connect(audioContext.destination)

// now sequence's audio will be audible at 10% volume

})`

## #Advanced Audio+Animation Examples

* [THREE.js + music synchronization CodeSandbox - Orb shader](https://codesandbox.io/s/orb-shader-7n8j7?file=/src/index.js)
* [THREE.js + music synchronization CodeSandbox - Flower animation](https://codesandbox.io/s/flower-animation-9x0z2?file=/src/index.js)

## #Learn more

Want to learn more?
Take a look at some more in-depth topics from [our manual](https://www.theatrejs.com/docs/latest/manual):

### Projects

This guide covers creating projects, managing their states, saving and loading their states, and more.

### Sheets

This guide covers Sheets in Theatre.js

### Sheet Objects

This guide covers Sheet Objects in Theatre.js.

### Prop types

Learn how to customize the props you want to animate with Theatre.js. When creating a Sheet Object, we define the props that we want to animate on it. Props can have different types which can be imported from "@theatre/core".

### Working with Sequences

In this guide, we'll explore the tools that Theatre.js offers for creating animations.

### Assets

Learn about assets in Theatre.js

### Studio

Learn the different parts of the Studio.

### Authoring extensions

The Theatre.js Studio API enables you to define extensions that extend the Studio's UI and/or extend the functionality of Studio.

### Keyboard & Mouse Controls

A catalog of controls in Theatre.js Studio.

### Advanced uses

---

Was this article helpful to you?

Last edited on February 01, 2024.
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/300-manual/140-audio.mdx)

#### On this page

* [Introduction](https://www.theatrejs.com/docs/latest/manual/audio#introduction)
* [Adding audio tracks to Sequences](https://www.theatrejs.com/docs/latest/manual/audio#adding-audio-tracks-to-sequences)
* [Create a custom audio graph](https://www.theatrejs.com/docs/latest/manual/audio#create-a-custom-audio-graph)
* [Advanced Audio+Animation Examples](https://www.theatrejs.com/docs/latest/manual/audio#advanced-audioanimation-examples)
* [Learn more](https://www.theatrejs.com/docs/latest/manual/audio#learn-more)
