---
source: https://www.unicorn.studio/docs/ai
title: "Unicorn Agent - Unicorn Studio"
fetched: 2026-10-28
---

# Unicorn Agent

Unicorn Agent designs with you, right in the editor. Describe what you want and watch it build in your open project: custom shaders written and checked against Unicorn Studio's shader rules, tuned effects from the library, text and images laid out in the scene, timeline animations, scroll, and hover events. The agent renders every shader change and looks at the result before it touches your design, so it can catch and fix its own mistakes. Everything it commits is a normal edit, one undo step at a time, and you can keep tweaking it by hand. When the scene is ready, the agent can publish it too, so you can go from idea to a live effect in a single conversation.

Unicorn Agent is available to Legend subscribers, who get 200 AI credits every month, and to anyone with free or purchased credits. Free plan users can claim 50 free credits to try it.

## Getting started

Open a project and click **Unicorn Agent** in the top bar. Type what you want, or pick one of the suggestions. You can also attach a reference image.

```
Add a soft animated gradient to this scene.
```

A few more to try:

```
Add a headline that fades in and slides up on load, with a subtle grain over the whole scene.
```

```
Make three variations of this scene with different color palettes.
```

```
Add a pattern of little plus signs, evenly spaced, that expand with mouse proximity.
```

```
Make the headline text and accent color variables.
```

```
Publish this scene.
```

If your request is unclear, the agent asks a short question and suggests a few answers you can click. When it's done, it tells you what changed. Each project keeps its own conversation, so you can come back later and keep going.

## What it can do

* **Create effects:** build new custom shader effects from scratch, or add and tune built-in effects from the library, like blurs, glows, grain, and distortions.
* **Edit effects:** rewrite any effect's shader, or change its controls the way you would in the properties panel.
* **Lay out scenes:** add, duplicate, move, reorder, hide, and delete shape, text, and image layers, using the fonts and media in your library.
* **Animate:** add animations on load, scroll, hover, or cursor movement, and put authored motion on the timeline so you can retime it yourself.
* **Work across scenes:** add, duplicate, rename, and resize scenes, and make responsive edits for Tablet and Mobile breakpoints.
* **Author variables:** turn any property into a [variable](https://www.unicorn.studio/docs/variables/) your site can control at runtime, and group values into presets like `Brand Dark` and `Brand Light`.
* **Ship:** check performance and publish the scene.

## How it works

### While the agent is working

While the agent is working, the open scene shows a purple border and pauses the canvas, layers, properties, timeline, and most shortcuts. You can still scroll those panels. Editing or creating an effect also covers that scene with a loader, and its label shows what the agent is doing. Other scenes aren't locked: click one in the scenes panel or on the canvas to keep working there.

The scene unlocks when the agent commits its change, adds a library effect, or finishes. To stop the agent at any point, click the stop button in the prompt box, or **Take control** next to the scene's name. Any previews it hasn't committed are discarded.

### Previews and undo

Shader edits and new effects are built as previews first. The agent validates the shader with the real WebGL compiler, renders it offscreen, and looks at the image, and nothing in your design changes until it commits. If you change the layer while the agent is previewing, its commit is rejected so it can't overwrite your change.

Every commit is one undo step and saves the design, so Cmd+Z works exactly as it does for your own edits. Changes to controls, animations, layers, and scenes skip the preview step and apply as single undo steps too.

## Credits

Unicorn Agent uses AI credits.

* Legend subscribers receive 200 credits each month. Monthly credits reset each billing period and do not roll over.
* Free plan users can claim 50 free credits from the Unicorn Agent panel.
* One-time credit boosts are available if you need more. Free and boost credits do not expire, and monthly credits are used first.

### How requests are billed

Each request you send is one run, and a run is charged for the work it actually does: the more the agent reads, builds, previews, and checks, the more credits it uses. A quick change like retiming an animation costs less than building a new effect from scratch.

* A run never costs more than 30 credits, or your remaining balance if that's lower. Up to that amount is held when the run starts, and whatever it doesn't use goes back to your balance when it finishes.
* When a run reaches that limit, or runs for about 7 minutes, the agent stops and tells you what it finished. Reply "continue" to pick up where it left off.
* Runs that only answer a question, ask you a clarifying question, or apply a preview from an earlier run are free.
* If a run fails, its credits are returned to your balance. If you stop a run, you're only charged for the work it did before you stopped it.

## Terms and conditions

By using Unicorn Agent, you understand:

* This feature is experimental and may produce incorrect, unexpected, or broken results.
* The agent makes changes to your projects on your behalf, including publishing scenes to your live embeds. You are responsible for reviewing and testing any output before using it in production.
* Generated outputs are provided as-is, may not be unique, and are not guaranteed to be original, free from third-party claims, performant, correct, or suitable for a particular purpose.
* You may use outputs created with this feature in your projects, including commercial use, subject to these Terms, any applicable third-party provider terms, and Unicorn Studio's license.
* We may store and review AI prompts, responses, generated effects, usage metadata, errors, and related traces as needed to operate, debug, secure, improve, and prevent abuse of Unicorn Agent.
* Credit amounts, limits, pricing, and availability may change over time as we refine the feature.

## FAQ

### Who can use Unicorn Agent?

Legend subscribers, and anyone with free or purchased credits on their account.

### Is Unicorn Agent free?

Legend includes 200 credits a month at no extra cost, and Free plan users can claim 50 free credits to try it. If you need more, you can buy one-time credit boosts.

### How many credits does a request use?

It depends on how much work the request takes. Small changes use fewer credits than bigger builds, and no run uses more than 30. See [How requests are billed](https://www.unicorn.studio/docs/ai/#how-requests-are-billed).

### What happens if a run fails?

Credits are returned when a run fails. Runs that only answer or ask you a question are not charged.

### Do purchased credits expire?

No. Free and purchased boost credits do not expire.

### Can I use the outputs commercially?

Yes. Outputs created with Unicorn Agent can be used in your projects, including commercial work, subject to these Terms, any applicable third-party provider terms, and Unicorn Studio's license.

### Should I review the output before publishing?

Yes. You should check performance and make sure it runs well in the performance test page and on your own devices in production.
