"use client";

import Image from "next/image";
import { Globe, ChefHat, Clock, Utensils, Flame, Heart, Share2, Bookmark, Star } from "lucide-react";
import { RecipeWithCountry } from "@/types/recipe";
import { motion } from "framer-motion";
import { likeRecipe } from "@/actions/recipe";
import { useState, useOptimistic, startTransition } from "react";

interface RecipeHeaderProps {
  recipe: RecipeWithCountry;
  isLiked?: boolean;
}

export default function RecipeHeader({ recipe, isLiked = false }: RecipeHeaderProps) {
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [optimisticLike, setOptimisticLike] = useOptimistic(isLiked);
  
  // Generate a random rating for demo purposes
  const rating = {
    value: (3.5 + Math.random() * 1.5).toFixed(1),
    count: Math.floor(Math.random() * 100) + 10
  };
  
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      setOptimisticLike((prev) => !prev);
    });

    await likeRecipe(recipe.id);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={recipe.image || ""}
          alt={recipe.title}
          fill
          priority
          className="object-cover transition-all duration-1000 hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Interactive buttons */}
        <div className="absolute top-5 right-5 flex gap-2">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all border border-white/10 shadow-lg"
          >
            <Heart className={`h-5 w-5 ${optimisticLike ? "text-red-500 fill-red-500" : "text-white"}`} />
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all border border-white/10 shadow-lg relative"
          >
            <Share2 className="h-5 w-5 text-white" />
            {showShareTooltip && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap"
              >
                Copied to clipboard!
              </motion.div>
            )}
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all border border-white/10 shadow-lg"
          >
            <Bookmark className="h-5 w-5 text-white" />
          </motion.button>
        </div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 p-8 text-white space-y-3 w-full"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 bg-amber-600/80 py-1 px-3 rounded-full backdrop-blur-sm">
              <Globe className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">{recipe.countryName}</span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i <= Math.round(Number(rating.value)) ? "text-amber-400 fill-amber-400" : "text-gray-400"}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">
                {rating.value}
                <span className="text-gray-300 text-xs ml-1">({rating.count})</span>
              </span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            {recipe.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-200 max-w-3xl"
          >
            {recipe.description}
          </motion.p>
        </motion.div>
      </div>

      {/* Recipe metadata cards */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="flex items-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
        >
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-full">
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cooking Time
            </p>
            <p className="font-medium">{recipe.time}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="flex items-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
        >
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-full">
            <ChefHat className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Difficulty
            </p>
            <p className="font-medium capitalize">{recipe.difficulty}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="flex items-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
        >
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-full">
            <Utensils className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Servings</p>
            <p className="font-medium">{recipe.servings} people</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="flex items-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
        >
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-full">
            <Flame className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
            <p className="font-medium">{recipe.calories || "N/A"} kcal</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
