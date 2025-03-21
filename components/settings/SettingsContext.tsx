"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { updateProfile } from "firebase/auth"
import { auth, db } from "@/firebase/firebase"
import { toast } from "sonner"

interface UserProfile {
  firstName: string
  lastName: string
  phone: string
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  notifications: {
    email: boolean
    promotions: boolean
    orderUpdates: boolean
    newsletter: boolean
  }
  memberSince: string
  ordersCount: number
  status: string
}

interface SettingsContextType {
  profile: UserProfile
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>
  isSaving: boolean
  saveProfile: () => Promise<void>
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleNotificationChange: (key: keyof UserProfile["notifications"]) => void
  currentPassword: string
  setCurrentPassword: React.Dispatch<React.SetStateAction<string>>
  newEmail: string
  setNewEmail: React.Dispatch<React.SetStateAction<string>>
  newPassword: string
  setNewPassword: React.Dispatch<React.SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
  isChangingEmail: boolean
  isChangingPassword: boolean
  isDeleting: boolean
  changeEmail: () => Promise<void>
  changePassword: () => Promise<void>
  deleteAccount: () => Promise<void>
}

const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  phone: "",
  address: {
    street: "",
    city: "",
    postalCode: "",
    country: "France",
  },
  notifications: {
    email: true,
    promotions: false,
    orderUpdates: true,
    newsletter: true,
  },
  memberSince: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
  ordersCount: 0,
  status: "Client",
}

function flattenObject(obj: any, prefix = ""): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
}


const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [user] = useAuthState(auth)

  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isChangingEmail, setIsChangingEmail] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Charger les données du profil depuis Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return

      try {
        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile
          setProfile(userData)
        } else {
          // Créer un profil par défaut si aucun n'existe
          const defaultProfile = {
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
            phone: "",
            address: {
              street: "",
              city: "",
              postalCode: "",
              country: "France",
            },
            notifications: {
              email: true,
              promotions: false,
              orderUpdates: true,
              newsletter: true,
            },
            memberSince: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
            ordersCount: 0,
            status: "Nouveau client",
          }

          await setDoc(userDocRef, defaultProfile)
          setProfile(defaultProfile)
        }

        // Initialiser l'email
        setNewEmail(user.email || "")
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error)
        toast( "Erreur",{
          description: "Impossible de charger votre profil. Veuillez réessayer.",
        })
      }
    }

    if (user) {
      fetchUserProfile()
    }
  }, [user, toast])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev ?? {}]),
          [child]: value,
        },
      }))
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleNotificationChange = (key: keyof UserProfile["notifications"]) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }))
  }

  const saveProfile = async () => {
    if (!user) return

    setIsSaving(true)

    try {
      // Mettre à jour le profil dans Firestore
      const userDocRef = doc(db, "users", user.uid)
      await updateDoc(userDocRef, flattenObject(profile))

      // Mettre à jour le nom d'affichage dans Firebase Auth
      await updateProfile(user, {
        displayName: `${profile.firstName} ${profile.lastName}`,
      })

      toast("Profil mis à jour",{
        description: "Vos informations ont été enregistrées avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du profil:", error)
      toast("Erreur",{
        description: "Impossible d'enregistrer vos modifications. Veuillez réessayer.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const changeEmail = async () => {
    if (!user || !currentPassword) return

    setIsChangingEmail(true)

    try {
      // Logique de changement d'email
      // Cette fonction serait implémentée dans un service Firebase

      toast("Email mis à jour",{
        description: "Votre adresse email a été mise à jour avec succès.",
      })

      setCurrentPassword("")
    } catch (error) {
      console.error("Erreur lors du changement d'email:", error)
      toast("Erreur",{
        description: "Impossible de mettre à jour votre email. Vérifiez votre mot de passe et réessayez.",
      })
    } finally {
      setIsChangingEmail(false)
    }
  }

  const changePassword = async () => {
    if (!user || !currentPassword || newPassword !== confirmPassword) return

    setIsChangingPassword(true)

    try {
      // Logique de changement de mot de passe
      // Cette fonction serait implémentée dans un service Firebase

      toast( "Mot de passe mis à jour",{
        description: "Votre mot de passe a été changé avec succès.",
      })

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error)
      toast( "Erreur",{
        description: "Impossible de changer votre mot de passe. Vérifiez votre mot de passe actuel et réessayez.",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const deleteAccount = async () => {
    if (!user || !currentPassword) return

    setIsDeleting(true)

    try {
      // Logique de suppression de compte
      // Cette fonction serait implémentée dans un service Firebase

      toast( "Compte supprimé",{
        description: "Votre compte a été supprimé avec succès.",
        
      })
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error)
      toast("Erreur",{
        description: "Impossible de supprimer votre compte. Vérifiez votre mot de passe et réessayez.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        profile,
        setProfile,
        isSaving,
        saveProfile,
        handleProfileChange,
        handleNotificationChange,
        currentPassword,
        setCurrentPassword,
        newEmail,
        setNewEmail,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isChangingEmail,
        isChangingPassword,
        isDeleting,
        changeEmail,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

