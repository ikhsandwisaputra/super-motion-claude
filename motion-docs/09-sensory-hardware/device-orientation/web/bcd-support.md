---
source: https://raw.githubusercontent.com/mdn/browser-compat-data/main/ (mdn/browser-compat-data main)
title: "Device orientation / motion / sensors support (BCD)"
fetched: 2026-10-28
---

# Device orientation / motion / sensors support (BCD)

Extracted from mdn/browser-compat-data (versions = first supporting version; 'no' = not supported).

| feature | chrome | chrome_android | edge | firefox | firefox_android | safari | safari_ios | samsunginternet_android | webview_android | status |
|---|---|---|---|---|---|---|---|---|---|---|
| api.DeviceOrientationEvent | 7 | ~7 (mirror) | 12 | 6 | ~6 (mirror) | 17 | 4.2 | 1.0 | 3 | standard |
| api.DeviceOrientationEvent.requestPermission_static | 152 | ~152 (mirror) | ~152 (mirror) | no | ~no (mirror) | no | 14.5 | ~152 (mirror) | ~152 (mirror) | standard |
| api.DeviceOrientationEvent.absolute | 7 | ~7 (mirror) | 12 | 6 | ~6 (mirror) | 17 | no | ~7 (mirror) | ~7 (mirror) | standard |
| api.DeviceMotionEvent | 31 | ~31 (mirror) | 12 | 6 | ~6 (mirror) | 17 | 4.2 | ~31 (mirror) | ~31 (mirror) | standard |
| api.DeviceMotionEvent.requestPermission_static | 152 | ~152 (mirror) | ~152 (mirror) | no | ~no (mirror) | no | 14.5 | ~152 (mirror) | ~152 (mirror) | standard |
| api.Window.deviceorientation_event | 7 | ~7 (mirror) | 12 | 6 / 3.6 (removed 6) as mozOrientation | ~6 / 3.6 (removed 6) as mozOrientation (mirror) | 17 | 4.2 | ~7 (mirror) | 3 | standard |
| api.Window.deviceorientationabsolute_event | 50 | ~50 (mirror) | ~50 (mirror) | 110 | ~110 (mirror) | no | ~no (mirror) | ~50 (mirror) | ~50 (mirror) | standard |
| api.Window.devicemotion_event | 31 | ~31 (mirror) | 12 | 6 | ~6 (mirror) | 17 | 4.2 | ~31 (mirror) | ~31 (mirror) | standard |
| api.Gyroscope | 67 | ~67 (mirror) | ~67 (mirror) | no | ~no (mirror) | no | ~no (mirror) | ~67 (mirror) | ~67 (mirror) | standard |
| api.AbsoluteOrientationSensor | 67 | ~67 (mirror) | ~67 (mirror) | no | ~no (mirror) | no | ~no (mirror) | ~67 (mirror) | ~67 (mirror) | standard |
| api.RelativeOrientationSensor | 67 | ~67 (mirror) | ~67 (mirror) | no | ~no (mirror) | no | ~no (mirror) | ~67 (mirror) | ~67 (mirror) | standard |
| api.ScreenOrientation.angle | 38 | ~38 (mirror) | ~38 (mirror) | 43 | ~43 (mirror) | 16.4 | ~16.4 (mirror) | ~38 (mirror) | ~38 (mirror) | standard |
| api.ScreenOrientation.change_event | 38 | ~38 (mirror) | ~38 (mirror) | 43 | ~43 (mirror) | 16.4 | ~16.4 (mirror) | ~38 (mirror) | ~38 (mirror) | standard |
| api.ScreenOrientation.lock | 38 partial | 38 | ~38 partial (mirror) | 144 / 43 (removed 144) partial | 144 / 79 (removed 144) partial | no | ~no (mirror) | ~38 (mirror) | no | standard |

## Notes from BCD

- `api.DeviceOrientationEvent` [chrome]: Before version 50, Chrome provided absolute values instead of relative values for this event. Developers still needing absolute values may use the `deviceorientationabsolute` event.
- `api.DeviceOrientationEvent` [firefox]: Firefox 3.6, 4, and 5 supported `mozOrientation` instead of the standard DeviceOrientationEvent interface.
- `api.DeviceOrientationEvent` [samsunginternet_android]: Before Samsung Browser 5.0, Samsung Browser provided absolute values instead of relative values for this event. Developers still needing absolute values may use the `deviceorientationabsolute` event.
- `api.DeviceOrientationEvent` [webview_android]: Before version 50, Chrome provided absolute values instead of relative values for this event. Developers still needing absolute values may use the `deviceorientationabsolute` event.
- `api.ScreenOrientation.lock` [chrome]: Always throws `NotSupportedError`.
- `api.ScreenOrientation.lock` [firefox]: Always throws `NotSupportedError`.
- `api.ScreenOrientation.lock` [firefox_android]: The API exists but returns `NS_ERROR_UNEXPECTED`.
