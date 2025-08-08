"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ChefHat, Globe, Heart, Star, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RecipeWithCountry } from "@/types/recipe";
import { useOptimistic, startTransition } from "react";
import { likeRecipe } from "@/actions/recipe";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function RecipeCard({
  recipe,
  isLiked,
}: {
  recipe: RecipeWithCountry;
  isLiked: boolean;
}) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/30";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/30";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const [optimisticLike, setOptimisticLike] = useOptimistic(isLiked);

  async function handleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      setOptimisticLike((prev) => !prev);
    });

    await likeRecipe(recipe.id);
  }

  // Generate a deterministic rating based on recipe id instead of random
  const getStableRating = () => {
    // Use the last character of the ID as a seed
    const seed = recipe.id.charCodeAt(recipe.id.length - 1) % 10;
    // Generate a number between 3.5 and 5.0
    return (3.5 + (seed / 10) * 1.5).toFixed(1);
  };
  
  // Generate a stable value for featured status
  const isRecipeFeatured = () => {
    // Use a character from the middle of the ID to determine featured status
    const midChar = recipe.id.charCodeAt(Math.floor(recipe.id.length / 2)) % 10;
    return midChar > 7; // About 30% of recipes will be featured
  };
  
  // Generate a stable number of ingredients
  const getIngredientCount = () => {
    // Use another character from the ID to determine ingredient count
    const startChar = recipe.id.charCodeAt(0) % 10;
    return 2 + startChar;
  };
  
  const rating = getStableRating();
  const featured = isRecipeFeatured();
  const ingredientCount = getIngredientCount();

  return (
    <div className="group relative bg-white dark:bg-gray-800/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700/50 hover:border-amber-200 dark:hover:border-amber-700/70 duration-300 flex flex-col h-[420px]">
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-0 left-0 w-28 h-28 overflow-hidden z-20">
          <div className="absolute top-[19px] left-[-50px] w-[170px] transform -rotate-45 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold py-1 text-center shadow-md">
            Featured
          </div>
        </div>
      )}
      
      <Link href={`/recipes/${recipe.slug}`} className="flex flex-col h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={recipe.image || ""}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 group-hover:from-black/30 group-hover:to-black/70 transition-all duration-300"></div>

          {/* Country badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
            <Globe className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-white">
              {recipe.countryName}
            </span>
          </div>

          {/* Like button */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-10"
          >
            <Button
              onClick={handleLike}
              className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/70 p-0 shadow-lg border border-white/10"
              size="icon"
              variant="ghost"
            >
              <Heart
                className={`h-4 w-4 ${
                  optimisticLike 
                    ? "text-red-500 fill-red-500" 
                    : "text-white group-hover:text-red-200"
                } transition-colors duration-300`}
              />
              <span className="sr-only">Like recipe</span>
            </Button>
          </motion.div>
        </div>

        <div className="relative p-5 flex flex-col flex-1">
          {/* Decorative patterns */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-amber-50 to-transparent opacity-40 dark:opacity-10 pointer-events-none"></div>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(Number(rating))
                      ? "text-amber-400 fill-amber-400" 
                      : i < Number(rating) 
                        ? "text-amber-400 fill-amber-400" 
                        : "text-gray-300 dark:text-gray-600"
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 font-medium">
              {rating}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-1">
            {recipe.description}
          </p>

          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 font-medium">
                  <Clock className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                  <span>{recipe.time}</span>
                </div>
                
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 font-medium">
                  <Utensils className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                  <span>{ingredientCount} ingredients</span>
                </div>
              </div>

              <Badge
                variant="outline"
                className={`flex items-center gap-1 text-xs py-1 px-2.5 rounded-full ${getDifficultyColor(
                  recipe.difficulty
                )}`}
              >
                <ChefHat className="h-3 w-3" />
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
          
          {/* View more button */}
          <div className="absolute -bottom-10 left-0 right-0 bg-gradient-to-b from-amber-500 to-amber-600 text-white py-2.5 text-center text-sm font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 uppercase tracking-wide">
            View Recipe
          </div>
        </div>
      </Link>
    </div>
  );
}
