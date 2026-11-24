// Replace every "#" below with your real links. Nothing here is invented: placeholders are marked.
export const LINKS = { resume: '/resume.pdf', linkedin: '#', github: '#', email: 'mailto:your-email@example.com' }
export const PLACEHOLDER = '#'

export const CHECKPOINTS = [
  { km: 0, name: 'Starting Line', pit: '' },
  { km: 2, name: 'Education', pit: 'FIRST PIT STOP — REFUEL YOUR MIND' },
  { km: 4, name: 'Experience', pit: 'SECOND PIT STOP — EXPERIENCE BUILDS ENDURANCE' },
  { km: 6, name: 'Projects', pit: 'THIRD PIT STOP — REFUEL YOUR CREATIVITY' },
  { km: 8, name: 'Beyond the Code', pit: 'FOURTH PIT STOP — REMEMBER WHY YOU STARTED' },
  { km: 10, name: 'Finish Line', pit: 'FINISH LINE — ONE LAST SIP' },
]

export const EDUCATION = {
  college: 'Dwarkadas J. Sanghvi College of Engineering (DJSCE)',
  degree: 'B.Tech/B.E. Electronics and Telecommunication Engineering',
  honors: 'Honors in Artificial Intelligence and Machine Learning',
  cgpa: '9.27', year: '2026',
  extras: ['Technical committee member at DJSCE'],
}

export const EXPERIENCE = [
  { company: 'Veefin Solutions Ltd.', role: 'Software Developer / SDE',
    domain: 'Fintech, Supply Chain Finance and Banking Integrations',
    tech: ['Java 21', 'Spring Boot', 'MySQL', 'Hibernate', 'REST APIs', 'Kafka', 'JSONata', 'Postman'],
    points: ['Worked on Java Spring Boot integration services.', 'Contributed to five bank/NBFC integrations.',
      'Worked with banking APIs and data transformation.', 'Used JSONata to transform bank response JSON into standardized formats.',
      'Worked with Kafka topics and producer/consumer flows.', 'Performed API testing and database validation.'] },
  { company: 'Kantham.AI', role: 'Software Engineering Intern', domain: '',
    tech: ['Java', 'Node.js', 'Linux/Ubuntu', 'AWS EC2', 'SSH', 'Jenkins', 'OpenTelemetry'],
    points: ['Worked with Java and Node.js.', 'Worked in Linux and Ubuntu environments, AWS EC2 and SSH.', 'Used Jenkins.',
      'Repository scanning and code ingestion workflows.', 'VS Code plugin licensing-related work.', 'Explored OpenTelemetry.'] },
]

export const PROJECTS = [
  { title: 'Deepfake Detection System', desc: 'AI/ML-based deepfake detection that classifies real and manipulated video.', tech: ['EfficientNet', 'GRU'] },
  { title: 'VisionText', desc: 'ESP32-CAM-based OCR solution designed as an assistive reading tool.', tech: ['ESP32-CAM', 'Tesseract.js', 'Image processing'] },
  { title: 'Rate Limit Microservice', desc: 'Backend service for API rate limiting, built around a clear service architecture.', tech: ['Backend', 'API rate limiting'] },
  { title: 'Notification Service', desc: 'Backend notification architecture.', tech: ['Java', 'Backend'] },
  { title: 'Berkshire Hathaway RAG', desc: 'Retrieval-Augmented Generation project over Berkshire Hathaway documents.', tech: ['OpenAI API', 'Mastra', 'pgvector', 'Docker'] },
].map(p => ({ ...p, github: PLACEHOLDER, demo: PLACEHOLDER }))

export const ACHIEVEMENTS = ['500+ LeetCode problems solved', '5-star SQL on HackerRank', 'SQL50 achievement',
  'Technical committee involvement at DJSCE', 'Interest in backend engineering', 'Interest in AI and product development']
export const RUNNING = ['Consistency', 'Patience', 'Discipline', 'Resilience', 'Long-term thinking']
export const SKILLS = ['Java 21', 'Spring Boot', 'MySQL', 'Hibernate', 'REST APIs', 'Kafka', 'JSONata', 'Node.js', 'AWS EC2', 'Jenkins', 'Linux', 'Docker', 'pgvector', 'RAG / OpenAI API']
