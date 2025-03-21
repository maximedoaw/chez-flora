"use client"

import { useParams, useSearchParams } from "next/navigation"
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



export default function FlowerDetails() {
  const params = useSearchParams()
  const id = params.get("id") || ""
  return <FlowerDetailsContent id={id as string} />
}
