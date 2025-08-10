import { HeroSection } from '@/components/sections/HeroSection'
import { CountdownSection } from '@/components/sections/CountdownSection'
import { StorySection } from '@/components/sections/StorySection'
import { LocationSection } from '@/components/sections/LocationSection'

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const guestCode = typeof searchParams.codigo === 'string' ? searchParams.codigo : undefined;
  
  return (
    <main className="min-h-screen">
      <HeroSection guestCode={guestCode} />
      <StorySection />
      <CountdownSection />
      <LocationSection />
    </main>
  )
}
