---
source: https://tonejs.github.io/docs/15.1.22/classes/Recorder.html
title: "Recorder | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Recorder](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html)

# Class Recorder

A wrapper around the MediaRecorder API. Unlike the rest of Tone.js, this module does not offer
any sample-accurate scheduling because it is not a feature of the MediaRecorder API.
This is only natively supported in Chrome and Firefox.
For a cross-browser shim, install [audio-recorder-polyfill](https://www.npmjs.com/package/audio-recorder-polyfill).

#### Example

```ts
const recorder = new Tone.Recorder();
const synth = new Tone.Synth().connect(recorder);
// start recording
recorder.start();
// generate a few notes
synth.triggerAttackRelease("C3", 0.5);
synth.triggerAttackRelease("C4", 0.5, "+1");
synth.triggerAttackRelease("C5", 0.5, "+2");
// wait for the notes to end and stop the recording
setTimeout(async () => {
    // the recorded audio is returned as a blob
    const recording = await recorder.stop();
    // download the recording by creating an anchor element and blob url
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "recording.webm";
    anchor.href = url;
    anchor.click();
}, 4000);
```

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Recorder))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[RecorderOptions](https://tonejs.github.io/docs/15.1.22/interfaces/RecorderOptions.html)>
  + Recorder

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#output)
[version](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#disposed)
[mimeType](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#mimeType)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#sampleTime)
[state](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#state)
[supported](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#supported)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#now)
[pause](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#pause)
[set](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#stop)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#getDefaults)

## Constructors

### constructor

* new Recorder(options?): [Recorder](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html)
* #### Parameters

  + `Optional` options: Partial<[RecorderOptions](https://tonejs.github.io/docs/15.1.22/interfaces/RecorderOptions.html)>

  #### Returns [Recorder](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` input

input: [Gain](https://tonejs.github.io/docs/15.1.22/classes/Gain.html)<"gain">

The input node or nodes. If the object is a source,
it does not have any input and this.input is undefined.

### `Readonly` name

name: "Recorder" = "Recorder"

The name of the class

### `Readonly` output

output: undefined

The output nodes. If the object is a sink,
it does not have any output and this.output is undefined.

### `Static` version

version: string = version

The version number semver

## Accessors

### blockTime

* get blockTime(): number
* The number of seconds of 1 processing block (128 samples)

  #### Returns number

  #### Example

  ```ts
  console.log(Tone.Destination.blockTime);
  ```

### channelCount

* get channelCount(): number
* channelCount is the number of channels used when up-mixing and down-mixing
  connections to any inputs to the node. The default value is 2 except for
  specific nodes where its value is specially determined.

  #### Returns number
* set channelCount(channelCount): void
* #### Parameters

  + channelCount: number

  #### Returns void

### channelCountMode

* get channelCountMode(): ChannelCountMode
* channelCountMode determines how channels will be counted when up-mixing and
  down-mixing connections to any inputs to the node.
  The default value is "max". This attribute has no effect for nodes with no inputs.

  + "max" - computedNumberOfChannels is the maximum of the number of channels of all connections to an input. In this mode channelCount is ignored.
  + "clamped-max" - computedNumberOfChannels is determined as for "max" and then clamped to a maximum value of the given channelCount.
  + "explicit" - computedNumberOfChannels is the exact value as specified by the channelCount.

  #### Returns ChannelCountMode
* set channelCountMode(channelCountMode): void
* #### Parameters

  + channelCountMode: ChannelCountMode

  #### Returns void

### channelInterpretation

* get channelInterpretation(): ChannelInterpretation
* channelInterpretation determines how individual channels will be treated
  when up-mixing and down-mixing connections to any inputs to the node.
  The default value is "speakers".

  #### Returns ChannelInterpretation
* set channelInterpretation(channelInterpretation): void
* #### Parameters

  + channelInterpretation: ChannelInterpretation

  #### Returns void

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### mimeType

* get mimeType(): string
* The mime type is the format that the audio is encoded in. For Chrome
  that is typically webm encoded as "vorbis".

  #### Returns string

### numberOfInputs

* get numberOfInputs(): number
* The number of inputs feeding into the AudioNode.
  For source nodes, this will be 0.

  #### Returns number

  #### Example

  ```ts
  const node = new Tone.Gain();
  console.log(node.numberOfInputs);
  ```

### numberOfOutputs

* get numberOfOutputs(): number
* The number of outputs of the AudioNode.

  #### Returns number

  #### Example

  ```ts
  const node = new Tone.Gain();
  console.log(node.numberOfOutputs);
  ```

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### state

* get state(): [PlaybackState](https://tonejs.github.io/docs/15.1.22/types/PlaybackState.html)
* Get the playback state of the Recorder, either "started", "stopped" or "paused"

  #### Returns [PlaybackState](https://tonejs.github.io/docs/15.1.22/types/PlaybackState.html)

### `Static` supported

* get supported(): boolean
* Test if your platform supports the Media Recorder API. If it's not available,
  try installing this (polyfill)[<https://www.npmjs.com/package/audio-recorder-polyfill]>.

  #### Returns boolean

## Methods

### chain

* chain(...nodes): this
* Connect the output of this node to the rest of the nodes in series.

  #### Parameters

  + `Rest` ...nodes: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)[]

  #### Returns this

  #### Example

  ```ts
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/handdrum-loop.mp3");
  player.autostart = true;
  const filter = new Tone.AutoFilter(4).start();
  const distortion = new Tone.Distortion(0.5);
  // connect the player to the filter, distortion and then to the master output
  player.chain(filter, distortion, Tone.Destination);
  ```

### connect

* connect(destination, outputNum?, inputNum?): this
* connect the output of a ToneAudioNode to an AudioParam, AudioNode, or ToneAudioNode

  #### Parameters

  + destination: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)

    The output to connect to
  + outputNum: number = 0

    The output to connect from
  + inputNum: number = 0

    The input to connect to

  #### Returns this

### disconnect

* disconnect(destination?, outputNum?, inputNum?): this
* disconnect the output

  #### Parameters

  + `Optional` destination: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)
  + outputNum: number = 0
  + inputNum: number = 0

  #### Returns this

### dispose

* dispose(): this
* Dispose and disconnect

  #### Returns this

### fan

* fan(...nodes): this
* connect the output of this node to the rest of the nodes in parallel.

  #### Parameters

  + `Rest` ...nodes: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)[]

  #### Returns this

  #### Example

  ```ts
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/conga-rhythm.mp3");
  player.autostart = true;
  const pitchShift = new Tone.PitchShift(4).toDestination();
  const filter = new Tone.Filter("G5").toDestination();
  // connect a node to the pitch shift and filter in parallel
  player.fan(pitchShift, filter);
  ```

### get

* get(): [RecorderOptions](https://tonejs.github.io/docs/15.1.22/interfaces/RecorderOptions.html)
* Get the object's attributes.

  #### Returns [RecorderOptions](https://tonejs.github.io/docs/15.1.22/interfaces/RecorderOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### immediate

* immediate(): number
* Return the current time of the Context clock without any lookAhead.

  #### Returns number

  #### Example

  ```ts
  setInterval(() => {
      console.log(Tone.immediate());
  }, 100);
  ```

### now

* now(): number
* Return the current time of the Context clock plus the lookAhead.

  #### Returns number

  #### Example

  ```ts
  setInterval(() => {
      console.log(Tone.now());
  }, 100);
  ```

### pause

* pause(): this
* Pause the recorder

  #### Returns this

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[RecorderOptions](https://tonejs.github.io/docs/15.1.22/interfaces/RecorderOptions.html)>

  #### Returns this

  #### Example

  ```ts
  const filter = new Tone.Filter().toDestination();
  // set values using an object
  filter.set({
      frequency: "C6",
      type: "highpass"
  });
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/Analogsynth_octaves_highmid.mp3").connect(filter);
  player.autostart = true;
  ```

### start

* start(): Promise<void>
* Start/Resume the Recorder. Returns a promise which resolves
  when the recorder has started.

  #### Returns Promise<void>

### stop

* stop(): Promise<Blob>
* Stop the recorder. Returns a promise with the recorded content until this point
  encoded as [mimeType](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#mimeType)

  #### Returns Promise<Blob>

### toDestination

* toDestination(): this
* Connect the output to the context's destination node.

  #### Returns this

  #### Example

  ```ts
  const osc = new Tone.Oscillator("C2").start();
  osc.toDestination();
  ```

### toFrequency

* toFrequency(freq): number
* Convert the input to a frequency number

  #### Parameters

  + freq: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

  #### Returns number

  #### Example

  ```ts
  const gain = new Tone.Gain();
  console.log(gain.toFrequency("4n"));
  ```

### toMaster

* toMaster(): this
* Connect the output to the context's destination node.

  #### Returns this

  #### See

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toDestination)

  #### Deprecated

### toSeconds

* toSeconds(time?): number
* Convert the incoming time to seconds.
  This is calculated against the current TransportClass bpm

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns number

  #### Example

  ```ts
  const gain = new Tone.Gain();
  setInterval(() => console.log(gain.toSeconds("4n")), 100);
  // ramp the tempo to 60 bpm over 30 seconds
  Tone.getTransport().bpm.rampTo(60, 30);
  ```

### toString

* toString(): string
* Convert the class to a string

  #### Returns string

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.toString());
  ```

### toTicks

* toTicks(time?): number
* Convert the input time into ticks

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.1.22/classes/TimeClass.html)<number, TimeBaseUnit>

  #### Returns number

  #### Example

  ```ts
  const gain = new Tone.Gain();
  console.log(gain.toTicks("4n"));
  ```

### `Static` getDefaults

* getDefaults(): [RecorderOptions](https://tonejs.github.io/docs/15.1.22/interfaces/RecorderOptions.html)
* #### Returns [RecorderOptions](https://tonejs.github.io/docs/15.1.22/interfaces/RecorderOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#output)[version](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#disposed)[mimeType](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#mimeType)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#sampleTime)[state](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#state)[supported](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#supported)[chain](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#now)[pause](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#pause)[set](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#stop)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Recorder.html#getDefaults)
