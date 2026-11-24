import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { sample, pauseEnd, S } from './lib'
import { LINKS } from './data'
import HUD from './HUD'
import Story from './Story'
import Formal from './Formal'
const Scene = lazy(() => import('./Scene'))

const hasWebGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [mode, setMode] = useState<'game' | 'formal'>(reduced() ? 'formal' : 'game')
  const [fade, setFade] = useState(false)
  const [s, setS] = useState<S>(sample(0))
  const [sound, setSound] = useState(false)
  const S = useRef<S>(s)
  const gl = useRef(hasWebGL())
  const audio = useRef<AudioContext | null>(null)

  const swap = useCallback((m: 'game' | 'formal') => {
    setFade(true)
    setTimeout(() => { setMode(m); window.scrollTo(0, 0); S.current = sample(0); setS(S.current); setFade(false) }, 350)
  }, [])

  useEffect(() => {
    if (mode !== 'game') return
    let raf = 0
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight
      S.current = sample(max > 0 ? scrollY / max : 0); setS(S.current) }) }
    addEventListener('scroll', on, { passive: true }); on()
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [mode])

  // Optional soft footsteps. Only starts after the visitor taps the sound toggle (browser autoplay rules).
  useEffect(() => {
    if (!sound || mode !== 'game') return
    const id = setInterval(() => {
      const c = audio.current, st = S.current; if (!c || !st.run || st.sp < 0.3) return
      const o = c.createOscillator(), g = c.createGain(); o.frequency.value = 70; o.type = 'triangle'
      g.gain.setValueAtTime(0.05 * st.sp, c.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.09)
      o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + 0.1)
    }, 300)
    return () => clearInterval(id)
  }, [sound, mode])
  const toggleSound = () => { if (!audio.current) audio.current = new AudioContext(); setSound(v => !v) }

  const cont = () => {
    const max = document.documentElement.scrollHeight - innerHeight
    scrollTo({ top: Math.min(max, (pauseEnd(Math.max(1, S.current.stop)) + 0.004) * max), behavior: reduced() ? 'auto' : 'smooth' })
  }

  return (<div className={fade ? 'swap out' : 'swap'}>
    {mode === 'formal' ? <Formal onReturn={() => swap('game')} /> : (<>
      <div className="track" />
      <div className="stage">
        {gl.current ? <Suspense fallback={<div className="fallback" />}><Scene S={S} /></Suspense> : <div className="fallback" />}
      </div>
      <HUD s={s} sound={sound} onSound={toggleSound} onSkip={() => swap('formal')} />
      <Story s={s} onContinue={cont} onSkip={() => swap('formal')} links={LINKS} />
    </>)}
  </div>)
}
