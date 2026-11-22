// WebGL2 3D Perspective Drone Satellite Map Engine for Batam & Singapore Strait.
// Renders real Sentinel-2 Cloudless (EOX, CC BY 4.0) 2048x1792 textures on a true 3D perspective plane
// with atmospheric horizon haze, subtle sea-level graticule, and exact JS 3D->2D projection matching the GPU shader.

const Z = 12, IX0 = 3227, IY0 = 2031, COLS = 8, ROWS = 7;
export const MAP_ASPECT = COLS / ROWS; // 2048 / 1792 = 8/7

export function lonLatToUV(lon, lat) {
  const n = 1 << Z;
  const tx = (lon + 180) / 360 * n;
  const r = lat * Math.PI / 180;
  const ty = (1 - Math.asinh(Math.tan(r)) / Math.PI) / 2 * n;
  return [(tx - IX0) / COLS, (ty - IY0) / ROWS];
}

// Plane world coords: X in [-MAP_ASPECT, +MAP_ASPECT] (west->east), Y in [-1, +1] (south->north), Z = elevation up
export function uvToWorld(u, v, alt = 0) {
  return [(u * 2 - 1) * MAP_ASPECT, (1 - v * 2), alt];
}

export function lonLatToWorld(lon, lat, alt = 0) {
  const [u, v] = lonLatToUV(lon, lat);
  return uvToWorld(u, v, alt);
}

// Column-major 4x4 matrix math (matches GLSL mat4)
function mul4(a, b) {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++)
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return o;
}

