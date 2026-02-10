'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CocktailItem {
  name: string;
  price: string;
  ingredients: string;
  description?: string;
}

interface SoftItem {
  name: string;
  price: string;
}

interface SoftSection {
  category: string;
  items: SoftItem[];
}

const CocktailMenuItem: React.FC<CocktailItem & { onExpand: () => void, isExpanded: boolean }> = ({
  name,
  ingredients,
  price,
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
          {ingredients}
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

const ShotMenuItem: React.FC<CocktailItem> = ({
  name,
  ingredients,
  price,
  description
}) => {
  return (
    <motion.div
      className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/20 relative overflow-hidden group"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h3 className="font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100 mb-3">
          {name}
        </h3>
        
        <div className="w-10 h-px bg-amber-200/40 mb-4 mx-auto"></div>
        
        <div className="text-amber-200 font-light text-xl mb-4">{price}</div>
        
        <p className="text-amber-100/70 text-sm mb-3">
          {ingredients}
        </p>

        {description && (
          <p className="text-amber-100/60 text-xs italic mt-4 pt-4 border-t border-amber-200/20">
            {description}
          </p>
        )}
      </div>
      
      {/* Highlight effect */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
    </motion.div>
  );
};

export default function CocktailsMenu() {
  const menuRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});

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

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const cocktails: CocktailItem[] = [
    {
      name: "SUMMER BREEZE",
      price: "160",
      ingredients: "Vodka Russian Standard, Fresh Watermelon",
      description: "Refreshing summer cocktail with the coolness of watermelon"
    },
    {
      name: "LEMONICA LEWHISKY",
      price: "160",
      ingredients: "Whisky Grants, Amareto di Saronno, Lemon, Green Apple Syrup, Black pepper",
      description: "A bold creation mixing whisky, amaretto and black pepper"
    },
    {
      name: "TSAR WARS",
      price: "160",
      ingredients: "Russian Vodka, Canna Syrup, Lemon, Strawberry",
      description: "A royal cocktail with notes of strawberry and lemon"
    },
    {
      name: "GIN SLIM",
      price: "160",
      ingredients: "Bombay Dry Gin, Martini Bianco, Lychee, Mint",
      description: "Elegant blend of gin, lychee and fresh mint"
    },
    {
      name: "RUMINTIC",
      price: "160",
      ingredients: "Bacardi Gold, Pineapple, White Cacao Liqueur, Caramel Syrup, Mint",
      description: "Tropical cocktail with pineapple and cacao flavors"
    },
    {
      name: "BASILIC INSTINCT",
      price: "160",
      ingredients: "Jack Daniel Honey, Aperol, Ginger Syrup, Basil, Martini Dry, Lemon",
      description: "Aromatic cocktail with fresh basil and Jack Daniel's honey"
    },
    {
      name: "BOUSSA NOVA",
      price: "160",
      ingredients: "Cachaça, Canna Syrup, Lime Cordial, Passion Fruit, Cassis Liqueur",
      description: "Brazilian inspiration with passion fruit"
    },
    {
      name: "WHO'S THERE?",
      price: "160",
      ingredients: "Tequila Camino, Raspberry Liqueur, Lime Cordial, Canna Syrup",
      description: "Mysterious cocktail with raspberry and lime flavors"
    }
  ];

  const shots: CocktailItem[] = [
    {
      name: "Set of 4",
      price: "300",
      ingredients: "Passion Vodka, Tequila Camino, Sambuca, Jagermeister",
      description: "Selection of 4 shots for a memorable evening"
    },
    {
      name: "By the Meter",
      price: "800",
      ingredients: "Passion Vodka, Tequila Camino, Sambuca, Jagermeister",
      description: "The ultimate challenge for true connoisseurs"
    }
  ];

  const softs: SoftSection[] = [
    {
      category: "MINERAL WATER 75CL",
      items: [
        { name: "Ain Saiss", price: "50" },
        { name: "Oulmés", price: "50" },
        { name: "Evian", price: "90" },
        { name: "Sparkling Evian", price: "90" }
      ]
    },
    {
      category: "BEVERAGES",
      items: [
        { name: "Soda", price: "50" },
        { name: "Fresh Juice", price: "90" },
        { name: "Espresso Coffee", price: "50" },
        { name: "Tea", price: "50" }
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
        
        {/* Cocktails Signature Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-SweetSansProBold text-center font-serif text-3xl tracking-wider text-amber-100 mb-10">
            SIGNATURE COCKTAILS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cocktails.map((cocktail, index) => (
              <CocktailMenuItem
                key={index}
                {...cocktail}
                onExpand={() => toggleExpand(index)}
                isExpanded={expandedItems[index] || false}
              />
            ))}
          </div>
        </motion.div>

        <ElegantDivider />
        
        {/* Shots Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-SweetSansProBold text-center font-serif text-3xl tracking-wider text-amber-100 mb-10">
            SHOTS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {shots.map((shot, index) => (
              <ShotMenuItem key={index} {...shot} />
            ))}
          </div>
        </motion.div>

        <ElegantDivider />
        
        {/* Soft Drinks Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-SweetSansProBold text-center font-serif text-3xl tracking-wider text-amber-100 mb-10">
            SOFT DRINKS & BEVERAGES
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {softs.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-8 border border-amber-200/20 relative overflow-hidden group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
                
                <div className="relative z-10">
                  <h4 className="font-SweetSansProBold text-xl font-serif text-center text-amber-100 mb-6">
                    {section.category}
                  </h4>
                  
                  <div className="w-10 h-px bg-amber-200/40 mb-6 mx-auto"></div>
                  
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center py-3 border-b border-amber-200/10 last:border-0"
                      >
                        <span className="text-amber-100/80 font-light">
                          {item.name}
                        </span>
                        <span className="text-amber-200 font-light">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Highlight effect */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/5 to-amber-300/10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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