// Scroll progress (0..1) -> journey state. Pure function: scrolling back always rewinds exactly.
const W0 = 0.03, W = 0.07, L = (1 - W0 - 5 * W) / 5
export type S = { p: number; d: number; sp: number; run: boolean; stop: number; pt: number; e: number }
export const pauseStart = (k: number) => W0 + k * L + (k - 1) * W
export const pauseEnd = (k: number) => W0 + k * (L + W)
export function sample(p: number): S {
  p = Math.min(1, Math.max(0, p))
  if (p < W0) return { p, d: 0, sp: 0, run: false, stop: 0, pt: p / W0, e: 100 }
  for (let k = 1; k <= 5; k++) {
    const rs = W0 + (k - 1) * (L + W), re = rs + L
    if (p <= re) {
      const t = (p - rs) / L, s = t * t * (3 - 2 * t)
      return { p, d: (k - 1) * 2 + 2 * s, sp: Math.min(1, Math.sin(Math.PI * t) * 1.8), run: true, stop: -1, pt: t, e: 100 - 60 * t }
    }
    if (p <= re + W || k === 5) {
      const pt = Math.min(1, (p - re) / W), r = Math.min(1, pt / 0.5)
      return { p, d: k * 2, sp: 0, run: false, stop: k, pt, e: 40 + 60 * r * r * (3 - 2 * r) }
    }
  }
  return { p, d: 10, sp: 0, run: false, stop: 5, pt: 1, e: 100 }
}
export const pw = (pts: number[][], x: number) => {
  if (x <= pts[0][0]) return pts[0][1]
  for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const [a, b] = [pts[i - 1], pts[i]]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]) }
  return pts[pts.length - 1][1]
}
export const mod = (a: number, n: number) => ((a % n) + n) % n
