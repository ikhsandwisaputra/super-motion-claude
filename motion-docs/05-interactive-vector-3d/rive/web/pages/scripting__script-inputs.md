---
source: https://rive.app/docs/scripting/script-inputs
title: "Script Inputs"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Script Inputs

Scripted Inputs are the bridge between your scripts and the Rive editor, allowing you to customize and control script behavior through custom input fields.

By defining inputs in your scripts, you expose configurable properties — like numbers, colors, booleans, view model instances, and artboard components — that appear directly in the Rive interface. This means you can write the logic once in a script, and then experiment freely with values, animate properties over time, bind data from external sources, and reuse the same script across multiple instances with different configurations.

Inputs transform static scripts into flexible, designer-friendly tools that enable true collaboration and rapid iteration.

[YouTube video player](https://www.youtube.com/embed/sO-v2eoNC2Y)

## Defining inputs

To make new script inputs, add them to the type and set the defaults in the script's return function.

```lua theme={null}
-- Define the script's data and inputs.
type ScriptInputs = {
  score: Input<number>,
  menu: Input<Data.MenuVM>,
  newArtboard: Input<Artboard<Data.NewVM>>,
}

-- Return a factory function that Rive uses to build the Node instance.
return function(): Node<ScriptInputs>
  return {
    score = 0,
    menu = late(),
    newArtboard = late(),
  }
end
```

> **[Learn by remixing](https://rive.app/community/files/28395-script-inputs?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

## Setting input values

To access the input properties in the right sidebar of the editor, select your [Node](/docs/scripting/protocols/node-scripts) or [Layout script](/docs/scripting/protocols/layout-scripts) in the Hierarchy Panel or the [Converter](/docs/scripting/protocols/converter-scripts) in the Data Panel.

![Node script input](https://mintcdn.com/rive/STu1MMXig5otFUf4/images/scripting/script-input.png?fit=max\&auto=format\&n=STu1MMXig5otFUf4\&q=85\&s=e76551d0bf256856fd5ffcc205994652)

## Data Binding inputs

You can use [Data Binding](/docs/editor/data-binding/overview) to control input values at runtime.

To data bind an input, right-click the input field in right sidebar, choose Data Bind, and select a
property.

![Data bind a converter input](https://mintcdn.com/rive/PNFYxEcCteEOymSI/images/scripting/converter-script-input-data-binding.png?fit=max\&auto=format\&n=PNFYxEcCteEOymSI\&q=85\&s=ee1704c499df1402a7302c8dd490817b)

## Listening for changes to inputs

The `update` function fires every time any input changes.

```lua theme={null}
function update(self: MyNode)
  print('An update changed')
end
```
