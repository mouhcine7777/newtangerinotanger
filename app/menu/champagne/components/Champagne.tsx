'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ChampagneItem {
  name: string;
  price: string;
}

interface WineItem {
  name: string;
  bottle: string;
  half: string;
  glass: string;
}

export default function ChampagneWineMenuPage() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01 }
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

  // Champagnes data
  const champagnes: ChampagneItem[] = [
    { name: 'Laurent Perrier Brut', price: '1600' },
    { name: 'Laurent Perrier Rosé', price: '2900' },
    { name: 'Laurent Perrier Brut Magnum', price: '2900' },
    { name: 'Laurent Perrier Grand Siècle', price: '4800' },
    { name: 'Dom Pérignon', price: '7000' },
    { name: 'Armand de Brignac', price: '9000' }
  ];

  // Moroccan wines data
  const moroccanWines = {
    blanc: [
      { name: 'Beauvallon', bottle: '290', half: '-', glass: '-' },
      { name: 'Médaillon', bottle: '340', half: '180', glass: '-' },
      { name: 'S de Siroua', bottle: '390', half: '-', glass: '-' },
      { name: 'Aït Souala', bottle: '420', half: '-', glass: '-' },
      { name: 'CB Signature', bottle: '480', half: '-', glass: '-' },
      { name: 'CB Initiales', bottle: '540', half: '-', glass: '-' },
      { name: 'Château Rosiane', bottle: '580', half: '-', glass: '-' }
    ] as WineItem[],
    rouge: [
      { name: 'Beauvallon', bottle: '290', half: '-', glass: '-' },
      { name: 'Médaillon', bottle: '340', half: '180', glass: '-' },
      { name: 'S de Siroua', bottle: '390', half: '-', glass: '-' },
      { name: 'CB Signature', bottle: '480', half: '-', glass: '-' },
      { name: 'CB Initiales', bottle: '540', half: '-', glass: '-' },
      { name: 'Azayi', bottle: '590', half: '-', glass: '-' },
      { name: 'Château Rosiane', bottle: '580', half: '-', glass: '-' },
      { name: 'Tandem', bottle: '600', half: '-', glass: '-' }
    ] as WineItem[],
    rose: [
      { name: 'Médaillon', bottle: '340', half: '-', glass: '-' },
      { name: 'S de Siroua', bottle: '390', half: '-', glass: '-' }
    ] as WineItem[]
  };

  // World wines data
  const worldWines = {
    blanc: [
      { name: 'Marqués de Caceres', bottle: '320', half: '-', glass: '110' },
      { name: 'Sangre de Toro', bottle: '340', half: '-', glass: '-' },
      { name: 'Viña Esmeralda', bottle: '360', half: '-', glass: '-' },
      { name: 'Domaine Chiroulet', bottle: '360', half: '-', glass: '110' },
      { name: 'Les Abeilles Colombo', bottle: '390', half: '-', glass: '-' },
      { name: 'Bourgogne Chardonnay Rodet', bottle: '540', half: '-', glass: '-' },
      { name: 'Chablis Tremblay', bottle: '560', half: '-', glass: '-' },
      { name: 'Sancerre', bottle: '590', half: '-', glass: '-' }
    ] as WineItem[],
    rouge: [
      { name: 'La Vieille Ferme Ventoux', bottle: '290', half: '-', glass: '-' },
      { name: 'Fleur de Cazeau Bordeaux', bottle: '320', half: '-', glass: '110' },
      { name: 'Sangre de Toro', bottle: '340', half: '-', glass: '-' },
      { name: 'Hauts de Sainte Marie', bottle: '360', half: '-', glass: '-' },
      { name: 'Abeilles Colombo Côtes de Rhône', bottle: '390', half: '-', glass: '-' },
      { name: 'Marqués de Caceres', bottle: '420', half: '-', glass: '110' },
      { name: 'La Celia Reserva Malbec', bottle: '420', half: '-', glass: '-' },
      { name: 'Tarapaca Reserva Carmenere', bottle: '390', half: '-', glass: '-' },
      { name: 'Brouilly les Jarrons Thorin', bottle: '520', half: '-', glass: '-' },
      { name: 'Bourgogne Pinot Noir Rodet', bottle: '560', half: '-', glass: '-' },
      { name: 'Sancerre', bottle: '590', half: '-', glass: '-' },
      { name: 'Château Lafitte', bottle: '640', half: '-', glass: '-' },
      { name: 'Marques de Varga Reserva', bottle: '690', half: '-', glass: '-' },
      { name: 'Chamirey Mercury Bourgogne', bottle: '900', half: '-', glass: '-' },
      { name: 'Châteauneuf-du-Pape', bottle: '1200', half: '-', glass: '-' }
    ] as WineItem[],
    rose: [
      { name: 'Manon Côte de Provence', bottle: '320', half: '-', glass: '110' },
      { name: 'M de Minuty', bottle: '440', half: '-', glass: '-' },
      { name: 'Pétales de Rose', bottle: '460', half: '-', glass: '-' },
      { name: 'Minuty Prestige', bottle: '590', half: '-', glass: '-' }
    ] as WineItem[]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      }
    }
  };

  // Simple section for champagnes (no table)
  const SimpleSection = ({ title, items }: { title: string; items: ChampagneItem[] }) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="bg-amber-900/10 backdrop-blur-sm rounded-lg p-5 border border-amber-200/10"
    >
      <h3 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100 mb-4">
        {title}
      </h3>
      
      <motion.div variants={containerVariants}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex justify-between items-center py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
            >
              <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2">
                {item.name}
              </span>
              <span className="text-amber-200/80 text-sm">{item.price}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Table section for wines with bottle/half/glass columns
  const TableSection = ({ title, items, hasHalf = true }: { title: string; items: WineItem[]; hasHalf?: boolean }) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="bg-amber-900/10 backdrop-blur-sm rounded-lg p-5 border border-amber-200/10"
    >
      <h3 className="text-center font-SweetSansProBold text-2xl font-serif tracking-wider text-amber-100 mb-4">
        {title}
      </h3>
      
      <motion.div variants={containerVariants}>
        {/* Table header */}
        <div className={`grid ${hasHalf ? 'grid-cols-[2fr_0.5fr_0.5fr_0.5fr]' : 'grid-cols-[2fr_0.5fr_0.5fr]'} text-amber-100/80 font-light text-sm mb-2`}>
          <div className="text-left"></div>
          <div className="text-center">75cl</div>
          {hasHalf && <div className="text-center">37.5cl</div>}
          <div className="text-center">Verre</div>
        </div>
        
        <div className="space-y-1">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`grid ${hasHalf ? 'grid-cols-[2fr_0.5fr_0.5fr_0.5fr]' : 'grid-cols-[2fr_0.5fr_0.5fr]'} py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors`}
            >
              <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2">
                {item.name}
              </span>
              <span className="text-center text-amber-200/80 text-sm">{item.bottle}</span>
              {hasHalf && <span className="text-center text-amber-200/80 text-sm">{item.half}</span>}
              <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Small decorative divider component
  const SmallDivider = () => (
    <div className="flex items-center justify-center my-10">
      <div className="h-px w-10 bg-amber-200/30"></div>
      <div className="mx-2 text-amber-200/50 text-xs">✦</div>
      <div className="h-px w-10 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-16 bg-[#3e4c52] text-amber-50 relative">
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
        {/* CHAMPAGNES SECTION */}
        <div className="max-w-2xl mx-auto mb-14">
          <SimpleSection 
            title="CHAMPAGNES" 
            items={champagnes}
          />
        </div>
        
        <SmallDivider />

        {/* VINS MAROCAINS SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-14"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-6">
            VINS MAROCAINS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TableSection 
              title="BLANC" 
              items={moroccanWines.blanc}
              hasHalf={true}
            />
            
            <TableSection 
              title="ROUGE" 
              items={moroccanWines.rouge}
              hasHalf={true}
            />
            
            <TableSection 
              title="ROSÉ" 
              items={moroccanWines.rose}
              hasHalf={false}
            />
          </div>
        </motion.div>

        <SmallDivider />

        {/* VINS DU MONDE SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-14"
        >
          <h3 className="text-center font-SweetSansProBold text-3xl font-serif tracking-wider text-amber-100 mb-6">
            VINS DU MONDE
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TableSection 
              title="BLANC" 
              items={worldWines.blanc}
              hasHalf={false}
            />
            
            <TableSection 
              title="ROUGE" 
              items={worldWines.rouge}
              hasHalf={false}
            />
            
            <TableSection 
              title="ROSÉ" 
              items={worldWines.rose}
              hasHalf={false}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Elegant divider bottom */}
      <div className="flex items-center justify-center mt-12">
        <div className="h-px w-16 bg-amber-200/40"></div>
        <div className="mx-3 text-amber-200/60">✦</div>
        <div className="h-px w-16 bg-amber-200/40"></div>
      </div>
    </section>
  );
}