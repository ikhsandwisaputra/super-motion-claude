---
source: https://www.unicorn.studio/docs/variables
title: "Variables - Unicorn Studio"
fetched: 2026-10-28
---

# Variables

Variables connect your scene to your code. You name a value in the editor — a color, a number, a piece of text — publish, and your site can read and change it at runtime with a simple API. No layer IDs, no shader uniforms, no WebGL knowledge required.

Use variables for:

* Changing property values dynamically at runtime
* Custom animations and events
* Passing data from a CMS
* Reusable values shared across multiple layers

If a variable exists for a value, use it instead of mutating layers directly.

Integration guide for humans and agents

Share the [AI-friendly Unicorn Studio reference](https://www.unicorn.studio/unicornstudio-llms.txt) with coding agents so they can understand embeds, variables, and the runtime API before generating integration code. You can also click **LLM instructions** in the Export panel to copy a scene-specific prompt.

## Live Example

This embed starts with three initial variable values: `Wave`, `Bokeh`, and `Text`.

Code

```
<div
  style="width: 100%; height: auto; aspect-ratio: 16/9; position: relative"
  data-us-project="0HJ5wF7grrXdlW6gSbAD"
  data-us-controls="true"
  data-us-vars='{"Wave":0.37,"Bokeh":0.17,"Text":"VARIABLES"}'
></div>
<script type="text/javascript">!function(){var u=window.UnicornStudio;if(u&&u.init){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){u.init()})}else{u.init()}}else{window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js",i.onload=function(){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})}else{UnicornStudio.init()}},(document.head||document.body).appendChild(i)}}();</script>
```

## Creating Variables

In the editor, click the small plus button next to any valid property to turn it into a variable. Not everything can be a variable — the plus button shows you what can. You can also manage variables in the Variables panel, which displays when no layer is selected.

**Publish your scene to make variables available at runtime.**

[](https://assets.unicorn.studio/media/docs/variables.mp4)

## Setting Initial Values

Use `data-us-vars` for declarative HTML embeds. The value must be a JSON object keyed by variable name.

```
<div
  data-us-project="YOUR_PROJECT_EMBED_ID"
  data-us-vars='{"brandColor":"#7c3aed","intensity":0.65,"heroImage":"https://example.com/hero.jpg"}'
></div>
```

If you create scenes in JavaScript, pass `initialVariables` to `UnicornStudio.addScene()`.

```
const scene = await UnicornStudio.addScene({
  projectId: 'YOUR_PROJECT_EMBED_ID',
  element: document.querySelector('#unicorn'),
  initialVariables: {
    brandColor: '#7c3aed',
    intensity: 0.65,
    heroImage: 'https://example.com/hero.jpg'
  }
});
```

Initial variables are applied after the scene loads its authored defaults.

## Updating Variables After Load

Use `setVariable()` for one value or `setVariables()` for multiple values.

```
scene.setVariable('brandColor', '#ff4fd8');

scene.setVariables({
  brandColor: '#4f46e5',
  intensity: 0.4
});
```

If a variable name is unknown or a value fails validation, Unicorn Studio logs a console warning and leaves the current value unchanged.

## Reading Variables

```
const brandColor = scene.getVariable('brandColor');
const allValues = scene.getVariables();
const definition = scene.getVariableDefinition('brandColor');
const definitions = scene.getVariableDefinitions();
const manifest = scene.getVariableManifest();
```

Use `getVariableManifest()` before building custom controls. Each manifest item includes the variable name, type, default value, current value, description, validation, binding count, and binding metadata.

## Listening For Changes

```
const unsubscribe = scene.onVariableChange((name, value, values) => {
  console.log('Variable changed:', name, value, values);
});

unsubscribe();
```

The callback receives the changed variable name, the new value, and the full current variables object.

## Variable Types

* `number`: JavaScript number
* `boolean`: JavaScript boolean
* `string`: JavaScript string
* `color`: hex string such as `#7c3aed`
* `vec2`: object with `{ type: 'Vec2', x, y }`
* `vec3`: object with `{ type: 'Vec3', x, y, z }`
* `texture`: URL string or texture-like object, depending on the authored binding

Color variables should usually be set as hex strings, and vector variables should include the vector type:

```
scene.setVariable('brandColor', '#0ea5e9');
scene.setVariable('position', { type: 'Vec2', x: 0.5, y: 0.35 });
scene.setVariable('direction', { type: 'Vec3', x: 0.2, y: 0.8, z: 0.1 });
```

## Presets

Presets are named snapshots of variable values. They let you publish curated looks — `Brand Dark`, `Brand Light`, `High Contrast` — so a host page can switch the whole scene with one call instead of setting every variable by hand.

Create presets from the Variables panel in the editor. A preset stores the current values for published variables and ships with the scene the next time you publish.

Apply one on load:

```
<div
  data-us-project="YOUR_PROJECT_EMBED_ID"
  data-us-preset="Brand Dark"
  data-us-vars='{"headline":"Launch Week"}'
></div>
```

Presets apply before variables, so explicit variable values override the preset — here the scene starts from `Brand Dark`, then overrides only `headline`. In JavaScript, pass `initialPreset` to `UnicornStudio.addScene()`, or apply a preset to every scene on a page with a `?preset=Brand%20Dark` query parameter. Precedence: `initialPreset` → `data-us-preset` → `?preset=`.

Switch presets at runtime:

```
const presets = scene.getPresets();
scene.setPreset('Brand Dark'); // Accepts a preset ID or name.
scene.setVariable('accentColor', '#ff4fd8'); // Still overridable afterwards.
```

`scene.setPreset()` updates the scene immediately and notifies `scene.onVariableChange()` listeners for each variable the preset changes. If the published scene includes presets, the built-in runtime controls panel (`data-us-controls`) shows a preset dropdown automatically.

## Build Custom Controls

Use the manifest to generate app UI from the variables that were actually published with the scene.

```
function createControls(scene, container) {
  scene.getVariableManifest().forEach(variable => {
    const input = document.createElement('input');
    input.name = variable.name;

    if (variable.type === 'color') {
      input.type = 'color';
      input.value = variable.currentValue || variable.defaultValue || '#ffffff';
    } else if (variable.type === 'number') {
      input.type = 'range';
      input.min = variable.validation?.min ?? 0;
      input.max = variable.validation?.max ?? 1;
      input.step = variable.validation?.step ?? 0.01;
      input.value = variable.currentValue ?? variable.defaultValue ?? 0;
    } else if (variable.type === 'boolean') {
      input.type = 'checkbox';
      input.checked = Boolean(variable.currentValue ?? variable.defaultValue);
    } else {
      input.type = 'text';
      input.value = variable.currentValue ?? variable.defaultValue ?? '';
    }

    input.addEventListener('input', () => {
      const value = input.type === 'checkbox' ? input.checked : input.value;
      scene.setVariable(variable.name, value);
    });

    container.append(input);
  });
}
```

## Breakpoints And Events

Runtime precedence for a property is:

```
authored base value -> breakpoint value -> variable/runtime override -> active event animation
```

In practice, breakpoints choose the default, variables let host code control that default, and events animate on top of that value while they are active.

## Debugging

Start by checking the variables published with the scene:

```
console.table(scene.getVariableManifest());
console.log(scene.getVariables());
```

If `setVariable()` does nothing:

* Confirm the variable name exists in `getVariableDefinitions()`.
* Confirm the variable has at least one binding in `getVariableManifest()`.
* Confirm the value type matches the variable type.
* Confirm the published scene includes the variable and its binding.

## More Examples

Three working demos, each driving a published scene entirely through variables. Expand the code block under each one to see how it works.

### Web Audio Mic Demo

This project uses smoothed microphone volume to boost the nebula amplitude, brightness, and scale.

The animation loop measures the microphone signal with the Web Audio API, converts it to an RMS volume level, and applies a lightweight exponential moving average before calling `scene.setVariables()`. A faster attack and slower release keeps loud sounds responsive without making quiet moments flicker.

Code

```
<div style="width: 100%; height: auto; aspect-ratio: 1/1; position: relative">
  <div
    id="unicorn-mic-demo"
    style="width: 100%; height: 100%; position: relative"
  ></div>
  <button
    id="unicorn-mic-button"
    type="button"
    style="position: absolute; left: 16px; bottom: 16px; z-index: 2; padding: 10px 14px; border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; background: rgba(0,0,0,0.72); color: #ffffff; font: inherit; cursor: pointer; backdrop-filter: blur(8px)"
  >
    Enable mic
  </button>
</div>

<script type="text/javascript">
  !function () {
    var projectId = 'WYXYVuz9Jgh7PEFpgtGG';
    var elementId = 'unicorn-mic-demo';
    var buttonId = 'unicorn-mic-button';
    var idleScale = 0.2;
    var baseScale = 0.4;
    var idleAmplitude = 0.12;
    var baseAmplitude = 0.29;
    var idleBrightness = 0.35;
    var baseBrightness = 1;
    var scene;
    var audioContext;
    var analyser;
    var sourceNode;
    var data;
    var frameId;
    var smoothedLevel = 0;
    var started = false;

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function setButton(text, disabled) {
      var button = document.getElementById(buttonId);
      if (!button) return;

      button.textContent = text;
      button.disabled = !!disabled;
    }

    function readLevel() {
      var sum = 0;
      analyser.getByteTimeDomainData(data);

      for (var i = 0; i < data.length; i++) {
        var sample = (data[i] - 128) / 128;
        sum += sample * sample;
      }

      return clamp((Math.sqrt(sum / data.length) - 0.02) * 7, 0, 1);
    }

    function animate() {
      if (!scene || !analyser) return;

      var level = readLevel();
      var smoothing = level > smoothedLevel ? 0.28 : 0.08;
      smoothedLevel += (level - smoothedLevel) * smoothing;

      scene.setVariables({
        Scale: clamp(baseScale + smoothedLevel * 0.12, 0, 0.6),
        Amplitude: clamp(baseAmplitude + smoothedLevel * 0.65, 0, 1),
        Brightness: clamp(baseBrightness + smoothedLevel * 0.75, 0, 1.75)
      });

      frameId = requestAnimationFrame(animate);
    }

    function startMic() {
      if (started) return;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setButton('Mic unavailable', true);
        return;
      }

      setButton('Requesting mic', true);

      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        started = true;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0;
        data = new Uint8Array(analyser.fftSize);
        sourceNode = audioContext.createMediaStreamSource(stream);
        sourceNode.connect(analyser);

        scene.setVariables({
          Scale: baseScale,
          Amplitude: baseAmplitude,
          Brightness: baseBrightness
        });

        setButton('Listening', true);
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(animate);
      }).catch(function () {
        setButton('Mic blocked', false);
      });
    }

    function start() {
      var element = document.getElementById(elementId);
      if (!element || !window.UnicornStudio || !window.UnicornStudio.addScene) return;

      window.UnicornStudio.addScene({
        projectId: projectId,
        element: element,
        initialVariables: {
          Scale: idleScale,
          Amplitude: idleAmplitude,
          Brightness: idleBrightness
        }
      }).then(function (nextScene) {
        var button;

        scene = nextScene;
        button = document.getElementById(buttonId);
        if (button) button.addEventListener('click', startMic);
      });
    }

    function load() {
      var u = window.UnicornStudio;

      if (u && u.addScene) {
        start();
        return;
      }

      var existing = document.querySelector('script[src*="unicornStudio.umd.js"]');
      if (existing) {
        existing.addEventListener('load', start);
        return;
      }

      window.UnicornStudio = u || { isInitialized: false };

      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js';
      script.onload = start;
      (document.head || document.body).appendChild(script);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', load);
    } else {
      load();
    }
  }();
</script>
```

### HTML Clock Demo

This project exposes four variables: `foreground`, `background`, `textContent`, and `glitchAmount`. The host page updates `textContent` once per second and toggles the color variables between light and dark mode, briefly pulsing `glitchAmount` during the transition.

Code

```
<div style="width: 100%; height: auto; aspect-ratio: 16/9; position: relative">
  <div
    id="unicorn-clock-demo"
    style="width: 100%; height: 100%; position: relative"
  ></div>
  <button
    id="unicorn-clock-theme-toggle"
    type="button"
    style="position: absolute; left: 16px; bottom: 16px; z-index: 2; padding: 10px 14px; border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; background: rgba(0,0,0,0.72); color: #ffffff; font: inherit; cursor: pointer; backdrop-filter: blur(8px)"
  >
    Toggle dark mode
  </button>
</div>

<script type="text/javascript">
  !function () {
    var projectId = 'u86Vuk7DQZNWSMLxLBX2';
    var elementId = 'unicorn-clock-demo';
    var toggleId = 'unicorn-clock-theme-toggle';
    var light = { foreground: '#000000', background: '#ffffff' };
    var dark = { foreground: '#ffffff', background: '#000000' };
    var isDark = false;
    var scene;
    var transitionToken = 0;

    function time() {
      return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }

    function theme() {
      return isDark ? dark : light;
    }

    function vars(colors, glitchAmount) {
      return {
        foreground: colors.foreground,
        background: colors.background,
        glitchAmount: glitchAmount
      };
    }

    function updateClock() {
      if (scene) scene.setVariables({ textContent: time() });
    }

    function flashTheme() {
      if (!scene) return;

      var token = ++transitionToken;
      var target = theme();
      var flash = {
        foreground: target.background,
        background: target.foreground
      };

      scene.setVariables(vars(target, 0.85));
      setTimeout(function () {
        if (token === transitionToken) scene.setVariables(vars(flash, 1));
      }, 70);
      setTimeout(function () {
        if (token === transitionToken) scene.setVariables(vars(target, 0.55));
      }, 140);
      setTimeout(function () {
        if (token === transitionToken) scene.setVariables(vars(flash, 0.9));
      }, 210);
      setTimeout(function () {
        if (token === transitionToken) scene.setVariables(vars(target, 0));
      }, 300);
    }

    function start() {
      var element = document.getElementById(elementId);
      if (!element || !window.UnicornStudio || !window.UnicornStudio.addScene) return;

      window.UnicornStudio.addScene({
        projectId: projectId,
        element: element,
        initialVariables: {
          foreground: light.foreground,
          background: light.background,
          textContent: time(),
          glitchAmount: 0
        }
      }).then(function (nextScene) {
        var toggle;

        scene = nextScene;
        setInterval(updateClock, 1000);

        toggle = document.getElementById(toggleId);
        if (toggle) {
          toggle.addEventListener('click', function () {
            isDark = !isDark;
            flashTheme();
            toggle.textContent = isDark ? 'Toggle light mode' : 'Toggle dark mode';
          });
        }
      });
    }

    function load() {
      var u = window.UnicornStudio;

      if (u && u.addScene) {
        start();
        return;
      }

      var existing = document.querySelector('script[src*="unicornStudio.umd.js"]');
      if (existing) {
        existing.addEventListener('load', start);
        return;
      }

      window.UnicornStudio = u || { isInitialized: false };

      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js';
      script.onload = start;
      (document.head || document.body).appendChild(script);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', load);
    } else {
      load();
    }
  }();
</script>
```

### Load Bar Demo

This project exposes `loadPercent` and `loadBarWidth`. The host page starts a fake loading animation on click, drives the text from `00%` to `100%`, fills the bar from `0` to `100%`, then displays `complete` and hides the `pattern` and `noise_fill` layers. Clicking the button again resets the scene and replays the animation.

Code

```
<div style="width: 100%; height: auto; aspect-ratio: 24/5; position: relative">
  <div
    id="unicorn-load-bar-demo"
    style="width: 100%; height: 100%; position: relative"
  ></div>
  <button
    id="unicorn-load-bar-button"
    type="button"
    style="position: absolute; left: 16px; bottom: 16px; z-index: 2; padding: 10px 14px; border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; background: rgba(0,0,0,0.72); color: #ffffff; font: inherit; cursor: pointer; backdrop-filter: blur(8px)"
  >
    Load
  </button>
</div>

<script type="text/javascript">
  !function () {
    var projectId = 'dPcAYnhyYUi9LLeBwd5T';
    var elementId = 'unicorn-load-bar-demo';
    var buttonId = 'unicorn-load-bar-button';
    var maxBarWidth = 1;
    var duration = 3400;
    var scene;
    var patternLayer;
    var noiseFillLayer;
    var frameId;
    var runToken = 0;

    function formatPercent(progress) {
      var percent = Math.round(progress * 100);
      return (percent < 100 ? String(percent).padStart(2, '0') : String(percent)) + '%';
    }

    function setProgress(progress, label) {
      if (!scene) return;

      scene.setVariables({
        loadPercent: label || formatPercent(progress),
        loadBarWidth: maxBarWidth * progress
      });
    }

    function progressAt(t) {
      var segmentCount = 12;
      var segment = t * segmentCount;
      var index = Math.floor(segment);
      var local = segment - index;
      var moving = Math.min(1, local / 0.38);
      var stopGo = (index + moving) / segmentCount;
      var eased = 1 - Math.pow(1 - stopGo, 2.6);
      var stepped = Math.floor(eased * 30) / 30;

      return Math.max(0, Math.min(1, eased * 0.72 + stepped * 0.28));
    }

    function animate() {
      if (!scene) return;

      var button = document.getElementById(buttonId);
      var token = ++runToken;
      var startTime = performance.now();
      var lastProgress = 0;

      if (frameId) cancelAnimationFrame(frameId);
      setProgress(0);
      if (patternLayer) patternLayer.show();
      if (noiseFillLayer) noiseFillLayer.show();

      if (button) {
        button.disabled = true;
        button.textContent = 'Loading';
      }

      function tick(now) {
        if (token !== runToken) return;

        var t = Math.min(1, (now - startTime) / duration);
        var progress = Math.max(lastProgress, progressAt(t));

        lastProgress = progress;
        setProgress(t >= 1 ? 1 : progress);

        if (t < 1) {
          frameId = requestAnimationFrame(tick);
          return;
        }

        setProgress(1, 'complete');
        if (patternLayer) patternLayer.hide();
        if (noiseFillLayer) noiseFillLayer.hide();
        if (button) {
          button.disabled = false;
          button.textContent = 'Replay';
        }
      }

      frameId = requestAnimationFrame(tick);
    }

    function start() {
      var element = document.getElementById(elementId);
      if (!element || !window.UnicornStudio || !window.UnicornStudio.addScene) return;

      window.UnicornStudio.addScene({
        projectId: projectId,
        element: element,
        initialVariables: {
          loadPercent: '00%',
          loadBarWidth: 0
        }
      }).then(function (nextScene) {
        var button;

        scene = nextScene;
        patternLayer = scene.getLayer('pattern');
        noiseFillLayer = scene.getLayer('noise_fill');
        button = document.getElementById(buttonId);
        if (button) button.addEventListener('click', animate);
      });
    }

    function load() {
      var u = window.UnicornStudio;

      if (u && u.addScene) {
        start();
        return;
      }

      var existing = document.querySelector('script[src*="unicornStudio.umd.js"]');
      if (existing) {
        existing.addEventListener('load', start);
        return;
      }

      window.UnicornStudio = u || { isInitialized: false };

      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js';
      script.onload = start;
      (document.head || document.body).appendChild(script);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', load);
    } else {
      load();
    }
  }();
</script>
```

## See Also

* [Embed Guide](https://www.unicorn.studio/docs/embed/)
* [Performance Guide](https://www.unicorn.studio/docs/performance/)
