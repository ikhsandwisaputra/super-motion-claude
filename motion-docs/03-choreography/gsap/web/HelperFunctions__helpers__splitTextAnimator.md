---
source: https://gsap.com/docs/v3/HelperFunctions/helpers/splitTextAnimator
title: "Nest responsive SplitText animations inside a timeline"
fetched: 2026-10-28
---

# Nest responsive SplitText animations inside a timeline

What if a [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) animation gets nested inside a [Timeline](https://gsap.com/docs/v3/GSAP/Timeline), and then later that SplitText instance re-splits due to something like a viewport resize (exactly what [autoSplit](https://gsap.com/docs/v3/Plugins/SplitText/#autoSplit*) is for)? The animation must get re-created to animate the new elements from the re-split but how do we get that new animation to swap itself into the timeline at exactly the same spot as the original animation (and `kill()` that previous animation)? That's precisely what this **SplitTextAnimator()** helper function does.

Feed SplitTextAnimator exactly the same parameters as you would a normal SplitText; it just returns a SplitText that has an additional `animate()` method that you give a callback for creating your animation(s). It'll immediately call that callback and return whatever GSAP animation you return in that callback so that it can be added to your timeline.

```
/*
Helper function that creates a single SplitText instance and then allows you to create
as many animations of that SplitText as you want, and it'll dynamically update them when
the SplitText instance splits (responsive). It adds an animate() function that you pass a
function that creates (AND RETURNS!) your animation that you can place into timelines, like: 

let split = SplitTextAnimator(target, {type: "words,lines", autoSplit: true});
let tl = gsap.timeline();
tl.add( split.animate((self) => {
	return gsap.to(self.words, {...});
})
.add( split.animate((self) => {
    return gsap.to(self.words, {...});
});
*/
function SplitTextAnimator(target, config) {
  let originalOnSplit = config.onSplit,
    subscribers = [],
    self = SplitText.create(target, {
      ...config,
      autoSplit: true,
      onSplit(self) {
        subscribers.forEach((f) => f(self));
        originalOnSplit && originalOnSplit(self);
      },
    });
  self.animate = (create) => {
    let animation,
      onSplit = (self) => {
        let parent, startTime;
        if (animation) {
          parent = animation.parent;
          startTime = animation.startTime();
          animation.kill();
        }
        animation = create && create(self);
        parent && parent.add(animation, startTime || 0);
      };
    subscribers.push(onSplit);
    onSplit(self);
    return animation;
  };
  return self;
}
```

You can use the `animate()` method multiple times to insert multiple animations into your timeline (perhaps one for words, one for lines, for example).

Then, whenever the SplitText instance re-splits, it will call that callback you passed to the `animate()` method again to generate a new animation and swap it directly into the same place in the parent timeline.

## Usage[​](#usage "Direct link to Usage")

```
const tl = gsap.timeline();
const split = SplitTextAnimator(boxText, {
  type: "words, lines",
});

tl.add(
  split.animate((self) => {
    return gsap.from(self.chars, {
      autoAlpha: 0,
      y: 25,
      stagger: {
        amount: 0.5,
      },
    });
  }),
);
```

## Simple Demo[​](#simple-demo "Direct link to Simple Demo")

Resize the Codepen preview by toggling any of the panels in order to see it in action.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/dPpRrqa)

```
<div class="panel">
  <div class="content">
    <h3 class="title text-center">Responsive SplitText Animator Helper Function</h3>
    <div class="dot-container">
      <div class="dot gradient-green"></div>
      <div class="dot gradient-green"></div>
      <div class="dot gradient-green"></div>
    </div>
    <div class="content-text ">Quas dolor ullam alias repellendus odit eum fugit aspernatur sit aperiam assumenda recusandae deleniti labore atque dolores cupiditate, nam impedit nulla similique fuga in sapiente.</div>
    <div class="dot-container">
      <div class="dot gradient-green"></div>
      <div class="dot gradient-green"></div>
      <div class="dot gradient-green"></div>
    </div>
  </div>
</div>
```

```
.content {
  width: 100%;
  max-width: 1200px;
  font-size: 24px;
  opacity: 0;
  visibility: hidden;

  .content-text {
    text-align: center;
  }

  .dot-container {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 1rem 0;
    gap: 10px;

    .dot {
      width: 15px;
      height: 15px;
      border-radius: 15px;
    }
  }
}
```

```
console.clear();

gsap.registerPlugin(SplitText);

const mainTitle = document.querySelector(".title");
const contentTexts = gsap.utils.toArray(".content-text");
const dotContainers = gsap.utils.toArray(".dot-container");
const contentTextsAmount = contentTexts.length;

const tl = gsap.timeline();
tl.from(mainTitle, {
  autoAlpha: 0,
  y: 100
});

dotContainers.forEach((e, i) => {
  const dots = gsap.utils.toArray(".dot", e);
  tl.from(dots, {
    x: 50,
    autoAlpha: 0,
    stagger: 0.05
  });
  if (i < contentTextsAmount) {
    // const dots = gsap.utils.toArray(".dot", contentTexts[i]);
    const split = SplitTextAnimator(contentTexts[i], {
      type: "lines, words"
    });
    tl.add(
      split.animate((self) => {
        return gsap.from(self.words, {
          y: -100,
          autoAlpha: 0,
          stagger: {
            amount: 0.5,
            from: "random"
          }
        });
      })
    );
  }
});

const resizeTimer = gsap
  .delayedCall(0.2, () => {
    gsap.set(".content", { autoAlpha: 1 });
    tl.restart();
  })
  .pause();
window.addEventListener("resize", () => {
  gsap.set(".content", { autoAlpha: 0 });
  resizeTimer.restart(true);
});

gsap.set(".content", { autoAlpha: 1 });

GSDevTools.create({ animation: tl });

/*
      Helper function that creates a single SplitText instance and then allows you to create
      as many animations of that SplitText as you want, and it'll dynamically update them when
      the SplitText instance splits (responsive). It adds an animate() function that you pass a
      function that creates (AND RETURNS!) your animation that you can place into timelines, like: 
      
      let split = SplitTextAnimator(target, {type: "words,lines", autoSplit: true});
      let tl = gsap.timeline();
      tl.add( split.animate((self) => {
        return gsap.to(self.words, {...});
      })
      .add( split.animate((self) => {
          return gsap.to(self.words, {...});
      });
    */
function SplitTextAnimator(target, config) {
  let originalOnSplit = config.onSplit,
    subscribers = [],
    self = SplitText.create(target, {
      ...config,
      autoSplit: true,
      onSplit(self) {
        subscribers.forEach((f) => f(self));
        originalOnSplit && originalOnSplit(self);
      }
    });
  self.animate = (create) => {
    let animation,
      onSplit = (self) => {
        let parent, startTime;
        if (animation) {
          parent = animation.parent;
          startTime = animation.startTime();
          animation.kill();
        }
        animation = create && create(self);
        parent && parent.add(animation, startTime || 0);
      };
    subscribers.push(onSplit);
    onSplit(self);
    return animation;
  };
  return self;
}
```

Plugins[SplitText](/docs/v3/Plugins/SplitText/.md)[GSDevTools](/docs/v3/Plugins/GSDevTools.md)
