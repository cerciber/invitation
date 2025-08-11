import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Estructura Base',
  description: 'Proyecto base minimal con Next.js (App Router) y Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body>
        <div className="min-h-[100svh]">{children}</div>
      </body>
    </html>
  )
}
