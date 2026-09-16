"use client";

import { useTheme } from "../../site/components/ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-muted text-foreground transition-colors"
        aria-label="Cambiar tema"
        disabled
      >
        <FaSun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card border border-card-border text-foreground hover:bg-card-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      title={theme === "light" ? "Modo oscuro" : "Modo claro"}
    >
      {theme === "light" ? (
        <FaMoon className="h-4 w-4 text-primary" />
      ) : (
        <FaSun className="h-4 w-4 text-accent" />
      )}
    </button>
  );
}