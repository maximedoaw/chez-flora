import React from 'react';
import { Clock, Eye, User } from 'lucide-react';
import { Flower } from '@/types/Flower';
import Link from 'next/link';


export const ScrollCardFlower = ({ flower } : { flower : Flower}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <Link href={`/about?id=${flower.id}`}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={flower.imageUrl}
            alt={flower.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-emerald-700 font-semibold text-lg mb-2 line-clamp-2">
            {flower.title}           {flower.price.toLocaleString()} FCFA

          </h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {flower.description}
          </p>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{flower.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{flower.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{flower.postedAt}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};