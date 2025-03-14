"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  content: string;
  name: string;
  event: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Les bouquets créés pour mon mariage étaient absolument magnifiques. Chaque détail reflétait parfaitement notre thème et nos couleurs. Un grand merci pour avoir rendu notre journée encore plus spéciale!",
    name: "Sophie Martin",
    event: "Mariage",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    content: "J'ai commandé un arrangement floral pour l'anniversaire de ma mère et elle a été émue aux larmes. La fraîcheur et l'originalité de la composition ont dépassé toutes mes attentes.",
    name: "Thomas Dubois",
    event: "Anniversaire",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    content: "Pour notre événement d'entreprise, nous avions besoin de compositions élégantes mais discrètes. Le résultat était parfait - professionnel, raffiné et exactement ce que nous recherchions.",
    name: "Claire Lefèvre",
    event: "Événement d'entreprise",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 4,
    content: "Les bouquets pour notre cérémonie de remise de diplômes ont ajouté une touche de couleur et de joie. Merci pour votre créativité et votre service impeccable!",
    name: "Antoine Moreau",
    event: "Remise de diplômes",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 5,
    content: "J'ai été impressionnée par la qualité et la durabilité des fleurs. Deux semaines après notre réception, les arrangements étaient toujours aussi beaux!",
    name: "Émilie Rousseau",
    event: "Réception",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 6,
    content: "Pour la naissance de notre fille, nous avons reçu un bouquet délicat et poétique. Un vrai chef-d'œuvre qui a illuminé notre chambre d'hôpital!",
    name: "Lucas Bernard",
    event: "Naissance",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
];

const Testimonials = () => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clone testimonials to create a seamless loop
    if (rowRef.current) {
      const cloneNodes = (parent: HTMLDivElement) => {
        const children = Array.from(parent.children);
        children.forEach(child => {
          const clone = child.cloneNode(true);
          parent.appendChild(clone);
        });
      };

      cloneNodes(rowRef.current);
    }
  }, []);

  return (
    <section className="testimonials-container">
      <h2 className="testimonials-title">Ce que nos clients disent</h2>
      
      <div className="overflow-hidden">
        <div className="testimonials-row" ref={rowRef}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="testimonial-content">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="testimonial-author">
                <Image 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  width={50} 
                  height={50} 
                  className="testimonial-avatar" 
                />
                <div className="testimonial-info">
                  <span className="testimonial-name">{testimonial.name}</span>
                  <span className="testimonial-event">{testimonial.event}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;