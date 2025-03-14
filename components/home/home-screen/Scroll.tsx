"use client"

import React, { useState } from 'react';
import { ScrollCardFlower } from './ScrollCardFlower';
import { Flower } from '@/types/Flower';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const FLOWER_DATA: Flower[] = [
    {
      id: '1',
      title: 'Magnifique Rose Rouge',
      imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94',
      description: 'Une superbe rose rouge en pleine floraison, illustrant la symétrie parfaite de la nature.',
      author: 'Emma Wilson',
      views: 45678,
      postedAt: 'Il y a 2 jours'
    },
    {
      id: '2',
      title: 'Champ de Lavande Pourpre',
      imageUrl: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551',
      description: 'D’innombrables rangées de lavande parfumée s’étendant jusqu’à l’horizon.',
      author: 'Thomas Clark',
      views: 32456,
      postedAt: 'Il y a 3 jours'
    },
    {
      id: '3',
      title: 'Splendeur du Tournesol',
      imageUrl: 'https://images.unsplash.com/photo-1551445523-324a0fdab051',
      description: 'Des tournesols jaunes éclatants s’élevant vers le ciel d’été.',
      author: 'Sarah Johnson',
      views: 28934,
      postedAt: 'Il y a 1 jour'
    },
    {
      id: '4',
      title: 'Fleurs de Cerisier',
      imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951',
      description: 'Délicates fleurs de cerisier roses annonçant l’arrivée du printemps.',
      author: 'Yuki Tanaka',
      views: 67123,
      postedAt: 'Il y a 4 jours'
    },
    {
      id: '5',
      title: 'Étang aux Nénuphars',
      imageUrl: 'https://images.unsplash.com/photo-1474557157379-8aa74a6ef541',
      description: 'Un nénuphar serein flottant à la surface d’un étang paisible.',
      author: 'David Lee',
      views: 54321,
      postedAt: 'Il y a 1 semaine'
    },
    {
      id: '6',
      title: 'Champ de Marguerites Sauvages',
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
      description: 'Un pré rempli de marguerites joyeuses se balançant au gré du vent.',
      author: 'Lisa Anderson',
      views: 31654,
      postedAt: 'Il y a 3 jours'
    },
    {
      id: '7',
      title: 'Fleurs Sauvages de Montagne',
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
      description: 'Des fleurs sauvages alpines colorées recouvrant un pré de montagne.',
      author: 'Chris Wilson',
      views: 43210,
      postedAt: 'Il y a 4 jours'
    },
    {
      id: '8',
      title: 'Jardin de Tulipes',
      imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac',
      description: 'Un arc-en-ciel de tulipes dans un jardin parfaitement entretenu.',
      author: 'Sophie Miller',
      views: 65432,
      postedAt: 'Il y a 2 jours'
    },
    {
      id: '9',
      title: 'Fleurs Sauvages du Désert',
      imageUrl: 'https://images.unsplash.com/photo-1486673748761-a8d18475c757',
      description: 'De rares fleurs sauvages du désert fleurissant après les pluies printanières.',
      author: 'Ryan Thompson',
      views: 34567,
      postedAt: 'Il y a 5 jours'
    },
    {
      id: '10',
      title: 'Jardin d’Iris',
      imageUrl: 'https://images.unsplash.com/photo-1558693168-c370615b54e0',
      description: 'Des iris violets et blancs dans un cadre de jardin paisible.',
      author: 'James Taylor',
      views: 41234,
      postedAt: 'Il y a 3 jours'
    },
    {
      id: '11',
      title: 'Crocus du Printemps',
      imageUrl: 'https://images.unsplash.com/photo-1488928741225-2aaf732c96cc',
      description: 'Les premiers crocus du printemps perçant la dernière neige.',
      author: 'Anna Parker',
      views: 38765,
      postedAt: 'Il y a 4 jours'
    }
  ];
  
  const ITEMS_PER_PAGE = 6;


  
  export const Scroll = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(FLOWER_DATA.length / ITEMS_PER_PAGE);
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentFlowers = FLOWER_DATA.slice(startIndex, endIndex);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="sticky top-0  z-10 pb-4">
            <h1 className="text-3xl font-bold mb-4 text-emerald-800 dark:text-emerald-200">
              Galerie de fleurs
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {currentFlowers.map(flower => (
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