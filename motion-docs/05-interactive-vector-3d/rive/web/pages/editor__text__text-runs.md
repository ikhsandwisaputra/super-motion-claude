---
source: https://rive.app/docs/editor/text/text-runs
title: "Text Runs"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Text Runs

[YouTube video player](https://www.youtube.com/embed/UE23Agn1DZ0)

Runs allow you break your text up into sections — typically, they're used to apply a variety of styles to a single block of text. Whilst most tools manage text runs behind the scenes, Rive exposes them for greater control when dynamically changing text at runtime.

A Text object acts as a parent that can contain multiple Text Runs as children. Each Text Run represents a specific portion of the Text object and can have its own value and Text Style, allowing it to be targeted at runtime.

> [!NOTE]
>
> A Text Run may only have one Text Style applied at a time.

For example, an animation might greet a user with "Welcome back, username". By making "username" its own Text Run, you can give it a different style and [update it at runtime](/docs/runtimes/data-binding) with the user's name.

![Update text for a specific run](https://mintcdn.com/rive/iAAe8nJlAD_vtESu/images/editor/text/text-runs-update-run.gif?s=00c9a1f51b8232a68d2c82427fb46de1)

***

## Creating a Text Run

To create a Run, select the desired portion of text and select the 'Run from Selection' button in the Inspector. You can see Text Runs listed beneath the text object in the hierarchy.

Double click or press `Enter` with the text box selected to start editing text.

Toggle the 'Highlight Text Runs' option in the inspector for a visual guide of your current Text Runs. Hovering a run in the hierarchy also highlights its location within the text.

![Split text into multiple runs](https://mintcdn.com/rive/iAAe8nJlAD_vtESu/images/editor/text/text-runs-create-run.gif?s=e4606199b795d478d937d4275e1d2360)

***

## Managing Text Runs

Select a Text Run in the hierarchy for inspector options:

* **Text Value:** Update the text value for the run. Key this value in [animate mode](/docs/editor/fundamentals/design-vs-animate-mode).
* **Edit Text Run:** Initiate the text editor with the run pre-selected.
* **Merge with Next:** Combine the selected run with the next run.
* **Merge with Previous:** Combine the selected run with the previous run.
* **Delete text Run:** Delete the run and its contents.
* **Style:** Assign one of the Text Styles defined on the text object. Key this value in [animate mode](/docs/editor/fundamentals/design-vs-animate-mode).

![Assign a Text Style to a Text Run](https://mintcdn.com/rive/iAAe8nJlAD_vtESu/images/editor/text/text-runs-managing-run.gif?s=7fc27758d6bbd6fdb393359e53bc5897)
