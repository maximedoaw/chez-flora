"use client"

import BlogPost from "@/components/blog/BlogPost"
import BlogContent from "@/components/BlogContent"
import BaseLayout from "@/components/home/home-screen/BaseLayout"
import { useSearchParams } from "next/navigation"
import React, { Suspense } from "react"
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
  const params = useSearchParams()
  const slug = params.get("slug")

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

export default Page
