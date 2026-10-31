---
source: https://gsap.com/docs/v3/Plugins/SplitText/kill()
title: "kill"
fetched: 2026-10-28
---

# kill

### kill( ) ;

Stops any autoSplit behavior. Does NOT revert anything or restore the original innerHTML.

### Details[​](#details "Direct link to Details")

Stops any `autoSplit` behavior (removes internal listeners for resize events and font loading), but it does **NOT** revert anything. To revert the SplitText (restore the original, unsplit `innerHTML`), use [`revert()`](/docs/v3/Plugins/SplitText/revert\(\).md) instead (which also calls `kill()` internally). Note that if you call `split()` again **after** killing an instance, `autoSplit` behavior will get re-enabled.
