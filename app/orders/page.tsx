"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Calendar, Clock, Package, Search, ShoppingBag, Truck, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import CommandesContent from "./CommandContent"
import SideBar from "@/components/home/home-screen/SideBar"
import RightPanel from "@/components/home/home-screen/RightPanel"

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

