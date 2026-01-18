'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const itemVariants: Variants = {
  hover: { scale: 1.06 },
  tap: { scale: 0.98 },
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const isDark = resolvedTheme === 'dark';
  const shouldReduceMotion = useReducedMotion();

  if (!mounted || !resolvedTheme) return null;

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`p-2.5 rounded-full transition-colors duration-200 group focus:outline-none focus-visible:ring-2 hover:bg-black/10 dark:hover:bg-white/10`}
      aria-label={isDark ? 'Activate light theme' : 'Activate dark theme'}
      aria-pressed={isDark}
      type="button"
      variants={itemVariants}
      whileHover={shouldReduceMotion ? undefined : 'hover'}
      whileTap={shouldReduceMotion ? undefined : 'tap'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-black dark:text-white transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-black dark:text-white transition-colors" />
      )}
    </motion.button>
  );
}
