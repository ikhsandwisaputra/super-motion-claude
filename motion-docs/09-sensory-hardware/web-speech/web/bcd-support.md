---
source: https://raw.githubusercontent.com/mdn/browser-compat-data/main/ (mdn/browser-compat-data main)
title: "Web Speech API support (BCD)"
fetched: 2026-10-28
---

# Web Speech API support (BCD)

Extracted from mdn/browser-compat-data (versions = first supporting version; 'no' = not supported).

| feature | chrome | chrome_android | edge | firefox | firefox_android | safari | safari_ios | samsunginternet_android | webview_android | status |
|---|---|---|---|---|---|---|---|---|---|---|
| api.SpeechRecognition | 139 / 33 prefix webkit | ~139 / 33 prefix webkit (mirror) | ~139 / 33 prefix webkit (mirror) | preview | ~preview (mirror) | 14.1 prefix webkit | ~14.1 prefix webkit (mirror) | ~139 / 33 prefix webkit (mirror) | ~139 / 33 prefix webkit (mirror) | standard |
| api.SpeechRecognition.continuous | 33 | no | ~33 (mirror) | preview | ~preview (mirror) | 17 / 14.1 (removed 17) partial | ~17 / 14.1 (removed 17) partial (mirror) | ~no (mirror) | ~no (mirror) | standard |
| api.SpeechRecognition.interimResults | 33 | ~33 (mirror) | ~33 (mirror) | preview | ~preview (mirror) | 14.1 | ~14.1 (mirror) | ~33 (mirror) | ~33 (mirror) | standard |
| api.SpeechRecognition.processLocally | 139 | no | ~139 (mirror) | preview | ~preview (mirror) | no | ~no (mirror) | ~no (mirror) | ~no (mirror) | experimental |
| api.SpeechRecognition.available_static | 139 | no | ~139 (mirror) | preview | ~preview (mirror) | no | ~no (mirror) | ~no (mirror) | ~no (mirror) | experimental |
| api.SpeechRecognition.install_static | 139 | no | ~139 (mirror) | preview | ~preview (mirror) | no | ~no (mirror) | ~no (mirror) | ~no (mirror) | experimental |
| api.SpeechRecognition.phrases | 142 | no | ~142 (mirror) | preview | ~preview (mirror) | no | ~no (mirror) | ~no (mirror) | ~no (mirror) | experimental |
| api.SpeechRecognition.grammars | 33 | ~33 (mirror) | ~33 (mirror) | preview | ~preview (mirror) | no | ~no (mirror) | ~33 (mirror) | ~33 (mirror) | standard |
| api.SpeechSynthesis | 33 | ~33 (mirror) | 14 | 49 | 62 | 7 | ~7 (mirror) | 3.0 | no | standard |
| api.SpeechSynthesis.getVoices | 33 | ~33 (mirror) | 14 | 49 | 62 | 7 | ~7 (mirror) | 3.0 | no | standard |
| api.SpeechSynthesis.voiceschanged_event | 33 | ~33 (mirror) | 14 | 49 | 62 | 16 | ~16 (mirror) | 3.0 | no | standard |
| api.SpeechSynthesisUtterance | 33 | ~33 (mirror) | 14 | 49 | 62 | 7 | ~7 (mirror) | 3.0 | no | standard |
| api.SpeechSynthesisUtterance.boundary_event | 33 partial | ~33 partial (mirror) | 14 | 49 | 62 | 7 | ~7 (mirror) | 3.0 | no | standard |

## Notes from BCD

- `api.SpeechRecognition` [chrome]: You'll need to serve your code through a web server for recognition to work.
- `api.SpeechRecognition.continuous` [chrome_android]: The property can be set, but has no effect.
- `api.SpeechRecognition.continuous` [safari]: Returns multiple results when set to `false`.
- `api.SpeechSynthesisUtterance.boundary_event` [chrome]: The `boundary` event does not fire as expected. See [bug 40715888](https://crbug.com/40715888).
