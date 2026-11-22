// Shared WebGL2 offscreen water caustic & ripple shader (L3 Codrops craft).
// Energy-conserving cool-slate/ivory refraction; graceful null fallback if WebGL2 is unavailable.
export function makeWaterGL(w = 960, h = 540) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const gl = c.getContext('webgl2', { premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: false });
  if (!gl) return null;

  const vsSrc = `#version 300 es
  in vec2 a;
  out vec2 vUv;
  void main() { vUv = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`;

  const fsSrc = `#version 300 es
  precision highp float;
  in vec2 vUv;
  uniform float uTime;
  uniform float uRippleT;
  uniform vec2 uRippleCenter;
  uniform float uCausticAmt;
  out vec4 fragColor;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123);
  }

  float worleyCaustic(vec2 uv, float t) {
    vec2 i = floor(uv), f = fract(uv);
    float f1 = 8.0, f2 = 8.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 n = vec2(float(x), float(y));
        vec2 r = hash2(i + n);
        vec2 o = 0.5 + 0.42 * sin(t * 1.15 + 6.2831 * r);
        vec2 d = n + o - f;
        float dist = dot(d, d);
        if (dist < f1) { f2 = f1; f1 = dist; } else if (dist < f2) { f2 = dist; }
      }
    }
    return smoothstep(0.18, 0.0, sqrt(f2) - sqrt(f1));
  }

  void main() {
    vec2 aspect = vec2(16.0 / 9.0, 1.0);
    vec2 p = vUv * aspect;
    float rippleGlow = 0.0;
    vec2 disp = vec2(0.0);
    if (uRippleT > 0.0 && uRippleT < 2.4) {
      vec2 rc = uRippleCenter * aspect;
      float d = length(p - rc);
      float radius = uRippleT * 0.92;
      float band = exp(-pow((d - radius) * 14.0, 2.0)) * exp(-uRippleT * 1.45);
      float wave = sin((d - radius) * 46.0) * band;
      disp = normalize(p - rc + 1e-4) * wave * 0.06;
      rippleGlow = band * 0.34;
    }
    float c1 = worleyCaustic((p + disp) * 5.2 + vec2(uTime * 0.14, -uTime * 0.08), uTime * 0.85);
    float c2 = worleyCaustic((p - disp * 0.7) * 8.6 + vec2(-uTime * 0.11, uTime * 0.12), uTime * 0.65);
    float caustic = (c1 * 0.62 + c2 * 0.38) * uCausticAmt;
    vec3 col = vec3(0.76, 0.84, 0.88) * caustic + vec3(0.86, 0.90, 0.84) * rippleGlow;
    float alpha = clamp(caustic * 0.26 + rippleGlow * 0.30, 0.0, 0.44);
    fragColor = vec4(col, alpha);
  }`;

  const compile = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSrc));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const locA = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(locA); gl.vertexAttribPointer(locA, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uRippleT = gl.getUniformLocation(prog, 'uRippleT');
  const uRippleCenter = gl.getUniformLocation(prog, 'uRippleCenter');
  const uCausticAmt = gl.getUniformLocation(prog, 'uCausticAmt');

  return (time, rippleT, cx = 0.5, cy = 0.5, causticAmt = 0.32) => {
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, time); gl.uniform1f(uRippleT, rippleT);
    gl.uniform2f(uRippleCenter, cx, cy); gl.uniform1f(uCausticAmt, causticAmt);
    gl.drawArrays(gl.TRIANGLES, 0, 3); return c;
  };
}
