// Final lens pass. Motion blur = temporal supersampling: K sub-frame composites are averaged in a
// linear-light half-float buffer (averaging in display space darkens highlights — motion-docs IQ
// gamma notes), then one lens pass: UV transforms -> CA -> glow -> grade/strobe -> flash -> vignette -> grain.
import * as THREE from "three";
import { W, H } from "./util.js";

const quadVert = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";
const accumFrag = /* glsl */ `
precision highp float;
uniform sampler2D src; uniform float weight; varying vec2 vUv;
void main(){ vec3 c = texture2D(src, vUv).rgb; gl_FragColor = vec4(pow(c, vec3(2.2))*weight, weight); }`;
const frag = /* glsl */ `
precision highp float;
uniform sampler2D tex;
uniform sampler2D bloomTex;
uniform vec2 res;
uniform float seed, ca, vig, grain, flash, exposure, pix, glitch, glow, mode, sat, contrast, warm;
uniform vec2 blur;
uniform vec3 flashColor;
varying vec2 vUv;
float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
vec3 S(vec2 uv){ return pow(max(texture2D(tex, uv).rgb, 0.0), vec3(1.0/2.2)); }
vec3 tapBlur(vec2 uv){
  if (length(blur) < 0.5) return S(uv);
  vec3 acc = vec3(0.0);
  for (int i = 0; i < 16; i++){ float k = float(i)/15.0 - 0.5; acc += S(uv + blur*k/res); }
  return acc/16.0;
}
void main(){
  vec2 uv = vUv;
  if (pix > 1.0){ vec2 b = pix/res; uv = (floor(uv/b)+0.5)*b; }
  if (glitch > 0.0){
    float band = floor(uv.y*28.0 + seed*13.0);
    if (h21(vec2(band, seed)) < glitch*0.6) uv.x += (h21(vec2(band, seed+7.0))-0.5)*0.12*glitch;
  }
  vec2 d = uv - 0.5;
  float amt = ca*(0.4 + dot(d,d)*2.2);
  vec3 col = vec3(tapBlur(uv + d*amt).r, tapBlur(uv).g, tapBlur(uv - d*amt).b);
  if (glitch > 0.0){
    float band = floor(uv.y*28.0 + seed*13.0);
    if (h21(vec2(band, seed+3.0)) < glitch*0.25) col = mix(col, vec3(0.1,0.95,0.9), 0.55);
    col.r = mix(col.r, S(uv + vec2(0.012*glitch,0.0)).r, glitch);
  }
  col += pow(texture2D(bloomTex, uv).rgb, vec3(1.0/2.2))*glow; // separable-gaussian bloom (no ring ghosts)
  col *= exposure;
  // grade: S-curve contrast, saturation, warm highlights / cool-neutral shadows
  col = clamp(col, 0.0, 1.0);
  col = mix(col, col*col*(3.0-2.0*col), contrast);
  float lum = dot(col, vec3(0.299,0.587,0.114));
  col = mix(vec3(lum), col, sat);
  col += warm*vec3(0.05, 0.015, -0.035)*smoothstep(0.35, 1.0, lum);
  if (mode > 0.5 && mode < 1.5) col = 1.0 - col;
  else if (mode > 1.5 && mode < 2.5) col = mix(vec3(0.16,0.0,0.02), vec3(1.0,0.22,0.2), smoothstep(0.05,0.9,lum));
  else if (mode > 2.5 && mode < 3.5) col = mix(vec3(0.0,0.06,0.12), vec3(0.45,1.0,0.95), smoothstep(0.05,0.9,lum));
  else if (mode > 3.5 && mode < 4.5) col = vec3(step(0.42, lum));
  else if (mode > 4.5 && mode < 5.5) col = pow(col, vec3(0.45))*1.35;
  col = mix(col, flashColor, clamp(flash, 0.0, 1.0));
  float v = smoothstep(0.95, 0.25, length(d*vec2(1.0, 0.82)));
  col *= mix(1.0, v, vig);
  col += (h21(vUv*res + seed*91.7) - 0.5)*grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const brightFrag = /* glsl */ `
