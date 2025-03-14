import { db } from "@/firebase/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore"


// Récupérer les commentaires d'un article
export async function getComments(postId: string) {
  try {
    const commentsQuery = query(collection(db, `blog_posts/${postId}/comments`), orderBy("createdAt", "desc"))

    const snapshot = await getDocs(commentsQuery)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error)
    return []
  }
}

// Ajouter un commentaire
export async function addComment(postId: string, commentData: any) {
  try {
    const commentsRef = collection(db, `blog_posts/${postId}/comments`)

    await addDoc(commentsRef, {
      ...commentData,
      createdAt: serverTimestamp(),
    })

    return true
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire:", error)
    return false
  }
}

// Supprimer un commentaire
export async function deleteComment(postId: string, commentId: string) {
  try {
    const commentRef = doc(db, `blog_posts/${postId}/comments`, commentId)

    await deleteDoc(commentRef)

    return true
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error)
    return false
  }
}

