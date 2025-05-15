import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed ${
            isMobile ? "bottom-5 right-5" : "bottom-8 right-8"
          } bg-primary text-white p-3 rounded-full shadow-lg z-50`}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}