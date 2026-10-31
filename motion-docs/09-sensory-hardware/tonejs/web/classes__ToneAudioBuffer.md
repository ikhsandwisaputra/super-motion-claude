---
source: https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html
title: "ToneAudioBuffer | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

# Class ToneAudioBuffer

AudioBuffer loading and storage. ToneAudioBuffer is used internally by all
classes that make requests for audio files such as Tone.Player,
Tone.Sampler and Tone.Convolver.

#### Example

```ts
const buffer = new Tone.ToneAudioBuffer("https://tonejs.github.io/audio/casio/A1.mp3", () => {
    console.log("loaded");
});
```

#### Hierarchy

* Tone
  + ToneAudioBuffer

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#constructor)

### Properties

[debug](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#debug)
[name](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#name)
[onload](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#onload)
[baseUrl](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#baseUrl)
[downloads](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#downloads)
[version](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#version)

### Accessors

[disposed](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#disposed)
[duration](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#duration)
[length](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#length)
[loaded](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#loaded)
[numberOfChannels](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#numberOfChannels)
[reverse](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#reverse)
[sampleRate](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#sampleRate)

### Methods

[dispose](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#dispose)
[fromArray](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#fromArray)
[get](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#get)
[getChannelData](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#getChannelData)
[load](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#load)
[set](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#set)
[slice](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#slice)
[toArray](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#toArray)
[toMono](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#toMono)
[toString](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#toString)
[fromArray](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#fromArray-2)
[fromUrl](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#fromUrl)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#getDefaults)
[load](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#load-2)
[loaded](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#loaded-2)
[supportsType](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#supportsType)

## Constructors

### constructor

* new ToneAudioBuffer(url?, onload?, onerror?): [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)
* #### Parameters

  + `Optional` url: string | AudioBuffer | [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

    The url to load, or the audio buffer to set.
  + `Optional` onload: ((buffer) => void)

    A callback which is invoked after the buffer is loaded.
    It's recommended to use `ToneAudioBuffer.on('load', callback)` instead
    since it will give you a callback when *all* buffers are loaded.

    - * (buffer): void
      * #### Parameters

        + buffer: [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

        #### Returns void
  + `Optional` onerror: ((error) => void)

    The callback to invoke if there is an error

    - * (error): void
      * #### Parameters

        + error: Error

        #### Returns void

  #### Returns [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)
* new ToneAudioBuffer(options?): [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)
* #### Parameters

  + `Optional` options: Partial<ToneAudioBufferOptions>

  #### Returns [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

## Properties

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` name

name: string = "ToneAudioBuffer"

### onload

onload: ((buffer) => void) = noOp

Callback when the buffer is loaded.

#### Type declaration

* + (buffer): void
  + #### Parameters

    - buffer: [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

    #### Returns void

### `Static` baseUrl

baseUrl: string = ""

A path which is prefixed before every url.

### `Static` downloads

downloads: Promise<void>[] = []

All of the downloads

### `Static` version

version: string = version

The version number semver

## Accessors

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### duration

* get duration(): number
* The duration of the buffer in seconds.

  #### Returns number

### length

* get length(): number
* The length of the buffer in samples

  #### Returns number

### loaded

* get loaded(): boolean
* If the buffer is loaded or not

  #### Returns boolean

### numberOfChannels

* get numberOfChannels(): number
* The number of discrete audio channels. Returns 0 if no buffer is loaded.

  #### Returns number

### reverse

* get reverse(): boolean
* Reverse the buffer.

  #### Returns boolean
* set reverse(rev): void
* #### Parameters

  + rev: boolean

  #### Returns void

### sampleRate

* get sampleRate(): number
* The sample rate of the AudioBuffer

  #### Returns number

## Methods

### dispose

* dispose(): this
* clean up

  #### Returns this

### fromArray

* fromArray(array): this
* Set the audio buffer from the array.
  To create a multichannel AudioBuffer, pass in a multidimensional array.

  #### Parameters

  + array: Float32Array | Float32Array[]

    The array to fill the audio buffer

  #### Returns this

### get

* get(): undefined | AudioBuffer
* The audio buffer stored in the object.

  #### Returns undefined | AudioBuffer

### getChannelData

* getChannelData(channel): Float32Array
* Returns the Float32Array representing the PCM audio data for the specific channel.

  #### Parameters

  + channel: number

    The channel number to return

  #### Returns Float32Array

  The audio as a TypedArray

### load

* load(url): Promise<[ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)>
* Makes an fetch request for the selected url then decodes the file as an audio buffer.
  Invokes the callback once the audio buffer loads.

  #### Parameters

  + url: string

    The url of the buffer to load. filetype support depends on the browser.

  #### Returns Promise<[ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)>

  A Promise which resolves with this ToneAudioBuffer

### set

* set(buffer): this
* Pass in an AudioBuffer or ToneAudioBuffer to set the value of this buffer.

  #### Parameters

  + buffer: AudioBuffer | [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

  #### Returns this

### slice

* slice(start, end?): [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)
* Cut a subsection of the array and return a buffer of the
  subsection. Does not modify the original buffer

  #### Parameters

  + start: number

    The time to start the slice
  + end: number = ...

    The end time to slice. If none is given will default to the end of the buffer

  #### Returns [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

### toArray

* toArray(channel?): Float32Array | Float32Array[]
* Get the buffer as an array. Single channel buffers will return a 1-dimensional
  Float32Array, and multichannel buffers will return multidimensional arrays.

  #### Parameters

  + `Optional` channel: number

    Optionally only copy a single channel from the array.

  #### Returns Float32Array | Float32Array[]

### toMono

* toMono(chanNum?): this
* Sums multiple channels into 1 channel

  #### Parameters

  + `Optional` chanNum: number

    Optionally only copy a single channel from the array.

  #### Returns this

### toString

* toString(): string
* Convert the class to a string

  #### Returns string

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.toString());
  ```

### `Static` fromArray

* fromArray(array): [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)
* Create a ToneAudioBuffer from the array. To create a multichannel AudioBuffer,
  pass in a multidimensional array.

  #### Parameters

  + array: Float32Array | Float32Array[]

    The array to fill the audio buffer

  #### Returns [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

  A ToneAudioBuffer created from the array

### `Static` fromUrl

* fromUrl(url): Promise<[ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)>
* Creates a ToneAudioBuffer from a URL, returns a promise which resolves to a ToneAudioBuffer

  #### Parameters

  + url: string

    The url to load.

  #### Returns Promise<[ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)>

  A promise which resolves to a ToneAudioBuffer

### `Static` getDefaults

* getDefaults(): ToneAudioBufferOptions
* #### Returns ToneAudioBufferOptions

### `Static` load

* load(url): Promise<AudioBuffer>
* Loads a url using fetch and returns the AudioBuffer.

  #### Parameters

  + url: string

  #### Returns Promise<AudioBuffer>

### `Static` loaded

* loaded(): Promise<void>
* Returns a Promise which resolves when all of the buffers have loaded

  #### Returns Promise<void>

### `Static` supportsType

* supportsType(url): boolean
* Checks a url's extension to see if the current browser can play that file type.

  #### Parameters

  + url: string

    The url/extension to test

  #### Returns boolean

  If the file extension can be played

  #### Static

  #### Example

  ```ts
  Tone.ToneAudioBuffer.supportsType("wav"); // returns true
  Tone.ToneAudioBuffer.supportsType("path/to/file.wav"); // returns true
  ```

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#constructor)[debug](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#debug)[name](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#name)[onload](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#onload)[baseUrl](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#baseUrl)[downloads](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#downloads)[version](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#version)[disposed](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#disposed)[duration](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#duration)[length](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#length)[loaded](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#loaded)[numberOfChannels](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#numberOfChannels)[reverse](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#reverse)[sampleRate](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#sampleRate)[dispose](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#dispose)[fromArray](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#fromArray)[get](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#get)[getChannelData](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#getChannelData)[load](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#load)[set](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#set)[slice](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#slice)[toArray](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#toArray)[toMono](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#toMono)[toString](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#toString)[fromArray](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#fromArray-2)[fromUrl](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#fromUrl)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#getDefaults)[load](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#load-2)[loaded](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#loaded-2)[supportsType](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html#supportsType)
