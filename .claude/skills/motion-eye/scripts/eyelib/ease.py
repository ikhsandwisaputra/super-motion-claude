"""The curve lab: every ease the skills talk about, as a function you can measure and draw.

Spec strings (several can be compared side by side):
  outExpo | outQuint | inOutCubic | ...            named curves (easings.net cubic-beziers)
  bezier:.16,1,.3,1                                 CSS cubic-bezier
  ae:out=0.1,in=90                                  After Effects speed-0 keys with influence % (out on the
                                                    first key, in on the last)
  expo:16                                           1 - 2^(-k t), normalised (k 10 = outExpo-like, 16 = harder)
  spring:zeta=0.65,T=0.35[,v0=0]                    damped spring 0 -> 1, T = natural period in seconds
                                                    (k = (2pi/T)^2, c = 2 zeta sqrt k, m = 1), time in seconds
  snap:antic=0.04,a=0.14,s=0.29,p=0.85              anticipation -> snap -> cushion (the 30-frame anatomy:
                                                    dip `antic` until a, reach p at s, settle at 1)
  steps:12                                          the same curve held on 12 fps steps (posterize time) —
                                                    combine as  outExpo@steps:12
"""
import math

NAMED = {
    'outSine': (0.61, 1, 0.88, 1), 'outQuad': (0.5, 1, 0.89, 1), 'outCubic': (0.33, 1, 0.68, 1),
    'outQuart': (0.25, 1, 0.5, 1), 'outQuint': (0.22, 1, 0.36, 1), 'outExpo': (0.16, 1, 0.3, 1),
    'outCirc': (0, 0.55, 0.45, 1), 'outBack': (0.34, 1.56, 0.64, 1),
    'inOutSine': (0.37, 0, 0.63, 1), 'inOutCubic': (0.65, 0, 0.35, 1), 'inOutQuart': (0.76, 0, 0.24, 1),
    'inOutQuint': (0.83, 0, 0.17, 1), 'inOutExpo': (0.87, 0, 0.13, 1), 'inOutBack': (0.68, -0.6, 0.32, 1.6),
    'inCubic': (0.32, 0, 0.67, 0), 'inQuart': (0.5, 0, 0.75, 0), 'inExpo': (0.7, 0, 0.84, 0),
    'easyEase': (0.333, 0, 0.667, 1), 'cssEase': (0.25, 0.1, 0.25, 1),
}


def bezier(x1, y1, x2, y2):
    x1 = min(max(x1, 0.0), 1.0)
    x2 = min(max(x2, 0.0), 1.0)

    def bx(u):
        return 3 * (1 - u) ** 2 * u * x1 + 3 * (1 - u) * u * u * x2 + u ** 3

    def by(u):
        return 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u * u * y2 + u ** 3

    def f(t):
        if t <= 0:
            return 0.0
        if t >= 1:
            return 1.0
        lo, hi = 0.0, 1.0
        for _ in range(48):
            m = (lo + hi) / 2
            if bx(m) < t:
                lo = m
            else:
                hi = m
        return by((lo + hi) / 2)
    return f


def spring(zeta=0.65, T=0.35, v0=0.0):
    """Closed-form damped spring from 0 to 1; f(t) with t in SECONDS."""
    w = 2 * math.pi / T
    if zeta < 1:
        wd = w * math.sqrt(1 - zeta * zeta)
        return lambda t: 1 - math.exp(-zeta * w * t) * (math.cos(wd * t) + (zeta * w - v0) / wd * math.sin(wd * t))
    if zeta == 1:
        return lambda t: 1 - (1 + (w - v0) * t) * math.exp(-w * t)
    r = math.sqrt(zeta * zeta - 1)
    r1, r2 = -w * (zeta - r), -w * (zeta + r)
    A = (v0 + r2) / (r1 - r2)
    B = -1 - A
    return lambda t: 1 + A * math.exp(r1 * t) + B * math.exp(r2 * t)


def expo(k=10.0):
    d = 1 - 2 ** (-k)
    return lambda t: 0.0 if t <= 0 else 1.0 if t >= 1 else (1 - 2 ** (-k * t)) / d


