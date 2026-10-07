// Fragment shaders for <ShaderCanvas>. Each receives:
//   uTime (seconds), uRes (px), uMouse (0..1, smoothed), uC1/uC2/uC3 (rgb 0..1)
const common = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.0; a *= 0.5; }
  return v;
}
vec2 aspectUv() {
  vec2 uv = vUv - 0.5;
  uv.x *= uRes.x / uRes.y;
  return uv;
}
float grain(vec2 p) { return (hash(p + fract(uTime)) - 0.5) * 0.04; }
`

export const shaders = {
  // Domain-warped flowing colour field
  flow: `${common}
void main() {
  vec2 uv = aspectUv() * 1.6;
  vec2 m = (uMouse - 0.5) * 0.6;
  float t = uTime * 0.08;
  vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(uv + 3.0 * q + vec2(1.7, 9.2) + m + t * 1.5), fbm(uv + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(uv + 2.5 * r);
  vec3 col = mix(uC1, uC2, smoothstep(0.15, 0.85, f));
  col = mix(col, uC3, smoothstep(0.55, 1.0, length(r) * f));
  col += grain(gl_FragCoord.xy);
  gl_FragColor = vec4(col, 1.0);
}`,

  // Interfering concentric rings that follow the pointer
  rings: `${common}
void main() {
  vec2 uv = aspectUv();
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float d1 = length(uv - m * 0.6);
  float d2 = length(uv + m * 0.4 + vec2(0.25, 0.0));
  float w = sin(d1 * 40.0 - uTime * 2.0) + sin(d2 * 36.0 - uTime * 1.6);
  float band = smoothstep(0.2, 0.9, w * 0.5 + 0.5);
  vec3 col = mix(uC1, uC2, band);
  col = mix(col, uC3, smoothstep(0.35, 0.0, d1) * 0.8);
  col += grain(gl_FragCoord.xy);
  gl_FragColor = vec4(col, 1.0);
}`,

  // Wavy dot field in perspective
  dots: `${common}
void main() {
  vec2 uv = vUv;
  float horizon = 0.62;
  vec3 col = uC1;
  if (uv.y < horizon) {
    float z = 0.35 / (horizon - uv.y + 0.001);
    vec2 p = vec2((uv.x - 0.5) * z * 2.0 + (uMouse.x - 0.5) * 2.0, z + uTime * 0.6);
    float h = sin(p.x * 0.8 + uTime) * cos(p.y * 0.5 - uTime * 0.7);
    vec2 g = fract(p * 2.0) - 0.5;
    float dotMask = smoothstep(0.12, 0.05, length(g) - h * 0.04);
    float fade = smoothstep(0.0, 0.5, horizon - uv.y);
    col = mix(col, mix(uC2, uC3, h * 0.5 + 0.5), dotMask * fade);
  }
  col += smoothstep(0.25, 0.0, abs(uv.y - horizon)) * uC2 * 0.25;
  col += grain(gl_FragCoord.xy);
  gl_FragColor = vec4(col, 1.0);
}`,

  // Soft metaball blobs
  blobs: `${common}
void main() {
  vec2 uv = aspectUv();
  float v = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    vec2 c = vec2(sin(uTime * (0.3 + fi * 0.07) + fi * 1.7), cos(uTime * (0.25 + fi * 0.05) + fi * 2.3)) * 0.38;
    v += 0.018 / dot(uv - c, uv - c);
  }
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  v += 0.03 / dot(uv - m, uv - m);
  float edge = smoothstep(0.9, 1.0, v);
  float rim = smoothstep(0.8, 1.0, v) - smoothstep(1.0, 1.4, v);
  vec3 col = mix(uC1, uC2, edge);
  col = mix(col, uC3, rim);
  col += grain(gl_FragCoord.xy);
  gl_FragColor = vec4(col, 1.0);
}`,

  // Iridescent stripes like liquid chrome
  chrome: `${common}
void main() {
  vec2 uv = aspectUv();
  float n = fbm(uv * 2.0 + uTime * 0.1 + (uMouse - 0.5));
  float s = sin((uv.x + uv.y * 0.6 + n * 1.2) * 7.0 + uTime * 0.6);
  vec3 col = mix(uC1, uC2, smoothstep(-0.6, 0.6, s));
  col = mix(col, uC3, pow(max(s, 0.0), 24.0) * 0.8);
  col *= 0.85 + 0.3 * n;
  col += grain(gl_FragCoord.xy);
  gl_FragColor = vec4(col, 1.0);
}`,
}
