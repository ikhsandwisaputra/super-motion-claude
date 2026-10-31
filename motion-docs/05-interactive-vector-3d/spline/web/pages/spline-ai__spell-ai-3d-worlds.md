---
source: https://docs.spline.design/spline-ai/spell-ai-3d-worlds
title: "Spell AI 3D Worlds"
fetched: 2026-10-28
split_from: docs.spline.design__llms-full.txt
---

# Spell AI 3D Worlds

Spell is an experimental AI model made by Spline intended to create entire 3D scenes or “Worlds” from one single image. It empowers you to bring your ideas to life by converting static inputs into immersive 3D worlds.

The worlds are consistent toward the initial image input and are represented in a volume that can be rendered as a Gaussian Splatting.

Spell is currently highly experimental, and it's only meant for early adopters interested in testing the tech or helping our team test the model in its early stages while it's still being trained. Pricing is intentionally high during this phase to avoid high expenses on GPU costs.

[**→ Read the announcement**](https://blog.spline.design/introducing-spell)

<Embed src="https://www.youtube.com/embed/PtCKiidsXC4" title="YouTube video player" />

## Creating your first 3D world [#creating-your-first-3d-world]

You can access Spell at [spell.spline.design](http://spell.spline.design) to start creating your first 3D scene is simple — type a text prompt or upload an image.

<Callout>
  **Note:** Spell is at an early stage, with limited access, meaning you'll need to subscribe in order to try it. Currently, Spell pricing is separated from Spline Editor pricing, and the pricing structure will likely change once we decide on the right direction.
</Callout>

<Video src="https://cdn.spline.design/_assets/docs/98c9c4a8-bf4c-4827-b1fc-17666466ab0f.mp4" />

#### Text Prompt [#text-prompt]

Describe your idea in words, and you'll get 4 images related to your text prompt.

#### Image Prompt [#image-prompt]

Use an image as your starting point. You'll get your original image plus 3 others, which are variations of the original you uploaded.

#### Generating the 3D Gaussian Splatting Volume [#generating-the-3d-gaussian-splatting-volume]

By pressing on any of the images generated from the text or image prompt, the 3D generation will get started and added to the generation queue. You can also use the "Generate 3D" button when hovering any of the images.

Once the 3D generation is done, you'll get a notification, and you can interact with your 3D scene, tweak interaction settings, and use the public link to embed it anywhere on the web.

<Callout>
  **Note:** Images with well-defined shapes work better. Abstract or overly complex shapes might not produce good results (yet).
</Callout>

## How it works [#how-it-works]

At its core, Spell is a type of diffusion model that can generate 3D worlds with realistic multi-view consistency across a wide range of categories, including people, objects, environments, 3D characters, and more.

The model can render images from multiple angles of a particular subject with high accuracy and detail, as well as generate controlled camera paths, all while staying consistent with the 3D scene.

<Video src="https://cdn.spline.design/_assets/docs/d77ba384-d26f-4050-bb13-8e3c63ddebd8.mp4" />

## Scene Settings [#scene-settings]

**Public Link** - share your 3D scene and embed it anywhere on the web.

**Background** - control the background of your scene.

<Image src="https://cdn.spline.design/_assets/docs/38f52500-02de-42c6-991b-b5497ea8f9b7.png" alt="image" />

### Play Settings [#play-settings]

The play settings affect your scene on the public link and when you go into play mode.

**Auto orbit** - Make your scene orbit automatically like a turntable.

**Interactions**

* **Page Scroll** - Setting Page scroll to Yes will allow the website to be scrolled when your scene is embedded and you hover it. Setting it to No will disable scrolling.
* **Touch Settings** - Decide how interacting with the scene works on touch devices.
* **Orbit** - Enable or Disable the ability to orbit the scene.
  * **Orbit Limits** - Apply limits on the orbit interaction.
* **Pan** - Enable or Disable the ability to pan the scene.
  * **Pan Limits** - Apply limits on the pan interaction.
* **Zoom** - Enable or Disable the ability to zoom the scene.
  * **Zoom Limits** - Apply limits on the zoom interaction.
* **On Hover** - Enable or Disable orbiting when hovering the scene.

<Image src="https://cdn.spline.design/_assets/docs/79f92a9f-19f6-4e68-9a6b-cab00c6b698a.png" alt="image" />

## Generation Queue [#generation-queue]

You can access the generation queue in the top right corner. There, you’ll find a list of all your running generations as well as those that have been completed.

<Image src="https://cdn.spline.design/_assets/docs/00a439ae-70dd-4a50-b004-5fdbeb5c645b.png" alt="image" />

## Explore [#explore]

On the Explore page, you’ll find a collection of examples and prompts to spark your creativity. It’s a great way to see what’s possible and find inspiration for your own 3D creations.

<Video src="https://cdn.spline.design/_assets/docs/d5164d1c-ab1d-41da-bc27-e835742f1c57.mp4" />
