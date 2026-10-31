---
source: https://rive.app/docs/editor/state-machine/transitions
title: "Transitions"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Transitions

Transitions define how and when a State Machine moves from one state to another. A transition is made up of four parts:

> **Path**
>
> The direction the transition travels.
>
> **Example**: A character might have one path from **Idle** to **Walk**, and another from **Walk** back to **Idle**.

> **Conditions**
>
> When the transition occurs.
>
> **Example**: A character might transition to **Walk** when a button is pressed, then back to **Idle** when the button is released.

> **Properties**
>
> How the transition behaves.
>
> **Example**: You might set the transition duration to `0.2` seconds so the change between states feels smoother.

> **Actions**
>
> Extra behavior to perform when the transition occurs.
>
> **Example**: A transition might fire an event, set a property value, or align a target.

[YouTube video player](https://www.youtube.com/embed/C4KNgrrqt7k)

## Transition path

A transition path determines how the State Machine moves from one state to another.

To create a transition path, move your cursor near the state you want to leave until the circle appears. Click and drag from the circle to the state you want to transition to.

![Creating a transition](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/create-transition.gif?s=64b102fcbad73166ba37e41be22781d1)

Once you connect two states, the transition path shows a circle with an arrow icon indicating the transition direction. In this example, the State Machine can move from Timeline 1 to Timeline 2, but not from Timeline 2 back to Timeline 1.

To allow the State Machine to move back to Timeline 1, create another transition path starting from Timeline 2.

![Creating a reverse transition](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/create-reverse-transition.gif?s=4007b1268b26571a09e749d5738677bc)

You can create multiple transitions between the same two states. Each transition can have different [conditions](#transition-conditions), allowing you to create “or” logic.

![Creating an "or" transition](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/transition-or.gif?s=e35b47defb0cc546aee5368a451f3c40)

## Transition Conditions

Conditions determine when a transition can occur.

> [!NOTE]
>
> Without conditions, transitions fire as soon as they are reached. This can cause a State Machine to rapidly move between states or skip directly to a single animation.

[YouTube video player](https://www.youtube.com/embed/30HJo_DaLDk)

### Adding a condition

To add a condition to a transition, select the transition, then click the plus button next to **Conditions**.

A condition has three parts:

* **Source value** - the value or event the condition watches
* **Operator** - how the source value is compared
* **Comparison value** - the value the source value is compared against

For example, a character might transition from **Idle** to **Walk** when `isWalking` is `true`.

In this condition, `isWalking` is the **source value**, **equals** is the **operator**, and `true` is the **comparison value**.

![Add a transition condition](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/add-condition.gif?s=f920b5c661f3616ba6f09e29a8ad149d)

#### The source value

Conditions can be driven by many different sources, including:

* View Model properties
* Events
* Built-in properties such as artboard width, height, and ratio

![Source value](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/source-value.png?fit=max\&auto=format\&n=eGi2QSd8r2HxXsio\&q=85\&s=0ce22f8b11ade43d8ca3398602d5409e)

#### The operator

Conditions can use comparisons such as equals, does not equal, greater than, greater than or equal to, less than, and less than or equal to. The available comparisons depend on the type of value being compared.

![Operators](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/comparisons.png?fit=max\&auto=format\&n=eGi2QSd8r2HxXsio\&q=85\&s=6c278a3e543027bedb6d69160e66c178)

#### Comparison value

The comparison value is the value the source value is compared against.

![Comparison value](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/comparison-value.png?fit=max\&auto=format\&n=eGi2QSd8r2HxXsio\&q=85\&s=c19679ae5343d20ff41fecbae9970c94)

You can enter a fixed comparison value, such as `true`, `100`, or `"mobile"`. You can also data bind the comparison value to another property, allowing the transition to compare against dynamic data.

For example, a transition might occur when `speed` is greater than a data-bound `walkThreshold` value.

### Adding multiple conditions

You can add multiple conditions to a single transition. All conditions must be met before the transition occurs.

![Adding multiple conditions](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/or-condition.png?fit=max\&auto=format\&n=eGi2QSd8r2HxXsio\&q=85\&s=2d0ffa15b5c4564d2a0e575984a82459)

## Transition properties

Once you’ve added a transition, selecting the direction indicator will allow you to configure the transition. There are three different sections to the transition panel, the transition properties, conditions, and interpolation.

> [!NOTE]
>
> Selecting multiple transitions allows you to update multiple properties at once.

![Transition properties](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/transition-properties.png?fit=max\&auto=format\&n=eGi2QSd8r2HxXsio\&q=85\&s=5d0b1176207f2ec97dc5a5a59136e073)

### Duration

The duration property describes how long it takes for a transition to occur.

The duration is set to zero by default, meaning the transition happens immediately. So, when we transition between these two animations, it appears as though the object snaps from one side of the artboard to the other.

<video />

> **[Learn by remixing](https://rive.app/community/files/28136-transitions-demos?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

### Exit Time

Exit Time tells the state machine how much of the state must play before transitioning.

By default, Exit Time is unchecked. To enable Exit Time, use the checkbox. Once the setting is enabled, you can use either a time value or percent.

For example, if you want the state machine to play the entire animation before transitioning, you can either enter the duration of the animation, or use 100%.

![Exit time 100%](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/exit-time-100.gif?s=f7fbfe1db6a194a8deb1c8f8af88012b)

### Pause source when exiting

**Pause Source When Exiting** pauses the animation in the state you are leaving while the transition plays.

In this example, the up-and-down motion pauses as soon as the transition begins.

![Pause when exiting](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/pause-source-when-exiting.gif?s=9c9e3d30849a5498524b83e27af1b0ca)

### Allow exit during transition

**Allow exit during transition** controls whether the State Machine can leave a transition before that transition finishes.

For example, if a button is transitioning from **Idle** to **Hover** and the user moves their cursor away, **Allow exit during transition** lets it transition back to Idle immediately.

![Allow exit during transition](https://mintcdn.com/rive/eGi2QSd8r2HxXsio/images/editor/state-machine/transitions/allow-exit-during-transition.gif?s=75c77de944ba8ea1d558ae532be1691c)

### Interpolation

You can add interpolation to your transition at the bottom of the Transitions Panel. By default, the interpolation is set to linear, but you can use the cubic and other interpolations.

If you are unfamiliar with the basics of Interpolation, see [Interpolation (Easing)](/docs/editor/animate-mode/interpolation-easing).

## Actions

Transitions can also perform actions when the transition occurs.

Unlike conditions, which determine whether a transition can happen, actions perform an operation when the transition is triggered.

Actions can be used to:

* Set property values
* Report events
* Align targets
* Control focus
* Fire a scripted action

> [!NOTE]
>
> Actions can also be fired at the start or end of a state.
>
> See [State Actions](/docs/editor/state-machine/states#actions).

[YouTube video player](https://www.youtube.com/embed/4Uuu0MkBawE)

### Creating an action

![Creating a transition action](https://mintcdn.com/rive/hgtDuQKKVCQlJ56m/images/editor/state-machine/transitions/transition-action.gif?s=f9cceaf4f7ea7fffbaf8218f1d319f80)

**1. Add an action**

With a transition selected, go to the Actions tab, click the `+` button, and select an action type.

**2. Configure the action**

Configure the action based on the action type.

#### Action timing

Each action can run at either:

* **Start** — Runs when the transition begins
* **End** — Runs after the transition completes

## Randomize exit

**Randomize Exit** lets a state choose from its outgoing transition paths at random.

To use it, select the origin state and enable **Randomize Exit**. The state lists each path leaving it and lets you assign a weight to each path.

The higher the weight, the more likely that path is to be chosen. For example, if **Timeline 1** has a weight of `3` and **Timeline 2** has a weight of `1`, the State Machine has a 75% chance of transitioning to **Timeline 1** and a 25% chance of transitioning to **Timeline 2**.

## Disabling a transition

You can temporarily disable a transition without deleting it. Disabling is useful when you want to isolate part of a state machine for testing, or temporarily remove a path without losing its configuration.

There are two ways to toggle a transition's enabled state:

* **From the transition panel:** select the transition and click the enable/disable icon in the panel.
* **From the canvas:** right-click the transition and choose **Disable transition** (or **Enable transition** if it's already disabled).

![Disable transition from the right-click menu](https://mintcdn.com/rive/SeU7WPw4QsNLOnTy/images/editor/state-machine/state-machine-transition-disable.gif?s=f600c82fd4139a8d6fefd9e7ad51c813)
