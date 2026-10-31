---
source: https://tonejs.github.io/docs/15.1.22/classes/Analyser.html
title: "Analyser | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Analyser](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html)

# Class Analyser

Wrapper around the native Web Audio's [AnalyserNode](http://webaudio.github.io/web-audio-api/#idl-def-AnalyserNode).
Extracts FFT or Waveform data from the incoming signal.

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Analyser))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[AnalyserOptions](https://tonejs.github.io/docs/15.1.22/interfaces/AnalyserOptions.html)>
  + Analyser

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#output)
[version](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channelInterpretation)
[channels](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channels)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#sampleTime)
[size](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#size)
[smoothing](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#smoothing)
[type](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#type)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#get)
[getValue](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#getValue)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#set)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#getDefaults)

## Constructors

### constructor

* new Analyser(type?, size?): [Analyser](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html)
* #### Parameters

  + `Optional` type: [AnalyserType](https://tonejs.github.io/docs/15.1.22/types/AnalyserType.html)

    The return type of the analysis, either "fft", or "waveform".
  + `Optional` size: number

    The size of the FFT. This must be a power of two in the range 16 to 16384.

  #### Returns [Analyser](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html)
* new Analyser(options?): [Analyser](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html)
* #### Parameters

  + `Optional` options: Partial<[AnalyserOptions](https://tonejs.github.io/docs/15.1.22/interfaces/AnalyserOptions.html)>

  #### Returns [Analyser](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` input

input: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)

The input node or nodes. If the object is a source,
it does not have any input and this.input is undefined.

### `Readonly` name

name: string = "Analyser"

The name of the class

### `Readonly` output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

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

### channels

* get channels(): number
* The number of channels the analyser does the analysis on. Channel
  separation is done using [Split](https://tonejs.github.io/docs/15.1.22/classes/Split.html)

  #### Returns number

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

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

### size

* get size(): number
* The size of analysis. This must be a power of two in the range 16 to 16384.

  #### Returns number
* set size(size): void
* #### Parameters

  + size: number

  #### Returns void

### smoothing

* get smoothing(): number
* 0 represents no time averaging with the last analysis frame.

  #### Returns number
* set smoothing(val): void
* #### Parameters

  + val: number

  #### Returns void

### type

* get type(): [AnalyserType](https://tonejs.github.io/docs/15.1.22/types/AnalyserType.html)
* The analysis function returned by analyser.getValue(), either "fft" or "waveform".

  #### Returns [AnalyserType](https://tonejs.github.io/docs/15.1.22/types/AnalyserType.html)
* set type(type): void
* #### Parameters

  + type: [AnalyserType](https://tonejs.github.io/docs/15.1.22/types/AnalyserType.html)

  #### Returns void

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
* Clean up.

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

* get(): [AnalyserOptions](https://tonejs.github.io/docs/15.1.22/interfaces/AnalyserOptions.html)
* Get the object's attributes.

  #### Returns [AnalyserOptions](https://tonejs.github.io/docs/15.1.22/interfaces/AnalyserOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getValue

* getValue(): Float32Array | Float32Array[]
* Run the analysis given the current settings. If [channels](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channels) = 1,
  it will return a Float32Array. If [channels](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channels) > 1, it will
  return an array of Float32Arrays where each index in the array
  represents the analysis done on a channel.

  #### Returns Float32Array | Float32Array[]

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

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[AnalyserOptions](https://tonejs.github.io/docs/15.1.22/interfaces/AnalyserOptions.html)>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toDestination)

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

* getDefaults(): [AnalyserOptions](https://tonejs.github.io/docs/15.1.22/interfaces/AnalyserOptions.html)
* #### Returns [AnalyserOptions](https://tonejs.github.io/docs/15.1.22/interfaces/AnalyserOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#output)[version](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channelInterpretation)[channels](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#channels)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#sampleTime)[size](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#size)[smoothing](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#smoothing)[type](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#type)[chain](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#get)[getValue](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#getValue)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#set)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Analyser.html#getDefaults)
