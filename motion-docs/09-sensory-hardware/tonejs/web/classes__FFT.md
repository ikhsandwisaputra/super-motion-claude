---
source: https://tonejs.github.io/docs/15.1.22/classes/FFT.html
title: "FFT | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [FFT](https://tonejs.github.io/docs/15.1.22/classes/FFT.html)

# Class FFT

Get the current frequency data of the connected audio source using a fast Fourier transform.
Read more about FFT algorithms on [Wikipedia] (<https://en.wikipedia.org/wiki/Fast_Fourier_transform>).

#### Hierarchy

* MeterBase<[FFTOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FFTOptions.html)>
  + FFT

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#name)
[normalRange](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#normalRange)
[output](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#output)
[version](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#sampleTime)
[size](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#size)
[smoothing](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#smoothing)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#get)
[getFrequencyOfIndex](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getFrequencyOfIndex)
[getValue](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getValue)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#set)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getDefaults)

## Constructors

### constructor

* new FFT(size?): [FFT](https://tonejs.github.io/docs/15.1.22/classes/FFT.html)
* #### Parameters

  + `Optional` size: number

    The size of the FFT. Value must be a power of two in the range 16 to 16384.

  #### Returns [FFT](https://tonejs.github.io/docs/15.1.22/classes/FFT.html)
* new FFT(options?): [FFT](https://tonejs.github.io/docs/15.1.22/classes/FFT.html)
* #### Parameters

  + `Optional` options: Partial<[FFTOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FFTOptions.html)>

  #### Returns [FFT](https://tonejs.github.io/docs/15.1.22/classes/FFT.html)

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

name: string = "FFT"

### normalRange

normalRange: boolean

If the output should be in decibels or normal range between 0-1. If `normalRange` is false,
the output range will be the measured decibel value, otherwise the decibel value will be converted to
the range of 0-1

### output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

The output is just a pass through of the input

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

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### size

* get size(): number
* The size of analysis. This must be a power of two in the range 16 to 16384.
  Determines the size of the array returned by [getValue](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getValue) (i.e. the number of
  frequency bins). Large FFT sizes may be costly to compute.

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

* get(): [FFTOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FFTOptions.html)
* Get the object's attributes.

  #### Returns [FFTOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FFTOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getFrequencyOfIndex

* getFrequencyOfIndex(index): number
* Returns the frequency value in hertz of each of the indices of the FFT's [getValue](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getValue) response.

  #### Parameters

  + index: number

  #### Returns number

  #### Example

  ```ts
  const fft = new Tone.FFT(32);
  console.log([0, 1, 2, 3, 4].map(index => fft.getFrequencyOfIndex(index)));
  ```

### getValue

* getValue(): Float32Array
* Gets the current frequency data from the connected audio source.
  Returns the frequency data of length [size](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#size) as a Float32Array of decibel values.

  #### Returns Float32Array

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

  + props: RecursivePartial<[FFTOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FFTOptions.html)>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toDestination)

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

* getDefaults(): [FFTOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FFTOptions.html)
* #### Returns [FFTOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FFTOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#name)[normalRange](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#normalRange)[output](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#output)[version](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#sampleTime)[size](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#size)[smoothing](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#smoothing)[chain](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#get)[getFrequencyOfIndex](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getFrequencyOfIndex)[getValue](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getValue)[immediate](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#set)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/FFT.html#getDefaults)
