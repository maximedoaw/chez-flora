"use client"

import BlogPost from "@/components/blog/BlogPost"
import BlogContent from "@/components/BlogContent"
import BaseLayout from "@/components/home/home-screen/BaseLayout"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect } from "react"
import { create } from "zustand"


interface SlugStore {
  slug: string | null
  setSlug: (slug: string | null) => void
}

export const useSlugStore = create<SlugStore>((set) => ({
  slug: null,
  setSlug: (slug) => set({ slug }),
}))

const Page = () => {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <BlogPageContent />
      </Suspense>
    )
  }
  
  const BlogPageContent = () => {
    const { slug, setSlug } = useSlugStore()
  
    // Utilisation de useEffect pour simuler la récupération du slug
    useEffect(() => {
      // Exemple : tu peux obtenir le slug d'une autre manière, comme depuis un URL
      const urlSlug = window.location.search.split("slug=")[1]
      setSlug(urlSlug || null) // Met à jour le slug dans le store
    }, [setSlug])
  
    return (
      <>
        {slug ? (
          <BlogPost slug={slug} />
        ) : (
          <BaseLayout renderPanel={false}>
            <BlogContent />
          </BaseLayout>
        )}
      </>
    )
  }
  