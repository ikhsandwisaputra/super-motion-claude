---
source: https://bugs.webkit.org/show_bug.cgi?id=285120
title: "WebKit bug 285120 — haptic feedback for <input type=checkbox switch> should require user activation"
fetched: 2026-10-28
note: Halaman Bugzilla dirender JavaScript (fetch_docs → THIN). Isi di bawah = ringkasan hasil WebFetch, BUKAN salinan verbatim.
---

# WebKit bug 285120 (ringkasan)

- Judul: "haptic feedback for <input type=checkbox switch> should require user activation"
- Status: RESOLVED FIXED (P2, Minor) — komponen Forms, assignee Aditya Keerthi.
- Dilaporkan 2024-12-23: haptic untuk checkbox switch hadir di Safari 18.0 (iOS 18); pelapor menunjukkan script bisa memicu
  getaran tanpa gesture user dan meminta agar fitur ini mensyaratkan user activation.
- 2025-01-02: PR #38473 dibuka; 2025-01-03: di-commit ke main sebagai 288403@main (dfb3971bb0d9).
- Halaman bug tidak merinci mekanisme fix (trusted event vs transient activation) — perilaku tepat per versi iOS: [UNVERIFIED].
