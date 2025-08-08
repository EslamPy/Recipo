"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BackButton({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  const router = useRouter();
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="flex items-center w-fit hover:text-amber-600 cursor-pointer bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 dark:bg-gray-800/80"
        onClick={() => {
          if (href) {
            router.push(href);
          } else {
            router.back();
          }
        }}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Back to {title}</span>
      </motion.button>
    </motion.div>
  );
}
