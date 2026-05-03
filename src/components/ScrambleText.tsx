import { useEffect, useRef, useCallback } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
}

const SCRAMBLE_DURATION_MS = 1000
const TICK_INTERVAL_MS = 30
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

export default function ScrambleText({ text, className = '' }: ScrambleTextProps) {
  const animRef = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const triggerScramble = useCallback(() => {
    const el = animRef.current
    if (!el) return

    // Clear any running animation
    if (intervalRef.current) clearInterval(intervalRef.current)

    const totalTicks = Math.floor(SCRAMBLE_DURATION_MS / TICK_INTERVAL_MS)
    const step = text.length / totalTicks
    let iteration = 0

    intervalRef.current = setInterval(() => {
      el.textContent = text
        .split('')
        .map((letter, index) => {
          if (letter === ' ') return ' '
          if (index < iteration) return letter
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')

      iteration += step

      if (iteration >= text.length) {
        el.textContent = text
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, TICK_INTERVAL_MS)
  }, [text])

  useEffect(() => {
    const delayTimer = setTimeout(triggerScramble, 500)

    const el = animRef.current
    el?.addEventListener('mouseenter', triggerScramble)

    return () => {
      clearTimeout(delayTimer)
      if (intervalRef.current) clearInterval(intervalRef.current)
      el?.removeEventListener('mouseenter', triggerScramble)
    }
  }, [text, triggerScramble])

  return (
    <h1 className={`${className} relative`}>
      {/* Invisible copy to reserve layout space */}
      <span className="invisible" aria-hidden="true">{text}</span>
      {/* Visible animated text layered on top */}
      <span ref={animRef} className="absolute inset-0">{text}</span>
    </h1>
  )
}
