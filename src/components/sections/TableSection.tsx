'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getGuestByCode } from '@/data/guests'

interface TableConfig {
  id: number
  cx: number
  cy: number
  shape: 'round' | 'square' | 'rect'
  size: number
  chairs: number
}

const TABLE_SIZE = 22
const CHAIRS = 10

const TABLES: TableConfig[] = [
  { id: 1, cx: 108, cy: 98,  shape: 'round',  size: TABLE_SIZE, chairs: CHAIRS },
  { id: 2, cx: 40,  cy: 195, shape: 'round',  size: TABLE_SIZE, chairs: CHAIRS },
  { id: 3, cx: 125, cy: 195, shape: 'square', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 4, cx: 105, cy: 290, shape: 'round',  size: TABLE_SIZE, chairs: CHAIRS },
  { id: 5, cx: 420, cy: 98,  shape: 'round',  size: TABLE_SIZE, chairs: CHAIRS },
  { id: 6, cx: 405, cy: 195, shape: 'square', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 7, cx: 400, cy: 290, shape: 'round',  size: TABLE_SIZE, chairs: CHAIRS },
  { id: 8, cx: 490, cy: 195,  shape: 'round',  size: TABLE_SIZE, chairs: CHAIRS },
  { id: 9, cx: 490, cy: 290, shape: 'square', size: TABLE_SIZE, chairs: CHAIRS },
]

const HL = '#a7c957'
const BASE = '#2d5016'

function getChairPositions(table: TableConfig): { x: number; y: number; angle: number }[] {
  if (table.shape === 'square') {
    const d = table.size + 7
    return [
      { x: -15, y: -d, angle: 0 },
      { x: 0, y: -d, angle: 0 },
      { x: 15, y: -d, angle: 0 },
      { x: d, y: -10, angle: 90 },
      { x: d, y: 10, angle: 90 },
      { x: -15, y: d, angle: 180 },
      { x: 0, y: d, angle: 180 },
      { x: 15, y: d, angle: 180 },
      { x: -d, y: -10, angle: -90 },
      { x: -d, y: 10, angle: -90 },
    ]
  }
  const dist = table.size + 11
  return Array.from({ length: table.chairs }, (_, i) => {
    const angle = (i * 360) / table.chairs - 90
    const rad = (angle * Math.PI) / 180
    return {
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      angle: angle + 90,
    }
  })
}

function TableSvg({ table, isHighlighted }: { table: TableConfig; isHighlighted: boolean }) {
  const chairs = getChairPositions(table)

  return (
    <g>
      {isHighlighted && (
        <circle cx={table.cx} cy={table.cy} r={table.size + 20} fill={HL} opacity={0.2}>
          <animate attributeName="opacity" values="0.14;0.26;0.14" dur="2.5s" repeatCount="indefinite" />
        </circle>
      )}

      {chairs.map((c, i) => (
        <rect
          key={i}
          x={-2.5}
          y={-3.5}
          width={5}
          height={7}
          rx={1.2}
          fill={isHighlighted ? HL : BASE}
          opacity={isHighlighted ? 0.85 : 0.28}
          transform={`translate(${table.cx + c.x}, ${table.cy + c.y}) rotate(${c.angle})`}
        />
      ))}

      {table.shape === 'round' ? (
        <circle
          cx={table.cx}
          cy={table.cy}
          r={table.size}
          fill={isHighlighted ? BASE : 'white'}
          stroke={isHighlighted ? HL : BASE}
          strokeWidth={isHighlighted ? 2.5 : 1.5}
          opacity={isHighlighted ? 1 : 0.55}
        />
      ) : table.shape === 'rect' ? (
        <rect
          x={table.cx - table.size * 1.8}
          y={table.cy - table.size * 0.85}
          width={table.size * 3.6}
          height={table.size * 1.7}
          rx={3}
          fill={isHighlighted ? BASE : 'white'}
          stroke={isHighlighted ? HL : BASE}
          strokeWidth={isHighlighted ? 2.5 : 1.5}
          opacity={isHighlighted ? 1 : 0.55}
        />
      ) : (
        <rect
          x={table.cx - table.size}
          y={table.cy - table.size}
          width={table.size * 2}
          height={table.size * 2}
          rx={3}
          fill={isHighlighted ? BASE : 'white'}
          stroke={isHighlighted ? HL : BASE}
          strokeWidth={isHighlighted ? 2.5 : 1.5}
          opacity={isHighlighted ? 1 : 0.55}
        />
      )}

      <text
        x={table.cx}
        y={table.cy + 4.5}
        textAnchor="middle"
        fontSize={isHighlighted ? 14 : 12}
        fontWeight="bold"
        fill={isHighlighted ? 'white' : BASE}
        opacity={isHighlighted ? 1 : 0.7}
      >
        {table.id}
      </text>
    </g>
  )
}

