import { db } from "@/firebase/firebase"
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from "firebase/firestore"

export async function getBlogPosts() {
  try {
    const postsQuery = query(collection(db, "blog"), orderBy("createdAt", "desc"))

    const snapshot = await getDocs(postsQuery)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      slug: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  try {
    const docRef = doc(db, "blog_posts", slug)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        slug: docSnap.id,
        ...docSnap.data(),
      }
    } else {
      return null
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error)
    return null
  }
}

export async function getRecentPosts(count = 3) {
  try {
    const postsQuery = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"), limit(count))

    const snapshot = await getDocs(postsQuery)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      slug: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Erreur lors de la récupération des articles récents:", error)
    return []
  }
}

