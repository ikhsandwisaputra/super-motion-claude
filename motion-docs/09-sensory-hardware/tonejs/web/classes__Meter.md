---
source: https://tonejs.github.io/docs/15.1.22/classes/Meter.html
title: "Meter | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Meter](https://tonejs.github.io/docs/15.1.22/classes/Meter.html)

# Class Meter

Meter gets the [RMS](https://en.wikipedia.org/wiki/Root_mean_square)
of an input signal. It can also get the raw value of the input signal.
Setting `normalRange` to `true` will covert the output to a range of
0-1. See an example using a graphical display
[here](https://tonejs.github.io/examples/meter).

#### See

[DCMeter](https://tonejs.github.io/docs/15.1.22/classes/DCMeter.html).

#### Example

```ts
const meter = new Tone.Meter();
const mic = new Tone.UserMedia();
mic.open();
// connect mic to the meter
mic.connect(meter);
// the current level of the mic
setInterval(() => console.log(meter.getValue()), 100);
```

#### Hierarchy

* MeterBase<[MeterOptions](https://tonejs.github.io/docs/15.1.22/interfaces/MeterOptions.html)>
  + Meter

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#name)
[normalRange](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#normalRange)
[output](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#output)
[smoothing](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#smoothing)
[version](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channelInterpretation)
[channels](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channels)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#sampleTime)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#get)
[getLevel](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#getLevel)
[getValue](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#getValue)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#set)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#getDefaults)

## Constructors

### constructor

* new Meter(smoothing?): [Meter](https://tonejs.github.io/docs/15.1.22/classes/Meter.html)
* #### Parameters

  + `Optional` smoothing: number

    The amount of smoothing applied between frames.

  #### Returns [Meter](https://tonejs.github.io/docs/15.1.22/classes/Meter.html)
* new Meter(options?): [Meter](https://tonejs.github.io/docs/15.1.22/classes/Meter.html)
* #### Parameters

  + `Optional` options: Partial<[MeterOptions](https://tonejs.github.io/docs/15.1.22/interfaces/MeterOptions.html)>

  #### Returns [Meter](https://tonejs.github.io/docs/15.1.22/classes/Meter.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### input

input: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)

The signal to be analysed

### `Readonly` name

name: string = "Meter"

### normalRange

normalRange: boolean

If the output should be in decibels or normal range between 0-1. If `normalRange` is false,
the output range will be the measured decibel value, otherwise the decibel value will be converted to
the range of 0-1

### output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

The output is just a pass through of the input

### smoothing

smoothing: number

A value from between 0 and 1 where 0 represents no time averaging with the last analysis frame.

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
* The number of channels of analysis.

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

* get(): [MeterOptions](https://tonejs.github.io/docs/15.1.22/interfaces/MeterOptions.html)
* Get the object's attributes.

  #### Returns [MeterOptions](https://tonejs.github.io/docs/15.1.22/interfaces/MeterOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getLevel

* getLevel(): number | number[]
* Use [getValue](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#getValue) instead. For the previous getValue behavior, use DCMeter.

  #### Returns number | number[]

  #### Deprecated

### getValue

* getValue(): number | number[]
* Get the current value of the incoming signal.
  Output is in decibels when [normalRange](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#normalRange) is `false`.
  If [channels](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channels) = 1, then the output is a single number
  representing the value of the input signal. When [channels](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channels) > 1,
  then each channel is returned as a value in a number array.

  #### Returns number | number[]

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

  + props: RecursivePartial<[MeterOptions](https://tonejs.github.io/docs/15.1.22/interfaces/MeterOptions.html)>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toDestination)

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

* getDefaults(): [MeterOptions](https://tonejs.github.io/docs/15.1.22/interfaces/MeterOptions.html)
* #### Returns [MeterOptions](https://tonejs.github.io/docs/15.1.22/interfaces/MeterOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#name)[normalRange](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#normalRange)[output](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#output)[smoothing](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#smoothing)[version](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channelInterpretation)[channels](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#channels)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#sampleTime)[chain](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#get)[getLevel](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#getLevel)[getValue](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#getValue)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#set)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Meter.html#getDefaults)
