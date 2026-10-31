---
source: https://gsap.com/docs/v3/Plugins/Draggable/getDirection()
title: "getDirection"
fetched: 2026-10-28
---

# getDirection

### getDirection( from:String | Element ) : String

Returns the `direction` (`"right"` | `"left"` | `"up"` | `"down"` | `"left-up"` | `"left-down"` | `"right-up"` | `"right-down"`) as measured from either where the drag started (the default) or the moment-by-moment velocity, or its proximity to another element that you define.

#### Parameters

* #### **from**: String | Element

  Any of the the following can be used:

### Returns : String[​](#returns--string "Direct link to Returns : String")

The direction of the Draggable instance.

### Details[​](#details "Direct link to Details")

Sometimes it's useful to know which direction an element is dragged (`"left"` | `"right"` | `"up"` | `"down"` | `"left-up"` | `"left-down"` | `"right-up"` | `"right-down"`), or maybe you'd like to know which direction it is compared to another element. That's precisely what `getDirection()` is for. You can pass any of the following as the parameter to control its behavior:

* `"start"` (the default) - Measures from wherever the drag began.

* `"velocity"` (**requires**[InertiaPlugin](/docs/v3/Plugins/InertiaPlugin/.md)!) - Measures the moment-by-moment direction of the drag. For example, maybe the user dragged really far to the right, but then they start dragging to the left for a brief moment - it's still to the right of the starting position, but it's current velocity is moving to the left. That's what `velocity` measures.

* `[element]` - If you pass an element, it'll return the direction from that element's center to the Draggable's center.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/myjemR)

```
<h1>Draggable with direction sensing</h1>

<div id="container">
  <div class="callout">
    <div class="dataDisplay">this.getDirection(<strong>"start"</strong>): <span id="directionStart">-</span></div>
    <div class="dataDisplay">this.getDirection(<strong>"velocity"</strong>): <span id="directionVelocity">-</span></div>
    <div class="dataDisplay">this.getDirection(<strong>logoElement</strong>): <span id="directionObject">-</span></div>
  </div>
  <img src="/demo-assets/gsap-logo-green.svg" id="logoElement" width="150"/>
  <div class="box" id="original">Start position</div>
  <div class="box gradient-green" id="box1">Drag me</div>
</div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

@font-face {
  font-display: block;
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
  --surface75: #bbbaa6;
  --surface50: #7c7c6f;
  --green: #0ae448;
  --orange: #ff8709;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 14px;
  box-sizing: border-box;
  background: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
}

h1 {
  margin: 0 0 14px;
  color: var(--light);
  font-size: 1rem;
  font-weight: 400;
}

#container {
  position: relative;
  width: 90%;
  height: 440px;
  border: 2px dashed rgba(255, 252, 225, 0.3);
  border-radius: 10px;
}

/* readouts */
.callout {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 10px 14px;
  background: rgba(25, 25, 25, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 252, 225, 0.1);
  border-radius: 10px;
  pointer-events: none;
}

.dataDisplay {
  margin: 0;
  font-family: Fraktion Mono, monospace;
  font-size: 12px;
  line-height: 1.8;
}

.dataDisplay strong {
  color: var(--orange);
  font-weight: 400;
}

#directionStart,
#directionVelocity,
#directionObject {
  color: var(--green);
}

#logoElement {
  position: absolute;
  left: 50%;
  top: 50%;
}

.box {
  position: absolute;
  top: 0;
  width: 196px;
  height: 100px;
  line-height: 100px;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  background: transparent;
}

.gradient-green {
  color: var(--dark);
  background: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%),
    url("/demo-assets/noise-e82662fe.webp");
  background-blend-mode: color-dodge;
}

#original {
  box-sizing: border-box;
  border: 2px solid rgba(255, 252, 225, 0.4);
  color: var(--light);
}
```

```
/*
This demo illustrates direction sensing capabilities in Draggable

Watch a video explaining all the details: https://greensock.com/gsap-1-16

The getDirection() method can determine
 - direction from where the drag started
 - momementary direction 
 - direction relative to any elment

*/
var directionStart = document.getElementById("directionStart"),
    directionVelocity = document.getElementById("directionVelocity"),
    directionObject = document.getElementById("directionObject"),
    original = document.getElementById("original"),
		logoElement = document.getElementById("logoElement");

Draggable.create("#box1", {
  bounds:"#container",
  edgeResistance:0.65,
  inertia:true,
  autoScroll:1,
  onDrag:updateDirections,
  onThrowUpdate:updateDirections,
  onThrowComplete:function() {
    //move the original marker to end position
    gsap.to(original, {duration:1, x:this.x, y:this.y});
  }
});

function updateDirections() {
    //getDirection() can return 3 types of direction...
    directionStart.innerHTML = '"' + this.getDirection("start") + '"'; //direction from start of drag
    directionVelocity.innerHTML = '"' + this.getDirection("velocity") + '"'; //momentary velocity *requires InertiaPlugin
    directionObject.innerHTML = '"' + this.getDirection(logoElement) + '"'; //direction from an object
}

gsap.set(logoElement, {xPercent:-50, yPercent:-50})

/*
See https://www.greensock.com/draggable/ for details about Draggable. 
This demo uses InertiaPlugin which is a membership benefit of Club GreenSock, https://www.greensock.com/club/
InertiaPlugin is necessary for getDirection("velocity").
*/
```

Plugins[Draggable](/docs/v3/Plugins/Draggable/.md)[InertiaPlugin](/docs/v3/Plugins/InertiaPlugin/.md)
