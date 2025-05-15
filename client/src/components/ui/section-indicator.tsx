import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionIndicatorProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
}

export function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Get all section elements
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      // Find which section is currently in view
      for (const { id, element } of sectionElements) {
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const topThreshold = isMobile ? 150 : 200;
        
        if (rect.top <= topThreshold && rect.bottom >= 0) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, isMobile]);

  // Don't show on mobile (takes up too much space)
  if (isMobile) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center gap-2"
          aria-label={`Scroll to ${section.label}`}
        >
          <motion.div
            className={`relative h-3 w-3 rounded-full border-2 border-primary
              ${
                activeSection === section.id
                  ? "bg-primary"
                  : "bg-transparent hover:bg-primary/20"
              }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          
          <motion.span
            className="absolute right-6 opacity-0 group-hover:opacity-100 text-sm text-foreground bg-background/90 px-2 py-1 rounded-md shadow-md transition-opacity whitespace-nowrap"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {section.label}
          </motion.span>
        </a>
      ))}
    </div>
  );
}