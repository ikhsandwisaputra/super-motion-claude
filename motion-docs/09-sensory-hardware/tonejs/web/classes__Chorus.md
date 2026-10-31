---
source: https://tonejs.github.io/docs/15.1.22/classes/Chorus.html
title: "Chorus | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Chorus](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html)

# Class Chorus

Chorus is a stereo chorus effect composed of a left and right delay with an [LFO](https://tonejs.github.io/docs/15.1.22/classes/LFO.html) applied to the delayTime of each channel.
When [feedback](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#feedback) is set to a value larger than 0, you also get Flanger-type effects.
Inspiration from [Tuna.js](https://github.com/Dinahmoe/tuna/blob/master/tuna.js).
Read more on the chorus effect on [Sound On Sound](http://www.soundonsound.com/sos/jun04/articles/synthsecrets.htm).

#### Example

```ts
const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
const synth = new Tone.PolySynth().connect(chorus);
synth.triggerAttackRelease(["C3", "E3", "G3"], "8n");
```

#### Hierarchy

* StereoFeedbackEffect<[ChorusOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChorusOptions.html)>
  + Chorus

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#debug)
[feedback](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#feedback)
[frequency](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#frequency)
[input](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#output)
[wet](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#wet)
[version](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#channelInterpretation)
[delayTime](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#delayTime)
[depth](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#depth)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#sampleTime)
[spread](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#spread)
[type](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#type)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#stop)
[sync](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#sync)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toTicks)
[unsync](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#unsync)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#getDefaults)

## Constructors

### constructor

* new Chorus(frequency?, delayTime?, depth?): [Chorus](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html)
* #### Parameters

  + `Optional` frequency: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

    The frequency of the LFO.
  + `Optional` delayTime: number

    The delay of the chorus effect in ms.
  + `Optional` depth: number

    The depth of the chorus.

  #### Returns [Chorus](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html)
* new Chorus(options?): [Chorus](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html)
* #### Parameters

  + `Optional` options: Partial<[ChorusOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChorusOptions.html)>

  #### Returns [Chorus](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` feedback

feedback: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"normalRange">

The amount of feedback from the output
back into the input of the effect (routed
across left and right channels).

### `Readonly` frequency

frequency: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"frequency">

The frequency of the LFO which modulates the delayTime.

### `Readonly` input

input: [Gain](https://tonejs.github.io/docs/15.1.22/classes/Gain.html)<"gain">

### `Readonly` name

name: string = "Chorus"

### `Readonly` output

output: [CrossFade](https://tonejs.github.io/docs/15.1.22/classes/CrossFade.html)

### `Readonly` wet

wet: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"normalRange">

The wet control, i.e. how much of the effected
will pass through to the output.

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

### delayTime

* get delayTime(): number
* The delayTime in milliseconds of the chorus. A larger delayTime
  will give a more pronounced effect. Nominal range a delayTime
  is between 2 and 20ms.

  #### Returns number
* set delayTime(delayTime): void
* #### Parameters

  + delayTime: number

  #### Returns void

### depth

* get depth(): number
* The depth of the effect. A depth of 1 makes the delayTime
  modulate between 0 and 2\*delayTime (centered around the delayTime).

  #### Returns number
* set depth(depth): void
* #### Parameters

  + depth: number

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

### spread

* get spread(): number
* Amount of stereo spread. When set to 0, both LFO's will be panned centrally.
  When set to 180, LFO's will be panned hard left and right respectively.

  #### Returns number
* set spread(spread): void
* #### Parameters

  + spread: number

  #### Returns void

### type

* get type(): [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)
* The oscillator type of the LFO.

  #### Returns [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)
* set type(type): void
* #### Parameters

  + type: [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)

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

* get(): [ChorusOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChorusOptions.html)
* Get the object's attributes.

  #### Returns [ChorusOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChorusOptions.html)

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

  + props: RecursivePartial<[ChorusOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChorusOptions.html)>

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

* start(time?): this
* Start the effect.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### stop

* stop(time?): this
* Stop the lfo

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### sync

* sync(): this
* Sync the filter to the transport.

  #### Returns this

  #### See

  [LFO.sync](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#sync)

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toDestination)

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

### unsync

* unsync(): this
* Unsync the filter from the transport.

  #### Returns this

### `Static` getDefaults

* getDefaults(): [ChorusOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChorusOptions.html)
* #### Returns [ChorusOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChorusOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#debug)[feedback](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#feedback)[frequency](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#frequency)[input](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#output)[wet](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#wet)[version](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#channelInterpretation)[delayTime](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#delayTime)[depth](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#depth)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#sampleTime)[spread](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#spread)[type](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#type)[chain](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#stop)[sync](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#sync)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#toTicks)[unsync](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#unsync)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Chorus.html#getDefaults)
