// WebGL2 3D Perspective Drone Satellite Map Engine for Indonesia (Sentinel-2 Cloudless EOX, CC BY 4.0).
// BBox: lon [94.0, 142.0], lat [-12.0, 7.5], texture 2048x832 (aspect = 48 / 19.5 = 2.4615).
const LON0 = 94.0, LON1 = 142.0, LAT0 = -12.0, LAT1 = 7.5;
export const MAP_ASPECT = 2048 / 832;

export function lonLatToUV(lon, lat) {
  const u = (lon - LON0) / (LON1 - LON0);
  const v = (LAT1 - lat) / (LAT1 - LAT0); // top of image = +7.5 N, bottom = -12.0 S
  return [u, v];
}

export function uvToWorld(u, v, alt = 0) {
  return [(u * 2 - 1) * MAP_ASPECT, (1 - v * 2), alt];
}

export function lonLatToWorld(lon, lat, alt = 0) {
  const [u, v] = lonLatToUV(lon, lat);
  return uvToWorld(u, v, alt);
}

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

export function buildCameraMVP({ lon = 113.5, lat = -3.0, dist = 1.65, pitchDeg = 40, yawDeg = -6, fovDeg = 38, aspect = 16 / 9 }) {
  const tgt = lonLatToWorld(lon, lat, 0);
  const pitch = pitchDeg * Math.PI / 180;
  const yaw = yawDeg * Math.PI / 180;
  const hDist = dist * Math.sin(pitch);
  const eye = [
    tgt[0] + Math.sin(yaw) * hDist,
    tgt[1] - Math.cos(yaw) * hDist,
    Math.max(0.06, dist * Math.cos(pitch)),
  ];
  const up = [-Math.sin(yaw), Math.cos(yaw), 0.0001];
  const V = lookAt(eye, tgt, up);
  const P = perspective(fovDeg * Math.PI / 180, aspect, 0.02, 24.0);
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

  vec2 g = abs(fract(uv * vec2(24.0, 12.0) - 0.5) - 0.5) / fwidth(uv * vec2(24.0, 12.0));
  float grid = 1.0 - min(min(g.x, g.y), 1.0);
  vec3 gridCol = mix(vec3(0.95, 0.94, 0.90), vec3(0.09, 0.10, 0.08), uLight);
  col = mix(col, gridCol, grid * mix(0.08, 0.10, uLight));

  if (uFocusAmt > 0.01) {
    float df = length((uv - uFocusUV) * vec2(1.8, 1.0));
    float spot = smoothstep(0.65, 0.08, df);
    col *= mix(1.0, mix(0.74, 1.08, spot), uFocusAmt);
  }

  float dist = length(vWorld - uEye);
  float haze = smoothstep(1.8, 4.8, dist);
  col = mix(col, uHaze, haze * 0.88);

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

  const compile = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);

  const verts = new Float32Array([
    -MAP_ASPECT, -1, 0, 1,
     MAP_ASPECT, -1, 1, 1,
    -MAP_ASPECT,  1, 0, 0,
     MAP_ASPECT,  1, 1, 0,
  ]);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  const locPos = gl.getAttribLocation(prog, 'aPos');
  const locUv = gl.getAttribLocation(prog, 'aUv');
  gl.enableVertexAttribArray(locPos); gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(locUv);  gl.vertexAttribPointer(locUv, 2, gl.FLOAT, false, 16, 8);

  const mkTex = (img) => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    return t;
  };

  let texDark = null, texLight = null, ready = false;
  const uMVP = gl.getUniformLocation(prog, 'uMVP');
  const uTexDark = gl.getUniformLocation(prog, 'uTexDark');
  const uTexLight = gl.getUniformLocation(prog, 'uTexLight');
  const uLight = gl.getUniformLocation(prog, 'uLight');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uEye = gl.getUniformLocation(prog, 'uEye');
  const uHaze = gl.getUniformLocation(prog, 'uHaze');
  const uFocusUV = gl.getUniformLocation(prog, 'uFocusUV');
  const uFocusAmt = gl.getUniformLocation(prog, 'uFocusAmt');

  return {
    canvas: cv,
    get ready() { return ready; },
    setTextures(darkImg, lightImg) {
      texDark = mkTex(darkImg);
      texLight = mkTex(lightImg);
      ready = true;
    },
    render({ mvp, eye }, { light = 0, time = 0, haze = [0.055, 0.08, 0.11], focusUV = [0.5, 0.5], focusAmt = 0.3, wOut = 1280, hOut = 720 } = {}) {
      if (!ready) return null;
      if (cv.width !== wOut || cv.height !== hOut) { cv.width = wOut; cv.height = hOut; }
      gl.viewport(0, 0, cv.width, cv.height);
      gl.clearColor(haze[0], haze[1], haze[2], 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindVertexArray(vao);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texDark);  gl.uniform1i(uTexDark, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texLight); gl.uniform1i(uTexLight, 1);
      gl.uniformMatrix4fv(uMVP, false, mvp);
      gl.uniform1f(uLight, light);
      gl.uniform1f(uTime, time);
      gl.uniform3fv(uEye, eye);
      gl.uniform3fv(uHaze, haze);
      gl.uniform2fv(uFocusUV, focusUV);
      gl.uniform1f(uFocusAmt, focusAmt);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return cv;
    },
  };
}

export function getMapGL() {
  if (!_sharedGL) _sharedGL = createGLRenderer(1280, 720);
  return _sharedGL;
}

let _loading = null;
export async function loadIndonesiaMap(base = '../assets/shared/peta/') {
  const mgl = getMapGL();
  if (!mgl || mgl.ready) return mgl;
  if (_loading) return _loading;
  _loading = (async () => {
    const load = u => fetch(u).then(r => r.blob()).then(createImageBitmap);
    const [dImg, lImg] = await Promise.all([load(base + 'indonesia_dark.jpg'), load(base + 'indonesia_light.jpg')]);
    mgl.setTextures(dImg, lImg);
    return mgl;
  })();
  return _loading;
}
