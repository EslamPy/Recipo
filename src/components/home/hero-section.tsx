"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChefHat, Globe, ArrowRight, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Food items that will float in the background
const foodItems = [
  { src: "/images/food-1.png", alt: "Food item 1" },
  { src: "/images/food-2.png", alt: "Food item 2" },
  { src: "/images/food-3.png", alt: "Food item 3" },
  { src: "/images/food-4.png", alt: "Food item 4" },
];

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Function to handle smooth scrolling
  const handleScrollToCountries = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const element = document.getElementById("countries-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="relative py-20 pt-20 overflow-hidden bg-gradient-to-b from-amber-100 via-amber-50/80 to-white">
      {/* Floating food icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {loaded && (
            <>
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ 
                    x: Math.random() * 100 - 50 + "%", 
                    y: Math.random() * 100 + "%",
                    opacity: 0,
                    scale: 0.3 + Math.random() * 0.7,
                    rotate: Math.random() * 360 
                  }}
                  animate={{ 
                    y: [null, "-100%"],
                    opacity: [0, 0.4, 0],
                    rotate: Math.random() > 0.5 ? 360 : -360
                  }}
                  transition={{ 
                    duration: 15 + Math.random() * 20,
                    ease: "linear",
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                >
                  <UtensilsCrossed className="text-amber-200" size={20 + Math.random() * 30} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <motion.div
            className="space-y-8 w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center px-3 py-1.5 gap-2 rounded-full bg-amber-100/80 w-fit border border-amber-200/50 shadow-sm"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-70"></div>
                <div className="relative rounded-full bg-amber-500 w-2 h-2"></div>
              </div>
              <span className="text-amber-700 dark:text-amber-300 text-sm font-medium">
                World Cuisine Explorer
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Taste the World&apos;s
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-300">
                Finest Recipes
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-lg"
            >
              Embark on a culinary journey across continents, exploring the rich
              tapestry of global flavors. Discover authentic recipes passed down
              through generations, from the spicy streets of Bangkok to the rustic
              kitchens of Tuscany.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-full px-6 shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link href="/recipes" className="flex items-center group">
                  <ChefHat className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span>Explore Recipes</span>
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-6 transition-all"
                asChild
              >
                <Link
                  href="#countries-section"
                  onClick={handleScrollToCountries}
                  className="flex items-center group"
                >
                  <Globe className="h-5 w-5 mr-2 group-hover:rotate-45 transition-transform" />
                  Discover Countries
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              delay: 0.4,
              bounce: 0.4
            }}
            className="relative w-full lg:w-2/5 aspect-square"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200/30 blur-xl transform -translate-x-1/4 -translate-y-1/4"></div>
            <div className="relative">
              <motion.div
                animate={{ 
                  rotateZ: 360,
                  transition: { 
                    duration: 60, 
                    ease: "linear", 
                    repeat: Infinity 
                  }
                }}
              >
                <Image
                  src="/images/hero-food.png"
                  alt="Delicious world cuisine"
                  priority
                  width={600}
                  height={600}
                  className="object-cover drop-shadow-xl"
                />
              </motion.div>
              
              {/* Floating decorative elements around the main image */}
              <motion.div
                className="absolute -top-5 -right-5 bg-white p-3 rounded-full shadow-lg"
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <ChefHat className="h-6 w-6 text-amber-500" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-10 -left-10 bg-white p-2 rounded-full shadow-lg"
                initial={{ y: 0 }}
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <UtensilsCrossed className="h-5 w-5 text-amber-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}
