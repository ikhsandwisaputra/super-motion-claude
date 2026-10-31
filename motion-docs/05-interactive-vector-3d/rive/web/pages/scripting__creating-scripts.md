---
source: https://rive.app/docs/scripting/creating-scripts
title: "Creating Scripts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Creating Scripts

There are two ways to create a new script, from the Assets Panel and with the Scripting tool.

### Creating a Script from the Assets Panel

1. In the Assets Panel, click the `+` button.
2. Choose **Script** and select the [Protocol](/docs/scripting/protocols/overview) (type of script) you'd like to create.

![Create Script from Assets Panel](https://mintcdn.com/rive/IWvsXMpf9ofEUOAP/images/scripting/assets-panel-create-script.png?fit=max\&auto=format\&n=IWvsXMpf9ofEUOAP\&q=85\&s=cd2bcbad98ab57600bc5010dda8df139)

### Creating a Script with the Scripts Tool

1. Select the dropdown icon next to the Script button in the Toolbar
2. Select the [Protocol](/docs/scripting/protocols/overview) (type of script) you'd like to create.

![Create Script from Assets Panel](https://mintcdn.com/rive/PNFYxEcCteEOymSI/images/scripting/script-tool-create-script.png?fit=max\&auto=format\&n=PNFYxEcCteEOymSI\&q=85\&s=64d1afce289816d22946c8a12f881bcd)

New scripts are saved as Assets and can be found in the Assets Panel.

> [!TIP]
>
> Use **PascalCase** for script names and update the script’s type name accordingly.
>
> Example: If the script is named `MyConverter`, the main type should also be named `MyConverter`.

## Adding Scripts to your scene

To run [Node](/docs/scripting/protocols/node-scripts) and [Layout](/docs/scripting/protocols/layout-scripts) scripts, they need to be added to the scene.

1. Right-click the artboard you'd like to add your script to and select your script from the menu
2. Position the script object, keeping in mind that the script's position will determine where it's rendered
3. Select the group to set inputs (See [Script Inputs](/docs/scripting/script-inputs))

![Create Script from Assets Panel](https://mintcdn.com/rive/IWvsXMpf9ofEUOAP/images/scripting/add-script-to-artboard.gif?s=aff79a3097a5df14fa1ae942c1d12801)

> [!TIP]
>
> **Troubleshooting: If you don't see your script in the list:**
>
> 1. Make sure your script is in the Assets Panel.
> 2. Check the [Problems Panel](/docs/scripting/debugging/debug-panel#problems) for issues.
> 3. Make sure your script returns a function that returns a table with at least an `init` and `draw` function.
