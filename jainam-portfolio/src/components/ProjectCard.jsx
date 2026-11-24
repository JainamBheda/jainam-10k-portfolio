import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const ProjectCard = ({ title, desc, tech, github }) => (
  <motion.div variants={cardVariants} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between card-glass">
    <div>
      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{desc}</p>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">{t}</span>
        ))}
      </div>
      <a href={github} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-blue-600 dark:hover:text-blue-400">
        <FaGithub />
      </a>
    </div>
  </motion.div>
)

export default ProjectCard
