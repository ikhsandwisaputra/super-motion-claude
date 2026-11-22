"""Cut Ahri's stock clips into frame runs for the chapter kit (plate() in kit/kit.js).
  python -I tools/vid_frames.py lab kabel …      → assets/vid/<name>/f_###.jpg (960×540, 15 fps) + assets/vid/vid.json
Re-cutting a clip: move its folder to assets/vid/_old/ first (stale frames would inflate n)."""
import json, subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; SRC = ROOT / 'assets/stok-situs'; OUT = ROOT / 'assets/vid'; FPS = 15
CLIPS = {  # name: (file stem part, start s, length s)
    'persimpangan': ('a-bustling-aerial-view-of-30147629', 1.0, 6.0), 'menara': ('a-close-up-view-of-a-40057550', 1.0, 6.0),
    'sf_senja': ('aerial-view-of-san-francisco-at-8493717', 4.0, 6.0), 'kelas_sma': ('a-group-of-high-school-students-38012793', 0.2, 4.8),
    'nirsentuh': ('a-person-makes-a-contactless-6602062', 1.0, 6.0), 'serat': ('blue-fiber-optic-lights-create-a-8817471', 2.0, 6.0),
    'anak_sd': ('children-in-uniforms-studying-12724044', 2.0, 6.0), 'sarung': ('close-up-of-a-gloved-scientist-8852649', 1.0, 6.0),
    'hp_qr': ('close-up-of-a-smartphone-5226464', 0.1, 3.0), 'kabel': ('close-up-shot-of-network-cables-1085656', 2.0, 7.0),
    'cleanroom': ('explore-a-cutting-edge-cleanroom-32386615', 1.0, 6.0), 'lab': ('explore-a-high-tech-32386530', 0.5, 6.0),
    'server': ('explore-a-modern-server-room-5028622', 3.0, 6.0), 'kurir': ('food-delivery-driver-rides-7362582', 0.3, 6.0),
    'sf_udara': ('majestic-aerial-view-of-san-10689266', 6.0, 6.0), 'lampu_merah': ('motorcyclists-wait-at-a-traffic-36067569', 1.0, 6.0),
    'satelit': ('satellite-connection-internet-217134', 2.0, 6.0), 'mikroskop': ('scientist-laboratory-biology-262187', 1.0, 6.0),
    'gedung': ('skyscrapers-stunning-city-free-98151', 2.0, 6.0),
    # ai-bubble-dompet
    'sabun': ('vibrant-soap-bubbles-floating-32662918', 1.0, 6.0), 'saham': ('stock-market-graph-fluctuating-38771102', 1.0, 6.0),
    'gel_dekat': ('mesmerizing-view-of-soap-bubbles-857234', 13.4, 4.2), 'gel_tiup': ('colorful-soap-bubble-creating-a-4431789', 0.5, 6.0),
    'rak_server': ('servers-computers-it-free-stock-377880', 4.0, 6.0), 'jaringan': ('network-internet-data-free-stock-14906', 0.5, 6.0),
    'monitor_grafik': ('colorful-charts-on-monitors-38711953', 3.0, 6.0),
    'broker': ('analysis-banking-broker-free-33805', 1.0, 6.0),
    # bab 4
    'hp_scroll': ('iphone-scrolling-technology-free-735', 2.0, 6.0), 'gel_beku': ('soap-bubble-frozen-soap-bubble-150344', 13.0, 7.0),
    'charger': ('charger-mobile-battery-free-8501', 11.0, 6.0), 'grafik_turun': ('graph-decline-economy-free-stock-166289', 3.0, 6.0),
    'poweredge': ('detailed-shot-of-a-poweredge-7140931', 1.0, 6.0), 'celengan': ('piggy-bank-world-savings-day-93550', 3.4, 6.0),
    'kabel': ('close-up-shot-of-network-cables-1085656', 2.0, 7.0),
    # puncak
    'balon': ('close-up-of-hands-holding-and-5701321', 5.5, 4.0), 'gel_ranting': ('soap-bubble-freeze-winter-free-7141', 10.0, 4.0), 'lorong_jar': ('network-internet-data-free-stock-14900', 2.0, 6.0),
}
OUT.mkdir(parents=True, exist_ok=True); mp = OUT / 'vid.json'; meta = json.load(open(mp)) if mp.exists() else {}
for name in sys.argv[1:] or CLIPS:
    part, ss, ln = CLIPS[name]; f = next(SRC.glob(f'*{part}.mp4')); d = OUT / name
    if d.exists() and any(d.iterdir()): print('skip (exists):', name); continue
    d.mkdir(exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(ln), '-i', str(f), '-an',
                    '-vf', f'fps={FPS},scale=960:540:force_original_aspect_ratio=increase,crop=960:540', '-q:v', '4', str(d / 'f_%03d.jpg')], check=True)
    meta[name] = {'n': len(list(d.glob('f_*.jpg'))), 'fps': FPS, 'src': f.name, 'ss': ss, 'len': ln}; print(name, meta[name]['n'])
json.dump(meta, open(mp, 'w'), indent=1)
