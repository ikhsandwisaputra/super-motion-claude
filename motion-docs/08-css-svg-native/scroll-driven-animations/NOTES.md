---
tool: CSS Scroll-driven Animations (scroll()/view() timelines) + scroll-triggered animations + scroll-state queries
version: "Scroll-driven: Chrome/Edge 115 (timeline-scope 116), Safari 26, Firefox 159 (BCD: rilis 2026-10-27, masih ditandai 'beta' di data 2026-10-28) → Baseline newly available begitu FF 159 stabil (web-features masih 'false' per 2026-10-28). Scroll-TRIGGERED (`timeline-trigger`, `animation-trigger`, `trigger-scope`, `AnimationTrigger`): Chrome 146 saja (blog Chrome Des 2025 menyebut 145; BCD = 146). Scroll-state container queries: Chrome 133 (stuck/snapped/scrollable), `scrolled` Chrome 144; FF/Safari ✗. Polyfill flackr/scroll-timeline 1.1.0 (push terakhir 2024-08-26)."
official: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations · https://developer.chrome.com/docs/css-ui/scroll-driven-animations · https://scroll-driven-animations.style/
local: ../../_shared/mdn-content/files/en-us/web/css/guides/scroll-driven_animations/ · web/ · web/site-raw/ · repo-scroll-timeline-polyfill/
fetched: 2026-10-28
---
# CSS Scroll-driven Animations — animasi yang progress-nya = posisi scroll, bisa jalan di luar main thread

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk efek yang progresnya *harus identik* dengan posisi scroll: progress bar, reveal/clip saat masuk
  viewport, parallax per layer, section horizontal ter-pin, stacking cards, cover-flow, header menyusut, scroll
  shadow. Kalau properti yang dianimasikan compositor-friendly (transform/opacity), animasi tetap mulus walau
  main thread sibuk (case study Chrome).
- **Jangan / pakai yang lain** bila butuh: animasi *berbasis waktu* yang dipicu posisi (masuk → main 0.6 s) →
  scroll-**triggered** (Chrome 146 saja) atau IntersectionObserver/GSAP ScrollTrigger; pin + snapping + callback
  kompleks lintas browser → GSAP ScrollTrigger (`../../03-choreography/gsap`); inersia/velocity → Lenis
  (`../../01-scroll-transitions/lenis`). Mengubah atribut SVG (startOffset, filter primitive) → JS.
- Lenis tetap kompatibel: ia menggulir posisi scroll native, jadi `scroll()`/`view()` ikut posisi hasil smoothing.

## Mental model (yang memengaruhi FEEL & performa)
- **Dua timeline**: *Scroll Progress* `scroll(<scroller> <axis>)` (scroller `nearest`|`root`|`self`, axis
  `block`|`inline`|`x`|`y`, default `nearest block`) dan *View Progress* `view(<axis> <inset>)` (seberapa jauh
  subject melintasi scrollport). Versi bernama: `scroll-timeline: --x inline` / `view-timeline: --y block` lalu
  `animation-timeline: --x`.
- **Range** (`animation-range`, `animation-range-start/end`): nama `cover` (default), `contain`, `entry`, `exit`,
  `entry-crossing`, `exit-crossing` + offset % atau panjang. JS: `rangeStart: 'entry 25%'`. Keyframe selector
  boleh memakai nama range (demo polyfill "named-timeline-range-keyframe-selectors").
- **Durasi**: `animation-duration: auto` = mengisi seluruh timeline (MDN). Catatan MDN: "Firefox requires an
  animation-duration to be set" → sarankan `1ms` untuk aman lintas browser.
- **Shorthand mereset banyak hal**: `animation` meng-reset `animation-timeline` ke `auto` DAN (reset-only, MDN
  `animation`) `animation-range-start/end`, `animation-composition`, `animation-trigger`, `animation-delay-end`
  → selalu tulis properti-properti itu SETELAH shorthand `animation`.
- **fill-mode**: pakai `both` pada view timeline agar state from/to tertahan di luar range.
- **Lingkup nama**: timeline bernama terlihat untuk turunan; untuk sibling pakai `timeline-scope: --x` di ancestor
  bersama (hoisting). `timeline-scope: all` dihapus di Chrome 139 (BCD 116–138) tapi ada di FF 159/Safari 26 →
  jangan pakai `all`.
- **Compositor**: scroll-driven animation "run off the main thread" untuk properti yang memang bisa
  di-composite; properti lain (warna, ukuran, custom property, clip-path [UNVERIFIED]) tetap main-thread tapi
  sinkron dengan scroll. Bukti: case study — versi CSS tidak terganggu loop JS berat, versi `scroll` event macet.
