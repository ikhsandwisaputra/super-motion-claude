---
source: https://tonejs.github.io/docs/15.1.22/classes/Signal.html
title: "Signal | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)

# Class Signal<TypeName>

A signal is an audio-rate value. Tone.Signal is a core component of the library.
Unlike a number, Signals can be scheduled with sample-level accuracy. Tone.Signal
has all of the methods available to native Web Audio
[AudioParam](http://webaudio.github.io/web-audio-api/#the-audioparam-interface)
as well as additional conveniences. Read more about working with signals
[here](https://github.com/Tonejs/Tone.js/wiki/Signals).

#### Example

```ts
const osc = new Tone.Oscillator().toDestination().start();
// a scheduleable signal which can be connected to control an AudioParam or another Signal
const signal = new Tone.Signal({
    value: "C4",
    units: "frequency"
}).connect(osc.frequency);
// the scheduled ramp controls the connected signal
signal.rampTo("C2", 4, "+0.5");
```

#### Type Parameters

* TypeName extends [UnitName](https://tonejs.github.io/docs/15.1.22/types/Unit.UnitName.html) = "number"

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Signal))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[SignalOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SignalOptions.html)<any>>
  + Signal
    - [Add](https://tonejs.github.io/docs/15.1.22/classes/Add.html)
    - [GreaterThan](https://tonejs.github.io/docs/15.1.22/classes/GreaterThan.html)
    - [Multiply](https://tonejs.github.io/docs/15.1.22/classes/Multiply.html)
    - [Subtract](https://tonejs.github.io/docs/15.1.22/classes/Subtract.html)
    - [SyncedSignal](https://tonejs.github.io/docs/15.1.22/classes/SyncedSignal.html)

#### Implements

* AbstractParam<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)>

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#output)
[override](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#override)
[version](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#channelInterpretation)
[convert](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#convert)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#disposed)
[maxValue](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#maxValue)
[minValue](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#minValue)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#numberOfOutputs)
[overridden](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#overridden)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#sampleTime)
[units](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#units)
[value](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#value)

### Methods

[apply](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#apply)
[cancelAndHoldAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#cancelAndHoldAtTime)
[cancelScheduledValues](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#cancelScheduledValues)
[chain](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#dispose)
[exponentialApproachValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#exponentialApproachValueAtTime)
[exponentialRampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#exponentialRampTo)
[exponentialRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#exponentialRampToValueAtTime)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#get)
[getValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#getValueAtTime)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#immediate)
[linearRampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#linearRampTo)
[linearRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#linearRampToValueAtTime)
[now](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#now)
[rampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#rampTo)
[set](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#set)
[setRampPoint](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setRampPoint)
[setTargetAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setTargetAtTime)
[setValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setValueAtTime)
[setValueCurveAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setValueCurveAtTime)
[targetRampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#targetRampTo)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#getDefaults)

## Constructors

### constructor

* new Signal<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)>(value?, units?): [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)>
* #### Type Parameters

  + TypeName extends keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html) = "number"

  #### Parameters

  + `Optional` value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]

    Initial value of the signal
  + `Optional` units: [TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)

    The unit name, e.g. "frequency"

  #### Returns [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)>
* new Signal<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal-1.TypeName-2)>(options?): [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)>
* #### Type Parameters

  + TypeName extends keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html) = "number"

  #### Parameters

  + `Optional` options: Partial<[SignalOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SignalOptions.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)>>

  #### Returns [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)>

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

name: string = "Signal"

The name of the class

### `Readonly` output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

The output nodes. If the object is a sink,
it does not have any output and this.output is undefined.

### `Readonly` override

override: boolean = true

Indicates if the value should be overridden on connection.

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

### convert

* get convert(): boolean
* #### Returns boolean
* set convert(convert): void
* #### Parameters

  + convert: boolean

  #### Returns void

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### maxValue

* get maxValue(): number
* #### Returns number

### minValue

* get minValue(): number
* #### Returns number

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

### overridden

* get overridden(): boolean
* #### Returns boolean
* set overridden(overridden): void
* #### Parameters

  + overridden: boolean

  #### Returns void

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### units

* get units(): keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)
* #### Returns keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)

### value

* get value(): [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
* #### Returns [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
* set value(value): void
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]

  #### Returns void

## Methods

### apply

* apply(param): this
* #### Parameters

  + param: AudioParam | [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

  #### Returns this

  #### See

  [Param.apply](https://tonejs.github.io/docs/15.1.22/classes/Param.html#apply).

### cancelAndHoldAtTime

* cancelAndHoldAtTime(time): this
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### cancelScheduledValues

* cancelScheduledValues(time): this
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

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

### exponentialApproachValueAtTime

* exponentialApproachValueAtTime(value, time, rampTime): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### exponentialRampTo

* exponentialRampTo(value, rampTime, startTime?): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### exponentialRampToValueAtTime

* exponentialRampToValueAtTime(value, time): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

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

* get(): [SignalOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SignalOptions.html)<any>
* Get the object's attributes.

  #### Returns [SignalOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SignalOptions.html)<any>

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getValueAtTime

* getValueAtTime(time): [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]

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

### linearRampTo

* linearRampTo(value, rampTime, startTime?): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### linearRampToValueAtTime

* linearRampToValueAtTime(value, time): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

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

### rampTo

* rampTo(value, rampTime, startTime?): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[SignalOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SignalOptions.html)<any>>

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

### setRampPoint

* setRampPoint(time): this
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### setTargetAtTime

* setTargetAtTime(value, startTime, timeConstant): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + timeConstant: number

  #### Returns this

### setValueAtTime

* setValueAtTime(value, time): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### setValueCurveAtTime

* setValueCurveAtTime(values, startTime, duration, scaling?): this
* #### Parameters

  + values: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)][]
  + startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` scaling: number

  #### Returns this

### targetRampTo

* targetRampTo(value, rampTime, startTime?): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor.new_Signal.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toDestination)

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

* getDefaults(): [SignalOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SignalOptions.html)<any>
* #### Returns [SignalOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SignalOptions.html)<any>

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#output)[override](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#override)[version](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#channelInterpretation)[convert](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#convert)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#disposed)[maxValue](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#maxValue)[minValue](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#minValue)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#numberOfOutputs)[overridden](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#overridden)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#sampleTime)[units](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#units)[value](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#value)[apply](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#apply)[cancelAndHoldAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#cancelAndHoldAtTime)[cancelScheduledValues](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#cancelScheduledValues)[chain](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#dispose)[exponentialApproachValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#exponentialApproachValueAtTime)[exponentialRampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#exponentialRampTo)[exponentialRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#exponentialRampToValueAtTime)[fan](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#get)[getValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#getValueAtTime)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#immediate)[linearRampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#linearRampTo)[linearRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#linearRampToValueAtTime)[now](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#now)[rampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#rampTo)[set](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#set)[setRampPoint](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setRampPoint)[setTargetAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setTargetAtTime)[setValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setValueAtTime)[setValueCurveAtTime](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#setValueCurveAtTime)[targetRampTo](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#targetRampTo)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Signal.html#getDefaults)
