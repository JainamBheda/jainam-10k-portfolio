import React from 'react'
import SectionTitle from '../components/SectionTitle'

const Experience = () => {
  const exp = {
    company: "Grunder",
    role: "Backend Developer Intern",
    date: "Jan 2025 - Mar 2025",
    points: [
      "Designed and developed a real-time Chat Application enabling 100+ active users to exchange messages seamlessly with <200ms latency.",
      "Implemented auto-generation of Web Socket based messaging using Socket.io for synchronous communication.",
      "Developed 3+ features including message history, user status indicator, and group chat functionality.",
      "Built a modular Node.js/Express.js API with 5+ endpoints for authentication, message routing, and CRUD operations.",
      "Integrated a MySQL database for persistent storage of messages and user profiles."
    ],
    tech: ["React", "Node.js", "Express.js", "Socket.io", "MySQL"]
  }

  return (
    <section>
      <SectionTitle>Experience</SectionTitle>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 card-glass">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{exp.role}</h3>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{exp.date}</span>
        </div>
        <h4 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">{exp.company}</h4>
        <ul className="list-disc list-inside space-y-2 mb-4">
          {exp.points.map((point, index) => <li key={index}>{point}</li>)}
        </ul>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((skill) => (
            <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
