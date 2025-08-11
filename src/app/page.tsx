import { HeroSection } from '@/components/sections/HeroSection'
import { CountdownSection } from '@/components/sections/CountdownSection'
import { StorySection } from '@/components/sections/StorySection'
import { LocationSection } from '@/components/sections/LocationSection'

export default function HomePage() {
  return (
    <main className="min-h-[100svh]">
      <HeroSection />
      <StorySection />
      <CountdownSection />
      <LocationSection />
    </main>
  )
}
