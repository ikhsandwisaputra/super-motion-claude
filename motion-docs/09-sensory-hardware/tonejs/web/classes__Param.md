---
source: https://tonejs.github.io/docs/15.1.22/classes/Param.html
title: "Param | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)

# Class Param<TypeName>

Param wraps the native Web Audio's AudioParam to provide
additional unit conversion functionality. It also
serves as a base-class for classes which have a single,
automatable parameter.

#### Type Parameters

* TypeName extends [UnitName](https://tonejs.github.io/docs/15.1.22/types/Unit.UnitName.html) = "number"

#### Hierarchy

* ToneWithContext<[ParamOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ParamOptions.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>>
  + Param

#### Implements

* AbstractParam<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Param.html#context)
[convert](https://tonejs.github.io/docs/15.1.22/classes/Param.html#convert)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Param.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/Param.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Param.html#name)
[overridden](https://tonejs.github.io/docs/15.1.22/classes/Param.html#overridden)
[units](https://tonejs.github.io/docs/15.1.22/classes/Param.html#units)
[version](https://tonejs.github.io/docs/15.1.22/classes/Param.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#blockTime)
[defaultValue](https://tonejs.github.io/docs/15.1.22/classes/Param.html#defaultValue)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Param.html#disposed)
[maxValue](https://tonejs.github.io/docs/15.1.22/classes/Param.html#maxValue)
[minValue](https://tonejs.github.io/docs/15.1.22/classes/Param.html#minValue)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#sampleTime)
[value](https://tonejs.github.io/docs/15.1.22/classes/Param.html#value)

### Methods

[apply](https://tonejs.github.io/docs/15.1.22/classes/Param.html#apply)
[cancelAndHoldAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#cancelAndHoldAtTime)
[cancelScheduledValues](https://tonejs.github.io/docs/15.1.22/classes/Param.html#cancelScheduledValues)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Param.html#dispose)
[exponentialApproachValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#exponentialApproachValueAtTime)
[exponentialRampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#exponentialRampTo)
[exponentialRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#exponentialRampToValueAtTime)
[get](https://tonejs.github.io/docs/15.1.22/classes/Param.html#get)
[getValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#getValueAtTime)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Param.html#immediate)
[linearRampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#linearRampTo)
[linearRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#linearRampToValueAtTime)
[now](https://tonejs.github.io/docs/15.1.22/classes/Param.html#now)
[rampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#rampTo)
[set](https://tonejs.github.io/docs/15.1.22/classes/Param.html#set)
[setParam](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setParam)
[setRampPoint](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setRampPoint)
[setTargetAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setTargetAtTime)
[setValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setValueAtTime)
[setValueCurveAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setValueCurveAtTime)
[targetRampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#targetRampTo)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toFrequency)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Param.html#getDefaults)

## Constructors

### constructor

* new Param<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>(param, units?, convert?): [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>
* #### Type Parameters

  + TypeName extends keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html) = "number"

  #### Parameters

  + param: AudioParam

    The AudioParam to wrap
  + `Optional` units: [TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)

    The unit name
  + `Optional` convert: boolean

    Whether or not to convert the value to the target units

  #### Returns [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>
* new Param<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param-1.TypeName-2)>(options): [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>
* #### Type Parameters

  + TypeName extends keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html) = "number"

  #### Parameters

  + options: Partial<[ParamOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ParamOptions.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>>

  #### Returns [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### convert

convert: boolean

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` input

input: AudioParam | GainNode

### `Readonly` name

name: string = "Param"

### overridden

overridden: boolean = false

### `Readonly` units

units: keyof [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)

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

### defaultValue

* get defaultValue(): [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
* #### Returns [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]

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

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### value

* get value(): [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
* #### Returns [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
* set value(value): void
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]

  #### Returns void

## Methods

### apply

* apply(param): this
* Apply all of the previously scheduled events to the passed in Param or AudioParam.
  The applied values will start at the context's current time and schedule
  all of the events which are scheduled on this Param onto the passed in param.

  #### Parameters

  + param: AudioParam | [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

  #### Returns this

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

### dispose

* dispose(): this
* #### Returns this

### exponentialApproachValueAtTime

* exponentialApproachValueAtTime(value, time, rampTime): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### exponentialRampTo

* exponentialRampTo(value, rampTime, startTime?): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### exponentialRampToValueAtTime

* exponentialRampToValueAtTime(value, endTime): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + endTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### get

* get(): [ParamOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ParamOptions.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>
* Get the object's attributes.

  #### Returns [ParamOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ParamOptions.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getValueAtTime

* getValueAtTime(time): [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]

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

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### linearRampToValueAtTime

* linearRampToValueAtTime(value, endTime): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + endTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

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

* rampTo(value, rampTime?, startTime?): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) = 0.1
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[ParamOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ParamOptions.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)>>

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

### setParam

* setParam(param): this
* Replace the Param's internal AudioParam. Will apply scheduled curves
  onto the parameter and replace the connections.

  #### Parameters

  + param: AudioParam

  #### Returns this

### setRampPoint

* setRampPoint(time): this
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### setTargetAtTime

* setTargetAtTime(value, startTime, timeConstant): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + timeConstant: number

  #### Returns this

### setValueAtTime

* setValueAtTime(value, time): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### setValueCurveAtTime

* setValueCurveAtTime(values, startTime, duration, scaling?): this
* #### Parameters

  + values: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)][]
  + startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + scaling: number = 1

  #### Returns this

### targetRampTo

* targetRampTo(value, rampTime, startTime?): this
* #### Parameters

  + value: [UnitMap](https://tonejs.github.io/docs/15.1.22/interfaces/Unit.UnitMap.html)[[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor.new_Param.TypeName-1)]
  + rampTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` startTime: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

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

* getDefaults(): [ParamOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ParamOptions.html)<any>
* #### Returns [ParamOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ParamOptions.html)<any>

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Param.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Param.html#context)[convert](https://tonejs.github.io/docs/15.1.22/classes/Param.html#convert)[debug](https://tonejs.github.io/docs/15.1.22/classes/Param.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/Param.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Param.html#name)[overridden](https://tonejs.github.io/docs/15.1.22/classes/Param.html#overridden)[units](https://tonejs.github.io/docs/15.1.22/classes/Param.html#units)[version](https://tonejs.github.io/docs/15.1.22/classes/Param.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#blockTime)[defaultValue](https://tonejs.github.io/docs/15.1.22/classes/Param.html#defaultValue)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Param.html#disposed)[maxValue](https://tonejs.github.io/docs/15.1.22/classes/Param.html#maxValue)[minValue](https://tonejs.github.io/docs/15.1.22/classes/Param.html#minValue)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#sampleTime)[value](https://tonejs.github.io/docs/15.1.22/classes/Param.html#value)[apply](https://tonejs.github.io/docs/15.1.22/classes/Param.html#apply)[cancelAndHoldAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#cancelAndHoldAtTime)[cancelScheduledValues](https://tonejs.github.io/docs/15.1.22/classes/Param.html#cancelScheduledValues)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Param.html#dispose)[exponentialApproachValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#exponentialApproachValueAtTime)[exponentialRampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#exponentialRampTo)[exponentialRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#exponentialRampToValueAtTime)[get](https://tonejs.github.io/docs/15.1.22/classes/Param.html#get)[getValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#getValueAtTime)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Param.html#immediate)[linearRampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#linearRampTo)[linearRampToValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#linearRampToValueAtTime)[now](https://tonejs.github.io/docs/15.1.22/classes/Param.html#now)[rampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#rampTo)[set](https://tonejs.github.io/docs/15.1.22/classes/Param.html#set)[setParam](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setParam)[setRampPoint](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setRampPoint)[setTargetAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setTargetAtTime)[setValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setValueAtTime)[setValueCurveAtTime](https://tonejs.github.io/docs/15.1.22/classes/Param.html#setValueCurveAtTime)[targetRampTo](https://tonejs.github.io/docs/15.1.22/classes/Param.html#targetRampTo)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toFrequency)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Param.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Param.html#getDefaults)
