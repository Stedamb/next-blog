'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only run once component is mounted on client
  useEffect(() => {
    setMounted(true);
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') ?? null;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && darkModePreference);
    setIsDark(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <Sun className="size-6" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-6 hover:bg-foreground/5"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </button>
  );
}