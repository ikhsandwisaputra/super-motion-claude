---
source: https://rive.app/docs/game-runtimes/unity/audio
title: "Audio"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Audio

Rive audio playback in Unity.

In the Unity runtime, audio playback from Rive files is automatically routed through Unity's audio system via the `AudioProvider` component, which wraps an `AudioSource` to mix Rive's audio output into the Unity audio pipeline.

> [!NOTE]
>
> Audio playback via `AudioProvider` is **not supported in WebGL builds**. On WebGL, Rive automatically falls back to system audio instead of routing through Unity's `AudioSource`.

## How it works

Each `RiveWidget` that plays a Rive file with audio needs access to an `AudioProvider`. By default, all widgets share a single **global** `AudioProvider` that is created automatically at runtime. No additional setup is required.

If you need more control (for example, to manage volume or audio mixer groups independently per widget), you can assign a **custom** `AudioProvider` to individual widgets.

## Global audio provider

The global `AudioProvider` is created automatically the first time a widget with audio needs it. It is shared across all `RiveWidget` instances that don't have a custom provider assigned.

This is the recommended setup for most projects, and no additional configuration is required.

## Custom audio provider

To use a custom `AudioProvider` for a specific widget:

**Step 1**

Add an `AudioProvider` component to a GameObject in your scene. The `AudioProvider` component requires an `AudioSource` on the same GameObject. Unity will add one automatically.

**Step 2**

Assign the `AudioProvider` to the **Custom Audio Provider** field on your `RiveWidget` in the Inspector.

You can also assign a custom provider at runtime via script:

```csharp theme={null}
[SerializeField] private RiveWidget m_riveWidget;
[SerializeField] private AudioProvider m_audioProvider;

private void Start()
{
    m_riveWidget.CustomAudioProvider = m_audioProvider;
}
```

Setting `CustomAudioProvider` to `null` reverts the widget to using the shared global provider.

## Platform notes

| Platform | Behavior |
| - | - |
| Editor / Standalone | Audio routed through Unity's `AudioSource` via `AudioProvider` |
| iOS / Android | Audio routed through `AudioSource`; `Play()` is called automatically on start |
| WebGL | System audio is used; `AudioProvider` is not supported and will log a warning if added |

> [!WARNING]
>
> Adding an `AudioProvider` component to a WebGL build will produce a warning at runtime. The component has no effect on that platform, and audio will still play via the browser's system audio.

## AudioProvider component reference

| Property | Description |
| - | - |
| `AudioSource` | The `AudioSource` component used for audio playback. Required; automatically added with `AudioProvider`. |
