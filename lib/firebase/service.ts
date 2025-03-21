import { db } from "@/firebase/firebase"
import {
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser,
    User,
  } from "firebase/auth"
  import { doc, setDoc } from "firebase/firestore"

  
  export async function changeUserPassword(user: User, currentPassword: string, newPassword: string) {
    // Réauthentifier l'utilisateur
    const credential = EmailAuthProvider.credential(user.email || "", currentPassword)
  
    await reauthenticateWithCredential(user, credential)
  
    // Mettre à jour le mot de passe
    await updatePassword(user, newPassword)
  
    return true
  }
  
  // Fonction pour supprimer un compte utilisateur
  export async function deleteUserAccount(user: User, currentPassword: string) {
    // Réauthentifier l'utilisateur
    const credential = EmailAuthProvider.credential(user.email || "", currentPassword)
  
    await reauthenticateWithCredential(user, credential)
  
    // Supprimer le document utilisateur dans Firestore
    const userDocRef = doc(db, "users", user.uid)
    await setDoc(userDocRef, { deleted: true }, { merge: true })
  
    // Supprimer le compte Firebase Auth
    await deleteUser(user)
  
    return true
  }
  
  