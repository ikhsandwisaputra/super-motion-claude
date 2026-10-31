---
source: https://rive.app/docs/editor/ai/mcp
title: "Rive MCP Integration"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Rive MCP Integration

> [!NOTE]
>
> MCP integration is currently available only in the desktop Editor for Windows and macOS.

You can connect the Rive Editor to AI tools through MCP (Model Context Protocol). The first set of tools are designed to let AI handle repetitive tasks, like creating complex View Models, State Machines with hundreds of states/layers, Layouts, Shapes, and more.

[YouTube video player](https://www.youtube.com/embed/_a2Y4vzuGAs)

### Supported features

* **Create and manage Rive files** — add, rename, resize, arrange, and focus artboards.
* **Inspect and edit the scene** — query hierarchies, select objects, update properties, rename, duplicate, reorder, reparent, or delete elements.
* **Build designs** — create shapes, paths, layouts, component instances, component lists, and asset-based elements.
* **Create animation and interaction** — edit linear animations, state machines, states, transitions, conditions, keyframes, and interpolation.
* **Work with data binding** — create view models, properties, instances, bindings, and custom property groups.
* **Edit scripts and shaders** — manage Luau scripts and WGSL shaders, update source code, run diagnostics, recompile, test, search code, and read console output.

> [!NOTE]
>
> This list of features will evolve over time as more tools are added.

## Installation

### Using Cursor

**1. Open Rive**

Install and open the latest version of the [Rive](https://rive.app/downloads) desktop app for Mac or Windows.

**2. Set up Cursor**

Create a [Cursor](https://www.cursor.com/) account and install the app.

**3. Open Cursor settings**

Open Cursor and navigate to the settings panel in the top right corner.

![Open cursor settings](https://mintcdn.com/rive/4WyvnoR1218cyi0r/images/editor/cursor-settings-button.png?fit=max\&auto=format\&n=4WyvnoR1218cyi0r\&q=85\&s=39bb9802e31872b2317fed055e5cf24b)

**4. Add custom MCP**

Open the Tools & MCPs tab and click Add Custom MCP.

![Open Cursor MCPs tab](https://mintcdn.com/rive/4WyvnoR1218cyi0r/images/editor/cursor-mcp-settings.png?fit=max\&auto=format\&n=4WyvnoR1218cyi0r\&q=85\&s=d82531f4741d02cdd01233d7517a5f25)

**5. Save the configuration**

Save the following JSON snippet to your computer as `mcp.json`.

```json theme={null}
{
  "mcpServers": {
      "rive": {
          "url": "http://127.0.0.1:9791/mcp"
      }
  }
}
```

**6. Enable connection**

Turn the MCP connection `On`

**7. Verify connection**

If everything was installed correctly, you should see Rive as an available MCP server.

![Cursor verified](https://mintcdn.com/rive/4WyvnoR1218cyi0r/images/editor/cursor-mcp-connection.png?fit=max\&auto=format\&n=4WyvnoR1218cyi0r\&q=85\&s=59ca6c71d1cc1317320ab8272eae0e16)

> [!NOTE]
>
> For the Rive server to be available, you must have the Rive Early Access app opened.

Additional information on setting up MCP can be found [here](https://docs.cursor.com/context/model-context-protocol).

### Using Claude in Terminal

[YouTube video player](https://www.youtube.com/embed/5_h51PdNhsU)

**1. Open Rive**

Install and open the latest version of the [Rive desktop app](https://rive.app/downloads) for macOS or Windows.

**2. Add the MCP server**

Run the following command in your terminal:

```shell theme={null}
claude mcp add --transport http rive http://127.0.0.1:9791/mcp
```

**3. Start Claude**

Run Claude and follow the prompts:

```shell theme={null}
claude
```

## What can it do?

Once Cursor is installed and everything is set up correctly, it's time to start prompting the AI.

**1. Open your Rive file**

Have a Rive File open and an Artboard created.

**2. Enter your prompt**

Type your prompt into the chat UI and hit enter. The AI will take a moment to process the request.

Example prompt:

```
Create a State Machine about birds with 20 states and 2 layers
```

**3. Complete the interaction**

Once the request has been processed, type **End Prompt** to allow the AI to make changes to the Rive file.
