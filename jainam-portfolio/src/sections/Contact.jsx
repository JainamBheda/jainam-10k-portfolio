import React from 'react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import SectionTitle from '../components/SectionTitle'

const Contact = () => {
  return (
    <section>
      <SectionTitle>Get In Touch</SectionTitle>
      <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
        I'm currently looking for new opportunities! Whether you have a question or just want to say hi, feel free to reach out.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <a
          href="mailto:jainambheda@gmail.com"
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform card-glass"
        >
          <FaEnvelope className="text-2xl text-blue-600 dark:text-blue-400" />
          <span className="text-lg font-medium">jainambheda@gmail.com</span>
        </a>
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg card-glass">
          <FaPhone className="text-2xl text-blue-600 dark:text-blue-400" />
          <span className="text-lg font-medium">+91 7020013740</span>
        </div>
      </div>
    </section>
  )
}

export default Contact
