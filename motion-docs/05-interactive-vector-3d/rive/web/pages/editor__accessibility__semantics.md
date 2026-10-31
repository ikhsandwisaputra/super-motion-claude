---
source: https://rive.app/docs/editor/accessibility/semantics
title: "Semantics"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Semantics

Make your experiences accessible to screen readers by defining semantic types, properties, states, and actions

> [!NOTE]
>
> See [Feature Support](/docs/feature-support#semantics) for the runtimes and versions that support semantics.

Semantics describe what an element is and how it should be understood. Adding semantics makes your experiences accessible, allowing screen readers to correctly describe and navigate your content.

**Architecture: Role / Trait / State / Actions**

* [Role](#semantic-role) — what the node is (button, checkbox, tab, etc.)
* [Properties](#semantic-properties) — additional information like label, value, or hint
* [Traits](#traits) — what the node can do (expandable, selectable, checkable, etc.)
* [State](#state) — what the node is doing (expanded, selected, checked, etc.)
* [Actions](#actions) - interactions triggered by the user (tap, increase, decrease)

> [!NOTE]
>
> **Semantics at Runtime**
>
> At runtime, semantics are converted into the platform’s accessibility system.
>
> On web, this creates accessible DOM elements (for example, divs with roles and attributes). On iOS and Android, a semantic tree is generated and exposed to the system’s accessibility APIs.
>
> Rive handles mapping your semantics to each platform automatically. For details on which runtimes currently support semantics, see [Feature Support](/docs/feature-support).

## Adding semantics

![Adding semantics](https://mintcdn.com/rive/RxXjLXlGuZbjNNO6/images/accessibility/semantics/adding-semantics.gif?s=e2afdd4c8aee6ff14f84003290dadce0)

**1. Add Semantics**

Select an element in your scene. In the right sidebar, click the `+` button in the **Semantics** panel to enable semantics for that element.

**2. Choose a Role**

Use the dropdown to assign a [semantic role](#semantic-role), such as button, image, or heading.

**3. Configure Properties**

Update the element’s [semantic properties](#semantic-properties), [Traits](#traits), and [State](#state).

### Semantic role

The semantic role defines what the element *is* (for example, a button or image). Screen readers use this to describe the element and determine how it should behave.

Each role has different available [properties](#semantic-properties).

If your element doesn’t match a specific role, you can leave it set to **None**.

> [!NOTE]
>
> Some elements, like text, automatically infer their semantic role. See [Semantic Inference](#semantic-inference) for more info.

## Semantic properties

Semantic properties provide additional information about an element, such as its label, value, or hint.

Available properties vary depending on the selected semantic role.

### Label

The label describes what the element is or does. This is what screen readers announce.

For example, a slider that controls volume might have the label:
`Volume`

> [!NOTE]
>
> Text elements automatically use their text content as the label. See [Semantic Inference](#semantic-inference) for more info.

### Heading (text only)

Text elements can be marked as headings to define structure and hierarchy.

Options include **None** and **Heading 1** through **Heading 6**.

Headings help screen reader users navigate your content more easily.

> [!NOTE]
>
> On web, Heading 1 maps to an `<h1>` element, Heading 2 to `<h2>`, and so on.

### Value (inputs only)

Some elements, like sliders and switches, have a **Value** property that reflects their current state.

For example, a volume slider might have a value of `70%`.

Use data binding to keep the semantic value in sync with the visual state.

***

## Traits

Traits define what an element *can do*, while states describe what it is doing right now.

Some semantic roles include traits, such as **expandable** or **selectable**. Enabling a trait makes its corresponding [state](#state) available.

The lock icon indicates a required trait for that semantic role. For example, a checkbox always includes the **selectable** trait.

***

## State

States represent the current value of the node.

For example, an element with the **selectable** trait will have a **selected** state.

Some state flags are only meaningful when their corresponding trait is set. Without the trait, the platform sees the property as not applicable.

Keep semantic states in sync with your Rive file. For example, bind a boolean from your view model to the **toggled** state of a switch. You could also key the **toggled** state in a timeline.

### Hidden

Hides the element from the accessibility tree.

> [!NOTE]
>
> Elements that are not visible (for example, hidden by layout or soloing) are automatically removed from the accessibility tree and do not require this property.
>
> Use **Hidden** when an element is still present in the scene (for example, opacity is set to 0) but should not be exposed to assistive technologies.

### Disabled

Marks the element as disabled and not interactive.

### Live Region

Indicates that the element’s content may update dynamically and should be announced by screen readers.

## Actions

Semantic actions are interaction events triggered by assistive technologies. You can listen for these actions and update your experience in response.

### Adding an action

**1. Create a Listener**

Select your object and [create a new Listener](/docs/editor/state-machine/listeners).

**2. Listen to a Semantic Action**

With your listener selected, in the right sidebar choose **Semantic Action** in the **Listen to** dropdown.

**3. Set the action type**

Select the [action type](#types-of-actions) to listen for.

### Types of actions

Actions include **tap**, **increase**, and **decrease**. Additional actions may be added in future releases.

#### Tap

Represents activating an element (similar to a click).

When a user activates an element using a screen reader, a **tap** action is triggered. You should listen for this action and handle it the same way as a standard click or pointer interaction.

> [!NOTE]
>
> It’s common to add both a **Click** and a **Semantic Tap** listener to the same element to support pointer and assistive interactions.

#### Increase / decrease

Used for adjustable elements like sliders.

Users trigger these actions through assistive technologies—for example, by focusing a slider and swiping up or down with a screen reader, or using arrow keys on a keyboard.

You should listen for **increase** and **decrease** and update your value accordingly.

### Semantic inference

Some roles and properties are inferred based on the element they are applied to.

For example, when adding semantics to a text element, the [Role](#semantic-role) is set to **Text**, and the [Value](#value) is automatically derived from the element’s text content.

***

## Testing semantics

Adding semantics is only the first step. You should always test your experience at runtime to make sure it behaves as expected.

Small issues—like a missing label or incorrect state—can make elements confusing or unusable for screen reader users.

### Runtime testing

The best way to test semantics is by using a screen reader.

* **macOS / iOS**: VoiceOver
* **Android**: TalkBack
* **Windows**: Narrator or NVDA

Turn on a screen reader and navigate through your experience:

* Move between elements
* Listen to how each element is announced
* Interact with buttons, sliders, and inputs

### What to check

As you test, pay attention to:

* **Labels** — Does each element clearly describe what it is or does?
* **Role** — Is the correct role announced (button, heading, etc.)?
* **Value** — Do dynamic elements (like sliders) report the correct value?
* **State** — Are states like selected, disabled, or expanded accurate?
* **Order** — Does navigation follow a logical flow?
