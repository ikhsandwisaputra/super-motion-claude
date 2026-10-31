---
source: https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html
title: "TransportInstance | Tone.js"
fetched: 2026-10-28
---

[Tone.js](https://tonejs.github.io/docs/15.5.62/index.html)

Preparing search index...

* [TransportInstance](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html)

# Interface TransportInstance

Transport for timing musical events.

Supports tempo curves and time changes.

Unlike browser-based timing (setInterval, requestAnimationFrame),
Transport timing events pass in the exact time of the scheduled event
in the argument of the callback function.

A single transport is created for you when the library is initialized.

The transport emits "start", "stop", "pause", and "loop" events.

#### Example

```
const osc = new Tone.Oscillator().toDestination();
// Repeated event every 8th note.
Tone.getTransport().scheduleRepeat((time) => {
	// Use the callback time to schedule events.
	osc.start(time).stop(time + 0.1);
}, "8n");
// Transport must be started before it starts invoking events.
Tone.getTransport().start();
```

interface TransportInstance {
    [bpm](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#bpm): TickParam<"bpm">;
    [context](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#context): [BaseContext](https://tonejs.github.io/docs/15.5.62/classes/BaseContext.html);
    [debug](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#debug): boolean;
    [emit](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#emit): (event: any, ...args: any[]) => this;
    [name](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#name): string;
    [off](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#off): (
        event: TransportEventNames,
        callback?: (...args: any[]) => void,
    ) => this;
    [on](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#on): (
        event: TransportEventNames,
        callback: (...args: any[]) => void,
    ) => this;
    [once](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#once): (
        event: TransportEventNames,
        callback: (...args: any[]) => void,
    ) => this;
    get [blockTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#blocktimeblocktime)(): number;
    get [disposed](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#disposeddisposed)(): boolean;
    get [loop](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#looploop)(): boolean;
    set [loop](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#looploop-1)(loop: boolean): void;
    get [loopEnd](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopendloopend)(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html);
    set [loopEnd](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopendloopend-1)(endPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void;
    get [loopStart](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopstartloopstart)(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html);
    set [loopStart](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopstartloopstart-1)(startPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void;
    get [position](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#positionposition)(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html);
    set [position](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#positionposition-1)(progress: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void;
    get [PPQ](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ppqppq)(): number;
    set [PPQ](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ppqppq-1)(ppq: number): void;
    get [progress](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#progressprogress)(): number;
    get [sampleTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#sampletimesampletime)(): number;
    get [seconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#secondsseconds)(): number;
    set [seconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#secondsseconds-1)(s: number): void;
    get [state](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#statestate)(): [PlaybackState](https://tonejs.github.io/docs/15.5.62/types/PlaybackState.html);
    get [swing](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swingswing)(): number;
    set [swing](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swingswing-1)(amount: number): void;
    get [swingSubdivision](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swingsubdivisionswingsubdivision)(): [Subdivision](https://tonejs.github.io/docs/15.5.62/types/Unit.Subdivision.html);
    set [swingSubdivision](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swingsubdivisionswingsubdivision-1)(subdivision: [Subdivision](https://tonejs.github.io/docs/15.5.62/types/Unit.Subdivision.html)): void;
    get [ticks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ticksticks)(): number;
    set [ticks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ticksticks-1)(t: number): void;
    get [timeSignature](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#timesignaturetimesignature)(): [TimeSignature](https://tonejs.github.io/docs/15.5.62/types/Unit.TimeSignature.html);
    set [timeSignature](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#timesignaturetimesignature-1)(timeSig: [TimeSignature](https://tonejs.github.io/docs/15.5.62/types/Unit.TimeSignature.html)): void;
    [cancel](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#cancel-1)(after?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [clear](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#clear-1)(eventId: number): this;
    [dispose](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#dispose-1)(): this;
    [get](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#get-1)(): TransportOptions;
    [getSecondsAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#getsecondsattime-1)(time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number;
    [getTicksAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#getticksattime-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number;
    [immediate](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#immediate-1)(): number;
    [nextSubdivision](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#nextsubdivision-1)(subdivision?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number;
    [now](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#now-1)(): number;
    [pause](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#pause-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [schedule](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#schedule-1)(
        callback: TransportCallback,
        time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>,
    ): number;
    [scheduleOnce](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#scheduleonce-1)(
        callback: TransportCallback,
        time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>,
    ): number;
    [scheduleRepeat](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#schedulerepeat-1)(
        callback: TransportCallback,
        interval: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.5.62/classes/TimeClass.html)<number, TimeBaseUnit>,
        startTime?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>,
        duration?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html),
    ): number;
    [set](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#set-1)(props: RecursivePartial<Options>): this;
    [setLoopPoints](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setlooppoints-1)(startPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), endPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [setSecondsAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setsecondsattime-1)(seconds: number, time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [setTicksAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setticksattime-1)(ticks: number, time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [start](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#start-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), offset?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [stop](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#stop-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [syncSignal](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#syncsignal-1)(signal: [Signal](https://tonejs.github.io/docs/15.5.62/classes/Signal.html)<any>, ratio?: number): this;
    [toFrequency](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#tofrequency-1)(freq: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.5.62/types/Unit.Frequency.html)): number;
    [toggle](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toggle-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this;
    [toSeconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toseconds-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number;
    [toString](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#tostring-1)(): string;
    [toTicks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toticks-1)(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.5.62/classes/TimeClass.html)<number, TimeBaseUnit>): number;
    [unsyncSignal](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#unsyncsignal-1)(signal: [Signal](https://tonejs.github.io/docs/15.5.62/classes/Signal.html)<any>): this;
}

#### Hierarchy

* ToneWithContext<TransportOptions>
  + TransportInstance

#### Implements

* [Emitter](https://tonejs.github.io/docs/15.5.62/classes/Emitter.html)<TransportEventNames>

##### Index

### Properties

[bpm](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#bpm)
[context](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#context)
[debug](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#debug)
[emit](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#emit)
[name](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#name)
[off](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#off)
[on](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#on)
[once](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#once)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#blocktime)
[disposed](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#disposed)
[loop](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loop)
[loopEnd](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopend)
[loopStart](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopstart)
[position](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#position)
[PPQ](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ppq)
[progress](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#progress)
[sampleTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#sampletime)
[seconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#seconds)
[state](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#state)
[swing](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swing)
[swingSubdivision](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swingsubdivision)
[ticks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ticks)
[timeSignature](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#timesignature)

### Methods

[cancel](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#cancel)
[clear](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#clear)
[dispose](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#dispose)
[get](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#get)
[getSecondsAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#getsecondsattime)
[getTicksAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#getticksattime)
[immediate](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#immediate)
[nextSubdivision](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#nextsubdivision)
[now](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#now)
[pause](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#pause)
[schedule](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#schedule)
[scheduleOnce](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#scheduleonce)
[scheduleRepeat](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#schedulerepeat)
[set](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#set)
[setLoopPoints](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setlooppoints)
[setSecondsAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setsecondsattime)
[setTicksAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setticksattime)
[start](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#start)
[stop](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#stop)
[syncSignal](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#syncsignal)
[toFrequency](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#tofrequency)
[toggle](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toggle)
[toSeconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toseconds)
[toString](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#tostring)
[toTicks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toticks)
[unsyncSignal](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#unsyncsignal)

## Properties

### bpm

bpm: TickParam<"bpm">

The Beats Per Minute of the Transport.

#### Example

```
const osc = new Tone.Oscillator().toDestination();
Tone.getTransport().bpm.value = 80;
// start/stop the oscillator every quarter note
Tone.getTransport().scheduleRepeat(time => {
	osc.start(time).stop(time + 0.1);
}, "4n");
Tone.getTransport().start();
// ramp the bpm to 120 over 10 seconds
Tone.getTransport().bpm.rampTo(120, 10);
```

### `Readonly`context

context: [BaseContext](https://tonejs.github.io/docs/15.5.62/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### emit

emit: (event: any, ...args: any[]) => this

Invoke all of the callbacks bound to the event
with any arguments passed in.

#### Type Declaration

* + (event: any, ...args: any[]): this
  + #### Parameters

    - event: any

      The name of the event.
    - ...args: any[]

      The arguments to pass to the functions listening.

    #### Returns this

### `Readonly`name

name: string = "Transport"

The name of the class

### off

off: (event: TransportEventNames, callback?: (...args: any[]) => void) => this

Remove the event listener.

#### Type Declaration

* + (event: TransportEventNames, callback?: (...args: any[]) => void): this
  + #### Parameters

    - event: TransportEventNames

      The event to stop listening to.
    - `Optional`callback: (...args: any[]) => void

      The callback which was bound to the event with Emitter.on.
      If no callback is given, all callbacks events are removed.

    #### Returns this

### on

on: (event: TransportEventNames, callback: (...args: any[]) => void) => this

Bind a callback to a specific event.

#### Type Declaration

* + (event: TransportEventNames, callback: (...args: any[]) => void): this
  + #### Parameters

    - event: TransportEventNames

      The name of the event to listen for.
    - callback: (...args: any[]) => void

      The callback to invoke when the event is emitted

    #### Returns this

### once

once: (event: TransportEventNames, callback: (...args: any[]) => void) => this

Bind a callback which is only invoked once

#### Type Declaration

* + (event: TransportEventNames, callback: (...args: any[]) => void): this
  + #### Parameters

    - event: TransportEventNames

      The name of the event to listen for.
    - callback: (...args: any[]) => void

      The callback to invoke when the event is emitted

    #### Returns this

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

### loop

* get loop(): boolean

  If the transport loops or not.

  #### Returns boolean
* set loop(loop: boolean): void

  #### Parameters

  + loop: boolean

  #### Returns void

### loopEnd

* get loopEnd(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  When the Transport.loop = true, this is the ending position of the loop.

  #### Returns [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)
* set loopEnd(endPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void

  #### Parameters

  + endPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns void

### loopStart

* get loopStart(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  When the Transport.loop = true, this is the starting position of the loop.

  #### Returns [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)
* set loopStart(startPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void

  #### Parameters

  + startPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns void

### position

* get position(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  The Transport's position in Bars:Beats:Sixteenths.
  Setting the value will jump to that position right away.

  #### Returns [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)
* set position(progress: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void

  #### Parameters

  + progress: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns void

### PPQ

* get PPQ(): number

  Pulses Per Quarter note. This is the smallest resolution
  the Transport timing supports. This should be set once
  on initialization and not set again. Changing this value
  after other objects have been created can cause problems.

  #### Returns number
* set PPQ(ppq: number): void

  #### Parameters

  + ppq: number

  #### Returns void

### progress

* get progress(): number

  The Transport's loop position as a normalized value. Always
  returns 0 if the Transport.loop = false.

  #### Returns number

### sampleTime

* get sampleTime(): number

  The duration in seconds of one sample.

  #### Returns number

### seconds

* get seconds(): number

  The Transport's position in seconds.
  Setting the value will jump to that position right away.

  #### Returns number
* set seconds(s: number): void

  #### Parameters

  + s: number

  #### Returns void

### state

* get state(): [PlaybackState](https://tonejs.github.io/docs/15.5.62/types/PlaybackState.html)

  The playback state of the transport, either "started", "stopped", or "paused".

  #### Returns [PlaybackState](https://tonejs.github.io/docs/15.5.62/types/PlaybackState.html)

### swing

* get swing(): number

  The swing value. Between 0-1 where 1 equal to the note + half the subdivision.

  #### Returns number
* set swing(amount: number): void

  #### Parameters

  + amount: number

  #### Returns void

### swingSubdivision

* get swingSubdivision(): [Subdivision](https://tonejs.github.io/docs/15.5.62/types/Unit.Subdivision.html)

  Set the subdivision which the swing will be applied to.
  The default value is an 8th note. Value must be less
  than a quarter note.

  #### Returns [Subdivision](https://tonejs.github.io/docs/15.5.62/types/Unit.Subdivision.html)
* set swingSubdivision(subdivision: [Subdivision](https://tonejs.github.io/docs/15.5.62/types/Unit.Subdivision.html)): void

  #### Parameters

  + subdivision: [Subdivision](https://tonejs.github.io/docs/15.5.62/types/Unit.Subdivision.html)

  #### Returns void

### ticks

* get ticks(): number

  The Transport's current tick position.

  #### Returns number
* set ticks(t: number): void

  #### Parameters

  + t: number

  #### Returns void

### timeSignature

* get timeSignature(): [TimeSignature](https://tonejs.github.io/docs/15.5.62/types/Unit.TimeSignature.html)

  The time signature as just the numerator over 4.
  For example 4/4 would be just 4 and 6/8 would be 3.

  #### Returns [TimeSignature](https://tonejs.github.io/docs/15.5.62/types/Unit.TimeSignature.html)

  #### Example

  ```
  // common time
  Tone.getTransport().timeSignature = 4;
  // 7/8
  Tone.getTransport().timeSignature = [7, 8];
  // this will be reduced to a single number
  Tone.getTransport().timeSignature; // returns 3.5
  ```
* set timeSignature(timeSig: [TimeSignature](https://tonejs.github.io/docs/15.5.62/types/Unit.TimeSignature.html)): void

  #### Parameters

  + timeSig: [TimeSignature](https://tonejs.github.io/docs/15.5.62/types/Unit.TimeSignature.html)

  #### Returns void

## Methods

### cancel

* cancel(after?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Remove scheduled events from the timeline after
  the given time. Repeated events will be removed
  if their startTime is after the given time

  #### Parameters

  + after: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) = 0

    Clear all events after this time.

  #### Returns this

### clear

* clear(eventId: number): this

  Clear the passed in event id from the timeline

  #### Parameters

  + eventId: number

    The id of the event.

  #### Returns this

### dispose

* dispose(): this

  Clean up.

  #### Returns this

### get

* get(): TransportOptions

  Get the object's attributes.

  #### Returns TransportOptions

  #### Example

  ```
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getSecondsAtTime

* getSecondsAtTime(time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number

  Return the elapsed seconds at the given time.

  #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    When to get the elapsed seconds

  #### Returns number

  The number of elapsed seconds

### getTicksAtTime

* getTicksAtTime(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number

  Get the clock's ticks at the given time.

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    When to get the tick value

  #### Returns number

  The tick value at the given time.

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

### nextSubdivision

* nextSubdivision(subdivision?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): number

  Returns the time aligned to the next subdivision
  of the Transport. If the Transport is not started,
  it will return 0.
  Note: this will not work precisely during tempo ramps.

  #### Parameters

  + `Optional`subdivision: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The subdivision to quantize to

  #### Returns number

  The context time of the next subdivision.

  #### Example

  ```
  // the transport must be started, otherwise returns 0
  Tone.getTransport().start();
  Tone.getTransport().nextSubdivision("4n");
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

### pause

* pause(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Pause the transport and all sources synced to the transport.

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns this

### schedule

* schedule(
      callback: TransportCallback,
      time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>,
  ): number

  Schedule an event to be invoked at a specific time.

  #### Parameters

  + callback: TransportCallback

    The callback to invoke at the given time.
  + time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>

    The time to invoke the callback at.

  #### Returns number

  The ID of the event, which can be used to cancel the event.

  #### Example

  ```
  // Schedule an event on the 16th measure.
  Tone.getTransport().schedule((time) => {
  	// Invoked on measure 16.
  	console.log("measure 16!");
  }, "16:0:0");
  ```

### scheduleOnce

* scheduleOnce(
      callback: TransportCallback,
      time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>,
  ): number

  Schedule an event that will be removed after it is invoked.

  #### Parameters

  + callback: TransportCallback

    The callback to invoke once.
  + time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>

    The time the callback should be invoked.

  #### Returns number

  The ID of the scheduled event.

### scheduleRepeat

* scheduleRepeat(
      callback: TransportCallback,
      interval: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.5.62/classes/TimeClass.html)<number, TimeBaseUnit>,
      startTime?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>,
      duration?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html),
  ): number

  Schedule a repeated event.

  The event will fire at the `interval` starting at the `startTime` and for the specified `duration`.

  #### Parameters

  + callback: TransportCallback

    The callback to invoke.
  + interval: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.5.62/classes/TimeClass.html)<number, TimeBaseUnit>

    The duration between successive callbacks.
  + `Optional`startTime: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) | [TransportTimeClass](https://tonejs.github.io/docs/15.5.62/classes/TransportTimeClass.html)<number>

    When the event should start.
  + duration: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html) = Infinity

    How long the event should repeat.

  #### Returns number

  The ID of the scheduled event. Use this to cancel the event.

  #### Example

  ```
  const osc = new Tone.Oscillator().toDestination().start();
  // A callback invoked every eighth note after the first measure.
  Tone.getTransport().scheduleRepeat((time) => {
  	osc.start(time).stop(time + 0.1);
  }, "8n", "1m");
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

### setLoopPoints

* setLoopPoints(startPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), endPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Set the loop start and stop at the same time.

  #### Parameters

  + startPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)
  + endPosition: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns this

  #### Example

  ```
  // loop over the first measure
  Tone.getTransport().setLoopPoints(0, "1m");
  Tone.getTransport().loop = true;
  ```

### setSecondsAtTime

* setSecondsAtTime(seconds: number, time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Set the Transport's [seconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setsecondsattime-1) value at the given time.

  #### Parameters

  + seconds: number

    The seconds value to set
  + time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The Context time at which to set the seconds value

  #### Returns this

### setTicksAtTime

* setTicksAtTime(ticks: number, time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Set the Transport's [ticks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setticksattime-1) value at the given time

  #### Parameters

  + ticks: number

    The tick value to set
  + time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The Context time at which to set the seconds value

  #### Returns this

### start

* start(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), offset?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Start the transport and all sources synced to the transport.

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The time when the transport should start.
  + `Optional`offset: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The timeline offset to start the transport from.

  #### Returns this

  #### Example

  ```
  // Start the transport in one second, beginning at the start of the 5th measure.
  Tone.getTransport().start("+1", "4:0:0");
  ```

### stop

* stop(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Stop the transport and all sources synced to the transport.

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The time when the transport should stop.

  #### Returns this

  #### Example

  ```
  Tone.getTransport().stop();
  ```

### syncSignal

* syncSignal(signal: [Signal](https://tonejs.github.io/docs/15.5.62/classes/Signal.html)<any>, ratio?: number): this

  Attaches the signal to the tempo control signal so that
  any changes in the tempo will change the signal in the same
  ratio.

  #### Parameters

  + signal: [Signal](https://tonejs.github.io/docs/15.5.62/classes/Signal.html)<any>
  + `Optional`ratio: number

    Optionally pass in the ratio between the two signals.
    Otherwise it will be computed based on their current values.

  #### Returns this

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

### toggle

* toggle(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Toggle the current state of the transport.

  If it is started, it will stop it. If it is stopped, it will start it.

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The time of the event.

  #### Returns this

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

### unsyncSignal

* unsyncSignal(signal: [Signal](https://tonejs.github.io/docs/15.5.62/classes/Signal.html)<any>): this

  Unsyncs a previously synced signal from the transport's control.

  #### Parameters

  + signal: [Signal](https://tonejs.github.io/docs/15.5.62/classes/Signal.html)<any>

  #### Returns this

  #### See

  [syncSignal](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#syncsignal).

### Settings

Member Visibility

* Inherited
* External

ThemeOSLightDark

### On This Page

Properties

[bpm](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#bpm)[context](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#context)[debug](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#debug)[emit](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#emit)[name](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#name)[off](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#off)[on](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#on)[once](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#once)

Accessors

[blockTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#blocktime)[disposed](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#disposed)[loop](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loop)[loopEnd](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopend)[loopStart](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#loopstart)[position](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#position)[PPQ](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ppq)[progress](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#progress)[sampleTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#sampletime)[seconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#seconds)[state](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#state)[swing](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swing)[swingSubdivision](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#swingsubdivision)[ticks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#ticks)[timeSignature](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#timesignature)

Methods

[cancel](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#cancel)[clear](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#clear)[dispose](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#dispose)[get](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#get)[getSecondsAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#getsecondsattime)[getTicksAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#getticksattime)[immediate](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#immediate)[nextSubdivision](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#nextsubdivision)[now](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#now)[pause](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#pause)[schedule](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#schedule)[scheduleOnce](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#scheduleonce)[scheduleRepeat](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#schedulerepeat)[set](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#set)[setLoopPoints](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setlooppoints)[setSecondsAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setsecondsattime)[setTicksAtTime](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#setticksattime)[start](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#start)[stop](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#stop)[syncSignal](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#syncsignal)[toFrequency](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#tofrequency)[toggle](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toggle)[toSeconds](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toseconds)[toString](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#tostring)[toTicks](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#toticks)[unsyncSignal](https://tonejs.github.io/docs/15.5.62/interfaces/TransportInstance.html#unsyncsignal)
