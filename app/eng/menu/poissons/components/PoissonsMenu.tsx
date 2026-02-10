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
      title: 'FISH',
      items: [
        {
          name: "GRILLED ROYAL PRAWNS",
          price: "200",
          portion: "1 piece",
          description: "Large grilled prawn",
          detailedDescription: "Fresh royal prawn grilled to perfection, lightly seasoned"
        },
        {
          name: "GRILLED SWORDFISH",
          price: "260",
          description: "Swordfish steak on the plancha",
          detailedDescription: "Grilled swordfish steak, firm and flavorful flesh"
        },
        {
          name: "GRILLED SQUID",
          price: "280",
          description: "Tender grilled calamari",
          detailedDescription: "Fresh grilled squid, served with lemon and olive oil"
        },
        {
          name: "GRILLED SOLE",
          price: "280",
          description: "Delicate flatfish",
          detailedDescription: "Fresh grilled sole, fine and refined flesh"
        },
        {
          name: "SEARED BLUEFIN TUNA",
          price: "280",
          description: "Plancha-seared tuna",
          detailedDescription: "Seared bluefin tuna steak, tender at the center and flavorful"
        },
        {
          name: "GRILLED JOHN DORY",
          price: "320",
          description: "Noble grilled fish",
          detailedDescription: "Fresh grilled John Dory, white and delicate flesh"
        },
        {
          name: "LINE-CAUGHT SEA BASS STEAK",
          price: "340",
          description: "Grilled wild sea bass",
          detailedDescription: "Grilled line-caught sea bass steak, wild catch, tender flesh"
        },
        {
          name: "GRILLED SALMON",
          price: "340",
          description: "Salmon fillet on the plancha",
          detailedDescription: "Fresh grilled salmon steak, rich in flavors"
        },
        {
          name: "GRILLED LANGOUSTINE",
          price: "450",
          description: "Premium grilled shellfish",
          detailedDescription: "Fresh grilled langoustine, delicate and sweet flesh"
        },
        {
          name: "FISH SELECTION: CATCH OF THE DAY",
          price: "580",
          portion: "2 people",
          description: "Assortment of fresh fish",
          detailedDescription: "Daily selection of various grilled fish according to availability"
        }
      ]
    },
    {
      title: 'MEATS',
      items: [
        {
          name: "CHICKEN SKEWERS",
          price: "120",
          description: "Marinated chicken skewers",
          detailedDescription: "Marinated and grilled chicken skewers, tender and fragrant"
        },
        {
          name: "GROUND MEAT SKEWERS",
          price: "140",
          description: "Grilled kefta",
          detailedDescription: "Spiced ground meat skewers, grilled in Moroccan tradition"
        },
        {
          name: "BEEF TENDERLOIN SKEWERS",
          price: "220",
          description: "Premium beef skewers",
          detailedDescription: "Tender beef tenderloin skewers, grilled to perfection"
        },
        {
          name: "SLICED CHICKEN WITH MUSHROOM SAUCE AND BASMATI RICE",
          price: "260",
          description: "Chicken in mushroom sauce",
          detailedDescription: "Sliced chicken in creamy mushroom sauce, served with fragrant basmati rice"
        },
        {
          name: "SLICED RIB-EYE WITH MUSHROOM SAUCE AND BASMATI RICE",
          price: "280",
          description: "Beef in mushroom sauce",
          detailedDescription: "Sliced rib-eye in creamy mushroom sauce, served with basmati rice"
        },
        {
          name: "GRILLED RIB-EYE STEAK",
          price: "280",
          description: "Grilled beef cut",
          detailedDescription: "Grilled beef rib-eye, juicy and flavorful"
        },
        {
          name: "GRILLED BEEF TENDERLOIN",
          price: "380",
          description: "Noble beef cut",
          detailedDescription: "Tender beef tenderloin grilled to perfection"
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