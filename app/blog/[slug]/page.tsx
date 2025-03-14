"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CommentSection from "@/components/blog/CommentSectionn"
import { getBlogPost } from "@/lib/firebase/blog"


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getBlogPost(params.slug)
        setPost(postData)
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  // Pendant le chargement, afficher un placeholder
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 animate-pulse">
        <div className="h-8 bg-emerald-100 dark:bg-emerald-800/30 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded w-2/3 mb-8"></div>
        <div className="h-64 bg-emerald-100 dark:bg-emerald-800/30 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded"></div>
          <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded"></div>
          <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded w-4/5"></div>
        </div>
      </div>
    )
  }

  // Si l'article n'existe pas
  if (!post) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-serif font-bold text-emerald-800 dark:text-emerald-200 mb-6">
          Article introuvable
        </h1>
        <p className="text-emerald-700 dark:text-emerald-300 mb-8">
          L'article que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au blog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au blog
        </Link>
      </Button>

      <h1 className="text-3xl md:text-4xl font-serif font-bold text-emerald-800 dark:text-emerald-200 mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-emerald-600 dark:text-emerald-400 mb-6">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {post.date}
        </div>
        <div className="flex items-center">
          <User className="mr-1 h-4 w-4" />
          {post.author}
        </div>
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          {post.readTime} min de lecture
        </div>
      </div>

      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="prose prose-emerald dark:prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <Separator className="my-12" />

      <CommentSection postId={params.slug} />
    </div>
  )
}

