import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="mt-16 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-green-800 mb-4">À propos de nous</h3>
            <p className="text-green-600">
              Nous sommes passionnés par la création de bouquets uniques pour vos événements spéciaux. 
              Découvrez notre univers floral et laissez-nous embellir vos moments.
            </p>
          </div>

          <div className="flex justify-center my-auto">
            <div className="w-30 h-30 relative rounded-full overflow-hidden shadow-lg  ">
              <Image
                src="/Flora.jpg" 
                alt="Flora - Entreprise de fleurs"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Section Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Contactez-nous</h3>
            <ul className="text-green-600">
              <li>123 Rue des Fleurs, 75001 Paris</li>
              <li>Email: contact@flora.com</li>
              <li>Téléphone: +33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-green-500 border-t border-green-100 pt-8">
          <p>&copy; {new Date().getFullYear()} Flora. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;