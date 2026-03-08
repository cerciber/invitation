'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getGuestByCode } from '@/data/guests'
import { TableFloorPlan } from '@/components/TableFloorPlan'

export function TableSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  const searchParams = useSearchParams()
  const code = typeof searchParams.get('codigo') === 'string' ? searchParams.get('codigo') : undefined
  const guestInfo = code ? getGuestByCode(code) : null
  const isDog = guestInfo?.dog || false
  const assignedTables = Array.isArray(guestInfo?.tables) ? guestInfo.tables.filter((t) => Number.isInteger(t)) : []
  const assignedNames = Array.isArray(guestInfo?.names) ? guestInfo.names.filter((name) => name?.trim()) : []
  const assignedTableSet = new Set(assignedTables)
  const hasAssignments = assignedTables.length > 0 && assignedNames.length > 0
  const tableAssignments = hasAssignments
    ? assignedTables.map((table, index) => ({
        table,
        name: assignedNames[index] || `Invitado ${index + 1}`,
      }))
    : []

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.1),
      { root: null, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  if (isDog || !hasAssignments) return null

  return (
    <section className="relative py-8 sm:py-10 bg-gradient-to-b from-white via-green-50/40 to-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(1200px 400px at 50% -10%, rgba(167,201,87,0.10), transparent 60%), radial-gradient(800px 300px at 50% 110%, rgba(167,201,87,0.08), transparent 60%)',
        }}
      />

      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 scroll-reveal ${isInView ? 'is-visible' : 'is-hidden'}`}
      >
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#2d5016]">
            Tu mesa
          </h3>
          <p className="mt-1.5 text-[#6b8e23] font-serif text-sm sm:text-base">
            Ubicación de tu asiento
          </p>
        </div>

        <div className="mt-4 max-w-md mx-auto">
          <div className="floral-divider" />
        </div>

        <div className="mt-6 flex justify-center">
          <div className="rounded-xl border border-emerald-900/10 bg-white/80 backdrop-blur p-3 sm:p-5 shadow-sm w-full max-w-lg">
            <TableFloorPlan highlightedTables={Array.from(assignedTableSet)} />

            {hasAssignments && (
              <div className="mt-3 rounded-lg border border-[#2d5016]/15 bg-[#f7fbf0] px-3 py-2">
                <p className="text-center text-xs sm:text-sm font-semibold text-[#2d5016]">
                  Asignación de mesas
                </p>
                <div className="mt-1.5 space-y-1">
                  {tableAssignments.map((item) => (
                    <p key={`${item.name}-${item.table}`} className="text-xs sm:text-sm text-[#2d5016]/80 text-center">
                      {item.name} - {item.table === 0 ? 'Mesa principal' : `Mesa ${item.table}`}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
