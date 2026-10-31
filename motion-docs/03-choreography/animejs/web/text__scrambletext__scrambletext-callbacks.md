---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks
title: "scrambleText callbacks | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [scrambleText callbacks](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks "scrambleText callbacks")

Execute functions during the scramble text animation.
Callbacks `Function` are specified directly in the `scrambleText()` parameters `Object`.

```js
animate(target, {
  innerHTML: scrambleText({
    text: 'Hello World',
    chars: 'uppercase',
  ┌────────────────────┐
  │ onChange: () => {} ├─ Callbacks
  └────────────────────┘
  }),
});
```

###### In this section

* [onChange](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange "onChange")

###### Previous

###### Next

* [seed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed "seed")
* [onChange](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange "onChange")
