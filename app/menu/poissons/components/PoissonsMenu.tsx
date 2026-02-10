'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  portion?: string;
  detailedDescription?: string;
  isTitle?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const PoissonViandesMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  description,
  price,
  portion,
  detailedDescription,
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
        
        {/* Portion info */}
        {portion && (
          <div className="mb-3">
            <span className="text-xs text-amber-300 bg-amber-500/20 px-2 py-1 rounded">
              {portion}
            </span>
          </div>
        )}
        
        <div className="w-10 h-px bg-amber-200/40 mb-4"></div>
        
        <p className="text-amber-100/70 text-sm">
          {description}
        </p>

        <AnimatePresence>
          {isExpanded && detailedDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-amber-100/80 text-sm pl-4 border-l-2 border-amber-200/50 mt-4">
                {detailedDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {detailedDescription && (
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

const PoissonViandesMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <PoissonViandesMenuItem
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

export default function PoissonViandesMenu() {
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

  // All menu data in one place
  const menuSections: MenuSection[] = [
    {
      title: 'POISSON',
      items: [
        {
          name: "CREVETTES ROYALES GRILLÉES",
          price: "200",
          portion: "1 pièce",
          description: "Grosse crevette grillée",
          detailedDescription: "Crevette royale fraîche grillée à la perfection, légèrement assaisonnée"
        },
        {
          name: "ESPADON GRILLÉ",
          price: "260",
          description: "Steak d'espadon à la plancha",
          detailedDescription: "Pavé d'espadon grillé, chair ferme et savoureuse"
        },
        {
          name: "CALAMARS GRILLÉS",
          price: "280",
          description: "Encornets grillés tendres",
          detailedDescription: "Calamars frais grillés, accompagnés de citron et d'huile d'olive"
        },
        {
          name: "SOLE GRILLÉE",
          price: "280",
          description: "Poisson plat délicat",
          detailedDescription: "Sole fraîche grillée, chair fine et raffinée"
        },
        {
          name: "THON ROUGE MI-CUIT",
          price: "280",
          description: "Thon saisi à la plancha",
          detailedDescription: "Pavé de thon rouge saisi, tendre à cœur et savoureux"
        },
        {
          name: "SAINT-PIERRE GRILLÉ",
          price: "320",
          description: "Poisson noble grillé",
          detailedDescription: "Saint-Pierre frais grillé, chair blanche et délicate"
        },
        {
          name: "PAVÉ DE BAR DE LIGNE",
          price: "340",
          description: "Bar sauvage grillé",
          detailedDescription: "Pavé de bar de ligne grillé, pêche sauvage, chair moelleuse"
        },
        {
          name: "SAUMON GRILLÉ",
          price: "340",
          description: "Filet de saumon à la plancha",
          detailedDescription: "Pavé de saumon frais grillé, riche en saveurs"
        },
        {
          name: "LANGOUSTINE GRILLÉE",
          price: "450",
          description: "Crustacé premium grillé",
          detailedDescription: "Langoustine fraîche grillée, chair délicate et sucrée"
        },
        {
          name: "SÉLECTION DE POISSONS : POISSON DU JOUR",
          price: "580",
          portion: "2 pers",
          description: "Assortiment de poissons frais",
          detailedDescription: "Sélection du jour de différents poissons grillés selon l'arrivage"
        }
      ]
    },
    {
      title: 'VIANDES',
      items: [
        {
          name: "BROCHETTES DE VOLAILLE",
          price: "120",
          description: "Poulet mariné en brochettes",
          detailedDescription: "Brochettes de poulet mariné et grillé, tendres et parfumées"
        },
        {
          name: "BROCHETTES DE VIANDE HACHÉE",
          price: "140",
          description: "Kefta grillée",
          detailedDescription: "Brochettes de viande hachée épicée, grillées à la tradition marocaine"
        },
        {
          name: "BROCHETTES DE FILET DE BŒUF",
          price: "220",
          description: "Bœuf premium en brochettes",
          detailedDescription: "Brochettes de filet de bœuf tendre, grillées à point"
        },
        {
          name: "ÉMINCÉ DE POULET ACCOMPAGNÉ D'UNE SAUCE AUX CHAMPIGNONS ET DE RIZ BASMATI",
          price: "260",
          description: "Poulet sauce champignons",
          detailedDescription: "Émincé de poulet en sauce crémeuse aux champignons, servi avec riz basmati parfumé"
        },
        {
          name: "ÉMINCÉ D'ENTRECÔTE ACCOMPAGNÉ D'UNE SAUCE AUX CHAMPIGNONS ET RIZ BASMATI",
          price: "280",
          description: "Bœuf sauce champignons",
          detailedDescription: "Émincé d'entrecôte en sauce crémeuse aux champignons, servi avec riz basmati"
        },
        {
          name: "ENTRECÔTE GRILLÉE",
          price: "280",
          description: "Pièce de bœuf grillée",
          detailedDescription: "Entrecôte de bœuf grillée, juteuse et savoureuse"
        },
        {
          name: "FILET DE BŒUF GRILLÉ",
          price: "380",
          description: "Pièce noble de bœuf",
          detailedDescription: "Filet de bœuf tendre grillé à la perfection"
        }
      ]
    }
  ];

  // Elegant divider component to reduce repetition
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
      <div className="absolute inset-0 opacity-10"></div>
      
      {/* Menu content */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <PoissonViandesMenuSection title={section.title} items={section.items} />
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