def _hermite(p0, p1, m0, m1, u, dt):
    h00 = 2 * u ** 3 - 3 * u ** 2 + 1
    h10 = u ** 3 - 2 * u ** 2 + u
    h01 = -2 * u ** 3 + 3 * u ** 2
    h11 = u ** 3 - u ** 2
    return h00 * p0 + h10 * dt * m0 + h01 * p1 + h11 * dt * m1


def snap(antic=0.04, a=0.14, s=0.29, p=0.85):
    """Anticipation (dip to -antic by a) -> snap (to p by s) -> long cushion (to 1). C1-continuous."""
    ms = 3 * (1 - p) / (1 - s) * 0.9  # cushion starts with the speed of a quint-ish ease-out

    def f(t):
        if t <= 0:
            return 0.0
        if t >= 1:
            return 1.0
        if antic > 0 and t < a:
            u = t / a
            return -antic * (3 * u * u - 2 * u ** 3)
        t0 = a if antic > 0 else 0.0
        y0 = -antic if antic > 0 else 0.0
        if t < s:
            return _hermite(y0, p, 0.0, ms, (t - t0) / (s - t0), s - t0)
        return _hermite(p, 1.0, ms, 0.0, (t - s) / (1 - s), 1 - s)
    return f


def parse(spec):
    """-> (label, f, time_kind) where time_kind is 'norm' (t 0..1 over the duration) or 'sec' (springs)."""
    spec = spec.strip()
    steps = None
    if '@steps:' in spec:
        spec, st = spec.split('@steps:')
        steps = float(st)
    name, _, arg = spec.partition(':')
    kv = {}
    if '=' in arg:
        for part in arg.split(','):
            k, _, v = part.partition('=')
            kv[k.strip()] = float(v)
    if name in NAMED:
        f, kind = bezier(*NAMED[name]), 'norm'
    elif name == 'linear':
        f, kind = (lambda t: min(1.0, max(0.0, t))), 'norm'
    elif name == 'bezier':
        f, kind = bezier(*[float(v) for v in arg.split(',')]), 'norm'
    elif name == 'ae':
        f, kind = bezier(kv.get('out', 33.33) / 100.0, 0, 1 - kv.get('in', 33.33) / 100.0, 1), 'norm'
    elif name == 'expo':
        f, kind = expo(float(arg or 10)), 'norm'
    elif name == 'spring':
        f, kind = spring(kv.get('zeta', 0.65), kv.get('T', 0.35), kv.get('v0', 0.0)), 'sec'
    elif name == 'snap':
        f, kind = snap(kv.get('antic', 0.04), kv.get('a', 0.14), kv.get('s', 0.29), kv.get('p', 0.85)), 'norm'
    else:
        raise ValueError(f'unknown curve: {spec}')
    return spec + (f'@steps:{steps:g}' if steps else ''), f, kind, steps


def sample(f, kind, frames, fps, steps=None):
    """Value at every frame 0..frames (a move of `frames` frames; springs use real seconds)."""
    out = []
    for i in range(frames + 1):
        if steps:
            # hold on a coarser clock: posterize time
            i = math.floor(i * steps / fps) * fps / steps
        t = i / fps if kind == 'sec' else i / max(1, frames)
        out.append(f(t))
    return out


def metrics(vals, fps):
    def first(th):
        for i, v in enumerate(vals):
            if v >= th:
                return i
        return None

    speeds = [vals[i] - vals[i - 1] for i in range(1, len(vals))]
    settle = 0
    for i, v in enumerate(vals):
        if abs(v - 1) > 0.01:
            settle = i + 1
    pk = max(range(len(speeds)), key=lambda i: abs(speeds[i])) + 1 if speeds else 0
    return {
        'f50': first(0.5), 'f85': first(0.85), 'f90': first(0.9), 'f99': first(0.99),
        'overshoot': max(0.0, max(vals) - 1), 'anticipation': max(0.0, -min(vals)),
        'settle': min(settle, len(vals) - 1), 'peak_speed_frame': pk,
        'peak_speed': max((abs(s) for s in speeds), default=0.0), 'end_speed': abs(speeds[-1]) if speeds else 0.0,
        'fps': fps,
    }
