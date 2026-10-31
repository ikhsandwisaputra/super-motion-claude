---
source: https://rive.app/docs/editor/text/text-styles
title: "Text Styles"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Text Styles

[YouTube video player](https://www.youtube.com/embed/FeUOLDzvSDw)

A Text Style contains many of the familiar options that define how you'd like your text to be styled, and is applied to one or more runs. Currently, only Text Styles defined on a Text object can be applied to it. We'll introduce ways to share Text Styles across multiple Text objects or entire Rive files in future.

Each new Text object is created with a Text Style. Use the `+` action in the Inspector to create additional styles to be applied to specific Text Runs or to key between in an animation.

Each Text Style contains:

* Font
* Font Size
* Font Weight
* Line Height
* Fills
* Strokes

![Add multiple styles to a single text object](https://mintcdn.com/rive/t7xZuPf_MPCsV7Zu/images/editor/text/text-runs-styles.gif?s=fa762bf118fb1a812321408f845cbc21)

### Applying a style to a Text Run

There are two ways to apply a Text Style to a Text Run:

* Select the Text Run in the hierarchy, then use the Style dropdown in the Inspector.
* Select the `A+` icon alongside the style options in the Inspector, then use the popup menu to select the desired Text Run. Hovering each option will preview the result on the Stage.

![Apply a style to a chosen run](https://mintcdn.com/rive/t7xZuPf_MPCsV7Zu/images/editor/text/text-runs-apply.gif?s=a091696075de561fea9b70ea3b335f6f)

***

## Variables

Fonts that support variable axes or OpenType features will surface an options fly-out button on the Text Style within the Inspector. Use the fly-out to access and configure the available variables and features for the selected font.

Font variables can be animated in Rive. Open the variable fly-out in [animate mode](/docs/editor/fundamentals/design-vs-animate-mode) to key the available axes.

![Animate font variables](https://mintcdn.com/rive/t7xZuPf_MPCsV7Zu/images/editor/text/text-runs-variable.gif?s=e058a937f81d30691c174e01bf173c13)
