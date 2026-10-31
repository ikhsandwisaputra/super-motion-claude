---
source: https://animejs.com/documentation/text/splittext/textsplitter-properties
title: "TextSplitter properties | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [TextSplitter properties](https://animejs.com/documentation/text/splittext/textsplitter-properties "TextSplitter properties")

Properties available on the `TextSplitter` instance returned by a `splitText()` function.

```js
const split = splitText(target, parameters);
      ┌──────┐
split.│lines │
split.│words ├─ Properties
split.│chars │
      └──────┘
```

| Name | Description |
| --- | --- |
| **$target** | Gets the split root element (`HTMLElement`) |
| **html** | Gets the html to split (`String`) |
| **debug** | Gets if the debug styles are visible or not (`Boolean`) |
| **includeSpaces** | Gets if the spaces should be wrapped within the text (`Boolean`) |
| **accessible** | Gets if the accessible clone element should be created (`Boolean`) |
| **lines** | Gets the lines elements (`Array<HTMLElement>`) |
| **words** | Gets the lines elements (`Array<HTMLElement>`) |
| **chars** | Gets the lines elements (`Array<HTMLElement>`) |
| **lineTemplate** | The line [html template](https://animejs.com/documentation/text/splittext/html-template) (`String`) |
| **wordTemplate** | The word [html template](https://animejs.com/documentation/text/splittext/html-template) (`String`) |
| **charTemplate** | The char [html template](https://animejs.com/documentation/text/splittext/html-template) (`String`) |

###### Previous

###### Next

* [refresh()](https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh "refresh()")
* [scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")
