---
source: https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html
title: "Oscillator | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Oscillator](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html)

# Class Oscillator

Oscillator supports a number of features including
phase rotation, multiple oscillator types (see Oscillator.type),
and Transport syncing (see Oscillator.syncFrequency).

#### Example

```ts
// make and start a 440hz sine tone
const osc = new Tone.Oscillator(440, "sine").toDestination().start();
```

#### Hierarchy

* Source<[ToneOscillatorOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneOscillatorOptions.html)>
  + Oscillator

#### Implements

* ToneOscillatorInterface

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#debug)
[detune](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#detune)
[frequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#frequency)
[input](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#name)
[onstop](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#onstop)
[output](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#output)
[volume](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#volume)
[version](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#version)

### Accessors

[baseType](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#baseType)
[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#disposed)
[mute](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#mute)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#numberOfOutputs)
[partialCount](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#partialCount)
[partials](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#partials)
[phase](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#phase)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#sampleTime)
[state](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#state)
[type](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#type)

### Methods

[asArray](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#asArray)
[chain](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#get)
[getInitialValue](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#getInitialValue)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#now)
[restart](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#restart)
[set](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#stop)
[sync](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#sync)
[syncFrequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#syncFrequency)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toTicks)
[unsync](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#unsync)
[unsyncFrequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#unsyncFrequency)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#getDefaults)

## Constructors

### constructor

* new Oscillator(frequency?, type?): [Oscillator](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html)
* #### Parameters

  + `Optional` frequency: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

    Starting frequency
  + `Optional` type: [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)

    The oscillator type. Read more about type below.

  #### Returns [Oscillator](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html)
* new Oscillator(options?): [Oscillator](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html)
* #### Parameters

  + `Optional` options: Partial<ToneOscillatorConstructorOptions>

  #### Returns [Oscillator](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### detune

detune: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"cents">

The detune control signal.

### frequency

frequency: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"frequency">

The frequency control.

### input

input: undefined = undefined

Sources have no inputs

### `Readonly` name

name: string = "Oscillator"

### onstop

onstop: onStopCallback

The callback to invoke when the source is stopped.

### output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

The output node

### volume

volume: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"decibels">

The volume of the output in decibels.

#### Example

```ts
const source = new Tone.PWMOscillator().toDestination();
source.volume.value = -6;
```

### `Static` version

version: string = version

The version number semver

## Accessors

### baseType

* get baseType(): OscillatorType
* #### Returns OscillatorType
* set baseType(baseType): void
* #### Parameters

  + baseType: OscillatorType

  #### Returns void

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

### mute

* get mute(): boolean
* Mute the output.

  #### Returns boolean

  #### Example

  ```ts
  const osc = new Tone.Oscillator().toDestination().start();
  // mute the output
  osc.mute = true;
  ```
* set mute(mute): void
* #### Parameters

  + mute: boolean

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

### partialCount

* get partialCount(): number
* #### Returns number
* set partialCount(p): void
* #### Parameters

  + p: number

  #### Returns void

### partials

* get partials(): number[]
* #### Returns number[]
* set partials(partials): void
* #### Parameters

  + partials: number[]

  #### Returns void

### phase

* get phase(): number
* #### Returns number
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

  #### Example

  ```ts
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/ahntone_c3.mp3", () => {
      player.start();
      console.log(player.state);
  }).toDestination();
  ```

### type

* get type(): [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)
* #### Returns [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)
* set type(type): void
* #### Parameters

  + type: [ToneOscillatorType](https://tonejs.github.io/docs/15.1.22/types/ToneOscillatorType.html)

  #### Returns void

## Methods

### asArray

* asArray(length?): Promise<Float32Array>
* #### Parameters

  + length: number = 1024

  #### Returns Promise<Float32Array>

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
* #### Returns this

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

* get(): [ToneOscillatorOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneOscillatorOptions.html)
* Get the object's attributes.

  #### Returns [ToneOscillatorOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneOscillatorOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getInitialValue

* getInitialValue(): number
* Returns the initial value of the oscillator when stopped.
  E.g. a "sine" oscillator with phase = 90 would return an initial value of -1.

  #### Returns number

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

### restart

* restart(time?, offset?, duration?): this
* Restart the source.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` offset: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[ToneOscillatorOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneOscillatorOptions.html)>

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

* start(time?, offset?, duration?): this
* Start the source at the specified time. If no time is given,
  start the source now.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the source should be started.
  + `Optional` offset: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
  + `Optional` duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

  #### Example

  ```ts
  const source = new Tone.Oscillator().toDestination();
  source.start("+0.5"); // starts the source 0.5 seconds from now
  ```

### stop

* stop(time?): this
* Stop the source at the specified time. If no time is given,
  stop the source now.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the source should be stopped.

  #### Returns this

  #### Example

  ```ts
  const source = new Tone.Oscillator().toDestination();
  source.start();
  source.stop("+0.5"); // stops the source 0.5 seconds from now
  ```

### sync

* sync(): this
* Sync the source to the Transport so that all subsequent
  calls to `start` and `stop` are synced to the TransportTime
  instead of the AudioContext time.

  #### Returns this

  #### Example

  ```ts
  const osc = new Tone.Oscillator().toDestination();
  // sync the source so that it plays between 0 and 0.3 on the Transport's timeline
  osc.sync().start(0).stop(0.3);
  // start the transport.
  Tone.Transport.start();
  // set it to loop once a second
  Tone.Transport.loop = true;
  Tone.Transport.loopEnd = 1;
  ```

### syncFrequency

* syncFrequency(): this
* Sync the signal to the Transport's bpm. Any changes to the transports bpm,
  will also affect the oscillators frequency.

  #### Returns this

  #### Example

  ```ts
  const osc = new Tone.Oscillator().toDestination().start();
  osc.frequency.value = 440;
  // the ratio between the bpm and the frequency will be maintained
  osc.syncFrequency();
  // double the tempo
  Tone.Transport.bpm.value *= 2;
  // the frequency of the oscillator is doubled to 880
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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toDestination)

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
* Unsync the source to the Transport.

  #### Returns this

  #### See

  [sync](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#sync)

### unsyncFrequency

* unsyncFrequency(): this
* Unsync the oscillator's frequency from the Transport.

  #### Returns this

  #### See

  [syncFrequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#syncFrequency)

### `Static` getDefaults

* getDefaults(): [ToneOscillatorOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneOscillatorOptions.html)
* #### Returns [ToneOscillatorOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ToneOscillatorOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#debug)[detune](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#detune)[frequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#frequency)[input](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#name)[onstop](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#onstop)[output](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#output)[volume](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#volume)[version](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#version)[baseType](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#baseType)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#disposed)[mute](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#mute)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#numberOfOutputs)[partialCount](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#partialCount)[partials](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#partials)[phase](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#phase)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#sampleTime)[state](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#state)[type](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#type)[asArray](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#asArray)[chain](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#get)[getInitialValue](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#getInitialValue)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#now)[restart](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#restart)[set](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#stop)[sync](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#sync)[syncFrequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#syncFrequency)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#toTicks)[unsync](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#unsync)[unsyncFrequency](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#unsyncFrequency)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Oscillator.html#getDefaults)
