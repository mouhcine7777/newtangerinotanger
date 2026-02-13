'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define menu category type
type MenuCategory = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
};

export default function MenuCategorySection() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0,
        rootMargin: '100px 0px'
      }
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

  // Menu categories data
  const menuCategories: MenuCategory[] = [
    {
      id: 1,
      title: "Cocktails & Soft",
      description: "Cocktails raffinés et boissons sans alcool",
      image: "/cocktails.jpg",
      slug: "cocktails"
    },
    {
      id: 2,
      title: "Champagne et Vins",
      description: "Sélection premium de champagnes et vins fins",
      image: "/champagne.jpg",
      slug: "champagne"
    },
    {
      id: 3,
      title: "Bières et Boissons",
      description: "Bières artisanales et boissons fraîches",
      image: "/beer.jpg",
      slug: "beers"
    },
    {
      id: 4,
      title: "Tapas et Entrées",
      description: "Délicieuses entrées et tapas à partager",
      image: "/tapas.jpg",
      slug: "tapas"
    },
    {
      id: 5,
      title: "Tortillas & Fritures",
      description: "Savourez nos tortillas artisanales et fritures dorées à la perfection",
      image: "/tortillas.jpg",
      slug: "tortillas"
    },
    {
      id: 6,
      title: "Cassolettes",
      description: "Plats mijotés traditionnels servis en cassolette",
      image: "/cassolettes.jpg",
      slug: "cassolettes"
    },
    {
      id: 7,
      title: "Spécialités de la maison",
      description: "Nos créations signature et plats emblématiques",
      image: "/specialites.jpg",
      slug: "specialites-de-la-maison"
    },
    {
      id: 8,
      title: "Poisson et Viande",
      description: "Sélection premium de poissons frais et viandes nobles",
      image: "/poisson.jpg",
      slug: "poissons"
    },
    {
      id: 9,
      title: "De Rome à New York",
      description: "Deux mondes, une passion commune",
      image: "/rome-newyork.jpg",
      slug: "rome-newyork"
    },
    {
      id: 10,
      title: "Desserts",
      description: "Créations sucrées pour finir en beauté",
      image: "/desserts.jpg",
      slug: "desserts"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="menu" ref={menuRef} className="py-20 bg-[#3e4c52] text-amber-50 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('/texture.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Elegant divider top */}
      <div className="flex items-center justify-center mb-16">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
      
      {/* Section Title */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-SweetSansProBold text-4xl md:text-5xl font-serif tracking-wider text-amber-50 mb-4">LA CARTE</h2>
        <p className="text-amber-100/70 font-light max-w-2xl mx-auto">
        Découvrez nos créations culinaires, où chaque plat raconte une histoire de passion et de savoir-faire.
        </p>
      </motion.div>
      
      {/* Menu Category Cards */}
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {menuCategories.map((category, index) => (
            <Link key={category.id} href={`/menu/${category.slug}`} className="block">
              <motion.div
                variants={itemVariants}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="aspect-[4/5] relative shadow-xl rounded-lg">
                  {/* Card background image with subtle rotation on hover */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-all duration-700 ease-out group-hover:scale-105 brightness-90 rounded-lg"
                  />
                  
                  {/* Stylized overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-lg"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute inset-0">
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-200/40"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-200/40"></div>
                    
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5"></div>
                  </div>
                  
                  {/* Content container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Category number and title */}
                    <div>
                      <span className="text-amber-200/60 text-xs font-light tracking-widest">
                        {category.id.toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-SweetSansProBold text-xl md:text-2xl font-serif tracking-wide text-amber-50 mt-1">
                        {category.title}
                      </h3>
                      <div className="w-12 h-px bg-amber-200/40 my-3"></div>
                    </div>
                    
                    {/* Description and button */}
                    <div>
                      <p className="text-amber-100/90 text-sm font-light mb-6">
                        {category.description}
                      </p>
                      
                      <span className="inline-block bg-amber-700/80 hover:bg-amber-600 text-amber-50 py-2 px-6 text-sm uppercase tracking-wider border-b-2 border-amber-500/50 rounded transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-lg">
                        Explorer
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Animated highlight effect on hover */}
                <div className="absolute inset-0 bg-amber-200/5 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 rounded-lg"></div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Client Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#2f3a3f]/60 backdrop-blur-md border border-amber-200/20 rounded-lg p-8 shadow-xl">
            <p className="text-lg font-light leading-relaxed text-center text-amber-100/90">
              Nous informons notre aimable clientèle qu'un service de <span className="text-amber-400 font-medium">6%</span> sera ajouté à votre addition.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Elegant divider bottom */}
      <div className="flex items-center justify-center mt-20">
        <div className="h-px w-24 bg-amber-200/40"></div>
        <div className="mx-4 text-amber-200/60">✦</div>
        <div className="h-px w-24 bg-amber-200/40"></div>
      </div>
    </section>
  );
}