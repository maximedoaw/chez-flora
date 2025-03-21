"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Home, LogOut, Settings, User } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User as FirebaseUser } from "firebase/auth"
import { auth } from "@/firebase/firebase"

interface DashboardHeaderProps {
  user: FirebaseUser | null
}

export default function DashboardHeader({ user }: any) {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">Admin Dashboard</h1>
        <p className="text-emerald-600 dark:text-emerald-400">Manage your collections and monitor activities</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Return to Site
          </Link>
        </Button>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "Admin"} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => auth.signOut()}
                className="flex items-center cursor-pointer text-red-600 dark:text-red-400"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}
