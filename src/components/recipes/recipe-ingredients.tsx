"use client";

import { motion } from "framer-motion";
import { Utensils, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface RecipeIngredientsProps {
  ingredients: string[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(ingredients.length).fill(false)
  );
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    },
  };
  
  const handleToggleItem = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-20 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
          <Utensils className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold">Ingredients</h2>
      </div>
      
      <ul className="space-y-4 mb-8">
        {ingredients.map((ingredient, index) => (
          <motion.li 
            key={index} 
            variants={itemVariants}
            className="flex items-start"
          >
            <button 
              onClick={() => handleToggleItem(index)} 
              className={`h-5 w-5 rounded-full flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center transition-all duration-300 ${
                checkedItems[index] 
                  ? "bg-amber-500 border-amber-500" 
                  : "border-2 border-amber-500 bg-transparent"
              }`}
            >
              {checkedItems[index] && (
                <Check className="h-3 w-3 text-white" />
              )}
              <span className="sr-only">Check ingredient</span>
            </button>
            <span className={`text-gray-700 dark:text-gray-300 transition-all duration-300 ${
              checkedItems[index] ? "line-through text-gray-400 dark:text-gray-500" : ""
            }`}>
              {ingredient}
            </span>
          </motion.li>
        ))}
      </ul>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className="flex items-center justify-center w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg shadow-sm transition-all"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          <span className="font-medium">Add to Shopping List</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
