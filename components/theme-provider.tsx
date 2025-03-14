"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div
        className="min-h-screen transition-colors duration-300 
        dark:bg-gray-700 dark:text-emerald-200
        bg-gray-50 text-emerald-800"
      >
        {children}
      </div>
    </NextThemesProvider>
  )
}

