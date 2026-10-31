---
source: https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html
title: "ToneEvent | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)

# Class ToneEvent<ValueType>

ToneEvent abstracts away this.context.transport.schedule and provides a schedulable
callback for a single or repeatable events along the timeline.

#### Example

```ts
const synth = new Tone.PolySynth().toDestination();
const chordEvent = new Tone.ToneEvent(((time, chord) => {
    // the chord as well as the exact time of the event
    // are passed in as arguments to the callback function
    synth.triggerAttackRelease(chord, 0.5, time);
}), ["D4", "E4", "F4"]);
// start the chord at the beginning of the transport timeline
chordEvent.start();
// loop it every measure for 8 measures
chordEvent.loop = 8;
chordEvent.loopEnd = "1m";
```

#### Type Parameters

* ValueType = any

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#ToneEvent))

* ToneWithContext<[ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>>
  + ToneEvent
    - [Part](https://tonejs.github.io/docs/15.1.22/classes/Part.html)
    - [Sequence](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html)

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor)

### Properties

[callback](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#callback)
[context](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#debug)
[mute](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#mute)
[name](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#name)
[value](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#value)
[version](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#blockTime)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#disposed)
[humanize](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#humanize)
[loop](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#loop)
[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#loopEnd)
[loopStart](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#loopStart)
[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#playbackRate)
[probability](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#probability)
[progress](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#progress)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#sampleTime)
[startOffset](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#startOffset)
[state](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#state)

### Methods

[cancel](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#cancel)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#dispose)
[get](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#stop)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toFrequency)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#getDefaults)

## Constructors

### constructor

* new ToneEvent<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>(callback?, value?): [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>
* #### Type Parameters

  + ValueType = any

  #### Parameters

  + `Optional` callback: [ToneEventCallback](https://tonejs.github.io/docs/15.1.22/types/ToneEventCallback.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>

    The callback to invoke at the time.
  + `Optional` value: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)

    The value or values which should be passed to the callback function on invocation.

  #### Returns [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>
* new ToneEvent<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent-1.ValueType-2)>(options?): [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>
* #### Type Parameters

  + ValueType = any

  #### Parameters

  + `Optional` options: Partial<[ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>>

  #### Returns [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>

## Properties

### callback

callback: [ToneEventCallback](https://tonejs.github.io/docs/15.1.22/types/ToneEventCallback.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>

The callback to invoke.

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### mute

mute: boolean

If mute is true, the callback won't be invoked.

### `Readonly` name

name: string = "ToneEvent"

### value

value: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)

The value which is passed to the
callback function.

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
* If set to true, will apply small random variation
  to the callback time. If the value is given as a time, it will randomize
  by that amount.

  #### Returns boolean | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Example

  ```ts
  const event = new Tone.ToneEvent();
  event.humanize = true;
  ```
* set humanize(variation): void
* #### Parameters

  + variation: boolean | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### loop

* get loop(): number | boolean
* If the note should loop or not
  between ToneEvent.loopStart and
  ToneEvent.loopEnd. If set to true,
  the event will loop indefinitely,
  if set to a number greater than 1
  it will play a specific number of
  times, if set to false, 0 or 1, the
  part will only play once.

  #### Returns number | boolean
* set loop(loop): void
* #### Parameters

  + loop: number | boolean

  #### Returns void

### loopEnd

* get loopEnd(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The loopEnd point is the time the event will loop
  if ToneEvent.loop is true.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set loopEnd(loopEnd): void
* #### Parameters

  + loopEnd: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### loopStart

* get loopStart(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The time when the loop should start.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set loopStart(loopStart): void
* #### Parameters

  + loopStart: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### playbackRate

* get playbackRate(): number
* The playback rate of the event. Defaults to 1.

  #### Returns number

  #### Example

  ```ts
  const note = new Tone.ToneEvent();
  note.loop = true;
  // repeat the note twice as fast
  note.playbackRate = 2;
  ```
* set playbackRate(rate): void
* #### Parameters

  + rate: number

  #### Returns void

### probability

* get probability(): number
* The probability of the notes being triggered.

  #### Returns number
* set probability(prob): void
* #### Parameters

  + prob: number

  #### Returns void

### progress

* get progress(): number
* The current progress of the loop interval.
  Returns 0 if the event is not started yet or
  it is not set to loop.

  #### Returns number

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### startOffset

* get startOffset(): number
* The start from the scheduled start time.

  #### Returns number
* set startOffset(offset): void
* #### Parameters

  + offset: number

  #### Returns void

### state

* get state(): [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)
* Returns the playback state of the note, either "started" or "stopped".

  #### Returns [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)

## Methods

### cancel

* cancel(time?): this
* Cancel all scheduled events greater than or equal to the given time

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.1.22/classes/TransportTimeClass.html)<number>

    The time after which events will be cancel.

  #### Returns this

### dispose

* dispose(): this
* #### Returns this

### get

* get(): [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>
* Get the object's attributes.

  #### Returns [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>

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

  + props: RecursivePartial<[ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor.new_ToneEvent.ValueType-1)>>

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
* Start the note at the given time.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.1.22/classes/TransportTimeClass.html)<number>

    When the event should start.

  #### Returns this

### stop

* stop(time?): this
* Stop the Event at the given time.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.1.22/classes/TransportTimeClass.html)<number>

    When the event should stop.

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

* getDefaults(): [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<any>
* #### Returns [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<any>

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#constructor)[callback](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#callback)[context](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#debug)[mute](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#mute)[name](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#name)[value](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#value)[version](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#blockTime)[disposed](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#disposed)[humanize](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#humanize)[loop](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#loop)[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#loopEnd)[loopStart](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#loopStart)[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#playbackRate)[probability](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#probability)[progress](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#progress)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#sampleTime)[startOffset](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#startOffset)[state](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#state)[cancel](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#cancel)[dispose](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#dispose)[get](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#stop)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toFrequency)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html#getDefaults)
