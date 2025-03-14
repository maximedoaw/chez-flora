import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const flowerArrangements = [
  {
    id: 1,
    name: "Bouquet Printanier",
    description: "Un arrangement délicat de roses, pivoines et fleurs de saison dans des tons pastel.",
    image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc",
    price: "45,90 €"
  },
  {
    id: 2,
    name: "Élégance Rustique",
    description: "Composition florale dans des tons chauds avec des fleurs sauvages et du feuillage texturé.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364",
    price: "39,90 €"
  },
  {
    id: 3,
    name: "Jardin Enchanté",
    description: "Arrangement luxuriant d'orchidées, de lys et de verdure exotique pour une ambiance tropicale.",
    image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166",
    price: "52,90 €"
  },
  {
    id: 4,
    name: "Romance Éternelle",
    description: "Bouquet romantique de roses rouges et de gypsophile, parfait pour exprimer l'amour.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814",
    price: "49,90 €"
  },
  {
    id: 5,
    name: "Fraîcheur Champêtre",
    description: "Mélange naturel de fleurs des champs et de verdure sauvage dans un style bohème.",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d",
    price: "36,90 €"
  },
  {
    id: 6,
    name: "Symphonie Violette",
    description: "Composition harmonieuse d'iris, de lisianthus et de clématites dans des tons violets.",
    image: "https://images.unsplash.com/photo-1513545379784-0f4779d1561b",
    price: "42,90 €"
  },
  {
    id: 7,
    name: "Douceur Pastel",
    description: "Arrangement délicat de roses, d'eucalyptus et de fleurs de saison dans des tons doux.",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94",
    price: "47,90 €"
  },
  {
    id: 8,
    name: "Soleil Levant",
    description: "Bouquet éclatant de tournesols, de gerberas et de solidago pour illuminer votre journée.",
    image: "https://images.unsplash.com/photo-1551445523-324a0fdab051",
    price: "44,90 €"
  },
  {
    id: 9,
    name: "Brise Marine",
    description: "Composition inspirée de l'océan avec des délphinium, des roses bleues et des eucalyptus.",
    image: "https://images.unsplash.com/photo-1558693168-c370615b54e0",
    price: "41,90 €"
  },
  {
    id: 10,
    name: "Rêve d'Automne",
    description: "Bouquet chaleureux aux couleurs automnales avec des dahlias, des roses et des feuillages colorés.",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321",
    price: "43,90 €"
  }
];

export default function RightPanel() {

  return (
    <div className="w-[300px] h-screen bg-white dark:bg-gray-800 p-4 overflow-y-auto">

      
      <div className="space-y-4">
      <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 pb-4">
        <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
          Compositions Florales
        </h2>
      </div>
        {flowerArrangements.map((arrangement) => (
          <div
            key={arrangement.id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative h-40 w-full">
              <img
                src={arrangement.image}
                alt={arrangement.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-medium text-emerald-800 dark:text-emerald-200">
                {arrangement.name}
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-300">
                Composition florale
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 line-clamp-2 mt-2">
                {arrangement.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                  {arrangement.price}
                </span>
                <button className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-200">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}