- **Scroll-triggered** (Chrome 146): `timeline-trigger: --t view() <activation-range> [/ <active-range>]` pada
  pemicu, `animation-trigger: --t <aksi-aktif> [<aksi-nonaktif>]` pada elemen beranimasi. Aksi: `none`, `play`,
  `play-forwards`, `play-backwards`, `play-once`, `pause`, `replay`, `reset`. Nama trigger global ("last match
  wins") → `trigger-scope: --t` bila satu rule menghasilkan banyak trigger.
- **Scroll-state queries** (Chrome 133+): `container-type: scroll-state` lalu
  `@container scroll-state(stuck: top)` / `(snapped: x)` / `(scrollable: top)` / `(scrolled: block-end)` (144).

## Setup minimal (API terverifikasi)
```css
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
#progress {
  transform-origin: 0 50%;
  animation: grow auto linear forwards;      /* shorthand dulu… */
  animation-timeline: scroll(root block);    /* …timeline sesudahnya */
}
@keyframes reveal { from { opacity: 0; clip-path: inset(45% 20% 45% 20%); } to { opacity: 1; clip-path: inset(0); } }
.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 25% cover 50%;
}
@supports not (animation-timeline: view()) { .reveal { opacity: 1; } }   /* fallback statis */
```
```js
// WAAPI: tanpa duration; timeline + range
el.animate({ opacity: [0, 1], transform: ['translateY(40px)', 'none'] }, {
  fill: 'both',
  timeline: new ViewTimeline({ subject: el, axis: 'block' }),
  rangeStart: 'entry 25%', rangeEnd: 'cover 50%',
});
const tl = new ScrollTimeline({ source: document.documentElement, axis: 'block' });
// cleanup: animation.cancel()
```

## Knob yang menentukan rasa gerak
| Knob | Efek ke feel | Saran |
|---|---|---|
| `animation-range` | kapan & seberapa "padat" gerak terjadi | reveal: `entry 10% cover 40%`; parallax: `cover` penuh |
| `animation-timing-function` | `linear` = 1:1 dengan jari (jujur); ease = terasa "berbobot" tapi lag dari scroll | progress bar linear; reveal `cubic-bezier(.2,.8,.2,1)` |
| `view-timeline-inset` / `view(block 20% 10%)` | menggeser zona deteksi | inset positif = mulai lebih telat |
| Panjang pin (tinggi section) | rasio jarak scroll : gerak | 300–500vh untuk horizontal 250vmax |
| Smooth scroll (Lenis) | memberi inersia ke animasi linear | kombinasi paling "mahal" rasanya |
| Trigger aksi | `play-forwards play-backwards` = reversible; `play-once` = sekali | `play-once pause` untuk konten panjang |

## Integrasi
- **Lenis**: aktifkan seperti biasa; tidak perlu wiring — timeline membaca posisi scroll native.
- **GSAP**: untuk pin/sequence kompleks tetap ScrollTrigger; scroll-driven CSS cocok untuk efek "ambient" kecil
  agar JS bundle & main thread ringan. Jangan menganimasikan properti yang sama dari keduanya.
- **View Transitions** (`../../01-scroll-transitions/view-transitions`): independen; reveal ulang setelah navigasi otomatis.
- **Debug**: tools di `web/site-raw/tools__view-timeline__ranges.html` (visualizer range) + ekstensi DevTools
  "Scroll-Driven Animations Debugger" (Bramus) yang ditautkan situs resmi.

## Resep non-generik (diambil/diadaptasi dari demo resmi scroll-driven-animations.style)
**1. Section horizontal ter-pin tanpa JS** (`web/site-raw/demos__horizontal-section__css.html`)
```css
@keyframes move { to { transform: translateX(calc(-100% + 100vw)); } }
#sectionPin { height: 500vh; overflow: visible; view-timeline-name: --pin; view-timeline-axis: block; }
.pin-wrap-sticky { position: sticky; top: 0; height: 100vh; width: 100vw; overflow-x: hidden; }
.pin-wrap { width: 250vmax; height: 100vh; will-change: transform;
  animation: linear move forwards; animation-timeline: --pin; animation-range: contain 0% contain 100%; }
```
Kenapa mahal: range `contain` = gerak hanya saat section menutupi viewport penuh → pin terasa "terkunci" presisi.

**2. Stacking cards** (`demos__stacking-cards__css.html`)
```css
#cards { --numcards: 4; view-timeline-name: --cards; }
.card { --index0: calc(var(--index) - 1); --reverse-index: calc(var(--numcards) - var(--index0)); }
@keyframes scale { to { transform: scale(calc(1.1 - calc(0.1 * var(--reverse-index)))); } }
.card__content {
  --start-range: calc(var(--index0) / var(--numcards) * 100%);
  --end-range: calc(var(--index) / var(--numcards) * 100%);
  animation: linear scale forwards; animation-timeline: --cards;
  animation-range: exit-crossing var(--start-range) exit-crossing var(--end-range);
}
```
(`--index` di-inline per kartu; di 2026 bisa diganti `sibling-index()` di Chrome 138/FF 154/Safari 26.2.)

**3. Parallax berlapis dengan satu keyframe**
```css
@keyframes drift { from { translate: 0 calc(var(--depth) * 12vh); } to { translate: 0 calc(var(--depth) * -12vh); } }
.layer { animation: drift linear both; animation-timeline: view(); animation-range: cover; }
.layer.bg { --depth: .3 } .layer.mid { --depth: .7 } .layer.fg { --depth: 1.2 }
```
Kenapa mahal: kedalaman berbeda per layer dari satu sumber kebenaran, tanpa scroll listener.

**4. Indikator di luar scroller (timeline-scope / hoisting)**
```css
.gallery { timeline-scope: --g; }
.gallery .track { overflow-x: scroll; scroll-timeline: --g inline; }
.gallery .dots::after { animation: grow linear both; animation-timeline: --g; transform-origin: 0 50%; }
```

**5. Scroll-triggered (Chrome 146) dengan fallback IntersectionObserver** (pola dari blog Chrome)
```css
.card {
  timeline-trigger: --t view() contain 15% contain 85% / entry 100% exit 0%;
  trigger-scope: --t;
  animation: unclip .5s ease-in-out both;
  animation-trigger: --t play-forwards play-backwards;
}
```
```js
if (!CSS.supports('timeline-trigger-source', 'view()')) {
  new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)),
    { threshold: 0.15 }).observe(document.querySelector('.card'));
}
```
(Deteksi `@supports not (timeline-trigger-source: view())` dipakai di contoh MDN.)

**6. Header lengket yang berubah saat "stuck" (Chrome 133+, progressive)**
```css
.site-header { position: sticky; top: 0; container-type: scroll-state; container-name: hdr; }
@container hdr scroll-state(stuck: top) { .site-header > .inner { box-shadow: 0 6px 24px #0003; scale: .98; } }
```

## Performa, aksesibilitas, mobile & dukungan browser
- Animasikan transform/opacity untuk jalur compositor; hindari width/height/top/left di timeline (layout per frame).
  `will-change: transform` hanya pada elemen pin besar (dipakai demo resmi), bukan massal.
- `prefers-reduced-motion: reduce` → `animation: none` atau ganti dengan state akhir; parallax & horizontal pin
  adalah pemicu vestibular klasik (MDN prefers-reduced-motion).
- iOS/Safari 26 mendukung; di browser tanpa dukungan, `@supports` fallback statis lebih aman daripada polyfill.
- **Polyfill** flackr: JS (main thread), CSS harus satu origin atau inline ("polyfill might not be able to fetch"
  stylesheet lintas origin), terakhir diperbarui 2024 → hanya untuk audiens lama; tidak mengembalikan
  keuntungan off-main-thread.
- Dukungan rinci (BCD/web-features 2026-10-28): `animation-timeline`, `scroll-timeline`, `view-timeline`,
  `animation-range`, `ScrollTimeline`/`ViewTimeline` → Chrome 115 / Safari 26 / FF 159; `timeline-scope` Chrome 116;
  scroll-triggered Chrome 146 (FF/Safari ✗); `container-type: scroll-state` Chrome 133 (`scrolled` 144).

## Sumber lokal
- `../../_shared/mdn-content/files/en-us/web/css/guides/scroll-driven_animations/index.md` + `../../_shared/mdn-content/files/en-us/web/css/guides/scroll-driven_animations/{timelines,timeline_range_names,timeline_insets}/index.md` — konsep & range lengkap dengan diagram.
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/{animation-timeline,animation-range*,scroll-timeline*,view-timeline*,timeline-scope,animation-trigger}/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/guides/animation_triggers/{index,using_scroll-triggered_animations/index}.md` — trigger & aksi.
- `../../_shared/mdn-content/files/en-us/web/css/guides/conditional_rules/container_scroll-state_queries/index.md`
- `../../_shared/mdn-content/files/en-us/web/api/{scrolltimeline,viewtimeline}/` — API JS.
- `web/chrome-scroll-driven-animations.md` — artikel utama Chrome (scroll()/view(), JS, timeline-scope, range).
- `web/chrome-scroll-animation-performance-case-study.md` — main thread vs CSS.
- `web/chrome-scroll-triggered-animations.md` · `web/chrome-css-scroll-state-queries.md`
- `web/site-index.md` + `web/site-raw/*.html` — 25 demo (CSS & WAAPI) + 4 tool dari scroll-driven-animations.style (source repo situs tidak ditemukan publik).
- `repo-scroll-timeline-polyfill/README.md` + `repo-scroll-timeline-polyfill/src/` + `repo-scroll-timeline-polyfill/demo/` — polyfill & contoh.
- `../_compat/repo-web-features/features/{scroll-driven-animations,scroll-triggered-animations,container-scroll-state-queries}.yml.dist`
