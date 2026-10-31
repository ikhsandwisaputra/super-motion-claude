---
source: https://docs.lottiefiles.com/en/creator/12_motion-tokens/motion-tokens-in-code.md
title: ""
fetched: 2026-10-28
---

# Motion Tokens in Code
Motion Tokens make Lottie animations extremely versatile, but they require logic to be programmed. This guide is a reference for both developers and designers on how to implement Motion Tokens in code.

## Supported Properties

The following properties can be bound with Motion Tokens:

<List type="bullet">
  <ListItem>**Text** — content, font, size, and alignment</ListItem>
  <ListItem>**Colors** — solid colors</ListItem>
  <ListItem>**Gradients** — multi-stop gradient control</ListItem>
  <ListItem>**Position** — X and Y coordinates</ListItem>
  <ListItem>**Transform** — scale and rotation</ListItem>
  <ListItem>**Opacity** — transparency values</ListItem>
  <ListItem>**Skew / Skew Axis**</ListItem>
</List>

## For Developers

<List type="bullet">
  <ListItem>[dotLottie Slots API](https://github.com/LottieFiles/dotlottie-web/wiki/Slots-API)</ListItem>

  <ListItem>
    Skills doc for use with AI:

    <Attachment src="./assets/DOTLOTTIE_SKILLS.md" title="DOTLOTTIE_SKILLS.md" description="Reference for AI-assisted dotLottie integration, slots, and runtime APIs." variant="card" downloadUrl="https://assets.docs.lottiefiles.com/static/attachments/589e8e5919-DOTLOTTIE_SKILLS.md" filename="DOTLOTTIE_SKILLS.md" extension=".md" mimeType="text/markdown" fileSize="17065" sizeFormatted="16.7 KB" />
  </ListItem>
</List>

## For Designers

If you're a designer, you might want to try vibe coding the logic for your animation yourself — either for testing or to use as a demo. This guide walks you through how to do that with no coding experience.

We recommend using [CodePen](https://codepen.io/) to quickly test code. It requires no setup.

### Step 1 — Export Your Animation

1. Export your animation to Workspace as usual
2. Your Motion Tokens are automatically stored inside the `.lottie` file
3. Copy the **Asset CDN link** for the animation
4. Also download the `.lottie` file locally

You'll need both the CDN link and the local file for the next steps.

### Step 2 — Open the CodePen Template

Use the prebuilt template: [CodePen Template](https://codepen.io/George-Dikun/pen/ogLdjNo)

The pen includes three files:

<List type="bullet">
  <ListItem>**HTML** — almost done</ListItem>
  <ListItem>**CSS** — done</ListItem>
  <ListItem>**JavaScript** — where all the fun happens</ListItem>
</List>

In the HTML file, paste your Asset CDN link into the provided spot:

```html
<canvas id="dotLottie-canvas" data-src="PASTE_YOUR_DIRECT_DOTLOTTIE_URL_HERE.lottie"></canvas>
```

Once that's set, you'll do all your work in the **JS** panel.

### Step 3 — Vibe Coding with an LLM

You don't need to write all the code yourself. We've created a skills document that teaches an LLM how to control Motion Tokens correctly.

**What you'll need:**

<List type="bullet">
  <ListItem>
    <Attachment src="./assets/MOTION_TOKENS_SKILLS.md" title="MOTION_TOKENS_SKILLS.md" description="Reference for AI-assisted Motion Tokens: names, types, and runtime updates." variant="card" downloadUrl="https://assets.docs.lottiefiles.com/static/attachments/2ace8da9e3-MOTION_TOKENS_SKILLS.md" filename="MOTION_TOKENS_SKILLS.md" extension=".md" mimeType="text/markdown" fileSize="19465" sizeFormatted="19.0 KB" />
  </ListItem>

  <ListItem>Your `.lottie` file</ListItem>
</List>

**First prompt (important):** Drag both files into ChatGPT (or your LLM of choice) in your very first message. This gives the model everything it needs to understand:

<List type="bullet">
  <ListItem>What Motion Tokens exist in your file</ListItem>
  <ListItem>Their names and types</ListItem>
  <ListItem>How to update them at runtime</ListItem>
</List>

**Example prompt:**

> I want the square to turn yellow and back to blue every second. I want to be able to click and drag the square. When I am dragging, I want it to rotate 15 degrees. The text should change to "Dragging" when I'm dragging, or turn back to "Drag me" when not.

The LLM will generate a complete JavaScript file that updates Motion Tokens correctly. Copy and paste the output directly into the **JS** panel in CodePen.

## Debugging Tips

<List type="bullet">
  <ListItem>The first output may not be perfect — that's normal</ListItem>
  <ListItem>If the code is partially wrong, describe what's broken and ask for a fix</ListItem>
  <ListItem>If the LLM returns only snippets, ask for the full JS file</ListItem>
</List>
