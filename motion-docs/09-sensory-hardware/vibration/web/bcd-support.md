---
source: https://raw.githubusercontent.com/mdn/browser-compat-data/main/ (mdn/browser-compat-data main)
title: "Vibration + switch haptics support (BCD)"
fetched: 2026-10-28
---

# Vibration + switch haptics support (BCD)

Extracted from mdn/browser-compat-data (versions = first supporting version; 'no' = not supported).

| feature | chrome | chrome_android | edge | firefox | firefox_android | safari | safari_ios | samsunginternet_android | webview_android | status |
|---|---|---|---|---|---|---|---|---|---|---|
| api.Navigator.vibrate | 32 | 32 | ~32 (mirror) | 16 (removed 129) / 11 (removed 16) prefix moz | 79 partial / 16 (removed 79) | no | ~no (mirror) | ~32 (mirror) | 4.4.3 | standard |
| html.elements.input.switch | no | ~no (mirror) | ~no (mirror) | no | ~no (mirror) | 17.4 | ~17.4 (mirror) | ~no (mirror) | ~no (mirror) | experimental |

## Notes from BCD

- `api.Navigator.vibrate` [chrome_android]: Beginning in Chrome 55, this is not supported in cross-origin iframes.
- `api.Navigator.vibrate` [chrome_android]: Beginning in Chrome 60, this method requires a user gesture. Otherwise it returns `false`.
- `api.Navigator.vibrate` [firefox]: Until Firefox 26 included, when the vibration pattern was too long or any of its elements too large, Firefox threw an exception instead of returning `false` ([bug 884935](https://bugzil.la/884935)).
- `api.Navigator.vibrate` [firefox]: From Firefox 32 onwards, when the vibration pattern is too long or any of its elements too large, it returns `true` but truncates the pattern ([bug 1014581](https://bugzil.la/1014581)).
- `api.Navigator.vibrate` [firefox]: Beginning in Firefox 72, this is not supported in cross-origin iframes.
- `api.Navigator.vibrate` [firefox_android]: Vibration is disabled. If the window is visible, then `navigator.vibrate()` returns `true`, but no vibration takes place (regardless of hardware support). Originally, the intent was to disable it for cross-origin frames only ([bug 1591113](https://bugzil.la/1591113)), but the feature was not re-enabled due to abuse concerns ([bug 1653318](https://bugzil.la/1653318)).
- `api.Navigator.vibrate` [firefox_android]: Until Firefox 26 included, when the vibration pattern was too long or any of its elements too large, Firefox threw an exception instead of returning `false` ([bug 884935](https://bugzil.la/884935)).
- `api.Navigator.vibrate` [firefox_android]: From Firefox 32 onwards, when the vibration pattern is too long or any of its elements too large, it returns `true` but truncates the pattern ([bug 1014581](https://bugzil.la/1014581)).
- `api.Navigator.vibrate` [webview_android]: Beginning in version 55, this is not supported in cross-origin iframes.
- `api.Navigator.vibrate` [webview_android]: Beginning in version 60, this method requires a user gesture. Otherwise it returns `false`.
