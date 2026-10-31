---
source: https://tonejs.github.io/docs/15.1.22/classes/Clock.html
title: "Clock | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Clock](https://tonejs.github.io/docs/15.1.22/classes/Clock.html)

# Class Clock<TypeName>

A sample accurate clock which provides a callback at the given rate.
While the callback is not sample-accurate (it is still susceptible to
loose JS timing), the time passed in as the argument to the callback
is precise. For most applications, it is better to use Tone.Transport
instead of the Clock by itself since you can synchronize multiple callbacks.

#### Example

```ts
// the callback will be invoked approximately once a second
// and will print the time exactly once a second apart.
const clock = new Tone.Clock(time => {
    console.log(time);
}, 1);
clock.start();
```

#### Type Parameters

* TypeName extends "bpm" | "hertz" = "hertz"

#### Hierarchy

* ToneWithContext<ClockOptions>
  + Clock

#### Implements

* [Emitter](https://tonejs.github.io/docs/15.1.22/classes/Emitter.html)<ClockEvent>

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor)

### Properties

[callback](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#callback)
[context](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#debug)
[emit](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#emit)
[frequency](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#frequency)
[name](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#name)
[off](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#off)
[on](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#on)
[once](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#once)
[version](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#blockTime)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#disposed)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#sampleTime)
[seconds](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#seconds)
[state](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#state)
[ticks](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#ticks)

### Methods

[dispose](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#dispose)
[get](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#get)
[getSecondsAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getSecondsAtTime)
[getStateAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getStateAtTime)
[getTicksAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getTicksAtTime)
[getTimeOfTick](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getTimeOfTick)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#immediate)
[nextTickTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#nextTickTime)
[now](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#now)
[pause](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#pause)
[set](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#set)
[setTicksAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#setTicksAtTime)
[start](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#stop)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toFrequency)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getDefaults)

## Constructors

### constructor

* new Clock<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor.new_Clock.TypeName-1)>(callback?, frequency?): [Clock](https://tonejs.github.io/docs/15.1.22/classes/Clock.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor.new_Clock.TypeName-1)>
* #### Type Parameters

  + TypeName extends "bpm" | "hertz" = "hertz"

  #### Parameters

  + `Optional` callback: ClockCallback

    The callback to be invoked with the time of the audio event
  + `Optional` frequency: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

    The rate of the callback

  #### Returns [Clock](https://tonejs.github.io/docs/15.1.22/classes/Clock.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor.new_Clock.TypeName-1)>
* new Clock<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor.new_Clock-1.TypeName-2)>(options): [Clock](https://tonejs.github.io/docs/15.1.22/classes/Clock.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor.new_Clock.TypeName-1)>
* #### Type Parameters

  + TypeName extends "bpm" | "hertz" = "hertz"

  #### Parameters

  + options: Partial<ClockOptions>

  #### Returns [Clock](https://tonejs.github.io/docs/15.1.22/classes/Clock.html)<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor.new_Clock.TypeName-1)>

## Properties

### callback

callback: ClockCallback = noOp

The callback function to invoke at the scheduled tick.

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### emit

emit: ((event, ...args) => this)

#### Type declaration

* + (event, ...args): this
  + #### Parameters

    - event: any
    - `Rest` ...args: any[]

    #### Returns this

### frequency

frequency: TickSignal<[TypeName](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor.new_Clock.TypeName-1)>

The rate the callback function should be invoked.

### `Readonly` name

name: string = "Clock"

### off

off: ((event, callback?) => this)

#### Type declaration

* + (event, callback?): this
  + #### Parameters

    - event: ClockEvent
    - `Optional` callback: ((...args) => void)
      * + (...args): void
        + #### Parameters

          - `Rest` ...args: any[]

          #### Returns void

    #### Returns this

### on

on: ((event, callback) => this)

#### Type declaration

* + (event, callback): this
  + #### Parameters

    - event: ClockEvent
    - callback: ((...args) => void)
      * + (...args): void
        + #### Parameters

          - `Rest` ...args: any[]

          #### Returns void

    #### Returns this

### once

once: ((event, callback) => this)

#### Type declaration

* + (event, callback): this
  + #### Parameters

    - event: ClockEvent
    - callback: ((...args) => void)
      * + (...args): void
        + #### Parameters

          - `Rest` ...args: any[]

          #### Returns void

    #### Returns this

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

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### seconds

* get seconds(): number
* The time since ticks=0 that the Clock has been running. Accounts for tempo curves

  #### Returns number
* set seconds(s): void
* #### Parameters

  + s: number

  #### Returns void

### state

* get state(): [PlaybackState](https://tonejs.github.io/docs/15.1.22/types/PlaybackState.html)
* Returns the playback state of the source, either "started", "stopped" or "paused".

  #### Returns [PlaybackState](https://tonejs.github.io/docs/15.1.22/types/PlaybackState.html)

### ticks

* get ticks(): number
* The number of times the callback was invoked. Starts counting at 0
  and increments after the callback was invoked.

  #### Returns number
* set ticks(t): void
* #### Parameters

  + t: number

  #### Returns void

## Methods

### dispose

* dispose(): this
* Clean up

  #### Returns this

### get

* get(): ClockOptions
* Get the object's attributes.

  #### Returns ClockOptions

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getSecondsAtTime

* getSecondsAtTime(time): number
* Return the elapsed seconds at the given time.

  #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When to get the elapsed seconds

  #### Returns number

  The number of elapsed seconds

### getStateAtTime

* getStateAtTime(time): [PlaybackState](https://tonejs.github.io/docs/15.1.22/types/PlaybackState.html)
* Returns the scheduled state at the given time.

  #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time to query.

  #### Returns [PlaybackState](https://tonejs.github.io/docs/15.1.22/types/PlaybackState.html)

  The name of the state input in setStateAtTime.

  #### Example

  ```ts
  const clock = new Tone.Clock();
  clock.start("+0.1");
  clock.getStateAtTime("+0.1"); // returns "started"
  ```

### getTicksAtTime

* getTicksAtTime(time?): number
* Get the clock's ticks at the given time.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When to get the tick value

  #### Returns number

  The tick value at the given time.

### getTimeOfTick

* getTimeOfTick(tick, before?): number
* Get the time of the given tick. The second argument
  is when to test before. Since ticks can be set (with setTicksAtTime)
  there may be multiple times for a given tick value.

  #### Parameters

  + tick: number

    The tick number.
  + before: number = ...

    When to measure the tick value from.

  #### Returns number

  The time of the tick

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

### nextTickTime

* nextTickTime(offset, when): number
* Get the time of the next tick

  #### Parameters

  + offset: number

    The tick number.
  + when: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns number

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

* pause(time?): this
* Pause the clock. Pausing does not reset the tick counter.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time when the clock should stop.

  #### Returns this

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<ClockOptions>

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

### setTicksAtTime

* setTicksAtTime(ticks, time): this
* Set the clock's ticks at the given time.

  #### Parameters

  + ticks: number

    The tick value to set
  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When to set the tick value

  #### Returns this

### start

* start(time?, offset?): this
* Start the clock at the given time. Optionally pass in an offset
  of where to start the tick counter from.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time the clock should start
  + `Optional` offset: number

    Where the tick counter starts counting from.

  #### Returns this

### stop

* stop(time?): this
* Stop the clock. Stopping the clock resets the tick counter to 0.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time when the clock should stop.

  #### Returns this

  #### Example

  ```ts
  const clock = new Tone.Clock(time => {
      console.log(time);
  }, 1);
  clock.start();
  // stop the clock after 10 seconds
  clock.stop("+10");
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

* getDefaults(): ClockOptions
* Returns all of the default options belonging to the class.

  #### Returns ClockOptions

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#constructor)[callback](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#callback)[context](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#debug)[emit](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#emit)[frequency](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#frequency)[name](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#name)[off](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#off)[on](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#on)[once](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#once)[version](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#blockTime)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#disposed)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#sampleTime)[seconds](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#seconds)[state](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#state)[ticks](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#ticks)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#dispose)[get](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#get)[getSecondsAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getSecondsAtTime)[getStateAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getStateAtTime)[getTicksAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getTicksAtTime)[getTimeOfTick](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getTimeOfTick)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#immediate)[nextTickTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#nextTickTime)[now](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#now)[pause](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#pause)[set](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#set)[setTicksAtTime](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#setTicksAtTime)[start](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#stop)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toFrequency)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Clock.html#getDefaults)
