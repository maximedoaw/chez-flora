"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/firebase/blog"
export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getBlogPosts()
        setPosts(postsData)
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Pendant le chargement, afficher des placeholders
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-emerald-100 dark:bg-emerald-800/30 rounded-t-lg"></div>
            <CardHeader>
              <div className="h-6 bg-emerald-100 dark:bg-emerald-800/30 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded mb-2"></div>
              <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded w-5/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Si aucun article n'est trouvé
  if (posts.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardTitle className="mb-4">Aucun article disponible</CardTitle>
        <CardDescription>Revenez bientôt pour découvrir nos nouveaux articles sur l'art floral.</CardDescription>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.slug} className="overflow-hidden flex flex-col h-full">
          <div className="relative h-48 w-full">
            <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
          <CardHeader>
            <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 mb-1">
              <Calendar className="mr-1 h-4 w-4" />
              {post.date}
            </div>
            <CardTitle className="text-xl font-serif">{post.title}</CardTitle>
            <CardDescription>{post.excerpt}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-emerald-700 dark:text-emerald-300 line-clamp-3">{post.summary}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="text-emerald-700 dark:text-emerald-300" asChild>
              <Link href={`/blog/${post.slug}`}>
                Lire l'article
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

