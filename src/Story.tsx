import { useState } from 'react'
import { S } from './lib'
import { EDUCATION, EXPERIENCE, PROJECTS, ACHIEVEMENTS, RUNNING, PLACEHOLDER } from './data'

export default function Story({ s, onContinue, onSkip, links }: { s: S; onContinue: () => void; onSkip: () => void; links: Record<string, string> }) {
  const [open, setOpen] = useState(0)
  const hero = s.p < 0.03
  const show = s.stop > 0 && s.pt > 0.3
  return (<>
    <section className="hero" style={{ opacity: Math.max(0, 1 - s.p / 0.02), pointerEvents: hero ? 'auto' : 'none' }} aria-hidden={!hero}>
      <h1>JAINAM BHEDA</h1>
      <p className="role">Software Engineer | Backend Developer | Runner | Builder</p>
      <h2>DON'T JUST SCROLL.<br />RUN THROUGH MY JOURNEY.</h2>
      <p className="sub">10 kilometres. One journey. A story of engineering, curiosity, persistence and everything in between.</p>
      <div className="btns"><button className="primary" onClick={onSkip}>EXPLORE MY PORTFOLIO</button>
        <a href={links.resume}>View Resume</a><a href={links.linkedin}>LinkedIn</a><a href={links.github}>GitHub</a></div>
    </section>

    {show && s.stop < 5 && (<aside className={'panel k' + s.stop} style={{ opacity: Math.min(1, (s.pt - 0.3) / 0.2) }}>
      {s.stop === 1 && (<><h3>Education</h3><h4>{EDUCATION.college}</h4><p>{EDUCATION.degree}</p><p>{EDUCATION.honors}</p>
        <div className="stats"><div><b>{EDUCATION.cgpa}</b><span>CGPA</span></div><div><b>{EDUCATION.year}</b><span>Graduation</span></div></div>
        <ul>{EDUCATION.extras.map(x => <li key={x}>{x}</li>)}</ul></>)}
      {s.stop === 2 && (<><h3>Experience</h3>{EXPERIENCE.map(e => (<div className="job" key={e.company}><h4>{e.company}</h4><p className="muted">{e.role}{e.domain && ` · ${e.domain}`}</p>
        <div className="tags">{e.tech.map(t => <span key={t}>{t}</span>)}</div><ul>{e.points.map(p => <li key={p}>{p}</li>)}</ul></div>))}</>)}
      {s.stop === 3 && (<><h3>Projects</h3>{PROJECTS.map((p, i) => (<button key={p.title} className={'proj' + (open === i ? ' open' : '')} onClick={() => setOpen(i)}>
        <b>{p.title}</b>{open === i && (<><span>{p.desc}</span><span className="tags">{p.tech.map(t => <em key={t}>{t}</em>)}</span>
          <span className="muted">GitHub: {p.github === PLACEHOLDER ? '[link coming]' : p.github} · Live demo: [link coming]</span></>)}</button>))}</>)}
      {s.stop === 4 && (<><h3>Beyond the code, there's a person who keeps moving.</h3>
        <ul>{ACHIEVEMENTS.map(a => <li key={a}>{a}</li>)}</ul>
        <p>Running is an important part of my life. It teaches me:</p><div className="tags">{RUNNING.map(r => <span key={r}>{r}</span>)}</div></>)}
    </aside>)}

    {s.stop > 0 && s.stop < 5 && s.pt > 0.8 && <button className="continue" onClick={onContinue}>CONTINUE RUNNING ▸</button>}

    {s.stop === 5 && s.pt > 0.3 && (<section className="finish" style={{ opacity: Math.min(1, (s.pt - 0.3) / 0.3) }}>
      <h2>YOU MADE IT!</h2><p className="sub">Every finish line is a new starting point.</p>
      <p className="big">THE JOURNEY DOESN'T END HERE.</p><p className="amber mantra">MORE TO JOG. MORE TO BUILD. MORE TO COME.</p>
      <div className="btns"><a className="primary" href={links.resume} download>DOWNLOAD RESUME</a><a href={links.linkedin}>CONNECT ON LINKEDIN</a><a href={links.github}>VIEW GITHUB</a><a href={links.email}>SAY HELLO</a></div>
      <p className="muted">Thanks for running through my journey.</p>
    </section>)}
  </>)
}
