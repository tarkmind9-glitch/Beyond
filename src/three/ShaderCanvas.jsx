import { useEffect, useRef } from 'react'
import { shaders } from './shaders'
import { addTick, lerp, prefersReducedMotion } from '../lib/ticker'

const vertex = `
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }
`

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s))
  return s
}

// Lightweight full-screen fragment-shader canvas (raw WebGL, no three.js).
// Only renders while visible on screen.
export default function ShaderCanvas({ shader = 'flow', colors = ['#0d0e14', '#3d4bff', '#c9d0ff'], className = '', speed = 1 }) {
  const canvasRef = useRef(null)
  const colorKey = colors.join(',')

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) return

    const program = gl.createProgram()
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertex))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, shaders[shader] ?? shaders.flow))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (name) => gl.getUniformLocation(program, name)
    const uTime = u('uTime')
    const uRes = u('uRes')
    const uMouse = u('uMouse')
    colorKey.split(',').forEach((hex, i) => gl.uniform3fv(u(`uC${i + 1}`), hexToRgb(hex)))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uRes, w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    const still = prefersReducedMotion()
    let t = Math.random() * 100
    let last = performance.now()
    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!visible) return
      if (!still) t += dt * speed
      mouse.x = lerp(mouse.x, mouse.tx, 0.05)
      mouse.y = lerp(mouse.y, mouse.ty, 0.05)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const remove = addTick(draw)

    return () => {
      remove()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [shader, colorKey, speed])

  return <canvas ref={canvasRef} className={`shader-canvas ${className}`} aria-hidden="true" />
}
