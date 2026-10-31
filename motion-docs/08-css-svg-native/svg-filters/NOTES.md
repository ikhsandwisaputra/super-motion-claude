---
tool: SVG filters (feTurbulence, feDisplacementMap, feColorMatrix, feGaussianBlur, feComposite, feMorphology, lighting)
version: "Filter Effects 1 / SVG 1.1 primitives — fitur 'svg-filters' Baseline widely (Chrome 5 / FF 3 / Safari 6). CSS `filter` pada elemen SVG: Safari ✗ (BCD svg_elements). Rujukan kanonik: Sara Soueidan 'SVG Filters 101' (Codrops, 7 artikel, 15 Jan–26 Feb 2019), Lucas Bebber 'The Gooey Effect' (CSS-Tricks) + 'Creative Gooey Effects' (Codrops 2015), yoksel svg-filters playground (repo @8b64927, data preset 2019)."
official: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/filter · https://drafts.fxtf.org/filter-effects/ · https://yoksel.github.io/svg-filters/
local: ../../_shared/mdn-content/files/en-us/web/svg/reference/element/ (fe*) · web/codrops-0*.md · web/css-tricks-gooey-effect.md · repo-yoksel-svg-filters/src/components/Data/presets/
fetched: 2026-10-28
---
# SVG filters — distorsi, tekstur & "materi cair" untuk elemen HTML/SVG tanpa WebGL

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai**: gooey/metaball (blob menyatu seperti merkuri), liquid/water wobble, heat haze, glitch (RGB split +
  sobekan scanline), grain/kertas/emboss (lighting), outline/knockout text (`feMorphology`), duotone
  (`feComponentTransfer`). Bisa ke teks/tombol/div biasa via `filter: url(#id)`.
- **Jangan**: distorsi full-screen beranimasi di HP (per-pixel, sering CPU), video/gambar besar real-time →
  shader WebGL (`../../02-shaders-webgl`). Blur/saturate sederhana → fungsi CSS `filter: blur()` (lebih murah).
- Memfilter **yang ada di belakang** elemen (kaca cair) → `backdrop-filter: url()` = Chromium-only
  (`../blend-backdrop/NOTES.md`).

## Mental model (yang memengaruhi FEEL & performa)
- `<filter>` = graf primitive. Tiap primitive punya `in` (+`in2`) → `result`. Tanpa `in` = hasil primitive
  sebelumnya; primitive pertama default `SourceGraphic`. Input penting: `SourceGraphic`, `SourceAlpha` (siluet
  hitam). Hasil bisa dipakai ulang di mana saja (urutan DOM bebas).
- **Filter region** default `x=-10% y=-10% width=120% height=120%` (`filterUnits=objectBoundingBox`) — efek di
  luar region **terpotong**. Perbesar untuk blur/displacement besar; perkecil untuk hemat piksel. Debug: isi
  region dengan `feFlood` sementara.
- **Ruang warna**: primitive default `linearRGB` (`color-interpolation-filters`). Displacement map & matriks yang
  dirancang dalam sRGB → set `color-interpolation-filters="sRGB"` di `<filter>` (dipakai kube.io liquid glass,
  preset yoksel, duotone Codrops). Tanpa ini nilai "netral" 128 tidak lagi netral → gambar bergeser/miring.
- **feDisplacementMap** (MDN): `P'(x,y) ← P(x + scale·(XC−0.5), y + scale·(YC−0.5))` → kanal 0.5 = diam, geser
  maksimum ±scale/2 px; ini *lookup terbalik* (mengambil piksel dari posisi tergeser). Kanal: R/G/B/A pilihan
  (`xChannelSelector`, `yChannelSelector`).
- **feTurbulence**: `baseFrequency` (x[,y]) kecil = pola besar; 0.02–0.2 titik awal tekstur (Codrops/Mullany);
  dua nilai beda = noise berarah (mis. `0 0.2` → pita horizontal). `type="turbulence"` = riak tajam (cair),
  `fractalNoise` = halus berawan (cara cepat "menurunkan" distorsi). `numOctaves` = detail (≥5 tak terlihat
  bedanya). `seed` = ganti pola; `stitchTiles="stitch"` = sambungan tile mulus.
