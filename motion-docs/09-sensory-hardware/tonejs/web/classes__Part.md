---
source: https://tonejs.github.io/docs/15.1.22/classes/Part.html
title: "Part | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Part](https://tonejs.github.io/docs/15.1.22/classes/Part.html)

# Class Part<ValueType>

Part is a collection ToneEvents which can be started/stopped and looped as a single unit.

#### Example

```ts
const synth = new Tone.Synth().toDestination();
const part = new Tone.Part(((time, note) => {
    // the notes given as the second element in the array
    // will be passed in as the second argument
    synth.triggerAttackRelease(note, "8n", time);
}), [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]).start(0);
Tone.Transport.start();
```

#### Example

```ts
const synth = new Tone.Synth().toDestination();
// use an array of objects as long as the object has a "time" attribute
const part = new Tone.Part(((time, value) => {
    // the value is an object which contains both the note and the velocity
    synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
}), [{ time: 0, note: "C3", velocity: 0.9 },
    { time: "0:2", note: "C4", velocity: 0.5 }
]).start(0);
Tone.Transport.start();
```

#### Type Parameters

* ValueType = any

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Part))

* [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>
  + Part

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor)

### Properties

[callback](https://tonejs.github.io/docs/15.1.22/classes/Part.html#callback)
[context](https://tonejs.github.io/docs/15.1.22/classes/Part.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Part.html#debug)
[mute](https://tonejs.github.io/docs/15.1.22/classes/Part.html#mute)
[name](https://tonejs.github.io/docs/15.1.22/classes/Part.html#name)
[value](https://tonejs.github.io/docs/15.1.22/classes/Part.html#value)
[version](https://tonejs.github.io/docs/15.1.22/classes/Part.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Part.html#blockTime)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Part.html#disposed)
[humanize](https://tonejs.github.io/docs/15.1.22/classes/Part.html#humanize)
[length](https://tonejs.github.io/docs/15.1.22/classes/Part.html#length)
[loop](https://tonejs.github.io/docs/15.1.22/classes/Part.html#loop)
[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/Part.html#loopEnd)
[loopStart](https://tonejs.github.io/docs/15.1.22/classes/Part.html#loopStart)
[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/Part.html#playbackRate)
[probability](https://tonejs.github.io/docs/15.1.22/classes/Part.html#probability)
[progress](https://tonejs.github.io/docs/15.1.22/classes/Part.html#progress)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Part.html#sampleTime)
[startOffset](https://tonejs.github.io/docs/15.1.22/classes/Part.html#startOffset)
[state](https://tonejs.github.io/docs/15.1.22/classes/Part.html#state)

### Methods

[add](https://tonejs.github.io/docs/15.1.22/classes/Part.html#add)
[at](https://tonejs.github.io/docs/15.1.22/classes/Part.html#at)
[cancel](https://tonejs.github.io/docs/15.1.22/classes/Part.html#cancel)
[clear](https://tonejs.github.io/docs/15.1.22/classes/Part.html#clear)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Part.html#dispose)
[get](https://tonejs.github.io/docs/15.1.22/classes/Part.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Part.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Part.html#now)
[remove](https://tonejs.github.io/docs/15.1.22/classes/Part.html#remove)
[set](https://tonejs.github.io/docs/15.1.22/classes/Part.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/Part.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/Part.html#stop)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toFrequency)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Part.html#getDefaults)

## Constructors

### constructor

* new Part<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>(callback?, value?): [Part](https://tonejs.github.io/docs/15.1.22/classes/Part.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>
* #### Type Parameters

  + ValueType = any

  #### Parameters

  + `Optional` callback: [ToneEventCallback](https://tonejs.github.io/docs/15.1.22/types/ToneEventCallback.html)<CallbackType<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>>

    The callback to invoke on each event
  + `Optional` value: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)[]

    the array of events

  #### Returns [Part](https://tonejs.github.io/docs/15.1.22/classes/Part.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>
* new Part<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part-1.ValueType-2)>(options?): [Part](https://tonejs.github.io/docs/15.1.22/classes/Part.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>
* #### Type Parameters

  + ValueType = any

  #### Parameters

  + `Optional` options: Partial<PartOptions<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>>

  #### Returns [Part](https://tonejs.github.io/docs/15.1.22/classes/Part.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>

## Properties

### callback

callback: [ToneEventCallback](https://tonejs.github.io/docs/15.1.22/types/ToneEventCallback.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>

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

name: string = "Part"

### value

value: [ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)

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

### length

* get length(): number
* The number of scheduled notes in the part.

  #### Returns number

### loop

* get loop(): number | boolean
* If the part should loop or not
  between Part.loopStart and
  Part.loopEnd. If set to true,
  the part will loop indefinitely,
  if set to a number greater than 1
  it will play a specific number of
  times, if set to false, 0 or 1, the
  part will only play once.

  #### Returns number | boolean

  #### Example

  ```ts
  const part = new Tone.Part();
  // loop the part 8 times
  part.loop = 8;
  ```
* set loop(loop): void
* #### Parameters

  + loop: number | boolean

  #### Returns void

### loopEnd

* get loopEnd(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The loopEnd point determines when it will
  loop if Part.loop is true.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set loopEnd(loopEnd): void
* #### Parameters

  + loopEnd: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### loopStart

* get loopStart(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The loopStart point determines when it will
  loop if Part.loop is true.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set loopStart(loopStart): void
* #### Parameters

  + loopStart: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### playbackRate

* get playbackRate(): number
* The playback rate of the part

  #### Returns number
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

### add

* add(obj): this
* Add a an event to the part.

  #### Parameters

  + obj: {
        time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
        [key: string]: any;
    }
    - ##### [key: string]: any
    - ##### time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

  #### Example

  ```ts
  const part = new Tone.Part();
  part.add("1m", "C#+11");
  ```
* add(time, value?): this
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` value: any

  #### Returns this

### at

* at(time, value?): null | [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<any>
* Get/Set an Event's value at the given time.
  If a value is passed in and no event exists at
  the given time, one will be created with that value.
  If two events are at the same time, the first one will
  be returned.

  #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time of the event to get or set.
  + `Optional` value: any

    If a value is passed in, the value of the event at the given time will be set to it.

  #### Returns null | [ToneEvent](https://tonejs.github.io/docs/15.1.22/classes/ToneEvent.html)<any>

  #### Example

  ```ts
  const part = new Tone.Part();
  part.at("1m"); // returns the part at the first measure
  part.at("2m", "C2"); // set the value at "2m" to C2.
  // if an event didn't exist at that time, it will be created.
  ```

### cancel

* cancel(after?): this
* Cancel scheduled state change events: i.e. "start" and "stop".

  #### Parameters

  + `Optional` after: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.1.22/classes/TransportTimeClass.html)<number>

    The time after which to cancel the scheduled events.

  #### Returns this

### clear

* clear(): this
* Remove all of the notes from the group.

  #### Returns this

### dispose

* dispose(): this
* #### Returns this

### get

* get(): [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>
* Get the object's attributes.

  #### Returns [ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>

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

### remove

* remove(obj): this
* Remove an event from the part. If the event at that time is a Part,
  it will remove the entire part.

  #### Parameters

  + obj: {
        time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
        [key: string]: any;
    }
    - ##### [key: string]: any
    - ##### time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this
* remove(time, value?): this
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` value: any

  #### Returns this

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[ToneEventOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneEventOptions.html)<[ValueType](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor.new_Part.ValueType-1)>>

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
  + `Optional` offset: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The offset from the start of the part to begin playing at.

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

* getDefaults(): PartOptions<any>
* #### Returns PartOptions<any>

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Part.html#constructor)[callback](https://tonejs.github.io/docs/15.1.22/classes/Part.html#callback)[context](https://tonejs.github.io/docs/15.1.22/classes/Part.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Part.html#debug)[mute](https://tonejs.github.io/docs/15.1.22/classes/Part.html#mute)[name](https://tonejs.github.io/docs/15.1.22/classes/Part.html#name)[value](https://tonejs.github.io/docs/15.1.22/classes/Part.html#value)[version](https://tonejs.github.io/docs/15.1.22/classes/Part.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Part.html#blockTime)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Part.html#disposed)[humanize](https://tonejs.github.io/docs/15.1.22/classes/Part.html#humanize)[length](https://tonejs.github.io/docs/15.1.22/classes/Part.html#length)[loop](https://tonejs.github.io/docs/15.1.22/classes/Part.html#loop)[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/Part.html#loopEnd)[loopStart](https://tonejs.github.io/docs/15.1.22/classes/Part.html#loopStart)[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/Part.html#playbackRate)[probability](https://tonejs.github.io/docs/15.1.22/classes/Part.html#probability)[progress](https://tonejs.github.io/docs/15.1.22/classes/Part.html#progress)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Part.html#sampleTime)[startOffset](https://tonejs.github.io/docs/15.1.22/classes/Part.html#startOffset)[state](https://tonejs.github.io/docs/15.1.22/classes/Part.html#state)[add](https://tonejs.github.io/docs/15.1.22/classes/Part.html#add)[at](https://tonejs.github.io/docs/15.1.22/classes/Part.html#at)[cancel](https://tonejs.github.io/docs/15.1.22/classes/Part.html#cancel)[clear](https://tonejs.github.io/docs/15.1.22/classes/Part.html#clear)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Part.html#dispose)[get](https://tonejs.github.io/docs/15.1.22/classes/Part.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Part.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Part.html#now)[remove](https://tonejs.github.io/docs/15.1.22/classes/Part.html#remove)[set](https://tonejs.github.io/docs/15.1.22/classes/Part.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/Part.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/Part.html#stop)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toFrequency)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Part.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Part.html#getDefaults)
