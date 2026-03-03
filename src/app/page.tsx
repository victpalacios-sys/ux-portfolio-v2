import HeroSection from '@/components/HeroSection'
import CredibilityBar from '@/components/CredibilityBar'
import ServicesSection from '@/components/ServicesSection'
import WorkSection from '@/components/WorkSection'
import ProcessSection from '@/components/ProcessSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CredibilityBar />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
    </main>
  )
}
