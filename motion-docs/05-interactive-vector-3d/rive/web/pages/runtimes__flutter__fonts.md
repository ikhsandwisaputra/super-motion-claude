---
source: https://rive.app/docs/runtimes/flutter/fonts
title: "Fonts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Fonts

Loading and replacing fonts dynamically at runtime.

## Swapping font assets at runtime

Fonts can be loaded dynamically at runtime. This allows you to localize your Rive content without increasing the file size of the exported .riv file.

Swapping a font asset replaces all instances of the font.

For more information, see [Loading Assets](/docs/runtimes/flutter/loading-assets).

## Fallback fonts

Fallback fonts are **not yet supported in Flutter**.

> [!NOTE]
>
> Fallback fonts are **not supported on the web**.
>
> For security reasons, browsers do not allow the canvas to access local system files, including fonts. As a result, only fonts explicitly provided to Rive can be used.
