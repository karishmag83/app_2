/**
 * Interface sounds, synthesized with the Web Audio API so there are no files
 * to download. Both are played only in response to a click or key press, which
 * is what browsers require before audio may start. Failures are silent.
 */

let context: AudioContext | null = null

function audio(): AudioContext | null {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    context ??= new Ctor()
    if (context.state === 'suspended') void context.resume()
    return context
  } catch {
    return null
  }
}

function noiseBuffer(ac: AudioContext, seconds: number, decayPower: number) {
  const length = Math.max(1, Math.floor(ac.sampleRate * seconds))
  const buffer = ac.createBuffer(1, length, ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decayPower
  return buffer
}

/** A soft, glassy tick, like the detent of an iOS picker. Used when a colour is chosen. */
export function playTick(pitch = 1) {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime
  const out = ac.createGain()
  out.gain.value = 0.2
  out.connect(ac.destination)

  // Body: a short sine blip with a quick downward glide
  const osc = ac.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(2200 * pitch, t)
  osc.frequency.exponentialRampToValueAtTime(1150 * pitch, t + 0.045)
  const body = ac.createGain()
  body.gain.setValueAtTime(0.0001, t)
  body.gain.exponentialRampToValueAtTime(0.55, t + 0.003)
  body.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
  osc.connect(body).connect(out)
  osc.start(t)
  osc.stop(t + 0.09)

  // Transient: a few milliseconds of bright, filtered noise for the "click"
  const tick = ac.createBufferSource()
  tick.buffer = noiseBuffer(ac, 0.014, 3)
  const hp = ac.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 3800
  const tickGain = ac.createGain()
  tickGain.gain.value = 0.32
  tick.connect(hp).connect(tickGain).connect(out)
  tick.start(t)
}

/** A warm, rising three-note chime over a soft swell of air. Used for "Enter portfolio". */
export function playEnter() {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime

  const master = ac.createGain()
  master.gain.value = 0.15
  const tone = ac.createBiquadFilter()
  tone.type = 'lowpass'
  tone.frequency.value = 5200
  master.connect(tone).connect(ac.destination)

  // A short feedback echo gives the chime a sense of space
  const echo = ac.createDelay()
  echo.delayTime.value = 0.17
  const feedback = ac.createGain()
  feedback.gain.value = 0.3
  const wet = ac.createGain()
  wet.gain.value = 0.32
  master.connect(echo)
  echo.connect(feedback).connect(echo)
  echo.connect(wet).connect(tone)

  // E5, B5, E6: an open fifth and octave, bright and resolved
  const notes: [number, number][] = [[659.25, 0], [987.77, 0.085], [1318.51, 0.17]]
  for (const [freq, offset] of notes) {
    const start = t + offset
    // Triangle fundamental for warmth plus a quiet bell-like partial
    for (const [mult, type, peak, tail] of [[1, 'triangle', 0.5, 1.5], [2.005, 'sine', 0.1, 0.55]] as const) {
      const o = ac.createOscillator()
      o.type = type
      o.frequency.value = freq * mult
      const g = ac.createGain()
      g.gain.setValueAtTime(0.0001, start)
      g.gain.exponentialRampToValueAtTime(peak, start + 0.012)
      g.gain.exponentialRampToValueAtTime(0.0001, start + tail)
      o.connect(g).connect(master)
      o.start(start)
      o.stop(start + tail + 0.05)
    }
  }

  // Air: band-passed noise that sweeps upward, like a page lifting
  const air = ac.createBufferSource()
  air.buffer = noiseBuffer(ac, 0.7, 1.5)
  const band = ac.createBiquadFilter()
  band.type = 'bandpass'
  band.Q.value = 0.8
  band.frequency.setValueAtTime(500, t)
  band.frequency.exponentialRampToValueAtTime(3200, t + 0.6)
  const airGain = ac.createGain()
  airGain.gain.setValueAtTime(0.0001, t)
  airGain.gain.exponentialRampToValueAtTime(0.22, t + 0.18)
  airGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)
  air.connect(band).connect(airGain).connect(master)
  air.start(t)
}
