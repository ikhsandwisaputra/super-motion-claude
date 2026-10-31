---
source: https://tonejs.github.io/docs/15.5.62/classes/Player.html
title: "Player | Tone.js"
fetched: 2026-10-28
---

[Tone.js](https://tonejs.github.io/docs/15.5.62/index.html)

Preparing search index...

* [Player](https://tonejs.github.io/docs/15.5.62/classes/Player.html)

# Class Player

Player is an audio file player with start, loop, and stop functions.

#### Example

```
const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
// play as soon as the buffer is loaded
player.autostart = true;
```

#### Hierarchy

* Source<[PlayerOptions](https://tonejs.github.io/docs/15.5.62/interfaces/PlayerOptions.html)>
  + Player

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.5.62/classes/Player.html#constructor)

### Properties

[autostart](https://tonejs.github.io/docs/15.5.62/classes/Player.html#autostart)
[context](https://tonejs.github.io/docs/15.5.62/classes/Player.html#context)
[debug](https://tonejs.github.io/docs/15.5.62/classes/Player.html#debug)
[fadeIn](https://tonejs.github.io/docs/15.5.62/classes/Player.html#fadein)
[fadeOut](https://tonejs.github.io/docs/15.5.62/classes/Player.html#fadeout)
[input](https://tonejs.github.io/docs/15.5.62/classes/Player.html#input)
[name](https://tonejs.github.io/docs/15.5.62/classes/Player.html#name)
[onstop](https://tonejs.github.io/docs/15.5.62/classes/Player.html#onstop)
[output](https://tonejs.github.io/docs/15.5.62/classes/Player.html#output)
[volume](https://tonejs.github.io/docs/15.5.62/classes/Player.html#volume)
[version](https://tonejs.github.io/docs/15.5.62/classes/Player.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.5.62/classes/Player.html#blocktime)
[buffer](https://tonejs.github.io/docs/15.5.62/classes/Player.html#buffer)
[channelCount](https://tonejs.github.io/docs/15.5.62/classes/Player.html#channelcount)
[channelCountMode](https://tonejs.github.io/docs/15.5.62/classes/Player.html#channelcountmode)
[channelInterpretation](https://tonejs.github.io/docs/15.5.62/classes/Player.html#channelinterpretation)
[disposed](https://tonejs.github.io/docs/15.5.62/classes/Player.html#disposed)
[loaded](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loaded)
[loop](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loop)
[loopEnd](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loopend)
[loopStart](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loopstart)
[mute](https://tonejs.github.io/docs/15.5.62/classes/Player.html#mute)
[numberOfInputs](https://tonejs.github.io/docs/15.5.62/classes/Player.html#numberofinputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.5.62/classes/Player.html#numberofoutputs)
[playbackRate](https://tonejs.github.io/docs/15.5.62/classes/Player.html#playbackrate)
[progress](https://tonejs.github.io/docs/15.5.62/classes/Player.html#progress)
[reverse](https://tonejs.github.io/docs/15.5.62/classes/Player.html#reverse)
[sampleTime](https://tonejs.github.io/docs/15.5.62/classes/Player.html#sampletime)
[state](https://tonejs.github.io/docs/15.5.62/classes/Player.html#state)

### Methods

[chain](https://tonejs.github.io/docs/15.5.62/classes/Player.html#chain)
[connect](https://tonejs.github.io/docs/15.5.62/classes/Player.html#connect)
[disconnect](https://tonejs.github.io/docs/15.5.62/classes/Player.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.5.62/classes/Player.html#dispose)
[fan](https://tonejs.github.io/docs/15.5.62/classes/Player.html#fan)
[get](https://tonejs.github.io/docs/15.5.62/classes/Player.html#get)
[immediate](https://tonejs.github.io/docs/15.5.62/classes/Player.html#immediate)
[load](https://tonejs.github.io/docs/15.5.62/classes/Player.html#load)
[now](https://tonejs.github.io/docs/15.5.62/classes/Player.html#now)
[restart](https://tonejs.github.io/docs/15.5.62/classes/Player.html#restart)
[seek](https://tonejs.github.io/docs/15.5.62/classes/Player.html#seek)
[set](https://tonejs.github.io/docs/15.5.62/classes/Player.html#set)
[setLoopPoints](https://tonejs.github.io/docs/15.5.62/classes/Player.html#setlooppoints)
[start](https://tonejs.github.io/docs/15.5.62/classes/Player.html#start)
[stop](https://tonejs.github.io/docs/15.5.62/classes/Player.html#stop)
[sync](https://tonejs.github.io/docs/15.5.62/classes/Player.html#sync)
[toDestination](https://tonejs.github.io/docs/15.5.62/classes/Player.html#todestination)
[toFrequency](https://tonejs.github.io/docs/15.5.62/classes/Player.html#tofrequency)
[toMaster](https://tonejs.github.io/docs/15.5.62/classes/Player.html#tomaster)
[toSeconds](https://tonejs.github.io/docs/15.5.62/classes/Player.html#toseconds)
[toString](https://tonejs.github.io/docs/15.5.62/classes/Player.html#tostring)
[toTicks](https://tonejs.github.io/docs/15.5.62/classes/Player.html#toticks)
[unsync](https://tonejs.github.io/docs/15.5.62/classes/Player.html#unsync)
[getDefaults](https://tonejs.github.io/docs/15.5.62/classes/Player.html#getdefaults)

## Constructors

### constructor

* new Player(
      url?: string | AudioBuffer | [ToneAudioBuffer](https://tonejs.github.io/docs/15.5.62/classes/ToneAudioBuffer.html),
      onload?: () => void,
  ): [Player](https://tonejs.github.io/docs/15.5.62/classes/Player.html)

  #### Parameters

  + `Optional`url: string | AudioBuffer | [ToneAudioBuffer](https://tonejs.github.io/docs/15.5.62/classes/ToneAudioBuffer.html)

    Either the AudioBuffer or the url from which to load the AudioBuffer
  + `Optional`onload: () => void

    The function to invoke when the buffer is loaded.

  #### Returns [Player](https://tonejs.github.io/docs/15.5.62/classes/Player.html)
* new Player(options?: Partial<[PlayerOptions](https://tonejs.github.io/docs/15.5.62/interfaces/PlayerOptions.html)>): [Player](https://tonejs.github.io/docs/15.5.62/classes/Player.html)

  #### Parameters

  + `Optional`options: Partial<[PlayerOptions](https://tonejs.github.io/docs/15.5.62/interfaces/PlayerOptions.html)>

  #### Returns [Player](https://tonejs.github.io/docs/15.5.62/classes/Player.html)

## Properties

### autostart

autostart: boolean

If the file should play as soon
as the buffer is loaded.

### `Readonly`context

context: [BaseContext](https://tonejs.github.io/docs/15.5.62/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### fadeIn

fadeIn: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

The fadeIn time of the amplitude envelope.

### fadeOut

fadeOut: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

The fadeOut time of the amplitude envelope.

### input

input: undefined = undefined

Sources have no inputs

### `Readonly`name

name: string = "Player"

The name of the class

### onstop

onstop: onStopCallback

The callback to invoke when the source is stopped.

### output

output: [OutputNode](https://tonejs.github.io/docs/15.5.62/types/OutputNode.html)

The output node

### volume

volume: [Param](https://tonejs.github.io/docs/15.5.62/classes/Param.html)<"decibels">

The volume of the output in decibels.

#### Example

```
const source = new Tone.PWMOscillator().toDestination();
source.volume.value = -6;
```

### `Static`version

version: string = version

The version number semver

## Accessors

### blockTime

* get blockTime(): number

  The number of seconds of 1 processing block (128 samples)

  #### Returns number

  #### Example

  ```
  console.log(Tone.Destination.blockTime);
  ```

### buffer

* get buffer(): [ToneAudioBuffer](https://tonejs.github.io/docs/15.5.62/classes/ToneAudioBuffer.html)

  The audio buffer belonging to the player.

  #### Returns [ToneAudioBuffer](https://tonejs.github.io/docs/15.5.62/classes/ToneAudioBuffer.html)
* set buffer(buffer: [ToneAudioBuffer](https://tonejs.github.io/docs/15.5.62/classes/ToneAudioBuffer.html)): void

  #### Parameters

  + buffer: [ToneAudioBuffer](https://tonejs.github.io/docs/15.5.62/classes/ToneAudioBuffer.html)

  #### Returns void

### channelCount

* get channelCount(): number

  channelCount is the number of channels used when up-mixing and down-mixing
  connections to any inputs to the node. The default value is 2 except for
  specific nodes where its value is specially determined.

  #### Returns number
* set channelCount(channelCount: number): void

  #### Parameters

  + channelCount: number

  #### Returns void

### channelCountMode

* get channelCountMode(): ChannelCountMode

  channelCountMode determines how channels will be counted when up-mixing and
  down-mixing connections to any inputs to the node.
  The default value is "max". This attribute has no effect for nodes with no inputs.

  + "max" - computedNumberOfChannels is the maximum of the number of channels of all connections to an input. In this mode channelCount is ignored.
  + "clamped-max" - computedNumberOfChannels is determined as for "max" and then clamped to a maximum value of the given channelCount.
  + "explicit" - computedNumberOfChannels is the exact value as specified by the channelCount.

  #### Returns ChannelCountMode
* set channelCountMode(channelCountMode: ChannelCountMode): void

  #### Parameters

  + channelCountMode: ChannelCountMode

  #### Returns void

### channelInterpretation

* get channelInterpretation(): ChannelInterpretation

  channelInterpretation determines how individual channels will be treated
  when up-mixing and down-mixing connections to any inputs to the node.
  The default value is "speakers".

  #### Returns ChannelInterpretation
* set channelInterpretation(channelInterpretation: ChannelInterpretation): void

  #### Parameters

  + channelInterpretation: ChannelInterpretation

  #### Returns void

### disposed

* get disposed(): boolean

  Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### loaded

* get loaded(): boolean

  If the buffer is loaded

  #### Returns boolean

### loop

* get loop(): boolean

  If the buffer should loop once its over.

  #### Returns boolean

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/breakbeat.mp3").toDestination();
  player.loop = true;
  player.autostart = true;
  ```
* set loop(loop: boolean): void

  #### Parameters

  + loop: boolean

  #### Returns void

### loopEnd

* get loopEnd(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  If loop is true, the loop will end at this position.

  #### Returns [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)
* set loopEnd(loopEnd: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void

  #### Parameters

  + loopEnd: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns void

### loopStart

* get loopStart(): [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  If loop is true, the loop will start at this position.

  #### Returns [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)
* set loopStart(loopStart: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): void

  #### Parameters

  + loopStart: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

  #### Returns void

### mute

* get mute(): boolean

  Mute the output.

  #### Returns boolean

  #### Example

  ```
  const osc = new Tone.Oscillator().toDestination().start();
  // mute the output
  osc.mute = true;
  ```
* set mute(mute: boolean): void

  #### Parameters

  + mute: boolean

  #### Returns void

### numberOfInputs

* get numberOfInputs(): number

  The number of inputs feeding into the AudioNode.
  For source nodes, this will be 0.

  #### Returns number

  #### Example

  ```
  const node = new Tone.Gain();
  console.log(node.numberOfInputs);
  ```

### numberOfOutputs

* get numberOfOutputs(): number

  The number of outputs of the AudioNode.

  #### Returns number

  #### Example

  ```
  const node = new Tone.Gain();
  console.log(node.numberOfOutputs);
  ```

### playbackRate

* get playbackRate(): number

  Normal speed is 1. The pitch will change with the playback rate.

  #### Returns number

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/femalevoices_aa2_A5.mp3").toDestination();
  // play at 1/4 speed
  player.playbackRate = 0.25;
  // play as soon as the buffer is loaded
  player.autostart = true;
  ```
* set playbackRate(rate: number): void

  #### Parameters

  + rate: number

  #### Returns void

### progress

* get progress(): number

  Displays the elapsed seconds since the player was started, taking into account playbackRate changes.

  #### Returns number

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3", () => {
  	player.start();
  	setInterval(() => {
  		console.log(player.progress);
  	}, 100);
  }).toDestination();
  ```

### reverse

* get reverse(): boolean

  If the buffer should be reversed. Note that this sets the underlying [ToneAudioBuffer.reverse](https://tonejs.github.io/docs/15.5.62/classes/ToneAudioBuffer.html#reverse), so
  if multiple players are pointing at the same ToneAudioBuffer, they will all be reversed.

  #### Returns boolean

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/chime_1.mp3").toDestination();
  player.autostart = true;
  player.reverse = true;
  ```
* set reverse(rev: boolean): void

  #### Parameters

  + rev: boolean

  #### Returns void

### sampleTime

* get sampleTime(): number

  The duration in seconds of one sample.

  #### Returns number

### state

* get state(): [BasicPlaybackState](https://tonejs.github.io/docs/15.5.62/types/BasicPlaybackState.html)

  Returns the playback state of the source, either "started" or "stopped".

  #### Returns [BasicPlaybackState](https://tonejs.github.io/docs/15.5.62/types/BasicPlaybackState.html)

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/ahntone_c3.mp3", () => {
  	player.start();
  	console.log(player.state);
  }).toDestination();
  ```

## Methods

### chain

* chain(...nodes: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html)[]): this

  Connect the output of this node to the rest of the nodes in series.

  #### Parameters

  + ...nodes: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html)[]

  #### Returns this

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/handdrum-loop.mp3");
  player.autostart = true;
  const filter = new Tone.AutoFilter(4).start();
  const distortion = new Tone.Distortion(0.5);
  // connect the player to the filter, distortion and then to the master output
  player.chain(filter, distortion, Tone.Destination);
  ```

### connect

* connect(destination: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html), outputNum?: number, inputNum?: number): this

  connect the output of a ToneAudioNode to an AudioParam, AudioNode, or ToneAudioNode

  #### Parameters

  + destination: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html)

    The output to connect to
  + outputNum: number = 0

    The output to connect from
  + inputNum: number = 0

    The input to connect to

  #### Returns this

### disconnect

* disconnect(destination?: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html), outputNum?: number, inputNum?: number): this

  disconnect the output

  #### Parameters

  + `Optional`destination: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html)
  + outputNum: number = 0
  + inputNum: number = 0

  #### Returns this

### dispose

* dispose(): this

  Clean up.

  #### Returns this

### fan

* fan(...nodes: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html)[]): this

  connect the output of this node to the rest of the nodes in parallel.

  #### Parameters

  + ...nodes: [InputNode](https://tonejs.github.io/docs/15.5.62/types/InputNode.html)[]

  #### Returns this

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/conga-rhythm.mp3");
  player.autostart = true;
  const pitchShift = new Tone.PitchShift(4).toDestination();
  const filter = new Tone.Filter("G5").toDestination();
  // connect a node to the pitch shift and filter in parallel
  player.fan(pitchShift, filter);
  ```

### get

* get(): [PlayerOptions](https://tonejs.github.io/docs/15.5.62/interfaces/PlayerOptions.html)

  Get the object's attributes.

  #### Returns [PlayerOptions](https://tonejs.github.io/docs/15.5.62/interfaces/PlayerOptions.html)

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

### load

* load(url: string): Promise<[Player](https://tonejs.github.io/docs/15.5.62/classes/Player.html)>

  Load the audio file as an audio buffer.
  Decodes the audio asynchronously and invokes
  the callback once the audio buffer loads.
  Note: this does not need to be called if a url
  was passed in to the constructor. Only use this
  if you want to manually load a new url.

  #### Parameters

  + url: string

    The url of the buffer to load. Filetype support depends on the browser.

  #### Returns Promise<[Player](https://tonejs.github.io/docs/15.5.62/classes/Player.html)>

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

### restart

* restart(time?: number, offset?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), duration?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Stop and then restart the player from the beginning (or offset)

  #### Parameters

  + `Optional`time: number

    When the player should start.
  + `Optional`offset: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The offset from the beginning of the sample to start at.
  + `Optional`duration: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    How long the sample should play. If no duration is given,
    it will default to the full length of the sample (minus any offset)

  #### Returns this

### seek

* seek(offset: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), when?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Seek to a specific time in the player's buffer. If the
  source is no longer playing at that time, it will stop.

  #### Parameters

  + offset: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The time to seek to.
  + `Optional`when: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The time for the seek event to occur.

  #### Returns this

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3", () => {
  	player.start();
  	// seek to the offset in 1 second from now
  	player.seek(0.4, "+1");
  }).toDestination();
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

* setLoopPoints(loopStart: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), loopEnd: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Set the loop start and end. Will only loop if loop is set to true.

  #### Parameters

  + loopStart: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The loop start time
  + loopEnd: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The loop end time

  #### Returns this

  #### Example

  ```
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/malevoices_aa2_F3.mp3").toDestination();
  // loop between the given points
  player.setLoopPoints(0.2, 0.3);
  player.loop = true;
  player.autostart = true;
  ```

### start

* start(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), offset?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html), duration?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Play the buffer at the given startTime. Optionally add an offset
  and/or duration which will play the buffer from a position
  within the buffer for the given duration.

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    When the player should start.
  + `Optional`offset: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    The offset from the beginning of the sample to start at.
  + `Optional`duration: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    How long the sample should play. If no duration is given, it will default to the full length of the sample (minus any offset)

  #### Returns this

### stop

* stop(time?: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)): this

  Stop the source at the specified time. If no time is given,
  stop the source now.

  #### Parameters

  + `Optional`time: [Unit](https://tonejs.github.io/docs/15.5.62/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.5.62/types/Unit.Time.html)

    When the source should be stopped.

  #### Returns this

  #### Example

  ```
  const source = new Tone.Oscillator().toDestination();
  source.start();
  source.stop("+0.5"); // stops the source 0.5 seconds from now
  ```

### sync

* sync(): this

  Sync the source to the Transport so that all subsequent
  calls to `start` and `stop` are synced to the TransportTime
  instead of the AudioContext time.

  #### Returns this

  #### Example

  ```
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

  Connect the output to the context's destination node.

  #### Returns this

  #### Example

  ```
  const osc = new Tone.Oscillator("C2").start();
  osc.toDestination();
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

### toMaster

* toMaster(): this

  Connect the output to the context's destination node.

  #### Returns this

  #### See

  [toDestination](https://tonejs.github.io/docs/15.5.62/classes/Player.html#todestination)

  #### Deprecated

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

### unsync

* unsync(): this

  Unsync the source to the Transport.

  #### Returns this

  #### See

  [sync](https://tonejs.github.io/docs/15.5.62/classes/Player.html#sync)

### `Static`getDefaults

* getDefaults(): [PlayerOptions](https://tonejs.github.io/docs/15.5.62/interfaces/PlayerOptions.html)

  #### Returns [PlayerOptions](https://tonejs.github.io/docs/15.5.62/interfaces/PlayerOptions.html)

### Settings

Member Visibility

* Inherited
* External

ThemeOSLightDark

### On This Page

Constructors

[constructor](https://tonejs.github.io/docs/15.5.62/classes/Player.html#constructor)

Properties

[autostart](https://tonejs.github.io/docs/15.5.62/classes/Player.html#autostart)[context](https://tonejs.github.io/docs/15.5.62/classes/Player.html#context)[debug](https://tonejs.github.io/docs/15.5.62/classes/Player.html#debug)[fadeIn](https://tonejs.github.io/docs/15.5.62/classes/Player.html#fadein)[fadeOut](https://tonejs.github.io/docs/15.5.62/classes/Player.html#fadeout)[input](https://tonejs.github.io/docs/15.5.62/classes/Player.html#input)[name](https://tonejs.github.io/docs/15.5.62/classes/Player.html#name)[onstop](https://tonejs.github.io/docs/15.5.62/classes/Player.html#onstop)[output](https://tonejs.github.io/docs/15.5.62/classes/Player.html#output)[volume](https://tonejs.github.io/docs/15.5.62/classes/Player.html#volume)[version](https://tonejs.github.io/docs/15.5.62/classes/Player.html#version)

Accessors

[blockTime](https://tonejs.github.io/docs/15.5.62/classes/Player.html#blocktime)[buffer](https://tonejs.github.io/docs/15.5.62/classes/Player.html#buffer)[channelCount](https://tonejs.github.io/docs/15.5.62/classes/Player.html#channelcount)[channelCountMode](https://tonejs.github.io/docs/15.5.62/classes/Player.html#channelcountmode)[channelInterpretation](https://tonejs.github.io/docs/15.5.62/classes/Player.html#channelinterpretation)[disposed](https://tonejs.github.io/docs/15.5.62/classes/Player.html#disposed)[loaded](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loaded)[loop](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loop)[loopEnd](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loopend)[loopStart](https://tonejs.github.io/docs/15.5.62/classes/Player.html#loopstart)[mute](https://tonejs.github.io/docs/15.5.62/classes/Player.html#mute)[numberOfInputs](https://tonejs.github.io/docs/15.5.62/classes/Player.html#numberofinputs)[numberOfOutputs](https://tonejs.github.io/docs/15.5.62/classes/Player.html#numberofoutputs)[playbackRate](https://tonejs.github.io/docs/15.5.62/classes/Player.html#playbackrate)[progress](https://tonejs.github.io/docs/15.5.62/classes/Player.html#progress)[reverse](https://tonejs.github.io/docs/15.5.62/classes/Player.html#reverse)[sampleTime](https://tonejs.github.io/docs/15.5.62/classes/Player.html#sampletime)[state](https://tonejs.github.io/docs/15.5.62/classes/Player.html#state)

Methods

[chain](https://tonejs.github.io/docs/15.5.62/classes/Player.html#chain)[connect](https://tonejs.github.io/docs/15.5.62/classes/Player.html#connect)[disconnect](https://tonejs.github.io/docs/15.5.62/classes/Player.html#disconnect)[dispose](https://tonejs.github.io/docs/15.5.62/classes/Player.html#dispose)[fan](https://tonejs.github.io/docs/15.5.62/classes/Player.html#fan)[get](https://tonejs.github.io/docs/15.5.62/classes/Player.html#get)[immediate](https://tonejs.github.io/docs/15.5.62/classes/Player.html#immediate)[load](https://tonejs.github.io/docs/15.5.62/classes/Player.html#load)[now](https://tonejs.github.io/docs/15.5.62/classes/Player.html#now)[restart](https://tonejs.github.io/docs/15.5.62/classes/Player.html#restart)[seek](https://tonejs.github.io/docs/15.5.62/classes/Player.html#seek)[set](https://tonejs.github.io/docs/15.5.62/classes/Player.html#set)[setLoopPoints](https://tonejs.github.io/docs/15.5.62/classes/Player.html#setlooppoints)[start](https://tonejs.github.io/docs/15.5.62/classes/Player.html#start)[stop](https://tonejs.github.io/docs/15.5.62/classes/Player.html#stop)[sync](https://tonejs.github.io/docs/15.5.62/classes/Player.html#sync)[toDestination](https://tonejs.github.io/docs/15.5.62/classes/Player.html#todestination)[toFrequency](https://tonejs.github.io/docs/15.5.62/classes/Player.html#tofrequency)[toMaster](https://tonejs.github.io/docs/15.5.62/classes/Player.html#tomaster)[toSeconds](https://tonejs.github.io/docs/15.5.62/classes/Player.html#toseconds)[toString](https://tonejs.github.io/docs/15.5.62/classes/Player.html#tostring)[toTicks](https://tonejs.github.io/docs/15.5.62/classes/Player.html#toticks)[unsync](https://tonejs.github.io/docs/15.5.62/classes/Player.html#unsync)[getDefaults](https://tonejs.github.io/docs/15.5.62/classes/Player.html#getdefaults)
