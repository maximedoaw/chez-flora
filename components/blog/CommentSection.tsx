"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { addComment, deleteComment, getComments } from "@/lib/firebase/comment"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/firebase"

interface Comment {
  id: string
  text: string
  userId: string
  userName: string
  userPhotoURL: string
  createdAt: {
    toDate: () => Date
  }
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [user]= useAuthState(auth)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(postId)
        setComments(commentsData as any)
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()


  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      return
    }

    if (!newComment.trim()) return

    setSubmitting(true)

    try {
      await addComment(postId, {
        text: newComment,
        userId: user.uid,
        userName: user.displayName || "Utilisateur anonyme",
        userPhotoURL: user.photoURL || "",
      })

      // Rafraîchir les commentaires ou ajouter le nouveau commentaire à la liste
      const updatedComments = await getComments(postId)
      setComments(updatedComments as any)
      setNewComment("")
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!user) return

    try {
      await deleteComment(postId, commentId)
      setComments(comments.filter((comment) => comment.id !== commentId))
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-200 flex items-center">
        <MessageSquare className="mr-2 h-5 w-5" />
        Commentaires ({comments.length})
      </h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Laissez un commentaire</CardTitle>
          <CardDescription>Partagez vos pensées sur cet article</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitComment}>
          <CardContent>
            <Textarea
              placeholder="Votre commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
              disabled={!user || submitting}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            {user &&
              <>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user?.photoURL || ""} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-emerald-700 dark:text-emerald-300">
                    {user.displayName || "Utilisateur anonyme"}
                  </span>
                </div>
                <Button type="submit" disabled={submitting || !newComment.trim()}>
                  {submitting ? "Envoi..." : "Publier"}
                </Button>
              </>
            }
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-800/30"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-emerald-100 dark:bg-emerald-800/30 rounded"></div>
                    <div className="h-3 w-16 bg-emerald-100 dark:bg-emerald-800/30 rounded"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-4  rounded mb-2"></div>
                  <div className="h-4  rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))
        ) : comments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-emerald-700 dark:text-emerald-300">Soyez le premier à commenter cet article !</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage src={comment.userPhotoURL} />
                  <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{comment.userName}</CardTitle>
                  <CardDescription>
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-700 dark:text-emerald-300">{comment.text}</p>
              </CardContent>
              {user && user.uid === comment.userId && (
                <CardFooter className="justify-end pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

