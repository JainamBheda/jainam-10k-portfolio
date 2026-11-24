import { EDUCATION, EXPERIENCE, PROJECTS, ACHIEVEMENTS, SKILLS, LINKS, RUNNING } from './data'

export default function Formal({ onReturn }: { onReturn: () => void }) {
  return (<div className="formal">
    <nav><b>Jainam Bheda</b><div>{['about', 'education', 'experience', 'skills', 'projects', 'achievements', 'contact'].map(i => <a key={i} href={'#' + i}>{i[0].toUpperCase() + i.slice(1)}</a>)}</div>
      <button className="skip" onClick={onReturn}>RETURN TO THE 10K JOURNEY</button></nav>
    <main>
      <section id="about"><h1>Jainam Bheda</h1><p className="role">Software Engineer | Backend Developer | Runner | Builder</p>
        <p>Backend engineer working in fintech integrations, with a growing interest in AI and product development. Outside of code, I run: it keeps me consistent, patient and focused on the long term.</p>
        <div className="btns"><a className="primary" href={LINKS.resume} download>Download resume</a><a href={LINKS.linkedin}>LinkedIn</a><a href={LINKS.github}>GitHub</a><a href={LINKS.email}>Email</a></div></section>
      <section id="education"><h2>Education</h2><h4>{EDUCATION.college}</h4><p>{EDUCATION.degree} · {EDUCATION.honors}</p><p>CGPA {EDUCATION.cgpa} · Graduating {EDUCATION.year}</p></section>
      <section id="experience"><h2>Work experience</h2>{EXPERIENCE.map(e => <div className="job" key={e.company}><h4>{e.company}</h4><p className="muted">{e.role}{e.domain && ` · ${e.domain}`}</p>
        <ul>{e.points.map(p => <li key={p}>{p}</li>)}</ul><div className="tags">{e.tech.map(t => <span key={t}>{t}</span>)}</div></div>)}</section>
      <section id="skills"><h2>Technical skills</h2><div className="tags">{SKILLS.map(t => <span key={t}>{t}</span>)}</div></section>
      <section id="projects"><h2>Projects</h2><div className="grid">{PROJECTS.map(p => <article key={p.title}><h4>{p.title}</h4><p>{p.desc}</p>
        <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div><p className="muted">GitHub: [link coming] · Demo: [link coming]</p></article>)}</div></section>
      <section id="achievements"><h2>Achievements</h2><ul>{ACHIEVEMENTS.map(a => <li key={a}>{a}</li>)}</ul><p className="muted">Running teaches: {RUNNING.join(', ')}.</p></section>
      <section id="contact"><h2>Contact</h2><p className="amber mantra">MORE TO JOG. MORE TO BUILD. MORE TO COME.</p>
        <div className="btns"><a className="primary" href={LINKS.email}>Say hello</a><a href={LINKS.linkedin}>LinkedIn</a><a href={LINKS.github}>GitHub</a><a href={LINKS.resume} download>Resume</a></div></section>
    </main></div>)
}
