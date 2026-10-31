---
source: https://tonejs.github.io/docs/15.1.22/classes/Channel.html
title: "Channel | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Channel](https://tonejs.github.io/docs/15.1.22/classes/Channel.html)

# Class Channel

Channel provides a channel strip interface with volume, pan, solo and mute controls.

#### See

[PanVol](https://tonejs.github.io/docs/15.1.22/classes/PanVol.html) and [Solo](https://tonejs.github.io/docs/15.1.22/classes/Solo.html)

#### Example

```ts
// pan the incoming signal left and drop the volume 12db
const channel = new Tone.Channel(-0.25, -12);
```

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Channel))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[ChannelOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChannelOptions.html)>
  + Channel

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#output)
[pan](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#pan)
[volume](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#volume)
[version](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#disposed)
[mute](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#mute)
[muted](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#muted)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#sampleTime)
[solo](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#solo)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#now)
[receive](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#receive)
[send](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#send)
[set](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#set)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#getDefaults)

## Constructors

### constructor

* new Channel(volume?, pan?): [Channel](https://tonejs.github.io/docs/15.1.22/classes/Channel.html)
* #### Parameters

  + `Optional` volume: number

    The output volume.
  + `Optional` pan: number

    the initial pan

  #### Returns [Channel](https://tonejs.github.io/docs/15.1.22/classes/Channel.html)
* new Channel(options?): [Channel](https://tonejs.github.io/docs/15.1.22/classes/Channel.html)
* #### Parameters

  + `Optional` options: Partial<[ChannelOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChannelOptions.html)>

  #### Returns [Channel](https://tonejs.github.io/docs/15.1.22/classes/Channel.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` input

input: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)

The input node or nodes. If the object is a source,
it does not have any input and this.input is undefined.

### `Readonly` name

name: string = "Channel"

The name of the class

### `Readonly` output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

The output nodes. If the object is a sink,
it does not have any output and this.output is undefined.

### `Readonly` pan

pan: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"audioRange">

The L/R panning control. -1 = hard left, 1 = hard right.

#### Min

-1

#### Max

1

### `Readonly` volume

volume: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"decibels">

The volume control in decibels.

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

### mute

* get mute(): boolean
* Mute/unmute the volume

  #### Returns boolean
* set mute(mute): void
* #### Parameters

  + mute: boolean

  #### Returns void

### muted

* get muted(): boolean
* If the current instance is muted, i.e. another instance is soloed,
  or the channel is muted

  #### Returns boolean

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

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### solo

* get solo(): boolean
* Solo/unsolo the channel. Soloing is only relative to other [Channel](https://tonejs.github.io/docs/15.1.22/classes/Channel.html)s and [Solo](https://tonejs.github.io/docs/15.1.22/classes/Solo.html) instances

  #### Returns boolean
* set solo(solo): void
* #### Parameters

  + solo: boolean

  #### Returns void

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
* Dispose and disconnect

  #### Returns this

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

* get(): [ChannelOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChannelOptions.html)
* Get the object's attributes.

  #### Returns [ChannelOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChannelOptions.html)

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

### receive

* receive(name): this
* Receive audio from a channel which was connected with [send](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#send).

  #### Parameters

  + name: string

    The channel name to receive audio from.

  #### Returns this

### send

* send(name, volume?): [Gain](https://tonejs.github.io/docs/15.1.22/classes/Gain.html)<"decibels">
* Send audio to another channel using a string. `send` is a lot like
  [connect](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#connect), except it uses a string instead of an object. This can
  be useful in large applications to decouple sections since [send](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#send)
  and [receive](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#receive) can be invoked separately in order to connect an object

  #### Parameters

  + name: string

    The channel name to send the audio
  + volume: number = 0

    The amount of the signal to send.
    Defaults to 0db, i.e. send the entire signal

  #### Returns [Gain](https://tonejs.github.io/docs/15.1.22/classes/Gain.html)<"decibels">

  Returns the gain node of this connection.

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[ChannelOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChannelOptions.html)>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toDestination)

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

### `Static` getDefaults

* getDefaults(): [ChannelOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChannelOptions.html)
* #### Returns [ChannelOptions](https://tonejs.github.io/docs/15.1.22/interfaces/ChannelOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#output)[pan](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#pan)[volume](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#volume)[version](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#disposed)[mute](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#mute)[muted](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#muted)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#sampleTime)[solo](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#solo)[chain](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#now)[receive](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#receive)[send](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#send)[set](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#set)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Channel.html#getDefaults)
