---
source: https://www.unicorn.studio/docs/mcp
title: "MCP - Unicorn Studio"
fetched: 2026-10-28
---

# Unicorn Studio MCP

Your AI agent can now design with Unicorn Studio. Connect Cursor, Claude, or Codex over MCP, describe what you want, and watch it build in your open editor: custom shaders written and checked against the same rules as Unicorn Agent, tuned effects from the library, text and images laid out in the scene, timeline animations, scroll, and hover events. The agent renders every shader change and looks at the result before it touches your design, so it can catch and fix its own mistakes. Everything it commits is a normal edit, one undo step at a time, and you can keep tweaking it by hand. When the scene is ready, the agent can publish it and drop the embed into the codebase it's already working in, so you can go from idea to a live effect on your site in a single conversation.

MCP is available on every plan. Free accounts include 200 agent changes a month, and Legend subscribers get unlimited changes.

## Getting started

### 1. Connect your agent

Open a project and click **Connect your agent** in the top bar. Pick your agent and follow the steps. You can also open the same dialog from the Agents section of your [account page](https://www.unicorn.studio/dashboard/account#agents).

The first time your agent uses Unicorn Studio, it opens your browser to sign in and approve the connection.

### 2. Allow agents

**Allow agents** lets connected agents read and edit the projects you have open. Approving your agent turns it on in that browser, and it stays on for every editor tab there until you turn it off. To turn it on in another browser, or off again, use the toggle at the top of the Connect your agent dialog in the editor.

Once your agent is signed in, the top bar button shows whether it can work in this tab. **Connected**, with a green dot, means the tab is ready. **Connecting**, with a yellow dot, takes a moment when the editor loads or after your network drops. **Agents off**, with a lock icon, means Allow agents is off in this browser: click the button and turn it on. If your agent opens a project for you while it's off, the dialog opens on its own.

### 3. Run your first prompt

Keep the project open and ask your agent:

```
Use Unicorn Studio to add a soft animated gradient to my open project.
```

A few more to try:

```
Add a headline that fades in and slides up on load, with a subtle grain over the whole scene.
```

```
Make three variations of this scene with different color palettes.
```

```
Publish this scene and add it to the hero of my homepage.
```

## Supported agents

Unicorn Studio works with any MCP client that supports remote servers over HTTP with OAuth sign-in. The server URL is:

```
https://agentmcp-qbght5huyq-uc.a.run.app/mcp
```

**Cursor**: click **Add to Cursor** in the Connect your agent dialog, or add this to `~/.cursor/mcp.json`:

```
{
  "mcpServers": {
    "unicorn-studio": {
      "url": "https://agentmcp-qbght5huyq-uc.a.run.app/mcp"
    }
  }
}
```

**Claude Code**: run this in your terminal, then run `/mcp` in Claude Code, choose `unicorn-studio`, and approve the connection in your browser.

```
claude mcp add --transport http unicorn-studio https://agentmcp-qbght5huyq-uc.a.run.app/mcp
```

**Claude.ai** (web and desktop): click **Add to Claude** in the Connect your agent dialog, or [use this link](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Unicorn%20Studio&connectorUrl=https%3A%2F%2Fagentmcp-qbght5huyq-uc.a.run.app%2Fmcp). It opens Claude with the connector filled in: confirm it, then click **Connect** and approve.

**Codex**: run this in your terminal. Codex opens your browser to approve the connection. If it doesn't, run `codex mcp login unicorn-studio`.

```
codex mcp add unicorn-studio --url https://agentmcp-qbght5huyq-uc.a.run.app/mcp
```

**ChatGPT**: turn on **Developer mode** in Settings → Security and login. Then open [ChatGPT Plugins](https://chatgpt.com/plugins), create a new MCP app named Unicorn Studio, and paste the server URL. Approve the connection, then add Unicorn Studio from the tools menu in a new chat. Developer mode availability depends on your account and workspace settings.

**Other agents**: add the server URL as a remote (HTTP) MCP server. Check your agent's docs for where its MCP config lives.

## How it works

### Which tab the agent works in

Allow agents is one setting for the whole browser, so every editor tab you open while it's on can take agent work. Tabs that were already open connect when you switch back to them.

When a chat starts, the agent picks the tab you used last. It stays in that tab for the rest of the chat, even if you switch to another one, so two chats can work in two tabs at the same time.

If no editor tab is open, the agent gets a link to your project or dashboard. Agents that can run commands open it for you; otherwise they'll ask you to.

### While the agent is working

While the agent is working, the open scene shows a purple border and pauses the canvas, layers, properties, timeline, and most shortcuts. You can still scroll those panels. Editing or creating an effect also covers that scene with a loader, and its label shows what the agent is doing. Other scenes aren't locked: click one in the scenes panel or on the canvas to keep working there. The agent keeps track of its own scene, so when it makes its next change, the editor switches back to that scene rather than letting the change land in yours.

The scene unlocks when the agent commits its change, adds a library effect, or says it's done. It also unlocks after 5 minutes without agent activity. To stop the agent at any point, click **Take control** next to the scene's name. Any previews it hasn't committed are discarded.

While the agent works in a tab, the tab's title starts with **Agent working**, so you can spot it among your tabs. Keep that tab open while the agent works. Some browsers pause background tabs, so if your agent says it can't reach the tab, bring it to the front.

### Previews and undo

Shader edits and new effects are built as previews first. The agent validates the shader with the real WebGL compiler, renders it offscreen, and looks at the image, and nothing in your design changes until it commits. If you change the layer while the agent is previewing, its commit is rejected so it can't overwrite your change.

Every commit is one undo step and saves the design, so Cmd+Z works exactly as it does for your own edits. Changes to controls, animations, layers, and scenes skip the preview step and apply as single undo steps too.

### Credits

MCP runs on your agent's own model, so tool calls don't use your AI credits.

### Managing connections

Connected agents are listed in the Agents section of your [account page](https://www.unicorn.studio/dashboard/account#agents), with when each one connected and was last used. **Revoke access** signs that agent out within about 30 seconds. It will need your approval again to reconnect. Your other agents stay connected.

### If something's off

* **The agent can't see Unicorn Studio's tools:** restart your agent, or reload its MCP servers, so it picks up the new server.
* **The agent says no editor tab is connected:** make sure a project is open and the top bar button reads **Connected** with a green dot. If it reads **Agents off**, click it and turn on Allow agents. The agent only sees projects open in the account you approved it with.
* **The agent loses track of the tab after a reload:** a reload gives the tab a new connection. Ask the agent to check the editor state again.

## What is MCP?

MCP (Model Context Protocol) is an open standard that lets AI agents use tools from other apps. Unicorn Studio's MCP server gives your agent the same abilities you have in the editor, so the agent you already use for code can design, animate, and ship WebGL scenes too.
