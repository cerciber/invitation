interface TableConfig {
  id: number
  cx: number
  cy: number
  shape: 'round' | 'square'
  size: number
  chairs: number
}

const TABLE_SIZE = 22
const CHAIRS = 10
const HL = '#a7c957'
const BASE = '#2d5016'

const TABLES: TableConfig[] = [
  { id: 1, cx: 108, cy: 98, shape: 'round', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 2, cx: 125, cy: 195, shape: 'square', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 3, cx: 105, cy: 290, shape: 'round', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 4, cx: 40, cy: 195, shape: 'round', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 5, cx: 420, cy: 98, shape: 'round', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 6, cx: 405, cy: 195, shape: 'square', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 7, cx: 400, cy: 290, shape: 'round', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 8, cx: 490, cy: 195, shape: 'round', size: TABLE_SIZE, chairs: CHAIRS },
  { id: 9, cx: 490, cy: 290, shape: 'square', size: TABLE_SIZE, chairs: CHAIRS },
]

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

function MesaPrincipalChairs() {
  return (
    <>
      <rect x={252} y={65} width={6} height={8} rx={1.2} fill={BASE} opacity={0.4} />
      <rect x={272} y={65} width={6} height={8} rx={1.2} fill={BASE} opacity={0.4} />
    </>
  )
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

export function TableFloorPlan({ highlightedTables = [] }: { highlightedTables?: number[] }) {
  const highlightedSet = new Set(highlightedTables)
  const highlightMainTable = highlightedSet.has(0)
  const highlightedLabel = highlightedTables
    .map((table) => (table === 0 ? 'principal' : String(table)))
    .join(', ')

  return (
    <svg
      viewBox="0 0 530 390"
      className="w-full h-auto"
      role="img"
      aria-label={
        highlightedTables.length > 0
          ? `Croquis del salón. Mesas asignadas: ${highlightedLabel}`
          : 'Croquis del salón'
      }
    >
      <rect x="165" y="3" width="200" height="24" rx="2" fill="rgba(45,80,22,0.06)" stroke={BASE} strokeWidth="1.8" opacity={0.7} />
      <text x="265" y="18" textAnchor="middle" fontSize="12" fill={BASE} opacity={0.85} fontWeight="700" letterSpacing="2">TARIMA</text>

      <rect x="190" y="362" width="150" height="24" rx="2" fill="rgba(45,80,22,0.06)" stroke={BASE} strokeWidth="1.8" opacity={0.7} />
      <text x="265" y="377" textAnchor="middle" fontSize="12" fill={BASE} opacity={0.85} fontWeight="700" letterSpacing="2">BAR</text>

      <rect x="180" y="125" width="170" height="165" rx="3" fill="rgba(167,201,87,0.08)" stroke={BASE} strokeWidth="2" opacity={0.6} strokeDasharray="5 3" />
      <text x="265" y="198" textAnchor="middle" fontSize="11" fill={BASE} opacity={0.7} fontWeight="600" letterSpacing="0.5">PISTA DE BAILE</text>
      <text x="252" y="218" textAnchor="middle" fontSize="20" opacity={0.5}>💃</text>
      <text x="278" y="218" textAnchor="middle" fontSize="20" opacity={0.5}>🕺</text>

      {highlightMainTable && (
        <rect x="206" y="66" width="118" height="34" rx="4" fill={HL} opacity={0.2}>
          <animate attributeName="opacity" values="0.14;0.26;0.14" dur="2.5s" repeatCount="indefinite" />
        </rect>
      )}
      <rect
        x="215"
        y="74"
        width="100"
        height="18"
        rx="2"
        fill={highlightMainTable ? BASE : 'rgba(45,80,22,0.04)'}
        stroke={highlightMainTable ? HL : BASE}
        strokeWidth={highlightMainTable ? 2.5 : 1.5}
        opacity={highlightMainTable ? 1 : 0.65}
      />
      <text
        x="265"
        y="86"
        textAnchor="middle"
        fontSize="10"
        fill={highlightMainTable ? 'white' : BASE}
        opacity={highlightMainTable ? 1 : 0.8}
        fontStyle="italic"
        fontWeight="600"
      >
        Mesa principal
      </text>
      <MesaPrincipalChairs />

      {TABLES.map((table) => (
        <TableSvg key={table.id} table={table} isHighlighted={highlightedSet.has(table.id)} />
      ))}
    </svg>
  )
}

