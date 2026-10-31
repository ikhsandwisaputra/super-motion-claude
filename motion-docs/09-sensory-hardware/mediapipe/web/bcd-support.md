---
source: https://raw.githubusercontent.com/mdn/browser-compat-data/main/ (mdn/browser-compat-data main)
title: "Camera + frame-callback support (BCD)"
fetched: 2026-10-28
---

# Camera + frame-callback support (BCD)

Extracted from mdn/browser-compat-data (versions = first supporting version; 'no' = not supported).

| feature | chrome | chrome_android | edge | firefox | firefox_android | safari | safari_ios | samsunginternet_android | webview_android | status |
|---|---|---|---|---|---|---|---|---|---|---|
| api.MediaDevices.getUserMedia | 53 | ~53 (mirror) | 12 | 36 | ~36 (mirror) | 11 | ~11 (mirror) | 6.0 | 53 | standard |
| api.HTMLVideoElement.requestVideoFrameCallback | 83 | ~83 (mirror) | ~83 (mirror) | 132 | ~132 (mirror) | 15.4 | ~15.4 (mirror) | ~83 (mirror) | ~83 (mirror) | standard |
| api.HTMLVideoElement.cancelVideoFrameCallback | 83 | ~83 (mirror) | ~83 (mirror) | 132 | ~132 (mirror) | 15.4 | ~15.4 (mirror) | ~83 (mirror) | ~83 (mirror) | standard |
| api.OffscreenCanvas | 69 | ~69 (mirror) | ~69 (mirror) | 105 | ~105 (mirror) | 16.4 | ~16.4 (mirror) | ~69 (mirror) | ~69 (mirror) | standard |
| api.GPU | 144 / 113 (removed 144) partial | 121 | ~144 / 113 (removed 144) partial (mirror) | 141 partial | no | 26 | ~26 (mirror) | ~121 (mirror) | ~121 (mirror) | standard |
| api.WebGL2RenderingContext | 56 | 58 | ~56 (mirror) | 51 | ~51 (mirror) | 15 | ~15 (mirror) | ~58 (mirror) | ~58 (mirror) | standard |

## Notes from BCD

- `api.MediaDevices.getUserMedia` [chrome]: If you need this capability before version 53, refer to `navigator.webkitGetUserMedia`, a prefixed form of the deprecated [`navigator.getUserMedia`](https://developer.mozilla.org/docs/Web/API/Navigator/getUserMedia) API.
- `api.MediaDevices.getUserMedia` [firefox]: If you need this capability before version 36, refer to `navigator.mozGetUserMedia`, a prefixed form of the deprecated [`navigator.getUserMedia`](https://developer.mozilla.org/docs/Web/API/Navigator/getUserMedia) API.
- `api.MediaDevices.getUserMedia` [firefox]: Before Firefox 55, `getUserMedia()` incorrectly returns `NotSupportedError` when the list of constraints specified is empty, or has all constraints set to `false`. Starting in Firefox 55, this situation now correctly calls the failure handler with a `TypeError`.
- `api.MediaDevices.getUserMedia` [firefox]: When using the Firefox-specific `video` constraint called `mediaSource` to request display capture, Firefox 66 and later consider values of `screen` and `window` to both cause a list of screens _and_ windows to be shown.
- `api.MediaDevices.getUserMedia` [firefox]: Starting in Firefox 66, `getUserMedia()` can no longer be used in sandboxed `<iframe>`s or `data` URLs entered in the address bar by the user.
- `api.GPU` [chrome]: Supported on ChromeOS, macOS, Windows, and Linux (Intel Gen12+ GPUs only).
- `api.GPU` [chrome]: Supported on ChromeOS, macOS, and Windows.
- `api.GPU` [firefox]: Supports all contexts except service workers. See [bug 1942431](https://bugzil.la/1942431).
- `api.GPU` [firefox]: Supports Windows since Firefox 141. See [bug 1972486](https://bugzil.la/1972486).
- `api.GPU` [firefox]: Supports macOS Tahoe on Apple silicon since Firefox 145. See [bug 1992212](https://bugzil.la/1992212).
- `api.GPU` [firefox]: Supports older macOS versions on Apple silicon since Firefox 147. See [bug 1993341](https://bugzil.la/1993341).
- `api.GPU` [firefox]: Does not support macOS on Intel CPUs. See [bug 2004105](https://bugzil.la/2004105).
- `api.GPU` [firefox]: Does not support Linux. See [bug 2006676](https://bugzil.la/2006676).
