import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { motion } from 'framer-motion'

const projects = [
  {
    title: "Vision Text: TTS System for Blind Individual",
    desc: "Engineered a real-time TTS system using ESP32-CAM, Node.js, and Tesseract.js to capture text and convert it to audio. Achieved 90% OCR accuracy.",
    tech: ["React.js", "Node.js", "Tesseract.js", "ESP32-CAM", "IoT"],
    github: "YOUR_GITHUB_LINK_FOR_VISION_TEXT"
  },
  {
    title: "Expense Tracker and Financial Dashboard",
    desc: "Created a full-stack personal finance system with secure JWT authentication and password hashing. Optimized backend APIs, reducing data retrieval time by 50%.",
    tech: ["MySQL", "Express.js", "React.js", "Node.js", "TailwindCSS", "JWT"],
    github: "YOUR_GITHUB_LINK_FOR_EXPENSE_TRACKER"
  },
  {
    title: "Berkshire Hathaway RAG",
    desc: "Designed a RAG system integrating Gemini LLM with real-time data from a vector DB (pgvector). Built a modular pipeline achieving 75% accuracy.",
    tech: ["Python", "Mastra", "Node.js", "PostgreSQL", "pgvector", "Gemini LLM"],
    github: "YOUR_GITHUB_LINK_FOR_RAG"
  }
]

const Projects = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
