"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/recipes/recipe-card";
import { motion } from "framer-motion";
import { RecipeWithCountry } from "@/types/recipe";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Sparkles } from "lucide-react";

interface FeaturedRecipesProps {
  recipes: RecipeWithCountry[];
  userLikedRecipes: string[] | null;
}

export function FeaturedRecipes({
  recipes,
  userLikedRecipes,
}: FeaturedRecipesProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute -left-10 top-1/4 w-40 h-40 bg-amber-100/30 rounded-full blur-xl"></div>
      <div className="absolute -right-20 bottom-1/4 w-60 h-60 bg-orange-100/20 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex justify-center items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Sparkles className="h-6 w-6 text-amber-500" />
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-0.5 bg-amber-300 rounded-full"
          />
        </motion.div>
        
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Featured Recipes
        </motion.h2>
        
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Discover our hand-picked selection of most popular and beloved recipes from around the world
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 50
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="h-full"
            >
              <RecipeCard
                recipe={recipe}
                isLiked={userLikedRecipes?.includes(recipe.id) ?? false}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button 
            variant="default" 
            size="lg" 
            asChild
            className="rounded-full px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/recipes" className="flex items-center gap-2 group">
              <span>View All Recipes</span>
              <motion.div
                className="inline-flex"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ChevronRight className="h-4 w-4 transition-transform" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturedRecipesSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-0.5 w-12 bg-gray-200 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured Recipes
        </h2>
        
        <Skeleton className="h-6 max-w-2xl mx-auto mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 h-full"
            >
              <Skeleton className="h-52 w-full" />
              <div className="p-5">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Skeleton className="h-11 w-[180px] mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}
