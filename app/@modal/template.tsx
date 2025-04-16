"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import React, { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0" style={{ zIndex: 999, pointerEvents: "none" }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={() => router.back()}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          style={{ pointerEvents: "auto" }}
        />

        {/* Modal Container */}
        <div className="absolute inset-4 md:inset-6 pointer-events-auto">
          <motion.div
            layoutId={`expandable-card-${pathname}`}
            transition={{
              layout: {
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1]
              }
            }}
            className="relative w-full h-full bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden"
            style={{ 
              transformOrigin: "center",
              willChange: "transform, opacity"
            }}
          >
            {/* Static Background - Prevents content warping */}
            <div className="absolute inset-0 bg-white dark:bg-neutral-900" />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.2
              }}
              className="relative w-full h-full"
            >
              {/* Scrollable Content */}
              <div className="w-full h-full p-8 overflow-auto">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.3
                  }}
                  onClick={() => router.back()}
                  className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Modal Content */}
                {children}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
} 