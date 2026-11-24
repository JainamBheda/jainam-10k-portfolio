import React from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'

const Leetcode = () => {
  const leetcodeUsername = "YOUR_LEETCODE_USERNAME"
  const leetcodeProfileUrl = "YOUR_LEETCODE_PROFILE_URL"

  return (
    <section>
      <SectionTitle>LeetCode Stats</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center card-glass">
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">550+</h3>
          <p className="text-lg font-medium">Problems Solved</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center card-glass">
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">1500</h3>
          <p className="text-lg font-medium">Contest Rating</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center card-glass">
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">50+</h3>
          <p className="text-lg font-medium">MySQL Queries Solved</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <p className="text-center text-lg">My LeetCode Activity Heatmap:</p>
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Source%20Code%20Pro`}
          alt="LeetCode Stats Card"
          className="rounded-lg shadow-lg"
        />
        <a
          href={leetcodeProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          View My LeetCode Profile
        </a>
      </div>
    </section>
  )
}

export default Leetcode
