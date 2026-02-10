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

  // Todos los datos del menú
  const menuSections: MenuSection[] = [
    {
      title: 'QUESOS Y JAMONES',
      items: [
        {
          name: 'CHORIZO IBÉRICO DE BELLOTA',
          description: 'Embutido español tradicional',
          price: 140,
          detailedDescription: 'Chorizo artesanal con especias auténticas de España'
        },
        {
          name: 'JAMÓN IBÉRICO',
          description: 'Charcutería española premium',
          price: 180,
          detailedDescription: 'Jamón de calidad superior con sabores refinados'
        },
        {
          name: 'QUESO MANCHEGO AÑEJO D.O.P.',
          description: 'Queso español auténtico',
          price: 180,
          detailedDescription: 'Queso curado con sabores intensos y característicos'
        },
        {
          name: 'TABLA DE QUESOS',
          description: 'Azul, brie, cabra, parmesano, manchego',
          price: 190,
          detailedDescription: 'Selección refinada de quesos europeos'
        }
      ]
    },
    {
      title: 'SOPAS',
      items: [
        {
          name: 'SOPA DE MARISCOS',
          description: 'Caldo de mar aromático',
          price: 80,
          detailedDescription: 'Sopa rica en sabores marinos y mariscos'
        }
      ]
    },
    {
      title: 'TAPAS',
      items: [
        {
          name: 'TAPENADE CASERO DE ACEITUNAS NEGRAS',
          description: 'Media ración · 30 Dhs | Ración · 60 Dhs',
          price: '30 / 60',
          detailedDescription: 'Pasta de aceitunas negras tradicional preparada según nuestra receta casera'
        },
        {
          name: 'TOMATE AL AJO',
          description: 'Entrante simple y sabroso',
          price: 50,
          detailedDescription: 'Tomates frescos realzados con ajo aromático'
        },
        {
          name: 'PATATAS BRAVAS',
          description: 'Acompañamiento español clásico',
          price: 60,
          detailedDescription: 'Patatas preparadas en la tradición madrileña'
        },
        {
          name: 'ENSALADILLA RUSA',
          description: 'Ensalada compuesta clásica',
          price: 70,
          detailedDescription: 'Mezcla generosa de verduras y mayonesa'
        },
        {
          name: 'MINI HAMBURGUESA',
          description: 'Hamburguesa miniatura sabrosa',
          price: 70,
          detailedDescription: 'Pequeña hamburguesa perfecta para compartir'
        },
        {
          name: 'GUACAMOLE Y NACHOS',
          description: 'Aguacate machacado con nachos crujientes',
          price: 70,
          detailedDescription: 'Guacamole fresco acompañado de nachos dorados'
        },
        {
          name: 'BOQUERONES EN VINAGRE',
          description: 'Pescado marinado tradicional',
          price: 80,
          detailedDescription: 'Boquerones frescos marinados en vinagre aromático'
        },
        {
          name: 'TOMATE, CEBOLLA Y ATÚN',
          description: 'Ensalada mediterránea fresca',
          price: 80,
          detailedDescription: 'Mezcla armoniosa de sabores mediterráneos'
        },
        {
          name: 'PIMIENTOS DE PADRÓN',
          description: 'Especialidad gallega',
          price: 80,
          detailedDescription: 'Pequeños pimientos verdes asados, ligeros y sabrosos'
        },
        {
          name: 'PIMIENTOS ROJOS AL HORNO CON ATÚN',
          description: 'Verduras rellenas mediterráneas',
          price: 90,
          detailedDescription: 'Pimientos rojos asados rellenos de atún sabroso'
        },
        {
          name: 'SALPICÓN DE MARISCOS',
          description: 'Ensalada de mariscos',
          price: 90,
          detailedDescription: 'Mezcla refrescante de mariscos sazonados'
        },
        {
          name: 'TOSTA DE SOLOMILLO',
          description: 'Tostada con carne premium',
          price: 90,
          detailedDescription: 'Pan tostado cubierto con solomillo tierno'
        },
        {
          name: 'POLLO AL AJILLO',
          description: 'Pollo aromático',
          price: 90,
          detailedDescription: 'Trozos de pollo salteados con ajo dorado'
        },
        {
          name: 'GAMBAS A LA PLANCHA',
          description: 'Crustáceos a la plancha al natural',
          price: 130,
          detailedDescription: 'Gambas frescas a la plancha para conservar sus sabores'
        },
        {
          name: 'PULPO A LA GALLEGA',
          description: 'Pulpo, puré de patatas',
          price: 140,
          detailedDescription: 'Especialidad del norte de España con sabores auténticos'
        }
      ]
    },
    {
      title: 'ENSALADAS Y ENTRANTES',
      items: [
        {
          name: 'ENSALADA DE VERDURAS CRUDAS',
          description: 'Verduras frescas variadas',
          price: 80,
          detailedDescription: 'Mezcla de verduras crudas de temporada y vinagreta'
        },
        {
          name: 'ENSALADA DE QUESO DE CABRA, HIGOS Y JAMÓN',
          description: 'Mezcla dulce-salada refinada',
          price: 120,
          detailedDescription: 'Ensalada compuesta que combina queso de cabra, higos dulces y jamón'
        },
        {
          name: 'ENSALADA DE CAMEMBERT FRITO',
          description: 'Camembert frito, mermelada de fresa, lechuga, nueces, higo seco',
          price: 120,
          detailedDescription: 'Ensalada original que mezcla queso caliente y frutas dulces'
        },
        {
          name: 'ENSALADA MARINERA',
          description: 'Lechuga, tomate, aguacate, calamares, gambas, surimi, salmón ahumado, salsa cocktail',
          price: 140,
          detailedDescription: 'Ensalada generosa con productos del mar y salsa delicada'
        },
        {
          name: 'ENSALADA EL TANGERINO',
          description: 'Gambas a la plancha, calamares a la plancha, pez espada a la plancha, surimi, almejas',
          price: 140,
          detailedDescription: 'Nuestra ensalada insignia que mezcla todos los tesoros del océano'
        }
      ]
    },
    {
      title: 'CRUDOS',
      items: [
        {
          name: 'CARPACCIO DE ATÚN',
          description: 'Láminas de atún rojo, aceite de oliva, alcaparras, pesto',
          price: 120,
          detailedDescription: 'Atún rojo en láminas finas con condimentos mediterráneos'
        },
        {
          name: 'CARPACCIO DE SALMÓN',
          description: 'Salmón fresco, 5 bayas, sal gruesa, pimienta, alcaparras, limón, aceite de oliva',
          price: 120,
          detailedDescription: 'Salmón fresco marinado con especias y aromáticos delicados'
        },
        {
          name: 'CARPACCIO DE TERNERA',
          description: 'Láminas de ternera, aceite de oliva, alcaparras, parmesano',
          price: 120,
          detailedDescription: 'Finas láminas de ternera con acompañamientos italianos'
        },
        {
          name: 'PLATO DE SALMÓN AHUMADO',
          description: 'Salmón ahumado de calidad',
          price: 140,
          detailedDescription: 'Generoso plato de salmón ahumado finamente cortado'
        },
        {
          name: 'TARTAR DE ATÚN ROJO',
          description: 'Pescado crudo de calidad premium',
          price: 140,
          detailedDescription: 'Atún rojo fresco cortado a cuchillo y sazonado'
        },
        {
          name: 'TATAKI DE ATÚN ROJO',
          description: 'Atún medio cocido a la japonesa',
          price: 180,
          detailedDescription: 'Atún rojo sellado rápidamente, tierno por dentro, sabroso por fuera'
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
            <TapasMenuSection title={section.title} items={section.items} />
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