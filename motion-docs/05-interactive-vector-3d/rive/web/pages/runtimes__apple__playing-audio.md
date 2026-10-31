---
source: https://rive.app/docs/runtimes/apple/playing-audio
title: "Playing Audio"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Playing Audio

Playing Rive audio events

To learn more on how to add audio to your Rive file, see [Audio Events](/docs/editor/events/audio-events).

## Embedded assets

Embedded assets require no additional work to play audio.

## Referenced assets

Referenced assets require a little bit more work to play audio. Audio will still automatically play, but the audio file(s) must be loaded when a Rive runtime attempts to play audio.

For more information, see [Loading Assets](/docs/runtimes/apple/loading-assets).

## Audio settings

On iOS, playing audio will respect your `AVAudioSession` shared instance settings. For more information, see [Apple's documentation](https://developer.apple.com/documentation/avfaudio/avaudiosession) on `AVAudioSession`. Using this, you can choose to mix audio, duck audio, and more. You can update your shared instance early in your app lifecycle if you would like to ensure all Rive audio plays  with the correct settings.

```swift IOS theme={null}
// Example: Ignore the silent switch, and mix with other audio
let category: AVAudioSession.Category = .playback
let options: AVAudioSession.CategoryOptions = [.mixWithOthers]
AVAudioSession.sharedInstance().setCategory(category, options: options)
```

## Setting volume

An artboard is capable of setting its volume. A parent artboard will set the volume of all component instances; however, setting a component's volume will **not** update the parent's volume.

**New Runtime**

Once you have created an `Artboard`, you can set its volume with `setVolume(_:)` and read the current volume with `volume()`. Volume is propagated to all nested artboards.

```swift theme={null}
let worker = try await Worker()
let file = try await File(source: .local("my_rive_file", Bundle.main), worker: worker)
let artboard = try await file.createArtboard()

// `setVolume(_:)` is a @MainActor method on `Artboard`.
// Set the artboard's volume to 50% (0.0 = muted, 1.0 = full volume)
artboard.setVolume(0.5)

// `volume()` is a @MainActor async throwing method that throws
// an `ArtboardError` if the request fails.
do {
    let volume = try await artboard.volume()
    print("Current volume: \(volume)")
} catch let error as ArtboardError {
    print("Failed to read volume: \(error)")
}
```

**Legacy Runtime**

```swift theme={null}
// Set the current artboard's volume to 50%
let viewModel = RiveViewModel(fileName: "my_rive_file")
viewModel.riveModel?.volume = 0.5
```
