import Hero from '../components/home/Hero'
import AboutSnapshot from '../components/home/AboutSnapshot'
import DivisionSlider from '../components/home/DivisionSlider'
import Advantage from '../components/home/Advantage'
import StatsSection from '../components/home/StatsSection'
import CTABanner from '../components/home/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSnapshot />
      <DivisionSlider />
      <Advantage />
      <StatsSection />
      <CTABanner />
    </>
  )
}
