---
source: https://gsap.com/resources/a11y
title: "Accessible Animation"
fetched: 2026-10-28
---

# Accessible Animation

Quick Start - `gsap.matchMedia()`

#### Example usage[​](#example-usage "Direct link to Example usage")

```
// create a matchMedia object
let mm = gsap.matchMedia()

// only add animations if the user is ok with motion!
mm.add("(prefers-reduced-motion: no-preference)", (context) => {
  // This animation will not run if the user has opted out of animation at the OS level
  gsap.to(".box", {
    rotation: 360,
    repeat: -1,
  });

});
```

Animation can really elevate a website, but it can also cause a real headache for some users. With great power comes great responsibility, and the fun "motion design" part of animation is only one part of our job.

Video Explainer

[YouTube video player](https://www.youtube.com/embed/9gipsKpWozE)

## Prefers reduced motion[​](#prefers-reduced-motion "Direct link to Prefers reduced motion")

Did you know that some people have physical reactions to motion? People with vestibular (inner ear) disorders can experience dizziness, headaches, or even nausea from animated content. Sounds horrible right? With this in mind, it's important that our animations are safe for people with motion sensitivities.

Luckily, we can tap into operating system settings with the [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query. This media query detects whether the user has requested the operating system to minimize the amount of animation or motion it uses.

![](/assets/images/prefersreducedmotion-2f07bcff9b983b185f203d55b487d7a0.png)

We can listen to this user preference and adjust our animations accordingly with [gsap.matchMedia().](/docs/v3/GSAP/gsap.matchMedia\(\).md)

In the following code snippet we are animating the box differently depending on the user's preference. We can animate more if the user has no preference set, but if someone has asked for 'reduced' animations, we should be more mindful - either by removing animations or by reducing them.

```

let mm = gsap.matchMedia()
// this user has no preference set, so it's safe to animate!
mm.add("(prefers-reduced-motion: no-preference)", (context) => {
  gsap.from(".box", { 
    opacity: 0, 
    rotation: 360, 
    ease: "back.out"
  })
});

// this user has specified "reduced motion", so either remove the animations or simplify them down
mm.add("(prefers-reduced-motion: reduce)", (context) => {
  gsap.from(".box", { opacity: 0})
});
```

Try it out

It's easiest to understand in action! [adjust your reduced motion preference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences) and watch how the animation changes.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/LYwmdmr)

```
<section class="panel">
  <div class="box green"></div>
</section>
```

```
header {
  flex-direction: column;
}
.panel {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gray p {
  color: #ccc;
  font-size: 1.4em;
  margin: 0;
  padding: 30px;
  line-height: 1.4em;
}

.bottom {
  width: 100%;
  text-align: center;
  padding: 150px 30px;
  font-size: 1.2em;
  box-sizing: border-box;
}
```

```
let mm = gsap.matchMedia()

// this user has no preference set, so it's safe to animate!
mm.add("(prefers-reduced-motion: no-preference)", (context) => {
  gsap.from(".box", { 
    rotation: 360, 
    scale: 1.5,
    ease: "back.inOut",
    repeat: -1,
    yoyo: true,
    duration: 3,
  })
});

// this user has specified "reduced motion", so either remove the animations or simplify them down
mm.add("(prefers-reduced-motion: reduce)", (context) => {
  gsap.from(".box", { opacity: 0, repeat: -1, duration: 3, ease: "none"})
});
```

### Reduce or Remove?[​](#reduce-or-remove "Direct link to Reduce or Remove?")

Whether to reduce or remove depends on the animation and should be approached on a case-by-case basis. There are two good questions to ask when trying to assess how to handle an animation.

#### Is this animation particularly triggering?[​](#is-this-animation-particularly-triggering "Direct link to Is this animation particularly triggering?")

Flashing animations with fast, hard cuts between colors can trigger seizures in epileptic users, and animations with large swiping movements on the x or y axis can make users with vestibular disorders dizzy or nauseated. Small areas of change, like micro-interactions, or simple opacity changes are usually ok.

#### Is the animation decorative or functional?[​](#is-the-animation-decorative-or-functional "Direct link to Is the animation decorative or functional?")

Some animations are decorative whereas others provide important visual context or feedback on an action. If an animation provides important information, like a progress bar or a download indicator, consider keeping it, but simplifying the animation down. If it's just decorative, removing it entirely is the best option.

Apple's UI

Take a look at how Apple handles their screen transitions with and without reduced motion enabled. Big swiping motions on the x axis can be triggering, but the animation is important for spacial context, so rather than removing it entirely they chose to provide an alternate animation that gently crossfades the opacity.

[](/video/apple-ui.mp4)

### Providing an animation toggle[​](#providing-an-animation-toggle "Direct link to Providing an animation toggle")

Tapping into system preferences isn't bulletproof. After all, there's no guarantee that everyone affected by motion knows how to change their settings. To be extra safe, it's a good idea to add a reduced motion toggle in the UI and put the power back in the user's hands to decide.

Here's a more involved example, using the [conditions syntax](https://gsap.com/docs/v3/GSAP/gsap.matchMedia\(\)/#conditions), showing how you could implement a toggle using [gsap.matchMedia().](/docs/v3/GSAP/gsap.matchMedia\(\).md)

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/RwMQwpR)

```
<header class="center pad-l">
  <h1>gsap.matchMedia()</h1>
  <p class="lead">Use matchMedia and the prefers-reduced-motion media feature for easy, accessibility-friendly animation.</p>
  <div class="checkbox">
  <input type="checkbox" id="motionToggle" class="vh" name="motionToggle" value="false">
  <label for="motionToggle">Reduced animation please</label>
</div>
</header>


<section class="gray">
  <div class="box gradient-green"></div>
</section>

<section class="bottom">
  <p>You can read more about reduced motion and vestibular disorders in this <a href="https://css-tricks.com/introduction-reduced-motion-media-query/">blog post</a> on CSS tricks</p>
  <p>How do I <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences">adjust my reduced motion setting?</a></p>
</section>
```

```
header {
  flex-direction: column;
}

.lead {
  padding: 0 20px;
  text-align: center;
}

.gray {
  width: 100%;
  height: 100vh;
}
.box {
  width: 150px;
  height: 150px;
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.gray p {
  font-size: 1.4em;
  margin: 0;
  padding: 30px;
  line-height: 1.4em;
}

.bottom {
  width: 100%;
  text-align: center;
  padding: 150px 30px;
  font-size: 1.2em;
  box-sizing: border-box;
}
```

```
gsap.registerPlugin(ScrollTrigger);

let reduceMotionCB = document.querySelector("#motionToggle");
reduceMotionCB.checked = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
reduceMotionCB.addEventListener("change", gsap.matchMediaRefresh); // force all matchMedia() stuff to revert and re-run

let breakPoint = 800;
let mm = gsap.matchMedia();

mm.add({
  isDesktop: `(min-width: ${breakPoint}px)`, // <- when ANY of these are true, the function below gets invoked
  isMobile: `(max-width: ${breakPoint - 1}px)`
}, (context) => {

  let {isDesktop, isMobile} = context.conditions;
  let reduceMotion = reduceMotionCB.checked; // if we weren't using a checkbox, we could just add another condition above: "(prefers-reduced-motion: reduce)"
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".gray",
      scrub: 1,
      end: "200%",
      pin: true
    }
  });
  tl.to(".box", { 
    scale: reduceMotion ? 1.1 : 2
  }).to(".box", { 
    scale: 1 
  });

  if (!reduceMotion) { // don't rotate the box if reduced motion was requested
    gsap.to(".box", {
      rotation: 360,
      ease: "none",
      duration: 5,
      repeat: -1
    });
  }

  gsap.set(".box", {
    innerText: isDesktop ? "Desktop" : "Mobile",

  });

  // optionally return a cleanup function
  return () => console.log("cleanup");
});
```

Plugins[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)

## SplitText & Screenreaders[​](#splittext--screenreaders "Direct link to SplitText & Screenreaders")

People who are blind or partially-sighted might use a screen reader to help them navigate a website. Screenreaders analyze the content of a site and convert it into speech. A screenreader would see the following heading tag and read it out loud to the user.

```
<h1>Heading</h1>
```

Most text splitting libraries simply divide the text into divs which screenreaders struggle to read, announcing the content painfully slowly, letter by letter...

```
<h1>
  <div>H</div>
  <div>e</div>
  <div>a</div>
  <div>d</div>
  <div>i</div>
  <div>n</div>
  <div>g</div>
</h1>
```

### Built-in aria[​](#built-in-aria "Direct link to Built-in aria")

To get around this issue, since v3.13.0 - SplitText adds an `aria-label` to the parent element and then hides the child elements with `aria-hidden`. This ensures that when visually impaired people navigate your site, screenreaders will read the `aria-label` instead of the contents of the split elements.🥳 This approach works for the majority of use-cases and is enabled by default.

```
<h2 aria-label="My Accessible Heading">
  <div aria-hidden="true">My</div>
  <div aria-hidden="true">Accessible</div>
  <div aria-hidden="true">Heading</div>
</h2>
```

### Screenreader-only duplicate[​](#screenreader-only-duplicate "Direct link to Screenreader-only duplicate")

warning

SplitText's built in `aria` solution won't surface the functionality and meaning of nested elements (like links) to screenreaders. If you have complex nested text, we recommend using this duplication approach. Exercise restraint here as duplicating lots of DOM elements can lead to performance lags.

Treat text splitting with care and ensure you test thoroughly!

As the `aria-label` created by SplitText just contains text content, if there are nested elements their functionality will be lost to screenreaders.

```
<h2 aria-label="This link isn't accessible">
  <div aria-hidden="true">This</div>
  <div aria-hidden="true"><a href="#">link</a></div>
  <div aria-hidden="true">isn't</div>
  <div aria-hidden="true">accessible</div>
</h2>
```

Should you need to preserve the semantics and functionality of nested elements - like links, `<strong/>` tags or `<em/>` tags - we recommend disabling the default aria settings with `aria:false`, and creating a [screenreader-only](https://css-tricks.com/inclusively-hidden/) duplicate of your element instead. This way, sighted users will see the animated text, while visually impaired people will get the screenreader-only content announced to them.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/12697152a77fa81cefd0e6bb3d87c2da)

```
<div class="container">
  <div class="animate-me" aria-hidden="true">
    This text has a <a href="https://testlink.com">nested link</a> so we have created a duplicate "screenreader-only" element to preserve the semantics of child elements for screenreaders.
  </div>
  <p class="sr-only">
    This text has a <a href="https://testlink.com">nested link</a> so we have created a duplicate "screenreader-only" element to preserve the semantics of child elements for screenreaders.
  </p>
</div>
```

```
/* Hiding class, making content visible only to screen readers but not visually */
/* "sr" meaning "screen-reader" */
/* https://css-tricks.com/inclusively-hidden/ */
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}

html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.container {
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 9px;
  opacity: 0;
}

.animate-me {
  color: #dfdcff;
  font-size: 25px;
  box-sizing: border-box;
  padding: 5%;
  width: 100%;
  text-align: left;
  perspective: 500px;
}

a {
  color: var(--color-orangey)
}
```

```
gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  gsap.set(".container", { opacity: 1 });
  let split = SplitText.create(".animate-me", { type: "words", aria: "hidden" });

  gsap.from(split.words, {
    opacity: 0,
    duration: 2,
    ease: "sine.out",
    stagger: 0.1,
  });
});
```

Plugins[SplitText](/docs/v3/Plugins/SplitText/.md)

info

A11y expert? Got some advice or feedback? [Reach out](https://gsap.com/community/contact/), We'd love to hear from you!

#### references[​](#references "Direct link to references")

[The a11y project](https://www.a11yproject.com/posts/how-to-hide-content/)

[Nielsen Norman Group](https://www.nngroup.com/articles/animation-duration/)
