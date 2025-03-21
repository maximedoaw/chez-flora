"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { ArrowLeft, SettingsIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/firebase/firebase"
import { ProfileCard } from "@/components/settings/ProfileCard"
import { SettingsProvider } from "@/components/settings/SettingsContext"
import { PersonalInfoTab } from "@/components/settings/PersonalInfoTab"
import { NotificationsTab } from "@/components/settings/NotificationsTab"
import { DeleteAccountDialog } from "@/components/settings/DeleteAccountDialog"
import { Dialog } from "@/components/ui/dialog"

export default function SettingsPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  // Rediriger si non connecté
  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-12 bg-emerald-100 dark:bg-emerald-800/30 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded w-1/2 mx-auto"></div>
          <div className="h-64 bg-emerald-100 dark:bg-emerald-800/30 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <SettingsProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              <ArrowLeft className="inline-block mr-2" onClick={() => router.back()} />Paramètres du compte
            </h1>
            <p className="text-emerald-700 dark:text-emerald-300">Gérez vos informations personnelles et préférences</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <SettingsIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mr-2" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <Dialog>
            <ProfileCard />
            <DeleteAccountDialog />
          </Dialog>

          <div className="flex-1">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <span className="hidden sm:inline">Informations</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoTab />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SettingsProvider>
  )
}

