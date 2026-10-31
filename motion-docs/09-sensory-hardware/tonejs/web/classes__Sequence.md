---
source: https://tonejs.github.io/docs/15.1.22/classes/Sequence.html
title: "Sequence | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Sequence](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html)

# Class Sequence<ValueType>

A sequence is an alternate notation of a part. Instead
of passing in an array of [time, event] pairs, pass
in an array of events which will be spaced at the
given subdivision. Sub-arrays will subdivide that beat
by the number of items are in the array.
Sequence notation inspiration from [Tidal Cycles](http://tidalcycles.org/)

#### Example

```ts
const synth = new Tone.Synth().toDestination();
const seq = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 0.1, time);
    // subdivisions are given as subarrays
}, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]).start(0);
Tone.Transport.start();
```

#### Type Parameters

* ValueType = any

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Sequence))

* [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>
  + Sequence

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor)

### Properties

[callback](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#callback)
[context](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#debug)
[mute](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#mute)
[name](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#name)
[value](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#value)
[version](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#blockTime)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#disposed)
[events](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#events)
[humanize](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#humanize)
[length](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#length)
[loop](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#loop)
[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#loopEnd)
[loopStart](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#loopStart)
[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#playbackRate)
[probability](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#probability)
[progress](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#progress)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#sampleTime)
[startOffset](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#startOffset)
[state](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#state)
[subdivision](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#subdivision)

### Methods

[cancel](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#cancel)
[clear](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#clear)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#dispose)
[get](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#stop)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toFrequency)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#getDefaults)

## Constructors

### constructor

* new Sequence<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>(callback?, events?, subdivision?): [Sequence](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>
* #### Type Parameters

  + ValueType = any

  #### Parameters

  + `Optional` callback: [ToneEventCallback](https://tonejs.github.io/docs/15.1.22/types/ToneEventCallback.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>

    The callback to invoke with every note
  + `Optional` events: SequenceEventDescription<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>

    The sequence of events
  + `Optional` subdivision: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The subdivision between which events are placed.

  #### Returns [Sequence](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>
* new Sequence<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence-1.ValueType-2)>(options?): [Sequence](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>
* #### Type Parameters

  + ValueType = any

  #### Parameters

  + `Optional` options: Partial<SequenceOptions<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>>

  #### Returns [Sequence](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>

## Properties

### callback

callback: [ToneEventCallback](https://tonejs.github.io/docs/15.1.22/types/ToneEventCallback.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>

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

name: string = "Sequence"

### value

value: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)

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

### events

* get events(): any[]
* The sequence

  #### Returns any[]
* set events(s): void
* #### Parameters

  + s: any[]

  #### Returns void

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

### length

* get length(): number
* The number of scheduled events

  #### Returns number

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
* set loop(l): void
* #### Parameters

  + l: number | boolean

  #### Returns void

### loopEnd

* get loopEnd(): number
* The index at which the sequence should end looping

  #### Returns number
* set loopEnd(index): void
* #### Parameters

  + index: number

  #### Returns void

### loopStart

* get loopStart(): number
* The index at which the sequence should start looping

  #### Returns number
* set loopStart(index): void
* #### Parameters

  + index: number

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
* set startOffset(start): void
* #### Parameters

  + start: number

  #### Returns void

### state

* get state(): [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)
* Returns the playback state of the note, either "started" or "stopped".

  #### Returns [BasicPlaybackState](https://tonejs.github.io/docs/15.1.22/types/BasicPlaybackState.html)

### subdivision

* get subdivision(): number
* The subdivision of the sequence. This can only be
  set in the constructor. The subdivision is the
  interval between successive steps.

  #### Returns number

## Methods

### cancel

* cancel(time?): this
* Cancel all scheduled events greater than or equal to the given time

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.1.22/classes/TransportTimeClass.html)<number>

    The time after which events will be cancel.

  #### Returns this

### clear

* clear(): this
* Clear all of the events

  #### Returns this

### dispose

* dispose(): this
* #### Returns this

### get

* get(): [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>
* Get the object's attributes.

  #### Returns [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>

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

  + props: RecursivePartial<[ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor.new_Sequence.ValueType-1)>>

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

* start(time?, offset?): this
* Start the part at the given time.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When to start the part.
  + `Optional` offset: number

    The offset index to start at

  #### Returns this

### stop

* stop(time?): this
* Stop the part at the given time.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When to stop the part.

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

* getDefaults(): SequenceOptions<any>
* #### Returns SequenceOptions<any>

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#constructor)[callback](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#callback)[context](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#debug)[mute](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#mute)[name](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#name)[value](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#value)[version](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#blockTime)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#disposed)[events](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#events)[humanize](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#humanize)[length](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#length)[loop](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#loop)[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#loopEnd)[loopStart](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#loopStart)[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#playbackRate)[probability](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#probability)[progress](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#progress)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#sampleTime)[startOffset](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#startOffset)[state](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#state)[subdivision](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#subdivision)[cancel](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#cancel)[clear](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#clear)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#dispose)[get](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#stop)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toFrequency)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Sequence.html#getDefaults)