function perspective(fovY, aspect, near, far) {
  const f = 1 / Math.tan(fovY / 2), nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

function lookAt(eye, target, up) {
  let zx = eye[0] - target[0], zy = eye[1] - target[1], zz = eye[2] - target[2];
  let len = Math.hypot(zx, zy, zz) || 1; zx /= len; zy /= len; zz /= len;
  let xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx;
  len = Math.hypot(xx, xy, xz) || 1; xx /= len; xy /= len; xz /= len;
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
  return new Float32Array([
    xx, yx, zx, 0,
    xy, yy, zy, 0,
    xz, yz, zz, 0,
    -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
    -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
    -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
    1,
  ]);
}

export function buildCameraMVP({ lon = 104.01, lat = 1.15, dist = 1.18, pitchDeg = 42, yawDeg = -6, fovDeg = 38, aspect = 16 / 9 }) {
  const tgt = lonLatToWorld(lon, lat, 0);
  const pitch = pitchDeg * Math.PI / 180; // 0 = straight down top view, 60 = dramatic low drone angle
  const yaw = yawDeg * Math.PI / 180;
  const hDist = dist * Math.sin(pitch);
  const eye = [
    tgt[0] + Math.sin(yaw) * hDist,
    tgt[1] - Math.cos(yaw) * hDist,
    Math.max(0.06, dist * Math.cos(pitch)),
  ];
  // North-ish up vector safe even at pitch = 0
  const up = [-Math.sin(yaw), Math.cos(yaw), 0.0001];
  const V = lookAt(eye, tgt, up);
  const P = perspective(fovDeg * Math.PI / 180, aspect, 0.02, 18.0);
  return { mvp: mul4(P, V), eye, tgt };
}

export function projectPoint(mvp, w, h, worldPos) {
  const [x, y, z] = worldPos;
  const cx = mvp[0] * x + mvp[4] * y + mvp[8] * z + mvp[12];
  const cy = mvp[1] * x + mvp[5] * y + mvp[9] * z + mvp[13];
  const cw = mvp[3] * x + mvp[7] * y + mvp[11] * z + mvp[15];
  if (cw <= 0.01) return null;
  const nx = cx / cw, ny = cy / cw;
  return { x: (nx * 0.5 + 0.5) * w, y: (0.5 - ny * 0.5) * h, w: cw, scale: 1 / cw };
}

const VS = `#version 300 es
precision highp float;
in vec2 aPos;
in vec2 aUv;
uniform mat4 uMVP;
out vec2 vUv;
out vec3 vWorld;
void main() {
  vUv = aUv;
  vWorld = vec3(aPos, 0.0);
  gl_Position = uMVP * vec4(aPos, 0.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
in vec2 vUv;
in vec3 vWorld;
uniform sampler2D uTexDark;
uniform sampler2D uTexLight;
uniform float uLight;
uniform float uTime;
uniform vec3 uEye;
uniform vec3 uHaze;
uniform vec2 uFocusUV;
uniform float uFocusAmt;
out vec4 fragColor;

void main() {
  vec2 uv = clamp(vUv, 0.002, 0.998);
  vec3 cDark = texture(uTexDark, uv).rgb;
  vec3 cLight = texture(uTexLight, uv).rgb;
  vec3 col = mix(cDark, cLight, uLight);

  // Subtle architectural lat/lon graticule on terrain plane
  vec2 g = abs(fract(uv * vec2(16.0, 14.0) - 0.5) - 0.5) / fwidth(uv * vec2(16.0, 14.0));
  float grid = 1.0 - min(min(g.x, g.y), 1.0);
  vec3 gridCol = mix(vec3(0.95, 0.94, 0.90), vec3(0.09, 0.10, 0.08), uLight);
  col = mix(col, gridCol, grid * mix(0.08, 0.10, uLight));

  // Subtle documentary key-light focus vignette around camera target / focus POI
  if (uFocusAmt > 0.01) {
    float df = length((uv - uFocusUV) * vec2(1.14, 1.0));
    float spot = smoothstep(0.55, 0.08, df);
    col *= mix(1.0, mix(0.76, 1.08, spot), uFocusAmt);
  }

  // Subtle atmospheric sun glint drifting softly across dark ocean areas
  float lum = dot(cDark, vec3(0.299, 0.587, 0.114));
  float isSea = smoothstep(0.26, 0.14, lum);
  float shimmer = 0.5 + 0.5 * sin(uv.x * 38.0 + uTime * 0.7) * cos(uv.y * 32.0 - uTime * 0.5);
  col += mix(vec3(0.03, 0.055, 0.068), vec3(0.02, 0.02, 0.018), uLight) * isSea * shimmer * 0.45;

  // True 3D aerial distance haze toward the far horizon
  float dist = length(vWorld - uEye);
  float haze = smoothstep(1.35, 3.6, dist);
  col = mix(col, uHaze, haze * 0.88);

  // Edge fade so map plane borders never cut harshly
  float edge = smoothstep(0.0, 0.04, uv.x) * smoothstep(0.0, 0.04, 1.0 - uv.x)
             * smoothstep(0.0, 0.04, uv.y) * smoothstep(0.0, 0.04, 1.0 - uv.y);
  col = mix(uHaze, col, edge);

  fragColor = vec4(col, 1.0);
}`;

let _sharedGL = null;

function createGLRenderer(w = 1280, h = 720) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const gl = cv.getContext('webgl2', { antialias: true, alpha: false, preserveDrawingBuffer: true });
  if (!gl) return null;

  const sh = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  const prog = gl.createProgram();
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return null; }

  const A = MAP_ASPECT;
  // Quad covering [-A..A, -1..1] with UVs (0,0 top-left north-west -> 1,1 bottom-right south-east)
  const verts = new Float32Array([
    -A,  1,  0, 0,
     A,  1,  1, 0,
    -A, -1,  0, 1,
     A,  1,  1, 0,
     A, -1,  1, 1,
    -A, -1,  0, 1,
  ]);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  const pLoc = gl.getAttribLocation(prog, 'aPos');
  const uLoc = gl.getAttribLocation(prog, 'aUv');
  gl.enableVertexAttribArray(pLoc); gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(uLoc); gl.vertexAttribPointer(uLoc, 2, gl.FLOAT, false, 16, 8);

  const mkTex = (unit) => {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // 1x1 fallback until image uploaded
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([14, 22, 28]));
    return t;
  };
  const texDark = mkTex(0), texLight = mkTex(1);
  let ready = false;

  const U = name => gl.getUniformLocation(prog, name);
  const locs = {
    mvp: U('uMVP'), dark: U('uTexDark'), light: U('uTexLight'), lightMix: U('uLight'),
    time: U('uTime'), eye: U('uEye'), haze: U('uHaze'), focusUV: U('uFocusUV'), focusAmt: U('uFocusAmt'),
  };

  function upload(imgDark, imgLight) {
    const up = (tex, unit, im) => {
      if (!im) return;
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
      gl.generateMipmap(gl.TEXTURE_2D);
    };
    up(texDark, 0, imgDark);
    up(texLight, 1, imgLight || imgDark);
    ready = true;
  }

  function render(cam, { light = 0, time = 0, haze = [0.05, 0.08, 0.11], focusUV = [0.55, 0.62], focusAmt = 0.55, wOut = w, hOut = h } = {}) {
    if (!ready) return null;
    if (cv.width !== wOut || cv.height !== hOut) { cv.width = wOut; cv.height = hOut; }
    gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(haze[0], haze[1], haze[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);
    gl.bindVertexArray(vao);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texDark);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texLight);
    gl.uniformMatrix4fv(locs.mvp, false, cam.mvp);
    gl.uniform1i(locs.dark, 0);
    gl.uniform1i(locs.light, 1);
    gl.uniform1f(locs.lightMix, light);
    gl.uniform1f(locs.time, time);
    gl.uniform3fv(locs.eye, cam.eye);
    gl.uniform3fv(locs.haze, haze);
    gl.uniform2fv(locs.focusUV, focusUV);
    gl.uniform1f(locs.focusAmt, focusAmt);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    return cv;
  }

  return { upload, render, get ready() { return ready; } };
}

export function getMapGL() {
  if (!_sharedGL) _sharedGL = createGLRenderer(1280, 720);
  return _sharedGL;
}

let _loadPromise = null;
export function loadBatamMap(base = '../assets/shared/peta/') {
  if (_loadPromise) return _loadPromise;
  const img = u => fetch(u).then(r => { if (!r.ok) throw new Error(u); return r.blob(); }).then(createImageBitmap);
  _loadPromise = Promise.all([
    img(`${base}batam_sat_dark.jpg`),
    img(`${base}batam_topo_light.jpg`),
  ]).then(([imD, imL]) => {
    const m = getMapGL();
    if (m) m.upload(imD, imL);
    return { imD, imL };
  }).catch(err => {
    console.warn('loadBatamMap fallback:', err);
    _loadPromise = null;
    return null;
  });
  return _loadPromise;
}
