"use client"

import BlogPost from "@/components/blog/BlogPost"
import BlogContent from "@/components/BlogContent"
import BaseLayout from "@/components/home/home-screen/BaseLayout"
import { useSearchParams } from "next/navigation"
import React, { Suspense } from "react"

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
