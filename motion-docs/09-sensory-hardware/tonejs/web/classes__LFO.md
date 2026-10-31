---
source: https://tonejs.github.io/docs/15.1.22/classes/LFO.html
title: "LFO | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [LFO](https://tonejs.github.io/docs/15.1.22/classes/LFO.html)

# Class LFO

LFO stands for low frequency oscillator. LFO produces an output signal
which can be attached to an AudioParam or Tone.Signal
in order to modulate that parameter with an oscillator. The LFO can
also be synced to the transport to start/stop and change when the tempo changes.

#### Example

```ts
return Tone.Offline(() => {
    const lfo = new Tone.LFO("4n", 400, 4000).start().toDestination();
}, 0.5, 1);
```

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#LFO))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[LFOOptions](https://tonejs.github.io/docs/15.1.22/types/LFOOptions.html)>
  + LFO

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#constructor)

### Properties

[amplitude](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#amplitude)
[context](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#context)
[convert](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#convert)
[debug](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#debug)
[frequency](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#frequency)
[input](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#output)
[version](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#disposed)
[max](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#max)
[min](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#min)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#numberOfOutputs)
[partials](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#partials)
[phase](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#phase)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#sampleTime)
[state](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#state)
[type](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#type)
[units](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#units)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#stop)
[sync](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#sync)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toTicks)
[unsync](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#unsync)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#getDefaults)

## Constructors

### constructor

* new LFO(frequency?, min?, max?): [LFO](https://tonejs.github.io/docs/15.1.22/classes/LFO.html)
* #### Parameters

  + `Optional` frequency: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

    The frequency of the oscillation.
    Typically, LFOs will be in the frequency range of 0.1 to 10 hertz.
  + `Optional` min: number

    The minimum output value of the LFO.
  + `Optional` max: number

    The maximum value of the LFO.

  #### Returns [LFO](https://tonejs.github.io/docs/15.1.22/classes/LFO.html)
* new LFO(options?): [LFO](https://tonejs.github.io/docs/15.1.22/classes/LFO.html)
* #### Parameters

  + `Optional` options: Partial<[LFOOptions](https://tonejs.github.io/docs/15.1.22/types/LFOOptions.html)>

  #### Returns [LFO](https://tonejs.github.io/docs/15.1.22/classes/LFO.html)

## Properties

### `Readonly` amplitude

amplitude: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"normalRange">

The amplitude of the LFO, which controls the output range between
the min and max output. For example if the min is -10 and the max
is 10, setting the amplitude to 0.5 would make the LFO modulate
between -5 and 5.

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### convert

convert: boolean = true

If the input value is converted using the [units](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#units)

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` frequency

frequency: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"frequency">

The frequency value of the LFO

### `Readonly` input

input: undefined

There is no input node

### `Readonly` name

name: string = "LFO"

The name of the class

### `Readonly` output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

The output of the LFO

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

### max

* get max(): number
* The maximum output of the LFO.

  #### Returns number
* set max(max): void
* #### Parameters

  + max: number

  #### Returns void

### min

* get min(): number
* The minimum output of the LFO.

  #### Returns number
* set min(min): void
* #### Parameters

  + min: number

  #### Returns void

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

### partials

* get partials(): number[]
* The oscillator's partials array.

  #### Returns number[]

  #### See

  [Oscillator.partials](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#partials)
* set partials(partials): void
* #### Parameters

  + partials: number[]

  #### Returns void

### phase

* get phase(): number
* The phase of the LFO.

  #### Returns number
* set phase(phase): void
* #### Parameters

  + phase: number

  #### Returns void

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### state

* get state(): [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)
* Returns the playback state of the source, either "started" or "stopped".

  #### Returns [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)

### type

* get type(): [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)
* The type of the oscillator.

  #### Returns [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)

  #### See

  [Oscillator.type](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#type)
* set type(type): void
* #### Parameters

  + type: [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)

  #### Returns void

### units

* get units(): keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)
* The output units of the LFO.

  #### Returns keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)
* set units(val): void
* #### Parameters

  + val: keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)

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

* connect(node, outputNum?, inputNum?): this
* #### Parameters

  + node: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)

    the destination to connect to
  + `Optional` outputNum: number

    the optional output number
  + `Optional` inputNum: number

    the input number

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

* get(): [LFOOptions](https://tonejs.github.io/docs/15.1.22/types/LFOOptions.html)
* Get the object's attributes.

  #### Returns [LFOOptions](https://tonejs.github.io/docs/15.1.22/types/LFOOptions.html)

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

  + props: RecursivePartial<[LFOOptions](https://tonejs.github.io/docs/15.1.22/types/LFOOptions.html)>

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
* Start the LFO.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time the LFO will start

  #### Returns this

### stop

* stop(time?): this
* Stop the LFO.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time the LFO will stop

  #### Returns this

### sync

* sync(): this
* Sync the start/stop/pause to the transport
  and the frequency to the bpm of the transport

  #### Returns this

  #### Example

  ```ts
  const lfo = new Tone.LFO("8n");
  lfo.sync().start(0);
  // the rate of the LFO will always be an eighth note, even as the tempo changes
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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toDestination)

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
* unsync the LFO from transport control

  #### Returns this

### `Static` getDefaults

* getDefaults(): [LFOOptions](https://tonejs.github.io/docs/15.1.22/types/LFOOptions.html)
* #### Returns [LFOOptions](https://tonejs.github.io/docs/15.1.22/types/LFOOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#constructor)[amplitude](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#amplitude)[context](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#context)[convert](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#convert)[debug](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#debug)[frequency](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#frequency)[input](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#output)[version](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#disposed)[max](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#max)[min](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#min)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#numberOfOutputs)[partials](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#partials)[phase](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#phase)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#sampleTime)[state](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#state)[type](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#type)[units](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#units)[chain](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#stop)[sync](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#sync)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#toTicks)[unsync](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#unsync)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/LFO.html#getDefaults)
