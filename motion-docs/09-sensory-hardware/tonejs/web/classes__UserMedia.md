---
source: https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html
title: "UserMedia | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [UserMedia](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html)

# Class UserMedia

UserMedia uses MediaDevices.getUserMedia to open up and external microphone or audio input.
Check [MediaDevices API Support](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
to see which browsers are supported. Access to an external input
is limited to secure (HTTPS) connections.

#### Example

```ts
const meter = new Tone.Meter();
const mic = new Tone.UserMedia().connect(meter);
mic.open().then(() => {
    // promise resolves when input is available
    console.log("mic open");
    // print the incoming mic levels in decibels
    setInterval(() => console.log(meter.getValue()), 100);
}).catch(e => {
    // promise is rejected when the user doesn't have or allow mic access
    console.log("mic not open");
});
```

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#UserMedia))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[UserMediaOptions](https://tonejs.github.io/docs/15.1.22/interfaces/UserMediaOptions.html)>
  + UserMedia

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#output)
[volume](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#volume)
[version](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#channelInterpretation)
[deviceId](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#deviceId)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#disposed)
[groupId](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#groupId)
[label](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#label)
[mute](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#mute)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#sampleTime)
[state](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#state)
[supported](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#supported)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#chain)
[close](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#close)
[connect](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#now)
[open](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#open)
[set](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#set)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toTicks)
[enumerateDevices](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#enumerateDevices)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#getDefaults)

## Constructors

### constructor

* new UserMedia(volume?): [UserMedia](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html)
* #### Parameters

  + `Optional` volume: number

    The level of the input in decibels

  #### Returns [UserMedia](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html)
* new UserMedia(options?): [UserMedia](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html)
* #### Parameters

  + `Optional` options: Partial<[UserMediaOptions](https://tonejs.github.io/docs/15.1.22/interfaces/UserMediaOptions.html)>

  #### Returns [UserMedia](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` input

input: undefined

The input node or nodes. If the object is a source,
it does not have any input and this.input is undefined.

### `Readonly` name

name: string = "UserMedia"

The name of the class

### `Readonly` output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

The output nodes. If the object is a sink,
it does not have any output and this.output is undefined.

### `Readonly` volume

volume: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"decibels">

The volume of the output in decibels.

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

### deviceId

* get deviceId(): undefined | string
* Returns an identifier for the represented device that is
  persisted across sessions. It is un-guessable by other applications and
  unique to the origin of the calling application. It is reset when the
  user clears cookies (for Private Browsing, a different identifier is
  used that is not persisted across sessions). Returns undefined when the
  device is not open.

  #### Returns undefined | string

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### groupId

* get groupId(): undefined | string
* Returns a group identifier. Two devices have the
  same group identifier if they belong to the same physical device.
  Returns null when the device is not open.

  #### Returns undefined | string

### label

* get label(): undefined | string
* Returns a label describing this device (for example "Built-in Microphone").
  Returns undefined when the device is not open or label is not available
  because of permissions.

  #### Returns undefined | string

### mute

* get mute(): boolean
* Mute the output.

  #### Returns boolean

  #### Example

  ```ts
  const mic = new Tone.UserMedia();
  mic.open().then(() => {
      // promise resolves when input is available
  });
  // mute the output
  mic.mute = true;
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

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### state

* get state(): "started" | "stopped"
* Returns the playback state of the source, "started" when the microphone is open
  and "stopped" when the mic is closed.

  #### Returns "started" | "stopped"

### `Static` supported

* get supported(): boolean
* If getUserMedia is supported by the browser.

  #### Returns boolean

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

### close

* close(): this
* Close the media stream

  #### Returns this

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

* get(): [UserMediaOptions](https://tonejs.github.io/docs/15.1.22/interfaces/UserMediaOptions.html)
* Get the object's attributes.

  #### Returns [UserMediaOptions](https://tonejs.github.io/docs/15.1.22/interfaces/UserMediaOptions.html)

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

### open

* open(labelOrId?): Promise<[UserMedia](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html)>
* Open the media stream. If a string is passed in, it is assumed
  to be the label or id of the stream, if a number is passed in,
  it is the input number of the stream.

  #### Parameters

  + `Optional` labelOrId: string | number

    The label or id of the audio input media device.
    With no argument, the default stream is opened.

  #### Returns Promise<[UserMedia](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html)>

  The promise is resolved when the stream is open.

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[UserMediaOptions](https://tonejs.github.io/docs/15.1.22/interfaces/UserMediaOptions.html)>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toDestination)

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

### `Static` enumerateDevices

* enumerateDevices(): Promise<MediaDeviceInfo[]>
* Returns a promise which resolves with the list of audio input devices available.

  #### Returns Promise<MediaDeviceInfo[]>

  The promise that is resolved with the devices

  #### Example

  ```ts
  Tone.UserMedia.enumerateDevices().then((devices) => {
      // print the device labels
      console.log(devices.map(device => device.label));
  });
  ```

### `Static` getDefaults

* getDefaults(): [UserMediaOptions](https://tonejs.github.io/docs/15.1.22/interfaces/UserMediaOptions.html)
* #### Returns [UserMediaOptions](https://tonejs.github.io/docs/15.1.22/interfaces/UserMediaOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#output)[volume](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#volume)[version](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#channelInterpretation)[deviceId](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#deviceId)[disposed](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#disposed)[groupId](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#groupId)[label](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#label)[mute](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#mute)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#sampleTime)[state](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#state)[supported](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#supported)[chain](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#chain)[close](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#close)[connect](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#now)[open](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#open)[set](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#set)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#toTicks)[enumerateDevices](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#enumerateDevices)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/UserMedia.html#getDefaults)
