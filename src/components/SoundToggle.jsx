import { useEffect, useRef, useState } from 'react'

// Ambient soundscape synthesised with the Web Audio API — no audio files needed.
// Off by default; browsers only allow audio after a user gesture anyway.
function createAmbience() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 900
  filter.Q.value = 0.6
  filter.connect(master)

  // Slowly sweep the filter for movement
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.05
  lfoGain.gain.value = 500
  lfo.connect(lfoGain).connect(filter.frequency)
  lfo.start()

  // A soft, open chord (A2, E3, B3, C#4) with gentle detune
  ;[110, 164.81, 246.94, 277.18].forEach((freq, i) => {
    ;[-4, 4].forEach((detune) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = i === 0 ? 'sine' : 'triangle'
      osc.frequency.value = freq
      osc.detune.value = detune
      gain.gain.value = i === 0 ? 0.14 : 0.05
      osc.connect(gain).connect(filter)
      osc.start()
    })
  })

  return {
    ctx,
    fade(on) {
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(on ? 0.35 : 0, now + (on ? 2 : 0.6))
    },
  }
}

export default function SoundToggle() {
  const [on, setOn] = useState(false)
  const audio = useRef(null)

  const toggle = () => {
    if (!audio.current) audio.current = createAmbience()
    const next = !on
    if (next) audio.current.ctx.resume()
    audio.current.fade(next)
    setOn(next)
  }

  useEffect(() => () => audio.current?.ctx.close(), [])

  return (
    <button
      type="button"
      className={`pill pill--icon sound ${on ? 'is-on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
    >
      <span className="sound__bars" aria-hidden="true">
        <i /> <i /> <i /> <i />
      </span>
    </button>
  )
}
