---
source: https://gsap.com/resources/react-advanced
title: "Advanced techniques"
fetched: 2026-10-28
---

# Advanced techniques

Quick Start - useGSAP()

### useGSAP() hook

[view package on npm](https://www.npmjs.com/package/@gsap/react)

```
npm install @gsap/react
```

```
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const container = useRef();

useGSAP(() => {
  // gsap code here...
  gsap.to(".el", {rotation: 180}); // <-- automatically reverted

}, { scope: container }) // <-- scope for selector text (optional)
```

[Starter Templates](https://stackblitz.com/@GSAP-dev/collections/gsap-react-starters)

Before we begin

Are you working with React and looking to ***really*** advance your GSAP animation skills? You're in the right place. This guide contains ***advanced*** techniques and some handy tips from expert animators in our community.

This is **not a tutorial**, so feel free to dip in and out as you learn. Think of it as a collection of recommended techniques and best practices to use in your projects.

If you're starting out we highly recommend reading our [foundational article](/resources/react-basics.md) first.

Why choose GSAP?

There are React-specific libraries that offer a simpler more declarative approach. So why choose GSAP?

Animating imperatively gives you **a lot** more power, control and flexibility. Your imagination is the limit. You can reach for GSAP to animate everything from simple DOM transitions to SVG, three.js, canvas or WebGL.

Since GSAP is framework-agnostic, your animation superpowers transfer to ANY project; Vanilla JS, React, Vue, Angular, Webflow, whatever. You don't need to learn a React-specific library and then a completely different one for other projects. GSAP can be your trusted toolset wherever you go.

Lastly, if you ever get stuck, our friendly forum community is there to help. 💚

***Going forward we will assume a comfortable understanding of both GSAP and React***.

## Component Communication[​](#component-communication "Direct link to Component Communication")

In the last article, we covered animating with the [useGSAP() hook](/resources/React.md#usegsap-hook-), and how to [create and control timelines](/resources/react-basics.md#creating-and-controlling-timelines) within a React component. But there are times where you may need to share a timeline across multiple components or construct animations from elements that exist in different components.

In order to achieve this, we need a way to communicate between our components.

**There are 2 basic approaches to this.**

1. a parent component can send down props, e.g. a timeline
2. a parent component can pass down a callback for the child to call, which could add animations to a timeline.

## Passing down a timeline prop[​](#passing-down-a-timeline-prop "Direct link to Passing down a timeline prop")

Note that we are using `useState `instead of `useRef` with the timeline. This is to ensure the timeline will be available when the child renders for the first time.

```
function Box({ children, timeline, index }) {
  const el = useRef();
  
  useGSAP(() => {
    // add 'left 100px' animation to timeline
    timeline && timeline.to(el.current, { 
      x: -100 
    }, index * 0.1);
    
  }, [timeline, index]);

  return <div className="box" ref={el}>{children}</div>;
}

function Circle({ children, timeline, index, rotation }) {
  const el = useRef();

  useGSAP(() => {
    // add 'right 100px, rotate 360deg' animation to timeline
    timeline && timeline.to(el.current, { 
      rotation: rotation, 
      x: 100 
    }, index * 0.1);
    
  }, [timeline, rotation, index]);

  return <div className="circle" ref={el}>{children}</div>;
}

function App() {
  const [tl, setTl] = useState();

  useGSAP(() => {
    const tl = gsap.timeline();
    setTl(tl);
  });

  return (
      <div className="app">
        <Box timeline={tl} index={0}>Box</Box>
        <Circle timeline={tl} rotation={360} index={1}>Circle</Circle>
      </div>
  );
}
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/XWReqpO)

```
<div id="root" class="panel center"></div>
```

```
.app {
  padding: 10px;
}

.box, .circle {
  margin: 10px auto;
}
```

```
import React, { useEffect, useLayoutEffect, useRef, useState } from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

import gsap from "https://esm.sh/gsap@3.15.0";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

console.clear();

function Box({ children, timeline, index }) {
  const el = useRef();
  
  useGSAP(() => {
    // add 'left 100px' animation to timeline
    timeline && timeline.to(el.current, { 
      x: -100 
    }, index * 0.1);
    
  }, [timeline, index]);

  return <div className="box gradient-green" ref={el}>{children}</div>;
}

function Circle({ children, timeline, index, rotation }) {
  const el = useRef();

  useGSAP(() => {
    // add 'right 100px, rotate 360deg' animation to timeline
    timeline && timeline.to(el.current, { 
      rotation: rotation, 
      x: 100 
    }, index * 0.1);
    
  }, [timeline, rotation, index]);

  return <div className="circle gradient-blue" ref={el}>{children}</div>;
}

function App() {
  const [tl, setTl] = useState();

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline();
    setTl(tl);
  });

  const toggleTimeline = contextSafe(() => {
    tl.reversed(!tl.reversed());
  })

  return (
      <div className="app">
        <button onClick={toggleTimeline}>Toggle</button>
        <Box timeline={tl} index={0}>Box</Box>
        <Circle timeline={tl} rotation={360} index={1}>Circle</Circle>
      </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

## Passing down a callback to build a timeline[​](#passing-down-a-callback-to-build-a-timeline "Direct link to Passing down a callback to build a timeline")

```
function Box({ children, addAnimation, index }) {
  const el = useRef();

  useGSAP(() => {
    const animation = gsap.to(el.current, { x: -100 });
    addAnimation(animation, index);
  }, [addAnimation, index]);

  return (
    <div className="box" ref={el}>{children}</div>
  );
}

function Circle({ children, addAnimation, index, rotation }) {
  const el = useRef();

  useGSAP(() => {
    const animation = gsap.to(el.current, { rotate: rotation, x: 100 });
    addAnimation(animation, index);
  }, [addAnimation, index, rotation]);

  return (
    <div className="circle" ref={el}>{children}</div>
  );
}

function App() {
  const [reversed, setReversed] = useState(false);
  const [tl, setTl] = useState();

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline();
    setTl(tl);
  });

  const addAnimation = useCallback((animation, index) => {
    tl && tl.add(animation, index * 0.1);
  },[tl]);

  const toggleTimeline = contextSafe(() => {
    tl.current.reversed(!tl.current.reversed())
  });

  useGSAP(() => {
    // reverse the tim
    tl && tl.reversed(reversed);
  }, [reversed, tl]);

  return (
    <div className="app">
      <button onClick={() => setReversed(!reversed)}>Toggle</button>
      <Box addAnimation={addAnimation} index={0}>Box</Box>
      <Circle addAnimation={addAnimation} index={1} rotation="360">Circle</Circle>
    </div>
  );
}
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/poPWVpO)

```
<div id="root" class="panel center"></div>
```

```
.app {
  padding: 10px;
}

.box, .circle {
  margin: 10px auto;
}
```

```
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

import gsap from "https://esm.sh/gsap@3.15.0";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

console.clear();

function Box({ children, addAnimation, index }) {
  const el = useRef();

  useGSAP(() => {
    console.log("Box effect");
    const animation = gsap.to(el.current, { x: -200 });
    addAnimation(animation, index);
  }, [addAnimation, index]);

  return (
    <div className="box gradient-green" ref={el}>
      {children}
    </div>
  );
}

function Circle({ children, addAnimation, index, rotation }) {
  const el = useRef();
  
  useGSAP(() => {
    console.log("Circle effect");
    const animation = gsap.to(el.current, { rotate: rotation, x: 200 });
    addAnimation(animation, index);
  }, [addAnimation, index]);
  
  return <div className="circle gradient-blue" ref={el}>{children}</div>;
}

function App() {
  const [tl, setTl] = useState();

  const { contextSafe} = useGSAP(() => {
    console.log("App effect (create timeline)");
    const tl = gsap.timeline();
    setTl(tl);
  });

  const addAnimation = useCallback((animation, index) => {
     tl && tl.add(animation, index * 0.1);
  },[tl]);

  const toggleTimeline = contextSafe(() => {
    console.log("toggle")
    tl && tl.reversed(!tl.reversed())
  });
  
  return (
    <div className="app">
      <button onClick={toggleTimeline}>Toggle</button>
      <Box addAnimation={addAnimation} index={0}>Box</Box>
      <Circle addAnimation={addAnimation} index={1} rotation="360">Circle</Circle>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

## React Context[​](#react-context "Direct link to React Context")

Passing down props or callbacks might not be ideal for every situation.

The component you're trying to communicate with may be deeply nested inside other components, or in a completely different tree. For situations like this, you can use [React's Context.](https://reactjs.org/docs/context.html)

Whatever value your Context Provider provides will be available to any child component that uses the useContext hook.

Context

[React's Context](https://reactjs.org/docs/context.html) is not the same as [GSAP's Context](https://gsap.com/docs/v3/GSAP/gsap.context\(\)/)

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/wvdrERm)

```
<div id="root" class="panel center"></div>
```

```
.app {
  padding: 10px;
}

.box {
  margin: 10px 0;
}

label {
  display: block;
}

.menu {
  display: flex;
}

.menu > label {
  margin: 0.5rem 1rem;
}
```

```
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
  createContext
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

import gsap from "https://esm.sh/gsap@3.15.0";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

// React Context - not GSAP Context
const SelectedContext = createContext();

function Box({ children, id }) {
  const el = useRef();
  // React Context - not GSAP Context
  const { selected } = useContext(SelectedContext);

  useGSAP(() => {
    gsap.to(el.current, {
      x: selected === id ? 200 : 0
    });
  }, [selected, id]);

  return (
    <div className="box gradient-blue" ref={el}>
      {children}
    </div>
  );
}

function Boxes() {
  return (
    <div className="boxes">
      <Box id="1">Box 1</Box>
      <Box id="2">Box 2</Box>
      <Box id="3">Box 3</Box>
    </div>
  );
}

function Menu() {
  // React Context - not GSAP Context
  const { selected, setSelected } = useContext(SelectedContext);

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="menu">
      <label>
        <input
          onChange={onChange}
          checked={selected === "1"}
          type="radio"
          value="1"
          name="selcted"
        />{" "}
        Box 1
      </label>
      <label>
        <input
          onChange={onChange}
          checked={selected === "2"}
          type="radio"
          value="2"
          name="selcted"
        />{" "}
        Box 2
      </label>
      <label>
        <input
          onChange={onChange}
          checked={selected === "3"}
          type="radio"
          value="3"
          name="selcted"
        />{" "}
        Box 3
      </label>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState("2");

  return (
    <div className="app">
      <SelectedContext.Provider value={{ selected, setSelected }}>
        <Menu />
        <Boxes />
      </SelectedContext.Provider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

## Creating reusable animations[​](#creating-reusable-animations "Direct link to Creating reusable animations")

Creating reusable animations is a great way to keep your code clean and scalable while reducing your app's file size.

### Declarative animation component[​](#declarative-animation-component "Direct link to Declarative animation component")

In this demo we're creating a component to handle the animation and then passing an object in to set the x value.

```
function FadeIn({ children, vars }) {
  const el = useRef();
  
  useGSAP(() => {
    animation.current = gsap.from(el.current.children, {
      opacity: 0,
      stagger,
      x
    });
  });
  
  return <span ref={el}>{children}</span>;
}
  
function App() {      
  return (
    <FadeIn vars={{ x: 100 }}>
      <div className="box">Box</div>
    </FadeIn>
  );
}
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/LYydbJV)

```
<div id="root" class="panel center text-center"></div>
```

```
.app {
  padding: 10px;
}

.box {
  margin: 10px auto;
}
```

```
import React, {
  useLayoutEffect,
  useEffect,
  useRef,
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

import gsap from "https://esm.sh/gsap@3.15.0";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

console.clear();

const FadeIn = ({ children, stagger = 0, x = 0, ref }) => {
  const el = useRef();
  const animation = useRef();

  useGSAP(() => {
    animation.current = gsap.from(el.current.children, {
      opacity: 0,
      stagger,
      x
    });
  });

  useGSAP(() => {
    // forward the animation instance
    if (typeof ref === "function") {
      ref(animation.current);
    } else if (ref) {
      ref.current = animation.current;
    }
  }, [ref]);

  return <span ref={el}>{children}</span>;
};

function App() {
  const animation = useRef();

  const toggle = () => {
    animation.current.reversed(!animation.current.reversed());
  };

  return (
    <div className="app">
      <div>
        <button onClick={toggle}>Toggle</button>
      </div>
      <FadeIn stagger={0.1} x={100} ref={animation}>
        <div className="box gradient-blue">Box 1</div>
        <div className="box gradient-blue">Box 2</div>
      </FadeIn>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

warning

If you want to use a React Fragment or animate a function component, you should pass in a ref for the target(s).

### RegisterEffect()[​](#registereffect "Direct link to RegisterEffect()")

GSAP also provides a way to create reusable animations with [`registerEffect()`](/docs/v3/GSAP/gsap.registerEffect\(\).md)

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/VwbXyON)

```
<div id="root" class="panel center text-center"></div>
```

```
.app {
  padding: 10px;
}

.box {
  margin: 10px auto;
  will-change: transform;
}
```

```
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

import gsap from "https://esm.sh/gsap@3.15.0";
import { CustomEase } from "https://esm.sh/gsap@3.15.0/CustomEase";
import { CustomWiggle } from "https://esm.sh/gsap@3.15.0/CustomWiggle";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

console.clear();

gsap.registerPlugin(CustomEase, CustomWiggle);
gsap.config({ trialWarn: false });

CustomWiggle.create("myWiggle", {
  wiggles: 8,
  type: "uniform"
});

gsap.registerEffect({
  name: "pulse",
  effect(targets) {
    return gsap.fromTo(
      targets,
      {
        scale: 1
      },
      {
        scale: 1.5,
        repeat: 1,
        ease: "bounce",
        yoyoEase: "power3"
      }
    );
  }
});

gsap.registerEffect({
  name: "spin",
  effect(targets) {
    return gsap.to(targets, {
      rotation: (i, el) =>
        gsap.utils.snap(360, gsap.getProperty(el, "rotation") + 360)
    });
  }
});

gsap.registerEffect({
  name: "shake",
  effect(targets) {
    return gsap.fromTo(
      targets,
      {
        x: 0
      },
      {
        x: 10,
        ease: "myWiggle"
      }
    );
  }
});

const GsapEffect = ({ children, effect, targetRef, vars, ref }) => {
  const animation = useRef();

  useGSAP(() => {
    if (gsap.effects[effect]) {
      const t = gsap.effects[effect](targetRef.current, vars);
      animation.current = t;
    }
  }, [effect, targetRef, vars]);

  useGSAP(() => {
    // forward the animation instance if a ref is passed
    if (typeof ref === "function") {
      ref(animation.current);
    } else if (ref) {
      ref.current = animation.current;
    }
  }, [ref]);

  return <>{children}</>;
};

const Box = ({ children, ref }) => {
  return (
    <div className="box gradient-blue" ref={ref}>
      {children}
    </div>
  );
};

const wrap = gsap.utils.wrap(["pulse", "spin", "shake"]);

function App() {
  const boxRef = useRef();
  const count = useRef(0);
  const [effect, setEffect] = useState("");

  const toggle = () => {
    setEffect(wrap(count.current++));
  };

  return (
    <div className="app">
      <div>
        <button onClick={toggle}>Toggle</button>
      </div>
      <p>Effect: {effect}</p>
      <GsapEffect targetRef={boxRef} effect={effect}>
        <Box ref={boxRef}>Box</Box>
      </GsapEffect>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Plugins[CustomEase](/docs/v3/Eases/CustomEase.md)[CustomWiggle](/docs/v3/Eases/CustomWiggle.md)

## Exit animations[​](#exit-animations "Direct link to Exit animations")

To animate elements that are exiting the DOM, we need to delay when React removes the element. We can do this by changing the component's state after the animation has completed.

```
function App() {      
  const app = useRef();
  const [active, setActive] = useState(true);

  const { contextSafe } = useGSAP({ scope: container });

  const remove = contextSafe(() => {
    gsap.to(".box", {
      opacity: 0,
      onComplete: () => setActive(false)
    });
  });
  
  return (
    <div className="app" ref={container}>
      <button onClick={ctx.remove}>Remove</button>
      { active ? <div ref={boxRef}>Box</div> : null }
    </div>
  );
}
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/QWvVzgB)

```
<div id="root" class="panel center"></div>
```

```
.app {
  padding: 10px;
}

.box {
 margin: 1rem auto;
}
```

```
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
import gsap from "https://esm.sh/gsap@3.15.0";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

console.clear();

function App() {
  const container = useRef();
  const [active, setActive] = useState(true);

  const { contextSafe } = useGSAP({ scope: container });

  const remove = contextSafe(() => {
    gsap.to(".box", {
      opacity: 0,
      onComplete: () => setActive(false)
    });
  });

  return (
    <div className="app" ref={container}>
      <button className="button" onClick={() => active && remove()}>
        {active ? "Remove Box" : "Done"}
      </button>
      {active ? <div className="box gradient-blue">Box</div> : null}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

The same approach can be used when rendering elements from an array.

```
function App() {    
  
  const [items, setItems] = useState(() => [
    { id: 0, color: "blue" },
    { id: 1, color: "red" },
    { id: 2, color: "purple" }
  ]);

  const { contextSafe } = useGSAP();

  const remove = contextSafe((item, target) => {
    gsap.to(target, {
      opacity: 0,
      onComplete: () => removeItem(item)
    });
  });

  const removeItem = (value) => {
    setItems((prev) => prev.filter((item) => item !== value));
  };
  
  return (
    <div className="app" ref={container}>
      {items.map((item) => (
        <div key={item.id} onClick={(e) => ctx.remove(item, e.currentTarget)}>
          Click Me
        </div>
      ))}
    </div>
  );
}
```

Oh no! Layout shift...

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/LYyJqLO)

```
<div id="root" class="panel center"></div>
<!-- layout jump solved in this codepen https://codepen.io/GreenSock/pen/MWmqzjE -->
```

```
.app {
  padding: 10px;
}

.box {
  margin: 10px 10px 0 0;
  padding: 10px;
}

.boxes {  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
```

```
import React, {
  useState,
  useLayoutEffect,
  useEffect
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
import gsap from "https://esm.sh/gsap@3.15.0";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

console.clear();

function App() {
  const [items, setItems] = useState(() => [
    { id: 0, color: "blue" },
    { id: 1, color: "red" },
    { id: 2, color: "purple" }
  ]);
  const { context, contextSafe } = useGSAP();

  const remove = contextSafe((item, target) => {
    gsap.to(target, {
      opacity: 0,
      onComplete: () => removeItem(item)
    });
  });

  const removeItem = (value) => {
    setItems((prev) => prev.filter((item) => item !== value));
  };

  return (
    <div className="app boxes">
      {items.map((item) => (
        <div
          className={`box gradient-${item.color}`}
          key={item.id}
          onClick={(e) => remove(item, e.currentTarget)}
        >
          Click Me
        </div>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

This works - but you may have noticed the layout shift - this is typical of exit animations. The [Flip plugin](/docs/v3/Plugins/Flip/.md) can be used to smooth this out.

## No more layout shifts with FLIP\![​](#no-more-layout-shifts-with-flip "Direct link to No more layout shifts with FLIP!")

In this demo, we're tapping into Flip's onEnter and onLeave to define our animations. To trigger onLeave, we have to set display: none on the elements we want to animate out.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/MWmqzjE)

```
<div id="root" class="panel center"></div>
```

```
.button {
  user-select: none;
}

.app {
  padding: 10px;
}

.box {
  margin: 10px 10px 0 0;
  user-select: none;
  padding: 10px;
}

.box.exiting,
.box.exited {
  display: none;
}

.boxes {  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

button {
  margin: 1rem 0.5rem;
}
```

```
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
import gsap from "https://esm.sh/gsap@3.15.0";
import { Flip } from "https://esm.sh/gsap@3.15.0/Flip";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

let count = 0;

gsap.registerPlugin(Flip);

const wrapColor = gsap.utils.wrap(["blue", "green", "red", "orange"]);

function createItem() {
  return { id: ++count, color: wrapColor(count), status: "entered" };
}

function App() {
  const el = useRef();
  const q = gsap.utils.selector(el);

  const removeItems = useCallback(
    (exitingItems) => {
      if (!exitingItems.length) return;

      setLayout((prev) => ({
        state: Flip.getState(q(".box, .button")),
        items: prev.items.filter((item) => !exitingItems.includes(item))
      }));
    },
    [q]
  );

  const [layout, setLayout] = useState(() => ({
    items: [createItem(), createItem(), createItem(), createItem()].reverse()
  }));

  useGSAP(
    () => {
      if (!layout.state) return;

      // get the items that are exiting in this batch
      const exiting = layout.items.filter((item) => item.status === "exiting");
      // Flip.from returns a timeline
      const timeline = Flip.from(layout.state, {
        absolute: true,
        ease: "power1.inOut",
        targets: q(".box, .button"),
        scale: true,
        simple: true,
        onEnter: (elements) => {
          return gsap.fromTo(
            elements,
            {
              opacity: 0,
              scale: 0
            },
            {
              opacity: 1,
              scale: 1,
              delay: 0.2,
              duration: 0.3
            }
          );
        },
        onLeave: (elements) => {
          return gsap.to(elements, {
            opacity: 0,
            scale: 0
          });
        },
        onComplete() {
          // works around a Safari rendering bug (unrelated to GSAP). Things reflow narrower otherwise.
          let boxes = document.querySelector(".boxes"),
            lastChild = boxes.lastChild;
          boxes.appendChild(lastChild);
        }
      });

      // remove the exiting items from the DOM after the animation is done
      timeline.add(() => removeItems(exiting));
    },
    {
      dependencies: [layout, q, removeItems]
    }
  );

  const addItem = () => {
    setLayout({
      state: Flip.getState(q(".box, .button")),
      items: [createItem(), ...layout.items]
    });
  };

  const shuffle = () => {
    setLayout({
      state: Flip.getState(q(".box, .button")),
      items: [...gsap.utils.shuffle(layout.items)]
    });
  };

  const remove = (item) => {
    // set the item as exiting which will add a CSS class for display: none;
    item.status = "exiting";

    setLayout({
      ...layout,
      state: Flip.getState(q(".box, .button"))
    });
  };

  return (
    <div className="app text-center" ref={el}>
      <div>
        <button className="button" onClick={addItem}>
          Add Box
        </button>
        <button className="button" onClick={shuffle}>
          Shuffle
        </button>
      </div>
      <div className="boxes">
        {layout.items.map((item) => (
          <div
            id={`box-${item.id}`}
            key={item.id}
            className={`box gradient-${item.color} ${item.status}`}
            onClick={() => remove(item)}
          >
            Click Me
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Plugins[Flip](/docs/v3/Plugins/Flip/.md)

## Custom Hooks[​](#custom-hooks "Direct link to Custom Hooks")

If you find yourself reusing the same logic over and over again, there's a good chance you can extract that logic into a [custom hook.](https://reactjs.org/docs/hooks-custom.html) Building your own Hooks lets you extract component logic into reusable functions. If you've made have any handy GSAP hooks - [let us know!](mailto:info@greensock.com?subject=React)

### useStateRef[​](#usestateref "Direct link to useStateRef")

This hook helps solve the problem of accessing stale values in your callbacks. It works exactly like useState, but returns a third value, a ref with the current state.

```
function useStateRef(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const ref = useRef(state);

  const dispatch = useCallback((value) => {
    ref.current = typeof value === "function" ? value(ref.current) : value;
    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
}
```

Usage:

```
const [count, setCount, countRef] = useStateRef(5);
const [gsapCount, setGsapCount] = useState(0);  

useGSAP(() => {
  gsap.to(".box", {
    x: 200,
    onRepeat: () => setGsapCount(countRef.current)
  });
}, {scope: app});
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/XWRqzbQ)

```
<div id="root" class="panel center text-center"></div>
```

```
.app {
  padding: 10px;
}

.box {
  margin: 10px 0;
}
```

```
import React, {
  useLayoutEffect, useRef, useState, useCallback
} from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
import gsap from "https://esm.sh/gsap@3.15.0";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@19.1.0";

gsap.registerPlugin(useGSAP);

console.clear();

function useStateRef(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const ref = useRef(state);

  const dispatch = useCallback((value) => {
    ref.current = typeof value === "function" ? value(ref.current) : value;
    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
}

function App() {  
  const app = useRef();
  const [count, setCount, countRef] = useStateRef(5);
  const [gsapCount, setGsapCount] = useState(0);
  
  useGSAP(() => {
    gsap.to(".box", {
      x: 200,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "none",
      onRepeat: () => setGsapCount(countRef.current)
    });
  }, {
    scope: app
  });
     
  return (
    <div className="app" ref={app}>
      <div>
        <button onClick={() => setCount(count + 1)}>Click Me</button>
      </div>
      <p>Count: {count}</p>
      <p>GSAP Count: {gsapCount}</p>
      <div className="box gradient-blue">Box</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### useGSAP()[​](#usegsap "Direct link to useGSAP()")

and of course our own [`useGSAP()` hook!](/resources/React.md#usegsap-hook-)

Reach out!

If there is anything you'd like to see included in this article, or if you have any feedback or useful demos, please [let us know](mailto:info@greensock.com?subject=React) so that we can smooth out the learning curve for other animators.

Good luck with your React projects and happy tweening!
