'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  detailedDescription?: string;
  isNew?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const DessertMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  description,
  price,
  detailedDescription,
  isNew,
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
        
        <div className="flex items-center justify-between mt-4">
          {detailedDescription && (
            <div className="text-xs text-amber-200 opacity-70 flex items-center">
              <span className="mr-1">{isExpanded ? 'Less' : 'Details'}</span>
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
          
          {/* New badge */}
          {isNew && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5 
              }}
            >
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white/20">
                <span className="relative z-10">NEW!</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Highlight effect */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

const DessertMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <DessertMenuItem
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

export default function DessertsMenu() {
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
      title: '',
      items: [
        {
          name: "CRÈME BRÛLÉE",
          price: 80,
          description: "Classic French caramelized custard",
          detailedDescription: "Smooth vanilla cream beneath a thin layer of crispy caramelized sugar"
        },
        {
          name: "PRALINE CREAM PUFF WITH VANILLA ICE CREAM",
          price: 80,
          description: "Crispy and frozen pastry",
          detailedDescription: "Perfect marriage between the lightness of the cream puff, the crunch of praline and the smoothness of ice cream"
        },
        {
          name: "LEMON TART",
          price: 80,
          description: "Tangy and meringued",
          detailedDescription: "The perfect balance between the zest of lemon and the sweetness of meringue"
        },
        {
          name: "PASSION FRUIT AND MANGO SOFT CAKE",
          price: 80,
          description: "Fresh exotic creation",
          detailedDescription: "Tropical journey in every bite, refreshing alliance of sunny flavors",
          isNew: true
        },
        {
          name: "FRESH FRUIT PLATE",
          price: 80,
          description: "Natural and colorful freshness",
          detailedDescription: "Selection of fresh seasonal fruits for a light and vitamin-rich finale"
        },
        {
          name: "TIRAMISU",
          price: 80,
          description: "Italian coffee delight",
          detailedDescription: "The great transalpine classic, delicate layers of mascarpone and soaked biscuits"
        },
        {
          name: "FROZEN NOUGAT",
          price: 80,
          description: "Frozen Provençal freshness",
          detailedDescription: "Frozen sweetness with hints of honey and dried fruits, southern tradition revisited"
        },
        {
          name: "CHOCOLATE LAVA CAKE",
          price: 80,
          description: "Irresistible molten center",
          detailedDescription: "The ultimate indulgence for chocolate lovers, rich and intense molten center"
        },
        {
          name: "CHOCOLATE LAVA CAKE SUNDAE",
          price: 80,
          description: "Lava cake reimagined as a sundae",
          detailedDescription: "Our signature lava cake presented in a frozen version for double the pleasure"
        },
        {
          name: "TANGERINO COOKIE",
          price: 80,
          description: "Signature house creation",
          detailedDescription: "Our iconic cookie, crispy on the outside and soft in the center"
        },
        {
          name: "GOURMET COFFEE",
          price: 80,
          description: "Chocolate lava cake, vanilla ice cream, crème brûlée",
          detailedDescription: "Gourmet trio accompanied by coffee, to savor several pleasures in one tasting"
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
            <DessertMenuSection title={section.title} items={section.items} />
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