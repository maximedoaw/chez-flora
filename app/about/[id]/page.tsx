import FlowerDetailsContent from "./FlowerDetailsContent"

export type Flower = {
  id: string
  title: string
  imageUrl: string
  description: string
  author: string
  views: number
  postedAt: string
  slug: string
  price: string
}

interface PageProps {
  params: { id: string }
}

export default function FlowerDetails({ params }: PageProps) {
  if (!params?.id) {
    return <p>Error: No ID provided</p>
  }

  return <FlowerDetailsContent id={params.id} />
}