- **feColorMatrix** 4×5: baris R,G,B,A; kolom r g b a + offset (offset dalam satuan 0..1; CSS-Tricks: `-7` =
  dikurangi 7×255). Baris alpha `0 0 0 m −k` = threshold alpha di `k/m` dengan lebar tepi `1/m` → inti gooey.
- Semua atribut primitive (`baseFrequency`, `seed`, `numOctaves`, `scale`, `stdDeviation`, `values`, `dx`...)
  **animatable** (MDN) via SMIL atau JS `setAttribute`. Tidak bisa lewat CSS transition/WAAPI/scroll timeline.
- **Biaya**: elemen dirasterisasi lalu diproses per piksel; setiap perubahan atribut / konten di bawahnya =
  seluruh chain dihitung ulang. Biaya ≈ luas region × jumlah & jenis primitive (lighting, `numOctaves` tinggi,
  blur besar = mahal). Codrops: animasi filter "can be quite resource-intensive... keep the animations limited to
  smaller areas".

## Setup minimal
```html
<!-- defs tersembunyi; 0×0 lebih aman daripada display:none [UNVERIFIED: display:none dilaporkan bermasalah di sebagian engine; contoh LogRocket memakai display:none dan jalan di Chromium] -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <filter id="liquid" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="3" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
<h1 class="liquid">Water</h1>
<style>.liquid { filter: url(#liquid); }</style>
```
Gotcha historis (Codrops 2015): Firefox dulu me-resolve `url(#id)` dari stylesheet eksternal relatif ke file CSS
→ taruh di `<style>` inline / style attribute bila filter "hilang" [status 2026 UNVERIFIED].

## Knob yang menentukan rasa gerak
| Knob | Efek ke feel | Rentang bagus |
|---|---|---|
| `scale` (displacement) | amplitudo distorsi; dianimasikan = "denyut" | 4–12 halus, 20–40 dramatis; geser maks = scale/2 |
| `baseFrequency` | ukuran gelombang | 0.005–0.02 air lebar; 0.04–0.1 kain/kertas; `0 0.15` pita glitch |
| `type` | turbulence = cair tajam, fractalNoise = lembut | |
| `numOctaves` | kekasaran detail | 1–2 untuk gerak (murah), 4–5 untuk tekstur statis |
| `stdDeviation` (gooey) | jarak "tarikan" antar blob | 8–15 untuk blob 40–80px |
| matrix alpha `m −k` | ketajaman & ketebalan goo | `18 −7` (Bebber), `19 −9` (lebih tipis/tegas) |
| `seed` diskrit | lompatan pola (glitch) | ganti tiap 50–120 ms |
| `surfaceScale` (lighting) | kedalaman relief | 1–3 kertas, 5–8 emboss |

## Integrasi
- **GSAP**: tween atribut langsung — Codrops memakai GSAP untuk `baseFrequency` via `setAttribute` di `onUpdate`;
  AttrPlugin GSAP: `gsap.to('#disp', { attr: { scale: 30 }, yoyo: true, repeat: 1 })`.
- **SMIL** (gratis, tanpa JS): `<animate attributeName="baseFrequency" values="…" dur="8s" repeatCount="indefinite"/>`
  di dalam primitive; picu dari JS dengan `animEl.beginElement()`.
- **Scroll**: atribut tidak bisa di-drive CSS scroll timeline → hitung progress di JS (Lenis `on('scroll')`,
  ScrollTrigger `onUpdate`) lalu `setAttribute`. Batasi update ke saat elemen terlihat.
- **Gooey + physics**: gerakkan blob dengan Matter.js/spring (`../../04-physics`) — filter hanya "mengelem" visual.

