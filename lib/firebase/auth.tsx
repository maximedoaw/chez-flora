"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { User } from "firebase/auth"
import { useAuthState, useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/firebase"

interface AuthContextType {
  user: User | null |any
  loading: boolean
  error: Error | undefined
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: undefined,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Utiliser useAuthState pour suivre l'état de l'authentification
  const [user, loading, error] = useAuthState(auth)

  // Utiliser useSignInWithGoogle pour la connexion avec Google
  const [signInWithGoogle, , signingIn, signInError] = useSignInWithGoogle(auth)

  // Utiliser useSignOut pour la déconnexion
  const [signOutFunc, , signOutError] = useSignOut(auth)

  // Fonction de connexion
  const signIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
    }
  }

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      await signOutFunc()
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  // Combiner les erreurs potentielles
  const combinedError = error || signInError || signOutError

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || signingIn,
        error: combinedError,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

