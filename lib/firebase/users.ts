import { db } from "@/firebase/firebase"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore"

// Définition de l'interface User directement dans ce fichier
interface User {
  id: string
  firstName: string
  lastName: string
  email?: string
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

// Données de démonstration pour les utilisateurs
const mockUsers: User[] = [
  {
    id: "user1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    address: {
      street: "123 rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    notifications: {
      email: true,
      promotions: false,
      orderUpdates: true,
      newsletter: true,
    },
    memberSince: "janvier 2022",
    ordersCount: 5,
    status: "Client",
  },
  {
    id: "user2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@example.com",
    phone: "07 23 45 67 89",
    address: {
      street: "45 avenue des Fleurs",
      city: "Lyon",
      postalCode: "69002",
      country: "France",
    },
    notifications: {
      email: true,
      promotions: true,
      orderUpdates: true,
      newsletter: true,
    },
    memberSince: "mars 2022",
    ordersCount: 8,
    status: "VIP",
  },
  {
    id: "user3",
    firstName: "Pierre",
    lastName: "Durand",
    email: "pierre.durand@example.com",
    phone: "06 34 56 78 90",
    address: {
      street: "78 boulevard des Roses",
      city: "Marseille",
      postalCode: "13001",
      country: "France",
    },
    notifications: {
      email: true,
      promotions: false,
      orderUpdates: true,
      newsletter: false,
    },
    memberSince: "juin 2022",
    ordersCount: 3,
    status: "Client",
  },
  {
    id: "user4",
    firstName: "Sophie",
    lastName: "Petit",
    email: "sophie.petit@example.com",
    phone: "07 45 67 89 01",
    address: {
      street: "12 rue des Lilas",
      city: "Bordeaux",
      postalCode: "33000",
      country: "France",
    },
    notifications: {
      email: true,
      promotions: true,
      orderUpdates: true,
      newsletter: true,
    },
    memberSince: "septembre 2022",
    ordersCount: 12,
    status: "Premium",
  },
  {
    id: "user5",
    firstName: "Thomas",
    lastName: "Bernard",
    email: "thomas.bernard@example.com",
    phone: "06 56 78 90 12",
    address: {
      street: "34 avenue des Tulipes",
      city: "Lille",
      postalCode: "59000",
      country: "France",
    },
    notifications: {
      email: false,
      promotions: false,
      orderUpdates: true,
      newsletter: false,
    },
    memberSince: "décembre 2022",
    ordersCount: 1,
    status: "Inactif",
  },
]

/**
 * Récupère tous les utilisateurs depuis Firestore
 * @returns Une liste d'utilisateurs
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    // Essayer de récupérer depuis Firestore si configuré
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const usersCollection = collection(db, "users")
      const snapshot = await getDocs(usersCollection)

      if (!snapshot.empty) {
        return snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as User,
        )
      }
    }

    // Retourner les données de démonstration si Firestore n'est pas configuré ou vide
    return mockUsers
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error)
    return mockUsers
  }
}

/**
 * Récupère un utilisateur par son ID
 * @param id L'ID de l'utilisateur à récupérer
 * @returns L'utilisateur correspondant ou null s'il n'existe pas
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    // Essayer de récupérer depuis Firestore si configuré
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const userDoc = doc(db, "users", id)
      const snapshot = await getDoc(userDoc)

      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        } as User
      }
    }

    // Rechercher dans les données de démonstration
    const mockUser = mockUsers.find((user) => user.id === id)
    if (mockUser) {
      return mockUser
    }

    return null
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id}:`, error)

    // En cas d'erreur, essayer de retourner depuis les données de démonstration
    const mockUser = mockUsers.find((user) => user.id === id)
    return mockUser || null
  }
}

/**
 * Ajoute un nouvel utilisateur à Firestore
 * @param user Les données de l'utilisateur à ajouter
 * @returns true si l'opération a réussi
 */
export async function addUser(user: User): Promise<boolean> {
  try {
    // Ajouter à Firestore si configuré
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const userRef = doc(db, "users", user.id)
      await setDoc(userRef, user)
      return true
    }

    // Simuler l'ajout pour les données de démonstration
    console.log("Simulation d'ajout d'utilisateur:", user)
    return true
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", error)
    throw error
  }
}

/**
 * Met à jour un utilisateur existant dans Firestore
 * @param user Les données mises à jour de l'utilisateur
 * @returns true si l'opération a réussi
 */
export async function updateUser(user: User): Promise<boolean> {
  try {
    // Mettre à jour dans Firestore si configuré
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const userRef = doc(db, "users", user.id)
      await updateDoc(userRef, { ...user })
      return true
    }

    // Simuler la mise à jour pour les données de démonstration
    console.log("Simulation de mise à jour d'utilisateur:", user)
    return true
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
    throw error
  }
}

/**
 * Supprime un utilisateur de Firestore
 * @param id L'ID de l'utilisateur à supprimer
 * @returns true si l'opération a réussi
 */
export async function deleteUser(id: string): Promise<boolean> {
  try {
    // Supprimer de Firestore si configuré
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const userRef = doc(db, "users", id)
      await deleteDoc(userRef)
      return true
    }

    // Simuler la suppression pour les données de démonstration
    console.log("Simulation de suppression d'utilisateur avec ID:", id)
    return true
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error)
    throw error
  }
}

