"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Trash2, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DialogTrigger } from "@/components/ui/dialog"
import { auth, storage } from "@/firebase/firebase"
import { useSettings } from "./SettingsContext"
import { toast } from "sonner"

export function ProfileCard() {
  const [user] = useAuthState(auth)
  const { profile } = useSettings()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleProfilePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setIsUploading(true)

    try {
      const storageRef = ref(storage, `profile_photos/${user.uid}`)

      await uploadBytes(storageRef, file)

      const photoURL = await getDownloadURL(storageRef)

      await updateProfile(user, { photoURL })

      toast(
         "Photo mise à jour",{
         description: "Votre photo de profil a été mise à jour avec succès.",
     }
      )
    } catch (error) {
      console.error("Erreur lors du téléchargement de la photo:", error)
      toast("Erreur",{
            description: "Impossible de mettre à jour votre photo. Veuillez réessayer.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  if (!user) return null

  return (
    <Card className="md:w-64 lg:w-80">
    <CardHeader>
      <div className="flex flex-col items-center">
        <div className="relative group">
          <Avatar
            className="h-24 w-24 mb-4 cursor-pointer border-2 border-emerald-100 dark:border-emerald-800 group-hover:border-emerald-300 dark:group-hover:border-emerald-600 transition-colors duration-200"
            onClick={handleProfilePhotoClick}
          >
            <AvatarImage src={user.photoURL || "/placeholder.svg"} alt="Avatar" />
            <AvatarFallback className="text-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>

            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </Avatar>

          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>

        <CardTitle className="text-center">{user.displayName || "Utilisateur"}</CardTitle>
        <CardDescription className="text-center">{user.email}</CardDescription>

        {isUploading && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 animate-pulse">
            Téléchargement en cours...
          </p>
        )}
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <Separator />
      <div className="py-2 px-4">
        <p className="text-sm text-muted-foreground">Membre depuis</p>
        <p className="font-medium">{profile.memberSince}</p>
      </div>
      <Separator />
      <div className="py-2 px-4">
        <p className="text-sm text-muted-foreground">Commandes passées</p>
        <p className="font-medium">{profile.ordersCount}</p>
      </div>
      <Separator />
      <div className="py-2 px-4">
        <p className="text-sm text-muted-foreground">Statut</p>
        <p className="font-medium text-emerald-600 dark:text-emerald-400">{profile.status}</p>
      </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-2 mt-2">
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer mon compte
        </Button>
      </DialogTrigger>
    </CardFooter>
  </Card>
  )
}

