"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useTheme } from "next-themes"

interface Flower {
  id: number
  name: string
  description: string
  image: string
  likes: number
}

export default function FlowerCards() {
  const {theme, setTheme}= useTheme()
  const [flowers, setFlowers] = useState<Flower[]>([
    {
      id: 1,
      name: "Rose",
      description:
        "Symbole d'amour et de passion, la rose est connue pour sa beauté intemporelle et son parfum envoûtant.",
      image:
        "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 24,
    },
    {
      id: 2,
      name: "Tulipe",
      description:
        "Élégante et colorée, la tulipe représente l'amour parfait et apporte une touche de fraîcheur printanière.",
      image:
        "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 18,
    },

    {
      id: 3,
      name: "Pivoine",
      description:
        "Somptueuse et romantique, la pivoine est admirée pour ses fleurs volumineuses et son charme inégalé.",
      image:
        "https://images.unsplash.com/photo-1590273466070-40c466b4432d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 29,
    },
    {
      id: 4,
      name: "Tournesol",
      description: "Joyeux et éclatant, le tournesol suit la course du soleil et symbolise l'adoration et la loyauté.",
      image:
        "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 21,
    },
  ])

  const handleLike = (id: number) => {
    setFlowers(flowers.map((flower) => (flower.id === id ? { ...flower, likes: flower.likes + 1 } : flower)))
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-emerald-800 mb-4">Collection de Fleurs</h1>
        <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
          Découvrez notre sélection de fleurs magnifiques, chacune avec sa propre histoire et sa beauté unique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flowers.map((flower) => (
          <motion.div
            key={flower.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <Card className={`overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col
              ${theme === "dark" ? "bg-gray-900" : ""}`}>
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={flower.image || "/placeholder.svg"}
                  alt={flower.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-serif text-emerald-800">{flower.name}</CardTitle>
                <CardDescription className="text-emerald-600 italic">Fleur d'exception</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-emerald-700 leading-relaxed font-light">{flower.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-emerald-100 pt-4">
                <span className="text-sm text-emerald-600 font-medium">Floraison printanière</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 flex items-center gap-1"
                  onClick={() => handleLike(flower.id)}
                >
                  <Heart className="h-4 w-4" />
                  <span>{flower.likes}</span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

