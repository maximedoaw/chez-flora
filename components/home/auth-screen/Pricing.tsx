'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './pricing.module.css';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface PricingTier {
  name: string;
  id: string;
  href: string;
  discountPrice: string | Record<string, string>;
  price: string | any;
  description: string;
  features: string[];
  cta: string;
}

export const frequencies: PricingTierFrequency[] = [
  { id: '1', value: '1', label: 'Mensuel', priceSuffix: '/mois' },
  { id: '2', value: '2', label: 'Annuel', priceSuffix: '/an' },
];

export const tiers: PricingTier[] = [
  {
    name: 'Standard',
    id: '1',
    href: '/subscribe',
    price: { '1': '20 000 FCFA', '2': '200 000 FCFA' },
    discountPrice: { '1': '', '2': '' },
    description: `Un abonnement idéal pour embellir vos événements avec des bouquets élégants et accessibles.`,
    features: [
      `2 bouquets standard livrés par mois`,
      `Personnalisation simple des bouquets`,
      `5% de réduction sur les commandes supplémentaires`,
    ],
    cta: `S'abonner`,
  },
  {
    name: 'Pro',
    id: '2',
    href: '/subscribe',
    price: { '1': '40 000 FCFA', '2': '400 000 FCFA' },
    discountPrice: { '1': '', '2': '' },
    description: `Une offre premium pour les amateurs de fleurs et les événements prestigieux.`,
    features: [
      `4 bouquets premium livrés par mois`,
      `Personnalisation avancée et fleurs exclusives`,
      `Livraison prioritaire et 10% de réduction sur les commandes supplémentaires`,
    ],
    cta: `S'abonner`,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const frequency = isAnnual ? frequencies[1] : frequencies[0];

  return (
    <div className={cn('flex flex-col w-full items-center', styles.fancyOverlay)}>
      <div className="w-full flex flex-col items-center mb-24">
        <div className="mx-auto max-w-7xl px-6 xl:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h1 className="text-[#2E8B57] text-4xl font-semibold md:text-6xl font-playfair">
              Nos abonnements floraux
            </h1>
            <p className="mt-4 text-[#FF6B6B] text-lg font-lora">
              Offrez-vous la beauté des fleurs toute l’année avec nos formules adaptées à vos besoins !
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-[#2E8B57] font-semibold font-lora">Mensuel</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-[#2E8B57]"
            />
            <span className="text-[#2E8B57] font-semibold font-lora">Annuel</span>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:ml-60  max-w-6xl">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="border p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-[#2E8B57] font-playfair">{tier.name}</h3>
                <p className="mt-4 text-[#555] font-lora">{tier.description}</p>
                <p className="mt-6 text-4xl font-bold text-[#2E8B57] font-playfair">
                  {tier.price[frequency.value]}{' '}
                  <span className="text-sm font-semibold text-[#555]">{frequency.priceSuffix}</span>
                </p>
                <ul className="mt-6 space-y-3 text-[#555] font-lora">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-[#2E8B57]">✔️</span> {feature}
                    </li>
                  ))}
                </ul>
                <a href={tier.href} className="block mt-8">
                  <Button
                    size="lg"
                    className="w-full bg-[#2E8B57] hover:bg-[#3CB371] text-white font-semibold transition-colors duration-300 cursor-pointer"
                  >
                    {tier.cta}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full  py-16 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[#2E8B57] font-playfair">Offres Spéciales</h2>
        <p className="mt-4 text-[#2E8B57] text-lg font-lora">Des offres limitées pour encore plus de fleurs et de bonheur !</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#2E8B57]">Offre Été Fleuri</h3>
            <p className="text-[#555] mt-2">Recevez un bouquet surprise chaque semaine !</p>
            <p className="text-3xl font-bold text-[#2E8B57] mt-4">10 000 FCFA</p>
            <Button className="mt-4 bg-[#2E8B57] text-white hover:bg-[#3CB371]">Commander</Button>
          </div>
          <div className="p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#2E8B57]">Offre Anniversaire</h3>
            <p className="text-[#555] mt-2">Un bouquet magnifique pour un anniversaire spécial.</p>
            <p className="text-3xl font-bold text-[#2E8B57] mt-4">20 000 FCFA</p>
            <Button className="mt-4 bg-[#2E8B57] text-white hover:bg-[#3CB371]">Commander</Button>
          </div>
          <div className="p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#2E8B57]">Offre Mariage</h3>
            <p className="text-[#555] mt-2">Un bouquet exceptionnel pour le plus beau jour de votre vie.</p>
            <p className="text-3xl font-bold text-[#2E8B57] mt-4">30 000 FCFA</p>
            <Button className="mt-4 bg-[#2E8B57] text-white hover:bg-[#3CB371]">Commander</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
