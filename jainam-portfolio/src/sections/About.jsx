import React from 'react'
import SectionTitle from '../components/SectionTitle'

const skills = {
  Languages: ["Java", "JavaScript", "Python", "C", "C++", "ASM"],
  Frontend: ["HTML", "CSS", "React.js", "Tailwind CSS", "npm", "nvm"],
  Backend: ["Node.js", "Express.js", "Spring Framework", "WebSockets"],
  Databases: ["MongoDB", "MySQL", "PostgreSQL", "JDBC"],
  Tools: ["Git", "GitHub", "Docker"]
}

const About = () => {
  return (
    <section>
      <SectionTitle>About Me</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            Hello! I'm Jainam Bheda, an Electronics and Telecommunications Engineering student (with an Honor in AIML) at Dwarkadas J. Sanghvi College of Engineering, expecting to graduate in June 2026.
          </p>
          <p className="text-lg leading-relaxed">
            I'm passionate about building scalable backend systems and AI-driven applications. I have hands-on experience in full-stack development, real-time communication systems, and machine learning integration.
          </p>
        </div>
        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
