---
source: https://gsap.com/docs/v3/HelperFunctions/helpers/smoothOriginChange
title: "Change transformOrigin without a jump"
fetched: 2026-10-28
---

# Change transformOrigin without a jump

If you want to change `transformOrigin` dynamically without a jump, you'd need to compensate its translation (x/y). Here's a function I whipped together for that purpose:

```
function smoothOriginChange(targets, transformOrigin) {
  gsap.utils.toArray(targets).forEach(function (target) {
    var before = target.getBoundingClientRect();
    gsap.set(target, { transformOrigin: transformOrigin });
    var after = target.getBoundingClientRect();
    gsap.set(target, {
      x: "+=" + (before.left - after.left),
      y: "+=" + (before.top - after.top),
    });
  });
}
```

**DEMO**

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/feb24447fb7c6a82e777a0110c281a31)

```
<div id="box">
  <span id="origin"></span>
</div>
```

```
body {
  background-color: #0e100f;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  max-height: 100vh;
  padding: 0;
  margin: 0;
  padding: 4rem;
  overflow: hidden;
}

#box {
  width: 200px;
  height: 200px;
  background: linear-gradient(166.9deg, #0ae448 53.19%, #0085d0 107.69%), url(/demo-assets/noise.webp);
  background-blend-mode: color-dodge;
  position: relative;
  border-radius: 10px;
}

#origin {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #0e100f;
  border-radius: 99%;
  bottom: 5px;
  right: 5px;
}
```

```
gsap.to("#box", {
  duration: 3,
  delay: 2,
  scale: 0.5,
  transformOrigin: "right bottom",
  ease: "sine.out",
  onComplete: anim_completed
});

function anim_completed() {
  smoothOriginChange("#box", "left top");
  gsap.to("#box", { duration: 3, scale: 1 });
  
  
  // ignore following line - just moving the white dot for demo purposes
  gsap.set("#origin", { y: -165, x: -165});
}

function smoothOriginChange(element, transformOrigin) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  var before = element.getBoundingClientRect();
  element.style.transformOrigin = transformOrigin;
  var after = element.getBoundingClientRect();
  gsap.set(element, {
    x: "+=" + (before.left - after.left),
    y: "+=" + (before.top - after.top)
  });
}
```
