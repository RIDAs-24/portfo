import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const textRevealVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scrollRevealVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const buttonHoverVariants = {
  whileHover: { scale: 1.02, transition: { duration: 0.15 } },
  whileTap: { scale: 0.98 },
};

export const cardHoverVariants = {
  initial: { opacity: 0, y: 16 },
  whileHover: { y: -4, transition: { duration: 0.2, ease: 'easeOut' } },
  whileTap: { scale: 0.98 },
};

export const floatingVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const glowVariants: Variants = {
  initial: { opacity: 0.5, scale: 0.9 },
  animate: {
    opacity: [0.5, 0.85, 0.5],
    scale: [0.9, 1, 0.9],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};
