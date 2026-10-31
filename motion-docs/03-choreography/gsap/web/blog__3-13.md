---
source: https://gsap.com/blog/3-13
title: "3.13 release | GSAP | Docs & Learning"
fetched: 2026-10-28
---

# 3.13 release

April 29, 2025 Â· 6 min read

[![Jack Doyle](https://gsap.com/img/jack-about.jpg)](https://twitter.com/greensock)

[Jack Doyle](https://twitter.com/greensock)

Founder and Code Connoisseur

[![Cassie Evans](https://gsap.com/img/cassie-about.jpg)](https://twitter.com/cassiecodes)

[Cassie Evans](https://twitter.com/cassiecodes)

Developer Education

## ð¥³ GSAP is now 100% FREE! ð¥³[â](https://gsap.com/blog/3-13/#-gsap-is-now-100-free- "Direct link to ð¥³ GSAP is now 100% FREE! ð¥³")

Thanks to [Webflow](https://webflow.com) GSAP is now **100% FREE** including ALL of the bonus plugins like [SplitText](https://gsap.com/docs/v3/Plugins/SplitText), [MorphSVG](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin), and all the others that were exclusively available to Club GSAP members. That's right - the entire GSAP toolset is FREE, **even for commercial use!** ð¤¯ You can read more about this on [Webflow's blog](https://webflow.com/blog/gsap-becomes-free)

#### What does this mean for the GSAP team?[â](https://gsap.com/blog/3-13/#what-does-this-mean-for-the-gsap-team "Direct link to What does this mean for the GSAP team?")

GSAP will continue to be actively maintained and supported by us, Jack, Cassie, and Rodrigo â the original pre-acquisition team. We'll keep innovating and pushing GSAP forward, as always. We're also collaborating with our new Webflow teammates on the next generation of native Webflow Interactions. We canât wait for whatâs to come!

#### Where do I get the whole GSAP toolset?[â](https://gsap.com/blog/3-13/#where-do-i-get-the-whole-gsap-toolset "Direct link to Where do I get the whole GSAP toolset?")

As of today, all of the bonus plugins have been added to the main [GSAP Github repository](https://github.com/greensock/GSAP) and [NPM package](https://www.npmjs.com/package/gsap), or you can download directly from [gsap.com](https://gsap.com/install).

#### What about Club GSAP members?[â](https://gsap.com/blog/3-13/#what-about-club-gsap-members "Direct link to What about Club GSAP members?")

There's simply no way GSAP would be what it is today without the support of Club GSAP members - we're eternally grateful for our wonderful community! ð While Club GSAP is going away, there's more good news for members:

* [No more complicated private repository access steps](https://gsap.com/resources/private-repo-migration/) or tokens to deal with! You can install GSAP and all the bonus plugins directly from the public NPM repository. ð Please [move off](https://gsap.com/resources/private-repo-migration/) the private repository by June 1, 2025. [It's easy!](https://gsap.com/resources/private-repo-migration/)
* You don't have to pay for a Club GSAP renewal or get the expense approved by your boss.
* Your community badge will be updated in the [forums](https://gsap.com/community) to indicate you have been a supporter.

## SplitText rewrite![â](https://gsap.com/blog/3-13/#splittext-rewrite "Direct link to SplitText rewrite!")

### 50% smaller, 14 new features![â](https://gsap.com/blog/3-13/#50-smaller-14-new-features "Direct link to 50% smaller, 14 new features!")

SplitText is a small JavaScript library that splits an HTML element's text into individual characters, words, and/or lines (each in its own, newly-created element), allowing you to create gorgeous staggered animations. It's one of GSAP's most popular plugins and it has been *completely* rewritten from the ground up with a myriad of improvements:

Improvements in v3.13

* **Screen reader Accessibility** - Adds `aria-label` to the split element(s) and `aria-hidden` to the freshly-created line/word/character elements.
* **Responsive re-splitting** - Avoid funky line breaks when resizing or when fonts load with `autoSplit` and `onSplit()`. It even offers automatic cleanup and resuming of animations too!
* **Slice right through nested elements** like `<span>`, `<strong>`, and `<a>` that span multiple lines. They're handled effortlessly with `deepSlice`.
* **Masking** - Wrap characters, words or lines with an extra clipping element for easy mask/reveal effects.
* **Flexible targeting** - The new `propIndex` applies incremented CSS variables like `--word: 3`.
* **Ignore certain elements** - Perhaps you'd like to leave `<sup>` elements unsplit, for example.
* **Improved emoji and foreign character support** - SplitText has never been so accurate.
* **Handle complex edge cases** with custom `RegExp` or `prepareText()`
* **New onSplit() and onRevert()** callbacks
* **New wordDelimiter options** - use RegExp, define replacement text, and experience better consistency
* **smartWrap** protects against odd word breaks when splitting only characters
* **standalone mode** SplitText is one of the only plugins that can be used without loading GSAP's core.

In short, the new version *blows the socks off* the original. And the best thing is that it's now **free for everyone!**

See the [docs](https://gsap.com/docs/v3/Plugins/SplitText/) for details about how all the new features work.

#### A few very uncommon breaking changes in SplitText v3.13[â](https://gsap.com/blog/3-13/#a-few-very-uncommon-breaking-changes-in-splittext-v313 "Direct link to A few very uncommon breaking changes in SplitText v3.13")

In order to modernize SplitText and make it more efficient, some rarely-used features were removed or changed:

* **Removed `position: "absolute"`** - this was a relic that was aimed at improving performance before CSS transforms existed in browsers. But it prevents natural text reflow (responsive) and since most people animate transforms rather than top/left, there's no benefit so we dropped it.
* Class name incrementing is now **element-based** - previously, if one SplitText handled multiple elements/targets and you used an auto-incremented class name like `wordsClass: "word++"`, it would increment from 1 to the total number of words across **all** elements whereas now it starts over for **each element** which is more intuitive and it allows you to isolate, for example, the 3rd word on each element using selector text. For example, if one SplitText splits two elements that each have 10 words, you'd see classes like word1, word2, word3...word20 previously whereas now you'll see two sets of word1...word10.
* **Removed `lineThreshold`** - the new algorithm for distinguishing between lines is no longer based solely on a vertical threshold so there's no need for a `lineThreshold` setting. Things should generally "just work".
* **Removed function-based `specialChars`** - due to SplitText's improved native splitting even of foreign characters, there should now be very little need for the old `specialChars` feature so we dropped it from the docs. The feature still exists for legacy reasons except that you cannot use a function-based value. You can still use an Array of characters.

## New: Animate to a CSS variable[â](https://gsap.com/blog/3-13/#new-animate-to-a-css-variable "Direct link to New: Animate to a CSS variable")

GSAP 3.13 allows you to animate to a named CSS variable like this:

```js
gsap.to(".target", { color: "var(--my-color)" });
```

To be clear, GSAP was already capable of animating a CSS variable itself:

```js
// NOT new - animates the variable value itself
gsap.to(".target", {"--my-color": "#ff0033"});
```

But now you can animate a **CSS property** to whatever a certain CSS variable is:

```js
// NEW!
gsap.to(".target", { color: "var(--my-color)"});
```

#### loading...

## Easier Webflow install![â](https://gsap.com/blog/3-13/#easier-webflow-install "Direct link to Easier Webflow install!")

All GSAP files can now be included directly from Webflow's settings, making it easier than ever for you to get started and make something amazing. Check out our [Webflow guide for more info, resources and more!](https://gsap.com/resources/Webflow/)

1. Go to your site in Webflow
2. Go to the **settings** panel
3. Click **GSAP integration**
4. Toggle **on** to include the core GSAP library & use the checkboxes to enable plugins.

![](https://gsap.com/assets/images/webflow-ui-a283b6d437385174b0eb5f82c731c917.png)

## Resources[â](https://gsap.com/blog/3-13/#resources "Direct link to Resources")

* [Full release notes on Github](https://github.com/greensock/GSAP/releases/tag/3.13.0)
* [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
* [Full documentation](https://gsap.com/docs/v3/)
* [Getting started with GSAP](https://gsap.com/resources/get-started)
* [Learning resources](https://gsap.com/resources)
* [Community forums](https://gsap.com/community/)
* [Webflow](https://webflow.com)
