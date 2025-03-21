"use client"

import { useEffect, useState } from "react"
import CommandesContent from "./CommandContent"


// Types pour les commandes
type OrderStatus = "en-attente" | "livré" | "annulé"

interface Order {
  id: string
  date: string
  products: string[]
  total: string
  status: OrderStatus
  trackingNumber?: string
}

export default function CommandesPage() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setMounted(true)
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  return (
    <div className="flex">
      <CommandesContent/>
    </div>
  )
}

