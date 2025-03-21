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
  params: {
    id: string
  }
}

export default function FlowerDetails({ params }: PageProps) {
  return <FlowerDetailsContent id={params.id} />
}
