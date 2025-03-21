import BlogPost from "@/components/blog/BlogPost"
import { getBlogPost } from "@/lib/firebase/blog"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />
}
