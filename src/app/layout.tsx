import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Invitación de Boda - Cerci & Ber',
  description: '¡Nos casamos! Te invitamos a celebrar con nosotros este momento tan especial. 14 de Marzo, 2026.',
  keywords: 'boda, invitación, matrimonio, celebración, Cesar y Denis',
  authors: [{ name: 'Cesar y Denis' }],
  openGraph: {
    title: 'Invitación de Boda - Cesar y Denis',
    description: '¡Nos casamos! Te invitamos a celebrar con nosotros este momento tan especial. 14 de Marzo, 2026.',
    url: 'https://cerciber.github.io/invitation/',
    siteName: 'Invitación de Boda',
    images: [
      {
        url: 'https://cerciber.github.io/invitation/assets/photo-1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Invitación de Boda - Cerci & Ber',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invitación de Boda - Cesar y Denis',
    description: '¡Nos casamos! Te invitamos a celebrar con nosotros este momento tan especial. 14 de Marzo, 2026.',
    images: ['https://cerciber.github.io/invitation/assets/photo-1.jpeg'],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <link rel="canonical" href="https://cerciber.github.io/invitation/" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="theme-color" content="#f8fafc" />
      </head>
      <body>
        <div className="min-h-[100svh]">{children}</div>
      </body>
    </html>
  )
}
