"use client";

import { YoutubeIcon, ChevronDown, AlarmClock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface RecipeInstructionsProps {
  instructions: string[];
  videoUrl?: string;
  title?: string;
}

export function RecipeInstructions({
  instructions,
  videoUrl,
  title,
}: RecipeInstructionsProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
  };
  
  const handleStepClick = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
            <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <motion.h2 variants={itemVariants} className="text-xl font-semibold">
            Instructions
          </motion.h2>
        </div>
        
        <motion.ol variants={containerVariants} className="space-y-6">
          {instructions.map((instruction, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className={`flex transition-all duration-300 ${
                activeStep === index ? "bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg -mx-4" : ""
              }`}
            >
              <button 
                onClick={() => handleStepClick(index)}
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-4 mt-0.5 transition-all duration-300 ${
                  activeStep === index
                    ? "bg-amber-500 text-white"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                }`}
              >
                {index + 1}
              </button>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300">
                  {instruction}
                </p>
                
                {activeStep === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex items-center text-sm text-amber-600 dark:text-amber-400"
                  >
                    <AlarmClock className="h-4 w-4 mr-1.5" />
                    <span>Estimated time: {Math.floor(Math.random() * 10) + 5} minutes</span>
                  </motion.div>
                )}
              </div>
              
              {instructions.length > 1 && (
                <ChevronDown 
                  className={`h-5 w-5 text-gray-400 mt-1 transform transition-transform duration-300 ${
                    activeStep === index ? "rotate-180" : ""
                  }`} 
                />
              )}
            </motion.li>
          ))}
        </motion.ol>
        
        <motion.div 
          variants={itemVariants} 
          className="mt-8 text-sm text-gray-500 dark:text-gray-400 italic text-center"
        >
          <p>Tip: Click on any step for more details</p>
        </motion.div>
      </motion.div>

      {/* Video Tutorial */}
      {videoUrl && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
              <YoutubeIcon className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold">Video Tutorial</h2>
          </div>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoUrl.split("v=")[1]}`}
              title={`How to make ${title || ""}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Watch the full video tutorial for step-by-step guidance
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
