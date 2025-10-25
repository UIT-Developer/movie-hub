'use client';

import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

export default function Loading() {
  const dotVariants = {
    animate: { y: [0, -8, 0] },
  };



  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="flex flex-col items-center justify-center gap-4 p-8 shadow-xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-x-2">
          <Clapperboard size={48} color="white" className="animate-bounce" />
          <p className="text-3xl font-bold hidden 2xl:flex text-white animate-pulse">
            Moviehub
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 bg-rose-500 rounded-full"
              variants={dotVariants}
              animate="animate"
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'loop' as const,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
