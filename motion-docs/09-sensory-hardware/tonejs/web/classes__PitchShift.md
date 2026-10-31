---
source: https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html
title: "PitchShift | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [PitchShift](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html)

# Class PitchShift

PitchShift does near-realtime pitch shifting to the incoming signal.
The effect is achieved by speeding up or slowing down the delayTime
of a DelayNode using a sawtooth wave.
Algorithm found in [this pdf](http://dsp-book.narod.ru/soundproc.pdf).
Additional reference by [Miller Pucket](http://msp.ucsd.edu/techniques/v0.11/book-html/node115.html).

#### Hierarchy

* FeedbackEffect<[PitchShiftOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PitchShiftOptions.html)>
  + PitchShift

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#debug)
[delayTime](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#delayTime)
[feedback](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#feedback)
[input](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#output)
[wet](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#wet)
[version](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#numberOfOutputs)
[pitch](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#pitch)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#sampleTime)
[windowSize](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#windowSize)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#set)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#getDefaults)

## Constructors

### constructor

* new PitchShift(pitch?): [PitchShift](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html)
* #### Parameters

  + `Optional` pitch: number

    The interval to transpose the incoming signal by.

  #### Returns [PitchShift](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html)
* new PitchShift(options?): [PitchShift](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html)
* #### Parameters

  + `Optional` options: Partial<[PitchShiftOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PitchShiftOptions.html)>

  #### Returns [PitchShift](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` delayTime

delayTime: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"time">

The amount of delay on the input signal

### feedback

feedback: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"normalRange">

The amount of signal which is fed back into the effect input.

### input

input: [Gain](https://tonejs.github.io/docs/15.1.22/classes/Gain.html)<"gain"> = ...

The effect input node

### `Readonly` name

name: string = "PitchShift"

### output

output: [CrossFade](https://tonejs.github.io/docs/15.1.22/classes/CrossFade.html) = ...

The effect output

### wet

wet: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"normalRange"> = ...

The wet control is how much of the effected
will pass through to the output. 1 = 100% effected
signal, 0 = 100% dry signal.

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

### pitch

* get pitch(): number
* Repitch the incoming signal by some interval (measured in semi-tones).

  #### Returns number

  #### Example

  ```ts
  const pitchShift = new Tone.PitchShift().toDestination();
  const osc = new Tone.Oscillator().connect(pitchShift).start().toDestination();
  pitchShift.pitch = -12; // down one octave
  pitchShift.pitch = 7; // up a fifth
  ```
* set pitch(interval): void
* #### Parameters

  + interval: number

  #### Returns void

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### windowSize

* get windowSize(): number
* The window size corresponds roughly to the sample length in a looping sampler.
  Smaller values are desirable for a less noticeable delay time of the pitch shifted
  signal, but larger values will result in smoother pitch shifting for larger intervals.
  A nominal range of 0.03 to 0.1 is recommended.

  #### Returns number
* set windowSize(size): void
* #### Parameters

  + size: number

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
* #### Returns this

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

* get(): [PitchShiftOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PitchShiftOptions.html)
* Get the object's attributes.

  #### Returns [PitchShiftOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PitchShiftOptions.html)

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

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[PitchShiftOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PitchShiftOptions.html)>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toDestination)

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

* getDefaults(): [PitchShiftOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PitchShiftOptions.html)
* #### Returns [PitchShiftOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PitchShiftOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#debug)[delayTime](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#delayTime)[feedback](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#feedback)[input](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#output)[wet](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#wet)[version](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#numberOfOutputs)[pitch](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#pitch)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#sampleTime)[windowSize](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#windowSize)[chain](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#set)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/PitchShift.html#getDefaults)
