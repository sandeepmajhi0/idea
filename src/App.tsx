import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import BrandAlignment from './sections/BrandAlignment'
import ProductReveal from './sections/ProductReveal'
import DesignBlueprint from './sections/DesignBlueprint'
import Differentiation from './sections/Differentiation'
import SustainabilityDashboard from './sections/SustainabilityDashboard'
import MarketOpportunity from './sections/MarketOpportunity'
import BrandLandscaping from './sections/BrandLandscaping'
import SwotAnalysis from './sections/SwotAnalysis'
import Costing from './sections/Costing'
import RiskAssessment from './sections/RiskAssessment'
import SourcingStrategy from './sections/SourcingStrategy'
import ProductionRoadmap from './sections/ProductionRoadmap'
import UseCases from './sections/UseCases'
import CandidateValue from './sections/CandidateValue'
import FinalCTA from './sections/FinalCTA'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback)
    }
  }, [])

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <Hero />
      <BrandAlignment />
      <ProductReveal />
      <DesignBlueprint />
      <Differentiation />
      <SustainabilityDashboard />
      <MarketOpportunity />
      <BrandLandscaping />
      <SwotAnalysis />
      <Costing />
      <RiskAssessment />
      <SourcingStrategy />
      <ProductionRoadmap />
      <UseCases />
      <CandidateValue />
      <FinalCTA />
    </div>
  )
}

export default App
