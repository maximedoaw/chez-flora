import BlogContent from '@/components/BlogContent'
import BaseLayout from '@/components/home/home-screen/BaseLayout'
import React from 'react'

const page = () => {
  return (
    <BaseLayout renderPanel={false}>
        <BlogContent/>
    </BaseLayout>
  )
}

export default page