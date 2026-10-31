---
source: https://rive.app/docs/scripting/configuration
title: "Configuration"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Configuration

Customize the Rive code editor with themes, typography, and execution settings.

You can customize the appearance and behavior of the Rive code editor by editing its configuration file. Your settings will be reflected in all code editor views for your user account.

## Opening the configuration

Press **⌘ + ,** on macOS or **Ctrl + ,** on Windows to open the editor configuration.

## Editing the config

The configuration file returns a Lua table. Start with the default configuration and override any settings you want to change.

### Example configuration

```lua theme={null}
-- Import the default configuration
local config = require('config/default')

config.theme = require('theme/shades-of-purple-super-dark')
config.code.fontSize = 14
config.code.lineHeight = 20
config.code.selectionCornerRadius = 5
config.code.executionTimeoutMs = 2000

return config
```

## Available options

| Option | Description |
| - | - |
| `config.theme` | The editor theme. |
| `config.code.fontSize` | Font size used in the code editor. |
| `config.code.lineHeight` | Height of each line of code. |
| `config.code.selectionCornerRadius` | Corner radius of the selection highlight. |
| `config.code.executionTimeoutMs` | Maximum time a script can run before being stopped. |

> [!TIP]
>
> To browse available themes, type:
>
> `config.theme = require('theme/')`
>
> The editor will show the full list through autocomplete.
>
> ![autocomplete editor themes](https://mintcdn.com/rive/z1_RNN9Om0gSByYc/images/scripting/config-theme.png?fit=max\&auto=format\&n=z1_RNN9Om0gSByYc\&q=85\&s=b47dae50dda3cc3f5d998d0728dccf12)
