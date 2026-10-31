---
source: https://rive.app/docs/editor/fundamentals/groups
title: "Groups"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Groups

Use groups to organize your graphics or to add extra transform spaces.

[YouTube video player](https://www.youtube.com/embed/FnnZV57Dp3c)

Activate the Group tool with the `G` shortcut. Click anywhere in an artboard to add a new group. Now drag and drop objects into the group in the Hierarchy.

You can also wrap a selection of shapes into a group with `⌘`+`G` in macOS or `Ctrl`+`G` in Windows.

Unwrap a group with `⌘`+`Shift`+`G` in macOS or `Ctrl`+`Shift` +`G` in Windows.

## Group style

The Style property of a group can be set to Group or Target.

### Group

Group is the default behavior, which behaves as described in the [Selection and Navigation](/docs/editor/interface-overview/selection-and-navigation).

### Target

The Target option draws an icon on the stage that is visible regardless of whether the group has children (usually a group only displays an icon if it is empty). Target visibility can be toggled on or off in the View Options menu.

Targets are directly selectable on the stage. You don't need to use [Deep Select](/docs/editor/interface-overview/selection-and-navigation#deep-select) to select them.

![Setting the Style of a group to Target in the Inspector, which adds a selectable target icon on the stage](https://mintcdn.com/rive/Lwf3q5I_sETfAKaI/images/editor/fundamentals/groups-targets.gif?s=fd9245d507c29e91aed35b03f9e7f23a)

The Target option is particularly useful when working with Constraints.

> [!TIP]
>
> If targets aren't visible on the stage, open the **View Options** menu and make sure **Targets** is enabled.
>
> ![Enabling Targets in the View Options menu so target icons appear on the stage](https://mintcdn.com/rive/Ij2wXPG9-c5w_HuM/images/editor/interface/toggle-show-targets.gif?s=42877ee72513a3cc376668a0c6b09324)

> **[Constraints](/docs/editor/constraints/)**
>
> Constraints are a way to control the properties of an object through another target object. Some constraints can set limits on these properties (and their hierarchical relationships), while others can copy properties from one object to another.
