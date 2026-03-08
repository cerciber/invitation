import { TableFloorPlan } from '@/components/TableFloorPlan'
import { guestsData } from '@/data/guests'

type GuestRow = {
  code: string
  name: string
  table: number | null
}

function buildGuestRows(): GuestRow[] {
  const rows: GuestRow[] = []

  for (const [code, guest] of Object.entries(guestsData)) {
    if (guest.dog) continue

    const names = Array.isArray(guest.names) ? guest.names.filter((n) => n?.trim()) : []
    const tables = Array.isArray(guest.tables) ? guest.tables.filter((t) => Number.isInteger(t)) : []

    if (names.length > 0 && tables.length > 0) {
      const maxLen = Math.max(names.length, tables.length)
      for (let i = 0; i < maxLen; i++) {
        rows.push({
          code,
          name: names[i] || `${guest.name} (${i + 1})`,
          table: tables[i] ?? null,
        })
      }
      continue
    }

    if (tables.length > 0) {
      if (tables.length === 1) {
        rows.push({ code, name: guest.name, table: tables[0] })
      } else {
        tables.forEach((table, i) => {
          rows.push({ code, name: `${guest.name} (${i + 1})`, table })
        })
      }
      continue
    }

    if (names.length > 0) {
      names.forEach((name) => rows.push({ code, name, table: null }))
      continue
    }

    rows.push({ code, name: guest.name, table: null })
  }

  return rows
}

export default function ListaInvitadosPage() {
  const guestRows = buildGuestRows()
  const groupedByTable = new Map<number, GuestRow[]>()
  const withoutTable: GuestRow[] = []

  guestRows.forEach((row) => {
    if (row.table == null) {
      withoutTable.push(row)
      return
    }
    if (!groupedByTable.has(row.table)) groupedByTable.set(row.table, [])
    groupedByTable.get(row.table)?.push(row)
  })

  const sortedTables = Array.from(groupedByTable.keys()).sort((a, b) => a - b)
  const principalGuests = groupedByTable.get(0) || []
  const regularTables = sortedTables.filter((table) => table !== 0)

  return (
    <main className="relative min-h-[100svh] bg-gradient-to-b from-white via-green-50/30 to-white py-8 sm:py-10 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(1200px 400px at 50% -10%, rgba(167,201,87,0.10), transparent 60%), radial-gradient(800px 300px at 50% 110%, rgba(167,201,87,0.08), transparent 60%)',
        }}
      />
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#2d5016]">
            Lista total de invitados
          </h1>
          <p className="mt-1.5 text-[#6b8e23] font-serif text-sm sm:text-base">
            Croquis general y listado agrupado por mesa
          </p>
        </div>

        <div id="guest-list-pdf-root">
          <div className="mt-4 max-w-md mx-auto">
            <div className="floral-divider" />
          </div>

          <div id="guest-list-pdf-plan" className="mt-6 rounded-xl border border-emerald-900/10 bg-white/85 backdrop-blur p-3 sm:p-5 shadow-sm">
            <TableFloorPlan />
          </div>

          <div id="guest-list-pdf-list">
            {principalGuests.length > 0 && (
              <div className="mt-6 rounded-xl border border-emerald-900/20 bg-white/90 backdrop-blur p-3 sm:p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-semibold text-[#2d5016]">
                    Mesa principal
                  </h2>
                  <p className="text-xs font-medium text-[#6b8e23]">
                    {principalGuests.length} invitados
                  </p>
                </div>
                <ol className="mt-2 space-y-1.5">
                  {principalGuests.map((guest, index) => (
                    <li key={`${guest.code}-${guest.name}-principal-${index}`} className="text-sm text-[#2d5016]/85 flex items-start gap-2">
                      <span className="inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#2d5016]/10 text-[#2d5016] text-xs font-semibold leading-none mt-[1px]">
                        {index + 1}
                      </span>
                      <span>{guest.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {regularTables.map((table) => (
                <div
                  key={table}
                  className="rounded-xl border border-emerald-900/10 bg-white/85 backdrop-blur p-4 shadow-sm"
                >
                  <h2 className="text-base sm:text-lg font-semibold text-[#2d5016] flex items-center justify-between">
                    <span>{table === 0 ? 'Mesa principal' : `Mesa ${table}`}</span>
                    <span className="text-xs font-medium text-[#6b8e23]">
                      {(groupedByTable.get(table) || []).length} invitados
                    </span>
                  </h2>
                  <ol className="mt-2 space-y-1.5">
                    {(groupedByTable.get(table) || []).map((guest, index) => (
                      <li key={`${guest.code}-${guest.name}-${index}`} className="text-sm text-[#2d5016]/85 flex items-start gap-2">
                        <span className="inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#2d5016]/10 text-[#2d5016] text-xs font-semibold leading-none mt-[1px]">
                          {index + 1}
                        </span>
                        <span>{guest.name}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            {withoutTable.length > 0 && (
              <div className="mt-6 rounded-xl border border-amber-900/15 bg-amber-50/65 p-4 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-amber-900">
                  Invitados sin mesa asignada
                </h2>
                <ol className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5">
                  {withoutTable.map((guest, index) => (
                    <li key={`${guest.code}-${guest.name}-no-table-${index}`} className="text-sm text-amber-900/85 flex items-start gap-2">
                      <span className="inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-amber-900/10 text-amber-900 text-xs font-semibold leading-none mt-[1px]">
                        {index + 1}
                      </span>
                      <span>{guest.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

      </section>
    </main>
  )
}

