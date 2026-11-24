import { S } from './lib'
import { CHECKPOINTS } from './data'

export default function HUD({ s, sound, onSound, onSkip }: { s: S; sound: boolean; onSound: () => void; onSkip: () => void }) {
  const cp = s.stop >= 0 ? CHECKPOINTS[s.stop] : CHECKPOINTS[Math.min(5, Math.floor(s.d / 2) + 1)]
  const refilled = s.stop > 0 && s.pt > 0.8
  const drinking = s.stop > 0 && s.pt > 0.1 && s.pt <= 0.8
  const km = Math.min(10, s.d).toFixed(1)
  return (<>
    <header className="hud top">
      <div className="watch" aria-label="Run status">
        <div className="row"><b className="amber big">{km}</b><span>/ 10.0 KM</span></div>
        <div className="bar"><i style={{ width: `${s.d * 10}%` }} /></div>
        <div className="small">Next: {s.stop >= 0 && s.stop < 5 ? CHECKPOINTS[s.stop + 1].name : s.stop === 5 ? 'Done' : cp.name}</div>
        <div className="row small"><span>ENERGY</span><b className="amber">{Math.round(s.e)}%</b></div>
        <div className={'bar energy' + (s.e < 50 ? ' low' : '')}><i style={{ width: `${s.e}%` }} /></div>
      </div>
      <div className="actions">
        <button className="ghost" onClick={onSound} aria-pressed={sound}>{sound ? 'Sound on' : 'Sound off'}</button>
        <button className="skip" onClick={onSkip}>SKIP JOURNEY</button>
      </div>
    </header>
    <nav className="route" aria-label="Route">
      <div className="line"><i style={{ width: `${s.d * 10}%` }} /></div>
      {CHECKPOINTS.map((c, i) => <span key={c.km} className={'dot' + (s.d >= c.km - 0.01 ? ' on' : '')} style={{ left: `${c.km * 10}%` }}><em>{c.km}K</em></span>)}
    </nav>
    {s.p < 0.012 && <div className="scrollcue"><span>SCROLL TO RUN</span><i /></div>}
    {s.stop > 0 && s.pt > 0.02 && <div className="pit"><div className="pitname">{CHECKPOINTS[s.stop].pit}</div>
      <div className="pitmsg">{refilled ? 'ENERGY REFILLED! Stay hydrated. Keep moving.' : drinking ? (s.pt < 0.5 ? 'Water…' : 'Electrolytes…') : 'Slowing down…'}</div></div>}
  </>)
}
