---
source: https://gsap.com/docs/v3/Plugins/ScrollToPlugin
title: "ScrollTo"
fetched: 2026-10-28
---

# ScrollTo

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(ScrollToPlugin) 
```

#### Minimal usage

```
  //scroll to 400 pixels down from the top
  gsap.to(window, { duration: 2, scrollTo: 400 });
```

tip

If you want to do scroll-driven animations where things get triggered at certain scrollbar positions, use the [ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md) plugin.

## Description[​](#description "Direct link to Description")

Animates the scroll position of the window (like doing `window.scrollTo(x, y)`) or a DOM element (like doing `myDiv.scrollTop = y; myDiv.scrollLeft = x;`).

warning

using alongside `scroll-behavior: smooth` in CSS will cause conflicts

To scroll the window to a particular position, use window as the target of the tween like this:

```
//scroll to 400 pixels down from the top
gsap.to(window, { duration: 2, scrollTo: 400 });

//or to scroll to the element with the ID "#someID" (as of GSAP 1.19.0):
gsap.to(window, { duration: 2, scrollTo: "#someID" });
```

To tween the content of a div, make sure you've set the `overflow: scroll` on the div and then:

```
//scroll to 250 pixels down from the top of the content in the div
gsap.to(myDiv, { duration: 2, scrollTo: 250 });
```

You can define an x or y value or both (to scroll on both the x and y axis). For example, to scroll to 400 pixels from the top and 200 pixels from the left, do this:

```
gsap.to(myDiv, { duration: 2, scrollTo: { y: 400, x: 200 }, ease: "power2" });
```

You can also optionally pass offsetX and/or offsetY numeric values if you want to offset the destination from the element.

```
//scroll #someID into view with 50 pixels from the top (like a margin)
gsap.to(window, { duration: 2, scrollTo: { y: "#someID", offsetY: 50 } });
```

The demo below uses the offsetY so that each section scrolls into view just under the navigation. Click the section buttons in the demo below. Check out the JS source.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/4be7ea5c962b62bcd156612524687a5a)

```
<nav class="hr-bottom">
  <button id="section1Btn">Section 1</button>
  <button id="section2Btn">Section 2</button>
  <button id="section3Btn">Section 3</button>
</nav>
<div class="content">
  <h2 class="heading-scroll heading-l" id="section1">Section 1</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh quam, egestas eu eros molestie, eleifend viverra augue. Suspendisse potenti. Quisque commodo consectetur quam, non pretium orci viverra at. Maecenas eget iaculis nunc. </p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>

  <h2 class="heading-scroll heading-l" id="section2">Section 2</h2>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>

  <h2 class="heading-scroll heading-l" id="section3">Section 3</h2>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementes, nascetur ridiculus mus.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh quam, egestas eu eros molestie, eleifend viverra augue. Suspendisse potenti. Quisque commodo consectetur quam, non pretium orci viverra at. Maecenas eget iaculis nunc. </p>
  <p>Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
  <p>consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa.</p>
  <p>Praesent at pellentesque augue. Nunc sed ullamcorper risus. Duis tincidunt consectetur condimentum. Suspendisse pharetra purus urna, ac pretium mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  <p>Mi elementum et. Praesent dui nibh, ullamcorper in justo sed, volutpat cursus orci. Etiam vitae sodales massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
</div>
```

```
/* Global styles come from external css */
body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.content {
  margin: 20px;
  padding-top: 4rem;
  width: 100%;
  max-width: 80ch;
}

nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--color-just-black);
  margin: 0;
  padding: 1rem 10px;
  display: flex;
  justify-content: space-around;
}

h2 {
  color: var(--color-surface-white);
  font-size: 2rem;
  margin-top: 4rem;
}

button {
  border-color: transparent;
}

button:hover {
  border-color: transparent;
}
```

```
document.querySelectorAll("nav button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {duration: 1, scrollTo:{y:"#section" + (index + 1), offsetY:120}});
  });
});
```

Plugins[ScrollToPlugin](/docs/v3/Plugins/ScrollToPlugin.md)

To have ScrollToPlugin automatically sense if the scroll position was changed outside of itself (like if the user manually started dragging the scrollbar mid-tween) and cancel that portion of the tween, set `autoKill: true`inside the `scrollTo` object, like:

```
gsap.to(myDiv, {
  duration: 2,
  scrollTo: { y: 400, autoKill: true },
  ease: "power2",
});
```

If you would like to detect when autoKill gets triggered you can define an `onAutoKill` callback.

```
gsap.to(window, {
  duration: 2,
  scrollTo: { y: 300, autoKill: true, onAutoKill: myAutoKillFunction },
});

function myAutoKillFunction() {
  alert("autoKill");
}
```

You can also set autoKill globally via [`ScrollToPlugin.config()`](/docs/v3/Plugins/ScrollToPlugin/config\(\).md)

```
ScrollToPlugin.config({ autoKill: true })
```

To scroll to the maximum scroll position, use the string `"max"` as the value, like this:

```
gsap.to(myDiv, { duration: 2, scrollTo: { y: "max" } });
```

If you don't wrap the value in an object, it will assume you want to scroll in the "y" direction, so these two lines are functionally equivalent:

```
gsap.to(myDiv, { duration: 2, scrollTo: { y: "max" } });
gsap.to(myDiv, { duration: 2, scrollTo: "max" });
```

Here's a basic example using anchors:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/ExKNEXY)

```
<nav>
  <a href="#section1">Section 1</a>
  <a href="#section2">Section 2</a>
  <a href="#section3">Section 3</a>
  <a href="#section4">Section 4</a>
  <a href="#section5">Section 5</a>
</nav>

<section id="section1">Section 1</section>
<section id="section2">Section 2</section>
<section id="section3">Section 3</section>
<section id="section4">Section 4</section>
<section id="section5">Section 5</section>
```

```
body { 
  font-weight: 300;
  margin: 0;
}

nav {
  position: fixed;
  right: 10px;
  top: 10px;
}

section {
  height: 100vh;
  display:flex;align-items:center;justify-content:center;
  border-bottom: solid 2px #0ae448
}

a {
  color: #0ae448
}
```

```
// Detect if a link's href goes to the current page
function getSamePageAnchor (link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if(elem) {
    if(e) e.preventDefault();
    gsap.to(window, {scrollTo: elem});
  }
}

// If a link's href is within the current page, scroll to it instead
document.querySelectorAll('a[href]').forEach(a => {
  a.addEventListener('click', e => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);
```

Plugins[ScrollToPlugin](/docs/v3/Plugins/ScrollToPlugin.md)
