import { HeroSection } from '@/components/sections/HeroSection'

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const guestCode = typeof searchParams.codigo === 'string' ? searchParams.codigo : undefined;
  
  return (
    <main className="min-h-screen">
      <HeroSection guestCode={guestCode} />
    </main>
  )
}
