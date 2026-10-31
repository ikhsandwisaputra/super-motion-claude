---
source: https://gsap.com/resources/keyframes
title: "Keyframes"
fetched: 2026-10-28
---

# Keyframes

info

keyframes are only to be used in `to()` tweens.

If you find yourself writing multiple tweens to animate one target, it ***may*** be time to reach for keyframes. Keyframes are a great way to move a target through a series of steps while keeping your code concise.

Take a repetitive timeline like the one below - It can be simplified down nicely to fit into one tween:

```
// timeline
let tl = gsap.timeline();
tl.to(".box", {
    x: 100
  })
  .to(".box", {
    y: 100
  })
  .to(".box", {
    x: 0
  })
  .to(".box", {
    y: 0
  });

// Array-based keyframes
gsap.to(".box", {
  keyframes: {
    x: [0, 100, 100, 0, 0],
    y: [0, 0, 100, 100, 0],
    ease: "power1.inOut"
  },
  duration: 2
});
```

**We like to think of keyframes as a sub-timeline nested *inside* a tween.** There are a few different ways to write keyframes. If you're a visual learner, check out this video.

Video Walkthrough

## Keyframe Options[​](#keyframe-options "Direct link to Keyframe Options")

### Object keyframes - v3.0[​](#object-keyframes---v30 "Direct link to Object keyframes - v3.0")

This keyframes syntax lets you pass in an Array of vars parameters to use for the given target(s). Think of them like a sequence of .to() tween vars. You can use a `delay` value to create gaps or overlaps.

The default per-keyframe ease is `linear` which you can override in individual keyframes. You can also apply an ease to the *entire* keyframe sequence.

```
gsap.to(".elem", {
 keyframes: [
  {x: 100, duration: 1, ease: 'sine.out'}, // finetune with individual eases
  {y: 200, duration: 1, delay: 0.5}, // create a 0.5 second gap
  {rotation: 360, duration: 2, delay: -0.25} // overlap by 0.25 seconds
 ],
 ease: 'expo.inOut' // ease the entire keyframe block
});
```

### Percentage keyframes - v3.9[​](#percentage-keyframes---v39 "Direct link to Percentage keyframes - v3.9")

This familiar syntax makes porting animations over from CSS a breeze! Instead of using delays and duration in the keyframe object, you specify an overall duration on the tween itself, then define the position of each keyframe using percentages.

To be consistent with CSS behaviour, the default per-keyframe ease is `power1.inOut` which generally looks quite nice but you can override this in individual keyframes or on all keyframes using `easeEach`.

```
gsap.to(".elem", {
 keyframes: {
  "0%":   { x: 100, y: 100},
  "75%":  { x: 0, y: 0, ease: 'sine.out'}, // finetune with individual eases
  "100%": { x: 50, y: 50 },
   easeEach: 'expo.inOut' // ease between keyframes
 },
 ease: 'none' // ease the entire keyframe block
 duration: 2,
})
```

### Simple Array-based keyframes - v3.9[​](#simple-array-based-keyframes---v39 "Direct link to Simple Array-based keyframes - v3.9")

Just define an Array of values and they'll get equally distributed over the time specified in the tween.

The default per-keyframe ease is `power1.inOut`, but you can override this by using `easeEach`. The Arrays do not need to have the same number of elements.

```
gsap.to(".elem", {
 keyframes: {
  x: [100, 0, 50],
  y: [100, 0, 50]
  easeEach: 'sine.inOut' // ease between keyframes
  ease: 'expo.out' // ease the entire keyframe block
 },
 duration: 2,
})
```

## Easing keyframes[​](#easing-keyframes "Direct link to Easing keyframes")

Easing is integral to animation and keyframes give you a huge amount of flexibility.

**Percentage keyframes** and **Simple keyframes** allow you to control the ease between each of the keyframes with `easeEach`.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/941b82d684b7fbf5303304d671e15ce2)

```
<p class="text">Fine-tune your easing with ease and easeEach</p>
<section>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
    <rect opacity="0.5" stroke-width="0.3" x="25" y="25" width="100" height="100" fill="none" stroke="#fff" stroke-miterlimit="5" stroke-dasharray="5" />
    <circle cx="25" cy="25" r="2" fill="#d5d5d5"/>
    <circle cx="125" cy="25" r="2" fill="#d5d5d5"/>
    <circle cx="125" cy="125" r="2" fill="#d5d5d5"/>
    <circle cx="25" cy="125" r="2" fill="#d5d5d5"/>
    <rect class="elem" x="10" y="10" width="30" height="30" rx="4" fill="#0ae448" />
    
  </svg>

  <form>
    <div class="pretty p-default p-curve">
      <input type="radio" name="eases" id="ease" value="ease" checked>
      <div class="state">
        <label for="ease">ease</label>
      </div>
    </div>

    <div class="pretty p-default p-curve">
      <input type="radio" name="eases" id="each" value="each">
      <div class="state">
        <label for="each">easeEach</label>
      </div>
    </div>
  </form>

</section>
```

