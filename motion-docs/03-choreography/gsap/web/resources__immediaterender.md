---
source: https://gsap.com/resources/immediaterender
title: "immediateRender"
fetched: 2026-10-28
---

# immediateRender

The `immediateRender` property of [from()](/docs/v3/GSAP/Timeline/from\(\).md) and [fromTo()](/docs/v3/GSAP/Timeline/fromTo\(\).md) tweens is one of those things you only find out about when it gives you unexpected results.

[from()](/docs/v3/GSAP/Timeline/from\(\).md) and [fromTo()](/docs/v3/GSAP/Timeline/fromTo\(\).md) tweens are special as they set `immediateRender` to `true` as soon as they are created. This helps especially when creating staggered builds where you don't want elements to appear until scheduled. The one case where it is important to change the default behavior is when you have **multiple from()/fromTo() tweens on the same property of the same object**. The video below explains in detail.

Video Walkthrough

<br />

Want more great tips and tricks like this? Our friend Carl over at the [Creative Coding Club](https://www.creativecodingclub.com/bundles/creative-coding-club?ref=44f484) has you covered. Learn the tips and tricks the pros use to make their animations shine. [Join Today](https://www.creativecodingclub.com/bundles/creative-coding-club?ref=44f484).

## **Demos**[​](#demos "Direct link to demos")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/dPvJoBN)

```
<div id="banner">
  <div id="green" class="box green"></div>
  <div id="blue" class="box blue"></div>
   <div id="red" class="box red"></div>
</div>
```

```
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #0e100f;
}

#banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0;
  position: relative;
  width: 800px;
  max-width: 100%;
  height: 410px;
  background: #191919;
  border-radius: 12px;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background-blend-mode: color-dodge;
  will-change: transform;
}

.box.green {
  background: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%),
    url("/demo-assets/noise-e82662fe.webp");
}

.box.blue {
  background: radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%, #5be1ff 84.9%, #00bae2 94.79%),
    url("/demo-assets/noise-e82662fe.webp");
}

.box.red {
  background: linear-gradient(165.72deg, #f7bdf8 21.15%, #cd237f 81.93%),
    url("/demo-assets/noise.webp");
}
```

```
gsap.set("#banner", {opacity:1}) // avoid Flash of Unstyled Content (fouc)

const tl = gsap.timeline({id:"tl", paused:true})
tl.from("#green", {opacity:0, y:-50})
  .from("#blue", {opacity:0, y:50})
  .from("#red", {opacity:0, scale:2})
  


GSDevTools.create({animation:tl})
```

Plugins[GSDevTools](/docs/v3/Plugins/GSDevTools.md)

the default of `immediateRender: true` however can cause problems when creating multiple from() tweens on the same properties of the same element.

Notice in the demo below that you don't see green animate a second time.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/Wbpdvqa)

```
<div id="banner">
  <div id="green" class="box green"></div>
  <div id="blue" class="box blue"></div>
</div>
```

```
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #0e100f;
}

#banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0;
  position: relative;
  width: 800px;
  max-width: 100%;
  height: 410px;
  background: #191919;
  border-radius: 12px;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background-blend-mode: color-dodge;
  will-change: transform;
}

.box.green {
  background: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%),
    url("/demo-assets/noise-e82662fe.webp");
}

.box.blue {
  background: radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%, #5be1ff 84.9%, #00bae2 94.79%),
    url("/demo-assets/noise-e82662fe.webp");
}
```

```
gsap.set("#banner", {opacity:1}) // avoid Flash of Unstyled Content (fouc)
gsap.defaults({duration:1})

const tl = gsap.timeline({id:"tl", paused:true})
tl.from("#green", {opacity:0})
  .from("#blue", {opacity:0})
  .from("#green", {opacity:0})
  


GSDevTools.create({animation:tl})
```

Plugins[GSDevTools](/docs/v3/Plugins/GSDevTools.md)
