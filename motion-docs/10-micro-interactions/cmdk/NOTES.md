---
tool: cmdk (⌘K command menu / combobox React)
version: cmdk 1.1.1 (cmdk/package.json; repo HEAD dd2250e "Update README" 2025-10-28; peer react ^18 || ^19). Tidak ada rilis baru s.d. 2026-10-28.
official: https://github.com/pacocoursey/cmdk · demo https://cmdk.paco.me
local: repo-cmdk/README.md (= docs resmi), repo-cmdk/cmdk/src/index.tsx, repo-cmdk/ARCHITECTURE.md, repo-cmdk/website/styles/cmdk/*.scss (4 skin: vercel, linear, raycast, framer)
fetched: 2026-10-28
---
# cmdk — command palette tanpa gaya: filter+sort otomatis, keyboard-first; kamu yang memberi gerak lewat atribut data

## Kapan pakai / kapan jangan
- **Pakai** untuk SaaS/produk ("Futuristic SaaS" recipe arsenal) yang butuh ⌘K: navigasi, ganti tema, aksi cepat,
  nested "pages". Unstyled → bebas membuat motion sendiri. Combobox aksesibel (role listbox, aria-activedescendant).
- **Jangan** untuk >2–3 ribu item tanpa `shouldFilter={false}` + virtualisasi sendiri; bukan untuk React Native;
  bukan RSC (client component). Tidak memasang shortcut ⌘K otomatis (sengaja) — kamu yang pasang listener.

## Mental model
- Semua `Item`/`Group` **selalu dirender di React tree**; tiap item menambah/menghapus dirinya dari DOM sesuai skor
  pencarian (`command-score`). **DOM authoritative**: urutan seleksi = urutan DOM. Seleksi dilacak dengan `value`
  (stabil), bukan index.
- `Group` yang kosong tidak di-unmount, diberi atribut `hidden`. `Separator` hanya tampil saat query kosong (atau
  `alwaysRender`).
- **Tinggi list**: `List` membungkus anak dalam `[cmdk-list-sizer]`; `ResizeObserver` + rAF menulis
  `--cmdk-list-height` (px, 1 desimal) di `[cmdk-list]` → animasi tinggi via CSS transition.
- Seleksi pointer = `onPointerMove` (bukan hover enter) → `data-selected`/`aria-selected`; `disablePointerSelection`
  mematikannya. Item terpilih di-`scrollIntoView({block:'nearest'})` (heading grup ikut bila item pertama).
- `Command.Dialog` = Radix Dialog (Portal → `[cmdk-overlay]` + `[cmdk-dialog]` Content), Radix menandai
  `data-state="open|closed"`.

## Setup minimal (API terverifikasi README/src 1.1.1)
```tsx
import { Command } from 'cmdk'
const [open, setOpen] = useState(false)
useEffect(() => {
  const down = (e: KeyboardEvent) => { if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(o => !o) } }
  document.addEventListener('keydown', down); return () => document.removeEventListener('keydown', down)
}, [])
<Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu"
  overlayClassName="cmdk-overlay" contentClassName="cmdk-content" /* container={el} untuk Portal */>
  <Command.Input placeholder="Type a command…" />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Navigation">
      <Command.Item value="go-work" keywords={['projects','portfolio']} onSelect={(v) => go('/work')}>Work</Command.Item>
    </Command.Group>
    <Command.Separator />
  </Command.List>
</Command.Dialog>
```
Props `Command`: `label, value/onValueChange (item terpilih), defaultValue, filter(value, search, keywords) → skor,
shouldFilter, loop, disablePointerSelection, vimBindings (ctrl+n/j/p/k, default true)`. Item: `value, keywords,
onSelect, disabled, forceMount`. Group: `heading, forceMount`. `useCommandState(s => s.search | s.filtered.count | …)`.
Selector styling: `[cmdk-root] [cmdk-input] [cmdk-list] [cmdk-list-sizer] [cmdk-item][data-selected=true]
[data-disabled=true] [cmdk-group] [cmdk-group-heading] [cmdk-separator] [cmdk-empty] [cmdk-loading]
[cmdk-dialog] [cmdk-overlay]`.

## Knob yang menentukan rasa gerak
| Hook animasi | Cara | Catatan feel |
|---|---|---|
| Tinggi list | `[cmdk-list]{ height: min(300px, var(--cmdk-list-height)); transition: height 100ms ease }` | 100 ms (skin Linear/Raycast) — cepat, list "bernapas" saat hasil berubah; > 200 ms terasa lamban saat mengetik |
| Highlight item | skin resmi: `transition: all 150ms ease; transition-property: none;` lalu `&:active { transition-property: background }` | **highlight pindah instan** saat panah/hover (tak ada "ekor" fade), hanya tekan yang di-ease |
| Indikator item terpilih | `[data-selected=true]:after` bar 3px (Linear) | statis; untuk indikator yang **meluncur** pakai elemen terpisah yang mengikuti rect item terpilih |
| Dialog in/out | `[cmdk-dialog] [cmdk] { animation: dialogIn … }` / `&[data-state='closed'] [cmdk] { animation: dialogOut … }` (Raycast) | pakai **@keyframes animation** untuk exit (pola skin resmi); transisi biasa tidak menunda unmount Radix [UNVERIFIED: perilaku Presence Radix tidak di-mirror] |
| "Bounce" saat Enter/pindah page | Vercel skin: `ref.style.transform='scale(0.96)'` lalu reset setelah 100 ms, root punya `transition: transform 100ms ease` | umpan balik taktil tanpa library |
| Scroll edge | `[cmdk-list]{ scroll-padding-block: 8px; overscroll-behavior: contain }` | item tak menempel tepi; scroll tak bocor ke halaman (pakai juga `data-lenis-prevent` bila ada Lenis) |
| Scroll saat navigasi panah | `[cmdk-list]{ scroll-behavior: smooth }` | cmdk memanggil `scrollIntoView({block:'nearest'})` tanpa `behavior` → ikut CSS `scroll-behavior`; matikan di reduced motion |

## Integrasi
- **Lenis**: tambahkan `data-lenis-prevent` di `[cmdk-list]` (atau `lenis.stop()` saat open) supaya wheel di dalam
  palette tidak menggerakkan halaman; `lenis.start()` saat close.
- **Motion**: bungkus isi dengan `motion.div` untuk spring masuk; untuk exit gunakan `AnimatePresence` + `forceMount`
  Radix — atau cukup @keyframes `data-state` (lebih sederhana, pola resmi).
- **View Transitions**: aksi "ganti tema" dari palette → bungkus perubahan class tema dengan circular reveal
  (`../../01-scroll-transitions/view-transitions/NOTES.md` resep 1) — titik asal = posisi item terpilih.
- **Router**: `onSelect={() => { setOpen(false); router.push(url) }}`; nested pages pakai state stack + Backspace (README).

## Resep non-generik
1. **Height + item yang tidak "kedip"**
```css
[cmdk-list]{ height: min(330px, var(--cmdk-list-height)); max-height: 400px; overflow: auto;
  overscroll-behavior: contain; transition: height 120ms cubic-bezier(.2,.8,.2,1) }
