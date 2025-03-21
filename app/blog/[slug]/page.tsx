import BlogPost from "@/components/blog/BlogPost"

export default async function BlogPostPage({ params }: { params: { slug: any } }) {
  return <BlogPost slug={params.slug} />
}
