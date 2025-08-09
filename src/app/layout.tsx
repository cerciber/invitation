import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Estructura Base',
  description: 'Proyecto base minimal con Next.js (App Router) y Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
