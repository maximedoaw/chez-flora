"use client"

import BlogPost from '@/components/blog/BlogPost'
import BlogContent from '@/components/BlogContent'
import BaseLayout from '@/components/home/home-screen/BaseLayout'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useSearchParams()
  const slug = params.get("slug")
  return (
    <>
        {slug 
        ?
         <BlogPost slug={slug as string} /> 
        : 
        <BaseLayout renderPanel={false}>
            <BlogContent/>
        </BaseLayout>}
    </>

  )
}

export default page