"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MessageCircle, User } from "lucide-react"
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { useEffect, useState } from "react"

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  commentCount: number;
}


const blogPosts = [
  {
    id: 1,
    slug: "art-floral-japonais",
    title: "L'art floral japonais : Ikebana",
    excerpt:
      "Découvrez les principes et l'histoire de l'Ikebana, l'art floral japonais qui transforme l'arrangement de fleurs en une forme d'expression artistique méditative.",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    date: "12 mars 2023",
    author: "Sophie Dubois",
    commentCount: 8,
  },
  {
    id: 2,
    slug: "fleurs-saison-printemps",
    title: "Les fleurs de saison pour le printemps",
    excerpt:
      "Le printemps est la saison idéale pour profiter d'une explosion de couleurs. Voici notre sélection des meilleures fleurs de saison pour égayer votre intérieur.",
    image:
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    date: "5 avril 2023",
    author: "Thomas Martin",
    commentCount: 12,
  },
  {
    id: 3,
    slug: "compositions-florales-mariage",
    title: "Compositions florales pour un mariage inoubliable",
    excerpt:
      "Des bouquets aux centres de table, découvrez comment créer des compositions florales qui rendront votre mariage vraiment mémorable.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    date: "18 mai 2023",
    author: "Claire Dupont",
    commentCount: 15,
  },
  {
    id: 4,
    slug: "plantes-interieur-faciles",
    title: "5 plantes d'intérieur faciles à entretenir",
    excerpt:
      "Vous n'avez pas la main verte ? Pas de problème ! Voici 5 plantes d'intérieur qui survivront même aux jardiniers les plus distraits.",
    image:
      "https://images.unsplash.com/photo-1545165375-1b744b9ed444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    date: "2 juin 2023",
    author: "Marc Leroy",
    commentCount: 6,
  },
  {
    id: 5,
    slug: "langage-fleurs",
    title: "Le langage secret des fleurs",
    excerpt:
      "Chaque fleur a sa signification. Apprenez à composer des bouquets qui transmettent exactement le message que vous souhaitez faire passer.",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    date: "20 juillet 2023",
    author: "Émilie Blanc",
    commentCount: 10,
  },

  {
    id: 6,
    slug: "fleurs-exotiques",
    title: "À la découverte des fleurs exotiques",
    excerpt:
      "Voyagez à travers les fleurs exotiques les plus incroyables du monde et apprenez comment les cultiver chez vous.",
    image:
      "https://images.unsplash.com/photo-1558522195-e1201b090344?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    date: "5 septembre 2023",
    author: "Sophie Dubois",
    commentCount: 14,
  },
  {
    id: 7,
    slug: "tendances-decoration-florale",
    title: "Les tendances déco florale en 2024",
    excerpt:
      "Découvrez les styles de décoration florale qui feront sensation cette année. Inspiration et idées créatives garanties !",
    image:
      "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    date: "20 septembre 2023",
    author: "Claire Dupont",
    commentCount: 11,
  },

];


export default function BlogContent() {
  const [flowersPosts, setFlowersPosts] = useState<Post[]>([]);
  useEffect(() => {
    const saveBlogPost = async () => {
      try {
        const blogCollection = collection(db, 'blog')
        for (const post of blogPosts) {
          const postRef = doc(blogCollection, post.slug)
          await setDoc(postRef, post)
          setFlowersPosts((prev)=> [...prev, post])
        }
      } catch (error : any) {
        console.error("Erreur lors de la sauvegarde des articles de blog:", error);
        
      }
    }
    saveBlogPost()    
  }, [])

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-emerald-800 dark:text-emerald-200 mb-4">Notre Blog</h1>
        <p className="text-lg text-emerald-700 dark:text-emerald-300 max-w-2xl mx-auto">
          Découvrez nos articles sur l'art floral, les tendances saisonnières et nos conseils d'experts pour prendre
          soin de vos plantes et fleurs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full dark:bg-gray-900">
            <div className="relative h-48 w-full">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-300 mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <CardTitle className="text-xl font-serif text-emerald-800 dark:text-emerald-200">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-emerald-600 dark:text-emerald-300">Article de blog</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="text-emerald-700 dark:text-emerald-300 line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2">
              <div className="flex items-center text-emerald-600 dark:text-emerald-300 text-sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{post.commentCount} commentaires</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-emerald-700 dark:text-emerald-300  dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900"
                asChild
              >
                <Link href={`/blog/${post.slug}`}>Lire la suite</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

