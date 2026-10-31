---
source: https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html
title: "DrawInstance | Tone.js"
fetched: 2026-10-28
---

[Tone.js](https://tonejs.github.io/docs/15.5.62/index.html)

Preparing search index...

* [DrawInstance](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html)

# Interface DrawInstance

Draw is useful for synchronizing visuals and audio events.
Callbacks from Tone.Transport or any of the Tone.Event classes
always happen *before* the scheduled time and are not synchronized
to the animation frame so they are not good for triggering tightly
synchronized visuals and sound. Draw makes it easy to schedule
callbacks using the AudioContext time and uses requestAnimationFrame.

#### Example

```
Tone.Transport.schedule((time) => {
	// use the time argument to schedule a callback with Draw
	Tone.Draw.schedule(() => {
		// do drawing or DOM manipulation here
		console.log(time);
	}, time);
}, "+0.5");
Tone.Transport.start();
```

interface DrawInstance {
    [anticipation](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#anticipation): number;
    [context](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#context): [BaseContext](https://tonejs.github.io/docs/15.5.62/classes/BaseContext.html);
    [debug](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#debug): boolean;
    [expiration](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#expiration): number;
    [name](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#name): string;
    get [blockTime](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#blocktimeblocktime)(): number;
    get [disposed](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#disposeddisposed)(): boolean;
    get [sampleTime](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#sampletimesampletime)(): number;
    [cancel](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#cancel-1)(after?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [dispose](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#dispose-1)(): this;
    [get](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#get-1)(): ToneWithContextOptions;
    [immediate](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#immediate-1)(): number;
    [now](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#now-1)(): number;
    [schedule](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#schedule-1)(callback: () => void, time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [set](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#set-1)(props: RecursivePartial<Options>): this;
    [toFrequency](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#tofrequency-1)(freq: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.5.62/types/Unit.Frequency.html)): number;
    [toSeconds](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#toseconds-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number;
    [toString](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#tostring-1)(): string;
    [toTicks](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#toticks-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.5.62/classes/TimeClass.html)<number, TimeBaseUnit>): number;
}

#### Hierarchy

* ToneWithContext<ToneWithContextOptions>
  + DrawInstance

##### Index

### Properties

[anticipation](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#anticipation)
[context](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#context)
[debug](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#debug)
[expiration](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#expiration)
[name](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#name)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#blocktime)
[disposed](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#disposed)
[sampleTime](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#sampletime)

### Methods

[cancel](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#cancel)
[dispose](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#dispose)
[get](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#get)
[immediate](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#immediate)
[now](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#now)
[schedule](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#schedule)
[set](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#set)
[toFrequency](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#tofrequency)
[toSeconds](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#toseconds)
[toString](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#tostring)
[toTicks](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#toticks)

## Properties

### anticipation

anticipation: number = 0.008

The amount of time before the scheduled time
that the callback can be invoked. Default is
half the time of an animation frame (0.008 seconds).

### `Readonly`context

context: [BaseContext](https://tonejs.github.io/docs/15.5.62/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### expiration

expiration: number = 0.25

The duration after which events are not invoked.

### `Readonly`name

name: string = "Draw"

The name of the class

## Accessors

### blockTime

* get blockTime(): number

  The number of seconds of 1 processing block (128 samples)

  #### Returns number

  #### Example

  ```
  console.log(Tone.Destination.blockTime);
  ```

### disposed

* get disposed(): boolean

  Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### sampleTime

* get sampleTime(): number

  The duration in seconds of one sample.

  #### Returns number

## Methods

### cancel

* cancel(after?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Cancel events scheduled after the given time

  #### Parameters

  + `Optional`after: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    Time after which scheduled events will be removed from the scheduling timeline.

  #### Returns this

### dispose

* dispose(): this

  Dispose and disconnect

  #### Returns this

### get

* get(): ToneWithContextOptions

  Get the object's attributes.

  #### Returns ToneWithContextOptions

  #### Example

  ```
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### immediate

* immediate(): number

  Return the current time of the Context clock without any lookAhead.

  #### Returns number

  #### Example

  ```
  setInterval(() => {
  	console.log(Tone.immediate());
  }, 100);
  ```

### now

* now(): number

  Return the current time of the Context clock plus the lookAhead.

  #### Returns number

  #### Example

  ```
  setInterval(() => {
  	console.log(Tone.now());
  }, 100);
  ```

### schedule

* schedule(callback: () => void, time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Schedule a function at the given time to be invoked
  on the nearest animation frame.

  #### Parameters

  + callback: () => void

    Callback is invoked at the given time.
  + time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The time relative to the AudioContext time to invoke the callback.

  #### Returns this

  #### Example

  ```
  Tone.Transport.scheduleRepeat(time => {
  	Tone.Draw.schedule(() => console.log(time), time);
  }, 1);
  Tone.Transport.start();
  ```

### set

* set(props: RecursivePartial<Options>): this

  Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<Options>

  #### Returns this

  #### Example

  ```
  const filter = new Tone.Filter().toDestination();
  // set values using an object
  filter.set({
  	frequency: "C6",
  	type: "highpass"
  });
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/Analogsynth_octaves_highmid.mp3").connect(filter);
  player.autostart = true;
  ```

### toFrequency

* toFrequency(freq: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.5.62/types/Unit.Frequency.html)): number

  Convert the input to a frequency number

  #### Parameters

  + freq: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.5.62/types/Unit.Frequency.html)

  #### Returns number

  #### Example

  ```
  const gain = new Tone.Gain();
  console.log(gain.toFrequency("4n"));
  ```

### toSeconds

* toSeconds(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number

  Convert the incoming time to seconds.
  This is calculated against the current [TransportInstance](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html) bpm

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns number

  #### Example

  ```
  const gain = new Tone.Gain();
  setInterval(() => console.log(gain.toSeconds("4n")), 100);
  // ramp the tempo to 60 bpm over 30 seconds
  Tone.getTransport().bpm.rampTo(60, 30);
  ```

### toString

* toString(): string

  Convert the class to a string

  #### Returns string

  #### Example

  ```
  const osc = new Tone.Oscillator();
  console.log(osc.toString());
  ```

### toTicks

* toTicks(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.5.62/classes/TimeClass.html)<number, TimeBaseUnit>): number

  Convert the input time into ticks

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.5.62/classes/TimeClass.html)<number, TimeBaseUnit>

  #### Returns number

  #### Example

  ```
  const gain = new Tone.Gain();
  console.log(gain.toTicks("4n"));
  ```

### Settings

Member Visibility

* Inherited
* External

ThemeOSLightDark

### On This Page

Properties

[anticipation](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#anticipation)[context](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#context)[debug](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#debug)[expiration](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#expiration)[name](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#name)

Accessors

[blockTime](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#blocktime)[disposed](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#disposed)[sampleTime](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#sampletime)

Methods

[cancel](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#cancel)[dispose](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#dispose)[get](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#get)[immediate](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#immediate)[now](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#now)[schedule](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#schedule)[set](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#set)[toFrequency](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#tofrequency)[toSeconds](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#toseconds)[toString](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#tostring)[toTicks](https://tonejs.github.io/docs/15.5.62/interfaces/DrawInstance.html#toticks)
