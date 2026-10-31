---
source: https://docs.lottiefiles.com/en/creator/12_motion-tokens/intermediate-guide-weather-widget.md
title: ""
fetched: 2026-10-28
---

# Intermediate Guide: Weather Widget
This is a quick tutorial for creating the Weather Widget example using motion tokens.

You can access the Codepen example here: [https://codepen.io/George-Dikun/pen/pvbqVVB](https://codepen.io/George-Dikun/pen/pvbqVVB)

<CodePen url="https://codepen.io/George-Dikun/pen/pvbqVVB" defaultTab="result" theme="dark" height={600} />

The widget displays dynamic info for the city, temperature, weather type, and an animated icon of the weather type. The background changes to give a unique feel to each city choice.

It also has a simple UI for changing the location to demo it. The weather data is actually real and pulls from a publicly-accessible API.

## Creating the File

Before you begin using your motion tokens in code, you first need to create a file that uses motion tokens.

Here is the remix link of the weather widget animation in Lottie Creator: [https://lottie.link/weatherwidget](https://lottie.link/weatherwidget)
<img src="https://assets.docs.lottiefiles.com/static/3841a1f3bc-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/3841a1f3bc-640.webp 640w, https://assets.docs.lottiefiles.com/static/3841a1f3bc-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/3841a1f3bc-1920.webp 1920w" alt="Weather widget animation open in Lottie Creator" width="3456" height="2166" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAqUlEQVR4nB3EuwpBARzA4X9sOgaOSxk4g8JxS0puIbeODosYxHLSKTJIeAHK5BnsRpMyeR2LN9BPfMMnmp5C8fop1RqMZxajqUWt3cXl8RFOpJF/DieWveB0fbC/3Jiv1og4iOhZRNMziDixl0te9yPv55nNbouIEIrGkF9uNUCjY3BYTDitZnTNAYoaJBxLIkEt+knkixRafeIVg3jZIFc3qPaGFJrm5wuWQkZwK88ncgAAAABJRU5ErkJggg==" />

Once inside Creator, you can see the current tokens by opening the Motion Tokens manager.

<img src="https://assets.docs.lottiefiles.com/static/5a007492d7-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/5a007492d7-640.webp 640w, https://assets.docs.lottiefiles.com/static/5a007492d7-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/5a007492d7-1920.webp 1920w" alt="Motion Tokens manager showing weather widget tokens" width="2702" height="1520" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAhklEQVR4nF3OSwrCQBCE4RxC8ZFgxInTzGgQx7yMguBGxLg2bjX3v4H8klm4cNFQUB9FB03bUZ6vmLxmXRyx+YHsdOH+7Lg9Xp+gD+IKBvGC0TxhGCuSTUbTvv15YPOaqdKEesVYacSV9Ms/YHaVB5GkTJQg23+Q7QmXhplJicQirvJl/8MXxhFD1uSsiVsAAAAASUVORK5CYII=" />

This one has a lot going on, so let’s try to break it down.

- At the top, there are opacity tokens for each of the possible weather icons (icon-rain, icon-snow, etc.). These are selectively made visible depending on the type of weather that is being shown. If the weather is rainy, then we can write code later to make the rain cloud animation visible and keep all the others invisible. These animations just play on a loop concurrently.
- Near the middle, there are three text tokens named temperature, atmosphere, and city. These are fairly straightforward; they are text placeholders to be updated in code.
- At the bottom, there are a number of color tokens that are being used as gradients. Lottie Creator does actually support gradient tokens, but they are not used here due to a specific design choice.

<aside>
  You’ll notice there are also a few themes. These are a clever way to store the background gradient data for later use in ChatGPT. Even if you aren’t actually using themes in your animation, they can be useful for storing exact property values for later use by the AI or developer, rather than having to manually type in the values in the prompt or hand off documents.
</aside>

## Vibe Coding with ChatGPT

The logic in this project is more complex than the birthday cake example, but still straightforward for developers or AI.

Before we wrote the prompt, we first did a bit of exploration using ChatGPT and Codepen to find a way to get the user’s real weather data at their location. There are several public API that can be added to your project.

The prompt we used was:

<Panel title="Prompt">
  This is an animation of a weather widget. It has some text layers for various info. I would like to connect it to a real weather service, [https://api.open-meteo.com/v1/forecast](https://api.open-meteo.com/v1/forecast) .

  Text tokens:

  - city = the name of the city
  - temperature = the returned current temperature value
  - atmosphere = the returned type of weather (Cloudy, Sunny, etc.)

  I also have icons that I want to display depending on the weather. Their visibility can be managed by changing their opacity tokens:

  icon-sun
  icon-cloudy
  icon-wind
  icon-rain
  icon-storm
  icon-snow
  icon-snowstorm
  icon-night

  Here’s some functions written by ChatGPT to help turn weather API data into icons and atmosphere text:

  ```javascript
  function codeToAtmosphere(code) {
    if (code === 0) return "Clear";
    if (code <= 2) return "Cloudy";
    if (code === 3) return "Overcast";
    if (code === 45 || code === 48) return "Fog";
    if (code >= 51 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain";
    if (code >= 85 && code <= 86) return "Snow";
    if (code >= 95) return "Storm";
    return "Weather";
  }

  function codeToIcon(code, isDay) {
    if (!isDay && code <= 3) return TOKENS.iconNight;

    if (code === 0) return TOKENS.iconSun;
    if (code <= 3) return TOKENS.iconCloudy;
    if (code === 45 || code === 48) return TOKENS.iconWind;
    if (code >= 51 && code <= 82) return TOKENS.iconRain;
    if (code >= 71 && code <= 77) return TOKENS.iconSnow;
    if (code >= 85 && code <= 86) return TOKENS.iconSnowstorm;
    if (code >= 95) return TOKENS.iconStorm;

    return TOKENS.iconCloudy;
  }
  ```

  This is how to select an icon to have 100% opacity or 0% opacity.

  There is also a set of color tokens for the backrgound gradient colors. The possible values are stored in the themes. Choose a random set each time it updates the city.

  Finally, make a UI that allows choosing from 8 different cities.
</Panel>

Make sure to include the dotLottie file and the skills document!

<img src="https://assets.docs.lottiefiles.com/static/55de985a86-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/55de985a86-640.webp 640w" alt="ChatGPT or editor with weather widget prompt and setup" width="827" height="698" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAh0lEQVR4nD2PSQrEIBBFvYqdpXEELY2J6STbvv91flMFZvEo+BOU0vqDZVmwrqtgrRVY01pDmf2HfXxRK+G+b4wxQEQopUhQUes4zxOtNfTesW0bcs5CjBGKqOB5Hgkdx4FaqxgpJTjnOEC4rkvavDLn+YYQoGaL0957gY2JYoFNY8z7yYRX/ywyWaUSazORAAAAAElFTkSuQmCC" />

Here’s the code from the output:

```jsx
import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web@latest";

// ----------------------------
// Tokens in your animation
// ----------------------------
const TOKENS = {
  city: "city",
  temperature: "temperature",
  atmosphere: "atmosphere",

  iconSun: "icon-sun",
  iconCloudy: "icon-cloudy",
  iconWind: "icon-wind",
  iconRain: "icon-rain",
  iconStorm: "icon-storm",
  iconSnow: "icon-snow",
  iconSnowstorm: "icon-snowstorm",
  iconNight: "icon-night",
};

const ICON_TOKENS = [
  TOKENS.iconSun,
  TOKENS.iconCloudy,
  TOKENS.iconWind,
  TOKENS.iconRain,
  TOKENS.iconStorm,
  TOKENS.iconSnow,
  TOKENS.iconSnowstorm,
  TOKENS.iconNight,
];

// ----------------------------
// City presets (8 options)
// ----------------------------
const CITIES = [
  { name: "Taipei", lat: 25.0330, lon: 121.5654 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Seoul", lat: 37.5665, lon: 126.9780 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
];

// ----------------------------
// Open-Meteo mapping helpers (your provided logic)
// ----------------------------
function codeToAtmosphere(code) {
  if (code === 0) return "Clear";
  if (code <= 2) return "Cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain";
  if (code >= 85 && code <= 86) return "Snow";
  if (code >= 95) return "Storm";
  return "Weather";
}

function codeToIcon(code, isDay) {
  if (!isDay && code <= 3) return TOKENS.iconNight;

  if (code === 0) return TOKENS.iconSun;
  if (code <= 3) return TOKENS.iconCloudy;
  if (code === 45 || code === 48) return TOKENS.iconWind;
  if (code >= 51 && code <= 82) return TOKENS.iconRain;
  if (code >= 71 && code <= 77) return TOKENS.iconSnow;
  if (code >= 85 && code <= 86) return TOKENS.iconSnowstorm;
  if (code >= 95) return TOKENS.iconStorm;

  return TOKENS.iconCloudy;
}

// ----------------------------
// dotLottie setup
// ----------------------------
const canvas = document.getElementById("dotLottie-canvas");
const SRC = canvas.dataset.src;

const player = new DotLottie({
  canvas,
  src: SRC,
  autoplay: true,
  loop: true,
  renderConfig: { autoResize: true },
});

// ----------------------------
// UI
// ----------------------------
const ui = document.createElement("div");
ui.style.display = "grid";
ui.style.gap = "10px";
ui.style.marginBottom = "12px";
ui.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, Arial";
ui.style.color = "#fff";
ui.style.width = "320px";

const row = document.createElement("div");
row.style.display = "grid";
row.style.gridTemplateColumns = "1fr auto";
row.style.gap = "10px";
row.style.alignItems = "center";

const select = document.createElement("select");
select.style.padding = "8px 10px";
select.style.borderRadius = "10px";
select.style.border = "1px solid rgba(255,255,255,0.2)";
select.style.background = "rgba(255,255,255,0.08)";
select.style.color = "#fff";
select.style.outline = "none";

CITIES.forEach((c, idx) => {
  const opt = document.createElement("option");
  opt.value = String(idx);
  opt.textContent = c.name;
  select.appendChild(opt);
});

const refreshBtn = document.createElement("button");
refreshBtn.textContent = "Refresh";
refreshBtn.style.padding = "8px 12px";
refreshBtn.style.borderRadius = "10px";
refreshBtn.style.border = "1px solid rgba(255,255,255,0.2)";
refreshBtn.style.background = "rgba(255,255,255,0.10)";
refreshBtn.style.color = "#fff";
refreshBtn.style.cursor = "pointer";

const status = document.createElement("div");
status.style.fontSize = "12px";
status.style.opacity = "0.85";
status.textContent = "—";

row.appendChild(select);
row.appendChild(refreshBtn);
ui.appendChild(row);
ui.appendChild(status);

// Insert UI above the canvas
canvas.parentNode.insertBefore(ui, canvas);

// ----------------------------
// Theme picking (random embedded theme each city update)
// ----------------------------
function pickRandomThemeId() {
  const themes = player?.manifest?.themes || [];
  if (!themes.length) return null;
  const t = themes[Math.floor(Math.random() * themes.length)];
  return t?.id || null;
}

function applyRandomTheme() {
  const themeId = pickRandomThemeId();
  if (!themeId) return;

  // dotlottie-web has varied theme APIs across versions;
  // try the common ones.
  if (typeof player.setTheme === "function") player.setTheme(themeId);
  else if (typeof player.loadTheme === "function") player.loadTheme(themeId);
  else if (typeof player.setThemeId === "function") player.setThemeId(themeId);
}

// ----------------------------
// Token writers
// ----------------------------
function setText(token, text) {
  player.setTextSlot(token, { t: String(text) }); // partial update: only change content
}

function showOnlyIcon(tokenToShow) {
  for (const t of ICON_TOKENS) {
    player.setScalarSlot(t, t === tokenToShow ? 100 : 0);
  }
}

function fmtTempC(v) {
  // keep it clean for UI: 14°C / 23°C etc.
  const n = Math.round(Number(v));
  return `${n}°C`;
}

// ----------------------------
// Open-Meteo fetch
// ----------------------------
async function fetchWeather({ lat, lon }) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    `&current=temperature_2m,weather_code,is_day` +
    `&timezone=auto`;

  const res = await fetch(url);
  const json = await res.json();

  const cur = json.current || {};
  return {
    temperature: cur.temperature_2m,
    code: cur.weather_code,
    isDay: Boolean(cur.is_day),
    time: cur.time,
    tz: json.timezone,
  };
}

// ----------------------------
// Main update flow
// ----------------------------
let selectedIndex = 0;

async function updateForCity(index) {
  selectedIndex = index;
  const city = CITIES[index];

  applyRandomTheme();
  setText(TOKENS.city, city.name);
  status.textContent = `Loading ${city.name}…`;

  const w = await fetchWeather(city);

  setText(TOKENS.temperature, fmtTempC(w.temperature));
  setText(TOKENS.atmosphere, codeToAtmosphere(w.code));

  showOnlyIcon(codeToIcon(w.code, w.isDay));

  status.textContent = `Updated: ${w.time || "—"} (${w.tz || "—"})`;
}

// ----------------------------
// UI events + auto refresh
// ----------------------------
select.value = "0";
select.addEventListener("change", () => updateForCity(Number(select.value)));
refreshBtn.addEventListener("click", () => updateForCity(selectedIndex));

// First paint: start at Taipei (index 0)
player.addEventListener("load", () => {
  updateForCity(0);
  // Optional: refresh every 10 minutes
  setInterval(() => updateForCity(selectedIndex), 10 * 60 * 1000);
});

```

Pasting that into the JS panel in Codepen (after adding my Asset CDN link to the HTLM) resulted in the working demo at the top of the article.

<img src="https://assets.docs.lottiefiles.com/static/c9969aea3f-640.webp" srcSet="https://assets.docs.lottiefiles.com/static/c9969aea3f-640.webp 640w, https://assets.docs.lottiefiles.com/static/c9969aea3f-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/c9969aea3f-1920.webp 1920w" alt="Working weather widget demo in CodePen" width="1921" height="1443" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAmklEQVR4nCWOsQ6CMAAFu0NjOyhQC0hpAyWABvUbdHHU//+TM9XhlpeXywnnesrKcLQtlbHsDyWd61nXK3G+IJq2J+H8gA8jdeOYpoXrdiPGBZGGxKkLtCePbRxjnNm2+/+Q1Im66agqS1Ec6X1gWVZ8GBBK7dBaI7OM4TIRzhGZ5WitUEohUmBRGvI85/l683h9kFJijP3FfwGTmkJH3+efDgAAAABJRU5ErkJggg==" />

This prompt actually worked on the first try. Sometimes it takes a few tries, but if your prompt is descriptive and your file is constructed well, then it should be able to get you pretty far.
