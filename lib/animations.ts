import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const textRevealVariants: Variants = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scrollRevealVariants: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const buttonHoverVariants = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

export const cardHoverVariants = {
  initial: { opacity: 0, y: 20 },
  whileHover: { y: -5, transition: { duration: 0.3, ease: 'easeOut' } },
  whileTap: { scale: 0.98 },
};

export const floatingVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const glowVariants: Variants = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [0.8, 1, 0.8],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};
