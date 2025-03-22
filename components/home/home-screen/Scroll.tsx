"use client";

import React, { useEffect, useState } from 'react';
import { ScrollCardFlower } from './ScrollCardFlower';
import { Flower } from '@/types/Flower';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetFlower } from '@/hook/useGetFlower';

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
  const { flowers, loading } = useGetFlower();
  const totalPages = Math.ceil(flowers.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFlowers = flowers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    console.log(flowers);
  }, [flowers]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="sticky top-0 z-10 pb-4">
          <h1 className="text-3xl font-bold mb-4 text-emerald-800 dark:text-emerald-200">
            Galerie de fleurs
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {loading && Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <FlowerSkeleton key={index} />
          ))}
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