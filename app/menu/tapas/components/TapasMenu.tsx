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

export default function TapasEntreesMenu() {
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
      title: 'FROMAGES ET JAMBONS',
      items: [
        {
          name: 'CHORIZO IBÉRIQUE DE BELLOTA',
          description: 'Saucisson espagnol traditionnel',
          price: 140,
          detailedDescription: 'Chorizo artisanal aux épices authentiques d\'Espagne'
        },
        {
          name: 'JAMBON IBÉRIQUE',
          description: 'Charcuterie espagnole premium',
          price: 180,
          detailedDescription: 'Jambon de qualité supérieure aux saveurs raffinées'
        },
        {
          name: 'FROMAGE MANCHEGO AÑEJO A.O.C.',
          description: 'Fromage espagnol authentique',
          price: 180,
          detailedDescription: 'Fromage affiné aux saveurs intenses et caractéristiques'
        },
        {
          name: 'ASSIETTE DE FROMAGE',
          description: 'Azul, brie, cabra, parmesan, manchego',
          price: 190,
          detailedDescription: 'Sélection raffinée de fromages européens'
        }
      ]
    },
    {
      title: 'SOUPES',
      items: [
        {
          name: 'SOUPE AUX FRUITS DE MER',
          description: 'Bouillon de mer parfumé',
          price: 80,
          detailedDescription: 'Soupe riche en saveurs marines et fruits de mer'
        }
      ]
    },
    {
      title: 'TAPAS',
      items: [
        {
          name: 'TAPENADE MAISON AUX OLIVES NOIRES',
          description: 'Demi-ration · 30 Dhs | Ration · 60 Dhs',
          price: '30 / 60',
          detailedDescription: 'Pâte d\'olives noires traditionnelle préparée selon notre recette maison'
        },
        {
          name: 'TOMATE À L\'AIL',
          description: 'Entrée simple et savoureuse',
          price: 50,
          detailedDescription: 'Tomates fraîches relevées à l\'ail parfumé'
        },
        {
          name: 'POMMES DE TERRE FAÇON « BRAVAS »',
          description: 'Accompagnement espagnol classique',
          price: 60,
          detailedDescription: 'Pommes de terre préparées dans la tradition madrilène'
        },
        {
          name: 'SALADE RUSSE',
          description: 'Salade composée classique',
          price: 70,
          detailedDescription: 'Mélange généreux de légumes et mayonnaise'
        },
        {
          name: 'MINI HAMBURGER',
          description: 'Burger miniature savoureux',
          price: 70,
          detailedDescription: 'Petit hamburger parfait pour partager'
        },
        {
          name: 'GUACAMOLE ET CHIPS DE TORTILLA',
          description: 'Avocat écrasé avec chips croustillantes',
          price: 70,
          detailedDescription: 'Guacamole frais accompagné de tortilla chips dorées'
        },
        {
          name: 'ANCHOIS AU VINAIGRE',
          description: 'Poisson mariné traditionnel',
          price: 80,
          detailedDescription: 'Anchois frais marinés dans un vinaigre parfumé'
        },
        {
          name: 'TOMATES, OIGNONS ET THON',
          description: 'Salade méditerranéenne fraîche',
          price: 80,
          detailedDescription: 'Mélange harmonieux de saveurs méditerranéennes'
        },
        {
          name: 'POIVRONS DE PADRÓN',
          description: 'Spécialité galicienne',
          price: 80,
          detailedDescription: 'Petits poivrons verts grillés, légers et savoureux'
        },
        {
          name: 'POIVRONS ROUGES AU FOUR AVEC THON',
          description: 'Légumes farcis méditerranéens',
          price: 90,
          detailedDescription: 'Poivrons rouges grillés garnis de thon savoureux'
        },
        {
          name: 'SALPICÓN DE FRUITS DE MER',
          description: 'Salade de fruits de mer',
          price: 90,
          detailedDescription: 'Mélange rafraîchissant de fruits de mer assaisonnés'
        },
        {
          name: 'TARTINE DE FILET DE BOEUF',
          description: 'Toast garni de viande premium',
          price: 90,
          detailedDescription: 'Pain grillé surmonté de filet de bœuf tendre'
        },
        {
          name: 'POULET À L\'AIL',
          description: 'Volaille parfumée',
          price: 90,
          detailedDescription: 'Morceaux de poulet sautés avec de l\'ail doré'
        },
        {
          name: 'CREVETTES GRILLÉES',
          description: 'Crustacés grillés au naturel',
          price: 130,
          detailedDescription: 'Crevettes fraîches grillées pour conserver leurs saveurs'
        },
        {
          name: 'POULPE À LA GALICIENNE',
          description: 'Poulpe, purée de pommes de terre',
          price: 140,
          detailedDescription: 'Spécialité du nord de l\'Espagne aux saveurs authentiques'
        }
      ]
    },
    {
      title: 'SALADES ET ENTRÉES',
      items: [
        {
          name: 'SALADE DE CRUDITÉS',
          description: 'Légumes frais variés',
          price: 80,
          detailedDescription: 'Mélange de légumes crus de saison et vinaigrette'
        },
        {
          name: 'SALADE AU FROMAGE DE CHÈVRE, FIGUES ET JAMBON',
          description: 'Mélange sucré-salé raffiné',
          price: 120,
          detailedDescription: 'Salade composée alliant fromage de chèvre, figues douces et jambon'
        },
        {
          name: 'SALADE DE CAMEMBERT FRIT',
          description: 'Camembert frit, confiture de fraise, laitue, noix, figue sèche',
          price: 120,
          detailedDescription: 'Salade originale mêlant fromage chaud et fruits sucrés'
        },
        {
          name: 'SALADE PÊCHEUR',
          description: 'Laitue, tomate, avocat, calamars, crevettes, surimi, saumon fumé, sauce cocktail',
          price: 140,
          detailedDescription: 'Salade généreuse aux produits de la mer et sauce délicate'
        },
        {
          name: 'SALADE EL TANGERINO',
          description: 'Crevettes grillées, calamars grillés, espadon grillé, surimi, palourdes',
          price: 140,
          detailedDescription: 'Notre salade signature mêlant tous les trésors de l\'océan'
        }
      ]
    },
    {
      title: 'CRUDOS',
      items: [
        {
          name: 'CARPACCIO DE THON',
          description: 'Tranches de thon rouge, huile d\'olive, câpres, pesto',
          price: 120,
          detailedDescription: 'Thon rouge en fines tranches avec condiments méditerranéens'
        },
        {
          name: 'CARPACCIO DE SAUMON',
          description: 'Saumon frais, 5 baies, gros sel, poivre, câpres, citron, huile d\'olive',
          price: 120,
          detailedDescription: 'Saumon frais mariné aux épices et aromates délicats'
        },
        {
          name: 'CARPACCIO DE VEAU',
          description: 'Tranches de veau, huile d\'olive, câpres, parmesan',
          price: 120,
          detailedDescription: 'Fines lamelles de veau avec accompagnements italiens'
        },
        {
          name: 'ASSIETTE DE SAUMON FUMÉ',
          description: 'Saumon fumé de qualité',
          price: 140,
          detailedDescription: 'Généreuse assiette de saumon fumé finement tranché'
        },
        {
          name: 'TARTARE DE THON ROUGE',
          description: 'Poisson cru de qualité premium',
          price: 140,
          detailedDescription: 'Thon rouge frais coupé au couteau et assaisonné'
        },
        {
          name: 'TATAKI DE THON ROUGE',
          description: 'Thon mi-cuit à la japonaise',
          price: 180,
          detailedDescription: 'Thon rouge saisi rapidement, tendre à l\'intérieur, savoureux à l\'extérieur'
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