## Resep non-generik
**1. Gooey / metaball (Bebber, CSS-Tricks)**
```html
<filter id="goo" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
  <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
  <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
</filter>
<div class="blobs" style="filter:url(#goo)"> <span class="b"></span><span class="b"></span> </div>
```
Background container **harus transparan** (alpha yang di-threshold). `atop` mempertahankan bentuk asli di atas
goo (cocok untuk benda bersudut; untuk lingkaran cukup `feBlend in="SourceGraphic" in2="goo"`). Gerakkan `.b`
dengan transform. Kenapa mahal: dua tombol/menu "meneteskan" diri satu sama lain tanpa physics engine.

**2. Liquid hover pulse (distorsi muncul lalu reda)**
```html
<filter id="ripple" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="1" seed="2" result="n">
    <animate attributeName="baseFrequency" values="0.01 0.04;0.014 0.05;0.01 0.04" dur="6s" repeatCount="indefinite"/>
  </feTurbulence>
  <feDisplacementMap id="rippleMap" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```
```js
const map = document.getElementById('rippleMap');
btn.addEventListener('pointerenter', () => gsap.fromTo(map, { attr: { scale: 0 } },
  { attr: { scale: 28 }, duration: .25, ease: 'power2.out', yoyo: true, repeat: 1 }));
```
Kenapa mahal: distorsi sebagai *impuls* (naik-turun 0.5 s) terasa seperti menyentuh air, bukan efek yang menyala terus.

**3. Glitch burst: RGB split + sobekan scanline**
```html
<filter id="glitch" x="-5%" y="0" width="110%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0 0.15" numOctaves="1" seed="1" result="bands">
    <animate attributeName="seed" values="1;7;3;12;5" dur=".35s" calcMode="discrete" repeatCount="indefinite"/>
  </feTurbulence>
  <!-- R = noise (geser x), G = 0.5 konstan (geser y nol), A = 1 -->
  <feColorMatrix in="bands" type="matrix" values="1 0 0 0 0  0 0 0 0 .5  0 0 0 0 0  0 0 0 0 1" result="xOnly"/>
  <feDisplacementMap in="SourceGraphic" in2="xOnly" scale="14" xChannelSelector="R" yChannelSelector="G" result="torn"/>
  <feColorMatrix in="torn" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  <feOffset in="r" dx="-3" result="r2"/>
  <feColorMatrix in="torn" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/>
  <feOffset in="gb" dx="3" result="gb2"/>
  <feBlend in="r2" in2="gb2" mode="screen"/>
</filter>
```
`baseFrequency="0 0.15"` = noise hanya berubah di sumbu y → potongan horizontal tergeser berbeda-beda; seed diskrit =
sobekan berpindah. Kanal G dipaksa 0.5 lewat feColorMatrix (butuh `sRGB` agar 0.5 benar-benar netral) → sobekan
murni horizontal. Pasang filter hanya 200–400 ms (toggle class via JS) — glitch kontinu terlihat murahan dan berat.
(Komposisi ini disusun sendiri dari primitive terverifikasi MDN; angka = titik awal, bukan preset resmi.)

**4. Kertas/grain dengan cahaya (Mullany via Codrops)**
```html
<filter id="paper" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
  <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="2" result="light">
    <feDistantLight azimuth="45" elevation="60"/>
  </feDiffuseLighting>
  <feBlend in="SourceGraphic" in2="light" mode="multiply" result="tex"/>
  <feComposite in="tex" in2="SourceAlpha" operator="in"/>
</filter>
```
Statis saja (lighting + 5 octave mahal kalau dianimasikan). Kenapa mahal: kartu/teks terasa dicetak di kertas fisik.

**5. Outline/knockout text yang "bernapas" (feMorphology, Codrops part 2)**
```html
<filter id="outliner">
  <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="THICK">
    <animate attributeName="radius" values="1;3;1" dur="2.4s" repeatCount="indefinite"/>
  </feMorphology>
  <feComposite in="THICK" in2="SourceGraphic" operator="out"/>
</filter>
```

