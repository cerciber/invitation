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

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const isTimeUp = timeLeft.totalMs <= 0
  const dateLabel = formatWeddingDateLabel(targetDate, iso)

  const Unit = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="rounded-xl bg-white/95 border border-white/60 shadow-sm px-4 py-3 sm:px-5 sm:py-4">
        <span className="text-4xl sm:text-5xl font-bold text-emerald-900 tabular-nums font-serif">{value}</span>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-wide text-white/90">{label}</span>
    </div>
  )

  return (
    <section
      className="h-screen overflow-hidden relative flex items-center justify-center px-5 py-6"
      style={{
        background:
          'radial-gradient(120% 100% at 0% 0%, #2d5016 0%, #1f3a10 40%, #0f2508 100%)',
      }}
    >
      {/* Capa de textura sutil para más diseño y contraste con la tarjeta */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 8px)',
        }}
        aria-hidden
      />
      {/* Brillos suaves para profundidad */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(167,201,87,0.25), rgba(167,201,87,0))' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-20 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(212,224,155,0.22), rgba(212,224,155,0))' }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-4xl h-full flex flex-col items-center justify-center">
        {/* Panel “glass” para jerarquía visual */}
        <div className="w-full rounded-2xl px-5 sm:px-8 py-6 border backdrop-blur-md shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)',
            borderColor: 'rgba(255,255,255,0.25)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.35)'
          }}
        >
          {/* Encabezado */}
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">¿Cúando?</h3>
            <p className="mt-2 text-white/90 font-serif capitalize text-sm sm:text-base leading-tight break-words">{dateLabel}</p>
          </div>

          {/* Días destacados */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-baseline gap-2 rounded-full bg-white/95 border border-white/70 px-4 py-2">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-900 tabular-nums font-serif">{timeLeft.days}</span>
              <span className="text-xs sm:text-sm uppercase tracking-wide text-emerald-800">Días</span>
            </div>
          </div>

          {/* Hora:minuto:segundo juntos */}
          <div className="mt-6 sm:mt-8 flex items-end justify-center gap-3 sm:gap-4">
            <Unit value={timeLeft.hours.toString().padStart(2, '0')} label="Horas" />
            <div className="pb-5 sm:pb-6 text-white/90 text-3xl sm:text-4xl font-semibold">:</div>
            <Unit value={timeLeft.minutes.toString().padStart(2, '0')} label="Minutos" />
            <div className="pb-5 sm:pb-6 text-white/90 text-3xl sm:text-4xl font-semibold">:</div>
            <Unit value={timeLeft.seconds.toString().padStart(2, '0')} label="Segundos" />
          </div>

          {/* Nota */}
          <p className="mt-6 sm:mt-8 text-center text-white/85 text-xs sm:text-sm">Guarda la fecha y prepárate para una celebración inolvidable.</p>
        </div>
      </div>
    </section>
  )
}

export default CountdownSection


