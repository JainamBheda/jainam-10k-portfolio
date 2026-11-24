import React from 'react'
import Navbar from './components/Navbar'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Leetcode from './sections/Leetcode'
import Contact from './sections/Contact'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <section id="about" className="py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <About />
          </motion.div>
        </section>

        <section id="experience" className="py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Experience />
          </motion.div>
        </section>

        <section id="projects" className="py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Projects />
          </motion.div>
        </section>

        <section id="leetcode" className="py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Leetcode />
          </motion.div>
        </section>

        <section id="contact" className="py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Contact />
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default App
