import React from 'react'

const SectionTitle = ({ children }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold">{children}</h2>
    <div className="h-1 w-24 bg-blue-600 dark:bg-blue-400 mx-auto mt-3 rounded" />
  </div>
)

export default SectionTitle
