---
source: https://motion.dev/docs/faqs
title: "FAQs"
fetched: 2026-10-28
---

# FAQs

Find answers to common questions about Motion, including browser support and other troubleshooting.

## Browser support?

Motion supports all modern browsers. It **doesn't support** Internet Explorer 11 or below.

## Why is my animation finishing instantly?

There are a couple reasons an animation might appear to finish instantly.

### 1. Your browser doesn't support `CSS.registerProperty`

If you're animating CSS variables and your browser doesn't support the [CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API), animations will finish instantly.

1. ### `scale: 0` in Safari

There's a bug in older versions of Safari where animating to `scale(0)` completes instantly.
