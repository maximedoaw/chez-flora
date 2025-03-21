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

export default async function FlowerDetails({ params }: PageProps) {
  const { id } = params

  return <FlowerDetailsContent id={id} />
}