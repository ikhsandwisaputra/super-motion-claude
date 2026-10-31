---
source: https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html
title: "GrainPlayer | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [GrainPlayer](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html)

# Class GrainPlayer

GrainPlayer implements [granular synthesis](https://en.wikipedia.org/wiki/Granular_synthesis).
Granular Synthesis enables you to adjust pitch and playback rate independently. The grainSize is the
amount of time each small chunk of audio is played for and the overlap is the
amount of crossfading transition time between successive grains.

#### Hierarchy

* Source<GrainPlayerOptions>
  + GrainPlayer

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#constructor)

### Properties

[buffer](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#buffer)
[context](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#debug)
[detune](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#detune)
[input](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#input)
[loop](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loop)
[name](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#name)
[onstop](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#onstop)
[output](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#output)
[volume](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#volume)
[version](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#disposed)
[grainSize](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#grainSize)
[loaded](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loaded)
[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loopEnd)
[loopStart](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loopStart)
[mute](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#mute)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#numberOfOutputs)
[overlap](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#overlap)
[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#playbackRate)
[reverse](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#reverse)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#sampleTime)
[state](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#state)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#now)
[restart](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#restart)
[set](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#set)
[start](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#start)
[stop](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#stop)
[sync](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#sync)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toTicks)
[unsync](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#unsync)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#getDefaults)

## Constructors

### constructor

* new GrainPlayer(url?, onload?): [GrainPlayer](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html)
* #### Parameters

  + `Optional` url: string | AudioBuffer | [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

    Either the AudioBuffer or the url from which to load the AudioBuffer
  + `Optional` onload: (() => void)

    The function to invoke when the buffer is loaded.

    - * (): void
      * #### Returns void

  #### Returns [GrainPlayer](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html)
* new GrainPlayer(options?): [GrainPlayer](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html)
* #### Parameters

  + `Optional` options: Partial<GrainPlayerOptions>

  #### Returns [GrainPlayer](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html)

## Properties

### buffer

buffer: [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

The audio buffer belonging to the player.

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### detune

detune: number

Adjust the pitch independently of the playbackRate.

### input

input: undefined = undefined

Sources have no inputs

### loop

loop: boolean

If the buffer should loop back to the loopStart when completed

### `Readonly` name

name: string = "GrainPlayer"

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

### grainSize

* get grainSize(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The size of each chunk of audio that the
  buffer is chopped into and played back at.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set grainSize(size): void
* #### Parameters

  + size: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### loaded

* get loaded(): boolean
* If all the buffer is loaded

  #### Returns boolean

### loopEnd

* get loopEnd(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The loop end time.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set loopEnd(time): void
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### loopStart

* get loopStart(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The loop start time.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set loopStart(time): void
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

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

### overlap

* get overlap(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* The duration of the cross-fade between successive grains.

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)
* set overlap(time): void
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns void

### playbackRate

* get playbackRate(): number
* The playback rate of the sample

  #### Returns number
* set playbackRate(rate): void
* #### Parameters

  + rate: number

  #### Returns void

### reverse

* get reverse(): boolean
* The direction the buffer should play in

  #### Returns boolean
* set reverse(rev): void
* #### Parameters

  + rev: boolean

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

## Methods

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

* get(): GrainPlayerOptions
* Get the object's attributes.

  #### Returns GrainPlayerOptions

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

### restart

* restart(time?, offset?, duration?): this
* Stop and then restart the player from the beginning (or offset)

  #### Parameters

  + `Optional` time: number

    When the player should start.
  + `Optional` offset: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The offset from the beginning of the sample to start at.
  + `Optional` duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    How long the sample should play. If no duration is given,
    it will default to the full length of the sample (minus any offset)

  #### Returns this

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<GrainPlayerOptions>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toDestination)

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

  [sync](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#sync)

### `Static` getDefaults

* getDefaults(): GrainPlayerOptions
* #### Returns GrainPlayerOptions

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#constructor)[buffer](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#buffer)[context](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#debug)[detune](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#detune)[input](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#input)[loop](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loop)[name](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#name)[onstop](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#onstop)[output](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#output)[volume](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#volume)[version](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#disposed)[grainSize](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#grainSize)[loaded](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loaded)[loopEnd](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loopEnd)[loopStart](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#loopStart)[mute](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#mute)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#numberOfOutputs)[overlap](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#overlap)[playbackRate](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#playbackRate)[reverse](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#reverse)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#sampleTime)[state](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#state)[chain](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#now)[restart](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#restart)[set](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#set)[start](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#start)[stop](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#stop)[sync](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#sync)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#toTicks)[unsync](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#unsync)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/GrainPlayer.html#getDefaults)
