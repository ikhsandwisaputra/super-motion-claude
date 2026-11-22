// Shared WebGL2 One-Way Mirror & Optical Observation Glass Refraction shader (L3 Codrops craft).
// Subtle cool-slate specular sweep + radial optical scan ripple; graceful null fallback if WebGL2 unavailable.
export function makeGlassGL(w = 960, h = 540) {
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
  uniform float uPulseT;
  uniform vec2 uCenter;
  uniform float uAmt;
  out vec4 fragColor;

  void main() {
    vec2 aspect = vec2(16.0 / 9.0, 1.0);
    vec2 p = vUv * aspect;

    float diag = dot(vUv, vec2(0.82, 0.57)) - uTime * 0.14;
    float sheen = pow(max(0.0, sin(diag * 3.8)), 10.0) * 0.36;
    float micro = pow(max(0.0, sin(diag * 11.4 + 1.2)), 14.0) * 0.14;

    float pulse = 0.0;
    if (uPulseT > 0.0 && uPulseT < 2.4) {
      vec2 rc = uCenter * aspect;
      float d = length(p - rc);
      float rad = uPulseT * 0.95;
      float band = exp(-pow((d - rad) * 16.0, 2.0)) * exp(-uPulseT * 1.6);
      pulse = band * 0.42;
    }

    float line = 0.5 + 0.5 * sin(vUv.y * 420.0);
    float val = (sheen + micro) * uAmt * (0.85 + 0.15 * line) + pulse;
    vec3 col = mix(vec3(0.68, 0.78, 0.84), vec3(0.94, 0.93, 0.90), clamp(pulse * 2.0, 0.0, 1.0));
    float alpha = clamp(val * 0.42, 0.0, 0.40);
    fragColor = vec4(col * alpha, alpha);
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
  const uPulseT = gl.getUniformLocation(prog, 'uPulseT');
  const uCenter = gl.getUniformLocation(prog, 'uCenter');
  const uAmt = gl.getUniformLocation(prog, 'uAmt');

  return (time, pulseT, cx = 0.5, cy = 0.5, amt = 0.35) => {
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, time); gl.uniform1f(uPulseT, pulseT);
    gl.uniform2f(uCenter, cx, cy); gl.uniform1f(uAmt, amt);
    gl.drawArrays(gl.TRIANGLES, 0, 3); return c;
  };
}
