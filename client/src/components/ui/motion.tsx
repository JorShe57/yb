import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { ReactNode } from "react";

type MotionVariant = 
  | "fadeIn" 
  | "fadeInUp" 
  | "fadeInDown" 
  | "fadeInLeft" 
  | "fadeInRight" 
  | "zoomIn" 
  | "slideUp" 
  | "slideDown" 
  | "slideLeft" 
  | "slideRight" 
  | "staggerChildren";

interface AnimatedProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variant?: MotionVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

// Common animation variants
export const animationVariants: Record<MotionVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 }
  },
  slideUp: {
    hidden: { y: 100 },
    visible: { y: 0 }
  },
  slideDown: {
    hidden: { y: -100 },
    visible: { y: 0 }
  },
  slideLeft: {
    hidden: { x: -100 },
    visible: { x: 0 }
  },
  slideRight: {
    hidden: { x: 100 },
    visible: { x: 0 }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  }
};

export function MotionDiv({ 
  children, 
  variant = "fadeIn", 
  delay = 0, 
  duration = 0.5, 
  className = "", 
  ...props 
}: AnimatedProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={animationVariants[variant]}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({ 
  children, 
  variant = "fadeIn", 
  delay = 0, 
  duration = 0.5, 
  className = "", 
  ...props 
}: AnimatedProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={animationVariants[variant]}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionList({ 
  children, 
  delay = 0, 
  className = "", 
  ...props 
}: AnimatedProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={animationVariants.staggerChildren}
      transition={{ 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionListItem({ 
  children, 
  variant = "fadeInUp", 
  delay = 0, 
  duration = 0.5, 
  className = "", 
  ...props 
}: AnimatedProps) {
  return (
    <motion.div
      variants={animationVariants[variant]}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionButton({ 
  children, 
  variant = "fadeIn", 
  delay = 0, 
  duration = 0.3, 
  className = "", 
  ...props 
}: AnimatedProps) {
  return (
    <motion.button
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={animationVariants[variant]}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}