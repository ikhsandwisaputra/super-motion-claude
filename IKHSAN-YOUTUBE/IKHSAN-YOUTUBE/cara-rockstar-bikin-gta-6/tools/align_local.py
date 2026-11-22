"""Build an ElevenLabs-style <vo>.align.json for a VO take that has no /with-timestamps data, fully local and free.

  .venv/bin/python -I aset/<slug>/tools/align_local.py 01 03 04 …     (take ids from film.json `vo`; text from vo/<id>.txt)

whisper.cpp (large-v3-turbo, word-level -ml 1 -sow) gives word times; the script words are matched to them (difflib on
normalised words), unmatched script words are interpolated between their matched neighbours, and each word's time is
spread over its characters. Audio tags like [curious] get zero-length times so words.py / place.py skip them.
Output keys match /with-timestamps: text, model, voice, alignment{characters, character_start/end_times_seconds}."""
import difflib, json, re, subprocess, sys, tempfile
from pathlib import Path

PROJ = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJ / 'tools')); import film  # noqa: E402
MODEL = '/home/ikhsands/Proyek/ikhsan-crafting-art/tools/audio-intel/models/ggml-large-v3-turbo-q5_0.bin'


def ffmpeg():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def norm(w):
    return re.sub(r'[^0-9a-z]', '', w.lower())


def whisper_words(mp3):
    with tempfile.TemporaryDirectory() as d:
        wav, base = f'{d}/a.wav', f'{d}/a'
        subprocess.run([ffmpeg(), '-y', '-loglevel', 'error', '-i', str(mp3), '-ar', '16000', '-ac', '1', wav], check=True)
        subprocess.run(['whisper-cli', '-m', MODEL, '-l', 'id', '-t', '4', '-ml', '1', '-sow', '-oj', '-np',
                        '-f', wav, '-of', base], check=True, capture_output=True)
        segs = json.load(open(f'{base}.json'))['transcription']
    out = []
    for s in segs:
        t = s['text'].strip()
        if norm(t):
            out.append((norm(t), s['offsets']['from'] / 1000, s['offsets']['to'] / 1000))
    return out


def build(n):
    text = (PROJ / 'vo' / f'{n}.txt').read_text().strip()
    toks = [(m.start(), m.end(), m.group()) for m in re.finditer(r'\[[a-z ]+\]|\S+', text)]
    spoken = [i for i, t in enumerate(toks) if not t[2].startswith('[') and norm(t[2])]
    ww = whisper_words(film.vo(n))
    sm = difflib.SequenceMatcher(None, [norm(toks[i][2]) for i in spoken], [w[0] for w in ww], autojunk=False)
    tim = {}
    for a, b, size in sm.get_matching_blocks():
        for k in range(size):
            tim[spoken[a + k]] = ww[b + k][1:]
    matched = len(tim)
    # interpolate unmatched spoken words between neighbours
    end_audio = ww[-1][2] if ww else 0.0
    for j, i in enumerate(spoken):
        if i in tim:
            continue
        prv = next((tim[spoken[k]][1] for k in range(j - 1, -1, -1) if spoken[k] in tim), 0.0)
        nk = next((k for k in range(j + 1, len(spoken)) if spoken[k] in tim), None)
        nxt = tim[spoken[nk]][0] if nk is not None else end_audio
        gap = [k for k in range(j, nk if nk is not None else len(spoken)) if spoken[k] not in tim]
        step = (nxt - prv) / (len(gap) or 1)
        for q, k in enumerate(gap):
            tim[spoken[k]] = (prv + q * step, prv + (q + 1) * step)
    chars, st, en = [], [], []
    last = 0.0
    for idx in range(len(text)):
        chars.append(text[idx])
    starts = [last] * len(text); ends = [last] * len(text)
    for i, (a, b, w) in enumerate(toks):
        if i in tim:
            t0, t1 = tim[i]; L = b - a
            for c in range(L):
                starts[a + c] = t0 + (t1 - t0) * c / L; ends[a + c] = t0 + (t1 - t0) * (c + 1) / L
            last = t1
        else:  # tags / punctuation-only tokens
            for c in range(a, b):
                starts[c] = ends[c] = last
    # gaps (spaces, newlines) take the previous end
    cur = 0.0
    for c in range(len(text)):
        if any(a <= c < b for a, b, _ in toks):
            cur = ends[c]
        else:
            starts[c] = ends[c] = cur
    al = {'characters': chars, 'character_start_times_seconds': [round(x, 3) for x in starts],
          'character_end_times_seconds': [round(x, 3) for x in ends]}
    F = json.load(open(PROJ / 'film.json'))
    out = film.vo(n, '.align.json')
    json.dump({'text': text, 'model': F['voice']['model'], 'voice': F['voice']['id'], 'alignment': al,
               'normalized_alignment': al, 'source': 'whisper.cpp local + difflib (align_local.py)'},
              open(out, 'w'), ensure_ascii=False)
    print(f'{n}: {matched}/{len(spoken)} words matched ({100 * matched / max(1, len(spoken)):.0f} %), '
          f'last word ends {last:.2f} s → {out.name}')


if __name__ == '__main__':
    for n in sys.argv[1:]:
        build(n)
