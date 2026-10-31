---
source: https://rive.app/docs/runtimes/apple/faq
title: "FAQ"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# FAQ

## How do I enable support for ProMotion displays?

Support for ProMotion on iOS requires two things:

1. Using an API in the Apple runtime to set the desired FPS (range)
2. Adding an additional entry into your app's`Info.plist` file

### Example usage

```swift theme={null}
let preferredFPS = UIScreen.main.maximumFramesPerSecond
// or
let preferredFPSRange = CAFrameRateRange(minimum: 60, maximum: Float(preferredFPS))
let viewModel = {
    let viewModel = RiveViewModel(fileName: "...")
    viewModel.setPreferredFramesPerSecond(preferredFramesPerSecond: preferredFPS)
    // or
    viewModel.setPreferredFrameRateRange(preferredFPSRange)
    return viewModel
}()
```

Additionally, add the following to your app's `Info.plist` file:

`<key>CADisableMinimumFrameDurationOnPhone</key><true/>`

You can view more information about preferred FPS [here](https://developer.apple.com/documentation/quartzcore/cadisplaylink/1648421-preferredframespersecond), and about preferred FPS range [here](https://developer.apple.com/documentation/quartzcore/cadisplaylink/3875343-preferredframeraterange).

### Why is resource usage different compared to other libraries?

See our [Resource Usage](/docs/runtimes/apple/resource-usage) documentation for more details.