[cmdk-item]{ transition: background 150ms ease, color 150ms ease; transition-property: none }
[cmdk-item]:active{ transition-property: background; background: var(--gray4) }
```
Kenapa mahal: container memuai halus, tapi seleksi tetap instan seperti native OS menu.

2. **Pages dengan breadcrumb + bounce (pola skin Vercel)**
```tsx
function bounce() { const el = ref.current; if (!el) return
  el.style.transform = 'scale(0.96)'; setTimeout(() => (el.style.transform = ''), 100) }
<Command ref={ref} onKeyDown={(e) => { if (e.key === 'Enter') bounce()
  if (e.key === 'Backspace' && !search && pages.length) { e.preventDefault(); setPages(p => p.slice(0, -1)); bounce() } }}>
```
Kenapa mahal: transisi antar "halaman" palette punya hentakan fisik kecil (squash 4%) tanpa animasi panjang.

3. **Indikator meluncur (sliding highlight)**
```tsx
const value = useCommandState((s) => s.value)        // value item terpilih
useLayoutEffect(() => {
  const el = listRef.current?.querySelector('[cmdk-item][data-selected="true"]') as HTMLElement | null
  if (el) hl.current!.style.transform = `translateY(${el.offsetTop}px)`, hl.current!.style.height = `${el.offsetHeight}px`
}, [value])
/* .hl { position:absolute; inset-inline:0; transition: transform 160ms cubic-bezier(.2,.8,.2,1), height 160ms } */
```
Kenapa mahal: satu "lensa" yang meluncur antar item = kontinuitas spasial (kesan Linear/Raycast).
(State store terverifikasi `cmdk/src/index.tsx`: `{ search, value, selectedItemId?, filtered: {count, items, groups} }`;
`.hl` diletakkan di dalam `[cmdk-list]` yang `position: relative`.)

4. **Empty state yang hidup**: `const search = useCommandState(s => s.search)` → `<Command.Empty>Tidak ada hasil untuk
   "{search}"</Command.Empty>` + animasi shake 1× via keyframes saat count berubah ke 0.

## Performa, aksesibilitas, mobile & browser
- Bagus sampai ±2.000–3.000 item; lebih dari itu: `shouldFilter={false}`, filter sendiri, virtualisasi.
- Aksesibilitas: label (`label` prop → aria), listbox/option, aria-activedescendant; diuji VoiceOver (README).
- Hydration: pastikan `open={false}` di server untuk Dialog.
- Reduced motion: matikan `transition: height` & bounce (`@media (prefers-reduced-motion: reduce)`); palette tetap instan.
- Mobile: tidak ada ⌘K → sediakan tombol pemicu yang terlihat.

## Sumber lokal
- `repo-cmdk/README.md` — dokumentasi resmi lengkap (parts, props, contoh pages, async, popover, FAQ).
- `repo-cmdk/cmdk/src/index.tsx` — List height observer, Dialog, data-attr, vimBindings, scrollIntoView.
- `repo-cmdk/cmdk/src/command-score.ts` — algoritma skor fuzzy.
- `repo-cmdk/ARCHITECTURE.md` — kenapa DOM-authoritative & value-based selection.
- `repo-cmdk/website/styles/cmdk/{linear,raycast,vercel,framer}.scss` — skin resmi (transisi, dialog keyframes).
- `repo-cmdk/website/components/cmdk/{vercel,raycast,linear,framer}.tsx` — pages, bounce, sub-command.
- `repo-cmdk/test/pages/*.tsx` — contoh props (dialog, keybinds, numeric, portal).
