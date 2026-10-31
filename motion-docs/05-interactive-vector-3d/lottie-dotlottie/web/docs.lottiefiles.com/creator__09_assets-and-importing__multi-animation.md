---
source: https://docs.lottiefiles.com/en/creator/09_assets-and-importing/multi-animation.md
title: ""
fetched: 2026-10-28
---

# Multi-Animation
Build several animations in one Lottie Creator project that share an asset library, and export them together as a single dotLottie file.

Multi-animation lets you build several separate animations inside a single Lottie Creator project and bundle them together into one dotLottie file. Each animation can have its own size, layout, and purpose — while still sharing the same asset library — so related animations stay organized, easy to update, and simple to deliver as a single package.

This is useful for things like icon sets, onboarding flows, or a family of animations that all use the same characters, colors, or illustrations but need to be exported and used independently.

## Key concepts

<List type="bullet">
  <ListItem>
    **Main scene** — A standalone animation within your project. Each project can contain multiple main scenes, and each
    one can have its own canvas size, layout, and content.
  </ListItem>

  <ListItem>
    **Initial scene** — The primary or cover animation for a multi-animation project. It's the animation that represents
    the project by default.
  </ListItem>

  <ListItem>
    **Shared assets** — All main scenes in a project draw from the same asset library. Assets aren't duplicated per
    scene — they're shared across all of them.
  </ListItem>
</List>

## Creating main scenes

New main scenes are created from the **Assets** tab.

1. Open the **Assets** tab in your project.
2. Create a new main scene from there.
3. Build out that scene's animation independently of your other main scenes — it can have its own size and layout.

Repeat this for each animation you want to include in the project.

## Working with shared assets

Because all main scenes pull from the same asset pool:

<List type="bullet">
  <ListItem>Any asset you add is available to every main scene in the project.</ListItem>

  <ListItem>
    If you update an asset (for example, replacing an image or editing artwork), that update automatically applies
    everywhere the asset is used — across all animations, not just one.
  </ListItem>
</List>

This makes it easy to keep a family of animations visually consistent, since a single asset change propagates to every scene that uses it.

<Callout type="warning" icon={false}>
  Because updates are shared, changing an asset can affect multiple animations at once. If different scenes need
  visually different versions of what looks like "the same" element, use separate assets for each.
</Callout>

## Setting the initial scene

You can designate one main scene as the initial scene — the primary or cover animation for the project. This is the animation that represents the project by default.

## Exporting

When exporting a multi-animation project:

<List type="bullet">
  <ListItem>You can choose **which main scenes to export**, rather than exporting everything in the project.</ListItem>

  <ListItem>
    The result is a single dotLottie file that contains multiple animations, ready to deliver as one package.
  </ListItem>
</List>

For the full export flow — selecting scenes, setting the cover, and saving to your workspace — see [How to Export](/en/creator/10_exporting/how-to-export).

<Callout type="info" icon={false}>
  **Current limitation:** Nested scenes cannot be selected for export yet. Only main scenes are exportable at this time.
  If your project contains nested scenes, make sure the content you need to ship lives in a main scene.
</Callout>

## Summary

| Capability         | Details                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Create main scenes | From the Assets tab                                                                         |
| Scene independence | Each main scene can have its own size and layout                                            |
| Assets             | Shared across all main scenes; updates apply everywhere the asset is used                   |
| Initial scene      | One scene can be set as the primary or cover animation                                      |
| Export             | Choose which main scenes to include; exports as one dotLottie file with multiple animations |
| Limitation         | Nested scenes can't be exported yet — only main scenes                                      |

## Related

<Grid columns="2">
  <Card title="Asset Manager" href="/en/creator/09_assets-and-importing/asset-manager" variant="interactive" />

  <Card title="How to Export" href="/en/creator/10_exporting/how-to-export" variant="interactive" />
</Grid>
