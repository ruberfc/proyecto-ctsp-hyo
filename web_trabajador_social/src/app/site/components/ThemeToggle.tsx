"use client";

import { useTheme } from "./ThemeProvider";
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
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted p-1 text-foreground transition-colors"
        aria-label="Cambiar tema"
        disabled
      >
        <FaSun className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-card-border bg-card p-1 text-foreground hover:bg-card-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      title={theme === "light" ? "Modo oscuro" : "Modo claro"}
    >
      {theme === "light" ? (
        <FaMoon className="h-3.5 w-3.5 text-primary" />
      ) : (
        <FaSun className="h-3.5 w-3.5 text-accent" />
      )}
    </button>
  );
}