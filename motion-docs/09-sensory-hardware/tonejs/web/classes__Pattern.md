---
source: https://tonejs.github.io/docs/15.1.22/classes/Pattern.html
title: "Pattern | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Pattern](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html)

# Class Pattern<ValueType>

Pattern arpeggiates between the given notes
in a number of patterns.

#### Example

```ts
const pattern = new Tone.Pattern((time, note) => {
    // the order of the notes passed in depends on the pattern
}, ["C2", "D4", "E5", "A6"], "upDown");
```

#### Type Parameters

* ValueType

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Pattern))

* [Loop](https://tonejs.github.io/docs/15.1.22/classes/Loop.html)<[PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>>
  + Pattern

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor)

### Properties

[callback](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#callback)
[context](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#debug)
[name](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#name)
[version](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#blockTime)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#disposed)
[humanize](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#humanize)
[index](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#index)
[interval](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#interval)
[iterations](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#iterations)
[mute](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#mute)
[pattern](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#pattern)
[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#playbackRate)
[probability](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#probability)
[progress](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#progress)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#sampleTime)
[state](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#state)
[value](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#value)
[values](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#values)

### Methods

[cancel](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#cancel)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#dispose)
[get](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#stop)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toFrequency)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#getDefaults)

## Constructors

### constructor

* new Pattern<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>(callback?, values?, pattern?): [Pattern](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>
* #### Type Parameters

  + ValueType

  #### Parameters

  + `Optional` callback: [ToneEventCallback](https://tonejs.github.io/docs/15.1.22/types/ToneEventCallback.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>

    The callback to invoke with the event.
  + `Optional` values: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)[]

    The values to arpeggiate over.
  + `Optional` pattern: PatternName

    The name of the pattern

  #### Returns [Pattern](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>
* new Pattern<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern-1.ValueType-2)>(options?): [Pattern](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>
* #### Type Parameters

  + ValueType

  #### Parameters

  + `Optional` options: Partial<[PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>>

  #### Returns [Pattern](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>

## Properties

### callback

callback: ((time, value?) => void)

The callback to be invoked at a regular interval

#### Type declaration

* + (time, value?): void
  + #### Parameters

    - time: number
    - `Optional` value: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)

    #### Returns void

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` name

name: string = "Pattern"

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

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### humanize

* get humanize(): boolean | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* Random variation +/-0.01s to the scheduled time.
  Or give it a time value which it will randomize by.

  #### Returns boolean | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set humanize(variation): void
* #### Parameters

  + variation: boolean | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### index

* get index(): undefined | number
* The current index of the pattern.

  #### Returns undefined | number

### interval

* get interval(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The time between successive callbacks.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Example

  ```ts
  const loop = new Tone.Loop();
  loop.interval = "8n"; // loop every 8n
  ```
* set interval(interval): void
* #### Parameters

  + interval: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### iterations

* get iterations(): number
* The number of iterations of the loop. The default value is `Infinity` (loop forever).

  #### Returns number
* set iterations(iters): void
* #### Parameters

  + iters: number

  #### Returns void

### mute

* get mute(): boolean
* Muting the Loop means that no callbacks are invoked.

  #### Returns boolean
* set mute(mute): void
* #### Parameters

  + mute: boolean

  #### Returns void

### pattern

* get pattern(): PatternName
* The pattern type.

  #### Returns PatternName
* set pattern(pattern): void
* #### Parameters

  + pattern: PatternName

  #### Returns void

### playbackRate

* get playbackRate(): number
* The playback rate of the loop. The normal playback rate is 1 (no change).
  A `playbackRate` of 2 would be twice as fast.

  #### Returns number
* set playbackRate(rate): void
* #### Parameters

  + rate: number

  #### Returns void

### probability

* get probability(): number
* The probably of the callback being invoked.

  #### Returns number
* set probability(prob): void
* #### Parameters

  + prob: number

  #### Returns void

### progress

* get progress(): number
* The progress of the loop as a value between 0-1. 0, when the loop is stopped or done iterating.

  #### Returns number

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### state

* get state(): [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)
* The state of the Loop, either started or stopped.

  #### Returns [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)

### value

* get value(): undefined | [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)
* The current value of the pattern.

  #### Returns undefined | [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)

### values

* get values(): [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)[]
* The array of events.

  #### Returns [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)[]
* set values(val): void
* #### Parameters

  + val: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)[]

  #### Returns void

## Methods

### cancel

* cancel(time?): this
* Cancel all scheduled events greater than or equal to the given time

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time after which events will be cancel.

  #### Returns this

### dispose

* dispose(): this
* #### Returns this

### get

* get(): [PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>
* Get the object's attributes.

  #### Returns [PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>

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

  + props: RecursivePartial<[PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor.new_Pattern.ValueType-1)>>

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
* Start the loop at the specified time along the Transport's timeline.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When to start the Loop.

  #### Returns this

### stop

* stop(time?): this
* Stop the loop at the given time.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When to stop the Loop.

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

* getDefaults(): [PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)<any>
* #### Returns [PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)<any>

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#constructor)[callback](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#callback)[context](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#debug)[name](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#name)[version](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#blockTime)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#disposed)[humanize](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#humanize)[index](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#index)[interval](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#interval)[iterations](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#iterations)[mute](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#mute)[pattern](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#pattern)[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#playbackRate)[probability](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#probability)[progress](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#progress)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#sampleTime)[state](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#state)[value](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#value)[values](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#values)[cancel](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#cancel)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#dispose)[get](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#stop)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toFrequency)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Pattern.html#getDefaults)
