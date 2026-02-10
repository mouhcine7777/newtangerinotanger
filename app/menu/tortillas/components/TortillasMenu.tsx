'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: string;
  shortDescription: string;
  description: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const TortillasMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  price,
  shortDescription,
  description,
  onExpand,
  isExpanded
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isExpanded]);

  return (
    <motion.div
      ref={itemRef}
      className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onExpand}
    >
      {/* Decorative elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-SweetSansProBold text-xl font-serif tracking-wider text-amber-100">
            {name}
          </h3>
          <span className="text-amber-200 font-light">{price}</span>
        </div>
        
        <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
        
        <p className="text-amber-100/70 text-sm">
          {shortDescription}
        </p>

        <AnimatePresence>
          {isExpanded && description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-amber-100/80 text-sm pl-4 border-l-2 border-amber-200/50 mt-4">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {description && (
          <div className="mt-4 text-xs text-amber-200 opacity-70 flex items-center">
            <span className="mr-1">{isExpanded ? 'Moins' : 'Détails'}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        )}
      </div>
      
      {/* Highlight effect */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

const TortillasMenuSection: React.FC<MenuSection> = ({ title, items }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <h3 className="font-SweetSansProBold text-center font-serif text-3xl tracking-wider text-amber-100 mb-10">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <TortillasMenuItem
            key={index}
            {...item}
            onExpand={() => handleExpand(index)}
            isExpanded={expandedItem === index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function TortillasFrituresMenu() {
  const menuRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current);
      }
    };
  }, []);

  // All menu data
  const menuSections: MenuSection[] = [
    {
      title: 'TORTILLAS ET ŒUFS',
      items: [
        {
          name: 'ŒUFS AU PLAT SUR POMMES DE TERRE FAÇON LUCIO',
          price: '70',
          shortDescription: 'Œufs frais sur pommes de terre sautées',
          description: 'Préparation traditionnelle associant œufs au plat et pommes de terre dorées'
        },
        {
          name: 'TORTILLA ESPAGNOLE',
          price: '70',
          shortDescription: 'Omelette traditionnelle aux pommes de terre',
          description: 'Spécialité incontournable de la cuisine espagnole'
        },
        {
          name: 'TORTILLA ESPAGNOLE AUX CHAMPIGNONS',
          price: '80',
          shortDescription: 'Variante gourmande aux champignons',
          description: 'Tortilla enrichie de champignons savoureux'
        },
        {
          name: 'TORTILLA AUX CREVETTES',
          price: '90',
          shortDescription: 'Omelette aux crevettes fraîches',
          description: 'Tortilla garnie de crevettes tendres et savoureuses'
        },
        {
          name: 'TORTILLA ESPAGNOLE AU CHORIZO DE BELLOTA',
          price: '90',
          shortDescription: 'Tortilla au chorizo artisanal',
          description: 'Mariage parfait entre tortilla et chorizo de qualité'
        },
        {
          name: 'TORTILLA ESPAGNOLE AU MANCHEGO GRAN CÉSAR',
          price: '90',
          shortDescription: 'Version fromage premium',
          description: 'Tortilla noble au fromage Manchego affiné'
        }
      ]
    },
    {
      title: 'FRITURES',
      items: [
        {
          name: 'AUBERGINES FRITES AVEC DU MIEL',
          price: '70',
          shortDescription: 'Légumes frits sucrés-salés',
          description: 'Aubergines croustillantes nappées de miel doré'
        },
        {
          name: 'CROQUETTES DE JAMBON IBÉRIQUE',
          price: '80',
          shortDescription: 'Spécialité premium espagnole',
          description: 'Croquettes raffinées au jambon de qualité supérieure'
        },
        {
          name: 'CROQUETTES AU POULET',
          price: '70',
          shortDescription: 'Classique espagnol croustillant',
          description: 'Croquettes traditionnelles à la garniture fondante'
        },
        {
          name: 'CROQUETTES DE POISSON',
          price: '80',
          shortDescription: 'Bouchées croustillantes de poisson',
          description: 'Croquettes dorées garnies de poisson frais'
        },
        {
          name: 'POISSON FRIT MARINÉ',
          price: '80',
          shortDescription: 'Poisson de mer préparé',
          description: 'Filet de poisson mariné puis frit à la perfection'
        },
        {
          name: 'ANCHOIS FRITS',
          price: '80',
          shortDescription: 'Petits poissons croustillants',
          description: 'Anchois dorés à la friture méditerranéenne'
        },
        {
          name: 'BLANC DE POULET FRIT',
          price: '90',
          shortDescription: 'Volaille panée croustillante',
          description: 'Filets de poulet tendres enrobés d\'une panure dorée'
        },
        {
          name: 'GAMBAS EN TEMPURA',
          price: '140',
          shortDescription: 'Crevettes en pâte japonaise',
          description: 'Gambas enrobées de tempura légère et croustillante'
        },
        {
          name: 'TÊTES DE CALAMARS',
          price: '140',
          shortDescription: 'Spécialité de céphalopodes frits',
          description: 'Têtes de calamars frites, tendres et savoureuses'
        },
        {
          name: 'CALAMARS FRITS',
          price: '160',
          shortDescription: 'Encornets croustillants',
          description: 'Calamars tendres enrobés d\'une panure dorée'
        },
        {
          name: 'PETITS CALAMARS FRITS',
          price: '160',
          shortDescription: 'Jeunes calamars croustillants',
          description: 'Petits calamars tendres frits à la perfection'
        },
        {
          name: 'SÉLECTION DE POISSONS FRITS',
          price: '180',
          shortDescription: 'Assortiment de poissons variés',
          description: 'Plateau de différents poissons frits de la pêche du jour'
        }
      ]
    }
  ];

  // Elegant divider component
  const ElegantDivider = () => (
    <div className="flex items-center justify-center my-16">
      <div className="h-px w-16 bg-amber-200/30"></div>
      <div className="mx-3 text-amber-200/50">✦</div>
      <div className="h-px w-16 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Elegant divider top */}
      <div className="flex items-center justify-center mb-16">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <TortillasMenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <ElegantDivider />}
          </div>
        ))}
      </div>
      
      {/* Elegant divider bottom */}
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}