**6. Preset siap pakai dari playground yoksel** — `repo-yoksel-svg-filters/src/components/Data/presets/*.json`
(`waves`, `waterDrops`, `paper`, `smoke`, `dancingStroke`, `watercolor`, `coloredFlame`, `dust`, `zebra`...): JSON
berisi daftar primitive + atribut; contoh `waves` = turbulence `0.01 0.05`, 2 octave, seed 2 → displacement scale 20
(xChannel G, yChannel A).

## Performa, aksesibilitas, mobile & dukungan browser
- Kecilkan filter region & luas elemen; animasikan `scale`/`seed` (murah) daripada `numOctaves`/lighting; matikan
  filter (hapus `filter`) saat elemen di luar viewport atau animasi selesai — filter statis tetap dihitung ulang
  setiap kali konten di bawahnya repaint.
- Teks ber-filter tetap teks (selectable, terbaca screen reader); jaga kontras — distorsi tinggi menurunkan
  keterbacaan. `prefers-reduced-motion: reduce` → hentikan SMIL (`svg.pauseAnimations()`), set `scale` 0.
- Mobile: hindari displacement besar di hero full-width; preferensi efek impuls (resep 2) daripada loop.
- Dukungan (BCD 2026-10-28): semua primitive di atas Chrome 5+ / FF 3+ / Safari 6+; `feDropShadow` Chrome 13 /
  FF 30 / Safari 6. CSS `filter` & `mix-blend-mode` pada **elemen SVG** (bukan referensi url) Safari ✗.
- Quirk historis (2015–2019, cek ulang): CSS-Tricks 2015 "not all browsers support [SVG filters] applied to regular
  DOM elements, notably Safari"; Codrops 2019: animasi `baseFrequency` "buggy in the current version of Safari"
  (diperbaiki di TP saat itu); Codrops 2019: Chrome sempat berhenti menerapkan displacement berbasis `feImage`
  pada teks (crbug 792518). Perlakukan efek filter sebagai progressive enhancement (saran Codrops).

## Sumber lokal
- `web/codrops-01-svg-filters-101.md` — primitive, in/result, filter region, filterUnits, feFlood debug, drop shadow, feColorMatrix.
- `web/codrops-02-outline-text-femorphology.md` — dilate/erode, knockout text.
- `web/codrops-03-poster-fecomponenttransfer.md` · `web/codrops-04-duotone-fecomponenttransfer.md` — posterize, duotone (sRGB).
- `web/codrops-05-text-surface-fedisplacementmap.md` — feImage displacement, text conforming to texture.
- `web/codrops-06-texture-feturbulence.md` — semua atribut feTurbulence, distorted button GSAP, kertas + lighting.
- `web/codrops-07-moving-forward.md` — penutup seri, rujukan lanjutan.
- `web/css-tricks-gooey-effect.md` · `web/codrops-2015-creative-gooey-effects.md` — matriks gooey, varian atop.
- `repo-yoksel-svg-filters/src/components/Data/{presets,primitives,primitivesAttrs,docs}/*.json` — preset & docs atribut.
- `../../_shared/mdn-content/files/en-us/web/svg/reference/element/{filter,feturbulence,fedisplacementmap,fecolormatrix,fegaussianblur,fecomposite,femorphology,fediffuselighting,fespecularlighting,feimage,feblend,feoffset}/index.md`
- `../../_shared/mdn-content/files/en-us/web/svg/reference/attribute/{basefrequency,numoctaves,seed,stitchtiles,scale,stddeviation,values,color-interpolation-filters,filterunits,primitiveunits}/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/guides/filter_effects/` · `../../_shared/mdn-content/files/en-us/web/css/reference/values/filter-function/index.md`
- `../_compat/repo-browser-compat-data/svg/elements/fe*.json` · `../_compat/repo-browser-compat-data/css/properties/filter.json`