function MesaPrincipalChairs() {
  return (
    <>
      <rect x={252} y={65} width={6} height={8} rx={1.2} fill={BASE} opacity={0.4} />
      <rect x={272} y={65} width={6} height={8} rx={1.2} fill={BASE} opacity={0.4} />
    </>
  )
}

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
            <svg
              viewBox="0 0 530 390"
              className="w-full h-auto"
              role="img"
              aria-label={
                hasAssignments
                  ? `Croquis del salón. Mesas asignadas: ${assignedTables.join(', ')}`
                  : 'Croquis del salón sin mesas asignadas'
              }
            >
              {/* TARIMA */}
              <rect x="165" y="3" width="200" height="24" rx="2" fill="rgba(45,80,22,0.06)" stroke={BASE} strokeWidth="1.8" opacity={0.7} />
              <text x="265" y="18" textAnchor="middle" fontSize="12" fill={BASE} opacity={0.85} fontWeight="700" letterSpacing="2">TARIMA</text>

              {/* BAR */}
              <rect x="190" y="362" width="150" height="24" rx="2" fill="rgba(45,80,22,0.06)" stroke={BASE} strokeWidth="1.8" opacity={0.7} />
              <text x="265" y="377" textAnchor="middle" fontSize="12" fill={BASE} opacity={0.85} fontWeight="700" letterSpacing="2">BAR</text>

              {/* PISTA DE BAILE */}
              <rect x="180" y="125" width="170" height="165" rx="3" fill="rgba(167,201,87,0.08)" stroke={BASE} strokeWidth="2" opacity={0.6} strokeDasharray="5 3" />
              <text x="265" y="198" textAnchor="middle" fontSize="11" fill={BASE} opacity={0.7} fontWeight="600" letterSpacing="0.5">PISTA DE BAILE</text>
              <text x="252" y="218" textAnchor="middle" fontSize="20" opacity={0.5}>💃</text>
              <text x="278" y="218" textAnchor="middle" fontSize="20" opacity={0.5}>🕺</text>

              {/* Mesa principal */}
              <rect x="215" y="74" width="100" height="18" rx="2" fill="rgba(45,80,22,0.04)" stroke={BASE} strokeWidth="1.5" opacity={0.65} />
              <text x="265" y="86" textAnchor="middle" fontSize="10" fill={BASE} opacity={0.8} fontStyle="italic" fontWeight="600">Mesa principal</text>
              <MesaPrincipalChairs />

              {/* Guest tables */}
              {TABLES.map((table) => (
                <TableSvg
                  key={table.id}
                  table={table}
                  isHighlighted={assignedTableSet.has(table.id)}
                />
              ))}
            </svg>

            {hasAssignments && (
              <div className="mt-3 rounded-lg border border-[#2d5016]/15 bg-[#f7fbf0] px-3 py-2">
                <p className="text-center text-xs sm:text-sm font-semibold text-[#2d5016]">
                  Asignación de mesas
                </p>
                <div className="mt-1.5 space-y-1">
                  {tableAssignments.map((item) => (
                    <p key={`${item.name}-${item.table}`} className="text-xs sm:text-sm text-[#2d5016]/80 text-center">
                      {item.name} - Mesa {item.table}
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
