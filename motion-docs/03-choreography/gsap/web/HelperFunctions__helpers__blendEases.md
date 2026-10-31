---
source: https://gsap.com/docs/v3/HelperFunctions/helpers/blendEases
title: "Blend two eases"
fetched: 2026-10-28
---

# Blend two eases

If you need one ease at the start of your animation, and a different one at the end, you can use this function to blend them!

```
//just feed in the starting ease and the ending ease (and optionally an ease to do &#xFEFF;the blending), and it'll return a new Ease that's...blended!
function blendEases(startEase, endEase, blender) {
  var parse = function (ease) {
      return typeof ease === "function" ? ease : gsap.parseEase("power4.inOut");
    },
    s = gsap.parseEase(startEase),
    e = gsap.parseEase(endEase),
    blender = parse(blender);
  return function (v) {
    var b = blender(v);
    return s(v) * (1 - b) + e(v) * b;
  };
}
//example usage:
gsap.to("#target", {
  duration: 2,
  x: 100,
  ease: blendEases("back.in(1.2)", "bounce"),
});
```

**DEMO**

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/59008f3ee5f26b811e90017bdcbb7dfb)

```
<svg viewBox="0 0 650 650">
  <line x1="0" x2="600" y1="501" y2="501" stroke="#fffce1" stroke-dasharray="12 6" stroke-width="2" style="opacity:0.2" />
  <line x1="0" x2="600" y1="100" y2="100" stroke="#fffce1" stroke-dasharray="12 6" stroke-width="2" style="opacity:0.2" />
  <line y1="100" y2="501" x1="650" x2="650" stroke="#fffce1" stroke-width="2" style="opacity:0.2" />
  <path id="startEase" fill="none" stroke="#00bae2" stroke-width="2px"/>
  <path id="endEase" fill="none" stroke="#ff8709" stroke-width="2px"/>
  <path id="blendedEase" fill="none" stroke="#0ae448" stroke-width="4px"/>
  <circle id="ball" fill="#0ae448" r="10" cx="650" cy="500"/>
</svg>
<div id="data"></div>
```

```
body{display:flex;align-items:center;justify-content:center;min-height:100vh;}

svg {
  height: 80vh;
  z-index: -1;
  overflow: visible;
}

#data {
  color: #ccc;
  position: fixed;
  bottom: 10px;
  left: 40px;
  right: 40px;
  text-align: center;
}

a {
  color: #fffce1;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
```

```
/*
Blend 2 eases together easily. Just copy the blendEases() function 
into your project and feed in the start and end eases into that 
function and it'll spit back a new blended ease that you pass 
into your tween. 

In the demo, the blue line is the starting ease, the red line
is the ending ease, and the big green one is the blended result.
For an advanced version that lets you control where the blending begins
(like halfway through), see https://codepen.io/GreenSock/pen/vYJWPQj
*/
function blendEases(startEase, endEase, blender) {
    var s = gsap.parseEase(startEase),
        e = gsap.parseEase(endEase),
        blender = gsap.parseEase(blender || "power3.inOut");
    return function(v) {
      var b = blender(v);
      return s(v) * (1 - b) + e(v) * b;
    };
}

var line1 = "slow(0.3, 0.2, false)", 
    line2 = "back",
    ease = blendEases(line1, line2);
gsap.to("#ball", {duration: 2, y: -400, ease: ease});





//graph the lines...
CustomEase.getSVGData(line1, {width: 600, height: 400, y: 100, path:"#startEase"});
CustomEase.getSVGData(line2, {width: 600, height: 400, y: 100, path:"#endEase"});
CustomEase.getSVGData(ease, {width: 600, height: 400, y: 100, path: "#blendedEase"});

//simplify the path and make it editable! (PathEditor is an unpublished tool from GreenSock)
PathEditor.simplifySVG("#blendedEase", {tolerance: 3});
var editor = PathEditor.create("#blendedEase", {draggable: false, selected: false, onUpdate: displayData});

//this is just to display the path data
var data = document.getElementById("data");
function displayData(d) {
  var s = editor.getNormalizedSVG();
  data.innerHTML = '<a href="https://greensock.com/ease-visualizer/?CustomEase=' + s + '" target="_blank">Get the CustomEase version</a>';
}
displayData();
```

Plugins[CustomEase](/docs/v3/Eases/CustomEase.md)[EasePack](/docs/v3/Eases/CustomWiggle.md)

If you need to **invert** an ease instead, see [this demo](https://codepen.io/GreenSock/pen/rgROxY?editors=0010) for a different helper function.
