import { HeroSection } from '@/components/sections/HeroSection'
import { CountdownSection } from '@/components/sections/CountdownSection'

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const guestCode = typeof searchParams.codigo === 'string' ? searchParams.codigo : undefined;
  
  return (
    <main className="min-h-screen">
      <HeroSection guestCode={guestCode} />
      <CountdownSection />
    </main>
  )
}
