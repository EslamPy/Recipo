"use client";

import { RecipeWithCountry } from "@/types/recipe";
import { motion } from "framer-motion";
import RecipeCard from "./recipe-card";

interface RecipeRelatedProps {
  recipes: RecipeWithCountry[];
  country: string;
}

export default function RecipeRelated({ recipes, country }: RecipeRelatedProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  if (recipes.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-8"
    >
      <div className="flex items-center mb-6">
        <div className="h-10 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full mr-4"></div>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-gray-800"
        >
          More {country} Recipes
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <motion.div key={recipe.id} variants={itemVariants}>
            <RecipeCard recipe={recipe} isLiked={false} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 