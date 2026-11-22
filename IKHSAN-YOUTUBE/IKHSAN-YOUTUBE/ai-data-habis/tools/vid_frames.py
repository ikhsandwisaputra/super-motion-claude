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
    # ai-data-habis (video 3)
    'ketik': ('close-up-of-hands-typing-on-a-1395943', 1.0, 6.0), 'ketik2': ('close-up-view-of-hands-typing-on-4873238', 1.0, 6.0),
    'server3': ('detailed-view-of-server-units-7140928', 1.0, 6.0), 'kabel3': ('ethernet-cables-connected-to-a-7140937', 1.0, 6.0),
    'gembok': ('golden-padlock-on-a-chain-link-4976967', 1.0, 6.0), 'gerbang': ('close-up-of-a-locked-gate-with-a-3999371', 1.0, 6.0),
    'cetak': ('close-up-of-a-printing-press-37533325', 1.0, 6.0), 'robot': ('high-tech-robotic-arm-operating-32386532', 1.0, 6.0),
    'anak_tunjuk': ('a-young-child-points-to-a-7308352', 1.0, 6.0), 'go': ('hands-setting-up-traditional-go-39277761', 1.0, 6.0),
    'digital': ('visual-depiction-of-a-digital-30607101', 1.0, 6.0), 'macro': ('stunning-macro-video-of-colorful-33717724', 1.0, 6.0),
    'kereta': ('close-up-of-a-high-speed-38826405', 1.0, 6.0), 'tenang': ('explore-the-tranquility-of-a-38668053', 1.0, 6.0),
    'map_dok': ('file-folder-document-free-stock-349087', 1.0, 6.0),
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
