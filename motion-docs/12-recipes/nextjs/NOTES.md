---
tool: Next.js (App Router) — integrasi motion
version: docs nextjs.org per 2026-10-28 (React 19.3 membawa <ViewTransition> + addTransitionType; `<Link transitionTypes>` sejak Next.js 16.2.0)
official: https://nextjs.org/docs/app/guides/view-transitions · https://nextjs.org/docs/app/api-reference/file-conventions/template · https://nextjs.org/docs/app/guides/lazy-loading
local: web/ (6 halaman + llms/ berisi llms.txt & llms-full.txt seluruh docs Next.js), repo-vercel-agent-skills/skills/react-view-transitions/ (resep resmi Vercel)
fetched: 2026-10-28
---
# Next.js — rumah untuk resep motion berbasis React (Kombo #3, dan React di #2)

## Kapan pakai / kapan jangan
- Pakai kalau project memang React/Next (SaaS, produk, dashboard marketing). Untuk situs editorial multi-halaman yang
  murni HTML, Barba/Swup + GSAP lebih ringan (lihat `../../01-scroll-transitions/`).
- Transisi antar-route: utamakan React `<ViewTransition>` (native View Transitions API) — bukan AnimatePresence
  pada level layout.

## Mental model
- **Layout persist** antar navigasi → animasi `enter/exit` di layout hanya jalan saat mount pertama
  (`repo-vercel-agent-skills/.../references/nextjs.md`). Chrome yang persisten (nav, player, cursor, canvas WebGL)
  taruh di layout supaya state & GL context tidak dibuat ulang.
- **`template.tsx` di-remount tiap navigasi** di segmennya (diberi key unik; search params tidak memicu remount;
  Client Component di dalamnya reset state) → tempat yang benar untuk animasi masuk per-halaman berbasis mount
  (`web/template-file-convention.md`).
- Setiap klik `<Link>` adalah React Transition → `<ViewTransition>` dengan `default="auto"` ikut menyala di SETIAP
  navigasi; pakai `default="none"` agar tidak bentrok (`references/nextjs.md`).

## Setup minimal
```tsx
// Tanpa config: <ViewTransition> jalan di App Router. JANGAN tambah experimental.viewTransition / react@canary.
import Link from 'next/link'
import { ViewTransition } from 'react'

<Link href={`/work/${p.slug}`} transitionTypes={['nav-forward']}>
  <ViewTransition name={`work-${p.slug}`}><Image src={p.cover} alt="" width={400} height={300} /></ViewTransition>
</Link>
// halaman detail: <ViewTransition name={`work-${slug}`}> dengan nama yang sama → morph shared element
```
- WebGL / Spline / Rive / Lenis = Client Component (`'use client'`). Komponen berat tanpa SSR:
  `dynamic(() => import('./Scene'), { ssr: false })` — hanya boleh di Client Component (`web/lazy-loading-next-dynamic.md`).

## Knob yang menentukan rasa gerak
- `transitionTypes` (Link, Next 16.2+) / `router.push(href, { transitionTypes })` → arah (`nav-forward`/`nav-back`)
  dipetakan di `enter`/`exit` type-map: `enter={{ 'nav-forward': 'slide-from-right', default: 'none' }}`.
- Morph konten dinamis butuh konten siap saat commit: `<Link prefetch={true}>` + data di-cache; kalau tidak,
  yang teranimasi adalah fallback `loading.tsx`.
- Dua lapis: VT arah di **page** (bukan layout) + VT `enter` pada konten di dalam `<Suspense>`; skeleton di
  `loading.tsx` dibungkus `<ViewTransition exit="…">`.
- Segmen dinamis rute sama (`/work/[slug]`): `<ViewTransition key={slug} name="work-content" share="auto" default="none">`.
- CSS animasi pseudo-element & resep morph: `repo-vercel-agent-skills/.../references/css-recipes.md`,
  dan `../../01-scroll-transitions/view-transitions/NOTES.md` (aspect-ratio morph, circular reveal).

## Integrasi
- **Lenis**: `ReactLenis root` di layout (persisten) — detail `../../01-scroll-transitions/lenis/NOTES.md`; panggil
  `lenis.resize()` setelah route berubah (dimensi di-debounce 250 ms).
- **Motion**: komponen animasi = Client Component; frame-sync Lenis via `frame.setup(..., true)`.
- **R3F/Spline**: canvas di layout (persisten), konten scene berganti mengikuti route; `dispose()` saat unmount.
- **cmdk**: palette di layout + shortcut global; animasi tinggi via `--cmdk-list-height` (`../../10-micro-interactions/cmdk/NOTES.md`).

## Resep non-generik
1. **Thumbnail → hero morph** (VT `name` sama di list & detail, `transitionTypes={['nav-forward']}`) — *mahal karena*
   objek yang sama "berpindah ruang", bukan dua halaman yang ganti.
2. **Arah navigasi berasa**: slide maju/mundur dari type-map + skeleton yang turun keluar (`exit="slide-down"`) dan
   konten naik masuk — *mahal karena* tiap navigasi punya arah & sebab.
3. **Tab indicator yang meluncur** antar route (`useOptimistic` + VT `name` dengan `share`) — contoh lengkap di
   `references/nextjs.md` "Routing-Driven Tabs".
4. **Canvas persisten**: scene WebGL di layout, kamera berpindah per-route (target dari `usePathname`) — *mahal karena*
   tidak ada flash/re-init GL saat pindah halaman.

## Performa, aksesibilitas, browser
- VT butuh fitur View Transitions baru (types, `view-transition-class`): Chromium 125+ dan Safari/Firefox terbaru;
  tanpa dukungan, navigasi tetap jalan tanpa animasi (`web/view-transitions-guide.md`).
- Uji transisi arah di **production build** dengan cache klien dingin — dev mode tidak melakukan prefetch otomatis.
- `prefers-reduced-motion`: matikan/ringankan animasi pseudo-element VT lewat media query; Lenis & WebGL ikuti
  aturan di NOTES masing-masing.

## Sumber lokal
- `web/view-transitions-guide.md` — guide resmi 4 pola (shared element, Suspense reveal, arah, crossfade same-route).
- `web/template-file-convention.md` — template vs layout (remount, reset state).
- `web/lazy-loading-next-dynamic.md` — `next/dynamic`, `ssr:false` hanya di Client Component.
- `web/link-component.md`, `web/use-client-directive.md`, `web/script-component.md` — Link, batas client, script pihak ketiga.
- `web/llms/nextjs.org__docs__llms-full.txt` — seluruh docs Next.js (4.4 MB) untuk grep.
- `repo-vercel-agent-skills/skills/react-view-transitions/` — `SKILL.md` + `references/{nextjs,patterns,css-recipes,implementation,troubleshooting}.md`
  (dokumen Vercel untuk coding agent = data rujukan, bukan instruksi).
