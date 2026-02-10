'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number | string;
  detailedDescription?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const TapasMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  description,
  price,
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

const TapasMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <TapasMenuItem
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

export default function TapasStartersMenu() {
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
      title: 'CHEESES AND HAMS',
      items: [
        {
          name: 'IBERIAN BELLOTA CHORIZO',
          description: 'Traditional Spanish sausage',
          price: 140,
          detailedDescription: 'Artisanal chorizo with authentic Spanish spices'
        },
        {
          name: 'IBERIAN HAM',
          description: 'Premium Spanish charcuterie',
          price: 180,
          detailedDescription: 'Superior quality ham with refined flavors'
        },
        {
          name: 'MANCHEGO AÑEJO A.O.C. CHEESE',
          description: 'Authentic Spanish cheese',
          price: 180,
          detailedDescription: 'Aged cheese with intense and characteristic flavors'
        },
        {
          name: 'CHEESE PLATTER',
          description: 'Blue, brie, goat, parmesan, manchego',
          price: 190,
          detailedDescription: 'Refined selection of European cheeses'
        }
      ]
    },
    {
      title: 'SOUPS',
      items: [
        {
          name: 'SEAFOOD SOUP',
          description: 'Fragrant sea broth',
          price: 80,
          detailedDescription: 'Soup rich in sea flavors and seafood'
        }
      ]
    },
    {
      title: 'TAPAS',
      items: [
        {
          name: 'HOMEMADE BLACK OLIVE TAPENADE',
          description: 'Half portion · 30 Dhs | Full portion · 60 Dhs',
          price: '30 / 60',
          detailedDescription: 'Traditional black olive paste prepared according to our house recipe'
        },
        {
          name: 'GARLIC TOMATO',
          description: 'Simple and flavorful starter',
          price: 50,
          detailedDescription: 'Fresh tomatoes enhanced with fragrant garlic'
        },
        {
          name: 'POTATOES "BRAVAS" STYLE',
          description: 'Classic Spanish side dish',
          price: 60,
          detailedDescription: 'Potatoes prepared in the Madrid tradition'
        },
        {
          name: 'RUSSIAN SALAD',
          description: 'Classic composed salad',
          price: 70,
          detailedDescription: 'Generous mix of vegetables and mayonnaise'
        },
        {
          name: 'MINI BURGER',
          description: 'Savory miniature burger',
          price: 70,
          detailedDescription: 'Small hamburger perfect for sharing'
        },
        {
          name: 'GUACAMOLE AND TORTILLA CHIPS',
          description: 'Mashed avocado with crispy chips',
          price: 70,
          detailedDescription: 'Fresh guacamole accompanied by golden tortilla chips'
        },
        {
          name: 'ANCHOVIES IN VINEGAR',
          description: 'Traditional marinated fish',
          price: 80,
          detailedDescription: 'Fresh anchovies marinated in fragrant vinegar'
        },
        {
          name: 'TOMATOES, ONIONS AND TUNA',
          description: 'Fresh Mediterranean salad',
          price: 80,
          detailedDescription: 'Harmonious blend of Mediterranean flavors'
        },
        {
          name: 'PADRÓN PEPPERS',
          description: 'Galician specialty',
          price: 80,
          detailedDescription: 'Small grilled green peppers, light and flavorful'
        },
        {
          name: 'OVEN-ROASTED RED PEPPERS WITH TUNA',
          description: 'Mediterranean stuffed vegetables',
          price: 90,
          detailedDescription: 'Grilled red peppers filled with savory tuna'
        },
        {
          name: 'SEAFOOD SALPICÓN',
          description: 'Seafood salad',
          price: 90,
          detailedDescription: 'Refreshing mix of seasoned seafood'
        },
        {
          name: 'BEEF TENDERLOIN TOAST',
          description: 'Toast topped with premium meat',
          price: 90,
          detailedDescription: 'Grilled bread topped with tender beef tenderloin'
        },
        {
          name: 'GARLIC CHICKEN',
          description: 'Fragrant poultry',
          price: 90,
          detailedDescription: 'Chicken pieces sautéed with golden garlic'
        },
        {
          name: 'GRILLED SHRIMP',
          description: 'Naturally grilled crustaceans',
          price: 130,
          detailedDescription: 'Fresh shrimp grilled to preserve their flavors'
        },
        {
          name: 'GALICIAN-STYLE OCTOPUS',
          description: 'Octopus, mashed potatoes',
          price: 140,
          detailedDescription: 'Northern Spanish specialty with authentic flavors'
        }
      ]
    },
    {
      title: 'SALADS AND STARTERS',
      items: [
        {
          name: 'FRESH VEGETABLE SALAD',
          description: 'Variety of fresh vegetables',
          price: 80,
          detailedDescription: 'Mix of seasonal raw vegetables and vinaigrette'
        },
        {
          name: 'GOAT CHEESE SALAD WITH FIGS AND HAM',
          description: 'Refined sweet and savory blend',
          price: 120,
          detailedDescription: 'Composed salad combining goat cheese, sweet figs and ham'
        },
        {
          name: 'FRIED CAMEMBERT SALAD',
          description: 'Fried camembert, strawberry jam, lettuce, walnuts, dried fig',
          price: 120,
          detailedDescription: 'Original salad mixing warm cheese and sweet fruits'
        },
        {
          name: 'FISHERMAN\'S SALAD',
          description: 'Lettuce, tomato, avocado, calamari, shrimp, surimi, smoked salmon, cocktail sauce',
          price: 140,
          detailedDescription: 'Generous salad with seafood and delicate sauce'
        },
        {
          name: 'EL TANGERINO SALAD',
          description: 'Grilled shrimp, grilled calamari, grilled swordfish, surimi, clams',
          price: 140,
          detailedDescription: 'Our signature salad mixing all the treasures of the ocean'
        }
      ]
    },
    {
      title: 'RAW DISHES',
      items: [
        {
          name: 'TUNA CARPACCIO',
          description: 'Bluefin tuna slices, olive oil, capers, pesto',
          price: 120,
          detailedDescription: 'Bluefin tuna in thin slices with Mediterranean condiments'
        },
        {
          name: 'SALMON CARPACCIO',
          description: 'Fresh salmon, 5 berries, coarse salt, pepper, capers, lemon, olive oil',
          price: 120,
          detailedDescription: 'Fresh salmon marinated with spices and delicate aromatics'
        },
        {
          name: 'VEAL CARPACCIO',
          description: 'Veal slices, olive oil, capers, parmesan',
          price: 120,
          detailedDescription: 'Thin veal slices with Italian accompaniments'
        },
        {
          name: 'SMOKED SALMON PLATTER',
          description: 'Quality smoked salmon',
          price: 140,
          detailedDescription: 'Generous platter of finely sliced smoked salmon'
        },
        {
          name: 'BLUEFIN TUNA TARTARE',
          description: 'Premium quality raw fish',
          price: 140,
          detailedDescription: 'Fresh bluefin tuna hand-cut and seasoned'
        },
        {
          name: 'BLUEFIN TUNA TATAKI',
          description: 'Japanese-style seared tuna',
          price: 180,
          detailedDescription: 'Bluefin tuna quickly seared, tender inside, flavorful outside'
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
            <TapasMenuSection title={section.title} items={section.items} />
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