precision highp float;
uniform sampler2D src; uniform vec2 res; varying vec2 vUv;
void main(){ // 4-tap box downsample + soft threshold (linear light)
  vec2 o = 1.0/res;
  vec3 c = (texture2D(src, vUv + vec2(-o.x,-o.y)).rgb + texture2D(src, vUv + vec2(o.x,-o.y)).rgb +
            texture2D(src, vUv + vec2(-o.x,o.y)).rgb + texture2D(src, vUv + vec2(o.x,o.y)).rgb) * 0.25;
  float l = dot(c, vec3(0.2126,0.7152,0.0722));
  float k = smoothstep(0.42, 0.95, l);
  gl_FragColor = vec4(c*k, 1.0);
}`;
const blurFrag = /* glsl */ `
precision highp float;
uniform sampler2D src; uniform vec2 dir; varying vec2 vUv;
void main(){ // 13-tap gaussian (sigma ~ 4 texels)
  float w[7]; w[0]=0.1468; w[1]=0.1355; w[2]=0.1063; w[3]=0.0710; w[4]=0.0403; w[5]=0.0195; w[6]=0.0080;
  vec3 c = texture2D(src, vUv).rgb*w[0];
  for (int i = 1; i < 7; i++){ c += (texture2D(src, vUv + dir*float(i)).rgb + texture2D(src, vUv - dir*float(i)).rgb)*w[i]; }
  gl_FragColor = vec4(c/0.9078, 1.0);
}`;

export class Post {
  constructor(canvas) {
    this.r = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
    this.r.setPixelRatio(1); this.r.setSize(W, H, false);
    this.r.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.r.autoClear = false;
    this.rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, depthBuffer: false });
    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.srcTex = null;
    this.au = { src: { value: null }, weight: { value: 1 } };
    this.accScene = new THREE.Scene();
    this.accScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      uniforms: this.au, vertexShader: quadVert, fragmentShader: accumFrag, depthTest: false, depthWrite: false,
      transparent: true, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor,
    })));
    this.u = {
      tex: { value: this.rt.texture }, res: { value: new THREE.Vector2(W, H) }, seed: { value: 0 },
      ca: { value: 0.0015 }, vig: { value: 0.55 }, grain: { value: 0.035 }, flash: { value: 0 },
      flashColor: { value: new THREE.Color(1, 1, 1) }, exposure: { value: 1 }, pix: { value: 0 },
      glitch: { value: 0 }, glow: { value: 0.4 }, mode: { value: 0 }, sat: { value: 1.15 }, contrast: { value: 0.3 }, warm: { value: 1 },
      blur: { value: new THREE.Vector2(0, 0) },
    };
    const bw = W / 4, bh = H / 4;
    this.b1 = new THREE.WebGLRenderTarget(bw, bh, { type: THREE.HalfFloatType, depthBuffer: false });
    this.b2 = new THREE.WebGLRenderTarget(bw, bh, { type: THREE.HalfFloatType, depthBuffer: false });
    this.bu = { src: { value: this.rt.texture }, res: { value: new THREE.Vector2(bw, bh) } };
    this.bScene = new THREE.Scene();
    this.bScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: this.bu, vertexShader: quadVert, fragmentShader: brightFrag, depthTest: false, depthWrite: false })));
    this.gu = { src: { value: null }, dir: { value: new THREE.Vector2() } };
    this.gScene = new THREE.Scene();
    this.gScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: this.gu, vertexShader: quadVert, fragmentShader: blurFrag, depthTest: false, depthWrite: false })));
    this.u.bloomTex = { value: this.b1.texture };
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      uniforms: this.u, fragmentShader: frag, vertexShader: quadVert, depthTest: false, depthWrite: false,
    })));
  }
  begin() {
    this.r.setRenderTarget(this.rt); this.r.setClearColor(0x000000, 0); this.r.clear(); this.r.setRenderTarget(null);
  }
  accum(srcCanvas, weight) {
    if (!this.srcTex) {
      this.srcTex = new THREE.CanvasTexture(srcCanvas);
      this.srcTex.colorSpace = THREE.NoColorSpace;
      this.srcTex.minFilter = this.srcTex.magFilter = THREE.LinearFilter; this.srcTex.generateMipmaps = false;
      this.au.src.value = this.srcTex;
    }
    this.srcTex.needsUpdate = true;
    this.au.weight.value = weight;
    this.r.setRenderTarget(this.rt); this.r.render(this.accScene, this.cam); this.r.setRenderTarget(null);
  }
  render(p) {
    for (const k of ["seed", "ca", "vig", "grain", "flash", "exposure", "pix", "glitch", "glow", "mode", "sat", "contrast", "warm"]) if (p[k] !== undefined) this.u[k].value = p[k];
    this.u.blur.value.set(p.blurX || 0, p.blurY || 0);
    this.u.flashColor.value.set(p.flashColor || "#ffffff");
    // bloom: bright-pass downsample -> blur H -> blur V -> blur H (wider) -> blur V
    const bw = W / 4, bh = H / 4;
    this.r.setRenderTarget(this.b1); this.r.render(this.bScene, this.cam);
    for (const [src, dst, dx, dy] of [[this.b1, this.b2, 1, 0], [this.b2, this.b1, 0, 1], [this.b1, this.b2, 2, 0], [this.b2, this.b1, 0, 2]]) {
      this.gu.src.value = src.texture; this.gu.dir.value.set(dx / bw, dy / bh);
      this.r.setRenderTarget(dst); this.r.render(this.gScene, this.cam);
    }
    this.r.setRenderTarget(null); this.r.clear();
    this.r.render(this.scene, this.cam);
  }
}
