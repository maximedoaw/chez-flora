import React from 'react'
import HeroSection from './HeroSection'
import ServicesSection from './ServicesSection'
import Pricing from './Pricing'
import Testimonials from './Testimonials'
import FlowerCards from './FlowerCards'
import { useTheme } from 'next-themes'

const AuthScreen = () => {
  // Accéder au thème actuel
  const { theme } = useTheme()

  return (
    // Appliquer la classe dark conditionnellement en fonction du thème
    <div className={`${theme === "dark" ? "dark" : ""}`} suppressHydrationWarning>
      <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
        <HeroSection />
        <ServicesSection />
        <Pricing />
        <FlowerCards />
        <Testimonials />
      </div>
    </div>
  )
}


export default AuthScreen