"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, SendHorizonal, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would integrate with your email service
      console.log("Subscribing email:", email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-amber-100 dark:bg-amber-900/20 rounded-full opacity-40 dark:opacity-20"
            style={{
              height: `${30 + Math.random() * 70}px`,
              width: `${30 + Math.random() * 70}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            type: "spring",
            stiffness: 50
          }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="bg-amber-100 dark:bg-amber-800/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: 0.1,
                type: "spring"
              }}
            >
              <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay Updated
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Subscribe to our newsletter to receive new recipes, cooking tips, and exclusive offers directly to your inbox.
            </motion.p>
            
            <motion.form 
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative flex-grow">
                <Input 
                  placeholder="Enter your email" 
                  className="pr-10 h-12 rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitted}
                  type="email"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Subscribed!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span>Subscribe</span>
                    <SendHorizonal className="h-4 w-4" />
                  </motion.div>
                )}
              </Button>
            </motion.form>
          </div>
          
          <motion.div 
            className="text-center text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p>We respect your privacy. Unsubscribe at any time.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
