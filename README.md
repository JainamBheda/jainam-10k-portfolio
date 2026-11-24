# Jainam Bheda — The 10K Journey

Scroll-driven 3D running portfolio (Vite + React + TypeScript + React Three Fiber).
Scroll position maps to a pure `sample(p)` function (`src/lib.ts`), so scrolling back rewinds exactly and each checkpoint sits at a fixed scroll range.

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

Edit `src/data.ts` for content and replace every placeholder link. Put your resume at `public/resume.pdf`.
Deploy: import the repo in Vercel (framework preset: Vite).
