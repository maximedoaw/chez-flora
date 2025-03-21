"use client"

import React, { useEffect, useState } from 'react';
import { ScrollCardFlower } from './ScrollCardFlower';
import { Flower } from '@/types/Flower';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useGetFlower } from '@/hook/useGetFlower';


const FLOWER_DATA = [
  {
    id: '1',
    title: 'Magnifique Rose Rouge',
    slug: 'magnifique-rose-rouge',
    imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94',
    description: 'Une superbe rose rouge en pleine floraison, illustrant la symétrie parfaite de la nature.',
    author: 'Emma Wilson',
    views: 45678,
    postedAt: 'Il y a 2 jours',
    price: 5000
  },
  {
    id: '2',
    title: 'Champ de Lavande Pourpre',
    slug: 'champ-de-lavande-pourpre',
    imageUrl: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551',
    description: 'D’innombrables rangées de lavande parfumée s’étendant jusqu’à l’horizon.',
    author: 'Thomas Clark',
    views: 32456,
    postedAt: 'Il y a 3 jours',
    price: 7000
  },
  {
    id: '3',
    title: 'Splendeur du Tournesol',
    slug: 'splendeur-du-tournesol',
    imageUrl: 'https://images.unsplash.com/photo-1551445523-324a0fdab051',
    description: 'Des tournesols jaunes éclatants s’élevant vers le ciel d’été.',
    author: 'Sarah Johnson',
    views: 28934,
    postedAt: 'Il y a 1 jour',
    price: 4500
  },
  {
    id: '4',
    title: 'Fleurs de Cerisier',
    slug: 'fleurs-de-cerisier',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951',
    description: 'Délicates fleurs de cerisier roses annonçant l’arrivée du printemps.',
    author: 'Yuki Tanaka',
    views: 67123,
    postedAt: 'Il y a 4 jours',
    price: 8000
  },
  {
    id: '5',
    title: 'Étang aux Nénuphars',
    slug: 'etang-aux-nenuphars',
    imageUrl: 'https://images.unsplash.com/photo-1474557157379-8aa74a6ef541',
    description: 'Un nénuphar serein flottant à la surface d’un étang paisible.',
    author: 'David Lee',
    views: 54321,
    postedAt: 'Il y a 1 semaine',
    price: 6000
  }
];


  
  const ITEMS_PER_PAGE = 6;


  const FlowerSkeleton = () => {
    return (
      <div className="w-full p-4 bg-white shadow-md rounded-2xl animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
        <div className="mt-4 space-y-2">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  };

  export const Scroll = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {flowers,loading} = useGetFlower();
    const totalPages = Math.ceil(FLOWER_DATA.length / ITEMS_PER_PAGE);
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentFlowers = FLOWER_DATA.slice(startIndex, endIndex);

  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSave = () =>{
      const flowersRef = doc(db, 'flowers', 'flowers')
      FLOWER_DATA.map((flower) => setDoc(flowersRef, {flower}))
    }
  
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="sticky top-0  z-10 pb-4">
            <h1 className="text-3xl font-bold mb-4 text-emerald-800 dark:text-emerald-200">
              Galerie de fleurs
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {loading && Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <FlowerSkeleton key={index} />
            ))}
            {flowers.map(flower => (
              <ScrollCardFlower key={flower.id} flower={flower} />
            ))}
          </div>
  
          <div className="sticky bottom-0 bg-emerald-50 dark:bg-gray-900 p-4 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === page
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };