---
source: https://rive.app/docs/editor/interface-overview/stage
title: "Viewport"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Viewport

Use the viewport to work with the Stage, scripts, and the AI Agent.

The viewport is the center area of the editor. It can show the [Stage](#stage), scripts, and the **AI Agent**.

You can [split the viewport](#splitting-the-viewport) to view multiple panels side by side or stacked vertically. This is useful when you want to edit artwork while viewing a script, or keep the AI Agent open alongside the Stage.

![Viewport](https://mintcdn.com/rive/pwk3GqUgisWbhN3v/images/editor/interface/viewport.png?fit=max\&auto=format\&n=pwk3GqUgisWbhN3v\&q=85\&s=25b95ce34876a682c1375ba36057da94)

## Stage

The Stage is an infinite canvas where you can place artboards containing all your graphics.

![Stage](https://mintcdn.com/rive/UizvjHP7hhSBQqPg/images/interface/stage.png?fit=max\&auto=format\&n=UizvjHP7hhSBQqPg\&q=85\&s=a9c2ca417aaa550da7bab15bf694d2e3)

[Artboards](/docs/editor/fundamentals/artboards) live on the stage. You can pan and zoom around the stage, select objects, and use guides or rulers to help position elements.

> [!TIP]
>
> To learn how to navigate and select items on the stage, see [Keyboard Shortcuts](/docs/editor/keyboard-shortcuts).

### View options menu

![View options](https://mintcdn.com/rive/UizvjHP7hhSBQqPg/images/interface/stage-view-options.png?fit=max\&auto=format\&n=UizvjHP7hhSBQqPg\&q=85\&s=b4a0c7ed7a5d2d660cdbe2a99e4643bb)

The View Options menu controls what appears on the stage while you work. Use it to adjust zoom, snapping, guides, and visual overlays for animation and interaction tools.

* **Zoom and snapping:** adjust the stage zoom level, enable snapping, or snap objects to pixels
* **User Cursors:** show or hide other users' cursors
* **Tool overlays:** show or hide gizmos, bones, targets, motion paths, joysticks, events, layouts, and text modifier ranges
* **Show Final Playback:** show the final playback state while editing
* **Rulers and guides:** show rulers, lock guides, or clear guides from the stage

### Stage background colors

You can set separate stage background colors for Design mode and Animate mode.

Using different colors can make it easier to tell which mode you are in at a glance. This can help prevent accidentally editing keys or animation values when you meant to work in Design mode.

To change the stage background colors, deselect everything, then use the background color options in the [Inspector](/docs/editor/interface-overview/inspector).

<video />

> [!NOTE]
>
> Stage background colors are only visible in the editor. They do not affect the artboard background, exports, or runtime appearance.

## Splitting the Viewport

To split the viewport, drag a panel into the viewport or click **Split Editor Right** from the panel options.

<video />

To open the **AI Agent** in the viewport, click the **…** button in the **Agent** panel in the sidebar, then select **Open in Viewport**.
