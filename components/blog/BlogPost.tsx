"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CommentSection from "@/components/blog/CommentSection"
import { db } from "@/firebase/firebase"


interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  commentCount: number;
  readTime: number;
  content: string;
}

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPostFromFirestore = async () => {
      try {
        const docRef = doc(db, "blog", slug)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as any)
        } else {
          console.error("Article introuvable")
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPostFromFirestore()
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-serif font-bold text-red-600 dark:text-red-400 mb-6">
          Article introuvable
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
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

      <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-gray-500" />
          {post.date}
        </div>
        <div className="flex items-center">
          <User className="mr-1 h-4 w-4 text-gray-500" />
          {post.author}
        </div>
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4 text-gray-500" />
          {post.readTime} min de lecture
        </div>
      </div>

      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image 
          src={post.image || "/placeholder.svg"} 
          alt={post.title} 
          fill 
          className="object-cover transition-transform duration-500 hover:scale-105" 
          priority 
        />
      </div>

      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-12">
        <p className="text-lg leading-relaxed">{post.excerpt}</p>
        <Separator className="my-6" />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <Separator className="my-12" />

      <CommentSection postId={slug} />
    </div>
  )
}