```
.pretty.p-default input:checked~.state label:after {
    background-color: #0ae448!important;
}

body {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  padding: 0 1rem;
}

form {
  display: flex;
  flex-direction: column;
}

form > * + * {
  margin-top: 1rem;
}

section {
  display: flex;
  width: 100%;
  max-width: 500px;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

svg {
  min-width: 200px;
  width: 70%;
}
```

```
let eachTween = gsap.to(".elem", {
  keyframes: {
    x: [0, 100, 100, 0, 0],
    y: [0, 0, 100, 100, 0],
    easeEach: "power4.inOut" // <- customise the ease between each keyframe
  },
  duration: 5,
  paused: true,
});

let easeTween = gsap.to(".elem", {
  keyframes: {
    x: [0, 100, 100, 0, 0],
    y: [0, 0, 100, 100, 0],
    easeEach: 'none' // <- override the default keyframe ease
  },
  ease: "power4.inOut", // <- apply an ease to all the keyframes
  duration: 5,
  paused: true,
});

easeTween.play()


let form = document.querySelector("form");
let text = document.querySelector(".text");

form.addEventListener("change", (e) => {
  let value = document.querySelector("input:checked").value;

  if (value === "ease") {
    eachTween.kill()
    easeTween.play(0)
    text.textContent = "ease the whole keyframe"
  } else {
    easeTween.kill()
    eachTween.play(0)
    text.textContent = "ease between keyframes"
  }
});
```

With **Object keyframes** and **Percentage keyframes** you can drill down and add different eases into individual keyframes.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/1c38f65c7536803a59f19a899ac0fbb9)

```
<svg viewBox="0 0 100 200">
	<defs>
		<linearGradient id="grad-1" x1="30" y1="0" x2="70" y2="40" gradientUnits="userSpaceOnUse">
			<stop offset="0.2" stop-color="#0ae448" />
			<stop offset="0.5" stop-color="#abff84" />
		</linearGradient>
	</defs>
	<ellipse class="shadow" cx="50" cy="188" rx="15" ry="5" />

	<circle fill="url(#grad-1)" class="ball" cx="50" cy="22" r="15" />
</svg>
```

```
body {
	padding: 0;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #0e100f;
}

svg {
	width: 70vw;
	max-height: 80vh;
	max-width: 500px;
	opacity: 0;
}

.shadow {
	opacity: 0.2;
}
```

```
gsap.set("svg", { opacity: 1 });

gsap.to(".ball", {
	keyframes: {
		"0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
		"7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
		"25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
		"50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
		"60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
		"65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
		"100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
		easeEach: "sine.out"
	},
	duration: 1,
	repeat: -1,
	transformOrigin: "center bottom"
});

gsap.to(".shadow", {
	scale: 0.7,
	duration: 0.5,
	repeat: -1,
	yoyo: true,
	ease: "sine.inOut",
	transformOrigin: "center"
});
```

You can even combine multiple easing properties, keyframes and normal tween values. 🤯

```
gsap.to(".box", {
  keyframes: {
    y: [0, 80, -10, 30, 0],
    ease: "none", // <- ease across the entire set of keyframes (defaults to the one defined in the tween, or "none" if one isn't defined there)
    easeEach: "power2.inOut" // <- ease between each keyframe (defaults to "power1.inOut")
  },
  rotate: 180,
  ease: "elastic", // <- the "normal" part of the tween. In this case, it affects "rotate" because it's outside the keyframes
  duration: 5,
  stagger: 0.2
});
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/92533379938b4afb117727d84b47651b)

```
<div class="box gradient-green"></div>
<div class="box gradient-green"></div>
<div class="box gradient-green"></div>
<div class="box gradient-green"></div>
```

```
body {
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.box {
  margin: 1rem;
}
```

```
gsap.to(".box", {
	keyframes: {
		y: [0, 80, -10, 30, 0],
		ease: "none", // <- ease across the entire set of keyframes (defaults to the one defined in the tween, or "none" if one isn't defined there)
		easeEach: "power2.inOut" // <- ease between each keyframe (defaults to "power1.inOut")
	},
	rotate: 180,
	ease: "elastic", // <- the "normal" part of the tween. In this case, it affects "rotate" because it's outside the keyframes
	duration: 5,
	stagger: 0.2
});
```

### Keyframe tips[​](#keyframe-tips "Direct link to Keyframe tips")

Both the **Object keyframes** and the **Percentage keyframes** behave similarly to tweens, so you can leverage callbacks like `onStart` and `onComplete`.

```
gsap.to(".elem", {
 keyframes: [
  {x: 100, duration: 1},
  {y: 200, duration: 1, onComplete: () => { console.log('complete')}},
  {rotation: 360, duration: 2, delay: -0.25, ease: 'sine.out'}
 ]
});

gsap.to(".elem", {
 keyframes: {
  "0%":   { x: 100, y: 100},
  "75%":  { x: 0, y: 0, ease: 'power3.inOut'},
  "100%": { x: 50, y: 50, ease: 'none', onStart: () => { console.log('start')} }
 },
 duration: 2,
})
```

We hope this has helped you get your head around keyframes - if you have any questions pop over to [our forums](https://gsap.com/community/).

Happy tweening!
