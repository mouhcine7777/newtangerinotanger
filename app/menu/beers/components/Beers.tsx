'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SimpleItem {
  name: string;
  price: string;
}

interface SpiritItem {
  name: string;
  glass: string;
  bottle: string;
}

export default function BieresMenu() {
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

  // Bières data
  const bieres: SimpleItem[] = [
    { name: 'Corelli Lager 25cl', price: '40' },
    { name: 'Mahou Original 33cl', price: '60' },
    { name: 'San Miguel 33cl', price: '45' },
    { name: 'San Miguel Fresca 33cl', price: '60' },
    { name: 'San Miguel Sans Alcool', price: '50' },
    { name: 'Leffe Blonde 33cl', price: '70' },
    { name: 'Smirnoff Ice', price: '60' }
  ];

  // Sangria data
  const sangria: SimpleItem[] = [
    { name: 'Sangria Carafe', price: '440' }
  ];

  // Apéritifs data
  const aperitifs: SimpleItem[] = [
    { name: 'Pastis', price: '70' },
    { name: 'Porto Offley Rouge', price: '70' },
    { name: 'Porto Offley Blanc', price: '70' },
    { name: 'Martini Rouge', price: '70' },
    { name: 'Martini Blanc', price: '80' },
    { name: 'Martini Rosé', price: '80' },
    { name: 'Campari', price: '80' }
  ];

  // Digestifs data
  const digestifs: SimpleItem[] = [
    { name: 'Sambuca Isolabella', price: '70' },
    { name: 'Fernet Branca', price: '70' },
    { name: 'Armagnac', price: '70' },
    { name: 'Get 27', price: '70' },
    { name: 'Grappa Sandro Bottega', price: '70' },
    { name: 'Limoncello', price: '70' },
    { name: 'Baileys', price: '100' },
    { name: 'Amaretto Disaronno', price: '100' },
    { name: 'Cointreau', price: '90' },
    { name: 'Grand Marnier', price: '90' },
    { name: 'Eau de Vie Prune', price: '90' },
    { name: 'Eau de Vie Poire Williams', price: '90' }
  ];

  // Cognac/Brandy data
  const cognacBrandy: SimpleItem[] = [
    { name: 'Calvado Boulard', price: '90' },
    { name: 'ABK6 VS', price: '90' },
    { name: 'ABK6 VSOP', price: '150' },
    { name: 'ABK6 X.O', price: '300' }
  ];

  // Rhum data
  const rhum: SimpleItem[] = [
    { name: 'Bacardi Blanc', price: '100' },
    { name: 'Bacardi Gold', price: '100' },
    { name: 'Relicario Superior', price: '100' },
    { name: 'Relicario Supremo', price: '150' }
  ];

  // Whisky data
  const whisky: SpiritItem[] = [
    { name: 'Grant\'s', glass: '100', bottle: '-' },
    { name: 'Monkey Shoulder', glass: '120', bottle: '-' },
    { name: 'Jack Daniel\'s', glass: '120', bottle: '2000' },
    { name: 'Jack Daniel\'s Honey', glass: '120', bottle: '-' },
    { name: 'Gentleman Jack', glass: '140', bottle: '2500' },
    { name: 'Jack Daniel\'s Sinatra', glass: '450', bottle: '-' },
    { name: 'Jack Daniel\'s Single Barrel', glass: '150', bottle: '-' },
    { name: 'Dewar\'s 12 Years', glass: '100', bottle: '-' },
    { name: 'Dewar\'s 15 Years', glass: '120', bottle: '-' },
    { name: 'Dewar\'s 18 Years', glass: '150', bottle: '-' },
    { name: 'Glenfiddich 12 Years', glass: '120', bottle: '-' },
    { name: 'Glenfiddich 15 Years', glass: '140', bottle: '-' },
    { name: 'Glenfiddich 18 Years', glass: '160', bottle: '-' },
    { name: 'Black Label', glass: '150', bottle: '2000' },
    { name: 'Gold Label', glass: '200', bottle: '3000' },
    { name: 'Blue Label', glass: '-', bottle: '9500' }
  ];

  // Vodka data
  const vodka: SpiritItem[] = [
    { name: 'Russian Standard', glass: '100', bottle: '1500' },
    { name: 'Grey Goose', glass: '150', bottle: '2000' },
    { name: 'Cristal Head', glass: '200', bottle: '3000' }
  ];

  // Gin data
  const gin: SpiritItem[] = [
    { name: 'Bombay Original', glass: '100', bottle: '1500' },
    { name: 'Bombay Sapphire', glass: '120', bottle: '2000' },
    { name: 'Hendrick\'s', glass: '150', bottle: '2000' },
    { name: 'Monkey 47', glass: '250', bottle: '3000' }
  ];

  // Tequila data
  const tequila: SpiritItem[] = [
    { name: 'Camino', glass: '100', bottle: '-' },
    { name: 'Patron Silver', glass: '200', bottle: '2000' },
    { name: 'Patron Reposado', glass: '250', bottle: '2500' },
    { name: 'Patron Anejo', glass: '300', bottle: '3000' }
  ];

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

  // Simple section component (name + price)
  const SimpleSection = ({ title, items }: { title: string; items: SimpleItem[] }) => (
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

  // Spirit table section (name + glass + bottle)
  const SpiritTableSection = ({ title, items }: { title: string; items: SpiritItem[] }) => (
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
        <div className="grid grid-cols-[2fr_0.5fr_0.5fr] text-amber-100/80 font-light text-sm mb-2">
          <div className="text-left"></div>
          <div className="text-center">Verre</div>
          <div className="text-center">Bouteille</div>
        </div>
        
        <div className="space-y-1">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="grid grid-cols-[2fr_0.5fr_0.5fr] py-2 border-b border-amber-200/10 group hover:bg-amber-200/5 transition-colors"
            >
              <span className="tracking-wider text-amber-100 group-hover:text-amber-200 transition-colors duration-300 pr-2">
                {item.name}
              </span>
              <span className="text-center text-amber-200/80 text-sm">{item.glass}</span>
              <span className="text-center text-amber-200/80 text-sm">{item.bottle}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Small decorative divider
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
        {/* BIÈRES & SANGRIA SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <SimpleSection title="BIÈRES" items={bieres} />
          <SimpleSection title="SANGRIA" items={sangria} />
        </div>

        <SmallDivider />

        {/* APÉRITIFS & DIGESTIFS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <SimpleSection title="APÉRITIFS" items={aperitifs} />
          <SimpleSection title="DIGESTIFS" items={digestifs} />
        </div>

        <SmallDivider />

        {/* COGNAC/BRANDY & RHUM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <SimpleSection title="COGNAC / BRANDY" items={cognacBrandy} />
          <SimpleSection title="RHUM" items={rhum} />
        </div>

        <SmallDivider />

        {/* SPIRITS SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpiritTableSection title="WHISKY" items={whisky} />
            <SpiritTableSection title="VODKA" items={vodka} />
            <SpiritTableSection title="GIN" items={gin} />
            <SpiritTableSection title="TEQUILA" items={tequila} />
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