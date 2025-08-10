'use client'

import { useEffect, useMemo, useState } from 'react'
import { getWeddingDate, getWeddingDateISO } from '@/data/event'

interface TimeLeftState {
  totalMs: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: Date): TimeLeftState {
  const now = new Date()
  const diffMs = Math.max(0, targetDate.getTime() - now.getTime())

  const secondsTotal = Math.floor(diffMs / 1000)
  const days = Math.floor(secondsTotal / (60 * 60 * 24))
  const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((secondsTotal % (60 * 60)) / 60)
  const seconds = Math.floor(secondsTotal % 60)

  return { totalMs: diffMs, days, hours, minutes, seconds }
}

function formatWeddingDateLabel(date: Date, iso: string): string {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const base = formatter.format(date)
  const match = iso.match(/([+-]\d{2}:\d{2}|Z)$/)
  const offset = match ? match[1] : ''
  const offsetLabel = offset === 'Z' ? 'GMT' : offset ? `GMT${offset}` : ''
  return base
}

export function CountdownSection() {
  const targetDate = useMemo(() => getWeddingDate(), [])
  const iso = useMemo(() => getWeddingDateISO(), [])
  const [timeLeft, setTimeLeft] = useState<TimeLeftState>(() => calculateTimeLeft(targetDate))
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const isTimeUp = hasMounted ? timeLeft.totalMs <= 0 : false
  const dateLabel = hasMounted ? formatWeddingDateLabel(targetDate, iso) : ''
  const hh = (hasMounted ? timeLeft.hours : 0).toString().padStart(2, '0')
  const mm = (hasMounted ? timeLeft.minutes : 0).toString().padStart(2, '0')
  const ss = (hasMounted ? timeLeft.seconds : 0).toString().padStart(2, '0')
  const daySeconds = 24 * 60 * 60
  const daySecondsLeft = (hasMounted ? timeLeft.hours : 0) * 3600 + (hasMounted ? timeLeft.minutes : 0) * 60 + (hasMounted ? timeLeft.seconds : 0)
  const dayProgress = hasMounted ? Math.max(0, Math.min(1, 1 - daySecondsLeft / daySeconds)) : 0

  // Diseño sin tarjetas: tipografía protagonista y separadores sutiles

  return (
    <section
      className="relative px-5 py-10 overflow-hidden overscroll-contain"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Curva superior suave */}
      <div className="absolute top-0 left-0 w-full" aria-hidden>
        <svg className="w-full h-10 sm:h-14" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,80 C240,30 480,30 720,60 C960,85 1200,70 1440,40 L1440,0 L0,0 Z" fill="#eaf4e1" />
        </svg>
      </div>
      {/* Fusión con la sección anterior para evitar borde recto visible */}
      <div className="pointer-events-none absolute -top-10 left-0 w-full h-12 z-10 bg-gradient-to-t from-[#eaf4e1] via-[#eaf4e1]/80 to-transparent" />
      {/* Blobs sutiles que rompen la rectitud visual en la unión */}
      <div
        className="pointer-events-none absolute -top-14 -left-16 w-40 h-40 rounded-full blur-2xl z-10"
        style={{ background: 'radial-gradient(closest-side, rgba(167,201,87,0.22), rgba(167,201,87,0))' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl z-10"
        style={{ background: 'radial-gradient(closest-side, rgba(212,224,155,0.18), rgba(212,224,155,0))' }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-900">¿Cúando?</h3>
          <p className="mt-1.5 text-emerald-800/90 font-serif capitalize text-sm sm:text-base leading-tight break-words" suppressHydrationWarning>
            {dateLabel || ' '}
          </p>
        </div>

        {/* Divisor floral sutil (coincide con la carta) */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="floral-divider" />
        </div>

        {/* HH:MM:SS grande */}
        <div className="mt-5 flex items-end justify-center gap-2 sm:gap-3">
          <span suppressHydrationWarning className="text-5xl sm:text-6xl font-semibold text-[#2d5016] tabular-nums font-mono">{hh}</span>
          <span className="pb-2 sm:pb-2.5 text-[#6b8e23] text-4xl sm:text-5xl">:</span>
          <span suppressHydrationWarning className="text-5xl sm:text-6xl font-semibold text-[#2d5016] tabular-nums font-mono">{mm}</span>
          <span className="pb-2 sm:pb-2.5 text-[#6b8e23] text-4xl sm:text-5xl">:</span>
          <span suppressHydrationWarning className="text-5xl sm:text-6xl font-semibold text-[#2d5016] tabular-nums font-mono">{ss}</span>
        </div>
        <div className="mt-2 flex justify-center gap-8 text-[11px] sm:text-xs tracking-wide uppercase text-emerald-800">
          <span>Horas</span><span>Minutos</span><span>Segundos</span>
        </div>

        {/* Días en texto */}
        <p className="mt-4 text-center text-emerald-900/90 text-sm sm:text-base">
          Faltan <span suppressHydrationWarning className="font-semibold tabular-nums">{hasMounted ? timeLeft.days : 0}</span> días
        </p>

        {/* Barra de progreso del día en colores de la carta */}
        <div className="mt-5 max-w-xl mx-auto">
          <div className="h-2 rounded-full bg-[#d4e09b] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.round(dayProgress * 100)}%`, background: '#6b8e23' }}
              aria-hidden
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] sm:text-xs text-emerald-700">
            <span>Comienzo del día</span>
            <span suppressHydrationWarning>{`${Math.round(dayProgress * 100)}%`}</span>
            <span>Fin del día</span>
          </div>
        </div>

        {/* Nota */}
        <p className="mt-6 text-center text-emerald-800/80 text-xs sm:text-sm">Guarda la fecha y prepárate para una celebración inolvidable.</p>
      </div>
    </section>
  )
}

export default CountdownSection


