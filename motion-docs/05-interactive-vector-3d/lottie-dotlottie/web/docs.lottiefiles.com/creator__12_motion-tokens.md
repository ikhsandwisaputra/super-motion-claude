---
source: https://docs.lottiefiles.com/en/creator/12_motion-tokens.md
title: ""
fetched: 2026-10-28
---

# Motion Tokens
Motion Tokens let you control any animation property - text, colors, transforms, and layouts — from code at runtime. One file, infinite variations.

This could include updating text to match the score of a game, the position of a layer to handle drag-and-drop, or changing scale to display the progress of a loading bar.

Under the hood, Motion Tokens use the **Slots API** in dotLottie. Developers use this API to connect tokenized properties to live data.

## What Can Be Tokenized?

Motion Tokens expand what used to be "slots" to include more powerful properties:

<List type="bullet">
  <ListItem>**Text** — content, font, size, and alignment</ListItem>
  <ListItem>**Colors** — solid colors</ListItem>
  <ListItem>**Gradients** — multi-stop gradient control</ListItem>
  <ListItem>**Position** — X and Y coordinates</ListItem>
  <ListItem>**Scale** — vertical and horizontal</ListItem>
  <ListItem>**Rotation** — 0–360 degrees</ListItem>
  <ListItem>**Opacity** — transparency values</ListItem>
  <ListItem>**Skew / Skew Axis**</ListItem>
</List>

## In Creator

Motion Tokens begin their life in LottieFiles Creator. They can be accessed through a dropdown chevron button that appears next to each property when hovered.

<Image src="https://assets.docs.lottiefiles.com/videos/gifs/Create%20token.gif" alt="Create token" caption="Create token" zoom variant="default" />

Give each token a descriptive name so you remember what it does later.

After tokens are created, they can be accessed via the **Motion Tokens manager** on the floating panel. From here, tokens can be edited and themes can be created.

<Image src="https://assets.docs.lottiefiles.com/static/a6dea51cfa-640.webp" alt="Motion Tokens Manager" caption="Motion Tokens Manager" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/a6dea51cfa-640.webp 640w, https://assets.docs.lottiefiles.com/static/a6dea51cfa-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/a6dea51cfa-1920.webp 1920w" width="3840" height="2160" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAjUlEQVR4nC3MXQ+BUACA4fMzUKc6H32u5cIwTHJBrRgX6Bb//zf02pr7Z4/o+g9lc2dZnllXDatDze50pX296frvIMKswFUGR1mcwOAqy0T66CSnah+ItJgjVUgQpfhhioozZr5GmmichU0WeOYPbDKiqadwtWVf3xCBzZAmxLMxnolHoNOcbLPleHkOP2G7PefOFVR6AAAAAElFTkSuQmCC" />

**Note:** Editing tokens in the Motion Tokens manager permanently alters the default values. This is different from
how tokens are used later in your project, where editing them does not result in permanent change.

## Themes

Themes are preset collections of token values. Define light, dark, and branded variants and select them at runtime — or switch between them via State Machines.

<CodePen url="https://codepen.io/George-Dikun/pen/PwGYOxQ" defaultTab="result" />

[View example on CodePen](https://codepen.io/George-Dikun/pen/PwGYOxQ)

### Switching themes in Creator

While working in Lottie Creator, you can switch between themes directly in the Motion Tokens manager to preview how your animation looks across variants. This lets you verify that all tokens resolve correctly before exporting.

### Switching themes in Workspace

After exporting to your Workspace, you can switch themes there too. Token value changes in Workspace are non-destructive — they don't affect the source file. Use this to test every variant in the real playback environment before handing off to developers.

Once you are done animating, setting up tokens, and creating themes, export the animation to your Workspace.

## In Your Workspace

Preview your animation exactly as it will appear in production. Update token values in real time to test every variant, without affecting the source file.

Updating token values here will not permanently alter your animation. You can undo any changes by reloading the page or clicking **Reset all**.

<Image src="https://assets.docs.lottiefiles.com/videos/gifs/Motion%20Tokens%20Workflow.gif" alt="Motion Tokens Workflow" caption="Motion Tokens Workflow" zoom variant="default" />

## Next Steps

Motion Tokens are powerful on their own — they allow several layers to share properties that can be updated all at once or grouped in themes. Their real power is unlocked when combined with code.

<List type="bullet">
  <ListItem>
    Ready to connect your tokens to real data? Start with the [Slots
    API](https://github.com/LottieFiles/dotlottie-web/wiki/Slots-API)
  </ListItem>

  <ListItem>
    Want to prototype as a designer? See [Motion Tokens in Code](/en/creator/12_motion-tokens/motion-tokens-in-code)
  </ListItem>
</List>
