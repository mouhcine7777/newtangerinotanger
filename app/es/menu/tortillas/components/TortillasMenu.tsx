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
      {/* Elementos decorativos */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-200/30"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-200/30"></div>
      
      {/* Contenido */}
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
            <span className="mr-1">{isExpanded ? 'Menos' : 'Detalles'}</span>
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
      
      {/* Efecto de resaltado */}
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

  // Todos los datos del menú
  const menuSections: MenuSection[] = [
    {
      title: 'TORTILLAS Y HUEVOS',
      items: [
        {
          name: 'HUEVOS ROTOS SOBRE PATATAS ESTILO LUCIO',
          price: '70',
          shortDescription: 'Huevos frescos sobre patatas salteadas',
          description: 'Preparación tradicional que combina huevos fritos y patatas doradas'
        },
        {
          name: 'TORTILLA ESPAÑOLA',
          price: '70',
          shortDescription: 'Tortilla tradicional de patatas',
          description: 'Especialidad imprescindible de la cocina española'
        },
        {
          name: 'TORTILLA DE SETAS',
          price: '80',
          shortDescription: 'Variante gourmet con champiñones',
          description: 'Tortilla enriquecida con champiñones sabrosos'
        },
        {
          name: 'TORTILLA DE GAMBAS',
          price: '90',
          shortDescription: 'Tortilla con gambas frescas',
          description: 'Tortilla rellena de gambas tiernas y sabrosas'
        },
        {
          name: 'TORTILLA CON CHORIZO DE BELLOTA',
          price: '90',
          shortDescription: 'Tortilla con chorizo artesanal',
          description: 'Combinación perfecta entre tortilla y chorizo de calidad'
        },
        {
          name: 'TORTILLA CON MANCHEGO GRAN CÉSAR',
          price: '90',
          shortDescription: 'Versión con queso premium',
          description: 'Tortilla noble con queso Manchego curado'
        }
      ]
    },
    {
      title: 'FRITURAS',
      items: [
        {
          name: 'BERENJENAS FRITAS CON MIEL',
          price: '70',
          shortDescription: 'Verduras fritas dulces-saladas',
          description: 'Berenjenas crujientes bañadas con miel dorada'
        },
        {
          name: 'CROQUETAS DE JAMÓN IBÉRICO',
          price: '80',
          shortDescription: 'Especialidad premium española',
          description: 'Croquetas refinadas con jamón de calidad superior'
        },
        {
          name: 'CROQUETAS DE POLLO',
          price: '70',
          shortDescription: 'Clásico español crujiente',
          description: 'Croquetas tradicionales con relleno fundente'
        },
        {
          name: 'CROQUETAS DE PESCADO',
          price: '80',
          shortDescription: 'Bocados crujientes de pescado',
          description: 'Croquetas doradas rellenas de pescado fresco'
        },
        {
          name: 'CAZÓN EN ADOBO',
          price: '80',
          shortDescription: 'Pescado de mar preparado',
          description: 'Filete de pescado adobado y luego frito a la perfección'
        },
        {
          name: 'BOQUERONES FRITOS',
          price: '80',
          shortDescription: 'Pescaditos crujientes',
          description: 'Boquerones dorados a la fritura mediterránea'
        },
        {
          name: 'FINGERS DE POLLO',
          price: '90',
          shortDescription: 'Pollo empanado crujiente',
          description: 'Filetes de pollo tiernos cubiertos con un rebozado dorado'
        },
        {
          name: 'TEMPURA DE GAMBAS',
          price: '140',
          shortDescription: 'Gambas en masa japonesa',
          description: 'Gambas envueltas en tempura ligera y crujiente'
        },
        {
          name: 'PATAS DE CALAMARES',
          price: '140',
          shortDescription: 'Especialidad de cefalópodos fritos',
          description: 'Cabezas de calamares fritas, tiernas y sabrosas'
        },
        {
          name: 'CALAMARES FRITOS',
          price: '160',
          shortDescription: 'Calamares crujientes',
          description: 'Calamares tiernos envueltos en un rebozado dorado'
        },
        {
          name: 'PUNTILLITAS FRITAS',
          price: '160',
          shortDescription: 'Calamares jóvenes crujientes',
          description: 'Chipirones tiernos fritos a la perfección'
        },
        {
          name: 'SELECCIÓN DE PESCADOS FRITOS',
          price: '180',
          shortDescription: 'Surtido de pescados variados',
          description: 'Plato de diferentes pescados fritos de la pesca del día'
        }
      ]
    }
  ];

  // Componente de divisor elegante
  const ElegantDivider = () => (
    <div className="flex items-center justify-center my-16">
      <div className="h-px w-16 bg-amber-200/30"></div>
      <div className="mx-3 text-amber-200/50">✦</div>
      <div className="h-px w-16 bg-amber-200/30"></div>
    </div>
  );

  return (
    <section ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Divisor elegante superior */}
      <div className="flex items-center justify-center mb-16">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
      
      {/* Contenido del menú */}
      <div className="container mx-auto px-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <TortillasMenuSection title={section.title} items={section.items} />
            {index < menuSections.length - 1 && <ElegantDivider />}
          </div>
        ))}
      </div>
      
      {/* Divisor elegante inferior */}
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}