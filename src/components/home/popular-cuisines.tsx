"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { Country } from "@/types/recipe";

interface PopularCuisinesProps {
  popularCuisines: Country[];
}

export function PopularCuisines({ popularCuisines }: PopularCuisinesProps) {
  return (
    <section id="countries-section" className="py-16 bg-white relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-radial from-amber-50/30 via-transparent to-transparent opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-orange-50/20 via-transparent to-transparent opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-1.5 w-16 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full mx-auto mb-6"
          />
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Popular Cuisines
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Explore our collection of authentic recipes from around the world
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {popularCuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                type: "spring",
                stiffness: 50
              }}
              whileHover={{ y: -8 }}
            >
              <Link
                href={`/recipes?countrySlug=${cuisine.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-amber-500 transition-all duration-300 transform shadow-md group-hover:shadow-amber-200/50 group-hover:shadow-lg">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-100/0 to-amber-100/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <Image
                    src={cuisine.flagImage}
                    alt={`${cuisine.name} flag`}
                    fill
                    quality={90}
                    priority={index <= 2}
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-amber-600 transition-colors duration-300">
                  {cuisine.name}
                </span>
                <motion.div 
                  className="h-0.5 w-0 bg-amber-500 mt-1.5 rounded-full"
                  initial={{width: 0}}
                  whileInView={{width: 0}}
                  whileHover={{width: "100%"}}
                  transition={{duration: 0.3}}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PopularCuisinesSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="h-1.5 w-16 bg-gray-200 rounded-full mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Cuisines
          </h2>
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-4" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
