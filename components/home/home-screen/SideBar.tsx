"use client"

import { useState, useEffect, use } from "react"
import { useTheme } from "next-themes"
import { BookOpen, ShoppingBag, Settings, Moon, Sun, Menu, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import { usePathname } from "next/navigation"


export default function SideBar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const pathName = usePathname()

  // Prevent hydration mismatch
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

  const menuItems = [
    { icon: Home, label: "Accueil", href: "/" },
    { icon: BookOpen, label: "Blog", href: "/blog" },
    { icon: ShoppingBag, label: "Mes commandes", href: "/command" },
    { icon: Settings, label: "Paramètres", href: "/settings" },
    { icon: LogOut, label: "Déconnexion", href: "#" },

  ]

  const handleLogOut = () => signOut(auth)

  const SideBarContent = () => (
    <div className="h-full flex flex-col py-6 w-[220px] bg-emerald-50 dark:bg-gray-800">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-emerald-800">Menu</h2>
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start text-emerald-700 hover:text-emerald-900 hover:bg-emerald-300 
                ${item.href === pathName ? "bg-emerald-300" : ""} dark:hover:bg-gray-700`}
              asChild
            >
            {item.label === "Déconnexion" ?
                <span className="flex cursor-pointer" onClick={handleLogOut}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </span>
            :
                <a href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </a>
            }

            </Button>
          ))}
        </div>
      </div>
      <div className="px-7">
        {mounted && (
          <Button
            variant="outline"
            size="icon"
            className="border-emerald-200 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 dark:bg-gray-700"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 " /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Changer le thème</span>
          </Button>
        )}
      </div>
    </div>
  )

  // Mobile version with sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-emerald-700">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className=" p-0">
          <SideBarContent />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop version
  return (
    <div className="hidden md:block  bg-white dark:bg-gray-950">
      <SideBarContent />
    </div>
  )
}

